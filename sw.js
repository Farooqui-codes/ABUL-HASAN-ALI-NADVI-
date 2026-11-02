/**
 * JAMIA ABUL HASAN ALI NADWI — SCHOOL ERP PWA SERVICE WORKER
 * Network-First Strategy: Always fetch fresh code during development & live updates,
 * fallback to cache when offline.
 */

const CACHE_NAME = 'nadwi-erp-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/dashboard.css',
  './css/components.css',
  './css/themes.css',
  './css/responsive.css',
  './js/data.js',
  './js/auth.js',
  './js/language.js',
  './js/interactions.js',
  './js/main.js',
  './assets/logo/official-logo.png',
  './assets/images/developers/umair-farooqui.jpg',
  './assets/images/developers/sayed-shaad.jpg'
];

// Force immediate activation
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Clear ALL old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
