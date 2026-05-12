const CACHE_NAME = "koperasi-app-v3"; // 🔥 ganti versi setiap update

const urlsToCache = [
  "./",
  "./index.html",
  "./anggota.html",
  "./kas.html",
  "./img/icon-192.png",
  "./img/icon-512.png"
];

// ✅ Install (cache file)
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 langsung aktif tanpa nunggu
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ✅ Activate (hapus cache lama)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // 🔥 hapus cache lama
          }
        })
      );
    })
  );
  self.clients.claim(); // 🔥 langsung kontrol page
});

// ✅ Fetch (ambil dari cache dulu, kalau tidak ada ambil dari internet)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});