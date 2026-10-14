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
    casos: ["Refacciones y mercancía comercial", "Mudanza foránea 2–3 habitaciones", "Carga consolidada PyME"],
    faqs: [
      ["¿Cómo opera GDL → SLP?", "Salida directa con unidad dedicada, sin consolidar ni trasbordos."],
      ["¿Qué unidad me conviene?", "3.5T para mudanzas y carga media, Rabón 8T para carga industrial. Te confirmamos por fotos y peso."],
    ],
  },
  {
    slug: "queretaro",
    imagen: "/rutas/queretaro.webp",
    destino: "Querétaro",
    distancia: "~ 400 km desde GDL",
    ideal: "Corredor industrial Bajío: Rabón y Tráiler para alto volumen",
    casos: ["Proveeduría industrial", "Muebles y mercancía voluminosa", "Carga 8T a 15T+"],
    faqs: [
      ["¿Hacen entregas en parques industriales?", "Sí, coordinamos ventana de entrega y maniobras si las requieres."],
      ["¿Emiten factura con carta porte?", "Sí, indícalo en el cotizador y la emitimos el mismo día de la entrega."],
    ],
  },
  {
    slug: "puerto-vallarta",
    imagen: "/rutas/puerto-vallarta.webp",
    destino: "Puerto Vallarta",
    distancia: "~ 300 km desde GDL",
    ideal: "Pickup 1T y 3.5T para hotelería, retail y mudanzas a costa",
    casos: ["Abasto a hoteles y restaurantes", "Mudanzas GDL ↔ Vallarta", "Equipos y mobiliario"],
    faqs: [
      ["¿Bajan con caja seca a Vallarta?", "Sí, toda la flota es caja cerrada, ideal para costa por lluvia y seguridad."],
      ["¿Pueden recolectar y entregar el mismo servicio?", "Sí, servicio puerta a puerta con maniobras opcionales en origen y destino."],
    ],
  },
  {
    slug: "morelia",
    imagen: "/rutas/morelia.webp",
    destino: "Morelia",
    distancia: "~ 290 km desde GDL",
    ideal: "3.5T para carga comercial Michoacán–Jalisco",
    casos: ["Distribución comercial", "Mudanzas regionales", "Carga general tarimada"],
    faqs: [
      ["¿Operan la ruta a Morelia?", "Sí. Cotiza y apartamos unidad y horario."],
      ["¿El precio incluye maniobras?", "Se cotizan como adicional. Indícalo y te damos precio cerrado por escrito."],
    ],
  },
  {
    slug: "tequila",
    imagen: "/rutas/tequila.webp",
    destino: "Tequila",
    distancia: "~ 60 km desde GDL",
    ideal: "Pickup y 3.5T para industria tequilera y proveeduría local",
    casos: ["Proveeduría a destilerías", "Movimientos locales de insumos", "Repartos express"],
    faqs: [
      ["¿Hacen servicio local en ZMG y Tequila?", "Sí, recolectamos y entregamos puerta a puerta con unidad dedicada."],
      ["¿Pueden facturar a empresas tequileras?", "Sí, emitimos factura y carta porte para tus auditorías."],
    ],
  },
  {
    slug: "silao",
    imagen: "/rutas/silao.webp",
    destino: "Silao",
    distancia: "~ 230 km desde GDL",
    ideal: "Rabón y Tráiler para corredor automotriz del Bajío",
    casos: ["Autopartes y proveeduría", "Carga industrial tarimada", "Flete dedicado de alto volumen"],
    faqs: [
      ["¿Entran a plantas en Silao?", "Sí, coordinamos acceso, ventana y documentos que pida tu planta."],
      ["¿Tienen seguro de carga?", "Cobertura por evento cotizada junto al flete para proteger el valor de tu mercancía."],
    ],
  },
  {
    slug: "manzanillo",
    destino: "Manzanillo",
    distancia: "~ 290 km desde GDL",
    imagen: "/rutas/manzanillo.webp",
    ideal: "Tráiler y Rabón para carga al puerto y retornos a Guadalajara",
    casos: ["Carga comercial hacia el puerto", "Retorno Manzanillo → GDL", "Mudanzas y equipos"],
    faqs: [
      ["¿Cómo opera GDL → Manzanillo?", "Servicio directo con unidad dedicada, sin consolidar ni trasbordos."],
      ["¿Hacen el regreso Manzanillo → GDL?", "Sí, cotizamos el retorno con la misma unidad. Escríbenos origen y destino."],
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
