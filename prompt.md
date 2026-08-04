Construye una landing page de lujo para AURELION, una maison relojera ficticia súper
premium (estética "haute horlogerie": Ginebra, edición limitada, cita privada). Las piezas
centrales son DOS secciones scroll-driven tipo Apple: una donde el reloj gira 360° al hacer
scroll, y otra donde el reloj se desmonta mostrando su mecanismo interno.
REGLA DE ORO: prohibido usar los videos directamente en las secciones de scroll y
prohibido superar los presupuestos de peso. La técnica es secuencia de frames WebP
sobre <canvas> (la de Apple), no un <video>.
## Stack
- Vite + TypeScript vanilla (sin React ni frameworks pesados), GSAP ScrollTrigger para el
pinning.
- Gestor de paquetes: pnpm.
- Si ffmpeg no está disponible en el sistema, dímelo antes de continuar.
## 0. Videos fuente (Seedance 2.0 vía Higgsfield) — dos clips del MISMO reloj
Para que las dos animaciones muestren el mismo reloj (crítico para la coherencia de
marca), hazlo en este orden:
1. Genera una imagen del reloj: Usa el modelo GPT Image 2 para crear una imagen del
producto.
1. Genera el CLIP A (despiece) y B (rotación): Usando la imagen generada previamente
como referencia, usa Seedance 2.0 para generar los videos. Ambos: 1080p, ~8 s, toma
única continua, cámara fija, velocidad constante.
3. Guarda como assets/source/watch-explode.mp4 y assets/source/watch-rotate.mp4.
**Indicaciones CLIP A (despiece / exploded view) usando la imagen de referencia:**
"Video macro ultradetallado de producto: un reloj mecánico de lujo, en una única toma
continua, cámara fija, sin cortes. El reloj empieza completamente montado, de frente a la
cámara, sobre un fondo de estudio gris carbón muy oscuro. La cámara permanece inmóvil
mientras el reloj se abre lentamente en un despiece preciso (exploded view): primero se
eleva el cristal de zafiro, después se separan la esfera y las agujas, y por último la caja se
abre revelando el movimiento interno — engranajes dorados, escape, volante y un tourbillon
girando — con cada componente flotando en capas limpias a lo largo del mismo eje. El
movimiento es lento, lineal y perfectamente constante de principio a fin (sin easing, sin
cambios de velocidad). La toma comienza manteniéndose 1 segundo sobre el reloj cerrado
y termina manteniéndose 1 segundo sobre el mecanismo totalmente desplegado.
Iluminación cinematográfica de estudio, exposición constante, reflejos de oro y acero pulido
sobre fondo casi negro, fotorrealista, detalle extremo, profundidad de campo reducida y
constante. Sin temblor de cámara, sin zoom, sin parpadeos, sin texto."
**Indicaciones CLIP B (rotación 360°) usando la imagen de referencia:**
"El mismo reloj mecánico de lujo de la imagen, completamente montado, girando
lentamente sobre su eje vertical como en un plato giratorio invisible: exactamente una vuelta
completa de 360° que empieza y termina con el reloj de frente a la cámara. Cámara
totalmente fija, velocidad de rotación perfectamente constante de principio a fin, sin easing.
Mismo fondo de estudio gris carbón muy oscuro, misma iluminación cinematográfica

constante, reflejos de oro y acero pulido desplazándose suavemente por la caja al girar.
Fotorrealista, detalle extremo, sin cortes, sin zoom, sin parpadeos, sin texto."
## 1. Pipeline de frames (scripts/build-frames.mjs, pnpm run frames)
El script debe ser genérico: acepta video de entrada, nombre de secuencia y no de frames.
1. Secuencia "explode": ~120 frames uniformes. Secuencia "rotate": ~100 frames uniformes.
2. Dos juegos por secuencia: desktop (1440 px de ancho) y mobile (720 px).
3. WebP calidad ~70. Objetivo ≤ 35 KB/frame en desktop.
4. Presupuesto DURO POR SECUENCIA: desktop ≤ 5 MB, mobile ≤ 2 MB. El script imprime
informe (no frames, peso medio, peso total por secuencia) y FALLA con error si se supera —
en ese caso baja calidad o resolución y reintenta.
5. Salida: public/frames/<secuencia>/<desktop|mobile>/frame-0001.webp ...
## 2. Componente ScrollSequence reutilizable (se usa en las DOS secciones)
- Sección pinned; el progreso 0→1 del ScrollTrigger (scrub) se mapea al índice de frame;
pinta en <canvas> con ajuste tipo object-fit: cover y devicePixelRatio (cap a 2).
- Solo repintar en requestAnimationFrame cuando cambie el índice de frame.
- Precarga progresiva: cuando la sección se acerca al viewport (IntersectionObserver con
rootMargin generoso), carga primero 1 de cada 4 frames y rellena después. Espera al
decode() de la imagen antes de dibujarla. Las secuencias JAMÁS se cargan en la carga
inicial ni bloquean el LCP.
- Elige el juego desktop/mobile según viewport.
- HUD de depuración activable con ?debug=1: muestra frame actual / frames cargados /
progreso. (Me sirve para el tutorial y a ti para verificar.)
- Fallback: con prefers-reduced-motion o si falla la carga, imagen estática representativa +
textos.
## 3. Estructura de la página (en este orden — página larga, ritmo editorial)
1. Hero — claim + imagen poster del reloj (ese es el LCP; optimizada, preload).
2. Manifiesto de marca — texto grande, 3–4 frases, mucha respiración.
3. "La pieza" — ANIMACIÓN 1: rotación 360° (pinned ~300vh, secuencia "rotate"). Overlay
mínimo: nombre del modelo y 2 datos (calibre, edición).
4. La Manufactura — grid editorial: 3 bloques imagen+texto sobre artesanía (guilloché,
engaste, acabado a mano). Imágenes generadas o placeholders elegantes.
5. "Inside the movement" — ANIMACIÓN 2: despiece (pinned ~400vh, secuencia
"explode"). Overlay de 4 hitos sincronizados con el progreso: cristal de zafiro → esfera y
agujas → calibre → tourbillon. Textos breves, tono de manufactura suiza.
6. Ficha técnica — tabla sobria inventada con gusto: calibre AUR-97, reserva de marcha 96
h, 312 componentes, oro rosa 18k, zafiro doble antirreflejo, 5 años de garantía.
7. Heritage — línea temporal desde 1897 con 4–5 hitos (reglas de 1 px, años en serif
grande).
8. La Colección — 3 ediciones (cards sobrias: nombre, material, precio "bajo solicitud").
9. Edición limitada — numeración 1/88 + CTA "Solicitar cita privada" (formulario mínimo:
nombre, email — sin backend, validación visual).
10. Footer mínimo — marca, ciudad, legal.

## 4. Diseño (a medida, nada de plantilla)
- Fondo casi negro (#0B0B0C), acentos champán/oro apagado, tipografía display serif
elegante + sans neutra para UI, espacios generosos, animaciones sobrias (fades/translates
sutiles al entrar cada sección, nada de rebotes).
- Microdetalles que vendan "hecho a medida": numeración fina, reglas de 1 px, tracking
amplio en mayúsculas pequeñas.
## 5. Criterios de aceptación (verifícalos tú; no me lo des por terminado sin esto)
A) LA ANIMACIÓN SE VE — verificación obligatoria en navegador:
Abre la preview, haz scroll programático por cada sección de animación y captura pantalla
al 0 %, 25 %, 50 %, 75 % y 100 % del progreso. Las capturas DEBEN mostrar frames
distintos (el reloj girando en la 1, abriéndose en la 2). Si el frame no cambia, diagnostica con
el HUD y la consola (404s, onUpdate desconectado, canvas pintado solo al cargar) y arregla
antes de seguir. Este fue el fallo del intento anterior: no lo repitas.
B) Rendimiento: carga inicial (antes de scroll) < 1 MB transferido; las secuencias no
participan del LCP; LCP < 2,5 s en móvil simulado; Lighthouse Performance ≥ 90 desktop y
≥ 85 móvil. Ejecuta Lighthouse, pega resultados e itera hasta cumplir.
C) Scrubbing fluido en ambas direcciones y responsive correcto (juego mobile en viewport
estrecho).