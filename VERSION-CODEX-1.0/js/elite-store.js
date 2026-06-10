/* PySec Academy Elite v11.2.1 — Merit Store
   Tienda educativa local con progreso verificable y compras directas con PyCoins.
   No usa azar, premios aleatorios, pagos reales, apuestas ni activos transferibles. */

const PYSEC_STORE_VERSION = '11.2.1';
const PYSEC_WALLET_KEY = 'pysec_wallet';
const PYSEC_OWNED_AVATARS_KEY = 'pysec_owned_avatars';
const PYSEC_EQUIPPED_AVATAR_KEY = 'pysec_equipped_avatar';
const PYSEC_OWNED_THEMES_KEY = 'pysec_owned_themes';
const PYSEC_EQUIPPED_THEME_KEY = 'pysec_equipped_theme';
const PYSEC_STORE_TAB_KEY = 'pysec_store_active_tab';
let pysecTransactionSequence = 0;

const PYSEC_AVATARS = [
  { id: 'recluta-python', name: 'Recluta Python', tier: 'Inicial', price: 0, icon: '🐍', description: 'Avatar inicial para comenzar el entrenamiento PySec.' },
  { id: 'operador-cyber', name: 'Operador Cyber', tier: 'Fundamentos', price: 100, icon: '🛡️', description: 'Operador disciplinado para misiones diarias y rutas core.' },
  { id: 'blue-team-sentinel', name: 'Blue Team Sentinel', tier: 'Fundamentos', price: 180, icon: '🔵', description: 'Defensa, análisis de logs y mentalidad preventiva.' },
  { id: 'ethical-hacker-jr', name: 'Ethical Hacker Jr.', tier: 'Especialización', price: 260, icon: '⚔️', description: 'Práctica autorizada, reporte limpio y ética primero.' },
  { id: 'ai-operator', name: 'AI Operator', tier: 'Especialización', price: 320, icon: '🤖', description: 'Mentor local, automatización y pensamiento asistido.' },
  { id: 'market-analyst', name: 'Market Analyst', tier: 'Especialización', price: 350, icon: '📈', description: 'Identidad para watchlist, journal y análisis educativo de mercado.' },
  { id: 'shadow-defender', name: 'Shadow Defender', tier: 'Maestría', price: 500, icon: '🌑', description: 'Operador táctico enfocado en defensa y privacidad.' },
  { id: 'pysec-elite', name: 'PySec Elite', tier: 'Elite', price: 750, icon: '👑', description: 'Avatar máximo para operadores que entrenan con constancia.' },
  { id: 'neon-builder', name: 'Neon Builder', tier: 'Maestría', price: 620, icon: '🧬', description: 'Constructor de proyectos, retos y sistemas propios.' },
  { id: 'zero-day-student', name: 'Zero Day Student', tier: 'Elite', price: 900, icon: '⚡', description: 'Identidad de dominio técnico obtenida mediante progreso sostenido.' }
];

const PYSEC_THEMES = [
  { id: 'cyber-green', name: 'Cyber Green', tier: 'Inicial', price: 0, icon: '🟢', description: 'Tema base oscuro con verde operativo.', colors: { bgMain: '#050807', bgSoft: '#080d0b', bgCard: 'rgba(12,20,16,.94)', bgCard2: 'rgba(16,27,22,.92)', primary: '#00ff88', secondary: '#19f2a3', danger: '#ff1744', text: '#eafbf2', muted: '#9ab3a6', border: 'rgba(0,255,136,.18)', glow: '0 22px 70px rgba(0,255,136,.10)' } },
  { id: 'blue-team-defense', name: 'Blue Team Defense', tier: 'Fundamentos', price: 150, icon: '🔵', description: 'Azul defensivo, limpio y profesional.', colors: { bgMain: '#030914', bgSoft: '#061428', bgCard: 'rgba(8,21,42,.94)', bgCard2: 'rgba(10,30,56,.92)', primary: '#39a7ff', secondary: '#23e0ff', danger: '#ff4f6d', text: '#edf7ff', muted: '#9eb8d6', border: 'rgba(57,167,255,.22)', glow: '0 22px 70px rgba(57,167,255,.12)' } },
  { id: 'red-team-dark', name: 'Red Team Dark', tier: 'Fundamentos', price: 180, icon: '🔴', description: 'Rojo táctico para entrenar criterio y control.', colors: { bgMain: '#0b0508', bgSoft: '#16080d', bgCard: 'rgba(32,10,17,.94)', bgCard2: 'rgba(45,13,22,.92)', primary: '#ff375f', secondary: '#ff7a3d', danger: '#ff1744', text: '#fff0f4', muted: '#d09aa9', border: 'rgba(255,55,95,.22)', glow: '0 22px 70px rgba(255,55,95,.12)' } },
  { id: 'matrix-mode', name: 'Matrix Mode', tier: 'Especialización', price: 220, icon: '🟩', description: 'Verde intenso, terminal y concentración profunda.', colors: { bgMain: '#020704', bgSoft: '#041108', bgCard: 'rgba(4,20,9,.95)', bgCard2: 'rgba(5,31,13,.92)', primary: '#39ff14', secondary: '#00ff88', danger: '#ff314f', text: '#eaffea', muted: '#8dce9b', border: 'rgba(57,255,20,.24)', glow: '0 22px 70px rgba(57,255,20,.12)' } },
  { id: 'trading-neon', name: 'Trading Neon', tier: 'Especialización', price: 280, icon: '📊', description: 'Cyan, verde y rojo para el módulo Acciones.', colors: { bgMain: '#030913', bgSoft: '#06111f', bgCard: 'rgba(6,18,32,.95)', bgCard2: 'rgba(8,27,46,.92)', primary: '#00e5ff', secondary: '#00ff88', danger: '#ff3b5c', text: '#ecfbff', muted: '#9bc6d2', border: 'rgba(0,229,255,.22)', glow: '0 22px 70px rgba(0,229,255,.12)' } },
  { id: 'purple-ai-core', name: 'Purple AI Core', tier: 'Especialización', price: 320, icon: '🟣', description: 'Violeta futurista para el mentor y sistemas IA.', colors: { bgMain: '#080617', bgSoft: '#120d2d', bgCard: 'rgba(20,14,46,.95)', bgCard2: 'rgba(30,20,66,.92)', primary: '#a855f7', secondary: '#22d3ee', danger: '#fb4b6b', text: '#f7f0ff', muted: '#c3a9df', border: 'rgba(168,85,247,.25)', glow: '0 22px 70px rgba(168,85,247,.14)' } },
  { id: 'minimal-pro', name: 'Minimal Pro', tier: 'Maestría', price: 350, icon: '◻️', description: 'Oscuro elegante, menos neón y más lectura.', colors: { bgMain: '#080a0f', bgSoft: '#10131a', bgCard: 'rgba(18,22,31,.96)', bgCard2: 'rgba(25,30,41,.94)', primary: '#f8fafc', secondary: '#94a3b8', danger: '#ff4d67', text: '#f8fafc', muted: '#aab3c2', border: 'rgba(248,250,252,.14)', glow: '0 22px 70px rgba(148,163,184,.08)' } },
  { id: 'gold-elite', name: 'Gold Elite', tier: 'Elite', price: 600, icon: '🟡', description: 'Tema oscuro con acentos dorados para una colección avanzada.', colors: { bgMain: '#090806', bgSoft: '#151006', bgCard: 'rgba(27,20,9,.95)', bgCard2: 'rgba(39,29,12,.92)', primary: '#ffd166', secondary: '#00ff88', danger: '#ff3b5c', text: '#fff7e6', muted: '#d6bd84', border: 'rgba(255,209,102,.25)', glow: '0 22px 70px rgba(255,209,102,.14)' } },
  { id: 'vodafone-red-pro', name: 'Red Signal Pro', tier: 'Maestría', price: 480, icon: '📡', description: 'Rojo profesional para dashboards y presentación.', colors: { bgMain: '#090306', bgSoft: '#16050a', bgCard: 'rgba(31,7,14,.95)', bgCard2: 'rgba(47,9,18,.92)', primary: '#ff003b', secondary: '#ffffff', danger: '#ff4364', text: '#fff4f6', muted: '#ddb2bd', border: 'rgba(255,0,59,.25)', glow: '0 22px 70px rgba(255,0,59,.14)' } },
  { id: 'ice-terminal', name: 'Ice Terminal', tier: 'Especialización', price: 300, icon: '🧊', description: 'Frío, técnico y elegante para estudio nocturno.', colors: { bgMain: '#031014', bgSoft: '#061a20', bgCard: 'rgba(8,28,36,.95)', bgCard2: 'rgba(11,38,48,.92)', primary: '#7dd3fc', secondary: '#a7f3d0', danger: '#fb7185', text: '#effaff', muted: '#a6c6d1', border: 'rgba(125,211,252,.23)', glow: '0 22px 70px rgba(125,211,252,.12)' } }
];

function pysecStorageRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) { return fallback; }
}
function pysecStorageWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}
function getPySecDefaultOwnedAvatars() { return ['recluta-python']; }
function getPySecDefaultOwnedThemes() { return ['cyber-green']; }
function getOwnedAvatars() { return pysecStorageRead(PYSEC_OWNED_AVATARS_KEY, getPySecDefaultOwnedAvatars()); }
function getOwnedThemes() { return pysecStorageRead(PYSEC_OWNED_THEMES_KEY, getPySecDefaultOwnedThemes()); }
function setOwnedAvatars(ids) { pysecStorageWrite(PYSEC_OWNED_AVATARS_KEY, Array.from(new Set(ids))); }
function setOwnedThemes(ids) { pysecStorageWrite(PYSEC_OWNED_THEMES_KEY, Array.from(new Set(ids))); }
function getEquippedAvatarId() { return localStorage.getItem(PYSEC_EQUIPPED_AVATAR_KEY) || 'recluta-python'; }
function getEquippedThemeId() { return localStorage.getItem(PYSEC_EQUIPPED_THEME_KEY) || 'cyber-green'; }
function findAvatar(id) { return PYSEC_AVATARS.find(item => item.id === id) || PYSEC_AVATARS[0]; }
function findTheme(id) { return PYSEC_THEMES.find(item => item.id === id) || PYSEC_THEMES[0]; }

function getWallet() {
  const wallet = pysecStorageRead(PYSEC_WALLET_KEY, null);
  if (wallet && typeof wallet === 'object') {
    return {
      coins: Math.max(0, Number(wallet.coins || 0)),
      lifetimeEarned: Math.max(0, Number(wallet.lifetimeEarned || wallet.coins || 0)),
      lifetimeSpent: Math.max(0, Number(wallet.lifetimeSpent || 0)),
      history: Array.isArray(wallet.history) ? wallet.history.slice(0, 80) : []
    };
  }
  return { coins: 0, lifetimeEarned: 0, lifetimeSpent: 0, history: [] };
}
function saveWallet(wallet) { pysecStorageWrite(PYSEC_WALLET_KEY, { ...wallet, history: (wallet.history || []).slice(0, 80) }); renderOperatorCosmetics(); }
function getPyCoins() { return getWallet().coins; }
function getWalletHistory() { return getWallet().history || []; }
function canAfford(amount) { return getPyCoins() >= Number(amount || 0); }
function createPySecTransactionId() {
  pysecTransactionSequence = (pysecTransactionSequence + 1) % 1000000;
  return `tx_${Date.now()}_${pysecTransactionSequence}`;
}
function addWalletHistory(type, amount, reason) {
  const wallet = getWallet();
  wallet.history.unshift({ id: createPySecTransactionId(), type, amount: Number(amount || 0), reason: String(reason || ''), date: new Date().toISOString() });
  return wallet;
}
function addPyCoins(amount, reason = 'Recompensa PySec') {
  const value = Math.max(0, Math.round(Number(amount || 0)));
  if (!value) return getPyCoins();
  const wallet = addWalletHistory('earn', value, reason);
  wallet.coins += value;
  wallet.lifetimeEarned += value;
  saveWallet(wallet);
  if (typeof showToast === 'function') showToast('🪙 PyCoins ganadas', `+${value} · ${reason}`);
  return wallet.coins;
}
function spendPyCoins(amount, reason = 'Compra Elite Store') {
  const value = Math.max(0, Math.round(Number(amount || 0)));
  const wallet = getWallet();
  if (wallet.coins < value) return false;
  wallet.coins -= value;
  wallet.lifetimeSpent += value;
  wallet.history.unshift({ id: createPySecTransactionId(), type: 'spend', amount: value, reason, date: new Date().toISOString() });
  saveWallet(wallet);
  return true;
}

function pysecRewardCoinsForXP(amount) {
  const xp = Number(amount || 0);
  if (xp >= 80) return 30;
  if (xp >= 50) return 20;
  if (xp >= 20) return 10;
  if (xp >= 10) return 5;
  if (xp > 0) return 2;
  return 0;
}
function installPyCoinsRewards() {
  if (window.__pysecCoinsRewardsInstalled) return;
  if (typeof window.addXP !== 'function' && typeof addXP !== 'function') return;
  const originalAddXP = window.addXP || addXP;
  window.addXP = function wrappedAddXP(amount) {
    const result = originalAddXP(amount);
    const coins = pysecRewardCoinsForXP(amount);
    if (coins) addPyCoins(coins, `Recompensa por ${Number(amount || 0)} XP`);
    return result;
  };
  try { addXP = window.addXP; } catch (_) {}
  window.__pysecCoinsRewardsInstalled = true;
}

function applyThemeColors(theme) {
  const colors = theme.colors || {};
  const root = document.documentElement;
  const set = (name, value) => { if (value) root.style.setProperty(name, value); };
  set('--bg-main', colors.bgMain);
  set('--bg-soft', colors.bgSoft);
  set('--bg-elev', colors.bgCard);
  set('--bg-card', colors.bgCard);
  set('--bg-card-2', colors.bgCard2);
  set('--green-python', colors.primary);
  set('--blue-primary', colors.primary);
  set('--blue-glow', colors.secondary);
  set('--cyan', colors.secondary);
  set('--purple', colors.secondary);
  set('--success', colors.secondary || colors.primary);
  set('--error', colors.danger);
  set('--danger', colors.danger);
  set('--text-main', colors.text);
  set('--text-sec', colors.muted);
  set('--muted', colors.muted);
  set('--border', colors.border);
  set('--shadow-glow', colors.glow);
  set('--accent', colors.primary);
  set('--accent-2', colors.secondary);
  set('--panel', colors.bgCard);
  root.dataset.eliteTheme = theme.id;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', colors.bgMain || '#050807');
}
function applyEquippedTheme() { applyThemeColors(findTheme(getEquippedThemeId())); }

(function patchThemeApplication() {
  const patch = () => {
    if (window.__pysecEliteThemePatch) return;
    const baseApplyTheme = window.applyTheme || (typeof applyTheme === 'function' ? applyTheme : null);
    if (!baseApplyTheme) return;
    window.applyTheme = function patchedApplyTheme() {
      try { baseApplyTheme(); } catch (_) {}
      applyEquippedTheme();
    };
    try { applyTheme = window.applyTheme; } catch (_) {}
    window.__pysecEliteThemePatch = true;
  };
  patch();
  setTimeout(patch, 0);
})();

function buyAvatar(id) {
  const avatar = findAvatar(id);
  const owned = getOwnedAvatars();
  if (owned.includes(avatar.id)) return equipAvatar(avatar.id);
  if (!canAfford(avatar.price)) {
    if (typeof showToast === 'function') showToast('PyCoins insuficientes', `Te faltan ${avatar.price - getPyCoins()} PyCoins`);
    return false;
  }
  spendPyCoins(avatar.price, `Avatar: ${avatar.name}`);
  owned.push(avatar.id);
  setOwnedAvatars(owned);
  equipAvatar(avatar.id);
  if (typeof showToast === 'function') showToast('Avatar desbloqueado', avatar.name);
  return true;
}
function equipAvatar(id) {
  const avatar = findAvatar(id);
  if (!getOwnedAvatars().includes(avatar.id)) return false;
  localStorage.setItem(PYSEC_EQUIPPED_AVATAR_KEY, avatar.id);
  renderOperatorCosmetics();
  if (typeof showToast === 'function') showToast('Avatar equipado', avatar.name);
  if (state.view === 'store') renderEliteStore(localStorage.getItem(PYSEC_STORE_TAB_KEY) || 'avatars');
  return true;
}
function buyTheme(id) {
  const theme = findTheme(id);
  const owned = getOwnedThemes();
  if (owned.includes(theme.id)) return equipTheme(theme.id);
  if (!canAfford(theme.price)) {
    if (typeof showToast === 'function') showToast('PyCoins insuficientes', `Te faltan ${theme.price - getPyCoins()} PyCoins`);
    return false;
  }
  spendPyCoins(theme.price, `Tema: ${theme.name}`);
  owned.push(theme.id);
  setOwnedThemes(owned);
  equipTheme(theme.id);
  if (typeof showToast === 'function') showToast('Tema desbloqueado', theme.name);
  return true;
}
function equipTheme(id) {
  const theme = findTheme(id);
  if (!getOwnedThemes().includes(theme.id)) return false;
  localStorage.setItem(PYSEC_EQUIPPED_THEME_KEY, theme.id);
  applyEquippedTheme();
  renderOperatorCosmetics();
  if (typeof showToast === 'function') showToast('Tema equipado', theme.name);
  if (state.view === 'store') renderEliteStore(localStorage.getItem(PYSEC_STORE_TAB_KEY) || 'themes');
  return true;
}

function eliteTierClass(tier) {
  return `tier-${String(tier || 'inicial').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}
function eliteStoreTabButton(id, label, active) {
  return `<button class="elite-tab ${active === id ? 'active' : ''}" onclick="renderEliteStore('${id}')">${label}</button>`;
}
function renderAvatarCard(avatar) {
  const owned = getOwnedAvatars().includes(avatar.id);
  const equipped = getEquippedAvatarId() === avatar.id;
  const locked = !owned;
  const action = owned
    ? `<button class="elite-card-action ${equipped ? 'equipped' : ''}" onclick="equipAvatar('${avatar.id}')">${equipped ? 'EQUIPADO' : 'EQUIPAR'}</button>`
    : `<button class="elite-card-action" onclick="buyAvatar('${avatar.id}')">COMPRAR · ${avatar.price} 🪙</button>`;
  return `<article class="elite-store-card ${equipped ? 'is-equipped' : ''} ${locked ? 'is-locked' : ''}">
    <div class="elite-item-preview ${eliteTierClass(avatar.tier)}"><span>${avatar.icon}</span></div>
    <div class="elite-card-body"><div class="elite-card-top"><h3>${escapeHtml(avatar.name)}</h3><b class="elite-tier ${eliteTierClass(avatar.tier)}">${escapeHtml(avatar.tier)}</b></div>
    <p>${escapeHtml(avatar.description)}</p><div class="elite-card-meta"><span>${owned ? 'Desbloqueado' : `${avatar.price} PyCoins`}</span>${equipped ? '<strong>Activo</strong>' : ''}</div>${action}</div>
  </article>`;
}
function renderThemeCard(theme) {
  const owned = getOwnedThemes().includes(theme.id);
  const equipped = getEquippedThemeId() === theme.id;
  const swatches = [theme.colors.primary, theme.colors.secondary, theme.colors.danger, theme.colors.bgSoft].map(color => `<i style="background:${escapeHtml(color)}"></i>`).join('');
  const action = owned
    ? `<button class="elite-card-action ${equipped ? 'equipped' : ''}" onclick="equipTheme('${theme.id}')">${equipped ? 'EQUIPADO' : 'EQUIPAR'}</button>`
    : `<button class="elite-card-action" onclick="buyTheme('${theme.id}')">COMPRAR · ${theme.price} 🪙</button>`;
  return `<article class="elite-store-card theme-card ${equipped ? 'is-equipped' : ''} ${owned ? '' : 'is-locked'}">
    <div class="elite-theme-preview" style="background:linear-gradient(135deg, ${escapeHtml(theme.colors.bgMain)}, ${escapeHtml(theme.colors.primary)}33)"><span>${theme.icon}</span><div>${swatches}</div></div>
    <div class="elite-card-body"><div class="elite-card-top"><h3>${escapeHtml(theme.name)}</h3><b class="elite-tier ${eliteTierClass(theme.tier)}">${escapeHtml(theme.tier)}</b></div>
    <p>${escapeHtml(theme.description)}</p><div class="elite-card-meta"><span>${owned ? 'Desbloqueado' : `${theme.price} PyCoins`}</span>${equipped ? '<strong>Activo</strong>' : ''}</div>${action}</div>
  </article>`;
}
function renderPurchasedItems() {
  const avatars = PYSEC_AVATARS.filter(item => getOwnedAvatars().includes(item.id));
  const themes = PYSEC_THEMES.filter(item => getOwnedThemes().includes(item.id));
  return `<section class="elite-store-grid">${avatars.map(renderAvatarCard).join('')}${themes.map(renderThemeCard).join('')}</section>`;
}
function renderEliteStore(tab = localStorage.getItem(PYSEC_STORE_TAB_KEY) || 'avatars') {
  tab = ['avatars', 'themes', 'purchased'].includes(tab) ? tab : 'avatars';
  localStorage.setItem(PYSEC_STORE_TAB_KEY, tab);
  const avatar = findAvatar(getEquippedAvatarId());
  const theme = findTheme(getEquippedThemeId());
  const wallet = getWallet();
  const content = tab === 'themes'
    ? `<section class="elite-store-grid">${PYSEC_THEMES.map(renderThemeCard).join('')}</section>`
    : tab === 'purchased'
      ? renderPurchasedItems()
      : `<section class="elite-store-grid">${PYSEC_AVATARS.map(renderAvatarCard).join('')}</section>`;
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('profile')">← PERFIL</button>
    <section class="elite-store-hero">
      <div><span class="os-eyebrow">MERIT STORE · v${PYSEC_STORE_VERSION}</span><h1>Tienda Elite</h1><p>Gana PyCoins mediante progreso real y elige cada compra de forma directa. Sin azar, apuestas ni premios aleatorios.</p></div>
      <div class="elite-wallet-card"><span>PYCOINS</span><strong>${wallet.coins}</strong><small>Ganadas: ${wallet.lifetimeEarned} · Gastadas: ${wallet.lifetimeSpent}</small></div>
    </section>
    <section class="elite-equipped-strip">
      <article><span>Avatar activo</span><strong>${avatar.icon} ${escapeHtml(avatar.name)}</strong><small>${escapeHtml(avatar.tier)}</small></article>
      <article><span>Tema activo</span><strong>${theme.icon} ${escapeHtml(theme.name)}</strong><small>${escapeHtml(theme.tier)}</small></article>
      <article><span>Modelo</span><strong>Progreso verificable</strong><small>Compras directas, sin azar</small></article>
    </section>
    <section class="elite-store-tabs">
      ${eliteStoreTabButton('avatars', 'Avatares', tab)}
      ${eliteStoreTabButton('themes', 'Temas', tab)}
      ${eliteStoreTabButton('purchased', 'Colección', tab)}
    </section>
    ${content}
    <section class="elite-history-panel">
      <div class="os-panel-heading"><div><span>HISTORIAL</span><h2>Últimos movimientos</h2></div></div>
      ${(wallet.history || []).slice(0, 8).map(tx => `<div class="elite-tx ${tx.type}"><span>${tx.type === 'earn' ? '+' : '-'}${tx.amount} 🪙</span><p>${escapeHtml(tx.reason)}</p><small>${new Date(tx.date).toLocaleString()}</small></div>`).join('') || '<p class="os-empty">Aún no hay movimientos.</p>'}
    </section>
    <div class="bottom-spacer"></div>`;
}

function renderOperatorCosmetics() {
  try {
    const avatar = findAvatar(getEquippedAvatarId());
    const theme = findTheme(getEquippedThemeId());
    const coins = getPyCoins();
    let badge = document.getElementById('elite-cosmetic-badge');
    const target = document.querySelector('.header-system-status');
    if (!badge && target) {
      badge = document.createElement('button');
      badge.id = 'elite-cosmetic-badge';
      badge.className = 'elite-cosmetic-badge';
      badge.type = 'button';
      badge.onclick = () => renderView('store');
      target.insertAdjacentElement('afterend', badge);
    }
    if (badge) {
      badge.innerHTML = `<span>${avatar.icon}</span><b>${coins} 🪙</b>`;
      badge.title = `${avatar.name} · ${theme.name}`;
    }
    document.documentElement.dataset.operatorAvatar = avatar.id;
  } catch (_) {}
}

function ensureEliteStoreDefaults() {
  const avatars = getOwnedAvatars();
  if (!avatars.includes('recluta-python')) setOwnedAvatars(['recluta-python', ...avatars]);
  const themes = getOwnedThemes();
  if (!themes.includes('cyber-green')) setOwnedThemes(['cyber-green', ...themes]);
  if (!localStorage.getItem(PYSEC_EQUIPPED_AVATAR_KEY)) localStorage.setItem(PYSEC_EQUIPPED_AVATAR_KEY, 'recluta-python');
  if (!localStorage.getItem(PYSEC_EQUIPPED_THEME_KEY)) localStorage.setItem(PYSEC_EQUIPPED_THEME_KEY, 'cyber-green');
}

ensureEliteStoreDefaults();
installPyCoinsRewards();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { applyEquippedTheme(); renderOperatorCosmetics(); installPyCoinsRewards(); });
} else {
  applyEquippedTheme(); renderOperatorCosmetics(); installPyCoinsRewards();
}

window.PYSEC_AVATARS = PYSEC_AVATARS;
window.PYSEC_THEMES = PYSEC_THEMES;
window.getPyCoins = getPyCoins;
window.addPyCoins = addPyCoins;
window.spendPyCoins = spendPyCoins;
window.canAfford = canAfford;
window.getWalletHistory = getWalletHistory;
window.renderEliteStore = renderEliteStore;
window.buyAvatar = buyAvatar;
window.equipAvatar = equipAvatar;
window.buyTheme = buyTheme;
window.equipTheme = equipTheme;
window.applyEquippedTheme = applyEquippedTheme;
window.renderOperatorCosmetics = renderOperatorCosmetics;
