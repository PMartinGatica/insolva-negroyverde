# Endpoints guardados para la landing de captación

Estos archivos **no forman parte del build** del sitio principal. El prefijo `_`
mantiene la carpeta fuera de `src/pages/`, así que Astro los ignora.

## Por qué están acá

`insolvagroup.com` se publica como **sitio 100% estático** en Hostinger
(subiendo `dist/` al `public_html`). Un sitio estático no puede ejecutar código
de servidor, y estos endpoints lo necesitan: leen claves privadas y llaman a
servicios externos. Sacarlos fue una decisión deliberada — mover el DNS del
dominio a un hosting con servidor ponía en riesgo el correo `@insolvagroup.com`,
que es infraestructura crítica del negocio.

## Qué hace cada uno

| Archivo | Servicio | Función |
|---|---|---|
| `chat.ts` | Gemini | Chatbot asistente del sitio |
| `leer-factura.ts` | Gemini Vision | Lee una factura de luz subida por el usuario |
| `guardar-lead.ts` | Supabase | Guarda los datos de un lead |
| `guardar-lead-embudo.ts` | Supabase + Resend | Guarda el lead y avisa por email |

## Variables de entorno que necesitan

```
GEMINI_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
LEAD_NOTIFY_TO
LEAD_NOTIFY_FROM
```

## Cómo reactivarlos en la landing

1. En el proyecto de la landing (Netlify), copiar estos archivos a `src/pages/api/`.
2. Instalar el adapter: `npm i @astrojs/netlify` y agregarlo en `astro.config.mjs`.
3. Cargar las variables en Netlify → Site configuration → Environment variables.
4. Trigger deploy (las variables no se aplican a deploys ya hechos).

Los componentes de UI que los consumían siguen en el repo, desmontados de
`index.astro`: `sections/Embudo.astro`, `sections/Calculadora.astro`,
`ui/ChatAsistente.astro`.
