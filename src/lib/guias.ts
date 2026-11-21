/**
 * Guías gratis de INSOLVA, públicas en /guias/.
 *
 * Vinieron del embudo (funnel-ventas), donde estaban detrás del formulario.
 * Acá quedan abiertas para que Google y los buscadores con IA las lean: el
 * embudo sigue existiendo como captación (grupo de WhatsApp y promos) y se
 * enlaza desde cada guía.
 *
 * Enfoque: ayudar a ELEGIR, no enseñar a instalar (la instalación la hace
 * INSOLVA). Agregar un recurso = agregar un objeto a `GUIAS`: el índice, la
 * página del recurso y el sitemap se arman solos. Si se edita una guía acá,
 * conviene replicar el cambio en el embudo (src/lib/guias.ts) o viceversa.
 *
 * Criterio: información general y verificable. Las fichas de cerraduras usan
 * solo lo que está publicado en la tienda de INSOLVA; marca, modelo y PDF del
 * fabricante se suman cuando estén (campo `pdf`, con el archivo en public/fichas/).
 */

export const INTERESES = [
  { id: "camaras", label: "Cámaras de seguridad", tag: "cámaras", servicio: "camaras-de-seguridad-tierra-del-fuego" },
  { id: "alarmas", label: "Alarmas", tag: "alarmas", servicio: "alarmas-tierra-del-fuego" },
  { id: "cerraduras", label: "Cerraduras digitales", tag: "cerraduras", servicio: "cerraduras-digitales-tierra-del-fuego" },
  { id: "automatizacion", label: "Automatización del hogar", tag: "automatización", servicio: "domotica-tierra-del-fuego" },
  { id: "redes", label: "WiFi y Starlink", tag: "wifi", servicio: "redes-wifi-tierra-del-fuego" },
  { id: "electricidad", label: "Instalación eléctrica", tag: "electricidad", servicio: "electricidad-tierra-del-fuego" },
  { id: "obra", label: "Estoy construyendo", tag: "obra", servicio: "electricidad-tierra-del-fuego" },
] as const;

export type InteresId = (typeof INTERESES)[number]["id"];

export function interesDe(id: InteresId) {
  return INTERESES.find((i) => i.id === id)!;
}

/** Fechas para el schema Article (ISO). Al editar una guía, actualizar `GUIAS_ACTUALIZADAS`. */
export const GUIAS_PUBLICADAS = "2026-09-29";
export const GUIAS_ACTUALIZADAS = "2026-11-20";

export type Bloque =
  | { tipo: "p"; texto: string }
  | { tipo: "h"; texto: string }
  | { tipo: "leccion"; titulo: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "check"; titulo?: string; items: string[] }
  | { tipo: "pasos"; items: { titulo: string; texto: string }[] }
  | { tipo: "nota"; titulo: string; texto: string }
  | { tipo: "specs"; titulo?: string; filas: [string, string][] }
  /** Si la primera columna es "", la primera celda de cada fila es el encabezado de la fila. */
  | { tipo: "comparativa"; columnas: string[]; filas: string[][] };

export const FORMATOS = ["Guía", "Curso", "Ficha técnica", "Comparativa", "Checklist"] as const;
export type Formato = (typeof FORMATOS)[number];

export const FORMATO_PLURAL: Record<Formato, string> = {
  Guía: "Guías para elegir",
  Curso: "Cursos",
  "Ficha técnica": "Fichas técnicas",
  Comparativa: "Comparativas",
  Checklist: "Checklists",
};

export type Guia = {
  slug: string;
  titulo: string;
  bajada: string;
  formato: Formato;
  minutos: number;
  intereses: InteresId[];
  portada?: { src: string; alt: string };
  /** Mensaje que se precarga en WhatsApp al final del recurso. */
  consulta: string;
  /** Fichas: link al producto en la tienda y hoja de datos del fabricante (PDF en /public/fichas). */
  tiendaUrl?: string;
  pdf?: string;
  bloques: Bloque[];
};

const TIENDA = "https://darkcyan-rail-217476.hostingersite.com/producto";

export const GUIAS: Guia[] = [
  // ─── Guías para elegir ──────────────────────────────────────────────
  {
    slug: "como-elegir-camaras",
    titulo: "Cómo elegir cámaras sin pagar de más",
    bajada:
      "Megapíxeles, lentes, visión nocturna y dónde queda guardado lo que graban. Qué conviene mirar y qué casi no cambia nada.",
    formato: "Guía",
    minutos: 6,
    intereses: ["camaras"],
    portada: {
      src: "/img/guias/camaras-casa-02.webp",
      alt: "Técnico de INSOLVA en una escalera instalando una cámara bajo un balcón, con el Canal Beagle y montañas nevadas de fondo",
    },
    consulta: "Hola INSOLVA, leí la guía para elegir cámaras y quiero que me asesoren.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Casi todo el mundo arranca preguntando cuántos megapíxeles tiene la cámara. Es la pregunta menos importante. Una cámara de 8 MP mal ubicada sirve menos que una de 2 MP apuntando al lugar justo. Antes del modelo, pensá qué querés ver.",
      },
      { tipo: "h", texto: "Primero, qué necesitás ver" },
      { tipo: "p", texto: "Hay tres niveles, y cada uno pide algo distinto:" },
      {
        tipo: "lista",
        items: [
          "Detectar: saber que alguien entró al patio o que un auto paró en la puerta. Cualquier cámara lo resuelve.",
          "Reconocer a alguien que conocés, como un empleado o un vecino. La persona tiene que ocupar una parte razonable de la imagen.",
          "Identificar a un desconocido o leer una patente. Acá la cámara tiene que estar cerca, a la altura correcta y con buena luz.",
        ],
      },
      {
        tipo: "p",
        texto: "Si sabés cuál de los tres buscás en cada punto de la casa, ya elegiste la mitad de la cámara.",
      },
      { tipo: "h", texto: "Resolución: cuánto alcanza" },
      {
        tipo: "lista",
        items: [
          "2 MP (1080p): alcanza para interiores, pasillos y accesos cercanos.",
          "4 MP: el punto justo para la mayoría de los exteriores de una casa o un local.",
          "8 MP (4K): tiene sentido en espacios grandes, estacionamientos o frentes anchos. También pide más disco y más red.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Ojo con esto",
        texto:
          "Más megapíxeles con un lente muy abierto no te acercan a nada. Si querés ver una cara a 10 metros, cambiá el lente antes que la resolución.",
      },
      { tipo: "h", texto: "El lente decide el ángulo" },
      {
        tipo: "p",
        texto:
          "El número en milímetros te dice qué tan abierta es la imagen. Cuanto más chico, más ángulo y menos detalle a lo lejos.",
      },
      {
        tipo: "lista",
        items: [
          "2,8 mm: muy abierto, alrededor de 100°. Bueno para cubrir un patio o un salón desde una esquina.",
          "4 mm: intermedio. Sirve para un frente o una entrada de autos.",
          "6 mm o varifocal: más cerrado, para ver detalle lejos, como un portón al fondo del terreno.",
        ],
      },
      { tipo: "h", texto: "De noche" },
      {
        tipo: "p",
        texto:
          "Casi todas las cámaras graban de noche con infrarrojo: la imagen sale en blanco y negro y alcanza entre 20 y 40 metros según el modelo. Las cámaras con color nocturno (Hikvision las llama ColorVu) usan una luz cálida y muestran colores, algo que ayuda mucho a describir ropa o un auto. A cambio, prenden una luz, que en algunos lugares disuade y en otros molesta a los vecinos.",
      },
      { tipo: "h", texto: "El frío de acá" },
      {
        tipo: "p",
        texto:
          "Para exterior, pedí protección IP66 o IP67 (polvo y agua) y revisá en la ficha técnica la temperatura de funcionamiento. Las marcas conocidas suelen trabajar hasta −30 °C, así que el invierno fueguino no es problema para la cámara. Lo que sí sufre el frío son las baterías: una cámara inalámbrica a batería dura bastante menos en invierno.",
      },
      { tipo: "h", texto: "Cable o WiFi" },
      {
        tipo: "p",
        texto:
          "Si se puede cablear, conviene cablear. Una cámara con PoE (un solo cable de red lleva datos y energía) no depende de la señal del router ni de que alguien cambie la clave del WiFi. Las cámaras WiFi van bien en interiores o para sumar un punto adonde no llega un caño, sabiendo que la conexión va a ser tan buena como tu WiFi.",
      },
      { tipo: "h", texto: "Dónde queda grabado" },
      {
        tipo: "lista",
        items: [
          "Grabador (NVR o DVR) con disco: todo queda en tu casa, no pagás abono y lo mirás desde el celular.",
          "Nube: las imágenes quedan afuera aunque se lleven el equipo, pero se paga por mes y depende de tu internet.",
          "Tarjeta microSD en la cámara: sirve para una cámara suelta, no para un sistema.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Como referencia, cuatro cámaras de 4 MP grabando las 24 horas llenan un disco de 1 TB en unos diez días, según la compresión. Si graban solo cuando detectan movimiento, el mismo disco dura bastante más. Pedí que te calculen los días de grabación antes de elegir el disco.",
      },
      { tipo: "h", texto: "La app" },
      {
        tipo: "p",
        texto:
          "Antes de comprar, preguntá qué app usa el equipo y probala. Tenés que poder ver en vivo, buscar una grabación por hora y bajar un clip sin pelearte con el celular. Si la app es mala, el sistema entero se siente malo.",
      },
      {
        tipo: "check",
        titulo: "Antes de pedir presupuesto, tené a mano",
        items: [
          "Qué querés ver en cada punto: detectar, reconocer o identificar",
          "Cuántos accesos tiene tu casa o tu local",
          "Si hay caños para pasar cable o hay que canalizar por fuera",
          "Cuántos días de grabación querés guardar",
          "Quién más va a mirar las cámaras desde su celular",
        ],
      },
    ],
  },
  {
    slug: "preguntas-presupuesto-camaras",
    titulo: "8 preguntas antes de aceptar un presupuesto de cámaras",
    bajada:
      "Dos presupuestos con la misma cantidad de cámaras pueden ser sistemas muy distintos. Qué preguntar para comparar de igual a igual.",
    formato: "Guía",
    minutos: 5,
    intereses: ["camaras", "alarmas"],
    portada: {
      src: "/img/guias/camaras-ptz-detalle.webp",
      alt: "Detalle de una cámara motorizada instalada en exterior",
    },
    consulta: "Hola INSOLVA, leí las preguntas para comparar presupuestos y quiero pedir el mío.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Cuando comparás presupuestos, la tentación es mirar el total y contar cámaras. Pero detrás de «4 cámaras con grabador» puede haber sistemas muy distintos. Estas preguntas te ayudan a ver qué estás comprando.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "¿Qué resolución y qué lente lleva cada cámara?",
            texto:
              "No alcanza con «4 MP». Preguntá qué lente va en cada punto y qué se va a ver desde ahí: todo el patio o la cara de quien toca el timbre.",
          },
          {
            titulo: "¿Son cableadas o WiFi?",
            texto:
              "Las cableadas (PoE) son más estables. Si te ofrecen WiFi en exterior, preguntá por qué y cómo llega la señal hasta ese punto.",
          },
          {
            titulo: "¿Cuántos días de grabación da el disco?",
            texto:
              "El número tiene que venir calculado para tus cámaras y tu forma de grabar, continua o por movimiento. Un disco chico se llena y empieza a borrar lo más viejo.",
          },
          {
            titulo: "¿Dónde va el grabador?",
            texto:
              "Si queda a la vista, quien entra se lo puede llevar con las grabaciones adentro. Preguntá dónde lo van a ubicar y si hay respaldo en la nube.",
          },
          {
            titulo: "¿Cómo van los cables?",
            texto:
              "Por caño, canaleta o dentro de la pared, con las conexiones protegidas en cajas estancas. Un cable colgando se corta fácil y se arruina con la intemperie.",
          },
          {
            titulo: "¿Quién configura la app y los accesos?",
            texto:
              "El sistema tiene que quedar funcionando en tu celular y en el de quien vos digas, con clave propia y no la que viene de fábrica.",
          },
          {
            titulo: "¿Se revisa de noche?",
            texto:
              "Una cámara puede verse perfecta de día y quedar encandilada de noche por un reflejo o un farol. Preguntá si el sistema se entrega revisado en las dos situaciones.",
          },
          {
            titulo: "¿Qué garantía y qué soporte hay después?",
            texto:
              "Preguntá qué pasa si una cámara falla o si cambiás de celular. Que alguien responda después de instalar vale tanto como el equipo.",
          },
        ],
      },
      {
        tipo: "nota",
        titulo: "Hacénoslas a nosotros también",
        texto: "Si nos pedís presupuesto, preguntanos estas mismas ocho cosas. Es la mejor forma de comparar.",
      },
    ],
  },
  {
    slug: "camaras-o-alarma",
    titulo: "¿Cámaras, alarma o las dos?",
    bajada:
      "Hacen cosas distintas: una te muestra lo que pasó y la otra te avisa mientras pasa. Cómo decidir según tu casa o tu negocio.",
    formato: "Comparativa",
    minutos: 4,
    intereses: ["alarmas", "camaras"],
    portada: {
      src: "/img/guias/camaras-domo-complejo.webp",
      alt: "Cámara domo instalada en un complejo de departamentos",
    },
    consulta: "Hola INSOLVA, leí la comparativa de cámaras y alarma. Quiero ver qué me conviene.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Una cámara registra. Si alguien entra a las cuatro de la mañana, al otro día vas a tener el video. Una alarma avisa: suena, te llega la notificación al celular y quien entró sabe que lo descubrieron. Confundir una cosa con la otra explica muchas compras que después decepcionan.",
      },
      {
        tipo: "comparativa",
        columnas: ["Cámaras", "Alarma"],
        filas: [
          ["Te muestran qué pasó y quién fue", "Te avisa en el momento"],
          ["Sirven como prueba", "Espanta con la sirena"],
          ["Las mirás cuando querés, en vivo o grabado", "Trabaja sola cuando la armás"],
          ["Disuaden si se ven", "Disuade si se escucha y hay cartel"],
        ],
      },
      { tipo: "h", texto: "Cuándo alcanza con cámaras" },
      {
        tipo: "lista",
        items: [
          "Querés ver quién llega, controlar la caja o mirar la casa cuando estás de viaje.",
          "Casi siempre hay gente en el lugar y lo que buscás es registro.",
          "Te importa más tener prueba de lo que pasó que cortarlo en el momento.",
        ],
      },
      { tipo: "h", texto: "Cuándo necesitás alarma" },
      {
        tipo: "lista",
        items: [
          "La casa o el local queda vacío muchas horas, sobre todo de noche o en temporada.",
          "Querés enterarte en el momento, no al otro día.",
          "Tenés un depósito, un obrador o una cabaña que nadie mira de cerca.",
        ],
      },
      { tipo: "h", texto: "Por qué conviene integrarlas" },
      {
        tipo: "p",
        texto:
          "Con la alarma y las cámaras conectadas, el aviso te llega con el video de lo que lo disparó. Abrís el celular y en diez segundos sabés si fue el gato o si hay que llamar a alguien. Un aviso sin imagen te obliga a adivinar.",
      },
      { tipo: "h", texto: "Qué tiene una alarma" },
      {
        tipo: "lista",
        items: [
          "Central: el cerebro del sistema, con batería de respaldo para los cortes de luz.",
          "Sensores magnéticos en puertas y ventanas, que avisan si se abren.",
          "Sensores de movimiento. Hay modelos que ignoran mascotas chicas y medianas.",
          "Sirena interior y exterior.",
          "App para armar, desarmar y recibir los avisos.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Un dato para elegir",
        texto:
          "Pedí que la alarma tenga armado parcial: de noche quedan activos los sensores de puertas y ventanas y apagados los de adentro. Te movés por la casa tranquilo y la alarma igual cuida el perímetro.",
      },
    ],
  },
  {
    slug: "como-elegir-cerradura-digital",
    titulo: "Cómo elegir una cerradura digital: 6 cosas para mirar",
    bajada:
      "Huella, código, tarjeta o app. Qué conviene según tu puerta, cómo se alimenta y qué pasa si se queda sin pilas.",
    formato: "Guía",
    minutos: 4,
    intereses: ["cerraduras", "automatizacion"],
    portada: {
      src: "/img/guias/cerraduras-terminada.webp",
      alt: "Cerradura digital con teclado y lector de huella instalada en una puerta",
    },
    consulta: "Hola INSOLVA, leí la guía de cerraduras digitales y quiero ver cuál va en mi puerta.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Una cerradura digital te saca de encima las llaves: entrás con huella o con un código. Y si alquilás por temporada, cada huésped puede tener su propio código. Pero no cualquier cerradura va en cualquier puerta.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Tu puerta",
            texto:
              "Fijate de qué es (madera, aluminio, PVC o blindada) y cuánto mide de espesor. Cada cerradura indica en qué rango de espesores funciona, y una puerta de aluminio de perfil angosto, por ejemplo, pide un modelo específico.",
          },
          {
            titulo: "La cerradura que ya tenés",
            texto:
              "Que sea de embutir o de sobreponer cambia qué modelos entran sin hacerle trabajos extra a la puerta.",
          },
          {
            titulo: "Cómo vas a abrir",
            texto:
              "Huella y código son lo más práctico. La tarjeta sirve para personal o para mucha gente. La app suma abrir a distancia y ver quién entró, pero necesita WiFi o un puente.",
          },
          {
            titulo: "La energía",
            texto:
              "Funcionan a pilas que duran meses. Avisan cuando están bajas, y la mayoría tiene un puerto de emergencia para alimentarlas desde afuera con una batería portátil. Las pilas rinden menos con frío, algo a tener en cuenta en una puerta exterior.",
          },
          {
            titulo: "El plan B",
            texto: "Que tenga llave mecánica de respaldo. Siempre.",
          },
          {
            titulo: "El clima",
            texto:
              "Una puerta que da directo al exterior recibe viento, nieve y condensación. Elegí un modelo preparado para exterior o que el frente quede protegido.",
          },
        ],
      },
      {
        tipo: "nota",
        titulo: "Si alquilás cabañas o departamentos",
        texto:
          "Es donde más se nota. Con los modelos que se manejan por app podés crear un código por huésped que funcione solo durante su estadía. Se terminan las llaves perdidas y las copias que nadie devolvió.",
      },
      {
        tipo: "p",
        texto:
          "Antes de recomendar un modelo medimos la puerta: es la diferencia entre una cerradura que cierra bien y una que no. En esta biblioteca tenés las fichas técnicas de las tres cerraduras que trabajamos, para comparar.",
      },
    ],
  },
  {
    slug: "wifi-en-toda-la-casa",
    titulo: "WiFi en toda la casa: qué solución elegir",
    bajada:
      "Paredes, aislaciones con foil, un router en un rincón. Por qué se corta la señal y qué soluciones existen, de la más simple a la más prolija.",
    formato: "Guía",
    minutos: 5,
    intereses: ["redes", "obra", "automatizacion"],
    portada: {
      src: "/img/guias/redes-starlink-instalacion.webp",
      alt: "Técnico montando una antena Starlink en un techo",
    },
    consulta: "Hola INSOLVA, leí la guía de WiFi y tengo zonas sin señal en casa. ¿Me ayudan?",
    bloques: [
      {
        tipo: "p",
        texto:
          "Si en la cocina anda bien y en el dormitorio no carga ni un video, el problema casi nunca es el plan de internet. Es cómo viaja la señal adentro de la casa.",
      },
      { tipo: "h", texto: "Qué frena la señal" },
      {
        tipo: "lista",
        items: [
          "La distancia y la cantidad de paredes entre el router y vos.",
          "El metal: perfiles de steel frame, aislaciones con foil de aluminio, heladeras, espejos grandes.",
          "Dónde está el router: adentro de un mueble, en el piso o en una punta de la casa.",
          "Muchos equipos en la misma red: cámaras, teles, celulares, consolas.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Casas bien aisladas",
        texto:
          "Las aislaciones térmicas con cara de aluminio, tan comunes en casas preparadas para el frío, funcionan casi como un espejo para el WiFi. Si tu casa las tiene, es raro que un solo router alcance para toda la planta.",
      },
      { tipo: "h", texto: "Las soluciones, de menor a mayor" },
      {
        tipo: "comparativa",
        columnas: ["", "Repetidor", "Sistema mesh", "Access points cableados"],
        filas: [
          ["Cómo funciona", "Repite la señal del router", "Varios equipos arman una sola red", "Cada equipo recibe internet por cable"],
          ["Estabilidad", "Baja", "Buena", "La mejor"],
          ["Obra", "Ninguna", "Ninguna", "Pide cable hasta cada punto"],
          ["Ideal para", "Un ambiente puntual", "Casas ya terminadas", "Obra nueva o locales grandes"],
        ],
      },
      {
        tipo: "p",
        texto:
          "Los repetidores baratos que se enchufan a la pared suelen ser la opción que más decepciona: arman una red aparte, cortan la velocidad y el celular se queda pegado al que tiene peor señal. El mesh se pasa solo al equipo más cercano mientras te movés por la casa.",
      },
      { tipo: "h", texto: "Separá las cámaras" },
      {
        tipo: "p",
        texto:
          "Si tenés cámaras o dispositivos inteligentes, conviene que vayan en una red aparte de la de tus celulares y computadoras. Es más ordenado y más seguro: si un aparato barato tiene una falla, no deja expuesto al resto.",
      },
      { tipo: "h", texto: "Cuando no llega la fibra" },
      {
        tipo: "p",
        texto:
          "En cabañas, campos, obradores o zonas alejadas, Starlink resolvió lo que antes no tenía solución. Necesita vista despejada del cielo, sin árboles ni edificios cerca, y su app trae una herramienta para revisar obstrucciones antes de decidir dónde va. Con el viento de acá, el montaje tiene que ser firme.",
      },
      {
        tipo: "check",
        titulo: "Para pedir una solución de red, tené a mano",
        items: [
          "Un plano o un croquis de la casa, aunque sea a mano",
          "Dónde está hoy el router y por dónde entra el servicio",
          "En qué ambientes falla la señal",
          "Cuántos equipos se conectan: celulares, teles, cámaras",
        ],
      },
    ],
  },
  {
    slug: "seguridad-para-comercios",
    titulo: "Seguridad para tu comercio: qué elegir para caja, empleados y fuera de horario",
    bajada:
      "Qué mirar con cámaras, cómo cuidar el local cuando está cerrado y qué dice la ley sobre filmar un lugar de trabajo.",
    formato: "Guía",
    minutos: 5,
    intereses: ["camaras", "alarmas", "cerraduras"],
    portada: {
      src: "/img/guias/camaras-comercio-01.webp",
      alt: "Dos cámaras de exterior sobre un poste, con cajas estancas y cañería",
    },
    consulta: "Hola INSOLVA, tengo un comercio y leí la guía de seguridad. Quiero que me asesoren.",
    bloques: [
      {
        tipo: "p",
        texto:
          "En un comercio la seguridad cumple dos funciones a la vez: cuidar el local cuando está cerrado y ordenar lo que pasa cuando está abierto. Conviene pensarlas por separado.",
      },
      { tipo: "h", texto: "Con el local abierto" },
      {
        tipo: "lista",
        items: [
          "Una cámara sobre la caja, desde arriba y un poco de costado, que muestre las manos, el cajón y el mostrador.",
          "Una en la entrada, a la altura de la cara, que registre a cada persona que entra.",
          "El depósito y la puerta de atrás: por ahí sale mercadería sin que nadie la vea.",
          "Acceso desde el celular para vos y para quien vos elijas, con permisos distintos.",
        ],
      },
      { tipo: "h", texto: "Con el local cerrado" },
      {
        tipo: "lista",
        items: [
          "Alarma con sensores en puertas, vidrieras y depósito, que se arme con horario.",
          "Aviso al celular de quien corresponda, con el video de lo que disparó el evento.",
          "Iluminación exterior programada. Un frente a oscuras invita.",
          "Si varias personas abren y cierran, una cerradura digital o un control de acceso registra quién entró y a qué hora.",
        ],
      },
      { tipo: "h", texto: "Lo que dice la ley" },
      {
        tipo: "p",
        texto:
          "En Argentina, si filmás un lugar al que entra público, tenés que avisarlo con un cartel visible de zona videovigilada que diga quién es el responsable de las imágenes. Lo pide la Disposición 10/2015 sobre videovigilancia de la autoridad de protección de datos personales. Con tu equipo, lo mismo: avisales que hay cámaras. Y nunca en baños ni vestuarios. Esto es una orientación general; para un caso puntual, consultá con tu asesor legal.",
      },
      {
        tipo: "nota",
        titulo: "Una cámara que nadie mira no controla nada",
        texto:
          "Armá una rutina: diez minutos por semana para revisar movimientos de caja, aperturas fuera de horario o faltantes. Así las cámaras pasan a ser una herramienta de gestión y dejan de ser un gasto.",
      },
      {
        tipo: "check",
        titulo: "Para cotizar un comercio, tené a mano",
        items: [
          "Horario de apertura y cierre",
          "Cuántas cajas y cuántas puertas hay",
          "Si hay depósito, patio o entrada de mercadería",
          "Quién necesita ver las cámaras y desde dónde",
        ],
      },
    ],
  },

  // ─── Curso ──────────────────────────────────────────────────────────
  {
    slug: "curso-domotica-desde-cero",
    titulo: "Domótica desde cero",
    bajada:
      "Qué es, cómo se comunican los equipos, qué app elegir, qué conviene automatizar primero y cómo planificarla sin llenarte de aparatos que no se hablan entre sí.",
    formato: "Curso",
    minutos: 20,
    intereses: ["automatizacion", "obra", "cerraduras", "redes"],
    portada: {
      src: "/img/guias/domotica-termostato.webp",
      alt: "Termostato inteligente instalado en una pared",
    },
    consulta: "Hola INSOLVA, hice el curso de domótica y quiero ver qué se puede hacer en mi casa.",
    bloques: [
      { tipo: "leccion", titulo: "Qué es (y qué no es) la domótica" },
      {
        tipo: "p",
        texto:
          "Domótica, casa inteligente, automatización del hogar: son la misma idea. Equipos de la casa (luces, calefacción, portón, cerradura, sensores) que se manejan desde el celular y, sobre todo, que hacen cosas solos según horarios o según lo que pasa.",
      },
      {
        tipo: "p",
        texto:
          "La diferencia entre un aparato con app y una casa automatizada está en esa segunda parte. Prender la luz desde el celular es control remoto. Que la luz del pasillo se prenda sola de noche cuando alguien pasa, o que la calefacción baje cuando se va el último de la casa, eso es automatización.",
      },
      {
        tipo: "lista",
        items: [
          "Control remoto: manejás un equipo desde el celular o con la voz.",
          "Programación: el equipo hace algo a una hora fija, como prender las luces de afuera al anochecer.",
          "Automatización: reglas del tipo «si pasa esto, hacé aquello». Si se abre la puerta y no hay nadie en casa, avisame.",
        ],
      },

      { tipo: "leccion", titulo: "Cómo se comunican los equipos" },
      {
        tipo: "p",
        texto:
          "Cada equipo necesita una forma de recibir órdenes. Es el dato que más conviene mirar antes de comprar, porque define qué funciona con qué.",
      },
      {
        tipo: "comparativa",
        columnas: ["", "WiFi", "Zigbee", "Bluetooth", "Matter"],
        filas: [
          ["Qué necesita", "Solo tu router", "Un hub", "Un puente para usarlo a distancia", "Un equipo compatible que lo coordine"],
          ["A favor", "Simple, sin equipos extra", "Bajo consumo, arma su propia red", "Barato, sin configurar red", "Mezcla marcas distintas"],
          ["En contra", "Muchos equipos saturan el router", "Hay que sumar el hub", "Corto alcance", "Todavía hay que verificar cada equipo"],
          ["Típico en", "Enchufes, lámparas, cámaras", "Sensores a pila, llaves", "Algunas cerraduras", "Equipos nuevos de marcas grandes"],
        ],
      },
      {
        tipo: "p",
        texto:
          "Matter es el estándar que impulsan Apple, Google, Amazon y Samsung para que los equipos funcionen sin importar la marca. Puede ir sobre WiFi o sobre Thread, una red de bajo consumo parecida a Zigbee. Es el camino hacia donde va el mercado, pero hoy conviene revisar la compatibilidad equipo por equipo.",
      },
      {
        tipo: "nota",
        titulo: "Regla práctica",
        texto:
          "Pocos equipos: WiFi alcanza. Muchos sensores o equipos a pila: conviene un hub Zigbee, que además descarga al router. Y muchos equipos WiFi económicos solo se conectan en la banda de 2,4 GHz, así que revisá que tu router la tenga activa.",
      },

      { tipo: "leccion", titulo: "Elegir la app antes que los equipos" },
      {
        tipo: "p",
        texto:
          "La app es desde donde vas a manejar la casa. Si cada equipo tiene la suya, la casa se vuelve un rompecabezas. Por eso el orden es al revés de lo que parece: primero elegís la app, después comprás equipos compatibles.",
      },
      {
        tipo: "lista",
        items: [
          "Google Home: se lleva bien con Android y con los parlantes y pantallas Nest.",
          "Alexa: muy completa para rutinas y con muchísimos equipos compatibles.",
          "Apple Home: prolija y muy privada, pero necesitás iPhone.",
          "Smart Life (Tuya): la plataforma detrás de muchos equipos económicos; se integra con Google y Alexa.",
        ],
      },
      {
        tipo: "p",
        texto:
          "En la caja de cada equipo figura con qué funciona («compatible con Google Home», «funciona con Alexa» o el logo de Matter). Si no lo dice, no des por sentado que funciona.",
      },

      { tipo: "leccion", titulo: "Qué conviene automatizar primero" },
      {
        tipo: "p",
        texto: "Arrancá por lo que más usás o lo que más te pesa. Estas son las áreas donde más se nota:",
      },
      {
        tipo: "lista",
        items: [
          "Calefacción: un termostato inteligente ajusta la temperatura por horario y lo manejás desde el celular. En una ciudad donde se calefacciona buena parte del año, es de lo primero que se nota.",
          "Luces: llaves inteligentes o lámparas inteligentes. Las llaves mantienen el interruptor de la pared; las lámparas no piden tocar la instalación, pero dejan de responder si alguien apaga la llave.",
          "Accesos: cerradura digital y portón desde el celular.",
          "Seguridad: sensores de apertura, sirena y cámaras que avisan al celular.",
          "Energía: enchufes que miden consumo y cortan equipos por horario.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Con varios equipos en la misma app aparecen las escenas: un solo toque que hace muchas cosas. «Me voy» apaga las luces, baja la calefacción y arma la alarma. «Buenas noches» cierra, apaga y deja solo la luz del pasillo.",
      },

      { tipo: "leccion", titulo: "Cómo planificarla" },
      {
        tipo: "lista",
        items: [
          "Por etapas: un problema concreto primero, después un ambiente por vez.",
          "Revisá que el WiFi llegue bien a cada lugar donde va a haber un equipo. Si hoy falla, se arregla eso antes.",
          "Las llaves de luz inteligentes suelen necesitar cable neutro en la caja. Conviene saber si tu casa lo tiene.",
          "Pensá qué pasa si se corta internet. Los sistemas con hub pueden seguir funcionando adentro de la casa.",
          "Si estás construyendo, es el mejor momento: con caños y cajas previstos, sumar automatización después es mucho más simple.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Los errores más comunes al comprar",
        texto:
          "Mezclar apps que no se hablan, comprar el equipo más barato sin fijarse si es compatible con lo que ya tenés y automatizar cosas que nadie usa. Una casa con tres automatizaciones que se usan todos los días vale más que una con veinte que nadie recuerda.",
      },
      {
        tipo: "check",
        titulo: "Tu plan en una hoja",
        items: [
          "Qué problema quiero resolver primero",
          "Qué app voy a usar para toda la casa",
          "Si el WiFi llega a los lugares donde van los equipos",
          "Qué escenas me servirían todos los días",
          "Qué dejo previsto si estoy construyendo o reformando",
        ],
      },
    ],
  },

  // ─── Fichas técnicas ────────────────────────────────────────────────
  {
    slug: "comparativa-cerraduras-digitales",
    titulo: "¿Qué cerradura digital te conviene? Las tres, lado a lado",
    bajada: "Huella y clave, WiFi con app o portón con control remoto. En qué se diferencian y para qué puerta va cada una.",
    formato: "Comparativa",
    minutos: 3,
    intereses: ["cerraduras", "automatizacion"],
    consulta: "Hola INSOLVA, vi la comparativa de cerraduras y quiero saber cuál va en mi puerta.",
    bloques: [
      {
        tipo: "comparativa",
        columnas: ["", "Huella y clave", "WiFi con app", "Portón con control"],
        filas: [
          ["Cómo se abre", "Huella, clave, tarjeta o llave", "App, voz o llave", "Control remoto o llave"],
          ["Abrir a distancia", "No: se abre en la puerta", "Sí, desde el celular", "Con el control, hasta 30 m"],
          ["Sin internet", "Funciona igual", "Queda la llave de respaldo", "Funciona igual"],
          ["Respaldo", "Llave mecánica de emergencia", "Llave física", "Llave mecánica"],
          ["Pensada para", "Puerta principal de casa u oficina", "Casas y alquileres donde entra gente que no vive ahí", "Portones peatonales y vehiculares"],
        ],
      },
      {
        tipo: "p",
        texto:
          "Los datos salen de las fichas de nuestra tienda. Abajo tenés la ficha completa de cada una. Si necesitás la hoja de datos del fabricante (medidas, espesores de puerta, consumo), pedila por WhatsApp.",
      },
    ],
  },
  {
    slug: "ficha-cerradura-huella-y-clave",
    titulo: "Cerradura digital con huella dactilar y clave",
    bajada: "Cerradura biométrica para puerta principal: abrís con huella, clave numérica o tarjeta.",
    formato: "Ficha técnica",
    minutos: 2,
    intereses: ["cerraduras"],
    consulta: "Hola INSOLVA, quiero la hoja de datos y el precio instalado de la cerradura con huella y clave.",
    tiendaUrl: `${TIENDA}/cerradura-digital-con-huella-dactilar-y-clave/`,
    bloques: [
      {
        tipo: "specs",
        titulo: "Características",
        filas: [
          ["Métodos de apertura", "Huella dactilar, clave numérica, tarjeta de proximidad"],
          ["Huellas", "Hasta 100 registradas"],
          ["Teclado", "Numérico retroiluminado"],
          ["Alimentación", "A batería, más de 6 meses de autonomía"],
          ["Seguridad", "Alerta ante intento de forzado"],
          ["Emergencia", "Apertura mecánica con llave física"],
          ["Montaje", "Sobre cerraduras estándar existentes"],
        ],
      },
      { tipo: "h", texto: "Para quién es" },
      {
        tipo: "lista",
        items: [
          "Puerta principal de una casa o una oficina.",
          "Familias donde cada uno entra con su huella y nadie depende de una llave.",
          "Lugares donde conviene dar una clave a alguien sin hacer copias.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Antes de elegirla",
        texto:
          "Como toda cerradura de este tipo, funciona dentro de un rango de espesor de puerta. Lo confirmamos midiendo la tuya antes de instalar.",
      },
    ],
  },
  {
    slug: "ficha-cerradura-wifi-app",
    titulo: "Cerradura inteligente WiFi con app, Alexa y Google Home",
    bajada: "Se maneja desde el celular: abrís a distancia, ves quién entró y creás claves temporales.",
    formato: "Ficha técnica",
    minutos: 2,
    intereses: ["cerraduras", "automatizacion"],
    consulta: "Hola INSOLVA, quiero la hoja de datos y el precio instalado de la cerradura WiFi con app.",
    tiendaUrl: `${TIENDA}/cerradura-inteligente-wifi-con-app-alexa-y-google-home/`,
    bloques: [
      {
        tipo: "specs",
        titulo: "Características",
        filas: [
          ["Conexión", "WiFi"],
          ["Métodos de apertura", "App en el celular, voz (Alexa y Google Home), llave física"],
          ["Apertura remota", "Sí, desde cualquier lugar"],
          ["Claves temporales", "Para visitas o personal de limpieza"],
          ["Historial", "Registro de quién entró y cuándo"],
          ["Avisos", "Notificación al celular en cada apertura"],
          ["Respaldo", "Llave física"],
        ],
      },
      { tipo: "h", texto: "Para quién es" },
      {
        tipo: "lista",
        items: [
          "Cabañas y departamentos de alquiler temporario.",
          "Casas donde entra personal de limpieza, cuidadores o visitas.",
          "Quien quiere saber desde el celular cuándo se abrió la puerta.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Antes de elegirla",
        texto:
          "Necesita buena señal de WiFi en la puerta: sin señal, la app no abre ni avisa. Si tu WiFi no llega bien hasta ahí, conviene resolverlo primero.",
      },
    ],
  },
  {
    slug: "ficha-cerradura-porton-control-remoto",
    titulo: "Cerradura digital para portón con control remoto",
    bajada: "Cerradura robusta para portones y garajes, para intemperie, con control remoto de largo alcance.",
    formato: "Ficha técnica",
    minutos: 2,
    intereses: ["cerraduras"],
    consulta: "Hola INSOLVA, quiero la hoja de datos y el precio instalado de la cerradura para portón.",
    tiendaUrl: `${TIENDA}/cerradura-digital-para-porton-con-control-remoto/`,
    bloques: [
      {
        tipo: "specs",
        titulo: "Características",
        filas: [
          ["Apertura", "Control remoto RF"],
          ["Controles", "2 incluidos, hasta 20 programables"],
          ["Alcance", "Hasta 30 metros"],
          ["Construcción", "Cuerpo metálico reforzado, resistente a la intemperie"],
          ["Compatibilidad", "Motores de portón existentes"],
          ["Respaldo", "Cerradura mecánica con llave"],
        ],
      },
      { tipo: "h", texto: "Para quién es" },
      {
        tipo: "lista",
        items: [
          "Portones peatonales y vehiculares.",
          "Depósitos, obradores y accesos de barrios cerrados.",
          "Quien quiere abrir sin bajarse del auto.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Un dato útil",
        texto:
          "El control funciona por radiofrecuencia: no depende del WiFi ni de internet, así que sirve en lugares sin conexión.",
      },
    ],
  },

  // ─── Checklists ─────────────────────────────────────────────────────
  {
    slug: "checklist-de-obra",
    titulo: "Checklist de obra: lo que tiene que quedar previsto antes de cerrar paredes",
    bajada:
      "Un caño vacío hoy cuesta poco. Romper una pared terminada para pasar un cable cuesta mucho más. Qué pedirle a tu constructor.",
    formato: "Checklist",
    minutos: 5,
    intereses: ["obra", "electricidad", "redes", "automatizacion", "camaras", "alarmas"],
    portada: {
      src: "/img/guias/obra-cableado-steelframe.webp",
      alt: "Cableado y caños pasados en una estructura de steel frame antes de cerrar las paredes",
    },
    consulta: "Hola INSOLVA, estoy construyendo y leí el checklist de obra. Quiero planificar la instalación.",
    bloques: [
      {
        tipo: "p",
        texto:
          "La tecnología de una casa se define con los planos, no con la casa terminada. Cuando las paredes se cierran, cada cambio implica romper, canalizar por fuera o resignarse a un cable a la vista. Esta lista sirve para revisarla con tu constructor antes de que eso pase.",
      },
      {
        tipo: "check",
        titulo: "Seguridad",
        items: [
          "Caño hasta cada punto donde podría ir una cámara: aleros, esquinas, accesos, portón y fondo.",
          "Caño hasta cada puerta y ventana que vaya a llevar un sensor de alarma.",
          "Un punto para el teclado de la alarma cerca de la entrada principal.",
          "Alimentación y caño para el portón automático, aunque lo sumes más adelante.",
          "Si pensás en una cerradura digital, elegí la puerta pensando en eso: el espesor y el tipo de marco importan.",
        ],
      },
      {
        tipo: "check",
        titulo: "Red e internet",
        items: [
          "Cable de red Cat 6 hasta la tele, el escritorio y cada lugar donde quieras conexión fija.",
          "Puntos en el techo para access points, por lo menos uno por planta.",
          "Un caño hasta el techo o el exterior para la antena (Starlink u otra).",
          "Un lugar técnico: un placard o un nicho ventilado, con enchufe, donde se junten el router, el grabador y la central de alarma.",
        ],
      },
      {
        tipo: "check",
        titulo: "Electricidad",
        items: [
          "Tablero con circuitos separados (iluminación, tomas, cocina y calefacción eléctrica si hay) y lugar libre para sumar más.",
          "Disyuntor diferencial y puesta a tierra. Son obligatorios y son los que protegen a las personas.",
          "Tomas de sobra. Nadie se arrepintió de tener un enchufe de más.",
          "Cajas de luz con neutro, que es lo que piden la mayoría de las llaves inteligentes.",
        ],
      },
      {
        tipo: "check",
        titulo: "Automatización",
        items: [
          "Cable hasta el lugar del termostato, en un ambiente de uso y lejos de fuentes de calor.",
          "Iluminación exterior en un circuito propio, para poder programarla.",
          "Previsión para cortinas motorizadas si te interesan: después cuesta más llevar energía a la ventana.",
        ],
      },
      {
        tipo: "nota",
        titulo: "El consejo más barato de esta lista",
        texto:
          "Antes de cerrar, pedí fotos de cada pared con los caños a la vista y una cinta métrica apoyada. Dentro de cinco años, cuando quieras colgar un cuadro o sumar un punto, vas a saber por dónde pasa cada cosa.",
      },
    ],
  },
  {
    slug: "senales-instalacion-electrica",
    titulo: "Instalación eléctrica: 7 señales de que conviene revisarla",
    bajada:
      "Térmicas que saltan, enchufes calientes, zapatillas encadenadas. Lo que te está avisando tu instalación y cuándo llamar a un profesional.",
    formato: "Checklist",
    minutos: 4,
    intereses: ["electricidad", "obra"],
    portada: {
      src: "/img/guias/electricidad-tablero.webp",
      alt: "Tablero eléctrico armado con térmicas y disyuntores diferenciales",
    },
    consulta: "Hola INSOLVA, leí las señales de la instalación eléctrica y quiero que revisen la de mi casa.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Una instalación eléctrica no avisa con carteles. Avisa con detalles a los que uno se acostumbra. Si reconocés dos o más de estas señales, vale la pena que alguien la revise.",
      },
      {
        tipo: "pasos",
        items: [
          {
            titulo: "Las térmicas saltan seguido",
            texto:
              "Sobre todo cuando prendés la estufa, el horno o el secador al mismo tiempo. Es un circuito cargado de más, y en invierno, con la calefacción eléctrica, se nota todavía más.",
          },
          {
            titulo: "Enchufes o fichas calientes",
            texto:
              "Un toma tibio, marcas oscuras u olor a quemado no son normales. Ahí hay un mal contacto o un cable demasiado fino para lo que se le pide.",
          },
          {
            titulo: "No tenés disyuntor diferencial",
            texto:
              "Es el interruptor que corta si hay una fuga de corriente, por ejemplo cuando alguien toca un artefacto con falla. Es obligatorio y es el que protege a las personas. Si en tu tablero hay solo térmicas, falta.",
          },
          {
            titulo: "No hay puesta a tierra",
            texto:
              "Los enchufes de tres patas no sirven si la tercera no va a ningún lado. Sin tierra, el diferencial tampoco trabaja como debe.",
          },
          {
            titulo: "Zapatillas encadenadas",
            texto:
              "Una zapatilla enchufada a otra zapatilla quiere decir que faltan tomas. Es incómodo y sobrecarga el punto donde termina todo enchufado.",
          },
          {
            titulo: "Luces que bajan al prender algo",
            texto:
              "Si la luz titila cuando arranca un equipo, puede haber un empalme flojo o un circuito que comparte demasiado.",
          },
          {
            titulo: "Más de 25 años sin revisión",
            texto:
              "Aunque no dé problemas, los materiales y las exigencias cambiaron. Cables con la aislación reseca o un tablero sin lugar libre son motivo suficiente para revisarla.",
          },
        ],
      },
      {
        tipo: "nota",
        titulo: "No lo resuelvas con cinta",
        texto:
          "Si ves chispas, sentís olor a quemado o un toma se calienta, cortá ese circuito desde el tablero y llamá a un electricista cuanto antes.",
      },
      {
        tipo: "check",
        titulo: "Para pedir una revisión, tené a mano",
        items: [
          "Una foto del tablero abierto",
          "Qué equipos grandes usás: estufas, horno, termotanque eléctrico",
          "En qué ambientes aparecen los problemas",
          "El año aproximado de la instalación",
        ],
      },
    ],
  },
];

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}

/** Títulos de las lecciones de un curso, en orden. */
export function leccionesDe(g: Guia): string[] {
  return g.bloques.flatMap((b) => (b.tipo === "leccion" ? [b.titulo] : []));
}

export function contarPorFormato(): Record<Formato, number> {
  const base = Object.fromEntries(FORMATOS.map((f) => [f, 0])) as Record<Formato, number>;
  for (const g of GUIAS) base[g.formato]++;
  return base;
}

/**
 * Tres recursos para seguir. Una ficha lleva a la comparativa y a las otras
 * fichas; el resto, a recursos del mismo tema con otro formato.
 */
export function relacionadosDe(guia: Guia): Guia[] {
  const otros = GUIAS.filter((g) => g.slug !== guia.slug);
  if (guia.formato === "Ficha técnica") {
    const comparativa = otros.filter((g) => g.slug === "comparativa-cerraduras-digitales");
    return [...comparativa, ...otros.filter((g) => g.formato === "Ficha técnica")].slice(0, 3);
  }
  const mismoTema = otros.filter((g) => g.intereses.some((i) => guia.intereses.includes(i)));
  const primero = mismoTema.filter((g) => g.formato !== guia.formato && g.formato !== "Ficha técnica");
  return [...new Set([...primero, ...mismoTema, ...otros])].slice(0, 3);
}

/** Título como se muestra (los cursos llevan el prefijo). */
export function tituloDe(g: Guia): string {
  return g.formato === "Curso" ? `Curso: ${g.titulo}` : g.titulo;
}

/** Texto plano de la guía, para el wordCount del schema. */
export function textoPlano(g: Guia): string {
  return g.bloques
    .map((b) => {
      switch (b.tipo) {
        case "p": case "h": return b.texto;
        case "leccion": return b.titulo;
        case "lista": return b.items.join(" ");
        case "check": return [b.titulo ?? "", ...b.items].join(" ");
        case "pasos": return b.items.map((i) => `${i.titulo} ${i.texto}`).join(" ");
        case "nota": return `${b.titulo} ${b.texto}`;
        case "specs": return b.filas.flat().join(" ");
        case "comparativa": return [...b.columnas, ...b.filas.flat()].join(" ");
      }
    })
    .join(" ");
}
