/**
 * Descarga las miniaturas de los YouTube Shorts de INSOLVA y las guarda como
 * WebP vertical en `public/img/videos/`.
 *
 * Se guardan LOCALES a propósito: así la página no le pide nada a Google hasta
 * que la persona toca play. Sin esto, cada visita dispararía peticiones a
 * i.ytimg.com y a los dominios de YouTube aunque nadie mire el video.
 *
 * Uso:  node scripts/build-miniaturas-video.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
// Node 24 lee TypeScript directamente (borra los tipos al cargar).
import { VIDEOS } from '../src/lib/videos.ts';

const OUT = 'public/img/videos';
const ANCHO = 540; // suficiente para un player de ~340px en pantalla retina
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };

await mkdir(OUT, { recursive: true });

let ok = 0;
const fallaron = [];

for (const video of VIDEOS) {
  // `oardefault` es la miniatura en la relación de aspecto original: para un
  // Short, la vertical. `maxresdefault` viene recortada a 16:9.
  const fuentes = [
    `https://i.ytimg.com/vi/${video.id}/oardefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
  ];

  let guardada = false;
  for (const url of fuentes) {
    try {
      const res = await fetch(url, { headers: UA });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const salida = path.join(OUT, `${video.id}.webp`);
      const info = await sharp(buf)
        .resize({ width: ANCHO, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(salida);
      console.log(`  ${video.id}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
      guardada = true;
      ok++;
      break;
    } catch {
      /* probamos la siguiente fuente */
    }
  }
  if (!guardada) fallaron.push(video.id);
}

console.log(`\n${ok} miniaturas en ${OUT}/`);
if (fallaron.length) console.log('Sin miniatura:', fallaron.join(', '));
