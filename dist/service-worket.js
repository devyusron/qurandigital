const CACHE_NAME = 'quran-digital-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.css',
  '/build/bundle.js', // Sesuaikan dengan output build Svelte Anda
  '/assets/logo.png', // Contoh aset statis
  // Tambahkan URL aset lain yang ingin Anda cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Serve from cache if available
        }
        return fetch(event.request); // Otherwise, fetch from network
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      );
    })
  );
});