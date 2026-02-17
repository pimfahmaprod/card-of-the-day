/**
 * Card of the Day - Main Application Script
 *
 * @description Core application logic for the tarot card reading app
 * @version 1.1.0
 *
 * DEPENDENCIES (must load before this file):
 * - js/translations.js (provides: translations, cardNameTranslations)
 * - js/card-interpretations.js (provides: cardInterpretations)
 *
 * MAIN SECTIONS:
 * - Lines 1-200: i18n & Language switching
 * - Lines 200-500: Card grid & selection
 * - Lines 500-1000: Result display & animations
 * - Lines 1000-1500: Image generation (saveImage)
 * - Lines 1500-2000: Comment system
 * - Lines 2000-3000: Blessing screen & effects
 * - Lines 3000+: Utilities & initialization
 *
 * KEY FUNCTIONS:
 * - initApp() - Entry point
 * - createCardGrid() - Renders 78 cards
 * - selectCard(card) - Handles card selection
 * - showResult() - Displays prediction
 * - saveImage(format) - Generates shareable images
 * - setLanguage(lang) - Changes UI language
 */

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

let tarotData = null;
let selectedCardElement = null;
let isAnimating = false;
let isPageReady = false;

// Auto-save draw state: tracks the Firebase comment ID for the current draw
let _currentDrawCommentId = null;
// Pending draw for non-FB users: saved to Firebase after login
let _pendingDraw = null;

// ========================================
// Reading Mode (single / three-card)
// ========================================
const READING_MODES = [
    { id: 'single', headingKey: 'landing.heading', clickKey: 'landing.clickToDraw' },
    { id: 'three-card', headingKey: 'landing.heading3', clickKey: 'landing.clickToDraw3' },
    { id: 'four-card', headingKey: 'landing.heading4', clickKey: 'landing.clickToDraw4' },
    { id: 'ten-card', headingKey: 'landing.heading10', clickKey: 'landing.clickToDraw10', disabled: true },
    { id: 'twelve-card', headingKey: 'landing.heading12', clickKey: 'landing.clickToDraw12', disabled: true }
];

function isCurrentModeDisabled() {
    return !!(READING_MODES[currentModeIndex] && READING_MODES[currentModeIndex].disabled);
}

let currentModeIndex = 0;
let currentReadingMode = 'single';
let currentReadingCategory = null; // 'love', 'work', or 'finance'
var _modeAnimTimer = null; // cancel overlapping mode switch animations

// Multi-card selection state
var multiCardSelections = [];   // [{card, positionKey}]
var multiCardPositions = [];    // ['past','present','future'] or +['outcome']
var multiCardTarget = 0;        // 3 or 4 (0 = single mode)
var _multiDisabledCards = [];   // track disabled card elements across picks

// ========================================
// Internationalization (i18n)
// ========================================
let currentLang = 'th';


// Translation data is loaded from external files:
// - js/translations.js (UI translations + card name translations)
// - js/card-interpretations.js (card interpretations)

// Get translated card name
function getCardName(englishName) {
    if (currentLang === 'th' || currentLang === 'en') {
        return englishName;
    }
    const trans = cardNameTranslations[englishName];
    return trans && trans[currentLang] ? trans[currentLang] : englishName;
}

// Get translated quote
function getCardQuote(card) {
    if (currentLang === 'th') {
        return card.quote;
    }
    const trans = cardInterpretations[card.name];
    if (trans && trans[currentLang] && trans[currentLang].quote) {
        return trans[currentLang].quote;
    }
    // Fallback to English if available, otherwise Thai
    if (trans && trans.en && trans.en.quote) {
        return trans.en.quote;
    }
    return card.quote;
}

// Get translated interpretation
function getCardInterpretation(card) {
    if (currentLang === 'th') {
        return card.interpretation;
    }
    const trans = cardInterpretations[card.name];
    if (trans && trans[currentLang] && trans[currentLang].interpretation) {
        return trans[currentLang].interpretation;
    }
    // Fallback to English if available, otherwise Thai
    if (trans && trans.en && trans.en.interpretation) {
        return trans.en.interpretation;
    }
    return card.interpretation;
}

// Get translated category field (love, work, finance, health, loveQuote, etc.)
function getCardCategoryField(card, fieldName) {
    if (currentLang === 'th') {
        return card[fieldName] || '';
    }
    if (typeof cardCategoryTranslations !== 'undefined') {
        var trans = cardCategoryTranslations[card.name];
        if (trans && trans[currentLang] && trans[currentLang][fieldName]) {
            return trans[currentLang][fieldName];
        }
        if (trans && trans.en && trans.en[fieldName]) {
            return trans.en[fieldName];
        }
    }
    return card[fieldName] || '';
}

// Set interpretation text as paragraphs (split on blank lines)
function setInterpretationHTML(el, text) {
    var paragraphs = text.split(/\n\s*\n/);
    el.innerHTML = paragraphs.map(function(p) {
        // Escape HTML and preserve single line breaks
        var safe = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return '<p>' + safe + '</p>';
    }).join('');
}

// Get translation by key path (e.g., "landing.instruction")
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to Thai
            value = translations['th'];
            for (const fk of keys) {
                if (value && value[fk] !== undefined) {
                    value = value[fk];
                } else {
                    return key;
                }
            }
            return value;
        }
    }
    return value;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated !== undefined && translated !== null && translated !== key) {
            el.textContent = translated;
        }
    });

    // Handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = t(key);
        if (translated && translated !== key) {
            el.placeholder = translated;
        }
    });

    // Handle title attributes (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translated = t(key);
        if (translated && translated !== key) {
            el.title = translated;
        }
    });
}

// Set language and save to localStorage
function setLanguage(lang) {
    if (!translations[lang]) return;

    gtag('event', 'language_change', {
        event_category: 'settings',
        language: lang
    });

    currentLang = lang;
    localStorage.setItem('tarot-lang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang;

    // Apply translations
    applyTranslations();

    // Update language button display
    updateLangButton();

    // Update dynamic content that's already displayed
    refreshDynamicContent();
}

// Refresh dynamic content when language changes
function refreshDynamicContent() {
    // Update result panel if visible and has card data
    if (currentCardData) {
        const resultCardName = document.getElementById('resultCardName');
        const resultQuote = document.getElementById('resultQuote');
        const resultInterpretation = document.getElementById('resultInterpretation');

        if (resultCardName) {
            resultCardName.textContent = getCardName(currentCardData.name);
        }
        if (resultQuote) {
            resultQuote.textContent = getCardQuote(currentCardData);
        }
        if (resultInterpretation) {
            setInterpretationHTML(resultInterpretation, getCardInterpretation(currentCardData));
        }

        // Re-check card comments to update button text
        checkCardComments(currentCardData.id);

    }

    // Refresh comments section dividers if on mycard tab
    if (currentCommentsTab === 'mycard') {
        loadMyCardComments();
    }

    // Refresh My Card tab text
    const myCardTab = document.querySelector('[data-tab="mycard"]');
    if (myCardTab) {
        myCardTab.textContent = t('comments.tabMyCard');
    }
}

// Update the language button to show current language
function updateLangButton() {
    const langBtn = document.getElementById('langBtn');
    if (!langBtn) return;

    const flags = {
        'th': '🇹🇭',
        'en': '🇬🇧',
        'zh-CN': '🇨🇳',
        'zh-TW': '🇹🇼',
        'ko': '🇰🇷',
        'ja': '🇯🇵',
        'fr': '🇫🇷'
    };

    const codes = {
        'th': 'TH',
        'en': 'EN',
        'zh-CN': 'CN',
        'zh-TW': 'TW',
        'ko': 'KO',
        'ja': 'JA',
        'fr': 'FR'
    };

    const flagEl = langBtn.querySelector('.lang-flag');
    const codeEl = langBtn.querySelector('.lang-code');

    if (flagEl) flagEl.textContent = flags[currentLang] || '🇹🇭';
    if (codeEl) codeEl.textContent = codes[currentLang] || 'TH';

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLang);
    });
}

// Detect if user is likely from China (to hide Taiwan option)
function isLikelyFromChina() {
    try {
        // Check browser language
        const lang = navigator.language || navigator.userLanguage || '';
        if (lang === 'zh-CN' || lang === 'zh-Hans' || lang === 'zh-Hans-CN') {
            return true;
        }

        // Check timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const chinaTimezones = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Urumqi', 'PRC'];
        if (chinaTimezones.includes(tz)) {
            return true;
        }

        // Check all browser languages
        const langs = navigator.languages || [];
        if (langs.some(l => l === 'zh-CN' || l === 'zh-Hans' || l.startsWith('zh-Hans'))) {
            return true;
        }

        return false;
    } catch (e) {
        return false;
    }
}

// Initialize language switcher
function initLanguageSwitcher() {
    const langSwitcher = document.getElementById('langSwitcher');
    const langBtn = document.getElementById('langBtn');

    if (!langSwitcher || !langBtn) return;

    // Hide Taiwan option for users from China
    if (isLikelyFromChina()) {
        const twOption = document.querySelector('.lang-option[data-lang="zh-TW"]');
        if (twOption) {
            twOption.style.display = 'none';
        }
    }

    // Load saved language
    const savedLang = localStorage.getItem('tarot-lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
    });

    // Handle language selection
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            langSwitcher.classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        langSwitcher.classList.remove('open');
    });

    // Initial setup
    updateLangButton();
    applyTranslations();
}

// ========================================
// Reading Mode Switching
// ========================================

function initReadingMode() {
    var savedMode = localStorage.getItem('tarot-reading-mode');
    if (savedMode) {
        var idx = READING_MODES.findIndex(function(m) { return m.id === savedMode; });
        if (idx !== -1 && !READING_MODES[idx].disabled) {
            currentModeIndex = idx;
            currentReadingMode = savedMode;
        }
    }

    applyModeVisuals(false, 0);

    var prevBtn = document.getElementById('modePrev');
    var nextBtn = document.getElementById('modeNext');
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            switchMode(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            switchMode(1);
        });
    }

    // Direct mode selection via dot buttons
    document.querySelectorAll('.mode-dot[data-mode-index]').forEach(function(dot) {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            var targetIndex = parseInt(dot.getAttribute('data-mode-index'), 10);
            if (targetIndex === currentModeIndex) return;
            if (READING_MODES[targetIndex].disabled) return;
            var direction = targetIndex > currentModeIndex ? 1 : -1;
            currentModeIndex = targetIndex;
            currentReadingMode = READING_MODES[targetIndex].id;
            localStorage.setItem('tarot-reading-mode', currentReadingMode);
            gtag('event', 'switch_reading_mode', {
                event_category: 'navigation',
                reading_mode: currentReadingMode
            });
            applyModeVisuals(true, direction);
        });
    });

    initModeSwipe();
}

function switchMode(direction) {
    var newIndex = (currentModeIndex + direction + READING_MODES.length) % READING_MODES.length;
    if (newIndex === currentModeIndex) return;

    currentModeIndex = newIndex;
    currentReadingMode = READING_MODES[newIndex].id;
    localStorage.setItem('tarot-reading-mode', currentReadingMode);

    gtag('event', 'switch_reading_mode', {
        event_category: 'navigation',
        reading_mode: currentReadingMode
    });

    applyModeVisuals(true, direction);
}

// ========================================
// Peek-Flip Gimmick (three-card landing)
// ========================================

// Only show positive-meaning cards on the landing page peek-flip
var POSITIVE_CARD_NAMES = [
    // Major Arcana — positive
    'THE MAGICIAN', 'THE EMPRESS', 'THE LOVERS', 'THE CHARIOT',
    'STRENGTH', 'WHEEL OF FORTUNE', 'TEMPERANCE', 'THE STAR',
    'THE SUN', 'THE WORLD',
    // Court cards
    'PAGE OF WANDS', 'KNIGHT OF WANDS', 'QUEEN OF WANDS', 'KING OF WANDS',
    'PAGE OF CUPS', 'KNIGHT OF CUPS', 'QUEEN OF CUPS', 'KING OF CUPS',
    'PAGE OF PENTACLES', 'KNIGHT OF PENTACLES', 'QUEEN OF PENTACLES', 'KING OF PENTACLES',
    // Wands — positive
    'ACE OF WANDS', 'THREE OF WANDS', 'FOUR OF WANDS', 'SIX OF WANDS', 'EIGHT OF WANDS',
    // Cups — positive
    'ACE OF CUPS', 'TWO OF CUPS', 'THREE OF CUPS', 'SIX OF CUPS', 'NINE OF CUPS', 'TEN OF CUPS',
    // Swords — positive
    'ACE OF SWORDS',
    // Pentacles — positive
    'ACE OF PENTACLES', 'THREE OF PENTACLES', 'SIX OF PENTACLES',
    'EIGHT OF PENTACLES', 'NINE OF PENTACLES', 'TEN OF PENTACLES'
];
var _positiveCardsCache = null;

var peekFlipTimer = null;
var peekFlipTimeouts = [];
var peekFlipActive = false;
var lastPeekFlipItem = null;

function startPeekFlips() {
    stopPeekFlips();
    peekFlipActive = true;
    lastPeekFlipItem = null;
    peekFlipTimer = setTimeout(function() {
        doRandomPeekFlip();
    }, 500);
}

function stopPeekFlips() {
    peekFlipActive = false;
    lastPeekFlipItem = null;
    clearTimeout(peekFlipTimer);
    peekFlipTimer = null;
    peekFlipTimeouts.forEach(function(t) { clearTimeout(t); });
    peekFlipTimeouts = [];
    // Reset multi-card (4/10/12) peek-flip
    document.querySelectorAll('.multi-card-item.peek-flip').forEach(function(el) {
        el.classList.remove('peek-flip');
    });
    // Reset three-card scaleX flip
    document.querySelectorAll('.three-card-item.flipped').forEach(function(el) {
        el.classList.remove('flipped');
        var flipper = el.querySelector('.three-card-flipper');
        if (flipper) flipper.style.transform = '';
    });
}

function getActiveCardItems() {
    var containerMap = {
        'three-card': '#threeCardContainer .three-card-item',
        'four-card': '#fourCardContainer .multi-card-item',
        'ten-card': '#tenCardContainer .multi-card-item',
        'twelve-card': '#twelveCardContainer .multi-card-item'
    };
    var selector = containerMap[currentReadingMode];
    return selector ? document.querySelectorAll(selector) : [];
}

function doRandomPeekFlip() {
    if (!peekFlipActive) return;
    if (!tarotData || !tarotData.cards || !tarotData.cards.length) return;

    // Build positive-cards cache on first use
    if (!_positiveCardsCache) {
        _positiveCardsCache = tarotData.cards.filter(function(c) {
            return POSITIVE_CARD_NAMES.indexOf(c.name) !== -1;
        });
    }
    var pool = _positiveCardsCache.length ? _positiveCardsCache : tarotData.cards;

    var items = getActiveCardItems();
    // Exclude last flipped card so same card never flips twice in a row
    var available = [];
    items.forEach(function(el) {
        if (el !== lastPeekFlipItem) available.push(el);
    });
    if (available.length === 0) return;

    var item = available[Math.floor(Math.random() * available.length)];
    var randomCard = pool[Math.floor(Math.random() * pool.length)];
    lastPeekFlipItem = item;

    // Set front image
    var frontImg = item.querySelector('.three-card-front-img, .multi-card-front-img');
    if (frontImg) frontImg.src = 'images/tarot/' + randomCard.image;

    var isThreeCard = item.classList.contains('three-card-item');

    if (isThreeCard) {
        // ScaleX flip for three-card (avoids 3D backface-visibility bugs)
        var flipper = item.querySelector('.three-card-flipper');
        flipper.style.transform = 'scaleX(0)';

        var t1 = setTimeout(function() {
            if (!peekFlipActive) return;
            item.classList.add('flipped');
            flipper.style.transform = 'scaleX(1)';

            var showDuration = 2000 + Math.random() * 1000;
            var t2 = setTimeout(function() {
                if (!peekFlipActive) return;
                flipper.style.transform = 'scaleX(0)';

                var t3 = setTimeout(function() {
                    if (!peekFlipActive) return;
                    item.classList.remove('flipped');
                    flipper.style.transform = 'scaleX(1)';
                    doRandomPeekFlip();
                }, 400);
                peekFlipTimeouts.push(t3);
            }, showDuration);
            peekFlipTimeouts.push(t2);
        }, 400);
        peekFlipTimeouts.push(t1);
    } else {
        // Multi-card: keep existing 3D peek-flip
        item.classList.add('peek-flip');

        var showDuration = 2000 + Math.random() * 1000;
        var t1 = setTimeout(function() {
            if (!peekFlipActive) return;
            item.classList.remove('peek-flip');
            doRandomPeekFlip();
        }, showDuration);
        peekFlipTimeouts.push(t1);
    }
}

function resetThreeCardAnimations(container) {
    var cards = container.querySelectorAll('.three-card-item');
    cards.forEach(function(card) {
        card.style.animation = 'none';
    });
    container.offsetHeight; // force reflow
    cards.forEach(function(card) {
        // Random delay between 0–3s so each card starts at a different phase
        var delay = (Math.random() * 3).toFixed(2);
        card.style.animationDelay = '-' + delay + 's';
        card.style.animation = '';
    });
}

function applyModeVisuals(animate, direction) {
    var titles = document.querySelectorAll('.mode-title');

    // All card containers mapped by mode
    var containerMap = {
        'single': document.getElementById('spinningCardContainer'),
        'three-card': document.getElementById('threeCardContainer'),
        'four-card': document.getElementById('fourCardContainer'),
        'ten-card': document.getElementById('tenCardContainer'),
        'twelve-card': document.getElementById('twelveCardContainer')
    };

    var activeContainer = containerMap[currentReadingMode];

    // Update title visibility
    titles.forEach(function(titleEl) {
        var mode = titleEl.getAttribute('data-mode');
        if (mode === currentReadingMode) {
            if (animate) {
                titleEl.classList.remove('slide-left', 'slide-right', 'active');
                titleEl.classList.add(direction > 0 ? 'slide-right' : 'slide-left');
                titleEl.offsetHeight; // force reflow
                titleEl.classList.remove('slide-left', 'slide-right');
                titleEl.classList.add('active');
            } else {
                titleEl.classList.remove('slide-left', 'slide-right');
                titleEl.classList.add('active');
            }
        } else {
            if (animate) {
                titleEl.classList.remove('active');
                titleEl.classList.add(direction > 0 ? 'slide-left' : 'slide-right');
            } else {
                titleEl.classList.remove('active', 'slide-left', 'slide-right');
            }
        }
    });

    // Hide all containers, then show the active one
    var isSingle = currentReadingMode === 'single';

    if (animate) {
        // Cancel any pending mode switch animation
        if (_modeAnimTimer) { clearTimeout(_modeAnimTimer); _modeAnimTimer = null; }

        // Stop sparkles for non-single modes
        if (!isSingle) stopFloatingSparkles();

        // Capture target mode so the timer uses the correct value
        var targetMode = currentReadingMode;

        // Fade out all currently visible containers
        Object.keys(containerMap).forEach(function(mode) {
            var c = containerMap[mode];
            if (c && mode !== targetMode && c.style.display !== 'none') {
                c.style.opacity = '0';
            }
        });

        _modeAnimTimer = setTimeout(function() {
            _modeAnimTimer = null;
            // Hide all non-active containers
            Object.keys(containerMap).forEach(function(mode) {
                var c = containerMap[mode];
                if (c && mode !== targetMode) {
                    c.style.display = 'none';
                }
            });

            // Show active container
            if (activeContainer) {
                activeContainer.style.opacity = '0';
                activeContainer.style.display = isSingle ? '' : 'flex';

                // Reset floating animations for three-card
                if (targetMode === 'three-card') {
                    resetThreeCardAnimations(activeContainer);
                }

                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        activeContainer.style.opacity = '1';
                    });
                });
            }

            if (isSingle) {
                startCardRotation();
                createFloatingSparkles();
            }

            syncMobileHint();
        }, 400);
    } else {
        if (!isSingle) stopFloatingSparkles();

        // Immediately hide all, show active
        Object.keys(containerMap).forEach(function(mode) {
            var c = containerMap[mode];
            if (c && mode !== currentReadingMode) {
                c.style.display = 'none';
            }
        });

        if (activeContainer) {
            activeContainer.style.display = isSingle ? '' : 'flex';
            activeContainer.style.opacity = '0';

            if (currentReadingMode === 'three-card') {
                resetThreeCardAnimations(activeContainer);
            }

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    activeContainer.style.opacity = '1';
                });
            });
        }

        syncMobileHint();
    }

    // Update dot indicators
    var disabled = isCurrentModeDisabled();
    document.querySelectorAll('.mode-dot').forEach(function(dot, i) {
        dot.classList.toggle('active', i === currentModeIndex);
        dot.classList.toggle('disabled', !!READING_MODES[i].disabled);
    });

    // Toggle coming-soon state
    var landingPage = document.getElementById('landingPage');
    if (landingPage) {
        landingPage.classList.toggle('mode-disabled', disabled);

        // Update hint text for disabled modes
        if (disabled && activeContainer) {
            var hint = activeContainer.querySelector('.card-click-hint');
            if (hint) {
                var lt = translations[currentLang] && translations[currentLang].landing;
                hint.textContent = (lt && lt.comingSoon) || 'Coming Soon';
                hint.classList.remove('ready-state', 'loading-state');
                hint.classList.add('coming-soon-state');
            }
        } else if (activeContainer) {
            var hint2 = activeContainer.querySelector('.card-click-hint');
            if (hint2) {
                hint2.classList.remove('coming-soon-state');
            }
        }

        var isMulti = currentReadingMode !== 'single';
        landingPage.classList.remove('cosmic-theme');
        if (isMulti && !disabled) {
            startPeekFlips();
        } else {
            stopPeekFlips();
        }

        syncMobileHint();
    }
}

function initModeSwipe() {
    var landingPage = document.getElementById('landingPage');
    var touchStartX = 0;
    var touchStartY = 0;
    var isSwiping = false;

    landingPage.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });

    landingPage.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        var dy = Math.abs(e.touches[0].clientY - touchStartY);
        var dx = Math.abs(e.touches[0].clientX - touchStartX);
        if (dy > dx * 1.5) {
            isSwiping = false;
        }
    }, { passive: true });

    landingPage.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        isSwiping = false;
        var touchEndX = e.changedTouches[0].clientX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) >= 50) {
            switchMode(diff > 0 ? 1 : -1);
        }
    }, { passive: true });
}

// ========================================
// Background Music Control
// ========================================
let isMuted = false;
let musicStarted = false;
let audioElement = null;

// ========================================
// Sound Effects
// ========================================
const soundEffects = {
    cardFlip: null,
    cardSpread: null,
    cardSelect: null
};

// Web Audio API context for amplification
let audioContext = null;

// Initialize sound effects
function initSoundEffects() {
    soundEffects.cardFlip = new Audio('audio/card_select.mp3');
    soundEffects.cardFlip.volume = 0.18;

    soundEffects.cardSpread = new Audio('audio/card_spread.mp3');
    soundEffects.cardSpread.volume = 1.0;
    soundEffects.cardSpread.gainBoost = 2.5; // Amplify 250%

    soundEffects.cardSelect = new Audio('audio/card_select.mp3');
    soundEffects.cardSelect.volume = 0.18;

    // Card reveal sound (when center card flips to show face)
    soundEffects.cardReveal = new Audio('audio/card_reveal.mp3');
    soundEffects.cardReveal.volume = 0.7;

    // Accept/success sound
    soundEffects.accept = new Audio('audio/success.mp3');
    soundEffects.accept.volume = 0.5;

    // Blessing screen magical sparkle sound
    soundEffects.blessing = new Audio('audio/sparkle.mp3');
    soundEffects.blessing.volume = 0.5;
}

// Play a sound effect with optional gain boost
function playSoundEffect(soundName) {
    if (isMuted) return;

    const sound = soundEffects[soundName];
    if (sound) {
        // If sound has gain boost, use Web Audio API
        if (sound.gainBoost && sound.gainBoost > 1) {
            playWithGainBoost(sound, sound.gainBoost);
        } else {
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.log('Sound effect play failed:', err.message);
            });
        }
    }
}

// Blessing burst effect — expanding rings + particles from the accept button
function triggerBlessingBurst(btn) {
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    // Create overlay container
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(overlay);

    // Expanding light rings
    for (var r = 0; r < 3; r++) {
        var ring = document.createElement('div');
        ring.style.cssText =
            'position:absolute;border-radius:50%;border:2px solid rgba(180,195,235,' + (0.6 - r * 0.15) + ');' +
            'left:' + cx + 'px;top:' + cy + 'px;width:0;height:0;' +
            'transform:translate(-50%,-50%);' +
            'box-shadow:0 0 15px rgba(154,170,212,' + (0.3 - r * 0.08) + '),inset 0 0 15px rgba(154,170,212,' + (0.15 - r * 0.04) + ');' +
            'animation:blessingRingExpand ' + (0.8 + r * 0.2) + 's ' + (r * 0.12) + 's cubic-bezier(0.25,0.46,0.45,0.94) forwards;';
        overlay.appendChild(ring);
    }

    // Particles
    var colors = ['rgba(180,195,235,0.9)', 'rgba(154,170,212,0.8)', 'rgba(200,215,245,0.9)', 'rgba(220,225,245,0.7)', 'rgba(140,160,210,0.8)'];
    for (var p = 0; p < 18; p++) {
        var particle = document.createElement('div');
        var angle = (p / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        var dist = 60 + Math.random() * 80;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist;
        var size = 2 + Math.random() * 4;
        var color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText =
            'position:absolute;border-radius:50%;' +
            'width:' + size + 'px;height:' + size + 'px;' +
            'left:' + cx + 'px;top:' + cy + 'px;' +
            'background:' + color + ';' +
            'box-shadow:0 0 ' + (size * 2) + 'px ' + color + ';' +
            'transform:translate(-50%,-50%);' +
            'animation:blessingParticle ' + (0.6 + Math.random() * 0.4) + 's ' + (Math.random() * 0.15) + 's cubic-bezier(0.25,0.46,0.45,0.94) forwards;' +
            '--dx:' + dx + 'px;--dy:' + dy + 'px;';
        overlay.appendChild(particle);
    }

    // Inject keyframes if not yet present
    if (!document.getElementById('blessingBurstKeyframes')) {
        var style = document.createElement('style');
        style.id = 'blessingBurstKeyframes';
        style.textContent =
            '@keyframes blessingRingExpand{0%{width:0;height:0;opacity:1}100%{width:280px;height:280px;opacity:0}}' +
            '@keyframes blessingParticle{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0.2)}}';
        document.head.appendChild(style);
    }

    // Cleanup
    setTimeout(function() { overlay.remove(); }, 1500);
}

// Play audio with amplification using Web Audio API
function playWithGainBoost(audioElement, gainValue) {
    try {
        // Create audio context if not exists
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Resume context if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Clone the audio to allow overlapping plays
        const tempAudio = new Audio(audioElement.src);

        // Create media element source
        const source = audioContext.createMediaElementSource(tempAudio);

        // Create gain node for amplification
        const gainNode = audioContext.createGain();
        gainNode.gain.value = gainValue;

        // Connect: source -> gain -> destination
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Play
        tempAudio.play().catch(err => {
            console.log('Amplified sound play failed:', err.message);
        });
    } catch (err) {
        // Fallback to normal playback
        console.log('Web Audio API failed, using fallback:', err.message);
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log('Fallback play failed:', e.message));
    }
}

// Initialize sound effects on load
initSoundEffects();

// Initialize audio element
function initAudioElement() {
    if (audioElement) return audioElement;

    audioElement = document.getElementById('bgMusic');
    if (audioElement) {
        // Set source directly on element for better compatibility
        audioElement.src = 'audio/background.mp3';
        audioElement.volume = 0.12;
        audioElement.loop = true;
        audioElement.load();
        console.log('Audio element initialized');
    }
    return audioElement;
}

// Update sound indicator visibility
function updateSoundIndicator(isPlaying) {
    const indicator = document.getElementById('soundIndicator');
    if (indicator) {
        if (isPlaying && !isMuted) {
            indicator.classList.add('playing');
        } else {
            indicator.classList.remove('playing');
        }
    }
}

// Try to play music - must be called from user interaction
function tryPlayMusic(muteOnFail = false) {
    const audio = initAudioElement();
    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    if (musicStarted && !audio.paused) {
        console.log('Music already playing');
        updateSoundIndicator(true);
        return;
    }

    audio.volume = 0.12;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicStarted = true;
            console.log('Music started playing successfully');
            updateSoundIndicator(true);
        }).catch(err => {
            console.log('Audio play failed:', err.message);
            musicStarted = false;
            updateSoundIndicator(false);
            // If autoplay fails on initial load, mute the audio
            if (muteOnFail) {
                isMuted = true;
                audio.muted = true;
                const muteIconEl = document.getElementById('muteIcon');
                const unmuteIconEl = document.getElementById('unmuteIcon');
                if (muteIconEl && unmuteIconEl) {
                    muteIconEl.style.display = 'none';
                    unmuteIconEl.style.display = 'block';
                }
                console.log('Autoplay blocked - audio muted by default');
            }
        });
    }
}

// Toggle mute/unmute
function toggleMute(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const audio = initAudioElement();
    const muteIconEl = document.getElementById('muteIcon');
    const unmuteIconEl = document.getElementById('unmuteIcon');

    if (!audio) {
        console.log('Audio element not found');
        return;
    }

    isMuted = !isMuted;
    audio.muted = isMuted;

    gtag('event', 'music_toggle', {
        event_category: 'settings',
        music_state: isMuted ? 'muted' : 'unmuted'
    });

    if (muteIconEl && unmuteIconEl) {
        if (isMuted) {
            muteIconEl.style.display = 'none';
            unmuteIconEl.style.display = 'block';
            updateSoundIndicator(false);
        } else {
            muteIconEl.style.display = 'block';
            unmuteIconEl.style.display = 'none';
            // Try to play if paused
            if (audio.paused) {
                audio.play().then(() => {
                    musicStarted = true;
                    console.log('Music resumed');
                    updateSoundIndicator(true);
                }).catch(() => {
                    updateSoundIndicator(false);
                });
            } else {
                updateSoundIndicator(true);
            }
        }
    }
}

// Preload an image and return a promise
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(src); // Don't fail on error, just continue
        img.src = src;
    });
}

// ── Preload overlay ──
function createPreloadOverlay() {
    // Overlay is already in HTML — just return it
    return document.getElementById('preloadOverlay');
}

function updatePreloadProgress(loaded, total, label) {
    var pct = Math.round((loaded / total) * 100);
    var fill = document.getElementById('preloadFill');
    var percent = document.getElementById('preloadPercent');
    var lbl = document.getElementById('preloadLabel');
    if (fill) fill.style.width = pct + '%';
    if (percent) percent.textContent = pct + ' %';
    if (lbl && label) lbl.textContent = label;
}

function dismissPreloadOverlay() {
    var overlay = document.getElementById('preloadOverlay');
    if (!overlay) return;
    overlay.classList.add('done');
    setTimeout(function() { overlay.remove(); }, 700);
}

// Mark page as ready and enable card clicking with epic reveal
function markPageReady() {
    isPageReady = true;

    // Try to play background music (may be blocked by browser)
    // Show prompt if autoplay fails
    tryPlayMusic(true);

    // Reveal the header with epic animation
    const header = document.querySelector('.landing-header');
    if (header) {
        header.classList.add('revealed');
    }

    // Add glow effect to the active card container
    const cardContainer = document.getElementById('spinningCardContainer');
    const threeCardContainer = document.getElementById('threeCardContainer');
    if (cardContainer) {
        cardContainer.classList.add('ready-glow');
    }
    if (threeCardContainer) {
        threeCardContainer.classList.add('ready-glow');
    }

    // Update hint text with ready animation (after header animation)
    setTimeout(() => {
        // Update hint for single mode
        const singleHint = cardContainer ? cardContainer.querySelector('.card-click-hint') : null;
        if (singleHint) {
            singleHint.textContent = t('landing.clickToDraw');
            singleHint.setAttribute('data-i18n', 'landing.clickToDraw');
            singleHint.classList.remove('loading-state');
            singleHint.classList.add('ready-state');
        }

        // Update hints for multi-card modes (skip disabled modes)
        var multiHintMap = [
            { containerId: 'threeCardContainer', key: 'landing.clickToDraw3', modeIndex: 1 },
            { containerId: 'fourCardContainer', key: 'landing.clickToDraw4', modeIndex: 2 },
            { containerId: 'tenCardContainer', key: 'landing.clickToDraw10', modeIndex: 3 },
            { containerId: 'twelveCardContainer', key: 'landing.clickToDraw12', modeIndex: 4 }
        ];
        multiHintMap.forEach(function(entry) {
            if (READING_MODES[entry.modeIndex] && READING_MODES[entry.modeIndex].disabled) return;
            var container = document.getElementById(entry.containerId);
            var hint = container ? container.querySelector('.card-click-hint') : null;
            if (hint) {
                hint.textContent = t(entry.key);
                hint.setAttribute('data-i18n', entry.key);
                hint.classList.remove('loading-state');
                hint.classList.add('ready-state');
            }
        });

        // Reveal brand at bottom
        const brand = document.querySelector('.landing-brand');
        if (brand) {
            brand.classList.add('revealed');
        }

        // Sync mobile hint
        syncMobileHint();

    }, 600);
}

// Sync the mobile-only landing hint with the active container's hint
function syncMobileHint() {
    var mobileHint = document.getElementById('landingHintMobile');
    if (!mobileHint) return;

    var containerMap = {
        'single': document.getElementById('spinningCardContainer'),
        'three-card': document.getElementById('threeCardContainer'),
        'four-card': document.getElementById('fourCardContainer'),
        'ten-card': document.getElementById('tenCardContainer'),
        'twelve-card': document.getElementById('twelveCardContainer')
    };

    var activeContainer = containerMap[currentReadingMode];
    var sourceHint = activeContainer ? activeContainer.querySelector('.card-click-hint') : null;

    if (sourceHint) {
        mobileHint.textContent = sourceHint.textContent;
        mobileHint.className = 'landing-hint-mobile';
        if (sourceHint.classList.contains('loading-state')) mobileHint.classList.add('loading-state');
        if (sourceHint.classList.contains('ready-state')) mobileHint.classList.add('ready-state');
        if (sourceHint.classList.contains('coming-soon-state')) mobileHint.classList.add('coming-soon-state');
    }
}

// Wait for essential resources then show page immediately
async function waitForResources() {
    // Initialize reading mode (restore from localStorage)
    initReadingMode();

    // Show preload overlay immediately
    createPreloadOverlay();

    // Start the card rotation animation immediately (only for single mode)
    if (currentReadingMode === 'single') {
        startCardRotation();
        createFloatingSparkles();
    }

    // ── Phase 1: Load tarot data + essential images only ──
    updatePreloadProgress(0, 100, 'loading card data…');

    const essentialImages = [
        'images/card_back_blue.png',
        ...spinningCardImages.slice(0, 3)
    ];

    await Promise.all([
        (async () => {
            if (!tarotData) {
                try {
                    const res = await fetch('tarot_cards.json');
                    tarotData = await res.json();
                } catch (error) {
                    console.error('Error loading tarot data:', error);
                }
            }
        })(),
        ...essentialImages.map(src => preloadImage(src))
    ]);

    // Render cards (they use card back image which is already loaded)
    renderCards();
    updatePreloadProgress(100, 100, 'ready ✦');

    // Mark page as ready & dismiss overlay
    markPageReady();
    setTimeout(dismissPreloadOverlay, 300);

    // ── Phase 2: Lazy-load remaining images in background ──
    _lazyLoadRemainingImages();
}

// Background image preloader — does not block page interaction
var _lazyLoadPaused = false;

function _pauseLazyLoad() { _lazyLoadPaused = true; }
function _resumeLazyLoad() { _lazyLoadPaused = false; }

function _lazyLoadRemainingImages() {
    var allImages = [];

    // Remaining spinning card images
    allImages = allImages.concat(spinningCardImages.slice(3));

    // All 78 tarot card front images
    if (tarotData && tarotData.cards) {
        tarotData.cards.forEach(function(card) {
            allImages.push('images/tarot/' + card.image);
        });
    }

    // Deduplicate against already-loaded
    var seen = {};
    spinningCardImages.slice(0, 3).forEach(function(s) { seen[s] = true; });
    seen['images/card_back_blue.png'] = true;
    allImages = allImages.filter(function(src) {
        if (seen[src]) return false;
        seen[src] = true;
        return true;
    });

    var idx = 0;
    var concurrent = 4;

    function loadNext() {
        if (idx >= allImages.length) return;
        if (_lazyLoadPaused) {
            // Retry after a short wait
            setTimeout(loadNext, 200);
            return;
        }
        var src = allImages[idx++];
        preloadImage(src).then(loadNext).catch(loadNext);
    }

    // Start a few parallel streams — low priority, won't compete with user interactions
    for (var i = 0; i < concurrent && i < allImages.length; i++) {
        loadNext();
    }
}

// (All images are now preloaded in waitForResources)

// Card images for spinning display
const spinningCardImages = [
    'images/tarot/THE LOVERS.webp',
    'images/tarot/THE STAR.webp',
    'images/tarot/THE SUN.webp',
    'images/tarot/THE MOON.webp',
    'images/tarot/THE EMPRESS.webp',
    'images/tarot/THE EMPEROR.webp',
    'images/tarot/WHEEL OF FORTUNE.webp',
    'images/tarot/THE MAGICIAN.webp',
    'images/tarot/THE HIGH PRIESTRESS.webp',
    'images/tarot/STRENGTH.webp'
];

let currentSpinningCardIndex = 0;
let spinningCardInterval = null;

// Change the front card image during rotation
function startCardRotation() {
    const frontImg = document.getElementById('spinningCardFront');
    const wrapper = document.querySelector('.spinning-card-wrapper');

    // Use animationiteration event to stay perfectly synced with CSS spin.
    // Filter by animationName because child galaxy animations also bubble up.
    // The event fires at 0deg (front facing). We wait 1.5s (180deg = back facing)
    // to swap the image, so it's never visible during the change.
    function onIteration(e) {
        if (e.animationName !== 'spinOnY') return;
        spinningCardInterval = setTimeout(function() {
            currentSpinningCardIndex = (currentSpinningCardIndex + 1) % spinningCardImages.length;
            frontImg.src = spinningCardImages[currentSpinningCardIndex];
        }, 1500);
    }
    wrapper.addEventListener('animationiteration', onIteration);
    // Store ref for cleanup
    wrapper._spinIterationHandler = onIteration;
}

// Create floating sparkles around spinning card
let sparkleInterval = null;
function createFloatingSparkles() {
    const container = document.getElementById('spinningCardContainer');

    sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';

        // Random position in a circle around the center
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 60;
        const x = 90 + Math.cos(angle) * radius;
        const y = 160 + Math.sin(angle) * radius;

        // Random movement direction
        const moveX = (Math.random() - 0.5) * 40;
        const moveY = -20 - Math.random() * 30; // Float upward
        const duration = 1.5 + Math.random() * 1;
        const size = 3 + Math.random() * 5;

        sparkle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            animation: sparkleRise ${duration}s ease-out forwards;
            --move-x: ${moveX}px;
            --move-y: ${moveY}px;
        `;

        container.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), duration * 1000);
    }, 200);
}

function stopFloatingSparkles() {
    if (sparkleInterval) {
        clearInterval(sparkleInterval);
        sparkleInterval = null;
    }
}

// Create sparkles for card burst effect
function createBurstSparkles(centerX, centerY) {
    const container = document.getElementById('cardBurstContainer');

    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 250;
        const sx = Math.cos(angle) * distance;
        const sy = Math.sin(angle) * distance - 100;

        sparkle.style.cssText = `
            left: ${centerX}px;
            top: ${centerY}px;
            --sx: ${sx}px;
            --sy: ${sy}px;
            animation-delay: ${Math.random() * 300}ms;
            width: ${4 + Math.random() * 8}px;
            height: ${4 + Math.random() * 8}px;
        `;

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.classList.add('animate');
        }, Math.random() * 300);
    }
}

// Create flying cards burst effect
function createCardBurst() {
    const container = document.getElementById('cardBurstContainer');
    const flashOverlay = document.getElementById('flashOverlay');
    const cardRect = document.getElementById('spinningCardContainer').getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;

    // Trigger flash effect
    flashOverlay.classList.add('active');
    setTimeout(() => {
        flashOverlay.classList.remove('active');
    }, 600);

    // Create sparkles
    createBurstSparkles(centerX, centerY);

    // Create 14 flying cards
    for (let i = 0; i < 14; i++) {
        const card = document.createElement('div');
        card.className = 'flying-card';

        // Alternate between card back and front
        const imgSrc = i % 2 === 0 ? 'images/card_back_blue.png' : spinningCardImages[i % spinningCardImages.length];
        card.innerHTML = `<img src="${imgSrc}" alt="Flying Card">`;

        // Random direction for burst effect
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 180 + Math.random() * 120;
        const endDistance = 500 + Math.random() * 350;

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const txEnd = Math.cos(angle) * endDistance;
        const tyEnd = Math.sin(angle) * endDistance - 200;
        const rot = (Math.random() - 0.5) * 60;
        const rotEnd = rot + (Math.random() - 0.5) * 180;

        card.style.cssText = `
            left: ${centerX}px;
            top: ${centerY}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
            --tx-end: ${txEnd}px;
            --ty-end: ${tyEnd}px;
            --rot: ${rot}deg;
            --rot-end: ${rotEnd}deg;
            animation-delay: ${i * 40}ms;
        `;

        container.appendChild(card);

        setTimeout(() => {
            card.classList.add('animate');
        }, 10 + i * 40);
    }

    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 2000);
}

// ========================================
// Category Selection Overlay
// ========================================

var _categoryThemes = {
    love:    { primary:'#ff6b8a', primaryRgb:'255,107,138', light:'#ffb0c4', lightRgb:'255,176,196', glow:'#ff4081', glowRgb:'255,64,129', sparkleEnd:'#ffb0c4' },
    work:    { primary:'#64b5ff', primaryRgb:'100,181,255', light:'#a0c8ff', lightRgb:'160,200,255', glow:'#448aff', glowRgb:'68,138,255', sparkleEnd:'#a0c8ff' },
    finance: { primary:'#ffd54f', primaryRgb:'255,213,79',  light:'#ffe088', lightRgb:'255,224,136', glow:'#ffab00', glowRgb:'255,171,0',   sparkleEnd:'#ffe088' }
};

function setCategoryTheme(category) {
    var t = _categoryThemes[category];
    if (!t) return;
    var root = document.documentElement.style;
    root.setProperty('--cat-primary', t.primary);
    root.setProperty('--cat-primary-rgb', t.primaryRgb);
    root.setProperty('--cat-light', t.light);
    root.setProperty('--cat-light-rgb', t.lightRgb);
    root.setProperty('--cat-glow', t.glow);
    root.setProperty('--cat-glow-rgb', t.glowRgb);
    root.setProperty('--cat-sparkle-end', t.sparkleEnd);
}

function clearCategoryTheme() {
    var root = document.documentElement.style;
    ['--cat-primary','--cat-primary-rgb','--cat-light','--cat-light-rgb','--cat-glow','--cat-glow-rgb','--cat-sparkle-end'].forEach(function(p) {
        root.removeProperty(p);
    });
}

function playCategoryFlash(category) {
    var flash = document.createElement('div');
    flash.className = 'category-flash';
    document.body.appendChild(flash);
    setTimeout(function() { flash.remove(); }, 1500);
}

function handleLandingCardClick() {
    if (!isPageReady) return;
    if (isCurrentModeDisabled()) return;
    showCategoryOverlay();
}

function showCategoryOverlay() {
    var overlay = document.getElementById('categoryOverlay');
    if (!overlay) return;

    // Reset state
    overlay.classList.remove('closing');
    overlay.querySelectorAll('.category-card').forEach(function(c) {
        c.classList.remove('selected');
    });

    overlay.classList.add('active');

    gtag('event', 'show_category_overlay', {
        event_category: 'navigation',
        reading_mode: currentReadingMode
    });
}

function closeCategoryOverlay(callback) {
    var overlay = document.getElementById('categoryOverlay');
    if (!overlay) return;

    overlay.classList.add('closing');

    setTimeout(function() {
        overlay.classList.remove('active', 'closing');
        if (callback) callback();
    }, 350);
}

function selectCategory(category) {
    currentReadingCategory = category;

    gtag('event', 'select_category', {
        event_category: 'engagement',
        category: category,
        reading_mode: currentReadingMode
    });

    // Apply category color theme
    setCategoryTheme(category);

    // Visual feedback: highlight selected card
    var overlay = document.getElementById('categoryOverlay');
    overlay.querySelectorAll('.category-card').forEach(function(c) {
        c.classList.remove('selected');
    });
    var selectedCard = overlay.querySelector('.category-card[data-category="' + category + '"]');
    if (selectedCard) selectedCard.classList.add('selected');

    // Category confirmation flash
    playCategoryFlash(category);

    // Brief pause for flash + visual feedback, then close and start experience
    setTimeout(function() {
        closeCategoryOverlay(function() {
            startExperience();
        });
    }, 350);
}

// Initialize category card click handlers
(function initCategoryOverlay() {
    document.querySelectorAll('.category-card').forEach(function(card) {
        card.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            if (category) selectCategory(category);
        });
    });

    // Back button — close overlay and return to landing
    var backBtn = document.getElementById('categoryBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            gtag('event', 'close_category_overlay', { event_category: 'navigation' });
            closeCategoryOverlay();
        });
    }
})();

// ========================================
// Multi-Card Mode Init
// ========================================
function initMultiCardMode() {
    multiCardSelections = [];
    _multiDisabledCards = [];
    var grid = document.querySelector('.card-grid');
    if (currentReadingMode === 'three-card') {
        multiCardTarget = 3;
        multiCardPositions = ['past', 'present', 'future'];
        if (grid) grid.classList.add('multi-select-mode');
        showMultiPickIndicator();
    } else if (currentReadingMode === 'four-card') {
        multiCardTarget = 4;
        multiCardPositions = ['past', 'present', 'future', 'outcome'];
        if (grid) grid.classList.add('multi-select-mode');
        showMultiPickIndicator();
    } else {
        multiCardTarget = 0;
        multiCardPositions = [];
        if (grid) grid.classList.remove('multi-select-mode');
    }
}

// Start the experience (when card is clicked)
function startExperience() {
    // Don't allow starting if page is not ready yet
    if (!isPageReady) {
        return;
    }
    // Block disabled modes
    if (isCurrentModeDisabled()) return;

    gtag('event', 'start_experience', { event_category: 'navigation' });

    // Stop peek-flip gimmick
    stopPeekFlips();

    // Increment global draw counter in Firebase (updates display automatically)
    if (window.cardCounter && window.cardCounter.incrementGlobalDraw) {
        window.cardCounter.incrementGlobalDraw();
    }

    // Play music on first user interaction (guaranteed to work)
    tryPlayMusic();

    // Play card select sound effect (magic sparkle)
    playSoundEffect('cardSelect');

    const landingPage = document.getElementById('landingPage');
    const mainPage = document.getElementById('mainPage');
    const cardGrid = document.getElementById('cardGrid');

    // === MULTI-CARD MODE: simpler fade-out transition ===
    if (currentReadingMode !== 'single') {
        var multiContainerMap = {
            'three-card': 'threeCardContainer',
            'four-card': 'fourCardContainer',
            'ten-card': 'tenCardContainer',
            'twelve-card': 'twelveCardContainer'
        };
        var activeContainerId = multiContainerMap[currentReadingMode];
        var activeMultiContainer = activeContainerId ? document.getElementById(activeContainerId) : null;
        var multiHint = activeMultiContainer ? activeMultiContainer.querySelector('.card-click-hint') : null;

        // Fade out header
        var modeSelector = document.getElementById('modeSelector');
        var modeDots = document.getElementById('modeDots');
        if (modeSelector) { modeSelector.style.transition = 'opacity 0.5s ease'; modeSelector.style.opacity = '0'; }
        if (modeDots) { modeDots.style.transition = 'opacity 0.5s ease'; modeDots.style.opacity = '0'; }
        document.querySelector('.landing-tagline').style.opacity = '0';
        document.querySelector('.landing-sparkles').style.opacity = '0';
        if (multiHint) multiHint.style.opacity = '0';

        // Fade out card container with scale
        if (activeMultiContainer) {
            activeMultiContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            activeMultiContainer.style.opacity = '0';
            activeMultiContainer.style.transform = 'scale(0.85)';
        }

        // Hide other landing elements
        setTimeout(function() {
            document.querySelector('.landing-brand').style.opacity = '0';
            document.querySelector('.landing-instruction').style.opacity = '0';
        }, 200);

        // Prepare main page
        setTimeout(function() {
            landingPage.style.pointerEvents = 'none';
            cardGrid.classList.add('stacked');
            mainPage.classList.add('visible');

            var langSwitcher = document.querySelector('.lang-switcher');
            var muteBtn = document.querySelector('.mute-btn');
            var profileSwitcher = document.querySelector('.profile-switcher');
            if (langSwitcher) langSwitcher.style.display = 'none';
            if (muteBtn) muteBtn.style.display = 'none';
            if (profileSwitcher) profileSwitcher.style.display = 'none';
        }, 400);

        // Spread cards and hide landing
        setTimeout(function() {
            initMultiCardMode();
            animateToGrid();
            setTimeout(function() {
                landingPage.classList.add('hidden');
                updateCommentsBtnVisibility();
            }, 300);
        }, 700);

        return;
    }

    // === SINGLE CARD MODE: original spinning card transition ===
    const spinningCard = document.getElementById('spinningCard');
    const spinningCardContainer = document.getElementById('spinningCardContainer');
    const spinningCardWrapper = spinningCardContainer.querySelector('.spinning-card-wrapper');

    // cardWidth determined later when grid is visible

    // Stop the rotation and sparkles
    if (spinningCardInterval) {
        clearTimeout(spinningCardInterval);
    }
    var wrapper = document.querySelector('.spinning-card-wrapper');
    if (wrapper && wrapper._spinIterationHandler) {
        wrapper.removeEventListener('animationiteration', wrapper._spinIterationHandler);
        wrapper._spinIterationHandler = null;
    }
    stopFloatingSparkles();

    // Step 1: Stop spinning and show back of card with smooth transition
    spinningCardWrapper.style.transition = 'transform 0.5s ease-out';
    spinningCardWrapper.style.animation = 'none';
    spinningCardWrapper.style.transform = 'rotateY(180deg)';

    // Stop face visibility animations and force back face visible
    var frontFace = spinningCard.querySelector('.spinning-card-front');
    var backFace = spinningCard.querySelector('.spinning-card-back');
    if (frontFace) { frontFace.style.animation = 'none'; frontFace.style.visibility = 'hidden'; }
    if (backFace) { backFace.style.animation = 'none'; backFace.style.visibility = 'visible'; }

    // Step 2: Straighten the card (remove tilt)
    spinningCard.style.transition = 'transform 0.5s ease-out';
    spinningCard.style.transform = 'rotate(0deg)';

    // Hide hint text
    spinningCardContainer.querySelector('.card-click-hint').style.opacity = '0';

    // Fade out the header and mode selector
    var modeSelector2 = document.getElementById('modeSelector');
    var modeDots2 = document.getElementById('modeDots');
    if (modeSelector2) { modeSelector2.style.transition = 'opacity 0.5s ease'; modeSelector2.style.opacity = '0'; }
    if (modeDots2) { modeDots2.style.transition = 'opacity 0.5s ease'; modeDots2.style.opacity = '0'; }
    document.querySelector('.landing-tagline').style.opacity = '0';
    document.querySelector('.landing-sparkles').style.opacity = '0';

    // Hide other landing elements
    setTimeout(() => {
        document.querySelector('.landing-brand').style.opacity = '0';
        document.querySelector('.landing-instruction').style.opacity = '0';
    }, 200);

    // Prepare main page and card grid (hidden behind spinning card)
    setTimeout(() => {
        landingPage.style.pointerEvents = 'none';
        cardGrid.classList.add('stacked');
        mainPage.classList.add('visible');

        // Hide UI buttons for clean draw page
        const langSwitcher = document.querySelector('.lang-switcher');
        const muteBtn = document.querySelector('.mute-btn');
        const profileSwitcher = document.querySelector('.profile-switcher');
        if (langSwitcher) langSwitcher.style.display = 'none';
        if (muteBtn) muteBtn.style.display = 'none';
        if (profileSwitcher) profileSwitcher.style.display = 'none';
    }, 400);

    // Step 3: Shrink the card and move to stack center — become the top card of the stack
    setTimeout(() => {
        // Calculate scale to match grid card size (grid is now visible)
        const layout = calculateCardLayout();
        const targetWidth = layout ? layout.cardW : getStackParams().cardWidth;
        const currentWidth = spinningCardContainer.offsetWidth;
        const scale = targetWidth / currentWidth;

        // Clear the ready-glow animation first so transform can work
        spinningCardContainer.style.animation = 'none';
        spinningCardContainer.style.filter = 'none';

        // Calculate position difference to align with stack center
        const spinningRect = spinningCardContainer.getBoundingClientRect();
        const gridRect = cardGrid.getBoundingClientRect();

        const spinningCenterY = spinningRect.top + spinningRect.height / 2;
        const gridCenterY = gridRect.top + gridRect.height / 2;
        const moveY = gridCenterY - spinningCenterY;

        // Apply shrink transition — card shrinks into the stack position
        spinningCardContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        requestAnimationFrame(() => {
            spinningCardContainer.style.transform = `translateY(${moveY}px) scale(${scale})`;
        });

        // Also reduce shadow to match stacked card
        const cardFaces = spinningCardContainer.querySelectorAll('.spinning-card-face');
        cardFaces.forEach(face => {
            face.style.transition = 'box-shadow 0.5s ease';
            face.style.boxShadow = '0 2px 8px rgba(160, 180, 220, 0.15)';
        });

        // At the end of shrink, make stacked cards visible behind spinning card
        setTimeout(() => {
            const containers = document.querySelectorAll('.card-container');
            containers.forEach(c => { c.style.opacity = '1'; });
        }, 400);
    }, 450);

    // Step 4: Spinning card is now aligned with stack — hide it and spread immediately
    setTimeout(() => {
        spinningCardContainer.style.transition = 'none';
        spinningCardContainer.style.opacity = '0';
        spinningCardContainer.style.visibility = 'hidden';

        // Spread immediately — the stack was already visible, so cards fly out from the same spot
        animateToGrid();

        // Hide landing page
        setTimeout(() => {
            landingPage.classList.add('hidden');
            updateCommentsBtnVisibility();
        }, 300);
    }, 1000);
}

// Load tarot data
async function loadTarotData() {
    try {
        const res = await fetch('tarot_cards.json');
        tarotData = await res.json();
        renderCards();
    } catch (error) {
        console.error('Error loading tarot data:', error);
        document.getElementById('cardGrid').innerHTML =
            '<p class="loading">' + t('error.cardLoadFailed') + '</p>';
    }
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Expand cards to 78 (or use all if already 78)
function expandCardsTo78(cards) {
    const targetCount = 78;
    const baseCount = cards.length; // 78 cards total (full tarot deck)
    const timesEach = Math.floor(targetCount / baseCount); // 1 (each card appears once)
    const remainder = targetCount % baseCount; // 0 (no duplicates needed)

    let expanded = [];

    // Add each card 'timesEach' times (3 times each = 66 cards)
    for (let i = 0; i < timesEach; i++) {
        expanded = expanded.concat(cards);
    }

    // Add 'remainder' more cards randomly (12 more to reach 78)
    const shuffledForExtra = shuffleArray([...cards]);
    for (let i = 0; i < remainder; i++) {
        expanded.push(shuffledForExtra[i]);
    }

    return expanded;
}

// Render cards
function renderCards() {
    const cardGrid = document.getElementById('cardGrid');
    const expandedCards = expandCardsTo78(tarotData.cards);
    const shuffledCards = shuffleArray(expandedCards);

    cardGrid.innerHTML = shuffledCards.map((card, index) => `
        <div class="card-container" data-card-id="${card.id}">
            <div class="card">
                <div class="card-face card-back card-back-galaxy">
                    <div class="galaxy-bg"></div>
                    <img class="card-back-seal" src="images/seal_transparent.png" alt="Seal">
                </div>
                <div class="card-face card-front">
                    <img data-src="images/tarot/${card.image}" alt="${card.name}">
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners and hover effects
    document.querySelectorAll('.card-container').forEach((container, index) => {
        container.addEventListener('click', () => {
            const cardId = parseInt(container.dataset.cardId);
            selectCard(cardId, container);
        });

        // Store original transform for hover effects
        container.dataset.index = index;

        // No hover effects - card stays at original size and z-index
    });

    // Apply stacked layout initially (animation triggered later)
    applyStackedLayout();

    // Setup drag-to-select (once per cardGrid element)
    if (!cardGrid._dragSetup) {
        setupCardDrag(cardGrid);
        cardGrid._dragSetup = true;
    }
}

// Drag upward to select a card — drag up ≥ half the card height to confirm
function setupCardDrag(cardGrid) {
    var dragCard = null;
    var startY = 0;
    var startX = 0;
    var isDragging = false;
    var dragDist = 0;
    var preventNextClick = false;

    function onDragStart(clientX, clientY, container) {
        if (isAnimating) return;
        if (!container.classList.contains('spread')) return;

        dragCard = container;
        startY = clientY;
        startX = clientX;
        isDragging = false;
        dragDist = 0;
        // Allow the dragged card to render above the grid boundary
        cardGrid.style.overflow = 'visible';
    }

    function onDragMove(clientX, clientY, e) {
        if (!dragCard) return;

        dragDist = startY - clientY; // positive = up
        var dx = Math.abs(clientX - startX);

        // Start drag only if moving mostly upward past a small threshold
        if (!isDragging && dragDist > 8 && dragDist > dx) {
            isDragging = true;
            dragCard.style.transition = 'none';
            dragCard.style.zIndex = '200';
        }

        if (isDragging) {
            if (e && e.cancelable) e.preventDefault();

            var clampedDist = Math.max(0, dragDist);
            var threshold = dragCard.offsetHeight;
            var progress = Math.min(clampedDist / threshold, 1);

            dragCard.style.transform = 'translateY(' + (-clampedDist) + 'px) scale(' + (1 + progress * 0.15) + ')';
            dragCard.style.opacity = String(1 - progress * 0.3);

            // Trigger selection immediately at 100% card height
            if (clampedDist >= threshold) {
                var card = dragCard;
                var cardId = parseInt(card.dataset.cardId);

                // Reset drag state
                dragCard = null;
                isDragging = false;
                dragDist = 0;
                startY = 0;
                startX = 0;

                preventNextClick = true;
                setTimeout(function() { preventNextClick = false; }, 100);

                card.style.opacity = '';
                card.style.transition = '';
                cardGrid.style.overflow = '';
                selectCard(cardId, card);
            }
        }
    }

    function onDragEnd() {
        if (!dragCard) return;

        var card = dragCard;
        var wasDragging = isDragging;

        // Reset state
        dragCard = null;
        isDragging = false;
        dragDist = 0;
        startY = 0;
        startX = 0;

        if (!wasDragging) return;

        // Block the click event that follows a drag on mouse
        preventNextClick = true;
        setTimeout(function() { preventNextClick = false; }, 100);

        // Didn't reach threshold — snap back
        card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        setTimeout(function() {
            card.style.transition = '';
            cardGrid.style.overflow = '';
        }, 300);
    }

    // Touch events (delegated on cardGrid)
    cardGrid.addEventListener('touchstart', function(e) {
        var container = e.target.closest('.card-container');
        if (container) onDragStart(e.touches[0].clientX, e.touches[0].clientY, container);
    }, { passive: true });

    cardGrid.addEventListener('touchmove', function(e) {
        if (dragCard) onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });

    cardGrid.addEventListener('touchend', onDragEnd);
    cardGrid.addEventListener('touchcancel', onDragEnd);

    // Mouse events
    cardGrid.addEventListener('mousedown', function(e) {
        var container = e.target.closest('.card-container');
        if (container) {
            e.preventDefault(); // prevent text selection during drag
            onDragStart(e.clientX, e.clientY, container);
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (dragCard) onDragMove(e.clientX, e.clientY, e);
    });

    document.addEventListener('mouseup', onDragEnd);

    // Block click after a mouse drag (capture phase fires before card's click handler)
    cardGrid.addEventListener('click', function(e) {
        if (preventNextClick) {
            e.stopPropagation();
            e.preventDefault();
            preventNextClick = false;
        }
    }, true);
}

// Apply stacked layout (initial state) - uses grid card size for consistent sizing
function applyStackedLayout() {
    const grid = document.querySelector('.card-grid');
    const containers = document.querySelectorAll('.card-container');

    // Use grid card size so stack matches the distributed card size
    const layout = calculateCardLayout();
    const cardWidth = layout ? layout.cardW : getStackParams().cardWidth;
    const cardHeight = layout ? layout.cardH : getStackParams().cardHeight;

    containers.forEach((container, index) => {
        // Small random offset for natural stack look
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 3;
        const rotation = (Math.random() - 0.5) * 8;

        container.classList.add('stacked');
        container.classList.remove('spread');
        container.style.position = 'absolute';
        container.style.width = `${cardWidth}px`;
        container.style.height = `${cardHeight}px`;
        container.style.left = `calc(50% - ${cardWidth/2}px + ${offsetX}px)`;
        container.style.top = `calc(50% - ${cardHeight/2}px + ${offsetY}px)`;
        container.style.transform = `rotate(${rotation}deg)`;
        container.style.zIndex = index;
        container.style.transition = 'none';
        container.style.opacity = '0';
        container.style.marginLeft = '';
        container.style.marginBottom = '';
    });
}

// Get CSS padding for the card grid based on screen width
function getGridPadding() {
    const w = window.innerWidth;
    if (w <= 480) return { padTop: 6, padBottom: 6, padSide: 8 };
    if (w <= 768) return { padTop: 8, padBottom: 8, padSide: 10 };
    return { padTop: 10, padBottom: 10, padSide: 10 };
}

// Calculate optimal overlapping card layout based on available space
function calculateCardLayout() {
    const grid = document.querySelector('.card-grid');
    if (!grid) return null;

    const totalCards = grid.querySelectorAll('.card-container').length;
    if (totalCards === 0) return null;

    const ASPECT = 1.78;        // card height / width ratio
    const V_OVERLAP = 0.08;     // 8% vertical overlap between rows
    const MAX_H_OVERLAP = 0.65; // max 65% horizontal overlap (35% of card visible)
    const NUM_ROWS = 6;
    const NUM_COLS = 13;        // 6 × 13 = 78 cards

    // Use hardcoded padding (matches CSS media queries) to avoid stacked-state issues
    const { padTop, padBottom, padSide } = getGridPadding();
    const gridW = grid.clientWidth;
    const gridH = grid.clientHeight;
    const availH = gridH - padTop - padBottom;
    const availW = gridW - padSide * 2;

    if (availW <= 0 || availH <= 0) return null;

    // Card size from vertical constraint (6 rows with overlap)
    const cardH_fromH = availH / (NUM_ROWS * (1 - V_OVERLAP) + 2 * V_OVERLAP);
    const cardW_fromH = cardH_fromH / ASPECT;

    // Card size from horizontal constraint (13 cards with max allowed overlap)
    // availW = cardW + (NUM_COLS-1) * cardW * (1 - MAX_H_OVERLAP)
    const cardW_fromW = availW / (1 + (NUM_COLS - 1) * (1 - MAX_H_OVERLAP));

    // Use the smaller to guarantee cards fit both ways (always 6 rows)
    const cardW = Math.min(cardW_fromH, cardW_fromW);
    const cardH = cardW * ASPECT;

    // Horizontal overlap so 13 cards fit in available width
    const hOverlap = Math.max(0, (NUM_COLS * cardW - availW) / (NUM_COLS - 1));
    const vOverlap = cardH * V_OVERLAP;

    // Calculate absolute positions for each card in the grid
    const outerW = cardW - hOverlap;   // effective width per card slot
    const outerH = cardH - vOverlap;   // effective height per card slot
    const totalRowW = (NUM_COLS - 1) * outerW + cardW;
    const startX = padSide + (availW - totalRowW) / 2;  // horizontally center
    const totalGridH = NUM_ROWS * outerH + vOverlap; // last row gets full height
    const startY = padTop + (availH - totalGridH) / 2;  // vertically center

    const positions = [];
    for (let i = 0; i < totalCards; i++) {
        const row = Math.floor(i / NUM_COLS);
        const col = i % NUM_COLS;
        positions.push({
            x: startX + col * outerW,
            y: startY + row * outerH
        });
    }

    return {
        rows: NUM_ROWS, cols: NUM_COLS, cardW, cardH, hOverlap, vOverlap,
        positions, gridW, gridH
    };
}

// Apply calculated overlapping layout to spread cards (absolute positioning)
function applyCardLayout() {
    const grid = document.querySelector('.card-grid');
    if (!grid || grid.classList.contains('stacked')) return;

    const layout = calculateCardLayout();
    if (!layout) return;

    const containers = grid.querySelectorAll('.card-container.spread');
    containers.forEach((c, index) => {
        const target = layout.positions[index];
        if (!target) return;
        c.style.position = 'absolute';
        c.style.width = `${layout.cardW}px`;
        c.style.height = `${layout.cardH}px`;
        c.style.left = `${target.x}px`;
        c.style.top = `${target.y}px`;
        c.style.zIndex = index;
        c.style.marginLeft = '';
        c.style.marginBottom = '';
    });
}

// Animate cards from stack to overlapping grid rows (fly from center)
function animateToGrid() {
    playSoundEffect('cardSpread');
    _pauseLazyLoad(); // pause background downloads during animation

    const grid = document.querySelector('.card-grid');
    const containers = Array.from(document.querySelectorAll('.card-container'));
    const totalCards = containers.length;

    // Calculate target layout while still in stacked state
    const layout = calculateCardLayout();
    if (!layout || !grid) return;

    // Make all stacked cards visible so the stack appears
    containers.forEach(c => { c.style.opacity = '1'; });

    // Deal cards: top-left first → right → next row (grid index 0 flies first)
    const DELAY_PER_CARD = 18;  // ms between each card (~1 card per frame at 60fps)
    const FLY_DURATION = 380;   // ms for each card's flight

    // Pre-calculate the center position (where stacked cards are)
    const gridRect = grid.getBoundingClientRect();
    const centerX = gridRect.width / 2 - layout.cardW / 2;
    const centerY = gridRect.height / 2 - layout.cardH / 2;

    // First: set all cards to final size at center, using transform for flight
    containers.forEach((container, gridIndex) => {
        const posIndex = totalCards - 1 - gridIndex;
        const target = layout.positions[posIndex];
        // Place at final position instantly (no transition yet)
        container.style.position = 'absolute';
        container.style.width = `${layout.cardW}px`;
        container.style.height = `${layout.cardH}px`;
        container.style.left = `${target.x}px`;
        container.style.top = `${target.y}px`;
        container.style.marginLeft = '';
        container.style.marginBottom = '';
        // Offset back to center via transform (card appears at center)
        const dx = centerX - target.x;
        const dy = centerY - target.y;
        const rotation = parseFloat(container.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] || 0);
        container.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`;
        container.style.transition = 'none';
    });

    // Force reflow once
    void grid.offsetHeight;

    // Then: animate each card from center to final position via transform
    containers.forEach((container, gridIndex) => {
        const posIndex = totalCards - 1 - gridIndex;
        const delay = posIndex * DELAY_PER_CARD;

        setTimeout(() => {
            container.classList.remove('stacked');
            container.classList.add('spread');
            container.style.transition = `transform ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            container.style.transform = 'translate(0, 0) rotate(0deg)';
            container.style.zIndex = totalCards + posIndex;
        }, delay);
    });

    // After all cards have landed, set final state and add floating
    const totalAnimTime = (totalCards - 1) * DELAY_PER_CARD + FLY_DURATION + 50;
    setTimeout(() => {
        grid.classList.remove('stacked');
        containers.forEach((container, gridIndex) => {
            const posIndex = totalCards - 1 - gridIndex;
            container.style.zIndex = posIndex;
            container.style.transition = '';
            container.style.transform = '';
            container.style.setProperty('--float-delay', `${(gridIndex % 10) * 0.3}s`);
            requestAnimationFrame(() => { container.classList.add('floating'); });
        });
        _resumeLazyLoad(); // resume background downloads after animation
    }, totalAnimTime);
}

// Get responsive card parameters for stacked state
function getStackParams() {
    const width = window.innerWidth;
    if (width <= 480) {
        return { cardWidth: 40, cardHeight: 71 };
    } else if (width <= 768) {
        return { cardWidth: 50, cardHeight: 89 };
    }
    return { cardWidth: 65, cardHeight: 116 };
}

// Apply grid layout (after resize etc.)
function applyGridLayout() {
    const grid = document.querySelector('.card-grid');
    if (!grid) return;
    const containers = grid.querySelectorAll('.card-container');
    const layout = calculateCardLayout();
    if (!layout) return;

    containers.forEach((container, index) => {
        if (container.classList.contains('spread')) {
            const target = layout.positions[index];
            if (!target) return;
            container.style.position = 'absolute';
            container.style.width = `${layout.cardW}px`;
            container.style.height = `${layout.cardH}px`;
            container.style.left = `${target.x}px`;
            container.style.top = `${target.y}px`;
            container.style.transform = '';
            container.style.zIndex = index;
            container.style.marginLeft = '';
            container.style.marginBottom = '';
        }
    });
}

// Create sparkle particles for card selection
var _categoryParticles = {
    love:    ['♥', '♡', '❤'],
    work:    ['★', '✦', '⚡'],
    finance: ['✦', '◆', '$']
};

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const symbols = _categoryParticles[currentReadingCategory];
    const count = symbols ? 10 : 12;

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = symbols ? 'sparkle sparkle-icon' : 'sparkle';

        if (symbols) {
            sparkle.textContent = symbols[i % symbols.length];
        }

        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 50 + Math.random() * 45;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const spin = Math.round((Math.random() - 0.5) * 180);

        sparkle.style.left = `${centerX}px`;
        sparkle.style.top = `${centerY}px`;
        sparkle.style.setProperty('--sparkle-x', `${x}px`);
        sparkle.style.setProperty('--sparkle-y', `${y}px`);
        sparkle.style.setProperty('--sparkle-spin', `${spin}deg`);
        sparkle.style.animationDelay = `${Math.random() * 0.2}s`;

        if (!symbols) {
            sparkle.style.width = `${6 + Math.random() * 6}px`;
            sparkle.style.height = sparkle.style.width;
        } else {
            sparkle.style.fontSize = `${10 + Math.random() * 8}px`;
        }

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1100);
    }
}

// ========================================
// Reveal Overlay
// ========================================
var revealOverlayActive = false;
var revealQueue = [];
var revealIndex = 0;
var revealSkipping = false;
var revealCardData = null;
var _revealTapHandler = null;
var _revealSkipHandler = null;

function showRevealOverlay() {
    var overlay = document.getElementById('revealOverlay');
    var fanWrapper = document.getElementById('revealFanWrapper');
    var skipBtn = document.getElementById('revealSkipBtn');
    var prompt = document.getElementById('revealPrompt');

    // Build fan HTML based on reading mode
    fanWrapper.innerHTML = buildRevealFan();

    // Determine total cards
    var totalCards = (currentReadingMode === 'single') ? 1 : multiCardTarget;

    // Show/hide skip button
    skipBtn.style.display = (totalCards > 1) ? 'block' : 'none';
    var t = translations[currentLang] && translations[currentLang].reveal;
    skipBtn.textContent = (t && t.skip) || 'Skip ›';

    // Set prompt text
    prompt.textContent = (t && t.tapToReveal) || 'Tap to reveal';
    prompt.style.opacity = '';

    // Reset card info display
    var cardInfo = document.getElementById('revealCardInfo');
    cardInfo.classList.remove('visible', 'switching');
    document.getElementById('revealCardInfoName').textContent = '';
    document.getElementById('revealCardInfoQuote').textContent = '';

    // Initialize reveal state
    revealQueue = Array.from(fanWrapper.querySelectorAll('.three-card-item, .multi-card-item'));
    revealIndex = 0;
    revealSkipping = false;
    revealOverlayActive = true;

    // Show overlay
    overlay.classList.remove('closing');
    overlay.classList.add('active');

    // Clear 78-card grid now (hidden behind overlay) to free GPU for flip animation
    var cardGrid = document.getElementById('cardGrid');
    if (cardGrid) cardGrid.innerHTML = '';

    // Auto-reveal first card after overlay appears
    setTimeout(function() {
        if (revealQueue.length > 0) {
            revealCard(0);
            revealIndex = 1;
            // Highlight next card if there is one
            if (revealIndex < revealQueue.length) {
                revealQueue[revealIndex].classList.add('reveal-next');
            } else {
                showRevealContinuePrompt();
            }
        }
    }, 600);

    // Clean up old handlers if any
    if (_revealTapHandler) overlay.removeEventListener('click', _revealTapHandler);
    if (_revealSkipHandler) skipBtn.removeEventListener('click', _revealSkipHandler);

    // Attach handlers
    _revealTapHandler = function(e) { handleRevealTap(e); };
    _revealSkipHandler = function(e) { handleRevealSkip(e); };
    overlay.addEventListener('click', _revealTapHandler);
    skipBtn.addEventListener('click', _revealSkipHandler);
}

function buildRevealFan() {
    if (currentReadingMode === 'single') {
        return buildSingleCardReveal();
    } else if (currentReadingMode === 'three-card') {
        return buildThreeCardReveal();
    } else if (currentReadingMode === 'four-card') {
        return buildFourCardReveal();
    }
    // Fallback for future modes
    return buildSingleCardReveal();
}

function buildCardBackHTML() {
    return '<div class="card-back-galaxy">' +
        '<div class="galaxy-bg"></div>' +
        '<div class="galaxy-stars"></div>' +
        '<div class="galaxy-shimmer"></div>' +
        '<img class="card-back-seal" src="images/seal_transparent.png" alt="">' +
        '</div>';
}

function buildSingleCardReveal() {
    var card = revealCardData;
    return '<div class="reveal-single-fan">' +
        '<div class="three-card-item">' +
            '<div class="three-card-flipper">' +
                '<div class="three-card-face three-card-back">' + buildCardBackHTML() + '</div>' +
                '<div class="three-card-face three-card-front">' +
                    '<img class="three-card-front-img" src="images/tarot/' + card.image + '" alt="' + card.name + '">' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function buildThreeCardReveal() {
    var posClasses = ['three-card-left', 'three-card-center', 'three-card-right'];
    var posKeys = ['past', 'present', 'future'];
    var html = '<div class="three-card-fan">';
    for (var i = 0; i < multiCardSelections.length; i++) {
        var sel = multiCardSelections[i];
        var posLabel = (translations[currentLang] && translations[currentLang].landing && translations[currentLang].landing[posKeys[i]]) || posKeys[i];
        html += '<div class="three-card-item ' + posClasses[i] + '">' +
            '<div class="three-card-flipper">' +
                '<div class="three-card-face three-card-back">' + buildCardBackHTML() + '</div>' +
                '<div class="three-card-face three-card-front">' +
                    '<img class="three-card-front-img" src="images/tarot/' + sel.card.image + '" alt="' + sel.card.name + '">' +
                '</div>' +
            '</div>' +
            '<span class="card-position-label">' + posLabel + '</span>' +
        '</div>';
    }
    html += '</div>';
    return html;
}

function buildFourCardReveal() {
    var posClasses = ['fc-1', 'fc-2', 'fc-3', 'fc-4'];
    var posKeys = ['past', 'present', 'future', 'outcome'];
    var html = '<div class="multi-card-fan four-card-fan">';
    for (var i = 0; i < multiCardSelections.length; i++) {
        var sel = multiCardSelections[i];
        var posLabel = (translations[currentLang] && translations[currentLang].landing && translations[currentLang].landing[posKeys[i]]) || posKeys[i];
        html += '<div class="multi-card-item ' + posClasses[i] + '">' +
            '<div class="multi-card-flipper">' +
                '<div class="multi-card-face multi-card-back">' + buildCardBackHTML() + '</div>' +
                '<div class="multi-card-face multi-card-front">' +
                    '<img class="multi-card-front-img" src="images/tarot/' + sel.card.image + '" alt="' + sel.card.name + '">' +
                '</div>' +
            '</div>' +
            '<span class="card-position-label">' + posLabel + '</span>' +
        '</div>';
    }
    html += '</div>';
    return html;
}

function handleRevealTap(e) {
    // Ignore clicks on the skip button
    if (e.target.closest('.reveal-skip-btn')) return;
    if (revealSkipping) return;

    if (revealIndex < revealQueue.length) {
        // Reveal next card
        revealCard(revealIndex);
        revealIndex++;

        // Update highlight
        revealQueue.forEach(function(c) { c.classList.remove('reveal-next'); });
        if (revealIndex < revealQueue.length) {
            revealQueue[revealIndex].classList.add('reveal-next');
        }

        // Check if all revealed
        if (revealIndex >= revealQueue.length) {
            showRevealContinuePrompt();
        }
    } else {
        // All revealed, proceed to result
        dismissRevealOverlay();
    }
}

function revealCard(index) {
    var cardEl = revealQueue[index];
    cardEl.classList.remove('reveal-next');

    // Ensure front image is loaded before flipping
    var frontImg = cardEl.querySelector('.three-card-front-img, .multi-card-front-img');
    if (frontImg && !frontImg.complete) {
        frontImg.onload = frontImg.onerror = function() {
            frontImg.onload = frontImg.onerror = null;
            _doRevealFlip(cardEl, index);
        };
    } else {
        _doRevealFlip(cardEl, index);
    }
}

function _doRevealFlip(cardEl, index) {
    playSoundEffect('cardReveal');

    if (cardEl.classList.contains('three-card-item')) {
        // ScaleX flip for three-card
        var flipper = cardEl.querySelector('.three-card-flipper');
        flipper.style.transform = 'scaleX(0)';
        setTimeout(function() {
            cardEl.classList.add('flipped');
            flipper.style.transform = 'scaleX(1)';
        }, 400);
    } else {
        // 3D flip for multi-card
        cardEl.classList.add('peek-flip');
    }

    // Show card info (name + category quote)
    if (!revealSkipping) {
        var cardData = getRevealCardData(index);
        if (cardData) {
            showRevealCardInfo(cardData);
        }
    }
}

function getRevealCardData(index) {
    if (currentReadingMode === 'single') {
        return revealCardData;
    }
    if (multiCardSelections && multiCardSelections[index]) {
        return multiCardSelections[index].card;
    }
    return null;
}

function showRevealCardInfo(cardData) {
    var infoEl = document.getElementById('revealCardInfo');
    var nameEl = document.getElementById('revealCardInfoName');
    var quoteEl = document.getElementById('revealCardInfoQuote');

    // Get card name
    var name = getCardName(cardData.name);

    // Get category-specific quote if category is set, otherwise general quote
    var quote = '';
    if (currentReadingCategory) {
        quote = getCardCategoryField(cardData, currentReadingCategory + 'Quote');
    }
    if (!quote) {
        quote = getCardQuote(cardData);
    }

    // If info is already visible, do a switching animation
    if (infoEl.classList.contains('visible')) {
        infoEl.classList.add('switching');
        setTimeout(function() {
            nameEl.textContent = name;
            quoteEl.textContent = quote;
            infoEl.classList.remove('switching');
            // Re-trigger animations by removing and re-adding visible
            infoEl.classList.remove('visible');
            void infoEl.offsetWidth; // force reflow
            infoEl.classList.add('visible');
        }, 250);
    } else {
        nameEl.textContent = name;
        quoteEl.textContent = quote;
        infoEl.classList.add('visible');
    }
}

function handleRevealSkip(e) {
    e.stopPropagation();
    if (revealSkipping) return;
    revealSkipping = true;

    // Hide skip button and card info immediately
    document.getElementById('revealSkipBtn').style.display = 'none';
    var infoEl = document.getElementById('revealCardInfo');
    infoEl.classList.remove('visible');
    infoEl.classList.add('switching');

    // Auto-flip remaining cards
    var startIdx = revealIndex;
    var remaining = revealQueue.length - startIdx;
    for (var i = 0; i < remaining; i++) {
        (function(idx, delay) {
            setTimeout(function() {
                revealCard(idx);
                if (idx >= revealQueue.length - 1) {
                    // Show last card's info after skip completes
                    var lastCardData = getRevealCardData(idx);
                    if (lastCardData) {
                        infoEl.classList.remove('switching');
                        showRevealCardInfo(lastCardData);
                    }
                    showRevealContinuePrompt();
                    revealSkipping = false;
                }
            }, delay);
        })(startIdx + i, i * 200);
    }
    revealIndex = revealQueue.length;

    // Remove highlight
    revealQueue.forEach(function(c) { c.classList.remove('reveal-next'); });
}

function showRevealContinuePrompt() {
    var prompt = document.getElementById('revealPrompt');
    var t = translations[currentLang] && translations[currentLang].reveal;
    prompt.textContent = (t && t.tapToContinue) || 'Tap to see your reading';
    document.getElementById('revealSkipBtn').style.display = 'none';
}

function dismissRevealOverlay() {
    var overlay = document.getElementById('revealOverlay');
    revealOverlayActive = false;

    // Remove listeners
    if (_revealTapHandler) overlay.removeEventListener('click', _revealTapHandler);
    if (_revealSkipHandler) document.getElementById('revealSkipBtn').removeEventListener('click', _revealSkipHandler);
    _revealTapHandler = null;
    _revealSkipHandler = null;

    // Hide card info, prompt, skip button
    var cardInfo = document.getElementById('revealCardInfo');
    cardInfo.classList.remove('visible');
    cardInfo.classList.add('switching');
    document.getElementById('revealPrompt').style.opacity = '0';

    // Step 1: Minimize overlay to top bar
    overlay.classList.add('minimized');

    // Step 2: Prepare result panel behind the overlay
    setTimeout(function() {
        if (currentReadingMode === 'single') {
            proceedToResult(revealCardData, true);
        } else {
            proceedToMultiResult();
        }
    }, 300);

    // Step 3: Add scroll-down indicator
    var scrollHint = document.createElement('div');
    scrollHint.className = 'reveal-scroll-hint';
    scrollHint.innerHTML = '<div class="reveal-scroll-hint-line"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    document.body.appendChild(scrollHint);
    setTimeout(function() { scrollHint.classList.add('visible'); }, 500);

    // Step 4: Dismiss fully — stash overlay (keep content for re-open)
    var _dismissed = false;
    function fullyDismiss() {
        if (_dismissed) return;
        _dismissed = true;
        clearTimeout(_autoDismiss);
        scrollHint.removeEventListener('click', fullyDismiss);
        resultPanel.removeEventListener('scroll', _scrollDismiss);

        overlay.classList.add('closing');
        setTimeout(function() {
            overlay.classList.remove('active', 'minimized', 'closing');
            overlay.classList.add('stashed');
            overlay.style.transform = '';
            cardInfo.classList.remove('switching');
            document.getElementById('revealPrompt').style.opacity = '';
            if (scrollHint.parentNode) scrollHint.remove();
            // Add view-cards button on sticky card
            _addRevealReopenBtn();
            // Enable pull-down to reopen
            _initPullDownToReveal();
        }, 400);
    }

    // Tap scroll-hint chevron to dismiss
    scrollHint.addEventListener('click', fullyDismiss);

    // Scroll result panel to dismiss
    var resultPanel = document.getElementById('resultPanel');
    function _scrollDismiss() {
        if (resultPanel.scrollTop > 30) fullyDismiss();
    }
    setTimeout(function() {
        resultPanel.addEventListener('scroll', _scrollDismiss, { passive: true });
    }, 500);

    // Auto-dismiss after 3.5 seconds
    var _autoDismiss = setTimeout(fullyDismiss, 3500);
}

// ── Re-open reveal overlay from result page ──

function _addRevealReopenBtn() {
    if (document.querySelector('.reveal-reopen-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'reveal-reopen-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><rect x="2" y="3" width="8" height="12" rx="1.5"/><rect x="14" y="3" width="8" height="12" rx="1.5"/><path d="M6 19l6-3 6 3"/></svg>';
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        reopenRevealOverlay();
    });
    document.body.appendChild(btn);
}

function _removeRevealReopenBtn() {
    var btn = document.querySelector('.reveal-reopen-btn');
    if (btn) btn.remove();
}

var _pullDownTouchY = 0;
var _pullDownHandler = null;
var _pullDownStartHandler = null;

function _initPullDownToReveal() {
    _destroyPullDownToReveal();
    var resultPanel = document.getElementById('resultPanel');
    _pullDownStartHandler = function(e) { _pullDownTouchY = e.touches[0].clientY; };
    _pullDownHandler = function(e) {
        if (resultPanel.scrollTop > 0) return;
        var dy = e.touches[0].clientY - _pullDownTouchY;
        if (dy > 70) {
            _pullDownTouchY = 9999; // prevent re-trigger
            reopenRevealOverlay();
        }
    };
    resultPanel.addEventListener('touchstart', _pullDownStartHandler, { passive: true });
    resultPanel.addEventListener('touchmove', _pullDownHandler, { passive: true });
}

function _destroyPullDownToReveal() {
    var resultPanel = document.getElementById('resultPanel');
    if (_pullDownStartHandler) resultPanel.removeEventListener('touchstart', _pullDownStartHandler);
    if (_pullDownHandler) resultPanel.removeEventListener('touchmove', _pullDownHandler);
    _pullDownStartHandler = null;
    _pullDownHandler = null;
}

function reopenRevealOverlay() {
    var overlay = document.getElementById('revealOverlay');
    if (!overlay.classList.contains('stashed')) return;
    var fanWrapper = document.getElementById('revealFanWrapper');
    if (!fanWrapper.innerHTML.trim()) return; // no content to show

    gtag('event', 'reopen_reveal', { event_category: 'engagement' });

    overlay.classList.remove('stashed');
    overlay.classList.add('active');

    // Show card info of the last revealed card
    var cardInfo = document.getElementById('revealCardInfo');
    cardInfo.classList.add('visible');
    cardInfo.classList.remove('switching');

    // Show prompt to go back
    var prompt = document.getElementById('revealPrompt');
    var tr = translations[currentLang] && translations[currentLang].reveal;
    prompt.textContent = (tr && tr.tapToClose) || 'Tap to go back';
    prompt.style.opacity = '';

    // Dismiss on tap or swipe up
    function _closeback() {
        overlay.removeEventListener('click', _closeback);
        overlay.removeEventListener('touchstart', _tsHandler);
        overlay.removeEventListener('touchend', _teHandler);
        prompt.style.opacity = '0';
        overlay.classList.add('closing');
        setTimeout(function() {
            overlay.classList.remove('active', 'closing');
            overlay.classList.add('stashed');
        }, 400);
    }

    setTimeout(function() {
        overlay.addEventListener('click', _closeback);
    }, 300);

    // Swipe up to close
    var _ty = 0;
    function _tsHandler(e) { _ty = e.touches[0].clientY; }
    function _teHandler(e) {
        if (_ty - e.changedTouches[0].clientY > 50) _closeback();
    }
    overlay.addEventListener('touchstart', _tsHandler, { passive: true });
    overlay.addEventListener('touchend', _teHandler, { passive: true });
}

// Select card
function selectCard(cardId, cardElement) {
    if (isAnimating) return;

    const card = tarotData.cards.find(c => c.id === cardId);
    if (!card) return;

    // Multi-card mode: quick-select without center card animation
    if (multiCardTarget > 0) {
        selectCardMulti(card, cardElement);
        return;
    }

    isAnimating = true;

    gtag('event', 'select_card', {
        event_category: 'engagement',
        card_name: card.name,
        card_id: cardId
    });

    selectedCardElement = cardElement;

    // Play card flip sound effect when picking a card
    playSoundEffect('cardFlip');

    // Step 1: Add selecting class for golden glow
    cardElement.classList.add('selecting');

    // Create sparkle particles
    createSparkles(cardElement);

    // Lift the selected card up
    cardElement.style.transition = 'transform 0.4s ease-out';
    cardElement.style.transform = 'translateY(-20px) scale(1.15)';
    cardElement.style.zIndex = '100';

    // Fade out and disable other cards (preserve already-disabled multi-card picks)
    document.querySelectorAll('.card-container').forEach(c => {
        if (c !== cardElement) {
            if (_multiDisabledCards.indexOf(c) < 0) {
                c.style.opacity = '';
            }
            c.classList.add('disabled');
        }
    });

    // Step 2: Show reveal overlay after a short delay
    setTimeout(function() {
        // Fade out selected card in grid
        cardElement.style.transition = 'opacity 0.3s ease';
        cardElement.style.opacity = '0';

        // Store card data for reveal overlay
        revealCardData = card;

        // Show reveal overlay
        setTimeout(function() {
            showRevealOverlay();
        }, 300);
    }, 400);
}

// Spawn ambient floating particles around revealed card
function spawnRevealParticles() {
    var container = document.getElementById('centerCardParticles');
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < 15; i++) {
        var p = document.createElement('div');
        p.className = 'center-card-particle';
        var size = 2 + Math.random() * 3;
        var x = Math.random() * 100;
        var y = 10 + Math.random() * 80;
        var dur = 3 + Math.random() * 4;
        var delay = Math.random() * 3;
        var dy = -(15 + Math.random() * 25);
        var dx = -10 + Math.random() * 20;
        p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + '%;top:' + y + '%;--p-dur:' + dur + 's;--p-delay:' + delay + 's;--p-dy:' + dy + 'px;--p-dx:' + dx + 'px;';
        container.appendChild(p);
    }
}

function clearRevealParticles() {
    var container = document.getElementById('centerCardParticles');
    if (container) container.innerHTML = '';
}

// Multi-card quick-select: toggle select/unselect with aura effect
// Multi-pick progress indicator
function showMultiPickIndicator() {
    var existing = document.getElementById('multiPickIndicator');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.id = 'multiPickIndicator';
    el.className = 'multi-pick-indicator';

    // Build dots
    for (var i = 0; i < multiCardTarget; i++) {
        var dot = document.createElement('span');
        dot.className = 'mpi-dot';
        el.appendChild(dot);
    }

    document.getElementById('mainPage').appendChild(el);
    // Trigger entrance animation
    requestAnimationFrame(function() { el.classList.add('visible'); });
}

function updateMultiPickIndicator() {
    var el = document.getElementById('multiPickIndicator');
    if (!el) return;
    var dots = el.querySelectorAll('.mpi-dot');
    for (var i = 0; i < dots.length; i++) {
        if (i < multiCardSelections.length) {
            dots[i].classList.add('filled');
        } else {
            dots[i].classList.remove('filled');
        }
    }
}

function hideMultiPickIndicator() {
    var el = document.getElementById('multiPickIndicator');
    if (!el) return;
    el.classList.add('hiding');
    setTimeout(function() { if (el.parentNode) el.remove(); }, 400);
}

function selectCardMulti(card, cardElement) {
    // Check if already selected — toggle off
    var existingIdx = -1;
    for (var i = 0; i < multiCardSelections.length; i++) {
        if (multiCardSelections[i].card.id === card.id) {
            existingIdx = i;
            break;
        }
    }

    if (existingIdx >= 0) {
        // Unselect
        playSoundEffect('cardFlip');
        multiCardSelections.splice(existingIdx, 1);
        var disIdx = _multiDisabledCards.indexOf(cardElement);
        if (disIdx >= 0) _multiDisabledCards.splice(disIdx, 1);

        cardElement.classList.remove('multi-picked');
        cardElement.style.transform = '';

        // Re-assign positionKeys in order
        for (var r = 0; r < multiCardSelections.length; r++) {
            multiCardSelections[r].positionKey = multiCardPositions[r];
        }
        updateMultiPickIndicator();
        return;
    }

    // Already at max — ignore
    if (multiCardSelections.length >= multiCardTarget) return;

    // Select
    playSoundEffect('cardFlip');

    gtag('event', 'select_card', {
        event_category: 'engagement',
        card_name: card.name,
        card_id: card.id
    });

    var pickIdx = multiCardSelections.length;
    var pKey = multiCardPositions[pickIdx];
    multiCardSelections.push({ card: card, positionKey: pKey });
    _multiDisabledCards.push(cardElement);

    // Visual: lift up + aura
    cardElement.classList.add('multi-picked');
    cardElement.style.transform = 'translateY(-30%)';
    createSparkles(cardElement);

    updateMultiPickIndicator();

    // All cards selected → proceed after a short delay
    if (multiCardSelections.length >= multiCardTarget) {
        isAnimating = true;
        hideMultiPickIndicator();
        document.querySelectorAll('.card-container').forEach(function(c) {
            if (!c.classList.contains('multi-picked')) {
                c.classList.add('disabled');
            }
        });

        setTimeout(function() {
            showRevealOverlay();
        }, 800);
    }
}

// Return to grid after picking a multi-card (not the last one)
function returnToGridForNextPick() {
    var centerEl = document.getElementById('centerCard');
    centerEl.classList.remove('show-info');

    // Fade out center card + overlay
    centerEl.style.transition = 'opacity 0.35s ease';
    centerEl.style.opacity = '0';

    setTimeout(function() {
        centerEl.classList.remove('active');
        centerEl.style.transition = '';
        centerEl.style.opacity = '';
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('centerCardInner').classList.remove('flipped');

        // Re-enable grid cards except already-selected ones
        document.querySelectorAll('.card-container').forEach(function(c) {
            c.classList.remove('disabled');
            c.style.opacity = '';
            c.classList.remove('selecting');
            // Keep selected cards faded out
            if (_multiDisabledCards.indexOf(c) >= 0) {
                c.classList.add('disabled');
                c.style.opacity = '0.25';
                c.style.pointerEvents = 'none';
            }
        });

        isAnimating = false;
    }, 350);
}

// Multi-card result: populate and show all selected cards
function proceedToMultiResult() {
    gtag('event', 'view_multi_result', {
        event_category: 'engagement',
        card_count: multiCardSelections.length
    });

    var container = document.getElementById('multiResultCards');
    if (!container) return;

    // Hide single-card result elements
    document.getElementById('resultCardName').style.display = 'none';
    document.querySelector('.result-quote-block').style.display = 'none';
    document.querySelector('.result-star-divider').style.display = 'none';
    document.querySelector('.result-glass-card').style.display = 'none';
    var fade = document.getElementById('interpretationFade');
    if (fade) fade.style.display = 'none';

    // Populate sticky card with multi-card thumbnails row
    var stickyCard = document.getElementById('resultStickyCard');
    var stickyHtml = '';
    for (var i = 0; i < multiCardSelections.length; i++) {
        var sel = multiCardSelections[i];
        var posLabel = (translations[currentLang] && translations[currentLang].landing && translations[currentLang].landing[sel.positionKey]) || sel.positionKey;
        stickyHtml += '<div class="multi-result-card-item' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">';
        stickyHtml += '<img class="multi-result-card-img" src="images/tarot/' + sel.card.image + '" alt="' + sel.card.name + '">';
        stickyHtml += '<div class="multi-result-card-label">' + posLabel + '</div>';
        stickyHtml += '</div>';
    }
    stickyCard.innerHTML = stickyHtml;
    stickyCard.classList.add('multi-sticky');
    stickyCard.classList.remove('minimized');
    stickyCard.style.display = '';

    // Center first card initially
    var firstItem = stickyCard.querySelector('.multi-result-card-item');
    if (firstItem) {
        setTimeout(function() {
            centerStickyItem(stickyCard, firstItem);
        }, 50);
    }

    // Click sticky card item → scroll to that section + center in header
    stickyCard.querySelectorAll('.multi-result-card-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var idx = parseInt(item.dataset.index);
            var section = document.querySelector('.multi-result-section[data-card-index="' + idx + '"]');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Center clicked card in sticky header (manual scrollLeft to avoid conflicting with section scroll)
            centerStickyItem(stickyCard, item);
        });
    });

    // Build multi-result HTML
    var html = '';

    // Per-card interpretation sections
    for (var j = 0; j < multiCardSelections.length; j++) {
        var s = multiCardSelections[j];
        var pLabel = (translations[currentLang] && translations[currentLang].landing && translations[currentLang].landing[s.positionKey]) || s.positionKey;
        var prophecyTitle = (translations[currentLang] && translations[currentLang].result && translations[currentLang].result.prophecyTitle) || 'คำทำนาย';
        html += '<div class="multi-result-section" data-card-index="' + j + '">';
        html += '<div class="multi-result-position">✦ ' + pLabel + ' ✦</div>';
        html += '<div class="multi-result-card-name">' + getCardName(s.card.name) + '</div>';
        html += '<div class="multi-result-quote">"' + getMultiCardQuote(s.card) + '"</div>';
        html += '<div class="multi-result-glass">';
        html += '<div class="result-section-header">';
        html += '<span>✦ ' + prophecyTitle + ' ✦</span>';
        html += '</div>';
        var interpText = getMultiCardInterpretation(s.card);
        var interpParas = interpText.split(/\n\s*\n/).map(function(p) {
            var safe = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return '<p>' + safe + '</p>';
        }).join('');
        html += '<div class="multi-result-interpretation">' + interpParas + '</div>';
        html += '</div>';
        if (j < multiCardSelections.length - 1) {
            html += '<div class="multi-result-divider"><span></span><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M12 2l2.09 6.26L20.18 9l-4.64 4.14L16.73 20 12 16.77 7.27 20l1.19-6.86L3.82 9l6.09-.74L12 2z" fill="rgba(154,170,212,0.35)" stroke="none"/></svg><span></span></div>';
        }
        html += '</div>';
    }

    container.innerHTML = html;
    container.style.display = 'block';

    var firstCard = multiCardSelections[0].card;

    // Clean up center card + overlay (if active from single-reveal flow)
    var centerCard = document.getElementById('centerCard');
    if (centerCard.classList.contains('active')) {
        centerCard.classList.remove('show-info');
        clearRevealParticles();
        centerCard.classList.add('fly-to-header');
        setTimeout(function() {
            centerCard.classList.remove('active');
            centerCard.classList.remove('fly-to-header');
            centerCard.style.transition = '';
            centerCard.style.transform = '';
            centerCard.style.opacity = '';
            document.getElementById('overlay').classList.remove('active');
        }, 500);
    }

    // Show result panel
    setTimeout(function() {
        var resultPanel = document.getElementById('resultPanel');
        resultPanel.scrollTop = 0;
        resultPanel.classList.add('active');
    }, 200);

    isAnimating = false;
    initStickyCardObserver();
    initCommentForm();
    initCommentMinimizer();

    // Auto-save first card draw
    currentCardData = firstCard;
    _currentDrawCommentId = null;
    _pendingDraw = null;
    autoSaveDrawOnReveal(firstCard);
    updateCommentsBtnVisibility();
}

// Step 6: Card flies to header + show result panel (called after user taps)
function proceedToResult(card, skipFlyAnimation) {
    currentCardData = card;

    gtag('event', 'view_result', {
        event_category: 'engagement',
        card_name: card.name
    });

    // Populate sticky card image, name and quote
    document.getElementById('resultStickyCardImg').src = `images/tarot/${card.image}`;
    document.getElementById('resultStickyCardName').textContent = getCardName(card.name);
    document.getElementById('resultStickyCardQuote').textContent = getCardQuote(card);

    document.getElementById('resultCardName').textContent = getCardName(card.name);
    document.getElementById('resultQuote').textContent = getCardQuote(card);
    setInterpretationHTML(document.getElementById('resultInterpretation'), getCardInterpretation(card));

    // Start sticky card expanded (hero state) — minimizes on scroll
    document.getElementById('resultStickyCard').classList.remove('minimized');

    if (skipFlyAnimation) {
        // Coming from reveal overlay — skip center card animation, just show result
        var centerCard = document.getElementById('centerCard');
        centerCard.classList.remove('active', 'show-info', 'fly-to-header');
        centerCard.style.transition = '';
        centerCard.style.transform = '';
        centerCard.style.opacity = '';
        document.getElementById('overlay').classList.remove('active');

        setTimeout(function() {
            var resultPanel = document.getElementById('resultPanel');
            resultPanel.scrollTop = 0;
            resultPanel.classList.add('active');
        }, 100);
    } else {
        // Original flow: animate center card flying to top-left corner
        var centerCard = document.getElementById('centerCard');
        centerCard.classList.remove('show-info');
        clearRevealParticles();
        centerCard.classList.add('fly-to-header');

        // Show result panel after short delay (card is still flying)
        setTimeout(() => {
            const resultPanel = document.getElementById('resultPanel');
            resultPanel.scrollTop = 0;
            resultPanel.classList.add('active');
        }, 200);

        // Clean up center card + overlay after fly animation
        setTimeout(() => {
            var el = document.getElementById('centerCard');
            el.classList.remove('active');
            el.classList.remove('fly-to-header');
            el.style.transition = '';
            el.style.transform = '';
            el.style.opacity = '';
            document.getElementById('overlay').classList.remove('active');
        }, 500);
    }

    isAnimating = false;

    // Initialize sticky card minimizer (scroll up = expand, scroll down = minimize)
    initStickyCardObserver();

    // Initialize comment form
    initCommentForm();
    initCommentMinimizer();

    // Auto-save draw to Firebase (FB users: empty comment; non-FB: store pending)
    _currentDrawCommentId = null;
    _pendingDraw = null;
    autoSaveDrawOnReveal(card);

    // Show comments button now that result is visible
    updateCommentsBtnVisibility();
}

// Close and reset
function closeResult() {
    if (isAnimating) return;
    isAnimating = true;

    gtag('event', 'close_result', { event_category: 'navigation' });

    const cardGrid = document.getElementById('cardGrid');

    // Reset comment form and draw state
    if (typeof resetCommentForm === 'function') resetCommentForm();
    _currentDrawCommentId = null;

    // Reset comment minimizer
    var cs = document.querySelector('.comment-section');
    if (cs) cs.classList.remove('minimized');
    var rp = document.getElementById('resultPanel');
    if (rp && rp._commentScrollHandler) {
        rp.removeEventListener('scroll', rp._commentScrollHandler);
        rp._commentScrollHandler = null;
    }
    _commentMinimized = false;

    // Clean up sticky card observer
    destroyStickyCardObserver();

    // Reset sticky card state
    var stickyCard = document.getElementById('resultStickyCard');
    if (stickyCard) stickyCard.classList.remove('minimized');

    // Hide result panel
    document.getElementById('resultPanel').classList.remove('active');

    // Reset multi-card state
    multiCardSelections = [];
    multiCardTarget = 0;
    multiCardPositions = [];
    _multiDisabledCards = [];
    var _grid = document.querySelector('.card-grid');
    if (_grid) _grid.classList.remove('multi-select-mode');
    clearCategoryTheme();
    hideMultiPickIndicator();

    // Restore single-card result elements (may have been hidden by multi-result)
    document.getElementById('resultCardName').style.display = '';
    var quoteBlock = document.querySelector('.result-quote-block');
    if (quoteBlock) quoteBlock.style.display = '';
    var starDiv = document.querySelector('.result-star-divider');
    if (starDiv) starDiv.style.display = '';
    var glassCard = document.querySelector('.result-glass-card');
    if (glassCard) glassCard.style.display = '';
    var interpFade = document.getElementById('interpretationFade');
    if (interpFade) interpFade.style.display = '';
    var multiContainer = document.getElementById('multiResultCards');
    if (multiContainer) { multiContainer.style.display = 'none'; multiContainer.innerHTML = ''; }

    // Hide comments button when going back to card spread
    updateCommentsBtnVisibility();

    setTimeout(() => {
        // Hide center card (may already be hidden) + clean up inline styles
        var centerEl = document.getElementById('centerCard');
        centerEl.classList.remove('active');
        centerEl.classList.remove('fly-to-header');
        centerEl.classList.remove('show-info');
        centerEl.style.transition = '';
        centerEl.style.transform = '';
        centerEl.style.opacity = '';

        // Hide overlay
        document.getElementById('overlay').classList.remove('active');

        // Reshuffle and re-render
        setTimeout(() => {
            cardGrid.classList.add('stacked');
            renderCards();
            selectedCardElement = null;
            isAnimating = false;

            // Animate cards from stack to fan
            setTimeout(() => {
                animateToGrid();
            }, 100);
        }, 400);
    }, 300);
}

// Event listeners
document.getElementById('spinningCardContainer').addEventListener('click', startExperience);
document.getElementById('threeCardContainer').addEventListener('click', handleLandingCardClick);
document.getElementById('fourCardContainer').addEventListener('click', handleLandingCardClick);
document.getElementById('tenCardContainer').addEventListener('click', startExperience);
document.getElementById('twelveCardContainer').addEventListener('click', startExperience);
const resultCloseBtn = document.getElementById('resultClose');
if (resultCloseBtn) resultCloseBtn.addEventListener('click', closeResult);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResult();
    }
    if (e.key === 'Enter' || e.key === ' ') {
        // Only trigger from landing page when no interactive element is focused
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A' || e.target.closest('button, a, [role="button"]')) {
            return;
        }
        const landingPage = document.getElementById('landingPage');
        if (!landingPage.classList.contains('hidden')) {
            if (currentReadingMode === 'three-card' || currentReadingMode === 'four-card') {
                handleLandingCardClick();
            } else {
                startExperience();
            }
        }
    }
    // Arrow keys for mode switching on landing page
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const landingPage = document.getElementById('landingPage');
        if (landingPage && !landingPage.classList.contains('hidden')) {
            switchMode(e.key === 'ArrowRight' ? 1 : -1);
        }
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        applyGridLayout();
    }, 100);
});

// Share Functions
const siteUrl = 'https://jubpai.com/';

function getShareText() {
    const cardName = document.getElementById('resultCardName').textContent;
    const quote = document.getElementById('resultQuote').textContent.replace(/[""]/g, '');
    return `${t('share.gotCard')} ${cardName}\n"${quote}"\n\n${t('share.letsRead')}`;
}

function showToast(message) {
    const toast = document.getElementById('copyToast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function shareToFacebook() {
    gtag('event', 'share', {
        event_category: 'sharing',
        method: 'messenger',
        card_name: currentCardData ? currentCardData.name : ''
    });
    var link = encodeURIComponent(siteUrl);
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Deep link opens Messenger app friend picker directly
        window.location.href = 'fb-messenger://share/?link=' + link;
    } else {
        var fbAppId = typeof FACEBOOK_APP_ID !== 'undefined' ? FACEBOOK_APP_ID : '940915038262874';
        window.open(
            'https://www.facebook.com/dialog/send?app_id=' + fbAppId +
            '&link=' + link +
            '&redirect_uri=' + link,
            '_blank', 'width=600,height=500'
        );
    }
}

function shareToLine() {
    gtag('event', 'share', {
        event_category: 'sharing',
        method: 'line',
        card_name: currentCardData ? currentCardData.name : ''
    });
    var text = encodeURIComponent(getShareText() + '\n' + siteUrl);
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Deep link opens LINE app friend picker
        window.location.href = 'https://line.me/R/share?text=' + text;
    } else {
        window.open('https://line.me/R/share?text=' + text, '_blank', 'width=600,height=500');
    }
}

function shareNative() {
    gtag('event', 'share', {
        event_category: 'sharing',
        method: 'native_share',
        card_name: currentCardData ? currentCardData.name : ''
    });
    if (navigator.share) {
        navigator.share({
            title: t('share.title'),
            text: getShareText(),
            url: siteUrl
        }).catch(function() {});
    } else {
        // Desktop fallback: copy to clipboard
        var text = getShareText() + '\n\n' + siteUrl;
        navigator.clipboard.writeText(text).then(function() {
            showToast(t('share.copiedText'));
        });
    }
}

// Comment Functions
const SAVED_NAME_KEY = 'tarot_user_name';
const USER_ID_KEY = 'tarot_user_id';

function generateUserId() {
    return 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

function getUserId() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
}

function getSavedUserName() {
    return localStorage.getItem(SAVED_NAME_KEY) || '';
}

function saveUserName(name) {
    localStorage.setItem(SAVED_NAME_KEY, name.trim());
}

function getCurrentProfilePicture() {
    return localStorage.getItem('tarot_fb_picture') || '';
}

// ========================================
// Display Name & Profile Picture Resolution (live from Firebase profiles)
// ========================================
// In-memory caches: fbUserId (without prefix) → value
const userDisplayNames = new Map();
const userProfilePictures = new Map();
const userProfileCacheTime = new Map();
const PROFILE_CACHE_TTL = 3 * 60 * 1000; // 3 minutes in-memory TTL

async function resolveDisplayNames(items) {
    if (!items || items.length === 0) return;
    if (!window.cardCounter || !window.cardCounter.fetchUserProfile) return;

    // Seed current user's picture from localStorage (instant, no read)
    var currentUserId = localStorage.getItem('tarot_user_id');
    var currentFbPic = localStorage.getItem('tarot_fb_picture');
    if (currentUserId && currentUserId.startsWith('fb_') && currentFbPic) {
        var currentFbId = currentUserId.replace('fb_', '');
        if (!userProfilePictures.has(currentFbId)) {
            userProfilePictures.set(currentFbId, currentFbPic);
        }
    }

    // Collect unique FB user IDs that need fetching (uncached or stale)
    var now = Date.now();
    const fbIdsToFetch = new Set();
    items.forEach(function(item) {
        if (item.userId && item.userId.startsWith('fb_')) {
            const fbId = item.userId.replace('fb_', '');
            var cachedAt = userProfileCacheTime.get(fbId) || 0;
            if (!userDisplayNames.has(fbId) || (now - cachedAt) > PROFILE_CACHE_TTL) {
                fbIdsToFetch.add(fbId);
            }
        }
    });

    // Fetch profiles in parallel
    if (fbIdsToFetch.size > 0) {
        // Clear localStorage cache for stale profiles so Firebase is re-read
        if (window.cardCounter && window.cardCounter.clearProfileCache) {
            fbIdsToFetch.forEach(function(fbId) {
                window.cardCounter.clearProfileCache(fbId);
            });
        }

        await Promise.all(Array.from(fbIdsToFetch).map(async function(fbId) {
            try {
                const profile = await window.cardCounter.fetchUserProfile(fbId);
                if (profile && profile.displayName) {
                    userDisplayNames.set(fbId, profile.displayName);
                }
                if (profile && profile.fbPicture) {
                    userProfilePictures.set(fbId, profile.fbPicture);
                }
                userProfileCacheTime.set(fbId, Date.now());
            } catch (e) { /* ignore */ }
        }));
    }

    // Update items with resolved names and pictures
    items.forEach(function(item) {
        if (item.userId && item.userId.startsWith('fb_')) {
            const fbId = item.userId.replace('fb_', '');
            if (userDisplayNames.has(fbId)) {
                item.userName = userDisplayNames.get(fbId);
            }
            // Use stored profilePicture (from comment/reply data or Firebase profile)
            // Falls back to cached profile picture from Firebase user profile
            if (!item.profilePicture) {
                if (userProfilePictures.has(fbId)) {
                    item.profilePicture = userProfilePictures.get(fbId);
                }
            }
        }
    });
}

// Check localStorage directly — works before facebook.js or FB SDK is ready
function wasPreviouslyConnected() {
    return localStorage.getItem('tarot_fb_connected') === 'true';
}

// Loading animation shown while waiting for FB SDK to confirm login
function buildSocialLoadingCta() {
    return '<div class="comments-empty comments-empty-cta social-loading-cta">' +
        '<div class="tarot-loader" style="width:48px;height:48px">' +
            '<div class="tarot-loader-ring"></div>' +
            '<div class="tarot-loader-ring-inner"></div>' +
            '<div class="tarot-loader-star">✦</div>' +
            '<div class="tarot-loader-orbit"></div>' +
            '<div class="tarot-loader-orbit"></div>' +
            '<div class="tarot-loader-orbit"></div>' +
        '</div>' +
        '<div class="comments-empty-text tarot-loader-text">' + t('common.loading') + '</div>' +
    '</div>';
}

// Called from facebook.js when FB login status is confirmed
function onFacebookStatusReady() {
    var isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();

    // Update tab visibility based on login state
    updateTabVisibility(isLoggedIn);

    // Refresh the current comments tab if it was showing a loading placeholder
    var commentsList = document.getElementById('commentsList');
    if (commentsList && commentsList.querySelector('.social-loading-cta')) {
        switchCommentsTab(currentCommentsTab);
    }
    // Refresh blessing screen login CTA if visible
    var blessingScreen = document.getElementById('blessingScreen');
    if (blessingScreen && blessingScreen.classList.contains('active')) {
        var blessingLoginCta = document.getElementById('blessingLoginCta');
        var commentOverlay = document.querySelector('.blessing-comment-overlay');
        if (isLoggedIn) {
            if (commentOverlay) commentOverlay.style.display = '';
            if (blessingLoginCta) blessingLoginCta.style.display = 'none';

            // Save pending draw from non-FB user who just logged in
            savePendingDrawAfterLogin();
        } else {
            if (commentOverlay) commentOverlay.style.display = 'none';
            if (blessingLoginCta) blessingLoginCta.style.display = '';
        }
    }
}

// Save pending draw data to Firebase after a non-FB user logs in
async function savePendingDrawAfterLogin() {
    if (!_pendingDraw) return;

    var draw = _pendingDraw;
    _pendingDraw = null; // Clear immediately to prevent double-save

    if (!window.cardCounter || !window.cardCounter.submitComment) return;

    var userId = getUserId();
    var userName = getSavedUserName() || 'Me';
    var commentText = draw.comment || '';

    var result = await window.cardCounter.submitComment(
        draw.cardId, draw.cardName, draw.cardImage,
        userId, userName, commentText, getCurrentProfilePicture()
    );

    if (result.success) {
        if (result.id && _pollState.initialized && _pollState.myCommentIds.indexOf(result.id) === -1) {
            _pollState.myCommentIds.push(result.id);
        }
        checkMyCardTab();

        // Save draw history to Firebase
        var fbUserId = typeof getFbUserId === 'function' ? getFbUserId() : null;
        if (fbUserId && window.cardCounter.saveUserDraw) {
            window.cardCounter.saveUserDraw(fbUserId, {
                cardId: draw.cardId,
                cardName: draw.cardName,
                cardImage: draw.cardImage,
                comment: commentText
            });
        }
        saveDrawToLocal({ id: draw.cardId, name: draw.cardName, image: draw.cardImage }, commentText);

        // Update blessing screen to show comment overlay
        var commentOverlay = document.querySelector('.blessing-comment-overlay');
        var blessingName = document.getElementById('blessingName');
        var blessingComment = document.getElementById('blessingComment');
        if (commentOverlay) commentOverlay.style.display = '';
        if (blessingName) blessingName.textContent = userName === 'Me' ? '' : '— ' + userName + ' —';
        if (blessingComment) blessingComment.textContent = commentText ? '"' + commentText + '"' : '';
    }
}

// Avatar helpers
function getFriendCircleInitial(name) {
    var initial = (name || '?').charAt(0).toUpperCase();
    return '<div class="friends-circle-item-default friends-circle-initial">' + escapeHtml(initial) + '</div>';
}

function getDefaultAvatarSvg() {
    return '<div class="comment-avatar comment-avatar-default"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
}

function getProfilePictureHtml(item) {
    if (item && item.profilePicture) {
        return '<img class="comment-avatar" src="' + escapeHtml(item.profilePicture) + '" alt="" onerror="this.outerHTML=getDefaultAvatarSvg()">';
    }
    return getDefaultAvatarSvg();
}

// ========================================
// Draw History (local storage)
// ========================================
function saveDrawToLocal(card, comment) {
    try {
        var draws = JSON.parse(localStorage.getItem('tarot_draw_history') || '[]');
        var cardId = card.id || card.cardId;
        var cardName = card.name || card.cardName;

        // Build multi-card array if in multi-card mode
        var multiCards = null;
        if (multiCardSelections && multiCardSelections.length > 1) {
            multiCards = multiCardSelections.map(function(sel) {
                return {
                    cardId: sel.card.id,
                    cardName: sel.card.name,
                    cardImage: sel.card.image,
                    positionKey: sel.positionKey
                };
            });
        }

        // If most recent draw is same card (autoSave update), update comment only
        if (draws.length > 0 && draws[0].cardId === cardId && comment) {
            draws[0].comment = comment;
        } else {
            var entry = {
                cardId: cardId,
                cardName: cardName,
                cardImage: card.image || card.cardImage,
                comment: comment || '',
                timestamp: Date.now()
            };
            if (multiCards) {
                entry.multiCards = multiCards;
                entry.readingMode = currentReadingMode || 'single';
            }
            if (currentReadingCategory) {
                entry.readingCategory = currentReadingCategory;
            }
            draws.unshift(entry);
        }
        if (draws.length > 50) draws.length = 50;
        localStorage.setItem('tarot_draw_history', JSON.stringify(draws));
    } catch (e) {
        // localStorage full or unavailable
    }
}

function getLocalDrawHistory() {
    try {
        return JSON.parse(localStorage.getItem('tarot_draw_history') || '[]');
    } catch (e) {
        return [];
    }
}

// Show/hide name group based on saved name (called when result panel opens)
function initCommentForm() {
    // Name input has been removed; nothing to initialize
}

// Center a sticky header item horizontally without affecting vertical scroll
function centerStickyItem(container, item) {
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var itemCenter = itemRect.left + itemRect.width / 2;
    var containerCenter = containerRect.left + containerRect.width / 2;
    var scrollDelta = itemCenter - containerCenter;
    container.scrollBy({ left: scrollDelta, behavior: 'smooth' });
}

// Sticky card observer: minimize card when scrolled past
var _stickyCardScrollHandler = null;

function initStickyCardObserver() {
    destroyStickyCardObserver();

    var stickyCard = document.getElementById('resultStickyCard');
    var resultPanel = document.getElementById('resultPanel');
    if (!stickyCard || !resultPanel) return;

    var sentinel = document.getElementById('resultCardSentinel');
    var _lastStickyToggle = 0;
    var _lastActiveIdx = 0;
    var _scrollTicking = false;

    // Cache DOM queries once — avoid querySelectorAll on every scroll
    var _cachedSections = null;
    var _cachedItems = null;
    var _isMultiSticky = stickyCard.classList.contains('multi-sticky');

    function _cacheStickyDom() {
        _cachedSections = resultPanel.querySelectorAll('.multi-result-section');
        _cachedItems = stickyCard.querySelectorAll('.multi-result-card-item');
    }
    if (_isMultiSticky) _cacheStickyDom();

    function _doStickyUpdate() {
        _scrollTicking = false;
        if (!sentinel) return;

        var stickyBottom = stickyCard.getBoundingClientRect().bottom;
        var sentinelTop = sentinel.getBoundingClientRect().top;
        var isMinimized = stickyCard.classList.contains('minimized');

        if (!isMinimized && sentinelTop < stickyBottom - 10) {
            stickyCard.classList.add('minimized');
        } else if (isMinimized && sentinelTop > stickyBottom + 30) {
            stickyCard.classList.remove('minimized');
        }

        // Multi-card: track which section is in view
        if (!_isMultiSticky || !_cachedSections || !_cachedSections.length) return;

        var stickyH = stickyCard.offsetHeight; // cheaper than getBoundingClientRect
        var bestIdx = 0;
        var bestDist = Infinity;
        for (var si = 0; si < _cachedSections.length; si++) {
            var rect = _cachedSections[si].getBoundingClientRect();
            var dist = Math.abs(rect.top - stickyH - 20);
            if (dist < bestDist) { bestDist = dist; bestIdx = si; }
        }

        if (bestIdx !== _lastActiveIdx) {
            _lastActiveIdx = bestIdx;
            if (_cachedItems) {
                _cachedItems.forEach(function(it, ii) {
                    it.classList.toggle('active', ii === bestIdx);
                });
                if (_cachedItems[bestIdx]) {
                    centerStickyItem(stickyCard, _cachedItems[bestIdx]);
                }
            }
        }
    }

    _stickyCardScrollHandler = function() {
        if (_scrollTicking) return;
        _scrollTicking = true;
        requestAnimationFrame(_doStickyUpdate);
    };

    resultPanel.addEventListener('scroll', _stickyCardScrollHandler, { passive: true });
}

function destroyStickyCardObserver() {
    if (_stickyCardScrollHandler) {
        var resultPanel = document.getElementById('resultPanel');
        if (resultPanel) {
            resultPanel.removeEventListener('scroll', _stickyCardScrollHandler);
        }
        _stickyCardScrollHandler = null;
    }
}

// Minimizable comment section: starts minimized (sticky bottom button),
// expands on click or if content fits screen. Once expanded, stays expanded.
var _commentMinimized = false;
var _panelLastScrollTop = 0;

// Force-restart CSS animations on the accept button after un-minimizing
function restartAcceptBtnEffects() {
    var btn = document.querySelector('.comment-submit-btn');
    if (!btn) return;
    // Remove and re-add the node to restart all CSS animations
    void btn.offsetWidth; // force reflow
    btn.style.animation = 'none';
    void btn.offsetWidth;
    btn.style.animation = '';
}

function initCommentMinimizer() {
    var resultPanel = document.getElementById('resultPanel');
    var commentSection = resultPanel ? resultPanel.querySelector('.comment-section') : null;

    if (!resultPanel || !commentSection) return;

    // Clean up previous listener
    if (resultPanel._commentScrollHandler) {
        resultPanel.removeEventListener('scroll', resultPanel._commentScrollHandler);
        resultPanel._commentScrollHandler = null;
    }

    _commentMinimized = false;
    _panelLastScrollTop = 0;
    commentSection.classList.remove('minimized');

    // Wait for panel to render, then decide if we need to minimize
    setTimeout(function() {
        var isScrollable = resultPanel.scrollHeight > resultPanel.clientHeight + 100;
        if (isScrollable) {
            commentSection.classList.add('minimized');
            _commentMinimized = true;

            // Auto-expand when scrolled to bottom
            resultPanel._commentScrollHandler = function() {
                if (!_commentMinimized) return;
                var st = resultPanel.scrollTop;
                var atBottom = (st + resultPanel.clientHeight >= resultPanel.scrollHeight - 80);
                if (atBottom) {
                    _commentMinimized = false;
                    commentSection.classList.remove('minimized');
                    restartAcceptBtnEffects();
                    resultPanel.removeEventListener('scroll', resultPanel._commentScrollHandler);
                    resultPanel._commentScrollHandler = null;
                    // Scroll to bottom after form expands
                    setTimeout(function() {
                        resultPanel.scrollTo({ top: resultPanel.scrollHeight, behavior: 'smooth' });
                    }, 50);
                }
            };
            resultPanel.addEventListener('scroll', resultPanel._commentScrollHandler, { passive: true });
        }
    }, 350);
}

// Auto-save draw to Firebase for FB-connected users (empty comment)
async function autoSaveDrawOnReveal(card) {
    if (!card) return;

    // Build multi-card metadata
    var multiCards = null;
    if (multiCardSelections && multiCardSelections.length > 1) {
        multiCards = multiCardSelections.map(function(sel) {
            return {
                cardId: sel.card.id,
                cardName: sel.card.name,
                cardImage: sel.card.image,
                positionKey: sel.positionKey
            };
        });
    }

    // Only auto-save comment if logged in with Facebook
    var isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();
    if (!isLoggedIn || !window.cardCounter || !window.cardCounter.submitComment) {
        _pendingDraw = {
            cardId: card.id,
            cardName: card.name,
            cardImage: card.image
        };
        saveDrawToLocal(card, '');
        return;
    }

    var userName = getSavedUserName() || 'Me';

    var result = await window.cardCounter.submitComment(
        card.id,
        card.name,
        card.image,
        userId,
        userName,
        '', // empty comment
        getCurrentProfilePicture()
    );

    if (result.success && result.id) {
        _currentDrawCommentId = result.id;

        if (_pollState.initialized && _pollState.myCommentIds.indexOf(result.id) === -1) {
            _pollState.myCommentIds.push(result.id);
        }
        checkMyCardTab();

        var fbUserId = typeof getFbUserId === 'function' ? getFbUserId() : null;
        if (fbUserId && window.cardCounter.saveUserDraw) {
            var drawData = {
                cardId: card.id,
                cardName: card.name,
                cardImage: card.image,
                comment: ''
            };
            if (multiCards) {
                drawData.multiCards = multiCards;
                drawData.readingMode = currentReadingMode;
            }
            if (currentReadingCategory) {
                drawData.readingCategory = currentReadingCategory;
            }
            window.cardCounter.saveUserDraw(fbUserId, drawData);
        }
        saveDrawToLocal(card, '');
    }
}

// Legacy function aliases
function toggleAcceptActions() {}
function toggleCommentForm() {}
function checkCardComments() {}

// Store card data for cardview tab
let cardViewData = null;

// View comments for the current card (opens cardview tab)
async function viewCardComments() {
    if (!currentCardData) return;

    gtag('event', 'view_comments', {
        event_category: 'engagement',
        card_name: currentCardData.name
    });

    // Store card data for the cardview tab
    cardViewData = { ...currentCardData };

    // Open comments panel without loading default tab
    openCommentsPanel(true);

    // Switch to cardview tab immediately
    const commentsTabs = document.getElementById('commentsTabs');
    const cardviewTab = commentsTabs.querySelector('[data-tab="cardview"]');
    const tabPreview = cardviewTab.querySelector('.tab-card-preview');

    // Set the card image in tab
    tabPreview.src = `images/tarot/${cardViewData.image}`;
    tabPreview.alt = cardViewData.name;

    // Show and activate the cardview tab
    cardviewTab.style.display = '';

    // Update active tab
    commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
    cardviewTab.classList.add('active');

    // Switch tab content
    currentCommentsTab = 'cardview';
    switchCommentsTab('cardview');
}

function resetCommentForm() {
    document.getElementById('commentText').value = '';
    document.getElementById('commentCharCount').textContent = '0';
    document.getElementById('commentSubmitBtn').disabled = false;
    document.getElementById('commentSubmitBtn').classList.remove('success');
    document.getElementById('commentSubmitText').textContent = t('comment.submit');
}

// Character count listeners
// Chinese New Year Lanterns
(function createCNYLanterns() {
    const container = document.getElementById('cnyLanterns');
    if (!container) return;

    // Red lantern SVG with gold trim
    const lanternSVG = `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#DC143C"/>
                <stop offset="50%" style="stop-color:#B22222"/>
                <stop offset="100%" style="stop-color:#8B0000"/>
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD700"/>
                <stop offset="50%" style="stop-color:#FFA500"/>
                <stop offset="100%" style="stop-color:#DAA520"/>
            </linearGradient>
        </defs>
        <!-- Top gold cap -->
        <ellipse cx="30" cy="8" rx="10" ry="4" fill="url(#goldGrad)"/>
        <rect x="28" y="2" width="4" height="6" fill="url(#goldGrad)"/>
        <!-- Lantern body -->
        <path d="M 20 10 Q 15 25, 15 40 Q 15 55, 20 70 L 40 70 Q 45 55, 45 40 Q 45 25, 40 10 Z"
              fill="url(#lanternGrad)" stroke="#8B0000" stroke-width="1"/>
        <!-- Gold decorative lines -->
        <line x1="20" y1="15" x2="40" y2="15" stroke="url(#goldGrad)" stroke-width="2"/>
        <line x1="18" y1="40" x2="42" y2="40" stroke="url(#goldGrad)" stroke-width="2.5"/>
        <line x1="20" y1="65" x2="40" y2="65" stroke="url(#goldGrad)" stroke-width="2"/>
        <!-- Bottom gold cap -->
        <ellipse cx="30" cy="72" rx="10" ry="4" fill="url(#goldGrad)"/>
        <!-- Tassel -->
        <path d="M 30 74 L 28 82 L 30 80 L 32 82 Z" fill="url(#goldGrad)" opacity="0.9"/>
    </svg>`;

    // Create exactly 2 lanterns - left and right, symmetrically positioned
    const lanternPositions = [
        { left: '15%', finalTop: '80px', swingDuration: '3s', dropDelay: '0.5s' },  // Left lantern
        { left: '85%', finalTop: '80px', swingDuration: '3.2s', dropDelay: '0.7s' } // Right lantern
    ];

    lanternPositions.forEach(function(pos) {
        const lantern = document.createElement('div');
        lantern.className = 'cny-lantern';
        lantern.innerHTML = lanternSVG;

        // Position settings
        lantern.style.left = pos.left;
        lantern.style.setProperty('--drop-delay', pos.dropDelay);
        lantern.style.setProperty('--drop-duration', '2s');
        lantern.style.setProperty('--final-top', pos.finalTop);
        lantern.style.setProperty('--swing-duration', pos.swingDuration);

        container.appendChild(lantern);
    });
})();

// Header shooting stars — spawns mini shooting stars inside .comments-panel-header
(function() {
    function spawnHeaderStar() {
        var header = document.querySelector('.comments-panel-header');
        if (!header || header.offsetHeight === 0) return;
        var el = document.createElement('div');
        el.className = 'header-shooting-star';
        var angle = 136 + Math.random() * 16;
        var len = 30 + Math.random() * 40;
        var dist = 60 + Math.random() * 80;
        var dur = (0.4 + Math.random() * 0.3).toFixed(2);
        el.style.left = (10 + Math.random() * 80) + '%';
        el.style.top = (Math.random() * 80) + '%';
        el.style.width = len + 'px';
        el.style.setProperty('--hss-angle', angle.toFixed(0) + 'deg');
        el.style.setProperty('--hss-dist', dist.toFixed(0) + 'px');
        el.style.setProperty('--hss-dur', dur + 's');
        header.appendChild(el);
        el.addEventListener('animationend', function() { el.remove(); }, { once: true });
    }
    (function scheduleHeaderStar() {
        var delay = 800 + Math.random() * 1500;
        setTimeout(function() {
            var burst = Math.random() < 0.4 ? 2 : 1;
            for (var i = 0; i < burst; i++) {
                setTimeout(spawnHeaderStar, i * (80 + Math.random() * 150));
            }
            scheduleHeaderStar();
        }, delay);
    })();
})();

// Result panel shooting stars — spawns into result-panel and minimized sticky card
(function() {
    function spawnResultPanelStar() {
        var panel = document.getElementById('resultPanel');
        if (!panel || !panel.classList.contains('active')) return;
        var el = document.createElement('div');
        el.className = 'shooting-star';
        el.style.position = 'fixed';
        el.style.zIndex = '1';
        el.style.left = (20 + Math.random() * 80) + '%';
        el.style.top = (Math.random() * 60) + '%';
        var angle = 136 + Math.random() * 16;
        var len = 50 + Math.random() * 70;
        var dist = 80 + Math.random() * 120;
        var dur = (0.4 + Math.random() * 0.4).toFixed(2);
        el.style.setProperty('--shoot-angle', angle.toFixed(0) + 'deg');
        el.style.setProperty('--shoot-len', len.toFixed(0) + 'px');
        el.style.setProperty('--shoot-dist', dist.toFixed(0) + 'px');
        el.style.setProperty('--shoot-dur', dur + 's');
        panel.appendChild(el);
        el.addEventListener('animationend', function() { el.remove(); }, { once: true });
    }
    function spawnStickyCardStar() {
        var sticky = document.getElementById('resultStickyCard');
        if (!sticky || !sticky.classList.contains('minimized')) return;
        var el = document.createElement('div');
        el.className = 'result-header-shooting-star';
        var angle = 136 + Math.random() * 16;
        var len = 25 + Math.random() * 35;
        var dist = 50 + Math.random() * 70;
        var dur = (0.35 + Math.random() * 0.25).toFixed(2);
        el.style.left = (10 + Math.random() * 80) + '%';
        el.style.top = (Math.random() * 80) + '%';
        el.style.width = len + 'px';
        el.style.setProperty('--hss-angle', angle.toFixed(0) + 'deg');
        el.style.setProperty('--hss-dist', dist.toFixed(0) + 'px');
        el.style.setProperty('--hss-dur', dur + 's');
        sticky.appendChild(el);
        el.addEventListener('animationend', function() { el.remove(); }, { once: true });
    }
    (function scheduleResultStars() {
        var delay = 1200 + Math.random() * 2000;
        setTimeout(function() {
            var burst = Math.random() < 0.3 ? 2 : 1;
            for (var i = 0; i < burst; i++) {
                setTimeout(spawnResultPanelStar, i * (100 + Math.random() * 200));
                setTimeout(spawnStickyCardStar, i * (80 + Math.random() * 150));
            }
            scheduleResultStars();
        }, delay);
    })();
})();

document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.getElementById('commentText');

    if (commentInput) {
        commentInput.addEventListener('input', () => {
            document.getElementById('commentCharCount').textContent = commentInput.value.length;
        });
    }

    // (scroll depth tracking removed for performance)
});

async function submitComment() {
    // If minimized, expand and scroll to bottom — then stop (don't submit)
    var commentSection = document.querySelector('.comment-section');
    if (commentSection && commentSection.classList.contains('minimized')) {
        _commentMinimized = false;
        commentSection.classList.remove('minimized');
        restartAcceptBtnEffects();
        var rPanel = document.getElementById('resultPanel');
        if (rPanel) {
            // Wait for expand transition to finish (0.4s), then scroll to bottom
            setTimeout(function() {
                rPanel.scrollTo({ top: rPanel.scrollHeight, behavior: 'smooth' });
            }, 450);
        }
        return;
    }

    const commentInput = document.getElementById('commentText');
    const submitBtn = document.getElementById('commentSubmitBtn');
    const submitText = document.getElementById('commentSubmitText');

    const isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();
    const userName = getSavedUserName() || 'Me';
    const commentText = commentInput.value.trim() || t('comment.placeholder');

    if (!currentCardData) {
        showToast(t('toast.error'));
        return;
    }

    gtag('event', 'submit_comment', {
        event_category: 'engagement',
        card_name: currentCardData.name
    });

    // Disable button and show loading
    submitBtn.disabled = true;
    submitText.textContent = t('comment.sending');

    if (isLoggedIn && _currentDrawCommentId && window.cardCounter && window.cardCounter.updateComment) {
        // FB user with auto-saved draw: update the existing comment text
        var result = await window.cardCounter.updateComment(_currentDrawCommentId, commentText);

        if (result.success) {
            // Update draw history locally and in Firebase with the comment text
            saveDrawToLocal(currentCardData, commentText);
            var fbUserId = typeof getFbUserId === 'function' ? getFbUserId() : null;
            if (fbUserId && window.cardCounter.saveUserDraw) {
                window.cardCounter.saveUserDraw(fbUserId, {
                    cardId: currentCardData.id,
                    cardName: currentCardData.name,
                    cardImage: currentCardData.image,
                    comment: commentText
                });
            }

            submitBtn.classList.add('success');
            submitText.textContent = t('toast.submitSuccess');
            playSoundEffect('accept');
            triggerBlessingBurst(submitBtn);

            setTimeout(() => {
                showBlessingScreen(userName, commentText);
            }, 800);
        } else {
            submitBtn.disabled = false;
            submitText.textContent = t('comment.submit');
            showToast(t('toast.error'));
        }
    } else if (!isLoggedIn) {
        // Not logged in: store pending draw data, go to blessing with login CTA
        _pendingDraw = {
            cardId: currentCardData.id,
            cardName: currentCardData.name,
            cardImage: currentCardData.image,
            comment: commentText
        };
        // Update localStorage draw with comment text
        saveDrawToLocal(currentCardData, commentText);

        playSoundEffect('accept');
        triggerBlessingBurst(submitBtn);
        submitBtn.classList.add('success');
        submitText.textContent = t('toast.submitSuccess');

        setTimeout(() => {
            showBlessingScreen(userName, commentText);
        }, 800);
    } else {
        // FB user but auto-save failed or no comment ID — submit fresh
        var userId = getUserId();
        var result = await window.cardCounter.submitComment(
            currentCardData.id, currentCardData.name, currentCardData.image,
            userId, userName, commentText, getCurrentProfilePicture()
        );

        if (result.success) {
            if (result.id && _pollState.initialized && _pollState.myCommentIds.indexOf(result.id) === -1) {
                _pollState.myCommentIds.push(result.id);
            }
            checkMyCardTab();
            saveDrawToLocal(currentCardData, commentText);
            var fbUserId = typeof getFbUserId === 'function' ? getFbUserId() : null;
            if (fbUserId && window.cardCounter.saveUserDraw) {
                window.cardCounter.saveUserDraw(fbUserId, {
                    cardId: currentCardData.id, cardName: currentCardData.name,
                    cardImage: currentCardData.image, comment: commentText
                });
            }

            submitBtn.classList.add('success');
            submitText.textContent = t('toast.submitSuccess');
            playSoundEffect('accept');
            triggerBlessingBurst(submitBtn);

            setTimeout(() => {
                showBlessingScreen(userName, commentText);
            }, 800);
        } else {
            submitBtn.disabled = false;
            submitText.textContent = t('comment.submit');
            showToast(t('toast.error'));
        }
    }
}

// ========================================
// Blessing Celebration Screen
// ========================================

let blessingSparkleInterval = null;

function showBlessingScreen(userName, comment) {
    const blessingScreen = document.getElementById('blessingScreen');
    const blessingCard = document.getElementById('blessingCard');
    const blessingName = document.getElementById('blessingName');
    const blessingComment = document.getElementById('blessingComment');
    const blessingLoginCta = document.getElementById('blessingLoginCta');
    const commentOverlay = document.querySelector('.blessing-comment-overlay');

    if (!blessingScreen || !currentCardData) return;

    gtag('event', 'view_blessing', {
        event_category: 'funnel',
        card_name: currentCardData.name
    });

    const isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();

    // Set card image
    blessingCard.src = `images/tarot/${currentCardData.image}`;

    // Always show comment overlay with user's text
    if (commentOverlay) commentOverlay.style.display = '';
    blessingName.textContent = userName === 'Me' ? '' : `— ${userName} —`;
    blessingComment.textContent = `"${comment}"`;

    if (isLoggedIn) {
        if (blessingLoginCta) blessingLoginCta.style.display = 'none';
    } else if (wasPreviouslyConnected()) {
        if (blessingLoginCta) blessingLoginCta.style.display = 'none';
    } else {
        if (blessingLoginCta) blessingLoginCta.style.display = '';
    }

    // Clean up sticky card observer
    destroyStickyCardObserver();
    var stickyCard = document.getElementById('resultStickyCard');
    if (stickyCard) stickyCard.classList.remove('minimized');

    // Hide other panels
    document.getElementById('resultPanel').classList.remove('active');
    document.getElementById('centerCard').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');

    // Show blessing screen
    blessingScreen.classList.add('active');

    // Play blessing sound
    playSoundEffect('blessing');

    // Start sparkle particles
    startBlessingSparkles();

    // Setup restart button
    const restartBtn = document.getElementById('blessingRestartBtn');
    if (restartBtn) {
        restartBtn.onclick = closeBlessingAndRestart;
    }
}

// Create floating sparkles for blessing card
function startBlessingSparkles() {
    const container = document.querySelector('.blessing-card-container');
    if (!container) return;

    // Clear any existing interval
    if (blessingSparkleInterval) {
        clearInterval(blessingSparkleInterval);
    }

    blessingSparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'blessing-sparkle';

        // Random position around the card
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        const startX = 100 + Math.cos(angle) * distance;
        const startY = 178 + Math.sin(angle) * distance;

        // Random movement direction
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = -30 - Math.random() * 60;
        const duration = 1.5 + Math.random() * 1;

        sparkle.style.cssText = `
            left: ${startX}px;
            top: ${startY}px;
            --move-x: ${moveX}px;
            --move-y: ${moveY}px;
            animation: blessingSparkleRise ${duration}s ease-out forwards;
        `;

        container.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), duration * 1000);
    }, 150);
}

function stopBlessingSparkles() {
    if (blessingSparkleInterval) {
        clearInterval(blessingSparkleInterval);
        blessingSparkleInterval = null;
    }
    // Remove any remaining sparkles
    const container = document.querySelector('.blessing-card-container');
    if (container) {
        container.querySelectorAll('.blessing-sparkle').forEach(s => s.remove());
    }
}

function closeBlessingAndRestart() {
    gtag('event', 'draw_again', { event_category: 'navigation' });

    const blessingScreen = document.getElementById('blessingScreen');

    // Stop sparkles
    stopBlessingSparkles();

    // Reset blessing screen state (comment overlay and login CTA)
    const commentOverlay = document.querySelector('.blessing-comment-overlay');
    const blessingLoginCta = document.getElementById('blessingLoginCta');
    if (commentOverlay) commentOverlay.style.display = '';
    if (blessingLoginCta) blessingLoginCta.style.display = 'none';

    // Fade out blessing screen
    blessingScreen.style.animation = 'blessingFadeIn 0.5s ease reverse forwards';

    setTimeout(() => {
        blessingScreen.classList.remove('active');
        blessingScreen.style.animation = '';

        // Go back to landing page (not card selection)
        goToLandingPage();
    }, 500);
}

function goToLandingPage() {
    currentReadingCategory = null;
    multiCardSelections = [];
    multiCardTarget = 0;
    multiCardPositions = [];
    _multiDisabledCards = [];
    var _grid = document.querySelector('.card-grid');
    if (_grid) _grid.classList.remove('multi-select-mode');
    clearCategoryTheme();
    hideMultiPickIndicator();

    // Fully clean up reveal overlay (destroy content)
    var _revealOv = document.getElementById('revealOverlay');
    _revealOv.classList.remove('active', 'minimized', 'closing', 'stashed');
    _revealOv.style.transform = '';
    document.getElementById('revealFanWrapper').innerHTML = '';
    document.getElementById('revealCardInfoName').textContent = '';
    document.getElementById('revealCardInfoQuote').textContent = '';
    var _scrollHint = document.querySelector('.reveal-scroll-hint');
    if (_scrollHint) _scrollHint.remove();
    _removeRevealReopenBtn();
    _destroyPullDownToReveal();

    // Restore sticky card to single-card layout
    var _sticky = document.getElementById('resultStickyCard');
    _sticky.classList.remove('multi-sticky', 'minimized');
    _sticky.style.display = '';
    _sticky.innerHTML = '<img class="result-sticky-card-img" id="resultStickyCardImg" alt="Card">'
        + '<div class="result-sticky-card-info">'
        + '<span class="result-sticky-card-name" id="resultStickyCardName"></span>'
        + '<span class="result-sticky-card-quote" id="resultStickyCardQuote"></span>'
        + '</div>';

    // Restore single-card result elements
    document.getElementById('resultCardName').style.display = '';
    var _qb = document.querySelector('.result-quote-block');
    if (_qb) _qb.style.display = '';
    var _sd = document.querySelector('.result-star-divider');
    if (_sd) _sd.style.display = '';
    var _gc = document.querySelector('.result-glass-card');
    if (_gc) _gc.style.display = '';
    var _if = document.getElementById('interpretationFade');
    if (_if) _if.style.display = '';
    var _mc = document.getElementById('multiResultCards');
    if (_mc) { _mc.style.display = 'none'; _mc.innerHTML = ''; }

    const landingPage = document.getElementById('landingPage');
    const mainPage = document.getElementById('mainPage');
    const spinningCardContainer = document.getElementById('spinningCardContainer');
    const spinningCardWrapper = spinningCardContainer.querySelector('.spinning-card-wrapper');
    const spinningCard = document.getElementById('spinningCard');
    const landingHeading = document.querySelector('.landing-heading');
    const landingBrand = document.querySelector('.landing-brand');
    const landingInstruction = document.querySelector('.landing-instruction');
    const cardClickHint = spinningCardContainer.querySelector('.card-click-hint');
    const cardGrid = document.getElementById('cardGrid');

    // Reset comment form
    if (typeof resetCommentForm === 'function') resetCommentForm();

    // Step 1: Fade out main page smoothly
    mainPage.style.transition = 'opacity 0.4s ease';
    mainPage.style.opacity = '0';

    // Step 2: After fade out, prepare landing page
    setTimeout(() => {
        // Hide main page completely
        mainPage.classList.remove('visible');
        mainPage.style.opacity = '';
        mainPage.style.transition = '';

        // Reset all card containers - remove spread/floating classes
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.classList.remove('spread');
            container.classList.remove('floating');
            container.style.transition = 'none';
            container.style.transform = '';
            container.style.left = '';
            container.style.top = '';
        });

        // Re-render cards fresh (renderCards already shuffles)
        renderCards();

        // Reset card grid to stacked state
        cardGrid.classList.add('stacked');
        cardGrid.classList.remove('initial-hidden');

        // Reset spinning card container - start invisible for fade in
        spinningCardContainer.style.transition = 'none';
        spinningCardContainer.style.transform = '';
        spinningCardContainer.style.opacity = '0';
        spinningCardContainer.style.visibility = 'visible';
        spinningCardContainer.style.animation = '';
        spinningCardContainer.style.filter = '';

        // Reset card faces — visibility & animation were forced during transition
        var frontFace = spinningCard.querySelector('.spinning-card-front');
        var backFace = spinningCard.querySelector('.spinning-card-back');
        var allFaces = spinningCardContainer.querySelectorAll('.spinning-card-face');
        allFaces.forEach(function(face) {
            face.style.transition = '';
            face.style.boxShadow = '';
            face.style.visibility = '';
            face.style.animation = 'none';
        });

        // Reset spinning card wrapper
        spinningCardWrapper.style.transition = '';
        spinningCardWrapper.style.transform = '';
        spinningCardWrapper.style.animation = 'none';

        // Force reflow so browser registers 'none', then start all animations in sync
        spinningCardWrapper.offsetHeight;

        spinningCardWrapper.style.animation = 'spinOnY 3s linear infinite';
        if (frontFace) frontFace.style.animation = 'spinFrontVis 3s step-end infinite';
        if (backFace) backFace.style.animation = 'spinBackVis 3s step-end infinite';

        // Reset spinning card tilt
        spinningCard.style.transition = '';
        spinningCard.style.transform = 'rotate(-29.3deg)';

        // Show hint text
        if (cardClickHint) {
            cardClickHint.style.opacity = '1';
        }

        // Reset landing elements - start invisible
        landingHeading.style.animation = '';
        landingHeading.style.opacity = '0';
        landingHeading.style.transform = '';
        landingHeading.style.transition = '';

        // Reset mode selector and dots visibility
        var modeSel = document.getElementById('modeSelector');
        var modeDts = document.getElementById('modeDots');
        if (modeSel) { modeSel.style.transition = 'none'; modeSel.style.opacity = '0'; }
        if (modeDts) { modeDts.style.transition = 'none'; modeDts.style.opacity = '0'; }
        var tagline = document.querySelector('.landing-tagline');
        var sparkles = document.querySelector('.landing-sparkles');
        if (tagline) tagline.style.opacity = '0';
        if (sparkles) sparkles.style.opacity = '0';

        // Reset 3-card container
        var threeContainer = document.getElementById('threeCardContainer');
        if (threeContainer) {
            threeContainer.style.transition = 'none';
            threeContainer.style.transform = '';
            threeContainer.style.opacity = '0';
        }

        if (landingBrand) {
            landingBrand.style.opacity = '0';
        }
        if (landingInstruction) {
            landingInstruction.style.opacity = '0';
        }

        // Apply mode visuals (show correct container without animation)
        applyModeVisuals(false, 0);

        // Show landing page
        landingPage.classList.remove('hidden');
        landingPage.style.pointerEvents = 'auto';

        // Refresh draw counter (fresh from Firebase, skip cache)
        if (window.cardCounter && window.cardCounter.refreshDrawCount) {
            window.cardCounter.refreshDrawCount();
        }

        // Restore UI buttons hidden during draw page
        const langSwitcher = document.querySelector('.lang-switcher');
        const muteBtn = document.querySelector('.mute-btn');
        const profileSwitcher = document.querySelector('.profile-switcher');
        if (langSwitcher) langSwitcher.style.display = '';
        if (muteBtn) muteBtn.style.display = '';
        if (profileSwitcher) profileSwitcher.style.display = '';

        // Show comments button on landing page
        updateCommentsBtnVisibility();

        // Re-render notification circles from poll state
        setTimeout(function() {
            if (_pollState.initialized) {
                renderNotifCircleStack();
            } else {
                checkFriendsNewCards();
            }
        }, 1000);

        // Scroll to top instantly
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Step 3: Fade in landing elements smoothly
        requestAnimationFrame(() => {
            // Fade in the active card container
            var returnContainerMap = {
                'single': 'spinningCardContainer',
                'three-card': 'threeCardContainer',
                'four-card': 'fourCardContainer',
                'ten-card': 'tenCardContainer',
                'twelve-card': 'twelveCardContainer'
            };
            var returnContainerId = returnContainerMap[currentReadingMode];
            var returnContainer = returnContainerId ? document.getElementById(returnContainerId) : null;
            if (returnContainer) {
                returnContainer.style.transition = 'opacity 0.5s ease';
                returnContainer.style.transform = '';
                returnContainer.style.opacity = '1';
            }

            // Fade in mode selector and header elements
            var ms = document.getElementById('modeSelector');
            var md = document.getElementById('modeDots');
            var tl = document.querySelector('.landing-tagline');
            var sp = document.querySelector('.landing-sparkles');
            if (ms) { ms.style.transition = 'opacity 0.5s ease'; ms.style.opacity = '1'; }
            if (md) { md.style.transition = 'opacity 0.5s ease'; md.style.opacity = '1'; }
            if (tl) { tl.style.transition = 'opacity 0.5s ease'; tl.style.opacity = '1'; }
            if (sp) { sp.style.transition = 'opacity 0.5s ease'; sp.style.opacity = '1'; }

            // Fade in other elements with slight delays
            setTimeout(() => {
                if (landingBrand) {
                    landingBrand.style.transition = 'opacity 0.4s ease';
                    landingBrand.style.opacity = '1';
                }
            }, 150);

            setTimeout(() => {
                if (landingInstruction) {
                    landingInstruction.style.transition = 'opacity 0.4s ease';
                    landingInstruction.style.opacity = '1';
                }
            }, 300);
        });

        // Restart spinning card rotation and sparkles (only for single mode)
        if (currentReadingMode === 'single') {
            startCardRotation();
            createFloatingSparkles();
        }

        // Reset state
        isPaused = false;
        currentCardData = null;
    }, 400);
}

function resetForNewPick() {
    // Reset comment form
    if (typeof resetCommentForm === 'function') resetCommentForm();

    // Re-render cards (renderCards already shuffles)
    renderCards();

    // Reset state
    isPaused = false;
    currentCardData = null;

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Comments Panel
// ========================================
let commentsLastKey = null;
let commentsHasMore = true;
let isLoadingComments = false;
let currentCommentsTab = 'new'; // 'new', 'hot', 'me'
let tabSwitchGeneration = 0; // Incremented on every tab switch to cancel stale async loads

// ========================================
// Notification Polling State
// ========================================
var _pollingIntervalId = null;
var _pollingPaused = false;
var _pollState = {
    friendUserIds: [],
    myCommentIds: [],
    friendsLastCheckedTs: 0,
    repliesLastCheckedTs: 0,
    unseenFriendDraws: 0,
    unseenReplies: 0,
    friendDrawsData: [],
    repliesData: [],
    initialized: false,
    lastPollTime: 0
};

function initCommentsPanel() {
    const commentsBtn = document.getElementById('commentsBtn');
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');
    const commentsPanelClose = document.getElementById('commentsPanelClose');
    const commentsList = document.getElementById('commentsList');
    const commentsTabs = document.getElementById('commentsTabs');

    if (commentsBtn) {
        commentsBtn.addEventListener('click', () => openCommentsPanel());
    }

    if (commentsPanelClose) {
        commentsPanelClose.addEventListener('click', closeCommentsPanel);
    }

    if (commentsOverlay) {
        commentsOverlay.addEventListener('click', closeCommentsPanel);
    }

    // Theme toggle
    var themeToggle = document.getElementById('commentsThemeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleCommentsTheme);
    }

    // Tab click handlers
    if (commentsTabs) {
        commentsTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.comments-tab');
            if (!tab) return;

            const tabName = tab.dataset.tab;
            if (tabName === currentCommentsTab) return;

            gtag('event', 'switch_comments_tab', { event_category: 'navigation', tab_name: tabName });

            // Update active tab
            commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch tab content
            currentCommentsTab = tabName;
            switchCommentsTab(tabName);
        });
    }

    // Lazy loading on scroll DOWN (load older comments) - only for 'new' tab
    if (commentsList) {
        commentsList.addEventListener('scroll', () => {
            if (isLoadingComments || !commentsHasMore || (currentCommentsTab !== 'new' && currentCommentsTab !== 'feed')) return;

            // Load more when scrolling near bottom
            const { scrollTop, scrollHeight, clientHeight } = commentsList;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (currentCommentsTab === 'feed') {
                    loadFeed(false);
                } else {
                    loadMoreComments();
                }
            }
        });

        // Collapse header on scroll down, expand on scroll up
        var lastScrollTop = 0;
        var scrollThreshold = 30;
        var headerCollapsed = false;
        var collapseTime = 0;
        commentsList.addEventListener('scroll', function() {
            var st = commentsList.scrollTop;
            var panelHeader = document.querySelector('.comments-panel-header');
            var tabsBar = document.getElementById('commentsTabs');
            if (!panelHeader) return;

            var delta = st - lastScrollTop;
            var now = Date.now();

            if (!headerCollapsed && st > scrollThreshold && delta > 5) {
                // Scrolling down past threshold with enough momentum — collapse
                headerCollapsed = true;
                collapseTime = now;
                panelHeader.classList.add('collapsed');
                if (tabsBar) tabsBar.classList.add('collapsed');
            } else if (headerCollapsed && (st <= scrollThreshold || (delta < -8 && now - collapseTime > 300))) {
                // Scrolling up significantly (with cooldown) or back near top — expand
                headerCollapsed = false;
                panelHeader.classList.remove('collapsed');
                if (tabsBar) tabsBar.classList.remove('collapsed');
            }
            lastScrollTop = st;
        });
    }

    // Badge is driven solely by notification polling (friend draws + replies).
    // No fallback to total comments count — badge only shows when logged in via FB.
}

// Update comments button visibility based on current page state
function updateCommentsBtnVisibility() {
    const commentsBtn = document.getElementById('commentsBtn');
    if (!commentsBtn) return;

    const mainPage = document.getElementById('mainPage');
    const resultPanel = document.getElementById('resultPanel');

    // Hide only on card spread (mainPage visible but result not active)
    if (mainPage && mainPage.classList.contains('visible')) {
        if (!resultPanel || !resultPanel.classList.contains('active')) {
            commentsBtn.style.display = 'none';
            return;
        }
    }

    // Show on result page
    commentsBtn.style.display = 'flex';
}

function switchCommentsTab(tabName) {
    // Reset state
    commentsLastKey = null;
    commentsHasMore = true;
    displayedCommentIds.clear();
    expandedCommentCard = null;
    navigatedCommentCard = null;
    isLoadingComments = false; // Reset to ensure fresh load
    tabSwitchGeneration++; // Cancel any in-flight async loads from previous tab

    // Unsubscribe from real-time updates
    if (window.cardCounter && window.cardCounter.unsubscribeFromNewComments) {
        window.cardCounter.unsubscribeFromNewComments();
    }

    // Hide cardview tab and remove cardview-mode class when switching to other tabs
    if (tabName !== 'cardview') {
        const cardviewTab = document.querySelector('[data-tab="cardview"]');
        if (cardviewTab) {
            cardviewTab.style.display = 'none';
        }
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.classList.remove('cardview-mode');
        }
    }

    // Toggle feed-mode class for full-width minimal layout
    var feedCommentsList = document.getElementById('commentsList');
    if (feedCommentsList) {
        if (tabName === 'feed' || tabName === 'mycard' || tabName === 'friends') {
            feedCommentsList.classList.add('feed-mode');
        } else {
            feedCommentsList.classList.remove('feed-mode');
        }
        // Hide replies in mycard tab when not logged in
        var isFbLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();
        if (tabName === 'mycard' && !isFbLoggedIn) {
            feedCommentsList.classList.add('mycard-mode');
        } else {
            feedCommentsList.classList.remove('mycard-mode');
        }
    }

    // Load content for the selected tab
    if (tabName === 'new') {
        newestCommentTimestamp = 0;
        loadComments(true);
    } else if (tabName === 'hot') {
        loadHotComments();
    } else if (tabName === 'mycard') {
        loadMyCardComments();
    } else if (tabName === 'me') {
        loadMyComments();
    } else if (tabName === 'feed') {
        newestCommentTimestamp = 0;
        loadFeed(true);
    } else if (tabName === 'friends') {
        loadFriendsCards();
    } else if (tabName === 'activity') {
        loadActivityTimeline();
    } else if (tabName === 'cardview') {
        loadCardViewComments();
    }
}

function updateCommentsCountBadge(count) {
    // When notification polling is active, badge is driven by updateNotificationBadges()
    if (_pollState.initialized) return;

    const badge = document.getElementById('commentsCount');
    if (!badge) return;

    if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.classList.add('show');
    } else {
        badge.classList.remove('show');
    }
}

// ========================================
// Feed Tab (Facebook-style social feed)
// ========================================
async function loadFeed(reset) {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    var commentsList = document.getElementById('commentsList');
    var loadingEl = getOrCreateLoadingEl();

    if (reset) {
        commentsList.innerHTML = '';
        commentsList.appendChild(loadingEl);
        loadingEl.style.display = 'block';
        expandedCommentCard = null;
        commentsLastKey = null;
    }

    if (!window.cardCounter || !window.cardCounter.fetchComments) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    var result = await window.cardCounter.fetchComments(commentsLastKey, 10);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(result.comments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (result.comments.length === 0 && reset && displayedCommentIds.size === 0) {
        newestCommentTimestamp = Date.now();
        commentsList.innerHTML = '<div class="comments-empty"><div class="comments-empty-icon">✦</div><div class="comments-empty-text">' + t('feed.empty') + '</div></div>';
        isLoadingComments = false;
        if (window.cardCounter && window.cardCounter.subscribeToNewComments) {
            window.cardCounter.subscribeToNewComments(handleNewFeedItem);
        }
        return;
    }

    if (reset && result.comments.length > 0) {
        newestCommentTimestamp = result.comments[0].timestamp || Date.now();
    }

    result.comments.forEach(function(comment) {
        if (displayedCommentIds.has(comment.id)) return;
        var card = createFeedCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    commentsLastKey = result.lastKey;
    commentsHasMore = result.hasMore;
    isLoadingComments = false;

    if (reset && window.cardCounter && window.cardCounter.subscribeToNewComments) {
        window.cardCounter.subscribeToNewComments(handleNewFeedItem);
    }
}

async function handleNewFeedItem(comment) {
    if (displayedCommentIds.has(comment.id)) return;
    if ((comment.timestamp || 0) <= newestCommentTimestamp) return;

    var commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    await resolveDisplayNames([comment]);

    var emptyMsg = commentsList.querySelector('.comments-empty');
    if (emptyMsg) emptyMsg.remove();

    var card = createFeedCard(comment);
    card.classList.add('new-comment');

    if (commentsList.firstChild) {
        commentsList.insertBefore(card, commentsList.firstChild);
    } else {
        commentsList.appendChild(card);
    }

    displayedCommentIds.add(comment.id);
    newestCommentTimestamp = comment.timestamp;
    commentsList.scrollTop = 0;
    setTimeout(function() { card.classList.remove('new-comment'); }, 500);
}

function collapseFeedCard(card) {
    card.classList.remove('expanded');
    var sec = card.querySelector('.feed-card-replies-section');
    var form = card.querySelector('.reply-form');
    if (sec) sec.classList.remove('open');
    if (form) form.classList.remove('show');
}

function createFeedCard(comment) {
    var card = document.createElement('div');
    card.className = 'feed-card';
    card.dataset.commentId = comment.id;
    card.dataset.cardId = comment.cardId;

    var date = comment.timestamp ? new Date(comment.timestamp) : new Date();
    var dateStr = formatCommentDate(date);

    var cardImagePath = '';
    if (comment.cardImage && comment.cardImage.length > 0) {
        cardImagePath = comment.cardImage;
    } else if (comment.cardName && comment.cardName.length > 0) {
        cardImagePath = comment.cardName + '.png';
    }

    var avatarHtml = getProfilePictureHtml(comment);
    var isMulti = comment.multiCards && comment.multiCards.length > 1;

    // Build image/expanded HTML based on single vs multi-card
    var imageHtml = '';
    var expandedInfoHtml = '';
    var metaHtml = '';

    // Category badge
    var catBadge = '';
    if (comment.readingCategory) {
        var catLabels = { love: '♥', work: '★', finance: '◆' };
        var catIcon = catLabels[comment.readingCategory] || '';
        var catName = (translations[currentLang] && translations[currentLang].category && translations[currentLang].category[comment.readingCategory]) || comment.readingCategory;
        catBadge = '<span class="feed-cat-badge feed-cat-' + comment.readingCategory + '">' + catIcon + ' ' + escapeHtml(catName) + '</span>';
    }

    if (isMulti) {
        // Multi-card draw
        var numCards = comment.multiCards.length;
        metaHtml = t('feed.drewCard') + ' <strong>' + numCards + ' cards</strong>' + catBadge + '<span class="feed-card-date">' + dateStr + '</span>';

        // Mini card fan
        imageHtml = '<div class="feed-multi-cards">';
        for (var mi = 0; mi < comment.multiCards.length; mi++) {
            var mc = comment.multiCards[mi];
            var posLabel = '';
            if (mc.positionKey && translations[currentLang] && translations[currentLang].landing) {
                posLabel = translations[currentLang].landing[mc.positionKey] || mc.positionKey;
            }
            imageHtml += '<div class="feed-multi-card-item' + (mi === 0 ? ' active' : '') + '" data-index="' + mi + '">' +
                '<img src="images/tarot/' + escapeHtml(mc.cardImage || mc.cardName + '.png') + '" alt="' + escapeHtml(mc.cardName) + '" onerror="this.style.display=\'none\'">' +
                '<span class="feed-multi-card-name">' + escapeHtml(getCardName(mc.cardName) || mc.cardName) + '</span>' +
                (posLabel ? '<span class="feed-multi-card-pos">' + escapeHtml(posLabel) + '</span>' : '') +
            '</div>';
        }
        imageHtml += '</div>';

        // Per-card interpretations
        expandedInfoHtml = '<div class="feed-card-info feed-multi-info">';
        for (var mj = 0; mj < comment.multiCards.length; mj++) {
            var mCard = comment.multiCards[mj];
            var mTarot = tarotData && tarotData.cards ? tarotData.cards.find(function(c) { return c.id === mCard.cardId || c.name === mCard.cardName; }) : null;
            var mPos = '';
            if (mCard.positionKey && translations[currentLang] && translations[currentLang].landing) {
                mPos = translations[currentLang].landing[mCard.positionKey] || mCard.positionKey;
            }
            if (mTarot) {
                var feedCat = comment.readingCategory || null;
                var mQuote = feedCat ? (getCardCategoryField(mTarot, feedCat + 'Quote') || getCardQuote(mTarot)) : getCardQuote(mTarot);
                var mInterp = feedCat ? (getCardCategoryField(mTarot, feedCat) || getCardInterpretation(mTarot)) : getCardInterpretation(mTarot);
                expandedInfoHtml += '<div class="feed-multi-interp" data-index="' + mj + '"' + (mj !== 0 ? ' style="display:none"' : '') + '>';
                expandedInfoHtml += '<div class="feed-multi-interp-pos">✦ ' + escapeHtml(mPos) + '</div>';
                expandedInfoHtml += '<div class="feed-multi-interp-name">' + escapeHtml(getCardName(mCard.cardName) || mCard.cardName) + '</div>';
                if (mQuote) expandedInfoHtml += '<div class="feed-card-quote">"' + escapeHtml(mQuote) + '"</div>';
                if (mInterp) expandedInfoHtml += '<div class="feed-card-interpretation">' + escapeHtml(mInterp) + '</div>';
                expandedInfoHtml += '</div>';
            }
        }
        expandedInfoHtml += '</div>';
    } else {
        // Single card draw
        metaHtml = t('feed.drewCard') + ' <strong>' + escapeHtml(comment.cardName || '') + '</strong>' + catBadge + '<span class="feed-card-date">' + dateStr + '</span>';

        imageHtml = cardImagePath
            ? '<div class="feed-card-image"><img src="images/tarot/' + escapeHtml(cardImagePath) + '" alt="' + escapeHtml(comment.cardName || 'Tarot') + '" onerror="this.parentElement.style.display=\'none\'"></div>'
            : '';

        var interpretationText = '';
        var quoteText = '';
        if (tarotData && tarotData.cards) {
            var tarotCard = tarotData.cards.find(function(c) { return c.id === comment.cardId || c.name === comment.cardName; });
            if (tarotCard) {
                var feedCat = comment.readingCategory || null;
                interpretationText = feedCat ? (getCardCategoryField(tarotCard, feedCat) || getCardInterpretation(tarotCard)) : getCardInterpretation(tarotCard);
                quoteText = feedCat ? (getCardCategoryField(tarotCard, feedCat + 'Quote') || getCardQuote(tarotCard)) : getCardQuote(tarotCard);
            }
        }
        expandedInfoHtml = '<div class="feed-card-info">' +
            (quoteText ? '<div class="feed-card-quote">"' + escapeHtml(quoteText) + '"</div>' : '') +
            (interpretationText ? '<div class="feed-card-interpretation">' + escapeHtml(interpretationText) + '</div>' : '') +
        '</div>';
    }

    card.innerHTML =
        '<div class="feed-card-header">' +
            '<div class="feed-card-avatar-wrap">' +
                avatarHtml +
                '<span class="feed-card-reply-count" style="display: none;">' +
                    '<span class="reply-count-num">0</span>' +
                '</span>' +
            '</div>' +
            '<div class="feed-card-author">' +
                '<span class="feed-card-name">' + escapeHtml(comment.userName || 'Me') + '</span>' +
                '<span class="feed-card-meta">' + metaHtml + '</span>' +
            '</div>' +
        '</div>' +
        '<svg class="feed-card-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
        '<div class="feed-card-body">' +
            '<div class="feed-card-comment">' + escapeHtml(comment.comment || '') + '</div>' +
        '</div>' +
        '<div class="feed-card-expanded">' +
            imageHtml +
            expandedInfoHtml +
        '</div>' +
        '<div class="feed-card-replies-section">' +
            '<div class="replies-list"></div>' +
            '<div class="reply-form">' +
                '<div class="reply-input-wrapper">' +
                    '<input type="text" class="reply-input" placeholder="' + t('comment.replyPlaceholder') + '" maxlength="150">' +
                    '<button class="reply-submit-btn" disabled>' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    // Wire up multi-card tab switching
    if (isMulti) {
        card.querySelectorAll('.feed-multi-card-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                var idx = item.dataset.index;
                // Switch active thumbnail
                card.querySelectorAll('.feed-multi-card-item').forEach(function(t) { t.classList.toggle('active', t.dataset.index === idx); });
                // Switch visible interpretation
                card.querySelectorAll('.feed-multi-interp').forEach(function(s) { s.style.display = s.dataset.index === idx ? '' : 'none'; });
            });
        });
    }

    // Toggle expanded section on card click
    var feedHeader = card.querySelector('.feed-card-header');
    var feedBody = card.querySelector('.feed-card-body');
    var repliesSection = card.querySelector('.feed-card-replies-section');
    var replyForm = card.querySelector('.reply-form');
    var replyInput = card.querySelector('.reply-input');
    var replySubmitBtn = card.querySelector('.reply-submit-btn');
    var repliesLoaded = false;

    function expandCard(e) {
        if (e.target.closest('.feed-card-replies-section') || e.target.closest('.reply-form')) return;
        // Already expanded — do nothing
        if (card.classList.contains('expanded')) return;
        // Collapse any other expanded card in the list
        var list = card.closest('.comments-list');
        if (list) {
            var prev = list.querySelector('.feed-card.expanded');
            if (prev && prev !== card) {
                collapseFeedCard(prev);
            }
        }
        card.classList.add('expanded');
        repliesSection.classList.add('open');
        replyForm.classList.add('show');
        markRepliesAsRead(card, comment.id);
        if (!repliesLoaded) {
            repliesLoaded = true;
            loadReplies(card, comment.id, comment);
        }
    }
    feedHeader.addEventListener('click', expandCard);
    feedBody.addEventListener('click', expandCard);

    // Wire up reply form
    replyInput.addEventListener('input', function() {
        replySubmitBtn.disabled = replyInput.value.trim().length === 0;
    });

    replySubmitBtn.addEventListener('click', async function(e) {
        e.stopPropagation();
        // Require Facebook login to reply
        if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) {
            loginWithFacebook();
            return;
        }
        var text = replyInput.value.trim();
        if (!text) return;
        replySubmitBtn.disabled = true;
        replyInput.disabled = true;

        gtag('event', 'submit_reply', { event_category: 'engagement' });

        var userId = getUserId();
        var userName = getSavedUserName() || 'Me';

        if (window.cardCounter && window.cardCounter.submitReply) {
            var res = await window.cardCounter.submitReply(comment.id, userId, userName, text, getCurrentProfilePicture());
            if (res.success) {
                replyInput.value = '';
                await loadReplies(card, comment.id, comment);
                loadReplyCount(card, comment.id);
                showToast(t('toast.replySuccess'));
            } else {
                showToast(t('toast.error'));
            }
        }
        replySubmitBtn.disabled = false;
        replyInput.disabled = false;
    });

    replyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !replySubmitBtn.disabled) replySubmitBtn.click();
    });

    loadReplyCount(card, comment.id);

    return card;
}

// ========================================
// Activity Timeline Tab
// ========================================
async function loadActivityTimeline() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    var commentsList = document.getElementById('commentsList');
    var loadingEl = getOrCreateLoadingEl();

    // Require Facebook login
    if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) {
        commentsList.innerHTML = wasPreviouslyConnected() ? buildSocialLoadingCta() : buildLoginRequiredCta('login.required', 'blessing.loginToSee');
        isLoadingComments = false;
        return;
    }

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    var userId = getUserId();
    var activities = [];

    // Fetch draws
    var draws = [];
    if (typeof isFacebookConnected === 'function' && isFacebookConnected() && window.cardCounter && window.cardCounter.fetchUserDraws) {
        var fbUserId = typeof getFbUserId === 'function' ? getFbUserId() : null;
        if (fbUserId) draws = await window.cardCounter.fetchUserDraws(fbUserId);
    }
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    if (draws.length === 0) draws = getLocalDrawHistory();
    draws.forEach(function(d) {
        activities.push({ type: 'draw', timestamp: d.timestamp, data: d });
    });

    // Fetch user comments
    if (window.cardCounter && window.cardCounter.fetchCommentsByUserId) {
        var comments = await window.cardCounter.fetchCommentsByUserId(userId, 50);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort
        comments.forEach(function(c) {
            activities.push({ type: 'comment', timestamp: c.timestamp, data: c });
        });
    }

    // Fetch comments user replied to
    if (window.cardCounter && window.cardCounter.fetchCommentsUserRepliedTo) {
        var repliedTo = await window.cardCounter.fetchCommentsUserRepliedTo(userId, 20);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort
        repliedTo.forEach(function(r) {
            activities.push({ type: 'replied', timestamp: r.timestamp, data: r });
        });
    }

    // Sort by timestamp descending
    activities.sort(function(a, b) { return (b.timestamp || 0) - (a.timestamp || 0); });

    // Deduplicate
    var seen = {};
    var uniqueActivities = activities.filter(function(a) {
        var key = a.type + '_' + (a.data.cardId || a.data.id || '') + '_' + a.timestamp;
        if (seen[key]) return false;
        seen[key] = true;
        return true;
    });

    loadingEl.style.display = 'none';

    if (uniqueActivities.length === 0) {
        commentsList.innerHTML = '<div class="comments-empty comments-empty-cta">' +
            '<div class="comments-empty-text">' + t('activity.empty') + '</div>' +
            '<p class="cta-subtitle">' + t('activity.emptyHint') + '</p></div>';
        isLoadingComments = false;
        return;
    }

    uniqueActivities.forEach(function(activity) {
        commentsList.appendChild(createActivityCard(activity));
    });

    isLoadingComments = false;
}

function createActivityCard(activity) {
    var div = document.createElement('div');
    div.className = 'activity-card';
    div.dataset.type = activity.type;

    var date = new Date(activity.timestamp);
    var dateStr = formatCommentDate(date);
    var d = activity.data;
    var dotIconSvg, actionText, detailHtml;

    switch (activity.type) {
        case 'draw':
            dotIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="4" width="14" height="17" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>';
            actionText = t('activity.drewCard');
            detailHtml = '<div class="activity-card-detail"><div class="activity-card-image"><img src="images/tarot/' + escapeHtml(d.cardImage || d.cardName + '.webp') + '" alt="" onerror="this.parentElement.style.display=\'none\'"></div>' +
                '<div class="activity-card-info"><span class="activity-card-name">' + escapeHtml(d.cardName) + '</span>' +
                (d.comment ? '<span class="activity-card-comment">"' + escapeHtml(d.comment) + '"</span>' : '') + '</div></div>';
            break;
        case 'comment':
            dotIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
            actionText = t('activity.commented') + ' <strong>' + escapeHtml(d.cardName) + '</strong>';
            detailHtml = '<div class="activity-card-detail"><div class="activity-card-image"><img src="images/tarot/' + escapeHtml(d.cardImage || d.cardName + '.webp') + '" alt="" onerror="this.parentElement.style.display=\'none\'"></div>' +
                '<div class="activity-card-info"><span class="activity-card-comment">"' + escapeHtml(d.comment || '') + '"</span></div></div>';
            break;
        case 'replied':
            dotIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>';
            actionText = t('activity.repliedTo') + ' <strong>' + escapeHtml(d.userName || 'Me') + '</strong>';
            detailHtml = '<div class="activity-card-detail"><div class="activity-card-image"><img src="images/tarot/' + escapeHtml(d.cardImage || d.cardName + '.webp') + '" alt="" onerror="this.parentElement.style.display=\'none\'"></div>' +
                '<div class="activity-card-info"><span class="activity-card-name">' + escapeHtml(d.cardName || '') + '</span>' +
                '<span class="activity-card-comment">"' + escapeHtml(d.comment || '') + '"</span></div></div>';
            break;
    }

    div.innerHTML = '<div class="activity-timeline-dot">' + dotIconSvg + '</div>' +
        '<div class="activity-card-content">' +
            '<div class="activity-card-header">' +
                '<span class="activity-action">' + actionText + '</span>' +
                '<span class="activity-date">' + dateStr + '</span>' +
                '<svg class="activity-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
            '</div>' + detailHtml +
        '</div>';

    div.addEventListener('click', function() {
        div.classList.toggle('expanded');
    });

    return div;
}

// Track displayed comment IDs to avoid duplicates
let displayedCommentIds = new Set();

// Track the newest comment timestamp from initial load (to filter real-time updates)
let newestCommentTimestamp = 0;

// Track currently expanded comment card
let expandedCommentCard = null;
let navigatedCommentCard = null; // Track the card that was navigated from related comments

// Tarot-themed loader HTML
function buildTarotLoaderHtml() {
    return '<div class="tarot-loader">' +
        '<div class="tarot-loader-ring"></div>' +
        '<div class="tarot-loader-ring-inner"></div>' +
        '<div class="tarot-loader-star">✦</div>' +
        '<div class="tarot-loader-orbit"></div>' +
        '<div class="tarot-loader-orbit"></div>' +
        '<div class="tarot-loader-orbit"></div>' +
        '</div>' +
        '<span class="tarot-loader-text">' + t('common.loading') + '</span>';
}

// Mini loader for inline use (related comments, replies)
function buildMiniLoaderHtml() {
    return '<div class="tarot-loader-mini">' +
        '<div class="tarot-loader-mini-dot"></div>' +
        '<div class="tarot-loader-mini-star">✦</div>' +
        '<div class="tarot-loader-mini-dot"></div>' +
        '<div class="tarot-loader-mini-star">✦</div>' +
        '<div class="tarot-loader-mini-dot"></div>' +
        '</div>';
}

// Get or create loading element for comments list
function getOrCreateLoadingEl() {
    let loadingEl = document.getElementById('commentsLoading');
    if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.className = 'comments-loading';
        loadingEl.id = 'commentsLoading';
        loadingEl.innerHTML = buildTarotLoaderHtml();
    }
    return loadingEl;
}

// Comments panel theme toggle
function toggleCommentsTheme() {
    var panel = document.getElementById('commentsPanel');
    if (!panel) return;
    var isLight = panel.classList.toggle('light-theme');
    localStorage.setItem('tarot_comments_theme', isLight ? 'light' : 'dark');
    gtag('event', 'toggle_theme', { event_category: 'settings', theme: isLight ? 'light' : 'dark' });
}

function applyCommentsTheme() {
    var panel = document.getElementById('commentsPanel');
    if (!panel) return;
    var saved = localStorage.getItem('tarot_comments_theme');
    if (saved === 'light') {
        panel.classList.add('light-theme');
    } else {
        panel.classList.remove('light-theme');
    }
}

function openCommentsPanel(skipLoadComments = false) {
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');
    const commentsTabs = document.getElementById('commentsTabs');

    // Restore saved theme preference
    applyCommentsTheme();

    commentsPanel.classList.add('show');
    commentsOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Push state for back button handling on mobile
    if (!window.commentsPanelHistoryPushed) {
        history.pushState({ commentsPanel: true }, '', '');
        window.commentsPanelHistoryPushed = true;
    }

    // Update user name display
    updateCommentsPanelUser();

    // Check if user has comments and show/hide "ของฉัน" tab
    checkUserHasComments();

    // Check if user has picked a card and show/hide "ไพ่ฉัน" tab
    checkMyCardTab();

    // Restore tab badges (checkMyCardTab resets textContent)
    if (_pollState.initialized) updateNotificationBadges();

    // Check for reply notifications (profile circles at bottom)
    setTimeout(function() {
        if (_pollState.initialized) {
            renderReplyNotifCirclesFromState();
            pollForNotifications(); // catch up immediately
        } else {
            checkReplyNotifications(); // fallback for non-FB users
        }
    }, 500);

    // Skip loading if we're switching to a specific tab (like cardview)
    if (skipLoadComments) return;

    var isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();

    // Update tab visibility based on login state
    updateTabVisibility(isLoggedIn);

    // Reset all state (matching switchCommentsTab)
    commentsLastKey = null;
    commentsHasMore = true;
    displayedCommentIds.clear();
    newestCommentTimestamp = 0;
    expandedCommentCard = null;
    navigatedCommentCard = null;
    isLoadingComments = false;

    // Unsubscribe from any existing real-time updates before loading
    if (window.cardCounter && window.cardCounter.unsubscribeFromNewComments) {
        window.cardCounter.unsubscribeFromNewComments();
    }

    var commentsList = document.getElementById('commentsList');

    if (!isLoggedIn && !wasPreviouslyConnected()) {
        // Not logged in: default to "mycard" tab (show local draw history)
        currentCommentsTab = 'mycard';
        if (commentsTabs) {
            commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
            var mycardTab = commentsTabs.querySelector('[data-tab="mycard"]');
            if (mycardTab) mycardTab.classList.add('active');
        }
        if (commentsList) {
            commentsList.classList.add('feed-mode');
            commentsList.classList.add('mycard-mode');
        }
        loadMyCardComments();
    } else {
        // Logged in: default to "feed" tab
        currentCommentsTab = 'feed';
        if (commentsTabs) {
            commentsTabs.querySelectorAll('.comments-tab').forEach(t => t.classList.remove('active'));
            var feedTab = commentsTabs.querySelector('[data-tab="feed"]');
            if (feedTab) feedTab.classList.add('active');
        }
        if (commentsList) commentsList.classList.add('feed-mode');
        loadFeed(true);
    }
}

// Show/hide tabs based on login state
function updateTabVisibility(isLoggedIn) {
    var commentsTabs = document.getElementById('commentsTabs');
    if (!commentsTabs) return;

    var socialTabs = ['feed', 'friends', 'me', 'activity'];
    var allTabs = commentsTabs.querySelectorAll('.comments-tab');

    allTabs.forEach(function(tab) {
        var tabName = tab.dataset.tab;
        if (!tabName) return;
        if (tabName === 'mycard') {
            // My Card tab is always visible
            tab.style.display = '';
        } else if (tabName === 'cardview') {
            // cardview tab has its own visibility logic
        } else if (socialTabs.indexOf(tabName) !== -1) {
            // Social tabs: hide when not logged in
            tab.style.display = (isLoggedIn || wasPreviouslyConnected()) ? '' : 'none';
        }
    });
}

// Check if user has any comments and show/hide the "Me" tab
async function checkUserHasComments() {
    const commentsTabs = document.getElementById('commentsTabs');
    if (!commentsTabs) return;

    const meTab = commentsTabs.querySelector('[data-tab="me"]');
    if (!meTab) return;

    // Hide by default first
    meTab.style.display = 'none';

    // Check if user has a saved name - if not, don't show the tab
    const savedName = getSavedUserName();
    if (!savedName) {
        return;
    }

    // Check if Firebase is ready
    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        return;
    }

    // Check if user has any comments
    const userId = getUserId();
    const userComments = await window.cardCounter.fetchCommentsByUserId(userId, 1);

    if (userComments.length > 0) {
        meTab.style.display = '';
    }
}

// Check if user has any comments and show/hide the "ไพ่ฉัน" tab
async function checkMyCardTab() {
    // MyCard tab is always visible — no need to hide/show
    const commentsTabs = document.getElementById('commentsTabs');
    if (!commentsTabs) return;

    const myCardTab = commentsTabs.querySelector('[data-tab="mycard"]');
    if (myCardTab) {
        // Preserve badge if present before resetting text
        var badge = myCardTab.querySelector('.tab-badge');
        myCardTab.textContent = t('comments.tabMyCard');
        if (badge) myCardTab.appendChild(badge);
    }
}

function updateCommentsPanelUser() {
    const userElement = document.getElementById('commentsPanelUser');
    if (!userElement) return;

    const savedName = getSavedUserName();
    if (savedName) {
        userElement.textContent = savedName;
        userElement.classList.remove('anonymous');
    } else {
        userElement.textContent = 'Me';
        userElement.classList.add('anonymous');
    }
}

// Navigate to draw card page from comments panel CTA
function goToDrawFromComments() {
    // Close comments panel first
    closeCommentsPanel();

    // If on result page, close result first
    const resultPanel = document.getElementById('resultPanel');
    if (resultPanel && resultPanel.classList.contains('active')) {
        closeResult();
        return;
    }

    // If on landing page, trigger the card to start
    const landingPage = document.getElementById('landingPage');
    if (landingPage && !landingPage.classList.contains('hidden')) {
        const spinningCard = document.getElementById('spinningCard');
        if (spinningCard) {
            spinningCard.click();
        }
    }
}

function closeCommentsPanel(fromBackButton = false) {
    const commentsPanel = document.getElementById('commentsPanel');
    const commentsOverlay = document.getElementById('commentsOverlay');

    // Only close if panel is actually open
    if (!commentsPanel.classList.contains('show')) return;

    commentsPanel.classList.remove('show');
    commentsOverlay.classList.remove('show');
    document.body.style.overflow = '';

    // Handle history state - go back if not triggered by back button
    if (window.commentsPanelHistoryPushed && !fromBackButton) {
        window.commentsPanelHistoryPushed = false;
        history.back();
    } else {
        window.commentsPanelHistoryPushed = false;
    }

    // Reset expanded card state
    expandedCommentCard = null;
    navigatedCommentCard = null;

    // Unsubscribe from real-time updates
    if (window.cardCounter && window.cardCounter.unsubscribeFromNewComments) {
        window.cardCounter.unsubscribeFromNewComments();
    }
}

// Handle browser back button for comments panel
window.addEventListener('popstate', () => {
    const commentsPanel = document.getElementById('commentsPanel');
    if (commentsPanel && commentsPanel.classList.contains('show')) {
        closeCommentsPanel(true);
    }
});

// Handle new comment from real-time listener
async function handleNewComment(comment) {
    // Skip if already displayed
    if (displayedCommentIds.has(comment.id)) return;

    // Skip older comments that are coming from child_added for existing data
    // Only prepend comments that are truly new (timestamp > newestCommentTimestamp)
    const commentTimestamp = comment.timestamp || 0;
    if (commentTimestamp <= newestCommentTimestamp) return;

    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    // Resolve display name from profile
    await resolveDisplayNames([comment]);

    // Remove empty message if exists
    const emptyMsg = commentsList.querySelector('.comments-empty');
    if (emptyMsg) {
        emptyMsg.remove();
    }

    // Create and prepend new comment card at the top
    const card = createCommentCard(comment);
    card.classList.add('new-comment');

    // Insert at top (after loading element if visible)
    const loadingEl = document.getElementById('commentsLoading');
    if (loadingEl && loadingEl.style.display !== 'none') {
        loadingEl.after(card);
    } else if (commentsList.firstChild) {
        commentsList.insertBefore(card, commentsList.firstChild);
    } else {
        commentsList.appendChild(card);
    }

    // Track this comment as displayed
    displayedCommentIds.add(comment.id);

    // Update newest timestamp
    newestCommentTimestamp = commentTimestamp;

    // Scroll to top to show new comment
    commentsList.scrollTop = 0;

    // Remove animation class after animation
    setTimeout(() => {
        card.classList.remove('new-comment');
    }, 500);
}

async function loadComments(reset = false) {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    if (reset) {
        commentsList.innerHTML = '';
        commentsList.appendChild(loadingEl);
        loadingEl.style.display = 'block';
        expandedCommentCard = null; // Reset expanded card state
        commentsLastKey = null;
    }

    if (!window.cardCounter || !window.cardCounter.fetchComments) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    // On first load, fetch top comments by replies first
    if (reset && window.cardCounter.fetchTopCommentsByReplies) {
        const topComments = await window.cardCounter.fetchTopCommentsByReplies(3);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort

        await resolveDisplayNames(topComments);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort

        if (topComments.length > 0) {
            // Create top comments section header
            const topSection = document.createElement('div');
            topSection.className = 'comments-top-section';
            topSection.innerHTML = '<div class="comments-section-title">' + t('sections.popular') + '</div>';
            commentsList.appendChild(topSection);

            // Add top comments
            topComments.forEach(comment => {
                const card = createCommentCard(comment, true); // true = show reply count
                commentsList.appendChild(card);
                displayedCommentIds.add(comment.id);
            });

            // Add separator for recent comments
            const recentHeader = document.createElement('div');
            recentHeader.className = 'comments-section-title recent';
            recentHeader.innerHTML = t('sections.recent');
            commentsList.appendChild(recentHeader);
        }
    }

    const result = await window.cardCounter.fetchComments(commentsLastKey, 10);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(result.comments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (result.comments.length === 0 && reset && displayedCommentIds.size === 0) {
        // Set timestamp to current time so older existing comments won't be prepended
        newestCommentTimestamp = Date.now();

        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">💬</div>
                <div class="comments-empty-text">${t('cta.beFirstComment')}</div>
            </div>
        `;
        isLoadingComments = false;

        // Subscribe to real-time updates even when empty
        if (window.cardCounter && window.cardCounter.subscribeToNewComments) {
            window.cardCounter.subscribeToNewComments(handleNewComment);
        }
        return;
    }

    // Track the newest comment timestamp for real-time filtering
    if (reset && result.comments.length > 0) {
        newestCommentTimestamp = result.comments[0].timestamp || Date.now();
    }

    // Show newest at top, oldest at bottom (default order from fetchComments)
    result.comments.forEach(comment => {
        // Skip if already displayed (from top section or real-time update)
        if (displayedCommentIds.has(comment.id)) return;

        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    commentsLastKey = result.lastKey;
    commentsHasMore = result.hasMore;

    isLoadingComments = false;

    // Subscribe to real-time updates after initial load (only on reset/first load)
    if (reset && window.cardCounter && window.cardCounter.subscribeToNewComments) {
        window.cardCounter.subscribeToNewComments(handleNewComment);
    }
}

function loadMoreComments() {
    if (commentsHasMore && !isLoadingComments) {
        loadComments(false);
    }
}

// Load comments for Hot tab (sorted by most replies)
async function loadHotComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    if (!window.cardCounter || !window.cardCounter.fetchHotComments) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchHotComments(30);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(comments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">🔥</div>
                <div class="comments-empty-text">${t('common.noHotComments')}<br>${t('common.tryReply')}</div>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // Display all hot comments with reply count badge
    comments.forEach(comment => {
        const card = createCommentCard(comment, true);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

// Load comments for Me tab (user's own comments)
async function loadMyComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    // Require Facebook login
    if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) {
        commentsList.innerHTML = wasPreviouslyConnected() ? buildSocialLoadingCta() : buildLoginRequiredCta('login.saveDraws', 'login.saveDrawsSub');
        isLoadingComments = false;
        return;
    }

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    const userId = getUserId();

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchCommentsByUserId(userId, 50);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(comments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="comments-empty comments-empty-cta">
                <div class="cta-sparkles">
                    <span class="sparkle s1">✦</span>
                    <span class="sparkle s2">✧</span>
                    <span class="sparkle s3">✦</span>
                </div>
                <div class="cta-card-icon">
                    <svg viewBox="0 0 60 80" fill="none">
                        <rect x="5" y="5" width="50" height="70" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
                        <path d="M30 25 L35 35 L45 37 L38 44 L40 55 L30 50 L20 55 L22 44 L15 37 L25 35 Z" fill="currentColor" opacity="0.3"/>
                        <circle cx="30" cy="40" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <text x="30" y="44" text-anchor="middle" font-size="10" fill="currentColor">?</text>
                    </svg>
                </div>
                <div class="comments-empty-text">${t('cta.notAccepted')}</div>
                <p class="cta-subtitle">${t('cta.drawToReceive')}</p>
                <button class="cta-draw-btn" onclick="goToDrawFromComments()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="7" height="10" rx="1" transform="rotate(-10 6.5 9)"/>
                        <rect x="14" y="4" width="7" height="10" rx="1" transform="rotate(10 17.5 9)"/>
                    </svg>
                    <span>${t('cta.goDrawCard')}</span>
                </button>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // Display user's comments
    comments.forEach(comment => {
        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

// Load comments for My Card tab (comments on the card user picked)
async function loadMyCardComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    var isLoggedIn = typeof isFacebookConnected === 'function' && isFacebookConnected();

    // Not logged in: show localStorage draw history
    if (!isLoggedIn) {
        if (wasPreviouslyConnected()) {
            commentsList.innerHTML = buildSocialLoadingCta();
            isLoadingComments = false;
            return;
        }
        var localDraws = getLocalDrawHistory();
        commentsList.innerHTML = '';
        if (localDraws.length === 0) {
            commentsList.innerHTML = buildMyCardEmptyCta();
            isLoadingComments = false;
            return;
        }
        var savedName = getSavedUserName() || 'Me';
        localDraws.forEach(function(draw, idx) {
            var fakeComment = {
                id: 'local_' + idx,
                cardId: draw.cardId,
                cardName: draw.cardName,
                cardImage: draw.cardImage,
                comment: draw.comment || '',
                timestamp: draw.timestamp,
                userName: savedName,
                profilePicture: null,
                multiCards: draw.multiCards || null,
                readingMode: draw.readingMode || null,
                readingCategory: draw.readingCategory || null
            };
            var card = createFeedCard(fakeComment);
            commentsList.appendChild(card);
        });
        isLoadingComments = false;
        return;
    }

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    const userId = getUserId();

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const myComments = await window.cardCounter.fetchCommentsByUserId(userId, 50);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(myComments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (myComments.length === 0) {
        commentsList.innerHTML = buildMyCardEmptyCta();
        isLoadingComments = false;
        return;
    }

    // Use feed card style — same as วงไพ่ tab
    myComments.forEach(comment => {
        if (displayedCommentIds.has(comment.id)) return;
        var card = createFeedCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

// Load friends' cards using Facebook friends API
async function loadFriendsCards() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    var commentsList = document.getElementById('commentsList');
    var loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    // Check if user is logged in via Facebook
    if (!isFacebookConnected()) {
        loadingEl.style.display = 'none';
        commentsList.innerHTML = wasPreviouslyConnected() ? buildSocialLoadingCta() : buildFriendsLoginCta();
        isLoadingComments = false;
        return;
    }

    // Fetch Facebook friends who also use this app
    try {
        var friendResult = await getFacebookFriendIds();
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort

        // If FB session expired or SDK not ready, show loading if previously connected
        if (friendResult.status === 'not_connected' || friendResult.status === 'no_sdk') {
            loadingEl.style.display = 'none';
            commentsList.innerHTML = wasPreviouslyConnected() ? buildSocialLoadingCta() : buildFriendsReconnectCta();
            isLoadingComments = false;
            return;
        }

        if (friendResult.ids.length === 0) {
            loadingEl.style.display = 'none';
            commentsList.innerHTML = buildFriendsInviteCta();
            isLoadingComments = false;
            return;
        }

        // Convert FB IDs to app user IDs (fb_ prefix)
        var friendUserIds = friendResult.ids.map(function(id) { return 'fb_' + id; });

        if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserIds) {
            loadingEl.style.display = 'none';
            commentsList.innerHTML = '<div class="comments-empty"><div class="comments-empty-text">' + t('common.loadError') + '</div></div>';
            isLoadingComments = false;
            return;
        }

        var friendComments = await window.cardCounter.fetchCommentsByUserIds(friendUserIds, 50);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort

        await resolveDisplayNames(friendComments);
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort

        loadingEl.style.display = 'none';

        if (friendComments.length === 0) {
            commentsList.innerHTML = buildFriendsInviteCta();
            isLoadingComments = false;
            return;
        }

        // Read last-seen timestamp BEFORE rendering (don't auto-update)
        var lastSeenTs = parseInt(localStorage.getItem('tarot_friends_last_seen_ts') || '0', 10);
        var unseenCount = 0;

        friendComments.forEach(function(comment) {
            if (displayedCommentIds.has(comment.id)) return;
            var card = createFeedCard(comment);

            // Mark unseen cards
            if ((comment.timestamp || 0) > lastSeenTs) {
                card.classList.add('feed-card-unseen');
                var nameEl = card.querySelector('.feed-card-name');
                if (nameEl) {
                    var badge = document.createElement('span');
                    badge.className = 'feed-card-unseen-badge';
                    badge.textContent = t('friends.newBadge');
                    nameEl.appendChild(badge);
                }
                unseenCount++;
            }

            commentsList.appendChild(card);
            displayedCommentIds.add(comment.id);
        });

        // Show mark-all-read bar if there are unseen cards
        if (unseenCount > 0) {
            var bar = document.createElement('div');
            bar.className = 'friends-mark-all-bar';
            bar.id = 'friendsMarkAllBar';
            bar.innerHTML =
                '<span class="unseen-count-text">' + unseenCount + ' ' + t('friends.newBadge') + '</span>' +
                '<button class="friends-mark-all-btn">' + t('friends.markAllRead') + '</button>';
            bar.querySelector('.friends-mark-all-btn').addEventListener('click', function() {
                markAllFriendsRead(friendComments);
            });
            // Insert at the top of the list
            commentsList.insertBefore(bar, commentsList.firstChild);
        }

    } catch (e) {
        if (gen !== tabSwitchGeneration) return; // Tab changed, abort
        console.warn('Failed to load friends cards:', e.message);
        loadingEl.style.display = 'none';
        commentsList.innerHTML = buildFriendsInviteCta();
    }

    isLoadingComments = false;
}

// Mark all friend cards as read
function markAllFriendsRead(friendComments) {
    // Update timestamp to newest
    if (friendComments && friendComments.length > 0) {
        var newestTs = Math.max.apply(null, friendComments.map(function(c) { return c.timestamp || 0; }));
        localStorage.setItem('tarot_friends_last_seen_ts', String(newestTs));
    }

    // Remove all unseen badges and highlights
    var commentsList = document.getElementById('commentsList');
    if (commentsList) {
        commentsList.querySelectorAll('.feed-card-unseen').forEach(function(card) {
            card.classList.remove('feed-card-unseen');
            var badge = card.querySelector('.feed-card-unseen-badge');
            if (badge) badge.remove();
        });
    }

    // Remove the mark-all bar
    var bar = document.getElementById('friendsMarkAllBar');
    if (bar) {
        bar.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
        bar.style.opacity = '0';
        bar.style.maxHeight = '0';
        bar.style.overflow = 'hidden';
        setTimeout(function() { bar.remove(); }, 300);
    }

    // Clear circle stack on landing page
    var stack = document.getElementById('notifCircleStack');
    if (stack) stack.innerHTML = '';

    // Reset poll state
    _pollState.unseenFriendDraws = 0;
    _pollState.friendDrawsData = [];
    updateNotificationBadges();
}

// Get Facebook friend IDs who also use this app
// Returns { ids: string[], status: 'ok'|'not_connected'|'no_sdk' }
function getFacebookFriendIds() {
    return new Promise(function(resolve) {
        if (typeof FB === 'undefined') {
            console.warn('Friends: FB SDK not loaded');
            resolve({ ids: [], status: 'no_sdk' });
            return;
        }
        // First verify the FB session is actually active
        FB.getLoginStatus(function(statusResponse) {
            if (statusResponse.status !== 'connected') {
                console.warn('Friends: FB session not active, status:', statusResponse.status);
                resolve({ ids: [], status: 'not_connected' });
                return;
            }
            FB.api('/me/friends', { fields: 'id', limit: 100 }, function(response) {
                if (response && !response.error && response.data) {
                    console.log('Friends: found', response.data.length, 'app friends');
                    resolve({ ids: response.data.map(function(f) { return f.id; }), status: 'ok' });
                } else {
                    console.warn('Friends: API error', response && response.error);
                    resolve({ ids: [], status: 'ok' });
                }
            });
        });
    });
}

// Build generic login-required CTA (reusable across tabs)
function buildLoginRequiredCta(messageKey, subtitleKey) {
    return '<div class="comments-empty comments-empty-cta friends-cta">' +
        '<div class="cta-sparkles">' +
            '<span class="sparkle s1">✦</span>' +
            '<span class="sparkle s2">✧</span>' +
            '<span class="sparkle s3">✦</span>' +
        '</div>' +
        '<div class="friends-cta-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">' +
                '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>' +
                '<circle cx="9" cy="7" r="4"/>' +
                '<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>' +
                '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>' +
            '</svg>' +
        '</div>' +
        '<div class="comments-empty-text">' + t(messageKey || 'login.required') + '</div>' +
        '<p class="cta-subtitle">' + t(subtitleKey || 'blessing.loginToSee') + '</p>' +
        '<button class="friends-login-btn" onclick="loginWithFacebook()">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
            t('login.loginBtn') +
        '</button>' +
    '</div>';
}

// Build empty CTA for My Card tab (no draws yet)
function buildMyCardEmptyCta() {
    return '<div class="comments-empty comments-empty-cta draw-cta">' +
        '<div class="cta-sparkles">' +
            '<span class="sparkle s1">✦</span>' +
            '<span class="sparkle s2">✧</span>' +
            '<span class="sparkle s3">✦</span>' +
        '</div>' +
        '<div class="cta-card-icon">' +
            '<svg viewBox="0 0 60 80" fill="none">' +
                '<rect x="5" y="5" width="50" height="70" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>' +
                '<path d="M30 25 L35 35 L45 37 L38 44 L40 55 L30 50 L20 55 L22 44 L15 37 L25 35 Z" fill="currentColor" opacity="0.3"/>' +
                '<circle cx="30" cy="40" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>' +
                '<text x="30" y="44" text-anchor="middle" font-size="10" fill="currentColor">?</text>' +
            '</svg>' +
        '</div>' +
        '<div class="comments-empty-text">' + t('cta.noDrawsYet') + '</div>' +
        '<p class="cta-subtitle">' + t('cta.goDrawSub') + '</p>' +
        '<button class="go-draw-btn" onclick="goDrawCard()">' +
            '<svg class="go-draw-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                '<circle cx="12" cy="12" r="4" fill="rgba(154,170,212,0.15)" stroke="rgba(220,225,240,0.7)"/>' +
                '<path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke-linecap="round"/>' +
                '<path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke-linecap="round" opacity="0.5"/>' +
            '</svg>' +
            '<span>' + t('cta.goDrawCard') + '</span>' +
        '</button>' +
    '</div>';
}

// Handle "Go draw card" button click
function goDrawCard() {
    closeCommentsPanel();
    // Small delay to let panel close, then trigger card drawing
    setTimeout(function() {
        startExperience();
    }, 400);
}

// Build CTA for when user is not logged in (friends tab)
function buildFriendsLoginCta() {
    return buildLoginRequiredCta('blessing.seeWhatFriendsDraw', 'blessing.loginToSee');
}

// Build CTA for inviting friends
function buildFriendsInviteCta() {
    return '<div class="comments-empty comments-empty-cta friends-cta">' +
        '<div class="cta-sparkles">' +
            '<span class="sparkle s1">✦</span>' +
            '<span class="sparkle s2">✧</span>' +
            '<span class="sparkle s3">✦</span>' +
        '</div>' +
        '<div class="friends-cta-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">' +
                '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>' +
                '<circle cx="9" cy="7" r="4"/>' +
                '<line x1="19" y1="8" x2="19" y2="14"/>' +
                '<line x1="16" y1="11" x2="22" y2="11"/>' +
            '</svg>' +
        '</div>' +
        '<div class="comments-empty-text">' + t('friends.empty') + '</div>' +
        '<p class="cta-subtitle">' + t('friends.emptyHint') + '</p>' +
        '<button class="friends-invite-btn" onclick="inviteFriendsViaMessenger()">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.17 7.22V22l3.04-1.67c.84.23 1.75.37 2.79.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.03 13.05l-2.55-2.73L5.5 15.05l5.5-5.83 2.55 2.73 4.98-2.73-5.5 5.83z"/></svg>' +
            t('friends.inviteBtn') +
        '</button>' +
    '</div>';
}

// Build CTA for when FB session expired (need to reconnect)
function buildFriendsReconnectCta() {
    return '<div class="comments-empty comments-empty-cta friends-cta">' +
        '<div class="cta-sparkles">' +
            '<span class="sparkle s1">✦</span>' +
            '<span class="sparkle s2">✧</span>' +
            '<span class="sparkle s3">✦</span>' +
        '</div>' +
        '<div class="friends-cta-icon">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">' +
                '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>' +
                '<circle cx="9" cy="7" r="4"/>' +
                '<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>' +
                '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>' +
            '</svg>' +
        '</div>' +
        '<div class="comments-empty-text">' + t('friends.reconnect') + '</div>' +
        '<p class="cta-subtitle">' + t('friends.reconnectHint') + '</p>' +
        '<button class="friends-login-btn" onclick="reconnectFacebook()">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
            t('friends.reconnectBtn') +
        '</button>' +
    '</div>';
}

// Reconnect Facebook and reload friends tab
function reconnectFacebook() {
    if (typeof FB === 'undefined') return;
    FB.login(function(response) {
        if (response.status === 'connected') {
            handleStatusChange(response);
            isLoadingComments = false; // Reset flag so loadFriendsCards can proceed
            displayedCommentIds.clear();
            loadFriendsCards();
        }
    }, { scope: 'public_profile,user_friends', return_scopes: true });
}

// Invite friends via Facebook Messenger
function inviteFriendsViaMessenger() {
    if (typeof FB === 'undefined') return;

    var appUrl = 'https://pimfahmaprod.github.io/card-of-the-day/';
    var inviteMsg = t('friends.inviteMsg');

    FB.ui({
        method: 'send',
        link: appUrl
    }, function(response) {
        // Optional callback
    });
}

// ========================================
// Friends New Cards – Profile Circle Stack
// ========================================

async function checkFriendsNewCards() {
    var stack = document.getElementById('notifCircleStack');
    if (!stack) return;

    // Only for FB-connected users
    if (!isFacebookConnected()) {
        stack.innerHTML = '';
        return;
    }

    try {
        var friendResult = await getFacebookFriendIds();
        if (friendResult.status !== 'ok' || friendResult.ids.length === 0) {
            stack.innerHTML = '';
            return;
        }

        var friendUserIds = friendResult.ids.map(function(id) { return 'fb_' + id; });

        if (!window.cardCounter || !window.cardCounter.fetchCommentsByUserIds) {
            stack.innerHTML = '';
            return;
        }

        var friendComments = await window.cardCounter.fetchCommentsByUserIds(friendUserIds, 50);
        if (friendComments.length === 0) {
            stack.innerHTML = '';
            return;
        }

        var lastSeenTs = parseInt(localStorage.getItem('tarot_friends_last_seen_ts') || '0', 10);
        var newComments = friendComments.filter(function(c) { return (c.timestamp || 0) > lastSeenTs; });

        if (newComments.length === 0) {
            stack.innerHTML = '';
            return;
        }

        // Store into poll state so shared renderer can use it
        _pollState.friendDrawsData = newComments;
        _pollState.unseenFriendDraws = newComments.length;
        updateNotificationBadges();
        renderNotifCircleStack();

    } catch (e) {
        console.warn('Failed to check friends new cards:', e.message);
        stack.innerHTML = '';
    }
}

function onFriendCircleClick(circleEl) {
    // Update poll state — remove this friend's draws
    var userId = circleEl ? circleEl.dataset.userId : null;
    if (userId && _pollState.friendDrawsData.length > 0) {
        _pollState.friendDrawsData = _pollState.friendDrawsData.filter(function(c) {
            return c.userId !== userId;
        });
        _pollState.unseenFriendDraws = _pollState.friendDrawsData.length;
        updateNotificationBadges();
    }

    // Animate out the clicked circle
    if (circleEl) {
        circleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        circleEl.style.opacity = '0';
        circleEl.style.transform = 'scale(0.5) translateX(16px)';
        setTimeout(function() { circleEl.remove(); }, 300);
    }

    // Re-render both containers after state change
    setTimeout(function() {
        renderNotifCircleStack();
        renderReplyNotifCirclesFromState();
    }, 350);

    // Open comments panel and switch to friends tab
    openCommentsPanel(true);

    var commentsTabs = document.getElementById('commentsTabs');
    if (commentsTabs) {
        commentsTabs.querySelectorAll('.comments-tab').forEach(function(tab) {
            tab.classList.remove('active');
        });
        var friendsTab = commentsTabs.querySelector('[data-tab="friends"]');
        if (friendsTab) friendsTab.classList.add('active');
    }

    currentCommentsTab = 'friends';
    switchCommentsTab('friends');
}

// Dismiss all notification circles (friend draws + replies) + mark as seen
function dismissAllNotifCircles() {
    var stack = document.getElementById('notifCircleStack');
    if (!stack) return;

    // Mark friend draws as seen
    if (_pollState.friendDrawsData.length > 0) {
        var newestFriendTs = Math.max.apply(null, _pollState.friendDrawsData.map(function(c) { return c.timestamp || 0; }));
        localStorage.setItem('tarot_friends_last_seen_ts', String(newestFriendTs));
    }

    // Mark replies as seen
    if (_pollState.repliesData.length > 0) {
        var newestReplyTs = Math.max.apply(null, _pollState.repliesData.map(function(item) {
            return item.reply ? (item.reply.timestamp || 0) : 0;
        }));
        if (newestReplyTs > 0) {
            localStorage.setItem('tarot_replies_last_seen_ts', String(newestReplyTs));
        }
    }

    // Reset poll state for both
    _pollState.unseenFriendDraws = 0;
    _pollState.friendDrawsData = [];
    _pollState.unseenReplies = 0;
    _pollState.repliesData = [];
    updateNotificationBadges();

    // Animate out all circles in both containers with CSS cascade animation
    var containers = [stack, document.getElementById('replyNotifBar')];
    var maxLen = 0;
    containers.forEach(function(container) {
        if (!container) return;
        // Uncollapse first so hidden items become visible for animation
        container.classList.remove('collapsed');
        var expandBtn = container.querySelector('.notif-circle-expand-btn');
        if (expandBtn) expandBtn.remove();
        var items = container.querySelectorAll('.notif-circle-item, .notif-circle-dismiss');
        if (items.length > maxLen) maxLen = items.length;
        items.forEach(function(item, i) {
            item.style.animationDelay = (i * 0.04) + 's';
            item.classList.add('friends-circle-dismiss-out');
        });
    });
    setTimeout(function() {
        containers.forEach(function(container) {
            if (!container) return;
            container.innerHTML = '';
            container.classList.remove('scrollable', 'collapsed');
            delete container.dataset.expanded;
        });
    }, 400 + maxLen * 40);
}

// Touch drag support for scrollable circle stack
function setupCircleStackDrag(stack) {
    var startY = 0;
    var startScroll = 0;
    var isDragging = false;

    stack.addEventListener('touchstart', function(e) {
        if (e.target.closest('.notif-circle-collapse-btn') || e.target.closest('.notif-circle-expand-btn')) return;
        startY = e.touches[0].clientY;
        startScroll = stack.scrollTop;
        isDragging = true;
    }, { passive: true });

    stack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        var dy = startY - e.touches[0].clientY;
        stack.scrollTop = startScroll + dy;
    }, { passive: true });

    stack.addEventListener('touchend', function() {
        isDragging = false;
    }, { passive: true });
}

// ========================================
// Reply Notification Profile Circles
// ========================================

var _replyNotifPending = null; // { commentId, replyId } to navigate to after tab loads

async function checkReplyNotifications() {
    var bar = document.getElementById('replyNotifBar');
    if (!bar) return;

    // Only for FB-connected users
    if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) {
        bar.innerHTML = '';
        return;
    }

    var userId = getUserId();
    if (!userId || !window.cardCounter || !window.cardCounter.fetchRepliesToMyComments) {
        bar.innerHTML = '';
        return;
    }

    try {
        var allReplies = await window.cardCounter.fetchRepliesToMyComments(userId);
        if (allReplies.length === 0) {
            bar.innerHTML = '';
            return;
        }

        var lastSeenTs = parseInt(localStorage.getItem('tarot_replies_last_seen_ts') || '0', 10);
        var newReplies = allReplies.filter(function(item) {
            return (item.reply.timestamp || 0) > lastSeenTs;
        });

        if (newReplies.length === 0) {
            bar.innerHTML = '';
            return;
        }

        // Store into poll state so shared renderer can use it
        _pollState.repliesData = newReplies;
        _pollState.unseenReplies = newReplies.length;
        updateNotificationBadges();
        renderReplyNotifCirclesFromState();
    } catch (e) {
        console.warn('Failed to check reply notifications:', e.message);
        bar.innerHTML = '';
    }
}

function onReplyNotifClick(commentId, replyId, circleEl, replyTimestamp) {
    // Mark this reply as seen
    if (replyTimestamp) {
        var currentTs = parseInt(localStorage.getItem('tarot_replies_last_seen_ts') || '0', 10);
        if (replyTimestamp > currentTs) {
            localStorage.setItem('tarot_replies_last_seen_ts', String(replyTimestamp));
        }
        // Update poll state
        _pollState.repliesData = _pollState.repliesData.filter(function(item) {
            return (item.reply.timestamp || 0) > replyTimestamp;
        });
        _pollState.unseenReplies = _pollState.repliesData.length;
        updateNotificationBadges();
        renderNotifCircleStack();
        renderReplyNotifCirclesFromState();
    }

    // Store the target for after tab loads
    _replyNotifPending = { commentId: commentId, replyId: replyId };

    // Make sure the panel is open
    var commentsPanel = document.getElementById('commentsPanel');
    if (!commentsPanel || !commentsPanel.classList.contains('show')) {
        openCommentsPanel(true);
    }

    // Switch to "ไพ่ฉัน" tab
    var commentsTabs = document.getElementById('commentsTabs');
    if (commentsTabs) {
        commentsTabs.querySelectorAll('.comments-tab').forEach(function(tab) {
            tab.classList.remove('active');
        });
        var mycardTab = commentsTabs.querySelector('[data-tab="mycard"]');
        if (mycardTab) mycardTab.classList.add('active');
    }

    currentCommentsTab = 'mycard';
    switchCommentsTab('mycard');

    // Wait for mycard tab to load, then navigate to the specific comment
    // Circle will be removed after the reply is found and highlighted
    waitForFeedCardAndExpand(commentId, replyId, circleEl);
}

function waitForFeedCardAndExpand(commentId, replyId, circleEl) {
    var attempts = 0;
    var maxAttempts = 40; // 4 seconds max
    var interval = setInterval(function() {
        attempts++;
        var commentsList = document.getElementById('commentsList');
        if (!commentsList) { clearInterval(interval); removeNotifCircle(circleEl); return; }

        var targetCard = commentsList.querySelector('.feed-card[data-comment-id="' + commentId + '"]');
        if (targetCard) {
            clearInterval(interval);
            expandAndHighlightReply(targetCard, commentId, replyId, circleEl);
        } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            _replyNotifPending = null;
            removeNotifCircle(circleEl);
        }
    }, 100);
}

function removeNotifCircle(circleEl) {
    if (!circleEl) return;
    circleEl.classList.add('friends-circle-dismiss-out');
    setTimeout(function() { circleEl.remove(); }, 400);
}

function expandAndHighlightReply(card, commentId, replyId, circleEl) {
    // Scroll card into view first
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Expand the card
    var header = card.querySelector('.feed-card-header');
    if (header && !card.classList.contains('expanded')) {
        header.click();
    }

    // Wait for replies to load, then highlight the specific reply
    var replyAttempts = 0;
    var replyMaxAttempts = 30; // 3 seconds
    var replyInterval = setInterval(function() {
        replyAttempts++;
        var targetReply = card.querySelector('.reply-item[data-reply-id="' + replyId + '"]');
        if (targetReply) {
            clearInterval(replyInterval);
            _replyNotifPending = null;

            // Now that the reply is found, remove the notification circle
            removeNotifCircle(circleEl);

            // Small delay to let expansion animation finish
            setTimeout(function() {
                targetReply.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Apply highlight
                setTimeout(function() {
                    targetReply.classList.add('reply-highlight');

                    // After 5 seconds, fade it out
                    setTimeout(function() {
                        targetReply.classList.add('reply-highlight-fade');
                        // Clean up after fade transition
                        setTimeout(function() {
                            targetReply.classList.remove('reply-highlight', 'reply-highlight-fade');
                        }, 800);
                    }, 5000);
                }, 300);
            }, 400);
        } else if (replyAttempts >= replyMaxAttempts) {
            clearInterval(replyInterval);
            _replyNotifPending = null;
            removeNotifCircle(circleEl);
        }
    }, 100);
}

// ========================================
// Notification Polling System
// ========================================

async function initNotificationPolling() {
    if (_pollState.initialized) return; // Already initialized
    if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) return;

    var userId = getUserId();
    if (!userId || !window.cardCounter) return;

    // Step 1: Cache friend IDs
    try {
        var friendResult = await getFacebookFriendIds();
        if (friendResult.status === 'ok' && friendResult.ids.length > 0) {
            _pollState.friendUserIds = friendResult.ids.map(function(id) { return 'fb_' + id; });
        }
    } catch (e) { /* ignore */ }

    // Step 2: Get user's comment IDs (for reply checking)
    try {
        if (window.cardCounter.fetchCommentsByUserId) {
            var myComments = await window.cardCounter.fetchCommentsByUserId(userId, 50);
            _pollState.myCommentIds = myComments.map(function(c) { return c.id; });
        }
    } catch (e) { /* ignore */ }

    // Step 3: Initial full fetch to populate counts
    var friendsLastSeen = parseInt(localStorage.getItem('tarot_friends_last_seen_ts') || '0', 10);
    var repliesLastSeen = parseInt(localStorage.getItem('tarot_replies_last_seen_ts') || '0', 10);

    // Set safe defaults so polling doesn't download everything
    _pollState.friendsLastCheckedTs = Date.now();
    _pollState.repliesLastCheckedTs = Date.now();

    // Friend draws
    if (_pollState.friendUserIds.length > 0 && window.cardCounter.fetchCommentsByUserIds) {
        try {
            var friendComments = await window.cardCounter.fetchCommentsByUserIds(_pollState.friendUserIds, 50);
            var unseenFriends = friendComments.filter(function(c) { return (c.timestamp || 0) > friendsLastSeen; });
            _pollState.unseenFriendDraws = unseenFriends.length;
            _pollState.friendDrawsData = unseenFriends;
            _pollState.friendsLastCheckedTs = friendComments.length > 0
                ? Math.max.apply(null, friendComments.map(function(c) { return c.timestamp || 0; }))
                : Date.now();
        } catch (e) { /* ignore */ }
    }

    // Replies
    if (_pollState.myCommentIds.length > 0 && window.cardCounter.fetchRepliesToMyComments) {
        try {
            var allReplies = await window.cardCounter.fetchRepliesToMyComments(userId);
            var unseenReplies = allReplies.filter(function(item) { return (item.reply.timestamp || 0) > repliesLastSeen; });
            _pollState.unseenReplies = unseenReplies.length;
            _pollState.repliesData = unseenReplies;
            _pollState.repliesLastCheckedTs = allReplies.length > 0
                ? Math.max.apply(null, allReplies.map(function(item) { return item.reply.timestamp || 0; }))
                : Date.now();
        } catch (e) { /* ignore */ }
    }

    _pollState.initialized = true;
    _pollState.lastPollTime = Date.now();

    // Step 4: Update UI
    updateNotificationBadges();
    renderNotifCircleStack();

    // Step 5: Start polling + visibility listener
    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

async function pollForNotifications() {
    if (_pollingPaused || !_pollState.initialized || !window.cardCounter) return;

    var userId = getUserId();
    var friendsLastSeen = parseInt(localStorage.getItem('tarot_friends_last_seen_ts') || '0', 10);
    var repliesLastSeen = parseInt(localStorage.getItem('tarot_replies_last_seen_ts') || '0', 10);
    var changed = false;

    // --- Friend draws delta ---
    if (_pollState.friendUserIds.length > 0 && window.cardCounter.fetchNewCommentsSince) {
        try {
            var newComments = await window.cardCounter.fetchNewCommentsSince(_pollState.friendsLastCheckedTs);
            var friendSet = {};
            _pollState.friendUserIds.forEach(function(id) { friendSet[id] = true; });
            var newFriendComments = newComments.filter(function(c) { return friendSet[c.userId]; });

            if (newFriendComments.length > 0) {
                // Merge into state (avoid duplicates)
                var existingIds = {};
                _pollState.friendDrawsData.forEach(function(d) { existingIds[d.id] = true; });
                newFriendComments.forEach(function(c) {
                    if (!existingIds[c.id]) _pollState.friendDrawsData.push(c);
                });
            }

            // Update checked timestamp from all new comments (not just friends)
            if (newComments.length > 0) {
                var maxTs = Math.max.apply(null, newComments.map(function(c) { return c.timestamp || 0; }));
                if (maxTs > _pollState.friendsLastCheckedTs) _pollState.friendsLastCheckedTs = maxTs;
            }

            // Recount unseen
            _pollState.friendDrawsData = _pollState.friendDrawsData.filter(function(c) {
                return (c.timestamp || 0) > friendsLastSeen;
            });
            var newFriendCount = _pollState.friendDrawsData.length;
            if (newFriendCount !== _pollState.unseenFriendDraws) {
                _pollState.unseenFriendDraws = newFriendCount;
                changed = true;
            }
        } catch (e) { /* ignore */ }
    }

    // --- Replies delta ---
    if (_pollState.myCommentIds.length > 0 && window.cardCounter.fetchNewRepliesForComments) {
        try {
            var newReplies = await window.cardCounter.fetchNewRepliesForComments(
                _pollState.myCommentIds,
                _pollState.repliesLastCheckedTs
            );
            var otherReplies = newReplies.filter(function(r) { return r.userId !== userId; });

            if (otherReplies.length > 0) {
                var existingReplyIds = {};
                _pollState.repliesData.forEach(function(d) { if (d.reply) existingReplyIds[d.reply.id || d.replyId] = true; });
                otherReplies.forEach(function(r) {
                    if (!existingReplyIds[r.replyId]) {
                        _pollState.repliesData.push({
                            reply: { id: r.replyId, userId: r.userId, name: r.name, profilePicture: r.profilePicture, timestamp: r.timestamp, text: r.text },
                            commentId: r.commentId
                        });
                    }
                });
            }

            if (newReplies.length > 0) {
                var maxReplyTs = Math.max.apply(null, newReplies.map(function(r) { return r.timestamp || 0; }));
                if (maxReplyTs > _pollState.repliesLastCheckedTs) _pollState.repliesLastCheckedTs = maxReplyTs;
            }

            _pollState.repliesData = _pollState.repliesData.filter(function(item) {
                return (item.reply.timestamp || 0) > repliesLastSeen;
            });
            var newReplyCount = _pollState.repliesData.length;
            if (newReplyCount !== _pollState.unseenReplies) {
                _pollState.unseenReplies = newReplyCount;
                changed = true;
            }
        } catch (e) { /* ignore */ }
    }

    _pollState.lastPollTime = Date.now();

    if (changed) {
        updateNotificationBadges();
        renderNotifCircleStack();
        // Update reply notif bar only if panel is open
        var panel = document.getElementById('commentsPanel');
        if (panel && panel.classList.contains('show')) {
            renderReplyNotifCirclesFromState();
        }
    }
}

function startPolling() {
    stopPolling();
    _pollingPaused = false;
    _pollingIntervalId = setInterval(pollForNotifications, 10000);
}

function stopPolling() {
    if (_pollingIntervalId) {
        clearInterval(_pollingIntervalId);
        _pollingIntervalId = null;
    }
}

// Clear all notification state and UI (called on logout)
function clearNotificationState() {
    stopPolling();
    _pollState = {
        friendUserIds: [],
        myCommentIds: [],
        friendsLastCheckedTs: 0,
        repliesLastCheckedTs: 0,
        unseenFriendDraws: 0,
        unseenReplies: 0,
        friendDrawsData: [],
        repliesData: [],
        initialized: false,
        lastPollTime: 0
    };

    // Clear notification circle stacks
    var stack = document.getElementById('notifCircleStack');
    if (stack) { stack.innerHTML = ''; stack.classList.remove('scrollable', 'collapsed'); delete stack.dataset.expanded; }
    var bar = document.getElementById('replyNotifBar');
    if (bar) { bar.innerHTML = ''; bar.classList.remove('scrollable', 'collapsed'); delete bar.dataset.expanded; }

    // Clear badges
    updateNotificationBadges();
}

function handleVisibilityChange() {
    if (document.hidden) {
        _pollingPaused = true;
    } else {
        _pollingPaused = false;
        if (_pollState.initialized && Date.now() - _pollState.lastPollTime > 10000) {
            pollForNotifications();
        }
    }
}

// ========================================
// Badge Rendering
// ========================================

function updateNotificationBadges() {
    var totalUnseen = _pollState.unseenFriendDraws + _pollState.unseenReplies;

    // 1. Comments button badge (combined count)
    var btnBadge = document.getElementById('commentsCount');
    if (btnBadge) {
        if (totalUnseen > 0) {
            btnBadge.textContent = totalUnseen > 99 ? '99+' : totalUnseen;
            btnBadge.classList.add('show');
        } else {
            btnBadge.classList.remove('show');
        }
    }

    // 2. Friends tab badge
    var friendsTab = document.querySelector('.comments-tab[data-tab="friends"]');
    if (friendsTab) updateTabBadge(friendsTab, _pollState.unseenFriendDraws);

    // 3. MyCard tab badge
    var mycardTab = document.querySelector('.comments-tab[data-tab="mycard"]');
    if (mycardTab) {
        updateTabBadge(mycardTab, _pollState.unseenReplies);
    }
}

function updateTabBadge(tabElement, count) {
    var badge = tabElement.querySelector('.tab-badge');
    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'tab-badge';
            tabElement.appendChild(badge);
        }
        var prev = badge.textContent;
        badge.textContent = count > 99 ? '99+' : count;
        badge.classList.add('show');
        // Pop animation on count change
        if (prev !== badge.textContent) {
            badge.style.animation = 'none';
            badge.offsetHeight; // force reflow
            badge.style.animation = '';
        }
    } else if (badge) {
        badge.classList.remove('show');
    }
}

// ========================================
// State-based Rendering
// ========================================

// Shared helper: build unified notification circles (friend draws + replies) into a container
function buildUnifiedNotifCircles(container) {
    var hasFriends = _pollState.friendDrawsData.length > 0;
    var hasReplies = _pollState.repliesData.length > 0;

    if (!hasFriends && !hasReplies) {
        if (container.children.length > 0) {
            container.innerHTML = '';
            container.classList.remove('scrollable');
        }
        return;
    }

    // Build unified list of { type, userId, timestamp, data }
    var unified = [];

    // Friend draws: group by userId, keep newest per friend
    if (hasFriends) {
        var friendByUser = {};
        _pollState.friendDrawsData.forEach(function(c) {
            var uid = c.userId;
            if (!friendByUser[uid] || (c.timestamp || 0) > (friendByUser[uid].timestamp || 0)) friendByUser[uid] = c;
        });
        Object.values(friendByUser).forEach(function(c) {
            unified.push({ type: 'friend', userId: c.userId, timestamp: c.timestamp || 0, data: c });
        });
    }

    // Replies: group by replier userId, keep newest per user
    if (hasReplies) {
        var replyByUser = {};
        var replyCountByUser = {};
        _pollState.repliesData.forEach(function(item) {
            var uid = item.reply.userId;
            replyCountByUser[uid] = (replyCountByUser[uid] || 0) + 1;
            if (!replyByUser[uid] || (item.reply.timestamp || 0) > (replyByUser[uid].reply.timestamp || 0)) {
                replyByUser[uid] = item;
            }
        });
        Object.keys(replyByUser).forEach(function(uid) {
            var item = replyByUser[uid];
            unified.push({ type: 'reply', userId: uid, timestamp: item.reply.timestamp || 0, data: item, count: replyCountByUser[uid] });
        });
    }

    // Sort by timestamp descending (newest first)
    unified.sort(function(a, b) { return b.timestamp - a.timestamp; });

    // Cap total circles
    var maxCircles = 12;
    unified = unified.slice(0, maxCircles);

    // Detect NEW vs already rendered
    var existingIds = {};
    container.querySelectorAll('.notif-circle-item').forEach(function(el) {
        if (el.dataset.notifKey) existingIds[el.dataset.notifKey] = true;
    });
    var hasNewItems = unified.some(function(u) { return !existingIds[u.type + '_' + u.userId]; });
    var itemsChanged = Object.keys(existingIds).length !== unified.length;
    if (!hasNewItems && !itemsChanged && Object.keys(existingIds).length > 0) return;

    // Reset expanded state when new items arrive
    if (hasNewItems) {
        delete container.dataset.expanded;
    }

    // Full re-render
    container.innerHTML = '';
    container.classList.add('scrollable');
    container.classList.remove('collapsed');

    unified.forEach(function(item, index) {
        var circle = document.createElement('div');
        var isNew = !existingIds[item.type + '_' + item.userId];
        circle.className = 'notif-circle-item' + (isNew ? ' friends-circle-entrance' : '');
        circle.dataset.notifKey = item.type + '_' + item.userId;
        circle.dataset.userId = item.userId;
        circle.dataset.notifType = item.type;
        circle.style.animationDelay = (index * 0.06) + 's';

        if (item.type === 'friend') {
            // Friend draw circle
            var comment = item.data;
            var picUrl = comment.profilePicture || '';
            if (picUrl) {
                var img = document.createElement('img');
                img.src = picUrl;
                img.alt = '';
                img.onerror = function() {
                    this.style.display = 'none';
                    circle.insertAdjacentHTML('afterbegin', getFriendCircleInitial(comment.userName));
                };
                circle.appendChild(img);
            } else {
                circle.innerHTML = getFriendCircleInitial(comment.userName);
            }
            var pulse = document.createElement('span');
            pulse.className = 'friends-circle-pulse';
            circle.appendChild(pulse);

            circle.addEventListener('click', function() { onFriendCircleClick(circle); });
        } else {
            // Reply circle
            var replyItem = item.data;
            var replyCount = item.count;
            var rpicUrl = replyItem.reply.profilePicture || '';
            var defaultSvg = '<div class="reply-circle-item-default"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
            var badgeHtml = replyCount > 1 ? '<span class="reply-circle-badge">' + replyCount + '</span>' : '';
            var pulseHtml = '<span class="reply-circle-pulse"></span>';

            if (rpicUrl) {
                var rimg = document.createElement('img');
                rimg.src = rpicUrl;
                rimg.alt = '';
                rimg.onerror = function() { this.style.display = 'none'; circle.insertAdjacentHTML('afterbegin', defaultSvg); };
                circle.appendChild(rimg);
                circle.insertAdjacentHTML('beforeend', badgeHtml + pulseHtml);
            } else {
                circle.innerHTML = defaultSvg + badgeHtml + pulseHtml;
            }

            // Mark as reply type visually
            circle.classList.add('notif-circle-reply');

            (function(ri) {
                circle.addEventListener('click', function() {
                    circle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    circle.style.opacity = '0';
                    circle.style.transform = 'scale(0.5) translateX(16px)';
                    setTimeout(function() { circle.remove(); }, 300);
                    onReplyNotifClick(ri.commentId, ri.reply.id, circle, ri.reply.timestamp);
                });
            })(replyItem);
        }

        container.appendChild(circle);
    });

    // Collapse button at the bottom (only when expanded with multiple items)
    if (unified.length > 1) {
        var collapseBtn = document.createElement('div');
        collapseBtn.className = 'notif-circle-collapse-btn';
        collapseBtn.style.animationDelay = (unified.length * 0.06 + 0.1) + 's';
        collapseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>';
        collapseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            delete container.dataset.expanded;
            container.classList.add('collapsed');
        });
        container.appendChild(collapseBtn);
    }

    setupCircleStackDrag(container);

    // Collapse if multiple items and not manually expanded
    if (unified.length > 1 && container.dataset.expanded !== 'true') {
        container.classList.add('collapsed');

        // Mark first circle as primary (stays visible when collapsed)
        var firstCircle = container.querySelector('.notif-circle-item');
        if (firstCircle) firstCircle.classList.add('notif-circle-primary');

        // Insert expand button after first circle
        var expandBtn = document.createElement('div');
        expandBtn.className = 'notif-circle-expand-btn';
        expandBtn.style.animationDelay = '0.12s';
        expandBtn.innerHTML = '<span class="notif-circle-expand-count">+' + (unified.length - 1) + '</span>' +
            '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
        container.insertBefore(expandBtn, firstCircle ? firstCircle.nextSibling : null);

        expandBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            container.dataset.expanded = 'true';
            container.classList.remove('collapsed');

            var isHorizontal = container.classList.contains('reply-notif-bar');
            var primaryEl = container.querySelector('.notif-circle-primary');
            var items = container.querySelectorAll('.notif-circle-item:not(.notif-circle-primary), .notif-circle-collapse-btn');

            // Disable CSS animations, keep items invisible
            items.forEach(function(item) {
                item.style.animation = 'none';
                item.style.transition = 'none';
                item.style.opacity = '0';
            });
            void container.offsetHeight;

            // For horizontal: scroll to keep primary circle in view (right end)
            if (isHorizontal) {
                container.scrollLeft = container.scrollWidth - container.clientWidth;
            }

            // Calculate offset from each item to the primary circle
            var primaryRect = primaryEl.getBoundingClientRect();
            items.forEach(function(item) {
                var rect = item.getBoundingClientRect();
                if (isHorizontal) {
                    var dx = primaryRect.left - rect.left;
                    item.style.transform = 'translateX(' + dx + 'px) scale(0.3)';
                } else {
                    var dy = primaryRect.top - rect.top;
                    item.style.transform = 'translateY(' + dy + 'px) scale(0.3)';
                }
            });
            void container.offsetHeight;

            // Cascade: slide each item from primary to its final position
            items.forEach(function(item, index) {
                var delay = (index + 1) * 70;
                setTimeout(function() {
                    item.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease';
                    item.style.transform = 'translateX(0) scale(1)';
                    item.style.opacity = '1';
                }, delay);
            });

            // After slide-out completes: clean up transforms, then scroll
            var animDone = (items.length + 1) * 70 + 550;
            setTimeout(function() {
                items.forEach(function(item) {
                    item.style.transition = '';
                    item.style.transform = '';
                    // Keep opacity:1 and animation:none so items stay visible
                });

                // Smooth scroll with easing
                function animateScroll(el, prop, from, to, duration) {
                    var startTime = null;
                    function ease(t) {
                        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }
                    function step(ts) {
                        if (!startTime) startTime = ts;
                        var p = Math.min((ts - startTime) / duration, 1);
                        el[prop] = from + (to - from) * ease(p);
                        if (p < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                }

                requestAnimationFrame(function() {
                    if (isHorizontal) {
                        var maxScroll = container.scrollWidth - container.clientWidth;
                        if (maxScroll > 0) {
                            container.scrollLeft = maxScroll;
                            requestAnimationFrame(function() {
                                animateScroll(container, 'scrollLeft', maxScroll, 0, 1200);
                            });
                        }
                    } else {
                        var peekDist = Math.min(container.scrollHeight - container.clientHeight, 120);
                        if (peekDist > 0) {
                            animateScroll(container, 'scrollTop', 0, peekDist, 600);
                            setTimeout(function() {
                                animateScroll(container, 'scrollTop', peekDist, 0, 600);
                            }, 800);
                        }
                    }
                });
            }, animDone);
        });
    }

    // For horizontal bar (reply-notif-bar): reverse DOM children order
    // so flex-direction: row gives the correct visual (collapse btn at left, newest at right)
    if (container.classList.contains('reply-notif-bar') && container.children.length > 1) {
        var children = Array.from(container.children);
        children.reverse().forEach(function(child) { container.appendChild(child); });
    }
}

// Unified notification circle stack on landing page
function renderNotifCircleStack() {
    var stack = document.getElementById('notifCircleStack');
    if (stack) buildUnifiedNotifCircles(stack);
}

// Unified notification circle stack inside comments panel
function renderReplyNotifCirclesFromState() {
    var bar = document.getElementById('replyNotifBar');
    if (bar) buildUnifiedNotifCircles(bar);
}

// Load comments for cardview tab (viewing a specific card's comments from ส่อง button)
async function loadCardViewComments() {
    if (isLoadingComments) return;
    isLoadingComments = true;
    var gen = tabSwitchGeneration;

    const commentsList = document.getElementById('commentsList');
    const loadingEl = getOrCreateLoadingEl();

    commentsList.innerHTML = '';
    commentsList.appendChild(loadingEl);
    loadingEl.style.display = 'block';

    if (!cardViewData) {
        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">🃏</div>
                <div class="comments-empty-text">${t('error.cardNotFound')}</div>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    if (!window.cardCounter || !window.cardCounter.fetchCommentsByCardId) {
        loadingEl.innerHTML = '<span>' + t('common.loadError') + '</span>';
        isLoadingComments = false;
        return;
    }

    const comments = await window.cardCounter.fetchCommentsByCardId(cardViewData.id, null, 50);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    await resolveDisplayNames(comments);
    if (gen !== tabSwitchGeneration) return; // Tab changed, abort

    loadingEl.style.display = 'none';

    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="comments-empty">
                <div class="comments-empty-icon">💬</div>
                <div class="comments-empty-text">${t('comments.noComments')}<br>${t('comments.beFirst')}</div>
            </div>
        `;
        isLoadingComments = false;
        return;
    }

    // Display comments for this card (same style as other tabs)
    comments.forEach(comment => {
        const card = createCommentCard(comment);
        commentsList.appendChild(card);
        displayedCommentIds.add(comment.id);
    });

    isLoadingComments = false;
}

function createCommentCard(comment, showReplyBadge = false) {
    const card = document.createElement('div');
    card.className = 'comment-card';

    // Add top-comment class if it has reply count
    if (showReplyBadge && comment.replyCount > 0) {
        card.classList.add('top-comment');
    }

    const date = comment.timestamp ? new Date(comment.timestamp) : new Date();
    const dateStr = formatCommentDate(date);

    // Get card image - use cardImage if available, otherwise construct from cardName
    let cardImagePath = '';
    if (comment.cardImage && comment.cardImage.length > 0) {
        cardImagePath = comment.cardImage;
    } else if (comment.cardName && comment.cardName.length > 0) {
        // Backward compatibility: construct image path from card name
        // Image files are named like "THE LOVERS.png", "THE STAR.png", etc.
        cardImagePath = comment.cardName + '.png';
    }

    const hasImage = cardImagePath.length > 0;
    const imageHtml = hasImage
        ? `<div class="comment-card-image"><img src="images/tarot/${escapeHtml(cardImagePath)}" alt="${escapeHtml(comment.cardName || 'Tarot')}" onerror="this.parentElement.style.display='none'"></div>`
        : '';

    // Reply count badge for top comments
    const replyBadgeHtml = (showReplyBadge && comment.replyCount > 0)
        ? `<div class="comment-reply-badge">💬 ${comment.replyCount} ${t('common.replyCount')}</div>`
        : '';

    const avatarHtml = getProfilePictureHtml(comment);

    card.innerHTML = `
        ${imageHtml}
        <div class="comment-card-content">
            <div class="comment-card-header">
                ${avatarHtml}
                <div class="comment-card-author">
                    <span class="comment-card-name">${escapeHtml(comment.userName || 'Me')}</span>
                    <span class="comment-card-date">${dateStr}</span>
                </div>
                ${replyBadgeHtml}
            </div>
            <div class="comment-card-text">${escapeHtml(comment.comment || '')}</div>

            <!-- Expanded content: Interpretation first -->
            <div class="comment-card-full">
                <div class="comment-card-full-title">
                    <span class="comment-card-tarot">${escapeHtml(comment.cardName || 'Tarot')}</span>
                    <span class="comment-card-full-label">${t('common.prophecy')}</span>
                </div>
                <div class="comment-card-full-interpretation"></div>
            </div>

            <!-- Replies section -->
            <div class="comment-card-replies-section">
                <div class="comment-card-replies-title">${t('common.replies')}</div>
                <div class="replies-list"></div>
                <button class="replies-empty-btn" style="display: none;">${t('common.beFirstReply')}</button>

                <!-- Reply button and form at bottom -->
                <div class="comment-card-actions">
                    <button class="reply-btn" data-comment-id="${comment.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        <span>${t('comment.reply')}</span>
                        <span class="reply-count" style="display: none;">0</span>
                    </button>
                </div>
                <div class="reply-form">
                    <div class="reply-input-wrapper">
                        <input type="text" class="reply-input" placeholder="${t('comment.replyPlaceholder')}" maxlength="150">
                        <button class="reply-submit-btn" disabled>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Related comments at the end -->
            <div class="comment-card-related">
                <div class="comment-card-related-title">${t('common.otherComments')}</div>
                <div class="related-comments-list">
                    <div class="related-comment-loading">${buildMiniLoaderHtml()}</div>
                </div>
            </div>
        </div>
    `;

    // Add class for styling when image is present
    if (hasImage) {
        card.classList.add('with-image');
    }

    // Store comment data for expand functionality
    card.dataset.commentId = comment.id;
    card.dataset.cardId = comment.cardId;
    card.dataset.cardName = comment.cardName || '';

    // Setup reply functionality
    setupReplyFeature(card, comment);

    // Load reply count
    loadReplyCount(card, comment.id);

    // Add click handler for expand (no collapse on same card)
    card.addEventListener('click', (e) => {
        // Don't expand if clicking on interactive elements
        if (e.target.closest('.reply-btn') ||
            e.target.closest('.reply-form') ||
            e.target.closest('.replies-list') ||
            e.target.closest('.comment-card-replies-section') ||
            e.target.closest('.comment-card-related')) {
            return;
        }
        // Don't do anything if already expanded
        if (card.classList.contains('expanded')) {
            return;
        }
        e.stopPropagation();
        toggleCommentCardExpand(card, comment);
    });

    return card;
}

// Setup reply feature for a comment card
function setupReplyFeature(card, comment) {
    const replyBtn = card.querySelector('.reply-btn');
    const replyForm = card.querySelector('.reply-form');
    const replyInput = card.querySelector('.reply-input');
    const replySubmitBtn = card.querySelector('.reply-submit-btn');
    const repliesEmptyBtn = card.querySelector('.replies-empty-btn');

    // Toggle reply form
    replyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        replyForm.classList.toggle('show');
        if (replyForm.classList.contains('show')) {
            replyInput.focus();
        }
    });

    // "Reply first" button - same as reply button
    if (repliesEmptyBtn) {
        repliesEmptyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            replyForm.classList.add('show');
            replyInput.focus();
        });
    }

    // Enable/disable submit button based on input
    replyInput.addEventListener('input', () => {
        replySubmitBtn.disabled = replyInput.value.trim().length === 0;
    });

    // Submit reply
    replySubmitBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        // Require Facebook login to reply
        if (typeof isFacebookConnected !== 'function' || !isFacebookConnected()) {
            loginWithFacebook();
            return;
        }
        const text = replyInput.value.trim();
        if (!text) return;

        replySubmitBtn.disabled = true;
        replyInput.disabled = true;

        gtag('event', 'submit_reply', { event_category: 'engagement' });

        const userId = getUserId();
        const userName = getSavedUserName() || 'Me';

        if (window.cardCounter && window.cardCounter.submitReply) {
            const result = await window.cardCounter.submitReply(comment.id, userId, userName, text, getCurrentProfilePicture());

            if (result.success) {
                replyInput.value = '';
                replyForm.classList.remove('show');
                await loadReplies(card, comment.id, comment);
                showToast(t('toast.replySuccess'));
            } else {
                showToast(t('toast.error'));
            }
        }

        replySubmitBtn.disabled = false;
        replyInput.disabled = false;
    });

    // Enter key to submit
    replyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !replySubmitBtn.disabled) {
            replySubmitBtn.click();
        }
    });
}

// Load reply count for a comment
function getSeenReplyCounts() {
    try {
        return JSON.parse(localStorage.getItem('tarot_seen_reply_counts') || '{}');
    } catch (e) {
        return {};
    }
}

function setSeenReplyCount(commentId, count) {
    var seen = getSeenReplyCounts();
    seen[commentId] = count;
    localStorage.setItem('tarot_seen_reply_counts', JSON.stringify(seen));
}

function markRepliesAsRead(card, commentId) {
    var replyCountEl = card.querySelector('.feed-card-reply-count');
    if (replyCountEl) {
        var countText = replyCountEl.querySelector('.reply-count-num').textContent;
        var count = parseInt(countText, 10) || 0;
        if (count > 0) {
            setSeenReplyCount(commentId, count);
        }
        replyCountEl.classList.remove('unread-replies');
    }

    // Update poll state — remove replies for this comment from unseen
    if (_pollState.repliesData.length > 0) {
        var removedReplies = _pollState.repliesData.filter(function(item) {
            return item.commentId === commentId;
        });
        if (removedReplies.length > 0) {
            // Update last-seen timestamp from the removed replies
            var maxTs = Math.max.apply(null, removedReplies.map(function(item) {
                return item.reply ? (item.reply.timestamp || 0) : 0;
            }));
            if (maxTs > 0) {
                var currentTs = parseInt(localStorage.getItem('tarot_replies_last_seen_ts') || '0', 10);
                if (maxTs > currentTs) {
                    localStorage.setItem('tarot_replies_last_seen_ts', String(maxTs));
                }
            }

            _pollState.repliesData = _pollState.repliesData.filter(function(item) {
                return item.commentId !== commentId;
            });
            _pollState.unseenReplies = _pollState.repliesData.length;
            updateNotificationBadges();
            renderReplyNotifCirclesFromState();
            renderNotifCircleStack();
        }
    }
}

async function loadReplyCount(card, commentId) {
    if (!window.cardCounter || !window.cardCounter.getReplyCount) return;

    const count = await window.cardCounter.getReplyCount(commentId);
    const replyCountEl = card.querySelector('.feed-card-reply-count');

    if (replyCountEl) {
        if (count > 0) {
            replyCountEl.querySelector('.reply-count-num').textContent = count;
            replyCountEl.style.display = 'inline-flex';

            var seen = getSeenReplyCounts();
            var lastSeen = seen[commentId] || 0;
            if (count > lastSeen) {
                replyCountEl.classList.add('unread-replies');
            } else {
                replyCountEl.classList.remove('unread-replies');
            }
        } else {
            replyCountEl.style.display = 'none';
            replyCountEl.classList.remove('unread-replies');
        }
    }
}

// Load replies for a comment
async function loadReplies(card, commentId, commentData) {
    if (!window.cardCounter || !window.cardCounter.fetchReplies) return;

    const commentOwnerId = commentData.userId;
    const repliesList = card.querySelector('.replies-list');
    const repliesEmptyBtn = card.querySelector('.replies-empty-btn');

    repliesList.style.display = '';
    repliesList.innerHTML = '<div class="related-comment-loading">' + buildMiniLoaderHtml() + '</div>';
    if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'none';

    const replies = await window.cardCounter.fetchReplies(commentId);
    await resolveDisplayNames(replies);

    const currentUserId = getUserId();

    // Build the original comment as the first left-aligned bubble (skip if empty)
    var commentText = commentData.comment || commentData.text || '';
    var firstBubble = '';
    if (commentText.trim()) {
        var commentDate = commentData.timestamp ? new Date(commentData.timestamp) : new Date();
        var commentDateStr = formatCommentDate(commentDate);
        var commentAvatar = getProfilePictureHtml(commentData);
        var isSelfComment = commentOwnerId === currentUserId;
        firstBubble = '<div class="reply-item reply-bubble-left reply-original' + (isSelfComment ? ' reply-self' : '') + '">' +
            '<div class="reply-avatar-col">' + commentAvatar + '</div>' +
            '<div class="reply-bubble">' +
                '<div class="reply-bubble-header">' +
                    '<span class="reply-name">' + escapeHtml(commentData.userName || 'Me') + '</span>' +
                    '<span class="reply-date">' + commentDateStr + '</span>' +
                '</div>' +
                '<div class="reply-text">' + escapeHtml(commentText) + '</div>' +
            '</div>' +
        '</div>';
    }

    if (replies.length > 0) {
        var replyBubbles = replies.map(function(reply) {
            const replyDate = reply.timestamp ? new Date(reply.timestamp) : new Date();
            const replyDateStr = formatCommentDate(replyDate);
            const replyAvatar = getProfilePictureHtml(reply);
            const isOwner = reply.userId === commentOwnerId;
            const isSelf = reply.userId === currentUserId;
            const bubbleClass = isOwner ? 'reply-bubble-left' : 'reply-bubble-right';
            const selfClass = isSelf ? ' reply-self' : '';

            if (isOwner) {
                return '<div class="reply-item ' + bubbleClass + selfClass + '" data-reply-id="' + escapeHtml(reply.id || '') + '">' +
                    '<div class="reply-avatar-col">' + replyAvatar + '</div>' +
                    '<div class="reply-bubble">' +
                        '<div class="reply-bubble-header">' +
                            '<span class="reply-name">' + escapeHtml(reply.userName || 'Me') + '</span>' +
                            '<span class="reply-date">' + replyDateStr + '</span>' +
                        '</div>' +
                        '<div class="reply-text">' + escapeHtml(reply.text || '') + '</div>' +
                    '</div>' +
                '</div>';
            } else {
                return '<div class="reply-item ' + bubbleClass + selfClass + '" data-reply-id="' + escapeHtml(reply.id || '') + '">' +
                    '<div class="reply-bubble">' +
                        '<div class="reply-bubble-header">' +
                            '<span class="reply-name">' + escapeHtml(reply.userName || 'Me') + '</span>' +
                            '<span class="reply-date">' + replyDateStr + '</span>' +
                        '</div>' +
                        '<div class="reply-text">' + escapeHtml(reply.text || '') + '</div>' +
                    '</div>' +
                    '<div class="reply-avatar-col">' + replyAvatar + '</div>' +
                '</div>';
            }
        }).join('');
        repliesList.innerHTML = firstBubble + replyBubbles;
        repliesList.style.display = '';

        // Update count on reply button
        const replyCountEl = card.querySelector('.reply-count');
        if (replyCountEl) {
            replyCountEl.textContent = replies.length;
            replyCountEl.style.display = 'inline';
        }

        if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'none';
    } else {
        repliesList.innerHTML = firstBubble;
        repliesList.style.display = '';
        if (repliesEmptyBtn) repliesEmptyBtn.style.display = 'none';
    }
}

async function toggleCommentCardExpand(card, comment) {
    // If clicking the same card that's expanded, collapse it
    if (expandedCommentCard === card) {
        collapseCommentCard(card);
        expandedCommentCard = null;
        return;
    }

    // Collapse previously expanded card
    if (expandedCommentCard) {
        collapseCommentCard(expandedCommentCard);
    }

    // Expand the clicked card
    await expandCommentCard(card, comment);
    expandedCommentCard = card;
    markRepliesAsRead(card, comment.id);

    // Scroll the card into view smoothly
    setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

async function expandCommentCard(card, comment) {
    card.classList.add('expanded');

    // Show reply form (belt-and-suspenders with CSS override)
    const replyForm = card.querySelector('.reply-form');
    if (replyForm) replyForm.classList.add('show');

    // Load full interpretation from tarotData
    const interpretationEl = card.querySelector('.comment-card-full-interpretation');
    if (interpretationEl) {
        if (tarotData && tarotData.cards) {
            const tarotCard = tarotData.cards.find(c => c.id === comment.cardId || c.name === comment.cardName);
            if (tarotCard) {
                interpretationEl.textContent = tarotCard.interpretation;
            } else {
                interpretationEl.textContent = t('error.noInterpretation');
            }
        } else {
            interpretationEl.textContent = t('common.loading');
        }
    }

    // Auto-load replies
    await loadReplies(card, comment.id, comment);

    // Load related comments
    const relatedListEl = card.querySelector('.related-comments-list');
    if (!relatedListEl) {
        console.warn('relatedListEl not found in card');
        return;
    }
    relatedListEl.innerHTML = '<div class="related-comment-loading">' + buildMiniLoaderHtml() + '</div>';

    if (window.cardCounter && window.cardCounter.fetchCommentsByCardId) {
        const relatedComments = await window.cardCounter.fetchCommentsByCardId(
            comment.cardId,
            comment.id,
            3
        );
        await resolveDisplayNames(relatedComments);

        if (relatedComments.length > 0) {
            // Fetch reply counts for all related comments
            const relatedWithReplyCounts = await Promise.all(
                relatedComments.map(async (rc) => {
                    let replyCount = 0;
                    if (window.cardCounter && window.cardCounter.getReplyCount) {
                        replyCount = await window.cardCounter.getReplyCount(rc.id);
                    }
                    return { ...rc, replyCount };
                })
            );

            relatedListEl.innerHTML = relatedWithReplyCounts.map(rc => {
                const rcDate = rc.timestamp ? new Date(rc.timestamp) : new Date();
                const rcDateStr = formatCommentDate(rcDate);
                const replyBadge = rc.replyCount > 0
                    ? `<span class="related-comment-replies">💬 ${rc.replyCount}</span>`
                    : '';
                // Store full comment data as JSON for direct use
                const commentDataJson = JSON.stringify({
                    id: rc.id,
                    cardId: rc.cardId,
                    cardName: rc.cardName,
                    cardImage: rc.cardImage || '',
                    userName: rc.userName || 'Me',
                    comment: rc.comment || '',
                    timestamp: rc.timestamp
                });
                const rcAvatar = getProfilePictureHtml(rc);
                return `
                    <div class="related-comment" data-comment-id="${rc.id}" data-comment='${commentDataJson.replace(/'/g, "&#39;")}' style="cursor: pointer;">
                        <div class="related-comment-header">
                            ${rcAvatar}
                            <span class="related-comment-name">${escapeHtml(rc.userName || 'Me')}</span>
                            ${replyBadge}
                            <span class="related-comment-date">${rcDateStr}</span>
                        </div>
                        <div class="related-comment-text">${escapeHtml(rc.comment || '')}</div>
                    </div>
                `;
            }).join('');

            // Add click handlers to navigate to related comments
            relatedListEl.querySelectorAll('.related-comment').forEach((el, index) => {
                const commentData = relatedWithReplyCounts[index];
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigateToRelatedComment(commentData);
                });
            });
        } else {
            relatedListEl.innerHTML = '<div class="related-comment-empty">' + t('cardview.noOtherComments') + '</div>';
        }
    } else {
        relatedListEl.innerHTML = '<div class="related-comment-empty">' + t('common.loadError') + '</div>';
    }
}

function collapseCommentCard(card) {
    card.classList.remove('expanded');

    // Hide reply form
    const replyForm = card.querySelector('.reply-form');
    if (replyForm) replyForm.classList.remove('show');

    // If this is a navigated card, fade it out and remove it
    if (card.classList.contains('navigated-card')) {
        card.classList.add('fading-out');
        setTimeout(() => {
            if (card.parentNode) card.remove();
        }, 300);
        if (navigatedCommentCard === card) {
            navigatedCommentCard = null;
        }
    }
}

async function navigateToRelatedComment(commentData) {
    try {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        // Collapse any currently expanded card first
        if (expandedCommentCard) {
            collapseCommentCard(expandedCommentCard);
            expandedCommentCard = null;
        }

        // Remove previous navigated card with fade animation (keep original cards intact)
        if (navigatedCommentCard && navigatedCommentCard.parentNode) {
            navigatedCommentCard.classList.add('fading-out');
            const oldCard = navigatedCommentCard;
            navigatedCommentCard = null;
            await new Promise(resolve => setTimeout(resolve, 300));
            if (oldCard.parentNode) oldCard.remove();
        }

        // Create a duplicated card (don't remove original) and insert at the TOP of the list
        const newCard = createCommentCard(commentData, false);
        newCard.classList.add('navigated-card'); // Mark as navigated

        // Always insert at the very top of the comments list
        const firstChild = commentsList.firstChild;
        if (firstChild) {
            commentsList.insertBefore(newCard, firstChild);
        } else {
            commentsList.appendChild(newCard);
        }

        // Track displayed ID and navigated card
        displayedCommentIds.add(commentData.id);
        navigatedCommentCard = newCard;

        // Scroll to the card
        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Wait for scroll, then expand
        await new Promise(resolve => setTimeout(resolve, 300));
        await expandCommentCard(newCard, commentData);
        expandedCommentCard = newCard;

    } catch (error) {
        console.error('Error navigating to related comment:', error);
        showToast(t('toast.error'));
    }
}

function formatCommentDate(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('time.justNow');
    if (minutes < 60) return `${minutes} ${t('time.minutesAgo')}`;
    if (hours < 24) return `${hours} ${t('time.hoursAgo')}`;
    if (days < 7) return `${days} ${t('time.daysAgo')}`;

    // Use locale-appropriate date format
    const locale = currentLang === 'th' ? 'th-TH' :
                   currentLang === 'ja' ? 'ja-JP' :
                   currentLang === 'ko' ? 'ko-KR' :
                   currentLang === 'zh-CN' ? 'zh-CN' :
                   currentLang === 'zh-TW' ? 'zh-TW' : 'en-US';
    return date.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// ========================================
// DEBUG: Test functions (remove before deploy)
// ========================================

function testNotifBubbles() {
    var now = Date.now();
    var names = ['Alice','Bob','Carol','Dave','Eve','Frank','Grace','Hank','Iris','Jack',
        'Kate','Leo','Mia','Noah','Olivia','Pete','Quinn','Ruby','Sam','Tina',
        'Uma','Vic','Wendy','Xander','Yuki','Zara','Aria','Blake','Chloe','Dylan'];
    var total = 10 + Math.floor(Math.random() * 21); // 10-30
    var friendCount = Math.floor(total * 0.6);
    var replyCount = total - friendCount;

    // Reset expanded state so collapse kicks in
    var stack = document.getElementById('notifCircleStack');
    if (stack) delete stack.dataset.expanded;
    var bar = document.getElementById('replyNotifBar');
    if (bar) delete bar.dataset.expanded;

    // Shuffle names
    var shuffled = names.slice().sort(function() { return Math.random() - 0.5; });

    // Generate friend draws
    _pollState.friendDrawsData = [];
    for (var i = 0; i < friendCount && i < shuffled.length; i++) {
        var n = shuffled[i];
        _pollState.friendDrawsData.push({
            userId: n.toLowerCase(),
            userName: n,
            profilePicture: 'https://i.pravatar.cc/80?u=' + n.toLowerCase() + now,
            timestamp: now - (i * 1000)
        });
    }
    _pollState.unseenFriendDraws = _pollState.friendDrawsData.length;

    // Generate replies
    _pollState.repliesData = [];
    for (var j = 0; j < replyCount && (friendCount + j) < shuffled.length; j++) {
        var rn = shuffled[friendCount + j];
        _pollState.repliesData.push({
            commentId: 'c' + j,
            reply: {
                id: 'r' + j,
                userId: rn.toLowerCase(),
                userName: rn,
                profilePicture: 'https://i.pravatar.cc/80?u=' + rn.toLowerCase() + now,
                timestamp: now - (j * 800) - 500
            }
        });
    }
    _pollState.unseenReplies = _pollState.repliesData.length;
    _pollState.initialized = true;

    updateNotificationBadges();
    renderNotifCircleStack();
    renderReplyNotifCirclesFromState();
}

// Show test button only on localhost
(function() {
    var h = window.location.hostname;
    if (h !== 'localhost' && h !== '127.0.0.1') return;
    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.createElement('button');
        btn.textContent = 'Test Bubbles';
        btn.style.cssText = 'position:fixed;bottom:60px;right:20px;z-index:99999;padding:6px 12px;font-size:11px;border-radius:8px;border:1px solid rgba(154,170,212,0.3);background:rgba(13,19,51,0.9);color:rgba(154,170,212,0.8);cursor:pointer;';
        btn.addEventListener('click', testNotifBubbles);
        var landing = document.getElementById('landingPage');
        if (landing) landing.appendChild(btn);
    });
})();

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize comments panel on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initCommentsPanel();
    updateCommentsBtnVisibility();

    // Initialize notification polling after FB SDK + Firebase are ready
    setTimeout(function() {
        if (typeof isFacebookConnected === 'function' && isFacebookConnected()) {
            initNotificationPolling();
        }
    }, 3000);

});

// Save Image Functions
let currentCardData = null;

function shareOrDownload(canvas, filename) {
    showSavePreview(canvas, filename);
}

function showSavePreview(canvas, filename) {
    var popup = document.getElementById('savePreviewPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'savePreviewPopup';
        popup.className = 'save-preview-popup';
        document.body.appendChild(popup);
    }

    var dataUrl = canvas.toDataURL('image/png');
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var canShare = isMobile && navigator.canShare;

    popup.innerHTML =
        '<div class="save-preview-overlay"></div>' +
        '<div class="save-preview-content">' +
            '<button class="save-preview-close">&times;</button>' +
            '<div class="save-preview-img-wrap">' +
                '<img class="save-preview-img" src="' + dataUrl + '" alt="Preview">' +
            '</div>' +
            '<div class="save-preview-buttons">' +
                (canShare ? '<button class="save-preview-btn save-preview-share">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> ' +
                    t('image.share') +
                '</button>' : '') +
                '<button class="save-preview-btn save-preview-download">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> ' +
                    t('image.download') +
                '</button>' +
            '</div>' +
        '</div>';

    popup.classList.add('show');
    document.body.style.overflow = 'hidden';

    var closeBtn = popup.querySelector('.save-preview-close');
    var overlay = popup.querySelector('.save-preview-overlay');

    function closePopup() {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    // Download — fresh user gesture
    var dlBtn = popup.querySelector('.save-preview-download');
    dlBtn.addEventListener('click', function() {
        gtag('event', 'download_image', { event_category: 'engagement' });
        var link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
        showToast(t('image.saved'));
        closePopup();
    });

    // Share — fresh user gesture on mobile
    if (canShare) {
        var shareBtn = popup.querySelector('.save-preview-share');
        shareBtn.addEventListener('click', function() {
            gtag('event', 'share_image', { event_category: 'engagement' });
            fetch(dataUrl).then(function(res) { return res.blob(); }).then(function(blob) {
                var file = new File([blob], filename, { type: 'image/png' });
                if (navigator.canShare({ files: [file] })) {
                    navigator.share({ files: [file] }).then(function() {
                        showToast(t('image.saved'));
                        closePopup();
                    }).catch(function() { /* user cancelled */ });
                }
            });
        });
    }
}

function saveImage(platform) {
    // Multi-card mode
    if (multiCardSelections && multiCardSelections.length > 1) {
        saveMultiImage(platform);
        return;
    }

    if (!currentCardData) {
        showToast(t('image.selectFirst'));
        return;
    }

    gtag('event', 'save_image', {
        event_category: 'engagement',
        image_format: platform,
        card_name: currentCardData.name
    });

    const sizes = {
        'ig-story': { width: 1080, height: 1920 },
        'square': { width: 1080, height: 1080 },
        'facebook': { width: 1200, height: 630 },
        'wide': { width: 1200, height: 630 }
    };

    const size = sizes[platform];
    if (!size) return;

    showToast(t('image.creating'));

    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');

    // Load card image
    const cardImg = new Image();
    cardImg.crossOrigin = 'anonymous';
    var fname = `card-of-the-day-${currentCardData.name.toLowerCase().replace(/\s+/g, '-')}-${platform}.png`;
    cardImg.onload = () => {
        drawShareImage(ctx, cardImg, size, platform);
        shareOrDownload(canvas, fname);
    };
    cardImg.onerror = () => {
        drawShareImage(ctx, null, size, platform);
        shareOrDownload(canvas, fname);
    };
    cardImg.src = `images/tarot/${currentCardData.image}`;
}

// Multi-card save image
function saveMultiImage(platform) {
    gtag('event', 'save_image', {
        event_category: 'engagement',
        image_format: platform,
        card_name: 'multi_' + multiCardSelections.length
    });

    const sizes = {
        'ig-story': { width: 1080, height: 1920 },
        'square': { width: 1080, height: 1080 },
        'facebook': { width: 1200, height: 630 },
        'wide': { width: 1200, height: 630 }
    };

    const size = sizes[platform];
    if (!size) return;

    showToast(t('image.creating'));

    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d');

    // Load all card images in parallel
    var cardImages = [];
    var loaded = 0;
    var total = multiCardSelections.length;

    for (var i = 0; i < total; i++) {
        (function(idx) {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                cardImages[idx] = img;
                loaded++;
                if (loaded >= total) finishMultiDraw();
            };
            img.onerror = function() {
                cardImages[idx] = null;
                loaded++;
                if (loaded >= total) finishMultiDraw();
            };
            img.src = 'images/tarot/' + multiCardSelections[idx].card.image;
        })(i);
    }

    function finishMultiDraw() {
        drawMultiShareImage(ctx, cardImages, size, platform);
        var fname = 'card-of-the-day-' + (currentReadingCategory || 'reading') + '-' + platform + '.png';
        shareOrDownload(canvas, fname);
    }
}

// ========================================
// Multi-Card Save Image Drawing
// ========================================

function getMultiCategoryColors() {
    var cat = currentReadingCategory;
    var theme = cat ? _categoryThemes[cat] : null;
    if (theme) {
        return {
            accent: theme.primary,
            accentLight: theme.light,
            accentGlow: theme.glow,
            accentRgb: theme.primaryRgb,
            lightRgb: theme.lightRgb
        };
    }
    // Default (no category / single): blue-silver
    return {
        accent: '#9AAAD4',
        accentLight: '#C0C8E0',
        accentGlow: '#7B8EC2',
        accentRgb: '154,170,212',
        lightRgb: '192,200,224'
    };
}

function getCategoryLabel() {
    if (!currentReadingCategory) return '';
    var t = translations[currentLang] && translations[currentLang].category;
    if (t && t[currentReadingCategory]) return t[currentReadingCategory];
    return currentReadingCategory;
}

function getReadingModeTitle() {
    var keyMap = {
        'single': 'heading',
        'three-card': 'heading3',
        'four-card': 'heading4',
        'ten-card': 'heading10',
        'twelve-card': 'heading12'
    };
    var key = keyMap[currentReadingMode] || 'heading';
    var t = translations[currentLang] && translations[currentLang].landing;
    return (t && t[key]) || 'Card of the Day';
}

function getMultiCardQuote(card) {
    var quote = '';
    if (currentReadingCategory) {
        quote = getCardCategoryField(card, currentReadingCategory + 'Quote');
    }
    if (!quote) {
        quote = getCardQuote(card);
    }
    return quote;
}

function getMultiCardInterpretation(card) {
    var interp = '';
    if (currentReadingCategory) {
        interp = getCardCategoryField(card, currentReadingCategory);
    }
    if (!interp) {
        interp = getCardInterpretation(card);
    }
    return interp;
}

function getPositionLabel(index) {
    var posKey = multiCardPositions[index];
    if (!posKey) return '';
    var t = translations[currentLang] && translations[currentLang].landing;
    return (t && t[posKey]) || posKey;
}

function drawMultiShareImage(ctx, cardImages, size, platform) {
    var width = size.width;
    var height = size.height;
    var isVertical = height > width;
    var isWide = width > height;
    var colors = getMultiCategoryColors();

    // Background gradient with category tint
    var gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#080C24');
    gradient.addColorStop(0.5, '#0B1030');
    gradient.addColorStop(1, '#0d1333');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle category-colored radial glow at center-top
    var glow = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, Math.max(width, height) * 0.6);
    glow.addColorStop(0, 'rgba(' + colors.accentRgb + ', 0.08)');
    glow.addColorStop(1, 'rgba(' + colors.accentRgb + ', 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Decorative border with category color
    ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.25)';
    ctx.lineWidth = isWide ? 6 : 8;
    var borderPadding = isWide ? 20 : 30;
    ctx.strokeRect(borderPadding, borderPadding, width - borderPadding * 2, height - borderPadding * 2);

    // Inner decorative line
    ctx.strokeStyle = 'rgba(' + colors.lightRgb + ', 0.15)';
    ctx.lineWidth = 2;
    var innerPadding = borderPadding + 15;
    ctx.strokeRect(innerPadding, innerPadding, width - innerPadding * 2, height - innerPadding * 2);

    if (isVertical) {
        drawMultiVerticalLayout(ctx, cardImages, width, height, colors);
    } else if (isWide) {
        drawMultiWideLayout(ctx, cardImages, width, height, colors);
    } else {
        drawMultiSquareLayout(ctx, cardImages, width, height, colors);
    }
}

function drawMultiVerticalLayout(ctx, cardImages, width, height, colors) {
    var cardCount = multiCardSelections.length;
    var catLabel = getCategoryLabel();

    // --- Title + Category at very top, centered across full width ---
    var padT = 65;
    var curY = padT;

    ctx.fillStyle = 'rgba(' + colors.lightRgb + ', 0.6)';
    ctx.font = '28px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'center';
    ctx.fillText(getReadingModeTitle(), width / 2, curY);

    if (catLabel) {
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 32px "Prompt", sans-serif';
        ctx.fillText(catLabel, width / 2, curY + 45);
        curY += 60;
    } else {
        curY += 18;
    }

    // Decorative line under title
    curY += 10;
    ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, curY);
    ctx.lineTo(width / 2 + 140, curY);
    ctx.stroke();
    curY += 25;

    // --- Two-column area: cards left, text right ---
    var footerH = 95; // Space for footer row
    var padL = 60;
    var padR = 55;
    var columnGap = 30;
    var leftW = width * 0.40;
    var rightX = padL + leftW + columnGap;
    var rightW = width - rightX - padR;
    var contentTop = curY;
    var availH = height - contentTop - footerH - 10;

    // Calculate card size to fit stacked vertically in left column
    var cardGap = 22;
    var maxCardW = leftW;
    var cardW = 0;
    var cardH = 0;
    if (cardImages[0]) {
        var ratio = cardImages[0].width / cardImages[0].height;
        cardH = (availH - cardGap * (cardCount - 1)) / cardCount;
        cardW = cardH * ratio;
        if (cardW > maxCardW) {
            cardW = maxCardW;
            cardH = cardW / ratio;
        }
    }

    // Vertically center card stack in available area
    var totalStackH = cardH * cardCount + cardGap * (cardCount - 1);
    var stackStartY = contentTop + (availH - totalStackH) / 2;
    var cardX = padL + (leftW - cardW) / 2;

    // Draw cards + per-card text aligned to each card
    var textCenterX = rightX + rightW / 2;
    var infoSlotH = cardH + cardGap; // each text slot matches one card row

    for (var i = 0; i < cardCount; i++) {
        var img = cardImages[i];
        var cy = stackStartY + i * (cardH + cardGap);

        // Card image
        if (img) {
            ctx.shadowColor = 'rgba(' + colors.accentRgb + ', 0.12)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 8;
            ctx.drawImage(img, cardX, cy, cardW, cardH);
            ctx.shadowColor = 'transparent';

            ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.2)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(cardX, cy, cardW, cardH);
        }

        // Text on right side, vertically centered to this card
        var sel = multiCardSelections[i];
        var card = sel.card;
        var posLabel = getPositionLabel(i);
        var cardName = getCardName(card.name);
        var quote = getMultiCardQuote(card);

        // Center text block within card height region
        var textBlockTop = cy + cardH * 0.1;

        // Position label
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 22px "Prompt", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✦ ' + posLabel, textCenterX, textBlockTop + 10);

        // Card name (dynamic sizing)
        ctx.fillStyle = '#C0C8E0';
        var nameSize = 36;
        ctx.font = 'bold ' + nameSize + 'px "Cormorant Garamond", "Prompt", serif';
        while (ctx.measureText(cardName).width > rightW - 10 && nameSize > 20) {
            nameSize -= 2;
            ctx.font = 'bold ' + nameSize + 'px "Cormorant Garamond", "Prompt", serif';
        }
        ctx.fillText(cardName, textCenterX, textBlockTop + 52);

        // Small decorative line
        ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(textCenterX - 50, textBlockTop + 65);
        ctx.lineTo(textCenterX + 50, textBlockTop + 65);
        ctx.stroke();

        // Quote
        ctx.font = 'italic 23px "Cormorant Garamond", "Prompt", serif';
        ctx.fillStyle = 'rgba(' + colors.lightRgb + ', 0.7)';
        var quoteText = '"' + quote + '"';
        var maxQuoteY = cy + cardH - 10;
        wrapText(ctx, quoteText, textCenterX, textBlockTop + 92, rightW - 10, 32, maxQuoteY);
    }

    // Footer with promo (centered at bottom)
    drawFooterWithPromo(ctx, {
        iconSize: 20,
        centerX: width / 2,
        footerY: height - 92,
        width: width - 100,
        color: 'rgba(' + colors.lightRgb + ', 0.45)',
        accentColor: colors.accent || '#C8A96E'
    });
}

function drawMultiSquareLayout(ctx, cardImages, width, height, colors) {
    var cardCount = multiCardSelections.length;
    var catLabel = getCategoryLabel();
    var safePad = 60;

    // Title + category at top
    ctx.fillStyle = 'rgba(' + colors.lightRgb + ', 0.6)';
    ctx.font = '22px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'center';
    var titleStr = getReadingModeTitle();
    if (catLabel) titleStr += '  ·  ' + catLabel;
    ctx.fillText(titleStr, width / 2, safePad + 10);

    // Category accent line
    ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, safePad + 25);
    ctx.lineTo(width / 2 + 140, safePad + 25);
    ctx.stroke();

    // --- 2x2 Grid layout (or 2+1 for 3 cards) ---
    var gridTop = safePad + 45;
    var footerH = 70; // Space for footer row
    var colGap = 30;
    var rowGap = 14;
    var availH = height - gridTop - footerH - 10;
    var availW = width - safePad * 2;

    // Each cell: card image + position label + card name + quote
    // 2 columns always
    var colW = (availW - colGap) / 2;
    var rows = (cardCount <= 2) ? 1 : 2;
    var textH = 80; // space for position + name + quote below card
    var cellH = (availH - rowGap * (rows - 1)) / rows;
    var maxCardH = cellH - textH;
    var cardW = 0;
    var cardH = 0;

    if (cardImages[0]) {
        var ratio = cardImages[0].width / cardImages[0].height;
        cardH = maxCardH;
        cardW = cardH * ratio;
        if (cardW > colW - 10) {
            cardW = colW - 10;
            cardH = cardW / ratio;
        }
    }

    // Build grid positions
    //   3 cards: [0,1] top row, [2] bottom row centered
    //   4 cards: [0,1] top row, [2,3] bottom row
    var positions = [];
    var leftCX = safePad + colW / 2;
    var rightCX = safePad + colW + colGap + colW / 2;

    if (cardCount === 3) {
        positions.push({ cx: leftCX, cy: gridTop });
        positions.push({ cx: rightCX, cy: gridTop });
        positions.push({ cx: width / 2, cy: gridTop + cellH + rowGap });
    } else {
        positions.push({ cx: leftCX, cy: gridTop });
        positions.push({ cx: rightCX, cy: gridTop });
        positions.push({ cx: leftCX, cy: gridTop + cellH + rowGap });
        positions.push({ cx: rightCX, cy: gridTop + cellH + rowGap });
    }

    // Draw each card cell
    for (var i = 0; i < cardCount; i++) {
        var pos = positions[i];
        var img = cardImages[i];
        var sel = multiCardSelections[i];
        var posLabel = getPositionLabel(i);
        var cardName = getCardName(sel.card.name);
        var quote = getMultiCardQuote(sel.card);
        var drawX = pos.cx - cardW / 2;
        var drawY = pos.cy;

        // Card image
        if (img) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 6;
            ctx.drawImage(img, drawX, drawY, cardW, cardH);
            ctx.shadowColor = 'transparent';

            ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(drawX, drawY, cardW, cardH);
        }

        // Text below card
        var belowY = drawY + cardH + 14;
        var maxTextW = colW - 10;
        ctx.textAlign = 'center';

        // Position label
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 14px "Prompt", sans-serif';
        ctx.fillText(posLabel, pos.cx, belowY);

        // Card name (dynamic sizing)
        ctx.fillStyle = '#C0C8E0';
        var nameSize = 22;
        ctx.font = 'bold ' + nameSize + 'px "Cormorant Garamond", "Prompt", serif';
        while (ctx.measureText(cardName).width > maxTextW && nameSize > 14) {
            nameSize -= 2;
            ctx.font = 'bold ' + nameSize + 'px "Cormorant Garamond", "Prompt", serif';
        }
        ctx.fillText(cardName, pos.cx, belowY + 22);

        // Quote (clamped to cell boundary)
        ctx.font = 'italic 14px "Cormorant Garamond", "Prompt", serif';
        ctx.fillStyle = 'rgba(' + colors.lightRgb + ', 0.6)';
        var quoteText = '"' + quote + '"';
        var maxQuoteY = drawY + cellH - 5;
        wrapText(ctx, quoteText, pos.cx, belowY + 42, maxTextW, 19, maxQuoteY);
    }

    // Footer with promo
    drawFooterWithPromo(ctx, {
        iconSize: 13,
        centerX: width / 2,
        footerY: height - 80,
        width: width - 120,
        color: 'rgba(' + colors.lightRgb + ', 0.45)',
        accentColor: colors.accent || '#C8A96E',
        compact: true
    });
}

function drawMultiWideLayout(ctx, cardImages, width, height, colors) {
    var cardCount = multiCardSelections.length;
    var catLabel = getCategoryLabel();

    // --- Layout: Cards in horizontal row, text below, footer at bottom ---
    var padL = 50;
    var padR = 50;
    var padT = 48;
    var footerH = 55;
    var cardGap = 20;
    var textH = 55; // space for position + name below cards

    // --- Title + Category centered at top ---
    var titleStr = getReadingModeTitle();
    ctx.fillStyle = 'rgba(' + colors.lightRgb + ', 0.6)';
    ctx.font = '18px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'center';
    ctx.fillText(titleStr, width / 2, padT + 5);

    var headerH = 18;
    if (catLabel) {
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 20px "Prompt", sans-serif';
        ctx.fillText(catLabel, width / 2, padT + 30);
        headerH = 45;
    }

    // Decorative line
    ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, padT + headerH + 8);
    ctx.lineTo(width / 2 + 80, padT + headerH + 8);
    ctx.stroke();

    var cardTop = padT + headerH + 22;
    var availCardH = height - cardTop - textH - footerH - 10;
    var availCardW = width - padL - padR;

    // Calculate card dimensions (all cards in one row)
    var cardW = 0;
    var cardH = 0;
    if (cardImages[0]) {
        var ratio = cardImages[0].width / cardImages[0].height;
        cardH = availCardH;
        var maxPerCardW = (availCardW - cardGap * (cardCount - 1)) / cardCount;
        cardW = cardH * ratio;
        if (cardW > maxPerCardW) {
            cardW = maxPerCardW;
            cardH = cardW / ratio;
        }
    }

    // Center the entire row of cards
    var totalCardsW = cardW * cardCount + cardGap * (cardCount - 1);
    var startX = (width - totalCardsW) / 2;
    var cardY = cardTop + (availCardH - cardH) / 2;

    // Draw cards in a row
    for (var i = 0; i < cardCount; i++) {
        var img = cardImages[i];
        var sel = multiCardSelections[i];
        var posLabel = getPositionLabel(i);
        var cardName = getCardName(sel.card.name);
        var cx = startX + i * (cardW + cardGap);
        var cardCenterX = cx + cardW / 2;

        // Card image with shadow
        if (img) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 6;
            ctx.drawImage(img, cx, cardY, cardW, cardH);
            ctx.shadowColor = 'transparent';

            ctx.strokeStyle = 'rgba(' + colors.accentRgb + ', 0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(cx, cardY, cardW, cardH);
        }

        // Position label below card
        var belowY = cardY + cardH + 14;
        ctx.textAlign = 'center';
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 12px "Prompt", sans-serif';
        ctx.fillText(posLabel, cardCenterX, belowY);

        // Card name (dynamic sizing, no quotes)
        ctx.fillStyle = '#C0C8E0';
        var ns = 16;
        ctx.font = 'bold ' + ns + 'px "Cormorant Garamond", "Prompt", serif';
        var maxNW = cardW + 10;
        while (ctx.measureText(cardName).width > maxNW && ns > 10) {
            ns -= 1;
            ctx.font = 'bold ' + ns + 'px "Cormorant Garamond", "Prompt", serif';
        }
        ctx.fillText(cardName, cardCenterX, belowY + 18);
    }

    // Footer with promo (centered, within border)
    drawFooterWithPromo(ctx, {
        iconSize: 10,
        centerX: width / 2,
        footerY: height - 66,
        width: width - 80,
        color: 'rgba(' + colors.lightRgb + ', 0.4)',
        accentColor: colors.accent || '#C8A96E',
        compact: true
    });
}

function drawShareImage(ctx, cardImg, size, platform) {
    const { width, height } = size;
    const isVertical = height > width;
    const isWide = width > height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#080C24');
    gradient.addColorStop(0.5, '#0B1030');
    gradient.addColorStop(1, '#0d1333');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative border
    ctx.strokeStyle = '#2A3570';
    ctx.lineWidth = isWide ? 6 : 8;
    const borderPadding = isWide ? 20 : 30;
    ctx.strokeRect(borderPadding, borderPadding, width - borderPadding * 2, height - borderPadding * 2);

    // Inner decorative line
    ctx.strokeStyle = 'rgba(160, 180, 220, 0.3)';
    ctx.lineWidth = 2;
    const innerPadding = borderPadding + 15;
    ctx.strokeRect(innerPadding, innerPadding, width - innerPadding * 2, height - innerPadding * 2);

    // Layout based on platform
    if (isVertical) {
        // Story layout (vertical)
        drawVerticalLayout(ctx, cardImg, width, height);
    } else if (isWide) {
        // Facebook layout (wide)
        drawWideLayout(ctx, cardImg, width, height);
    } else {
        // Square layout (IG post, LINE)
        drawSquareLayout(ctx, cardImg, width, height);
    }
}

// Draw social media icons (4 icons: IG, TikTok, FB, YouTube)
function drawSocialIcons(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.07;

    const gap = size * 1.4; // Gap between icons
    let currentX = x;
    const radius = size * 0.2;

    // Instagram icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size/2, y + size/2, size * 0.28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size * 0.75, y + size * 0.25, size * 0.07, 0, Math.PI * 2);
    ctx.fill();

    currentX += gap;

    // TikTok icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.58, y + size * 0.15);
    ctx.lineTo(currentX + size * 0.58, y + size * 0.65);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(currentX + size * 0.42, y + size * 0.7, size * 0.18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.58, y + size * 0.22);
    ctx.quadraticCurveTo(currentX + size * 0.85, y + size * 0.18, currentX + size * 0.85, y + size * 0.38);
    ctx.stroke();

    currentX += gap;

    // Facebook icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.font = `bold ${size * 0.65}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('f', currentX + size/2, y + size * 0.72);

    currentX += gap;

    // Youtube icon
    ctx.beginPath();
    ctx.roundRect(currentX, y, size, size, radius);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX + size * 0.38, y + size * 0.3);
    ctx.lineTo(currentX + size * 0.38, y + size * 0.7);
    ctx.lineTo(currentX + size * 0.72, y + size * 0.5);
    ctx.closePath();
    ctx.fill();

    return currentX + size;
}

// Draw LINE icon only
function drawLineIcon(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.07;
    const radius = size * 0.2;

    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.stroke();
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('L', x + size/2, y + size * 0.68);
}

// Unified footer: social left, jubpai.com right — same row
// opts: { iconSize, centerX, footerY, width, color, accentColor, compact }
function drawFooterWithPromo(ctx, opts) {
    var iconSize = opts.iconSize || 14;
    var footerY = opts.footerY;
    var color = opts.color || 'rgba(160, 180, 220, 0.55)';
    var accentColor = opts.accentColor || '#C8A96E';
    var compact = opts.compact || false;
    var centerX = opts.centerX;
    var areaW = opts.width || 600;

    var leftX = centerX - areaW / 2 + (compact ? 10 : 20);
    var rightX = centerX + areaW / 2 - (compact ? 10 : 20);

    // --- Left side: Social icons row + labels ---
    var leftIconsEndX = drawSocialIcons(ctx, leftX, footerY, iconSize, color);
    var lineGap = compact ? 8 : 12;
    drawLineIcon(ctx, leftIconsEndX + lineGap, footerY, iconSize, color);

    // Labels below icons
    var labelSize = compact ? 9 : 11;
    var labelY = footerY + iconSize + (compact ? 11 : 14);
    ctx.font = labelSize + 'px "Prompt", sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText('Pimfahmaprod · Line: @Pimfah', leftX, labelY);

    // --- Right side: jubpai.com promo ---
    var promoSize = compact ? 14 : 17;
    var promoMidY = footerY + iconSize * 0.35;

    // Glow effect
    ctx.save();
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 15;
    ctx.textAlign = 'right';
    ctx.font = 'bold ' + promoSize + 'px "Cormorant Garamond", "Prompt", serif';
    ctx.fillStyle = accentColor;
    ctx.fillText('✧  jubpai.com  ✧', rightX, promoMidY);
    ctx.restore();

    // Crisp text on top
    ctx.textAlign = 'right';
    ctx.font = 'bold ' + promoSize + 'px "Cormorant Garamond", "Prompt", serif';
    ctx.fillStyle = accentColor;
    ctx.fillText('✧  jubpai.com  ✧', rightX, promoMidY);

    // Subtext below
    var subSize = compact ? 9 : 11;
    ctx.font = subSize + 'px "Prompt", sans-serif';
    ctx.fillStyle = 'rgba(200, 169, 110, 0.55)';
    ctx.textAlign = 'right';
    ctx.fillText('จับไพ่รายวัน ฟรี!', rightX, promoMidY + (compact ? 14 : 18));

    return iconSize + (compact ? 11 : 14) + labelSize + 4;
}

function drawVerticalLayout(ctx, cardImg, width, height) {
    // "Card of the Day" title at top
    ctx.fillStyle = 'rgba(160, 180, 220, 0.6)';
    ctx.font = '28px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Card of the Day', width / 2, 80);

    // Card image - large and centered
    let cardBottomY = 120;
    if (cardImg) {
        const cardWidth = 520;
        const cardHeight = cardWidth * (cardImg.height / cardImg.width);
        const cardX = (width - cardWidth) / 2;
        const cardY = 120;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardBottomY = cardY + cardHeight;
    }

    // Card name - right after card
    const nameY = cardBottomY + 80;
    ctx.fillStyle = '#C0C8E0';
    ctx.font = 'bold 64px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'center';
    ctx.fillText(getCardName(currentCardData.name), width / 2, nameY);

    // Decorative line under name
    ctx.strokeStyle = 'rgba(160, 180, 220, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 180, nameY + 25);
    ctx.lineTo(width / 2 + 180, nameY + 25);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 36px "Cormorant Garamond", "Prompt", serif';
    ctx.fillStyle = 'rgba(160, 180, 220, 0.85)';
    const quote = `"${getCardQuote(currentCardData)}"`;
    wrapText(ctx, quote, width / 2, nameY + 90, width - 160, 48);

    // Interpretation section
    const interpretY = nameY + 200;

    // Divider
    ctx.strokeStyle = 'rgba(160, 180, 220, 0.3)';
    ctx.beginPath();
    ctx.moveTo(120, interpretY);
    ctx.lineTo(width - 120, interpretY);
    ctx.stroke();

    // Interpretation label
    ctx.font = 'bold 28px "Prompt", sans-serif';
    ctx.fillStyle = '#C0C8E0';
    ctx.fillText(t('common.prophecy'), width / 2, interpretY + 50);

    // Interpretation text - full text with bounds (preserve paragraph breaks)
    ctx.font = '26px "Prompt", sans-serif';
    ctx.fillStyle = '#C0C8E0';
    const maxInterpretY = height - 140; // Leave space for footer
    wrapTextWithParagraphsCenter(ctx, getCardInterpretation(currentCardData), width / 2, interpretY + 110, width - 160, 38, maxInterpretY);

    // Footer with promo
    drawFooterWithPromo(ctx, {
        iconSize: 22,
        centerX: width / 2,
        footerY: height - 100,
        width: width - 100,
        color: 'rgba(160, 180, 220, 0.6)',
        accentColor: '#C8A96E'
    });
}

function drawSquareLayout(ctx, cardImg, width, height) {
    // Border padding for safe area - generous margin from border
    const safePadding = 80;

    // Card image - left side, large and vertically centered
    let cardRightX = 450;
    if (cardImg) {
        const cardHeight = height - 200; // More vertical padding
        const cardWidth = cardHeight * (cardImg.width / cardImg.height);
        const cardX = safePadding + 10;
        const cardY = 100;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardRightX = cardX + cardWidth + 35;
    }

    // Right side - Text area with safe margins
    const textX = cardRightX;
    const textWidth = width - textX - safePadding - 10; // More right padding

    // Title small
    ctx.fillStyle = 'rgba(160, 180, 220, 0.6)';
    ctx.font = '22px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Card of the Day', textX, 140);

    // Card name - large (with dynamic sizing to fit)
    ctx.fillStyle = '#C0C8E0';
    let nameFontSize = 48;
    const cardName = getCardName(currentCardData.name);
    ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", "Prompt", serif`;
    let nameWidth = ctx.measureText(cardName).width;
    while (nameWidth > textWidth && nameFontSize > 26) {
        nameFontSize -= 2;
        ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", "Prompt", serif`;
        nameWidth = ctx.measureText(cardName).width;
    }
    ctx.fillText(cardName, textX, 195);

    // Decorative line
    ctx.strokeStyle = 'rgba(160, 180, 220, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(textX, 220);
    ctx.lineTo(textX + Math.min(180, textWidth - 20), 220);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 22px "Cormorant Garamond", "Prompt", serif';
    ctx.fillStyle = 'rgba(160, 180, 220, 0.85)';
    const quoteText = `"${getCardQuote(currentCardData)}"`;
    wrapTextLeft(ctx, quoteText, textX, 265, textWidth, 30);

    // Interpretation - full text with bounds (preserve paragraph breaks)
    ctx.font = '17px "Prompt", sans-serif';
    ctx.fillStyle = '#C0C8E0';
    const maxInterpretY = height - safePadding - 80; // Leave space for footer
    wrapTextWithParagraphs(ctx, getCardInterpretation(currentCardData), textX, 360, textWidth, 25, maxInterpretY);

    // Footer with promo (centered in the text column area)
    var textCenterX = textX + textWidth / 2;
    drawFooterWithPromo(ctx, {
        iconSize: 13,
        centerX: textCenterX,
        footerY: height - safePadding - 38,
        width: textWidth,
        color: 'rgba(160, 180, 220, 0.55)',
        accentColor: '#C8A96E',
        compact: true
    });
}

function drawWideLayout(ctx, cardImg, width, height) {
    // Left side: Card image - fill height
    let cardRightX = 350;
    if (cardImg) {
        const cardHeight = height - 100;
        const cardWidth = cardHeight * (cardImg.width / cardImg.height);
        const cardX = 50;
        const cardY = 50;

        // Card shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 12;

        ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
        ctx.shadowColor = 'transparent';
        cardRightX = cardX + cardWidth + 50;
    }

    // Right side: Text - starts after card
    const textX = cardRightX;
    const textWidth = width - textX - 60;

    // Title small
    ctx.fillStyle = 'rgba(160, 180, 220, 0.6)';
    ctx.font = '20px "Cormorant Garamond", "Prompt", serif';
    ctx.textAlign = 'left';
    ctx.fillText('Card of the Day', textX, 80);

    // Card name - prominent (with dynamic sizing to fit)
    ctx.fillStyle = '#C0C8E0';
    let nameFontSize = 42;
    const cardName = getCardName(currentCardData.name);
    ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", "Prompt", serif`;
    let nameWidth = ctx.measureText(cardName).width;
    while (nameWidth > textWidth && nameFontSize > 24) {
        nameFontSize -= 2;
        ctx.font = `bold ${nameFontSize}px "Cormorant Garamond", "Prompt", serif`;
        nameWidth = ctx.measureText(cardName).width;
    }
    ctx.fillText(cardName, textX, 125);

    // Decorative line
    ctx.strokeStyle = 'rgba(160, 180, 220, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(textX, 145);
    ctx.lineTo(textX + 200, 145);
    ctx.stroke();

    // Quote
    ctx.font = 'italic 20px "Cormorant Garamond", "Prompt", serif';
    ctx.fillStyle = 'rgba(160, 180, 220, 0.9)';
    const quoteText = `"${getCardQuote(currentCardData)}"`;
    wrapTextLeft(ctx, quoteText, textX, 180, textWidth, 26);

    // Interpretation - full text with bounds (preserve paragraph breaks)
    ctx.font = '16px "Prompt", sans-serif';
    ctx.fillStyle = '#C0C8E0';
    const maxInterpretY = height - 85; // Leave space for footer within border
    wrapTextWithParagraphs(ctx, getCardInterpretation(currentCardData), textX, 260, textWidth, 22, maxInterpretY);

    // Footer with promo (centered in text column area, within inner border)
    var textCenterX = textX + textWidth / 2;
    drawFooterWithPromo(ctx, {
        iconSize: 11,
        centerX: textCenterX,
        footerY: height - 68,
        width: textWidth,
        color: 'rgba(160, 180, 220, 0.55)',
        accentColor: '#C8A96E',
        compact: true
    });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    const words = text.split(' ');
    let line = '';
    let testLine = '';

    for (let i = 0; i < words.length; i++) {
        testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            if (y > maxY) {
                // Add ellipsis to last visible line
                ctx.fillText(line.trim() + '...', x, y - lineHeight);
                return y;
            }
            ctx.fillText(line.trim(), x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (y <= maxY + lineHeight) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

// Text wrapping with paragraph support (centered) - for Story layout
function wrapTextWithParagraphsCenter(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'center';
    const paragraphs = text.split('\n\n');
    const paragraphGap = lineHeight * 0.5;

    for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].replace(/\n/g, ' ').trim();
        if (!paragraph) continue;

        const words = paragraph.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth) {
                if (line.length > 0) {
                    if (y + lineHeight > maxY) {
                        ctx.fillText(line.trim() + '...', x, y);
                        return y;
                    }
                    ctx.fillText(line.trim(), x, y);
                    y += lineHeight;
                    line = '';
                }

                // Handle long words
                if (ctx.measureText(word).width > maxWidth) {
                    let charLine = '';
                    for (let j = 0; j < word.length; j++) {
                        const testCharLine = charLine + word[j];
                        if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                            if (y + lineHeight > maxY) {
                                ctx.fillText(charLine + '...', x, y);
                                return y;
                            }
                            ctx.fillText(charLine, x, y);
                            y += lineHeight;
                            charLine = word[j];
                        } else {
                            charLine = testCharLine;
                        }
                    }
                    line = charLine + ' ';
                } else {
                    line = word + ' ';
                }
            } else {
                line = testLine;
            }
        }

        // Draw remaining text of this paragraph
        if (line.trim().length > 0 && y <= maxY) {
            ctx.fillText(line.trim(), x, y);
            y += lineHeight;
        }

        // Add paragraph gap
        if (p < paragraphs.length - 1 && y <= maxY) {
            y += paragraphGap;
        }
    }
    return y;
}

// Text wrapping with paragraph support - adds extra space for \n\n
function wrapTextWithParagraphs(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const paragraphs = text.split('\n\n');
    const paragraphGap = lineHeight * 0.5; // Extra space between paragraphs

    for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].replace(/\n/g, ' ').trim();
        if (!paragraph) continue;

        const words = paragraph.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth) {
                if (line.length > 0) {
                    // Check boundary before drawing
                    if (y + lineHeight > maxY) {
                        ctx.fillText(line.trim() + '...', x, y);
                        return y;
                    }
                    ctx.fillText(line.trim(), x, y);
                    y += lineHeight;
                    line = '';
                }

                // Handle long words by breaking at character level
                if (ctx.measureText(word).width > maxWidth) {
                    let charLine = '';
                    for (let j = 0; j < word.length; j++) {
                        const testCharLine = charLine + word[j];
                        if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                            if (y + lineHeight > maxY) {
                                ctx.fillText(charLine + '...', x, y);
                                return y;
                            }
                            ctx.fillText(charLine, x, y);
                            y += lineHeight;
                            charLine = word[j];
                        } else {
                            charLine = testCharLine;
                        }
                    }
                    line = charLine + ' ';
                } else {
                    line = word + ' ';
                }
            } else {
                line = testLine;
            }
        }

        // Draw remaining text of this paragraph
        if (line.trim().length > 0 && y <= maxY) {
            ctx.fillText(line.trim(), x, y);
            y += lineHeight;
        }

        // Add paragraph gap (except for last paragraph)
        if (p < paragraphs.length - 1 && y <= maxY) {
            y += paragraphGap;
        }
    }
    return y;
}

// Thai-aware text wrapping - handles long Thai words by breaking at character level
function wrapTextThaiAware(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth) {
            if (line.length > 0) {
                // Check if next line would exceed boundary
                if (y + lineHeight > maxY) {
                    ctx.fillText(line.trim() + '...', x, y);
                    return y;
                }
                ctx.fillText(line.trim(), x, y);
                y += lineHeight;
                line = '';
            }

            // If single word is too long, break it character by character
            if (ctx.measureText(word).width > maxWidth) {
                let charLine = '';
                for (let j = 0; j < word.length; j++) {
                    const testCharLine = charLine + word[j];
                    if (ctx.measureText(testCharLine).width > maxWidth && charLine.length > 0) {
                        if (y + lineHeight > maxY) {
                            ctx.fillText(charLine + '...', x, y);
                            return y;
                        }
                        ctx.fillText(charLine, x, y);
                        y += lineHeight;
                        charLine = word[j];
                    } else {
                        charLine = testCharLine;
                    }
                }
                line = charLine + ' ';
            } else {
                line = word + ' ';
            }
        } else {
            line = testLine;
        }
    }

    // Draw remaining text only if within bounds
    if (line.trim().length > 0 && y <= maxY) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

function wrapTextLeft(ctx, text, x, y, maxWidth, lineHeight, maxY = Infinity) {
    ctx.textAlign = 'left';
    const words = text.split(' ');
    let line = '';
    let testLine = '';

    for (let i = 0; i < words.length; i++) {
        testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            // Check if next line would exceed boundary
            if (y + lineHeight > maxY) {
                ctx.fillText(line.trim() + '...', x, y);
                return y;
            }
            ctx.fillText(line.trim(), x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    // Draw remaining text only if within bounds
    if (y <= maxY) {
        ctx.fillText(line.trim(), x, y);
    }
    return y;
}

// Initialize - wait for all resources before showing the page
waitForResources();

// ========================================
// Setup mute button and audio (runs immediately since script is at end of body)
// ========================================
(function setupAudioControls() {
    // Initialize audio element
    const audio = initAudioElement();

    const muteBtn = document.getElementById('muteBtn');

    if (muteBtn) {
        // Handle both click and touch
        function handleMuteClick(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMute(e);
        }

        muteBtn.addEventListener('click', handleMuteClick);
        muteBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleMuteClick(e);
        });

        console.log('Mute button initialized');
    }

    // Add audio event listeners for indicator
    if (audio) {
        audio.addEventListener('play', () => {
            console.log('Audio play event');
            updateSoundIndicator(true);
        });
        audio.addEventListener('pause', () => {
            console.log('Audio pause event');
            updateSoundIndicator(false);
        });
        audio.addEventListener('ended', () => {
            console.log('Audio ended event');
            updateSoundIndicator(false);
        });
        audio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            updateSoundIndicator(false);
        });
    }

    // Add one-time listener to start music on first user interaction
    function startMusicOnInteraction() {
        tryPlayMusic();
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
    }

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);

    console.log('Audio setup complete - waiting for user interaction');

    // Pause music when tab is hidden, screen off, or app minimized
    let wasPlayingBeforeHidden = false;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Tab hidden / screen off / minimized
            wasPlayingBeforeHidden = audioElement && !audioElement.paused;
            if (audioElement && !audioElement.paused) {
                audioElement.pause();
            }
        } else {
            // Tab visible again — resume if was playing and not muted
            if (wasPlayingBeforeHidden && audioElement && !isMuted && musicStarted) {
                audioElement.play().catch(() => {});
            }
        }
    });

    // For iOS Safari: pagehide fires more reliably when closing/switching
    window.addEventListener('pagehide', () => {
        if (audioElement && !audioElement.paused) {
            audioElement.pause();
        }
    });
})();

// =============================================
// ========================================
// Analytics Page - Secret Access
// ========================================
(function() {
    let brandClickCount = 0;
    let lastClickTime = 0;
    const REQUIRED_CLICKS = 10;
    const CLICK_TIMEOUT = 3000; // Reset if no click within 3 seconds

    // Initialize analytics secret access
    function initAnalyticsAccess() {
        const landingBrand = document.querySelector('.landing-brand');
        if (!landingBrand) return;

        landingBrand.style.cursor = 'pointer';
        landingBrand.addEventListener('click', handleBrandClick);
    }

    function handleBrandClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();

        // Reset count if too much time passed
        if (now - lastClickTime > CLICK_TIMEOUT) {
            brandClickCount = 0;
        }

        lastClickTime = now;
        brandClickCount++;

        // Subtle feedback
        if (brandClickCount >= 5 && brandClickCount < REQUIRED_CLICKS) {
            e.target.style.transform = `scale(${1 + (brandClickCount * 0.02)})`;
            setTimeout(() => {
                e.target.style.transform = '';
            }, 100);
        }

        // Open analytics when reached
        if (brandClickCount >= REQUIRED_CLICKS) {
            brandClickCount = 0;
            openAnalytics();
        }
    }

    // Open analytics page
    window.openAnalytics = async function() {
        const analyticsPage = document.getElementById('analyticsPage');
        if (!analyticsPage) return;

        // Pause background music
        if (audioElement && !audioElement.paused) {
            audioElement.pause();
        }

        analyticsPage.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Load analytics data
        await loadAnalyticsData();
    };

    // Close analytics page
    window.closeAnalytics = function() {
        const analyticsPage = document.getElementById('analyticsPage');
        if (!analyticsPage) return;

        analyticsPage.classList.remove('show');
        document.body.style.overflow = '';

        // Resume music if was playing
        if (audioElement && !isMuted && musicStarted) {
            audioElement.play().catch(() => {});
        }
    };

    // Load all analytics data
    async function loadAnalyticsData() {
        if (!window.cardCounter || !window.cardCounter.isEnabled()) {
            showAnalyticsError('Firebase ยังไม่ได้เชื่อมต่อ');
            return;
        }

        // Load all data in parallel
        await Promise.all([
            loadOverviewStats(),
            loadTopCards(),
            loadSaveFormatStats(),
            loadShareStats(),
            loadSocialStats(),
            loadJourneyFunnel(),
            loadTimeToPickStats(),
            loadDeviceStats(),
            loadFeatureUsageStats(),
            loadPositionHeatmap(),
            loadScrollDepthStats(),
            loadHotComments()
        ]);
    }

    // Load overview statistics
    async function loadOverviewStats() {
        try {
            const database = firebase.database();

            // Total card picks
            const totalPicks = await window.cardCounter.getTotal();
            document.getElementById('statTotalPicks').textContent =
                totalPicks ? totalPicks.toLocaleString('th-TH') : '0';

            // Total comments
            const commentsCount = await window.cardCounter.getCommentsCount();
            document.getElementById('statTotalComments').textContent =
                commentsCount ? commentsCount.toLocaleString('th-TH') : '0';

            // Total replies
            const repliesSnapshot = await database.ref('replies').once('value');
            let totalReplies = 0;
            if (repliesSnapshot.exists()) {
                repliesSnapshot.forEach(commentReplies => {
                    totalReplies += commentReplies.numChildren();
                });
            }
            document.getElementById('statTotalReplies').textContent =
                totalReplies.toLocaleString('th-TH');

            // Total saves
            const savesSnapshot = await database.ref('buttonClicks/save').once('value');
            let totalSaves = 0;
            if (savesSnapshot.exists()) {
                savesSnapshot.forEach(format => {
                    totalSaves += format.val() || 0;
                });
            }
            document.getElementById('statTotalSaves').textContent =
                totalSaves.toLocaleString('th-TH');

        } catch (error) {
            console.error('Error loading overview stats:', error);
        }
    }

    // Load all 78 cards grid
    async function loadTopCards() {
        const container = document.getElementById('allCardsGrid');
        if (!container) return;

        try {
            const database = firebase.database();
            const snapshot = await database.ref('cardPicks').once('value');
            const data = snapshot.val() || {};

            // Build pick count map
            const pickCounts = {};
            Object.entries(data).forEach(([key, count]) => {
                const cardId = key.replace('card_', '');
                pickCounts[cardId] = count || 0;
            });

            // Get all 78 cards from tarotData
            if (!tarotData || !tarotData.cards) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่โหลดข้อมูลไพ่</div>';
                return;
            }

            // Sort cards by pick count (descending)
            const sortedCards = [...tarotData.cards].sort((a, b) => {
                const countA = pickCounts[a.id] || 0;
                const countB = pickCounts[b.id] || 0;
                return countB - countA;
            });

            let html = '';
            sortedCards.forEach((card, index) => {
                const count = pickCounts[card.id] || 0;
                const cardImage = `images/tarot/${card.image}`;

                // Rank styling for top 3
                let rankBadge = '';
                if (index === 0) rankBadge = '<span class="card-grid-rank gold">1</span>';
                else if (index === 1) rankBadge = '<span class="card-grid-rank silver">2</span>';
                else if (index === 2) rankBadge = '<span class="card-grid-rank bronze">3</span>';

                html += `
                    <div class="card-grid-item" title="${card.name}">
                        ${rankBadge}
                        <img src="${cardImage}" alt="${card.name}" class="card-grid-image">
                        <div class="card-grid-count">${count}</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading all cards:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load save format statistics
    async function loadSaveFormatStats() {
        const container = document.getElementById('saveFormatChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/save').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const formats = [
                { key: 'ig-story', label: 'IG Story', class: 'ig-story' },
                { key: 'square', label: 'IG Post', class: 'square' },
                { key: 'facebook', label: 'Facebook', class: 'facebook' },
                { key: 'wide', label: 'Wide', class: 'wide' }
            ];

            const maxValue = Math.max(...formats.map(f => data[f.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            formats.forEach(format => {
                const value = data[format.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <span class="chart-bar-label">${format.label}</span>
                        <div class="chart-bar-track">
                            <div class="chart-bar-fill ${format.class}" style="width: ${percentage}%">
                                <span class="chart-bar-value">${value.toLocaleString('th-TH')}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading save format stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load share platform statistics
    async function loadShareStats() {
        const container = document.getElementById('sharePlatformChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/share').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const platforms = [
                { key: 'messenger', label: 'Messenger', class: 'messenger' },
                { key: 'line', label: 'LINE', class: 'line' },
                { key: 'copy', label: 'Copy Link', class: 'copy' }
            ];

            const maxValue = Math.max(...platforms.map(p => data[p.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            platforms.forEach(platform => {
                const value = data[platform.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <span class="chart-bar-label">${platform.label}</span>
                        <div class="chart-bar-track">
                            <div class="chart-bar-fill ${platform.class}" style="width: ${percentage}%">
                                <span class="chart-bar-value">${value.toLocaleString('th-TH')}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading share stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load social link click statistics
    async function loadSocialStats() {
        const container = document.getElementById('socialStatsGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('buttonClicks/social').once('value');
            const data = snapshot.val() || {};

            const igIcon = '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
            const ttIcon = '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>';
            const fbIcon = '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
            const ytIcon = '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';
            const lineIcon = '<svg viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>';

            const socials = [
                { key: 'instagram', bkey: 'blessing_instagram', label: 'Instagram', class: 'instagram', icon: igIcon },
                { key: 'tiktok', bkey: 'blessing_tiktok', label: 'TikTok', class: 'tiktok', icon: ttIcon },
                { key: 'facebook', bkey: 'blessing_facebook', label: 'Facebook', class: 'facebook', icon: fbIcon },
                { key: 'youtube', bkey: null, label: 'YouTube', class: 'youtube', icon: ytIcon },
                { key: null, bkey: 'blessing_line', label: 'LINE (Blessing)', class: 'line', icon: lineIcon }
            ];

            let html = '';
            socials.forEach(social => {
                const footerValue = social.key ? (data[social.key] || 0) : 0;
                const blessingValue = social.bkey ? (data[social.bkey] || 0) : 0;
                const totalValue = footerValue + blessingValue;
                const breakdown = social.bkey && social.key ?
                    `<div class="social-breakdown">Footer: ${footerValue} / Blessing: ${blessingValue}</div>` :
                    '';
                html += `
                    <div class="social-stat-card ${social.class}">
                        <div class="social-stat-icon">${social.icon}</div>
                        <div class="social-stat-value">${totalValue.toLocaleString('th-TH')}</div>
                        <div class="social-stat-label">${social.label}</div>
                        ${breakdown}
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading social stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load hot comments
    async function loadHotComments() {
        const container = document.getElementById('hotCommentsList');

        try {
            const hotComments = await window.cardCounter.fetchHotComments(5);
            await resolveDisplayNames(hotComments);

            if (!hotComments || hotComments.length === 0) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีความคิดเห็น</div>';
                return;
            }

            let html = '';
            hotComments.forEach(comment => {
                html += `
                    <div class="hot-comment-card">
                        <div class="hot-comment-header">
                            <span class="hot-comment-user">${escapeHtml(comment.userName || 'Me')}</span>
                            <span class="hot-comment-replies">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 0-10H9a3 3 0 0 0 0 6h9"/>
                                </svg>
                                ${comment.replyCount || 0} replies
                            </span>
                        </div>
                        <div class="hot-comment-card-name">${escapeHtml(comment.cardName || '')}</div>
                        <div class="hot-comment-text">${escapeHtml(comment.comment || '')}</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading hot comments:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load user journey funnel
    async function loadJourneyFunnel() {
        const container = document.getElementById('journeyFunnel');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/journey').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const steps = [
                { key: 'landing', label: 'Landing Page' },
                { key: 'pick', label: 'Card Pick' },
                { key: 'result', label: 'View Result' }
            ];

            const landingCount = data.landing || 0;

            let html = '';
            steps.forEach(step => {
                const value = data[step.key] || 0;
                const percentage = landingCount > 0 ? ((value / landingCount) * 100).toFixed(1) : 0;
                const barWidth = landingCount > 0 ? (value / landingCount) * 100 : 0;

                html += `
                    <div class="funnel-step" style="--bar-width: ${barWidth}%">
                        <span class="funnel-step-label">${step.label}</span>
                        <span class="funnel-step-value">${value.toLocaleString('th-TH')}</span>
                        <span class="funnel-step-percent">${percentage}%</span>
                    </div>
                `;
            });

            container.innerHTML = html;

            // Apply bar widths after render
            setTimeout(() => {
                container.querySelectorAll('.funnel-step').forEach(el => {
                    const width = el.style.getPropertyValue('--bar-width');
                    el.style.setProperty('--bar-width', width);
                    el.querySelector('::before')?.style?.setProperty('width', width);
                });
            }, 100);

        } catch (error) {
            console.error('Error loading journey funnel:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load time to first pick statistics
    async function loadTimeToPickStats() {
        const container = document.getElementById('timeToPickChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/timeToFirstPick').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const buckets = [
                { key: 'instant', label: '< 5s', class: 'instant' },
                { key: 'quick', label: '5-9s', class: 'quick' },
                { key: 'normal', label: '10-29s', class: 'normal' },
                { key: 'medium', label: '30-59s', class: 'medium' },
                { key: 'slow', label: '60s+', class: 'slow' }
            ];

            const maxValue = Math.max(...buckets.map(b => data[b.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            buckets.forEach(bucket => {
                const value = data[bucket.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <div class="chart-bar-label">${bucket.label}</div>
                        <div class="chart-bar">
                            <div class="chart-bar-fill ${bucket.class}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="chart-bar-value">${value.toLocaleString('th-TH')}</div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading time to pick stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load device breakdown statistics
    async function loadDeviceStats() {
        const container = document.getElementById('deviceStatsGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/devices').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const devices = [
                {
                    key: 'mobile',
                    label: 'Mobile',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
                },
                {
                    key: 'tablet',
                    label: 'Tablet',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
                },
                {
                    key: 'desktop',
                    label: 'Desktop',
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
                }
            ];

            const total = devices.reduce((sum, d) => sum + (data[d.key] || 0), 0);

            let html = '';
            devices.forEach(device => {
                const value = data[device.key] || 0;
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

                html += `
                    <div class="device-stat">
                        <div class="device-icon">${device.icon}</div>
                        <div class="device-name">${device.label}</div>
                        <div class="device-value">${value.toLocaleString('th-TH')}</div>
                        <div class="device-percent">${percentage}%</div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading device stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load feature usage statistics
    async function loadFeatureUsageStats() {
        const container = document.getElementById('featureUsageGrid');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/features').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const features = [
                {
                    key: 'music',
                    label: 'Music Control',
                    actions: ['muted', 'unmuted']
                },
                {
                    key: 'commentsPanel',
                    label: 'Comments Panel',
                    actions: ['opened', 'closed', 'tabSwitch_new', 'tabSwitch_hot', 'tabSwitch_mycard', 'tabSwitch_me']
                },
                {
                    key: 'commentForm',
                    label: 'Comment Form',
                    actions: ['started', 'submitted', 'abandoned']
                },
                {
                    key: 'viewCardComments',
                    label: 'View Card Comments (ส่อง)',
                    actions: ['click']
                },
                {
                    key: 'restart',
                    label: 'Restart',
                    actions: ['toLanding']
                },
                {
                    key: 'blessingScreen',
                    label: 'Blessing Screen',
                    actions: ['shown']
                },
                {
                    key: 'reply',
                    label: 'Reply to Comment',
                    actions: ['submitted']
                },
                {
                    key: 'commentCard',
                    label: 'Comment Card',
                    actions: ['expanded']
                },
                {
                    key: 'relatedComment',
                    label: 'Related Comment',
                    actions: ['navigate']
                },
                {
                    key: 'myCardTab',
                    label: 'My Card Tab (ไพ่ฉัน)',
                    actions: ['view']
                }
            ];

            let html = '';
            features.forEach(feature => {
                const featureData = data[feature.key] || {};
                const total = Object.values(featureData).reduce((sum, v) => sum + (v || 0), 0);

                let actionsHtml = '';
                feature.actions.forEach(action => {
                    const value = featureData[action] || 0;
                    actionsHtml += `
                        <div class="feature-action">
                            <span>${action}</span>
                            <span>${value.toLocaleString('th-TH')}</span>
                        </div>
                    `;
                });

                html += `
                    <div class="feature-item">
                        <div class="feature-header">
                            <span class="feature-name">${feature.label}</span>
                            <span class="feature-total">${total.toLocaleString('th-TH')} total</span>
                        </div>
                        <div class="feature-breakdown">
                            ${actionsHtml}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading feature usage stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load position heatmap
    async function loadPositionHeatmap() {
        const container = document.getElementById('positionHeatmap');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/cardPositions').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const positions = [
                { key: 'top', label: 'Top', x: 95, y: 0 },
                { key: 'top-right', label: 'TR', x: 165, y: 30 },
                { key: 'right', label: 'Right', x: 190, y: 95 },
                { key: 'bottom-right', label: 'BR', x: 165, y: 160 },
                { key: 'bottom', label: 'Bottom', x: 95, y: 190 },
                { key: 'bottom-left', label: 'BL', x: 25, y: 160 },
                { key: 'left', label: 'Left', x: 0, y: 95 },
                { key: 'top-left', label: 'TL', x: 25, y: 30 }
            ];

            const total = Object.values(data).reduce((sum, v) => sum + (v || 0), 0);
            const maxValue = Math.max(...Object.values(data), 1);

            let html = '<div class="heatmap-circle">';

            positions.forEach(pos => {
                const value = data[pos.key] || 0;
                const intensity = value / maxValue;
                let heatClass = 'cool';
                if (intensity > 0.7) heatClass = 'hot';
                else if (intensity > 0.4) heatClass = 'warm';

                html += `
                    <div class="heatmap-section ${heatClass}" style="left: ${pos.x}px; top: ${pos.y}px;">
                        <span class="heatmap-section-label">${pos.label}</span>
                        <span class="heatmap-section-value">${value}</span>
                    </div>
                `;
            });

            html += `
                <div class="heatmap-center">
                    <span class="heatmap-center-label">Total</span>
                    <span class="heatmap-center-value">${total.toLocaleString('th-TH')}</span>
                </div>
            `;
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading position heatmap:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    // Load scroll depth statistics
    async function loadScrollDepthStats() {
        const container = document.getElementById('scrollDepthChart');

        try {
            const database = firebase.database();
            const snapshot = await database.ref('analytics/interpretationScroll').once('value');
            const data = snapshot.val();

            if (!data) {
                container.innerHTML = '<div class="analytics-empty">ยังไม่มีข้อมูล</div>';
                return;
            }

            const buckets = [
                { key: '0-25', label: '0-25%', class: 'scroll-low' },
                { key: '25-50', label: '25-50%', class: 'scroll-med' },
                { key: '50-75', label: '50-75%', class: 'scroll-high' },
                { key: '75-100', label: '75-100%', class: 'scroll-complete' }
            ];

            const maxValue = Math.max(...buckets.map(b => data[b.key] || 0), 1);

            let html = '<div class="chart-bar-container">';
            buckets.forEach(bucket => {
                const value = data[bucket.key] || 0;
                const percentage = ((value / maxValue) * 100).toFixed(0);

                html += `
                    <div class="chart-bar-item">
                        <div class="chart-bar-label">${bucket.label}</div>
                        <div class="chart-bar">
                            <div class="chart-bar-fill ${bucket.class}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="chart-bar-value">${value.toLocaleString('th-TH')}</div>
                    </div>
                `;
            });
            html += '</div>';

            container.innerHTML = html;

        } catch (error) {
            console.error('Error loading scroll depth stats:', error);
            container.innerHTML = '<div class="analytics-empty">เกิดข้อผิดพลาด</div>';
        }
    }

    function showAnalyticsError(message) {
        const content = document.getElementById('analyticsContent');
        if (content) {
            content.innerHTML = `<div class="analytics-empty" style="margin-top: 100px;">${message}</div>`;
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalyticsAccess);
    } else {
        initAnalyticsAccess();
    }
})();
