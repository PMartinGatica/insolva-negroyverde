/**
 * Funnel de guías gratis.
 *
 * Es una app aparte (Next.js en Vercel) que cambia guías, un curso y fichas
 * técnicas por los datos de contacto de la persona. Este sitio solo la enlaza.
 *
 * POR QUÉ UN ENLACE Y NO UN FORMULARIO PROPIO: el funnel guarda los leads en su
 * propio `/api/lead`, y ese endpoint no manda cabeceras CORS. Un formulario de
 * este sitio (estático, en Hostinger) no podría enviarle datos desde el
 * navegador. Para hacerlo habría que habilitar CORS en la app del funnel.
 *
 * PARA CAMBIAR LA DIRECCIÓN: basta con editar `FUNNEL_URL`. Lo recomendable es
 * pasarlo a un subdominio propio (p. ej. guias.insolvagroup.com) apuntado a
 * Vercel: queda bajo la marca y no depende de un `.vercel.app`.
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
