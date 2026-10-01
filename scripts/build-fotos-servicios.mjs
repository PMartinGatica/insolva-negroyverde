/**
 * Convierte las fotos reales de `assets/source/fotos-originales/` a WebP
 * optimizado en `public/img/servicios/`, para las páginas de servicio.
 *
 * Solo redimensiona y comprime: NO recorta ni altera el contenido de la foto
 * (regla de multiseccion.md — las instalaciones reales siguen siendo reales).
 *
 * Uso:  node scripts/build-fotos-servicios.mjs
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/source/fotos-originales';
const OUT = 'public/img/servicios';
// Presupuesto: ninguna foto por encima de ~180 KB. Son fotos verticales de
// celular; a 1200px de ancho ya se ven nítidas en pantalla retina.
//
// El tope de ALTO es el que hace cumplir ese presupuesto: limitar solo el ancho
// dejaba pasar verticales de 1200x2133 (2,56 MP) que pesaban 290-390 KB, muy por
// encima del presupuesto. Con `fit: 'inside'` la foto se reduce hasta entrar en
// la caja, sin recortar nada.
const ANCHO_MAX = 1200;
const ALTO_MAX = 1600;
const CALIDAD = 72;

// origen → nombre de salida. Las claves se resuelven contra el listado real
// del directorio, así los espacios y los "(n)" del nombre original no importan.
const MAPA = [
  ['camara- negocio.jpg',                   'camaras-comercio-01'],
  ['seguridad-negocio (1).jpg',             'camaras-comercio-02'],
  ['seguridad-negocio (3).jpg',             'camaras-comercio-03'],
  ['camaras-seguridad-domicilio (1).jpg',   'camaras-casa-01'],
  ['camaras-seguridad-domicilio (3).jpg',   'camaras-casa-02'],
  ['camaras-domicilio (2).jpg',             'camaras-casa-03'],
  ['camaras-domicilio (7).jpg',             'camaras-casa-04'],
  ['nvr.png',                               'camaras-nvr'],
  ['alarma.jpg',                            'alarmas-01'],
  ['cerradura-digital-domicilio.jpg',       'cerraduras-casa-01'],
  ['cerradura-digital-departamentos.jpg',   'cerraduras-departamentos-01'],
  ['cerraduras-digitales-departamentos (1).jpg', 'cerraduras-departamentos-02'],
  ['cerraduras-digitales-departamentos (2).jpg', 'cerraduras-departamentos-03'],
  ['termostatointeligente.png',             'domotica-termostato'],
  ['redesstartlink.png',                    'redes-starlink'],
  ['obrador (1).jpeg',                      'redes-obrador'],
  ['electricidad-domicilio.jpg',            'electricidad-casa-01'],
  ['electricidad-residencial (1).jpg',      'electricidad-casa-02'],
  ['electricidad-residencial (2).jpg',      'electricidad-casa-03'],
  ['electricidad-residencial (3).jpg',      'electricidad-casa-04'],

  // Tanda 2026-09-18: fotos de trabajos recientes, con técnicos trabajando.
  ['obra-starlink-camara-cartel.jpg',       'obra-starlink-camara'],
  ['obra-camara-poste-canal.jpg',           'obra-camara-poste'],
  ['camara-ptz-detalle.jpg',                'camaras-ptz-detalle'],
  ['camaras-complejo-cerco.jpg',            'camaras-complejo'],
  ['camara-alero-obra.jpg',                 'camaras-alero-obra'],
  ['camara-instalacion-alero.png',          'camaras-instalando-alero'],
  ['camara-domo-complejo.jpg',              'camaras-domo-complejo'],
  ['cerradura-keylessoft-terminada.jpg',    'cerraduras-terminada'],
  ['cerradura-instalacion-mecanismo.jpg',   'cerraduras-instalacion'],
  ['cerradura-plantilla-medicion.jpg',      'cerraduras-medicion'],
  ['cerradura-teclado-uso.jpg',             'cerraduras-teclado'],
  ['starlink-instalacion-techo.jpg',        'redes-starlink-instalacion'],
  ['obra-cableado-steelframe.jpg',          'obra-cableado-steelframe'],
  ['obra-steelframe-montaje.png',           'obra-steelframe-montaje'],
  ['tablero-electrico-termicas.jpg',        'electricidad-tablero'],
  ['electricidad-complejo-exterior.jpg',    'electricidad-complejo'],

  // Tanda 2026-09-30: alarmas (hasta hoy sin fotos propias), cerraduras y electricidad.
  ['camara-ezviz-viga-madera.jpg',              'camaras-viga-madera'],
  // Recorte del 7% izquierdo: en el borde se lee el número de casa del cliente (1283).
  ['camara-galeria-madera-obra.jpg',            'camaras-galeria-madera', { recortarIzq: 0.07, calidad: 66 }],
  ['alarma-central-hikvision.jpg',              'alarmas-central-hikvision'],
  ['alarma-detector-humo.jpg',                  'alarmas-detector-humo'],
  ['alarma-sensor-magnetico.jpg',               'alarmas-sensor-magnetico'],
  ['electricidad-canalizacion-steelframe.jpg',  'electricidad-canalizacion'],
  ['electricidad-cableado-rollos.jpg',          'electricidad-cableado-rollos', { calidad: 58 }],
  ['electricidad-caja-cables-steelframe.jpg',   'electricidad-caja-cables', { calidad: 58 }],
  ['cerradura-conexion-cable.jpg',              'cerraduras-conexion-cable'],
  ['cerradura-puerta-4-terminada.jpg',          'cerraduras-puerta-terminada'],
];

const existentes = new Set(await readdir(SRC));
await mkdir(OUT, { recursive: true });

let ok = 0;
const faltantes = [];

for (const [origen, destino, opciones = {}] of MAPA) {
  if (!existentes.has(origen)) {
    faltantes.push(origen);
    continue;
  }
  const salida = path.join(OUT, `${destino}.webp`);

  // `.rotate()` aplica la orientación EXIF del celular. Para recortar necesitamos
  // las medidas YA rotadas, así que se materializa primero y se mide después.
  let entrada = await sharp(path.join(SRC, origen)).rotate().toBuffer();
  if (opciones.recortarIzq) {
    const { width, height } = await sharp(entrada).metadata();
    const corte = Math.round(width * opciones.recortarIzq);
    entrada = await sharp(entrada).extract({ left: corte, top: 0, width: width - corte, height }).toBuffer();
  }

  const info = await sharp(entrada)
    .resize({ width: ANCHO_MAX, height: ALTO_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: opciones.calidad ?? CALIDAD })
    .toFile(salida);
  console.log(`  ${destino}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  ok++;
}

console.log(`\n${ok} fotos convertidas en ${OUT}/`);
if (faltantes.length) {
  console.log(`\nNo encontradas en ${SRC}/ (revisar nombre exacto):`);
  faltantes.forEach((f) => console.log(`  - ${f}`));
}
