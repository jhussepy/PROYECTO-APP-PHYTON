const CACHE_VERSION = 'v8.4.2-tactical-cyber-os';
const STATIC_CACHE = `pysec-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `pysec-runtime-${CACHE_VERSION}`;
const ASSETS = [
  './', './index.html', './styles.css', './manifest.json',
  './js/data.js', './js/state.js', './js/validation.js', './js/runner.js', './js/runner-worker.js', './js/ui-components.js', './js/ui.js', './js/router.js', './js/app.js',
  './assets/icon-192.png', './assets/icon-512.png', './assets/screenshot-mobile.png', './assets/screenshot-wide.png'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(STATIC_CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('pysec-') && ![STATIC_CACHE, RUNTIME_CACHE].includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  }
  catch (_) { return (await cache.match(request)) || (await caches.match('./index.html')); }
}
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response && response.ok) caches.open(RUNTIME_CACHE).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) event.respondWith(networkFirst(event.request));
  else event.respondWith(staleWhileRevalidate(event.request));
});
