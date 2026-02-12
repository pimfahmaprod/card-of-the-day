// Facebook Login Integration for Card of the Day
// ============================================

const FACEBOOK_APP_ID = '940915038262874';
const FB_PICTURE_KEY = 'tarot_fb_picture';
const FB_CONNECTED_KEY = 'tarot_fb_connected';

let fbUser = null;

// Initialize Facebook SDK
window.fbAsyncInit = function() {
    // FB SDK requires HTTPS — skip initialization on HTTP to avoid errors
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        console.warn('Facebook SDK requires HTTPS. Skipping FB init on HTTP.');
        if (typeof onFacebookStatusReady === 'function') onFacebookStatusReady();
        return;
    }

    FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v21.0'
    });

    try {
        FB.getLoginStatus(function(response) {
            handleStatusChange(response);
        });
    } catch (e) {
        console.warn('FB.getLoginStatus failed:', e.message);
        if (typeof onFacebookStatusReady === 'function') onFacebookStatusReady();
    }
};

// Handle login status changes
function handleStatusChange(response) {
    if (response.status === 'connected') {
        fbUser = response.authResponse;
        fetchUserProfileFB();
    } else {
        fbUser = null;
        // Session expired or not connected — clear everything and show as logged out
        if (localStorage.getItem(FB_CONNECTED_KEY)) {
            clearFacebookData();
            if (typeof clearNotificationState === 'function') clearNotificationState();
        }
        updateFacebookButton(false);
    }
    // Notify app.js that FB status is now known — refresh loading placeholders
    if (typeof onFacebookStatusReady === 'function') {
        onFacebookStatusReady();
    }
}

// Fetch user profile info from Facebook
function fetchUserProfileFB() {
    FB.api('/me', { fields: 'id,name,picture.type(normal)' }, function(response) {
        if (response && !response.error) {
            fbUser = {
                ...fbUser,
                id: response.id,
                name: response.name,
                picture: response.picture?.data?.url
            };

            // Save basic FB data to localStorage
            localStorage.setItem('tarot_user_id', 'fb_' + response.id);
            localStorage.setItem(FB_CONNECTED_KEY, 'true');
            if (response.picture?.data?.url) {
                localStorage.setItem(FB_PICTURE_KEY, response.picture.data.url);
            }

            // Show FB name temporarily while we check Firebase for custom name
            var picUrl = response.picture?.data?.url;
            updateFacebookButton(true, response.name, picUrl);

            // Sync draw history from Firebase
            syncDrawHistoryOnLogin(response.id);

            // Fetch existing profile from Firebase FIRST, then save
            if (window.cardCounter && window.cardCounter.fetchUserProfile) {
                window.cardCounter.fetchUserProfile(response.id).then(function(savedProfile) {
                    // Determine the correct display name (Firebase custom name takes priority)
                    var displayName = response.name;
                    if (savedProfile && savedProfile.displayName && savedProfile.displayName !== savedProfile.fbName) {
                        // User has a custom name different from their FB name — preserve it
                        displayName = savedProfile.displayName;
                    }

                    localStorage.setItem('tarot_user_name', displayName);
                    updateFacebookButton(true, displayName, picUrl, true);

                    // Update in-memory display name cache
                    if (typeof userDisplayNames !== 'undefined') {
                        userDisplayNames.set(response.id, displayName);
                    }

                    // Save/update profile in Firebase (preserve custom displayName)
                    if (window.cardCounter.saveUserProfile) {
                        var profileData = {
                            fbName: response.name,
                            displayName: displayName
                        };
                        if (response.picture && response.picture.data && response.picture.data.url) {
                            profileData.fbPicture = response.picture.data.url;
                        }
                        window.cardCounter.saveUserProfile(response.id, profileData);
                    }
                });
            } else {
                // No Firebase available — fall back to FB name
                localStorage.setItem('tarot_user_name', response.name);
            }

            // Initialize notification polling after login
            if (typeof initNotificationPolling === 'function') {
                setTimeout(initNotificationPolling, 2000);
            } else if (typeof checkFriendsNewCards === 'function') {
                setTimeout(checkFriendsNewCards, 2000);
            }
        }
    });
}

// Profile click handler (replaces connectWithFacebook)
function handleProfileClick() {
    if (fbUser && fbUser.id) {
        toggleProfileDropdown();
    } else if (localStorage.getItem(FB_CONNECTED_KEY) === 'true') {
        // Session expired but was connected - try to show dropdown with cached data
        toggleProfileDropdown();
    } else {
        loginWithFacebook();
    }
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const profileSwitcher = document.getElementById('profileSwitcher');
    if (!profileSwitcher) return;
    profileSwitcher.classList.toggle('open');

    if (profileSwitcher.classList.contains('open')) {
        updateProfileDropdown();
    }
}

// Update dropdown content with current user info
function updateProfileDropdown() {
    const pic = document.getElementById('profileDropdownPic');
    const name = document.getElementById('profileDropdownName');

    if (pic) {
        pic.src = localStorage.getItem(FB_PICTURE_KEY) || '';
    }
    if (name) {
        name.textContent = localStorage.getItem('tarot_user_name') || (fbUser && fbUser.name) || '';
    }
}

// Edit display name
function editDisplayName() {
    const profileSwitcher = document.getElementById('profileSwitcher');
    if (profileSwitcher) profileSwitcher.classList.remove('open');

    const currentLang = window.currentLang || 'th';
    const promptText = (window.translations && window.translations[currentLang] && window.translations[currentLang].profile && window.translations[currentLang].profile.editNamePrompt) || 'Enter new display name:';
    const currentName = localStorage.getItem('tarot_user_name') || '';
    const newName = prompt(promptText, currentName);

    if (newName !== null && newName.trim() !== '') {
        const trimmed = newName.trim().substring(0, 15);
        localStorage.setItem('tarot_user_name', trimmed);

        // Update FB button text
        updateFacebookButton(true, trimmed, localStorage.getItem(FB_PICTURE_KEY));

        // Sync to Firebase and update in-memory display name cache
        const fbUserId = getFbUserId();
        if (fbUserId && window.cardCounter && window.cardCounter.saveUserProfile) {
            window.cardCounter.saveUserProfile(fbUserId, {
                displayName: trimmed,
                fbName: (fbUser && fbUser.name) || ''
            });
            // Update in-memory cache so all rendered comments update on next load
            if (typeof userDisplayNames !== 'undefined') {
                userDisplayNames.set(fbUserId, trimmed);
            }
        }
    }
}

// Logout from profile dropdown
function logoutFromProfile() {
    const profileSwitcher = document.getElementById('profileSwitcher');
    if (profileSwitcher) profileSwitcher.classList.remove('open');
    logoutFromFacebook();
}

// Login with Facebook
function loginWithFacebook() {
    FB.login(function(response) {
        handleStatusChange(response);
    }, {
        scope: 'public_profile,user_friends',
        return_scopes: true
    });
}

// Logout from Facebook
function logoutFromFacebook() {
    // Always clear local state first (FB.logout may fail if session expired)
    fbUser = null;
    clearFacebookData();
    updateFacebookButton(false);

    // Clear notification bubbles and stop polling
    if (typeof clearNotificationState === 'function') clearNotificationState();

    // Then try to end FB session if SDK is available
    try {
        if (typeof FB !== 'undefined') {
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    FB.logout(function() {});
                }
            });
        }
    } catch (e) {
        // Ignore - local state already cleared
    }
}

// Clear FB data from localStorage and generate new anonymous ID
function clearFacebookData() {
    localStorage.removeItem(FB_CONNECTED_KEY);
    localStorage.removeItem(FB_PICTURE_KEY);
    localStorage.removeItem('tarot_user_name');
    // Generate new anonymous ID
    const newId = 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('tarot_user_id', newId);
}

// Text morph/scramble effect (like AI thinking animation)
// Smoothly transitions from one text to another via random characters
// Length gradually changes character-by-character so no abrupt jump
function morphText(element, newText, duration = 600) {
    if (!element) return Promise.resolve();
    const oldText = element.textContent || '';
    if (oldText === newText) return Promise.resolve();

    return new Promise(resolve => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const oldLen = oldText.length;
        const newLen = newText.length;
        const maxLen = Math.max(oldLen, newLen);
        const steps = 14;
        const stepTime = duration / steps;
        let step = 0;

        // Each character "locks in" at a staggered time (left to right)
        const lockStep = new Array(newLen);
        for (let i = 0; i < newLen; i++) {
            lockStep[i] = Math.floor((i / Math.max(newLen, 1)) * steps * 0.55) + Math.floor(steps * 0.35);
        }

        const timer = setInterval(() => {
            step++;
            // Smoothly transition visible length from oldLen to newLen
            const progress = step / steps;
            const currentLen = Math.round(oldLen + (newLen - oldLen) * progress);

            let display = '';
            for (let i = 0; i < currentLen; i++) {
                if (i < newLen && step >= lockStep[i]) {
                    // This character is locked in — show final
                    display += newText[i];
                } else if (step <= 2 && i < oldLen) {
                    // First 2 steps — show original character
                    display += oldText[i];
                } else {
                    // Scramble phase
                    display += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = display;

            if (step >= steps) {
                clearInterval(timer);
                element.textContent = newText;
                resolve();
            }
        }, stepTime);
    });
}

// Update button appearance
function updateFacebookButton(isLoggedIn, userName = '', pictureUrl = '', animate = false) {
    const btn = document.getElementById('facebookConnectBtn');
    const btnText = document.getElementById('fbBtnText');
    const fbIcon = document.getElementById('fbIcon');
    const profilePic = document.getElementById('fbProfilePic');

    if (!btn || !btnText) return;

    if (isLoggedIn && userName) {
        btn.classList.add('connected');
        if (animate && btnText.textContent !== userName && btnText.textContent !== 'Login') {
            morphText(btnText, userName, 500);
        } else {
            btnText.textContent = userName;
        }
        if (fbIcon) fbIcon.style.display = 'none';
        if (profilePic && pictureUrl) {
            profilePic.src = pictureUrl;
            profilePic.style.display = 'block';
        }
    } else {
        btn.classList.remove('connected');
        btnText.textContent = 'Login';
        if (fbIcon) fbIcon.style.display = 'block';
        if (profilePic) {
            profilePic.src = '';
            profilePic.style.display = 'none';
        }
    }
}

// Get FB user ID (without fb_ prefix)
function getFbUserId() {
    if (fbUser && fbUser.id) return fbUser.id;
    const storedId = localStorage.getItem('tarot_user_id');
    if (storedId && storedId.startsWith('fb_')) return storedId.replace('fb_', '');
    return null;
}

// Get current user
function getFacebookUser() {
    return fbUser;
}

// Check if user is connected
function isFacebookConnected() {
    return (fbUser && fbUser.id) || localStorage.getItem(FB_CONNECTED_KEY) === 'true';
}

// Sync draw history from Firebase on login
async function syncDrawHistoryOnLogin(fbUserId) {
    if (!window.cardCounter || !window.cardCounter.fetchUserDraws) return;

    try {
        const firebaseDraws = await window.cardCounter.fetchUserDraws(fbUserId);
        if (firebaseDraws.length === 0) return;

        // Get existing local draws
        const localDraws = JSON.parse(localStorage.getItem('tarot_draw_history') || '[]');

        // Merge: Firebase as source of truth, append unique local draws
        const firebaseTimestamps = new Set(firebaseDraws.map(function(d) { return d.timestamp; }));
        const uniqueLocalDraws = localDraws.filter(function(d) { return !firebaseTimestamps.has(d.timestamp); });

        const merged = firebaseDraws.concat(uniqueLocalDraws)
            .sort(function(a, b) { return (b.timestamp || 0) - (a.timestamp || 0); })
            .slice(0, 50);

        localStorage.setItem('tarot_draw_history', JSON.stringify(merged));
    } catch (e) {
        console.warn('Failed to sync draw history:', e.message);
    }
}

// Close profile dropdown when clicking outside
document.addEventListener('click', function(e) {
    const profileSwitcher = document.getElementById('profileSwitcher');
    if (profileSwitcher && !profileSwitcher.contains(e.target)) {
        profileSwitcher.classList.remove('open');
    }
});
