/**
 * Datos de los banners del HeroCarousel (Home).
 *
 * Cada banner define su propia COMPOSICIÓN, pensada para su imagen:
 *  - `align`: dónde vive el contenido en desktop ('left' | 'right' | 'center').
 *    Se elige según el espacio negativo de la foto (en mobile todo se ancla
 *    abajo-izquierda para máxima legibilidad).
 *  - `tone`: luminosidad de la imagen ('light' | 'dark'). Regula la fuerza
 *    del overlay: una foto clara necesita más scrim que una nocturna.
 *  - `ctaVariant`: 'primary' (celeste) o 'accent' (verde brandbook, solo CTAs).
 *
 * Para modificar el carrusel basta con editar este arreglo:
 *  - `image`: ruta pública (dentro de /public).
 *  - Los textos NO se escriben acá: se localizan por i18n (es/en). Cada clave
 *    apunta a `home.heroCarousel.banners.*` en public/locales/{es,en}/translation.json.
 *  - `ctaHref` / `secondaryCtaHref`: rutas internas de react-router.
 *
 * El componente <HeroCarousel /> recibe este arreglo por defecto, pero acepta
 * cualquier lista vía prop `banners`, por lo que es totalmente reutilizable.
 */
export interface HeroBanner {
  /** Identificador estable (sirve de key en React). */
  id: string;
  /** Ruta de la imagen de fondo (dentro de /public). */
  image: string;
  /** Alineación del contenido en desktop. */
  align: 'left' | 'right' | 'center';
  /** Luminosidad de la foto — regula la intensidad del overlay. */
  tone: 'light' | 'dark';
  /** Estilo del CTA principal. */
  ctaVariant: 'primary' | 'accent';
  /** Clave i18n del eyebrow (pill superior). */
  eyebrowKey: string;
  /** Clave i18n del título (parte regular). */
  titleKey: string;
  /** Clave i18n del remate del título (se pinta con gradiente cyan→verde). */
  titleHighlightKey: string;
  /** Clave i18n del subtítulo. */
  subtitleKey: string;
  /** Clave i18n del texto del botón CTA. */
  ctaKey: string;
  /** Destino del CTA (ruta interna de react-router). */
  ctaHref: string;
  /** CTA secundario opcional (clave i18n + ruta). */
  secondaryCtaKey?: string;
  secondaryCtaHref?: string;
}

export const heroBanners: HeroBanner[] = [
  // 1) Oficina luminosa, protagonista a la derecha → contenido a la IZQUIERDA.
  //    Foto clara ⇒ tone 'light' (scrim lateral fuerte para asegurar contraste).
  {
    id: 'transformation',
    image: '/images/Hero1.webp',
    align: 'left',
    tone: 'light',
    ctaVariant: 'primary',
    eyebrowKey: 'home.heroCarousel.banners.transformation.eyebrow',
    titleKey: 'home.heroCarousel.banners.transformation.title',
    titleHighlightKey: 'home.heroCarousel.banners.transformation.titleHighlight',
    subtitleKey: 'home.heroCarousel.banners.transformation.subtitle',
    ctaKey: 'home.heroCarousel.banners.transformation.cta',
    ctaHref: '/servicios',
    secondaryCtaKey: 'home.heroCarousel.banners.transformation.secondaryCta',
    secondaryCtaHref: '/contacto',
  },
  // 2) Escena nocturna, protagonista a la izquierda → contenido a la DERECHA.
  //    Foto oscura ⇒ tone 'dark' (overlay mínimo). CTA verde para máximo punch.
  {
    id: 'ai',
    image: '/images/Hero2.webp',
    align: 'right',
    tone: 'dark',
    ctaVariant: 'accent',
    eyebrowKey: 'home.heroCarousel.banners.ai.eyebrow',
    titleKey: 'home.heroCarousel.banners.ai.title',
    titleHighlightKey: 'home.heroCarousel.banners.ai.titleHighlight',
    subtitleKey: 'home.heroCarousel.banners.ai.subtitle',
    ctaKey: 'home.heroCarousel.banners.ai.cta',
    ctaHref: '/servicios',
  },
  // 3) Planta industrial con líneas de fuga convergentes → contenido CENTRADO
  //    sobre gradiente desde abajo. Foto clara ⇒ tone 'light'.
  {
    id: 'cases',
    image: '/images/Hero3.webp',
    align: 'center',
    tone: 'light',
    ctaVariant: 'primary',
    eyebrowKey: 'home.heroCarousel.banners.cases.eyebrow',
    titleKey: 'home.heroCarousel.banners.cases.title',
    titleHighlightKey: 'home.heroCarousel.banners.cases.titleHighlight',
    subtitleKey: 'home.heroCarousel.banners.cases.subtitle',
    ctaKey: 'home.heroCarousel.banners.cases.cta',
    ctaHref: '/proyectos',
  },
];
