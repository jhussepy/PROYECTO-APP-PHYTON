const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 8000);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

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
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      });
      response.end(content);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`PySec Learning OS: http://127.0.0.1:${port}`);
});
