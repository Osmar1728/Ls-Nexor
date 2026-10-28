import { useState, useEffect, useMemo } from "react";
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
    ["Caja adaptable", "A tu mercancía"],
    ["Seguro de mercancía", "Cobertura opcional"],
    ["Aduana y recinto fiscal", "Operadores autorizados"],
  ];
  return (
    <div className="border-y border-[#dce4ed] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 short:gap-3 px-6 py-6 short:py-2 sm:px-8 ms:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:py-4">
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

export function Flota({ fill = true }: { fill?: boolean }) {
  return (
    <section
      id="flota"
      className={
        fill
          ? "fill-screen flex flex-col justify-center bg-[#e8edf3] py-16 sm:py-20 lg:py-8"
          : "bg-[#e8edf3] py-16 sm:py-20 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-6"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#0077c8]">Flota</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl lg:text-[2.75rem]">4 configuraciones para todo tipo de carga</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-700 lg:text-base">
              Caja adaptable a tu mercancía en todas las configuraciones.
            </p>
          </div>
          <a href={href("/flota")} className="text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Ver fichas técnicas →
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 ms:grid-cols-2 lg:mt-8 lg:gap-6 xl:grid-cols-4">
          {FLEET_UNITS.map((u) => (
            <div
              key={u.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,74,0.16)] sm:p-5 lg:p-6"
            >
              <div className="overflow-hidden rounded-xl bg-white">
                <img
                  src={u.image}
                  alt={u.name}
                  className={`h-36 w-full transition group-hover:scale-105 sm:h-44 lg:h-52 laptop-l:h-60 ${
                    u.imgFit === "contain" ? "object-contain object-center" : "object-cover"
                  }`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <p
                className="mt-4 text-center text-[15px] font-semibold sm:text-base lg:mt-5 lg:text-lg"
                style={{ color: "#0b2a4a" }}
              >
                {u.name}
              </p>
              <p className="mt-1 text-center text-[13px] font-medium text-slate-600">
                {u.dimensions.largo} × {u.dimensions.ancho} × {u.dimensions.alto}
              </p>
              <p className="mt-1 text-center text-[11px] text-slate-400">Imagen ilustrativa</p>
            </div>
          ))}
        </div>
        <p className="flota-disclaimer mt-4 text-xs leading-relaxed text-slate-500">
          * Dimensiones aproximadas, pueden variar según la unidad asignada. Imágenes ilustrativas.
        </p>
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
          Toda la flota cuenta con caja adaptable a tu mercancía. {NOTA_FLOTA}
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
                <div className={`relative min-h-[260px] bg-white lg:min-h-[360px] ${flip ? "lg:order-2" : ""}`}>
                  <img
                    src={u.image}
                    alt={u.name}
                    className={`absolute inset-0 h-full w-full ${u.imgFit === "contain" ? "object-contain object-center p-4" : "object-cover"}`}
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
                  <h3 className="font-heading text-2xl font-bold text-[#005a97] sm:text-3xl">{u.name}</h3>
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
        <p className="mt-6 text-xs text-slate-500">*Imágenes ilustrativas.</p>
      </div>
    </section>
  );
}

export function Cobertura() {
  return (
    <section id="cobertura" className="fill-screen flex flex-col justify-center bg-[#f2f5f9] py-16 sm:py-20 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
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
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col rounded-2xl bg-[#0b2a4a] p-6 text-white sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Local · ZMG </p>
            <ul className="mt-2 grid gap-x-5 sm:grid-cols-2">
              {COBERTURA_LOCAL.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2.5 border-b border-white/10 py-2.5 text-left text-sm text-white/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="cobertura-map relative mt-4 min-h-52 flex-1 overflow-hidden rounded-xl">
              <img
                src="/cobertura-zmg.webp"
                alt="Mapa de cobertura local LS NEXOR en la Zona Metropolitana de Guadalajara"
                className="absolute inset-0 h-full w-full object-cover object-center"
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
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{COBERTURA_NACIONAL_MSG}</p>
                <a href={href("/cotizar")} className="shrink-0 text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
                  Cotizar otra ruta →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Servicios({ fill = true }: { fill?: boolean }) {
  return (
    <section
      id="servicios"
      className={
        fill
          ? "fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10"
          : "fill-screen bg-white py-16 sm:py-20 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-10"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Servicios" title="Lo que contratas, lo que recibes" desc="Elige tu servicio y cotiza en minutos. Precio cerrado." />
          <a href={href("/nosotros")} className="text-sm font-semibold text-[#0077c8] hover:text-[#005a97]">
            Ver detalle de servicios →
          </a>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0b2a4a] p-5 text-white sm:p-6"
          >
            <img
              src="/hero/unidad-principal.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/50 to-[#0b2a4a]/10" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0077c8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Principal
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M2 7h12v9H2z" />
                    <path d="M14 10h4l4 4v2h-8" />
                    <circle cx="6.5" cy="17.5" r="1.7" />
                    <circle cx="17.5" cy="17.5" r="1.7" />
                  </svg>
                </span>
              </div>
              <h3 className="font-heading mt-3 text-xl font-bold sm:text-2xl">Flete directo</h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/70">
                Unidad exclusiva para tu mercancía. Sin consolidar, puerta a puerta.
              </p>
              <ul className="mt-4 space-y-2">
                {["Unidad exclusiva, sin compartir", "Puerta a puerta local y foráneo", "Precio cerrado"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-rows-2">
            {[
              {
                tag: "Opcional",
                tagCls: "bg-emerald-100 text-emerald-700",
                iconCls: "bg-[#0b2a4a] text-white",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M7 3h7l4 4v14H7z" />
                    <path d="M14 3v4h4" />
                    <path d="M10 14.5l1.8 1.8L15.5 12" />
                  </svg>
                ),
                t: "Seguro de carga",
                d: "Cobertura por evento cotizada junto al flete para proteger el valor de tu mercancía.",
              },
              {
                tag: "Adicional",
                tagCls: "bg-amber-100 text-amber-700",
                iconCls: "bg-[#0b2a4a] text-white",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                    <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                  </svg>
                ),
                t: "Maniobras",
                d: "Carga y descarga en origen y destino con personal de apoyo. Solicítalo en tu cotización.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="flex flex-col justify-center rounded-2xl border border-[#dce4ed] bg-[#f2f5f9] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${s.tagCls}`}>
                    {s.tag}
                  </span>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconCls}`} aria-hidden="true">
                    {s.icon}
                  </span>
                </div>
                <h3 className="font-heading mt-2.5 text-lg font-bold text-[#0b2a4a]">{s.t}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Aduana() {
  return (
    <section id="aduana" className="bg-white py-10 sm:py-12 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-6">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <p className="eyebrow text-[#0077c8]">Comercio exterior</p>
        <h2 className="font-heading mt-2.5 text-2xl font-bold text-[#0b2a4a] sm:text-3xl">Ingresamos a aduana y recinto fiscal</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          Unidades especializadas para el despacho de mercancías, con permisos vigentes
          y operadores autorizados. No cualquiera entra: nosotros sí.
        </p>
        <div className="relative mt-5 overflow-hidden rounded-2xl bg-[#0b2a4a] text-white">
          <img
            src="/aduana/aduana-carga-nocturna.webp"
            alt="Aviones de carga operando de noche en aeropuerto"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a] via-[#0b2a4a]/75 to-transparent" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex flex-1 flex-col justify-center">
              <ul className="space-y-2.5">
                {[
                  "Permisos vigentes en unidades y operadores",
                  "Aduana, aeropuerto y recintos fiscales",
                  "Despacho de importación y exportación",
                  "Monitoreo en ruta + foto de entrega",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-xs font-bold text-sky-300">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 lg:mt-auto">
                <p className="text-sm text-white/70">¿Tu carga requiere despacho en aduana? Cotízalo con nosotros.</p>
                <a
                  href={href("/nosotros")}
                  className="text-sm font-semibold text-sky-300 transition hover:text-white"
                >
                  Ver servicios →
                </a>
              </div>
            </div>
            <div className="relative min-h-[200px] lg:min-h-[280px]">
              <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-[#0b2a4a]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
                Aeropuerto de Guadalajara · GDL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Proceso({ compact = false }: { compact?: boolean }) {
  const steps = [
    ["01", "Cotiza", "Origen, destino, unidad y fotos por WhatsApp.", "5 min"],
    ["02", "Confirmamos", "Precio acordado por escrito; si hay cambios se pide tu autorización.", "Acordado"],
    ["03", "Recolectamos", "Unidad puntual + maniobras si aplica.", "Puntual"],
    ["04", "Entregamos", "Puerta a puerta con entrega garantizada y monitoreo.", "Monitoreo"],
  ];
  return (
    <section
      id="proceso"
      className={
        compact
          ? "bg-[#0b2a4a] py-6 text-white lg:py-6"
          : "fill-screen flex flex-col justify-center bg-[#0b2a4a] py-16 text-white sm:py-20 lg:py-10"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        {compact ? (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="eyebrow text-sky-300">Proceso</p>
            <h2 className="font-heading text-lg font-bold lg:text-xl">De la cotización a la entrega</h2>
          </div>
        ) : (
          <>
            <p className="eyebrow text-sky-300">Proceso</p>
            <h2 className="font-heading mt-3 text-3xl font-bold sm:text-4xl">De la cotización a la entrega</h2>
          </>
        )}

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

        {/* Desktop: timeline horizontal. En modo compact, pasos simples con número
            fantasma, sin tarjetas, para compartir pantalla con Flota. */}
        {compact ? (
          <ol className="relative mt-4 hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {steps.map(([, t, d, meta], i) => (
              <li key={t} className="timeline-step relative text-center" style={{ transitionDelay: `${200 + i * 220}ms` }}>
                {i > 0 && (
                  <span aria-hidden="true" className="absolute -left-5 top-1/2 -translate-y-1/2 select-none text-lg font-bold leading-none text-sky-300/50">
                    &gt;
                  </span>
                )}
                <p className="font-heading text-sm font-bold leading-tight">
                  {t} <span className="font-sans text-[11px] font-medium normal-case tracking-normal text-white/40">· {meta}</span>
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/55">{d}</p>
              </li>
            ))}
          </ol>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export function PorQue({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section id="nosotros" className="border-t border-[#dce4ed] bg-white py-8 lg:py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 sm:px-8 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex shrink-0 items-center gap-4">
            <div>
              <p className="eyebrow text-[#0077c8]">Nosotros</p>
              <h2 className="font-heading text-lg font-bold leading-tight text-[#0b2a4a] lg:text-xl">
                Operador PyME, comunicación total
              </h2>
            </div>
          </div>
          <ul className="grid gap-x-6 gap-y-1.5 text-sm text-[#0b2a4a] sm:grid-cols-2 lg:flex-1">
            {[
              "Precios acordes a los servicios contratados",
              "Facturación inmediata",
              "Foto de entrega + ubicación en ruta",
              "Ingreso a aduana y recinto fiscal",
              `Base ${BUSINESS.base}`,
            ].map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">✓</span>
                <span className="font-medium">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  return (
    <section id="nosotros" className="fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-6 px-6 sm:px-8 lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[#0b2a4a]">
          <img
            src="/hero/unidad-principal.jpg"
            alt="Unidad directa LS NEXOR"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-5 sm:p-6">
            {[
              ["Seguridad", "Garantizada"],
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
            desc="Logística y Servicio NEXOR. Unidad directa, precio cerrado y comunicación directa durante todo el viaje. Facturación inmediata."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0077c8]">Misión</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Mover la carga de las PyMEs con flete directo, precio cerrado y entrega puntual desde Guadalajara.
              </p>
            </div>
            <div className="rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0077c8]">Visión</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Ser el operador regional más rápido y confiable para fletes directos, creciendo por recomendación.
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
  // En móvil se muestran 4 + "ver más"; en laptop se ven todas (sin cambios).
  const [expandido, setExpandido] = useState(false);
  const faqs = useMemo(() => [
    ["¿Cuánto cuesta un flete?", "Depende de origen, destino, unidad y carga. Envíanos el cotizador y respondemos en menos de 3 horas."],
    ["¿Qué tipos de unidad tienen?", "Camioneta, Camión 3.5T, Rabón y Tráiler. Nuestra flotilla se adapta a tu mercancía: te cotizamos con la unidad que se adapte a las dimensiones y peso de tu carga."],
    ["¿Qué incluye el servicio?", "Flete directo puerta a puerta. Seguro de carga y maniobras se cotizan como adicionales."],
    ["¿A dónde llegan?", "ZMG + San Luis Potosí, Querétaro, Puerto Vallarta, Morelia, Tequila, Silao y Manzanillo. Otras rutas bajo cotización."],
    ["¿Emiten factura?", "Sí, facturación inmediata."],
    ["¿Cómo reservo?", "Por WhatsApp o correo. Confirmamos unidad, horario y precio cerrado."],
    ["¿Mi carga viaja sola o consolidada?", "Sola. La unidad va 100% directa a tu mercancía, sin compartir ni trasbordos."],
    ["¿Puedo seguir mi flete en ruta?", "Sí. Te compartimos ubicación durante el viaje y foto de entrega al finalizar."],
    ["¿Entran a aduana y recinto fiscal?", "Sí. Operamos con unidades especializadas, permisos vigentes y operadores autorizados para el despacho de mercancías en aduana, aeropuerto y recintos fiscales."],
    ["¿Manejan importación y exportación?", "Sí. Movemos mercancía de comercio exterior con unidad directa. Escríbenos por WhatsApp y cotizamos tu despacho."],
    ["¿Qué necesito para despachar mi mercancía?", "Cuéntanos origen, destino, dimensiones y peso de tu mercancía en el cotizador o por WhatsApp. Te cotizamos con la unidad que se adapte a tu carga y te confirmamos tiempos y requisitos. Precio cerrado."],
  ], []);
  useEffect(() => {
    const id = "faq-schema";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
    script.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [faqs]);

  return (
    <section id="faq" className="fill-screen flex flex-col justify-center bg-[#f2f5f9] py-16 sm:py-20 lg:py-10">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <h2 className="font-heading text-center text-3xl font-bold text-[#0b2a4a] sm:text-4xl">Preguntas frecuentes</h2>
        <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
          {faqs.map(([q, a], i) => (
            <details key={q} className={`group rounded-2xl border border-[#dce4ed] bg-white px-5 py-4 transition hover:border-[#0077c8]/50 hover:shadow-[0_8px_24px_rgba(11,42,74,0.08)]${i >= 4 && !expandido ? " hidden md:block" : ""}`}>
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <span className="flex-1 text-[15px] font-semibold text-[#0b2a4a]">{q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2f5f9] text-lg font-medium text-[#0077c8] transition group-open:rotate-45 group-open:bg-[#0077c8] group-open:text-white">+</span>
              </summary>
              <p className="mt-2 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
        {!expandido && (
          <button
            type="button"
            onClick={() => setExpandido(true)}
            className="mx-auto mt-6 block rounded-lg border border-[#0b2a4a]/20 bg-white px-6 py-3 text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a] md:hidden"
          >
            Ver {faqs.length - 4} preguntas más ↓
          </button>
        )}
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
