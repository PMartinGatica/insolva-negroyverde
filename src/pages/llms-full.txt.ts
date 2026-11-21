import type { APIRoute } from 'astro';
import { BRAND } from '../lib/constants';
import { SERVICIOS } from '../lib/servicios';
import { GUIAS, tituloDe, type Bloque } from '../lib/guias';
import { absoluteUrl } from '../lib/seo';

/**
 * /llms-full.txt: todo el contenido del sitio en texto plano, para que los
 * buscadores con IA (ChatGPT, Claude, Perplexity, Gemini) lo lean de una sola
 * vez y puedan citar a INSOLVA con datos correctos. `llms.txt` es el índice
 * corto; este es el contenido completo. Se arma solo desde los mismos datos
 * que las páginas, así nunca queda desactualizado.
 */

function bloque(b: Bloque): string {
  switch (b.tipo) {
    case 'p': return b.texto;
    case 'h': return `### ${b.texto}`;
    case 'leccion': return `### Lección: ${b.titulo}`;
    case 'lista': return b.items.map((i) => `- ${i}`).join('\n');
    case 'check': return [b.titulo ? `Checklist: ${b.titulo}` : 'Checklist:', ...b.items.map((i) => `- [ ] ${i}`)].join('\n');
    case 'pasos': return b.items.map((i, n) => `${n + 1}. ${i.titulo}: ${i.texto}`).join('\n');
    case 'nota': return `Importante, ${b.titulo}: ${b.texto}`;
    case 'specs': return [b.titulo ?? '', ...b.filas.map(([k, v]) => `- ${k}: ${v}`)].filter(Boolean).join('\n');
    case 'comparativa': {
      const conFilas = b.columnas[0] === '';
      if (!conFilas) return b.columnas.map((c, i) => `${c}:\n${b.filas.map((f) => `- ${f[i]}`).join('\n')}`).join('\n\n');
      return b.columnas.slice(1).map((c, i) => `${c}:\n${b.filas.map((f) => `- ${f[0]}: ${f[i + 1]}`).join('\n')}`).join('\n\n');
    }
  }
}

export const GET: APIRoute = () => {
  const partes: string[] = [
    `# ${BRAND.name}`,
    `> Empresa de integración tecnológica de Ushuaia, Tierra del Fuego, Argentina: cámaras de seguridad, alarmas, cerraduras digitales, domótica, redes WiFi y Starlink, e instalaciones eléctricas para casas, negocios, obras y empresas. Da servicio en Ushuaia, Río Grande y Tolhuin.`,
    `Contacto y presupuesto: WhatsApp ${BRAND.whatsappLegible} · ${BRAND.email} · ${absoluteUrl('/')}`,
    `No publica precios de instalación: cada presupuesto sale de un relevamiento del lugar.`,
    '',
    '## Servicios',
  ];

  for (const s of SERVICIOS) {
    partes.push(
      '',
      `## ${s.nombre} en Tierra del Fuego`,
      `URL: ${absoluteUrl(`/${s.slug}`)}`,
      s.description,
      '',
      s.lead,
      '',
      'Qué incluye:',
      ...s.incluye.map((i) => `- ${i.titulo}: ${i.texto}`),
      '',
      'Para quién:',
      ...s.paraQuien.map((p) => `- ${p.titulo}: ${p.texto}`),
      '',
      'Preguntas frecuentes:',
      ...s.faqs.flatMap((f) => [`P: ${f.pregunta}`, `R: ${f.respuesta}`]),
    );
  }

  partes.push('', '## Guías gratuitas', 'Escritas por el equipo técnico de INSOLVA para ayudar a elegir equipos antes de comprar.');
  for (const g of GUIAS) {
    partes.push('', `## ${tituloDe(g)}`, `URL: ${absoluteUrl(`/guias/${g.slug}`)}`, g.bajada, '', ...g.bloques.map(bloque));
  }

  return new Response(partes.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
