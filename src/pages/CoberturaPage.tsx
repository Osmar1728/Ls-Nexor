import ScrollBlock from "../components/ScrollBlock";
import VideoHero from "../components/VideoHero";
import { COBERTURA_LOCAL, COBERTURA_NACIONAL_MSG } from "../config";
import { buildCotizarHref, href, usePageMeta } from "../lib/router";
import { RUTAS } from "../lib/rutas";

export default function CoberturaPage() {
  usePageMeta("cobertura");

  return (
    <>
      <VideoHero
        video="/hero/video/dron-carretera.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow="Cobertura · Base Guadalajara"
        title="ZMG + 7 rutas foráneas directas"
        desc="Operación local, corredores foráneos y despacho en aduana. Unidad dedicada con operadores autorizados. ¿Otra ruta? Cotizamos nacional bajo solicitud."
        crumbs={[["Inicio", "/"], ["Cobertura", "/cobertura"]]}
        ctaPrimary={{ label: "Cotizar mi ruta", to: "/cotizar" }}
        ctaSecondary={{ label: "Ver flota", to: "/flota" }}
        stats={[["7 + 1", "ZMG + rutas"], ["Aduana", "Recinto fiscal"], ["100%", "Dedicado"]]}
      />

      <ScrollBlock id="bloque-cobertura-local">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#0b2a4a] text-white">
            <img
              src="/cobertura-zmg.webp"
              alt="Mapa de cobertura local en la Zona Metropolitana de Guadalajara"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-[#0b2a4a] via-50% to-white" aria-hidden="true" />
            <div className="relative grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-7 text-center sm:p-9 lg:col-span-2 lg:mx-auto lg:max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Local</p>
                <h2 className="font-heading mt-2 text-2xl font-bold text-white sm:text-3xl">Zona Metropolitana de Guadalajara</h2>
                <ul className="mx-auto mt-2 grid w-full max-w-md gap-x-5 sm:grid-cols-2">
                  {COBERTURA_LOCAL.map((c) => (
                    <li
                      key={c}
                      className="flex items-center justify-center gap-2.5 border-b border-white/10 py-2.5 text-sm text-white/85"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Recolección y entrega con maniobras opcionales.
                </p>
                <a href={buildCotizarHref({ origen: "Guadalajara", tipo: "Local" })} className="mt-4 text-sm font-semibold text-sky-300 hover:text-white">
                  Cotizar local →
                </a>
              </div>
              <div className="relative hidden min-h-[240px] lg:block lg:min-h-[320px]" />
            </div>
          </div>
        </div>
      </section>
      </ScrollBlock>

      <ScrollBlock id="bloque-cobertura-foraneo">
      <section className="bg-[#f2f5f9] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Foráneo</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Elige tu destino</h2>
          <p className="mt-2 text-[15px] text-slate-600">Cada ruta tiene ficha con distancias, unidad ideal y preguntas. Toca para ver detalle.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {RUTAS.map((r) => (
              <a
                key={r.slug}
                href={href(`/ruta/${r.slug}`)}
                className="group flex flex-col rounded-2xl border border-[#dce4ed] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0077c8] hover:shadow-[0_12px_28px_rgba(11,42,74,0.12)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2a4a] text-white" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                      <path d="M12 21.5s-7.5-6-7.5-11.5a7.5 7.5 0 1 1 15 0C19.5 15.5 12 21.5 12 21.5z" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0b2a4a] group-hover:text-[#0077c8]">
                  GDL → {r.destino}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{r.distancia} · {r.ideal}</p>
                <p className="mt-3 pt-1 text-sm font-semibold text-[#0077c8]">
                  Ver ficha <span className="inline-block transition group-hover:translate-x-1">→</span>
                </p>
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#dce4ed] bg-white p-6 text-center sm:p-8">
            <h3 className="font-heading text-xl font-bold text-[#0b2a4a]">¿No está tu destino?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{COBERTURA_NACIONAL_MSG}</p>
            <a href={buildCotizarHref({ origen: "Guadalajara", tipo: "Foráneo" })} className="mt-4 inline-block rounded-lg bg-[#0077c8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005a97]">
              Cotizar ruta nacional
            </a>
          </div>
        </div>
      </section>
      </ScrollBlock>
    </>
  );
}
