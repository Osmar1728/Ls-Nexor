import { href } from "../lib/router";

export default function Hero() {
  const scrollACotizar = () => {
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#f2f5f9] pb-8 pt-[132px] sm:pt-[140px]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[100px]" aria-hidden="true">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] sm:block">
          <img
            src="/hero-rutas-bajio.webp"
            alt=""
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f2f5f9] via-[#f2f5f9]/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2f5f9] to-transparent" />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="flex max-w-2xl flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce4ed] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0077c8]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Flete dedicado · Guadalajara · Respuesta &lt;3h
          </p>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-[#0b2a4a] sm:text-5xl lg:text-[58px]">
            Flete dedicado hoy mismo desde Guadalajara
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Unidades exclusivas de 1 a 15+ toneladas con servicio local ZMG y entregas foráneas hacia el Bajío y Occidente. Cotiza con precio cerrado vía WhatsApp, facturación con Carta Porte y evidencia fotográfica al entregar.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={scrollACotizar}
              className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
            >
              Cotizar
            </button>
            <a
              href={href("/flota")}
              className="rounded-lg border border-[#0b2a4a]/20 bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a]"
            >
              Ver flota
            </a>
          </div>
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-6 border-t border-[#dce4ed] pt-6">
            {[
              ["100%", "Dedicado"],
              ["7+1", "ZMG + rutas"],
              ["<3h", "Respuesta"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-condensed text-3xl font-semibold tracking-wide text-[#0b2a4a]">{v}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
