# LS NEXOR — Logística y Servicio

Sitio multipágina (SPA con URLs limpias) de **Logística y Servicio NEXOR**: fletes dedicados locales en ZMG
y foráneos desde Guadalajara, con cotizador por WhatsApp/correo. React 19 + TypeScript + Vite + Tailwind CSS v4.

## Rutas (URLs limpias)

| Ruta | Página |
|---|---|
| `/` | Home (hero video, soluciones, flota, proceso, cobertura, servicios, aduana+nosotros, FAQ) |
| `/flota` | Fichas técnicas (4 configuraciones) + comparativa + compromiso |
| `/cobertura` | ZMG local + 7 rutas foráneas (tablero de salidas) |
| `/ruta/:slug` | Ficha por destino: SLP, Querétaro, Vallarta, Morelia, Tequila, Silao, Manzanillo (5 casos + 4 FAQs c/u) |
| `/nosotros` (`/servicios` redirige aquí) | Manifiesto, historia, 4 servicios, banda aduana, comparativa |
| `/cotizar` | Cotizador en 3 pasos (ruta, carga, contacto) |
| `/terminos`, `/privacidad` | Términos y aviso de privacidad (LFPDPPP) |

## Negocio (fuente: `src/config.ts`, `src/lib/rutas.ts`)

- **Flota para todo tipo de carga**: Camioneta, Camión 3.5T, Rabón y Tráiler, con caja adaptable a tu mercancía. Medidas aproximadas, imágenes ilustrativas.
- **Servicios**: flete dedicado (principal), seguro de carga por evento (opcional), maniobras (adicional), ingreso a aduana y recinto fiscal (comercio exterior).
- **Cobertura**: ZMG (9 municipios) + 7 corredores foráneos + nacional bajo cotización.
- **Compromisos**: unidad 100% dedicada, precio cerrado (extras solo con autorización), facturación inmediata, respuesta en menos de 3 horas.

## Cotizador (`src/components/Cotizador.tsx`, `src/lib/quote.ts`)

Tres pasos con resumen en vivo; al enviar abre WhatsApp o correo con el mensaje pre-llenado.
Campos: nombre, teléfono (10 dígitos, solo números, validado), email opcional (validado si se escribe),
origen/destino, tipo Local/Foráneo, unidad, fecha tentativa, facturación inmediata,
seguro y aduana como opcionales. Prefill vía query (`?origen=&destino=&tipo=&unidad=&mensaje=`).

## Sistema de diseño

- Paleta: navy `#0b2a4a`, azul `#0077c8`, base `#f2f5f9`. Fuentes: Barlow / Barlow Condensed / Inter.
- **Laptop (≥1024px)**: una sección por pantalla (`.fill-screen` + `scroll-snap`), variante `short:` para pantallas chaparritas (alto ≤800px).
- **Móvil**: carrusel en soluciones, FAQ con ver-más, videos con autoplay robusto (`src/lib/video.ts`), inputs a 16px (sin auto-zoom iOS).
- Breakpoints propios: `ms: 375px`, `ml: 425px`, `laptop-l: 1440px` (+ `xs: 320px`).

## Scripts

```bash
npm run dev      # desarrollo (en red local: npm run dev -- --host)
npm run build    # tsc + build producción
npm run lint     # oxlint
npm run preview  # vista previa del build
```

## SEO / IA

- `index.html`: title, description, robots, canonical, metadatos geográficos, Open Graph, Twitter Card y JSON-LD (`LocalBusiness` + `WebSite`, sin `MovingCompany`).
- `src/lib/router.ts`: título, descripción, canonical, Open Graph y Twitter se actualizan por ruta; `/404` se marca `noindex`.
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`: mantener actualizados con cada cambio de rutas o servicios.
- `public/.htaccess`: fuerza HTTPS + `www` y sirve las URLs limpias con `index.html` (requerido en Hostinger/Apache).
- Las URLs antiguas `#/flota` siguen funcionando y se convierten a `/flota` sin recargar.
- Dominio de producción pendiente: reemplazar `https://www.lsnexor.mx` donde aparezca.

### Google Search Console (al publicar)

1. Verifica la propiedad con el registro DNS o pega la etiqueta en `index.html` (hay un placeholder comentado).
2. Envía `https://www.lsnexor.mx/sitemap.xml`.
3. Solicita indexación de `/`, `/flota`, `/cobertura` y las 7 rutas.
4. Confirma que `https://www.lsnexor.mx/robots.txt` responda 200 y no bloquee el sitio.
