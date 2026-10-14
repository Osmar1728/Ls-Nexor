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
        desc="Operación local y corredores foráneos nacionales. Unidad dedicada. ¿Otra ruta? Cotizamos nacional bajo solicitud."
        crumbs={[["Inicio", "/"], ["Cobertura", "/cobertura"]]}
        ctaPrimary={{ label: "Cotizar mi ruta", to: "/cotizar" }}
        ctaSecondary={{ label: "Ver flota", to: "/flota" }}
        stats={[["7 + 1", "ZMG + rutas"], ["Foráneo", "Nacional"], ["100%", "Dedicado"]]}
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-6 sm:px-8 lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl">
            <img
              src="/cobertura-zmg.webp"
              alt="Mapa de cobertura local en la Zona Metropolitana de Guadalajara"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-[#0b2a4a] p-7 text-white sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Local</p>
            <h2 className="font-heading mt-2 text-2xl font-bold sm:text-3xl">Zona Metropolitana de Guadalajara</h2>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {COBERTURA_LOCAL.map((c) => (
                <span key={c} className="flex min-h-[40px] items-center justify-center rounded-lg bg-white/10 px-2 py-1.5 text-center text-[13px] font-medium leading-tight text-white">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Recolección y entrega con maniobras opcionales.
            </p>
            <a href={buildCotizarHref({ origen: "Guadalajara", tipo: "Local" })} className="mt-4 text-sm font-semibold text-sky-300 hover:text-white">
              Cotizar local →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5f9] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Foráneo</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Elige tu destino</h2>
          <p className="mt-2 text-[15px] text-slate-600">Cada ruta tiene ficha con distancias, unidad ideal y preguntas. Toca para ver detalle.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {RUTAS.map((r, i) => (
              <a
                key={r.slug}
                href={href(`/ruta/${r.slug}`)}
                className="group flex flex-col rounded-2xl border border-[#dce4ed] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0077c8] hover:shadow-[0_12px_28px_rgba(11,42,74,0.12)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2a4a] text-sm font-bold text-white">
                    {i + 1}
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
    </>
  );
}
