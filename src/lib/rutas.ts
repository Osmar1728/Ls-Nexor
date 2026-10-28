export interface RutaInfo {
  slug: string;
  destino: string;
  distancia: string;
  imagen: string;
  hero: string;
  /** Punto focal del hero (object-position). Por defecto centrado. */
  heroPos?: string;
  ideal: string;
  casos: string[];
  faqs: [string, string][];
}

export const RUTAS: RutaInfo[] = [
  {
    slug: "san-luis-potosi",
    imagen: "/img/rutas/san-luis-potosi.webp",
    hero: "/img/rutas/san-luis-potosi-hero.webp",
    destino: "San Luis Potosí",
    distancia: "~ 330 km desde GDL",
    ideal: "3.5T y Rabón para carga comercial e industrial al Bajío",
    casos: ["Refacciones y autopartes al corredor industrial", "Acero, perfiles y material para obra", "Maquinaria y equipos industriales", "Carga comercial voluminosa", "Mercancía comercial tarimada"],
    faqs: [
      ["¿Cómo opera GDL → SLP?", "Salida directa con unidad directa, sin consolidar ni trasbordos."],
      ["¿Qué unidad me conviene?", "3.5T para carga media y mercancía voluminosa, Rabón 8T para carga industrial. Te confirmamos por fotos y peso."],
      ["¿Mueven acero o carga pesada?", "Sí, con Rabón 8T o Tráiler según peso y dimensiones. Mándanos fotos y medidas por WhatsApp y te confirmamos unidad."],
      ["¿Entregan en parques industriales de SLP?", "Sí, coordinamos ventana de entrega, acceso y maniobras si las requieres."]
    ],
  },
  {
    slug: "queretaro",
    imagen: "/img/rutas/queretaro.webp",
    hero: "/img/rutas/queretaro-hero.webp",
    destino: "Querétaro",
    distancia: "~ 400 km desde GDL",
    ideal: "Corredor industrial Bajío: Rabón y Tráiler para alto volumen",
    casos: ["Proveeduría industrial y autopartes", "Componentes aeroespaciales y de precisión", "Abasto a CEDIS y tiendas de retail", "Muebles y mercancía voluminosa", "Carga industrial de alto volumen"],
    faqs: [
      ["¿Hacen entregas en parques industriales?", "Sí, coordinamos ventana de entrega y maniobras si las requieres."],
      ["¿Emiten factura?", "Sí, facturación inmediata."],
      ["¿Mueven carga delicada o de precisión?", "Sí, en caja adaptable a tu mercancía, con acomodo y sujeción. Para alto valor te recomendamos el seguro de carga por evento."],
      ["¿Respetan ventanas de entrega en parques industriales?", "Sí, programamos la salida para llegar a tu ventana y te avisamos ubicación en ruta."]
    ],
  },
  {
    slug: "puerto-vallarta",
    imagen: "/img/rutas/puerto-vallarta.webp",
    hero: "/img/rutas/puerto-vallarta-hero.webp",
    heroPos: "object-[center_75%]",
    destino: "Puerto Vallarta",
    distancia: "~ 300 km desde GDL",
    ideal: "Camioneta 1T y 3.5T para hotelería, retail y carga comercial a costa",
    casos: ["Blancos, amenities y abasto hotelero", "Abasto a hoteles y restaurantes", "Muebles y carga voluminosa GDL ↔ Vallarta", "Equipos y mobiliario", "Materiales para obra y remodelación en costa"],
    faqs: [
      ["¿Bajan con caja cerrada a Vallarta?", "Sí, toda la flota cuenta con caja cerrada adaptable a tu mercancía, ideal para costa por lluvia y seguridad."],
      ["¿Pueden recolectar y entregar el mismo servicio?", "Sí, servicio puerta a puerta con maniobras opcionales en origen y destino."],
      ["¿Cuánto tarda GDL → Vallarta?", "Servicio directo. Te confirmamos horario al cotizar."],
      ["¿La caja cerrada protege de la lluvia en costa?", "Sí, toda la flota cuenta con caja cerrada adaptable a tu mercancía: tu carga viaja seca y segura."]
    ],
  },
  {
    slug: "morelia",
    imagen: "/img/rutas/morelia.webp",
    hero: "/img/rutas/morelia-hero.webp",
    destino: "Morelia",
    distancia: "~ 290 km desde GDL",
    ideal: "3.5T para carga comercial Michoacán–Jalisco",
    casos: ["Distribución comercial", "Productos agroindustriales de la región", "Muebles y artesanías voluminosas", "Carga comercial regional", "Carga general tarimada"],
    faqs: [
      ["¿Operan la ruta a Morelia?", "Sí. Cotiza y apartamos unidad y horario."],
      ["¿El precio incluye maniobras?", "Se cotizan como adicional. Indícalo y te damos precio cerrado."],
      ["¿Recolectan fuera de Morelia, como Uruapan o Zamora?", "Sí, cubrimos la región bajo cotización. Escríbenos el origen exacto y te damos precio cerrado."],
      ["¿La unidad va directa?", "Siempre. Unidad exclusiva puerta a puerta, sin consolidar ni compartir."]
    ],
  },
  {
    slug: "tequila",
    imagen: "/img/rutas/tequila.webp",
    hero: "/img/rutas/tequila-hero.webp",
    destino: "Tequila",
    distancia: "~ 60 km desde GDL",
    ideal: "Camioneta 1T y 3.5T para industria tequilera y proveeduría local",
    casos: ["Botella y producto terminado a CEDIS", "Barricas, cristal y equipo para destilerías", "Proveeduría a destilerías", "Movimientos locales de insumos", "Repartos express"],
    faqs: [
      ["¿Hacen servicio local en ZMG y Tequila?", "Sí, recolectamos y entregamos puerta a puerta con unidad directa."],
      ["¿Pueden facturar a empresas tequileras?", "Sí, facturación inmediata para tus auditorías."],
      ["¿Mueven tequila a granel o solo envasado?", "Solo envasado en tarima y caja. No movemos líquidos a granel ni pipas."],
      ["¿Hacen viajes recurrentes a Tequila?", "Sí, a ~60 km programamos viajes frecuentes para destilerías y proveedores. Cotiza tu ruta fija."]
    ],
  },
  {
    slug: "silao",
    imagen: "/img/rutas/silao.webp",
    hero: "/img/rutas/silao-hero.webp",
    destino: "Silao",
    distancia: "~ 230 km desde GDL",
    ideal: "Rabón y Tráiler para corredor automotriz del Bajío",
    casos: ["Abasto just-in-time a planta automotriz", "Autopartes y proveeduría", "Acero y rollos para la industria", "Carga industrial tarimada", "Flete directo de alto volumen"],
    faqs: [
      ["¿Entran a plantas en Silao?", "Sí, coordinamos acceso, ventana y documentos que pida tu planta."],
      ["¿Tienen seguro de carga?", "Cobertura por evento cotizada junto al flete para proteger el valor de tu mercancía."],
      ["¿Entran a Guanajuato Puerto Interior?", "Sí, coordinamos acceso y documentos. Somos frecuentes en el corredor del Bajío."],
      ["¿Cumplen ventanas just-in-time?", "Sí, programamos la salida para tu ventana y te avisamos ubicación en ruta."],
    ],
  },
  {
    slug: "manzanillo",
    destino: "Manzanillo",
    distancia: "~ 290 km desde GDL",
    imagen: "/img/rutas/manzanillo.webp",
    hero: "/img/rutas/manzanillo-hero.webp",
    ideal: "Tráiler y Rabón para carga al puerto y retornos a Guadalajara",
    casos: ["Importación desconsolidada en tarimas y cajas", "Línea blanca y electrodomésticos de importación", "Carga comercial hacia el puerto", "Retorno Manzanillo → GDL", "Equipos y carga voluminosa"],
    faqs: [
      ["¿Cómo opera GDL → Manzanillo?", "Servicio directo con unidad directa, sin consolidar ni trasbordos."],
      ["¿Hacen el regreso Manzanillo → GDL?", "Sí, cotizamos el retorno con la misma unidad. Escríbenos origen y destino."],
      ["¿Recogen en recinto portuario o aduana?", "Sí, operamos con unidades y operadores autorizados para despacho en aduana y recintos. Cotiza tu maniobra."],
      ["¿Mueven contenedores completos?", "No. Operamos con caja adaptable a tu mercancía para importación desconsolidada y carga general."]
    ],
  },
];

export function getRuta(slug?: string): RutaInfo | undefined {
  if (!slug) return undefined;
  return RUTAS.find((r) => r.slug === slug);
}

export function slugifyDestino(destino: string): string {
  return destino
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
