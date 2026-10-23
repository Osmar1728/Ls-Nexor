import PageHero from "../components/PageHero";
import { BUSINESS } from "../config";
import { href, usePageMeta } from "../lib/router";

const ACTUALIZADO = "octubre de 2026";

function LegalShell({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        desc={desc}
        crumbs={[["Inicio", "/"]]}
        ctaPrimary={{ label: "Cotizar flete", to: "/cotizar" }}
      />
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Última actualización: {ACTUALIZADO}
          </p>
          <div className="mt-6 grid items-start gap-4 md:grid-cols-2">{children}</div>
          <p className="mt-8 rounded-xl bg-[#f2f5f9] p-5 text-[13px] leading-relaxed text-slate-500">
            Documento informativo de {BUSINESS.fullName}. Para casos particulares escríbenos por
            WhatsApp al {BUSINESS.whatsappDisplay} o al correo {BUSINESS.email}. Se recomienda su
            validación con un abogado antes de usarlo como contrato.
          </p>
        </div>
      </section>
    </>
  );
}

function Punto({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <div>
      <p aria-hidden="true" className="font-condensed text-5xl font-semibold leading-none text-[#0077c8]">
        {n}
      </p>
      <h2 className="font-heading mt-3 text-lg font-bold text-[#0b2a4a] sm:text-xl">{t}</h2>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

export function TerminosPage() {
  usePageMeta("terminos");
  return (
    <LegalShell
      eyebrow="Legal · Términos del servicio"
      title="Términos y condiciones del servicio"
      desc="Reglas claras para cotizar y mover tu carga con LS NEXOR: precio cerrado, unidad dedicada y facturación inmediata."
    >
      <Punto n="01" t="Quiénes somos">
        <p>
          {BUSINESS.fullName} ({BUSINESS.name}), con base operativa en {BUSINESS.base}, presta
          servicios de flete dedicado local y foráneo con unidades propias para todo tipo de carga,
          maniobras opcionales, seguro de carga opcional por evento y despacho con ingreso a
          aduana y recintos fiscales.
        </p>
      </Punto>
      <Punto n="02" t="Cotizaciones">
        <p>
          Las cotizaciones del sitio, WhatsApp o correo son una propuesta con vigencia indicada en
          cada caso. El servicio solo queda reservado con tu confirmación expresa (mensaje o pago
          de anticipo cuando aplique) y nuestra confirmación de unidad, horario y precio cerrado
          por escrito.
        </p>
      </Punto>
      <Punto n="03" t="Precio cerrado">
        <p>
          El precio acordado por escrito antes de cargar es el que pagas. Si en ruta surge un cargo
          extra (esperas prolongadas, cambios de destino, maniobras no solicitadas), lo notificamos
          y pedimos tu autorización antes de generarlo. Sin autorización, no hay cobro extra.
        </p>
      </Punto>
      <Punto n="04" t="Unidad y carga">
        <p>
          Asignamos la unidad según peso, volumen y fotos que nos compartas. La unidad viaja 100%
          dedicada a tu mercancía, sin consolidar ni trasbordos. Las dimensiones publicadas son
          aproximadas y pueden variar según la unidad asignada.
        </p>
      </Punto>
      <Punto n="05" t="Embalaje y mercancía">
        <p>
          Tu mercancía debe viajar debidamente empacada, embalada y etiquetada según su naturaleza.
          No movemos líquidos a granel, materiales peligrosos sin documentación en regla ni
          mercancía de procedencia ilícita. Podemos rechazar cargas que pongan en riesgo la unidad,
          al operador o a terceros.
        </p>
      </Punto>
      <Punto n="06" t="Seguro de carga (opcional)">
        <p>
          El flete no incluye seguro de mercancía salvo contratación expresa. Ofrecemos cobertura
          por evento cotizada junto al flete, recomendada en rutas foráneas y carga de alto valor.
          Sin seguro contratado, nuestra responsabilidad se limita a lo previsto por la
          normatividad aplicable al autotransporte federal de carga.
        </p>
      </Punto>
      <Punto n="07" t="Maniobras y tiempos">
        <p>
          La carga y descarga en origen y destino se cotizan como servicio adicional cuando lo
          solicitas. Programamos salidas para cumplir ventanas de entrega y avisamos ubicación en
          ruta, pero los tiempos pueden variar por tráfico, clima, retenes o disposiciones de la
          autoridad.
        </p>
      </Punto>
      <Punto n="08" t="Cancelaciones">
        <p>
          Puedes cancelar sin costo hasta 12 horas antes de la recolección programada. Cancelaciones
          posteriores o fletes en falso (unidad en sitio sin carga lista) generan cargo por
          movilización, informado de forma previa.
        </p>
      </Punto>
      <Punto n="09" t="Facturación">
        <p>
          Todos los servicios incluyen facturación inmediata. Proporciónanos tus datos fiscales
          correctos antes de la entrega.
        </p>
      </Punto>
      <Punto n="10" t="Aduana y recintos fiscales">
        <p>
          El ingreso a aduana, aeropuerto y recintos fiscales opera con unidades y operadores
          autorizados. Los tiempos de despacho dependen de la autoridad y del agente aduanal; te
          mantenemos informado durante el proceso.
        </p>
      </Punto>
      <Punto n="11" t="Contacto y jurisdicción">
        <p>
          Para dudas o reclamaciones: WhatsApp {BUSINESS.whatsappDisplay} y correo{" "}
          {BUSINESS.email}. Estos términos se rigen por las leyes de México y cualquier
          controversia se somete a los tribunales de Guadalajara, Jalisco.
        </p>
      </Punto>
      <p className="text-sm">
        <a href={href("/privacidad")} className="font-semibold text-[#0077c8] hover:text-[#005a97]">
          Ver aviso de privacidad →
        </a>
      </p>
    </LegalShell>
  );
}

export function PrivacidadPage() {
  usePageMeta("privacidad");
  return (
    <LegalShell
      eyebrow="Legal · Aviso de privacidad"
      title="Aviso de privacidad"
      desc="Cómo tratamos tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)."
    >
      <Punto n="01" t="Responsable">
        <p>
          {BUSINESS.fullName} ({BUSINESS.name}), con base en {BUSINESS.base}, es responsable del
          tratamiento de tus datos personales. Contacto: WhatsApp {BUSINESS.whatsappDisplay} y
          correo {BUSINESS.email}.
        </p>
      </Punto>
      <Punto n="02" t="Datos que recabamos">
        <p>
          Nombre, teléfono/WhatsApp y correo electrónico; origen, destino, fechas y características
          de tu carga (peso, volumen, fotos); unidad requerida y datos de facturación. No
          solicitamos datos personales sensibles.
        </p>
      </Punto>
      <Punto n="03" t="Para qué los usamos (finalidades primarias)">
        <p>
          Elaborar y dar seguimiento a tu cotización; coordinar recolección, tránsito y entrega;
          emitir tu factura; y atender dudas, cambios o reclamaciones de tu servicio.
        </p>
      </Punto>
      <Punto n="04" t="Finalidades secundarias">
        <p>
          Enviarte seguimientos de tu cotización y avisos de servicio por WhatsApp o correo. Puedes
          oponerte en cualquier momento escribiendo “baja” por el mismo medio.
        </p>
      </Punto>
      <Punto n="05" t="Transferencias">
        <p>
          Compartimos tus datos solo cuando el servicio lo requiere: con la aseguradora si
          contratas seguro de carga, y con autoridades (SAT, aduana, recintos fiscales) cuando la
          normatividad lo exige. No vendemos ni cedemos tus datos con fines de mercadotecnia.
        </p>
      </Punto>
      <Punto n="06" t="Tus derechos ARCO">
        <p>
          Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos, así
          como a revocar tu consentimiento. Ejerce tus derechos por WhatsApp o correo con tu nombre
          y una descripción clara de tu solicitud; respondemos en un máximo de 20 días hábiles
          conforme a la LFPDPPP.
        </p>
      </Punto>
      <Punto n="07" t="Seguridad y conservación">
        <p>
          Protegemos tus datos con medidas administrativas y técnicas razonables y los conservamos
          solo el tiempo necesario para prestarte el servicio y cumplir obligaciones fiscales.
        </p>
      </Punto>
      <Punto n="08" t="Cambios al aviso">
        <p>
          Cualquier cambio a este aviso se publicará en esta misma página indicando la fecha de
          actualización. Última actualización: {ACTUALIZADO}.
        </p>
      </Punto>
      <p className="text-sm">
        <a href={href("/terminos")} className="font-semibold text-[#0077c8] hover:text-[#005a97]">
          Ver términos y condiciones →
        </a>
      </p>
    </LegalShell>
  );
}
