export const BRAND = {
  name: "INSOLVA Group",
  tagline: "Ingeniería y seguridad electrónica para proteger tu hogar y tu negocio",
  description: "Ingeniería aplicada a la seguridad electrónica en Ushuaia y Tierra del Fuego: videovigilancia, redes, automatización del hogar y alarmas. Planificamos cada instalación a medida, desde el plano.",
  location: "Ushuaia, Tierra del Fuego, Argentina",
  whatsapp: "5492901641452",
  email: "contacto@insolvagroup.com",
  instagram: "@insolvagroup",
  instagramUrl: "https://instagram.com/insolvagroup",
} as const;

export const PILARES = [
  {
    number: "01",
    eyebrow: "INGENIERÍA",
    title: "Ingeniería",
    subtitle: "La base técnica de cada proyecto: relevamos, planificamos y ejecutamos con criterio de ingeniería, no con paquetes genéricos.",
    items: [
      "Planificación desde el plano",
      "Ingeniería de procesos y de costos",
      "Optimización y mejora continua",
      "Proyectos a medida, llave en mano",
    ],
    cta: "Hablar con un ingeniero",
    ctaUrl: null,
    ctaExternal: false,
    whatsappSource: "pilar-ingenieria",
  },
  {
    number: "02",
    eyebrow: "SEGURIDAD",
    title: "Seguridad Electrónica",
    subtitle: "Nuestra especialidad. Videovigilancia, redes, automatización del hogar y alarmas que protegen tu hogar y tu negocio 24/7.",
    items: [
      "Videovigilancia con acceso remoto",
      "Redes Wi-Fi profesionales y conectividad",
      "Automatización del hogar",
      "Alarmas integradas con cámaras",
    ],
    cta: "Pedí tu presupuesto",
    ctaUrl: null,
    ctaExternal: false,
    whatsappSource: "pilar-seguridad",
  },
] as const;

export const SERVICIOS_SEGURIDAD = [
  {
    number: "01",
    title: "Videovigilancia",
    resumen: "Cámaras IP diseñadas para tu escenario real. Planificamos desde el plano el tipo, la cantidad y la ubicación según tu perímetro.",
    items: [
      "Simulación de cobertura desde el plano",
      "Visión nocturna (IR o color)",
      "Acceso remoto 24/7 desde el celular",
      "Integración con alarmas",
      "Marcas líderes: Hikvision, Dahua, HiLook, EZVIZ",
    ],
  },
  {
    number: "02",
    title: "Redes Wi-Fi profesionales",
    resumen: "Un buen plan de internet no alcanza: hay que distribuirlo bien a cada sector, sin zonas muertas.",
    items: [
      "Distribución inteligente (nodos y APs)",
      "Sistema Mesh y cableado estructurado",
      "Rack central y priorización de tráfico",
      "Plan de contingencia con enlace auxiliar",
    ],
  },
  {
    number: "03",
    title: "Automatización del hogar",
    resumen: "Controlá luces, portones, climatización y accesos desde el celular, de forma simple y segura. Más comodidad y control en tu día.",
    items: [
      "Iluminación y cortinas automatizadas",
      "Climatización y control de accesos",
      "Cerraduras por app, huella, PIN o tarjeta",
      "Compatible con Alexa y Google",
    ],
  },
  {
    number: "04",
    title: "Alarmas",
    resumen: "Sistemas 100% inalámbricos que conviven con tus cámaras. Cuando un sensor se activa, recibís una alerta con video en el celular.",
    items: [
      "Sensores inalámbricos de movimiento y apertura",
      "Alerta con clip de video al instante",
      "Integración con cámaras y app móvil",
      "Batería de backup y sirena exterior",
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#pilares" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;
