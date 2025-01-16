const CACHE_NAME = "gpa-calculator-cache-v1";
const urlsToCache = [
    "./",
    "./Home.html",
    "./style.css",
    "./logic.js",
    "./manifest.json",
    "./img/Retro_Dazle_Night_Club_Logo-removebg-preview.png",
    "./img/AAAA.gif"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching files...");
            return cache.addAll(urlsToCache);
        })
    );
});




self.addEventListener("fetch", event => {
  event.respondWith(
      fetch(event.request).then(response => {
          if (response.redirected) {
              return Response.error();
          }
          return response;
      }).catch(() => {
          return caches.match(event.request);
      })
  );
});




// تحديث الكاش عند حدوث تغييرات
self.addEventListener("activate", event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheName !== CACHE_NAME) {
                      console.log("Deleting old cache:", cacheName);
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});

