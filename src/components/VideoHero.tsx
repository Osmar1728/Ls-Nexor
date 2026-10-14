import { href } from "../lib/router";

interface Props {
  video: string;
  poster?: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  crumbs?: [string, string][];
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  stats?: [string, string][];
}

/** Hero a video completo, mismo formato en todas las páginas internas. */
export default function VideoHero({ video, poster, eyebrow, title, desc, crumbs, ctaPrimary, ctaSecondary, stats }: Props) {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-[#0b2a4a] pb-12 pt-[96px] text-white sm:pt-[104px]">
      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a]/95 via-[#0b2a4a]/65 to-[#0b2a4a]/25" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b2a4a] to-transparent" />
      <div className="relative mx-auto w-full max-w-5xl px-6 sm:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
            {crumbs.map(([label, to], i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">/</span>}
                <a href={href(to)} className="transition hover:text-white">
                  {label}
                </a>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">{eyebrow}</p>}
        <h1 className="font-heading mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px]">{title}</h1>
        {desc && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">{desc}</p>}
        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
                className="rounded-lg border border-white/25 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/60"
              >
                {ctaSecondary.label}
              </a>
            )}
          </div>
        )}
        {stats && stats.length > 0 && (
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-6">
            {stats.map(([v, l]) => (
              <div key={l}>
                <p className="font-condensed text-3xl font-semibold tracking-wide text-white">{v}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">{l}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
