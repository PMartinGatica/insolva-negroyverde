/**
 * Genera la imagen de Open Graph (la que muestra WhatsApp, Facebook, Twitter y
 * LinkedIn al compartir un link).
 *
 * Por qué existe: la anterior (`og-image.png`) era una foto de una casa de noche,
 * 1200x630 y 833 KB, sin nada de marca. Al compartir el sitio aparecía esa foto
 * oscura en lugar del logo.
 *
 * Decisiones:
 * - Fondo claro de marca: el wordmark de INSOLVA tiene las letras NEGRAS (solo la
 *   "A" es verde), así que sobre fondo oscuro no se leería.
 * - 1200x630: la proporción que piden WhatsApp y Facebook (1.91:1).
 * - Se guarda con un nombre NUEVO (`og-insolva.png`): WhatsApp cachea el preview
 *   por URL, así que reemplazar el archivo con el mismo nombre no alcanza.
 *
 * Uso: node scripts/build-og-image.mjs
 */
import { stat } from 'node:fs/promises';
import sharp from 'sharp';

const ANCHO = 1200;
const ALTO = 630;
const FONDO = '#F4F7F1'; // el claro de marca que usan las secciones light
const VERDE = '#98C665';
const SALIDA = 'public/og-insolva.png';

// El wordmark, rasterizado en grande para que quede nítido al reducirlo.
const logo = await sharp('public/logo.svg', { density: 600 })
  .resize({ width: 720, fit: 'inside' })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

const ancho = logoMeta.width;
const alto = logoMeta.height;
const topLogo = Math.round((ALTO - alto) / 2) - 22;

// Regla verde corta debajo del logo: da el acento de marca sin agregar texto
// (el nombre del sitio ya lo muestra la propia tarjeta del link).
const regla = { ancho: 132, alto: 8 };

const salida = await sharp({
  create: { width: ANCHO, height: ALTO, channels: 4, background: FONDO },
})
  .composite([
    { input: logo, left: Math.round((ANCHO - ancho) / 2), top: topLogo },
    {
      input: await sharp({
        create: { width: regla.ancho, height: regla.alto, channels: 4, background: VERDE },
      })
        .png()
        .toBuffer(),
      left: Math.round((ANCHO - regla.ancho) / 2),
      top: topLogo + alto + 34,
    },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile(SALIDA);

const peso = (await stat(SALIDA)).size;
console.log(`  ${SALIDA}  ${salida.width}x${salida.height}  ${(peso / 1024).toFixed(1)} KB`);
console.log(`  logo: ${ancho}x${alto} centrado, con regla verde debajo`);
