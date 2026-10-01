/**
 * Achica las portadas de las cards de Trabajos (`public/img/trabajo-*.webp`).
 *
 * Estas portadas no salen del pipeline de `build-fotos-servicios.mjs`: son fotos
 * de las primeras versiones de la home y quedaron sin fuente en el repo (las
 * originales viven en `public/fotos-trabajos/`, que está fuera de git). Por eso
 * se recomprimen desde el propio WebP.
 *
 * Por qué se pueden achicar tanto: la portada se muestra con `object-contain`
 * dentro de un marco 4:3, así que una foto vertical de celular se limita por
 * ALTO y nunca ocupa todo el ancho de la card. En la grilla de 2 columnas la foto
 * termina midiendo unos 480 px reales. Guardar 1200x2133 (hasta 306 KB) para ese
 * espacio es gastar el presupuesto de la página en algo que no se ve.
 *
 * No recorta ni reencuadra: solo reduce. Y es idempotente: si la portada ya está
 * por debajo del ancho objetivo, la saltea (para no recomprimir dos veces).
 *
 * Uso: node scripts/shrink-portadas-trabajos.mjs
 */
import { copyFile, readdir, stat, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/img';
const ANCHO_MAX = 720;
const CALIDAD = 74;

// El filtro es estricto a propósito: así no agarra los temporales de una corrida
// anterior que haya quedado a medio terminar.
const archivos = (await readdir(DIR)).filter((f) => /^trabajo-[\w-]+\.webp$/.test(f));

if (!archivos.length) {
  console.log(`No hay portadas trabajo-*.webp en ${DIR}/`);
  process.exit(0);
}

let cambiadas = 0;
let salteadas = 0;

for (const archivo of archivos) {
  const ruta = path.join(DIR, archivo);
  const antes = (await stat(ruta)).size;

  // TODO el trabajo de sharp pasa por una copia temporal, y esa copia va al temp
  // del sistema (no al repo). Dos motivos: libvips mantiene abierto el archivo
  // que lee, así que `unlink` del temporal falla con EBUSY dentro del mismo
  // proceso; y si `metadata()` mira la ruta final, después `toFile()` sobre esa
  // misma ruta falla en Windows ("unable to open for write"). Leyendo y midiendo
  // la copia, la ruta final solo se abre para escribir.
  const copia = path.join(tmpdir(), `insolva-${archivo}`);
  await copyFile(ruta, copia);
  let info = null;
  let dims;
  try {
    dims = await sharp(copia).metadata();
    if (dims.width > ANCHO_MAX) {
      info = await sharp(copia)
        .resize({ width: ANCHO_MAX, withoutEnlargement: true })
        .webp({ quality: CALIDAD })
        .toFile(ruta);
    }
  } finally {
    await unlink(copia).catch(() => {});
  }

  if (!info) {
    console.log(`  ${archivo.padEnd(28)} ${dims.width}x${dims.height}  ${(antes / 1024).toFixed(0)} KB  ya está, se saltea`);
    salteadas++;
    continue;
  }

  console.log(
    `  ${archivo.padEnd(28)} ${dims.width}x${dims.height} → ${info.width}x${info.height}  ` +
      `${(antes / 1024).toFixed(0)} → ${(info.size / 1024).toFixed(0)} KB`,
  );
  cambiadas++;
}

console.log(`\n${cambiadas} portadas achicadas, ${salteadas} salteadas.`);
