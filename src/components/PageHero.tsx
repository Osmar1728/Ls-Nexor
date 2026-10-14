import { href } from "../lib/router";

interface Props {
  eyebrow: string;
  title: string;
  desc?: string;
  crumbs?: [string, string][];
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
}

export default function PageHero({ eyebrow, title, desc, crumbs, ctaPrimary, ctaSecondary }: Props) {
  return (
    <section className="bg-[#0b2a4a] pb-10 pt-[96px] text-white sm:pt-[104px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">{eyebrow}</p>
        <h1 className="font-heading mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px]">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75">{desc}</p>}
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
      </div>
    </section>
  );
}
