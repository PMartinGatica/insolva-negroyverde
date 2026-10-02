/**
 * Genera una imagen de Open Graph por servicio: la foto real de la instalación
 * más el wordmark de INSOLVA.
 *
 * Por qué: `og-insolva.png` (solo el logo) funciona para la home y las páginas
 * sin material propio, pero en las 6 páginas de servicio se desaprovecha la foto
 * del trabajo. Acá cada servicio se comparte con su propia imagen, y la marca
 * igual queda presente.
 *
 * Decisiones:
 * - Composición partida: foto a la izquierda, panel oscuro con el logo a la
 *   derecha. Las fotos son verticales de celular y en un marco apaisado un
 *   `cover` a sangre las recortaría justo donde está el trabajo.
 * - El wordmark se recolorea a blanco EN MEMORIA (su CSS trae `.s2 #000001`):
 *   sobre el panel oscuro las letras negras no se verían. El archivo del logo
 *   no se toca.
 * - JPEG y no PNG: son fotos, y en JPEG pesan una fracción.
 *
 * Los datos salen de `src/lib/servicios.ts`, así que si cambia un hero cambia
 * sola la tarjeta. Volver a correr: node scripts/build-og-servicios.mjs
 */
import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { SERVICIOS } from '../src/lib/servicios.ts';

const ANCHO = 1200;
const ALTO = 630;
const PANEL = 440; // ancho del panel de marca
const ANCHO_FOTO = ANCHO - PANEL;
const OSCURO = '#11140F';
const VERDE = '#8cc870'; // el verde del propio logo
const SALIDA = 'public/og';
const CALIDAD = 82;

// Wordmark en blanco, en memoria.
const svgOriginal = await readFile('public/logo.svg', 'utf8');
const svgBlanco = svgOriginal.replace('.s2 { fill: #000001 }', '.s2 { fill: #FFFFFF }');

const logo = await sharp(Buffer.from(svgBlanco), { density: 600 })
  .resize({ width: 300, fit: 'inside' })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

const regla = await sharp({
  create: { width: 72, height: 6, channels: 4, background: VERDE },
})
  .png()
  .toBuffer();

const panel = await sharp({
  create: { width: PANEL, height: ALTO, channels: 4, background: OSCURO },
})
  .png()
  .toBuffer();

await mkdir(SALIDA, { recursive: true });

const topLogo = Math.round((ALTO - logoMeta.height) / 2) - 16;
const miniaturas = [];

for (const servicio of SERVICIOS) {
  const foto = `public${servicio.hero.src}`;

  // Foto recortada para llenar su mitad. Al ser verticales, el recorte se lleva
  // los bordes de arriba y abajo, no los costados.
  const dentro = await sharp(foto)
    .resize(ANCHO_FOTO, ALTO, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const salida = `${SALIDA}/${servicio.slug}.jpg`;
  const info = await sharp({
    create: { width: ANCHO, height: ALTO, channels: 4, background: OSCURO },
  })
    .composite([
      { input: dentro, left: 0, top: 0 },
      { input: panel, left: ANCHO_FOTO, top: 0 },
      { input: logo, left: ANCHO_FOTO + Math.round((PANEL - logoMeta.width) / 2), top: topLogo },
      {
        input: regla,
        left: ANCHO_FOTO + Math.round((PANEL - 72) / 2),
        top: topLogo + logoMeta.height + 26,
      },
    ])
    .jpeg({ quality: CALIDAD, progressive: true, mozjpeg: true })
    .toFile(salida);

  console.log(`  ${servicio.slug.padEnd(38)} ${(info.size / 1024).toFixed(0)} KB`);
  miniaturas.push(await sharp(salida).resize(600).jpeg({ quality: 70 }).toBuffer());
}

// Hoja de contacto, solo para revisar las 6 de una vez.
const celdas = await Promise.all(miniaturas.map((m) => sharp(m).toBuffer({ resolveWithObject: true })));
const anchoCelda = celdas[0].info.width;
const altoCelda = celdas[0].info.height;
await sharp({
  create: { width: anchoCelda * 2, height: altoCelda * 3, channels: 4, background: '#222222' },
})
  .composite(
    celdas.map((c, i) => ({
      input: c.data,
      left: (i % 2) * anchoCelda,
      top: Math.floor(i / 2) * altoCelda,
    })),
  )
  .jpeg({ quality: 80 })
  .toFile('.og-preview/hoja-servicios.jpg');

console.log(`\n${SERVICIOS.length} tarjetas en ${SALIDA}/  (+ hoja de contacto en .og-preview/)`);
