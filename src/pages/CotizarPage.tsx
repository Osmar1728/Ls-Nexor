import Cotizador from "../components/Cotizador";
import { usePageMeta } from "../lib/router";

export default function CotizarPage() {
  usePageMeta("cotizar");

  return (
    <div className="pt-16">
      <Cotizador />
    </div>
  );
}
