/* PySec Academy Elite v9.4.8 · Live Mini Chart Heatmap Pro
   Ordena Acciones Pro en tabs internas: Resumen, Heatmap, Watchlist y Alertas.
   Mantiene Finnhub, caché, demo, watchlist, alertas, notas, sparkline y Market Agent. */

const MARKET_CLEAN_FLOW_VERSION = '9.4.8';
let marketActiveTab = 'summary';
let marketApiSettingsOpen = false;

function setMarketTab(tab) {
  const allowed = ['summary', 'heatmap', 'watchlist', 'alerts'];
  marketActiveTab = allowed.includes(tab) ? tab : 'summary';
  renderMarketContent();
}

function toggleMarketApiSettings() {
  marketApiSettingsOpen = !marketApiSettingsOpen;
  renderMarketContent();
}

function renderMarketStatusLine() {
  const sourceLabel = marketState.status === 'live' ? 'Finnhub live' : marketState.status === 'cached' ? 'Caché local' : marketState.status === 'loading' ? 'Cargando feed' : 'Modo demo';
  const dotClass = marketState.status === 'live' ? 'online' : marketState.status === 'cached' ? 'cached' : 'offline';
  const badgeText = marketState.status === 'live' ? 'EN VIVO' : marketState.status === 'cached' ? 'CACHÉ' : marketState.status === 'loading' ? 'SYNC' : 'DEMO';
  return `<div class="market-clean-status market-status-pro">
    <div class="status-signal"><span class="market-dot ${dotClass}"></span><span class="signal-waves">◌</span></div>
    <div class="status-copy"><strong>${safeMarketEscape(sourceLabel)}</strong><small>${safeMarketEscape(marketState.source || 'Pendiente')} · ${formatMarketTime(marketState.updatedAt)}</small></div>
    <span class="live-badge ${dotClass}">${badgeText}</span>
  </div>`;
}

function renderMarketTabs() {
  const tabs = [
    ['summary', 'Resumen', '▥'],
    ['heatmap', 'Heatmap', '▦'],
    ['watchlist', 'Watchlist', '★'],
    ['alerts', 'Alertas', '◉']
  ];
  return `<nav class="market-tabs" aria-label="Secciones de Acciones Pro">
    ${tabs.map(([id, label, icon]) => `<button class="market-tab ${marketActiveTab === id ? 'active' : ''}" onclick="setMarketTab('${id}')"><span>${icon}</span>${label}</button>`).join('')}
  </nav>`;
}

function renderMarketApiSettings() {
  const configured = hasFinnhubKey();
  if (!marketApiSettingsOpen) {
    return `<section class="panel-card market-api-settings compact">
      <div class="api-settings-row">
        <div>
          <span class="eyebrow">CONFIGURACIÓN DE DATOS</span>
          <strong>${configured ? 'Finnhub configurado' : 'Finnhub no configurado'}</strong>
          <small>${configured ? `Key local: ${safeMarketEscape(maskFinnhubKey())}` : 'Puedes pegar tu API key para feed prioritario.'}</small>
        </div>
        <button class="btn btn-outline" onclick="toggleMarketApiSettings()">${configured ? 'CAMBIAR API' : 'CONFIGURAR'}</button>
      </div>
    </section>`;
  }
  return `<section class="panel-card market-api-settings">
    <div>
      <span class="eyebrow">FINNHUB API</span>
      <strong>${configured ? 'Editar API local' : 'Conectar Finnhub'}</strong>
      <small>La key se guarda solo en este navegador. Para una app pública final conviene usar backend proxy.</small>
    </div>
    <input id="finnhub-key-input" class="market-api-input" placeholder="Pega tu API key de Finnhub" value="">
    <div class="market-api-actions">
      <button class="btn btn-success" onclick="saveFinnhubKeyFromInput(); marketApiSettingsOpen=false;">GUARDAR API</button>
      <button class="btn btn-outline" onclick="clearFinnhubKey(); marketApiSettingsOpen=false;">BORRAR</button>
      <button class="btn btn-outline" onclick="toggleMarketApiSettings()">CERRAR</button>
    </div>
  </section>`;
}

function renderMarketAgentCondensed(sentiment = marketSentiment()) {
  const summary = typeof buildExecutiveMarketSummary === 'function' ? buildExecutiveMarketSummary(sentiment) : null;
  const score = summary ? summary.score : (typeof marketScore === 'function' ? marketScore(sentiment) : 50);
  return `<section class="panel-card market-agent-condensed ${sentiment.tone}">
    <div class="card-topline compact">
      <div>
        <span class="eyebrow">MARKET AGENT · RESUMEN EJECUTIVO</span>
        <h2>${safeMarketEscape(sentiment.label)}</h2>
      </div>
      <span class="market-score-badge score-pro"><b>${score}</b><small>/100</small></span>
    </div>
    <div class="market-score-track clean"><span style="width:${score}%"></span></div>
    <div class="clean-kpi-grid">
      <div><strong>${sentiment.up}</strong><small>Verdes</small><em>↗</em></div>
      <div><strong>${sentiment.down}</strong><small>Rojas</small><em>↘</em></div>
      <div><strong>${formatPercent(sentiment.avg)}</strong><small>Promedio</small><em>◔</em></div>
    </div>
    <p class="market-agent-text clean">${safeMarketEscape(buildMarketAgentText())}</p>
  </section>`;
}

function renderMarketQuickScanner(gainers, losers) {
  return `<section class="panel-card market-scanner clean-scanner">
    ${sectionTitle('Scanner rápido', 'TOP')}
    <div class="scanner-grid compact">
      <div class="scanner-box"><span class="eyebrow">Ganadoras</span>${gainers.slice(0, 3).map(q => renderMiniQuote(q)).join('')}</div>
      <div class="scanner-box"><span class="eyebrow">Perdedoras</span>${losers.slice(0, 3).map(q => renderMiniQuote(q)).join('')}</div>
    </div>
  </section>`;
}

function renderMarketSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes) {
  return `
    ${renderMarketAgentCondensed(sentiment)}
    ${renderMarketQuickScanner(gainers, losers)}
    <section class="panel-card clean-watch-preview">
      ${sectionTitle('Mi Watchlist', `${watchQuotes.length} símbolos`)}
      ${watchQuotes.length ? `<div class="watchlist-strip pro-watchlist-strip">${watchQuotes.slice(0, 6).map(renderWatchChip).join('')}</div>` : `<div class="empty-state compact">Aún no sigues acciones. Abre el Heatmap, toca una acción y pulsa ⭐ Seguir.</div>`}
    </section>
    ${renderSectorRotationCard(marketSentiment(allQuotes))}
    ${renderMarketEducationPanel()}
  `;
}

function renderMarketHeatmapTab(quotes, sectors, totalCap, selected) {
  return `
    <section class="panel-card market-controls clean-controls pro-market-controls">
      <div class="market-search-shell">
        <span class="search-icon">⌕</span>
        <input class="market-search" placeholder="Buscar acción, sector o símbolo..." value="${safeMarketEscape(marketState.query || '')}" oninput="setMarketQuery(this.value)">
        <button class="market-filter-icon" type="button" aria-label="Filtros avanzados">☷</button>
      </div>
      <div class="market-filters">
        <button class="filter-pill ${marketState.filter === 'all' ? 'active' : ''}" onclick="setMarketFilter('all')">Todos</button>
        ${sectors.map(sector => `<button class="filter-pill ${marketState.filter === sector ? 'active' : ''}" onclick="setMarketFilter('${safeMarketEscape(sector)}')">${safeMarketEscape(shortSector(sector))}</button>`).join('')}
      </div>
    </section>
    <section class="panel-card clean-heatmap-card">
      <div class="heatmap-title-row">
        <h2>Mapa de calor</h2>
        <span class="heatmap-symbol-badge">▦ ${quotes.length} símbolos</span>
      </div>
      <div class="stock-heatmap clean-heatmap pro-heatmap">${quotes.map(q => renderHeatTile(q, totalCap)).join('') || `<div class="empty-state">Sin resultados para el filtro actual.</div>`}</div>
      <div class="heat-legend"><span>-3%</span><div></div><span>0%</span><div></div><span>+3%</span></div>
    </section>
    ${selected ? renderStockDetail(selected) : ''}
    <section class="panel-card clean-table-card">
      ${sectionTitle('Lista completa', marketState.status === 'live' ? 'LIVE' : 'TRAINING')}
      <div class="stock-table compact-table">${quotes.map(renderStockRow).join('') || `<div class="empty-state">No hay acciones visibles.</div>`}</div>
    </section>
  `;
}

function renderMarketWatchlistTab(watchQuotes) {
  return `
    <section class="panel-card pro-watchlist-panel clean-watchlist-panel">
      ${sectionTitle('Mi Watchlist', `${watchQuotes.length} símbolos`)}
      ${watchQuotes.length ? `<div class="watchlist-grid">${watchQuotes.map(q => `<button class="watchlist-card ${quoteClass(q.changePercent)}" onclick="selectStock('${safeMarketEscape(q.symbol)}')"><div><strong>${safeMarketEscape(q.symbol)}</strong><small>${safeMarketEscape(shortSector(q.sector))}</small></div><b>${formatPercent(q.changePercent)}</b>${renderSparkline(q.symbol, 'watch-spark')}</button>`).join('')}</div>` : `<div class="empty-state">Aún no sigues acciones. Ve al Heatmap, toca una acción y pulsa ⭐ Seguir.</div>`}
    </section>
    ${watchQuotes.length ? renderStockDetail(watchQuotes[0]) : ''}
    ${renderMarketNotesPanel()}
  `;
}

function renderMarketAlertsTab() {
  return `
    ${renderMarketVisibleAlerts()}
    ${renderMarketAlertsPanel()}
    ${renderMarketNotesPanel()}
    ${renderMarketApiSettings()}
  `;
}

function renderMarket() {
  marketState.userWatchlist = readUserWatchlist();
  marketState.detailSymbol = readSelectedSymbol();
  mainContainer.innerHTML = `
    <section class="panel-card market-shell clean-market-shell">
      <div class="card-topline">
        <div>
          <span class="eyebrow">MARKET OPS · PRO INTELLIGENCE</span>
          <h1 class="section-heading">Acciones Pro</h1>
        </div>
        <span class="status-pill green version-pro">v9.4.8</span>
      </div>
      <p class="hero-subtitle">Centro educativo de inteligencia de mercado con resumen ejecutivo, heatmap, watchlist y alertas en capas claras. No constituye asesoría financiera.</p>
      <div class="market-actions clean-actions">
        <button class="btn btn-success market-primary-action" onclick="refreshMarket(true)"><span>↻</span> ACTUALIZAR</button>
        <button class="btn btn-outline market-secondary-action" onclick="setMarketTab('heatmap')">VER HEATMAP <span>▦</span></button>
      </div>
      <div class="market-status" id="market-status-box">Inicializando feed...</div>
      ${renderMarketTabs()}
    </section>
    <section id="market-content" class="market-content clean-market-content">
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

  if (statusBox) statusBox.innerHTML = renderMarketStatusLine();
  const shell = document.querySelector('.clean-market-shell');
  const existingTabs = shell?.querySelector('.market-tabs');
  if (existingTabs) existingTabs.outerHTML = renderMarketTabs();

  if (marketActiveTab === 'summary') host.innerHTML = renderMarketSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes);
  else if (marketActiveTab === 'heatmap') host.innerHTML = renderMarketHeatmapTab(quotes, sectors, totalCap, selected);
  else if (marketActiveTab === 'watchlist') host.innerHTML = renderMarketWatchlistTab(watchQuotes);
  else if (marketActiveTab === 'alerts') host.innerHTML = renderMarketAlertsTab();
  else host.innerHTML = renderMarketSummaryTab(allQuotes, sentiment, gainers, losers, watchQuotes);
}

function renderSectorRotationCard(sentiment = marketSentiment()) {
  return `<section class="panel-card">${renderSectorRotation(sentiment)}</section>`;
}
