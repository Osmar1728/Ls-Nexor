# Optimización de videos hero

Los videos actuales son pesados (7–47 MB) y causan un destello del poster al cargar.
Para que el video aparezca de inmediato, reduce tamaño y bitrate.

## Comandos ffmpeg sugeridos

### Hero principal (hero-main.webm)
```bash
ffmpeg -i hero-main.webm -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 800k -crf 33 -an -r 24 hero-main-opt.webm
```

### Hero de rutas (hero-ruta.webm)
```bash
ffmpeg -i hero-ruta.webm -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 600k -crf 34 -an -r 24 hero-ruta-opt.webm
```

### Versión móvil (opcional, < 2 MB)
```bash
ffmpeg -i hero-main.webm -vf "scale=720:-2" -c:v libvpx-vp9 -b:v 400k -crf 36 -an -r 20 hero-main-mobile.webm
```

## Recomendaciones
- Mantén duración < 10 s y loop.
- Quita audio (`-an`) si no se usa.
- Sustituye los archivos en `public/hero/video/` y actualiza referencias si cambias nombres.
- Para servir video móvil, añade `<source media="(max-width: 768px)" src="...-mobile.webm" />` dentro del `<video>`.
- Considera usar un poster ligero o quitarlo (`poster=""`) para evitar el destello.
```

Wrote file successfully: docs/optimizacion-video.md