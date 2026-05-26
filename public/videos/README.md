# Videos de fondo del Hero

El Hero referencia dos archivos:

- `/public/videos/hero-tech.webm` (preferido — WebM/VP9 pesa ~40% menos)
- `/public/videos/hero-tech.mp4`  (fallback universal — Safari, etc.)

**Si los archivos no existen el sitio degrada limpio:** el componente
`VideoBackground` detecta el error, oculta el `<video>` y el gradient + mesh
+ partículas del fondo se ven igual. No rompe nada.

## De dónde sacar el video

Buscar loops cortos (4–10s) de tecnología / código / datos / networking en:

- https://www.pexels.com/videos/ (gratis, atribución no requerida)
- https://coverr.co/ (gratis)
- https://pixabay.com/videos/ (gratis)

Keywords útiles: `technology background`, `data network`, `code programming`,
`abstract digital`, `server room`, `cyber blue`, `particles tech`.

## Optimización (importante para LCP)

Una vez descargado el `.mp4` original:

```bash
# 1) Recortar/optimizar el mp4 (1920x1080 @ 30fps, ~6 Mbps, sin audio)
ffmpeg -i original.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
  -c:v libx264 -profile:v high -preset slow -crf 24 \
  -movflags +faststart -an -t 12 \
  public/videos/hero-tech.mp4

# 2) Crear la versión webm (VP9, ~40% más liviana)
ffmpeg -i public/videos/hero-tech.mp4 \
  -c:v libvpx-vp9 -crf 35 -b:v 0 -an \
  public/videos/hero-tech.webm
```

Targets:

- **mp4**: < 4 MB
- **webm**: < 2.5 MB
- Duración loop: 8–12 s
- Sin audio (`-an`)
- `-movflags +faststart` para que arranque mientras descarga

## Poster opcional

Si querés un poster (JPG/PNG) para mostrar mientras carga, pasalo como prop
en `Hero.tsx`:

```tsx
<VideoBackground
  webm="/videos/hero-tech.webm"
  mp4="/videos/hero-tech.mp4"
  poster="/videos/hero-poster.jpg"
  opacity={0.35}
/>
```

## Accesibilidad

El componente ya respeta `prefers-reduced-motion`: si el usuario lo activa
en el SO, no se reproduce el video (muestra solo el póster si lo hay, o nada).
