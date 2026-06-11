/* PySec Academy Elite v9.4.1 · Clean Market Flow
   Profesionaliza Acciones Pro: API compacta, resumen ejecutivo, Market Score,
   rotación sectorial, detalle avanzado, watchlist/alertas visibles y educación de mercado. */

const MARKET_UX_VERSION = '9.4';
let marketApiEditMode = false;

function marketScore(sentiment = marketSentiment()) {
  const breadth = ((sentiment.up - sentiment.down) / Math.max(1, sentiment.total)) * 35;
  const avgImpact = Math.max(-35, Math.min(35, Number(sentiment.avg || 0) * 12));
  const leadership = sentiment.strongest && Number(sentiment.strongest.changePercent) > 2 ? 8 : 0;
  const weaknessPenalty = sentiment.weakest && Number(sentiment.weakest.changePercent) < -2 ? -8 : 0;
  return Math.max(0, Math.min(100, Math.round(50 + breadth + avgImpact + leadership + weaknessPenalty)));
}

function marketStrengthLabel(value) {
  if (value >= 75) return 'Fuerte';
  if (value >= 60) return 'Positivo selectivo';
  if (value >= 45) return 'Mixto';
  if (value >= 30) return 'Débil selectivo';
  return 'Presión bajista';
}

function relativeStrengthLabel(q) {
  const pct = Number(q?.changePercent || 0);
  if (pct >= 5) return 'Fuerza extrema';
  if (pct >= 2) return 'Fuerte';
  if (pct >= .5) return 'Positiva';
  if (pct <= -2) return 'Presión bajista';
  if (pct <= -.5) return 'Débil';
  return 'Neutral';
}

function getStockRank(symbol, quotes = marketState.quotes || []) {
  const ordered = [...quotes].sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
  const index = ordered.findIndex(q => q.symbol === symbol);
  return index >= 0 ? index + 1 : '—';
}

function getTriggeredAlerts() {
  return readMarketAlerts().filter(a => Boolean(a.triggeredAt));
}

function renderMarketApiCompact() {
  const configured = hasFinnhubKey();
  if (configured && !marketApiEditMode) {
    return `<div class="market-api-box market-api-compact">
      <div>
        <span class="eyebrow">FINNHUB API</span>
        <strong>✅ Configurada · Live feed activo</strong>
        <small>Key local: ${safeMarketEscape(maskFinnhubKey())}. Guardada solo en este navegador.</small>
      </div>
      <div class="market-api-actions compact-actions">
        <button class="btn btn-success" onclick="refreshMarket(true)">↻ ACTUALIZAR</button>
        <button class="btn btn-outline" onclick="marketApiEditMode=true; renderMarket();">CAMBIAR API</button>
      </div>
    </div>`;
  }
  return `<div class="market-api-box">
    <div>
      <span class="eyebrow">FINNHUB API</span>
      <strong>${configured ? 'Editar API local' : 'No configurada'}</strong>
      <small>${configured ? 'Pega una nueva key o borra la actual.' : 'Pega tu key para datos live prioritarios.'}</small>
    </div>
    <input id="finnhub-key-input" class="market-api-input" placeholder="Pega tu API key de Finnhub" value="">
    <div class="market-api-actions">
      <button class="btn btn-success" onclick="saveFinnhubKeyFromInput()">GUARDAR API</button>
      <button class="btn btn-outline" onclick="clearFinnhubKey(); marketApiEditMode=false;">BORRAR</button>
      ${configured ? `<button class="btn btn-outline" onclick="marketApiEditMode=false; renderMarket();">CANCELAR</button>` : ''}
    </div>
  </div>`;
}

function buildExecutiveMarketSummary(sentiment = marketSentiment()) {
  const score = marketScore(sentiment);
  const leader = sentiment.strongest ? `${sentiment.strongest.symbol} ${formatPercent(sentiment.strongest.changePercent)}` : 'sin líder';
  const weak = sentiment.weakest ? `${sentiment.weakest.symbol} ${formatPercent(sentiment.weakest.changePercent)}` : 'sin presión clara';
  const best = sentiment.bestSector ? `${shortSector(sentiment.bestSector.sector)} ${formatPercent(sentiment.bestSector.avg)}` : 'sin sector fuerte';
  const worst = sentiment.worstSector ? `${shortSector(sentiment.worstSector.sector)} ${formatPercent(sentiment.worstSector.avg)}` : 'sin sector débil';
  let risk = 'Fuerza distribuida moderada.';
  if (score < 45) risk = 'Presión defensiva: prioriza contexto y riesgo.';
  else if (score < 60) risk = 'Mercado mixto: evita conclusiones por una sola acción.';
  else if (sentiment.down >= sentiment.up * .7) risk = 'Liderazgo selectivo con divergencias internas.';
  return { score, leader, weak, best, worst, risk };
}

function renderMarketExecutiveSummary(sentiment = marketSentiment()) {
  const summary = buildExecutiveMarketSummary(sentiment);
  return `<section class="panel-card market-executive-summary ${sentiment.tone}">
    <div class="card-topline compact">
      <div>
        <span class="eyebrow">MARKET AGENT · RESUMEN EJECUTIVO</span>
        <h2>${safeMarketEscape(sentiment.label)}</h2>
      </div>
      <span class="market-score-badge">${summary.score}/100</span>
    </div>
    <div class="market-score-track" aria-label="Market Score"><span style="width:${summary.score}%"></span></div>
    <div class="executive-grid">
      <div><small>Fortaleza</small><strong>${sentiment.up} verdes / ${sentiment.down} rojas</strong></div>
      <div><small>Líder</small><strong>${safeMarketEscape(summary.leader)}</strong></div>
      <div><small>Sector fuerte</small><strong>${safeMarketEscape(summary.best)}</strong></div>
      <div><small>Riesgo</small><strong>${safeMarketEscape(summary.risk)}</strong></div>
    </div>
    <p class="market-agent-text">${safeMarketEscape(buildMarketAgentText())}</p>
  </section>`;
}

function renderMarketScorePanel(sentiment = marketSentiment()) {
  const score = marketScore(sentiment);
  return `<section class="panel-card market-score-panel">
    ${sectionTitle('Market Score', marketStrengthLabel(score))}
    <div class="score-scale"><span>ROJO</span><span>NEUTRAL</span><span>VERDE</span></div>
    <div class="market-score-track large"><span style="width:${score}%"></span></div>
    <div class="score-kpis">
      <div><strong>${score}</strong><small>Score</small></div>
      <div><strong>${formatPercent(sentiment.avg)}</strong><small>Promedio</small></div>
      <div><strong>${safeMarketEscape(sentiment.bestSector ? shortSector(sentiment.bestSector.sector) : '—')}</strong><small>Sector fuerte</small></div>
    </div>
  </section>`;
}

function renderMarketVisibleAlerts() {
  const alerts = readMarketAlerts();
  const triggered = alerts.filter(a => a.triggeredAt);
  return `<section class="panel-card market-alert-strip">
    ${sectionTitle('Alertas activas', `${alerts.length} creadas`)}
    <div class="alert-overview-grid">
      <div><strong>${alerts.length}</strong><small>Vigilando</small></div>
      <div><strong>${triggered.length}</strong><small>Disparadas</small></div>
      <div><strong>${alerts.filter(a => a.active && !a.triggeredAt).length}</strong><small>Activas</small></div>
    </div>
    ${triggered.length ? `<div class="triggered-strip">${triggered.slice(0, 3).map(a => `<button onclick="selectStock('${safeMarketEscape(a.symbol)}')">🚨 ${safeMarketEscape(a.symbol)} · ${safeMarketEscape(describeAlertTarget(a))}</button>`).join('')}</div>` : `<div class="empty-state compact">Sin alertas disparadas. Crea una desde el detalle de cualquier acción.</div>`}
  </section>`;
}

function renderMarketEducationPanel() {
  return `<section class="panel-card market-education-panel">
    ${sectionTitle('Modo educación', 'APRENDER')}
    <div class="education-list">
      <div><strong>Mapa de calor</strong><p>Verde indica subida y rojo indica caída. La intensidad ayuda a detectar fuerza o presión relativa.</p></div>
      <div><strong>Sentimiento</strong><p>Resume cuántas acciones están positivas, negativas o neutrales y evita depender de un único símbolo.</p></div>
      <div><strong>Sector</strong><p>Comparar por sector permite ver rotación: dónde entra o sale fuerza dentro del mercado.</p></div>
    </div>
  </section>`;
}

function renderSectorRotation(sentiment = marketSentiment()) {
  const sectors = sentiment.sectors || [];
  const inflow = sectors.filter(s => Number(s.avg) > .15).slice(0, 3).map(s => shortSector(s.sector));
  const pressure = [...sectors].reverse().filter(s => Number(s.avg) < -.15).slice(0, 3).map(s => shortSector(s.sector));
  const text = inflow.length
    ? `Capital relativo fluyendo hacia ${inflow.join(', ')}. ${pressure.length ? 'Presión en ' + pressure.join(', ') + '.' : 'No hay presión sectorial amplia.'}`
    : `No hay rotación clara. El mercado necesita confirmación entre sectores.`;
  return `<div class="sector-rotation-box">
    <span class="eyebrow">ROTACIÓN SECTORIAL</span>
    <p>${safeMarketEscape(text)} Lectura educativa: compara liderazgo sectorial con acciones individuales antes de construir hipótesis.</p>
  </div>`;
}

function renderAdvancedSectors(sentiment = marketSentiment()) {
  const sectors = sentiment.sectors || [];
  return `<section class="panel-card sector-advanced pro-sector-panel">
    ${sectionTitle('Sectores avanzados', `${sectors.length} sectores`)}
    <div class="sector-summary-grid">
      <div><small>Sector fuerte</small><strong>${safeMarketEscape(shortSector(sentiment.bestSector?.sector || '—'))}</strong><span>${formatPercent(sentiment.bestSector?.avg || 0)}</span></div>
      <div><small>Sector débil</small><strong>${safeMarketEscape(shortSector(sentiment.worstSector?.sector || '—'))}</strong><span>${formatPercent(sentiment.worstSector?.avg || 0)}</span></div>
      <div><small>Líder</small><strong>${safeMarketEscape(sentiment.strongest?.symbol || '—')}</strong><span>${formatPercent(sentiment.strongest?.changePercent || 0)}</span></div>
    </div>
    ${renderSectorRotation(sentiment)}
    <div class="sector-list">
      ${sectors.map(renderSectorRow).join('') || `<div class="empty-state">Sin datos sectoriales.</div>`}
    </div>
  </section>`;
}

function renderStockDetail(q) {
  const pct = Number(q.changePercent || 0);
  const isWatch = isInUserWatchlist(q.symbol);
  const sectorStats = marketSectorStats().find(s => s.sector === q.sector);
  const rank = getStockRank(q.symbol);
  const sectorAvg = sectorStats ? Number(sectorStats.avg || 0) : 0;
  const relative = pct - sectorAvg;
  return `<section class="panel-card stock-detail stock-detail-pro" id="stock-detail-card">
    <div class="card-topline compact">
      <div class="stock-detail-head">
        <span class="stock-detail-icon">${safeMarketEscape(q.icon)}</span>
        <div><span class="eyebrow">DETALLE AVANZADO DE ACCIÓN</span><h2>${safeMarketEscape(q.symbol)}</h2><small>${safeMarketEscape(q.name)}</small></div>
      </div>
      <button class="icon-btn" onclick="closeStockDetail()">×</button>
    </div>
    <div class="stock-detail-price ${quoteClass(pct)}"><strong>${formatUSD(q.price)}</strong><span>${formatPercent(pct)}</span></div>
    <div class="detail-sparkline-wrap"><span class="eyebrow">SPARKLINE LOCAL</span>${renderSparkline(q.symbol, 'detail-spark')}</div>
    <div class="stock-detail-grid detail-pro-grid">
      <div><small>Ranking día</small><strong>#${safeMarketEscape(rank)}</strong></div>
      <div><small>Fuerza relativa</small><strong>${safeMarketEscape(relativeStrengthLabel(q))}</strong></div>
      <div><small>Sector</small><strong>${safeMarketEscape(shortSector(q.sector))}</strong></div>
      <div><small>Vs sector</small><strong>${formatPercent(relative)}</strong></div>
      <div><small>Apertura</small><strong>${formatUSD(q.open)}</strong></div>
      <div><small>Máximo</small><strong>${formatUSD(q.high)}</strong></div>
      <div><small>Mínimo</small><strong>${formatUSD(q.low)}</strong></div>
      <div><small>Volumen</small><strong>${formatLargeNumber(q.volume)}</strong></div>
    </div>
    <div class="market-detail-agent pro-agent-box"><span class="eyebrow">LECTURA DEL MARKET AGENT</span><p>${safeMarketEscape(describeSingleStock(q))}</p></div>
    <div class="stock-alert-builder"><span class="eyebrow">CREAR ALERTA LOCAL</span><div class="alert-builder-grid"><select id="alert-type-${safeMarketEscape(q.symbol)}"><option value="priceAbove">Precio ≥</option><option value="priceBelow">Precio ≤</option><option value="changeAbove">Cambio % ≥</option><option value="changeBelow">Cambio % ≤</option></select><input id="alert-target-${safeMarketEscape(q.symbol)}" type="number" step="0.01" placeholder="Objetivo"><button class="btn btn-success" onclick="createMarketAlert('${safeMarketEscape(q.symbol)}')">ACTIVAR ALERTA</button></div></div>
    <div class="market-actions detail-actions"><button class="btn ${isWatch ? 'btn-outline' : 'btn-success'}" onclick="toggleWatchlist('${safeMarketEscape(q.symbol)}')">${isWatch ? '☆ QUITAR' : '⭐ SEGUIR'}</button><button class="btn btn-outline" onclick="setMarketFilter('${safeMarketEscape(q.sector)}')">VER SECTOR</button><button class="btn btn-outline" onclick="document.getElementById('market-note-input')?.focus()">AGREGAR NOTA</button></div>
  </section>`;
}
