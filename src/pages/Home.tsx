import Cotizador from "../components/Cotizador";
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

      {/* Bloque 2 — Confianza + soluciones: un solo scroll en laptop.
          En la captura ambos deben verse juntos y el gris de Flota
          debe quedar justo al borde inferior (lo marcado en rojo). */}
      <ScrollBlock id="bloque-soluciones">
        <div className="flex flex-col bg-white pb-10 lg:min-h-[calc(100vh-64px)] lg:justify-center lg:pb-12">
          <TrustStrip />
          <PainSelector />
        </div>
      </ScrollBlock>

      {/* Bloque 3 — Flota */}
      <ScrollBlock id="bloque-flota">
        <Flota />
      </ScrollBlock>

      {/* Bloque 4 — Proceso / timeline (arriba de Cobertura) */}
      <ScrollBlock id="bloque-proceso">
        <Proceso />
      </ScrollBlock>

      {/* Bloque 5 — Cobertura */}
      <ScrollBlock id="bloque-cobertura">
        <Cobertura />
      </ScrollBlock>

      {/* Bloque 6 — Servicios */}
      <ScrollBlock id="bloque-servicios">
        <Servicios />
      </ScrollBlock>

      {/* Bloque 7 — Nosotros / Por qué */}
      <ScrollBlock id="bloque-nosotros">
        <PorQue />
      </ScrollBlock>

      {/* Bloque 8 — FAQ */}
      <ScrollBlock id="bloque-faq">
        <Faq />
      </ScrollBlock>

      {/* Bloque 9 — Cotizador */}
      <ScrollBlock id="bloque-cotizar">
        <Cotizador />
      </ScrollBlock>
    </div>
  );
}
