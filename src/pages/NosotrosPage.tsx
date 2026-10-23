import VideoHero from "../components/VideoHero";
import { BUSINESS } from "../config";
import { buildCotizarHref, href, usePageMeta } from "../lib/router";

const SERVICIOS = [
  {
    n: "01",
    tag: "Principal",
    tagCls: "bg-[#0077c8] text-white",
    t: "Flete dedicado puerta a puerta",
    d: "Unidad exclusiva para tu mercancía. Sin consolidar, sin trasbordos. Local en ZMG y foráneo en 7 corredores.",
    bullets: ["Precio cerrado", "Caja adaptable a tu mercancía", "Ubicación compartida en ruta + foto de entrega"],
    cta: "Cotizar flete",
    to: buildCotizarHref({}),
  },
  {
    n: "02",
    tag: "Opcional",
    tagCls: "bg-emerald-100 text-emerald-700",
    t: "Seguro de carga por evento",
    d: "Cobertura cotizada junto al flete para proteger el valor de tu mercancía en ruta foránea y carga de alto valor.",
    bullets: ["Se cotiza con el flete", "Recomendado en foráneo", "Comprobante y condiciones por escrito"],
    cta: "Cotizar con seguro",
    to: buildCotizarHref({ mensaje: "Me interesa el seguro de carga" }),
  },
  {
    n: "03",
    tag: "Adicional",
    tagCls: "bg-amber-100 text-amber-700",
    t: "Maniobras de carga y descarga",
    d: "Personal de apoyo en origen y destino. Ideal para muebles, equipos y mercancía no tarimada.",
    bullets: ["Solicítalo en tu cotización", "Origen y/o destino", "Coordinamos horario y acceso"],
    cta: "Cotizar con maniobras",
    to: buildCotizarHref({ mensaje: "Requiero maniobras de carga y descarga" }),
  },
  {
    n: "04",
    tag: "Comercio exterior",
    tagCls: "bg-sky-100 text-sky-700",
    t: "Ingreso a aduana y recinto fiscal",
    d: "Unidades especializadas para el despacho de mercancías en aduana, con permisos vigentes y operadores autorizados. Entramos a aduana, aeropuerto y recintos fiscales.",
    bullets: ["Unidades especializadas para despacho en aduana", "Permisos vigentes en unidades y operadores autorizados", "Unidad dedicada + precio cerrado"],
    cta: "Cotizar despacho",
    to: buildCotizarHref({ mensaje: "Necesito despacho de mercancía con ingreso a aduana" }),
  },
];

/** Página Nosotros: manifiesto, historia, servicios en formato editorial, aduana y comparativa. */
export default function NosotrosPage() {
  usePageMeta("nosotros");
  return (
    <>
      <VideoHero
        video="/hero/video/hero-main.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow="Operador PyME · Guadalajara"
        title="Movemos tu carga como si fuera nuestra"
        desc="Logística y Servicio NEXOR. Veloces y con palabra: comunicación directa durante todo tu flete. Sin conmutador, sin ejecutivos rotando tu cuenta."
        crumbs={[["Inicio", "/"], ["Nosotros", "/nosotros"]]}
        ctaPrimary={{ label: "Cotizar directo", to: "/cotizar" }}
        ctaSecondary={{ label: "Ver flota", to: "/flota" }}
        stats={[["100%", "Dedicado"], ["< 3 h", "Respuesta"], ["7 + ZMG", "Cobertura"]]}
      />

      {/* Manifiesto */}
      <section className="fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Quiénes somos</p>
          <h2 className="font-heading mt-3 max-w-4xl text-3xl font-bold leading-tight text-[#0b2a4a] sm:text-4xl lg:text-[44px]">
            Velocidad y palabra para PyMEs que no pueden parar
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
            Sabemos que la logística no para. Por eso nos comprometemos con un servicio que cumple
            todos tus requerimientos: unidad dedicada, precio cerrado y facturación inmediata.
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Somos un operador PyME de Guadalajara: veloces y con palabra. Comunicación directa contigo
            durante todo el viaje, sin conmutador, sin ejecutivos rotando tu cuenta, sin letras chicas.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[
              'Precio cerrado',
              'Comunicación total en ruta',
              'Facturación inmediata',
              'Flota para todo tipo de carga',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full border border-[#dce4ed] bg-[#f2f5f9] px-4 py-2 text-[13px] font-semibold text-[#0b2a4a]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[#dce4ed] pt-8 lg:grid-cols-4">
            {[
              ["100%", "Unidad dedicada", "Sin consolidar ni trasbordos"],
              ["< 3 h", "Respuesta real", "Cotización por WhatsApp en horario hábil"],
              ["7 + ZMG", "Cobertura", "Local y 7 corredores foráneos"],
              ["Aduana", "Recinto fiscal", "Operadores y permisos autorizados"],
            ].map(([v, t, d]) => (
              <div key={t}>
                <dt className="font-condensed text-4xl font-semibold tracking-wide text-[#0b2a4a]">{v}</dt>
                <dd className="mt-1 text-sm font-bold text-[#0b2a4a]">{t}</dd>
                <dd className="mt-0.5 text-[13px] text-slate-500">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Historia: foto + misión/visión */}
      <section className="fill-screen flex flex-col justify-center bg-[#0b2a4a] py-16 text-white sm:py-20 lg:py-10">
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-6 sm:px-8 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-[#071d34] shadow-[0_16px_40px_rgba(0,0,0,0.35)] lg:min-h-[420px]">
            <img
              src="/hero/unidad-principal.jpg"
              alt="Unidad dedicada LS NEXOR en Guadalajara"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">Base {BUSINESS.base}</p>
              <p className="font-heading mt-1 text-2xl font-bold text-white">Flota que se adapta a tu carga</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <p className="eyebrow text-sky-300">Nuestra historia</p>
            <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
              Operador PyME de Guadalajara, trato de a de veras
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
              Sabemos que la logística no para. Por eso nos comprometemos con un servicio que cumple
              todos tus requerimientos: unidad dedicada, precio cerrado y facturación inmediata.
            </p>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Misión</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                Mover la carga de las PyMEs con flete dedicado, precio cerrado y entrega puntual desde Guadalajara.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Visión</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                Ser el operador regional más rápido y confiable para fletes dedicados, creciendo por recomendación.
              </p>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {[
                "Precios acordes a los servicios contratados",
                "Facturación inmediata",
                "Foto de entrega + ubicación en ruta",
                "Ingreso a aduana y recinto fiscal",
              ].map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm font-medium text-white">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Servicios en formato editorial */}
      <section className="flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Servicios · Precio cerrado</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">Lo que contratas, lo que recibes</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Cuatro servicios claros. Sin letras chicas: flete dedicado, seguro opcional, maniobras e ingreso a aduana.
          </p>
          <div className="mt-6 flex flex-col gap-3.5 rounded-2xl border border-[#0b2a4a] bg-[#f2f5f9] p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-6">
            <span className={`w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${SERVICIOS[0].tagCls}`}>
              {SERVICIOS[0].tag}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-bold leading-snug text-[#0b2a4a]">{SERVICIOS[0].t}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{SERVICIOS[0].d}</p>
            </div>
            <a
              href={SERVICIOS[0].to}
              className="shrink-0 rounded-lg bg-[#0b2a4a] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0077c8]"
            >
              {SERVICIOS[0].cta} →
            </a>
          </div>
          <ol className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
            {SERVICIOS.slice(1).map((s) => (
              <li key={s.t} className="group flex flex-col rounded-2xl border border-[#dce4ed] bg-white p-5 transition hover:border-[#0077c8]/50 hover:shadow-[0_12px_30px_rgba(11,42,74,0.12)]">
                <span className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${s.tagCls}`}>
                  {s.tag}
                </span>
                <h3 className="font-heading mt-2 text-lg font-bold leading-snug text-[#0b2a4a]">{s.t}</h3>
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-slate-600">{s.d}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-full bg-[#f2f5f9] px-2.5 py-1 text-xs font-medium text-[#0b2a4a]">
                      ✓ {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={s.to}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0077c8] transition hover:gap-2.5 hover:text-[#005a97]"
                >
                  {s.cta} <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
            <li className="flex flex-col rounded-2xl bg-[#0b2a4a] p-5 text-white sm:p-6">
              <h3 className="font-heading text-lg font-bold leading-snug">¿Cómo se calcula tu precio?</h3>
              <ol className="mt-3 flex-1 space-y-2.5">
                {[
                  ["Ruta", "Origen, destino y km."],
                  ["Unidad", "1T, 3.5T, Rabón o Tráiler según peso y volumen."],
                  ["Carga", "Peso y bultos."],
                  ["Seguro", "Cobertura opcional."],
                  ["Maniobras", "Carga y descarga en origen y destino."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex items-baseline gap-2.5 text-[13px]">
                    <span className="font-heading flex h-5 w-5 shrink-0 translate-y-0.5 items-center justify-center rounded-md bg-[#0077c8] text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="leading-snug"><span className="font-bold">{t}:</span> <span className="text-white/70">{d}</span></p>
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </div>
      </section>

      {/* Aduana: banda fotográfica */}
      <section className="fill-screen relative flex flex-col justify-center overflow-hidden bg-[#0b2a4a] py-16 text-white sm:py-20 lg:py-10">
        <img
          src="/aduana/aduana-torre.webp"
          alt="Torre de control del aeropuerto de Guadalajara"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a] via-[#0b2a4a]/80 to-[#0b2a4a]/30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-sky-300">Comercio exterior</p>
            <h2 className="font-heading mt-3 text-3xl font-bold sm:text-4xl">No cualquiera entra a aduana. Nosotros sí.</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
              Unidades especializadas para el despacho de mercancías, con permisos vigentes
              y operadores autorizados. Aduana, aeropuerto y recintos fiscales.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildCotizarHref({ mensaje: "Necesito despacho de mercancía con ingreso a aduana" })}
                className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
              >
                Cotizar despacho →
              </a>
              <a
                href={href("/cobertura")}
                className="rounded-lg border border-white/25 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/60"
              >
                Ver cobertura
              </a>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              "Permisos vigentes en unidades y operadores",
              "Aduana, aeropuerto y recintos fiscales",
              "Despacho de importación y exportación",
              "Monitoreo en ruta + foto de entrega",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 text-sm font-medium backdrop-blur-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-400/25 text-xs font-bold text-sky-300">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparativa */}
      <section className="fill-screen flex flex-col justify-center bg-[#f2f5f9] py-16 sm:py-20 lg:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#0077c8]">Por qué quedarse</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">LS NEXOR vs operador corporativo</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Compara y decide: trato directo de operador PyME contra la burocracia corporativa.
            </p>
          </div>
          <div className="relative mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
            <span aria-hidden="true" className="font-heading absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0077c8] text-lg font-bold text-white shadow-[0_10px_30px_rgba(0,119,200,0.45)] ring-4 ring-[#f2f5f9] hidden md:flex">
              VS
            </span>
            <div className="relative rounded-2xl bg-[#0b2a4a] p-7 text-white shadow-[0_16px_40px_rgba(11,42,74,0.25)] sm:p-8">
              <p className="w-fit rounded-full bg-[#0077c8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">LS Nexor</p>
              <ul className="mt-5 grid gap-3.5 text-[15px] text-white/85 sm:grid-cols-2">
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Cotización en menos de 3 horas por WhatsApp</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Precio cerrado, sin sorpresas</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Avisos durante todo el viaje</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Foto de entrega + ubicación en ruta</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> ZMG, foráneo y aduana con unidad dedicada</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Facturación inmediata</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Ingreso a aduana y recinto fiscal</li>
                <li className="flex gap-2.5"><span className="font-bold text-emerald-400">✓</span> Carga de todo tipo para PyME</li>
              </ul>
              <span aria-hidden="true" className="font-heading absolute -bottom-7 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#0077c8] text-lg font-bold text-white shadow-[0_10px_30px_rgba(0,119,200,0.45)] ring-4 ring-[#f2f5f9] md:hidden">
                VS
              </span>
            </div>
            <div className="rounded-2xl border border-[#dce4ed] bg-white p-7 sm:p-8">
              <p className="w-fit rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Corporativo típico</p>
              <ul className="mt-5 space-y-3.5 text-[15px] text-slate-500">
                <li className="flex gap-2.5"><span className="font-bold text-slate-300">✕</span> Cotización en 24h con ejecutivo</li>
                <li className="flex gap-2.5"><span className="font-bold text-slate-300">✕</span> Conmutador y cuentas rotativas</li>
                <li className="flex gap-2.5"><span className="font-bold text-slate-300">✕</span> Mínimos y procesos lentos</li>
                <li className="flex gap-2.5"><span className="font-bold text-slate-300">✕</span> Enfocado a gran volumen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
