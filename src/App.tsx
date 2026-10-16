import { Footer, WhatsFloat } from "./components/Footer";
import Navbar from "./components/Navbar";
import PageHero from "./components/PageHero";
import { href, useHashRoute } from "./lib/router";
import CoberturaPage from "./pages/CoberturaPage";
import CotizarPage from "./pages/CotizarPage";
import FlotaPage from "./pages/FlotaPage";
import Home from "./pages/Home";
import { PrivacidadPage, TerminosPage } from "./pages/LegalPage";
import NosotrosPage from "./pages/NosotrosPage";
import RutaPage from "./pages/RutaPage";

export default function App() {
  const route = useHashRoute();

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
        {route.name === "notfound" && (
          <PageHero
            eyebrow="Error 404"
            title="Esa página no existe, pero tu flete sí lo movemos"
            desc="Vuelve al inicio o cotiza directo por WhatsApp."
            crumbs={[["Inicio", "/"]]}
            ctaPrimary={{ label: "Ir al inicio", to: "/" }}
            ctaSecondary={{ label: "Cotizar", to: "/cotizar" }}
          />
        )}
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
