import { useEffect, useRef } from "react";

/**
 * Autoplay robusto para videos decorativos de fondo.
 * - Fuerza `muted` por propiedad (React no siempre lo aplica y el navegador
 *   lo toma como video con sonido, bloqueando el autoplay en iOS).
 * - Reintenta al montar y al primer toque del usuario (simuladores, ahorro de datos).
 */
export function useAutoplayVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const intentar = () => {
      v.play().catch(() => {});
    };
    intentar();
    window.addEventListener("pointerdown", intentar, { once: true });
    return () => window.removeEventListener("pointerdown", intentar);
  }, []);

  return ref;
}
