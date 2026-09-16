# ADR — Decisiones de Arquitectura (INSOLVA Group Web)

> Architecture Decision Records. Cada entrada registra una decisión tomada, su contexto y por qué, para no volver a discutirla ni deshacerla por error. Última actualización: **2026-08-04**.

---

## ADR-001 — Framework: Astro 6 + npm
**Decisión:** El sitio es **Astro 6**, gestionado con **npm** (no pnpm) y **Netlify adapter**.
**Por qué:** Islas de JS mínimo, buen SEO/SSG, endpoints server-side (`prerender = false`) para chat/facturas/leads sin backend aparte.
**Consecuencia:** Los endpoints en `src/pages/api/*.ts` corren como Netlify Functions. Las claves viven solo en env, nunca en el cliente.

---

## ADR-002 — Enfoque comercial: seguridad electrónica + automatización, SIN "ingeniería"
**Decisión:** Todo el copy visible se orienta a **seguridad electrónica y automatización**. NO se menciona "ingeniería".
**Por qué:** El usuario quiere llegar a más gente. "Ingeniería" achica la audiencia y no comunica el valor comercial. La empresa hace cámaras, alarmas, electricidad, automatización y redes — se comunica eso en lenguaje simple.
**Regla derivada:** Usar siempre **"automatización del hogar"**, NUNCA "domótica".
**Estado:** Aplicado en Hero, QuienesSomos, Footer, ChatAsistente, chat.ts. Pendiente (opcional): schema SEO en Layout, política de privacidad, "pilar Ingeniería" en constants.

---

## ADR-003 — Tono: hablar de INSOLVA en positivo, sin tirar hate
**Decisión:** No usar títulos tipo "que funciona de verdad" ni frases que comparen despectivamente con la competencia.
**Por qué:** El usuario no quiere tirarle palos a otras compañías; el mensaje es sobre lo que hace INSOLVA, en positivo.
**Ejemplo:** El H1 del Hero pasó a "Cuidamos tu casa y tu negocio en Ushuaia."

---

## ADR-004 — Video del hero: secuencia de frames en canvas ("estilo Apple"), NO `<video>` ni GSAP
**Decisión:** La sección `ConstruccionScroll` pinta frames WebP en un `<canvas>` según el progreso de scroll, con sección sticky, scroll nativo e IntersectionObserver.
**Por qué:** Control frame-a-frame ligado al scroll (efecto Apple), mejor rendimiento y control que un `<video>`, sin dependencia de GSAP.
**Consecuencia:** Requiere pre-generar frames con `scripts/build-frames.mjs`. Cambiar el video ⇒ regenerar frames y ajustar `FRAME_COUNT`. Frames en `public/frames/construccion/{desktop,mobile}/`.
**Detalles de robustez:** cover-fit manual, DPR cap 2, precarga progresiva (1 de cada 4 y luego el resto), `img.decode()` antes de dibujar, fallback estático para `prefers-reduced-motion`, HUD de debug con `?debug=1`.

---

## ADR-005 — Video: cámara ORBITA 360° mientras la casa se construye + instalación de seguridad
**Decisión:** El video muestra la casa construyéndose desde los cimientos mientras la cámara **orbita 360°** (como un reloj girando), y hacia el final se instalan cámaras/domótica.
**Por qué:** Elección explícita del usuario sobre "casa se construye estática" vs "cámara orbita". Se generó con Higgsfield/Seedance (8s), start frame = foto de cimientos del cliente.
**Consecuencia:** Higgsfield MCP se conecta de forma intermitente. **Regla:** cuando el MCP está desconectado NO se genera video; lo genera el usuario. Prompt documentado en `prompt-video-hero.md`.

---

## ADR-006 — Transiciones suaves entre secciones (nada de cortes abruptos)
**Decisión:** Fundidos de empalme: negro del hero → primer frame (`.cs-fade-top`, 22vh) y último frame → blanco de Servicios (`.cs-fade-bottom`, 30vh).
**Por qué:** El usuario pidió que el paso hero→video y video→servicios no sea abrupto.

---

## ADR-007 — Embudo de ventas: mini-cuestionario 3 pasos → Supabase + WhatsApp
**Decisión:** Sección `Embudo` con cuestionario de 3 pasos (tipo_propiedad → interés → datos). Al enviar: guarda en Supabase **y** abre WhatsApp con mensaje prellenado.
**Por qué:** Captar leads (email + WhatsApp) con fricción mínima. Elecciones explícitas del usuario: "mini-cuestionario de 2-3 pasos", "CTA fuerte al final del video", "se guarda en Supabase + abre WhatsApp".
**Regla derivada (best-effort):** aunque falle el guardado en Supabase, el front igual deja pasar al WhatsApp — no se pierde el lead.

---

## ADR-008 — Supabase: tablas con prefijo `insolvaweb_`
**Decisión:** Toda tabla de este proyecto en el Supabase self-hosted lleva prefijo **`insolvaweb_`** (ej: `insolvaweb_leads`).
**Por qué:** Conviven varios proyectos en el mismo Supabase; el prefijo evita colisiones.
**Consecuencia:** Insert vía PostgREST con `service_role` key desde el endpoint server-side. RLS activado.

---

## ADR-009 — Gemini: modelo `gemini-flash-latest`, sin `thinkingConfig`
**Decisión:** Chat y lector de facturas usan el alias `gemini-flash-latest`. **No** se envía `thinkingConfig`.
**Por qué:** `gemini-2.5-flash` dejó de estar disponible para claves nuevas (429/deprecación). `thinkingConfig:{thinkingBudget:0}` daba 400 INVALID_ARGUMENT con este modelo.
**Consecuencia:** Ambos endpoints manejan 429 (saturación) y 503 (temporal) con mensajes claros al usuario.

---

## ADR-010 — Chatbot: CSS de burbujas en `<style is:global>`
**Decisión:** Las clases `.chat-bubble*` van en `<style is:global>`, no en el scoped por defecto de Astro.
**Por qué:** Las burbujas se crean con `document.createElement`, así que nunca reciben el atributo `data-astro-cid-*` del scoping de Astro; con scoping normal el selector no matchea y el texto queda invisible (color por defecto sobre fondo transparente).
**Nota relacionada:** `#chat-messages` necesita `min-h-0` (flex child con overflow) para poder scrollear.

---

## ADR-011 — Fotos reales, mostradas completas (`object-contain`)
**Decisión:** Reemplazar imágenes generadas por IA con fotos/videos reales de `public/fotos-trabajos/`. Cards y modal usan `object-contain` (no `object-cover`) con marcos más grandes.
**Por qué:** El usuario quiere fotos reales y que se vean **completas, sin cortar**. Si hay fotos duplicadas, no usarlas.
**Consecuencia:** Cards con `object-contain aspect-[4/3]` y fondo oscuro para el letterboxing.

---

## ADR-012 — Simplificación / minimalismo: fusionar secciones redundantes
**Decisión:** Fusionar **Beneficios + Confianza + QuiénesSomos + "por qué elegirnos"** en una sola sección minimalista. Quitar el diagrama de proceso (Relevamiento/Diseño/Ejecución/Seguimiento). Galería "Manos a la obra" eliminada (las fotos viven en el modal de Trabajos). Calculadora fuera de página.
**Por qué:** El usuario dijo que la página tenía demasiado texto/data y quería algo minimalista; varias secciones decían lo mismo ("por qué elegirnos").
**Consecuencia:** De ~12 secciones a 9. Los componentes fusionados quedan en el repo pero comentados en `index.astro`.

---

## ADR-013 — FAQ: abrir el abanico a todos los servicios
**Decisión:** FAQ pasó de estar centrado en cámaras a **6 preguntas variadas** cubriendo cámaras, alarmas, electricidad, automatización y redes.
**Por qué:** El usuario notó que el FAQ estaba orientado solo a cámaras y no reflejaba todo lo que hacen.

---

## ADR-014 — Ángulo de marca "soluciones inteligentes" (significado de INSOLVA)
**Decisión:** El H1 del Hero es **"Soluciones inteligentes para tu casa y tu negocio."** ("inteligentes para…" en verde).
**Por qué:** INSOLVA = **IN**geniería · **SOL**uciones · **VA**lor, interpretable como "soluciones inteligentes". El usuario quiere que el copy juegue con ese significado y prefirió "Soluciones inteligentes" antes que "Seguridad inteligente". **Sigue respetando ADR-002:** comunica el valor sin decir "ingeniería".

---

## ADR-015 — Excepción SEO: "domótica" permitida en `<title>`/keywords (NO en copy visible)
**Decisión:** La palabra **"domótica"** se usa en el `<title>` de la pestaña y en la meta `keywords` de `Layout.astro`, por su volumen de búsqueda. En el **copy visible de la página** se sigue usando **"automatización del hogar"**, NUNCA "domótica" (ADR-002 intacto).
**Por qué:** El usuario pidió explícitamente que "domótica" esté presente para SEO (la gente la busca en Google), aceptando que en meta-tags no es copy de marketing visible.
**Estado:** `<title>` = "Cámaras, Alarmas y Domótica en Ushuaia | Automatización – INSOLVA Group". Keywords ampliadas con domótica / automatización del hogar / casa inteligente Ushuaia.

---

## ADR-017 — Embudo: avisar por email (Resend) cada lead, no depender del WhatsApp
**Decisión:** `guardar-lead-embudo.ts` ahora, además de guardar en Supabase, **envía un email de aviso vía Resend** a `LEAD_NOTIFY_TO` (insolvagroup@gmail.com). Se dispara tras guardar OK **y también si Supabase falla** (para no perder el lead). Es **best-effort**: si el mail falla, solo se loguea y la respuesta al front no cambia.
**Por qué:** Antes el lead solo quedaba en la BBDD; la única forma de enterarse era que el visitante apretara el botón de WhatsApp (que es opcional). Muchos leads morían sin que nadie los viera. El usuario pidió que le llegue aviso al completar el formulario.
**Config (env, no commiteado):** `RESEND_API_KEY`, `LEAD_NOTIFY_TO` (destino, admite varios separados por coma), `LEAD_NOTIFY_FROM` (default `INSOLVA Web <leads@insolvagroup.com>`).
**Remitente:** se decidió **verificar el dominio `insolvagroup.com` en Resend** (registros DNS SPF/DKIM) en vez de usar el dominio de prueba `resend.dev`. Hasta que el dominio esté verificado + `RESEND_API_KEY` cargada en Netlify, el aviso no sale (el lead igual se guarda).
**El mail incluye:** nombre, tipo de propiedad, interés, WhatsApp (con link wa.me) y email (con `reply_to` = email del lead, para responderle directo).

---

## ADR-018 — Tienda: fusión "vidriera estática + WooCommerce real", no headless completo ni migración a WordPress

**Decisión:** La landing (`insolvaweb`) sigue 100% estática, sin cambios de arquitectura. La tienda real (carrito, checkout, pago) vive y sigue viviendo en el sitio WordPress + Blocksy + WooCommerce ya existente (`darkcyan-rail-217476.hostingersite.com`, gestionado con Novamira). La "fusión" entre ambas se resuelve con tres cosas baratas y de bajo riesgo: (1) una sección nueva en la home (`Tienda.astro`) que muestra productos reales traídos de la API de WooCommerce **en build time** (`src/lib/tienda.ts`, `getProductosDestacados()`), (2) un link "Tienda" en nav/footer hacia el sitio WooCommerce, y (3) identidad visual (colores/logo/tipografía de INSOLVA) aplicada en Blocksy para que se sienta la misma marca.

**Por qué (se descartaron dos opciones más "completas"):**
- **Headless de verdad (carrito/checkout viviendo en Astro):** `insolvaweb` no tiene servidor — es estática por decisión explícita (ver `src/_api-landing/README.md`) para no arriesgar el email `@insolvagroup.com`, cuyos MX apuntan a Hostinger. Un carrito con checkout ahí exigiría reactivar un adapter (el riesgo que se evitó antes) o resolver un checkout cross-domain contra la Store API de WooCommerce, sin ganar nada que WooCommerce no resuelva ya solo.
- **Meter todo en WordPress/Elementor y dar de baja Astro** (opción que el usuario prefería si no era "mucho quilombo"): sí lo es — implica reimplementar en Elementor Free (más limitado que Astro) piezas a medida que costaron varias iteraciones documentadas acá (scroll-video en canvas — ADR-004/005/006, chatbot con sus fixes — ADR-009/016, embudo a Supabase+Resend — ADR-007/008/017, bug de CSS scoping de las burbujas — ADR-010), con riesgo real de regresión y pérdida de rendimiento/SEO estático.

**Consecuencia:** el catálogo/precio/stock vive en un solo lugar (WooCommerce) — la landing solo lee, nunca escribe. Los 3 métodos de pago pedidos por el usuario (Mercado Pago, transferencia bancaria, WhatsApp) se resuelven 100% con configuración nativa de WooCommerce (plugin oficial de Mercado Pago, gateway BACS, gateway de contra-reembolso renombrado), sin código de servidor propio. Cuando se conecte el subdominio `tienda.insolvagroup.com` (pendiente, requiere hPanel de Hostinger), solo cambia `TIENDA_URL` en `src/lib/tienda.ts`. Detalle de implementación en `estado.md` §9.

---

## ADR-016 — Chatbot: subir `maxOutputTokens` y cerrar prolijo si se corta
**Decisión:** En `chat.ts`, `maxOutputTokens` pasó de 600 → **900**, y ahora se detecta `finishReason === 'MAX_TOKENS'`: si la respuesta se cortó, se recorta la oración incompleta y se cierra derivando a WhatsApp. Prompt reforzado a "máximo 3-4 oraciones y SIEMPRE terminá tus frases".
**Por qué:** Con 600 tokens Gemini truncaba respuestas a mitad de frase (`finishReason` MAX_TOKENS); el turno siguiente arrancaba pidiendo perdón. El usuario reportó "no me da toda la respuesta, se corta y después me pide perdón".
