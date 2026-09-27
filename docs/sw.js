/* Lưu trang để xem được khi mất sóng. Tăng số phiên bản khi sửa nội dung. */
const CACHE = 'hokkaido-2026-v5';
const ASSETS = ['./', './index.html', './assets/style.css', './assets/data.js', './assets/images.js', './assets/app.js', './assets/icon.svg', './manifest.webmanifest',
  './assets/img/abashiri-1.jpg', './assets/img/abashiri-2.jpg', './assets/img/akan-1.jpg', './assets/img/akan-2.jpg', './assets/img/akan-3.jpg', './assets/img/akan-4.jpg', './assets/img/furepe-1.jpg', './assets/img/furepe-2.jpg', './assets/img/kawayu-1.jpg', './assets/img/mashu-1.jpg', './assets/img/oshin-1.jpg', './assets/img/shari-1.jpg', './assets/img/sunayu-1.jpg', './assets/img/tento-1.jpg', './assets/img/tento-2.jpg', './assets/img/tento-3.jpg', './assets/img/utoro-1.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

/* Có mạng thì lấy bản mới nhất, mất mạng thì dùng bản đã lưu. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const cacheable = url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!cacheable) return;
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
