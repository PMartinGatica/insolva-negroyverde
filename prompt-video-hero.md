# Prompt para el video del hero scroll-driven (INSOLVA)

**Herramienta:** Higgsfield (Seedance / modelo de video image-to-video)
**Start frame (obligatorio):** `ChatGPT Image 21 jul 2026, 08_21_06 p.m..png`
(cimientos de hormigón de una casa en entorno patagónico — montañas nevadas, canal, luces de Ushuaia al fondo, cielo gris frío)
**Duración:** ~8 s · **Resolución:** 1080p · **Toma única continua, sin cortes.**

---

## ⭐ Prompt ORBITAL 360° con instalación de cámaras (versión elegida)

> Para scroll-driven: la cámara da UNA vuelta completa de 360° a velocidad constante,
> empieza y termina en el mismo ángulo (loop perfecto). Mientras orbita, la casa se
> construye y se instalan las cámaras de seguridad — que se ven claramente en un tramo.
> Usar modelo con 8 s reales: **seedance_2_0** (o kling3_0). En Higgsfield, si hay
> preset de movimiento, elegir "orbit / 360 orbit". NO usar el modelo `lite` (recorta a ~3 s).

```
Cinematic architectural visualization, single continuous shot, no cuts. The camera performs exactly ONE full smooth 360-degree orbit around a modern luxury house, at a perfectly constant rotation speed, starting and ending at the same front angle (seamless loop).

Starting from the provided image: a modern house concrete foundation on a rocky lot, snow-capped Patagonian mountains and a calm channel with distant city lights in the background, cold overcast dusk light.

While the camera orbits around the house, the house builds itself upward from the foundation in a smooth, evenly paced progression:
- structural steel and wood framework rises
- walls, roof and large glass panels assemble into a modern luxury cabin
- interior and exterior lights switch on (smart-home automation), warm light glowing through the glass
- small white bullet and dome security cameras appear and mount clearly on the building corners, eaves and entrance — visible up close as the camera passes each corner
- the finished, fully lit modern house at dusk with the security cameras installed

The orbit is centered on the house, radius constant, horizon level and stable. The background landscape (mountains, water, sky) rotates naturally with the orbit but stays otherwise unchanged; only the house builds up.

Rotation and construction motion must be perfectly linear and constant: no easing, no acceleration, no bounce, no random flicker, no morphing artifacts. Elements assemble cleanly and stay put.

No zoom cuts, no shake, no jitter. Consistent cinematic exposure; the only lighting change is the installed lights turning on.

Photorealistic, ultra detailed, physically plausible construction, architectural visualization quality. Stable and suitable for frame-by-frame extraction. No text, no logos, no people, no vehicles.
```

**Notas de esta versión:**
- Lo más importante: **una sola vuelta de 360° a velocidad constante**, mismo ángulo al
  inicio y al final (para que el scroll loopee limpio y no "salte" al volver arriba).
- **Cámaras de seguridad visibles de cerca**: el prompt pide que se vean al pasar por cada
  esquina; si salen muy chicas, regenerá pidiendo "close pass on the security cameras".
- Si la casa "morphea" raro al orbitar (típico cuando el modelo construye Y rota a la vez),
  bajá ambición: primero que se construya en las primeras 2 vueltas de ángulo y quede fija
  el resto, o usá la variante fija de más abajo.
- Guardá como `assets/source/casa-construccion.mp4` (reemplaza el anterior) y corré de nuevo
  `node scripts/build-frames.mjs assets/source/casa-construccion.mp4 construccion 120`.
  Con 8 s reales podés pedir ~120 frames (más suave). Ajustá `FRAME_COUNT` al output.

---

## Prompt (inglés — pegar en Higgsfield con el start frame)

```
Cinematic architectural time-lapse, single continuous shot, locked-off fixed camera, no cuts, no camera movement at all.

Starting exactly from the provided image: a modern house concrete foundation on a rocky lot, snow-capped Patagonian mountains and a calm channel with distant city lights in the background, cold overcast dusk light.

The house builds itself upward from the existing foundation in a smooth, perfectly linear progression, evenly paced across the whole clip:
- 0.0–1.0s: hold on the bare concrete foundation (no motion).
- 1.0–3.0s: steel and wood structural framework rises from the foundation.
- 3.0–5.0s: walls, roof and large glass panels assemble into a modern luxury cabin.
- 5.0–6.5s: interior and exterior lights switch on smoothly (smart-home automation), warm light glowing through the glass.
- 6.5–7.5s: small white bullet and dome security cameras appear and mount on the building corners and eaves.
- 7.5–8.0s: hold on the finished, fully lit modern house at dusk, with the cameras in place.

The environment (mountains, water, sky, ground) stays completely still and unchanged the entire time — only the house builds up.

All motion must be perfectly linear and constant: no easing, no acceleration, no bounce, no random flicker, no morphing artifacts. Elements assemble cleanly and stay put.

Camera is 100% fixed: no zoom, no pan, no shake, no parallax.

Lighting stays consistent and cinematic; the only lighting change is the installed lights turning on. Consistent exposure throughout.

Photorealistic, ultra detailed, physically plausible construction, architectural visualization quality. Stable and suitable for frame-by-frame extraction. No text, no logos, no people, no vehicles.
```

---

## Notas para generar

- **Cámara fija absoluta** es lo más importante: si la cámara se mueve, la extracción de frames no sirve para scroll. Si Higgsfield ofrece opción "static camera / no motion", activala.
- **Velocidad lineal**: el scroll mapea progreso→frame de forma lineal, así que el video no debe tener easing ni pausas largas (salvo los holds cortos del inicio/fin que sirven de ancla).
- Si el primer resultado tiene "morphing" raro (la casa se deforma como líquido), regenerá bajando la ambición: probá la variante corta de abajo.
- Guardá el resultado como `assets/source/casa-construccion.mp4` (o pasámelo y yo lo ubico).

## Resultado generado (24/07/2026)

Video generado en Higgsfield con `image2video` (modelo `lite`, `enhance_prompt` activado,
seed 44238) a partir del start frame indicado. Job `cd6e87e3-d761-4cdb-954d-a4f58af6e865`.

- Descargado en `assets/source/casa-construccion.mp4` → **1168×768, 30 fps, 97 frames, 3,23 s**
  (más corto que los 8 s pedidos: el modelo `lite` acota la duración).
- Frames: `node scripts/build-frames.mjs assets/source/casa-construccion.mp4 construccion 96`
  → 96 frames por juego · desktop 5,69 MB (q70) · mobile 2,15 MB (q46).
- `FRAME_COUNT = 96` en `ConstruccionScroll.astro`, sección activada en `index.astro`.

**Diferencias contra el prompt, aceptadas:**
- La cámara **no quedó 100% fija**: hace un travelling suave hacia adelante. Es estable,
  progresivo y sin cortes ni jitter, así que en scroll se lee como intencional.
- El progreso **no es lineal**: los primeros ~0,8 s son casi sólo cimientos y la casa
  crece rápido después. Sirve de ancla para el hito "Desde los cimientos".
- La casa sube de una a dos plantas a mitad de clip, y los cimientos del frente quedan
  visibles todo el tiempo en vez de convertirse en la casa.
- Las cámaras de seguridad blancas **sí** aparecen sobre el final, sobre la esquina derecha.

Si más adelante se quiere una toma realmente fija y de 8 s, hay que regenerar con un modelo
de mayor duración (`seedance_2_0` / `kling3_0`) y volver a correr `build-frames.mjs`.

## Variante corta (si la completa sale inestable)

```
Cinematic architectural time-lapse, single continuous locked-off shot, fixed camera, no cuts.
Starting from the provided image of a house concrete foundation in a Patagonian landscape (snowy mountains, water, city lights, overcast dusk).
The house builds up from the foundation in a smooth perfectly linear progression: structural frame rises, then walls and glass panels assemble into a modern luxury house, then exterior and interior lights turn on, and finally small white security cameras mount on the corners. Ends holding on the finished, lit house with cameras installed.
Background landscape stays completely still; only the house builds. Motion perfectly linear and constant, no easing. Camera 100% fixed, no zoom, no shake. Photorealistic, ultra detailed, suitable for frame-by-frame extraction. No text, no people.
```
