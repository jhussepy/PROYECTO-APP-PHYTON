/* PySec Academy Elite v9.8.2 - Market Dashboard Alignment
   Reestructura Acciones Pro hacia un panel tipo terminal financiera: portfolio, gauge de sentimiento,
   acciones rápidas, heatmap compacto con logos reales/locales, mini gráficos y AI insight. */

const MARKET_COMMAND_BUILD = '9.8.2';


/* v9.8.2 · Market Dashboard Alignment
   Portafolio real del usuario: solo empresas elegidas por el alumno, con shares/costo promedio y lectura local. */
const MARKET_PORTFOLIO_KEY_V97 = 'pysec_market_portfolio_v97';
let portfolioEditorOpen = false;

function readMarketPortfolio() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MARKET_PORTFOLIO_KEY_V97) || '[]');
    return Array.isArray(parsed)
      ? parsed.map(item => ({
          symbol: String(item.symbol || '').toUpperCase().trim(),
          shares: Math.max(0, Number(item.shares || 0)),
          avgCost: Math.max(0, Number(item.avgCost || 0))
        })).filter(item => item.symbol && item.shares > 0)
      : [];
  } catch (_) { return []; }
}

function writeMarketPortfolio(list) {
  const clean = [];
  const seen = new Map();
  for (const raw of list || []) {
    const symbol = String(raw.symbol || '').toUpperCase().trim();
    const shares = Math.max(0, Number(raw.shares || 0));
    const avgCost = Math.max(0, Number(raw.avgCost || 0));
    if (!symbol || shares <= 0) continue;
    if (seen.has(symbol)) {
      const prev = seen.get(symbol);
      const totalShares = prev.shares + shares;
      const weightedCost = totalShares ? ((prev.avgCost * prev.shares) + (avgCost * shares)) / totalShares : avgCost;
      seen.set(symbol, { symbol, shares: totalShares, avgCost: weightedCost });
    } else seen.set(symbol, { symbol, shares, avgCost });
  }
  for (const item of seen.values()) clean.push(item);
  try { localStorage.setItem(MARKET_PORTFOLIO_KEY_V97, JSON.stringify(clean)); } catch (_) {}
  return clean;
}

function addPortfolioHolding() {
  const symbol = String(document.getElementById('portfolio-symbol')?.value || '').toUpperCase().trim();
  const shares = Number(document.getElementById('portfolio-shares')?.value || 0);
  const avgCost = Number(document.getElementById('portfolio-avgcost')?.value || 0);
  const quote = getQuoteBySymbol(symbol) || marketMeta(symbol);
  if (!symbol || !quote) {
    if (typeof showToast === 'function') showToast('⚠️ Empresa inválida', 'Elige una empresa del panel de acciones.');
    return;
  }
  if (!Number.isFinite(shares) || shares <= 0) {
    if (typeof showToast === 'function') showToast('⚠️ Cantidad inválida', 'Ingresa cuántas acciones quieres registrar.');
    return;
  }
  const safeAvg = Number.isFinite(avgCost) && avgCost > 0 ? avgCost : Number(getQuoteBySymbol(symbol)?.price || 0);
  writeMarketPortfolio([...readMarketPortfolio(), { symbol, shares, avgCost: safeAvg }]);
  if (typeof writeUserWatchlist === 'function') writeUserWatchlist([...readUserWatchlist(), symbol]);
  if (typeof showToast === 'function') showToast('💼 Empresa agregada', `${symbol} añadido a Mi Portafolio.`);
  renderMarketContent();
}

function quickAddPortfolio(symbol) {
  const quote = getQuoteBySymbol(symbol) || marketMeta(symbol);
  writeMarketPortfolio([...readMarketPortfolio(), { symbol, shares: 1, avgCost: Number(quote.price || 0) }]);
  if (typeof writeUserWatchlist === 'function') writeUserWatchlist([...readUserWatchlist(), symbol]);
  if (typeof showToast === 'function') showToast('⚡ Añadido rápido', `${symbol} agregado con 1 acción.`);
  renderMarketContent();
}

function removePortfolioHolding(symbol) {
  const target = String(symbol || '').toUpperCase();
  writeMarketPortfolio(readMarketPortfolio().filter(item => item.symbol !== target));
  if (typeof showToast === 'function') showToast('🧹 Portafolio actualizado', `${target} eliminado.`);
  renderMarketContent();
}

function clearMarketPortfolio() {
  writeMarketPortfolio([]);
  if (typeof showToast === 'function') showToast('🧹 Portafolio limpio', 'Ya puedes agregar solo las empresas que deseas.');
  renderMarketContent();
}

function getPortfolioRows() {
  return readMarketPortfolio().map(item => {
    const q = getQuoteBySymbol(item.symbol) || normalizeQuote(item.symbol, item.avgCost, 0, 'portfolio');
    const price = Number(q.price || item.avgCost || 0);
    const value = item.shares * price;
    const cost = item.shares * Number(item.avgCost || price || 0);
    const totalPnl = value - cost;
    const dayPct = Number(q.changePercent || 0);
    const prevPrice = price / (1 + (dayPct / 100 || 0));
    const dayPnl = item.shares * (price - prevPrice);
    return { ...item, quote: q, price, value, cost, totalPnl, dayPnl, dayPct };
  });
}

function portfolioSummary() {
  const rows = getPortfolioRows();
  const value = rows.reduce((s, r) => s + r.value, 0);
  const cost = rows.reduce((s, r) => s + r.cost, 0);
  const dayPnl = rows.reduce((s, r) => s + r.dayPnl, 0);
  const totalPnl = value - cost;
  const dayPct = value ? (dayPnl / Math.max(1, value - dayPnl)) * 100 : 0;
  const totalPct = cost ? (totalPnl / cost) * 100 : 0;
  const best = rows.slice().sort((a,b) => b.dayPct - a.dayPct)[0] || null;
  const worst = rows.slice().sort((a,b) => a.dayPct - b.dayPct)[0] || null;
  return { rows, value, cost, dayPnl, totalPnl, dayPct, totalPct, best, worst };
}

function renderPortfolioManager() {
  const holdings = readMarketPortfolio();
  const rows = getPortfolioRows();
  const options = (marketState.quotes?.length ? marketState.quotes : MARKET_WATCHLIST)
    .map(q => `<option value="${safeMarketEscape(q.symbol)}">${safeMarketEscape(q.symbol)} · ${safeMarketEscape(shortCompanyName(q.name))}</option>`).join('');
  const quick = ['NVDA','AAPL','MSFT','GOOGL','META','AMZN','TSLA','AMD'].map(symbol =>
    `<button type="button" onclick="quickAddPortfolio('${symbol}')">${symbol}</button>`).join('');
  return `<section class="pro-portfolio-manager">
    <div class="pro-manager-head">
      <div><span class="eyebrow">MI PORTAFOLIO PERSONAL</span><h3>Empresas elegidas por ti</h3></div>
      <button class="pro-mini-action" onclick="portfolioEditorOpen=!portfolioEditorOpen; renderMarketContent()">${portfolioEditorOpen || !holdings.length ? 'Ocultar' : '+ Añadir'}</button>
    </div>
    ${!holdings.length ? `<p class="portfolio-empty">Tu portafolio está vacío. Agrega solo las empresas que quieres vigilar; el valor se calculará con datos live/caché.</p>` : ''}
    ${(portfolioEditorOpen || !holdings.length) ? `<div class="portfolio-editor">
      <select id="portfolio-symbol">${options}</select>
      <input id="portfolio-shares" type="number" min="0" step="0.01" placeholder="Acciones" />
      <input id="portfolio-avgcost" type="number" min="0" step="0.01" placeholder="Precio promedio opcional" />
      <button class="btn btn-success" onclick="addPortfolioHolding()">AGREGAR</button>
    </div>
    <div class="quick-add-row"><span>Rápido:</span>${quick}</div>` : ''}
    ${rows.length ? `<div class="portfolio-holdings-list">
      ${rows.map(r => `<article class="holding-row ${quoteClass(r.dayPct)}">
        ${brandLogo(r.quote)}
        <div><b>${r.symbol}</b><small>${r.shares.toLocaleString('es-PE')} acciones · ${formatUSD(r.price)}</small></div>
        <div><strong>${formatUSD(r.value)}</strong><em>${formatPercent(r.dayPct)}</em></div>
        <button onclick="removePortfolioHolding('${r.symbol}')">×</button>
      </article>`).join('')}
      <button class="portfolio-clear" onclick="clearMarketPortfolio()">Eliminar todo el portafolio</button>
    </div>` : ''}
  </section>`;
}

function buildPortfolioAgentText() {
  const p = portfolioSummary();
  if (!p.rows.length) return 'Configura tu portafolio agregando las empresas que deseas seguir. El panel calculará valor, P&L diario, líder y riesgo solo con tus activos.';
  const best = p.best ? `${p.best.symbol} ${formatPercent(p.best.dayPct)}` : 'sin líder';
  const worst = p.worst ? `${p.worst.symbol} ${formatPercent(p.worst.dayPct)}` : 'sin débil';
  return `Tu portafolio personalizado contiene ${p.rows.length} empresas. P&L diario: ${formatPercent(p.dayPct)}. Lidera ${best}; presión principal ${worst}. Lectura educativa: compara tus empresas con el sentimiento general antes de tomar decisiones.`;
}


function pctNumber(value, digits = 2) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '0.00';
  return n.toFixed(digits);
}

function commandMarketScore(sentiment = marketSentiment()) {
  const avg = Number(sentiment.avg || 0);
  const breadth = sentiment.total ? ((Number(sentiment.up || 0) - Number(sentiment.down || 0)) / sentiment.total) * 28 : 0;
  const momentum = Math.max(-30, Math.min(30, avg * 10));
  return Math.max(5, Math.min(95, Math.round(50 + breadth + momentum)));
}

function commandPortfolioValue(quotes = marketState.quotes || []) {
  const top = [...quotes].sort((a, b) => Number(b.cap || 0) - Number(a.cap || 0)).slice(0, 8);
  const base = top.reduce((sum, q) => sum + (Number(q.price || 0) * (1 + Number(q.cap || 1) / 1000)), 0);
  const dayPct = quotes.length ? quotes.reduce((s, q) => s + Number(q.changePercent || 0), 0) / quotes.length : 0;
  const value = Math.max(1000, base * 14.2);
  const pnl = value * (dayPct / 100);
  return { value, pnl, pct: dayPct };
}

function commandTopSignal(quotes = marketState.quotes || []) {
  const sorted = [...quotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
  return sorted[0] || null;
}

function renderCommandGauge(score, sentiment) {
  const clamped = Math.max(0, Math.min(100, Number(score || 0)));
  const angle = -122 + (clamped / 100) * 244;
  const bullish = Math.round((sentiment.up / Math.max(1, sentiment.total)) * 100);
  const bearish = Math.round((sentiment.down / Math.max(1, sentiment.total)) * 100);
  const neutral = Math.max(0, 100 - bullish - bearish);
  return `<div class="command-gauge-wrap">
    <div class="command-gauge" style="--score:${clamped}; --needle:${angle}deg">
      <span class="gauge-needle"></span>
      <b>${clamped}</b>
      <small>Market Score</small>
    </div>
    <div class="gauge-legend">
      <span><i class="bull"></i>Bullish <b>${bullish}%</b></span>
      <span><i class="neutral"></i>Neutral <b>${neutral}%</b></span>
      <span><i class="bear"></i>Bearish <b>${bearish}%</b></span>
    </div>
  </div>`;
}

function renderCommandPortfolioCard(quotes = marketState.quotes || [], sentiment = marketSentiment(quotes)) {
  const p = commandPortfolioValue(quotes);
  const cls = p.pnl >= 0 ? 'is-up' : 'is-down';
  return `<section class="command-card command-portfolio ${cls}">
    <div class="command-card-head"><span>Portafolio</span><small>Vista educativa</small></div>
    <strong class="portfolio-value">$${p.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
    <small class="portfolio-sub">P&amp;L diario</small>
    <b class="portfolio-pnl">${p.pnl >= 0 ? '+' : ''}$${Math.abs(p.pnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${formatPercent(p.pct)})</b>
    <div class="portfolio-chart">${renderCommandPortfolioSpark(quotes)}</div>
  </section>`;
}

function renderCommandPortfolioSpark(quotes = marketState.quotes || []) {
  const values = quotes.slice(0, 14).map((q, i) => 40 + Number(q.changePercent || 0) * 6 + i * 2.5);
  const data = values.length >= 6 ? values : deterministicMiniSeries('PORTFOLIO', marketSentiment(quotes).avg, 18);
  const min = Math.min(...data), max = Math.max(...data), spread = Math.max(.0001, max - min);
  const coords = data.map((v, i) => `${((i/(data.length-1))*100).toFixed(2)},${(34 - ((v-min)/spread)*28).toFixed(2)}`).join(' ');
  return `<svg viewBox="0 0 100 38" preserveAspectRatio="none" aria-hidden="true"><polyline points="${coords}" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="${coords.split(' ').pop().split(',')[1]}" r="3" fill="currentColor"/></svg>`;
}

function renderCommandSentimentCard(sentiment = marketSentiment()) {
  const score = commandMarketScore(sentiment);
  return `<section class="command-card command-sentiment ${sentiment.tone}">
    <div class="command-card-head"><span>Sentimiento del mercado</span><small>${safeMarketEscape(sentiment.label)}</small></div>
    ${renderCommandGauge(score, sentiment)}
  </section>`;
}

function renderCommandToolsRow() {
  const watchCount = readUserWatchlist().length;
  const alertCount = readMarketAlerts().filter(a => a.active).length;
  return `<section class="command-tools-row" aria-label="Herramientas de mercado">
    <button onclick="setMarketTab('alerts')"><span>🔔</span><b>Alertas</b>${alertCount ? `<em>${alertCount}</em>` : ''}</button>
    <button onclick="setMarketTab('summary')"><span>⏱</span><b>Scanner</b></button>
    <button onclick="scrollToMarketInsight()"><span>🧠</span><b>AI Insights</b><em>Nuevo</em></button>
    <button onclick="setMarketTab('watchlist')"><span>👁</span><b>Watchlist</b>${watchCount ? `<em>${watchCount}</em>` : ''}</button>
    <button onclick="renderMarketNewsToast()"><span>▤</span><b>Noticias</b></button>
  </section>`;
}

function renderMarketNewsToast() {
  if (typeof showToast === 'function') showToast('📰 Noticias', 'Módulo educativo listo para integrar noticias financieras en una versión futura.');
}

function scrollToMarketInsight() {
  const el = document.getElementById('market-ai-insight');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderCommandSearchAndFilters(sectors = marketSectors()) {
  return `<section class="command-filter-panel">
    <div class="command-search-shell">
      <span class="command-search-icon">⌕</span>
      <input class="market-search command-search" placeholder="Buscar acción, sector o símbolo..." value="${safeMarketEscape(marketState.query || '')}" oninput="setMarketQuery(this.value)">
      <button class="command-filter-button" type="button" onclick="setMarketTab('heatmap')">☷</button>
      <button class="command-filter-button" type="button" onclick="refreshMarket(true)">↻</button>
    </div>
    <div class="command-select-row">
      <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos los sectores</button>
      <button class="filter-pill">1D</button>
      <button class="filter-pill">Orden: % Cambio</button>
    </div>
    <div class="market-filters command-sector-pills">
      <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos</button>
      ${sectors.map(sector => `<button class="filter-pill ${marketState.filter === sector ? 'active' : ''}" onclick="setMarketFilter('${safeMarketEscape(sector)}')">${safeMarketEscape(shortSector(sector))}</button>`).join('')}
    </div>
  </section>`;
}

function renderCommandMiniChart(q, className = '') {
  const chart = renderMarketMiniChart(q, `command-chart ${className}`);
  return chart.replace('viewBox="0 0 100 100"', 'viewBox="0 0 100 54"');
}

function renderCommandTile(q, index = 0) {
  const pct = Number(q.changePercent || 0);
  const cls = quoteClass(pct);
  const sector = shortSector(q.sector);
  return `<article class="command-stock-card ${cls}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <div class="command-stock-top">
      ${brandLogo(q)}
      <div>
        <strong>${safeMarketEscape(q.symbol)}</strong>
        <small>${safeMarketEscape(shortCompanyName(q.name))}</small>
        <em>${safeMarketEscape(sector)}</em>
      </div>
    </div>
    <div class="command-stock-middle">
      <b>${formatPercent(pct)}</b>
      <small>${formatUSD(q.price)}</small>
    </div>
    <div class="command-stock-chart">${renderCommandMiniChart(q)}</div>
  </article>`;
}

function renderCommandHeatmap(quotes) {
  return `<section class="command-heatmap-panel">
    <div class="command-section-title">
      <h2>Mapa de calor</h2>
      <span>▦ ${quotes.length} símbolos</span>
    </div>
    <div class="command-heatmap-grid">
      ${quotes.map(renderCommandTile).join('') || `<div class="empty-state">Sin resultados para el filtro actual.</div>`}
    </div>
  </section>`;
}

function renderCommandScanner(gainers, losers) {
  return `<section class="command-scanner-panel">
    <div class="command-mini-list"><span>Top ganadoras</span>${gainers.slice(0,3).map(q => `<button class="${quoteClass(q.changePercent)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')"><b>${q.symbol}</b><em>${formatPercent(q.changePercent)}</em></button>`).join('')}</div>
    <div class="command-mini-list"><span>Top perdedoras</span>${losers.slice(0,3).map(q => `<button class="${quoteClass(q.changePercent)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')"><b>${q.symbol}</b><em>${formatPercent(q.changePercent)}</em></button>`).join('')}</div>
  </section>`;
}

function renderCommandAIInsight(sentiment, gainers, losers) {
  const leader = gainers[0];
  const weak = losers[0];
  const confidence = Math.max(55, Math.min(96, commandMarketScore(sentiment) + 12));
  return `<section id="market-ai-insight" class="command-ai-insight">
    <div class="ai-orb">🧠</div>
    <div class="ai-copy">
      <div class="ai-head"><span>AI Insight</span><em>Señal fuerte</em></div>
      <h3>Oportunidad detectada: ${safeMarketEscape(leader?.symbol || '—')}</h3>
      <p>${safeMarketEscape(leader?.symbol || 'El líder')} muestra la mayor fuerza relativa del panel. El sesgo general es ${safeMarketEscape(sentiment.label.toLowerCase())}; compara liderazgo, sector y amplitud antes de sacar conclusiones.</p>
      <div class="ai-progress"><span style="width:${confidence}%"></span></div>
      <small>Confianza educativa: ${confidence}% · Débil del panel: ${safeMarketEscape(weak?.symbol || '—')}</small>
    </div>
    ${leader ? `<div class="ai-card-mini">${brandLogo(leader)}<b>${leader.symbol}</b>${renderCommandMiniChart(leader, 'ai-spark')}</div>` : ''}
  </section>`;
}

function renderCommandDataStatus() {
  const source = safeMarketEscape(marketState.source || 'Pendiente');
  const online = marketState.status === 'live';
  return `<div class="command-live-strip ${online ? 'online' : 'cache'}">
    <span class="market-dot ${online ? 'online' : 'offline'}"></span>
    <b>${online ? 'MERCADOS EN VIVO' : 'MODO CACHÉ / DEMO'}</b>
    <small>${source} · ${safeMarketEscape(formatMarketTime(marketState.updatedAt))}</small>
  </div>`;
}

function renderCommandSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes) {
  const sectors = marketSectors();
  const visible = getVisibleQuotes();
  return `
    <section class="command-top-grid">
      ${renderCommandPortfolioCard(allQuotes, sentiment)}
      ${renderCommandSentimentCard(sentiment)}
    </section>
    ${renderCommandToolsRow()}
    ${renderCommandSearchAndFilters(sectors)}
    ${renderCommandHeatmap(visible)}
    ${renderCommandAIInsight(sentiment, gainers, losers)}
  `;
}

function renderCommandHeatmapTab(quotes, sectors, totalCap, selected) {
  return `
    ${renderCommandSearchAndFilters(sectors)}
    ${renderCommandHeatmap(quotes)}
    ${selected ? renderStockDetail(selected) : ''}
    ${renderSectorRotationCard(marketSentiment(marketState.quotes || []))}
  `;
}

window.renderMarket = function renderMarket() {
  marketState.userWatchlist = readUserWatchlist();
  marketState.detailSymbol = readSelectedSymbol();
  mainContainer.innerHTML = `
    <section class="market-command-shell">
      <div class="command-shell-head">
        <div>
          <span class="eyebrow">MARKET OPS · COMMAND CENTER</span>
          <h1>Acciones Pro</h1>
          <p>Panel educativo de mercado con datos live, sentimiento, scanner, heatmap, watchlist y agente local.</p>
        </div>
        <span class="command-version">v9.6</span>
      </div>
      <div id="market-status-box">${renderCommandDataStatus()}</div>
      <div class="command-tab-row">
        <button class="command-tab active" onclick="setMarketTab('summary')">Resumen</button>
        <button class="command-tab" onclick="setMarketTab('heatmap')">Heatmap</button>
        <button class="command-tab" onclick="setMarketTab('watchlist')">Watchlist</button>
        <button class="command-tab" onclick="setMarketTab('alerts')">Alertas</button>
      </div>
    </section>
    <section id="market-content" class="market-command-content"><div class="panel-card"><div class="loader small"></div><p class="hero-subtitle">Cargando inteligencia de mercado...</p></div></section>
    <div class="bottom-spacer"></div>
  `;
  refreshMarket(false);
};

window.renderMarketContent = function renderMarketContent() {
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
  const gainers = [...allQuotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent)).slice(0, 5);
  const losers = [...allQuotes].sort((a, b) => Number(a.changePercent) - Number(b.changePercent)).slice(0, 5);
  const watchQuotes = marketState.userWatchlist.map(getQuoteBySymbol).filter(Boolean);
  const selected = getQuoteBySymbol(marketState.detailSymbol) || quotes[0] || null;

  if (statusBox) statusBox.innerHTML = renderCommandDataStatus();
  document.querySelectorAll('.command-tab').forEach(btn => {
    const name = btn.textContent.trim().toLowerCase();
    btn.classList.toggle('active', name === (marketActiveTab === 'summary' ? 'resumen' : marketActiveTab));
  });

  if (marketActiveTab === 'summary') host.innerHTML = renderCommandSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes);
  else if (marketActiveTab === 'heatmap') host.innerHTML = renderCommandHeatmapTab(quotes, sectors, totalCap, selected);
  else if (marketActiveTab === 'watchlist') host.innerHTML = renderMarketWatchlistTab(watchQuotes);
  else if (marketActiveTab === 'alerts') host.innerHTML = renderMarketAlertsTab();
  else host.innerHTML = renderCommandSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes);
};


/* PySec Academy Elite v9.6 - Market Command Pro Dashboard
   Rebuild visual de Acciones para acercarse al dashboard profesional enviado por el usuario:
   sin hero pesado, con estado live, portfolio/sentimiento, herramientas, filtros compactos, heatmap Pro y AI Insight. */
const MARKET_COMMAND_PRO_BUILD = '9.8.2';

function renderProLiveHeader() {
  const online = marketState.status === 'live';
  return `<section class="pro-live-line ${online ? 'online' : 'cache'}">
    <span class="market-dot ${online ? 'online' : 'offline'}"></span>
    <b>${online ? 'MERCADOS EN VIVO' : 'MERCADO EDUCATIVO / CACHÉ'}</b>
    <small>${safeMarketEscape(marketState.source || 'Pendiente')} · ${safeMarketEscape(formatMarketTime(marketState.updatedAt))}</small>
  </section>`;
}

function renderProPortfolioCard(quotes = marketState.quotes || []) {
  const p = portfolioSummary();
  const cls = p.dayPnl >= 0 ? 'is-up' : 'is-down';
  if (!p.rows.length) {
    return `<section class="pro-metric-card pro-portfolio portfolio-custom-empty">
      <div class="pro-card-title"><b>MI PORTAFOLIO</b><button onclick="portfolioEditorOpen=true; renderMarketContent()">CONFIGURAR</button></div>
      <small>Solo empresas elegidas por ti</small>
      <strong>$0.00</strong>
      <small>Agrega NVDA, AAPL, TSLA u otra empresa del panel.</small>
      <div class="portfolio-chart empty-line">Configura tu cartera</div>
    </section>`;
  }
  return `<section class="pro-metric-card pro-portfolio ${cls}">
    <div class="pro-card-title"><b>MI PORTAFOLIO</b><button onclick="portfolioEditorOpen=!portfolioEditorOpen; renderMarketContent()">GESTIONAR</button></div>
    <small>${p.rows.length} empresas · valor live/caché</small>
    <strong>$${p.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
    <small>P&amp;L diario</small>
    <em>${p.dayPnl >= 0 ? '+' : '-'}$${Math.abs(p.dayPnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${formatPercent(p.dayPct)})</em>
    <div class="portfolio-chart">${renderPortfolioSparkline(p.rows)}</div>
  </section>`;
}

function renderPortfolioSparkline(rows = []) {
  const weighted = rows.map((r, i) => 45 + Number(r.dayPct || 0) * 6 + i * 3);
  const data = weighted.length >= 4 ? weighted : deterministicMiniSeries('CUSTOM_PORTFOLIO', portfolioSummary().dayPct, 20);
  const min = Math.min(...data), max = Math.max(...data), spread = Math.max(.0001, max - min);
  const coords = data.map((v, i) => `${((i/(data.length-1))*100).toFixed(2)},${(34 - ((v-min)/spread)*28).toFixed(2)}`).join(' ');
  return `<svg viewBox="0 0 100 38" preserveAspectRatio="none" aria-hidden="true"><polyline points="${coords}" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="100" cy="${coords.split(' ').pop().split(',')[1]}" r="3" fill="currentColor"/></svg>`;
}

function renderProSentimentCard(sentiment = marketSentiment()) {
  const score = commandMarketScore(sentiment);
  const total = Math.max(1, Number(sentiment.total || 0));
  const bullishPct = Math.round((Number(sentiment.up || 0) / total) * 100);
  const bearishPct = Math.round((Number(sentiment.down || 0) / total) * 100);
  const neutralPct = Math.max(0, 100 - bullishPct - bearishPct);
  const tone = score >= 62 ? 'bullish' : score <= 38 ? 'bearish' : 'neutral';
  const label = score >= 62 ? 'Alcista' : score <= 38 ? 'Bajista' : 'Mixto';
  const needle = -120 + (Math.max(0, Math.min(100, score)) / 100) * 240;
  return `<section class="pro-metric-card pro-sentiment-pro ${tone}">
    <div class="pro-card-title sentiment-title-line">
      <b>SENTIMIENTO DEL MERCADO</b>
      <span class="sentiment-info-dot">i</span>
    </div>
    <div class="sentiment-pro-content">
      <div class="sentiment-pro-gauge" style="--needle:${needle}deg">
        <span class="sentiment-pro-arc"></span>
        <span class="sentiment-pro-needle"></span>
        <strong>${score}</strong>
        <small>Market Score</small>
      </div>
      <div class="sentiment-pro-legend">
        <div class="bull"><span></span><b>Bullish</b><em>${bullishPct}%</em><i style="width:${bullishPct}%"></i></div>
        <div class="neutral"><span></span><b>Neutral</b><em>${neutralPct}%</em><i style="width:${neutralPct}%"></i></div>
        <div class="bear"><span></span><b>Bearish</b><em>${bearishPct}%</em><i style="width:${bearishPct}%"></i></div>
      </div>
    </div>
    <div class="sentiment-pro-footer ${tone}">
      <b>Sesgo: ${safeMarketEscape(label)}</b>
      <small>${safeMarketEscape(sentiment.up)} verdes · ${safeMarketEscape(sentiment.down)} rojas · promedio ${formatPercent(sentiment.avg)}</small>
    </div>
  </section>`;
}

function renderProToolsRow() {
  const watchCount = readUserWatchlist().length;
  const alertCount = readMarketAlerts().filter(a => a.active).length;
  return `<section class="pro-tools-row">
    <button onclick="setMarketTab('alerts')"><span>♢</span><b>Alertas</b>${alertCount ? `<em>${alertCount}</em>` : ''}</button>
    <button onclick="setMarketTab('summary')"><span>◎</span><b>Scanner</b></button>
    <button onclick="scrollToMarketInsight()"><span>✺</span><b>AI Insights</b><em>Nuevo</em></button>
    <button onclick="setMarketTab('watchlist')"><span>◉</span><b>Watchlist</b>${watchCount ? `<em>${watchCount}</em>` : ''}</button>
    <button onclick="renderMarketNewsToast()"><span>▤</span><b>Noticias</b></button>
  </section>`;
}

function renderProSearchAndFilters(sectors = marketSectors()) {
  return `<section class="pro-filter-panel">
    <div class="pro-search-row">
      <span class="pro-search-icon">⌕</span>
      <input class="market-search pro-search" placeholder="Buscar acción, sector o símbolo..." value="${safeMarketEscape(marketState.query || '')}" oninput="setMarketQuery(this.value)">
      <button type="button" class="pro-icon-btn" onclick="setMarketTab('heatmap')">☷</button>
      <button type="button" class="pro-icon-btn" onclick="refreshMarket(true)">↻</button>
    </div>
    <div class="pro-filter-row">
      <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos los sectores</button>
      <button class="filter-pill">1D</button>
      <button class="filter-pill">Orden: % Cambio</button>
    </div>
    <div class="pro-sector-row">
      <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos</button>
      ${sectors.map(sector => `<button class="filter-pill ${marketState.filter === sector ? 'active' : ''}" onclick="setMarketFilter('${safeMarketEscape(sector)}')">${safeMarketEscape(shortSector(sector))}</button>`).join('')}
    </div>
  </section>`;
}

function renderProStockCard(q) {
  const pct = Number(q.changePercent || 0);
  const cls = quoteClass(pct);
  const sector = shortSector(q.sector);
  return `<article class="pro-stock-card ${cls}" onclick="selectStock('${safeMarketEscape(q.symbol)}')">
    <div class="pro-stock-brand">${brandLogo(q)}</div>
    <div class="pro-stock-info">
      <strong>${safeMarketEscape(q.symbol)}</strong>
      <small>${safeMarketEscape(shortCompanyName(q.name))}</small>
      <span>${safeMarketEscape(sector)}</span>
    </div>
    <div class="pro-stock-price">
      <b>${formatPercent(pct)}</b>
      <small>${formatUSD(q.price)}</small>
    </div>
    <div class="pro-stock-chart">${renderMarketMiniChart(q, 'pro-live-spark')}</div>
  </article>`;
}

function renderProHeatmap(quotes) {
  return `<section class="pro-heatmap-panel">
    <div class="pro-section-title"><h2>Mapa de calor</h2><span>▦ ${quotes.length} símbolos</span></div>
    <div class="pro-heatmap-grid">
      ${quotes.map(renderProStockCard).join('') || `<div class="empty-state">Sin resultados para el filtro actual.</div>`}
    </div>
  </section>`;
}

function renderProAIInsight(sentiment, gainers, losers) {
  const leader = gainers[0];
  const weak = losers[0];
  const confidence = Math.max(55, Math.min(96, commandMarketScore(sentiment) + 12));
  return `<section id="market-ai-insight" class="pro-ai-insight">
    <div class="pro-ai-orb">◎</div>
    <div class="pro-ai-copy">
      <div><span>AI INSIGHT</span><em>Señal fuerte</em></div>
      <h3>Oportunidad detectada: ${safeMarketEscape(leader?.symbol || '—')}</h3>
      <p>${safeMarketEscape(buildPortfolioAgentText())}</p>
      <label>Confianza: Alta <b>${confidence}%</b></label>
      <div class="ai-progress"><span style="width:${confidence}%"></span></div>
      <small>Análisis educativo por PySec AI · Débil del panel: ${safeMarketEscape(weak?.symbol || '—')}</small>
    </div>
    ${leader ? `<div class="pro-ai-mini"><b>${leader.symbol} 1D</b>${renderMarketMiniChart(leader, 'ai-spark')}</div>` : ''}
  </section>`;
}

function renderProDashboard() {
  marketState.userWatchlist = readUserWatchlist();
  marketState.alerts = readMarketAlerts();
  marketState.notes = readMarketNotes();
  marketState.priceHistory = readMarketHistory();

  const allQuotes = marketState.quotes || [];
  const quotes = getVisibleQuotes();
  const sectors = marketSectors();
  const sentiment = marketSentiment(allQuotes);
  const gainers = [...allQuotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent)).slice(0, 5);
  const losers = [...allQuotes].sort((a, b) => Number(a.changePercent) - Number(b.changePercent)).slice(0, 5);

  return `
    ${renderProLiveHeader()}
    <section class="pro-market-top-grid">
      ${renderProPortfolioCard(allQuotes)}
      ${renderProSentimentCard(sentiment)}
    </section>
    ${renderProToolsRow()}
    ${portfolioEditorOpen ? renderPortfolioManager() : ''}
    ${renderProSearchAndFilters(sectors)}
    ${renderProHeatmap(quotes)}
    ${renderProAIInsight(sentiment, gainers, losers)}
  `;
}

window.renderMarket = function renderMarket() {
  marketState.userWatchlist = readUserWatchlist();
  marketState.detailSymbol = readSelectedSymbol();
  mainContainer.innerHTML = `
    <section id="market-content" class="pro-market-dashboard">
      <div class="panel-card"><div class="loader small"></div><p class="hero-subtitle">Cargando dashboard de mercado...</p></div>
    </section>
    <div class="bottom-spacer"></div>
  `;
  refreshMarket(false);
};

window.renderMarketContent = function renderMarketContent() {
  const host = document.getElementById('market-content');
  if (!host) return;
  if (marketActiveTab === 'watchlist') {
    const watchQuotes = readUserWatchlist().map(getQuoteBySymbol).filter(Boolean);
    host.innerHTML = `${renderProLiveHeader()}${renderProToolsRow()}${renderMarketWatchlistTab(watchQuotes)}`;
    return;
  }
  if (marketActiveTab === 'alerts') {
    host.innerHTML = `${renderProLiveHeader()}${renderProToolsRow()}${renderMarketAlertsTab()}`;
    return;
  }
  host.innerHTML = renderProDashboard();
};
