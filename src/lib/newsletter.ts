/**
 * Alta al newsletter.
 *
 * El sitio es 100% estático (`output: 'static'`, se sube `dist/` a Hostinger),
 * así que no hay ninguna función de servidor propia donde guardar la dirección.
 * Por eso el alta está detrás de esta única constante: es el punto donde se
 * enchufa el proveedor cuando se decida cuál, sin tocar el componente.
 *
 * MIENTRAS ESTÉ VACÍA: el formulario abre un mail ya redactado hacia
 * `BRAND.email` con la dirección de la persona adentro. No es lo más cómodo,
 * pero no pierde ningún alta — que es lo que pasaría si el formulario fingiera
 * un "gracias" y tirara el dato.
 *
 * PARA ACTIVARLO, pegar acá la URL que reciba un POST JSON `{ email, origen }`:
 *
 *   - Brevo / Mailchimp: la URL de acción del formulario embebido que te da el
 *     panel. Es la opción que además te deja MANDAR el newsletter.
 *   - Supabase propio: `https://supabase.insolvadev.com/rest/v1/insolvaweb_newsletter`
 *     con una tabla con RLS que solo permita INSERT y la anon key (NUNCA la
 *     service_role, que en el navegador queda expuesta a cualquiera).
 *   - La tienda WordPress: un endpoint REST en el sitio de WooCommerce, que sí
 *     corre PHP. Requiere habilitar CORS para insolvagroup.com.
 */
export const NEWSLETTER_ENDPOINT = '';
