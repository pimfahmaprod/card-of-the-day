/**
 * Card of the Day - Firebase Integration & Analytics
 *
 * @description Firebase Realtime Database integration for:
 * - Card pick tracking
 * - Comment system with replies
 * - Card rankings
 * - Basic analytics
 *
 * @version 1.1.0
 *
 * EXPORTS (via window.cardCounter):
 * - incrementCardPick(cardName) - Track card selection
 * - getTotalPicks() - Get total pick count
 * - submitComment(data) - Submit user comment
 * - fetchComments(limit) - Get recent comments
 * - fetchCommentsByCard(cardName) - Get comments for specific card
 * - submitReply(commentId, data) - Reply to comment
 * - fetchReplies(commentId) - Get replies for comment
 * - fetchCardRankings(limit) - Get popular cards
 * - fetchHotComments(limit) - Get most replied comments
 *
 * FIREBASE DATA PATHS:
 * - /cardPicks/{cardName} - Pick counts per card
 * - /comments/{id} - User comments
 * - /replies/{commentId}/{replyId} - Reply threads
 *
 * SETUP: See FIREBASE_SETUP.md for configuration guide
 */

// ========================================
// Firebase Configuration
// ========================================
// ดูวิธีตั้งค่าได้ที่ FIREBASE_SETUP.md

const firebaseConfig = {
    apiKey: "AIzaSyCVo5U0lntL-rB4x8GkijXew8ajtMDqmhI",
    authDomain: "love-tarot-bf13e.firebaseapp.com",
    databaseURL: "https://card-of-the-day-ea607-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "love-tarot-bf13e",
    storageBucket: "love-tarot-bf13e.firebasestorage.app",
    messagingSenderId: "629888519835",
    appId: "1:629888519835:web:2cd41850f36a0d4378003e"
};

let database = null;
let isFirebaseInitialized = false;

// ========================================
// Local Cache System (reduces Firebase reads)
// ========================================
const CACHE_VERSION = 'v3'; // Increment to clear old caches
const CACHE_PREFIX = `tarot_cache_${CACHE_VERSION}_`;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes (default)
const CACHE_DURATION_LONG = 30 * 60 * 1000; // 30 minutes (for rankings, hot comments)
const CACHE_DURATION_MEDIUM = 15 * 60 * 1000; // 15 minutes (for user-specific data)

// Clear old cache versions on load
(function clearOldCaches() {
    try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('tarot_cache_') && !key.startsWith(CACHE_PREFIX)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        if (keysToRemove.length > 0) {
            console.log('Cleared', keysToRemove.length, 'old cache entries');
        }
    } catch (e) {
        // ignore
    }
})();

// Cache durations per key type
const CACHE_DURATIONS = {
    globalDrawCount: CACHE_DURATION_LONG,
    totalPicks: CACHE_DURATION_LONG,
    cardRankings: CACHE_DURATION_LONG,
    hotComments: CACHE_DURATION_LONG,
    commentsFirstPage: CACHE_DURATION,
    commentsCount: CACHE_DURATION,
    userRepliedTo: CACHE_DURATION_MEDIUM,
    userDraws: CACHE_DURATION_MEDIUM,
    userProfile: CACHE_DURATION_MEDIUM
};

function getCacheDuration(key) {
    // Check if key starts with any known prefix
    for (const [prefix, duration] of Object.entries(CACHE_DURATIONS)) {
        if (key.startsWith(prefix)) return duration;
    }
    return CACHE_DURATION;
}

function getCached(key) {
    try {
        const cached = localStorage.getItem(CACHE_PREFIX + key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const duration = getCacheDuration(key);
        if (Date.now() - timestamp > duration) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

function setCache(key, data) {
    try {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch {
        // localStorage full or unavailable
    }
}

function clearCache(key) {
    try {
        if (key) {
            localStorage.removeItem(CACHE_PREFIX + key);
        }
    } catch {
        // ignore
    }
}

// Check if Firebase is properly configured
function isFirebaseConfigured() {
    return firebaseConfig.apiKey && firebaseConfig.databaseURL;
}

// Initialize Firebase
function initializeFirebase() {
    if (!isFirebaseConfigured()) {
        console.info('Firebase not configured. Counter disabled.');
        return false;
    }

    try {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded');
            return false;
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        database = firebase.database();
        isFirebaseInitialized = true;
        console.log('Firebase initialized (optimized mode)');
        return true;
    } catch (error) {
        console.warn('Firebase initialization failed:', error.message);
        return false;
    }
}

// ========================================
// Card Counter Functions
// ========================================

// Increment counter for a specific card
async function incrementCardCounter(cardId, cardName, userId) {
    if (!isFirebaseInitialized || !database) return null;

    try {
        const cardRef = database.ref(`cardPicks/card_${cardId}`);
        const result = await cardRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        });

        // Clear cache so next read gets fresh data
        clearCache('totalPicks');
        clearCache('cardRankings');

        if (result.committed) {
            return result.snapshot.val();
        }
        return null;
    } catch (error) {
        console.warn('Failed to increment counter:', error.message);
        return null;
    }
}

// Get current count for a specific card
async function getCardCount(cardId) {
    if (!isFirebaseInitialized || !database) return null;

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
        countElement.textContent = count.toLocaleString('th-TH');
        setTimeout(() => {
            counterContainer.classList.add('show');
        }, 300);
    } else {
        counterContainer.classList.remove('show');
    }
}

// Main function to handle card selection counter
async function handleCardPickCounter(cardId) {
    if (!isFirebaseInitialized) {
        const counterContainer = document.getElementById('pickCounter');
        if (counterContainer) counterContainer.classList.remove('show');
        return null;
    }

    const newCount = await incrementCardCounter(cardId);
    updateCounterDisplay(newCount);
    return newCount;
}

// ========================================
// Global Draw Counter (single atomic counter at /globalDrawCount)
// ========================================
async function incrementGlobalDrawCount() {
    if (!isFirebaseInitialized || !database) return null;
    try {
        const ref = database.ref('globalDrawCount');
        const result = await ref.transaction(function(current) {
            return (current || 0) + 1;
        });
        clearCache('globalDrawCount');
        if (result.committed) {
            var newVal = result.snapshot.val();
            updateTotalCounterDisplayValue(newVal);
            return newVal;
        }
        return null;
    } catch (error) {
        console.warn('Failed to increment global draw count:', error.message);
        return null;
    }
}

async function getGlobalDrawCount() {
    if (!isFirebaseInitialized || !database) return null;

    var cached = getCached('globalDrawCount');
    if (cached !== null) return cached;

    try {
        var snapshot = await database.ref('globalDrawCount').once('value');
        var total = snapshot.val() || 0;
        setCache('globalDrawCount', total);
        return total;
    } catch (error) {
        console.warn('Failed to get global draw count:', error.message);
        return null;
    }
}

// Get total picks (legacy — sums per-card picks, used for analytics)
async function getTotalPicks() {
    if (!isFirebaseInitialized || !database) return null;

    const cached = getCached('totalPicks');
    if (cached !== null) return cached;

    try {
        const picksRef = database.ref('cardPicks');
        const snapshot = await picksRef.once('value');
        const data = snapshot.val();

        if (!data) return 0;

        let total = 0;
        Object.values(data).forEach(count => {
            total += count || 0;
        });

        setCache('totalPicks', total);
        return total;
    } catch (error) {
        console.warn('Failed to get total picks:', error.message);
        return null;
    }
}

// Update total counter display
function updateTotalCounterDisplayValue(total) {
    const totalCountElement = document.getElementById('totalPickCount');
    const totalCounterContainer = document.getElementById('totalCounter');

    if (!totalCountElement || !totalCounterContainer) return;

    if (total !== null && total > 0) {
        totalCountElement.textContent = total.toLocaleString('th-TH');
        totalCounterContainer.classList.add('show');
    }
}

// Load global draw count on page load
async function loadTotalPicks() {
    if (!isFirebaseInitialized || !database) return;

    const total = await getGlobalDrawCount();
    updateTotalCounterDisplayValue(total);
}

// Initialize on DOM ready
async function initializeApp() {
    const success = initializeFirebase();
    if (success) {
        // Load once instead of real-time subscription
        loadTotalPicks();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ========================================
// Analytics tracking removed to optimize Firebase costs
// All tracking functions are no-ops
// ========================================
function trackButtonClick() { return null; }
function trackSaveImage() { return null; }
function trackShare() { return null; }
function trackRetry() { return null; }
function trackSocialClick() { return null; }

// ========================================
// Comments Functions
// ========================================

// Blocked users - comments will appear to succeed but won't be saved
const BLOCKED_USERS = ['เต้ต่างดาว'];

async function submitCommentToFirebase(cardId, cardName, cardImage, userId, userName, commentText, profilePicture) {
    if (!isFirebaseInitialized || !database) {
        return { success: false, error: 'Firebase not initialized' };
    }

    // Silently block certain users
    if (BLOCKED_USERS.includes(userName.trim())) {
        return { success: true, id: 'blocked_' + Date.now() };
    }

    try {
        const commentsRef = database.ref('comments');
        const newCommentRef = commentsRef.push();

        const commentData = {
            cardId: cardId,
            cardName: cardName,
            cardImage: cardImage || '',
            userId: userId,
            userName: userName.trim(),
            comment: commentText.trim(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        if (profilePicture) commentData.profilePicture = profilePicture;

        await newCommentRef.set(commentData);

        // Clear comments cache
        clearCache('commentsCount');
        clearCache('commentsFirstPage_10');
        clearCache('hotComments_20');

        return { success: true, id: newCommentRef.key };
    } catch (error) {
        console.warn('Failed to submit comment:', error.message);
        return { success: false, error: error.message };
    }
}

// Update an existing comment's text
async function updateCommentText(commentId, newText) {
    if (!isFirebaseInitialized || !database || !commentId) {
        return { success: false, error: 'Firebase not initialized or missing ID' };
    }
    try {
        var commentRef = database.ref('comments/' + commentId);
        await commentRef.update({ comment: newText.trim() });
        clearCache('commentsFirstPage_10');
        clearCache('hotComments_20');
        return { success: true };
    } catch (error) {
        console.warn('Failed to update comment:', error.message);
        return { success: false, error: error.message };
    }
}

// Get comments count (with cache)
async function getCommentsCount() {
    if (!isFirebaseInitialized || !database) return 0;

    const cached = getCached('commentsCount');
    if (cached !== null) return cached;

    try {
        const commentsRef = database.ref('comments');
        const snapshot = await commentsRef.once('value');
        const count = snapshot.numChildren();
        setCache('commentsCount', count);
        return count;
    } catch (error) {
        console.warn('Failed to get comments count:', error.message);
        return 0;
    }
}

// Subscribe to comments count - DISABLED (use getCommentsCount instead)
function subscribeToCommentsCount(callback) {
    // Load once instead of real-time
    getCommentsCount().then(callback);
}

// Real-time comments listener (only when panel is open)
let commentsListenerRef = null;
let commentsListenerCallback = null;

function subscribeToNewComments(callback) {
    if (!isFirebaseInitialized || !database) return null;

    unsubscribeFromNewComments();

    const commentsRef = database.ref('comments');
    commentsListenerRef = commentsRef;

    commentsListenerCallback = (snapshot) => {
        const comment = {
            id: snapshot.key,
            ...snapshot.val()
        };
        callback(comment);
    };

    commentsListenerRef.on('child_added', commentsListenerCallback);
    return commentsListenerRef;
}

function unsubscribeFromNewComments() {
    if (commentsListenerRef && commentsListenerCallback) {
        commentsListenerRef.off('child_added', commentsListenerCallback);
    }
    commentsListenerRef = null;
    commentsListenerCallback = null;
}

// Fetch comments (with cache for first page)
async function fetchComments(lastKey = null, limit = 10) {
    if (!isFirebaseInitialized || !database) {
        return { comments: [], hasMore: false };
    }

    // Cache only first page (no lastKey)
    const isFirstPage = !lastKey;
    const cacheKey = `commentsFirstPage_${limit}`;

    if (isFirstPage) {
        const cached = getCached(cacheKey);
        if (cached !== null) return cached;
    }

    try {
        const commentsRef = database.ref('comments');
        let query;

        if (lastKey) {
            query = commentsRef.orderByKey().endBefore(lastKey).limitToLast(limit);
        } else {
            query = commentsRef.orderByKey().limitToLast(limit);
        }

        const snapshot = await query.once('value');
        const data = snapshot.val();

        if (!data) {
            return { comments: [], hasMore: false };
        }

        const comments = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
        })).reverse();

        const firstKey = comments.length > 0 ? comments[comments.length - 1].id : null;
        let hasMore = false;

        if (firstKey) {
            const checkMore = await commentsRef.orderByKey().endBefore(firstKey).limitToLast(1).once('value');
            hasMore = checkMore.exists();
        }

        const result = { comments, hasMore, lastKey: firstKey };

        // Cache first page only (skip caching if empty to allow retry)
        if (isFirstPage && comments.length > 0) {
            setCache(cacheKey, result);
        }

        return result;
    } catch (error) {
        console.warn('Failed to fetch comments:', error.message);
        return { comments: [], hasMore: false };
    }
}

async function fetchCommentsByCardId(cardId, excludeCommentId = null, limit = 5) {
    if (!isFirebaseInitialized || !database) return [];

    // Cache for 5 minutes per card
    const cacheKey = `cardComments_${cardId}_${limit}`;
    const cached = getCached(cacheKey);

    // Use cache but still filter excludeCommentId
    if (cached !== null) {
        return cached.filter(c => c.id !== excludeCommentId).slice(0, limit);
    }

    try {
        const commentsRef = database.ref('comments');
        const query = commentsRef.orderByChild('cardId').equalTo(cardId).limitToLast(limit + 1);

        const snapshot = await query.once('value');
        const data = snapshot.val();

        if (!data) return [];

        const comments = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, limit + 1);

        // Cache all fetched comments (before exclusion filter) - only if we have results
        if (comments.length > 0) {
            setCache(cacheKey, comments);
        }

        return comments.filter(c => c.id !== excludeCommentId).slice(0, limit);
    } catch (error) {
        console.warn('Failed to fetch comments by cardId:', error.message);
        return [];
    }
}

// ========================================
// Replies Functions
// ========================================

async function submitReply(commentId, userId, userName, replyText, profilePicture) {
    if (!isFirebaseInitialized || !database) {
        return { success: false, error: 'Firebase not initialized' };
    }

    try {
        const repliesRef = database.ref(`replies/${commentId}`);
        const newReplyRef = repliesRef.push();

        const replyData = {
            userId: userId,
            userName: userName.trim(),
            text: replyText.trim(),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        if (profilePicture) replyData.profilePicture = profilePicture;

        await newReplyRef.set(replyData);

        // Clear hot comments cache (reply counts changed)
        clearCache('hotComments_20');
        clearCache(`userRepliedTo_${userId}_20`);

        return { success: true, id: newReplyRef.key };
    } catch (error) {
        console.warn('Failed to submit reply:', error.message);
        return { success: false, error: error.message };
    }
}

async function fetchReplies(commentId) {
    if (!isFirebaseInitialized || !database) return [];

    try {
        const repliesRef = database.ref(`replies/${commentId}`);
        const snapshot = await repliesRef.orderByChild('timestamp').once('value');
        const data = snapshot.val();

        if (!data) return [];

        const replies = Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

        return replies;
    } catch (error) {
        console.warn('Failed to fetch replies:', error.message);
        return [];
    }
}

async function getReplyCount(commentId) {
    if (!isFirebaseInitialized || !database) return 0;

    try {
        const repliesRef = database.ref(`replies/${commentId}`);
        const snapshot = await repliesRef.once('value');
        return snapshot.numChildren();
    } catch (error) {
        console.warn('Failed to get reply count:', error.message);
        return 0;
    }
}

// Fetch hot comments (simplified - fewer reads)
async function fetchTopCommentsByReplies(limit = 3) {
    if (!isFirebaseInitialized || !database) return [];

    try {
        // Get only last 20 comments to reduce reads
        const commentsRef = database.ref('comments');
        const snapshot = await commentsRef.orderByKey().limitToLast(20).once('value');
        const data = snapshot.val();

        if (!data) return [];

        const comments = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
        }));

        // Get reply counts
        const commentsWithReplies = await Promise.all(
            comments.map(async (comment) => {
                const replyCount = await getReplyCount(comment.id);
                return { ...comment, replyCount };
            })
        );

        return commentsWithReplies
            .filter(c => c.replyCount > 0)
            .sort((a, b) => b.replyCount - a.replyCount)
            .slice(0, limit);
    } catch (error) {
        console.warn('Failed to fetch top comments:', error.message);
        return [];
    }
}

async function fetchHotComments(limit = 20) {
    if (!isFirebaseInitialized || !database) return [];

    // Check cache first (30-min cache)
    const cacheKey = `hotComments_${limit}`;
    const cached = getCached(cacheKey);
    if (cached !== null) return cached;

    try {
        // Fetch replies node to find comments with the most replies
        const repliesRef = database.ref('replies');
        const repliesSnapshot = await repliesRef.once('value');
        const repliesData = repliesSnapshot.val();

        if (!repliesData) return [];

        // Count replies per comment and sort by count
        const topCommentIds = Object.entries(repliesData)
            .map(([commentId, replies]) => ({
                commentId,
                replyCount: Object.keys(replies).length
            }))
            .filter(c => c.replyCount > 0)
            .sort((a, b) => b.replyCount - a.replyCount)
            .slice(0, limit);

        if (topCommentIds.length === 0) return [];

        // Fetch only the top comment details
        const comments = await Promise.all(
            topCommentIds.map(async ({ commentId, replyCount }) => {
                const commentRef = database.ref(`comments/${commentId}`);
                const snapshot = await commentRef.once('value');
                const data = snapshot.val();
                if (!data) return null;
                return { id: commentId, ...data, replyCount };
            })
        );

        const result = comments.filter(c => c !== null);
        // Only cache if we have results
        if (result.length > 0) {
            setCache(cacheKey, result);
        }
        return result;
    } catch (error) {
        console.warn('Failed to fetch hot comments:', error.message);
        return [];
    }
}

async function fetchCommentsByUserId(userId, limit = 50) {
    if (!isFirebaseInitialized || !database || !userId) return [];

    try {
        const commentsRef = database.ref('comments');
        const query = commentsRef.orderByChild('userId').equalTo(userId);

        const snapshot = await query.once('value');
        const data = snapshot.val();

        if (!data) return [];

        return Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, limit);
    } catch (error) {
        console.warn('Failed to fetch user comments:', error.message);
        return [];
    }
}

// Fetch comments by multiple user IDs (for friends feed)
async function fetchCommentsByUserIds(userIds, limit = 50) {
    if (!isFirebaseInitialized || !database || !userIds || userIds.length === 0) return [];
    try {
        const promises = userIds.map(uid => fetchCommentsByUserId(uid, limit));
        const results = await Promise.all(promises);
        return results.flat()
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, limit);
    } catch (error) {
        console.warn('Failed to fetch friends comments:', error.message);
        return [];
    }
}

// Fetch comments that user has replied to (cards they interacted with)
async function fetchCommentsUserRepliedTo(userId, limit = 20) {
    if (!isFirebaseInitialized || !database || !userId) return [];

    // Check cache first (15-min cache per user)
    const cacheKey = `userRepliedTo_${userId}_${limit}`;
    const cached = getCached(cacheKey);
    if (cached !== null) return cached;

    try {
        // Get all replies
        const repliesRef = database.ref('replies');
        const snapshot = await repliesRef.once('value');
        const allReplies = snapshot.val();

        if (!allReplies) return [];

        // Find comment IDs where this user has replied
        const commentIdsWithUserReply = new Set();
        for (const [commentId, replies] of Object.entries(allReplies)) {
            for (const reply of Object.values(replies)) {
                if (reply.userId === userId) {
                    commentIdsWithUserReply.add(commentId);
                    break;
                }
            }
        }

        if (commentIdsWithUserReply.size === 0) return [];

        // Fetch only needed comments instead of all comments
        const repliedComments = [];
        const commentIds = Array.from(commentIdsWithUserReply);

        // Batch fetch only the needed comments (max 20)
        const idsToFetch = commentIds.slice(0, limit * 2); // Fetch extra to account for filtering

        await Promise.all(
            idsToFetch.map(async (commentId) => {
                const commentRef = database.ref(`comments/${commentId}`);
                const commentSnapshot = await commentRef.once('value');
                const commentData = commentSnapshot.val();
                if (commentData && commentData.userId !== userId) {
                    repliedComments.push({
                        id: commentId,
                        ...commentData
                    });
                }
            })
        );

        // Sort by timestamp and limit
        const result = repliedComments
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
            .slice(0, limit);

        // Only cache if we have results
        if (result.length > 0) {
            setCache(cacheKey, result);
        }
        return result;
    } catch (error) {
        console.warn('Failed to fetch comments user replied to:', error.message);
        return [];
    }
}

// Fetch card rankings (with cache)
async function fetchCardRankings(limit = 5) {
    if (!isFirebaseInitialized || !database) return [];

    const cached = getCached('cardRankings');
    if (cached !== null) return cached;

    try {
        const cardPicksRef = database.ref('cardPicks');
        const snapshot = await cardPicksRef.once('value');
        const data = snapshot.val();

        if (!data) return [];

        const rankings = Object.entries(data)
            .map(([key, count]) => {
                const cardId = key.replace('card_', '');
                return { cardId, count };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);

        setCache('cardRankings', rankings);
        return rankings;
    } catch (error) {
        console.warn('Failed to fetch card rankings:', error.message);
        return [];
    }
}

// ========================================
// All analytics tracking disabled to optimize Firebase costs
// ========================================
function trackFeatureUsage() { return null; }
function trackMusicToggle() { return null; }
function trackCommentsPanel() { return null; }
function trackRankingPanel() { return null; }
function trackEvent() { return null; }
function trackJourneyStep() { return null; }
function trackTimeToFirstPick() { return null; }
function trackInterpretationScroll() { return null; }
function trackCardPosition() { return null; }
function trackDeviceType() { return null; }
function trackCommentFormStart() { return null; }
function trackCommentFormAbandon() { return null; }
function trackCommentFormSubmit() { return null; }
function fetchAnalyticsSummary() { return null; }

// ========================================
// User Draw History & Profile (per-user Firebase data)
// ========================================

async function saveUserDraw(fbUserId, drawData) {
    if (!isFirebaseInitialized || !database || !fbUserId) return null;
    try {
        const drawsRef = database.ref('users/' + fbUserId + '/draws');
        const newDrawRef = drawsRef.push();
        await newDrawRef.set({
            cardId: drawData.cardId,
            cardName: drawData.cardName,
            cardImage: drawData.cardImage,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            comment: drawData.comment || ''
        });
        clearCache('userDraws_' + fbUserId);
        return { success: true, id: newDrawRef.key };
    } catch (error) {
        console.warn('Failed to save user draw:', error.message);
        return null;
    }
}

async function fetchUserDraws(fbUserId, limit) {
    limit = limit || 50;
    if (!isFirebaseInitialized || !database || !fbUserId) return [];

    const cacheKey = 'userDraws_' + fbUserId;
    const cached = getCached(cacheKey);
    if (cached !== null) return cached;

    try {
        const drawsRef = database.ref('users/' + fbUserId + '/draws');
        const query = drawsRef.orderByKey().limitToLast(limit);
        const snapshot = await query.once('value');
        const data = snapshot.val();
        if (!data) return [];

        const draws = Object.entries(data)
            .map(function(entry) { return { id: entry[0], ...entry[1] }; })
            .sort(function(a, b) { return (b.timestamp || 0) - (a.timestamp || 0); });

        setCache(cacheKey, draws);
        return draws;
    } catch (error) {
        console.warn('Failed to fetch user draws:', error.message);
        return [];
    }
}

async function saveUserProfile(fbUserId, profileData) {
    if (!isFirebaseInitialized || !database || !fbUserId) return null;
    try {
        const profileRef = database.ref('users/' + fbUserId + '/profile');
        await profileRef.update(profileData);
        clearCache('userProfile_' + fbUserId);
        return { success: true };
    } catch (error) {
        console.warn('Failed to save user profile:', error.message);
        return null;
    }
}

async function fetchUserProfile(fbUserId) {
    if (!isFirebaseInitialized || !database || !fbUserId) return null;

    const cacheKey = 'userProfile_' + fbUserId;
    const cached = getCached(cacheKey);
    if (cached !== null) return cached;

    try {
        const profileRef = database.ref('users/' + fbUserId + '/profile');
        const snapshot = await profileRef.once('value');
        const data = snapshot.val();
        if (data) setCache(cacheKey, data);
        return data;
    } catch (error) {
        console.warn('Failed to fetch user profile:', error.message);
        return null;
    }
}

// Fetch replies from other users to my comments
async function fetchRepliesToMyComments(userId, limit = 50) {
    if (!isFirebaseInitialized || !database || !userId) return [];

    const cacheKey = `repliesToMe_${userId}`;
    const cached = getCached(cacheKey);
    if (cached !== null) return cached;

    try {
        // Get user's own comments
        const myComments = await fetchCommentsByUserId(userId, limit);
        if (myComments.length === 0) return [];

        // Fetch replies for each comment in parallel
        const allResults = [];
        await Promise.all(myComments.map(async function(comment) {
            const replies = await fetchReplies(comment.id);
            replies.forEach(function(reply) {
                // Only include replies from OTHER users
                if (reply.userId !== userId) {
                    allResults.push({
                        reply: reply,
                        commentId: comment.id,
                        commentData: comment
                    });
                }
            });
        }));

        // Sort newest first
        allResults.sort(function(a, b) {
            return (b.reply.timestamp || 0) - (a.reply.timestamp || 0);
        });

        if (allResults.length > 0) {
            setCache(cacheKey, allResults, CACHE_DURATION);
        }
        return allResults;
    } catch (error) {
        console.warn('Failed to fetch replies to my comments:', error.message);
        return [];
    }
}

// ========================================
// Lightweight Polling Functions (minimal Firebase reads)
// ========================================

// Fetch all new comments since a timestamp (1 Firebase read)
async function fetchNewCommentsSince(sinceTimestamp) {
    if (!isFirebaseInitialized || !database) return [];
    try {
        var commentsRef = database.ref('comments');
        var query = commentsRef
            .orderByChild('timestamp')
            .startAt(sinceTimestamp + 1);
        var snapshot = await query.once('value');
        var data = snapshot.val();
        if (!data) return [];
        return Object.entries(data).map(function(entry) {
            return Object.assign({ id: entry[0] }, entry[1]);
        });
    } catch (error) {
        console.warn('fetchNewCommentsSince failed:', error.message);
        return [];
    }
}

// Fetch new replies for specific comments since a timestamp (1 read per commentId, capped at 10)
async function fetchNewRepliesForComments(commentIds, sinceTimestamp) {
    if (!isFirebaseInitialized || !database || !commentIds || commentIds.length === 0) return [];
    var idsToCheck = commentIds.slice(0, 10);
    var results = [];
    try {
        await Promise.all(idsToCheck.map(async function(commentId) {
            var repliesRef = database.ref('replies/' + commentId);
            var query = repliesRef
                .orderByChild('timestamp')
                .startAt(sinceTimestamp + 1);
            var snapshot = await query.once('value');
            var data = snapshot.val();
            if (data) {
                Object.entries(data).forEach(function(entry) {
                    results.push(Object.assign({ replyId: entry[0], commentId: commentId }, entry[1]));
                });
            }
        }));
        return results;
    } catch (error) {
        console.warn('fetchNewRepliesForComments failed:', error.message);
        return [];
    }
}

// ========================================
// Export for use in app.js
// ========================================
window.cardCounter = {
    // Core: card picks
    increment: handleCardPickCounter,
    getCount: getCardCount,
    getTotal: getTotalPicks,
    incrementGlobalDraw: incrementGlobalDrawCount,
    getGlobalDrawCount: getGlobalDrawCount,
    updateDisplay: updateCounterDisplay,
    isEnabled: () => isFirebaseInitialized,
    // Comments & replies
    submitComment: submitCommentToFirebase,
    updateComment: updateCommentText,
    fetchComments: fetchComments,
    fetchCommentsByCardId: fetchCommentsByCardId,
    getCommentsCount: getCommentsCount,
    subscribeToCommentsCount: subscribeToCommentsCount,
    subscribeToNewComments: subscribeToNewComments,
    unsubscribeFromNewComments: unsubscribeFromNewComments,
    submitReply: submitReply,
    fetchReplies: fetchReplies,
    getReplyCount: getReplyCount,
    fetchTopCommentsByReplies: fetchTopCommentsByReplies,
    fetchHotComments: fetchHotComments,
    fetchCommentsByUserId: fetchCommentsByUserId,
    fetchCommentsByUserIds: fetchCommentsByUserIds,
    fetchCommentsUserRepliedTo: fetchCommentsUserRepliedTo,
    fetchCardRankings: fetchCardRankings,
    // User draw history & profile
    saveUserDraw: saveUserDraw,
    fetchUserDraws: fetchUserDraws,
    saveUserProfile: saveUserProfile,
    fetchUserProfile: fetchUserProfile,
    clearProfileCache: function(fbUserId) { clearCache('userProfile_' + fbUserId); },
    fetchRepliesToMyComments: fetchRepliesToMyComments,
    // Lightweight polling
    fetchNewCommentsSince: fetchNewCommentsSince,
    fetchNewRepliesForComments: fetchNewRepliesForComments
};
