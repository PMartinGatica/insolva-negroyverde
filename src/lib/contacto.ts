/**
 * Formulario de contacto.
 *
 * Mismo caso que el newsletter (ver `newsletter.ts` y ADR-021): el sitio es
 * estático y no tiene función de servidor propia. El destino del formulario
 * está detrás de esta constante.
 *
 * MIENTRAS ESTÉ VACÍA: el formulario abre un mail ya redactado hacia
 * `BRAND.email` con todo lo que la persona cargó. No se pierde ninguna consulta.
 *
 * PARA ACTIVARLO, pegar acá una URL que reciba un POST JSON con
 * `{ nombre, email, telefono, lugar, mensaje }`:
 *   - Formspree, Basin o similar: pegás la URL del form y listo.
 *   - Supabase propio: tabla `insolvaweb_consultas` con RLS solo-INSERT y la
 *     anon key (NUNCA la service_role en el navegador).
 *   - La tienda WordPress, que sí corre PHP, con CORS habilitado.
 */
export const CONTACTO_ENDPOINT = '';

/** Tipos de consulta del selector del formulario. */
export const MOTIVOS = [
  'Cámaras de seguridad',
  'Alarmas',
  'Cerraduras digitales',
  'Domótica y automatización',
  'Redes WiFi o Starlink',
  'Instalación eléctrica',
  'Una obra completa',
  'Otra cosa',
] as const;
