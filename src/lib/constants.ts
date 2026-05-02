export const BRAND = {
  name: "INSOLVA Group",
  tagline: "Trabajamos para que nuestros clientes sean los más competitivos en su sector",
  description: "Agencia de ingeniería con base tecnológica. Optimizamos negocios combinando ingeniería de procesos, desarrollo de software, automatización con IA y seguridad electrónica.",
  location: "Ushuaia, Tierra del Fuego, Argentina",
  whatsapp: "5492901641452",
  email: "contacto@insolvagroup.com",
  instagram: "@insolvagroup",
  instagramUrl: "https://instagram.com/insolvagroup",
} as const;

export const PILARES = [
  {
    number: "01",
    eyebrow: "SOFTWARE",
    title: "Desarrollo & Automatización",
    subtitle: "Sistemas, automatizaciones y agentes de IA que reemplazan trabajo manual.",
    items: [
      "Desarrollo web y sistemas a medida",
      "Automatización de procesos con N8N",
      "Chatbots con IA (WhatsApp, Instagram)",
      "Integraciones entre plataformas",
      "Apps internas y dashboards",
    ],
    cta: "Conocer más en insolvadev.com",
    ctaUrl: "https://insolvadev.com",
    ctaExternal: true,
    whatsappSource: null,
  },
  {
    number: "02",
    eyebrow: "SEGURIDAD",
    title: "Seguridad Electrónica",
    subtitle: "Sistemas que protegen tu negocio y tu hogar 24/7, con tecnología propia.",
    items: [
      "Videovigilancia con acceso remoto",
      "Automatización del hogar",
      "Cerraduras electrónicas y control de acceso",
      "Redes y conectividad de respaldo",
    ],
    cta: "Conocer más en insolvaseguridad.com",
    ctaUrl: "https://insolvaseguridad.com",
    ctaExternal: true,
    whatsappSource: null,
  },
  {
    number: "03",
    eyebrow: "PROCESOS",
    title: "Ingeniería",
    subtitle: "Diagnosticamos, optimizamos y rediseñamos procesos para que tu operación rinda más.",
    items: [
      "Ingeniería de procesos",
      "Ingeniería de costos",
      "Optimización industrial",
      "Mejora continua y eficiencia operativa",
    ],
    cta: "Hablar con un ingeniero",
    ctaUrl: null,
    ctaExternal: false,
    whatsappSource: "pilar-ingenieria",
  },
] as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#pilares" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;
