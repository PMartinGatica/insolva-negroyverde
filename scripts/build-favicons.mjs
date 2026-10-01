/**
 * Genera los favicons del sitio a partir de `public/apple-touch-icon.png`
 * (el cuadrado negro de 180x180 con la "A" verde).
 *
 * Por qué hace falta: Google pide un favicon CUADRADO y de tamaño múltiplo de 48
 * (48x48, 96x96, 144x144). El único icono que declaraba el sitio era
 * `isotipo-verde.svg`, que mide 888x1075 — vertical, no cuadrado — así que Google
 * no tenía nada usable y mostraba su marcador genérico en los resultados.
 *
 * Además, `public/favicon.ico` era en realidad un PNG de 32x32 renombrado. Acá se
 * escribe un .ico de verdad, con los PNG embebidos en 16, 32 y 48.
 *
 * Uso: node scripts/build-favicons.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const FUENTE = 'public/apple-touch-icon.png';
const TAMANOS = [48, 96, 144];
const TAMANOS_ICO = [16, 32, 48];

/** Arma un contenedor .ico (ICONDIR + ICONDIRENTRY por imagen) con PNG embebidos. */
function armarIco(entradas) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(entradas.length, 4);

  const directorio = Buffer.alloc(16 * entradas.length);
  let offset = 6 + 16 * entradas.length;

  entradas.forEach((e, i) => {
    const p = 16 * i;
    // 0 significa 256; para 16/32/48 va el tamaño real.
    directorio.writeUInt8(e.tamano >= 256 ? 0 : e.tamano, p + 0);
    directorio.writeUInt8(e.tamano >= 256 ? 0 : e.tamano, p + 1);
    directorio.writeUInt8(0, p + 2); // colores de paleta
    directorio.writeUInt8(0, p + 3); // reservado
    directorio.writeUInt16LE(1, p + 4); // planos de color
    directorio.writeUInt16LE(32, p + 6); // bits por píxel
    directorio.writeUInt32LE(e.datos.length, p + 8);
    directorio.writeUInt32LE(offset, p + 12);
    offset += e.datos.length;
  });

  return Buffer.concat([cabecera, directorio, ...entradas.map((e) => e.datos)]);
}

const original = await readFile(FUENTE);
const meta = await sharp(original).metadata();
console.log(`fuente: ${FUENTE} (${meta.width}x${meta.height})\n`);

// PNG sueltos, para declararlos con <link rel="icon" sizes="...">.
for (const tamano of TAMANOS) {
  const salida = `public/favicon-${tamano}.png`;
  const info = await sharp(original)
    .resize(tamano, tamano, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(salida);
  console.log(`  ${salida.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

// .ico real, multiresolución.
const entradas = [];
for (const tamano of TAMANOS_ICO) {
  const datos = await sharp(original)
    .resize(tamano, tamano, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  entradas.push({ tamano, datos });
}
const ico = armarIco(entradas);
await writeFile('public/favicon.ico', ico);
console.log(`  public/favicon.ico            ${TAMANOS_ICO.join('/')}  ${(ico.length / 1024).toFixed(1)} KB`);

console.log('\nListo. Acordate de declararlos en el <head> de src/layouts/Layout.astro.');
