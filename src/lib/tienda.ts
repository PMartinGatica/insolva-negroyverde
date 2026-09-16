export type ProductoTienda = {
  id: number;
  nombre: string;
  precio: number;
  detalle: string;
  href: string;
  imagen: string;
  badge?: string;
};

// La compra y el pago se completan en WooCommerce; acá solo se arma una vidriera
// de productos destacados para la home, resuelta en build time (nunca en el navegador).
export const TIENDA_URL = 'https://darkcyan-rail-217476.hostingersite.com/';

// Copy de venta escrita a mano por id de producto de WooCommerce. Si un producto
// nuevo no tiene entrada acá, se arma solo con su short_description de WooCommerce.
const COPY_PRODUCTOS: Record<number, { detalle: string; badge?: string; imagen?: string }> = {
  19: { detalle: 'Controlá interiores desde tu celular, incluso de noche.', badge: 'Más elegida', imagen: '/img/servicio-videovigilancia.webp' },
  20: { detalle: 'Vigilancia exterior autónoma para lugares sin alimentación cercana.', imagen: '/img/trabajo-obra.webp' },
  21: { detalle: 'Una base completa para proteger tu casa o comercio.', badge: 'Kit completo', imagen: '/img/trabajo-comercio.webp' },
  22: { detalle: 'Acceso seguro sin llaves para hogares y departamentos.', imagen: '/img/trabajo-domicilio.webp' },
  23: { detalle: 'Abrí, gestioná accesos y recibí control desde la app.', badge: 'Control remoto', imagen: '/img/servicio-automatizacion.webp' },
  24: { detalle: 'Una solución de acceso práctica para portones y entradas.', imagen: '/img/trabajo-domicilio.webp' },
  25: { detalle: 'Conectá y coordiná tus dispositivos inteligentes desde un solo lugar.', imagen: '/img/servicio-automatizacion.webp' },
  26: { detalle: 'Automatizá consumos cotidianos con programación desde tu celular.', imagen: '/img/servicio-automatizacion.webp' },
  27: { detalle: 'Recibí avisos cuando una puerta o ventana se abre, aunque no estés en casa.', imagen: '/img/trabajo-domicilio.webp' },
};

function limpiarHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

// Trae productos reales de WooCommerce en build time (Node, corre en `astro build`/`astro dev`).
// Si faltan credenciales o la API no responde, devuelve [] y la sección se oculta sola
// sin romper el build — mismo criterio best-effort que guardar-lead-embudo.ts.
export async function getProductosDestacados(limit = 4): Promise<ProductoTienda[]> {
  const url = import.meta.env.WOOCOMMERCE_URL;
  const key = import.meta.env.WOOCOMMERCE_KEY;
  const secret = import.meta.env.WOOCOMMERCE_SECRET;
  if (!url || !key || !secret) return [];

  try {
    const endpoint = `${url.replace(/\/$/, '')}/wp-json/wc/v3/products?per_page=${limit}&status=publish&stock_status=instock&orderby=date&order=desc`;
    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const res = await fetch(endpoint, { headers: { Authorization: `Basic ${auth}` } });
    if (!res.ok) {
      console.error('getProductosDestacados: WooCommerce respondió', res.status);
      return [];
    }

    const productos = await res.json();
    if (!Array.isArray(productos)) return [];

    return productos.map((p: any) => {
      const copy = COPY_PRODUCTOS[p.id];
      return {
        id: p.id,
        nombre: p.name,
        precio: Number(p.price || p.regular_price || 0),
        detalle: copy?.detalle ?? limpiarHtml(p.short_description ?? ''),
        href: p.permalink,
        imagen: p.images?.[0]?.src ?? copy?.imagen ?? '/img/servicio-automatizacion.webp',
        badge: copy?.badge,
      };
    });
  } catch (err) {
    console.error('getProductosDestacados error:', err);
    return [];
  }
}
