const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const entries = [
  'index.html',
  'offline.html',
  'styles.css',
  'manifest.json',
  'sw.js',
  'README.md',
  'assets',
  'js'
];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) continue;
  fs.cpSync(source, path.join(output, entry), { recursive: true });
}
console.log(`Build estático generado en ${path.relative(root, output)}.`);
