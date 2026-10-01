/**
 * Convierte los logos de clientes de `src/LOGOS/` a PNG de UNA tinta (negro sobre
 * transparente) en `public/img/clientes/`, para la franja "Confían en INSOLVA".
 *
 * Por qué una sola tinta: los logos llegan en JPG con fondo blanco, en PNG con
 * transparencia y con proporciones distintas. Puestos tal cual se ven como un
 * collage. En una tinta se leen como un set, y el CSS decide el tono (gris suave,
 * y más fuerte al pasar el mouse).
 *
 * No se redibuja ningún logo: solo se cambia el color y se recorta el margen.
 *
 * Uso:  node scripts/build-logos-clientes.mjs
 *
 * Tipos:
 *   'fondo-blanco'  el brillo define la opacidad (lo oscuro queda, el blanco se va)
 *   'transparente'  ya trae canal alfa; se usa tal cual
 * `recortarIzq` descarta esa cantidad de píxeles de la izquierda (p. ej. el panel
 * con el gallo de Chez Manu, que es un fondo gris semitransparente y no se puede
 * pasar a una tinta sin que quede un bloque sólido).
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'src/LOGOS';
const OUT = 'public/img/clientes';
await mkdir(OUT, { recursive: true });

async function mono(archivo, salida, { tipo, ancho = 560, recortarIzq = 0 }) {
  let origen = sharp(`${SRC}/${archivo}`).ensureAlpha();
  if (recortarIzq) {
    const m = await sharp(`${SRC}/${archivo}`).metadata();
    origen = origen.extract({ left: recortarIzq, top: 0, width: m.width - recortarIzq, height: m.height });
  }
  const { data, info } = await origen.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    let alpha;
    if (tipo === 'fondo-blanco') {
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      alpha = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.25))); // 1.25: aprieta el contraste
    } else {
      alpha = a;
    }
    out[i * 4] = 0; out[i * 4 + 1] = 0; out[i * 4 + 2] = 0; out[i * 4 + 3] = alpha;
  }
  let img = sharp(out, { raw: { width, height, channels: 4 } });
  img = sharp(await img.png().toBuffer()).trim({ threshold: 8 }); // recorta el margen vacío
  const buf = await img.resize({ width: ancho }).png({ compressionLevel: 9 }).toBuffer();
  const m = await sharp(buf).metadata();
  await sharp(buf).toFile(`${OUT}/${salida}.png`);
  console.log(salida.padEnd(12), `${m.width}x${m.height}`, `${(buf.length / 1024).toFixed(0)} KB`);
}

await mono('PRISMATICA.JPG', 'prismatica', { tipo: 'fondo-blanco', ancho: 520 });
await mono('logo-chez-manu.JPG', 'chez-manu', { tipo: 'transparente', ancho: 520, recortarIzq: 46 });
await mono('logo.png', 'biorn', { tipo: 'fondo-blanco', ancho: 420 });
await mono('logo-k.jpg', 'k', { tipo: 'fondo-blanco', ancho: 420 });
