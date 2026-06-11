/* PySec Academy Elite v9.9.0 - Strategy Engine
   Motor local, modular y explicable para perfiles de trading e inversion.
   Los adaptadores de datos pueden ampliarse sin acoplar la UI a una estrategia unica. */

const STRATEGY_ENGINE_VERSION = '1.0.0';
const STRATEGY_STORAGE_KEY = 'pysec_strategy_engine_v1';

const STRATEGY_MODULES = {
  trend: { label: 'Tendencia', short: 'Trend', icon: '↗' },
  momentum: { label: 'Momentum', short: 'Momentum', icon: '⚡' },
  volume: { label: 'Volumen / order flow', short: 'Volumen', icon: '▥' },
  news: { label: 'Noticias', short: 'Noticias', icon: '▤' },
  sentiment: { label: 'Sentimiento', short: 'Sentimiento', icon: '◎' },
  supportResistance: { label: 'Soporte / resistencia', short: 'S/R', icon: '↔' },
  ictSmc: { label: 'ICT / Smart Money', short: 'ICT/SMC', icon: '◇' },
  risk: { label: 'Riesgo', short: 'Riesgo', icon: '!' },
  volatility: { label: 'Volatilidad', short: 'Volatilidad', icon: '≈' }
};

function strategyModules(weights = {}, disabled = []) {
  return Object.fromEntries(Object.keys(STRATEGY_MODULES).map(id => [
    id,
    { enabled: !disabled.includes(id), weight: Number(weights[id] ?? 10) }
  ]));
}

const STRATEGY_PROFILE_TEMPLATES = [
  {
    id: 'scalping',
    name: 'Scalping',
    summary: 'Velocidad, momentum, volatilidad y control de riesgo.',
    category: 'trading',
    markets: ['acciones', 'cripto', 'forex', 'indices'],
    horizon: 'Minutos',
    riskTolerance: .82,
    targetVolatility: 3.2,
    modules: strategyModules({ trend: 8, momentum: 24, volume: 20, news: 4, sentiment: 5, supportResistance: 12, ictSmc: 8, risk: 9, volatility: 18 }),
    tags: ['rapido', 'momentum', 'liquidez']
  },
  {
    id: 'intraday',
    name: 'Intradía',
    summary: 'Balance diario entre tendencia, volumen, niveles y riesgo.',
    category: 'trading',
    markets: ['acciones', 'forex', 'indices', 'cripto'],
    horizon: 'Horas',
    riskTolerance: .68,
    targetVolatility: 2.4,
    modules: strategyModules({ trend: 18, momentum: 18, volume: 16, news: 8, sentiment: 8, supportResistance: 15, ictSmc: 7, risk: 12, volatility: 10 }),
    tags: ['sesion', 'niveles', 'volumen']
  },
  {
    id: 'swing',
    name: 'Swing Trading',
    summary: 'Movimientos de varios días con tendencia, momentum y niveles.',
    category: 'trading',
    markets: ['acciones', 'forex', 'indices', 'cripto'],
    horizon: 'Días / semanas',
    riskTolerance: .56,
    targetVolatility: 1.8,
    modules: strategyModules({ trend: 24, momentum: 17, volume: 12, news: 6, sentiment: 10, supportResistance: 17, ictSmc: 4, risk: 14, volatility: 8 }),
    tags: ['tendencia', 'breakout', 'pullback']
  },
  {
    id: 'long-term',
    name: 'Largo Plazo',
    summary: 'Prioriza tendencia estable, contexto, sentimiento y riesgo.',
    category: 'investing',
    markets: ['acciones', 'indices', 'cripto'],
    horizon: 'Meses / años',
    riskTolerance: .30,
    targetVolatility: .9,
    modules: strategyModules({ trend: 26, momentum: 7, volume: 7, news: 14, sentiment: 17, supportResistance: 8, ictSmc: 0, risk: 25, volatility: 14 }, ['ictSmc']),
    tags: ['inversion', 'calidad', 'riesgo']
  },
  {
    id: 'ict-smc',
    name: 'ICT / Smart Money',
    summary: 'Liquidez, desplazamiento, rangos y zonas institucionales.',
    category: 'methodology',
    markets: ['forex', 'indices', 'cripto', 'acciones'],
    horizon: 'Multi-timeframe',
    riskTolerance: .64,
    targetVolatility: 2.1,
    modules: strategyModules({ trend: 11, momentum: 9, volume: 8, news: 4, sentiment: 4, supportResistance: 22, ictSmc: 30, risk: 12, volatility: 8 }),
    tags: ['liquidez', 'smc', 'estructura']
  },
  {
    id: 'price-action',
    name: 'Price Action',
    summary: 'Estructura de precio, tendencia y soportes sin depender de una sola señal.',
    category: 'methodology',
    markets: ['acciones', 'forex', 'indices', 'cripto'],
    horizon: 'Flexible',
    riskTolerance: .55,
    targetVolatility: 1.7,
    modules: strategyModules({ trend: 27, momentum: 14, volume: 6, news: 0, sentiment: 5, supportResistance: 30, ictSmc: 4, risk: 12, volatility: 8 }, ['news']),
    tags: ['estructura', 'velas', 'niveles']
  },
  {
    id: 'volume-flow',
    name: 'Volumen / Order Flow',
    summary: 'Confirma desplazamientos con participación y presión relativa.',
    category: 'methodology',
    markets: ['acciones', 'indices', 'cripto', 'forex'],
    horizon: 'Intradía / swing',
    riskTolerance: .62,
    targetVolatility: 2.0,
    modules: strategyModules({ trend: 12, momentum: 13, volume: 32, news: 3, sentiment: 7, supportResistance: 13, ictSmc: 7, risk: 9, volatility: 12 }),
    tags: ['volumen', 'participacion', 'flujo']
  },
  {
    id: 'news-sentiment',
    name: 'Noticias / Sentimiento',
    summary: 'Da mayor peso al contexto informativo y al sesgo agregado.',
    category: 'context',
    markets: ['acciones', 'forex', 'indices', 'cripto'],
    horizon: 'Evento / días',
    riskTolerance: .52,
    targetVolatility: 2.2,
    modules: strategyModules({ trend: 8, momentum: 10, volume: 8, news: 31, sentiment: 26, supportResistance: 5, ictSmc: 0, risk: 12, volatility: 8 }, ['ictSmc']),
    tags: ['noticias', 'sentimiento', 'eventos']
  },
  {
    id: 'crypto',
    name: 'Cripto',
    summary: 'Perfil 24/7 orientado a volatilidad, momentum y riesgo.',
    category: 'market',
    markets: ['cripto'],
    horizon: '24/7',
    riskTolerance: .78,
    targetVolatility: 4.0,
    modules: strategyModules({ trend: 14, momentum: 23, volume: 17, news: 8, sentiment: 10, supportResistance: 10, ictSmc: 5, risk: 11, volatility: 20 }),
    tags: ['cripto', '24/7', 'volatilidad']
  },
  {
    id: 'forex',
    name: 'Forex',
    summary: 'Sesiones, tendencia, niveles, volatilidad y gestión de riesgo.',
    category: 'market',
    markets: ['forex'],
    horizon: 'Sesiones',
    riskTolerance: .58,
    targetVolatility: 1.2,
    modules: strategyModules({ trend: 23, momentum: 15, volume: 5, news: 14, sentiment: 7, supportResistance: 19, ictSmc: 10, risk: 16, volatility: 8 }),
    tags: ['forex', 'sesiones', 'macro']
  },
  {
    id: 'stocks',
    name: 'Acciones',
    summary: 'Perfil general para acciones con tendencia, volumen y contexto.',
    category: 'market',
    markets: ['acciones'],
    horizon: 'Días / meses',
    riskTolerance: .48,
    targetVolatility: 1.6,
    modules: strategyModules({ trend: 22, momentum: 14, volume: 16, news: 12, sentiment: 12, supportResistance: 12, ictSmc: 2, risk: 15, volatility: 8 }),
    tags: ['acciones', 'sectores', 'volumen']
  },
  {
    id: 'indices',
    name: 'Índices',
    summary: 'Amplitud, tendencia agregada, sentimiento y riesgo sistémico.',
    category: 'market',
    markets: ['indices'],
    horizon: 'Intradía / swing',
    riskTolerance: .44,
    targetVolatility: 1.1,
    modules: strategyModules({ trend: 24, momentum: 11, volume: 7, news: 13, sentiment: 23, supportResistance: 10, ictSmc: 2, risk: 17, volatility: 8 }),
    tags: ['indices', 'amplitud', 'macro']
  }
].map(profile => ({
  ...profile,
  marketplace: {
    slug: `pysec-${profile.id}`,
    author: 'PySec Academy',
    version: '1.0.0',
    published: false,
    verified: true,
    price: 0,
    compatibleEngine: '^1.0.0'
  }
}));

const STRATEGY_ALERT_TEMPLATES = [
  { id: 'price', name: 'Precio', icon: '$', description: 'Ruptura 2% sobre el precio actual.', type: 'priceAbove' },
  { id: 'volume', name: 'Volumen', icon: '▥', description: 'Volumen 50% sobre la lectura actual.', type: 'volumeAbove' },
  { id: 'trend', name: 'Tendencia', icon: '↗', description: 'Tendencia modular por encima de 70.', type: 'moduleAbove', moduleId: 'trend', target: 70 },
  { id: 'news', name: 'Noticia', icon: '▤', description: 'Noticias/sentimiento informativo sobre 65.', type: 'moduleAbove', moduleId: 'news', target: 65 },
  { id: 'support-resistance', name: 'Soporte / resistencia', icon: '↔', description: 'Ruptura del máximo o resistencia local.', type: 'priceAbove' },
  { id: 'ict', name: 'ICT', icon: '◇', description: 'Lectura ICT/SMC por encima de 70.', type: 'moduleAbove', moduleId: 'ictSmc', target: 70 },
  { id: 'swing', name: 'Swing', icon: '≈', description: 'Strategy Score Swing por encima de 72.', type: 'strategyScoreAbove', profileId: 'swing', target: 72 },
  { id: 'crypto', name: 'Cripto', icon: '₿', description: 'Volatilidad compatible con perfil cripto sobre 72.', type: 'moduleAbove', moduleId: 'volatility', profileId: 'crypto', target: 72 }
];

function cloneStrategyValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function defaultStrategyState() {
  return {
    version: STRATEGY_ENGINE_VERSION,
    activeProfileId: 'swing',
    uiMode: 'simple',
    overrides: {},
    customProfiles: []
  };
}

function readStrategyState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STRATEGY_STORAGE_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return defaultStrategyState();
    return {
      ...defaultStrategyState(),
      ...parsed,
      overrides: parsed.overrides && typeof parsed.overrides === 'object' ? parsed.overrides : {},
      customProfiles: Array.isArray(parsed.customProfiles) ? parsed.customProfiles : []
    };
  } catch (_) {
    return defaultStrategyState();
  }
}

function writeStrategyState(state) {
  const clean = {
    ...defaultStrategyState(),
    ...state,
    version: STRATEGY_ENGINE_VERSION,
    customProfiles: (state.customProfiles || []).slice(0, 30)
  };
  try { localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(clean)); } catch (_) {}
  return clean;
}

function mergeStrategyProfile(base, override = {}) {
  const modules = {};
  for (const id of Object.keys(STRATEGY_MODULES)) {
    modules[id] = {
      enabled: override.modules?.[id]?.enabled ?? base.modules?.[id]?.enabled ?? true,
      weight: Math.max(0, Math.min(40, Number(override.modules?.[id]?.weight ?? base.modules?.[id]?.weight ?? 10)))
    };
  }
  return {
    ...cloneStrategyValue(base),
    ...cloneStrategyValue(override),
    modules,
    marketplace: { ...(base.marketplace || {}), ...(override.marketplace || {}) }
  };
}

function getStrategyProfiles() {
  const state = readStrategyState();
  const builtIn = STRATEGY_PROFILE_TEMPLATES.map(profile => mergeStrategyProfile(profile, state.overrides[profile.id]));
  const custom = state.customProfiles.map(profile => mergeStrategyProfile(profile));
  return [...builtIn, ...custom];
}

function getStrategyProfileById(id) {
  return getStrategyProfiles().find(profile => profile.id === id) || getStrategyProfiles()[0];
}

function getActiveStrategyProfile() {
  const state = readStrategyState();
  return getStrategyProfileById(state.activeProfileId);
}

function setActiveStrategyProfile(profileId) {
  const profile = getStrategyProfileById(profileId);
  if (!profile) return;
  writeStrategyState({ ...readStrategyState(), activeProfileId: profile.id });
  if (typeof showToast === 'function') showToast('Estrategia activada', `${profile.name} · ${profile.horizon}`);
  renderMarketContent();
}

function setStrategyUiMode(mode) {
  const safeMode = mode === 'advanced' ? 'advanced' : 'simple';
  writeStrategyState({ ...readStrategyState(), uiMode: safeMode });
  renderMarketContent();
}

function updateActiveStrategyModule(moduleId, patch) {
  if (!STRATEGY_MODULES[moduleId]) return;
  const state = readStrategyState();
  const active = getActiveStrategyProfile();
  const current = active.modules[moduleId] || { enabled: true, weight: 10 };
  const nextModule = {
    enabled: patch.enabled ?? current.enabled,
    weight: Math.max(0, Math.min(40, Number(patch.weight ?? current.weight)))
  };

  const customIndex = state.customProfiles.findIndex(profile => profile.id === active.id);
  if (customIndex >= 0) {
    state.customProfiles[customIndex] = {
      ...state.customProfiles[customIndex],
      modules: { ...state.customProfiles[customIndex].modules, [moduleId]: nextModule }
    };
  } else {
    state.overrides[active.id] = {
      ...(state.overrides[active.id] || {}),
      modules: { ...(state.overrides[active.id]?.modules || {}), [moduleId]: nextModule }
    };
  }
  writeStrategyState(state);
  renderMarketContent();
}

function toggleStrategyModule(moduleId, enabled) {
  updateActiveStrategyModule(moduleId, { enabled: Boolean(enabled) });
}

function setStrategyModuleWeight(moduleId, weight) {
  updateActiveStrategyModule(moduleId, { weight: Number(weight) });
}

function resetActiveStrategyProfile() {
  const state = readStrategyState();
  const activeId = state.activeProfileId;
  if (state.customProfiles.some(profile => profile.id === activeId)) return;
  delete state.overrides[activeId];
  writeStrategyState(state);
  if (typeof showToast === 'function') showToast('Perfil restaurado', 'Se recuperaron los pesos originales.');
  renderMarketContent();
}

function createCustomStrategyProfile() {
  const input = document.getElementById('strategy-profile-name');
  const name = String(input?.value || '').trim();
  if (name.length < 3) {
    if (typeof showToast === 'function') showToast('Nombre requerido', 'Escribe al menos 3 caracteres.');
    return;
  }
  const state = readStrategyState();
  const source = getActiveStrategyProfile();
  const id = `custom-${Date.now().toString(36)}`;
  const custom = {
    ...cloneStrategyValue(source),
    id,
    name,
    summary: `Perfil personalizado basado en ${source.name}.`,
    category: 'custom',
    marketplace: {
      slug: id,
      author: 'Usuario local',
      version: '1.0.0',
      published: false,
      verified: false,
      price: 0,
      compatibleEngine: '^1.0.0'
    }
  };
  state.customProfiles = [custom, ...state.customProfiles];
  state.activeProfileId = id;
  writeStrategyState(state);
  if (typeof showToast === 'function') showToast('Perfil creado', `${name} está activo y listo para editar.`);
  renderMarketContent();
}

function deleteActiveCustomStrategyProfile() {
  const state = readStrategyState();
  if (!state.activeProfileId.startsWith('custom-')) return;
  state.customProfiles = state.customProfiles.filter(profile => profile.id !== state.activeProfileId);
  state.activeProfileId = 'swing';
  writeStrategyState(state);
  renderMarketContent();
}

function strategyClamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function strategyMedian(values) {
  const clean = values.map(Number).filter(value => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!clean.length) return 0;
  const middle = Math.floor(clean.length / 2);
  return clean.length % 2 ? clean[middle] : (clean[middle - 1] + clean[middle]) / 2;
}

function strategyHistoryChange(quote) {
  const history = typeof getHistoryForSymbol === 'function' ? getHistoryForSymbol(quote.symbol) : [];
  const prices = history.map(item => Number(item.price)).filter(Number.isFinite);
  if (prices.length >= 2 && prices[0] > 0) return ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
  return Number(quote.changePercent || 0);
}

function strategyVolatilityPercent(quote) {
  const high = Number(quote.high);
  const low = Number(quote.low);
  const base = Number(quote.previousClose || quote.open || quote.price || 0);
  if (high > low && base > 0) return ((high - low) / base) * 100;
  return Math.max(.15, Math.abs(Number(quote.changePercent || 0)) * 1.35);
}

function evaluateStrategyModules(quote, profile = getActiveStrategyProfile()) {
  const allQuotes = marketState.quotes || [];
  const sentiment = marketSentiment(allQuotes);
  const sector = marketSectorStats(allQuotes).find(item => item.sector === quote.sector);
  const historyChange = strategyHistoryChange(quote);
  const dailyChange = Number(quote.changePercent || 0);
  const volatility = strategyVolatilityPercent(quote);
  const price = Number(quote.price || 0);
  const high = Number(quote.high || 0);
  const low = Number(quote.low || 0);
  const open = Number(quote.open || 0);
  const range = high > low ? high - low : 0;
  const rangePosition = range > 0 ? (price - low) / range : .5;
  const medianVolume = strategyMedian(allQuotes.map(item => item.volume));
  const relativeVolume = medianVolume > 0 && Number(quote.volume) > 0 ? Number(quote.volume) / medianVolume : 0;
  const breadth = sentiment.total ? (sentiment.up - sentiment.down) / sentiment.total : 0;

  const values = {
    trend: {
      score: strategyClamp(50 + historyChange * 10 + dailyChange * 2),
      reason: `Cambio estructural ${formatPercent(historyChange)}; sesgo diario ${formatPercent(dailyChange)}.`,
      quality: typeof getHistoryForSymbol === 'function' && getHistoryForSymbol(quote.symbol).length >= 2 ? 'observado' : 'proxy diario'
    },
    momentum: {
      score: strategyClamp(50 + dailyChange * 9),
      reason: `Momentum diario ${formatPercent(dailyChange)}.`,
      quality: 'observado'
    },
    volume: {
      score: relativeVolume ? strategyClamp(45 + (relativeVolume - 1) * 35) : 50,
      reason: relativeVolume
        ? `Volumen relativo ${relativeVolume.toFixed(2)}x frente a la mediana del panel.`
        : 'El proveedor actual no entrega volumen comparable; módulo neutral.',
      quality: relativeVolume ? 'observado' : 'sin feed'
    },
    news: {
      score: Number.isFinite(Number(quote.newsSentiment)) ? strategyClamp(50 + Number(quote.newsSentiment) * 50) : 50,
      reason: Number.isFinite(Number(quote.newsSentiment))
        ? `Sentimiento informativo normalizado ${Number(quote.newsSentiment).toFixed(2)}.`
        : 'Sin feed de noticias conectado; no suma ni resta al score.',
      quality: Number.isFinite(Number(quote.newsSentiment)) ? 'observado' : 'sin feed'
    },
    sentiment: {
      score: strategyClamp(50 + breadth * 24 + Number(sentiment.avg || 0) * 5 + Number(sector?.avg || 0) * 4),
      reason: `Amplitud ${sentiment.up}/${sentiment.down}; sector ${formatPercent(sector?.avg || 0)}.`,
      quality: 'observado'
    },
    supportResistance: {
      score: strategyClamp(35 + rangePosition * 45 + (dailyChange > 0 ? 8 : -5)),
      reason: range
        ? `Precio en ${(rangePosition * 100).toFixed(0)}% del rango diario; máximo ${formatUSD(high)}, mínimo ${formatUSD(low)}.`
        : 'Rango intradía no disponible; se usa el cambio diario como proxy.',
      quality: range ? 'observado' : 'proxy diario'
    },
    ictSmc: {
      score: strategyClamp(
        45
        + (rangePosition > .78 && dailyChange > 0 ? 22 : 0)
        + (rangePosition < .28 && price > open && open > 0 ? 24 : 0)
        + Math.min(12, Math.abs(dailyChange) * 3)
      ),
      reason: range
        ? `Heurística local: posición ${(rangePosition * 100).toFixed(0)}% del rango y desplazamiento ${formatPercent(dailyChange)}.`
        : 'Sin velas multi-timeframe; ICT/SMC usa una heurística educativa de rango.',
      quality: range ? 'heurística' : 'proxy'
    },
    risk: {
      score: strategyClamp(100 - volatility * (5 + (1 - Number(profile.riskTolerance || .5)) * 12)),
      reason: `Rango/volatilidad estimada ${volatility.toFixed(2)}%; tolerancia del perfil ${(Number(profile.riskTolerance || .5) * 100).toFixed(0)}%.`,
      quality: 'calculado'
    },
    volatility: {
      score: strategyClamp(100 - Math.abs(volatility - Number(profile.targetVolatility || 1.5)) * 22),
      reason: `Volatilidad ${volatility.toFixed(2)}% frente al objetivo ${Number(profile.targetVolatility || 1.5).toFixed(2)}%.`,
      quality: 'calculado'
    }
  };

  return Object.fromEntries(Object.entries(values).map(([id, result]) => [
    id,
    { id, ...STRATEGY_MODULES[id], ...result }
  ]));
}

function calculateStrategyScore(quote, profile = getActiveStrategyProfile()) {
  if (!quote) return { score: 0, label: 'Sin datos', tone: 'neutral', components: [], explanation: [] };
  const evaluated = evaluateStrategyModules(quote, profile);
  const components = Object.keys(STRATEGY_MODULES).map(id => {
    const setting = profile.modules[id] || { enabled: false, weight: 0 };
    const result = evaluated[id];
    const contribution = setting.enabled ? result.score * Number(setting.weight || 0) : 0;
    return { ...result, enabled: setting.enabled, weight: Number(setting.weight || 0), contribution };
  });
  const active = components.filter(item => item.enabled && item.weight > 0);
  const totalWeight = active.reduce((sum, item) => sum + item.weight, 0);
  const score = totalWeight
    ? Math.round(active.reduce((sum, item) => sum + item.contribution, 0) / totalWeight)
    : 50;
  const ordered = [...active].sort((a, b) => (b.contribution / Math.max(1, b.weight)) - (a.contribution / Math.max(1, a.weight)));
  const label = score >= 78 ? 'Oportunidad fuerte'
    : score >= 64 ? 'Configuración favorable'
      : score >= 48 ? 'Contexto mixto'
        : score >= 34 ? 'Baja convicción'
          : 'Riesgo elevado';
  const tone = score >= 64 ? 'bullish' : score < 42 ? 'bearish' : 'neutral';
  return {
    symbol: quote.symbol,
    profileId: profile.id,
    profileName: profile.name,
    score: strategyClamp(score),
    label,
    tone,
    components,
    explanation: ordered.slice(0, 4).map(item => `${item.label}: ${Math.round(item.score)}/100. ${item.reason}`)
  };
}

function getMarketStrategySummary(quotes = marketState.quotes || [], profile = getActiveStrategyProfile()) {
  const ranked = quotes.map(quote => ({ quote, analysis: calculateStrategyScore(quote, profile) }))
    .sort((a, b) => b.analysis.score - a.analysis.score);
  const average = ranked.length
    ? Math.round(ranked.reduce((sum, item) => sum + item.analysis.score, 0) / ranked.length)
    : 0;
  return { profile, ranked, best: ranked[0] || null, average };
}

function getStrategyMarketplaceCatalog() {
  return getStrategyProfiles().map(profile => ({
    id: profile.id,
    name: profile.name,
    summary: profile.summary,
    markets: profile.markets,
    tags: profile.tags,
    marketplace: profile.marketplace
  }));
}

function openStrategyEngine() {
  marketActiveTab = 'strategy';
  renderMarketContent();
  requestAnimationFrame(() => document.getElementById('strategy-engine-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function renderStrategyQuickBar() {
  const profile = getActiveStrategyProfile();
  const activeCount = Object.values(profile.modules).filter(module => module.enabled && module.weight > 0).length;
  return `<section class="strategy-quick-bar">
    <div>
      <span class="eyebrow">STRATEGY ENGINE</span>
      <strong>${safeMarketEscape(profile.name)}</strong>
      <small>${safeMarketEscape(profile.horizon)} · ${activeCount} módulos · ${safeMarketEscape(profile.markets.join(', '))}</small>
    </div>
    <button type="button" onclick="openStrategyEngine()">CONFIGURAR</button>
  </section>`;
}

function renderStrategyScoreCard(quotes = marketState.quotes || []) {
  const summary = getMarketStrategySummary(quotes);
  const best = summary.best;
  const score = best?.analysis.score || 0;
  const angle = -120 + (score / 100) * 240;
  return `<section class="pro-metric-card strategy-score-card ${best?.analysis.tone || 'neutral'}">
    <div class="pro-card-title">
      <b>STRATEGY SCORE</b>
      <button type="button" onclick="openStrategyEngine()">${safeMarketEscape(summary.profile.name)}</button>
    </div>
    <div class="strategy-score-main">
      <div class="strategy-score-gauge" style="--strategy-angle:${angle}deg">
        <span></span><i></i><strong>${score}</strong><small>/100</small>
      </div>
      <div>
        <b>${safeMarketEscape(best?.quote.symbol || '—')}</b>
        <em>${safeMarketEscape(best?.analysis.label || 'Sin datos')}</em>
        <small>Promedio del panel ${summary.average}/100</small>
      </div>
    </div>
  </section>`;
}

function renderStrategyProfileSelector(profiles, activeId) {
  return `<div class="strategy-profile-strip">
    ${profiles.map(profile => `<button class="${profile.id === activeId ? 'active' : ''}" type="button" data-action="set-strategy-profile" data-id="${safeMarketEscape(profile.id)}">
      <strong>${safeMarketEscape(profile.name)}</strong>
      <small>${safeMarketEscape(profile.horizon)}</small>
    </button>`).join('')}
  </div>`;
}

function renderStrategyOpportunityList(summary) {
  return `<section class="strategy-opportunity-panel">
    <div class="strategy-section-head"><div><span class="eyebrow">OPORTUNIDADES</span><h3>Score adaptable</h3></div><small>${safeMarketEscape(summary.profile.name)}</small></div>
    <div class="strategy-ranked-list">
      ${summary.ranked.slice(0, 5).map(item => `<button type="button" data-action="select-stock" data-symbol="${safeMarketEscape(item.quote.symbol)}">
        <span><strong>${safeMarketEscape(item.quote.symbol)}</strong><small>${safeMarketEscape(item.analysis.label)}</small></span>
        <b class="${item.analysis.tone}">${item.analysis.score}</b>
      </button>`).join('') || '<div class="empty-state">Actualiza el mercado para calcular oportunidades.</div>'}
    </div>
  </section>`;
}

function renderStrategyExplanation(analysis) {
  if (!analysis) return '';
  return `<section class="strategy-explanation-panel">
    <div class="strategy-section-head"><div><span class="eyebrow">POR QUÉ ESTE SCORE</span><h3>${safeMarketEscape(analysis.symbol)} · ${analysis.score}/100</h3></div></div>
    <div class="strategy-explanation-list">
      ${analysis.components.filter(item => item.enabled && item.weight > 0).sort((a, b) => b.weight - a.weight).map(item => `
        <article>
          <div><span>${safeMarketEscape(item.icon)}</span><strong>${safeMarketEscape(item.label)}</strong><em>Peso ${item.weight}</em></div>
          <div class="strategy-module-meter"><i style="width:${item.score}%"></i></div>
          <p><b>${Math.round(item.score)}/100</b> · ${safeMarketEscape(item.reason)} <small>${safeMarketEscape(item.quality)}</small></p>
        </article>`).join('')}
    </div>
  </section>`;
}

function renderStrategyAdvancedControls(profile) {
  return `<section class="strategy-advanced-panel">
    <div class="strategy-section-head"><div><span class="eyebrow">CONFIGURACIÓN AVANZADA</span><h3>Módulos y pesos</h3></div><button type="button" onclick="resetActiveStrategyProfile()">RESTAURAR</button></div>
    <p>Activa solo los módulos que encajan con tu operativa. El score se renormaliza automáticamente.</p>
    <div class="strategy-module-controls">
      ${Object.entries(STRATEGY_MODULES).map(([id, definition]) => {
        const setting = profile.modules[id];
        return `<article class="${setting.enabled ? 'enabled' : 'disabled'}">
          <label>
            <input type="checkbox" ${setting.enabled ? 'checked' : ''} onchange="toggleStrategyModule('${id}', this.checked)">
            <span>${safeMarketEscape(definition.icon)}</span>
            <strong>${safeMarketEscape(definition.label)}</strong>
          </label>
          <div>
            <input type="range" min="0" max="40" step="1" value="${setting.weight}" ${setting.enabled ? '' : 'disabled'} onchange="setStrategyModuleWeight('${id}', this.value)">
            <b>${setting.weight}</b>
          </div>
        </article>`;
      }).join('')}
    </div>
    <div class="strategy-custom-row">
      <input id="strategy-profile-name" maxlength="32" placeholder="Nombre para una copia personalizada">
      <button type="button" onclick="createCustomStrategyProfile()">GUARDAR COPIA</button>
      ${profile.id.startsWith('custom-') ? '<button class="danger" type="button" onclick="deleteActiveCustomStrategyProfile()">ELIMINAR PERFIL</button>' : ''}
    </div>
  </section>`;
}

function renderStrategyMarketplacePreview() {
  const catalog = getStrategyMarketplaceCatalog();
  return `<section class="strategy-marketplace-panel">
    <div class="strategy-section-head"><div><span class="eyebrow">MARKETPLACE READY</span><h3>Catálogo de estrategias</h3></div><small>${catalog.length} perfiles</small></div>
    <p>La estructura ya incluye slug, autor, versión, compatibilidad, mercados, etiquetas, precio y estado de publicación.</p>
    <div class="strategy-marketplace-tags">${catalog.slice(0, 6).map(item => `<span>${safeMarketEscape(item.name)}</span>`).join('')}</div>
  </section>`;
}

function renderStrategyWorkspace() {
  const state = readStrategyState();
  const profiles = getStrategyProfiles();
  const profile = getActiveStrategyProfile();
  const summary = getMarketStrategySummary();
  return `<section id="strategy-engine-workspace" class="strategy-engine-workspace">
    <header class="strategy-engine-head">
      <div><span class="eyebrow">TRADING COMMAND CENTER</span><h2>Strategy Engine</h2><p>No impone una estrategia: adapta módulos y pesos a tu forma de operar.</p></div>
      <span class="strategy-engine-version">ENGINE ${safeMarketEscape(STRATEGY_ENGINE_VERSION)}</span>
    </header>
    <div class="strategy-mode-switch" role="group" aria-label="Nivel de configuración">
      <button class="${state.uiMode === 'simple' ? 'active' : ''}" type="button" onclick="setStrategyUiMode('simple')">VISTA SIMPLE</button>
      <button class="${state.uiMode === 'advanced' ? 'active' : ''}" type="button" onclick="setStrategyUiMode('advanced')">VISTA AVANZADA</button>
    </div>
    ${renderStrategyProfileSelector(profiles, profile.id)}
    <section class="strategy-profile-summary">
      <div><span class="eyebrow">PERFIL ACTIVO</span><h3>${safeMarketEscape(profile.name)}</h3><p>${safeMarketEscape(profile.summary)}</p></div>
      <div class="strategy-profile-meta"><span>${safeMarketEscape(profile.horizon)}</span>${profile.markets.map(market => `<span>${safeMarketEscape(market)}</span>`).join('')}</div>
    </section>
    ${renderStrategyOpportunityList(summary)}
    ${renderStrategyExplanation(summary.best?.analysis)}
    ${state.uiMode === 'advanced' ? renderStrategyAdvancedControls(profile) : ''}
    ${state.uiMode === 'advanced' ? renderStrategyMarketplacePreview() : ''}
  </section>`;
}

function buildStrategyAlert(template, quote) {
  const profileId = template.profileId || getActiveStrategyProfile().id;
  if (template.id === 'price') {
    return { type: 'priceAbove', target: Number(quote.price || 0) * 1.02, profileId };
  }
  if (template.id === 'volume') {
    return { type: 'volumeAbove', target: Math.max(1, Number(quote.volume || 0) * 1.5), profileId };
  }
  if (template.id === 'support-resistance') {
    return { type: 'priceAbove', target: Number(quote.high || 0) > Number(quote.price || 0) ? Number(quote.high) : Number(quote.price || 0) * 1.02, profileId };
  }
  return {
    type: template.type,
    target: Number(template.target || 70),
    moduleId: template.moduleId || '',
    profileId
  };
}

function createStrategyAlertFromTemplate(templateId) {
  const template = STRATEGY_ALERT_TEMPLATES.find(item => item.id === templateId);
  const symbol = String(document.getElementById('strategy-alert-symbol')?.value || '').toUpperCase();
  const quote = getQuoteBySymbol(symbol);
  if (!template || !quote) {
    if (typeof showToast === 'function') showToast('Selecciona un símbolo', 'Actualiza el mercado y elige una acción.');
    return;
  }
  const settings = buildStrategyAlert(template, quote);
  const alert = {
    id: `al_strategy_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    symbol,
    ...settings,
    templateId: template.id,
    templateName: template.name,
    active: true,
    createdAt: new Date().toISOString(),
    triggeredAt: ''
  };
  writeMarketAlerts([alert, ...readMarketAlerts()]);
  if (typeof showToast === 'function') showToast('Plantilla activada', `${template.name} · ${symbol}`);
  renderMarketContent();
}

function evaluateStrategyAlert(alert, quote) {
  if (alert.type === 'volumeAbove') return Number(quote.volume || 0) >= Number(alert.target || 0);
  const profile = getStrategyProfileById(alert.profileId) || getActiveStrategyProfile();
  const analysis = calculateStrategyScore(quote, profile);
  if (alert.type === 'strategyScoreAbove') return analysis.score >= Number(alert.target || 0);
  if (alert.type === 'moduleAbove') {
    const component = analysis.components.find(item => item.id === alert.moduleId);
    return Number(component?.score || 0) >= Number(alert.target || 0);
  }
  return false;
}

function describeStrategyAlert(alert) {
  const template = STRATEGY_ALERT_TEMPLATES.find(item => item.id === alert.templateId);
  const prefix = template ? `${template.name}: ` : '';
  if (alert.type === 'volumeAbove') return `${prefix}volumen ≥ ${formatLargeNumber(alert.target)}`;
  if (alert.type === 'strategyScoreAbove') return `${prefix}Strategy Score ≥ ${Math.round(Number(alert.target || 0))}`;
  if (alert.type === 'moduleAbove') {
    const moduleName = STRATEGY_MODULES[alert.moduleId]?.label || alert.moduleId;
    return `${prefix}${moduleName} ≥ ${Math.round(Number(alert.target || 0))}`;
  }
  return '';
}

function renderStrategyAlertTemplates() {
  const quotes = marketState.quotes || [];
  const options = quotes.map(quote => `<option value="${safeMarketEscape(quote.symbol)}">${safeMarketEscape(quote.symbol)} · ${safeMarketEscape(shortCompanyName(quote.name))}</option>`).join('');
  return `<section class="panel-card strategy-alert-templates">
    <div class="strategy-section-head"><div><span class="eyebrow">PLANTILLAS DE ALERTAS</span><h3>Automatización modular</h3></div><small>${STRATEGY_ALERT_TEMPLATES.length} plantillas</small></div>
    <label for="strategy-alert-symbol">Símbolo</label>
    <select id="strategy-alert-symbol">${options || '<option value="">Sin datos</option>'}</select>
    <div class="strategy-alert-template-grid">
      ${STRATEGY_ALERT_TEMPLATES.map(template => `<button type="button" data-action="create-strategy-alert" data-template-id="${safeMarketEscape(template.id)}">
        <span>${safeMarketEscape(template.icon)}</span><strong>${safeMarketEscape(template.name)}</strong><small>${safeMarketEscape(template.description)}</small>
      </button>`).join('')}
    </div>
  </section>`;
}
