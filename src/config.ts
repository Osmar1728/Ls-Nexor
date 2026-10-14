export const BUSINESS = {
  name: "LS NEXOR",
  fullName: "Logística y Servicio NEXOR",
  tagline: "Fletes locales y foráneos desde Guadalajara",
  email: "lsnexor@gmail.com",
  whatsappDisplay: "+52 33 1319 6892",
  whatsappNumber: "523313196892",
  base: "Guadalajara, Jalisco",
  hours: "Lun–Vie 8am–6pm",
  facturacion: true,
  logo: "/logo-ls-nexor.webp",
  logoIcon: "/logo-ls-nexor-icon.webp",
};

export const UNIT = {
  modelo: "NP300 / Estaquitas",
  capacidad: "1 tonelada",
  caja: { alto: "1.70 m", ancho: "1.80 m", largo: "2.45 m" },
  riel: "80–85 cm",
};

export interface FlotaUnit {
  id: string;
  nombre: string;
  capacidad: string;
  medidas: string;
  volumen: string;
  desc: string;
}

export interface FleetUnit {
  id: string;
  name: string;
  short: string;
  maxWeight: string;
  dimensions: { largo: string; ancho: string; alto: string };
  volume: string;
  usage: string;
  image: string;
}

export const FLEET_UNITS: FleetUnit[] = [
  {
    id: "pickup",
    name: "Camioneta Express",
    short: "1 Ton",
    maxWeight: "1,000 kg / 1 Ton",
    dimensions: { largo: "2.45 m", ancho: "1.80 m", alto: "1.70 m" },
    volume: "7.5 m³",
    usage: "Paquetería, fletes locales en ZMG y repartos express",
    image: "/flota/pickup-1t.webp",
  },
  {
    id: "3.5t",
    name: "Camión 3.5 Toneladas",
    short: "3.5 Ton",
    maxWeight: "3,500 kg / 3.5 Ton",
    dimensions: { largo: "4.50 m", ancho: "2.20 m", alto: "2.20 m" },
    volume: "21 m³",
    usage: "Mudanzas de 2-3 habitaciones y carga comercial",
    image: "/flota/camion-3t.webp",
  },
  {
    id: "rabon",
    name: "Camión Rabón",
    short: "8 Ton",
    maxWeight: "8,000 kg / 8 Ton",
    dimensions: { largo: "7.00 m", ancho: "2.50 m", alto: "2.60 m" },
    volume: "45 m³",
    usage: "Carga industrial media y rutas regionales",
    image: "/flota/torton-5t.webp",
  },
  {
    id: "trailer",
    name: "Trailer / Flete Pesado",
    short: "15+ Ton",
    maxWeight: "15,000+ kg / 15+ Ton",
    dimensions: { largo: "16.00 m", ancho: "2.60 m", alto: "2.70 m" },
    volume: "100 m³",
    usage: "Carga industrial pesada y larga distancia",
    image: "/flota/trailer-15t.webp",
  },
];

export const FLOTA: FlotaUnit[] = [
  {
    id: "pickup",
    nombre: "Pickup / Camioneta Express",
    capacidad: "Hasta 1 ton",
    medidas: "2.45 x 1.80 x 1.70 m",
    volumen: "7.5 m³",
    desc: "Pickup / estaquitas con caja cerrada. Ideal para fletes locales y repartos.",
  },
  {
    id: "3.5t",
    nombre: "Camión 3.5 Toneladas (Caja Seca)",
    capacidad: "Hasta 3.5 ton",
    medidas: "4.50 x 2.20 x 2.20 m",
    volumen: "21 m³",
    desc: "Camión caja seca. Para mudanzas, mercancía voluminosa y foráneos medios.",
  },
  {
    id: "rabon",
    nombre: "Camión Rabón (8 Ton)",
    capacidad: "Hasta 8 ton",
    medidas: "7.00 x 2.50 x 2.60 m",
    volumen: "45 m³",
    desc: "Camión rígido 2 ejes. Carga consolidada y rutas regionales.",
  },
  {
    id: "trailer",
    nombre: "Trailer / Flete Pesado (15+ Ton)",
    capacidad: "15+ ton",
    medidas: "16.00 x 2.60 x 2.70 m",
    volumen: "100 m³",
    desc: "Tracto con caja de 53 pies. Alto volumen y larga distancia.",
  },
];

export const NOTA_FLOTA =
  "Dimensiones aproximadas, pueden variar según la unidad asignada.";

export const COBERTURA_LOCAL = [
  "Guadalajara",
  "Zapopan",
  "Tlaquepaque",
  "Tonalá",
  "Tlajomulco",
  "El Salto",
  "Zapotlanejo",
  "Ixtlahuacán de los Membrillos",
  "Chapala",
];

export const COBERTURA_FORANEA = [
  "San Luis Potosí",
  "Querétaro",
  "Puerto Vallarta",
  "Morelia",
  "Tequila",
  "Silao",
  "Manzanillo",
];

export const COBERTURA_NACIONAL_MSG =
  "¿Otra ruta? Cotizamos cobertura nacional bajo solicitud.";

export type QuoteKind = "Local" | "Foráneo";

export interface QuoteForm {
  nombre: string;
  telefono: string;
  email: string;
  tipo: QuoteKind;
  unidad: string;
  origen: string;
  destino: string;
  fecha: string;
  pesoAprox: string;
  factura: boolean;
  mensaje: string;
}

export const initialQuote: QuoteForm = {
  nombre: "",
  telefono: "",
  email: "",
  tipo: "Local",
  unidad: "Pickup / Camioneta Express",
  origen: "",
  destino: "",
  fecha: "",
  pesoAprox: "",
  factura: false,
  mensaje: "",
};
