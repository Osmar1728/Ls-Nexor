import VideoHero from "../components/VideoHero";
import { buildCotizarHref, usePageMeta } from "../lib/router";

const SERVICIOS = [
  {
    n: "01",
    tag: "Principal",
    tagCls: "bg-[#0077c8] text-white",
    t: "Flete dedicado puerta a puerta",
    d: "Unidad exclusiva para tu mercancía. Sin consolidar, sin trasbordos. Local ZMG el mismo día y foráneo 24–48h en 7 corredores.",
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

export default function ServiciosPage() {
  usePageMeta("servicios");
  return (
    <>
      <VideoHero
        video="/hero/video/hero-main.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow="Servicios · Precio cerrado"
        title="Lo que contratas, lo que recibes"
        desc="Tres servicios claros. Sin letras chicas: flete dedicado, seguro opcional y maniobras. Todo con factura y carta porte si lo requieres."
        crumbs={[["Inicio", "/"], ["Servicios", "/servicios"]]}
        ctaPrimary={{ label: "Cotizar servicio", to: "/cotizar" }}
        ctaSecondary={{ label: "Ver flota", to: "/flota" }}
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl space-y-6 px-6 sm:px-8">
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
                <h2 className={`font-heading mt-4 text-2xl font-bold sm:text-3xl ${i === 0 ? "text-white" : "text-[#0b2a4a]"}`}>{s.t}</h2>
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
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Ruta", "Origen, destino y km. Foráneo 24–48h."],
                ["Unidad", "1T, 3.5T, Rabón u Tráiler según peso/volumen."],
                ["Carga", "Peso, bultos y si requiere maniobras."],
                ["Factura + seguro", "Carta porte y cobertura opcional."],
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
    </>
  );
}
