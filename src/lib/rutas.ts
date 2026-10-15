export interface RutaInfo {
  slug: string;
  destino: string;
  distancia: string;
  imagen: string;
  ideal: string;
  casos: string[];
  faqs: [string, string][];
}

export const RUTAS: RutaInfo[] = [
  {
    slug: "san-luis-potosi",
    imagen: "/rutas/san-luis-potosi.webp",
    destino: "San Luis Potosí",
    distancia: "~ 330 km desde GDL",
    ideal: "3.5T y Rabón para carga comercial e industrial al Bajío",
    casos: ["Refacciones y autopartes al corredor industrial", "Acero, perfiles y material para obra", "Maquinaria y equipos industriales", "Mudanza foránea 2–3 habitaciones", "Mercancía comercial tarimada"],
    faqs: [
      ["¿Cómo opera GDL → SLP?", "Salida directa con unidad dedicada, sin consolidar ni trasbordos."],
      ["¿Qué unidad me conviene?", "3.5T para mudanzas y carga media, Rabón 8T para carga industrial. Te confirmamos por fotos y peso."],
      ["¿Mueven acero o carga pesada?", "Sí, con Rabón 8T o Tráiler según peso y dimensiones. Mándanos fotos y medidas por WhatsApp y te confirmamos unidad."],
      ["¿Entregan en parques industriales de SLP?", "Sí, coordinamos ventana de entrega, acceso y maniobras si las requieres."]
    ],
  },
  {
    slug: "queretaro",
    imagen: "/rutas/queretaro.webp",
    destino: "Querétaro",
    distancia: "~ 400 km desde GDL",
    ideal: "Corredor industrial Bajío: Rabón y Tráiler para alto volumen",
    casos: ["Proveeduría industrial y autopartes", "Componentes aeroespaciales y de precisión", "Abasto a CEDIS y tiendas de retail", "Muebles y mercancía voluminosa", "Carga 8T a 15T+"],
    faqs: [
      ["¿Hacen entregas en parques industriales?", "Sí, coordinamos ventana de entrega y maniobras si las requieres."],
      ["¿Emiten factura con carta porte?", "Sí, indícalo en el cotizador y la emitimos el mismo día de la entrega."],
      ["¿Mueven carga delicada o de precisión?", "Sí, en caja seca cerrada con acomodo y sujeción. Para alto valor te recomendamos el seguro de carga por evento."],
      ["¿Respetan ventanas de entrega en parques industriales?", "Sí, programamos la salida para llegar a tu ventana y te avisamos ubicación en ruta."]
    ],
  },
  {
    slug: "puerto-vallarta",
    imagen: "/rutas/puerto-vallarta.webp",
    destino: "Puerto Vallarta",
    distancia: "~ 300 km desde GDL",
    ideal: "Camioneta 1T y 3.5T para hotelería, retail y mudanzas a costa",
    casos: ["Blancos, amenities y abasto hotelero", "Abasto a hoteles y restaurantes", "Mudanzas GDL ↔ Vallarta", "Equipos y mobiliario", "Materiales para obra y remodelación en costa"],
    faqs: [
      ["¿Bajan con caja seca a Vallarta?", "Sí, toda la flota es caja cerrada, ideal para costa por lluvia y seguridad."],
      ["¿Pueden recolectar y entregar el mismo servicio?", "Sí, servicio puerta a puerta con maniobras opcionales en origen y destino."],
      ["¿Cuánto tarda GDL → Vallarta?", "Servicio directo, normalmente el mismo día según horario de carga. Te confirmamos horario al cotizar."],
      ["¿La caja cerrada protege de la lluvia en costa?", "Sí, toda la flota es caja seca cerrada: tu mercancía viaja seca y segura."]
    ],
  },
  {
    slug: "morelia",
    imagen: "/rutas/morelia.webp",
    destino: "Morelia",
    distancia: "~ 290 km desde GDL",
    ideal: "3.5T para carga comercial Michoacán–Jalisco",
    casos: ["Distribución comercial", "Productos agroindustriales de la región", "Muebles y artesanías voluminosas", "Mudanzas regionales", "Carga general tarimada"],
    faqs: [
      ["¿Operan la ruta a Morelia?", "Sí. Cotiza y apartamos unidad y horario."],
      ["¿El precio incluye maniobras?", "Se cotizan como adicional. Indícalo y te damos precio cerrado por escrito."],
      ["¿Recolectan fuera de Morelia, como Uruapan o Zamora?", "Sí, cubrimos la región bajo cotización. Escríbenos el origen exacto y te damos precio cerrado."],
      ["¿La unidad va dedicada?", "Siempre. Unidad exclusiva puerta a puerta, sin consolidar ni compartir."]
    ],
  },
  {
    slug: "tequila",
    imagen: "/rutas/tequila.webp",
    destino: "Tequila",
    distancia: "~ 60 km desde GDL",
    ideal: "Camioneta 1T y 3.5T para industria tequilera y proveeduría local",
    casos: ["Botella y producto terminado a CEDIS", "Barricas, cristal y equipo para destilerías", "Proveeduría a destilerías", "Movimientos locales de insumos", "Repartos express"],
    faqs: [
      ["¿Hacen servicio local en ZMG y Tequila?", "Sí, recolectamos y entregamos puerta a puerta con unidad dedicada."],
      ["¿Pueden facturar a empresas tequileras?", "Sí, emitimos factura y carta porte para tus auditorías."],
      ["¿Mueven tequila a granel o solo envasado?", "Solo envasado en tarima y caja. No movemos líquidos a granel ni pipas."],
      ["¿Hacen viajes recurrentes a Tequila?", "Sí, a ~60 km programamos viajes frecuentes para destilerías y proveedores. Cotiza tu ruta fija."]
    ],
  },
  {
    slug: "silao",
    imagen: "/rutas/silao.webp",
    destino: "Silao",
    distancia: "~ 230 km desde GDL",
    ideal: "Rabón y Tráiler para corredor automotriz del Bajío",
    casos: ["Abasto just-in-time a planta automotriz", "Autopartes y proveeduría", "Acero y rollos para la industria", "Carga industrial tarimada", "Flete dedicado de alto volumen"],
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
    imagen: "/rutas/manzanillo.webp",
    ideal: "Tráiler y Rabón para carga al puerto y retornos a Guadalajara",
    casos: ["Importación desconsolidada en tarimas y cajas", "Línea blanca y electrodomésticos de importación", "Carga comercial hacia el puerto", "Retorno Manzanillo → GDL", "Mudanzas y equipos"],
    faqs: [
      ["¿Cómo opera GDL → Manzanillo?", "Servicio directo con unidad dedicada, sin consolidar ni trasbordos."],
      ["¿Hacen el regreso Manzanillo → GDL?", "Sí, cotizamos el retorno con la misma unidad. Escríbenos origen y destino."],
      ["¿Recogen en recinto portuario o aduana?", "Sí, operamos con unidades y operadores autorizados para despacho en aduana y recintos. Cotiza tu maniobra."],
      ["¿Mueven contenedores completos?", "No. Operamos caja seca dedicada de 1 a 15+T: ideal para importación desconsolidada y carga general."]
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
