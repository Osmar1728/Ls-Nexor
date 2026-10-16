import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  /** Bloques cortos (TrustStrip) no fuerzan pantalla completa */
  fill?: boolean;
  /** Bloques más altos que la pantalla no hacen snap (evita que atrape al subir) */
  snap?: boolean;
};

/**
 * Bloque de scroll: cada scroll muestra un bloque distinto.
 * - snap-start para que el navegador lo ancle al hacer scroll
 * - min-h-svh para que ocupe al menos una pantalla
 * - reveal fade-up al entrar en viewport
 */
export default function ScrollBlock({ id, children, fill = true, snap = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    // Fallback: si el observer no dispara y el bloque ya está en pantalla, mostrar
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("is-visible");
    }, 1500);
    if (!("IntersectionObserver" in window)) return () => window.clearTimeout(fallback);
    // En móvil la animación se repite al subir y bajar (no se fija una sola vez).
    const repetir = window.matchMedia("(max-width: 1023.5px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            window.clearTimeout(fallback);
            if (!repetir) io.unobserve(e.target);
          } else if (repetir) {
            e.target.classList.remove("is-visible");
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`${snap ? "snap-block" : ""} snap-reveal ${fill ? "snap-block--fill" : "snap-block--auto"}`}
    >
      {children}
    </div>
  );
}
