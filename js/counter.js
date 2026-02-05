// Firebase Configuration for Card Counter
// ========================================
// ดูวิธีตั้งค่าได้ที่ FIREBASE_SETUP.md
//
// ขั้นตอนย่อ:
// 1. สร้าง Firebase Project ที่ https://console.firebase.google.com/
// 2. เปิด Realtime Database
// 3. สร้าง Web App แล้วคัดลอก config มาใส่ด้านล่าง

const firebaseConfig = {
    apiKey: "AIzaSyCVo5U0lntL-rB4x8GkijXew8ajtMDqmhI",
    authDomain: "love-tarot-bf13e.firebaseapp.com",
    databaseURL: "https://love-tarot-bf13e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-tarot-bf13e",
    storageBucket: "love-tarot-bf13e.firebasestorage.app",
    messagingSenderId: "629888519835",
    appId: "1:629888519835:web:2cd41850f36a0d4378003e"
};

let database = null;
let isFirebaseInitialized = false;

// Check if Firebase is properly configured
function isFirebaseConfigured() {
    return firebaseConfig.apiKey && firebaseConfig.databaseURL;
}

// Initialize Firebase
function initializeFirebase() {
    // Skip if not configured
    if (!isFirebaseConfigured()) {
        console.info('Firebase not configured. Counter disabled. See FIREBASE_SETUP.md for setup instructions.');
        return false;
    }

    try {
        // Check if Firebase SDK is loaded
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded');
            return false;
        }

        // Initialize Firebase app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        database = firebase.database();
        isFirebaseInitialized = true;
        console.log('Firebase counter initialized successfully');
        return true;
    } catch (error) {
        console.warn('Firebase initialization failed:', error.message);
        return false;
    }
}

// Increment counter for a specific card
async function incrementCardCounter(cardId) {
    if (!isFirebaseInitialized || !database) {
        return null;
    }

    try {
        const cardRef = database.ref(`cardPicks/card_${cardId}`);

        // Use transaction to safely increment
        const result = await cardRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        });

        if (result.committed) {
            const newCount = result.snapshot.val();
            console.log(`Card ${cardId} total picks: ${newCount}`);
            return newCount;
        }
        return null;
    } catch (error) {
        console.warn('Failed to increment counter:', error.message);
        return null;
    }
}

// Get current count for a specific card
async function getCardCount(cardId) {
    if (!isFirebaseInitialized || !database) {
        return null;
    }

    try {
        const cardRef = database.ref(`cardPicks/card_${cardId}`);
        const snapshot = await cardRef.once('value');
        return snapshot.val() || 0;
    } catch (error) {
        console.warn('Failed to get counter:', error.message);
        return null;
    }
}

// Update the counter display in the UI
function updateCounterDisplay(count) {
    const countElement = document.getElementById('pickCountNumber');
    const counterContainer = document.getElementById('pickCounter');

    if (!countElement || !counterContainer) return;

    if (count !== null && count !== undefined) {
        // Format number with commas
        countElement.textContent = count.toLocaleString('th-TH');

        // Show with animation
        setTimeout(() => {
            counterContainer.classList.add('show');
        }, 300);
    } else {
        // Hide counter if no data
        counterContainer.classList.remove('show');
    }
}

// Main function to handle card selection counter
async function handleCardPickCounter(cardId) {
    if (!isFirebaseInitialized) {
        // Hide counter if Firebase not available
        const counterContainer = document.getElementById('pickCounter');
        if (counterContainer) counterContainer.classList.remove('show');
        return null;
    }

    // Increment the counter
    const newCount = await incrementCardCounter(cardId);

    // Update display
    updateCounterDisplay(newCount);

    return newCount;
}

// Get total picks across all cards
async function getTotalPicks() {
    if (!isFirebaseInitialized || !database) {
        return null;
    }

    try {
        const picksRef = database.ref('cardPicks');
        const snapshot = await picksRef.once('value');
        const data = snapshot.val();

        if (!data) return 0;

        let total = 0;
        Object.values(data).forEach(count => {
            total += count || 0;
        });
        return total;
    } catch (error) {
        console.warn('Failed to get total picks:', error.message);
        return null;
    }
}

// Update total counter display (used by real-time listener)
function updateTotalCounterDisplayValue(total) {
    const totalCountElement = document.getElementById('totalPickCount');
    const totalCounterContainer = document.getElementById('totalCounter');

    if (!totalCountElement || !totalCounterContainer) return;

    if (total !== null && total > 0) {
        totalCountElement.textContent = total.toLocaleString('th-TH');
        totalCounterContainer.classList.add('show');
    }
}

// Subscribe to real-time updates for total picks
function subscribeToTotalPicks() {
    if (!isFirebaseInitialized || !database) return;

    const picksRef = database.ref('cardPicks');

    // Listen for real-time updates
    picksRef.on('value', (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            updateTotalCounterDisplayValue(0);
            return;
        }

        let total = 0;
        Object.values(data).forEach(count => {
            total += count || 0;
        });

        updateTotalCounterDisplayValue(total);
    }, (error) => {
        console.warn('Real-time listener error:', error.message);
    });
}

// Initialize on DOM ready
async function initializeApp() {
    const success = initializeFirebase();
    if (success) {
        // Subscribe to real-time updates for landing page counter
        subscribeToTotalPicks();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for use in app.js
window.cardCounter = {
    increment: handleCardPickCounter,
    getCount: getCardCount,
    getTotal: getTotalPicks,
    updateDisplay: updateCounterDisplay,
    isEnabled: () => isFirebaseInitialized
};
