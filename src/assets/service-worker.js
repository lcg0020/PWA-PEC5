const CACHE_NAME = 'marvel-pwa-cache-v1';
const API_CACHE_NAME = 'marvel-api-cache'; 
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/manifest.webmanifest',
  '/assets/css/animate.css',
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

  // Si la solicitud es a la API de Marvel, almacenar la respuesta en caché
  if (url.includes('gateway.marvel.com')) {
    event.respondWith(
      caches.open('marvel-api-cache').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    // Para otros archivos estáticos, usar el caché normal
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
