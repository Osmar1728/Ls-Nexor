import { BUSINESS, COBERTURA_LOCAL, COBERTURA_NACIONAL_MSG, FLEET_UNITS, NOTA_FLOTA } from "../config";
import { buildCotizarHref, href } from "../lib/router";
import { RUTAS } from "../lib/rutas";

function Heading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-[#0077c8]">{eyebrow}</p>
      <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{desc}</p>}
    </div>
  );
}

export function TrustStrip() {
  const items = [
    ["Servicio local", "ZMG y Jalisco"],
    ["Rutas foráneas", "7 corredores"],
    ["Caja seca", "Toda la flota"],
    ["Seguro de mercancia", "Cobertura opcional"],
  ];
  return (
    <div className="border-y border-[#dce4ed] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-6 sm:px-8 lg:grid-cols-4">
        {items.map(([v, l]) => (
          <div key={l} className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#0077c8]" />
            <div>
              <p className="text-sm font-semibold text-[#0b2a4a]">{v}</p>
              <p className="text-xs text-slate-500">{l}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Flota() {
  return (
    <section id="flota" className="bg-[#e8edf3] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#0077c8]">Flota</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">4 unidades para cada tipo de carga</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Toca una unidad para ver su ficha técnica completa. {NOTA_FLOTA}
            </p>
          </div>
          <a href={href("/flota")} className="text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Ver fichas técnicas →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
          {FLEET_UNITS.map((u) => (
            <a
              key={u.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,74,0.16)] sm:p-5"
            >
              <div className="overflow-hidden rounded-xl bg-[#f2f5f9]">
                <img
                  src={u.image}
                  alt={u.name}
                  className="h-36 w-full object-cover transition group-hover:scale-105 sm:h-44"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <p
                className="mt-4 text-center text-[15px] font-semibold sm:text-base"
                style={{ color: "#0b2a4a" }}
              >
                {u.name}
              </p>
              <p className="mt-1 text-center text-[13px] text-slate-500">
                {u.dimensions.largo} × {u.dimensions.ancho} × {u.dimensions.alto}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Vista /flota: fichas en zigzag, cada unidad con foto grande, tabla de specs y cotización directa. */
export function FlotaDetalle() {
  return (
    <section id="flota" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="eyebrow text-[#0077c8]">Flota · Fichas técnicas</p>
        <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">Cada unidad, a detalle</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
          Toda la flota es caja seca cerrada. {NOTA_FLOTA}
        </p>

        <div className="mt-10 space-y-8">
          {FLEET_UNITS.map((u, i) => {
            const waHref = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
              `Hola LS NEXOR, quiero cotizar con la unidad ${u.name} (${u.maxWeight}).`,
            )}`;
            const flip = i % 2 === 1;
            return (
              <article
                key={u.id}
                id={`unidad-${u.id}`}
                className="grid scroll-mt-20 overflow-hidden rounded-2xl border border-[#dce4ed] bg-white shadow-[0_8px_30px_rgba(11,42,74,0.08)] lg:grid-cols-2"
              >
                <div className={`relative min-h-[260px] bg-[#0b2a4a] lg:min-h-[360px] ${flip ? "lg:order-2" : ""}`}>
                  <img
                    src={u.image}
                    alt={u.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-[#0077c8] px-4 py-1.5 font-heading text-sm font-bold text-white">
                    {u.short}
                  </span>
                </div>
                <div className={`p-6 sm:p-9 ${flip ? "lg:order-1" : ""}`}>
                  <h3 className="font-heading mt-2 text-2xl font-bold text-[#005a97]">{u.name}</h3>
                  <dl className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
                    {[
                      ["Capacidad máxima", u.maxWeight],
                      ["Volumen útil", u.volume],
                      ["Dimensiones (L × A × A)", `${u.dimensions.largo} × ${u.dimensions.ancho} × ${u.dimensions.alto}`],
                      ["Uso recomendado", u.usage],
                    ].map(([t, d]) => (
                      <div key={t} className="grid grid-cols-[1fr_1.2fr] gap-3 py-3 text-sm">
                        <dt className="pt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{t}</dt>
                        <dd className="font-semibold text-[#0b2a4a]">{d}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-[#0077c8] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
                    >
                      Cotizar con esta →
                    </a>
                    <a
                      href={buildCotizarHref({ unidad: u.name })}
                      className="flex-1 rounded-lg border border-[#dce4ed] px-4 py-3 text-center text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a]"
                    >
                      Ficha en cotizador
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Cobertura() {
  return (
    <section id="cobertura" className="bg-[#f2f5f9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#0077c8]">Cobertura</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">Base en Guadalajara, cobertura foránea</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">Operación local en ZMG y 7 corredores foráneos directos. Otras rutas bajo cotización.</p>
          </div>
          <a href={href("/cobertura")} className="text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Ver página de rutas →
          </a>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col rounded-2xl bg-[#0b2a4a] p-6 text-white sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Local · ZMG </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {COBERTURA_LOCAL.map((c) => (
                <span
                  key={c}
                  className="flex min-h-[44px] items-center justify-center rounded-xl bg-white/10 px-2 py-2 text-center text-[13px] font-medium leading-tight text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-white/15 pt-4 text-sm leading-relaxed text-white/70">
              Recolección y entrega con unidad dedicada.
            </p>
            <div className="relative mt-5 overflow-hidden rounded-xl">
              <img
                src="/cobertura-zmg.webp"
                alt="Mapa de cobertura local LS NEXOR en la Zona Metropolitana de Guadalajara"
                className="h-44 w-full rounded-xl object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-[#dce4ed] bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0077c8]">Foráneo · 7 rutas base</p>
            <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
              {RUTAS.map((r) => (
                <a key={r.slug} href={href(`/ruta/${r.slug}`)} className="group border-b border-slate-100 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[15px] font-semibold text-[#0b2a4a] group-hover:text-[#0077c8]">
                      GDL → {r.destino}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[13px] text-slate-500">{r.distancia}</p>
                </a>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <p className="rounded-lg bg-[#f2f5f9] p-4 text-sm text-slate-600">{COBERTURA_NACIONAL_MSG}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Servicios() {
  return (
    <section id="servicios" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Servicios" title="Lo que contratás, lo que recibís" desc="Tres servicios claros, precio cerrado por escrito." />
          <a href={href("/servicios")} className="text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Ver detalle de servicios →
          </a>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <a
            href={href("/servicios")}
            className="group flex flex-col justify-between rounded-2xl bg-[#0b2a4a] p-7 text-white transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,74,0.35)] sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0077c8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Principal
                </span>
                <span className="font-heading text-4xl font-bold text-white/15">01</span>
              </div>
              <h3 className="font-heading mt-4 text-2xl font-bold sm:text-3xl">Flete dedicado</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
                Unidad exclusiva para tu mercancía. Sin consolidar, puerta a puerta.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Unidad exclusiva, sin compartir", "Puerta a puerta local y foráneo", "Precio cerrado por escrito"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300">
              Cotizar flete dedicado
              <span className="transition group-hover:translate-x-1">→</span>
            </p>
          </a>
          <div className="grid gap-5">
            {[
              {
                n: "02",
                tag: "Opcional",
                tagCls: "bg-emerald-100 text-emerald-700",
                t: "Seguro de carga",
                d: "Cobertura por evento cotizada junto al flete para proteger el valor de tu mercancía.",
              },
              {
                n: "03",
                tag: "Adicional",
                tagCls: "bg-amber-100 text-amber-700",
                t: "Maniobras",
                d: "Carga y descarga en origen y destino con personal de apoyo. Solicítalo en tu cotización.",
              },
            ].map((s) => (
              <a
                key={s.t}
                href={href("/servicios")}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-[#dce4ed] bg-[#f2f5f9] p-6 transition hover:-translate-y-1 hover:border-[#0077c8] hover:bg-white hover:shadow-[0_12px_28px_rgba(11,42,74,0.12)] sm:p-7"
              >
                <div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${s.tagCls}`}>
                    {s.tag}
                  </span>
                  <h3 className="font-heading mt-3 text-xl font-bold text-[#0b2a4a] sm:text-2xl">{s.t}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{s.d}</p>
                </div>
                <span className="font-heading shrink-0 text-4xl font-bold text-[#dce4ed] transition group-hover:text-[#0077c8]">
                  {s.n}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Proceso() {
  const steps = [
    ["01", "Cotiza", "Origen, destino, unidad y fotos por WhatsApp.", "5 min"],
    ["02", "Confirmamos", "Precio cerrado en menos de 3 horas (Lun–Vie).", "<3h"],
    ["03", "Recolectamos", "Unidad puntual + maniobras si aplica.", "Puntual"],
    ["04", "Entregamos", "Puerta a puerta con factura.", "Puerta a puerta"],
  ];
  return (
    <section id="proceso" className="bg-[#0b2a4a] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <p className="eyebrow text-sky-300">Proceso</p>
        <h2 className="font-heading mt-3 text-3xl font-bold sm:text-4xl">De la cotización a la entrega</h2>

        {/* Móvil / tablet: timeline vertical */}
        <ol className="relative mt-10 space-y-6 lg:hidden">
          <span aria-hidden="true" className="timeline-rail absolute bottom-6 left-[25px] top-6 w-0.5 bg-white/15" />
          {steps.map(([n, t, d, meta], i) => (
            <li key={t} className="timeline-step relative flex items-start gap-5" style={{ transitionDelay: `${200 + i * 220}ms` }}>
              <span
                aria-hidden="true"
                className="timeline-dot z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#0077c8] font-heading text-sm font-bold text-white ring-4 ring-[#0b2a4a]"
                style={{ transitionDelay: `${i * 220}ms` }}
              >
                {n}
              </span>
              <div className="flex-1 rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-bold">{t}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    {meta}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: timeline horizontal */}
        <ol className="relative mt-14 hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="timeline-rail--x absolute left-8 right-8 top-[25px] h-0.5 bg-white/15" />
          {steps.map(([n, t, d, meta], i) => (
            <li key={t} className="timeline-step relative flex flex-col" style={{ transitionDelay: `${200 + i * 220}ms` }}>
              <span
                aria-hidden="true"
                className="timeline-dot relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0077c8] font-heading text-sm font-bold text-white ring-4 ring-[#0b2a4a]"
                style={{ transitionDelay: `${i * 220}ms` }}
              >
                {n}
              </span>
              <div className="mt-5 flex-1 rounded-xl border border-white/15 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-lg font-bold">{t}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    {meta}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PorQue() {
  return (
    <section id="nosotros" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-6 sm:px-8 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[#0b2a4a]">
          <img
            src="/hero/unidad-principal.jpg"
            alt="Unidad dedicada LS NEXOR"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-5 sm:p-6">
            {[
              ["100%", "Dedicado"],
              ["7+1", "ZMG + rutas"],
              ["Nacional", "Bajo cotización"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
                <p className="font-heading text-lg font-bold text-white sm:text-xl">{v}</p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Heading
            eyebrow="Nosotros"
            title="Operador PyME, comunicación total"
            desc="Logística y Servicio NEXOR. Unidad dedicada, precio cerrado por escrito y comunicación directa durante todo el viaje. Factura con carta porte el mismo día."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0077c8]">Misión</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Mover la carga de las PyMEs con flete dedicado, precio cerrado y entrega puntual desde Guadalajara.
              </p>
            </div>
            <div className="rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0077c8]">Visión</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Ser el operador regional más rápido y confiable para fletes dedicados, creciendo por recomendación.
              </p>
            </div>
          </div>
          <a href={href("/nosotros")} className="mt-6 inline-block text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Conócenos más →
          </a>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    ["¿Cuánto cuesta un flete?", "Depende de origen, destino, unidad y carga. Envíanos el cotizador y respondemos en menos de 3 horas (Lun–Vie 8–18)."],
    ["¿Qué unidades tienen?", "Camioneta 1T, 3.5T caja seca, Rabón 8T y Trailer 15+T. Todas caja cerrada; medidas aproximadas."],
    ["¿Qué incluye el servicio?", "Flete dedicado puerta a puerta. Seguro de carga y maniobras se cotizan como adicionales."],
    ["¿A dónde llegan?", "ZMG + San Luis Potosí, Querétaro, Puerto Vallarta, Morelia, Tequila, Silao y Manzanillo. Otras rutas bajo cotización."],
    ["¿Emiten factura?", "Sí. Indícalo en el formulario y emitimos factura con carta porte."],
    ["¿Cómo reservo?", "Por WhatsApp o correo. Confirmamos unidad, horario y precio cerrado."],
  ];
  return (
    <section id="faq" className="bg-[#f2f5f9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="eyebrow text-center text-[#0077c8]">FAQ</p>
        <h2 className="font-heading mt-3 text-center text-3xl font-bold text-[#0b2a4a] sm:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-8 grid items-start gap-4 md:grid-cols-2">
          {faqs.map(([q, a], i) => (
            <details key={q} className="group rounded-2xl border border-[#dce4ed] bg-white px-5 py-4 transition hover:border-[#0077c8]/50 hover:shadow-[0_8px_24px_rgba(11,42,74,0.08)]">
              <summary className="flex cursor-pointer list-none items-center gap-4">
                <span className="font-heading shrink-0 text-sm font-bold text-[#0077c8]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[15px] font-semibold text-[#0b2a4a]">{q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f5f9] text-lg font-medium text-[#0077c8] transition group-open:rotate-45 group-open:bg-[#0077c8] group-open:text-white">+</span>
              </summary>
              <p className="mt-2 border-t border-slate-100 pl-10 pt-3 text-sm leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-600">
          ¿Otra duda?{" "}
          <a
            href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent("Hola LS NEXOR, tengo una pregunta sobre sus fletes.")}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#0077c8] hover:text-[#005a97]"
          >
            Escríbenos por WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
