const CACHE_NAME = 'SS-v3';

var ulrsToCache = [
  '/',
  '/index.html',
  '/navbar.html',
  '/pages/home.html',
  '/pages/howtobuy.html',
  '/pages/keyboard.html',
  '/pages/mice.html',
  '/pages/mousepad.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/script.js',
  '/images/bukalapak.png',
  '/images/tokopedia.png',
  '/images/shopee.png',
  '/images/home1.jpg',
  '/images/home2.jpg',
  '/images/home3.png',
  '/images/home4.png',
  '/images/keyboard1.png',
  '/images/keyboard2.png',
  '/images/keyboard3.png',
  '/images/keyboard4.png',
  '/images/mouse1.png',
  '/images/mouse2.png',
  '/images/mouse3.png',
  '/images/mouse4.png',
  '/images/mousepad1.png',
  '/images/mousepad2.png',
  '/images/mousepad3.png',
  '/images/mousepad4.png',
  '/icon.png'
];

// Install cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ulrsToCache);
    })
  );
});

// Panggil page jika tidak ada dalam cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then(function(response) {
      if (response) {
        console.log('Service Worker : Gunakan aset dari cache', response.url);
        return response;
      }

      console.log('Service Worker : Memuat aset dari server : ', event.request.url);
      return fetch(event.request);
    })
  );
});

// Hapus CACHE_NAME saat update cache baru
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('Service Worker : cache ' + cacheName + ' di hapus.');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
