import { BRAND } from './constants';
import { CANAL_URL } from './videos';

export const SITE_URL = 'https://insolvagroup.com';

/**
 * URL absoluta a partir de un path interno ("/servicios" → "https://…/servicios/").
 *
 * La barra final no es capricho: el build genera `dist/servicios/index.html`,
 * el servidor la sirve como directorio y el sitemap la escribe con barra. Si el
 * canonical la omitiera, Google vería dos URLs para la misma página.
 * Las rutas de imagen (.webp, .png…) se dejan tal cual.
 */
export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/') return `${SITE_URL}/`;
  if (/\.[a-z0-9]{2,5}$/i.test(clean)) return `${SITE_URL}${clean}`;
  return `${SITE_URL}${clean.replace(/\/$/, '')}/`;
}

/**
 * Ficha de la empresa. Va en TODAS las páginas con el mismo @id, así Google
 * entiende que es la misma entidad y no seis negocios distintos. Las páginas
 * de servicio se cuelgan de este @id con `provider`.
 */
export const ORG_ID = `${SITE_URL}/#organizacion`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: BRAND.name,
    alternateName: ['INSOLVA', 'Insolva Ushuaia'],
    url: SITE_URL,
    // knowsAbout: los temas en los que la empresa es referente. Los buscadores
    // con IA lo usan para decidir a quién citar cuando alguien pregunta por
    // estos temas en Tierra del Fuego.
    knowsAbout: [
      'Integración tecnológica',
      'Cámaras de seguridad',
      'CCTV y cámaras IP',
      'Alarmas',
      'Cerraduras digitales',
      'Control de acceso',
      'Domótica',
      'Redes WiFi',
      'Starlink',
      'Cableado estructurado',
      'Instalaciones eléctricas',
      'Automatización',
    ],
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description: BRAND.description,
    telephone: `+${BRAND.whatsapp}`,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ushuaia',
      addressRegion: 'Tierra del Fuego',
      addressCountry: 'AR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -54.80191, longitude: -68.30295 },
    // Empresa con área de servicio (no local a la calle): es lo que Google usa
    // para el map pack de un prestador que va al domicilio del cliente.
    areaServed: [
      { '@type': 'City', name: 'Ushuaia' },
      { '@type': 'City', name: 'Río Grande' },
      { '@type': 'City', name: 'Tolhuin' },
      { '@type': 'AdministrativeArea', name: 'Tierra del Fuego' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${BRAND.whatsapp}`,
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    // sameAs consolida la entidad: le dice a Google que el sitio, el Instagram
    // y el canal de YouTube son el mismo negocio.
    sameAs: [BRAND.instagramUrl, CANAL_URL],
  };
}

/**
 * El sitio como tal. Le da a Google el nombre que muestra arriba de cada
 * resultado ("INSOLVA Group" en vez de la URL) y lo ata a la empresa.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#sitio`,
    name: BRAND.name,
    alternateName: 'INSOLVA',
    url: `${SITE_URL}/`,
    inLanguage: 'es-AR',
    publisher: { '@id': ORG_ID },
  };
}

/** Migas de pan. `trail` son los pasos SIN la home, que se agrega sola. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Inicio', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: readonly { pregunta: string; respuesta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  };
}

/**
 * Videos de la página. Habilita el resultado enriquecido con miniatura de video
 * en Google. `uploadDate`, `thumbnailUrl`, `name` y `description` son los campos
 * que Google exige; sin alguno de ellos no muestra el resultado enriquecido.
 */
export function videoSchemas(
  videos: readonly {
    id: string;
    titulo: string;
    descripcion: string;
    duracion: string;
    fecha: string;
  }[]
) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.titulo,
    description: v.descripcion,
    thumbnailUrl: [absoluteUrl(`/img/videos/${v.id}.webp`)],
    uploadDate: v.fecha,
    duration: v.duracion,
    contentUrl: `https://www.youtube.com/shorts/${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: { '@id': ORG_ID },
  }));
}

/** Un servicio concreto, atado a la empresa por `provider`. */
export function serviceSchema(opts: {
  nombre: string;
  descripcion: string;
  path: string;
  tipo: string;
  incluye: readonly string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(opts.path)}#servicio`,
    name: opts.nombre,
    serviceType: opts.tipo,
    description: opts.descripcion,
    url: absoluteUrl(opts.path),
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Ushuaia' },
      { '@type': 'City', name: 'Río Grande' },
      { '@type': 'City', name: 'Tolhuin' },
      { '@type': 'AdministrativeArea', name: 'Tierra del Fuego' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: opts.nombre,
      itemListElement: opts.incluye.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

/**
 * Una guía publicada. `about` ata la guía al servicio relacionado y `author` y
 * `publisher` a la empresa: le dicen a Google y a los buscadores con IA que el
 * contenido es de un prestador local de ese rubro (E-E-A-T).
 */
export function articleSchema(opts: {
  titulo: string;
  descripcion: string;
  path: string;
  imagen?: string;
  publicado: string;
  actualizado: string;
  palabras: number;
  seccion: string;
  temas: string[];
  servicios: string[];
}) {
  const url = absoluteUrl(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#guia`,
    headline: opts.titulo,
    description: opts.descripcion,
    url,
    mainEntityOfPage: url,
    ...(opts.imagen ? { image: [absoluteUrl(opts.imagen)] } : {}),
    datePublished: opts.publicado,
    dateModified: opts.actualizado,
    inLanguage: 'es-AR',
    wordCount: opts.palabras,
    articleSection: opts.seccion,
    keywords: opts.temas.join(', '),
    isAccessibleForFree: true,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    about: opts.servicios.map((slug) => ({ '@id': `${absoluteUrl(`/${slug}`)}#servicio` })),
    spatialCoverage: { '@type': 'AdministrativeArea', name: 'Tierra del Fuego, Argentina' },
  };
}

/** Índice de guías: una colección con la lista ordenada de artículos. */
export function collectionSchema(opts: {
  nombre: string;
  descripcion: string;
  path: string;
  items: { nombre: string; path: string }[];
}) {
  const url = absoluteUrl(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#coleccion`,
    name: opts.nombre,
    description: opts.descripcion,
    url,
    inLanguage: 'es-AR',
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.nombre,
        url: absoluteUrl(it.path),
      })),
    },
  };
}
