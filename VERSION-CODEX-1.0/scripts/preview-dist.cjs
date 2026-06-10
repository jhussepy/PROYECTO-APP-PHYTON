const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT || 8001);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('No existe dist/index.html. Ejecuta primero: npm run build');
  process.exit(1);
}

function resolveRequestPath(url = '/') {
  const pathname = decodeURIComponent(String(url).split('?')[0]);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const resolved = path.resolve(root, `.${requested}`);
  return resolved.startsWith(root) ? resolved : null;
}

http.createServer((request, response) => {
  const target = resolveRequestPath(request.url);
  if (!target) {
    response.writeHead(403);
    return response.end('Forbidden');
  }

  fs.stat(target, (statError, stat) => {
    const filePath = !statError && stat.isFile() ? target : path.join(root, 'index.html');
    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        response.writeHead(404);
        return response.end('Not found');
      }
      response.writeHead(200, {
        'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
      });
      response.end(content);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`PySec dist preview: http://127.0.0.1:${port}/index.html#store`);
});
