import { readFileSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rutasPath = join(root, "src", "lib", "rutas.ts");
const outPath = join(root, "public", "sitemap.xml");

const SITE = "https://lsnexor.com";
const today = new Date().toISOString().slice(0, 10);

// lastmod real por URL: fecha de modificación del archivo más reciente
// entre los que generan esa página. Si falta alguno, se usa hoy.
function lastmodOf(...relPaths) {
  let latest = 0;
  for (const rel of relPaths) {
    try {
      latest = Math.max(latest, statSync(join(root, rel)).mtimeMs);
    } catch {
      return today;
    }
  }
  return latest ? new Date(latest).toISOString().slice(0, 10) : today;
}

// Lee los slugs directamente de rutas.ts para mantener una sola fuente de verdad.
const rutasSrc = readFileSync(rutasPath, "utf8");
const slugs = [...rutasSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "weekly", src: ["index.html", "src/pages/Home.tsx", "src/App.tsx", "src/components/Hero.tsx", "src/components/Sections.tsx", "src/config.ts"] },
  { path: "/cotizar", priority: "0.9", changefreq: "monthly", src: ["src/pages/CotizarPage.tsx", "src/components/Cotizador.tsx", "src/lib/quote.ts", "src/config.ts"] },
  { path: "/flota", priority: "0.9", changefreq: "monthly", src: ["src/pages/FlotaPage.tsx", "src/config.ts"] },
  { path: "/cobertura", priority: "0.9", changefreq: "weekly", src: ["src/pages/CoberturaPage.tsx", "src/lib/rutas.ts"] },
  { path: "/nosotros", priority: "0.7", changefreq: "monthly", src: ["src/pages/NosotrosPage.tsx"] },
  { path: "/terminos", priority: "0.3", changefreq: "yearly", src: ["src/pages/LegalPage.tsx"] },
  { path: "/privacidad", priority: "0.3", changefreq: "yearly", src: ["src/pages/LegalPage.tsx"] },
];

const rutaUrls = slugs.map((slug) => ({
  path: `/ruta/${slug}`,
  priority: "0.8",
  changefreq: "monthly",
  src: ["src/pages/RutaPage.tsx", "src/lib/rutas.ts", "src/components/VideoHero.tsx"],
}));

const urls = [...staticUrls, ...rutaUrls];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${SITE}${u.path}</loc><lastmod>${lastmodOf(...u.src)}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap generado: ${urls.length} URLs -> ${outPath}`);
