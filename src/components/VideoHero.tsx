import { href } from "../lib/router";
import { useAutoplayVideo, useScrolled } from "../lib/video";

interface Props {
  video?: string;
  poster?: string;
  image?: string;
  /** Posición del fondo cuando es imagen (ej. "object-[center_75%]"). Por defecto object-center. */
  imagePosition?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  crumbs?: [string, string][];
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  stats?: [string, string][];
  /** Versión compacta (fichas de ruta): misma info en la mitad de alto. */
  compact?: boolean;
}

/** Hero a video completo, mismo diseño claro del home en todas las páginas internas. */
export default function VideoHero({ video, poster, image, imagePosition, eyebrow, title, desc, crumbs, ctaPrimary, ctaSecondary, stats, compact = false }: Props) {
  const videoRef = useAutoplayVideo<HTMLVideoElement>();
  const scrolleado = useScrolled();
  const imgSrc = image ?? poster;
  return (
    <section className={compact ? 'relative flex flex-col justify-center overflow-hidden bg-[#f2f5f9] pb-10 pt-[96px] text-[#0b2a4a] sm:pt-[104px]' : 'relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#f2f5f9] pb-12 pt-[96px] text-[#0b2a4a] sm:pt-[104px]'}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {video ? (
          <video
            ref={videoRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : imgSrc ? (
          <img
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover ${imagePosition ?? "object-center"}`}
            src={imgSrc}
            alt=""
            loading="eager"
            fetchPriority="high"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#f2f5f9] via-[#f2f5f9]/55 to-transparent" />
        <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f2f5f9] to-transparent transition-opacity duration-500 ${scrolleado ? "opacity-100" : "opacity-0"}`} />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {crumbs.map(([label, to], i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-300">/</span>}
                <a href={href(to)} className="transition hover:text-[#0b2a4a]">
                  {label}
                </a>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-[#0077c8]">{eyebrow}</p>}
        <h1 className={compact ? 'font-heading mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl' : 'font-heading mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[52px]'}>{title}</h1>
        {desc && <p className={compact ? 'mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600' : 'mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-600'}>{desc}</p>}
        {(ctaPrimary || ctaSecondary) && (
          <div className={compact ? 'mt-6 flex flex-col gap-3 sm:flex-row' : 'mt-7 flex flex-col gap-3 sm:flex-row'}>
            {ctaPrimary && (
              <a
                href={href(ctaPrimary.to)}
                className="rounded-lg bg-[#0077c8] px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#005a97]"
              >
                {ctaPrimary.label}
              </a>
            )}
            {ctaSecondary && (
              <a
                href={href(ctaSecondary.to)}
                className="rounded-lg border border-[#0b2a4a]/20 bg-white px-7 py-3.5 text-center text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a]"
              >
                {ctaSecondary.label}
              </a>
            )}
          </div>
        )}
        {!compact && stats && stats.length > 0 && (
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-6 border-t border-[#dce4ed] pt-6">
            {stats.map(([v, l]) => (
              <div key={l}>
                <p className="font-condensed text-3xl font-semibold tracking-wide text-[#0b2a4a]">{v}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
