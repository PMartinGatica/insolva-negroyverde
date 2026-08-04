# ESTADO DEL PROYECTO — INSOLVA Group Web

> Documento de traspaso. Guarda el estado actual del sitio para poder retomar el trabajo desde cero (chat nuevo). Última actualización: **2026-08-04**.

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
