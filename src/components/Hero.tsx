import { href } from "../lib/router";
import { useAutoplayVideo } from "../lib/video";

export default function Hero() {
  const videoRef = useAutoplayVideo<HTMLVideoElement>();

  return (
    <section id="inicio" className="fill-screen relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#f2f5f9] pb-10 pt-[96px] sm:pt-[104px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <video
            ref={videoRef}
            src="/hero/video/hero-main.webm"
            poster="/hero-rutas-bajio.webp"
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f2f5f9] via-[#f2f5f9]/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2f5f9] to-transparent" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="flex max-w-2xl flex-col justify-center">
          <h1 className="font-heading mt-5 text-3xl font-extrabold text-[#0b2a4a] ms:text-4xl sm:text-5xl lg:text-[58px]">
            Flete dedicado desde Guadalajara
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Unidades de carga a partir de 1 hasta 15 toneladas con servicio local ZMG, entregas foráneas
            y despacho en aduana. Cotiza con nosotros, facturación de inmediato, evidencia fotográfica, cuenta espejo.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={href("/cotizar")}
              className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
            >
              Cotizar
            </a>
            <a
              href={href("/flota")}
              className="rounded-lg border border-[#0b2a4a]/20 bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a]"
            >
              Ver flota
            </a>
          </div>
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-4 border-t border-[#dce4ed] pt-6 ms:gap-6">
            {[
              ["100%", "Dedicado"],
              ["7 + 1", "ZMG + rutas"],
              ["- 3h", "Respuesta"],
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
