import { useEffect, useRef, useState } from "react";

/**
 * true cuando la página ya scrolleó más del umbral.
 * Sirve para mostrar efectos (como el fundido del hero) solo en movimiento.
 */
export function useScrolled(umbral = 40) {
  const [paso, setPaso] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPaso(window.scrollY > umbral));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [umbral]);
  return paso;
}

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
    // Precarga agresiva para que el video aparezca de inmediato.
    try { v.load(); } catch {}
    // Hint al navegador para priorizar la descarga del video.
    if (v.src && !document.head.querySelector(`link[rel="preload"][href="${v.src}"]`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = v.src;
      link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
    }
    const intentar = () => {
      // Solo reproducir si está en pantalla: fuera de vista se pausa
      // (un VP9 de 20MB decodificando en software arrastra el scroll en Safari).
      const r = v.getBoundingClientRect();
      const enVista = r.bottom > -100 && r.top < window.innerHeight + 100;
      if (enVista) v.play().catch(() => {});
      else v.pause();
    };
    intentar();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px" },
    );
    io.observe(v);
    window.addEventListener("pointerdown", intentar, { once: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", intentar);
    };
  }, []);

  return ref;
}
