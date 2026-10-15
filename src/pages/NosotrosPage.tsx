import VideoHero from "../components/VideoHero";
import { BUSINESS } from "../config";
import { buildCotizarHref, usePageMeta } from "../lib/router";

const SERVICIOS = [
  {
    n: "01",
    tag: "Principal",
    tagCls: "bg-[#0077c8] text-white",
    t: "Flete dedicado puerta a puerta",
    d: "Unidad exclusiva para tu mercancía. Sin consolidar, sin trasbordos. Local en ZMG y foráneo en 7 corredores.",
    bullets: ["Precio cerrado por escrito", "Caja seca cerrada 1T a 15+T", "Ubicación compartida en ruta + foto de entrega"],
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
    d: "Personal de apoyo en origen y destino. Ideal para mudanzas, muebles, equipos y mercancía no tarimada.",
    bullets: ["Solicítalo en tu cotización", "Origen y/o destino", "Coordinamos horario y acceso"],
    cta: "Cotizar con maniobras",
    to: buildCotizarHref({ mensaje: "Requiero maniobras de carga y descarga" }),
  },
];

/** Página única Nosotros + Servicios (la ruta /servicios redirige aquí). */
export default function NosotrosPage() {
  usePageMeta("nosotros");
  return (
    <>
      <VideoHero
        video="/hero/video/hero-main.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow="Operador PyME"
        title="Acompañamiento directo en cada kilómetro"
        desc="Logística y Servicio NEXOR. Pocas unidades, bien mantenidas y comunicación directa. Sin conmutador, sin ejecutivos rotando tu cuenta."
        crumbs={[["Inicio", "/"], ["Nosotros", "/nosotros"]]}
        ctaPrimary={{ label: "Cotizar directo", to: "/cotizar" }}
        ctaSecondary={{ label: "Ver flota", to: "/flota" }}
        stats={[["100%", "Dedicado"], [" - 3h", "Respuesta"], ["7 + 1", "ZMG + rutas"]]}
      />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-6 sm:px-8 lg:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[#0b2a4a]">
            <img
              src="/hero/unidad-principal.jpg"
              alt="Unidad dedicada LS NEXOR en Guadalajara"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a] via-[#0b2a4a]/25 to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-[#0077c8]">Por qué existimos</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Velocidad y palabra para PyMEs que no pueden parar</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Sabemos que la logística no para, es por eso que nos comprometemos en brindarte un servicio que cumpla con todos tus requerimientos.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Precios acorde a los servicios contratados",
                "Facturación inmediata",
                "Foto de entrega + ubicación en ruta",
                `Base ${BUSINESS.base}`,
              ].map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-[#0b2a4a]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">✓</span>
                  <span className="font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl space-y-6 px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#0077c8]">Servicios · Precio cerrado</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Lo que contratas, lo que recibes</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Tres servicios claros. Sin letras chicas: flete dedicado, seguro opcional y maniobras.
            </p>
          </div>
          {SERVICIOS.map((s, i) => (
            <article
              key={s.t}
              className={`grid overflow-hidden rounded-2xl border border-[#dce4ed] bg-white lg:grid-cols-2 ${i === 0 ? "lg:border-[#0b2a4a]" : ""}`}
            >
              <div className={`p-7 sm:p-9 ${i === 0 ? "bg-[#0b2a4a] text-white" : ""} ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`font-heading flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold ${i === 0 ? "bg-[#0077c8] text-white" : "bg-[#0b2a4a] text-white"}`}>
                    {s.n}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${s.tagCls}`}>
                    {s.tag}
                  </span>
                </div>
                <h3 className={`font-heading mt-4 text-2xl font-bold sm:text-3xl ${i === 0 ? "text-white" : "text-[#0b2a4a]"}`}>{s.t}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${i === 0 ? "text-white/70" : "text-slate-600"}`}>{s.d}</p>
                <a
                  href={s.to}
                  className={`mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold transition ${
                    i === 0
                      ? "bg-[#0077c8] text-white hover:bg-[#005a97]"
                      : "bg-[#0b2a4a] text-white hover:bg-[#071d34]"
                  }`}
                >
                  {s.cta} →
                </a>
              </div>
              <ul className={`space-y-3 p-7 sm:p-9 ${i === 0 ? "bg-[#0f3358]" : "bg-[#f2f5f9]"} ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                {s.bullets.map((b) => (
                  <li key={b} className={`flex items-start gap-3 rounded-xl p-4 text-sm ${i === 0 ? "bg-white/10 text-white" : "bg-white text-[#0b2a4a] shadow-sm"}`}>
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-700"}`}>✓</span>
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="rounded-2xl bg-[#f2f5f9] p-7 sm:p-9">
            <h3 className="font-heading text-xl font-bold text-[#0b2a4a] sm:text-2xl">¿Cómo se calcula tu precio?</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Ruta", "Origen, destino y km."],
                ["Unidad", "1T, 3.5T, Rabón u Tráiler según peso/volumen."],
                ["Carga", "Peso y bultos."],
                ["Seguro", "Cobertura opcional."],
                ["Maniobras", "Carga y descarga en origen y destino."],
              ].map(([t, d], i) => (
                <div key={t} className="relative rounded-2xl bg-white p-5 pt-6">
                  <span className="font-heading absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#0077c8] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="font-semibold text-[#0b2a4a]">{t}</p>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5f9] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Lo que nos piden repetir</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Tres razones para quedarse</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["- 3h", "Respuesta real", "Cotización por WhatsApp en horario hábil, sin conmutador ni vueltas."],
              ["Precio", "Precios dignos", "Precios relacionados a los servicios prestados."],
              ["1 a 1", "Siempre avisado", "Ubicación y avisos durante tu flete, de la recolección a la entrega."],
            ].map(([v, t, d]) => (
              <div key={t} className="rounded-2xl border border-[#dce4ed] bg-white p-7">
                <p className="font-heading text-3xl font-bold text-[#0077c8]">{v}</p>
                <h3 className="font-heading mt-2 text-xl font-bold text-[#0b2a4a]">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <h2 className="font-heading text-3xl font-bold text-[#0b2a4a]">LS NEXOR vs operador corporativo</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#0b2a4a] p-7 text-white">
              <p className="w-fit rounded-full bg-[#0077c8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">LS Nexor</p>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li>✓ Cotización en menos de 3 horas por WhatsApp</li>
                <li>✓ Avisos durante todo el viaje</li>
                <li>✓ ZMG y foráneo con unidad dedicada</li>
                <li>✓ Ideal 1T a 15T para PyME</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#dce4ed] bg-[#f2f5f9] p-7">
              <p className="w-fit rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Corporativo típico</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-500">
                <li>✕ Cotización en 24h con ejecutivo</li>
                <li>✕ Conmutador y cuentas rotativas</li>
                <li>✕ Mínimos y procesos lentos</li>
                <li>✕ Enfocado a gran volumen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
