const CACHE_NAME = "gpa-calculator-cache-v1";
const urlsToCache = [
  "./",
  "./Home.html",
  "./style.css",
  "./logic.js",
  "./manifest.json",
  "./icon-192x192.png",
  "./icon-512x512.png"
];

// تثبيت Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// جلب الملفات من الكاش
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// تحديث الكاش عند حدوث تغييرات
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
