import { FlotaDetalle } from "../components/Sections";
import ScrollBlock from "../components/ScrollBlock";
import { useAutoplayVideo } from "../lib/video";
import { FLEET_UNITS } from "../config";
import { href, usePageMeta } from "../lib/router";

export default function FlotaPage() {
  usePageMeta("flota");
  const videoRef = useAutoplayVideo<HTMLVideoElement>();

  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#f2f5f9] pb-12 pt-[96px] text-[#0b2a4a] sm:pt-[104px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <video
            ref={videoRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/hero/video/trailer-24s.webm"
            poster="/hero-rutas-bajio.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#f2f5f9] via-[#f2f5f9]/55 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f2f5f9] to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <a href={href("/")} className="transition hover:text-[#0b2a4a]">Inicio</a>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-[#0b2a4a]">Flota</span>
          </nav>
          <div className="flex max-w-2xl flex-col justify-center">
            <h1 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[44px]">
              Flota: 4 unidades, caja seca cerrada
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
              Elige por peso y volumen y cotiza con la unidad exacta: Camioneta 1T, Camión 3.5T caja seca,
              Rabón 8T y Tráiler 15+T. Todas con caja cerrada, unidad dedicada sin compartir
              y precio cerrado por escrito. Medidas aproximadas.
            </p>
            <div className="mt-7">
              <a
                href={href("/cotizar")}
                className="inline-block rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
              >
                Cotizar con mi unidad
              </a>
            </div>
            <div className="mt-7 grid max-w-lg grid-cols-3 gap-6 border-t border-[#dce4ed] pt-6">
              {[
                ["4", "Unidades"],
                ["100%", "Caja seca"],
                ["✓", "Precio cerrado"],
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

      <ScrollBlock id="bloque-flota-detalle">
        <FlotaDetalle />
      </ScrollBlock>

      <ScrollBlock id="bloque-comparativa">
      <section id="comparativa" className="fill-screen flex scroll-mt-20 flex-col justify-center bg-[#f2f5f9] py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Comparativa rápida</p>
          <h2 className="font-heading mt-2 text-2xl font-bold text-[#0b2a4a] sm:text-3xl">¿Cuál te conviene?</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#0b2a4a] bg-white shadow-[0_8px_30px_rgba(11,42,74,0.10)]">
            <table className="w-full min-w-[560px] text-center text-sm">
              <thead>
                <tr className="bg-[#0b2a4a] text-xs uppercase tracking-wider text-white">
                  <th className="px-4 py-2.5">Unidad</th>
                  <th className="px-4 py-2.5">Capacidad</th>
                  <th className="px-4 py-2.5">Volumen</th>
                  <th className="px-4 py-2.5">Ideal para</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FLEET_UNITS.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-2.5 font-semibold text-[#0b2a4a]">{u.name}</td>
                    <td className="px-4 py-2.5 text-slate-600">{u.maxWeight}</td>
                    <td className="px-4 py-2.5 text-slate-600">{u.volume}</td>
                    <td className="px-4 py-2.5 text-slate-600">{u.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <p className="eyebrow text-[#0077c8]">Compromiso honesto</p>
            <h2 className="font-heading mt-2 text-xl font-bold text-[#0b2a4a] sm:text-2xl">
              La unidad correcta, ni más ni menos
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Te recomendamos la unidad que tu carga realmente necesita: sin camión sobrado ni cobros de más.
              Y si ninguna de nuestras unidades es adecuada para tu flete, te lo decimos de frente.
            </p>
            <ul className="mt-5 grid gap-5 md:grid-cols-3">
              {[
                ["Unidad a tu medida", "Calculamos el cubicaje según las dimensiones de tu carga para asignar la unidad correcta."],
                ["Notificación anticipada", "Nos anticipamos con toda la información correspondiente para evitar fletes en falso."],
                ["Precios correctos", "Precios acordes a los servicios prestados; en caso de cargos extras, notificamos para la autorización del cliente."],
              ].map(([t, d]) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-heading text-xs font-bold text-white">
                    ✓
                  </span>
                  <div>
                    <p className="font-heading text-base font-bold text-[#0b2a4a]">{t}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      </ScrollBlock>
    </>
  );
}
