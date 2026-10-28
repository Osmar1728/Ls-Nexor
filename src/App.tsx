import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Footer, WhatsFloat } from "./components/Footer";
import Navbar from "./components/Navbar";
import PageHero from "./components/PageHero";
import { href, setLenis, usePageMeta, useRoute } from "./lib/router";
import CoberturaPage from "./pages/CoberturaPage";
import CotizarPage from "./pages/CotizarPage";
import FlotaPage from "./pages/FlotaPage";
import Home from "./pages/Home";
import { PrivacidadPage, TerminosPage } from "./pages/LegalPage";
import NosotrosPage from "./pages/NosotrosPage";
import RutaPage from "./pages/RutaPage";

// Vista 404: misma presentación, pero fija título y noindex para no indexar URLs inexistentes.
function NotFoundView() {
  usePageMeta("notfound");
  return (
    <PageHero
      eyebrow="Error 404"
      title="Esa página no existe, pero tu flete sí lo movemos"
      desc="Vuelve al inicio o cotiza directo por WhatsApp."
      crumbs={[["Inicio", "/"]]}
      ctaPrimary={{ label: "Ir al inicio", to: "/" }}
      ctaSecondary={{ label: "Cotizar", to: "/cotizar" }}
    />
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
