import { useEffect, useState } from "react";

export type RouteName =
  | "home"
  | "flota"
  | "cobertura"
  | "ruta"
  | "servicios"
  | "nosotros"
  | "cotizar"
  | "terminos"
  | "privacidad"
  | "notfound";

export interface ParsedRoute {
  name: RouteName;
  param?: string;
}

function normalizarPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean || "/";
}

export function parsePath(pathname: string): ParsedRoute {
  const path = normalizarPath(pathname).split("?")[0];

  if (path === "/" || path === "") return { name: "home" };
  if (path === "/flota") return { name: "flota" };
  if (path === "/cobertura" || path === "/rutas") return { name: "cobertura" };
  if (path === "/servicios") return { name: "nosotros" };
  if (path === "/nosotros") return { name: "nosotros" };
  if (path === "/cotizar") return { name: "cotizar" };
  if (path === "/terminos") return { name: "terminos" };
  if (path === "/privacidad") return { name: "privacidad" };
  if (path.startsWith("/ruta/")) {
    const slug = path.replace("/ruta/", "").trim();
    if (slug) return { name: "ruta", param: slug };
  }
  return { name: "notfound" };
}

/** Compatibilidad con enlaces antiguos del tipo /#/flota */
function pathActual(): string {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash;
  if (hash.startsWith("#/")) return hash.slice(1).split("?")[0];
  return window.location.pathname;
}

function queryActual(): string {
  if (typeof window === "undefined") return "";
  const hash = window.location.hash;
  if (hash.startsWith("#/")) return hash.split("?")[1] ?? "";
  return window.location.search.replace(/^\?/, "");
}

export function useRoute(): ParsedRoute & { queryString: string } {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window === "undefined" ? { name: "home" } : parsePath(pathActual()),
  );
  const [queryString, setQueryString] = useState(() =>
    typeof window === "undefined" ? "" : queryActual(),
  );

  useEffect(() => {
    // Convierte un enlace viejo (#/flota) a URL limpia (/flota) sin recargar.
    const migrarHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#/")) return;
      const legacy = hash.slice(1);
      const [path, qs] = legacy.split("?");
      history.replaceState(null, "", path + (qs ? `?${qs}` : ""));
    };

    const onChange = () => {
      migrarHash();
      setRoute(parsePath(window.location.pathname));
      setQueryString(window.location.search.replace(/^\?/, ""));
      scrollTop();
    };

    migrarHash();
    onChange();
    window.addEventListener("popstate", onChange);
    window.addEventListener("hashchange", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener("hashchange", onChange);
    };
  }, []);

  return { ...route, queryString };
}

/** Genera URLs limpias (/flota) en lugar de hash (#/flota) */
export function href(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export interface CotizarPrefill {
  origen?: string;
  destino?: string;
  tipo?: string;
  unidad?: string;
  mensaje?: string;
}

export function getQueryParams(queryString?: string): URLSearchParams {
  const qs = queryString ?? (typeof window === "undefined" ? "" : window.location.search.replace(/^\?/, ""));
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
    title: "Fletes y transporte de carga en Guadalajara | LS NEXOR",
    desc: "Fletes dedicados en Guadalajara, ZMG y foráneos a San Luis Potosí, Querétaro, Puerto Vallarta, Morelia, Tequila, Silao y Manzanillo. Unidad exclusiva, precio cerrado. Cotiza en menos de 3 horas.",
  },
  flota: {
    title: "Flota de carga en Guadalajara: Camioneta, Camión, Rabón y Tráiler | LS NEXOR",
    desc: "Flota dedicada con camioneta 1T, camión 3.5T, rabón/torton 5T y tráiler 15T. Medidas, capacidades y tipo ideal por carga. Fletes en Guadalajara y foráneos.",
  },
  cobertura: {
    title: "Cobertura de fletes Guadalajara, ZMG y Bajío | Rutas desde Guadalajara | LS NEXOR",
    desc: "Cobertura local en Zona Metropolitana de Guadalajara y 7 rutas foráneas directas: San Luis Potosí, Querétaro, Puerto Vallarta, Morelia, Tequila, Silao y Manzanillo. Flete dedicado puerta a puerta.",
  },
  ruta: {
    title: "Flete dedicado Guadalajara a {destino} | Precio cerrado | LS NEXOR",
    desc: "Flete dedicado puerta a puerta desde Guadalajara a {destino}. Precio cerrado, facturación inmediata, unidad exclusiva y seguro de carga opcional. Cotiza en menos de 3 horas.",
  },
  servicios: {
    title: "Servicios de flete dedicado y transporte de carga | LS NEXOR Guadalajara",
    desc: "Flete dedicado local y foráneo, despacho con ingreso a aduana y recinto fiscal, seguro de carga por evento, maniobras opcionales. Facturación inmediata.",
  },
  nosotros: {
    title: "LS NEXOR | Operador logístico PyME en Guadalajara",
    desc: "Operador logístico PyME con base en Guadalajara. Unidades dedicadas, comunicación directa, precios cerrados y servicio confiable en ZMG, Bajío y Occidente.",
  },
  cotizar: {
    title: "Cotiza tu flete en 1 minuto | Fletes desde Guadalajara | LS NEXOR",
    desc: "Cotiza fletes locales en ZMG y foráneos desde Guadalajara. Origen, destino, unidad y tipo de carga. Respuesta en menos de 3 horas. Precio cerrado.",
  },
  terminos: {
    title: "Términos y condiciones | LS NEXOR",
    desc: "Términos del servicio de fletes dedicados LS NEXOR: cotizaciones, precio cerrado, seguro de carga, maniobras, facturación, aduanas y responsabilidades.",
  },
  privacidad: {
    title: "Aviso de privacidad | LS NEXOR",
    desc: "Aviso de privacidad de LS NEXOR conforme a la LFPDPPP. Datos personales recabados, finalidades, transferencias, derechos ARCO y medidas de seguridad.",
  },
  notfound: {
    title: "Página no encontrada | LS NEXOR",
    desc: "La página que buscas no existe. Vuelve al inicio o cotiza tu flete desde Guadalajara directamente por WhatsApp.",
  },
};

export const SITE_URL = "https://lsnexor.com";
const OG_IMAGE = `${SITE_URL}/hero-rutas-bajio.webp`;

// Rutas con alias que deben consolidar su canonical en una sola URL.
const CANONICAL_PATHS: Partial<Record<RouteName, string>> = {
  nosotros: "/nosotros",
  cobertura: "/cobertura",
};

type MetaAttr = "name" | "property";

function setMeta(attr: MetaAttr, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// function setTwitterMeta() {}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setHreflang(url: string) {
  ["es-MX", "x-default"].forEach((lang) => {
    let link = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  });
}

// Lenis gestiona el scroll; el navegador restaura posición por defecto.

// Instancia de Lenis registrada desde App: subir con su API, no con scroll nativo (Lenis lo sobrescribe).
let lenisRef: { scrollTo: (value: number, options?: { immediate?: boolean }) => void } | null = null;

export function setLenis(
  instance: { scrollTo: (value: number, options?: { immediate?: boolean }) => void } | null,
) {
  lenisRef = instance;
}

function scrollTop() {
  if (lenisRef) lenisRef.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function usePageMeta(name: RouteName, extra?: string, image?: string) {
  useEffect(() => {
    const base = PAGE_META[name];
    let title = extra ? `${extra} | LS NEXOR` : base.title;
    let desc = base.desc;
    const path =
      CANONICAL_PATHS[name] ??
      (window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, ""));
    const canonical = `${SITE_URL}${path}`;
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
      : OG_IMAGE;

    // Ajustar meta para rutas dinámicas con destino
    if (name === "ruta" && extra) {
      const dest = extra.replace(/^Flete Guadalajara a /, "");
      title = `Flete dedicado Guadalajara → ${dest} | Precio cerrado | LS NEXOR`;
      desc = `Flete dedicado puerta a puerta desde Guadalajara a ${dest}. Precio cerrado, facturación inmediata, unidad exclusiva y seguro opcional. Cotiza en menos de 3 horas.`;
    }

    document.title = title;
    setMeta("name", "description", desc);
    setMeta("name", "robots", name === "notfound" ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("name", "keywords", name === "home" 
      ? "fletes guadalajara, transporte de carga guadalajara, flete dedicado zmg, fletes bajio, transporte carga jalisco"
      : name === "ruta" 
      ? `flete guadalajara ${extra?.replace(/.*a /, "") || ""}, flete dedicado, transporte de carga`
      : "fletes guadalajara, flete dedicado, transporte de carga");

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", name === "ruta" ? "article" : "website");
    setMeta("property", "og:site_name", "LS NEXOR");
    setMeta("property", "og:locale", "es_MX");
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:image:width", "1920");
    setMeta("property", "og:image:height", "1072");
    setMeta("property", "og:image:type", "image/webp");

    // Añadir metadatos adicionales para SEO
    setMeta("name", "author", "LS NEXOR - Logística y Servicio NEXOR");
    setMeta("name", "publisher", "LS NEXOR");
    setMeta("property", "business:contact_data:phone_number", "+523313196892");
    setMeta("property", "business:contact_data:locality", "Guadalajara");
    setMeta("property", "business:contact_data:region", "Jalisco");
    setMeta("property", "business:contact_data:country_name", "Mexico");
    setMeta("name", "geo.region", "MX-JAL");
    setMeta("name", "geo.placename", "Guadalajara, Jalisco");
    setMeta("name", "geo.position", "20.6597;-103.3496");
    setMeta("name", "ICBM", "20.6597, -103.3496");
    setMeta("name", "theme-color", "#0b2a4a");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", title);

    setCanonical(canonical);
    setHreflang(canonical);

    // Lenis gestiona el scroll: subida inmediata al cambiar de ruta.
    scrollTop();
  }, [name, extra, image]);
}
