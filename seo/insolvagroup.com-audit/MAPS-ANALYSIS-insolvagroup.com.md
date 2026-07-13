# Análisis Maps Intelligence — insolvagroup.com

**Fecha:** 2026-07-10 · **Tier detectado: 0 (free)** — DataForSEO MCP no disponible.

> **Qué NO se pudo medir en Tier 0** (requiere extensión DataForSEO): geo-grid rank tracking (SoLV / heatmap de posición por zona), auditoría GBP en vivo, inteligencia de reseñas (velocidad/sentimiento), posición real en el local pack. Para eso: instalar la extensión DataForSEO y correr `/seo maps grid "cámaras de seguridad" "Ushuaia"`.

---

## Maps Health Score: **22 / 100**

| Plataforma | Estado | Impacto |
|-----------|--------|---------|
| Google Maps (GBP) | 🔴 Sin listing detectable | Pack local, 32% señales |
| Bing Places | 🔴 Sin listing (verificado) | Alimenta ChatGPT / Copilot / Alexa |
| Apple Business Connect | 🔴 Sin listing (asumido) | Siri / Apple Maps (27% uso, subiendo) |
| OpenStreetMap | 🔴 Ausente | Base de datos abierta, citaciones IA |

**INSOLVA no existe en ninguna plataforma de mapas.** Este es el mayor déficit de todo el análisis SEO: sin presencia en mapas, el negocio es invisible para el pack local, para "cerca mío", y para las recomendaciones locales de IA.

---

## Presencia cross-platform (verificado)

- **Google Maps:** sin GBP detectable. Es la prioridad #1 absoluta.
- **Bing Maps:** verifiqué `bing.com/maps?q=INSOLVA+Group+Ushuaia` → **sin listing**. Bing alimenta ChatGPT/Copilot; sin esto, INSOLVA no puede ser citada por IA en consultas locales.
- **OpenStreetMap (Overpass):** INSOLVA no está mapeada.

## Panorama de competidores (Overpass / OSM)

Consulté OSM por negocios de seguridad/electrónica en Ushuaia. **Cobertura muy baja**: solo 4 comercios de electrónica genérica mapeados (Garbarino, Mundo Celular, Domo, Samsung) y **cero empresas de seguridad electrónica**.

**Lectura estratégica:** el mercado de seguridad de Ushuaia está poco digitalizado en mapas abiertos. Eso es una **ventana**: quien arme bien su GBP + citaciones primero, captura el pack local con poca competencia mapeada. Ojo — la búsqueda web sí mostró competidores con web posicionada (**Netcalls**, representante Dahua TdF), así que la competencia existe aunque no esté en OSM; el diferencial es que **casi nadie tiene el mapa resuelto**.

---

## Schema LocalBusiness con `geo` (listo para implementar)

El schema del sitio ya es `ProfessionalService` con `areaServed`, pero **le falta `geo`**. Este bloque lo completa (coordenadas del centro de Ushuaia; ajustar a la ubicación real si hay oficina/taller):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "INSOLVA Group",
  "url": "https://insolvagroup.com",
  "image": "https://insolvagroup.com/og-image.png",
  "telephone": "+5492901641452",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ushuaia",
    "addressRegion": "Tierra del Fuego",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -54.80191,
    "longitude": -68.30295
  },
  "areaServed": [
    { "@type": "City", "name": "Ushuaia" },
    { "@type": "AdministrativeArea", "name": "Tierra del Fuego" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$"
}
```
> `latitude`/`longitude` son aproximados (centro de Ushuaia). Reemplazar por las coordenadas exactas del domicilio/área base — con 5+ decimales. `openingHours` y `priceRange`: ajustar a los reales.

---

## Top 10 acciones priorizadas

### 🔴 Críticas
1. **Crear Google Business Profile** — categoría primaria "Servicio de instalación de sistemas de seguridad". Sin esto no hay mapas ni pack local.
2. **Reclamar Bing Places** — imprescindible para que ChatGPT/Copilot puedan citar a INSOLVA en consultas locales.
3. **Reclamar Apple Business Connect** (businessconnect.apple.com) — Siri / Apple Maps.

### 🟠 Altas
4. **Agregar `geo` al schema** (bloque de arriba) — código, inmediato.
5. **Definir coordenadas y domicilio reales** (aunque sea área de servicio) para consistencia NAP en las 3 plataformas.
6. **Cargar en OpenStreetMap** — nodo de negocio con `office=company` / tag de seguridad; gratis y alimenta IA.
7. **Fotos de instalaciones reales** en el GBP (las de Ushuaia que ya tenés) — +45% solicitudes de indicaciones con fotos.

### 🟡 Medias
8. **Estudiar a Netcalls** (competidor Dahua posicionado) — qué keywords y categorías usa.
9. **`openingHoursSpecification` + `priceRange`** en schema (incluidos arriba).
10. **Instalar DataForSEO** y correr geo-grid para medir posición real por zona una vez creado el GBP.

---

## Reporte de costos
Tier 0 — **$0**. No se consumieron créditos de DataForSEO (APIs libres: Nominatim, Overpass, Bing web).
