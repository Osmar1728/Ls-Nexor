import { useEffect, useState } from "react";
import { BUSINESS } from "../config";
import { href, parseHash } from "../lib/router";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/flota", label: "Flota" },
  { to: "/cobertura", label: "Rutas" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

function currentPath(): string {
  if (typeof window === "undefined") return "/";
  const h = window.location.hash.replace(/^#/, "") || "/";
  return h.split("?")[0];
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState(currentPath());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onHash = () => {
      setPath(currentPath());
      setOpen(false);
      parseHash(window.location.hash);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return path === "/";
    return path === to || path.startsWith(`${to}/`) || (to === "/cobertura" && path.startsWith("/ruta/"));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#0b2a4a] text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[11px] font-medium tracking-wide sm:px-8">
          <p className="uppercase opacity-80 sm:hidden">GDL · Lun–Vie 8–18</p>
          <p className="hidden uppercase opacity-80 sm:block">Base Guadalajara · Lun a Vie 8:00 – 18:00</p>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 opacity-80 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Respuesta en &lt;3h
            </span>
            <a href={`https://wa.me/${BUSINESS.whatsappNumber}`} target="_blank" rel="noreferrer" className="font-semibold text-white hover:underline">
              {BUSINESS.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className={`border-b border-[#dce4ed] bg-white/95 backdrop-blur ${scrolled ? "shadow-[0_2px_16px_rgba(11,42,74,0.08)]" : ""}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <a href={href("/")} className="flex items-center gap-3" aria-label="LS NEXOR - Inicio">
            <img
              src={BUSINESS.logoIcon}
              alt="LS NEXOR - Logística y Servicio"
              className="h-12 w-12 rounded-lg bg-white object-contain"
              loading="eager"
              width={48}
              height={48}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="leading-tight">
              <span className="font-heading block text-[17px] font-bold tracking-wide text-[#0b2a4a]">LS NEXOR</span>
              <span className="block text-[11px] font-medium text-slate-500">Logística y Servicio</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {LINKS.map((l) => (
              <a
                key={l.to}
                href={href(l.to)}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={`text-[13px] font-medium transition ${
                  isActive(l.to) ? "font-semibold text-[#0077c8]" : "text-slate-600 hover:text-[#0b2a4a]"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={href("/cotizar")}
              className="rounded-lg bg-[#0077c8] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#005a97]"
            >
              Cotizar flete
            </a>
          </nav>

          <button className="p-2 text-[#0b2a4a] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Abrir menú">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="border-t border-[#dce4ed] bg-white px-6 pb-6 pt-2 lg:hidden" aria-label="Móvil">
            {LINKS.map((l) => (
              <a
                key={l.to}
                href={href(l.to)}
                onClick={() => setOpen(false)}
                className={`block border-b border-slate-100 py-3.5 text-sm font-medium ${
                  isActive(l.to) ? "text-[#0077c8]" : "text-slate-700"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={href("/cotizar")}
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-lg bg-[#0077c8] px-6 py-3.5 text-center text-sm font-semibold text-white"
            >
              Cotizar flete
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
