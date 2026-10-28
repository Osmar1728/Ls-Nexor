import { useEffect } from "react";
import VideoHero from "../components/VideoHero";
import { BUSINESS } from "../config";
import { SITE_URL, buildCotizarHref, usePageMeta } from "../lib/router";
import { getRuta } from "../lib/rutas";

export default function RutaPage({ slug }: { slug?: string }) {
  const ruta = getRuta(slug);
  // Slug inexistente: marcar noindex como 404 para no indexar URLs basura.
  usePageMeta(ruta ? "ruta" : "notfound", ruta ? `Flete Guadalajara a ${ruta.destino}` : undefined, ruta?.hero ?? ruta?.imagen);

  useEffect(() => {
    const id = "ruta-schema";
    document.getElementById(id)?.remove();
    if (!ruta) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cobertura", item: `${SITE_URL}/cobertura` },
            { "@type": "ListItem", position: 3, name: `Flete Guadalajara a ${ruta.destino}`, item: `${SITE_URL}/ruta/${ruta.slug}` },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: ruta.faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    };
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [ruta]);

  if (!ruta) {
    return (
      <>
        <VideoHero
          video="/hero/video/hero-ruta.webm"
          poster="/hero-rutas-bajio.webp"
          eyebrow="Ruta no encontrada"
          title="Esa ruta no existe, pero te la cotizamos igual"
          desc="Volvemos a cobertura o cotiza directo tu origen y destino."
          crumbs={[["Inicio", "/"], ["Cobertura", "/cobertura"]]}
          ctaPrimary={{ label: "Ver rutas", to: "/cobertura" }}
          ctaSecondary={{ label: "Cotizar", to: "/cotizar" }}
        />
      </>
    );
  }

  const wa = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    `Hola LS NEXOR, quiero cotizar flete GDL → ${ruta.destino}. ¿Precio con unidad dedicada?`
  )}`;

  return (
    <>
      <VideoHero
        image={ruta.hero}
        imagePosition={ruta.heroPos}
        eyebrow={`Foráneo · ${ruta.distancia}`}
        title={`Flete Guadalajara → ${ruta.destino}`}
        desc={`${ruta.ideal}. Unidad dedicada puerta a puerta, precio cerrado, facturación inmediata y seguro opcional.`}
        crumbs={[["Inicio", "/"], ["Cobertura", "/cobertura"], [ruta.destino, `/ruta/${ruta.slug}`]]}
        ctaPrimary={{ label: `Cotizar GDL → ${ruta.destino}`, to: `/cotizar?origen=Guadalajara&destino=${encodeURIComponent(ruta.destino)}&tipo=${encodeURIComponent("Foráneo")}` }}
        ctaSecondary={{ label: "Ver todas las rutas", to: "/cobertura" }}
        compact
      />

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative h-80 overflow-hidden rounded-2xl bg-[#0b2a4a] sm:h-auto sm:min-h-[420px]">
              <img src={ruta.imagen} alt={`Mapa de ruta GDL → ${ruta.destino}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:gap-3 sm:p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">Distancia</p>
                  <p className="font-heading text-3xl font-bold text-white max-sm:text-2xl">{ruta.distancia}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">Unidad</p>
                  <p className="font-heading text-3xl font-bold text-white max-sm:text-2xl">Dedicada</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl bg-[#0b2a4a] p-7 text-white sm:p-8">
              <p className="eyebrow text-sky-300">Ficha de ruta</p>
              <p className="font-heading mt-3 text-2xl font-bold">
                GDL <span className="text-sky-300">→</span> {ruta.destino}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  ["Origen", "Guadalajara + ZMG"],
                  ["Modalidad", "100% dedicado, puerta a puerta"],
                  ["Precio", "Cerrado antes de cargar"],
                  ["Factura", "Facturación inmediata"],
                ].map(([t, d]) => (
                  <li key={t} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/55">{t}</span>
                    <span className="text-right font-semibold">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 pt-6">
                <a href={wa} target="_blank" rel="noreferrer" className="rounded-lg bg-[#0077c8] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]">
                  Cotizar por WhatsApp →
                </a>
                <a href={buildCotizarHref({ origen: "Guadalajara", destino: ruta.destino, tipo: "Foráneo" })} className="rounded-lg border border-white/25 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/60">
                  Ir al cotizador pre-llenado
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fill-screen flex flex-col justify-center bg-[#0b2a4a] py-14 text-white lg:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-2">
          <div className="flex h-full flex-col">
            <p className="eyebrow text-sky-300">Casos típicos</p>
            <h2 className="font-heading mt-2 text-2xl font-bold text-white sm:text-3xl">Lo que más se mueve GDL → {ruta.destino}</h2>
            <div className="mt-6 flex flex-1 flex-col gap-3">
              {ruta.casos.map((c, i) => (
                <div key={c} className="flex flex-1 items-center gap-4 rounded-2xl border border-[#dce4ed] bg-white p-5">
                  <span className="font-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f3fa] text-sm font-bold text-[#0077c8]">
                    {i + 1}
                  </span>
                  <p className="text-[15px] font-medium text-[#0b2a4a]">{c}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-full flex-col">
            <p className="eyebrow text-sky-300">Dudas de ruta</p>
            <h2 className="font-heading mt-2 text-2xl font-bold text-white sm:text-3xl">Preguntas de esta ruta</h2>
            <div className="mt-5 space-y-2.5">
              {ruta.faqs.map(([q, a]) => (
                <details key={q} className="group rounded-2xl border border-[#dce4ed] bg-white px-4 py-3 transition hover:border-[#0077c8]/50 hover:shadow-[0_8px_24px_rgba(11,42,74,0.08)]">
                  <summary className="flex cursor-pointer list-none items-center gap-3">
                    <span className="flex-1 text-sm font-semibold text-[#0b2a4a]">{q}</span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2f5f9] text-base font-medium text-[#0077c8] transition group-open:rotate-45 group-open:bg-[#0077c8] group-open:text-white">+</span>
                  </summary>
                  <p className="mt-2 border-t border-slate-100 pt-2.5 text-[13px] leading-relaxed text-slate-600">{a}</p>
                </details>
              ))}
            </div>
            <div aria-hidden="true" className="hidden flex-1 lg:block" />
            <div className="mt-4 rounded-2xl bg-[#0077c8] p-6 text-white shadow-[0_16px_40px_rgba(0,119,200,0.35)]">
              <h3 className="font-heading text-lg font-bold">¿Vienes de otro lado?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                Lo típico es salir de GDL, pero también hacemos el regreso {ruta.destino} → Guadalajara
                y otros orígenes bajo cotización.
              </p>
              <a
                href={buildCotizarHref({ origen: ruta.destino, destino: "Guadalajara", tipo: "Foráneo" })}
                className="mt-4 block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-bold text-[#0077c8] transition hover:bg-[#0b2a4a] hover:text-white"
              >
                Cotizar regreso →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
