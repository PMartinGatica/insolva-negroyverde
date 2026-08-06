# Cómo agregar fotos de trabajos

Procedimiento cuando querés sumar fotos nuevas al sitio.

## Lo que tenés que hacer vos

1. Sacá las fotos como salgan (del celular está perfecto, no hace falta editarlas).
2. Pasámelas por el chat, diciéndome **a qué trabajo pertenecen**:
   - Comercio · Ushuaia
   - Restaurante · Ushuaia
   - Domicilio · Ushuaia
   - Obra · Tierra del Fuego
   - …o si es un **trabajo nuevo**, contame qué tipo es (ej. "Hotel · Ushuaia") y una línea de qué se instaló.
3. Listo. Te devuelvo el `dist/` actualizado para subir a `public_html`.

## Lo que hago yo

1. Convierto a **WebP** y redimensiono (las fotos de celular pesan 2-3 MB; quedan en ~100-300 KB sin perder calidad visible).
2. Las guardo en `public/img/trabajos/` con el nombre correcto (`comercio-13.webp`, etc.).
3. Actualizo el array `TRABAJOS` en `src/lib/constants.ts`.
4. Corro `npm run build` y verifico que se vean bien.
5. Te aviso que el build está listo.

## Estructura actual

`src/lib/constants.ts` → array `TRABAJOS`:

```ts
{
  image: "/img/trabajo-domicilio.webp",     // portada de la card
  tipo: "Domicilio · Ushuaia",              // título
  detalle: "Cámaras en el exterior…",       // bajada
  galeria: [                                 // fotos del modal
    "/img/trabajos/domicilio-01.webp",
    "/img/trabajos/domicilio-02.webp",
  ],
}
```

## Notas

- **Las fotos verticales están bien**: el sitio les pone un fondo desenfocado
  automáticamente (efecto CapCut), así que no quedan barras negras.
- **Los originales sin optimizar** viven en `assets/source/fotos-originales/`,
  fuera del build y del repo. No se suben al sitio.
- **Con permiso del cliente**: si la foto muestra el interior de un negocio o
  vivienda identificable, conviene tener su OK antes de publicarla.

## Si migrás a Vercel

Con Vercel el flujo cambia: en vez de subir archivos a mano, cada `git push`
despliega solo. Además vuelven a funcionar el chat IA, la calculadora y el
embudo (los endpoints están guardados en `src/_api-landing/`).

Ventaja sobre lo que evaluamos con Netlify: en Vercel podés apuntar el dominio
con un registro A/CNAME **sin cambiar los nameservers**, así que el correo
`@insolvagroup.com` de Hostinger sigue funcionando sin tocarlo.
