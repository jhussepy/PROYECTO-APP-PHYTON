/* PySec Academy Elite v9.9.0 · Strategy Engine
   Ordena Acciones Pro en tabs internas: Resumen, Heatmap, Watchlist y Alertas.
   Mantiene Finnhub, caché, demo, watchlist, alertas, notas, sparkline y Market Agent. */

const MARKET_CLEAN_FLOW_VERSION = '9.9.0';
let marketActiveTab = 'summary';

function setMarketTab(tab) {
  const allowed = ['summary', 'heatmap', 'watchlist', 'alerts', 'strategy'];
  marketActiveTab = allowed.includes(tab) ? tab : 'summary';
  renderMarketContent();
}

function openMarketApiSettings() {
  marketActiveTab = 'alerts';
  renderMarketContent();
  requestAnimationFrame(() => {
    const target = document.getElementById('market-data-config');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('finnhub-key-input')?.focus(), 350);
  });
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
  const configured = hasFinnhubApiKey();
  const feedbackMessage = finnhubConnectionState?.message || '';
  const feedbackTone = finnhubConnectionState?.tone || 'idle';
  return `<section id="market-data-config" class="panel-card market-api-settings data-config-card">
    <div class="data-config-head">
      <div>
        <span class="eyebrow">CONFIGURACIÓN DE DATOS</span>
        <h2>${configured ? 'Finnhub configurado · datos live disponibles' : 'Finnhub no configurado'}</h2>
        <small>${configured ? `API guardada: ${safeMarketEscape(maskFinnhubKey())}` : 'Agrega tu API key para usar Finnhub como proveedor principal.'}</small>
      </div>
      <span class="data-provider-badge ${configured ? 'configured' : 'offline'}">${configured ? 'FINNHUB DISPONIBLE' : 'CACHÉ / DEMO'}</span>
    </div>
    <label class="market-api-label" for="finnhub-key-input">API Key de Finnhub</label>
    <input id="finnhub-key-input" class="market-api-input" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${configured ? safeMarketEscape(maskFinnhubKey()) : 'Pega tu API key de Finnhub'}" value="">
    <div id="market-api-feedback" class="market-api-feedback ${safeMarketEscape(feedbackTone)}" role="status" ${feedbackMessage ? '' : 'hidden'}>${safeMarketEscape(feedbackMessage)}</div>
    <div class="market-api-actions data-config-actions">
      <button class="btn btn-success" type="button" onclick="saveFinnhubKeyFromInput()">Guardar API</button>
      <button class="btn btn-outline api-test-button" type="button" onclick="testFinnhubConnection()">Probar conexión</button>
      <button class="btn btn-outline api-delete-button" type="button" onclick="clearFinnhubKey()">Borrar API</button>
    </div>
    <p class="market-api-security">La API key se guarda solo en este navegador. Para producción se recomienda usar backend proxy.</p>
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
    ${typeof renderStrategyAlertTemplates === 'function' ? renderStrategyAlertTemplates() : ''}
    ${renderMarketAlertsPanel()}
    ${renderMarketNotesPanel()}
    ${renderMarketApiSettings()}
  `;
}

function renderSectorRotationCard(sentiment = marketSentiment()) {
  return `<section class="panel-card">${renderSectorRotation(sentiment)}</section>`;
}
