const CACHE_NAME = 'plwintercam-shell-v2';
const APP_SHELL = ['/', '/manifest.webmanifest', '/icons/plwintercam.svg', '/icons/plwintercam-180.png', '/icons/plwintercam-192.png', '/icons/plwintercam-512.png', '/icons/plwintercam-maskable-512.png', '/favicon.svg'];
const ASSET_PATH = /\/(?:_astro|icons|logos|src|node_modules|@vite)\//;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch('/');
    if (!response.ok) throw new Error('No se pudo precargar la portada');

    const html = await response.clone().text();
    await cache.put('/', response);

    const assets = [...html.matchAll(/(?:src|href)="(\/(?:_astro|icons|logos|src|node_modules|@vite)\/[^\"]+)"/g)]
      .map((match) => match[1]);
    const resources = [...new Set([...APP_SHELL.filter((path) => path !== '/'), ...assets])];
    await cache.addAll(resources);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('plwintercam-') && key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok && (url.pathname === '/' || url.pathname.startsWith('/estacion/'))) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(url.pathname, copy));
        }
        return response;
      }).catch(async () => (await caches.match(url.pathname)) || (await caches.match('/')) || Response.error())
    );
    return;
  }

  if (ASSET_PATH.test(url.pathname) || url.pathname.endsWith('/favicon.svg') || url.pathname.endsWith('/manifest.webmanifest')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fresh = fetch(request).then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        });
        return cached || fresh;
      })
    );
  }
});
