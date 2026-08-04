import type { APIRoute } from 'astro';

// Endpoint de servidor (Netlify Function): recibe una imagen/PDF de factura de luz
// en base64, la manda a Gemini Vision, y devuelve consumo (kWh) y costo extraídos.
export const prerender = false;

const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const EXTRACTION_PROMPT = `Analizá esta factura de electricidad de Argentina (puede ser de cualquier distribuidora, por ejemplo DPEC en Tierra del Fuego u otra).

Extraé exclusivamente estos datos y devolvé SOLO un JSON válido, sin texto adicional, con esta forma exacta:
{
  "consumo_kwh": <número, consumo del período en kWh, o null si no se puede leer>,
  "costo_total_ars": <número, importe total a pagar en pesos argentinos, o null si no se puede leer>,
  "periodo": "<texto breve del período facturado, ej 'bimestre marzo-abril', o null>",
  "legible": <true o false, indicando si la imagen tenía calidad suficiente para leer los datos>
}

Si la imagen no es una factura de luz o no se puede leer, devolvé legible: false y los demás campos en null.
No inventes números: si un dato no está visible, usá null.`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'El lector de facturas no está configurado todavía.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { imageBase64?: string; mimeType?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { imageBase64, mimeType } = body;
  if (!imageBase64 || !mimeType) {
    return new Response(JSON.stringify({ error: 'Falta la imagen de la factura.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedMimes.includes(mimeType)) {
    return new Response(
      JSON.stringify({ error: 'Formato no soportado. Subí una foto (JPG/PNG) o un PDF.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Límite ~8MB en base64 para evitar abuso del endpoint.
  if (imageBase64.length > 11_000_000) {
    return new Response(
      JSON.stringify({ error: 'El archivo es demasiado grande. Probá con uno más liviano.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: EXTRACTION_PROMPT },
              { inlineData: { mimeType, data: imageBase64 } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini Vision error:', geminiRes.status, errText);

      if (geminiRes.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Estamos recibiendo muchas consultas de golpe. Esperá unos segundos y probá de nuevo.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (geminiRes.status === 503) {
        return new Response(
          JSON.stringify({ error: 'El lector de facturas está momentáneamente saturado. Probá de nuevo en unos segundos.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'No pudimos leer la factura. Probá con otra foto, bien enfocada.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await geminiRes.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') ?? '{}';

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return new Response(
        JSON.stringify({ error: 'No pudimos interpretar la factura. Probá con otra foto.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('leer-factura endpoint error:', err);
    return new Response(
      JSON.stringify({ error: 'Ocurrió un problema. Probá de nuevo en un momento.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
