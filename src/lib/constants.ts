export const BRAND = {
  name: "INSOLVA Group",
  tagline: "Cámaras y sistemas de seguridad que funcionan de verdad, en Ushuaia",
  description: "Instalamos cámaras, alarmas y sistemas de seguridad en Ushuaia. Controlá tu casa o negocio desde el celular. Presupuesto por WhatsApp.",
  location: "Ushuaia, Tierra del Fuego, Argentina",
  whatsapp: "5492901641452",
  email: "contacto@insolvagroup.com",
  instagram: "@insolvagroup",
  instagramUrl: "https://instagram.com/insolvagroup",
} as const;

// Señales de confianza mostradas en la sección Confianza.
export const CONFIANZA = [
  {
    title: "Trabajamos en Ushuaia y TDF",
    body: "Somos de acá. Conocemos el clima, las casas y los negocios de Tierra del Fuego, y damos servicio en Ushuaia, Río Grande y Tolhuin.",
  },
  {
    title: "Instalación personalizada",
    body: "Nada de paquetes cerrados: relevamos tu lugar y armamos la solución justa para vos, sin puntos ciegos y sin pagar de más.",
  },
  {
    title: "Soporte post instalación",
    body: "No desaparecemos después de instalar. Te acompañamos con soporte y ajustes para que todo siga funcionando bien.",
  },
  {
    title: "Equipos confiables",
    body: "Trabajamos con marcas líderes (Hikvision, Dahua, HiLook, EZVIZ) para que tus cámaras y alarmas duren y respondan cuando importa.",
  },
] as const;

// Trabajos reales — fotos reales de instalaciones en Ushuaia y TDF.
// `image` es la portada de la card; `galeria` son todas las fotos del modal.
export const TRABAJOS = [
  {
    image: "/img/trabajo-comercio.webp",
    tipo: "Comercio · Ushuaia",
    detalle: "Cámaras en el frente con acceso desde el celular",
    galeria: [
      "/img/trabajos/comercio-01.webp", "/img/trabajos/comercio-02.webp",
      "/img/trabajos/comercio-03.webp", "/img/trabajos/comercio-04.webp",
      "/img/trabajos/comercio-05.webp", "/img/trabajos/comercio-06.webp",
      "/img/trabajos/comercio-07.webp", "/img/trabajos/comercio-08.webp",
      "/img/trabajos/comercio-09.webp", "/img/trabajos/comercio-10.webp",
      "/img/trabajos/comercio-11.webp", "/img/trabajos/comercio-12.webp",
    ],
  },
  {
    image: "/img/trabajo-restaurante.webp",
    tipo: "Restaurante · Ushuaia",
    detalle: "Cámaras domo integradas al ambiente, sin puntos ciegos",
    galeria: [
      "/img/trabajos/restaurante-01.webp", "/img/trabajos/restaurante-02.webp",
      "/img/trabajos/restaurante-03.webp", "/img/trabajos/restaurante-04.webp",
      "/img/trabajos/restaurante-05.webp", "/img/trabajos/restaurante-06.webp",
      "/img/trabajos/restaurante-07.webp", "/img/trabajos/restaurante-08.webp",
      "/img/trabajos/restaurante-09.webp", "/img/trabajos/restaurante-10.webp",
      "/img/trabajos/restaurante-11.webp", "/img/trabajos/restaurante-12.webp",
      "/img/trabajos/restaurante-13.webp", "/img/trabajos/restaurante-14.webp",
      "/img/trabajos/restaurante-15.webp", "/img/trabajos/restaurante-16.webp",
      "/img/trabajos/restaurante-17.webp", "/img/trabajos/restaurante-18.webp",
      "/img/trabajos/restaurante-19.webp", "/img/trabajos/restaurante-20.webp",
    ],
  },
  {
    image: "/img/trabajo-domicilio.webp",
    tipo: "Domicilio · Ushuaia",
    detalle: "Cámaras en el exterior de la casa, con visión nocturna",
    galeria: [
      "/img/trabajos/domicilio-01.webp", "/img/trabajos/domicilio-02.webp",
      "/img/trabajos/domicilio-03.webp",
    ],
  },
  {
    image: "/img/trabajo-obra.webp",
    tipo: "Obra · Tierra del Fuego",
    detalle: "Monitoreo de obrador con equipos 4G y antena Starlink",
    galeria: [
      "/img/trabajos/obra-01.webp", "/img/trabajos/obra-02.webp",
    ],
  },
] as const;

// Galería de fotos reales (equipo trabajando + instalaciones).
export const GALERIA = [
  { image: "/img/galeria-3.webp", alt: "Cámara HiLook instalada en un comercio de Ushuaia" },
  { image: "/img/galeria-1.webp", alt: "Técnico de INSOLVA conectando el cableado de una instalación" },
  { image: "/img/galeria-5.webp", alt: "Cámara de seguridad instalada en la fachada de una casa" },
  { image: "/img/galeria-2.webp", alt: "Técnico de INSOLVA instalando un módulo del sistema" },
  { image: "/img/galeria-4.webp", alt: "Cámara en poste para vigilancia perimetral en Tierra del Fuego" },
  { image: "/img/galeria-6.webp", alt: "Cámara WiFi instalada en el exterior de una vivienda" },
] as const;

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
    title: "Cámaras de seguridad",
    resumen: "Mirá tu casa o negocio en vivo desde el celular, de día y de noche.",
    image: "/img/servicio-videovigilancia.webp",
    items: [
      "Instalación completa a medida del lugar",
      "Acceso desde el celular 24/7",
      "Visión nocturna",
      "Marcas confiables: Hikvision, Dahua, HiLook, EZVIZ",
    ],
  },
  {
    number: "02",
    title: "Alarmas",
    resumen: "Te avisan al instante en el celular, con video de lo que pasó.",
    image: "/img/servicio-alarmas.webp",
    items: [
      "Sensores + notificaciones al celular",
      "Alerta con video al instante",
      "Integradas con tus cámaras",
      "Batería de backup y sirena",
    ],
  },
  {
    number: "03",
    title: "Redes WiFi y conectividad",
    resumen: "Internet sin zonas muertas. Redes WiFi y Starlink donde no llega la fibra.",
    image: "/img/servicio-redes.webp",
    items: [
      "WiFi sin zonas muertas",
      "Antenas Starlink para obras y zonas sin fibra",
      "Instalación profesional y cobertura pareja",
      "Base sólida para tus cámaras",
    ],
  },
  {
    number: "04",
    title: "Automatización del hogar",
    resumen: "Luces, portones, climatización y accesos, controlados desde una app.",
    image: "/img/servicio-automatizacion.webp",
    items: [
      "Cerraduras inteligentes por app, huella o PIN",
      "Luces, portones y accesos desde la app",
      "Climatización controlada",
      "Compatible con Alexa y Google",
    ],
  },
] as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#pilares" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;
