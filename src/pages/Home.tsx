import Hero from "../components/Hero";
import PainSelector from "../components/PainSelector";
import ScrollBlock from "../components/ScrollBlock";
import { Cobertura, Faq, Flota, PorQue, Proceso, Servicios, TrustStrip } from "../components/Sections";
import { usePageMeta } from "../lib/router";

export default function Home() {
  usePageMeta("home");
  return (
    <div id="home-blocks">
      {/* Bloque 1 — Hero (pantalla completa) */}
      <ScrollBlock id="bloque-inicio">
        <Hero />
      </ScrollBlock>

      {/* Bloque 2 — Confianza + soluciones: un solo scroll en laptop. */}
      <ScrollBlock id="bloque-soluciones">
        <div className="flex flex-col bg-white pb-10 lg:min-h-[calc(100vh-64px)] lg:justify-center lg:pb-12">
          <TrustStrip />
          <PainSelector />
        </div>
      </ScrollBlock>

      {/* Bloque 3+4 — Flota y Proceso en una sola pantalla (desktop).
          Flota conserva su diseño; Proceso usa versión simple. */}
      <ScrollBlock id="bloque-flota-proceso">
        <div className="lg:flex lg:min-h-[calc(100vh-64px)] lg:flex-col">
          <Flota fill={false} />
          <Proceso compact />
        </div>
      </ScrollBlock>

      {/* Bloque 5 — Cobertura */}
      <ScrollBlock id="bloque-cobertura">
        <Cobertura />
      </ScrollBlock>

      {/* Bloque 6+7 — Servicios y Nosotros en una sola pantalla (desktop).
          Servicios conserva su diseño; Nosotros usa versión simple. */}
      <ScrollBlock id="bloque-servicios-nosotros">
        <div className="lg:flex lg:min-h-[calc(100vh-64px)] lg:flex-col">
          <Servicios fill={false} />
          <PorQue compact />
        </div>
      </ScrollBlock>

      {/* Bloque 8 — FAQ */}
      <ScrollBlock id="bloque-faq">
        <Faq />
      </ScrollBlock>
    </div>
  );
}
