const CACHE_NAME = "gpa-calculator-cache-v1";
const urlsToCache = [
    "./",
    "./Home.html",
    "./style.css",
    "./logic.js",
    "./manifest.json",
    "./img/Retro_Dazle_Night_Club_Logo.png",
    "./img/AAAA.gif"
];

// تثبيت Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching files...");
            return cache.addAll(urlsToCache);
        })
    );
});

// جلب الملفات من الكاش أو الشبكة
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                console.error("Resource not available offline:", event.request.url);
            });
        })
    );
});

// تحديث الكاش عند الحاجة
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
