import type { APIRoute } from 'astro';

// Endpoint de servidor (Netlify Function): guarda el lead del embudo (mini-cuestionario)
// en Supabase apenas el visitante completa sus datos. El envío por WhatsApp lo hace
// el front por separado; acá solo persistimos para no perder ningún lead.
export const prerender = false;

interface LeadPayload {
  nombre?: string;
  email?: string;
  whatsapp?: string;
  tipo_propiedad?: string | null;
  interes?: string | null;
  mensaje?: string | null;
}

const clean = (v: unknown, max = 300) =>
  typeof v === 'string' ? v.trim().slice(0, max) : null;

// Texto legible para el mail de aviso.
const LUGAR_TXT: Record<string, string> = {
  casa: 'Su casa', negocio: 'Su negocio', obra: 'Una obra en construcción',
};
const INTERES_TXT: Record<string, string> = {
  camaras: 'Cámaras y alarmas',
  electricidad: 'Instalación eléctrica',
  automatizacion: 'Automatización del hogar',
  redes: 'Redes WiFi / Starlink',
  todo: 'Un proyecto completo',
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Envía el aviso de nuevo lead por email vía Resend. Best-effort: si algo falla,
// solo lo logueamos — el lead ya quedó guardado en Supabase, no se pierde.
async function notificarPorEmail(row: {
  nombre: string;
  email: string | null;
  whatsapp: string | null;
  tipo_propiedad: string | null;
  interes: string | null;
  mensaje: string | null;
}): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.LEAD_NOTIFY_TO;
  const from = import.meta.env.LEAD_NOTIFY_FROM || 'INSOLVA Web <leads@insolvagroup.com>';

  if (!apiKey || !to) return; // sin config de mail, no notificamos (pero el lead ya se guardó)

  const lugar = row.tipo_propiedad ? (LUGAR_TXT[row.tipo_propiedad] ?? row.tipo_propiedad) : '—';
  const interes = row.interes ? (INTERES_TXT[row.interes] ?? row.interes) : '—';
  const waHref = row.whatsapp ? `https://wa.me/${row.whatsapp.replace(/\D/g, '')}` : null;

  const subject = `🔔 Nuevo lead — ${row.nombre}${row.tipo_propiedad ? ` (${row.tipo_propiedad})` : ''}`;

  const filas: Array<[string, string]> = [
    ['Nombre', row.nombre],
    ['Dónde', lugar],
    ['Necesita', interes],
    ['WhatsApp', row.whatsapp ? `${escapeHtml(row.whatsapp)}${waHref ? ` — <a href="${waHref}">escribirle</a>` : ''}` : '—'],
    ['Email', row.email ? `<a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a>` : '—'],
  ];

  const rowsHtml = filas
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:8px 14px;color:#111;font-size:15px;font-weight:600;">${v}</td></tr>`
    )
    .join('');

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
    <div style="background:#0A0A0A;padding:20px 24px;border-radius:6px 6px 0 0;">
      <p style="margin:0;color:#98C665;font-size:12px;letter-spacing:2px;text-transform:uppercase;">INSOLVA · Nuevo lead del embudo</p>
      <h1 style="margin:6px 0 0;color:#fff;font-size:22px;">${escapeHtml(row.nombre)} quiere un presupuesto</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#f7f7f7;border-radius:0 0 6px 6px;">${rowsHtml}</table>
    <p style="color:#9ca3af;font-size:12px;margin:14px 2px 0;">Lead guardado en Supabase (insolvaweb_leads). Origen: embudo-web.</p>
  </div>`;

  const text =
    `Nuevo lead — INSOLVA\n\n` +
    `Nombre: ${row.nombre}\n` +
    `Dónde: ${lugar}\n` +
    `Necesita: ${interes}\n` +
    `WhatsApp: ${row.whatsapp || '—'}\n` +
    `Email: ${row.email || '—'}\n\n` +
    `Origen: embudo-web · guardado en Supabase.`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s: string) => s.trim()).filter(Boolean),
        subject,
        html,
        text,
        reply_to: row.email || undefined,
      }),
    });
    if (!res.ok) {
      console.error('Resend lead notify error:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Resend lead notify exception:', err);
  }
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

  const nombre = clean(body.nombre, 200) ?? '';
  const email = clean(body.email, 200) ?? '';
  const whatsapp = clean(body.whatsapp, 40) ?? '';

  // Al menos un canal de contacto (email o whatsapp) + nombre.
  const emailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;
  const whatsappValid = whatsapp ? /\d{6,}/.test(whatsapp.replace(/\D/g, '')) : false;

  if (!nombre || (!emailValid && !whatsappValid)) {
    return new Response(
      JSON.stringify({ error: 'Necesitamos tu nombre y al menos un email o WhatsApp válido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const row = {
    nombre,
    email: emailValid ? email : null,
    whatsapp: whatsappValid ? whatsapp : null,
    tipo_propiedad: clean(body.tipo_propiedad, 40),
    interes: clean(body.interes, 40),
    mensaje: clean(body.mensaje, 1000),
    origen: 'embudo-web',
  };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/insolvaweb_leads`, {
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
      console.error('Supabase leads insert error:', res.status, errText);
      // Aunque falle la BBDD, intentamos avisar por mail para no perder el lead.
      await notificarPorEmail(row);
      return new Response(
        JSON.stringify({ error: 'No pudimos guardar tus datos, pero podés seguir de todos modos.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Guardado OK → avisamos por email (best-effort, no bloquea la respuesta al front).
    await notificarPorEmail(row);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('guardar-lead-embudo endpoint error:', err);
    return new Response(
      JSON.stringify({ error: 'Ocurrió un problema. Podés seguir de todos modos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
