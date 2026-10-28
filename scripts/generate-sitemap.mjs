import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rutasPath = join(root, "src", "lib", "rutas.ts");
const outPath = join(root, "public", "sitemap.xml");

const SITE = "https://lsnexor.com";
const today = new Date().toISOString().slice(0, 10);

// Lee los slugs directamente de rutas.ts para mantener una sola fuente de verdad.
const rutasSrc = readFileSync(rutasPath, "utf8");
const slugs = [...rutasSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/cotizar", priority: "0.9", changefreq: "monthly" },
  { path: "/flota", priority: "0.9", changefreq: "monthly" },
  { path: "/cobertura", priority: "0.9", changefreq: "weekly" },
  { path: "/nosotros", priority: "0.7", changefreq: "monthly" },
  { path: "/terminos", priority: "0.3", changefreq: "yearly" },
  { path: "/privacidad", priority: "0.3", changefreq: "yearly" },
];

const rutaUrls = slugs.map((slug) => ({
  path: `/ruta/${slug}`,
  priority: "0.8",
  changefreq: "monthly",
}));

const urls = [...staticUrls, ...rutaUrls];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${SITE}${u.path}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap generado: ${urls.length} URLs -> ${outPath}`);
