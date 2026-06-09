const CACHE_VERSION = 'v9.8.2-market-dashboard-alignment';
const STATIC_CACHE = `pysec-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `pysec-runtime-${CACHE_VERSION}`;
const ASSETS = [
  './', './index.html', './styles.css', './manifest.json',
  './js/data.js', './js/curriculum-upgrade.js', './js/state.js', './js/validation.js', './js/runner.js', './js/runner-worker.js', './js/ui-components.js', './js/rank-system.js', './js/agent-command.js', './js/market.js', './js/market-intelligence-ux.js', './js/market-clean-flow.js', './js/market-command-dashboard.js', './js/ai-agent.js', './js/ui.js', './js/router.js', './js/app.js',
  './assets/icon-192.png', './assets/icon-512.png', './assets/screenshot-mobile.png', './assets/screenshot-wide.png',
  './assets/market-logos/aapl.svg', './assets/market-logos/amd.svg', './assets/market-logos/amzn.svg', './assets/market-logos/avgo.svg', './assets/market-logos/cat.svg', './assets/market-logos/crm.svg', './assets/market-logos/googl.svg', './assets/market-logos/intc.svg', './assets/market-logos/jpm.svg', './assets/market-logos/lly.svg', './assets/market-logos/meta.svg', './assets/market-logos/msft.svg', './assets/market-logos/nflx.svg', './assets/market-logos/nvda.svg', './assets/market-logos/tsla.svg', './assets/market-logos/v.svg', './assets/market-logos/wmt.svg', './assets/market-logos/xom.svg'
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
