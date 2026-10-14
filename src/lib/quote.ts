import { BUSINESS, NOTA_FLOTA, type QuoteForm } from "../config";

export function buildQuoteText(q: QuoteForm): string {
  const lines = [
    `Hola ${BUSINESS.fullName}, quiero una cotización de flete ${q.tipo}.`,
    ``,
    `Nombre: ${q.nombre}`,
    `Teléfono: ${q.telefono}`,
    q.email ? `Email: ${q.email}` : null,
    `Origen: ${q.origen}`,
    `Destino: ${q.destino}`,
    q.unidad ? `Unidad: ${q.unidad}` : null,
    q.fecha ? `Fecha: ${q.fecha}` : null,
    q.pesoAprox ? `Peso aprox: ${q.pesoAprox}` : null,
    `Factura: ${q.factura ? "Sí" : "No"}`,
    q.mensaje ? `Detalle: ${q.mensaje}` : null,
    ``,
    `Flotilla referencia: 1T / 3.5T / Rabón / Tráiler. ${NOTA_FLOTA}`,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export function whatsappLink(q: QuoteForm): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    buildQuoteText(q),
  )}`;
}

export function mailtoLink(q: QuoteForm): string {
  const subject = encodeURIComponent(
    `Cotización flete ${q.tipo} — ${q.origen} a ${q.destino} (${q.nombre})`,
  );
  const body = encodeURIComponent(buildQuoteText(q));
  return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
}
