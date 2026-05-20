# ROADMAP — Mejoras futuras

Mejoras planificadas para iteraciones posteriores. La landing actual es 100% funcional y lista para producción; lo de abajo es **nice-to-have**.

---

## 🚧 Próximas iteraciones

### Contenido y conversión

- [ ] **Blog técnico** — artículos sobre Signavio, BTP, casos prácticos. Sugerencia: Astro Content Collections o headless CMS (Sanity, Contentful) + ruta `/blog`.
- [ ] **Testimonios en video** — sección con quotes de clientes (logo + foto + video corto auto-play muted). Usar `<video>` con poster.
- [ ] **Casos de éxito expandidos** — página de detalle por proyecto (`/proyectos/[slug]`) con stack técnico, timeline y métricas en profundidad.
- [ ] **Calculadora de ROI** — formulario interactivo: industria, tamaño, módulo → estimación de ROI a 12/24 meses. Generar PDF descargable.
- [ ] **Resource hub** — whitepapers, ebooks y benchmarks descargables (gated content como lead magnet).

### Interactividad

- [ ] **Chat en vivo / chatbot** — integrar Intercom, Crisp, o agente GenAI propio sobre BTP.
- [ ] **Agendamiento online** — embed de Calendly / Cal.com para reservar consultoría sin pasar por el form.
- [ ] **Portal de clientes** — área autenticada con tickets, estado de proyectos y reportes. Requiere backend (Supabase / Netlify Identity + Functions).

### UX y diseño

- [ ] **Modo oscuro** — el sistema de variables CSS ya está preparado (`.dark` en `globals.css`). Falta el toggle y persistencia en `localStorage`.
- [ ] **Animación de carga inicial** — splash con logo animado mientras se hidrata React (evitar FOUC).
- [ ] **Internacionalización real** — el toggle ES/EN ya está en el header pero está dummy. Migrar a `react-intl` o `i18next` y traducir copy.
- [ ] **Tour guiado** — onboarding para visitantes nuevos que destaque servicios clave (driver.js / shepherd.js).
- [ ] **Microinteracciones en stats** — count-up animado para los números del Hero / WhyUs.

### Performance y SEO

- [ ] **Imagen OG real** — generar 1200×630 final, reemplazar placeholder.
- [ ] **AMP / Edge SSR** — actualmente es SPA. Si SEO de blog se vuelve crítico, migrar a Next.js o Astro.
- [ ] **Web Vitals monitoring** — integrar con Plausible / Vercel Analytics / Google Search Console.
- [ ] **A/B testing** — Netlify Split Testing para probar variantes del Hero CTA.

### DevOps y calidad

- [ ] **Tests E2E** — Playwright para flujos críticos (form de contacto, navegación, WhatsApp button).
- [ ] **Visual regression** — Chromatic o Percy en CI.
- [ ] **CI/CD pipeline** — GitHub Actions con lint + build + preview deploy por PR (Netlify ya lo hace nativo, pero podemos extender con tests).
- [ ] **Sentry** — error tracking en producción.
- [ ] **Storybook** — biblioteca de componentes documentada para futuras integraciones.

### Marketing

- [ ] **Píxeles de tracking** — Meta Pixel, LinkedIn Insight Tag, Google Ads (descomentar GTM en `index.html`).
- [ ] **UTM tracking** — parsear UTMs en landing y enviar al CRM al hacer submit del form.
- [ ] **Email automation** — secuencia post-contacto via Mailchimp / ActiveCampaign.

---

## 💡 Ideas creativas (backlog)

- **Easter egg para developers**: comando `Konami code` (↑↑↓↓←→←→BA) que muestre stack técnico real con un Easter egg de marca.
- **Generador de propuestas con IA**: agente GenAI que arme una propuesta inicial según el formulario (BTP, Signavio, etc.).
- **Mapa global de proyectos** — visualización con D3 / globe.gl mostrando ubicaciones donde hicimos delivery.

---

## ✅ Done (ya implementado)

- Landing completa con 6 secciones (Hero, Servicios, Clientes, Proyectos, Por qué nosotros, Contacto).
- Botón WhatsApp flotante con pulso y tooltip.
- Header sticky con backdrop-blur, sección activa y scroll progress.
- Mobile menu animado.
- Carrusel infinito de clientes con pausa en hover.
- Cards de proyectos expansibles con métricas y alternancia visual.
- Formulario Netlify con validación en tiempo real + honeypot.
- Mapa de oficinas (OpenStreetMap embed).
- Footer con newsletter, redes y direcciones.
- SEO completo (meta tags, Open Graph, Schema.org, sitemap, robots).
- Accesibilidad WCAG 2.1 AA (skip link, ARIA, focus visible, reduced motion).
- Headers de seguridad en `netlify.toml`.
- Code splitting por vendor + lazy loading de imágenes.
- Tipografías Google Fonts con `font-display: swap`.
