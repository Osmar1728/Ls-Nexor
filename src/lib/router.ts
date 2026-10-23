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
      try {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
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
    desc: "Fletes dedicados en ZMG y foráneos desde Guadalajara a SLP, Querétaro, Vallarta, Morelia, Tequila, Silao y Manzanillo. Unidad exclusiva, precio cerrado. Cotiza en menos de 3 horas.",
  },
  flota: {
    title: "Flota y capacidades de carga | LS NEXOR Guadalajara",
    desc: "Camioneta, camión 3.5T, Rabón y Tráiler con caja adaptable a tu mercancía. Consulta medidas, volumen y uso recomendado para tu carga.",
  },
  cobertura: {
    title: "Cobertura de fletes en Jalisco y Bajío | LS NEXOR",
    desc: "Servicio local en ZMG y 7 rutas foráneas desde Guadalajara: SLP, Querétaro, Vallarta, Morelia, Tequila, Silao y Manzanillo. Cobertura nacional bajo cotización.",
  },
  ruta: {
    title: "Flete foráneo desde Guadalajara | LS NEXOR",
    desc: "Flete dedicado puerta a puerta desde Guadalajara con precio cerrado, facturación inmediata y seguro de carga opcional.",
  },
  servicios: {
    title: "Servicios de flete dedicado | LS NEXOR",
    desc: "Flete dedicado puerta a puerta, seguro de carga opcional y maniobras de carga y descarga. Precio cerrado y unidad exclusiva.",
  },
  nosotros: {
    title: "Nosotros: operador logístico PyME | LS NEXOR",
    desc: "Operador PyME en Guadalajara. Unidades dedicadas, comunicación directa durante tu flete y facturación inmediata.",
  },
  cotizar: {
    title: "Cotiza tu flete en 1 minuto | LS NEXOR",
    desc: "Cotiza fletes locales y foráneos desde Guadalajara. Completa origen, destino y unidad y recibe respuesta en menos de 3 horas.",
  },
  terminos: {
    title: "Términos y condiciones | LS NEXOR",
    desc: "Términos del servicio de fletes dedicados LS NEXOR: cotizaciones, precio cerrado, seguro, maniobras, facturación inmediata y aduana.",
  },
  privacidad: {
    title: "Aviso de privacidad | LS NEXOR",
    desc: "Cómo trata LS NEXOR tus datos personales conforme a la LFPDPPP: datos recabados, finalidades, transferencias y derechos ARCO.",
  },
  notfound: {
    title: "Página no encontrada | LS NEXOR",
    desc: "La página que buscas no existe. Vuelve al inicio o cotiza tu flete directamente.",
  },
};

export const SITE_URL = "https://www.lsnexor.mx";
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

// Sin restauración del navegador: cada ruta siempre empieza en el hero.
if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export function usePageMeta(name: RouteName, extra?: string, image?: string) {
  useEffect(() => {
    const base = PAGE_META[name];
    const title = extra ? `${extra} | LS NEXOR` : base.title;
    const desc = base.desc;
    const path =
      CANONICAL_PATHS[name] ??
      (window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, ""));
    const canonical = `${SITE_URL}${path}`;
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
      : OG_IMAGE;

    document.title = title;
    setMeta("name", "description", desc);
    setMeta("name", "robots", name === "notfound" ? "noindex,follow" : "index,follow,max-image-preview:large");

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "LS NEXOR");
    setMeta("property", "og:locale", "es_MX");
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", title);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", title);

    setCanonical(canonical);
    setHreflang(canonical);

    // Instantáneo a propósito: el `scroll-behavior: smooth` global volvía
    // esta subida una animación lenta que dejaba la página a medias.
    // Con try/catch por si el navegador no acepta `instant`.
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [name, extra, image]);
}
