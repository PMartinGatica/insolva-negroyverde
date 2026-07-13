# Plan de acción SEO — insolvagroup.com

Priorizado por impacto/esfuerzo. Cada ítem incluye cómo saber si falló (ACCEPT) y qué monitorear (GROW).

---

## Fase 1 — Arreglos críticos (Semana 1)

### 1.1 Crear y subir los assets que dan 404
**Problema:** `og-image.png`, `logo.png`, `apple-touch-icon.png` referenciados pero inexistentes.
- Crear `public/og-image.png` (1200×630, logo INSOLVA sobre fondo de marca).
- Crear `public/logo.png` (o cambiar el schema y OG a `logo.svg`, que sí existe).
- Crear `public/apple-touch-icon.png` (180×180).
- **Cómo sé si falló:** abrir `https://insolvagroup.com/og-image.png` → debe dar 200, no 404. Pegar la URL en el [validador de OG de Facebook](https://developers.facebook.com/tools/debug/) → debe mostrar la imagen.
- **Monitorear:** compartir el link en WhatsApp y ver que aparezca la preview con imagen.

### 1.2 Crear la página de política de privacidad
**Problema:** `/politica-de-privacidad` enlazada en el footer da 404.
- Crear `src/pages/politica-de-privacidad.astro`.
- **Cómo sé si falló:** la URL debe cargar (200) con el layout del sitio.

### 1.3 robots.txt + sitemap
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  User-agent: GPTBot
  Allow: /
  User-agent: PerplexityBot
  Allow: /
  User-agent: ClaudeBot
  Allow: /
  Sitemap: https://insolvagroup.com/sitemap-index.xml
  ```
- Instalar sitemap: `npm i @astrojs/sitemap`, agregar la integración y `site: 'https://insolvagroup.com'` en `astro.config.mjs`.
- **Cómo sé si falló:** `npm run build` debe generar `dist/sitemap-index.xml`. Las URLs `/robots.txt` y `/sitemap-index.xml` deben dar 200 en producción.
- **Monitorear:** en Google Search Console → Sitemaps → estado "Correcto".

---

## Fase 2 — Alto impacto (Semanas 2-3)

### 2.1 Schema local (Organization → ProfessionalService)
- Cambiar `@type` a `ProfessionalService`.
- Agregar `areaServed`: Ushuaia, Tierra del Fuego, Argentina.
- Arreglar `logo` (apuntar a un archivo que exista).
- Agregar `hasOfferCatalog` con los 3 pilares reales.
- **Cómo sé si falló:** pegar el JSON-LD en el [Rich Results Test](https://search.google.com/test/rich-results) → sin errores.

### 2.2 Keywords locales en el copy
- Sumar "Ushuaia" / "Tierra del Fuego" naturalmente en H1 o subtítulo del hero, y en al menos un H2.
- Variantes que la gente tipea: "desarrollo web", "automatización", "seguridad electrónica" + ciudad.
- **Cómo sé si falló:** buscar en Google `site:insolvagroup.com Ushuaia` tras la reindexación → debe devolver la home.
- **Monitorear:** posición para "agencia ingeniería Ushuaia" / "desarrollo software Ushuaia" en GSC.

### 2.3 Verificar/arreglar el link a insolvadev.com
- `insolvadev.com` no resuelve DNS → decidir: reactivar dominio, apuntar a devxia.com, o quitar el link.

---

## Fase 3 — Contenido y autoridad (Mes 2)

- **Google Business Profile** como empresa con área de servicio (Ushuaia), verificado. Es lo que mete en el map pack. Sumarlo a `sameAs` del schema.
- Pedir **reseñas** a clientes existentes.
- Señales E-E-A-T: equipo, años de experiencia, casos con resultados.
- Considerar páginas de servicio individuales (1 por pilar) para long-tail.
- `llms.txt` para citación en IA.

---

## Fase 4 — Monitoreo (Continuo)

- Alta en **Google Search Console**, enviar sitemap, solicitar indexación.
- Correr `/seo google` con API key para CWV de campo reales.
- Correr `/seo local` para auditar GBP/NAP/citas una vez creado el perfil.
- Baseline con `/seo drift baseline` para detectar regresiones en cada deploy.
- Re-correr `/seo audit` en 30 días y comparar el Health Score (base actual: **68**).
