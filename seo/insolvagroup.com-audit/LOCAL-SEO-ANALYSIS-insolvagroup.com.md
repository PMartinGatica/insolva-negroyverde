# Análisis SEO Local — insolvagroup.com

**Fecha:** 2026-07-10 · **Analizado sobre:** build post-rebrand (rama `rebrand-seguridad`)
**Nota:** el sitio en producción todavía muestra la versión anterior (title/schema viejos, cacheados). Este análisis evalúa el estado que quedará **tras desplegar** el rebrand.

---

## Local SEO Score: **58 / 100**

| Dimensión | Peso | Score | Estado |
|-----------|------|-------|--------|
| GBP Signals | 25% | 10/100 | 🔴 Sin Google Business Profile detectable |
| Reviews & Reputación | 20% | 0/100 | 🔴 Sin reseñas ni `aggregateRating` |
| Local On-Page SEO | 20% | 78/100 | 🟢 Bueno (title/H1 con ciudad, keywords locales) |
| NAP & Citaciones | 15% | 45/100 | 🟡 NAP parcial (sin calle), sin citaciones |
| Local Schema | 10% | 80/100 | 🟢 `ProfessionalService` + `areaServed` (falta `geo`) |
| Autoridad Local | 10% | 15/100 | 🔴 Sin señales (cámara comercio, prensa, "best of") |

**El techo del score no está en la web — está fuera de ella.** El on-page y el schema quedaron sólidos con el rebrand. Lo que hunde el puntaje son señales **off-site que no se resuelven con código**: no hay Google Business Profile, no hay reseñas, no hay citaciones. Y son justo las que más pesan en el pack local (GBP 25% + Reviews 20% + proximidad ≈ 55% de la varianza de ranking).

---

## Tipo de negocio: **Service Area Business (SAB) híbrido**

- **Sin dirección de calle visible** — solo ciudad/provincia ("Ushuaia, Tierra del Fuego").
- Lenguaje de área de servicio: instalaciones a domicilio, en obra, en local del cliente.
- Implicación: se saltan checks de mapa embebido y dirección física exacta; el foco va a `areaServed`, GBP con área de servicio, y reseñas.

## Industria: **Home Services / Seguridad electrónica**
Señales: "instalación", "presupuesto sin compromiso", cobertura por zona, servicio en obra. Rutea a recomendaciones de servicios para el hogar/empresas.

---

## Hallazgo de mercado (búsqueda real)

Busqué "INSOLVA Group Ushuaia seguridad electrónica cámaras": **INSOLVA no aparece** en los primeros resultados. Sí aparecen competidores ya posicionados — destaca **Netcalls** (se presenta como representante oficial Dahua en Tierra del Fuego, cubre Ushuaia y Río Grande) y varios directorios locales (argentino.com.ar, redargentina, licuo, MercadoLibre). Hay demanda local capturada por otros: el trabajo de SEO local es urgente y tiene competidores concretos que estudiar.

---

## 1. GBP — checklist (lo más importante y lo más ausente)

| Ítem | Estado |
|------|--------|
| Google Business Profile creado/verificado | 🔴 No detectable |
| Categoría primaria correcta | ⚠️ A definir: **"Servicio de instalación de sistemas de seguridad"** (factor #1 del pack local) |
| Categorías secundarias (óptimo 4) | 🔴 Pendiente: instalación de cámaras, redes, domótica, alarmas |
| Reseñas en el perfil | 🔴 0 |
| Fotos de instalaciones reales | 🔴 0 (tenés material: las instalaciones de Ushuaia que estaban en insolvaseguridad.com) |
| Horario de atención | 🔴 No publicado |

**Esto es lo #1 a resolver y no es tarea de código: es abrir y verificar el GBP.**

## 2. Reviews — 0/100
- Sin reseñas visibles, sin `aggregateRating` en el schema.
- Umbral mágico: **10 reseñas** dan un salto de ranking (Sterling Sky). Regla de los 18 días: sin reseñas nuevas por 3 semanas, el ranking cae.
- Acción: pedir reseñas a clientes ya atendidos (las instalaciones reales de Ushuaia) apenas se cree el GBP.

## 3. Local On-Page — 78/100 (fuerte tras el rebrand)
✅ Title con ciudad: "INSOLVA Group — Ingeniería + Seguridad Electrónica en Ushuaia"
✅ Keywords locales en Hero ("Ushuaia y toda Tierra del Fuego")
✅ NAP parcial visible en footer (nombre, teléfono, ciudad)
✅ WhatsApp como conversión (coherente con el 45% que usa canales directos)
⚠️ **Falta `tel:` click-to-call** — hoy solo hay `wa.me`. Sumar un enlace `tel:+5492901641452` ayuda en móvil.
⚠️ **Una sola página** — sin páginas de servicio dedicadas. Whitespark: página por servicio = **#1 factor local orgánico**. Oportunidad grande (ver acciones).

## 4. NAP & Citaciones — 45/100
- NAP consistente entre footer y schema, pero **sin dirección de calle** (esperable en SAB; si hay taller/oficina, conviene sumarla).
- **Sin citaciones** en directorios Tier 1. Los competidores están en argentino.com.ar, redargentina, licuo — INSOLVA no.
- Bing Places / Apple Business Connect: sin reclamar (críticos para IA — ChatGPT/Copilot leen Bing, no GBP).

## 5. Local Schema — 80/100 (bien tras el rebrand)
✅ `@type: ProfessionalService` con `address` (Ushuaia/TdF/AR), `areaServed` (Ushuaia + Tierra del Fuego + Argentina), `hasOfferCatalog` (5 servicios), `contactPoint`, `image`, `logo`.
⚠️ **Falta `geo`** (lat/long, mín. 5 decimales) — refuerza señal de mapas.
⚠️ **Falta `openingHoursSpecification`** y `priceRange`.
⚠️ Cuando haya reseñas, sumar `aggregateRating`.

## 6. Autoridad Local — 15/100
- Sin Cámara de Comercio, sin BBB (no aplica en Arg.), sin prensa local, sin listas "best of".
- Las listas "best of" locales son el **#1 factor de visibilidad en IA** (Whitespark 2026).

---

## Top 10 acciones priorizadas

### 🔴 Críticas (fuera de código — negocio)
1. **Crear y verificar Google Business Profile** con categoría primaria "Servicio de instalación de sistemas de seguridad" + 4 secundarias. Es el mayor movimiento de aguja del pack local.
2. **Conseguir las primeras 10 reseñas** de clientes ya atendidos; sostener cadencia (1 cada ≤18 días).
3. **Reclamar Bing Places y Apple Business Connect** — alimentan ChatGPT/Copilot/Alexa/Siri, que no leen GBP.

### 🟠 Altas (mezcla código + negocio)
4. **Agregar `geo` al schema** (código, rápido) — coordenadas de Ushuaia con 5+ decimales.
5. **Sumar `tel:` click-to-call** en header/contacto (código, rápido).
6. **Publicar 3 páginas de servicio dedicadas** (`/videovigilancia`, `/redes`, `/alarmas` o similar) con contenido único — #1 factor local orgánico. Reusa el copy de las 4 categorías que ya tenés.
7. **Cargar citaciones** en directorios locales donde están los competidores: argentino.com.ar, redargentina.com.ar, licuo, más Data aggregators.

### 🟡 Medias
8. **Migrar "Instalaciones reales en Ushuaia"** (Trabajos) a este sitio con fotos locales — prueba social + contenido local no-swappable.
9. **`openingHoursSpecification` + `priceRange`** en el schema.
10. **Perseguir Cámara de Comercio de Ushuaia** y menciones de prensa local para autoridad + capa de citación IA.

---

## Lo que este análisis NO pudo medir
- Posición real en el geo-grid / local pack (requiere DataForSEO o `/seo maps`).
- Domain Authority ni perfil de backlinks completo.
- Datos de GBP Insights (no existe GBP aún).
- Reseñas o NAP en directorios de terceros a fondo (requiere auditoría de citaciones dedicada).
- El sitio en producción está cacheado en la versión vieja: el score asume el rebrand ya desplegado.
