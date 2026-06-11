const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js', 'elite-store.js'), 'utf8');
const storage = new Map();
const localStorage = {
  getItem(key) { return storage.has(key) ? storage.get(key) : null; },
  setItem(key, value) { storage.set(key, String(value)); },
  removeItem(key) { storage.delete(key); }
};
const documentElement = {
  dataset: {},
  style: {
    setProperty() {},
    removeProperty() {}
  }
};
const document = {
  readyState: 'loading',
  documentElement,
  addEventListener() {},
  getElementById() { return null; },
  querySelector() { return null; }
};
const window = {};
const context = vm.createContext({
  console,
  document,
  localStorage,
  window,
  state: {
    view: 'qa',
    xp: 1000,
    level: 8,
    completedLessons: Array.from({ length: 20 }, (_, index) => `lesson-${index}`),
    certificates: [{ id: 'cert-1' }, { id: 'cert-2' }]
  },
  setTimeout() { return 0; },
  showToast() {}
});

vm.runInContext(source, context, { filename: 'js/elite-store.js' });

localStorage.setItem('pysec_wallet', JSON.stringify({
  coins: 5000,
  lifetimeEarned: 5000,
  lifetimeSpent: 0,
  history: []
}));

const pack = window.PYSEC_PACKS.find(item => item.id === 'pack-ai-core');
assert.ok(pack, 'Pack AI Core debe existir');
assert.equal(pack.owned, false, 'El pack no debe iniciar comprado');
assert.equal(window.buyEliteItem('packs', pack.id), true, 'La compra del pack debe completarse');
assert.equal(pack.owned, true, 'El pack debe quedar marcado como comprado');
assert.equal(window.getPyCoins(), 5000 - pack.price, 'La compra debe descontar el precio exacto');

for (const entry of pack.contents) {
  assert.equal(
    window.isEliteItemOwned(entry.category, entry.id),
    true,
    `El pack debe desbloquear ${entry.category}/${entry.id}`
  );
}

assert.equal(window.equipEliteItem('frames', 'ai-core-ring'), true, 'El marco del pack debe equiparse');
assert.equal(localStorage.getItem('pysec_equipped_frame'), 'ai-core-ring');
assert.equal(window.equipEliteItem('widgets', 'ai-focus'), true, 'El widget del pack debe activarse');
assert.deepEqual(JSON.parse(localStorage.getItem('pysec_enabled_widgets')), ['ai-focus']);

const requiredTabs = ['Avatares', 'Temas', 'Marcos', 'Badges', 'Fondos', 'Mascotas', 'Widgets', 'Packs', 'Certificados', 'Títulos', 'Colección'];
for (const tab of requiredTabs) assert.ok(source.includes(`'${tab}'`), `Falta el tab ${tab}`);
assert.equal(/Math\.random\s*\(/.test(source), false, 'Elite Store no debe usar Math.random()');

console.log(`OK: ${pack.name} desbloquea ${pack.contents.length} items y persiste equipamiento.`);
