const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const failures = [];
const jsFiles = fs.readdirSync(path.join(root, 'js'))
  .filter(file => file.endsWith('.js'))
  .map(file => path.join(root, 'js', file));

for (const file of [...jsFiles, path.join(root, 'sw.js')]) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    failures.push(`${path.relative(root, file)}: ${String(error.stderr || error.message).trim()}`);
  }
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
} catch (error) {
  failures.push(`manifest.json: ${error.message}`);
}

if (manifest) {
  const referenced = [
    ...(manifest.icons || []).map(item => item.src),
    ...(manifest.screenshots || []).map(item => item.src)
  ];
  for (const relative of referenced) {
    if (!fs.existsSync(path.join(root, relative))) failures.push(`Asset faltante: ${relative}`);
  }
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const required of ['js/config.js', 'js/platform-core.js', 'js/local-ai-core.js', 'js/learning-paths.js', 'js/learning-os.js']) {
  if (!index.includes(required)) failures.push(`Script no enlazado: ${required}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`OK: ${jsFiles.length + 1} scripts, manifest y assets validados.`);
