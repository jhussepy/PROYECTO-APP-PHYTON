/* Smoke test de carga: ejecuta los scripts del frontend en el mismo orden que index.html
   dentro de un DOM mínimo simulado. Reproduce la semántica del navegador (window === global)
   para detectar errores en tiempo de carga, colisiones de const/let entre archivos y globales
   faltantes. No reemplaza pruebas de UI, pero da una red de regresión rápida y sin dependencias. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

// Orden exacto de <script> en index.html (runner-worker.js se carga como Worker, se excluye).
const SCRIPT_ORDER = [
  'config.js', 'data.js', 'curriculum-upgrade.js', 'learning-paths.js', 'state.js',
  'validation.js', 'platform-core.js', 'local-ai-core.js', 'ai-mentor-cloud.js', 'runner.js',
  'ui-components.js', 'elite-store.js', 'rank-system.js', 'agent-command.js', 'market.js',
  'strategy-engine.js', 'market-intelligence-ux.js', 'market-clean-flow.js',
  'market-command-dashboard.js', 'ai-agent.js', 'ui.js', 'learning-os.js', 'router.js',
  'event-delegation.js', 'app.js'
];

function makeElement() {
  const el = {
    dataset: {},
    style: { setProperty() {}, removeProperty() {}, cssText: '' },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    children: [],
    value: '',
    textContent: '',
    innerHTML: '',
    hidden: false,
    disabled: false,
    checked: false,
    files: [],
    selectionStart: 0,
    selectionEnd: 0,
    scrollTop: 0,
    scrollHeight: 0,
    addEventListener() {},
    removeEventListener() {},
    appendChild(child) { this.children.push(child); return child; },
    insertAdjacentElement() {},
    insertAdjacentHTML() {},
    setAttribute() {},
    getAttribute() { return null; },
    removeAttribute() {},
    remove() {},
    focus() {},
    blur() {},
    select() {},
    click() {},
    scrollIntoView() {},
    closest() { return null; },
    querySelector() { return makeElement(); },
    querySelectorAll() { return []; }
  };
  return el;
}

const elementById = new Map();
const documentMock = {
  readyState: 'complete',
  documentElement: makeElement(),
  body: makeElement(),
  head: makeElement(),
  getElementById(id) {            // fake estable por id: permite que renderView() y sus setup() corran
    if (!elementById.has(id)) elementById.set(id, makeElement());
    return elementById.get(id);
  },
  querySelector() { return makeElement(); },
  querySelectorAll() { return []; },
  createElement() { return makeElement(); },
  createDocumentFragment() { return makeElement(); },
  addEventListener() {},
  removeEventListener() {}
};

const storageFactory = () => {
  const map = new Map();
  return {
    getItem: key => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: key => map.delete(key),
    clear: () => map.clear(),
    key: i => [...map.keys()][i] ?? null,
    get length() { return map.size; }
  };
};

const sandbox = {
  console,
  setTimeout: () => 0,
  clearTimeout: () => {},
  setInterval: () => 0,
  clearInterval: () => {},
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => {},
  queueMicrotask: cb => cb(),
  fetch: () => Promise.reject(new Error('smoke: red deshabilitada')),
  AbortController: globalThis.AbortController,
  URL: globalThis.URL,
  TextEncoder: globalThis.TextEncoder,
  btoa: s => Buffer.from(String(s), 'binary').toString('base64'),
  atob: s => Buffer.from(String(s), 'base64').toString('binary'),
  Worker: class { constructor() {} postMessage() {} terminate() {} addEventListener() {} },
  prompt: () => null,
  confirm: () => false,
  alert: () => {},
  document: documentMock,
  localStorage: storageFactory(),
  sessionStorage: storageFactory(),
  navigator: { onLine: true, serviceWorker: { register: () => Promise.resolve({ update() {} }), getRegistrations: () => Promise.resolve([]) } },
  location: { hash: '', origin: 'http://127.0.0.1:8000', pathname: '/', href: 'http://127.0.0.1:8000/', reload() {} },
  history: { replaceState() {}, pushState() {} },
  caches: { keys: () => Promise.resolve([]), open: () => Promise.resolve({ match: () => Promise.resolve(null), put: () => {}, addAll: () => Promise.resolve() }), match: () => Promise.resolve(null), delete: () => Promise.resolve(true) },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  scrollTo() {},
  print() {},
  open() { return null; },
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() { return true; },
  Math, Date, JSON, Number, String, Boolean, Array, Object, RegExp, Map, Set, Promise, Error, isNaN, isFinite, parseInt, parseFloat, Intl
};
// En el navegador window === el objeto global; lo reproducimos para que `window.foo` y `foo` compartan slot.
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.globalThis = sandbox;

vm.createContext(sandbox);

const failures = [];
for (const file of SCRIPT_ORDER) {
  const full = path.join(root, 'js', file);
  let code;
  try {
    code = fs.readFileSync(full, 'utf8');
  } catch (error) {
    failures.push(`No se pudo leer ${file}: ${error.message}`);
    continue;
  }
  try {
    vm.runInContext(code, sandbox, { filename: `js/${file}` });
  } catch (error) {
    failures.push(`Error de carga en ${file}: ${error.message}`);
  }
}

// Globales críticos que deben existir tras cargar todo (firma pública mínima de la app).
const REQUIRED_GLOBALS = {
  renderView: 'function', renderMarket: 'function', renderMarketContent: 'function',
  renderHome: 'function', renderCourses: 'function', renderProfile: 'function',
  renderEliteStore: 'function', buyEliteItem: 'function', applyTheme: 'function',
  loadState: 'function', saveState: 'function', getRankInfo: 'function',
  initEventDelegation: 'function',
  COURSES: 'object', BADGES: 'object', PYSEC_AVATARS: 'object'
};
// Se evalúan dentro del contexto: los `const`/`let` de nivel superior son bindings léxicos
// del entorno global del script (como los classic scripts del navegador), no propiedades del objeto.
const evalInCtx = expr => { try { return vm.runInContext(expr, sandbox); } catch (_) { return undefined; } };
for (const [name, type] of Object.entries(REQUIRED_GLOBALS)) {
  if (evalInCtx(`typeof ${name}`) !== type) {
    failures.push(`Global faltante o de tipo incorrecto: ${name} (esperado ${type}, recibido ${evalInCtx(`typeof ${name}`)})`);
  }
}

// El catálogo debe haberse construido y mutado (curriculum + learning-paths).
const courseCount = evalInCtx('Array.isArray(COURSES) ? COURSES.length : -1');
if (courseCount < 10) {
  failures.push(`COURSES tiene ${courseCount} cursos; se esperaban >= 10 tras los upgrades de currículo.`);
}

// Probe de render: ejecuta cada vista y captura excepciones SÍNCRONAS (las async usan fallback demo).
process.on('unhandledRejection', () => {});
let viewsProbed = 0;
const renderErrors = evalInCtx(`(function () {
  const errs = [];
  try { setupNavigation(); } catch (e) { errs.push('setupNavigation: ' + e.message); return errs; }
  const simple = ['home','courses','profile','mission','market','review','notes','ctf','glossary','rank','mentor','challenges','analyzer','ethical-labs','focus','roadmap','settings','store'];
  const withParams = [
    ['course-detail', { courseId: 'python_desde_cero' }],
    ['lesson', { courseId: 'python_desde_cero', lessonId: 'py_001' }],
    ['practice', { courseId: 'python_desde_cero', lessonId: 'py_001' }],
    ['exam', { courseId: 'python_desde_cero' }],
    ['lab', { courseId: 'python_desde_cero' }],
    ['certificate', { courseId: 'python_desde_cero' }]
  ];
  globalThis.__probed = 0;
  for (const v of simple) { try { renderView(v); globalThis.__probed++; } catch (e) { errs.push(v + ': ' + e.message); } }
  for (const [v, p] of withParams) { try { renderView(v, p); globalThis.__probed++; } catch (e) { errs.push(v + ': ' + e.message); } }
  return errs;
})()`) || [];
viewsProbed = evalInCtx('globalThis.__probed') || 0;
for (const err of renderErrors) failures.push(`Render: ${err}`);

// Scan rendered views for data-action attributes; any found must have a handler in ACTION_REGISTRY.
// At Phase 3.0 (no migrated onclicks yet) this will always report 0 unique actions.
// As Phase 3.1 adds data-action attributes, orphans trigger a hard failure here.
const dataActionScan = evalInCtx(`(function() {
  const re = /data-action="([^"]+)"/g;
  const found = new Set();
  const c = document.getElementById('main-container');
  const simpleViews = ['home','courses','profile','market','notes','review','ctf','glossary','rank','mentor','store'];
  const paramViews = [
    ['course-detail', {courseId:'python_desde_cero'}],
    ['lesson', {courseId:'python_desde_cero', lessonId:'py_001'}],
    ['practice', {courseId:'python_desde_cero', lessonId:'py_001'}],
    ['exam', {courseId:'python_desde_cero'}],
    ['lab', {courseId:'python_desde_cero'}],
    ['certificate', {courseId:'python_desde_cero'}]
  ];
  for (const v of simpleViews) {
    try { renderView(v); } catch (_) {}
    let m; re.lastIndex = 0;
    while ((m = re.exec(c.innerHTML || '')) !== null) found.add(m[1]);
  }
  for (const [v, p] of paramViews) {
    try { renderView(v, p); } catch (_) {}
    let m; re.lastIndex = 0;
    while ((m = re.exec(c.innerHTML || '')) !== null) found.add(m[1]);
  }
  const orphans = [...found].filter(a => typeof ACTION_REGISTRY[a] !== 'function');
  return { found: found.size, orphans };
})()`) || { found: 0, orphans: [] };
if (dataActionScan.orphans.length) {
  failures.push(`Acciones delegadas sin handler: ${dataActionScan.orphans.join(', ')}`);
}

if (failures.length) {
  console.error('SMOKE FALLÓ:\n' + failures.map(f => ' - ' + f).join('\n'));
  process.exit(1);
}
console.log(`OK: ${SCRIPT_ORDER.length} scripts cargados, ${Object.keys(REQUIRED_GLOBALS).length} globales verificados, ${courseCount} cursos, ${viewsProbed} vistas renderizadas sin error. data-action: ${dataActionScan.found} únicas, ${dataActionScan.orphans.length} sin handler.`);
