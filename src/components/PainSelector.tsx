import { buildCotizarHref, href } from "../lib/router";

function BoltIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10.5h-6.5L13 2z" />
    </svg>
  );
}

function TruckIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 7h12v9H2z" />
      <path d="M14 10h4l4 4v2h-8" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="17.5" cy="17.5" r="1.7" />
    </svg>
  );
}

function PinIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M12 21.5s-7.5-6-7.5-11.5a7.5 7.5 0 1 1 15 0C19.5 15.5 12 21.5 12 21.5z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DocCheckIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 14.5l1.8 1.8L15.5 12" />
    </svg>
  );
}

const DOLORES = [
  {
    Icon: BoltIcon,
    q: "«Lo necesito en Guadalajara»",
    a: "ZMG con unidad dedicada",
    cta: "Cotizar local",
    to: buildCotizarHref({ origen: "Guadalajara", tipo: "Local" }),
  },
  {
    Icon: TruckIcon,
    q: "«Pago camión completo por media carga»",
    a: "Elige 1T, 3.5T, Rabón o Tráiler a tu medida",
    cta: "Ver flota",
    to: href("/flota"),
  },
  {
    Icon: PinIcon,
    q: "«Me urge foráneo a Bajío u Occidente»",
    a: "7 rutas directas",
    cta: "Ver rutas",
    to: href("/cobertura"),
  },
  {
    Icon: DocCheckIcon,
    q: "«Necesito factura»",
    a: "CFDI + Carta Porte",
    cta: "Cotizar foráneo",
    to: buildCotizarHref({ origen: "Guadalajara", tipo: "Foráneo" }),
  },
];

export default function PainSelector() {
  return (
    <section className="flex flex-1 flex-col justify-center bg-white pb-8 pt-8 sm:pb-10 sm:pt-10 lg:py-6">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <p className="eyebrow text-[#0077c8]">Encuentra tu solución en segundos</p>
        <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">
          ¿Qué necesitas resolver hoy?
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-slate-600">
          Elige tu tipo de carga o ruta y te guiamos a la solución exacta.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-4">
          {DOLORES.map(({ Icon, q, a, cta, to }) => (
            <a
              key={q}
              href={to}
              className="group flex flex-col rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-6 transition hover:-translate-y-1 hover:border-[#0077c8] hover:bg-white hover:shadow-[0_12px_28px_rgba(11,42,74,0.12)] lg:p-5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b2a4a] text-white transition group-hover:bg-[#0077c8]">
                <Icon />
              </span>
              <p className="mt-4 text-[15px] font-bold leading-snug text-[#0b2a4a]">{q}</p>
              <p className="mt-2 flex-1 text-sm text-slate-600">{a}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077c8]">
                {cta}
                <span className="transition group-hover:translate-x-1">→</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
