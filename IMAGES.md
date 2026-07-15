# IMAGES.md — Guía de assets visuales

Imágenes sugeridas y sus especificaciones para reemplazar los placeholders antes de pasar a producción.

---

## 🎯 Resumen rápido

| Asset | Ubicación esperada | Tamaño recomendado | Formato |
|---|---|---|---|
| OG image | `public/og-image.jpg` | 1200×630 | JPG (< 200 KB) |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 | PNG |
| Proyectos (4) | `public/images/projects/*.jpg` | 1200×800 | JPG / WebP |
| Logos clientes reales | `public/images/clients/*.svg` | vector | SVG |
| Equipo / oficinas (opcional) | `public/images/team/*.jpg` | 1600×900 | JPG / WebP |

---

## 🖼️ Imágenes de proyectos (sección "Casos de éxito")

Los proyectos usan URLs Unsplash temporales en `src/data/projects.ts`. Reemplazar por imágenes propias o por las URLs Unsplash siguientes (ya optimizadas en query params).

### 1. Sector Energía — Process Intelligence
- URL placeholder actual:
  `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`
- Sugerencias propias: dashboard de procesos industriales, panel de control SCADA, oficina con datos.
- Búsqueda Unsplash: `industrial dashboard`, `process analytics`, `oil gas control room`.

### 2. Manufactura — SAP BTP
- URL placeholder actual:
  `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80`
- Búsqueda Unsplash: `modern factory`, `steel manufacturing`, `industrial automation`.

### 3. Agroindustria — LeanIX
- URL placeholder actual:
  `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80`
- Búsqueda Unsplash: `enterprise architecture`, `data visualization`, `business analytics`.

### 4. Pharma — IA + SAP
- URL placeholder actual:
  `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80`
- Búsqueda Unsplash: `pharma laboratory`, `medical research`, `healthcare technology`.

---

## 🏢 Logos de clientes

Actualmente se renderizan como **wordmarks** SVG inline (en `src/data/clients.ts`). Para una versión más fiel:

1. Conseguir el SVG oficial de cada cliente (con autorización).
2. Guardar en `public/images/clients/` con nombre normalizado: `raizen.svg`, `tenaris.svg`, etc.
3. Modificar `Clients.tsx` para usar `<img src="/images/clients/raizen.svg" />` en lugar del wordmark de texto.
4. Aplicar filtro `grayscale(100%)` por defecto y removerlo en hover (Tailwind: `grayscale hover:grayscale-0 transition`).

---

## 📱 Open Graph y favicons

### `public/og-image.jpg` (1200×630)
- Fondo: gradiente diagonal `#0A2540 → #00B4FF`
- Logo GoTechy centrado, escala 25-30% del canvas
- Tagline: "Consultora tecnológica de clase mundial"
- Footer: gotechy.com
- Formato: JPG optimizado (TinyJPG / Squoosh), < 200 KB.

### `public/favicon.svg`
✅ Ya incluido (SVG inline en `public/`).

### `public/apple-touch-icon.png` (180×180)
- Fondo de marca, logo isotipo centrado.
- Esquinas redondeadas no necesarias (iOS las aplica).

---

## 🎨 Recursos recomendados (gratuitos)

- **Unsplash** — [unsplash.com](https://unsplash.com) — fotografía profesional.
- **Pexels** — [pexels.com](https://pexels.com) — alternativa con licencia liberal.
- **unDraw** — [undraw.co](https://undraw.co) — ilustraciones SVG personalizables.
- **Lucide Icons** — ya incluido en el proyecto (`lucide-react`).
- **Squoosh** — [squoosh.app](https://squoosh.app) — compresión de imágenes.

## 🚀 Performance tips

- Usar **WebP** o **AVIF** cuando sea posible (mejor compresión vs. JPG).
- Generar variantes responsive (`srcset`) si el proyecto crece: `1x`, `2x`, mobile vs desktop.
- Las imágenes ya están con `loading="lazy"` y `decoding="async"`.
- Para hero o LCP crítico, considerar `<link rel="preload" as="image" href="...">` en `index.html`.
