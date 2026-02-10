// Facebook Login Integration for Card of the Day
// ============================================

const FACEBOOK_APP_ID = '940915038262874';
const FB_PICTURE_KEY = 'tarot_fb_picture';
const FB_CONNECTED_KEY = 'tarot_fb_connected';

let fbUser = null;

// Initialize Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v21.0'
    });

    FB.getLoginStatus(function(response) {
        handleStatusChange(response);
    });
};

// Handle login status changes
function handleStatusChange(response) {
    if (response.status === 'connected') {
        fbUser = response.authResponse;
        fetchUserProfile();
    } else {
        fbUser = null;
        // If was previously FB-connected but session expired, keep local data
        if (!localStorage.getItem(FB_CONNECTED_KEY)) {
            updateFacebookButton(false);
        } else {
            // Try to restore from localStorage
            const savedName = localStorage.getItem('tarot_user_name');
            const savedPic = localStorage.getItem(FB_PICTURE_KEY);
            if (savedName && savedPic) {
                updateFacebookButton(true, savedName, savedPic);
            } else {
                clearFacebookData();
                updateFacebookButton(false);
            }
        }
    }
}

// Fetch user profile info
function fetchUserProfile() {
    FB.api('/me', { fields: 'id,name,picture.type(normal)' }, function(response) {
        if (response && !response.error) {
            fbUser = {
                ...fbUser,
                id: response.id,
                name: response.name,
                picture: response.picture?.data?.url
            };

            // Save to localStorage for integration with existing user system
            localStorage.setItem('tarot_user_id', 'fb_' + response.id);
            localStorage.setItem('tarot_user_name', response.name);
            localStorage.setItem(FB_CONNECTED_KEY, 'true');
            if (response.picture?.data?.url) {
                localStorage.setItem(FB_PICTURE_KEY, response.picture.data.url);
            }

            updateFacebookButton(true, response.name, response.picture?.data?.url);

            // Track FB login
            if (window.cardCounter) {
                window.cardCounter.trackFeatureUsage('facebookLogin', 'connected');
            }
        }
    });
}

// Main connect function
function connectWithFacebook() {
    if (fbUser && fbUser.id) {
        showFacebookOptions();
    } else {
        loginWithFacebook();
    }
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
    FB.logout(function() {
        fbUser = null;
        clearFacebookData();
        updateFacebookButton(false);
    });
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

// Show options when already connected
function showFacebookOptions() {
    const choice = confirm(`เชื่อมต่อเป็น ${fbUser.name} อยู่\n\nกด OK เพื่อดูไพ่ของเพื่อน\nกด Cancel เพื่อออกจากระบบ`);
    if (choice) {
        viewFriendsCards();
    } else {
        logoutFromFacebook();
    }
}

// View friends' cards (placeholder)
function viewFriendsCards() {
    alert('ฟีเจอร์ดูไพ่ของเพื่อนกำลังพัฒนา\n\nFriends\' cards feature coming soon!');
}

// Update button appearance
function updateFacebookButton(isLoggedIn, userName = '', pictureUrl = '') {
    const btn = document.getElementById('facebookConnectBtn');
    const btnText = document.getElementById('fbBtnText');
    const fbIcon = document.getElementById('fbIcon');
    const profilePic = document.getElementById('fbProfilePic');

    if (!btn || !btnText) return;

    if (isLoggedIn && userName) {
        btn.classList.add('connected');
        btnText.textContent = userName;
        if (fbIcon) fbIcon.style.display = 'none';
        if (profilePic && pictureUrl) {
            profilePic.src = pictureUrl;
            profilePic.style.display = 'block';
        }
    } else {
        btn.classList.remove('connected');
        btnText.textContent = '';
        if (fbIcon) fbIcon.style.display = 'block';
        if (profilePic) {
            profilePic.src = '';
            profilePic.style.display = 'none';
        }
    }
}

// Get current user
function getFacebookUser() {
    return fbUser;
}

// Check if user is connected
function isFacebookConnected() {
    return (fbUser && fbUser.id) || localStorage.getItem(FB_CONNECTED_KEY) === 'true';
}
