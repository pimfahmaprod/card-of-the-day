// ─────────────────────────────────────────────────────────────────────────────
// PWA Install Prompt — Card of the Day
// ─────────────────────────────────────────────────────────────────────────────
// Timing: shown after the user completes a reading (blessing screen).
// Android/Chrome: uses native beforeinstallprompt.
// iOS Safari: shows step-by-step modal.
// Dismissed state stored in localStorage for 14 days.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
    'use strict';

    var DISMISS_KEY = 'pwa_dismiss_until';
    var DISMISS_DAYS = 14;

    var deferredPrompt = null;
    var bannerShown = false;

    // ── Detect environment ───────────────────────────────────────────────────
    var isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    var isInStandalone = (
        window.navigator.standalone === true ||
        window.matchMedia('(display-mode: standalone)').matches
    );

    // ── Mobile/touch only — skip on desktop browsers (UA-based, reliable) ───
    var isMobileUA = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!isMobileUA) return;

    // ── Already installed as PWA → skip everything ───────────────────────────
    if (isInStandalone) return;

    // ── Dismissed recently → skip ────────────────────────────────────────────
    function isDismissed() {
        var until = localStorage.getItem(DISMISS_KEY);
        if (!until) return false;
        return Date.now() < parseInt(until, 10);
    }

    function markDismissed() {
        var until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(DISMISS_KEY, String(until));
    }

    // ── Capture Chrome/Android install event ─────────────────────────────────
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
    });

    window.addEventListener('appinstalled', function () {
        deferredPrompt = null;
        hideBanner();
        hideIosModal();
        var badge = document.getElementById('pwaStaticBadge');
        if (badge) badge.style.display = 'none';
    });

    // ── Landing page trigger (3 s after load) ────────────────────────────────
    function isOnLanding() {
        var lp = document.getElementById('landingPage');
        return lp && !lp.classList.contains('hidden');
    }

    function tryShowOnLanding() {
        if (bannerShown) return;
        if (isDismissed()) return;
        if (!isOnLanding()) return;
        if (isIOS) {
            showIosModal();
        } else if (deferredPrompt) {
            showBanner();
        }
        // Other browsers (Firefox, Samsung etc.) — no standard API, skip
    }

    function initLandingTrigger() {
        setTimeout(tryShowOnLanding, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLandingTrigger);
    } else {
        initLandingTrigger();
    }

    // ── Public trigger — called by app.js after blessing screen ─────────────
    // Now only shows the static badge (sliding banner is landing-page only)
    window.pwaShowInstallPrompt = function () {
        if (isInStandalone) return;
        pwaInitStaticBadge();
    };

    // ── Static Badge (always visible on blessing screen) ─────────────────────
    function pwaInitStaticBadge() {
        var badge = document.getElementById('pwaStaticBadge');
        if (!badge) return;
        // Show for iOS (always) or when native prompt is available (Android)
        if (!isIOS && !deferredPrompt) return;

        badge.style.display = 'inline-flex';
        badge.offsetHeight; // eslint-disable-line no-unused-expressions
        badge.classList.add('pwa-static-badge--visible');

        badge.onclick = function () {
            var modal = document.getElementById('pwaIosModal');
            if (modal && modal.classList.contains('pwa-ios-modal--visible')) return;
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function (choice) {
                    deferredPrompt = null;
                    if (choice.outcome === 'accepted') {
                        badge.style.display = 'none';
                    }
                });
            } else if (isIOS) {
                showIosModal();
            }
        };
    }

    // ── Banner (Android/Chrome) ──────────────────────────────────────────────
    function showBanner() {
        var banner = document.getElementById('pwaInstallBanner');
        if (!banner) return;
        bannerShown = true;

        // Step 1: make visible in DOM (still off-screen via transform: translateY(100%))
        banner.style.display = 'block';
        // Step 2: force reflow so CSS transition fires on next paint
        banner.offsetHeight; // eslint-disable-line no-unused-expressions
        // Step 3: slide in
        banner.classList.add('pwa-banner--visible');

        document.getElementById('pwaInstallBtn').onclick = function () {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function (choice) {
                deferredPrompt = null;
                hideBanner();
                if (choice.outcome !== 'accepted') markDismissed();
            });
        };

        document.getElementById('pwaCloseBtn').onclick = function () {
            hideBanner();
            markDismissed();
        };
    }

    function hideBanner() {
        var banner = document.getElementById('pwaInstallBanner');
        if (!banner) return;
        banner.classList.remove('pwa-banner--visible');
        // Hide from DOM after slide-out transition (400ms)
        setTimeout(function () { banner.style.display = 'none'; }, 420);
    }

    // ── iOS Modal ────────────────────────────────────────────────────────────
    function showIosModal() {
        var modal = document.getElementById('pwaIosModal');
        if (!modal) return;
        bannerShown = true;

        modal.style.display = 'block';
        modal.offsetHeight; // eslint-disable-line no-unused-expressions
        modal.classList.add('pwa-ios-modal--visible');

        document.getElementById('pwaIosClose').onclick = function () {
            hideIosModal();
            markDismissed();
        };

        // Tap outside (.pwa-ios-modal backdrop area) to close
        modal.onclick = function (e) {
            if (e.target === modal) {
                hideIosModal();
                markDismissed();
            }
        };
    }

    function hideIosModal() {
        var modal = document.getElementById('pwaIosModal');
        if (!modal) return;
        modal.classList.remove('pwa-ios-modal--visible');
        setTimeout(function () { modal.style.display = 'none'; }, 420);
    }
})();

// ─────────────────────────────────────────────────────────────────────────────
// Hide lang switcher ONLY on the bare card-selection grid.
// mainPage.visible = true  but  no result/blessing overlay on top → hide.
// As soon as any overlay covers the grid → show lang button again.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
    'use strict';

    function init() {
        var mainPage      = document.getElementById('mainPage');
        var resultPanel   = document.getElementById('resultPanel');
        var blessingScreen = document.getElementById('blessingScreen');
        var centerCard    = document.getElementById('centerCard');
        if (!mainPage) return;

        function sync() {
            var onGrid = mainPage.classList.contains('visible');

            // If any overlay is covering the grid, lang button should be visible
            var covered =
                (resultPanel    && resultPanel.classList.contains('active'))   ||
                (blessingScreen && blessingScreen.classList.contains('active')) ||
                (centerCard     && centerCard.classList.contains('active'));

            document.body.classList.toggle('main-page-active', onGrid && !covered);
        }

        var targets = [mainPage, resultPanel, blessingScreen, centerCard].filter(Boolean);
        var obs = new MutationObserver(sync);
        targets.forEach(function (el) {
            obs.observe(el, { attributes: true, attributeFilter: ['class'] });
        });

        sync();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
