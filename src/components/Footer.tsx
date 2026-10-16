import { BUSINESS } from "../config";
import { href } from "../lib/router";

export function CtaBanda() {
  return (
    <section className="bg-[#0b2a4a] py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Respuesta en menos de 3 horas</p>
          <h2 className="font-heading mt-2 text-2xl font-bold sm:text-3xl">¿Ya sabes origen y destino? Cotiza en 1 minuto.</h2>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <a href={href("/cotizar")} className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]">
            Cotizar en 1 minuto
          </a>
          <a href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent("Hola LS NEXOR, quiero cotizar un flete.")}`} target="_blank" rel="noreferrer" className="rounded-lg border border-white/25 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/60">
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const sitio: [string, string][] = [
    ["Inicio", "/"],
    ["Flota y medidas", "/flota"],
    ["Rutas y cobertura", "/cobertura"],
    ["Nosotros", "/nosotros"],
    ["Términos", "/terminos"],
    ["Privacidad", "/privacidad"],
  ];
  const rutasTop: [string, string][] = [
    ["GDL → San Luis Potosí", "/ruta/san-luis-potosi"],
    ["GDL → Querétaro", "/ruta/queretaro"],
    ["GDL → Vallarta", "/ruta/puerto-vallarta"],
    ["GDL → Morelia", "/ruta/morelia"],
    ["Ver todas las rutas", "/cobertura"],
  ];

  return (
    <footer className="relative z-10 border-t border-white/15 bg-[#0b2a4a] text-white">
      {/* Columnas */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-8 sm:py-12 md:grid-cols-2 lg:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-heading text-lg font-bold tracking-wide">LS NEXOR</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/50">{BUSINESS.fullName}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {BUSINESS.tagline}. Flota 1T · 3.5T · Rabón 8T · Trailer 15+T. Factura con carta porte.
            Despacho en aduana y recinto fiscal.
          </p>
          <p className="mt-4 text-sm text-white/70">
            <span className="font-semibold text-white">{BUSINESS.base}</span>
            <span className="mt-1 block text-white/50">Respuesta en menos de 3h</span>
          </p>
        </div>
        <nav aria-label="Sitio">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Sitio</p>
          <ul className="mt-4 space-y-3">
            {sitio.map(([label, to]) => (
              <li key={label}>
                <a href={href(to)} className="text-sm text-white/75 transition hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Rutas">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Rutas top</p>
          <ul className="mt-4 space-y-3">
            {rutasTop.map(([label, to]) => (
              <li key={label}>
                <a href={href(to)} className="text-sm text-white/75 transition hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="rounded-2xl bg-white/5 p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Contacto directo</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="flex shrink-0 items-center text-white/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4 0 .1 0 .4-.2 1z" />
                </svg>
              </span>
              <a href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent('Hola LS NEXOR, quiero cotizar un flete.')}`} target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline">
                {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="flex shrink-0 items-center text-white/60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <a href={`mailto:${BUSINESS.email}`} className="break-all text-white/75 transition hover:text-white">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-5 text-xs text-white/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {BUSINESS.fullName} · Todos los derechos reservados</p>
          <p>Guadalajara, Jalisco · Facturación disponible</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsFloat() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent("Hola LS NEXOR, quiero cotizar un flete.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077c8] text-white shadow-[0_8px_24px_rgba(0,119,200,0.4)] transition hover:bg-[#005a97]"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.4 0 .1 0 .4-.2 1z" />
      </svg>
    </a>
  );
}
