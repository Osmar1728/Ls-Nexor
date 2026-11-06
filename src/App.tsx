import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Footer, WhatsFloat } from "./components/Footer";
import Navbar from "./components/Navbar";
import { href, setLenis, usePageMeta, useRoute } from "./lib/router";
import CoberturaPage from "./pages/CoberturaPage";
import CotizarPage from "./pages/CotizarPage";
import FlotaPage from "./pages/FlotaPage";
import Home from "./pages/Home";
import { PrivacidadPage, TerminosPage } from "./pages/LegalPage";
import NosotrosPage from "./pages/NosotrosPage";
import RutaPage from "./pages/RutaPage";

// 404 con diseño completo: hero con marca de agua + grid de accesos rápidos.
function NotFoundView() {
  usePageMeta("notfound");
  return (
    <>
      <section className="relative overflow-hidden bg-[#0b2a4a] pb-12 pt-[96px] text-white sm:pt-[104px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <p className="font-heading absolute -bottom-8 -right-4 select-none text-[160px] font-extrabold leading-none text-white/[0.06] sm:-bottom-10 sm:-right-6 sm:text-[260px]">
            404
          </p>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <a href={href("/")} className="transition hover:text-white">
              Inicio
            </a>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Página no encontrada</span>
          </nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Error 404 · Ruta no encontrada</p>
          <h1 className="font-heading mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px]">
            Esa página no existe, pero tu flete sí lo movemos
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">
            La URL que abriste no existe o fue movida. Vuelve al inicio o cotiza tu flete directo en menos de 3 horas.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={href("/")}
              className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
            >
              Ir al inicio
            </a>
            <a
              href={href("/cotizar")}
              className="rounded-lg border border-white/25 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10"
            >
              Cotizar en 1 minuto
            </a>
            <a
              href="https://wa.me/523313196892?text=Hola%20LS%20NEXOR%2C%20quiero%20cotizar%20un%20flete."
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-7 py-3.5 text-center text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/60 hover:bg-emerald-500/20"
            >
              WhatsApp directo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/45">Código 404 · Si llegaste desde un enlace externo, avísanos por WhatsApp y lo corregimos.</p>
        </div>
      </section>

      <section className="bg-[#f2f5f9] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Accesos rápidos</p>
          <h2 className="font-heading mt-2 text-xl font-bold text-[#0b2a4a] sm:text-2xl">¿Qué querías encontrar?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Cotizador", desc: "Origen, destino y unidad · 3 pasos", to: "/cotizar", icon: "◉" },
              { label: "Flota y medidas", desc: "1T · 3.5T · Rabón 8T · Tráiler 15T", to: "/flota", icon: "▭" },
              { label: "Cobertura y rutas", desc: "ZMG + 7 corredores foráneos", to: "/cobertura", icon: "◎" },
              { label: "GDL → San Luis Potosí", desc: "~330 km · Flete directo", to: "/ruta/san-luis-potosi", icon: "→" },
              { label: "GDL → Querétaro", desc: "~400 km · Bajío", to: "/ruta/queretaro", icon: "→" },
              { label: "GDL → Manzanillo", desc: "~290 km · Puerto", to: "/ruta/manzanillo", icon: "→" },
            ].map((c) => (
              <a
                key={c.label}
                href={href(c.to)}
                className="group rounded-2xl border border-[#dce4ed] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0b2a4a]/20 hover:shadow-lg"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0b2a4a]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b2a4a] text-xs text-white">{c.icon}</span>
                  {c.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
                <p className="mt-3 text-xs font-semibold text-[#0077c8] group-hover:underline">Ver →</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const route = useRoute();

  // Navegación SPA con URLs limpias: intercepta solo enlaces internos.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;

      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {route.name === "home" && <Home />}
        {route.name === "flota" && <FlotaPage />}
        {route.name === "cobertura" && <CoberturaPage />}
        {route.name === "ruta" && <RutaPage slug={route.param} />}
        {route.name === "servicios" && <NosotrosPage />}
        {route.name === "nosotros" && <NosotrosPage />}
        {route.name === "cotizar" && <CotizarPage />}
        {route.name === "terminos" && <TerminosPage />}
        {route.name === "privacidad" && <PrivacidadPage />}
        {route.name === "notfound" && <NotFoundView />}
      </main>
      <Footer />
      <WhatsFloat />
      {/* Enlace oculto para SEO / accesibilidad multipágina */}
      <nav className="sr-only" aria-label="Mapa del sitio">
        <a href={href("/")}>Inicio</a>
        <a href={href("/flota")}>Flota</a>
        <a href={href("/cobertura")}>Cobertura</a>
        <a href={href("/nosotros")}>Nosotros</a>
        <a href={href("/cotizar")}>Cotizar</a>
        <a href={href("/terminos")}>Términos</a>
        <a href={href("/privacidad")}>Privacidad</a>
      </nav>
    </div>
  );
}
