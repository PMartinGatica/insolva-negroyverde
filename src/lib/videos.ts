/**
 * YouTube Shorts del canal de INSOLVA (@insolva).
 *
 * Son los 13 videos reales del canal, leídos del propio canal. Sirven para tres
 * cosas a la vez:
 *  1. Que la persona vea el trabajo en movimiento, no solo fotos.
 *  2. Schema `VideoObject`, que habilita el resultado enriquecido con
 *     miniatura de video en Google.
 *  3. Enlazar el sitio con el canal en los dos sentidos: YouTube es el segundo
 *     buscador más usado y hoy vive desconectado del sitio.
 *
 * Los videos NO se embeben directo: ver `VideoShort.astro`. Un iframe de YouTube
 * pesa cerca de 1 MB y se carga aunque nadie toque play; acá se muestra una
 * miniatura local y el iframe recién aparece al hacer clic.
 *
 * `duracion` va en ISO 8601 porque es lo que pide schema.org (PT40S = 40 s).
 */

export type Video = {
  id: string;
  titulo: string;
  /** Descripción propia para el schema y el texto alternativo. */
  descripcion: string;
  duracion: string;
  duracionSegundos: number;
  fecha: string;
  /** Fuera de todas las vistas (ver el comentario del video afectado). */
  oculto?: boolean;
};

export const CANAL_URL = 'https://www.youtube.com/@insolva';

/*
  Los más nuevos van arriba. /trabajos/ muestra los 5 más recientes por fecha y
  cierra con un enlace al canal, que tiene el resto. Para sumar uno: agregar el
  objeto acá y correr `node scripts/build-miniaturas-video.mjs`.

  Las descripciones de los videos del 24 y 26 de septiembre se escribieron a
  partir del título y de la miniatura, sin ver el video. Si alguno dice algo
  distinto, se corrige acá y en el schema.
*/
export const VIDEOS: Video[] = [
  {
    id: '_UzbFjtkyh4',
    titulo: 'Grabar lo que pasó no es lo mismo que detectarlo cuando está pasando',
    descripcion:
      'Una cámara registra lo que pasó; una alarma avisa mientras está pasando. Por qué conviene sumar las dos.',
    duracion: 'PT15S',
    duracionSegundos: 15,
    fecha: '2026-09-26',
  },
  {
    id: 'aYrIN9ndeOM',
    titulo: '¿Todavía renegás con las llaves? Es momento de pasar a digital',
    descripcion: 'Por qué conviene cambiar la llave tradicional por una cerradura digital.',
    duracion: 'PT12S',
    duracionSegundos: 12,
    fecha: '2026-09-26',
  },
  {
    id: 'GEO49te3T30',
    titulo: 'No dejes la seguridad de tu casa o negocio en zonas ciegas',
    descripcion: 'Cómo evitar las zonas ciegas al armar el sistema de cámaras de una casa o un negocio.',
    duracion: 'PT27S',
    duracionSegundos: 27,
    fecha: '2026-09-24',
  },
  {
    id: 'dEcQR_UXav0',
    titulo: '"Las cámaras las vemos después": el peor consejo para tu obra',
    descripcion: 'Por qué las cámaras y la infraestructura conviene pensarlas desde el inicio de la obra y no dejarlas para el final.',
    duracion: 'PT40S',
    duracionSegundos: 40,
    fecha: '2026-09-24',
  },
  {
    id: 'cfA7FUZHnCg',
    titulo: 'Instalación profesional de cámaras de seguridad',
    descripcion:
      'Cómo queda una instalación de cámaras hecha con criterio: posiciones elegidas para cubrir los accesos, cableado canalizado y conexiones protegidas.',
    duracion: 'PT40S',
    duracionSegundos: 40,
    fecha: '2026-08-31',
  },
  {
    id: 'W3o1WfwSFSI',
    titulo: 'El error N°1 al instalar sistemas de seguridad',
    descripcion:
      'Dónde se coloca la cámara pesa más que el modelo que se compra. Qué mirar antes de decidir cada posición.',
    duracion: 'PT35S',
    duracionSegundos: 35,
    fecha: '2026-08-09',
  },
  {
    id: 'INt0wDl1uUk',
    titulo: 'Instalación de cámaras, canalización y cableado',
    descripcion:
      'El trabajo que no se ve: canalización y cableado prolijo detrás de una instalación de cámaras.',
    duracion: 'PT17S',
    duracionSegundos: 17,
    fecha: '2026-08-02',
  },
  {
    id: 'utu_V5138AY',
    titulo: 'Lo que las cámaras de seguridad NO pueden evitar',
    descripcion:
      'Una cámara registra lo que pasó, pero no avisa mientras está pasando. Para qué sirve sumar una alarma al sistema.',
    duracion: 'PT39S',
    duracionSegundos: 39,
    fecha: '2026-08-11',
    // Oculto: lo presenta otra persona, sin marca INSOLVA, y habla de cámaras.
    // Confirmar que es del canal antes de volver a mostrarlo.
    oculto: true,
  },
  {
    id: 'f5wJrJlpfSc',
    titulo: 'El cambio que tu puerta necesita',
    descripcion:
      'Reemplazo de una cerradura tradicional por una cerradura digital con teclado y huella.',
    duracion: 'PT21S',
    duracionSegundos: 21,
    fecha: '2026-09-12',
  },
  {
    id: 'CE0rw-qts3Y',
    titulo: 'Olvidarte las llaves adentro ya no es un problema',
    descripcion:
      'Con una cerradura digital entrás con huella o código: la llave deja de ser el único modo de abrir.',
    duracion: 'PT14S',
    duracionSegundos: 14,
    fecha: '2026-08-28',
  },
  {
    id: 'nb7cUk_tAHI',
    titulo: 'No dejes tu casa inteligente al azar',
    descripcion:
      'Por qué la automatización del hogar conviene planificarla en lugar de ir sumando dispositivos sueltos.',
    duracion: 'PT48S',
    duracionSegundos: 48,
    fecha: '2026-09-13',
  },
  {
    id: 'HD3ffzTKvxA',
    titulo: 'Esto nadie lo hace en una instalación eléctrica',
    descripcion:
      'Un detalle de terminación en la instalación eléctrica que casi nunca se hace y que después se agradece.',
    duracion: 'PT40S',
    duracionSegundos: 40,
    fecha: '2026-08-27',
  },
  {
    id: 'sQjcmyFq-58',
    titulo: 'Canalización y conexionado de reflectores LED en terraza',
    descripcion:
      'Canalización y conexionado de iluminación LED en una terraza, paso a paso.',
    duracion: 'PT24S',
    duracionSegundos: 24,
    fecha: '2026-08-06',
  },
  {
    id: '8yPhDgRsNh4',
    titulo: 'Nivelación láser: el secreto de una terminación perfecta',
    descripcion:
      'Cómo usamos el nivel láser para replantear cajas y puntos antes de cerrar la pared.',
    duracion: 'PT22S',
    duracionSegundos: 22,
    fecha: '2026-08-30',
  },
  {
    id: 'k6f8EUxTOMI',
    titulo: 'El error más caro al construir tu casa es la falta de planificación',
    descripcion:
      'Arranque de la obra Kau Kren: por qué la infraestructura tecnológica se define antes de empezar, no al final.',
    duracion: 'PT51S',
    duracionSegundos: 51,
    fecha: '2026-08-29',
  },
  {
    id: 'taiAFSwP_TQ',
    titulo: 'Lo PRIMERO que tenés que poner al construir',
    descripcion:
      'Qué conviene dejar previsto desde el inicio de una obra para no tener que romper después.',
    duracion: 'PT26S',
    duracionSegundos: 26,
    fecha: '2026-08-04',
  },
  {
    id: 'ZOQrtC6SMHo',
    titulo: 'Empezando obra Kau Kren',
    descripcion: 'Primeros días de trabajo en la obra Kau Kren, en Tierra del Fuego.',
    duracion: 'PT13S',
    duracionSegundos: 13,
    fecha: '2026-08-11',
  },
];

/** Los `n` videos más nuevos del canal, sin importar la página. */
export function videosRecientes(n = 8): Video[] {
  // Los ocultos no salen en ningún lado.
  return VIDEOS.filter((v) => !v.oculto)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, n);
}
