/**
 * Mide el LCP real contra el sitio ya compilado (dist/), con emulación mobile y
 * el mismo throttling que usa Lighthouse por defecto (Slow 4G + CPU 4x).
 *
 * Corre cada página VARIAS veces y reporta la MEDIANA: bajo throttling de 1,6 Mbps
 * una sola corrida varía ±0,7 s según cómo se reparta el ancho de banda entre las
 * imágenes en paralelo, así que un número suelto no sirve para comparar.
 *
 * Uso: node scripts/measure-lcp.mjs [--runs=3] [ruta ...]
 *      node scripts/measure-lcp.mjs --runs=3 / /servicios/ /trabajos/
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PORT = 4399;

const args = process.argv.slice(2);
const runsArg = args.find((a) => a.startsWith('--runs='));
const RUNS = runsArg ? Math.max(1, parseInt(runsArg.split('=')[1], 10)) : 3;
const RUTAS = args.filter((a) => !a.startsWith('--'));
if (!RUTAS.length) RUTAS.push('/', '/servicios/', '/trabajos/');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4',
};

const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = join(DIST, normalize(url).replace(/^[\\/]+/, ''));
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const buf = await readFile(file);
    res.writeHead(200, {
      'content-type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'content-length': buf.length,
    });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404');
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
console.log(`sirviendo dist/ en http://127.0.0.1:${PORT}  (${RUNS} corridas por página)\n`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 412, height: 915 },
  deviceScaleFactor: 1.75,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
});

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const seg = (n) => `${(n / 1000).toFixed(1)} s`;
const mediana = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

for (const ruta of RUTAS) {
  const corridas = [];

  for (let r = 0; r < RUNS; r++) {
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    // Slow 4G de Lighthouse: 150 ms RTT, 1,6 Mbps de bajada, 750 kbps de subida.
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    await page.addInitScript(() => {
      window.__lcp = [];
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__lcp.push({
            startTime: e.startTime,
            url: e.url || null,
            tag: e.element ? e.element.tagName : null,
            nivel: e.element && e.element.tagName === 'IMG' ? 'imagen' : 'texto',
            src: e.element ? e.element.currentSrc || e.element.getAttribute('src') : null,
          });
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });

    await page.goto(`http://127.0.0.1:${PORT}${ruta}`, { waitUntil: 'load' });
    await page.waitForTimeout(3500);

    const data = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const res = performance.getEntriesByType('resource').map((x) => ({
        name: x.name,
        transfer: x.transferSize,
        start: x.startTime,
        dur: x.duration,
        tipo: x.initiatorType,
      }));
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      return {
        lcp: window.__lcp,
        fcp: fcp ? fcp.startTime : null,
        load: nav ? nav.loadEventEnd : null,
        html: nav ? nav.transferSize : 0,
        res,
      };
    });

    const ultimo = data.lcp.length ? data.lcp[data.lcp.length - 1] : null;
    corridas.push({
      lcp: ultimo ? ultimo.startTime : null,
      elemento: ultimo,
      fcp: data.fcp,
      load: data.load,
      total: data.html + data.res.reduce((a, x) => a + (x.transfer || 0), 0),
      imgs: data.res.filter((x) => x.tipo === 'img' || /\.(webp|png|jpe?g|svg|ico)$/i.test(x.name)),
    });
    await page.close();
  }

  const lcps = corridas.map((c) => c.lcp).filter((x) => x !== null);
  const elemento = corridas.filter((c) => c.elemento).map((c) => c.elemento.src || c.elemento.tag).sort(
    (a, b) => corridas.filter((x) => (x.elemento?.src || x.elemento?.tag) === a).length - corridas.filter((x) => (x.elemento?.src || x.elemento?.tag) === b).length,
  ).pop();
  const base = corridas[corridas.length - 1];

  console.log(`\n══ ${ruta} ══════════════════════════════════════════`);
  console.log(`  LCP mediana ${seg(mediana(lcps))}   (corridas: ${lcps.map(seg).join(', ')})`);
  console.log(`  FCP mediana ${seg(mediana(corridas.map((c) => c.fcp)))}   load mediana ${seg(mediana(corridas.map((c) => c.load)))}`);
  console.log(`  transferido mediana ${kb(mediana(corridas.map((c) => c.total)))}   imágenes ${kb(base.imgs.reduce((a, x) => a + (x.transfer || 0), 0))}`);
  console.log(`  elemento LCP: ${elemento}`);
  console.log('  top imágenes (última corrida):');
  for (const x of base.imgs.sort((a, b) => (b.transfer || 0) - (a.transfer || 0)).slice(0, 6)) {
    console.log(
      `    ${kb(x.transfer || 0).padStart(8)}  inicia ${seg(x.start).padStart(6)}  termina ${seg(x.start + x.dur).padStart(6)}  ${x.name.replace(`http://127.0.0.1:${PORT}`, '')}`,
    );
  }
}

await browser.close();
server.close();
