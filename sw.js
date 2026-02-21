// Card of the Day — Service Worker
// Cache-first for static assets, network-first for API/Firebase

const CACHE_NAME = 'cotd-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/images/card_back_blue.png',
  '/audio/background.mp3'
];

// ── Install: cache static shell ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails if any asset 404s — use individual adds so one miss doesn't block
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          cache.add(url).catch(() => {
            // Silently ignore missing assets (CNY-specific files etc.)
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: purge old caches ───────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: strategy by request type ─────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip: cross-origin, Firebase, Google APIs, Facebook — always go network
  if (
    url.origin !== location.origin ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('facebook') ||
    url.hostname.includes('connect.facebook') ||
    url.hostname.includes('googletagmanager')
  ) {
    return; // Let browser handle it
  }

  // Skip: non-GET
  if (request.method !== 'GET') return;

  // Tarot images: cache-first (big images, rarely change)
  if (url.pathname.includes('/images/tarot/') || url.pathname.includes('/images/icons/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Audio: cache-first
  if (url.pathname.includes('/audio/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // JS/CSS with version query strings: stale-while-revalidate
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Navigation requests: network-first, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// ── Strategy helpers ─────────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  // Skip caching partial responses (206) — Cache API does not support them
  if (response.ok && response.status !== 206) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request).then((response) => {
    if (response.ok && response.status !== 206) cache.put(request, response.clone());
    return response;
  });
  return cached || networkPromise;
}
