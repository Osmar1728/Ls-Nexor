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

      {/* Tira de confianza — ancla sin forzar pantalla */}
      <ScrollBlock fill={false}>
        <TrustStrip />
      </ScrollBlock>

      {/* Bloque 2 — Dolores / selector */}
      <ScrollBlock id="bloque-soluciones">
        <PainSelector />
      </ScrollBlock>

      {/* Bloque 3 — Flota */}
      <ScrollBlock id="bloque-flota">
        <Flota />
      </ScrollBlock>

      {/* Bloque 4 — Cobertura */}
      <ScrollBlock id="bloque-cobertura">
        <Cobertura />
      </ScrollBlock>

      {/* Bloque 5 — Servicios */}
      <ScrollBlock id="bloque-servicios">
        <Servicios />
      </ScrollBlock>

      {/* Bloque 6 — Proceso */}
      <ScrollBlock id="bloque-proceso">
        <Proceso />
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
