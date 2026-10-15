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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#0077c8]">Local · ZMG</p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">
                Zona Metropolitana de Guadalajara
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Recolección y entrega con unidad dedicada y maniobras opcionales.
              </p>
            </div>
            <a
              href={buildCotizarHref({ origen: "Guadalajara", tipo: "Local" })}
              className="rounded-lg bg-[#0077c8] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
            >
              Cotizar local →
            </a>
          </div>

          <figure className="relative mt-8 overflow-hidden rounded-2xl bg-[#0b2a4a] shadow-[0_16px_40px_rgba(11,42,74,0.18)]">
            <img
              src="/cobertura-zmg.webp"
              alt="Mapa de cobertura local en la Zona Metropolitana de Guadalajara"
              className="h-72 w-full object-cover sm:h-96"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/35 to-transparent"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-[#0b2a4a]">
              9 municipios
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {COBERTURA_LOCAL.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2.5 border-b border-white/15 py-2 text-sm font-medium text-white"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </section>
      </ScrollBlock>

      <ScrollBlock id="bloque-cobertura-foraneo">
      <section className="relative overflow-hidden bg-[#0b2a4a] py-16 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow text-sky-300">Foráneo · Salidas desde GDL</p>
              <h2 className="font-heading mt-3 text-3xl font-bold sm:text-4xl">Elige tu destino</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
                7 corredores directos con unidad dedicada. Cada boleto trae distancia,
                unidad ideal y ficha completa.
              </p>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Salidas todos los días hábiles
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {RUTAS.map((r, i) => (
              <a
                key={r.slug}
                href={href(`/ruta/${r.slug}`)}
                className="group flex items-stretch overflow-hidden rounded-2xl bg-white text-[#0b2a4a] shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="relative hidden w-28 shrink-0 sm:block">
                  <img
                    src={r.imagen}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="font-condensed absolute left-2 top-2 rounded-md bg-[#0b2a4a]/85 px-2 py-0.5 text-sm font-semibold tracking-wider text-white backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0 flex-1 px-5 py-4 sm:py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0077c8]">
                    GDL → {r.destino}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold">{r.distancia}</p>
                  <p className="mt-0.5 line-clamp-1 text-[13px] text-slate-500">{r.ideal}</p>
                </div>
                <div className="relative flex items-center border-l border-dashed border-[#dce4ed] px-4 sm:px-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f5f9] text-lg font-bold text-[#0077c8] transition group-hover:translate-x-1 group-hover:bg-[#0077c8] group-hover:text-white">
                    →
                  </span>
                </div>
              </a>
            ))}

            <a
              href={buildCotizarHref({ origen: "Guadalajara", tipo: "Foráneo" })}
              className="group flex items-stretch overflow-hidden rounded-2xl bg-[#0077c8] text-white shadow-[0_16px_40px_rgba(0,119,200,0.35)] transition hover:-translate-y-1 hover:bg-[#005a97]"
            >
              <div className="min-w-0 flex-1 px-5 py-4 sm:py-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-200">
                  Comodín nacional
                </p>
                <p className="font-heading mt-1 text-lg font-bold">¿No está tu destino?</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-white/75">{COBERTURA_NACIONAL_MSG}</p>
              </div>
              <div className="relative flex items-center border-l border-dashed border-white/30 px-4 sm:px-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-[#0077c8] transition group-hover:translate-x-1 group-hover:bg-[#0b2a4a] group-hover:text-white">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
      </ScrollBlock>
    </>
  );
}
