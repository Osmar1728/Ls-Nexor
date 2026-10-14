import { useEffect, useState } from "react";

export type RouteName =
  | "home"
  | "flota"
  | "cobertura"
  | "ruta"
  | "servicios"
  | "nosotros"
  | "cotizar"
  | "contacto"
  | "notfound";

export interface ParsedRoute {
  name: RouteName;
  param?: string;
}

export function parseHash(hash: string): ParsedRoute {
  const clean = hash.replace(/^#/, "") || "/";
  const path = clean.split("?")[0];

  if (path === "/" || path === "") return { name: "home" };
  if (path === "/flota") return { name: "flota" };
  if (path === "/cobertura" || path === "/rutas") return { name: "cobertura" };
  if (path === "/servicios") return { name: "servicios" };
  if (path === "/nosotros") return { name: "nosotros" };
  if (path === "/cotizar") return { name: "cotizar" };
  if (path === "/contacto") return { name: "contacto" };
  if (path.startsWith("/ruta/")) {
    const slug = path.replace("/ruta/", "").trim();
    if (slug) return { name: "ruta", param: slug };
  }
  return { name: "notfound" };
}

export function useHashRoute(): ParsedRoute & { queryString: string } {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window === "undefined" ? { name: "home" } : parseHash(window.location.hash),
  );
  const [queryString, setQueryString] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash.split("?")[1] ?? "",
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      setQueryString(window.location.hash.split("?")[1] ?? "");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return { ...route, queryString };
}

export function href(path: string): string {
  return `#${path}`;
}

export interface CotizarPrefill {
  origen?: string;
  destino?: string;
  tipo?: string;
  unidad?: string;
  mensaje?: string;
}

export function getQueryParams(queryString?: string): URLSearchParams {
  const qs = queryString ?? (typeof window === "undefined" ? "" : window.location.hash.split("?")[1] ?? "");
  return new URLSearchParams(qs);
}

export function getCotizarPrefill(queryString?: string): CotizarPrefill {
  const q = getQueryParams(queryString);
  const pick = (k: string) => {
    const v = q.get(k)?.trim();
    return v ? v : undefined;
  };
  return {
    origen: pick("origen"),
    destino: pick("destino"),
    tipo: pick("tipo"),
    unidad: pick("unidad"),
    mensaje: pick("mensaje"),
  };
}

export function buildCotizarHref(prefill: CotizarPrefill = {}, base: string = "/cotizar"): string {
  const params = new URLSearchParams();
  if (prefill.origen) params.set("origen", prefill.origen);
  if (prefill.destino) params.set("destino", prefill.destino);
  if (prefill.tipo) params.set("tipo", prefill.tipo);
  if (prefill.unidad) params.set("unidad", prefill.unidad);
  if (prefill.mensaje) params.set("mensaje", prefill.mensaje);
  const qs = params.toString();
  return href(qs ? `${base}?${qs}` : base);
}

export const PAGE_META: Record<RouteName, { title: string; desc: string }> = {
  home: {
    title: "LS NEXOR | Fletes locales y foráneos desde Guadalajara",
    desc: "Fletes dedicados de 1 a 15+ toneladas desde Guadalajara: ZMG y foráneos a SLP, Querétaro, Vallarta, Morelia, Tequila, Silao y Manzanillo. Cotiza por WhatsApp en menos de 3 horas.",
  },
  flota: {
    title: "Flota y medidas | LS NEXOR Guadalajara",
    desc: "Camioneta 1T, camión 3.5T caja seca, Rabón 8T y Tráiler 15+T. Medidas, volumen y uso recomendado. Cotiza con la unidad exacta.",
  },
  cobertura: {
    title: "Cobertura y rutas | LS NEXOR",
    desc: "Base en Guadalajara. Servicio local en ZMG y 7 rutas foráneas directas + cobertura nacional bajo cotización.",
  },
  ruta: {
    title: "Flete foráneo desde Guadalajara | LS NEXOR",
    desc: "Flete dedicado puerta a puerta desde Guadalajara con precio cerrado, factura y seguro opcional.",
  },
  servicios: {
    title: "Servicios: flete dedicado, seguro y maniobras | LS NEXOR",
    desc: "Flete dedicado puerta a puerta, seguro de carga opcional y maniobras de carga y descarga. Precio cerrado por escrito.",
  },
  nosotros: {
    title: "Nosotros | LS NEXOR Logística y Servicio",
    desc: "Operador PyME en Guadalajara. Unidades dedicadas, comunicación directa durante tu flete y factura con carta porte.",
  },
  cotizar: {
    title: "Cotiza tu flete en 1 minuto | LS NEXOR",
    desc: "Cotizador de fletes locales y foráneos. Completa origen, destino y unidad y envíalo por WhatsApp o correo. Respuesta en menos de 3 horas.",
  },
  contacto: {
    title: "Contacto directo | LS NEXOR Guadalajara",
    desc: "WhatsApp, correo y base operativa en Guadalajara. Lun–Vie 8am–6pm. Cotización en menos de 3 horas.",
  },
  notfound: {
    title: "Página no encontrada | LS NEXOR",
    desc: "La página que buscas no existe. Vuelve al inicio o cotiza tu flete directamente.",
  },
};

export function usePageMeta(name: RouteName, extra?: string) {
  useEffect(() => {
    const base = PAGE_META[name];
    const title = extra ? `${extra} | LS NEXOR` : base.title;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", extra ? `${base.desc} ${extra}` : base.desc);
    window.scrollTo(0, 0);
  }, [name, extra]);
}
