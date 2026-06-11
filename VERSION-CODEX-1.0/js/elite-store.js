/* PySec Academy Elite v11.3.0 - Elite Collection Expansion
   Catalogo educativo local con compras directas y contenido visible. */

const PYSEC_STORE_VERSION = '11.3.0';
const PYSEC_WALLET_KEY = 'pysec_wallet';
const PYSEC_STORE_TAB_KEY = 'pysec_store_active_tab';
let pysecTransactionSequence = 0;

const PYSEC_AVATARS = [
  { id: 'recluta-python', name: 'Recluta Python', tier: 'Inicial', price: 0, icon: '🐍', description: 'Avatar inicial para comenzar el entrenamiento PySec.' },
  { id: 'operador-cyber', name: 'Operador Cyber', tier: 'Fundamentos', price: 100, icon: '🛡️', description: 'Operador disciplinado para misiones diarias y rutas core.' },
  { id: 'blue-team-sentinel', name: 'Blue Team Sentinel', tier: 'Fundamentos', price: 180, icon: '🔵', description: 'Defensa, analisis de logs y mentalidad preventiva.' },
  { id: 'ethical-hacker-jr', name: 'Ethical Hacker Jr.', tier: 'Especialización', price: 260, icon: '⚔️', description: 'Practica autorizada, reporte limpio y etica primero.' },
  { id: 'ai-operator', name: 'AI Operator', tier: 'Especialización', price: 320, icon: '🤖', description: 'Mentor local, automatizacion y pensamiento asistido.' },
  { id: 'market-analyst', name: 'Market Analyst', tier: 'Especialización', price: 350, icon: '📈', description: 'Identidad para watchlist, journal y analisis educativo de mercado.' },
  { id: 'shadow-defender', name: 'Shadow Defender', tier: 'Maestría', price: 500, icon: '🌑', description: 'Operador tactico enfocado en defensa y privacidad.' },
  { id: 'pysec-elite', name: 'PySec Elite', tier: 'Elite', price: 750, icon: '👑', description: 'Avatar maximo para operadores que entrenan con constancia.', unlockRequirement: { type: 'level', value: 3, label: 'Alcanza el nivel 3' } },
  { id: 'neon-builder', name: 'Neon Builder', tier: 'Maestría', price: 620, icon: '🧬', description: 'Constructor de proyectos, retos y sistemas propios.' },
  { id: 'zero-day-student', name: 'Zero Day Student', tier: 'Elite', price: 900, icon: '⚡', description: 'Identidad de dominio tecnico obtenida mediante progreso sostenido.', unlockRequirement: { type: 'xp', value: 600, label: 'Acumula 600 XP' } }
];

const PYSEC_THEMES = [
  { id: 'cyber-green', name: 'Cyber Green', tier: 'Inicial', price: 0, icon: '🟢', description: 'Tema base oscuro con verde operativo.', colors: { bgMain: '#050807', bgSoft: '#080d0b', bgCard: 'rgba(12,20,16,.94)', bgCard2: 'rgba(16,27,22,.92)', primary: '#00ff88', secondary: '#19f2a3', danger: '#ff1744', text: '#eafbf2', muted: '#9ab3a6', border: 'rgba(0,255,136,.18)', glow: '0 22px 70px rgba(0,255,136,.10)' } },
  { id: 'blue-team-defense', name: 'Blue Team Defense', tier: 'Fundamentos', price: 150, icon: '🔵', description: 'Azul defensivo, limpio y profesional.', colors: { bgMain: '#030914', bgSoft: '#061428', bgCard: 'rgba(8,21,42,.94)', bgCard2: 'rgba(10,30,56,.92)', primary: '#39a7ff', secondary: '#23e0ff', danger: '#ff4f6d', text: '#edf7ff', muted: '#9eb8d6', border: 'rgba(57,167,255,.22)', glow: '0 22px 70px rgba(57,167,255,.12)' } },
  { id: 'red-team-dark', name: 'Red Team Dark', tier: 'Fundamentos', price: 180, icon: '🔴', description: 'Rojo tactico para entrenar criterio y control.', colors: { bgMain: '#0b0508', bgSoft: '#16080d', bgCard: 'rgba(32,10,17,.94)', bgCard2: 'rgba(45,13,22,.92)', primary: '#ff375f', secondary: '#ff7a3d', danger: '#ff1744', text: '#fff0f4', muted: '#d09aa9', border: 'rgba(255,55,95,.22)', glow: '0 22px 70px rgba(255,55,95,.12)' } },
  { id: 'matrix-mode', name: 'Matrix Mode', tier: 'Especialización', price: 220, icon: '🟩', description: 'Verde intenso, terminal y concentracion profunda.', colors: { bgMain: '#020704', bgSoft: '#041108', bgCard: 'rgba(4,20,9,.95)', bgCard2: 'rgba(5,31,13,.92)', primary: '#39ff14', secondary: '#00ff88', danger: '#ff314f', text: '#eaffea', muted: '#8dce9b', border: 'rgba(57,255,20,.24)', glow: '0 22px 70px rgba(57,255,20,.12)' } },
  { id: 'trading-neon', name: 'Trading Neon', tier: 'Especialización', price: 280, icon: '📊', description: 'Cyan, verde y rojo para el modulo Acciones.', colors: { bgMain: '#030913', bgSoft: '#06111f', bgCard: 'rgba(6,18,32,.95)', bgCard2: 'rgba(8,27,46,.92)', primary: '#00e5ff', secondary: '#00ff88', danger: '#ff3b5c', text: '#ecfbff', muted: '#9bc6d2', border: 'rgba(0,229,255,.22)', glow: '0 22px 70px rgba(0,229,255,.12)' } },
  { id: 'purple-ai-core', name: 'Purple AI Core', tier: 'Especialización', price: 320, icon: '🟣', description: 'Violeta futurista para el mentor y sistemas IA.', colors: { bgMain: '#080617', bgSoft: '#120d2d', bgCard: 'rgba(20,14,46,.95)', bgCard2: 'rgba(30,20,66,.92)', primary: '#a855f7', secondary: '#22d3ee', danger: '#fb4b6b', text: '#f7f0ff', muted: '#c3a9df', border: 'rgba(168,85,247,.25)', glow: '0 22px 70px rgba(168,85,247,.14)' } },
  { id: 'minimal-pro', name: 'Minimal Pro', tier: 'Maestría', price: 350, icon: '◻️', description: 'Oscuro elegante, menos neon y mas lectura.', colors: { bgMain: '#080a0f', bgSoft: '#10131a', bgCard: 'rgba(18,22,31,.96)', bgCard2: 'rgba(25,30,41,.94)', primary: '#f8fafc', secondary: '#94a3b8', danger: '#ff4d67', text: '#f8fafc', muted: '#aab3c2', border: 'rgba(248,250,252,.14)', glow: '0 22px 70px rgba(148,163,184,.08)' } },
  { id: 'gold-elite', name: 'Gold Elite', tier: 'Elite', price: 600, icon: '🟡', description: 'Tema oscuro con acentos dorados para una coleccion avanzada.', colors: { bgMain: '#090806', bgSoft: '#151006', bgCard: 'rgba(27,20,9,.95)', bgCard2: 'rgba(39,29,12,.92)', primary: '#ffd166', secondary: '#00ff88', danger: '#ff3b5c', text: '#fff7e6', muted: '#d6bd84', border: 'rgba(255,209,102,.25)', glow: '0 22px 70px rgba(255,209,102,.14)' } },
  { id: 'vodafone-red-pro', name: 'Red Signal Pro', tier: 'Maestría', price: 480, icon: '📡', description: 'Rojo profesional para dashboards y presentacion.', colors: { bgMain: '#090306', bgSoft: '#16050a', bgCard: 'rgba(31,7,14,.95)', bgCard2: 'rgba(47,9,18,.92)', primary: '#ff003b', secondary: '#ffffff', danger: '#ff4364', text: '#fff4f6', muted: '#ddb2bd', border: 'rgba(255,0,59,.25)', glow: '0 22px 70px rgba(255,0,59,.14)' } },
  { id: 'ice-terminal', name: 'Ice Terminal', tier: 'Especialización', price: 300, icon: '🧊', description: 'Frio, tecnico y elegante para estudio nocturno.', colors: { bgMain: '#031014', bgSoft: '#061a20', bgCard: 'rgba(8,28,36,.95)', bgCard2: 'rgba(11,38,48,.92)', primary: '#7dd3fc', secondary: '#a7f3d0', danger: '#fb7185', text: '#effaff', muted: '#a6c6d1', border: 'rgba(125,211,252,.23)', glow: '0 22px 70px rgba(125,211,252,.12)' } }
];

const PYSEC_PROFILE_FRAMES = [
  { id: 'carbon-frame', name: 'Marco Carbon', tier: 'Inicial', price: 80, icon: '⬛', preview: 'linear-gradient(135deg,#2c3333,#090b0b)', description: 'Borde sobrio de fibra oscura para el perfil.' },
  { id: 'blue-sentinel-frame', name: 'Marco Blue Sentinel', tier: 'Fundamentos', price: 160, icon: '🔷', preview: 'linear-gradient(135deg,#0b3d91,#23e0ff)', description: 'Marco azul defensivo con pulso cyan.' },
  { id: 'neon-chart-frame', name: 'Marco Neon Chart', tier: 'Especialización', price: 240, icon: '📉', preview: 'linear-gradient(135deg,#00e5ff,#00ff88)', description: 'Marco de mercado con lineas neon visibles.' },
  { id: 'ai-core-ring', name: 'AI Core Ring', tier: 'Especialización', price: 280, icon: '🧠', preview: 'linear-gradient(135deg,#7c3aed,#22d3ee)', description: 'Anillo violeta para perfiles de automatizacion.' },
  { id: 'matrix-stream-frame', name: 'Matrix Stream', tier: 'Maestría', price: 360, icon: '⌗', preview: 'linear-gradient(135deg,#071b0d,#39ff14)', description: 'Flujo terminal de alto contraste.' },
  { id: 'gold-command-frame', name: 'Gold Command', tier: 'Elite', price: 520, icon: '✦', preview: 'linear-gradient(135deg,#6b4f00,#ffd166)', description: 'Marco dorado de coleccion Elite.', unlockRequirement: { type: 'level', value: 3, label: 'Alcanza el nivel 3' } }
];

const PYSEC_BADGES = [
  { id: 'verified-student', name: 'Estudiante Verificado', tier: 'Inicial', price: 70, icon: '✓', description: 'Badge de constancia y progreso local.' },
  { id: 'blue-defender-badge', name: 'Blue Defender', tier: 'Fundamentos', price: 140, icon: '🛡️', description: 'Insignia visual para entrenamiento defensivo.' },
  { id: 'market-signal-badge', name: 'Market Signal', tier: 'Especialización', price: 210, icon: '📡', description: 'Badge para analisis educativo de mercado.' },
  { id: 'ai-builder-badge', name: 'AI Builder', tier: 'Especialización', price: 230, icon: '🧩', description: 'Identifica perfiles que construyen con IA local.' },
  { id: 'terminal-master-badge', name: 'Terminal Master', tier: 'Maestría', price: 330, icon: '⌨️', description: 'Marca visual de disciplina tecnica.', unlockRequirement: { type: 'lessons', value: 10, label: 'Completa 10 lecciones' } },
  { id: 'elite-crown-badge', name: 'Elite Crown', tier: 'Elite', price: 480, icon: '♛', description: 'Badge superior de la coleccion Elite.', unlockRequirement: { type: 'xp', value: 500, label: 'Acumula 500 XP' } }
];

const PYSEC_BACKGROUNDS = [
  { id: 'dark-grid', name: 'Dark Grid', tier: 'Inicial', price: 90, icon: '▦', preview: 'radial-gradient(circle at 20% 0%,rgba(0,255,136,.18),transparent 35%),#050807', description: 'Fondo oscuro con reticula operativa.' },
  { id: 'blue-grid', name: 'Blue Defense Grid', tier: 'Fundamentos', price: 170, icon: '🌐', preview: 'radial-gradient(circle at 20% 0%,rgba(35,224,255,.22),transparent 38%),#030914', description: 'Fondo azul para una identidad defensiva.' },
  { id: 'market-grid', name: 'Trading Neon Grid', tier: 'Especialización', price: 260, icon: '📊', preview: 'linear-gradient(135deg,rgba(0,229,255,.22),rgba(0,255,136,.08)),#030913', description: 'Panel de mercado cyan con contraste verde.' },
  { id: 'ai-neural', name: 'AI Neural Core', tier: 'Especialización', price: 290, icon: '🧠', preview: 'radial-gradient(circle at 70% 15%,rgba(168,85,247,.32),transparent 36%),#080617', description: 'Fondo neural violeta para el Mentor IA.' },
  { id: 'matrix-code', name: 'Matrix Code', tier: 'Maestría', price: 380, icon: '01', preview: 'linear-gradient(160deg,rgba(57,255,20,.18),transparent 45%),#020704', description: 'Ambiente terminal verde de concentracion.' },
  { id: 'gold-command-bg', name: 'Gold Command Deck', tier: 'Elite', price: 540, icon: '✦', preview: 'radial-gradient(circle at 50% 0%,rgba(255,209,102,.28),transparent 42%),#090806', description: 'Cubierta dorada para la coleccion Elite.', unlockRequirement: { type: 'level', value: 3, label: 'Alcanza el nivel 3' } }
];

const PYSEC_PETS = [
  { id: 'byte-bot', name: 'Byte Bot', tier: 'Inicial', price: 120, icon: '🤖', description: 'Asistente compacto para el perfil del operador.' },
  { id: 'packet-drone', name: 'Packet Drone', tier: 'Fundamentos', price: 190, icon: '🛸', description: 'Unidad visual de monitoreo de paquetes.' },
  { id: 'cipher-orb', name: 'Cipher Orb', tier: 'Especialización', price: 270, icon: '🔮', description: 'Orbe de cifrado para sesiones de estudio.' },
  { id: 'nano-drone', name: 'Nano Drone', tier: 'Maestría', price: 360, icon: '🛰️', description: 'Compañero tecnico para operadores de terminal.' },
  { id: 'sentinel-orb', name: 'Sentinel Orb', tier: 'Elite', price: 500, icon: '🔆', description: 'Unidad Elite de acompañamiento visual.', unlockRequirement: { type: 'xp', value: 450, label: 'Acumula 450 XP' } }
];

const PYSEC_DASHBOARD_WIDGETS = [
  { id: 'mission-console', name: 'Mission Console', tier: 'Inicial', price: 110, icon: '🎯', description: 'Widget de enfoque para la mision activa.' },
  { id: 'blue-status', name: 'Blue Status', tier: 'Fundamentos', price: 180, icon: '🔵', description: 'Resumen visual de progreso defensivo.' },
  { id: 'market-pulse', name: 'Market Pulse', tier: 'Especialización', price: 250, icon: '📈', description: 'Acceso visual al modulo educativo de mercado.' },
  { id: 'ai-focus', name: 'AI Focus', tier: 'Especialización', price: 280, icon: '🧠', description: 'Acceso visual al Mentor IA local.' },
  { id: 'elite-progress', name: 'Elite Progress', tier: 'Elite', price: 440, icon: '🏆', description: 'Resumen avanzado de XP, coleccion y rango.', unlockRequirement: { type: 'level', value: 3, label: 'Alcanza el nivel 3' } }
];

const PYSEC_CERTIFICATES = [
  { id: 'collection-starter', name: 'Certificado Collection Starter', tier: 'Inicial', price: 130, icon: '📜', description: 'Certificado interno de inicio de coleccion.' },
  { id: 'blue-team-collection', name: 'Certificado Blue Team', tier: 'Fundamentos', price: 220, icon: '📘', description: 'Reconocimiento interno de identidad defensiva.' },
  { id: 'ai-core-collection', name: 'Certificado AI Core', tier: 'Especialización', price: 300, icon: '📑', description: 'Reconocimiento interno de herramientas IA.' },
  { id: 'matrix-collection', name: 'Certificado Matrix', tier: 'Maestría', price: 390, icon: '📗', description: 'Certificado interno de dominio de la coleccion Matrix.', unlockRequirement: { type: 'certificates', value: 1, label: 'Obtén 1 certificado de curso' } },
  { id: 'elite-collection', name: 'Certificado Gold Elite', tier: 'Elite', price: 560, icon: '🎓', description: 'Certificado interno de la coleccion Gold Elite.', unlockRequirement: { type: 'certificates', value: 2, label: 'Obtén 2 certificados de curso' } }
];

const PYSEC_OPERATOR_TITLES = [
  { id: 'python-recruit', name: 'Python Recruit', tier: 'Inicial', price: 60, icon: '⌁', description: 'Titulo inicial para el perfil profesional.' },
  { id: 'blue-operator', name: 'Blue Team Operator', tier: 'Fundamentos', price: 150, icon: '🛡️', description: 'Titulo visible para practica defensiva.' },
  { id: 'market-operator', name: 'Market Operator', tier: 'Especialización', price: 230, icon: '📊', description: 'Titulo para analisis educativo y journal.' },
  { id: 'ai-operator-title', name: 'AI Core Operator', tier: 'Especialización', price: 260, icon: '🧠', description: 'Titulo para automatizacion e IA local.' },
  { id: 'matrix-operator', name: 'Matrix Operator', tier: 'Maestría', price: 350, icon: '⌨️', description: 'Titulo para perfiles orientados a terminal.', unlockRequirement: { type: 'lessons', value: 10, label: 'Completa 10 lecciones' } },
  { id: 'elite-operator-title', name: 'Gold Elite Operator', tier: 'Elite', price: 490, icon: '👑', description: 'Titulo superior de la Elite Collection.', unlockRequirement: { type: 'xp', value: 500, label: 'Acumula 500 XP' } }
];

const PYSEC_PACKS = [
  {
    id: 'pack-blue-team', name: 'Pack Blue Team', tier: 'Fundamentos', price: 690, icon: '🔵',
    description: 'Coleccion defensiva completa con identidad azul.',
    contents: [
      { category: 'avatars', id: 'blue-team-sentinel' },
      { category: 'themes', id: 'blue-team-defense' },
      { category: 'frames', id: 'blue-sentinel-frame' },
      { category: 'badges', id: 'blue-defender-badge' },
      { category: 'backgrounds', id: 'blue-grid' },
      { category: 'widgets', id: 'blue-status' },
      { category: 'titles', id: 'blue-operator' }
    ]
  },
  {
    id: 'pack-trading-neon', name: 'Pack Trading Neon', tier: 'Especialización', price: 980, icon: '📈',
    description: 'Coleccion de mercado con cyan, verde y paneles visibles.',
    contents: [
      { category: 'avatars', id: 'market-analyst' },
      { category: 'themes', id: 'trading-neon' },
      { category: 'frames', id: 'neon-chart-frame' },
      { category: 'badges', id: 'market-signal-badge' },
      { category: 'backgrounds', id: 'market-grid' },
      { category: 'widgets', id: 'market-pulse' },
      { category: 'titles', id: 'market-operator' }
    ]
  },
  {
    id: 'pack-ai-core', name: 'Pack AI Core', tier: 'Especialización', price: 1120, icon: '🧠',
    description: 'Coleccion violeta para Mentor IA y automatizacion local.',
    contents: [
      { category: 'avatars', id: 'ai-operator' },
      { category: 'themes', id: 'purple-ai-core' },
      { category: 'frames', id: 'ai-core-ring' },
      { category: 'badges', id: 'ai-builder-badge' },
      { category: 'backgrounds', id: 'ai-neural' },
      { category: 'pets', id: 'byte-bot' },
      { category: 'widgets', id: 'ai-focus' },
      { category: 'certificates', id: 'ai-core-collection' },
      { category: 'titles', id: 'ai-operator-title' }
    ]
  },
  {
    id: 'pack-matrix', name: 'Pack Matrix', tier: 'Maestría', price: 1260, icon: '🟩',
    description: 'Coleccion terminal con fondo, marco y herramientas Matrix.',
    contents: [
      { category: 'themes', id: 'matrix-mode' },
      { category: 'frames', id: 'matrix-stream-frame' },
      { category: 'badges', id: 'terminal-master-badge' },
      { category: 'backgrounds', id: 'matrix-code' },
      { category: 'pets', id: 'nano-drone' },
      { category: 'widgets', id: 'mission-console' },
      { category: 'certificates', id: 'matrix-collection' },
      { category: 'titles', id: 'matrix-operator' }
    ]
  },
  {
    id: 'pack-gold-elite', name: 'Pack Gold Elite', tier: 'Elite', price: 2450, icon: '👑',
    description: 'Coleccion superior dorada con todos sus componentes declarados.',
    unlockRequirement: { type: 'level', value: 3, label: 'Alcanza el nivel 3' },
    contents: [
      { category: 'avatars', id: 'pysec-elite' },
      { category: 'themes', id: 'gold-elite' },
      { category: 'frames', id: 'gold-command-frame' },
      { category: 'badges', id: 'elite-crown-badge' },
      { category: 'backgrounds', id: 'gold-command-bg' },
      { category: 'pets', id: 'sentinel-orb' },
      { category: 'widgets', id: 'elite-progress' },
      { category: 'certificates', id: 'elite-collection' },
      { category: 'titles', id: 'elite-operator-title' }
    ]
  }
];

const ELITE_CATEGORY_CONFIG = {
  avatars: { label: 'Avatares', singular: 'Avatar', catalog: PYSEC_AVATARS, ownedKey: 'pysec_owned_avatars', equippedKey: 'pysec_equipped_avatar', defaultOwned: ['recluta-python'], defaultEquipped: 'recluta-python' },
  themes: { label: 'Temas', singular: 'Tema', catalog: PYSEC_THEMES, ownedKey: 'pysec_owned_themes', equippedKey: 'pysec_equipped_theme', defaultOwned: ['cyber-green'], defaultEquipped: 'cyber-green' },
  frames: { label: 'Marcos', singular: 'Marco', catalog: PYSEC_PROFILE_FRAMES, ownedKey: 'pysec_owned_frames', equippedKey: 'pysec_equipped_frame' },
  badges: { label: 'Badges', singular: 'Badge', catalog: PYSEC_BADGES, ownedKey: 'pysec_owned_badges', equippedKey: 'pysec_equipped_badge' },
  backgrounds: { label: 'Fondos', singular: 'Fondo', catalog: PYSEC_BACKGROUNDS, ownedKey: 'pysec_owned_backgrounds', equippedKey: 'pysec_equipped_background' },
  pets: { label: 'Mascotas', singular: 'Mascota', catalog: PYSEC_PETS, ownedKey: 'pysec_owned_pets', equippedKey: 'pysec_equipped_pet' },
  widgets: { label: 'Widgets', singular: 'Widget', catalog: PYSEC_DASHBOARD_WIDGETS, ownedKey: 'pysec_owned_widgets', enabledKey: 'pysec_enabled_widgets', multiEquip: true },
  packs: { label: 'Packs', singular: 'Pack', catalog: PYSEC_PACKS, ownedKey: 'pysec_owned_packs' },
  certificates: { label: 'Certificados', singular: 'Certificado', catalog: PYSEC_CERTIFICATES, ownedKey: 'pysec_owned_certificates' },
  titles: { label: 'Títulos', singular: 'Título', catalog: PYSEC_OPERATOR_TITLES, ownedKey: 'pysec_owned_titles', equippedKey: 'pysec_equipped_title' }
};

const ELITE_CATEGORY_ALIASES = {
  avatar: 'avatars', theme: 'themes', frame: 'frames', badge: 'badges',
  background: 'backgrounds', pet: 'pets', widget: 'widgets', pack: 'packs',
  certificate: 'certificates', title: 'titles', purchased: 'collection'
};

function pysecStorageRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function pysecStorageWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}

function normalizeEliteCategory(category) {
  const normalized = String(category || '').toLowerCase();
  return ELITE_CATEGORY_ALIASES[normalized] || normalized;
}

function getEliteCategoryConfig(category) {
  return ELITE_CATEGORY_CONFIG[normalizeEliteCategory(category)] || null;
}

function getEliteCatalog(category) {
  return getEliteCategoryConfig(category)?.catalog || [];
}

function getOwnedEliteItemIds(category) {
  const config = getEliteCategoryConfig(category);
  if (!config) return [];
  const stored = pysecStorageRead(config.ownedKey, config.defaultOwned || []);
  return Array.isArray(stored) ? Array.from(new Set(stored.map(String))) : [...(config.defaultOwned || [])];
}

function setOwnedEliteItemIds(category, ids) {
  const config = getEliteCategoryConfig(category);
  if (!config) return;
  pysecStorageWrite(config.ownedKey, Array.from(new Set((ids || []).map(String))));
}

function getOwnedEliteItems(category) {
  const owned = getOwnedEliteItemIds(category);
  return getEliteCatalog(category).filter(item => owned.includes(item.id));
}

function isEliteItemOwned(category, id) {
  return getOwnedEliteItemIds(category).includes(String(id));
}

function getEquippedEliteItemIds(category) {
  const config = getEliteCategoryConfig(category);
  if (!config) return [];
  if (config.multiEquip) {
    const enabled = pysecStorageRead(config.enabledKey, []);
    return Array.isArray(enabled) ? enabled.map(String) : [];
  }
  if (!config.equippedKey) return [];
  const equipped = localStorage.getItem(config.equippedKey) || config.defaultEquipped || '';
  return equipped ? [equipped] : [];
}

function getEquippedEliteItem(category) {
  const id = getEquippedEliteItemIds(category)[0];
  return id ? getEliteCatalog(category).find(item => item.id === id) || null : null;
}

function findEliteItem(category, id) {
  return getEliteCatalog(category).find(item => item.id === id) || null;
}

function installEliteItemStateAccessors() {
  Object.entries(ELITE_CATEGORY_CONFIG).forEach(([category, config]) => {
    config.catalog.forEach(item => {
      if (!Object.prototype.hasOwnProperty.call(item, 'owned')) {
        Object.defineProperty(item, 'owned', {
          configurable: true,
          enumerable: true,
          get: () => isEliteItemOwned(category, item.id)
        });
      }
      if ((config.equippedKey || config.multiEquip) && !Object.prototype.hasOwnProperty.call(item, 'equipped')) {
        Object.defineProperty(item, 'equipped', {
          configurable: true,
          enumerable: true,
          get: () => getEquippedEliteItemIds(category).includes(item.id)
        });
      }
    });
  });
}

function findAvatar(id) { return findEliteItem('avatars', id) || PYSEC_AVATARS[0]; }
function findTheme(id) { return findEliteItem('themes', id) || PYSEC_THEMES[0]; }
function getOwnedAvatars() { return getOwnedEliteItemIds('avatars'); }
function getOwnedThemes() { return getOwnedEliteItemIds('themes'); }
function setOwnedAvatars(ids) { setOwnedEliteItemIds('avatars', ids); }
function setOwnedThemes(ids) { setOwnedEliteItemIds('themes', ids); }
function getEquippedAvatarId() { return getEquippedEliteItemIds('avatars')[0] || 'recluta-python'; }
function getEquippedThemeId() { return getEquippedEliteItemIds('themes')[0] || 'cyber-green'; }

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

function saveWallet(wallet) {
  pysecStorageWrite(PYSEC_WALLET_KEY, { ...wallet, history: (wallet.history || []).slice(0, 80) });
  renderOperatorCosmetics();
}

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

function applyEquippedTheme() {
  applyThemeColors(findTheme(getEquippedThemeId()));
}

function applyEquippedCosmetics() {
  const root = document.documentElement;
  const background = getEquippedEliteItem('backgrounds');
  const mappings = [
    ['operatorFrame', getEquippedEliteItem('frames')],
    ['operatorBadge', getEquippedEliteItem('badges')],
    ['operatorBackground', background],
    ['operatorPet', getEquippedEliteItem('pets')],
    ['operatorTitle', getEquippedEliteItem('titles')]
  ];
  mappings.forEach(([key, item]) => {
    if (item) root.dataset[key] = item.id;
    else delete root.dataset[key];
  });
  if (background?.preview) root.style.setProperty('--elite-profile-background', background.preview);
  else root.style.removeProperty('--elite-profile-background');
}

(function patchThemeApplication() {
  const patch = () => {
    if (window.__pysecEliteThemePatch) return;
    const baseApplyTheme = window.applyTheme || (typeof applyTheme === 'function' ? applyTheme : null);
    if (!baseApplyTheme) return;
    window.applyTheme = function patchedApplyTheme() {
      try { baseApplyTheme(); } catch (_) {}
      applyEquippedTheme();
      applyEquippedCosmetics();
    };
    try { applyTheme = window.applyTheme; } catch (_) {}
    window.__pysecEliteThemePatch = true;
  };
  patch();
  setTimeout(patch, 0);
})();

function getEliteProgressValue(type) {
  if (typeof state === 'undefined') return 0;
  if (type === 'xp') return Number(state.xp || 0);
  if (type === 'level') return Number(state.level || 1);
  if (type === 'lessons') return Array.isArray(state.completedLessons) ? state.completedLessons.length : 0;
  if (type === 'certificates') return Array.isArray(state.certificates) ? state.certificates.length : 0;
  return 0;
}

function isEliteRequirementMet(requirement) {
  if (!requirement) return true;
  return getEliteProgressValue(requirement.type) >= Number(requirement.value || 0);
}

function eliteRequirementLabel(requirement) {
  if (!requirement) return '';
  return requirement.label || `${requirement.type}: ${requirement.value}`;
}

function unlockEliteItem(category, id) {
  const item = findEliteItem(category, id);
  if (!item) return false;
  const owned = getOwnedEliteItemIds(category);
  if (!owned.includes(id)) {
    owned.push(id);
    setOwnedEliteItemIds(category, owned);
  }
  return true;
}

function refreshEliteStore() {
  renderOperatorCosmetics();
  if (typeof state !== 'undefined' && state.view === 'store') {
    renderEliteStore(localStorage.getItem(PYSEC_STORE_TAB_KEY) || 'avatars');
  }
}

function buyElitePack(pack) {
  if (!pack || isEliteItemOwned('packs', pack.id)) return true;
  if (!isEliteRequirementMet(pack.unlockRequirement)) {
    if (typeof showToast === 'function') showToast('Pack bloqueado', eliteRequirementLabel(pack.unlockRequirement));
    return false;
  }
  if (!canAfford(pack.price)) {
    if (typeof showToast === 'function') showToast('PyCoins insuficientes', `Te faltan ${pack.price - getPyCoins()} PyCoins`);
    return false;
  }
  if (!spendPyCoins(pack.price, `Pack: ${pack.name}`)) return false;
  unlockEliteItem('packs', pack.id);
  (pack.contents || []).forEach(entry => unlockEliteItem(entry.category, entry.id));
  if (typeof showToast === 'function') showToast('Pack desbloqueado', `${pack.name} · ${pack.contents.length} items`);
  refreshEliteStore();
  return true;
}

function buyEliteItem(category, id) {
  const normalized = normalizeEliteCategory(category);
  const config = getEliteCategoryConfig(normalized);
  const item = findEliteItem(normalized, id);
  if (!config || !item) return false;
  if (normalized === 'packs') return buyElitePack(item);
  if (isEliteItemOwned(normalized, id)) {
    if (config.equippedKey || config.multiEquip) return equipEliteItem(normalized, id);
    return true;
  }
  if (!isEliteRequirementMet(item.unlockRequirement)) {
    if (typeof showToast === 'function') showToast(`${config.singular} bloqueado`, eliteRequirementLabel(item.unlockRequirement));
    return false;
  }
  if (!canAfford(item.price)) {
    if (typeof showToast === 'function') showToast('PyCoins insuficientes', `Te faltan ${item.price - getPyCoins()} PyCoins`);
    return false;
  }
  if (!spendPyCoins(item.price, `${config.singular}: ${item.name}`)) return false;
  unlockEliteItem(normalized, item.id);
  if (config.equippedKey || config.multiEquip) equipEliteItem(normalized, item.id, true);
  if (typeof showToast === 'function') showToast(`${config.singular} desbloqueado`, item.name);
  refreshEliteStore();
  return true;
}

function equipEliteItem(category, id, silent = false) {
  const normalized = normalizeEliteCategory(category);
  const config = getEliteCategoryConfig(normalized);
  const item = findEliteItem(normalized, id);
  if (!config || !item || !isEliteItemOwned(normalized, id)) return false;
  if (config.multiEquip) {
    const enabled = getEquippedEliteItemIds(normalized);
    const next = enabled.includes(id) ? enabled.filter(itemId => itemId !== id) : [...enabled, id];
    pysecStorageWrite(config.enabledKey, next);
    if (!silent && typeof showToast === 'function') showToast(next.includes(id) ? 'Widget activado' : 'Widget desactivado', item.name);
  } else if (config.equippedKey) {
    localStorage.setItem(config.equippedKey, item.id);
    if (normalized === 'themes') applyEquippedTheme();
    applyEquippedCosmetics();
    if (!silent && typeof showToast === 'function') showToast(`${config.singular} equipado`, item.name);
  } else {
    return false;
  }
  refreshEliteStore();
  return true;
}

function buyAvatar(id) { return buyEliteItem('avatars', id); }
function equipAvatar(id) { return equipEliteItem('avatars', id); }
function buyTheme(id) { return buyEliteItem('themes', id); }
function equipTheme(id) { return equipEliteItem('themes', id); }

function eliteTierClass(tier) {
  return `tier-${String(tier || 'inicial').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function eliteStoreTabButton(id, label, active) {
  return `<button class="elite-tab ${active === id ? 'active' : ''}" data-action="render-elite-store" data-id="${escapeHtml(id)}">${label}</button>`;
}

function renderElitePreview(item, category) {
  if (category === 'themes') {
    const swatches = [item.colors.primary, item.colors.secondary, item.colors.danger, item.colors.bgSoft]
      .map(color => `<i style="background:${escapeHtml(color)}"></i>`).join('');
    return `<div class="elite-preview elite-theme-preview" style="background:linear-gradient(135deg,${escapeHtml(item.colors.bgMain)},${escapeHtml(item.colors.primary)}33)"><span>${item.icon}</span><div>${swatches}</div></div>`;
  }
  const style = item.preview ? ` style="background:${escapeHtml(item.preview)}"` : '';
  return `<div class="elite-preview elite-item-preview ${eliteTierClass(item.tier)}"${style}><span>${item.icon || '◆'}</span></div>`;
}

function renderEliteItemCard(category, item) {
  const config = getEliteCategoryConfig(category);
  const owned = isEliteItemOwned(category, item.id);
  const equippedIds = getEquippedEliteItemIds(category);
  const equipped = equippedIds.includes(item.id);
  const requirementLocked = !owned && !isEliteRequirementMet(item.unlockRequirement);
  let action = '';
  if (owned && (config.equippedKey || config.multiEquip)) {
    const label = config.multiEquip ? (equipped ? 'DESACTIVAR' : 'ACTIVAR') : (equipped ? 'EQUIPADO' : 'EQUIPAR');
    action = `<button class="elite-card-action ${equipped ? 'equipped' : ''}" data-action="equip-elite-item" data-category="${escapeHtml(category)}" data-item-id="${escapeHtml(item.id)}">${label}</button>`;
  } else if (owned) {
    action = '<button class="elite-card-action equipped" disabled>EN COLECCIÓN</button>';
  } else if (requirementLocked) {
    action = `<button class="elite-card-action elite-locked" disabled>${escapeHtml(eliteRequirementLabel(item.unlockRequirement))}</button>`;
  } else {
    action = `<button class="elite-card-action" data-action="buy-elite-item" data-category="${escapeHtml(category)}" data-item-id="${escapeHtml(item.id)}">COMPRAR · ${item.price} 🪙</button>`;
  }
  return `<article class="elite-item-card elite-store-card ${category === 'themes' ? 'theme-card' : ''} ${owned ? 'elite-owned' : 'is-locked'} ${equipped ? 'elite-equipped is-equipped' : ''} ${requirementLocked ? 'elite-locked' : ''}">
    ${renderElitePreview(item, category)}
    <div class="elite-card-body">
      <div class="elite-card-top"><h3>${escapeHtml(item.name)}</h3><b class="elite-tier ${eliteTierClass(item.tier)}">${escapeHtml(item.tier)}</b></div>
      <p>${escapeHtml(item.description)}</p>
      ${item.unlockRequirement ? `<small class="elite-requirement">${owned || isEliteRequirementMet(item.unlockRequirement) ? 'Requisito cumplido' : escapeHtml(eliteRequirementLabel(item.unlockRequirement))}</small>` : ''}
      <div class="elite-card-meta"><span>${owned ? 'Desbloqueado' : `${item.price} PyCoins`}</span>${equipped ? '<strong>Activo</strong>' : ''}</div>
      ${action}
    </div>
  </article>`;
}

function getElitePackContent(pack) {
  return (pack.contents || []).map(entry => {
    const config = getEliteCategoryConfig(entry.category);
    const item = findEliteItem(entry.category, entry.id);
    return item ? { ...entry, item, label: config.label } : null;
  }).filter(Boolean);
}

function renderPackCard(pack) {
  const owned = isEliteItemOwned('packs', pack.id);
  const requirementLocked = !owned && !isEliteRequirementMet(pack.unlockRequirement);
  const content = getElitePackContent(pack);
  const action = owned
    ? '<button class="elite-card-action equipped" disabled>PACK DESBLOQUEADO</button>'
    : requirementLocked
      ? `<button class="elite-card-action elite-locked" disabled>${escapeHtml(eliteRequirementLabel(pack.unlockRequirement))}</button>`
      : `<button class="elite-card-action" data-action="buy-elite-item" data-category="packs" data-item-id="${escapeHtml(pack.id)}">COMPRAR PACK · ${pack.price} 🪙</button>`;
  return `<article class="elite-pack-card elite-item-card elite-store-card ${owned ? 'elite-owned' : 'is-locked'} ${requirementLocked ? 'elite-locked' : ''}">
    ${renderElitePreview(pack, 'packs')}
    <div class="elite-card-body">
      <div class="elite-card-top"><h3>${escapeHtml(pack.name)}</h3><b class="elite-tier ${eliteTierClass(pack.tier)}">${escapeHtml(pack.tier)}</b></div>
      <p>${escapeHtml(pack.description)}</p>
      <div class="elite-pack-contents">
        <strong>Incluye ${content.length} items visibles</strong>
        ${content.map(entry => `<span><i>${entry.item.icon || '◆'}</i><b>${escapeHtml(entry.item.name)}</b><small>${escapeHtml(entry.label)}</small></span>`).join('')}
      </div>
      <div class="elite-card-meta"><span>${owned ? 'Desbloqueado' : `${pack.price} PyCoins`}</span><strong>Contenido completo</strong></div>
      ${action}
    </div>
  </article>`;
}

function renderCategoryStore(category) {
  return `<section class="elite-store-grid">${getEliteCatalog(category).map(item => renderEliteItemCard(category, item)).join('')}</section>`;
}

function renderAvatarStore() { return renderCategoryStore('avatars'); }
function renderThemeStore() { return renderCategoryStore('themes'); }
function renderFrameStore() { return renderCategoryStore('frames'); }
function renderBadgeStore() { return renderCategoryStore('badges'); }
function renderBackgroundStore() { return renderCategoryStore('backgrounds'); }
function renderPetStore() { return renderCategoryStore('pets'); }
function renderWidgetStore() { return renderCategoryStore('widgets'); }
function renderPackStore() { return `<section class="elite-store-grid elite-pack-grid">${PYSEC_PACKS.map(renderPackCard).join('')}</section>`; }
function renderCertificateStore() { return renderCategoryStore('certificates'); }
function renderTitleStore() { return renderCategoryStore('titles'); }

function renderCollection() {
  const categories = Object.keys(ELITE_CATEGORY_CONFIG);
  const sections = categories.map(category => {
    const owned = getOwnedEliteItems(category);
    if (!owned.length) return '';
    const cards = category === 'packs' ? owned.map(renderPackCard).join('') : owned.map(item => renderEliteItemCard(category, item)).join('');
    return `<section class="elite-collection-group"><div class="os-panel-heading"><div><span>COLECCIÓN</span><h2>${ELITE_CATEGORY_CONFIG[category].label}</h2></div><b>${owned.length}</b></div><div class="elite-store-grid">${cards}</div></section>`;
  }).filter(Boolean).join('');
  return sections || '<section class="panel-card"><p class="os-empty">Tu colección comenzará con los artículos iniciales.</p></section>';
}

function renderPurchasedItems() { return renderCollection(); }

function renderEliteStore(tab = localStorage.getItem(PYSEC_STORE_TAB_KEY) || 'avatars') {
  const renderers = {
    avatars: renderAvatarStore,
    themes: renderThemeStore,
    frames: renderFrameStore,
    badges: renderBadgeStore,
    backgrounds: renderBackgroundStore,
    pets: renderPetStore,
    widgets: renderWidgetStore,
    packs: renderPackStore,
    certificates: renderCertificateStore,
    titles: renderTitleStore,
    collection: renderCollection
  };
  tab = normalizeEliteCategory(tab);
  if (!renderers[tab]) tab = 'avatars';
  localStorage.setItem(PYSEC_STORE_TAB_KEY, tab);
  const avatar = findAvatar(getEquippedAvatarId());
  const theme = findTheme(getEquippedThemeId());
  const wallet = getWallet();
  mainContainer.innerHTML = `
    <button class="os-back" onclick="renderView('profile')">← PERFIL</button>
    <section class="elite-store-hero">
      <div><span class="os-eyebrow">ELITE COLLECTION · v${PYSEC_STORE_VERSION}</span><h1>Tienda Elite</h1><p>Gana PyCoins mediante progreso real. Cada compra tiene precio fijo y contenido visible.</p></div>
      <div class="elite-wallet-card"><span>PYCOINS</span><strong>${wallet.coins}</strong><small>Ganadas: ${wallet.lifetimeEarned} · Gastadas: ${wallet.lifetimeSpent}</small></div>
    </section>
    <section class="elite-equipped-strip">
      <article><span>Avatar activo</span><strong>${avatar.icon} ${escapeHtml(avatar.name)}</strong><small>${escapeHtml(avatar.tier)}</small></article>
      <article><span>Tema activo</span><strong>${theme.icon} ${escapeHtml(theme.name)}</strong><small>${escapeHtml(theme.tier)}</small></article>
      <article><span>Modelo</span><strong>Compra directa</strong><small>Catálogo offline y visible</small></article>
    </section>
    <section class="elite-store-tabs" aria-label="Categorías de Tienda Elite">
      ${eliteStoreTabButton('avatars', 'Avatares', tab)}
      ${eliteStoreTabButton('themes', 'Temas', tab)}
      ${eliteStoreTabButton('frames', 'Marcos', tab)}
      ${eliteStoreTabButton('badges', 'Badges', tab)}
      ${eliteStoreTabButton('backgrounds', 'Fondos', tab)}
      ${eliteStoreTabButton('pets', 'Mascotas', tab)}
      ${eliteStoreTabButton('widgets', 'Widgets', tab)}
      ${eliteStoreTabButton('packs', 'Packs', tab)}
      ${eliteStoreTabButton('certificates', 'Certificados', tab)}
      ${eliteStoreTabButton('titles', 'Títulos', tab)}
      ${eliteStoreTabButton('collection', 'Colección', tab)}
    </section>
    ${renderers[tab]()}
    <section class="elite-history-panel">
      <div class="os-panel-heading"><div><span>HISTORIAL</span><h2>Últimos movimientos</h2></div></div>
      ${(wallet.history || []).slice(0, 8).map(tx => `<div class="elite-tx ${tx.type}"><span>${tx.type === 'earn' ? '+' : '-'}${tx.amount} 🪙</span><p>${escapeHtml(tx.reason)}</p><small>${new Date(tx.date).toLocaleString()}</small></div>`).join('') || '<p class="os-empty">Aún no hay movimientos.</p>'}
    </section>
    <div class="bottom-spacer"></div>`;
}

function operatorCosmeticRow(label, item, fallback = 'Sin equipar') {
  return `<div class="operator-cosmetic-row"><span>${label}</span><strong>${item ? `${item.icon || '◆'} ${escapeHtml(item.name)}` : fallback}</strong></div>`;
}

function renderOperatorCosmetics() {
  try {
    const avatar = findAvatar(getEquippedAvatarId());
    const theme = findTheme(getEquippedThemeId());
    const frame = getEquippedEliteItem('frames');
    const badgeItem = getEquippedEliteItem('badges');
    const background = getEquippedEliteItem('backgrounds');
    const pet = getEquippedEliteItem('pets');
    const title = getEquippedEliteItem('titles');
    const coins = getPyCoins();
    let headerBadge = document.getElementById('elite-cosmetic-badge');
    const target = document.querySelector('.header-system-status');
    if (!headerBadge && target) {
      headerBadge = document.createElement('button');
      headerBadge.id = 'elite-cosmetic-badge';
      headerBadge.className = 'elite-cosmetic-badge';
      headerBadge.type = 'button';
      headerBadge.onclick = () => renderView('store');
      target.insertAdjacentElement('afterend', headerBadge);
    }
    if (headerBadge) {
      headerBadge.innerHTML = `<span class="elite-header-avatar">${avatar.icon}</span>${badgeItem ? `<i>${badgeItem.icon}</i>` : ''}${pet ? `<i>${pet.icon}</i>` : ''}<b>${coins} 🪙</b>`;
      headerBadge.title = [avatar.name, theme.name, title?.name].filter(Boolean).join(' · ');
    }
    const panel = document.getElementById('operator-cosmetics-panel');
    if (panel) {
      panel.innerHTML = `
        <div class="os-panel-heading"><div><span>ELITE COLLECTION</span><h2>Cosméticos equipados</h2></div><button class="os-mini-button" onclick="renderView('store')">TIENDA</button></div>
        <div class="operator-cosmetics-grid">
          ${operatorCosmeticRow('Avatar', avatar)}
          ${operatorCosmeticRow('Tema', theme)}
          ${operatorCosmeticRow('Marco', frame)}
          ${operatorCosmeticRow('Badge', badgeItem)}
          ${operatorCosmeticRow('Fondo', background)}
          ${operatorCosmeticRow('Mascota', pet)}
          ${operatorCosmeticRow('Título', title)}
        </div>`;
    }
    document.documentElement.dataset.operatorAvatar = avatar.id;
    applyEquippedCosmetics();
  } catch (_) {}
}

function ensureEliteStoreDefaults() {
  Object.entries(ELITE_CATEGORY_CONFIG).forEach(([category, config]) => {
    const owned = getOwnedEliteItemIds(category);
    const defaults = config.defaultOwned || [];
    const merged = Array.from(new Set([...defaults, ...owned]));
    if (merged.length !== owned.length || defaults.some(id => !owned.includes(id))) setOwnedEliteItemIds(category, merged);
    if (config.equippedKey && config.defaultEquipped && !localStorage.getItem(config.equippedKey)) {
      localStorage.setItem(config.equippedKey, config.defaultEquipped);
    }
    if (config.multiEquip && !localStorage.getItem(config.enabledKey)) pysecStorageWrite(config.enabledKey, []);
  });
}

installEliteItemStateAccessors();
ensureEliteStoreDefaults();
installPyCoinsRewards();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyEquippedTheme();
    applyEquippedCosmetics();
    renderOperatorCosmetics();
    installPyCoinsRewards();
  });
} else {
  applyEquippedTheme();
  applyEquippedCosmetics();
  renderOperatorCosmetics();
  installPyCoinsRewards();
}

window.PYSEC_AVATARS = PYSEC_AVATARS;
window.PYSEC_THEMES = PYSEC_THEMES;
window.PYSEC_PROFILE_FRAMES = PYSEC_PROFILE_FRAMES;
window.PYSEC_BADGES = PYSEC_BADGES;
window.PYSEC_BACKGROUNDS = PYSEC_BACKGROUNDS;
window.PYSEC_PETS = PYSEC_PETS;
window.PYSEC_DASHBOARD_WIDGETS = PYSEC_DASHBOARD_WIDGETS;
window.PYSEC_PACKS = PYSEC_PACKS;
window.PYSEC_CERTIFICATES = PYSEC_CERTIFICATES;
window.PYSEC_OPERATOR_TITLES = PYSEC_OPERATOR_TITLES;
window.getPyCoins = getPyCoins;
window.addPyCoins = addPyCoins;
window.spendPyCoins = spendPyCoins;
window.canAfford = canAfford;
window.getWalletHistory = getWalletHistory;
window.renderEliteStore = renderEliteStore;
window.renderAvatarStore = renderAvatarStore;
window.renderThemeStore = renderThemeStore;
window.renderFrameStore = renderFrameStore;
window.renderBadgeStore = renderBadgeStore;
window.renderBackgroundStore = renderBackgroundStore;
window.renderPetStore = renderPetStore;
window.renderWidgetStore = renderWidgetStore;
window.renderPackStore = renderPackStore;
window.renderCertificateStore = renderCertificateStore;
window.renderTitleStore = renderTitleStore;
window.renderCollection = renderCollection;
window.buyEliteItem = buyEliteItem;
window.equipEliteItem = equipEliteItem;
window.isEliteItemOwned = isEliteItemOwned;
window.getOwnedEliteItems = getOwnedEliteItems;
window.buyAvatar = buyAvatar;
window.equipAvatar = equipAvatar;
window.buyTheme = buyTheme;
window.equipTheme = equipTheme;
window.applyEquippedTheme = applyEquippedTheme;
window.renderOperatorCosmetics = renderOperatorCosmetics;
