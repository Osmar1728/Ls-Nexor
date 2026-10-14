import { FlotaDetalle } from "../components/Sections";
import { FLEET_UNITS } from "../config";
import { href, usePageMeta } from "../lib/router";

export default function FlotaPage() {
  usePageMeta("flota");

  return (
    <>
      <section className="relative flex flex-col justify-center overflow-hidden bg-[#0b2a4a] pb-12 pt-[96px] text-white sm:pt-[104px]">
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero/video/trailer-24s.webm"
          poster="/hero-rutas-bajio.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a]/95 via-[#0b2a4a]/65 to-[#0b2a4a]/25" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b2a4a] to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-6 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <a href={href("/")} className="transition hover:text-white">Inicio</a>
            <span className="text-white/30">/</span>
            <span className="font-semibold text-white">Flota</span>
          </nav>
          <h1 className="font-heading max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px]">
            Flota: 4 unidades, caja seca cerrada
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/80">
            Elige por peso y volumen y cotiza con la unidad exacta. Medidas aproximadas.
          </p>
          <div className="mt-5">
            <a
              href={href("/cotizar")}
              className="inline-block rounded-lg bg-[#0077c8] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
            >
              Cotizar con mi unidad
            </a>
          </div>
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {[
              ["4", "Unidades"],
              ["100%", "Caja seca"],
              ["✓", "Precio cerrado"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-condensed text-3xl font-semibold tracking-wide text-white">{v}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FlotaDetalle />

      <section id="comparativa" className="scroll-mt-20 bg-[#f2f5f9] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Comparativa rápida</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">¿Cuál te conviene?</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#0b2a4a] bg-white shadow-[0_8px_30px_rgba(11,42,74,0.10)]">
            <table className="w-full min-w-[560px] text-center text-sm">
              <thead>
                <tr className="bg-[#0b2a4a] text-xs uppercase tracking-wider text-white">
                  <th className="px-5 py-4">Unidad</th>
                  <th className="px-5 py-4">Capacidad</th>
                  <th className="px-5 py-4">Volumen</th>
                  <th className="px-5 py-4">Ideal para</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FLEET_UNITS.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-4 font-semibold text-[#0b2a4a]">{u.name}</td>
                    <td className="px-5 py-4 text-slate-600">{u.maxWeight}</td>
                    <td className="px-5 py-4 text-slate-600">{u.volume}</td>
                    <td className="px-5 py-4 text-slate-600">{u.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid overflow-hidden rounded-2xl bg-[#0b2a4a] text-white lg:grid-cols-[1.1fr_1fr]">
            <div className="p-7 sm:p-10">
              <p className="eyebrow text-sky-300">Compromiso honesto</p>
              <h2 className="font-heading mt-3 text-2xl font-bold sm:text-3xl">
                Tenemos el compromiso de ofrecer el mejor servicio adecuado a tus necesidades
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
                No queremos cobrar de más ni mandarte un camión sobrado. Si con una unidad menor sale tu flete,
                te lo decimos aunque nos cueste el viaje. Y si ninguna unidad es adecuada, también.
              </p>
            </div>
            <ul className="divide-y divide-white/10 border-t border-white/10 bg-white/5 p-7 sm:p-10 lg:border-l lg:border-t-0">
              {[
                ["Unidad a tu medida", "Calculamos el cubicaje según las dimensiones de tu carga para asignar la unidad correcta."],
                ["Notificación anticipada", "Nos anticipamos con toda la información correspondiente para evitar fletes en falso."],
                ["Precios correctos", "Precios acordes a los servicios prestados; en caso de cargos extras, notificamos para la autorización del cliente."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-heading text-sm font-bold text-white">
                    ✓
                  </span>
                  <div>
                    <p className="font-heading text-lg font-bold">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
