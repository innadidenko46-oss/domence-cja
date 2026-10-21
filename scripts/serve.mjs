// `npm run preview`: serves dist/ the way Vercel does with vercel.json, so the built site
// can be checked before deploying: page files first, the redirects with a 308 (also
// "/systemy/" → "/systemy", as trailingSlash: false does), unknown addresses answered by
// 404.html with status 404, and the same response headers.
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';

const PORT = Number(process.env.PORT) || 4173;
const ROOT = resolve('dist');
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};

const headersFor = (path) =>
  vercel.headers
    .filter(({ source }) => new RegExp(`^${source.replace('(.*)', '.*')}$`).test(path))
    .flatMap(({ headers }) => headers);

const fileFor = (path) => {
  for (const candidate of [path, join(path, 'index.html')]) {
    const file = resolve(join(ROOT, candidate));
    // Nothing outside dist/, not even a sibling folder such as dist-ssr/
    if (file !== ROOT && !file.startsWith(ROOT + sep)) return null;
    try {
      if (statSync(file).isFile()) return file;
    } catch {
      /* try the next one */
    }
  }
  return null;
};

createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let path;
  try {
    path = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad address');
  }
  for (const { key, value } of headersFor(path)) res.setHeader(key, value);

  if (vercel.trailingSlash === false && path.length > 1 && path.endsWith('/')) {
    res.writeHead(308, { Location: `${url.pathname.replace(/\/+$/, '')}${url.search}` });
    return res.end();
  }
  const redirect = vercel.redirects.find((r) => r.source === path);
  if (redirect) {
    res.writeHead(308, { Location: `${redirect.destination}${url.search}` });
    return res.end();
  }

  const file = fileFor(path);
  const served = file ?? fileFor('/404.html');
  if (!served) {
    // dist/ is being rebuilt
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Run npm run build first.');
  }
  res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(served)] ?? 'application/octet-stream' });
  res.end(readFileSync(served));
}).listen(PORT, () => console.log(`Built site: http://localhost:${PORT}`));
