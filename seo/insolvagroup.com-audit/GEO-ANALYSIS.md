# Análisis GEO (Visibilidad en IA) — insolvagroup.com

**Fecha:** 2026-07-10 · **Analizado sobre:** build post-rebrand (rama `rebrand-seguridad`).

> Marco (posición de Google): optimizar para IA **sigue siendo SEO**. Estos hallazgos son fundamentos SEO aplicados a superficies de IA (AI Overviews, AI Mode, ChatGPT, Perplexity, Copilot).

---

## GEO Readiness Score: **52 / 100**

| Dimensión | Peso | Score | Nota |
|-----------|------|-------|------|
| Citability (pasajes citables) | 25% | 55/100 | Copy claro pero poco "dato duro" / respuestas autocontenidas |
| Legibilidad estructural | 20% | 60/100 | Jerarquía H1→H2→H3 correcta; falta FAQ y encabezados-pregunta |
| Contenido multi-modal | 15% | 35/100 | Solo SVG decorativos; sin fotos reales, video ni tablas |
| Autoridad y señales de marca | 20% | 20/100 | 🔴 Marca casi inexistente fuera del sitio + colisión de nombre |
| Accesibilidad técnica | 20% | 90/100 | 🟢 Astro estático (SSR), crawlers IA permitidos en robots.txt |

**El sitio es técnicamente muy apto para IA (estático, sin JS bloqueante, crawlers permitidos), pero la IA no tiene de dónde "conocer" a INSOLVA.** El cuello de botella es de autoridad de entidad y marca, no de código.

---

## Estado de crawlers de IA (robots.txt) — 🟢 bien

El `robots.txt` creado en el rebrand ya **permite explícitamente** los crawlers de IA que importan:

| Crawler | Estado |
|---------|--------|
| GPTBot (ChatGPT) | ✅ Allow |
| PerplexityBot | ✅ Allow |
| ClaudeBot | ✅ Allow |
| `User-agent: *` (incluye OAI-SearchBot, Google-Extended, etc.) | ✅ Allow |

Recomendación menor: si querés máxima cobertura, agregar explícitamente `OAI-SearchBot` y `ChatGPT-User` (hoy caen bajo `*`, que ya los permite — no es bloqueante).

## SSR / accesibilidad — 🟢 excelente
Astro genera **HTML estático**: todo el contenido está en el HTML servido, sin depender de JavaScript. Los crawlers de IA (que **no ejecutan JS**) ven el contenido completo. Este es el mejor escenario posible y no requiere cambios.

## llms.txt — 🔴 ausente
No existe `/llms.txt`. Nota honesta: la evidencia (Mueller, Illyes, estudios de 300k dominios) indica que **hoy no es una palanca de citación** para los grandes sistemas de IA. Se puede crear como nice-to-have, pero **no es prioritario** — no muevas recursos ahí antes que las señales de marca.

---

## Análisis de menciones de marca — 🔴 el problema central

Busqué la presencia de "INSOLVA" / "insolvagroup": **cero resultados relevantes**. No hay presencia en Wikipedia, Reddit, YouTube ni LinkedIn detectable. Peor: hay **colisión de entidad** — el nombre choca con varias empresas de ingeniería colombianas (INSOL, INSOLTEC, INYSOL, "Ingeniería y Soluciones INSOL SAS"). Para un motor de IA, "INSOLVA" es una entidad ambigua/desconocida.

**Por qué importa:** las menciones de marca correlacionan **3x más** con la visibilidad en IA que los backlinks (Ahrefs, 75k marcas). Las fuentes que más citan las IA:
- **ChatGPT:** Wikipedia (47.9%) + Reddit (11.3%) → INSOLVA no está en ninguna.
- **Perplexity:** Reddit (46.7%) + Wikipedia → ausente.
- **Copilot:** índice de Bing → INSOLVA no está en Bing (ver MAPS-ANALYSIS).

Sin construir entidad, INSOLVA no puede ser recomendada por IA en "empresa de seguridad en Ushuaia".

---

## Citability y estructura (a nivel página)

**Lo que ayuda ya:** el copy del rebrand es claro y tiene bloques autocontenidos por servicio (las 4 categorías de seguridad con listas de ítems) — buen material para extracción. Los ~44% de citaciones vienen del primer 30% de la página, y el Hero + Quiénes Somos front-loadean bien el "qué hace" con keywords locales.

**Lo que falta:**
- **Encabezados en forma de pregunta** — hoy son declarativos ("Ingeniería + Seguridad. Una especialidad."). Sumar H2/H3 tipo *"¿Qué es la seguridad electrónica para el hogar?"*, *"¿Cuánto cuesta instalar cámaras en Ushuaia?"* captura patrones de query.
- **Sección FAQ** — respuestas de 40-60 palabras a preguntas reales (cobertura, marcas, obradores, presupuesto). Es lo más citable por IA y no lo tenés.
- **Datos duros / cifras** — la IA cita mejor con números ("visión nocturna hasta 40m", "monitoreo 24/7", "cobertura toda Tierra del Fuego"). El copy es cualitativo; sumar specifics.
- **Fechas de publicación/actualización** — contenido <3 meses se cita ~3x más. Hoy no hay fecha visible.

## Multi-modal — 🔴 débil
Solo hay SVG decorativos (logo, isotipo). El contenido con imágenes/video real se selecciona **156% más**. Oportunidad: fotos de instalaciones reales de Ushuaia (que ya existían en insolvaseguridad.com), diagramas de "cómo planificamos desde el plano", tabla comparativa de tecnologías (Hikvision/Dahua/HiLook/EZVIZ).

---

## Top 5 cambios de mayor impacto

1. **Construir entidad de marca** (lo #1 para IA): presencia consistente NAP en Google Business, Bing, Instagram, y menciones en directorios/prensa local de Ushuaia. Resolver la colisión con las INSOL colombianas usando siempre "INSOLVA **Group** — Ushuaia, Tierra del Fuego" como entidad. (Fuera de código.)
2. **Agregar sección FAQ** con 6-8 preguntas reales, respuestas de 40-60 palabras, encabezados-pregunta. Alto impacto de citación, esfuerzo medio, es código.
3. **Sumar datos duros al copy** (distancias IR, resolución, tiempos de respuesta, cobertura geográfica) — más citable.
4. **Migrar fotos de instalaciones reales** + una tabla comparativa de tecnologías → multi-modal (+156% selección).
5. **Fecha visible de "última actualización"** en la home / secciones — freshness.

## Recomendaciones de schema para IA
- Sumar **`FAQPage`** schema cuando se cree la FAQ (encadena con la sección del punto 2).
- Reforzar `sameAs` en el `Organization`/`ProfessionalService` con **todos** los perfiles (Instagram ya está; sumar Google Business, Facebook, LinkedIn cuando existan) → ayuda a desambiguar la entidad.
- El `hasOfferCatalog` ya presente ayuda a la IA a entender los servicios. ✅

---

## Lo que NO se pudo medir
- Visibilidad real en ChatGPT/Perplexity para queries objetivo (requiere DataForSEO `ai_optimization_chat_gpt_scraper`).
- Tracking de menciones LLM en el tiempo.
- El sitio en producción está cacheado en la versión vieja; el score asume el rebrand desplegado.

---

**Sources:** [búsqueda de marca INSOLVA](https://www.google.com/search?q=%22INSOLVA%22+Ushuaia) — sin resultados relevantes; colisión con [INSOL Ingeniería (Colombia)](http://insolingenieria.co/) y similares.
