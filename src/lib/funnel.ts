/**
 * Funnel de guías gratis (app aparte, Next.js en Vercel).
 *
 * Desde noviembre 2026 las guías se publican abiertas en /guias/ de este sitio
 * (para SEO/GEO/AEO). El funnel queda como captación: desde cada guía se lo
 * enlaza con "Sumarme al grupo", y ahí la persona deja sus datos y entra al
 * grupo de WhatsApp de beneficios.
 *
 * POR QUÉ UN ENLACE Y NO UN FORMULARIO PROPIO: el funnel guarda los leads en su
 * propio `/api/lead`, y ese endpoint no manda cabeceras CORS. Un formulario de
 * este sitio (estático, en Hostinger) no podría enviarle datos desde el
 * navegador. Para hacerlo habría que habilitar CORS en la app del funnel.
 *
 * PARA CAMBIAR LA DIRECCIÓN: basta con editar `FUNNEL_URL`.
 */
export const FUNNEL_URL = 'https://funnel-ventas.vercel.app/';

/**
 * Enlace al funnel con el origen marcado. La app lee estos cuatro parámetros y
 * los guarda junto al lead, así se sabe de qué sección del sitio vino cada
 * registro (`origen`: 'home', 'footer', 'contacto'…).
 */
export function funnelLink(origen: string): string {
  const url = new URL(FUNNEL_URL);
  url.searchParams.set('utm_source', 'insolvagroup.com');
  url.searchParams.set('utm_medium', 'sitio');
  url.searchParams.set('utm_campaign', 'guias-gratis');
  url.searchParams.set('utm_content', origen);
  return url.toString();
}
