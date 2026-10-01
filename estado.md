# ESTADO DEL PROYECTO — INSOLVA Group Web

> Documento de traspaso. Guarda el estado actual del sitio para poder retomar el trabajo desde cero (chat nuevo). Última actualización: **2026-09-18** (ver §10: multisección SEO + rediseño editorial).

---

## 1. Qué es el proyecto

Sitio web premium para **INSOLVA Group**, empresa de **seguridad electrónica y automatización** en **Ushuaia, Tierra del Fuego, Argentina**.

**Enfoque comercial (importante para todo el copy):**
- No es solo cámaras. Cubre: **cámaras + alarmas**, **instalaciones eléctricas**, **automatización del hogar** y **redes WiFi / Starlink**.
- Se usa la expresión **"automatización del hogar"**, NUNCA "domótica".
- **NO mencionar "ingeniería"** — el foco es "seguridad electrónica" para llegar a más gente.
- **NO usar títulos tipo "que funciona de verdad"** ni frases que tiren hate a la competencia. Se habla de INSOLVA en positivo.
- Público: hogares, comercios y obras/industrias.

---

## 2. Stack técnico

- **Astro 6** (NO Vite vanilla) — `npm` (NO pnpm)
- **Tailwind CSS**
- Adapter: **Netlify** (functions para los endpoints server-side)
- Fuentes: BlauerNue (titulares), Space Grotesk, enma, Barlow Condensed
- Paleta: negro `#050505`/`#0A0A0A`, verde marca `#98C665` (hover `#6AA03A`), gris texto `#9ca3af`/`#C2C1C1`
- **Rama actual:** `feature/hero-scroll-construccion` (rama main: `main`)

### Servicios externos
- **Gemini API** — modelo `gemini-flash-latest`. Alimenta el chatbot y el lector de facturas. Clave en `GEMINI_API_KEY`. **Sin `thinkingConfig`** (rompe con este modelo). Maneja 429/503.
- **Supabase self-hosted** — `https://supabase.insolvadev.com` (Studio: `https://studio-supabase.insolvadev.com/project/default`). REST vía PostgREST + `service_role` key. **RLS activado.**
  - ⚠️ **Convención de tablas:** deben empezar con prefijo `insolvaweb_` porque conviven varios proyectos en el mismo Supabase.
  - Tabla creada y probada: **`insolvaweb_leads`** (guardado devuelve `{"ok":true}`).
- **Higgsfield MCP** — generación de video (modelo Seedance, orbital 360°). Se conecta de forma intermitente. Cuando está desconectado NO se genera video; lo genera el usuario.

### Variables de entorno (`.env`, NO commiteado)
```
GEMINI_API_KEY=...
SUPABASE_URL=https://supabase.insolvadev.com
SUPABASE_SERVICE_ROLE_KEY=...
```
Hay un `.env.example` en el repo. `claves.md` está en `.gitignore`.

---

## 3. Estructura de la página (`src/pages/index.astro`)

Orden actual de secciones (9 secciones):

1. **Hero** — `src/components/sections/Hero.astro`
2. **ConstruccionScroll** — video scroll-driven de la casa construyéndose
3. **Pilares** — servicios (usa `SERVICIOS_SEGURIDAD` de constants)
4. **ParaQuien** — soluciones por situación
5. **Trabajos** — trabajos reales con modal/carrusel de fotos
6. **Embudo** — embudo de ventas (mini-cuestionario 3 pasos → Supabase + WhatsApp)
7. **QuienesSomos** — fusión de Beneficios + Confianza + QuiénesSomos + "por qué elegirnos"
8. **FAQ** — 6 preguntas variadas cubriendo todos los servicios
9. **Contacto**

Componentes globales: `Header`, `Footer`, `WhatsAppFloat`, `ChatAsistente`, `CookieBanner`.

**Secciones comentadas / fuera de página** (existen en repo pero NO se renderizan):
- `Beneficios.astro` (fusionada en QuienesSomos)
- `Confianza.astro` (fusionada)
- `Galeria.astro` (fotos ahora viven en el modal de Trabajos)
- `Calculadora.astro` (conservada por cambio de enfoque, fuera de página)

---

## 4. Detalle por componente / archivo

### `src/components/sections/Hero.astro`
- **Eyebrow:** `CÁMARAS · ALARMAS · SEGURIDAD — USHUAIA`
- **H1:** `Soluciones` + `<span>inteligentes para<br />tu casa y tu<br />negocio.</span>` (span en verde). Ángulo "soluciones inteligentes" (significado de INSOLVA), ver ADR-014.
- **Subtítulo:** "Cámaras, alarmas, electricidad y automatización para tu casa o negocio en Ushuaia. Todo a medida, sin gastar de más."
- CTAs: "Pedí tu presupuesto" (WhatsApp) + "Ver servicios ↓"
- Isotipo verde rotando 360° de fondo (animación CSS `spin360`), grid blueprint, vignette lateral.

### `src/components/sections/ConstruccionScroll.astro`
- Técnica "Apple": secuencia de frames WebP pintados en `<canvas>` según el scroll. Sin `<video>`, sin GSAP. Sección sticky + scroll nativo + IntersectionObserver.
- `SEQ = 'construccion'`, `FRAME_COUNT = 140`, `SCROLL_VH = 400`.
- Frames en `public/frames/construccion/desktop/` y `.../mobile/` (`frame-0001.webp` … `frame-0140.webp`).
- **HITOS** (texto sincronizado con progreso 0–1):
  - 0.00 — "Desde los cimientos" / "Empezamos por el plano."
  - 0.35 — "Tu casa, a medida" / "Estructura y aberturas a tu escenario."
  - 0.62 — "Domótica y luces" / "Todo controlado desde el celular."
  - 0.82 — "Seguridad instalada" / "Cámaras y alarmas, sin zonas ciegas."
- Fundidos de empalme: `.cs-fade-top` (negro del hero → transparente, 22vh) y `.cs-fade-bottom` (transparente → blanco de Servicios, 30vh) para que las transiciones NO sean abruptas.
- Detalles técnicos: canvas cover-fit manual, DPR cap 2, precarga progresiva (1 de cada 4, luego el resto), `img.decode()` antes de dibujar, HUD con `?debug=1`, fallback estático para `prefers-reduced-motion`.

### `src/components/sections/Embudo.astro`  (embudo de ventas)
- Mini-cuestionario de 3 pasos + éxito:
  - Paso 1 `tipo_propiedad`: casa / negocio / obra
  - Paso 2 `interes`: camaras / electricidad / automatizacion / redes / todo
  - Paso 3 `datos`: nombre / email / whatsapp (requiere nombre + al menos email O whatsapp)
  - Éxito: link a WhatsApp prellenado
- **Título:** "Contanos qué necesitás." — **Lead:** "En 3 pasos te armamos un presupuesto a medida. Sin compromiso."
- Barra de progreso, botones estilizados, lee `data-wa` (número WhatsApp).
- El script hace POST a `/api/guardar-lead-embudo`, luego arma el link de WhatsApp. **Best-effort:** aunque falle el guardado, igual deja pasar al WhatsApp (no se pierde el lead).
- `INTERES_TXT`: camaras→"cámaras y alarmas", electricidad→"instalación eléctrica", automatizacion→"automatización del hogar", redes→"redes WiFi / Starlink", todo→"un proyecto completo".

### `src/pages/api/guardar-lead-embudo.ts`
- POST. Valida `nombre` + (`email` O `whatsapp`). Inserta en `${SUPABASE_URL}/rest/v1/insolvaweb_leads` con `service_role` key. Best-effort.
- **Aviso por email (ADR-017):** tras guardar (y también si Supabase falla) envía un mail vía **Resend** a `LEAD_NOTIFY_TO`. Best-effort (si falla el mail, solo loguea). Env: `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`. El mail lleva nombre/lugar/interés/WhatsApp/email y `reply_to` = email del lead. **Pendiente de activación:** verificar dominio `insolvagroup.com` en Resend y cargar `RESEND_API_KEY` en Netlify.

### `src/components/sections/QuienesSomos.astro`  (fusión minimalista)
- Fusiona Beneficios + Confianza + QuiénesSomos + "por qué elegirnos" en UNA sección centrada/minimalista.
- Se **eliminó** el diagrama de proceso (01 RELEVAMIENTO / 02 DISEÑO / 03 EJECUCIÓN / 04 SEGUIMIENTO) y el layout de 2 columnas con foto.
- **Eyebrow:** `QUIÉNES SOMOS · POR QUÉ ELEGIRNOS` — **Título:** "De Ushuaia, hecho a tu medida."
- **Copy:** "Somos una empresa de seguridad electrónica de Tierra del Fuego. Instalamos cámaras, alarmas, automatización del hogar, redes e instalaciones eléctricas para hogares, comercios e industrias — todo a medida de tu lugar."
- **diferenciales[]:** Planificamos a medida desde el plano / Seguridad, electricidad, automatización y redes en un solo sistema / Marcas líderes (Hikvision, Dahua, TP-Link, Starlink) a precio justo / Gente de Ushuaia: respondemos rápido y damos garantía.

### `src/components/sections/FAQ.astro`
- 6 preguntas variadas cubriendo TODOS los servicios (no solo cámaras). Sin peso bold en las preguntas (se quitó en commit `74a1e4c`).

### `src/components/sections/Trabajos.astro`
- Trabajos reales con modal/lightbox tipo carrusel. Fotos con `object-contain` `aspect-[4/3]` (se ven completas, sin cortar).
- Subtítulo: "Trabajos reales en Tierra del Fuego. Tocá cada uno para ver más fotos."
- Fotos en `public/fotos-trabajos/` (arrays de galería en constants: comercio-01..12, restaurante-01..20, obra-01..05). Si hay fotos duplicadas, NO usarlas.

### `src/components/sections/Pilares.astro`
- Cards de servicios con `object-contain aspect-[4/3] bg-[#0F0F0F]` (fotos completas).

### `src/components/sections/ParaQuien.astro`
- Bullets ampliados a todos los servicios. Título: "Soluciones pensadas para tu situación."

### `src/components/sections/Contacto.astro`
- Título: "Pedí tu presupuesto para tu casa, negocio u obra en Ushuaia."

### `src/components/layout/Footer.astro`
- Tagline: "Seguridad electrónica y automatización."
- Servicios: "Cámaras y alarmas", "Automatización del hogar", "Redes WiFi y Starlink" (se quitó Ingeniería/DevXIA).

### `src/components/ui/ChatAsistente.astro`
- Widget de chat flotante. Subtítulo: "Seguridad electrónica y automatización".
- ⚠️ **CSS de las burbujas debe ser `<style is:global>`**: las burbujas se crean con `document.createElement`, por lo que no reciben el atributo `data-astro-cid-*` del scoping de Astro; con scoping normal el texto queda invisible.
- `#chat-messages` necesita `min-h-0` (flex child) para poder scrollear.
- Fetch a `/api/chat` con AbortController (timeout 20s).

### `src/pages/api/chat.ts`
- Endpoint server-side (Netlify function). `prerender = false`. Modelo `gemini-flash-latest`, sin `thinkingConfig`. Maneja 429/503.
- SYSTEM_PROMPT cubre: cámaras, alarmas, redes WiFi/Starlink, automatización del hogar, instalaciones eléctricas. Sin "criterio de ingeniería". Canal principal = WhatsApp, nunca inventa precios. Prompt pide máx. 3-4 oraciones y SIEMPRE terminar las frases.
- **Fix respuesta cortada (ADR-016):** `maxOutputTokens: 900` (antes 600). Se lee `finishReason`; si es `MAX_TOKENS`, se recorta la oración incompleta y se cierra derivando a WhatsApp (antes quedaba a mitad de frase y el bot "pedía perdón" al turno siguiente).

### `src/pages/api/leer-factura.ts`
- Lector de facturas con Gemini Vision. Modelo `gemini-flash-latest`, sin `thinkingConfig`, maneja 429/503.

### `src/lib/constants.ts`
- `BRAND` (whatsapp, email, instagram, location…), `SERVICIOS_SEGURIDAD` (resúmenes cortos), `TRABAJOS` (con arrays de galería), `GALERIA` (sin uso).
- Resúmenes cortos actuales: Cámaras "Mirá tu casa o negocio en vivo…", Alarmas "Te avisan al instante…", Redes "Internet sin zonas muertas…", Automatización "Luces, portones, climatización y accesos…".
- ⚠️ Todavía existe un "pilar Ingeniería" en constants pero **no se usa** (Pilares usa `SERVICIOS_SEGURIDAD`).

### `scripts/build-frames.mjs`
- Extrae frames de un video y genera WebP. Uso: `node scripts/build-frames.mjs <video> construccion 140`.
- Genera desktop (1440px) y mobile (720px). Presupuesto: desktop ≤6MB, mobile ≤2.5MB (baja calidad y reintenta si se pasa). Usa ffmpeg + sharp.

---

## 5. Assets de imagen/video conocidos
- Foto de fundaciones/cimientos → frame de inicio del video de construcción.
- `termostatointeligente.png` → card de Automatización del hogar.
- `redesstartlink.png` → card de Redes (antena Starlink en un obrador).
- `alarma.jpg` → card de Alarmas (NO incluir en la galería).
- Fotos/videos reales en `public/fotos-trabajos/`. De los videos se pueden extraer frames.

---

## 6. Menciones de "ingeniería" que quedan (de fondo, NO visibles en la página actual)
Pendiente de decisión del usuario si se limpian:
- `Beneficios.astro` (comentado, fuera de página)
- "pilar Ingeniería" en `constants.ts` (estructura sin uso)
- Schema SEO en `Layout.astro`
- Página `politica-de-privacidad`

---

## 7. Último trabajo hecho
1. **H1 del Hero** → "Soluciones inteligentes para tu casa y tu negocio." (ángulo "soluciones inteligentes", significado de INSOLVA — ADR-014).
2. **Título de pestaña / SEO** (`Layout.astro`): `<title>` = "Cámaras, Alarmas y Domótica en Ushuaia | Automatización – INSOLVA Group". Se sumó "domótica" al title y keywords por SEO (excepción documentada en ADR-015; en copy visible se sigue usando "automatización del hogar").
3. **Chatbot que se cortaba** (`chat.ts`): `maxOutputTokens` 600→900 + manejo de `finishReason MAX_TOKENS` (cierra prolijo hacia WhatsApp) + prompt reforzado (máx 3-4 oraciones, siempre terminar frases). Ver ADR-016.

`npm run build` OK.

**Trabajo previo:** Corrección del Hero anterior ("Cuidamos…") y reemplazo de "ingeniería" por "seguridad electrónica y automatización" en Hero, QuienesSomos, Footer y chatbot.

## 8. Próximos pasos posibles (a confirmar con el usuario)
- Decidir si limpiar las menciones "de fondo" de "ingeniería" (schema SEO + política de privacidad + constants) para consistencia 100%.
- El usuario dijo que va a adjuntar archivos para continuar.

---

## 9. Tienda (fusión con WooCommerce) — 2026-09-16

**Qué es:** INSOLVA tiene una tienda real en WordPress + Blocksy + WooCommerce (`darkcyan-rail-217476.hostingersite.com`, gestionada con Novamira), con productos de domótica/seguridad que encajan con el negocio de la landing. El pedido del usuario fue "fusionar" landing y tienda sin perder ninguna de las dos. Decisión de arquitectura completa: **ADR-018**.

**Resumen de lo implementado (Fase 1, código en este repo):**
- `src/lib/tienda.ts`: ya no es un catálogo estático. `getProductosDestacados(limit)` trae productos reales de WooCommerce (`wc/v3/products`) **en build time** (Node, corre en `astro build`/`astro dev`, nunca en el navegador — el sitio sigue `output: 'static'`). Si faltan credenciales o la API falla, devuelve `[]` y la sección se oculta sola (no rompe el build). `COPY_PRODUCTOS` guarda copy de venta escrita a mano por `id` de WooCommerce (detalle/badge/imagen de fallback); un producto nuevo sin entrada ahí usa su `short_description` de WooCommerce tal cual.
- `src/components/sections/Tienda.astro` (nueva sección, montada en `index.astro` después de `<Pilares />`): vidriera de hasta 4 productos reales, mismo lenguaje visual que `Pilares.astro` (cards `border ... hover:border-[#98C665]/60`, imagen `object-contain` sobre fondo blureado). CTA "Ver tienda completa" a `TIENDA_URL`.
- `NAV_LINKS` (en `constants.ts`) suma `{ label: "Tienda", href: TIENDA_URL }`. `Header.astro` ahora abre en pestaña nueva (`target="_blank"`) cualquier link de nav que empiece con `http` (antes todos eran anclas internas `#...`). `Footer.astro` suma "Tienda online" a la columna Servicios, mismo patrón que WhatsApp/Instagram (external, `target="_blank"`).
- Env nuevas (`.env`, `.env.example`, y como GitHub Secrets en `PMartinGatica/insolva-negroyverde` para que el build de CI las tenga): `WOOCOMMERCE_URL`, `WOOCOMMERCE_KEY`, `WOOCOMMERCE_SECRET` — mismas que en `D:\insolva\Desarrollo\woocommerce-insolva\.env`. Solo se leen en build time; verificado que no quedan en el HTML generado.
- `TIENDA_URL` hoy apunta a la URL temporal `darkcyan-rail-217476.hostingersite.com`. Cuando se conecte el subdominio `tienda.insolvagroup.com` (Fase 3, pendiente — requiere acceso al hPanel de Hostinger que el asistente no tiene), es un cambio de una sola línea en `src/lib/tienda.ts`.

**Fase 2 (sitio WooCommerce, no en este repo) — hecha 2026-09-16, vía API + Novamira (sin wp-admin manual):**
- Tienda sacada de modo "Coming soon" → pública (autorizado por el usuario).
- Logo, ícono del sitio, título/tagline de INSOLVA cargados; home del dominio apunta a la página Tienda.
- Paleta global de Blocksy (`theme_mod colorPalette`) remapeada a los colores de INSOLVA (verde `#98C665`/`#6AA03A`, ink `#0A0A0A`/`#4A4A4A`, fondos `#F7F7F5`/`#FFFFFF`) — botones y acentos de la tienda ya salen en verde de marca. Tipografía del sitio (body + headings) pasada a Space Grotesk vía Additional CSS nativo de WordPress. Verificado con captura + computed styles.
- Gateway "Contra reembolso" reconfigurado como "Coordinar por WhatsApp" (activo). Plugin oficial de Mercado Pago instalado y activo, sin configurar todavía.
- **Pendiente:** credenciales de Mercado Pago (Public Key/Access Token) y datos bancarios (CBU/alias/banco/titular) para BACS — los tiene que pasar el usuario. Fotos reales de producto (WooCommerce no tiene ninguna imagen cargada todavía, se ve el placeholder gris). El texto del copyright del footer ("Tema para WordPress de CreativeThemes") no se pudo cambiar por API — el theme_mod plano `copyright_text` no es el que lee el footer builder de Blocksy (usa una estructura anidada distinta); cambiarlo a mano en Personalizar → Pie de página → Copyright toma un minuto.

Ver ADR-018 para el detalle completo de la decisión de arquitectura.

---

## 10. Multisección SEO + rediseño editorial — 2026-09-18

**Por qué:** el problema central era que el sitio no aparecía en Google. La causa principal no eran los meta tags: era que el sitio era **one-page**, y una sola URL no puede rankear a la vez por "cámaras de seguridad Ushuaia", "cerraduras digitales", "electricista" y "domótica". Ver **ADR-019**.

### Páginas nuevas (9 en total, antes 2)
| URL | Tema |
|---|---|
| `/servicios/` | Hub + "tienda de servicios" con botón a WhatsApp por servicio |
| `/camaras-de-seguridad-tierra-del-fuego/` | Cámaras / CCTV |
| `/cerraduras-digitales-tierra-del-fuego/` | Cerraduras digitales y control de acceso |
| `/alarmas-tierra-del-fuego/` | Alarmas |
| `/domotica-tierra-del-fuego/` | Domótica / automatización del hogar |
| `/redes-wifi-tierra-del-fuego/` | Redes WiFi, cableado y Starlink |
| `/electricidad-tierra-del-fuego/` | Instalaciones eléctricas |

Todo el contenido vive en **`src/lib/servicios.ts`** (un objeto por servicio: H1, lead, problema, qué incluye, bloques, para quién, galería, FAQ, mensaje de WhatsApp, relacionados). La plantilla es **`src/pages/[servicio].astro`** con `getStaticPaths`. **Agregar un servicio = agregar un objeto**: página, schema, sitemap, footer, menú mobile, hub y home se actualizan solos.

### Archivos nuevos
- `src/lib/servicios.ts` — contenido de las 6 páginas.
- `src/lib/seo.ts` — `absoluteUrl`, `organizationSchema`, `serviceSchema`, `faqSchema`, `breadcrumbSchema`.
- `src/lib/newsletter.ts` — `NEWSLETTER_ENDPOINT` (vacía; ver ADR-021).
- `src/pages/[servicio].astro`, `src/pages/servicios.astro`.
- `src/components/layout/Breadcrumbs.astro`, `src/components/ui/Newsletter.astro`, `src/components/ui/Foto.astro`, `src/components/sections/PlanificacionObra.astro`.
- `scripts/build-fotos-servicios.mjs` — convierte las fotos de `assets/source/fotos-originales/` a WebP en `public/img/servicios/` (**36 fotos, 4 MB en total**, ninguna sobre 290 KB). Solo redimensiona y comprime: no altera el contenido de la foto (ADR-011 / multiseccion.md). **Para sumar fotos nuevas:** copiarlas a `assets/source/fotos-originales/`, agregar el par `[origen, destino]` al `MAPA` del script, correrlo, y referenciar el nuevo `.webp` desde `servicios.ts`.
- `public/llms.txt` — para ChatGPT/Perplexity/Claude.

### Bugs preexistentes encontrados y corregidos
1. **Space Grotesk nunca se cargaba.** El `@import` de Google Fonts en `global.css` quedaba después de reglas → inválido → el optimizador lo descartaba del build. Todo el sitio venía en el sans-serif del sistema. Ahora va como `<link>` en `Layout.astro`. Ídem `enma`, que se usaba por nombre en `style=` sin `@font-face` declarado.
2. **`canonical` fijo en la home** para todas las páginas. Cualquier página interna se declaraba duplicado de `/`. `Layout.astro` ahora recibe `path`.
3. **Dos botones verdes en la barra en desktop.** `.btn { display:inline-flex }` le ganaba a `md:hidden` de Tailwind. Resuelto poniendo los componentes en `@layer components`.
4. **53 fallos de contraste** (verde de marca sobre blanco = 1.85:1). Nuevo token `--green-text: #4F7D22` + clase `on-dark`. Ver ADR-020. Ahora 0.
5. **Sin estilos de `:focus`** en todo el sitio: imposible de recorrer con teclado. Agregado `:focus-visible` global.
6. **Copyright del footer** en `#4A4A4A` sobre `#0A0A0A` (~1.9:1), ilegible.
7. **Banner de cookies** tapaba el CTA del hero en mobile. Ahora es una barra fina abajo, aparece a los 1,2 s y respeta el safe-area; el botón flotante de WhatsApp sube mientras está abierta.
8. **Menú mobile** sin cierre por Escape, sin `aria-expanded` y dejando scrollear la página por detrás.
9. **`.reveal` dejaba el contenido en `opacity: 0` si fallaba el JS.** Ahora el estado oculto se aplica solo bajo `.js`, que pone un script inline en el `<head>`.
10. **Fotos de producto engañosas:** los productos de WooCommerce sin imagen se ilustraban con fotos de instalaciones nuestras (un sensor de apertura mostraba una pared). Ahora sale un marcador neutro. **Pendiente: cargar las fotos reales en WooCommerce** — aparecen solas en el siguiente build.

### Verificación hecha
- `npm run build` OK, 9 páginas, sin warnings.
- Overflow horizontal en 360 / 390 / 768 / 1440: **0 px**.
- Errores de consola y requests fallidos: **ninguno**.
- Contraste de texto (4 páginas, WCAG AA): **0 fallos**.
- Rastreo de enlaces desde la home: **las 9 páginas alcanzables**, 0 enlaces internos rotos, 0 anclas rotas.
- `canonical` y `sitemap` coinciden (ambos con barra final).

### Pendiente
- **Newsletter:** pegar la URL del proveedor en `NEWSLETTER_ENDPOINT` (ADR-021). Hasta entonces el formulario abre un mail redactado.
- **Fotos de producto en WooCommerce.**
- **Google Business Profile:** cambiar la categoría a "Empresa de seguridad electrónica" / "Instalación de sistemas de seguridad" y juntar reseñas. Nada de esto se resuelve desde el código.
- **Google Search Console:** enviar `sitemap-index.xml` y pedir indexación de las 7 URLs nuevas.

### Tanda de fotos 2026-09-18 (16 nuevas)
Fotos de trabajos recientes, varias con técnicos trabajando — que es justo lo que pedía `multiseccion.md` y lo que más construye confianza. Reemplazaron heros más flojos:

| Foto | Dónde se usa |
|---|---|
| `cerraduras-terminada` (Keylessoft con teclado y huella, terminada) | **Hero de Cerraduras** — reemplazó la EZVIZ sobre puerta vieja |
| `redes-starlink-instalacion` (técnico montando la antena) | **Hero de Redes** — reemplazó una foto de producto chica |
| `obra-camara-poste` (cámara + reflector con el canal y montaña nevada) | **Hero de Cámaras** |
| `electricidad-tablero` (térmicas y diferenciales, apaisada) | Bloque 02 de Electricidad, "un tablero que se entienda" |
| `obra-cableado-steelframe` (cableado pasado antes de cerrar) | **Sección de obra de la home** + Redes bloque 03 + Electricidad bloque 03 |
| `cerraduras-medicion` (plantilla sobre la puerta) | Bloque 03 nuevo de Cerraduras: "cada puerta se mide antes de comprar nada" |
| `camaras-domo-complejo`, `camaras-instalando-alero` | Cámaras: bloques y galería |
| `camaras-complejo`, `camaras-alero-obra`, `camaras-ptz-detalle` | Cámaras y Alarmas |
| `cerraduras-teclado`, `cerraduras-instalacion` | Cerraduras y Domótica |
| `obra-starlink-camara` | Redes bloque 02 + galería de Cámaras |
| `electricidad-complejo`, `obra-steelframe-montaje` | Galerías de Electricidad y Domótica |

Las galerías de **Alarmas** y **Domótica** pasaron de 3 a 6 fotos. Alarmas sigue siendo la página con menos material propio: no hay fotos de paneles, sensores ni sirenas instaladas. Si aparecen, es la primera que conviene reforzar.

### Bug adicional corregido
11. **`<img src="">`** en el lightbox de `Trabajos.astro` (dos elementos). Un `src` vacío hace que el navegador vuelva a pedir la URL de la página como si fuera una imagen — una petición extra al documento por cada carga de la home. Se quitó el atributo; el JS igual les asigna el `src` real al abrir el modal.

---

## 11. Videos del canal de YouTube — 2026-09-18

**Qué hay:** el canal `@insolva` (`UClOP0XI75lb_09YRVO2vrBg`) tiene **13 Shorts**, todos verticales, de 13 a 51 segundos. Estaba desconectado del sitio: ni un link en ninguna dirección.

**Implementación:** `src/lib/videos.ts` (los 13 con id, título, descripción propia, duración ISO 8601, fecha y en qué páginas va cada uno), `src/components/ui/VideoShort.astro` (reproductor con fachada) y `src/components/sections/Videos.astro` (la sección). Decisión de arquitectura completa en **ADR-022**.

### Reparto por página
| Página | Videos |
|---|---|
| Home | El error N°1 al instalar · Nivelación láser · El error más caro al construir (obra Kau Kren) · Lo PRIMERO que tenés que poner al construir |
| Cámaras | Instalación profesional de cámaras · El error N°1 al instalar · Instalación, canalización y cableado · Lo PRIMERO al construir |
| Alarmas | Lo que las cámaras NO pueden evitar |
| Cerraduras | El cambio que tu puerta necesita · Olvidarte las llaves adentro |
| Domótica | No dejes tu casa inteligente al azar · Canalización de reflectores LED |
| Redes | Instalación de cámaras, canalización y cableado |
| Electricidad | Instalación y cableado · Esto nadie lo hace · Reflectores LED en terraza · Nivelación láser |

"Lo que las cámaras de seguridad NO pueden evitar" cayó justo en Alarmas: dice en video exactamente el argumento con el que abre esa página (la cámara registra, la alarma avisa mientras pasa).

### Miniaturas
`scripts/build-miniaturas-video.mjs` las baja de YouTube (`oardefault.jpg`, la vertical) y las guarda como WebP 540×960 en `public/img/videos/` — 13 archivos, **486 KB en total**. Se guardan locales a propósito: ver ADR-022.

### Verificado
- **0 peticiones a YouTube antes de tocar play**; 5 después. Medido con Playwright.
- 0 `<iframe>` en el HTML servido de las 9 páginas.
- `VideoObject` emitido: home 5, cámaras 4, electricidad 5, cerraduras 2, domótica 2, alarmas 1, redes 1.
- Build OK · 0 px de overflow en 390 y 1440 · 0 enlaces o anclas rotas · 0 errores de consola o red · 0 fallos de contraste.

### Pendiente
- **Los videos siguen siendo pocos por página.** Alarmas y Redes tienen uno solo. Si el canal suma material, se reparte editando `paginas` en `videos.ts`.
- **Enlazar al revés:** poner `insolvagroup.com` en la descripción del canal y de cada Short. Eso es en YouTube, no en el código, y es la mitad que falta del cruce sitio ↔ canal.

---

## 12. Reestructuración a sitio por secciones — 2026-09-19

El sitio dejó de ser una landing de scroll largo. Ahora son **cinco secciones con página propia** más la tienda aparte. Ver **ADR-023**.

| Página | Qué tiene |
|---|---|
| `/` | Hero · ConstruccionScroll · índice de servicios (sin fotos) · planificación desde obra · Ushuaia · CTA |
| `/servicios/` | Los 6 servicios con foto y WhatsApp · para quién · metodología · FAQ · CTA |
| `/trabajos/` | Instalaciones con galería en modal · videos · CTA |
| `/nosotros/` | Quiénes somos · cuatro diferenciales · Ushuaia · CTA |
| `/contacto/` | 4 canales (WhatsApp, correo, Instagram, YouTube) · formulario · zona y horario · newsletter |
| Tienda | Externa, el WooCommerce. Abre en pestaña nueva desde nav y footer. |

Más las 6 páginas de servicio y la política de privacidad: **12 páginas en total**.

### Archivos nuevos
- `src/pages/trabajos.astro`, `src/pages/nosotros.astro`, `src/pages/contacto.astro`
- `src/components/layout/PageHero.astro` — cabecera común de las páginas internas
- `src/components/sections/Metodologia.astro` — los 6 pasos, sin inventar plazos
- `src/components/sections/Ushuaia.astro` — el territorio
- `src/components/ui/FormContacto.astro` + `src/lib/contacto.ts`
- `.claude/skills/humanizalo/` — la skill de edición de textos

### Qué cambió de lo que ya estaba
- `Pilares.astro` quedó **sin fotos**: era la fuente de la duplicación visual con `/servicios`.
- `NAV_LINKS`: de anclas a rutas reales. Nuevo orden: Servicios, Trabajos, Nosotros, Contacto, Tienda.
- El **newsletter vive solo en `/contacto/`**. Se sacó de la home y de las páginas de servicio.
- `Tienda.astro` (la vidriera de productos WooCommerce) salió de la home y de `/servicios`. Queda en el repo por si se quiere volver a montar.
- `QuienesSomos.astro` y `FAQ.astro`: el primero salió de página (su contenido vive en `/nosotros`), el segundo se mudó a `/servicios`.
- `ParaQuien`, `FAQ`, `Trabajos` y `QuienesSomos` pasaron a las clases del sistema (`section section-paper`, `wrap`).

### Formulario de contacto
Mismo criterio que el newsletter (ADR-021): sin servidor propio, el destino está detrás de `CONTACTO_ENDPOINT` en `src/lib/contacto.ts`, hoy vacía. Mientras tanto abre un mail ya redactado con todos los datos cargados. **Pendiente: elegir proveedor** (Formspree, Supabase propio o el WooCommerce) y pegar la URL.

### Textos
Se pasó todo el copy visible por `humanizalo`. Ver **ADR-024**: cero tells restantes en texto visible.

### Verificado
Build OK, 12 páginas · 0 enlaces o anclas rotas · 0 px de overflow en 390 y 1440 · 0 errores de consola o red · contraste AA en los dos estados de la barra (verde claro sobre el hero oscuro, verde oscuro sobre la barra blanca con scroll).

---

## 13. Funnel, videos solo en Trabajos, portadas y logos de clientes — 2026-09-30

### Funnel de guías gratis (`funnel-ventas.vercel.app`)
App Next.js aparte, con su propio backend (`POST /api/lead`). **Se enlaza, no se integra.** Su endpoint no manda cabeceras CORS (se verificó con un preflight), así que un formulario de este sitio estático no podría enviarle datos desde el navegador.
- `src/lib/funnel.ts`: `FUNNEL_URL` y `funnelLink(origen)`. Agrega `utm_source/medium/campaign/content`, que la app ya lee y guarda con cada lead, así se sabe de qué sección llegó cada registro.
- Enlaces en: sección `Guias.astro` de la home (`utm_content=home`), bloque en `/contacto/` (`contacto`) y footer (`footer`).
- **Pendiente:** pasarlo a un subdominio propio (p. ej. `guias.insolvagroup.com`) apuntado a Vercel. Es un cambio de una línea en `funnel.ts`. La política de privacidad ya lo menciona (sección 2 y 4) y habla de Vercel como proveedor.
- El funnel dice "grupo de WhatsApp con promos" y "promo de instalación con precio especial hasta fin de mes". Esa promo es un ejemplo de aviso dentro de su propia página, no una oferta de este sitio.

### Videos: solo en `/trabajos/`
Decisión del usuario: los videos no se repiten en las páginas de servicio porque el canal ya los tiene todos. `Videos.astro` ahora recibe `videos` y cierra la tira con una celda "Ver más en YouTube" que va al canal. `/trabajos/` muestra los **5 más nuevos** por fecha. Se quitó el campo `paginas` de `videos.ts`; quedó `oculto?: boolean`.
- El canal tiene **17 videos** (había 13): se sumaron `_UzbFjtkyh4`, `aYrIN9ndeOM`, `GEO49te3T30`, `dEcQR_UXav0`. Las descripciones de esos cuatro se escribieron a partir del título y la miniatura, sin ver el video.
- **`utu_V5138AY` ("Lo que las cámaras NO pueden evitar") está `oculto`:** lo presenta otra persona, sin marca INSOLVA, y habla de cámaras, no de alarmas. Confirmar que es del canal antes de mostrarlo.
- `VideoObject` ahora se emite solo en `/trabajos/`.

### Fotos nuevas (10) y portadas
- Nuevas: alarmas (central Hikvision, detector de humo, sensor magnético: las primeras propias de esa página), cerraduras (puerta terminada, conexión del cable), electricidad (canalización, cableado en rollos, caja con cables), cámaras (viga de madera, galería).
- **Portadas nuevas** de Cerraduras (puerta de madera con cerradura negra), Alarmas (central Hikvision) y Electricidad (caja con cables en steel frame). `Foto.pos` en `servicios.ts` ajusta el encuadre de cada portada.
- La portada de las páginas de servicio pasó de cubrir todo el ancho bajo un velo casi opaco (no se veía) a ocupar el 62% derecho con el velo solo del lado del texto.
- `camaras-galeria-madera` se recortó un 7% por la izquierda: en el borde se leía el número de casa del cliente.
- **Alarmas ya no usa fotos de cámaras ni la imagen de catálogo de Hikvision.** Tiene 3 fotos propias y su galería quedó vacía: la plantilla oculta la galería con menos de 3. Domótica quedó solo con fotos de domótica.
- Dos de las 12 fotos enviadas eran duplicadas (cartel con Starlink y mecanismo de cerradura) y se omitieron. Se detectó con un hash perceptual.

### Logos de clientes en el hero
`Clientes.astro`, dentro del hero y antes del "Scroll". Prismatica, Chez Manu y Biorn, **a color sobre pastillas blancas** para que se vean nítidos sobre el negro. `scripts/build-logos-clientes.mjs` los prepara desde `src/LOGOS/` (Chez Manu se pasa a negro y se recorta el gallo: era un panel gris semitransparente). Con 6 o más logos pasa solo a una cinta continua.
- Se verificó que entran en el primer pantallazo, sin tapar el aviso de cookies, en 1920×1080, 1440×900, 1366×768, 1280×720, tablet y celular de 390×844.
- Para lograrlo se compactó el hero y se ocultan los accesos a servicios en ventanas de hasta 940px de alto (siguen en el menú y en la sección siguiente).
- **Pendiente:** el rótulo dice "Confían en INSOLVA". Confirmar que los tres clientes autorizan mostrar su logo.
- **Pendiente:** 360×740 (celular muy chico) deja la franja apenas debajo del aviso de cookies.

### Otros
- Teléfono centralizado en `BRAND.whatsappLegible`. En el JSON-LD sale completo (`+5492901641452`); el `+549****1452` de la auditoría no aparece en el build.
- `robots.txt` apunta a `sitemap-index.xml`, que lista `sitemap-0.xml` con las 12 URLs. Se verificó en `dist/`.
- **Pendiente (SEO):** no hay página de "control de acceso". Hoy vive dentro de cerraduras y domótica. Es una keyword propia que vale una página cuando haya contenido real.
- Los formularios de contacto y newsletter llegan a `proyectos@insolvagroup.com` (`BRAND.emailLeads`).
