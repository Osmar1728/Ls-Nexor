import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  /** Bloques cortos (TrustStrip, Contacto) no fuerzan pantalla completa */
  fill?: boolean;
};

/**
 * Bloque de scroll: cada scroll muestra un bloque distinto.
 * - snap-start para que el navegador lo ancle al hacer scroll
 * - min-h-svh para que ocupe al menos una pantalla
 * - reveal fade-up al entrar en viewport
 */
export default function ScrollBlock({ id, children, fill = true }: Props) {
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            window.clearTimeout(fallback);
            io.unobserve(e.target);
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
      className={`snap-block snap-reveal ${fill ? "snap-block--fill" : "snap-block--auto"}`}
    >
      {children}
    </div>
  );
}
