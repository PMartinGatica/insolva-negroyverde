import type { APIRoute } from 'astro';

// Endpoint de servidor (Netlify Function): guarda el lead de la calculadora en
// Supabase apenas el visitante completa nombre + email, sin depender de que
// después confirme el envío por WhatsApp.
export const prerender = false;

interface LeadPayload {
  nombre?: string;
  email?: string;
  consumo_kwh?: number | null;
  costo_ars?: number | null;
  automatizacion?: string | null;
  ahorro_estimado_min?: number | null;
  ahorro_estimado_max?: number | null;
}

export const POST: APIRoute = async ({ request }) => {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return new Response(
      JSON.stringify({ error: 'El guardado de leads no está configurado todavía.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const nombre = (body.nombre ?? '').trim();
  const email = (body.email ?? '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nombre || nombre.length > 200 || !emailValid) {
    return new Response(JSON.stringify({ error: 'Nombre o email inválidos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const row = {
    nombre,
    email,
    consumo_kwh: typeof body.consumo_kwh === 'number' ? body.consumo_kwh : null,
    costo_ars: typeof body.costo_ars === 'number' ? body.costo_ars : null,
    automatizacion: body.automatizacion ?? null,
    ahorro_estimado_min: typeof body.ahorro_estimado_min === 'number' ? body.ahorro_estimado_min : null,
    ahorro_estimado_max: typeof body.ahorro_estimado_max === 'number' ? body.ahorro_estimado_max : null,
  };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads_calculadora`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase insert error:', res.status, errText);
      return new Response(
        JSON.stringify({ error: 'No pudimos guardar tus datos, pero podés seguir de todos modos.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('guardar-lead endpoint error:', err);
    return new Response(
      JSON.stringify({ error: 'Ocurrió un problema. Podés seguir de todos modos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
