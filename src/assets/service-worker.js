const CACHE_NAME = 'marvel-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/src/index.html',
  '/assets/manifest.webmanifest',
  '/src/styles.css',
  '/assets/css/animate.css',
  '/src/main.js'
];

// ✅ Instalar el Service Worker y guardar archivos estáticos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✅ Archivos estáticos almacenados en caché');
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar solicitudes y devolver archivos desde la caché o la red
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Cachear las respuestas de la API de Marvel 
  if (url.includes('gateway.marvel.com')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(API_CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    // Para otros recursos estáticos, devolver desde caché si está disponible
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

// Limpiar caché antigua cuando se actualiza el Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('♻️ Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
