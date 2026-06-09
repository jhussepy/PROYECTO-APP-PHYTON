/* PySec Academy Elite v9.9.0 - Strategy Engine
   Finnhub live + fallback Stooq/caché/demo.
   Incluye detalle de acción, sentimiento, top gainers/losers, watchlist, alertas locales, notas, sparkline, sectores avanzados y Market Agent local educativo. */

const MARKET_VERSION = '9.9.0';
const MARKET_CACHE_KEY = 'pysec_market_snapshot_v98';
const MARKET_LEGACY_CACHE_KEYS = ['pysec_market_snapshot_v946', 'pysec_market_snapshot_v93', 'pysec_market_snapshot_v92', 'pysec_market_snapshot_v91', 'pysec_market_snapshot_v90'];
const MARKET_PROFILE_CACHE_KEY = 'pysec_market_company_profiles_v98';
const FINNHUB_KEY_STORAGE = 'pysec_finnhub_api_key';
const FINNHUB_LEGACY_KEY_STORAGE = 'pysec_finnhub_api_key_v91';
const MARKET_WATCHLIST_KEY = 'pysec_market_user_watchlist_v93';
const MARKET_DETAIL_KEY = 'pysec_market_selected_symbol_v93';
const MARKET_TTL_MS = 4 * 60 * 1000;
const MARKET_ALERTS_KEY = 'pysec_market_alerts_v93';
const MARKET_NOTES_KEY = 'pysec_market_notes_v93';
const MARKET_HISTORY_KEY = 'pysec_market_price_history_v93';

const MARKET_WATCHLIST = [
  { symbol: 'NVDA', stooq: 'nvda.us', name: 'NVIDIA Corporation', sector: 'Tecnología electrónica', cap: 5050, icon: 'NV', logo: 'assets/market-logos/nvda.svg' },
  { symbol: 'AAPL', stooq: 'aapl.us', name: 'Apple Inc.', sector: 'Tecnología electrónica', cap: 4430, icon: '', logo: 'assets/market-logos/aapl.svg' },
  { symbol: 'MSFT', stooq: 'msft.us', name: 'Microsoft Corporation', sector: 'Servicios tecnológicos', cap: 3060, icon: 'MS', logo: 'assets/market-logos/msft.svg' },
  { symbol: 'GOOGL', stooq: 'googl.us', name: 'Alphabet Inc.', sector: 'Servicios tecnológicos', cap: 4390, icon: 'G', logo: 'assets/market-logos/googl.svg' },
  { symbol: 'META', stooq: 'meta.us', name: 'Meta Platforms Inc.', sector: 'Servicios tecnológicos', cap: 1490, icon: '∞', logo: 'assets/market-logos/meta.svg' },
  { symbol: 'AMZN', stooq: 'amzn.us', name: 'Amazon.com Inc.', sector: 'Comercio minorista', cap: 2640, icon: 'a', logo: 'assets/market-logos/amzn.svg' },
  { symbol: 'TSLA', stooq: 'tsla.us', name: 'Tesla Inc.', sector: 'Bienes de consumo duradero', cap: 1540, icon: 'T', logo: 'assets/market-logos/tsla.svg' },
  { symbol: 'AVGO', stooq: 'avgo.us', name: 'Broadcom Inc.', sector: 'Tecnología electrónica', cap: 1880, icon: 'B', logo: 'assets/market-logos/avgo.svg' },
  { symbol: 'AMD', stooq: 'amd.us', name: 'Advanced Micro Devices', sector: 'Tecnología electrónica', cap: 350, icon: 'AMD', logo: 'assets/market-logos/amd.svg' },
  { symbol: 'INTC', stooq: 'intc.us', name: 'Intel Corporation', sector: 'Tecnología electrónica', cap: 160, icon: 'i', logo: 'assets/market-logos/intc.svg' },
  { symbol: 'JPM', stooq: 'jpm.us', name: 'JPMorgan Chase & Co.', sector: 'Finanzas', cap: 760, icon: 'JPM', logo: 'assets/market-logos/jpm.svg' },
  { symbol: 'V', stooq: 'v.us', name: 'Visa Inc.', sector: 'Finanzas', cap: 690, icon: 'V', logo: 'assets/market-logos/v.svg' },
  { symbol: 'WMT', stooq: 'wmt.us', name: 'Walmart Inc.', sector: 'Comercio minorista', cap: 790, icon: 'W', logo: 'assets/market-logos/wmt.svg' },
  { symbol: 'LLY', stooq: 'lly.us', name: 'Eli Lilly and Company', sector: 'Tecnologías sanitarias', cap: 1080, icon: 'LLY', logo: 'assets/market-logos/lly.svg' },
  { symbol: 'XOM', stooq: 'xom.us', name: 'Exxon Mobil Corporation', sector: 'Energía', cap: 480, icon: 'XOM', logo: 'assets/market-logos/xom.svg' },
  { symbol: 'CAT', stooq: 'cat.us', name: 'Caterpillar Inc.', sector: 'Fabricación de productos', cap: 190, icon: 'CAT', logo: 'assets/market-logos/cat.svg' },
  { symbol: 'NFLX', stooq: 'nflx.us', name: 'Netflix Inc.', sector: 'Servicios tecnológicos', cap: 420, icon: 'N', logo: 'assets/market-logos/nflx.svg' },
  { symbol: 'CRM', stooq: 'crm.us', name: 'Salesforce Inc.', sector: 'Servicios tecnológicos', cap: 245, icon: 'CRM', logo: 'assets/market-logos/crm.svg' }
];

const MARKET_DEMO = [
  ['NVDA', 208.64, 1.73], ['AAPL', 301.54, -1.89], ['MSFT', 411.74, -1.18], ['GOOGL', 361.17, -1.42],
  ['META', 585.39, -1.28], ['AMZN', 245.22, -0.33], ['TSLA', 408.95, 4.59], ['AVGO', 396.60, 2.82],
  ['AMD', 142.80, 5.14], ['INTC', 38.20, 1.19], ['JPM', 284.15, -0.40], ['V', 347.90, -1.21],
  ['WMT', 105.33, 0.80], ['LLY', 1149.15, 1.57], ['XOM', 117.02, 1.22], ['CAT', 423.40, 1.26],
  ['NFLX', 1210.50, 0.56], ['CRM', 251.77, -0.87]
];

let marketState = {
  quotes: [],
  status: 'idle',
  source: 'Pendiente',
  provider: 'none',
  updatedAt: null,
  filter: 'all',
  query: '',
  detailSymbol: '',
  userWatchlist: [],
  alerts: [],
  notes: [],
  priceHistory: {}
};

function safeMarketEscape(value) {
  if (typeof escapeHtml === 'function') return escapeHtml(value);
  return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

let finnhubConnectionState = { tone: 'idle', message: '' };

function updateFinnhubConnectionFeedback() {
  const feedback = document.getElementById('market-api-feedback');
  if (!feedback) return;
  feedback.className = `market-api-feedback ${finnhubConnectionState.tone || 'idle'}`;
  feedback.textContent = finnhubConnectionState.message || '';
  feedback.hidden = !finnhubConnectionState.message;
}

function getFinnhubApiKey() {
  try {
    const current = String(localStorage.getItem(FINNHUB_KEY_STORAGE) || '').trim();
    if (current) return current;
    const legacy = String(localStorage.getItem(FINNHUB_LEGACY_KEY_STORAGE) || '').trim();
    if (!legacy) return '';
    localStorage.setItem(FINNHUB_KEY_STORAGE, legacy);
    localStorage.removeItem(FINNHUB_LEGACY_KEY_STORAGE);
    return legacy;
  } catch (_) { return ''; }
}

function saveFinnhubApiKey(key) {
  const value = String(key || '').trim();
  if (value.length < 8) return false;
  try {
    localStorage.setItem(FINNHUB_KEY_STORAGE, value);
    localStorage.removeItem(FINNHUB_LEGACY_KEY_STORAGE);
    return true;
  } catch (_) { return false; }
}

function deleteFinnhubApiKey() {
  try {
    localStorage.removeItem(FINNHUB_KEY_STORAGE);
    localStorage.removeItem(FINNHUB_LEGACY_KEY_STORAGE);
    return true;
  } catch (_) { return false; }
}

function hasFinnhubApiKey() { return getFinnhubApiKey().length >= 8; }

function getFinnhubKey() { return getFinnhubApiKey(); }
function hasFinnhubKey() { return hasFinnhubApiKey(); }

function maskFinnhubKey(key = getFinnhubApiKey()) {
  const value = String(key || '').trim();
  if (!value) return 'No configurada';
  return `********${value.slice(-4)}`;
}

function saveFinnhubKeyFromInput() {
  const input = document.getElementById('finnhub-key-input');
  const key = String(input?.value || '').trim();
  if (!key || key.length < 8) {
    if (typeof showToast === 'function') showToast('⚠️ API key inválida', 'Pega una API key de Finnhub válida.');
    return false;
  }
  if (!saveFinnhubApiKey(key)) {
    if (typeof showToast === 'function') showToast('No se pudo guardar', 'Revisa el almacenamiento del navegador.');
    return false;
  }
  if (input) input.value = '';
  finnhubConnectionState = { tone: 'success', message: 'API guardada en este navegador.' };
  if (typeof showToast === 'function') showToast('🔐 Finnhub conectado', 'La API key se guardó solo en este navegador.');
  refreshMarket(true);
  return true;
}

function clearFinnhubKey() {
  deleteFinnhubApiKey();
  finnhubConnectionState = { tone: 'idle', message: 'Finnhub eliminado. Mercado educativo / caché activo.' };
  marketState = { ...marketState, status: 'cached', source: 'Mercado educativo / caché', provider: 'cache' };
  if (typeof showToast === 'function') showToast('🧹 API key eliminada', 'Acciones usará proveedor alternativo, caché o demo.');
  renderMarketContent();
  refreshMarket(true);
}

async function testFinnhubConnection() {
  const pendingKey = String(document.getElementById('finnhub-key-input')?.value || '').trim();
  const key = pendingKey || getFinnhubApiKey();
  if (!key) {
    finnhubConnectionState = { tone: 'warning', message: 'Pega una API key primero.' };
    if (typeof showToast === 'function') showToast('Finnhub no configurado', 'Pega una API key primero.');
    updateFinnhubConnectionFeedback();
    return false;
  }

  finnhubConnectionState = { tone: 'testing', message: 'Probando conexión con AAPL...' };
  updateFinnhubConnectionFeedback();
  try {
    await fetchFinnhubQuote('AAPL', key);
    finnhubConnectionState = { tone: 'success', message: 'Conexión Finnhub correcta.' };
    if (typeof showToast === 'function') showToast('Conexión Finnhub correcta.', 'AAPL respondió correctamente.');
    updateFinnhubConnectionFeedback();
    return true;
  } catch (_) {
    finnhubConnectionState = { tone: 'error', message: 'No se pudo conectar con Finnhub. Revisa tu API key o conexión.' };
    if (typeof showToast === 'function') showToast('No se pudo conectar con Finnhub.', 'Revisa tu API key o conexión.');
    updateFinnhubConnectionFeedback();
    return false;
  }
}

function marketMeta(symbol) {
  return MARKET_WATCHLIST.find(item => item.symbol === symbol) || { symbol, name: symbol, sector: 'Otros', cap: 10, icon: '•' };
}

function formatMarketTime(dateValue) {
  if (!dateValue) return 'Sin actualizar';
  try { return new Date(dateValue).toLocaleString('es-PE', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }); }
  catch (_) { return 'Sin actualizar'; }
}

function formatUSD(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD';
}

function formatLargeNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n) >= 1_000_000_000_000) return (n / 1_000_000_000_000).toLocaleString('es-PE', { maximumFractionDigits: 2 }) + ' T';
  if (Math.abs(n) >= 1_000_000_000) return (n / 1_000_000_000).toLocaleString('es-PE', { maximumFractionDigits: 2 }) + ' B';
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toLocaleString('es-PE', { maximumFractionDigits: 2 }) + ' M';
  return n.toLocaleString('es-PE', { maximumFractionDigits: 0 });
}

function formatPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '0,00%';
  const sign = n > 0 ? '+' : '';
  return sign + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
}

function quoteClass(change) {
  const n = Number(change);
  if (n > 0.15) return 'is-up';
  if (n < -0.15) return 'is-down';
  return 'is-flat';
}

function normalizeQuote(symbol, price, changePercent, source = 'demo') {
  const meta = marketMeta(symbol);
  return {
    symbol: meta.symbol,
    name: meta.name,
    sector: meta.sector,
    cap: meta.cap,
    icon: meta.icon,
    logo: meta.logo || '',
    price: Number(price) || 0,
    changePercent: Number(changePercent) || 0,
    high: null,
    low: null,
    open: null,
    previousClose: null,
    volume: 0,
    source
  };
}

function enrichQuote(symbol, data, source = 'Finnhub') {
  const price = Number(data.c);
  const changePercent = Number(data.dp);
  const q = normalizeQuote(symbol, price, Number.isFinite(changePercent) ? changePercent : 0, source);
  q.high = Number(data.h) || null;
  q.low = Number(data.l) || null;
  q.open = Number(data.o) || null;
  q.previousClose = Number(data.pc) || null;
  return q;
}

function demoQuotes(reason = 'fallback') {
  return MARKET_DEMO.map(([symbol, price, pct]) => normalizeQuote(symbol, price, pct, reason));
}

function parseStooqCSV(csvText) {
  const lines = String(csvText || '').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error('Respuesta de mercado vacía');
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const idx = key => header.indexOf(key.toLowerCase());
  const iSymbol = idx('symbol'), iOpen = idx('open'), iClose = idx('close'), iHigh = idx('high'), iLow = idx('low'), iVolume = idx('volume');
  const quotes = [];
  for (const line of lines.slice(1)) {
    const cols = line.split(',').map(c => c.trim());
    const rawSymbol = (cols[iSymbol] || '').replace('.US', '').replace('.us', '').toUpperCase();
    const open = Number(cols[iOpen]);
    const close = Number(cols[iClose]);
    if (!rawSymbol || !Number.isFinite(close) || close <= 0) continue;
    const change = Number.isFinite(open) && open > 0 ? ((close - open) / open) * 100 : 0;
    const q = normalizeQuote(rawSymbol, close, change, 'Stooq');
    q.open = Number.isFinite(open) ? open : null;
    q.high = Number(cols[iHigh]) || null;
    q.low = Number(cols[iLow]) || null;
    q.volume = Number(cols[iVolume]) || 0;
    quotes.push(q);
  }
  return quotes;
}

async function fetchWithTimeout(url, timeoutMs = 4500, responseType = 'text') {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return responseType === 'json' ? await res.json() : await res.text();
  } finally { clearTimeout(timer); }
}

function readMarketProfiles() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_PROFILE_CACHE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) { return {}; }
}

function writeMarketProfiles(profiles) {
  try { localStorage.setItem(MARKET_PROFILE_CACHE_KEY, JSON.stringify(profiles || {})); } catch (_) {}
}

async function fetchFinnhubProfile(symbol, token) {
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(token)}`;
  const data = await fetchWithTimeout(url, 4200, 'json');
  if (!data || typeof data !== 'object') throw new Error(`${symbol}: perfil inválido`);
  return {
    symbol,
    name: data.name || data.ticker || symbol,
    logo: data.logo || '',
    marketCapitalization: Number(data.marketCapitalization) || 0,
    finnhubIndustry: data.finnhubIndustry || ''
  };
}

function normalizeProfileSector(raw = '') {
  const value = String(raw || '').toLowerCase();
  if (value.includes('semiconductor') || value.includes('technology') || value.includes('software')) return 'Servicios tecnológicos';
  if (value.includes('bank') || value.includes('financial') || value.includes('payments')) return 'Finanzas';
  if (value.includes('automobile') || value.includes('consumer')) return 'Bienes de consumo duradero';
  if (value.includes('pharmaceutical') || value.includes('health')) return 'Tecnologías sanitarias';
  if (value.includes('energy') || value.includes('oil')) return 'Energía';
  if (value.includes('retail')) return 'Comercio minorista';
  return '';
}

async function hydrateFinnhubProfiles(quotes, token) {
  if (!token || !Array.isArray(quotes) || !quotes.length) return quotes;
  const cached = readMarketProfiles();
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const missing = quotes
    .map(q => q.symbol)
    .filter(symbol => !cached[symbol] || (now - Number(cached[symbol].cachedAt || 0)) > oneWeek)
    .slice(0, 18);

  if (missing.length) {
    const profileResults = await Promise.allSettled(missing.map(symbol => fetchFinnhubProfile(symbol, token)));
    for (const item of profileResults) {
      if (item.status === 'fulfilled' && item.value?.symbol) {
        cached[item.value.symbol] = { ...item.value, cachedAt: now };
      }
    }
    writeMarketProfiles(cached);
  }

  return quotes.map(q => {
    const profile = cached[q.symbol];
    if (!profile) return q;
    const sector = normalizeProfileSector(profile.finnhubIndustry) || q.sector;
    return {
      ...q,
      name: profile.name || q.name,
      sector,
      cap: Number(profile.marketCapitalization) || q.cap,
      logo: profile.logo || q.logo
    };
  });
}


async function fetchStooqQuotes() {
  const symbols = MARKET_WATCHLIST.map(item => item.stooq).join(',');
  const url = `https://stooq.com/q/l/?s=${symbols}&f=sd2t2ohlcv&h&e=csv&_=${Date.now()}`;
  const csv = await fetchWithTimeout(url, 5200);
  const quotes = parseStooqCSV(csv);
  if (quotes.length < 6) throw new Error('Proveedor respondió pocos símbolos');
  return quotes;
}

async function fetchFinnhubQuote(symbol, token) {
  // Para producción, mover Finnhub API a backend proxy.
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(token)}`;
  const data = await fetchWithTimeout(url, 5200, 'json');
  if (!data || typeof data !== 'object') throw new Error(`${symbol}: respuesta inválida`);
  const price = Number(data.c);
  if (!Number.isFinite(price) || price <= 0) throw new Error(`${symbol}: precio inválido`);
  return enrichQuote(symbol, data, 'Finnhub');
}

async function fetchFinnhubQuotes() {
  const token = getFinnhubApiKey();
  if (!token) throw new Error('Finnhub API key no configurada');
  const tasks = MARKET_WATCHLIST.map(item => fetchFinnhubQuote(item.symbol, token));
  const results = await Promise.allSettled(tasks);
  const quotes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  if (quotes.length < Math.min(6, MARKET_WATCHLIST.length)) {
    const failed = results.filter(r => r.status === 'rejected').slice(0, 2).map(r => r.reason?.message || 'error').join(' · ');
    throw new Error(`Finnhub respondió pocos símbolos${failed ? ': ' + failed : ''}`);
  }
  try {
    return await hydrateFinnhubProfiles(quotes, token);
  } catch (_) {
    return quotes;
  }
}

function readMarketCache() {
  const keys = [MARKET_CACHE_KEY, ...MARKET_LEGACY_CACHE_KEYS];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed?.quotes?.length) return parsed;
    } catch (_) {}
  }
  return null;
}

function writeMarketCache(payload) {
  try { localStorage.setItem(MARKET_CACHE_KEY, JSON.stringify(payload)); } catch (_) {}
}


function readMarketAlerts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_ALERTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(a => a && a.symbol && a.type).slice(0, 40) : [];
  } catch (_) { return []; }
}

function writeMarketAlerts(alerts) {
  const clean = (alerts || []).filter(a => a && a.symbol && a.type).slice(0, 40);
  marketState.alerts = clean;
  try { localStorage.setItem(MARKET_ALERTS_KEY, JSON.stringify(clean)); } catch (_) {}
}

function readMarketNotes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_NOTES_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(n => n && n.text).slice(0, 30) : [];
  } catch (_) { return []; }
}

function writeMarketNotes(notes) {
  const clean = (notes || []).filter(n => n && n.text).slice(0, 30);
  marketState.notes = clean;
  try { localStorage.setItem(MARKET_NOTES_KEY, JSON.stringify(clean)); } catch (_) {}
}

function readMarketHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_HISTORY_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) { return {}; }
}

function writeMarketHistory(history) {
  try { localStorage.setItem(MARKET_HISTORY_KEY, JSON.stringify(history || {})); } catch (_) {}
}

function updateMarketHistory(quotes = []) {
  const history = readMarketHistory();
  const stamp = Date.now();
  for (const q of quotes || []) {
    if (!q?.symbol || !Number.isFinite(Number(q.price)) || Number(q.price) <= 0) continue;
    const arr = Array.isArray(history[q.symbol]) ? history[q.symbol] : [];
    const last = arr[arr.length - 1];
    if (!last || Number(last.price) !== Number(q.price) || stamp - Number(last.t || 0) > 60_000) {
      arr.push({ t: stamp, price: Number(q.price), pct: Number(q.changePercent || 0) });
    }
    history[q.symbol] = arr.slice(-24);
  }
  writeMarketHistory(history);
  marketState.priceHistory = history;
}

function getHistoryForSymbol(symbol) {
  const history = marketState.priceHistory && Object.keys(marketState.priceHistory).length ? marketState.priceHistory : readMarketHistory();
  return Array.isArray(history[String(symbol || '').toUpperCase()]) ? history[String(symbol || '').toUpperCase()] : [];
}

function renderSparkline(symbol, className = '') {
  const points = getHistoryForSymbol(symbol);
  if (points.length < 2) {
    if (String(className).includes('pro-spark')) {
      const seed = String(symbol || '').split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
      const coords = Array.from({ length: 12 }, (_, i) => {
        const x = (i / 11) * 100;
        const wave = 18 + Math.sin((i + seed) * .9) * 4 + ((seed % 7) - 3);
        return `${x.toFixed(2)},${Math.max(8, Math.min(30, wave)).toFixed(2)}`;
      }).join(' ');
      return `<svg class="sparkline up ${className}" viewBox="0 0 100 36" preserveAspectRatio="none" aria-label="Sparkline local ${safeMarketEscape(symbol)}"><polyline points="${coords}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="${coords.split(' ').pop().split(',')[1]}" r="2.8" fill="currentColor"/></svg>`;
    }
    return `<div class="sparkline-chip empty ${className}"><span>📈 Histórico local</span></div>`;
  }
  const prices = points.map(p => Number(p.price)).filter(Number.isFinite);
  const min = Math.min(...prices), max = Math.max(...prices);
  const spread = Math.max(0.0001, max - min);
  const coords = prices.map((p, i) => {
    const x = prices.length === 1 ? 50 : (i / (prices.length - 1)) * 100;
    const y = 34 - ((p - min) / spread) * 28;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  const trend = prices[prices.length - 1] >= prices[0] ? 'up' : 'down';
  return `<svg class="sparkline ${trend} ${className}" viewBox="0 0 100 36" preserveAspectRatio="none" aria-label="Histórico local ${safeMarketEscape(symbol)}"><polyline points="${coords}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}


function deterministicMiniSeries(symbol = '', pct = 0, n = 22) {
  const seed = String(symbol || '').toUpperCase().split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const direction = Number(pct || 0) >= 0 ? 1 : -1;
  const strength = Math.min(18, Math.max(4, Math.abs(Number(pct || 0)) * 2.4));
  return Array.from({ length: n }, (_, i) => {
    const t = i / Math.max(1, n - 1);
    const base = 50 - direction * strength / 2 + direction * strength * t;
    const wave = Math.sin((i + seed) * 0.92) * 4.8 + Math.cos((i * 1.7 + seed) * 0.41) * 2.6;
    const pulse = (i === n - 1) ? direction * 4.5 : 0;
    return Math.max(12, Math.min(88, base + wave + pulse));
  });
}

function renderMarketMiniChart(q, className = '') {
  const symbol = String(q?.symbol || '').toUpperCase();
  const pct = Number(q?.changePercent || 0);
  const history = getHistoryForSymbol(symbol);
  let values = history.map(p => Number(p.price)).filter(Number.isFinite);
  if (values.length < 4) values = deterministicMiniSeries(symbol, pct, 24);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(0.0001, max - min);
  const coords = values.map((v, i) => {
    const x = values.length === 1 ? 50 : (i / (values.length - 1)) * 100;
    const y = 88 - ((v - min) / spread) * 68;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  const area = `0,96 ${coords} 100,96`;
  const trend = pct >= 0 ? 'up' : 'down';
  const last = coords.split(' ').pop() || '100,50';
  const [cx, cy] = last.split(',');
  return `<svg class="market-mini-chart ${trend} ${className}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Mini gráfico ${safeMarketEscape(symbol)}">
    <defs>
      <linearGradient id="miniFill-${safeMarketEscape(symbol)}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.34"/>
        <stop offset="72%" stop-color="currentColor" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon class="mini-area" points="${area}" fill="url(#miniFill-${safeMarketEscape(symbol)})"/>
    <polyline class="mini-line mini-glow" points="${coords}" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.20"/>
    <polyline class="mini-line" points="${coords}" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle class="mini-dot" cx="${cx}" cy="${cy}" r="3.7" fill="currentColor"/>
  </svg>`;
}

function evaluateMarketAlerts(quotes = marketState.quotes || []) {
  const alerts = readMarketAlerts();
  if (!alerts.length || !quotes.length) return;
  let changed = false;
  for (const alert of alerts) {
    if (!alert.active || alert.triggeredAt) continue;
    const q = quotes.find(item => item.symbol === alert.symbol);
    if (!q) continue;
    const target = Number(alert.target);
    if (!Number.isFinite(target)) continue;
    const price = Number(q.price || 0);
    const pct = Number(q.changePercent || 0);
    let hit = false;
    if (alert.type === 'priceAbove') hit = price >= target;
    if (alert.type === 'priceBelow') hit = price <= target;
    if (alert.type === 'changeAbove') hit = pct >= target;
    if (alert.type === 'changeBelow') hit = pct <= target;
    if (!hit && typeof evaluateStrategyAlert === 'function') hit = evaluateStrategyAlert(alert, q);
    if (hit) {
      alert.triggeredAt = new Date().toISOString();
      changed = true;
      if (typeof showToast === 'function') showToast('🚨 Alerta local activada', `${alert.symbol} alcanzó ${describeAlertTarget(alert)}.`);
    }
  }
  if (changed) writeMarketAlerts(alerts);
}

function describeAlertTarget(alert) {
  const value = Number(alert.target);
  if (alert.type === 'priceAbove') return `precio ≥ ${formatUSD(value)}`;
  if (alert.type === 'priceBelow') return `precio ≤ ${formatUSD(value)}`;
  if (alert.type === 'changeAbove') return `cambio ≥ ${formatPercent(value)}`;
  if (alert.type === 'changeBelow') return `cambio ≤ ${formatPercent(value)}`;
  if (typeof describeStrategyAlert === 'function') {
    const strategyDescription = describeStrategyAlert(alert);
    if (strategyDescription) return strategyDescription;
  }
  return String(alert.target || 'objetivo');
}

function createMarketAlert(symbol) {
  const sym = String(symbol || '').toUpperCase();
  const type = document.getElementById(`alert-type-${sym}`)?.value || 'priceAbove';
  const raw = document.getElementById(`alert-target-${sym}`)?.value || '';
  const target = Number(String(raw).replace(',', '.'));
  if (!sym || !Number.isFinite(target)) {
    if (typeof showToast === 'function') showToast('⚠️ Alerta inválida', 'Escribe un precio o porcentaje válido.');
    return;
  }
  const alerts = readMarketAlerts();
  const alert = { id: `al_${Date.now()}_${Math.random().toString(16).slice(2)}`, symbol: sym, type, target, active: true, createdAt: new Date().toISOString(), triggeredAt: '' };
  writeMarketAlerts([alert, ...alerts]);
  if (typeof showToast === 'function') showToast('🚨 Alerta creada', `${sym}: ${describeAlertTarget(alert)}`);
  renderMarketContent();
}

function deleteMarketAlert(id) {
  writeMarketAlerts(readMarketAlerts().filter(a => a.id !== id));
  renderMarketContent();
}

function resetMarketAlert(id) {
  const alerts = readMarketAlerts().map(a => a.id === id ? { ...a, triggeredAt: '', active: true } : a);
  writeMarketAlerts(alerts);
  renderMarketContent();
}

function addMarketNote() {
  const input = document.getElementById('market-note-input');
  const text = String(input?.value || '').trim();
  if (text.length < 4) {
    if (typeof showToast === 'function') showToast('📝 Nota vacía', 'Escribe una observación de mercado antes de guardar.');
    return;
  }
  const notes = readMarketNotes();
  writeMarketNotes([{ id: `note_${Date.now()}`, text, createdAt: new Date().toISOString(), sentiment: marketSentiment().label }, ...notes]);
  if (input) input.value = '';
  if (typeof showToast === 'function') showToast('📝 Nota guardada', 'Tu observación quedó guardada localmente.');
  renderMarketContent();
}

function deleteMarketNote(id) {
  writeMarketNotes(readMarketNotes().filter(n => n.id !== id));
  renderMarketContent();
}

function readUserWatchlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_WATCHLIST_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(s => String(s).toUpperCase()) : [];
  } catch (_) { return []; }
}

function writeUserWatchlist(list) {
  const clean = [...new Set((list || []).filter(Boolean).map(s => String(s).toUpperCase()))];
  marketState.userWatchlist = clean;
  try { localStorage.setItem(MARKET_WATCHLIST_KEY, JSON.stringify(clean)); } catch (_) {}
}

function isInUserWatchlist(symbol) { return marketState.userWatchlist.includes(String(symbol).toUpperCase()); }

function toggleWatchlist(symbol) {
  const value = String(symbol || '').toUpperCase();
  if (!value) return;
  const current = readUserWatchlist();
  const next = current.includes(value) ? current.filter(s => s !== value) : [...current, value];
  writeUserWatchlist(next);
  if (typeof showToast === 'function') showToast(current.includes(value) ? '☆ Quitado de Watchlist' : '⭐ Agregado a Watchlist', value);
  renderMarketContent();
}

function getQuoteBySymbol(symbol) {
  const value = String(symbol || '').toUpperCase();
  return (marketState.quotes || []).find(q => q.symbol === value) || null;
}

function inferMarketProvider(source = '') {
  const value = String(source || '').toLowerCase();
  if (value.startsWith('finnhub')) return 'finnhub';
  if (value.startsWith('stooq')) return 'stooq';
  if (value.includes('caché') || value.includes('cache')) return 'cache';
  if (value.includes('demo')) return 'demo';
  return 'none';
}

function isFinnhubLiveMarket() {
  return marketState.status === 'live' && (marketState.provider === 'finnhub' || inferMarketProvider(marketState.source) === 'finnhub');
}

async function loadMarketQuotes(force = false) {
  marketState.userWatchlist = readUserWatchlist();
  marketState.alerts = readMarketAlerts();
  marketState.notes = readMarketNotes();
  marketState.priceHistory = readMarketHistory();
  marketState.detailSymbol = marketState.detailSymbol || readSelectedSymbol();
  const cached = readMarketCache();
  if (!force && cached && Date.now() - new Date(cached.updatedAt).getTime() < MARKET_TTL_MS) {
    marketState = {
      ...marketState,
      quotes: cached.quotes,
      status: 'cached',
      source: cached.source || 'Caché local',
      provider: cached.provider || inferMarketProvider(cached.source),
      updatedAt: cached.updatedAt
    };
    updateMarketHistory(cached.quotes);
    evaluateMarketAlerts(cached.quotes);
    return marketState;
  }
  marketState.status = 'loading';
  renderMarketContent();
  try {
    let quotes;
    let source;
    let provider;
    try {
      quotes = await fetchFinnhubQuotes();
      source = 'Finnhub live';
      provider = 'finnhub';
    } catch (finnhubError) {
      quotes = await fetchStooqQuotes();
      source = hasFinnhubKey() ? `Stooq live · Finnhub fallback: ${String(finnhubError.message || 'no disponible').slice(0, 90)}` : 'Stooq live · Finnhub sin configurar';
      provider = 'stooq';
    }
    const payload = { quotes, status: 'live', source, provider, updatedAt: new Date().toISOString(), version: MARKET_VERSION };
    writeMarketCache(payload);
    marketState = { ...marketState, ...payload };
    updateMarketHistory(quotes);
    evaluateMarketAlerts(quotes);
    return marketState;
  } catch (err) {
    if (cached?.quotes?.length) {
      marketState = {
        ...marketState,
        quotes: cached.quotes,
        status: 'cached',
        source: `Caché local · ${String(err.message || 'sin conexión')}`,
        provider: 'cache',
        updatedAt: cached.updatedAt
      };
      updateMarketHistory(cached.quotes);
      evaluateMarketAlerts(cached.quotes);
      return marketState;
    }
    marketState = { ...marketState, quotes: demoQuotes('demo'), status: 'demo', source: 'Demo local · proveedor live no disponible', provider: 'demo', updatedAt: new Date().toISOString(), error: String(err.message || err) };
    updateMarketHistory(marketState.quotes);
    evaluateMarketAlerts(marketState.quotes);
    return marketState;
  }
}

function getVisibleQuotes() {
  const query = String(marketState.query || '').trim().toLowerCase();
  const filter = marketState.filter || 'all';
  return (marketState.quotes || [])
    .filter(q => filter === 'all' || q.sector === filter)
    .filter(q => !query || q.symbol.toLowerCase().includes(query) || q.name.toLowerCase().includes(query) || q.sector.toLowerCase().includes(query));
}

function marketSectors() { return [...new Set(MARKET_WATCHLIST.map(item => item.sector))]; }

function marketSectorStats(quotes = marketState.quotes || []) {
  const groups = {};
  for (const q of quotes) {
    if (!groups[q.sector]) groups[q.sector] = { sector: q.sector, count: 0, avg: 0, positive: 0, negative: 0, cap: 0, leader: q };
    const g = groups[q.sector];
    g.count += 1;
    g.avg += Number(q.changePercent || 0);
    g.cap += Number(q.cap || 0);
    if (Number(q.changePercent) > 0) g.positive += 1;
    if (Number(q.changePercent) < 0) g.negative += 1;
    if (Number(q.changePercent || 0) > Number(g.leader?.changePercent || -999)) g.leader = q;
  }
  return Object.values(groups).map(g => ({ ...g, avg: g.count ? g.avg / g.count : 0 })).sort((a, b) => b.avg - a.avg);
}

function marketSentiment(quotes = marketState.quotes || []) {
  const total = Math.max(1, quotes.length);
  const up = quotes.filter(q => Number(q.changePercent) > 0.15).length;
  const down = quotes.filter(q => Number(q.changePercent) < -0.15).length;
  const flat = total - up - down;
  const avg = quotes.reduce((sum, q) => sum + Number(q.changePercent || 0), 0) / total;
  const strongest = [...quotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent))[0];
  const weakest = [...quotes].sort((a, b) => Number(a.changePercent) - Number(b.changePercent))[0];
  const sectors = marketSectorStats(quotes);
  const bestSector = sectors[0];
  const worstSector = sectors[sectors.length - 1];
  let label = 'Mercado mixto';
  let tone = 'neutral';
  if (up / total >= 0.62 && avg > 0.25) { label = 'Alcista moderado'; tone = 'bullish'; }
  else if (down / total >= 0.62 && avg < -0.25) { label = 'Bajista moderado'; tone = 'bearish'; }
  else if (avg > 0.15) { label = 'Sesgo positivo selectivo'; tone = 'bullish'; }
  else if (avg < -0.15) { label = 'Sesgo negativo selectivo'; tone = 'bearish'; }
  return { total, up, down, flat, avg, strongest, weakest, sectors, bestSector, worstSector, label, tone };
}

function buildMarketAgentText() {
  const s = marketSentiment();
  const leader = s.strongest ? `${s.strongest.symbol} ${formatPercent(s.strongest.changePercent)}` : 'sin líder';
  const weak = s.weakest ? `${s.weakest.symbol} ${formatPercent(s.weakest.changePercent)}` : 'sin débil';
  const bestSector = s.bestSector ? `${shortSector(s.bestSector.sector)} ${formatPercent(s.bestSector.avg)}` : 'sin sector';
  const worstSector = s.worstSector ? `${shortSector(s.worstSector.sector)} ${formatPercent(s.worstSector.avg)}` : 'sin sector';
  if (s.tone === 'bullish') {
    return `Lectura educativa: ${s.label}. Hay ${s.up} símbolos positivos de ${s.total} y el promedio del panel es ${formatPercent(s.avg)}. Lidera ${leader}. Sector fuerte: ${bestSector}. Observa si la fuerza se mantiene entre sectores antes de sacar conclusiones.`;
  }
  if (s.tone === 'bearish') {
    return `Lectura educativa: ${s.label}. Hay ${s.down} símbolos negativos de ${s.total} y el promedio del panel es ${formatPercent(s.avg)}. Debilidad principal: ${weak}. Sector más débil: ${worstSector}. Prioriza gestión de riesgo y contexto, no señales aisladas.`;
  }
  return `Lectura educativa: ${s.label}. Hay ${s.up} verdes, ${s.down} rojas y ${s.flat} neutrales. Líder: ${leader}. Más débil: ${weak}. El mercado no muestra consenso total; conviene comparar sector, volumen y contexto antes de tomar decisiones.`;
}

function readSelectedSymbol() {
  try { return String(localStorage.getItem(MARKET_DETAIL_KEY) || '').toUpperCase(); }
  catch (_) { return ''; }
}

function selectStock(symbol) {
  marketState.detailSymbol = String(symbol || '').toUpperCase();
  try { localStorage.setItem(MARKET_DETAIL_KEY, marketState.detailSymbol); } catch (_) {}
  renderMarketContent();
  setTimeout(() => document.getElementById('stock-detail-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function closeStockDetail() {
  marketState.detailSymbol = '';
  try { localStorage.removeItem(MARKET_DETAIL_KEY); } catch (_) {}
  renderMarketContent();
}

function renderMarket() {
  marketState.userWatchlist = readUserWatchlist();
  marketState.detailSymbol = readSelectedSymbol();
  mainContainer.innerHTML = `
    <section class="panel-card market-shell">
      <div class="card-topline">
        <div>
          <span class="eyebrow">MARKET OPS · PRO CENTER</span>
          <h1 class="section-heading">Acciones Pro</h1>
        </div>
        <span class="status-pill green">FINNHUB</span>
      </div>
      <p class="hero-subtitle">Mapa de calor, sentimiento, scanner, watchlist, alertas locales, notas, sparkline, sectores avanzados y Market Agent local con datos en vivo/caché. Módulo educativo: no constituye asesoría financiera.</p>
      <div class="market-api-box">
        <div>
          <span class="eyebrow">FINNHUB API</span>
          <strong>${hasFinnhubKey() ? 'Conectada' : 'No configurada'}</strong>
          <small>${hasFinnhubKey() ? 'Key local: ' + maskFinnhubKey() : 'Pega tu key para datos live prioritarios.'}</small>
        </div>
        <input id="finnhub-key-input" class="market-api-input" placeholder="Pega tu API key de Finnhub" value="">
        <div class="market-api-actions">
          <button class="btn btn-success" onclick="saveFinnhubKeyFromInput()">GUARDAR API</button>
          <button class="btn btn-outline" onclick="clearFinnhubKey()">BORRAR</button>
        </div>
      </div>
      <div class="market-actions">
        <button class="btn btn-success" onclick="refreshMarket(true)">↻ ACTUALIZAR</button>
        <button class="btn btn-outline" onclick="renderView('courses')">VOLVER A RUTAS</button>
      </div>
      <div class="market-status" id="market-status-box">Inicializando feed...</div>
    </section>
    <section id="market-content" class="market-content">
      <div class="panel-card"><div class="loader small"></div><p class="hero-subtitle">Cargando datos de acciones...</p></div>
    </section>
    <div class="bottom-spacer"></div>
  `;
  refreshMarket(false);
}

function renderMarketContent() {
  const host = document.getElementById('market-content');
  const statusBox = document.getElementById('market-status-box');
  if (!host) return;
  marketState.userWatchlist = readUserWatchlist();
  marketState.alerts = readMarketAlerts();
  marketState.notes = readMarketNotes();
  marketState.priceHistory = readMarketHistory();
  const quotes = getVisibleQuotes();
  const allQuotes = marketState.quotes || [];
  const sectors = marketSectors();
  const totalCap = Math.max(1, quotes.reduce((sum, q) => sum + Number(q.cap || 0), 0));
  const sentiment = marketSentiment(allQuotes);
  const gainers = [...allQuotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent)).slice(0, 4);
  const losers = [...allQuotes].sort((a, b) => Number(a.changePercent) - Number(b.changePercent)).slice(0, 4);
  const watchQuotes = marketState.userWatchlist.map(getQuoteBySymbol).filter(Boolean);
  const selected = getQuoteBySymbol(marketState.detailSymbol) || quotes[0] || null;
  const sourceLabel = marketState.status === 'live' ? 'DATOS EN VIVO' : marketState.status === 'cached' ? 'CACHÉ LOCAL' : marketState.status === 'loading' ? 'CARGANDO' : 'MODO DEMO';
  if (statusBox) {
    statusBox.innerHTML = `
      <span class="market-dot ${marketState.status === 'live' ? 'online' : 'offline'}"></span>
      <strong>${sourceLabel}</strong>
      <small>${safeMarketEscape(marketState.source || 'Pendiente')} · ${formatMarketTime(marketState.updatedAt)}</small>
    `;
  }
  host.innerHTML = `
    <section class="panel-card market-intel-card market-sentiment-card ${sentiment.tone}">
      <div class="card-topline compact">
        <div>
          <span class="eyebrow">SENTIMIENTO DEL MERCADO</span>
          <h2>${safeMarketEscape(sentiment.label)}</h2>
        </div>
        <span class="status-pill ${sentiment.tone === 'bearish' ? 'danger' : sentiment.tone === 'bullish' ? 'green' : ''}">${formatPercent(sentiment.avg)}</span>
      </div>
      <div class="market-sentiment-grid">
        <div><strong>${sentiment.up}</strong><small>Verdes</small></div>
        <div><strong>${sentiment.down}</strong><small>Rojas</small></div>
        <div><strong>${sentiment.flat}</strong><small>Neutras</small></div>
      </div>
      <p class="market-agent-text">${safeMarketEscape(buildMarketAgentText())}</p>
    </section>

    <section class="panel-card market-scanner">
      ${sectionTitle('Scanner del mercado', 'TOP')}
      <div class="scanner-grid">
        <div class="scanner-box">
          <span class="eyebrow">Top ganadoras</span>
          ${gainers.map(q => renderMiniQuote(q)).join('')}
        </div>
        <div class="scanner-box">
          <span class="eyebrow">Top perdedoras</span>
          ${losers.map(q => renderMiniQuote(q)).join('')}
        </div>
      </div>
    </section>

    ${renderAdvancedSectors(sentiment)}

    <section class="panel-card market-controls">
      <input class="market-search" placeholder="Buscar acción, sector o símbolo..." value="${safeMarketEscape(marketState.query || '')}" oninput="setMarketQuery(this.value)">
      <div class="market-filters">
        <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos</button>
        ${sectors.map(sector => `<button class="filter-pill ${marketState.filter === sector ? 'active' : ''}" onclick="setMarketFilter('${safeMarketEscape(sector)}')">${safeMarketEscape(shortSector(sector))}</button>`).join('')}
      </div>
    </section>

    <section class="panel-card">
      ${sectionTitle('Mapa de calor', `${quotes.length} símbolos`)}
      <div class="stock-heatmap">
        ${quotes.map(q => renderHeatTile(q, totalCap)).join('') || `<div class="empty-state">Sin resultados para el filtro actual.</div>`}
      </div>
      <div class="heat-legend"><span>-3%</span><div></div><span>0%</span><div></div><span>+3%</span></div>
    </section>

    ${selected ? renderStockDetail(selected) : ''}

    <section class="panel-card">
      ${sectionTitle('Mi Watchlist', `${watchQuotes.length} símbolos`)}
      ${watchQuotes.length ? `<div class="watchlist-strip">${watchQuotes.map(renderWatchChip).join('')}</div>` : `<div class="empty-state">Toca una acción y usa ⭐ Seguir para crear tu lista personal.</div>`}
    </section>

    <section class="panel-card">
      ${sectionTitle('Lista de seguimiento', marketState.status === 'live' ? 'LIVE' : 'TRAINING')}
      <div class="stock-table">
        ${quotes.map(renderStockRow).join('') || `<div class="empty-state">No hay acciones visibles.</div>`}
      </div>
    </section>

    ${renderMarketAlertsPanel()}

    ${renderMarketNotesPanel()}

    <section class="panel-card compact-panel">
      ${sectionTitle('Market Agent local', 'EDUCATIVO')}
      <p class="hero-subtitle">${safeMarketEscape(buildMarketAgentText())}</p>
      <div class="market-agent-actions">
        <button class="btn btn-outline" onclick="setMarketFilter('all')">VER TODO</button>
        <button class="btn btn-outline" onclick="document.getElementById('market-note-input')?.focus()">CREAR NOTA</button>
      </div>
    </section>
  `;
}


function renderAdvancedSectors(sentiment = marketSentiment()) {
  const sectors = sentiment.sectors || [];
  return `<section class="panel-card sector-advanced">
    ${sectionTitle('Sectores avanzados', `${sectors.length} sectores`)}
    <div class="sector-summary-grid">
      <div><small>Sector fuerte</small><strong>${safeMarketEscape(shortSector(sentiment.bestSector?.sector || '—'))}</strong><span>${formatPercent(sentiment.bestSector?.avg || 0)}</span></div>
      <div><small>Sector débil</small><strong>${safeMarketEscape(shortSector(sentiment.worstSector?.sector || '—'))}</strong><span>${formatPercent(sentiment.worstSector?.avg || 0)}</span></div>
      <div><small>Líder</small><strong>${safeMarketEscape(sentiment.strongest?.symbol || '—')}</strong><span>${formatPercent(sentiment.strongest?.changePercent || 0)}</span></div>
    </div>
    <div class="sector-list">
      ${sectors.map(renderSectorRow).join('') || `<div class="empty-state">Sin datos sectoriales.</div>`}
    </div>
  </section>`;
}

function renderSectorRow(sector) {
  const avg = Number(sector.avg || 0);
  const width = Math.min(100, Math.max(4, Math.abs(avg) * 18));
  return `<button class="sector-row ${quoteClass(avg)}" onclick="setMarketFilter('${safeMarketEscape(sector.sector)}')">
    <div><strong>${safeMarketEscape(shortSector(sector.sector))}</strong><small>${sector.positive} verdes · ${sector.negative} rojas · líder ${safeMarketEscape(sector.leader?.symbol || '—')}</small></div>
    <div class="sector-meter"><span style="width:${width}%"></span></div>
    <b>${formatPercent(avg)}</b>
  </button>`;
}

function renderMarketAlertsPanel() {
  const alerts = readMarketAlerts();
  return `<section class="panel-card market-alerts-panel">
    ${sectionTitle('Alertas locales', `${alerts.length} alertas`)}
    <p class="hero-subtitle small-text">Las alertas se guardan en este navegador y se evalúan al actualizar el feed. Son educativas y no reemplazan una plataforma profesional.</p>
    <div class="alerts-list">
      ${alerts.length ? alerts.map(renderAlertItem).join('') : `<div class="empty-state">Toca una acción y crea una alerta por precio o cambio porcentual.</div>`}
    </div>
  </section>`;
}

function renderAlertItem(alert) {
  const triggered = Boolean(alert.triggeredAt);
  return `<article class="alert-item ${triggered ? 'triggered' : ''}">
    <div><strong>${safeMarketEscape(alert.symbol)}</strong><small>${safeMarketEscape(describeAlertTarget(alert))}</small></div>
    <span class="status-pill ${triggered ? 'green' : ''}">${triggered ? 'ACTIVADA' : 'VIGILANDO'}</span>
    <div class="alert-actions">
      ${triggered ? `<button onclick="resetMarketAlert('${safeMarketEscape(alert.id)}')">REARMAR</button>` : ''}
      <button onclick="deleteMarketAlert('${safeMarketEscape(alert.id)}')">BORRAR</button>
    </div>
  </article>`;
}

function renderMarketNotesPanel() {
  const notes = readMarketNotes();
  return `<section class="panel-card market-notes-panel">
    ${sectionTitle('Notas de mercado', `${notes.length} notas`)}
    <textarea id="market-note-input" class="market-note-input" placeholder="Ejemplo: Tech mixto; NVDA fuerte pero AAPL débil. Observar confirmación sectorial."></textarea>
    <button class="btn btn-success full" onclick="addMarketNote()">GUARDAR NOTA</button>
    <div class="notes-list">
      ${notes.length ? notes.slice(0, 6).map(renderMarketNoteItem).join('') : `<div class="empty-state">Guarda observaciones para construir tu diario educativo de mercado.</div>`}
    </div>
  </section>`;
}

function renderMarketNoteItem(note) {
  return `<article class="market-note-item">
    <div><strong>${safeMarketEscape(note.sentiment || 'Nota')}</strong><small>${formatMarketTime(note.createdAt)}</small></div>
    <p>${safeMarketEscape(note.text)}</p>
    <button onclick="deleteMarketNote('${safeMarketEscape(note.id)}')">Eliminar</button>
  </article>`;
}

function renderMiniQuote(q) {
  return `<button class="mini-quote ${quoteClass(q.changePercent)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <span>${safeMarketEscape(q.symbol)}</span><strong>${formatPercent(q.changePercent)}</strong>
  </button>`;
}

function renderWatchChip(q) {
  return `<button class="watch-chip ${quoteClass(q.changePercent)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <strong>${safeMarketEscape(q.symbol)}</strong><span>${formatPercent(q.changePercent)}</span>
  </button>`;
}


function shortCompanyName(name = '') {
  return String(name)
    .replace('Corporation', 'Corp.')
    .replace('Incorporated', 'Inc.')
    .replace('Class A', '')
    .replace('Class C', '')
    .replace('Platforms Inc.', 'Platforms')
    .replace('Amazon.com Inc.', 'Amazon.com Inc.')
    .trim();
}

function brandLogo(q) {
  const symbol = String(q?.symbol || '').toUpperCase();
  const meta = marketMeta(symbol);
  const fallback = safeMarketEscape(q?.icon || meta.icon || symbol.slice(0, 2));
  const logoUrl = String(q?.logo || meta.logo || '').trim();
  if (logoUrl) {
    return `<span class="brand-logo brand-${safeMarketEscape(symbol)} has-real-logo forced-brand-logo" aria-label="${safeMarketEscape(symbol)} logo"><img src="${safeMarketEscape(logoUrl)}" alt="${safeMarketEscape(symbol)}" loading="eager" decoding="async" onerror="this.closest('.brand-logo').classList.add('logo-failed'); this.remove();"><b>${fallback}</b></span>`;
  }
  return `<span class="brand-logo brand-${safeMarketEscape(symbol)} forced-brand-logo" aria-label="${safeMarketEscape(symbol)} logo"><b>${fallback}</b></span>`;
}

function renderHeatTile(q, totalCap) {
  const pct = Number(q.changePercent || 0);
  const capShare = Math.max(0, Math.min(1, Number(q.cap || 1) / Math.max(1, totalCap)));
  const height = Math.round(224 + capShare * 44);
  const cls = quoteClass(pct);
  const strength = Math.min(100, Math.max(8, Math.round(Math.abs(pct) * 12)));
  return `<article class="stock-tile market-pro-tile ${cls}" style="min-height:${height}px" title="${safeMarketEscape(q.name)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <div class="tile-noise" aria-hidden="true"></div>
    <header class="tile-head">
      ${brandLogo(q)}
      <div class="tile-title">
        <strong>${safeMarketEscape(q.symbol)}</strong>
        <small>${safeMarketEscape(shortCompanyName(q.name))}</small>
      </div>
    </header>
    <div class="tile-metrics">
      <span class="tile-change">${formatPercent(pct)}</span>
      <small>${formatUSD(q.price)}</small>
    </div>
    <div class="tile-chart">
      ${renderMarketMiniChart(q, 'tile-spark pro-spark')}
    </div>
    <div class="tile-strength"><span style="width:${strength}%"></span></div>
  </article>`;
}

function renderStockRow(q) {
  const cls = quoteClass(q.changePercent);
  return `<article class="stock-row ${cls}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <div class="stock-row-left">${brandLogo(q)}<div><strong>${safeMarketEscape(q.symbol)}</strong><small>${safeMarketEscape(q.name)}</small></div></div>
    <div class="stock-row-mid"><strong>${formatUSD(q.price)}</strong><small>${safeMarketEscape(shortSector(q.sector))}</small>${renderSparkline(q.symbol, 'row-spark')}</div>
    <div class="stock-change">${formatPercent(q.changePercent)}</div>
  </article>`;
}

function renderStockDetail(q) {
  const pct = Number(q.changePercent || 0);
  const isWatch = isInUserWatchlist(q.symbol);
  const bias = pct > 0.7 ? 'Fuerza positiva' : pct < -0.7 ? 'Presión negativa' : 'Movimiento neutral';
  return `<section class="panel-card stock-detail" id="stock-detail-card">
    <div class="card-topline compact">
      <div class="stock-detail-head">
        <span class="stock-detail-icon">${safeMarketEscape(q.icon)}</span>
        <div><span class="eyebrow">DETALLE DE ACCIÓN</span><h2>${safeMarketEscape(q.symbol)}</h2><small>${safeMarketEscape(q.name)}</small></div>
      </div>
      <button class="icon-btn" onclick="closeStockDetail()">×</button>
    </div>
    <div class="stock-detail-price ${quoteClass(pct)}">
      <strong>${formatUSD(q.price)}</strong>
      <span>${formatPercent(pct)}</span>
    </div>
    <div class="detail-sparkline-wrap">
      <span class="eyebrow">SPARKLINE LOCAL</span>
      ${renderSparkline(q.symbol, 'detail-spark')}
    </div>
    <div class="stock-detail-grid">
      <div><small>Sector</small><strong>${safeMarketEscape(shortSector(q.sector))}</strong></div>
      <div><small>Sesgo</small><strong>${bias}</strong></div>
      <div><small>Apertura</small><strong>${formatUSD(q.open)}</strong></div>
      <div><small>Máximo</small><strong>${formatUSD(q.high)}</strong></div>
      <div><small>Mínimo</small><strong>${formatUSD(q.low)}</strong></div>
      <div><small>Volumen</small><strong>${formatLargeNumber(q.volume)}</strong></div>
    </div>
    <div class="market-detail-agent">
      <span class="eyebrow">LECTURA DEL MARKET AGENT</span>
      <p>${safeMarketEscape(describeSingleStock(q))}</p>
    </div>
    <div class="stock-alert-builder">
      <span class="eyebrow">CREAR ALERTA LOCAL</span>
      <div class="alert-builder-grid">
        <select id="alert-type-${safeMarketEscape(q.symbol)}">
          <option value="priceAbove">Precio ≥</option>
          <option value="priceBelow">Precio ≤</option>
          <option value="changeAbove">Cambio % ≥</option>
          <option value="changeBelow">Cambio % ≤</option>
        </select>
        <input id="alert-target-${safeMarketEscape(q.symbol)}" type="number" step="0.01" placeholder="Objetivo">
        <button class="btn btn-success" onclick="createMarketAlert('${safeMarketEscape(q.symbol)}')">ACTIVAR</button>
      </div>
    </div>
    <div class="market-actions detail-actions">
      <button class="btn ${isWatch ? 'btn-outline' : 'btn-success'}" onclick="toggleWatchlist('${safeMarketEscape(q.symbol)}')">${isWatch ? '☆ QUITAR' : '⭐ SEGUIR'}</button>
      <button class="btn btn-outline" onclick="setMarketFilter('${safeMarketEscape(q.sector)}')">VER SECTOR</button>
    </div>
  </section>`;
}

function describeSingleStock(q) {
  const pct = Number(q.changePercent || 0);
  const sectorStats = marketSectorStats().find(s => s.sector === q.sector);
  const sectorText = sectorStats ? `Su sector promedia ${formatPercent(sectorStats.avg)}.` : 'Sector sin promedio disponible.';
  if (pct > 1.5) return `${q.symbol} muestra fuerza relativa positiva con ${formatPercent(pct)}. ${sectorText} Lectura educativa: observa si el movimiento está acompañado por fortaleza sectorial y no solo por una vela aislada.`;
  if (pct < -1.5) return `${q.symbol} presenta presión negativa con ${formatPercent(pct)}. ${sectorText} Lectura educativa: compara el movimiento con el sector y evita interpretar una caída aislada como tendencia sin contexto.`;
  return `${q.symbol} está en movimiento moderado con ${formatPercent(pct)}. ${sectorText} Lectura educativa: clasifica el activo como observación hasta que el contexto sectorial y el mercado general confirmen dirección.`;
}

function shortSector(sector) {
  return String(sector || '').replace('Tecnología electrónica', 'Tech').replace('Servicios tecnológicos', 'Servicios Tech').replace('Comercio minorista', 'Retail').replace('Tecnologías sanitarias', 'Salud').replace('Fabricación de productos', 'Industria');
}

function setMarketQuery(value) {
  marketState.query = String(value || '');
  renderMarketContent();
}

function setMarketFilter(value) {
  marketState.filter = value || 'all';
  renderMarketContent();
}

function renderMarketNote() {
  if (typeof showToast === 'function') showToast('🧠 Market Agent', buildMarketAgentText().slice(0, 140));
}

async function refreshMarket(force = true) {
  await loadMarketQuotes(force);
  renderMarketContent();
  if (force && typeof showToast === 'function') {
    showToast(marketState.status === 'live' ? '📈 Acciones actualizadas' : '📊 Feed alternativo activo', `${marketState.source} · ${formatMarketTime(marketState.updatedAt)}`);
  }
}
