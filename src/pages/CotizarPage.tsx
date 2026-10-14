import Cotizador from "../components/Cotizador";
import VideoHero from "../components/VideoHero";
import { Faq } from "../components/Sections";
import { usePageMeta } from "../lib/router";

export default function CotizarPage({ modo }: { modo: "cotizar" | "contacto" }) {
  usePageMeta(modo);

  const isContacto = modo === "contacto";

  if (!isContacto) {
    return (
      <div className="pt-16">
        <Cotizador />
      </div>
    );
  }

  return (
    <>
      <VideoHero
        video="/hero/video/hero-ruta.webm"
        poster="/hero-rutas-bajio.webp"
        eyebrow={isContacto ? "Contacto · Respuesta <3h" : "Cotizador · 1 minuto"}
        title={isContacto ? "Contacto directo, sin conmutador" : "Cotiza en 1 minuto, recibe en menos de 3 horas"}
        desc={
          isContacto
            ? "WhatsApp, correo y base en Guadalajara. Completa el cotizador y se abre tu WhatsApp o correo con todo pre-llenado."
            : "Completa origen, destino y unidad. Se abre tu WhatsApp o correo con todo pre-llenado. Precio cerrado por escrito en horario hábil."
        }
        crumbs={isContacto ? [["Inicio", "/"], ["Contacto", "/contacto"]] : [["Inicio", "/"], ["Cotizar", "/cotizar"]]}
      />
      <Cotizador />
      <Faq />
    </>
  );
}
