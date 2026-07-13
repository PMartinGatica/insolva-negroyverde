# Auditoría SEO completa — insolvagroup.com

**Fecha:** 2026-07-10
**Tipo de negocio detectado:** Agencia / Servicio local (Local Service + Agency híbrido)
**Stack:** Astro v6.2.1, servido en Hostinger (LiteSpeed), sitio estático de 1 página (landing)
**Idioma:** es-AR

---

## Resumen ejecutivo

### SEO Health Score: **68 / 100**

El sitio tiene una **base on-page sólida y sorprendentemente buena** para una landing chica: título y meta description con keywords, canonical, Open Graph y Twitter Card completos, schema `Organization` con NAP, un solo H1 semántico y jerarquía de headings correcta. El rendimiento es excelente por diseño (Astro estático, 42 KB, cero JS externo).

Lo que le baja el puntaje son **fallas concretas y 100% arreglables**: varios assets referenciados devuelven **404** (la imagen social `og-image.png`, el `logo.png` del schema, `apple-touch-icon.png` y la página de privacidad enlazada), **no hay sitemap.xml ni robots.txt**, el schema es genérico (`Organization`) cuando debería ser **local** (`ProfessionalService` con `areaServed`), y el copy **no menciona Ushuaia / Tierra del Fuego** donde importa para ranking local.

### Top 5 problemas críticos/altos
1. **`og-image.png` da 404** — las tarjetas al compartir en WhatsApp/redes salen rotas (OG y Twitter apuntan a una imagen inexistente). **[Crítico para conversión social]**
2. **`logo.png` da 404** — el schema `Organization` referencia un logo que no existe → Google no puede usarlo. **[Alto]**
3. **Sin `sitemap.xml` ni `robots.txt`** — Google no tiene mapa del sitio ni directivas de rastreo. **[Alto]**
4. **Página `/politica-de-privacidad` da 404** — link roto en el footer + señal de confianza/E-E-A-T faltante. **[Alto]**
5. **Copy sin keywords locales** — no dice "desarrollo web en Ushuaia", "ingeniería Tierra del Fuego", etc. Invisible para búsquedas locales. **[Alto]**

### Top 5 quick wins (impacto alto, esfuerzo bajo)
1. Crear y subir `og-image.png` (1200×630) y `logo.png` → arregla 2 hallazgos de golpe.
2. Subir `robots.txt` con directiva de rastreo + link al sitemap (2 minutos).
3. Instalar `@astrojs/sitemap` → genera el sitemap automático en el build.
4. Crear la página `/politica-de-privacidad` (ya está enlazada, solo falta el archivo).
5. Agregar `apple-touch-icon.png` (favicon iOS).

---

## 1. Technical SEO — Score: 62/100

**Lo que funciona:**
- Canonical presente y correcto (`https://insolvagroup.com`).
- Meta robots `index, follow` explícito.
- Viewport configurado (mobile-ready).
- HTTPS con `upgrade-insecure-requests` CSP.
- HTTP/3 (h3) habilitado en el server (LiteSpeed).
- Sitio estático → sin problemas de renderizado JS (no es SPA).

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Alto | **Sin `robots.txt`** (404) | Crear `public/robots.txt` con `User-agent: *`, `Allow: /` y `Sitemap:` apuntando al sitemap. Incluir crawlers de IA (GPTBot, PerplexityBot, ClaudeBot). |
| Alto | **Sin `sitemap.xml`** (404) | Instalar `@astrojs/sitemap`; requiere `site` en `astro.config.mjs`. |
| Medio | **Sin `llms.txt`** (404) | Opcional pero recomendado para citación en IA. |
| Bajo | Sin `theme-color` ni manifest PWA | Nice-to-have. |

---

## 2. Content Quality (E-E-A-T) — Score: 65/100

**Lo que funciona:**
- ~800-900 palabras de contenido real, bien estructurado en pilares y beneficios.
- Propuesta de valor clara ("ingeniería + tecnología").
- Segmentación por tipo de cliente (independientes / expansión / consolidadas).

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Alto | **Cero keywords locales en el copy** | El H1 dice "Optimizamos negocios con ingeniería + tecnología" pero nunca "Ushuaia" ni "Tierra del Fuego". Sumar naturalmente en H1/H2 y subtítulos. |
| Medio | Sin señales de autoría/experiencia (E-E-A-T) | Agregar años de experiencia, casos reales, nombres del equipo, o certificaciones. |
| Medio | Página única sin contenido de profundidad | Considerar páginas de servicio individuales (una por pilar) para captar más long-tail. |
| Medio | `/politica-de-privacidad` da 404 | Página de confianza faltante — crearla. |

---

## 3. On-Page SEO — Score: 82/100

**Lo que funciona:**
- **Un solo H1** semántico. ✅
- Jerarquía de headings correcta (H1 → H2 → H3, sin saltos).
- Title de 58 caracteres, dentro del rango óptimo.
- Meta description de ~160 caracteres con keywords.
- `lang="es-AR"` correcto.

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Medio | Title y H1 sin ciudad | Sumar "Ushuaia" al title o subtítulo para ranking local. |
| Bajo | Sin hreflang | OK para sitio monolingüe; no requerido. |

---

## 4. Schema / Structured Data — Score: 60/100

**Lo que funciona:**
- Ya hay JSON-LD válido tipo `Organization` con `name`, `url`, `address` (PostalAddress con Ushuaia/TdF/AR), `contactPoint` (teléfono) y `sameAs` (Instagram). Muy buena base.

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Alto | **`logo` del schema (`logo.png`) da 404** | Google no puede validar el logo. Subir `logo.png` o cambiar la ref a `logo.svg` (que sí existe). |
| Medio | `@type: Organization` es genérico | Cambiar a **`ProfessionalService`** (subtipo de LocalBusiness) y agregar `areaServed` (Ushuaia + Tierra del Fuego) para señal local fuerte. |
| Medio | Sin `hasOfferCatalog` | Listar los 3 pilares (Ingeniería industrial, Desarrollo & Automatización, Seguridad electrónica) como servicios. |
| Bajo | Sin `geo` (lat/long) | Agregar coordenadas para maps. |

---

## 5. Performance (Core Web Vitals) — Score: 85/100 (estimado)

**No se pudieron obtener datos de campo reales** (PageSpeed API rate-limited 429, sin credenciales de Google configuradas, y CrUX probablemente sin datos por bajo tráfico). Evaluación por análisis del recurso:

**Lo que funciona (excelente por diseño):**
- HTML de 42 KB, **cero JavaScript externo**, solo 3 scripts inline chicos.
- Un único CSS (`/_astro/...css`), sin render-blocking pesado.
- Imágenes en SVG (logo/isotipo) → livianas y nítidas, sin CLS por dimensiones (tienen width/height).
- HTTP/3 habilitado.

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Bajo | Sin `preconnect`/`preload` de fuentes | Menor; si hay fuentes web, precargarlas. |
| Info | Confirmar CWV reales | Correr `/seo google` con API key de Google, o PageSpeed manual, post-fix. |

---

## 6. Images — Score: 55/100

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Alto | **`og-image.png` da 404** | Referenciada en OG + Twitter → tarjetas sociales rotas. Crear imagen 1200×630. |
| Medio | **2 de 4 imágenes sin `alt`** | Los `isotipo-verde.svg` tienen `alt=""` vacío. Si son decorativos está OK, pero el logo debe describir. |
| Medio | `apple-touch-icon.png` da 404 | Subir el ícono para iOS. |
| Info | Solo 4 imágenes en total | Sitio muy visual/tipográfico; poco riesgo de peso por imágenes. |

---

## 7. AI Search Readiness (GEO) — Score: 58/100

**Hallazgos:**
| Severidad | Hallazgo | Fix |
|-----------|----------|-----|
| Medio | Sin `llms.txt` | Crear para guiar a crawlers de IA (ChatGPT, Perplexity). |
| Medio | robots.txt ausente → no hay control de acceso de crawlers IA | Al crear robots.txt, permitir explícitamente GPTBot/PerplexityBot/ClaudeBot. |
| Medio | Contenido citable pero sin datos duros | Los LLMs citan mejor con cifras, listas y respuestas directas. El schema Organization ayuda. |
| Bajo | `sameAs` con un solo perfil | Sumar más perfiles (LinkedIn, Google Business) refuerza entidad. |

---

## Notas de la auditoría
- **Enlace saliente a `insolvadev.com`:** el sitio linkea a `https://insolvadev.com` (y `insolvaseguridad.com`) como marcas del grupo, pero **`insolvadev.com` no resuelve DNS** actualmente → link potencialmente roto. Verificar. (Coincide con el rebrand a DevXIA / cambio de dominio pendiente.)
- **NAP consistente:** teléfono `+54 9 2901 64-1452` y ciudad Ushuaia coinciden entre el copy, el schema y los links de WhatsApp. ✅
- **Sin Google Business Profile detectable** en `sameAs` — clave para el map pack local (ver `/seo local`).
