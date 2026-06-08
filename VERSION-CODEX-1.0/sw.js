const CACHE_VERSION = 'v8.4.2-cyber-ui-2';
const ASSET_VERSION = '842-cyber-ui-2';
const STATIC_CACHE = `pysec-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `pysec-runtime-${CACHE_VERSION}`;
const ASSETS = [
  './', './index.html', `./styles.css?v=${ASSET_VERSION}`, `./manifest.json?v=${ASSET_VERSION}`,
  `./js/data.js?v=${ASSET_VERSION}`, `./js/state.js?v=${ASSET_VERSION}`, `./js/validation.js?v=${ASSET_VERSION}`, `./js/runner.js?v=${ASSET_VERSION}`, `./js/runner-worker.js?v=${ASSET_VERSION}`, `./js/ui-components.js?v=${ASSET_VERSION}`, `./js/ui.js?v=${ASSET_VERSION}`, `./js/router.js?v=${ASSET_VERSION}`, `./js/app.js?v=${ASSET_VERSION}`,
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
