/**
 * Contenido de las páginas de servicio.
 *
 * Cada entrada genera una página propia en `/[servicio].astro`. Son las
 * páginas que Google necesita para rankear "cámaras de seguridad Ushuaia",
 * "cerraduras digitales Tierra del Fuego", etc.: la home sola no alcanza
 * porque una URL solo puede competir por un tema a la vez.
 *
 * REGLA: acá no se inventa nada. Ni años de experiencia, ni cantidad de
 * clientes, ni precios, ni plazos, ni certificaciones. Solo servicios,
 * marcas y fotos que ya están confirmados en el proyecto.
 */

/**
 * `pos` es el `object-position` de la portada. Casi todas las fotos son
 * verticales de celular y la portada es un recorte apaisado: sin ajustar, el
 * centro puede dejar afuera justo la cerradura o el tablero.
 */
export type Foto = { src: string; alt: string; pos?: string };

export type Servicio = {
  slug: string;
  /** Etiqueta corta para nav, hub y enlaces internos. */
  nav: string;
  nombre: string;
  /** `serviceType` de schema.org. */
  tipoSchema: string;
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  h1: string;
  h1Destacado: string;
  lead: string;
  hero: Foto;
  /** Resumen de una línea para las tarjetas del hub y de la home. */
  resumen: string;
  problema: { titulo: string; texto: string; puntos: string[] };
  incluye: { titulo: string; texto: string }[];
  bloques: { numero: string; titulo: string; texto: string; foto?: Foto }[];
  paraQuien: { titulo: string; texto: string }[];
  galeria: Foto[];
  faqs: { pregunta: string; respuesta: string }[];
  /** Mensaje que aparece ya escrito al abrir WhatsApp desde esta página. */
  waMessage: string;
  relacionados: string[];
};

export const SERVICIOS: Servicio[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'camaras-de-seguridad-tierra-del-fuego',
    nav: 'Cámaras de seguridad',
    nombre: 'Instalación de cámaras de seguridad',
    tipoSchema: 'Instalación de cámaras de seguridad y CCTV',
    title: 'Cámaras de Seguridad en Ushuaia y Tierra del Fuego | INSOLVA Group',
    description:
      'Instalación de cámaras de seguridad en Ushuaia, Río Grande y Tolhuin. Cámaras IP y CCTV con acceso desde el celular, visión nocturna y grabación. Presupuesto por WhatsApp.',
    keywords:
      'cámaras de seguridad Ushuaia, instalación de cámaras Ushuaia, cámaras de seguridad Tierra del Fuego, CCTV Ushuaia, cámaras IP Ushuaia, cámaras Río Grande, videovigilancia Tierra del Fuego, empresa de cámaras Ushuaia',
    eyebrow: 'CÁMARAS DE SEGURIDAD · TIERRA DEL FUEGO',
    h1: 'Cámaras de seguridad',
    h1Destacado: 'en Ushuaia y Tierra del Fuego.',
    lead: 'Instalamos cámaras en casas, comercios y obras de Ushuaia, Río Grande y Tolhuin. Relevamos el lugar, definimos dónde va cada cámara para que no queden puntos ciegos, y te dejamos el sistema andando en el celular.',
    hero: {
      src: '/img/servicios/obra-camara-poste.webp',
      alt: 'Cámara de seguridad y reflector montados sobre un poste, con el canal Beagle de fondo, en una obra de Ushuaia',
    },
    resumen: 'Mirá tu casa o tu negocio en vivo desde el celular, de día y de noche.',
    problema: {
      titulo: 'La cámara importa menos que el lugar donde va.',
      texto:
        'La mayoría de las instalaciones que nos toca corregir tienen el mismo defecto: se compraron cámaras y se colgaron donde era cómodo pasar el cable, no donde hacía falta ver. El resultado es un sistema que graba el techo, el patio del vecino o una zona que ya se veía bien.',
      puntos: [
        'Puntos ciegos justo en la puerta, el portón o la caja.',
        'Cámaras contra la luz, que de día solo graban una silueta negra.',
        'Grabación que se pisa a los tres días y no sirve cuando pasa algo.',
        'Acceso remoto que nunca se terminó de configurar.',
      ],
    },
    incluye: [
      {
        titulo: 'Relevamiento del lugar',
        texto:
          'Vamos, miramos los accesos, los recorridos y la luz de cada ambiente, y definimos cuántas cámaras hacen falta de verdad y dónde va cada una.',
      },
      {
        titulo: 'Cámaras IP y CCTV',
        texto:
          'Trabajamos con Hikvision, Dahua, HiLook y EZVIZ. Elegimos el modelo según lo que hay que cubrir: domo para interiores, bullet para exteriores y frentes, o PTZ cuando hay que barrer un predio.',
      },
      {
        titulo: 'Visión nocturna',
        texto:
          'Cámaras con infrarrojo o con visión color nocturna, según el lugar. En Ushuaia esto importa: buena parte del año el negocio abre y cierra de noche.',
      },
      {
        titulo: 'Grabador NVR o DVR',
        texto:
          'Instalamos y configuramos el grabador con el disco dimensionado según cuántos días de video querés poder mirar para atrás.',
      },
      {
        titulo: 'Acceso desde el celular',
        texto:
          'Dejamos la app instalada y andando en tu teléfono, y te mostramos cómo usarla: ver en vivo, buscar una grabación y descargar un video.',
      },
      {
        titulo: 'Cableado y alimentación',
        texto:
          'Cableado PoE, canalización y alimentación resueltos como parte del trabajo. No dejamos cables colgando ni fichas a la intemperie.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'Primero miramos, después cotizamos',
        texto:
          'No vendemos kits cerrados de 4 u 8 cámaras. Vamos al lugar, vemos qué hay que cubrir y armamos la propuesta sobre eso. A veces son menos cámaras de las que pensabas, bien ubicadas; a veces hace falta una más en un lugar que no tenías en cuenta.',
        foto: {
          src: '/img/servicios/camaras-complejo.webp',
          alt: 'Dos cámaras de seguridad orientadas a ángulos distintos sobre el cerco de un complejo en Ushuaia',
        },
      },
      {
        numero: '02',
        titulo: 'Instalación pensada para el clima de acá',
        texto:
          'Viento, nieve, humedad y amplitud térmica. Los equipos van en gabinetes y posiciones que aguantan el invierno fueguino, con el cableado protegido y las conexiones selladas, para no estar volviendo a subir a un techo en julio.',
        foto: {
          src: '/img/servicios/camaras-alero-obra.webp',
          alt: 'Cámara de seguridad instalada bajo el alero de una vivienda, protegida del viento y la nieve',
        },
      },
      {
        numero: '03',
        titulo: 'Te lo dejamos funcionando y te enseñamos a usarlo',
        texto:
          'Un sistema que no sabés manejar no te sirve. Antes de irnos configuramos el acceso remoto, probamos que veas todo desde tu celular y te mostramos cómo buscar una grabación por fecha y hora.',
        foto: {
          src: '/img/servicios/camaras-domo-complejo.webp',
          alt: 'Técnico de INSOLVA Group instalando una cámara domo en un complejo de Ushuaia, con vista al canal Beagle',
        },
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas y departamentos',
        texto:
          'Frente, accesos, patio y cochera. Para ver quién toca el timbre, controlar la casa cuando viajás o mirar que los chicos llegaron.',
      },
      {
        titulo: 'Comercios y locales',
        texto:
          'Caja, depósito, salón y vereda. Para tener respaldo ante un faltante, un reclamo o un incidente, y para poder mirar el local desde afuera.',
      },
      {
        titulo: 'Obras y obradores',
        texto:
          'Cobertura del predio, materiales y acceso de vehículos, incluso en lugares donde todavía no hay luz de obra ni internet fijo.',
      },
    ],
    galeria: [
      { src: '/img/servicios/camaras-instalando-alero.webp', alt: 'Técnico de INSOLVA Group instalando una cámara bajo el alero de una obra' },
      { src: '/img/servicios/camaras-ptz-detalle.webp', alt: 'Detalle de una cámara PTZ motorizada con su caja estanca de conexiones' },
      { src: '/img/servicios/camaras-viga-madera.webp', alt: 'Cámara de seguridad EZVIZ con su caja de conexiones, montada sobre una viga de madera en una galería de Ushuaia' },
      { src: '/img/servicios/camaras-galeria-madera.webp', alt: 'Galería de madera con una cámara de seguridad instalada y las herramientas del técnico sobre el muro' },
      { src: '/img/servicios/camaras-casa-03.webp', alt: 'Cámara de seguridad domiciliaria instalada por INSOLVA Group' },
      { src: '/img/trabajos/restaurante-04.webp', alt: 'Cámara domo integrada al cielorraso de un restaurante de Ushuaia' },
    ],
    faqs: [
      {
        pregunta: '¿Cuántas cámaras necesito para mi casa o mi negocio?',
        respuesta:
          'Depende de los accesos y de la superficie que quieras cubrir, no de los metros cuadrados. Por eso vamos primero a relevar el lugar: recién ahí te podemos decir cuántas cámaras hacen falta y dónde va cada una. El relevamiento lo coordinamos por WhatsApp.',
      },
      {
        pregunta: '¿Puedo ver las cámaras desde el celular estando fuera de Ushuaia?',
        respuesta:
          'Sí. Configuramos el acceso remoto y dejamos la app andando en tu teléfono, así podés mirar en vivo y revisar grabaciones desde cualquier lugar con internet. Es parte de la instalación, no un extra.',
      },
      {
        pregunta: '¿Cuántos días de grabación quedan guardados?',
        respuesta:
          'Depende del disco que se instale, de la cantidad de cámaras y de la calidad de grabación. Lo definimos con vos antes de comprar el equipo: nos decís cuántos días querés poder mirar para atrás y dimensionamos el grabador para eso.',
      },
      {
        pregunta: '¿Las cámaras funcionan de noche y con nieve?',
        respuesta:
          'Sí. Usamos cámaras con visión nocturna y las instalamos en posiciones y gabinetes preparados para el clima fueguino. La elección del modelo depende de cada punto: no es lo mismo un frente expuesto al viento que un interior.',
      },
      {
        pregunta: '¿Trabajan en Río Grande y Tolhuin?',
        respuesta:
          'Sí, damos servicio en Ushuaia, Río Grande y Tolhuin. Escribinos por WhatsApp contándonos dónde es y qué necesitás y coordinamos.',
      },
      {
        pregunta: '¿Qué marcas de cámaras instalan?',
        respuesta:
          'Hikvision, Dahua, HiLook y EZVIZ. Son marcas con repuestos y soporte reales, no equipos genéricos que en dos años no se pueden reemplazar.',
      },
    ],
    waMessage:
      'Hola INSOLVA, quiero un presupuesto de cámaras de seguridad para mi casa/negocio en Tierra del Fuego.',
    relacionados: ['alarmas-tierra-del-fuego', 'redes-wifi-tierra-del-fuego', 'electricidad-tierra-del-fuego'],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'cerraduras-digitales-tierra-del-fuego',
    nav: 'Cerraduras digitales',
    nombre: 'Instalación de cerraduras digitales y control de acceso',
    tipoSchema: 'Instalación de cerraduras digitales y control de acceso',
    title: 'Cerraduras Digitales en Ushuaia y Tierra del Fuego | INSOLVA Group',
    description:
      'Instalación de cerraduras digitales y control de acceso en Ushuaia, Río Grande y Tolhuin. Apertura por huella, código, tarjeta o celular para casas, departamentos y alquileres temporarios.',
    keywords:
      'cerraduras digitales Ushuaia, cerradura digital Tierra del Fuego, cerraduras inteligentes Ushuaia, control de acceso Ushuaia, cerradura con huella Ushuaia, cerradura para departamento Ushuaia, cerradura alquiler temporario Ushuaia',
    eyebrow: 'CERRADURAS DIGITALES · TIERRA DEL FUEGO',
    h1: 'Cerraduras digitales',
    h1Destacado: 'en Ushuaia y Tierra del Fuego.',
    lead: 'Instalamos cerraduras digitales en casas, departamentos, cabañas y alquileres temporarios. Entrás con huella, código, tarjeta o desde el celular, y dejás de depender de una llave que se pierde, se copia o se queda adentro.',
    hero: {
      src: '/img/servicios/cerraduras-puerta-terminada.webp',
      alt: 'Puerta de madera de un complejo de Ushuaia con una cerradura digital negra ya instalada',
      pos: '50% 66%',
    },
    resumen: 'Entrá con huella, código o celular. Sin llaves, sin copias dando vueltas.',
    problema: {
      titulo: 'La llave es el eslabón flojo.',
      texto:
        'Una llave se pierde, se copia sin que te enteres y no deja ningún registro. Si alquilás por temporada, además, cada huésped necesita una copia y alguien tiene que estar ahí para entregarla y recuperarla.',
      puntos: [
        'Copias de llave que quedaron en manos de gente que ya no vive ahí.',
        'Coordinar entregas de llave a cualquier hora con huéspedes que llegan de noche.',
        'Quedarte afuera porque la llave se quedó adentro.',
        'No saber quién entró ni a qué hora.',
      ],
    },
    incluye: [
      {
        titulo: 'Relevamiento de la puerta',
        texto:
          'Medimos la puerta, el tipo de hoja y la cerradura actual antes de recomendarte un modelo. No toda cerradura digital entra en toda puerta.',
      },
      {
        titulo: 'Apertura por huella y código',
        texto:
          'Huella dactilar y clave numérica como métodos principales, con llave física de respaldo siempre disponible.',
      },
      {
        titulo: 'Apertura por celular y tarjeta',
        texto:
          'Según el modelo, apertura desde la app y con tarjeta o llavero de proximidad, para sumar métodos sin sumar llaves.',
      },
      {
        titulo: 'Códigos temporales para huéspedes',
        texto:
          'En los modelos que lo permiten, generás un código que funciona solo durante la estadía y después se vence solo. Ideal para alquiler temporario.',
      },
      {
        titulo: 'Instalación y configuración',
        texto:
          'Hacemos la instalación completa, cargamos las huellas y los códigos con vos, y te mostramos cómo agregar o borrar usuarios después.',
      },
      {
        titulo: 'Integración con el resto del sistema',
        texto:
          'Si ya tenés cámaras o automatización, dejamos la cerradura funcionando dentro del mismo esquema en lugar de sumarte otra app suelta.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'Para alquiler temporario, cambia el negocio',
        texto:
          'Con códigos que vencen solos, dejás de coordinar entregas de llave a las once de la noche y dejás de perder copias entre huésped y huésped. Cada estadía tiene su código y se vence cuando termina.',
        foto: {
          src: '/img/servicios/cerraduras-teclado.webp',
          alt: 'Persona abriendo una cerradura digital con el teclado numérico iluminado',
        },
      },
      {
        numero: '02',
        titulo: 'Sin llaves, pero con respaldo',
        texto:
          'Todas las cerraduras que instalamos tienen llave física de emergencia y aviso de batería baja. La idea es sacarte la llave de encima todos los días, no dejarte sin forma de entrar.',
        foto: {
          src: '/img/servicios/cerraduras-instalacion.webp',
          alt: 'Instalación del mecanismo de una cerradura digital en el canto de una puerta de madera',
        },
      },
      {
        numero: '03',
        titulo: 'Cada puerta se mide antes de comprar nada',
        texto:
          'No toda cerradura digital entra en toda puerta. Medimos el espesor de la hoja, la distancia del eje y la cerradura que tenga hoy con la plantilla del fabricante, y recién ahí te decimos qué modelo se puede instalar. Es lo que evita que compres algo que después no entra.',
        foto: {
          src: '/img/servicios/cerraduras-medicion.webp',
          alt: 'Técnico de INSOLVA Group midiendo una puerta con la plantilla de perforación antes de instalar una cerradura digital',
        },
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas y departamentos',
        texto:
          'Para no depender de la llave y para que cada integrante de la familia entre con su huella, sin repartir copias.',
      },
      {
        titulo: 'Alquiler temporario y cabañas',
        texto:
          'Códigos por estadía, check-in sin estar presente y cero llaves perdidas entre huésped y huésped.',
      },
      {
        titulo: 'Comercios y oficinas',
        texto:
          'Accesos por persona y por horario, y la posibilidad de dar de baja a alguien sin cambiar la cerradura.',
      },
    ],
    galeria: [
      { src: '/img/servicios/cerraduras-terminada.webp', alt: 'Cerradura digital con teclado y lector de huella terminada en una puerta de madera' },
      { src: '/img/servicios/cerraduras-conexion-cable.webp', alt: 'Técnico de INSOLVA Group conectando el cable de una cerradura digital durante la instalación' },
      { src: '/img/servicios/cerraduras-casa-01.webp', alt: 'Cerradura digital EZVIZ instalada en una puerta de madera en Ushuaia' },
      { src: '/img/servicios/cerraduras-departamentos-01.webp', alt: 'Cerradura digital instalada en un departamento de Ushuaia' },
      { src: '/img/servicios/cerraduras-departamentos-02.webp', alt: 'Cerradura digital con teclado numérico instalada por INSOLVA Group' },
      { src: '/img/servicios/cerraduras-departamentos-03.webp', alt: 'Instalación de cerradura digital en el acceso de un departamento' },
    ],
    faqs: [
      {
        pregunta: '¿La cerradura digital entra en cualquier puerta?',
        respuesta:
          'No en cualquiera. Depende del espesor de la hoja, del tipo de puerta y de la cerradura que tenga hoy. Por eso relevamos la puerta antes de recomendarte un modelo: así evitamos que compres algo que después no se puede instalar.',
      },
      {
        pregunta: '¿Qué pasa si se queda sin batería?',
        respuesta:
          'Las cerraduras avisan con anticipación cuando la batería está baja, y además tienen llave física de emergencia. En muchos modelos se puede alimentar desde afuera con una batería externa, abrir y cambiar las pilas.',
      },
      {
        pregunta: '¿Puedo darle un código a un huésped y que se venza solo?',
        respuesta:
          'Sí, en los modelos que manejan códigos temporales. Se genera un código para la estadía y deja de funcionar cuando termina, sin que tengas que ir a borrarlo.',
      },
      {
        pregunta: '¿Se puede abrir desde el celular?',
        respuesta:
          'Depende del modelo. Algunos trabajan solo con huella, código y tarjeta, y otros suman apertura por app. Te decimos cuál hace lo que necesitás antes de comprar.',
      },
      {
        pregunta: '¿Sirve para un edificio con varios accesos?',
        respuesta:
          'Sí. Cuando hay varias puertas o varias personas conviene pasar a un esquema de control de acceso en lugar de cerraduras sueltas. Lo armamos según cuántos accesos y cuántos usuarios haya.',
      },
    ],
    waMessage:
      'Hola INSOLVA, quiero un presupuesto de cerraduras digitales para mi casa/departamento en Tierra del Fuego.',
    relacionados: ['domotica-tierra-del-fuego', 'camaras-de-seguridad-tierra-del-fuego', 'alarmas-tierra-del-fuego'],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'alarmas-tierra-del-fuego',
    nav: 'Alarmas',
    nombre: 'Instalación de alarmas',
    tipoSchema: 'Instalación de sistemas de alarma',
    title: 'Alarmas para Casa y Negocio en Ushuaia | INSOLVA Group',
    description:
      'Instalación de alarmas en Ushuaia, Río Grande y Tolhuin. Sensores, sirena y aviso al celular al instante, integrados con tus cámaras. Presupuesto por WhatsApp.',
    keywords:
      'alarmas Ushuaia, empresa de alarmas Ushuaia, alarmas para casa Ushuaia, alarma para negocio Ushuaia, alarmas Tierra del Fuego, sensores de movimiento Ushuaia, sistema de alarma Río Grande',
    eyebrow: 'ALARMAS · TIERRA DEL FUEGO',
    h1: 'Alarmas para casa y negocio',
    h1Destacado: 'en Tierra del Fuego.',
    lead: 'Una cámara te deja ver lo que pasó. Una alarma te avisa mientras está pasando. Instalamos sistemas de alarma con sensores, sirena y notificación al celular, integrados con las cámaras para que sepas qué disparó el aviso.',
    hero: {
      src: '/img/servicios/alarmas-central-hikvision.webp',
      alt: 'Central de alarma Hikvision instalada en una vivienda, con el indicador verde encendido',
      pos: '50% 34%',
    },
    resumen: 'Te avisa al instante en el celular, con el video de lo que lo disparó.',
    problema: {
      titulo: 'Enterarte al otro día ya es tarde.',
      texto:
        'Un sistema de cámaras solo cumple la mitad del trabajo: registra. Si nadie está mirando la app en ese momento, te enterás cuando llegás. La alarma es la parte que te interrumpe el día para avisarte que algo está pasando ahora.',
      puntos: [
        'Abrir el local a la mañana y recién ahí darte cuenta.',
        'Recibir una notificación de movimiento y no saber si es el gato o alguien.',
        'Sirenas que suenan sin que nadie se entere si el local está lejos.',
        'Sistemas que se desarman solos cuando se corta la luz.',
      ],
    },
    incluye: [
      {
        titulo: 'Sensores y detectores',
        texto:
          'Sensores en los puntos donde alguien tiene que pasar sí o sí y contactos magnéticos en puertas y ventanas que dan al exterior. También instalamos detectores de humo.',
      },
      {
        titulo: 'Aviso al celular al instante',
        texto:
          'Notificación en el momento en que se dispara, no un resumen al final del día.',
      },
      {
        titulo: 'Verificación con video',
        texto:
          'Integrada con tus cámaras, la alarma te deja ver qué la disparó antes de decidir qué hacer. Menos falsas alarmas y menos viajes al pedo.',
      },
      {
        titulo: 'Sirena interior y exterior',
        texto:
          'Sirena que actúa sobre el que entró y avisa alrededor, dimensionada según si es una casa, un local o un galpón.',
      },
      {
        titulo: 'Batería de respaldo',
        texto:
          'El sistema sigue funcionando durante un corte de luz. En Tierra del Fuego esto no es un detalle.',
      },
      {
        titulo: 'Particiones y usuarios',
        texto:
          'Armar solo una parte del lugar, o que cada persona tenga su propio código, según cómo se use el espacio.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'Alarma y cámaras, un solo sistema',
        texto:
          'Cuando la alarma y las cámaras son dos sistemas separados, terminás con dos apps y ninguna certeza. Integradas, la notificación te llega con el video del sector que se activó: en dos segundos sabés si tenés que preocuparte.',
        foto: {
          src: '/img/servicios/alarmas-sensor-magnetico.webp',
          alt: 'Contacto magnético de apertura instalado en el marco de una ventana de madera',
        },
      },
      {
        numero: '02',
        titulo: 'Menos sensores, mejor puestos',
        texto:
          'No se trata de llenar la casa de sensores. Se trata de cubrir los puntos por los que alguien tiene que pasar para llegar a donde está lo que te importa. Eso baja las falsas alarmas, que es lo que hace que la gente termine dejando la alarma desactivada.',
        foto: {
          src: '/img/servicios/alarmas-detector-humo.webp',
          alt: 'Detector de humo instalado en el cielorraso de una vivienda',
        },
      },
      {
        numero: '03',
        titulo: 'Que la puedas usar todos los días',
        texto:
          'Una alarma que es un lío de activar se deja de activar. Configuramos los modos y los usuarios con vos, pensando en cómo entrás y salís, no en cómo viene de fábrica.',
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas',
        texto:
          'Para cuando no hay nadie, y también para la noche: armar solo la planta baja o los accesos mientras la familia duerme.',
      },
      {
        titulo: 'Comercios',
        texto:
          'Aviso inmediato fuera del horario de atención y respaldo en video de lo que pasó, sin depender de que alguien esté mirando.',
      },
      {
        titulo: 'Obras y depósitos',
        texto:
          'Protección de materiales y herramientas en lugares que quedan solos entre jornada y jornada.',
      },
    ],
    // Sin galería por ahora: hay solo 3 fotos propias de alarmas y ya están en la
    // portada y en los bloques. La plantilla oculta la galería si no hay fotos.
    galeria: [],
    faqs: [
      {
        pregunta: '¿La alarma anda si se corta la luz?',
        respuesta:
          'Sí. Los sistemas que instalamos llevan batería de respaldo, así que siguen funcionando durante un corte. Lo que sí necesitás para que el aviso llegue al celular es que haya conectividad; si el lugar tiene cortes frecuentes de internet, lo contemplamos en el diseño.',
      },
      {
        pregunta: '¿Se puede integrar con las cámaras que ya tengo?',
        respuesta:
          'En muchos casos sí, depende de la marca y del modelo de lo que tengas instalado. Lo revisamos en el relevamiento y te decimos si conviene integrar lo existente o si es mejor unificar.',
      },
      {
        pregunta: '¿Qué pasa cuando se dispara?',
        respuesta:
          'Suena la sirena y te llega la notificación al celular en el momento. Si el sistema está integrado con las cámaras, además podés ver el video del sector que se activó para saber qué la disparó.',
      },
      {
        pregunta: '¿Tiene abono mensual?',
        respuesta:
          'La instalación y el sistema que te dejamos funcionando son tuyos y no dependen de un abono nuestro. Si querés sumar un servicio de monitoreo con terceros, es una decisión aparte que podemos conversar.',
      },
      {
        pregunta: '¿Sirve para un local con mucho movimiento?',
        respuesta:
          'Sí, pero el diseño cambia: se usan particiones para armar solo los sectores que quedan cerrados y se eligen sensores que no se disparen con el movimiento normal del local. Eso se define relevando el lugar.',
      },
    ],
    waMessage:
      'Hola INSOLVA, quiero un presupuesto de alarma para mi casa/negocio en Tierra del Fuego.',
    relacionados: ['camaras-de-seguridad-tierra-del-fuego', 'cerraduras-digitales-tierra-del-fuego', 'electricidad-tierra-del-fuego'],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'domotica-tierra-del-fuego',
    nav: 'Domótica',
    nombre: 'Domótica y automatización del hogar',
    tipoSchema: 'Domótica y automatización del hogar',
    title: 'Domótica y Automatización del Hogar en Ushuaia | INSOLVA Group',
    description:
      'Domótica en Ushuaia y Tierra del Fuego: luces, calefacción, portones y accesos controlados desde el celular. Compatible con Alexa y Google. Presupuesto por WhatsApp.',
    keywords:
      'domótica Ushuaia, automatización del hogar Ushuaia, domótica Tierra del Fuego, casa inteligente Ushuaia, termostato inteligente Ushuaia, control de luces por celular Ushuaia, automatización Río Grande',
    eyebrow: 'AUTOMATIZACIÓN DEL HOGAR · TIERRA DEL FUEGO',
    h1: 'Automatización del hogar',
    h1Destacado: 'en Ushuaia y Tierra del Fuego.',
    lead: 'Luces, calefacción, portones y accesos que responden desde el celular o solos, según la hora y el uso real de la casa. Automatización pensada para que te saque trabajo de encima todos los días, no para mostrarla en una visita.',
    hero: {
      src: '/img/servicios/domotica-termostato.webp',
      alt: 'Termostato inteligente instalado en una vivienda de Ushuaia',
    },
    resumen: 'Luces, calefacción, portones y accesos controlados desde una app.',
    problema: {
      titulo: 'Automatizar bien es automatizar poco.',
      texto:
        'La mayoría de las casas "inteligentes" terminan con cinco apps distintas, la mitad de los dispositivos desconectados y nadie usando nada. Lo que sirve es automatizar las tres o cuatro cosas que hacés todos los días, y que funcionen sin pensarlas.',
      puntos: [
        'Una app por marca y ninguna que controle todo junto.',
        'Calefacción a full en una casa vacía todo el día.',
        'Bajar a apagar luces que quedaron prendidas en otra planta.',
        'Automatizaciones que se rompen cada vez que se corta internet.',
      ],
    },
    incluye: [
      {
        titulo: 'Control de iluminación',
        texto:
          'Encendido y apagado desde el celular, por horario o por escena. Útil sobre todo en casas de dos plantas y en exteriores.',
      },
      {
        titulo: 'Climatización y termostatos',
        texto:
          'Programación de la calefacción por horario y por ambiente, para no calefaccionar la casa entera cuando no hay nadie.',
      },
      {
        titulo: 'Portones y accesos',
        texto:
          'Apertura de portón desde el celular, sin depender de un control remoto que se queda en el otro auto.',
      },
      {
        titulo: 'Cerraduras inteligentes',
        texto:
          'Integradas al mismo esquema, para que el acceso no sea otra app suelta más.',
      },
      {
        titulo: 'Sensores y escenas',
        texto:
          'Sensores de apertura, movimiento y temperatura que disparan acciones concretas: llegar y que se prenda la entrada, salir y que se apague todo.',
      },
      {
        titulo: 'Compatible con Alexa y Google',
        texto:
          'Control por voz cuando tiene sentido, sobre lo que ya funciona bien desde la app.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'Empezamos por lo que hacés todos los días',
        texto:
          'La primera pregunta es qué cosas repetís todos los días y te molestan. Los dispositivos salen de ahí. Sobre esas armamos la automatización. Lo demás se puede sumar después, cuando el sistema ya esté funcionando.',
        foto: {
          src: '/img/servicios/domotica-termostato.webp',
          alt: 'Termostato inteligente para control de calefacción en Tierra del Fuego',
        },
      },
      {
        numero: '02',
        titulo: 'La calefacción es donde más se nota',
        texto:
          'En Ushuaia la calefacción funciona buena parte del año. Programarla por horario y por ambiente, en lugar de dejarla igual todo el día, es la automatización que más rápido se siente en una casa de acá.',
      },
      {
        numero: '03',
        titulo: 'Una sola app, y que siga andando sin internet',
        texto:
          'Unificamos todo lo que se pueda en un mismo control, y dejamos que lo esencial siga funcionando de forma local: si se cae internet, las luces y los accesos tienen que seguir andando desde la pared.',
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas',
        texto:
          'Iluminación, calefacción y accesos. Sobre todo en casas de dos plantas o con mucho exterior.',
      },
      {
        titulo: 'Cabañas y alquiler temporario',
        texto:
          'Calefacción programada antes de que llegue el huésped y accesos sin llave, sin que tengas que estar ahí.',
      },
      {
        titulo: 'Comercios',
        texto:
          'Encendido y apagado por horario de luces y cartelería, y accesos controlados por persona.',
      },
    ],
    // Una sola foto propia de domótica. Las dos de cerraduras que había acá no
    // son de este servicio y ya viven en la galería de Cerraduras.
    galeria: [
      { src: '/img/servicios/domotica-termostato.webp', alt: 'Termostato inteligente instalado en una vivienda de Ushuaia' },
    ],
    faqs: [
      {
        pregunta: '¿Necesito una casa nueva para automatizar?',
        respuesta:
          'No. Buena parte de la automatización se puede sumar a una casa que ya está terminada, usando dispositivos que reemplazan llaves y tomas existentes. Lo que sí conviene planificar desde la obra es el cableado, porque después implica romper.',
      },
      {
        pregunta: '¿Funciona si se corta internet?',
        respuesta:
          'Las funciones locales sí: las luces y los accesos siguen respondiendo desde la pared y desde los dispositivos. Lo que se pierde mientras no hay conexión es el control remoto desde afuera y el control por voz.',
      },
      {
        pregunta: '¿Se puede controlar todo desde una sola app?',
        respuesta:
          'Es el objetivo con el que armamos el sistema. Elegimos dispositivos que convivan en un mismo control en lugar de sumar una app por marca. Cuando algo queda afuera, te lo decimos antes de instalarlo.',
      },
      {
        pregunta: '¿Anda con Alexa o Google?',
        respuesta:
          'Sí, los equipos que usamos son compatibles con Alexa y Google. El control por voz lo sumamos sobre lo que ya funciona bien desde la app, no como reemplazo.',
      },
      {
        pregunta: '¿Puedo empezar por poco y sumar después?',
        respuesta:
          'Sí, y es lo que solemos recomendar. Se arranca por lo que usás todos los días (calefacción, accesos, iluminación exterior) y el sistema queda preparado para sumar el resto más adelante.',
      },
    ],
    waMessage:
      'Hola INSOLVA, quiero automatizar mi casa en Tierra del Fuego (luces, calefacción, accesos).',
    relacionados: ['cerraduras-digitales-tierra-del-fuego', 'redes-wifi-tierra-del-fuego', 'electricidad-tierra-del-fuego'],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'redes-wifi-tierra-del-fuego',
    nav: 'Redes WiFi',
    nombre: 'Redes WiFi, cableado y Starlink',
    tipoSchema: 'Instalación de redes WiFi y cableado estructurado',
    title: 'Redes WiFi y Starlink en Ushuaia y Tierra del Fuego | INSOLVA Group',
    description:
      'Instalación de redes WiFi, cableado estructurado y antenas Starlink en Ushuaia, Río Grande y Tolhuin. Cobertura pareja para casas, comercios y obradores sin fibra.',
    keywords:
      'redes WiFi Ushuaia, instalación de redes Ushuaia, Starlink Ushuaia, Starlink Tierra del Fuego, cableado estructurado Ushuaia, WiFi para comercio Ushuaia, internet en obra Tierra del Fuego, access point Ushuaia',
    eyebrow: 'REDES E INFRAESTRUCTURA · TIERRA DEL FUEGO',
    h1: 'Redes WiFi, cableado y Starlink',
    h1Destacado: 'en Tierra del Fuego.',
    lead: 'Una red que no se ve, pero se nota. Instalamos WiFi con cobertura pareja, cableado estructurado y antenas Starlink donde no llega la fibra: casas grandes, comercios, cabañas y obradores.',
    hero: {
      src: '/img/servicios/redes-starlink-instalacion.webp',
      alt: 'Técnico de INSOLVA Group montando una antena Starlink en el frente de una vivienda de Tierra del Fuego',
    },
    resumen: 'Internet sin zonas muertas, y conexión donde no llega la fibra.',
    problema: {
      titulo: 'El problema casi nunca es el proveedor.',
      texto:
        'Cuando el WiFi anda mal, la primera reacción es contratar más megas. Pero en la mayoría de las casas y locales el cuello de botella está adentro: un solo router tratando de cubrir un lugar para el que no alcanza.',
      puntos: [
        'Una habitación o un depósito donde el WiFi no llega.',
        'Videollamadas que se cortan siempre en el mismo lugar de la casa.',
        'El router en un rincón, al lado de donde entró el cable, no donde hace falta.',
        'Cámaras que se desconectan solas porque la red no las banca.',
      ],
    },
    incluye: [
      {
        titulo: 'Relevamiento de cobertura',
        texto:
          'Medimos dónde llega la señal y dónde se cae antes de proponerte equipos. Así sabemos si hace falta un access point más o alcanza con mover lo que ya tenés.',
      },
      {
        titulo: 'Access points y WiFi en malla',
        texto:
          'Cobertura pareja en toda la casa o el local, con un solo nombre de red y sin tener que andar cambiando de red al pasar de ambiente.',
      },
      {
        titulo: 'Cableado estructurado',
        texto:
          'Bocas de red donde hacen falta, canalizadas y rotuladas. Es lo que después sostiene las cámaras, los access points y el trabajo desde casa.',
      },
      {
        titulo: 'Switches y PoE',
        texto:
          'Switches con PoE para alimentar cámaras y access points por el mismo cable de red, sin tener que llevar un toma a cada punto.',
      },
      {
        titulo: 'Antenas Starlink',
        texto:
          'Instalación y puesta en marcha de Starlink en lugares sin fibra: obradores, cabañas y zonas donde la conexión tradicional no llega.',
      },
      {
        titulo: 'Base para las cámaras',
        texto:
          'La red es lo que sostiene el sistema de seguridad. Si el WiFi es inestable, las cámaras se caen: por eso las dos cosas se diseñan juntas.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'Primero medimos, después compramos',
        texto:
          'Antes de recomendarte equipos medimos la cobertura real en el lugar. Muchas veces el problema se resuelve reubicando lo que ya tenés y sumando un punto, no cambiando todo.',
      },
      {
        numero: '02',
        titulo: 'Starlink donde no llega la fibra',
        texto:
          'Para obradores, cabañas y zonas sin conexión fija, instalamos y dejamos funcionando antenas Starlink. Es lo que permite tener internet y cámaras en un lugar donde antes no había nada.',
        foto: {
          src: '/img/servicios/obra-starlink-camara.webp',
          alt: 'Antena Starlink y cámara de seguridad montadas sobre un poste en una obra frente al canal Beagle',
        },
      },
      {
        numero: '03',
        titulo: 'Cableado hoy, para no romper mañana',
        texto:
          'Si estás en obra, este es el momento de dejar las bocas de red donde van a hacer falta. Pasar un cable antes de cerrar la pared cuesta una fracción de lo que cuesta después.',
        foto: {
          src: '/img/servicios/obra-cableado-steelframe.webp',
          alt: 'Cableado y canalizaciones pasados dentro de un tabique de steel frame, antes de cerrar la pared',
        },
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas grandes y de dos plantas',
        texto:
          'Donde un solo router no alcanza y siempre hay un ambiente con mala señal.',
      },
      {
        titulo: 'Comercios y oficinas',
        texto:
          'Red separada para el trabajo y para los clientes, y cobertura en depósito y salón.',
      },
      {
        titulo: 'Obras, obradores y cabañas',
        texto:
          'Conectividad donde no hay fibra, con Starlink, para poder trabajar y monitorear el lugar.',
      },
    ],
    galeria: [
      { src: '/img/servicios/redes-starlink-instalacion.webp', alt: 'Montaje de una antena Starlink en el frente de una vivienda de Tierra del Fuego' },
      { src: '/img/servicios/obra-starlink-camara.webp', alt: 'Antena Starlink dando conectividad a una obra frente al canal Beagle' },
      { src: '/img/servicios/obra-cableado-steelframe.webp', alt: 'Cableado y canalizaciones pasados dentro de un tabique de steel frame, antes de cerrar la pared' },
      { src: '/img/servicios/redes-starlink.webp', alt: 'Antena Starlink instalada por INSOLVA Group en Tierra del Fuego' },
    ],
    faqs: [
      {
        pregunta: 'Tengo buena velocidad contratada pero el WiFi anda mal. ¿Por qué?',
        respuesta:
          'Casi siempre es un problema de cobertura, no de velocidad. Un solo router tiene que atravesar paredes y losas para llegar a todos lados, y no llega. Se resuelve sumando access points en los puntos correctos, no contratando más megas.',
      },
      {
        pregunta: '¿Instalan Starlink?',
        respuesta:
          'Sí. Instalamos y dejamos funcionando antenas Starlink, sobre todo en obradores, cabañas y lugares sin fibra. El servicio con Starlink lo contratás vos; nosotros hacemos la instalación, el montaje y la puesta en marcha.',
      },
      {
        pregunta: '¿Hace falta cablear o alcanza con WiFi?',
        respuesta:
          'Depende del lugar. El WiFi resuelve la mayoría de los usos cotidianos, pero los access points y las cámaras andan mucho mejor cableados. Si estás en obra, conviene dejar el cableado hecho aunque después uses casi todo por WiFi.',
      },
      {
        pregunta: '¿Pueden mejorar la red que ya tengo sin cambiar todo?',
        respuesta:
          'Muchas veces sí. Relevamos la cobertura, vemos qué equipos tenés y te decimos qué conviene reubicar, qué sumar y qué quedó corto. No cambiamos equipos que todavía sirven.',
      },
      {
        pregunta: '¿Por qué se me desconectan las cámaras?',
        respuesta:
          'Suele ser la red, no las cámaras. Varias cámaras transmitiendo por WiFi sobre una red que no está dimensionada para eso terminan cortándose. Por eso diseñamos la red y el sistema de cámaras juntos.',
      },
    ],
    waMessage:
      'Hola INSOLVA, quiero mejorar la red WiFi / instalar Starlink en mi casa, negocio u obra en Tierra del Fuego.',
    relacionados: ['camaras-de-seguridad-tierra-del-fuego', 'electricidad-tierra-del-fuego', 'domotica-tierra-del-fuego'],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'electricidad-tierra-del-fuego',
    nav: 'Electricidad',
    nombre: 'Instalaciones eléctricas',
    tipoSchema: 'Instalaciones eléctricas',
    title: 'Electricista e Instalaciones Eléctricas en Ushuaia | INSOLVA Group',
    description:
      'Instalaciones eléctricas en Ushuaia, Río Grande y Tolhuin: tableros, cableado, puesta a tierra y reformas para casas, comercios y obras. Presupuesto por WhatsApp.',
    keywords:
      'electricista Ushuaia, instalaciones eléctricas Ushuaia, electricista Tierra del Fuego, tablero eléctrico Ushuaia, cableado Ushuaia, puesta a tierra Ushuaia, electricista matriculado Ushuaia, instalación eléctrica obra Tierra del Fuego',
    eyebrow: 'INSTALACIONES ELÉCTRICAS · TIERRA DEL FUEGO',
    h1: 'Instalaciones eléctricas',
    h1Destacado: 'en Ushuaia y Tierra del Fuego.',
    lead: 'Instalaciones nuevas, reformas, tableros y puesta a tierra para casas, comercios y obras. Es la base sobre la que después se apoyan las cámaras, la red y la automatización: por eso preferimos hacerla nosotros o revisarla antes de instalar nada encima.',
    hero: {
      src: '/img/servicios/electricidad-caja-cables.webp',
      alt: 'Caja eléctrica en un tabique de steel frame con los cables rojo, azul y verde y amarillo ya pasados, en una obra de Tierra del Fuego',
      pos: '50% 62%',
    },
    resumen: 'Tableros, cableado y puesta a tierra para casa, negocio u obra.',
    problema: {
      titulo: 'Todo lo demás se apoya acá.',
      texto:
        'Las cámaras, la red y la automatización dependen de que haya alimentación en el lugar correcto y de que el tablero esté en condiciones. Cuando la instalación eléctrica está improvisada, los problemas aparecen después y parecen problemas de otra cosa.',
      puntos: [
        'Térmicas que saltan cuando se enciende más de un equipo.',
        'Tableros sin identificar, donde nadie sabe qué corta cada llave.',
        'Prolongaciones permanentes haciendo de instalación fija.',
        'Cámaras o access points sin un toma cerca, resueltos con un cable colgando.',
      ],
    },
    incluye: [
      {
        titulo: 'Instalaciones nuevas',
        texto:
          'Instalación eléctrica completa para obra nueva o ampliación, replanteada desde el plano junto al resto de la infraestructura.',
      },
      {
        titulo: 'Reformas y ampliaciones',
        texto:
          'Sumar circuitos, bocas y tomas en instalaciones existentes, o rehacer lo que quedó corto cuando cambió el uso del lugar.',
      },
      {
        titulo: 'Tableros',
        texto:
          'Armado y normalización de tableros, con circuitos separados, protecciones acordes y todo identificado.',
      },
      {
        titulo: 'Puesta a tierra',
        texto:
          'Puesta a tierra y protección diferencial: la parte que no se ve y es la que protege a las personas.',
      },
      {
        titulo: 'Canalizaciones y cableado',
        texto:
          'Cableado canalizado y prolijo, dimensionado según el consumo real de cada circuito.',
      },
      {
        titulo: 'Puntos para tecnología',
        texto:
          'Alimentación prevista donde después van las cámaras, los access points, el portón o el tablero de datos.',
      },
    ],
    bloques: [
      {
        numero: '01',
        titulo: 'La tecnología se planifica antes de cerrar las paredes',
        texto:
          'Si estás en obra, este es el momento más barato para resolverlo todo junto: dónde van las cámaras, por dónde pasa la red, dónde hace falta alimentación y qué tiene que quedar previsto en el tablero. Después de cerrar las paredes, cada agregado implica romper.',
        foto: {
          src: '/img/servicios/electricidad-casa-02.webp',
          alt: 'Replanteo de una caja eléctrica con nivel láser antes de cerrar la pared, en una obra de Tierra del Fuego',
        },
      },
      {
        numero: '02',
        titulo: 'Un tablero que se entienda',
        texto:
          'Circuitos separados, protecciones acordes a lo que cuelga de cada uno y todo rotulado. Cuando algo falla, tenés que poder saber qué llave bajar sin llamar a nadie.',
        foto: {
          src: '/img/servicios/electricidad-tablero.webp',
          alt: 'Tablero eléctrico con térmicas y disyuntores diferenciales, cableado prolijo y circuitos separados',
        },
      },
      {
        numero: '03',
        titulo: 'Preparada para lo que venga después',
        texto:
          'Dejamos previstos los puntos de alimentación y las canalizaciones para sumar cámaras, red o automatización más adelante, aunque hoy no los instales. Es la diferencia entre agregar algo en una tarde o tener que rehacer media instalación.',
        foto: {
          src: '/img/servicios/electricidad-canalizacion.webp',
          alt: 'Canalizaciones corrugadas y cableado pasados dentro de un tabique de steel frame, antes de terminar de cerrar la pared',
        },
      },
    ],
    paraQuien: [
      {
        titulo: 'Casas',
        texto:
          'Instalaciones nuevas, reformas y normalización de tableros en viviendas de Ushuaia, Río Grande y Tolhuin.',
      },
      {
        titulo: 'Comercios',
        texto:
          'Circuitos e iluminación dimensionados para el uso real del local, y tableros en condiciones.',
      },
      {
        titulo: 'Obras e industrias',
        texto:
          'Infraestructura eléctrica desde el plano, coordinada con la red y la seguridad electrónica del mismo proyecto.',
      },
    ],
    galeria: [
      { src: '/img/servicios/electricidad-cableado-rollos.webp', alt: 'Cable unipolar de distintos colores desenrollado en una obra, listo para pasar por las canalizaciones' },
      { src: '/img/servicios/obra-steelframe-montaje.webp', alt: 'Técnico de INSOLVA Group montando la estructura de un tabique antes de pasar la instalación' },
      { src: '/img/servicios/electricidad-casa-01.webp', alt: 'Instalación eléctrica domiciliaria en Ushuaia' },
      { src: '/img/servicios/electricidad-casa-03.webp', alt: 'Trabajo de electricidad residencial en Tierra del Fuego' },
    ],
    faqs: [
      {
        pregunta: '¿Hacen instalaciones eléctricas completas o solo lo relacionado con seguridad?',
        respuesta:
          'Hacemos instalaciones eléctricas completas: obra nueva, reformas, tableros y puesta a tierra, para casas, comercios y obras. No hace falta que contrates nada de seguridad para que trabajemos la parte eléctrica.',
      },
      {
        pregunta: 'Estoy en obra. ¿Cuándo conviene llamarlos?',
        respuesta:
          'Antes de cerrar las paredes. Ese es el momento en que se puede dejar previsto todo junto, eléctrica, red, cámaras y accesos, al menor costo. Después de cerrar, cada agregado implica romper y rehacer terminaciones.',
      },
      {
        pregunta: '¿Por qué me saltan las térmicas?',
        respuesta:
          'Lo más común es que haya demasiado consumo colgando de un mismo circuito, o protecciones que no corresponden a lo que alimentan. Se revisa el tablero y la distribución de circuitos: no siempre implica rehacer la instalación entera.',
      },
      {
        pregunta: '¿Trabajan con obras e industrias o solo casas?',
        respuesta:
          'Las dos cosas. Trabajamos en viviendas, comercios, industrias y obras de Ushuaia, Río Grande y Tolhuin.',
      },
      {
        pregunta: '¿Pueden revisar una instalación que hizo otro?',
        respuesta:
          'Sí. De hecho lo hacemos seguido antes de instalar cámaras o automatización: si la base eléctrica no está en condiciones, lo que se monte encima va a dar problemas. Te decimos qué encontramos y qué conviene corregir.',
      },
    ],
    waMessage:
      'Hola INSOLVA, necesito un electricista para mi casa/negocio/obra en Tierra del Fuego.',
    relacionados: ['camaras-de-seguridad-tierra-del-fuego', 'redes-wifi-tierra-del-fuego', 'domotica-tierra-del-fuego'],
  },
];

export function getServicio(slug: string): Servicio | undefined {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function getRelacionados(servicio: Servicio): Servicio[] {
  return servicio.relacionados
    .map((slug) => getServicio(slug))
    .filter((s): s is Servicio => Boolean(s));
}
