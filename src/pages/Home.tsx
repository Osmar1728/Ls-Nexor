import Hero from "../components/Hero";
import PainSelector from "../components/PainSelector";
import ScrollBlock from "../components/ScrollBlock";
import { Cobertura, Faq, Flota, PorQue, Proceso, Servicios, Aduana, TrustStrip } from "../components/Sections";
import { usePageMeta } from "../lib/router";

export default function Home() {
  usePageMeta("home");
  return (
    <div id="home-blocks">
      {/* Bloque 1 — Hero (pantalla completa) */}
      <ScrollBlock id="bloque-inicio">
        <Hero />
      </ScrollBlock>

      {/* Bloque 2 — Confianza + soluciones: un solo scroll en laptop alta. */}
      <ScrollBlock id="bloque-soluciones">
        <div className="fill-screen flex flex-col bg-white pb-10 lg:justify-center lg:pb-12">
          <TrustStrip />
          <PainSelector />
        </div>
      </ScrollBlock>

      {/* Bloque 3+4 — Flota y Proceso en una sola pantalla (laptop).
          Flota conserva su diseño; Proceso usa versión simple. */}
      <ScrollBlock id="bloque-flota-proceso">
        <div className="fill-screen lg:flex lg:flex-col lg:justify-center">
          <Flota fill={false} />
          <Proceso compact />
        </div>
      </ScrollBlock>

      {/* Bloque 5 — Cobertura */}
      <ScrollBlock id="bloque-cobertura">
        <Cobertura />
      </ScrollBlock>

      {/* Bloque 6 — Servicios (solo Flete, Seguro y Maniobras). */}
      <ScrollBlock id="bloque-servicios">
        <Servicios fill={false} />
      </ScrollBlock>

      {/* Bloque 7 — Aduana + Nosotros en una sola pantalla (laptop). */}
      <ScrollBlock id="bloque-aduana-nosotros">
        <div className="fill-screen lg:flex lg:flex-col lg:justify-start">
          <Aduana />
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
