const cacheName = 'anidubflix-v2';
const assets = [
  '/',
  '/index.html',
  '/anime.html',
  '/details.html',
  '/watch.html',
  '/css/style.css',
  '/css/responsive.css',
  '/css/player.css',
  '/js/main.js',
  '/js/slider.js',
  '/js/search.js',
  '/js/player.js',
  '/data/anime-index.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
