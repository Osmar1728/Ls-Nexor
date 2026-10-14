import VideoHero from "../components/VideoHero";
import { BUSINESS } from "../config";
import { usePageMeta } from "../lib/router";

export default function NosotrosPage() {
  usePageMeta("nosotros");
  return (
    <>
      <VideoHero
        video="/hero/video/hero-main.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow="Nosotros · Operador PyME"
        title="Acompañamiento directo en cada kilómetro"
        desc="Logística y Servicio NEXOR. Pocas unidades, bien mantenidas y comunicación directa. Sin conmutador, sin ejecutivos rotando tu cuenta."
        crumbs={[["Inicio", "/"], ["Nosotros", "/nosotros"]]}
        ctaPrimary={{ label: "Cotizar directo", to: "/cotizar" }}
        ctaSecondary={{ label: "Contactar", to: "/contacto" }}
        stats={[["100%", "Dedicado"], ["<3h", "Respuesta"], ["7+1", "ZMG + rutas"]]}
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
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-5 sm:p-6">
              {[
                ["100%", "Dedicado"],
                ["7+1", "ZMG + rutas"],
                ["<3h", "Respuesta"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
                  <p className="font-heading text-lg font-bold text-white sm:text-xl">{v}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-[#0077c8]">Por qué existimos</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Velocidad y palabra para PyMEs que no pueden parar</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Nacimos en Guadalajara para resolver lo que los grandes operadores complican: un flete dedicado hoy mismo,
              con precio cerrado por WhatsApp en menos de 3 horas, factura con carta porte y entrega con evidencia.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Precio cerrado por escrito antes de cargar",
                "Factura con carta porte el mismo día",
                "Foto de entrega + ubicación en ruta",
                `Base ${BUSINESS.base} · ${BUSINESS.hours}`,
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

      <section className="bg-[#f2f5f9] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="eyebrow text-[#0077c8]">Lo que nos piden repetir</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a]">Tres razones para quedarse</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["<3h", "Respuesta real", "Cotización por WhatsApp en horario hábil, sin conmutador ni vueltas."],
              ["$ cerrado", "Precio honesto", "Si tu carga pide unidad menor, te lo decimos. Lo escrito es lo que pagas."],
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
                <li>✓ ZMG hoy mismo, foráneo 24–48h</li>
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
