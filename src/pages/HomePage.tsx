import { useRef } from 'react';
import { Hero } from '../components/Hero';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { StatsHighlight } from '../components/home/StatsHighlight';
import { ClientsLight } from '../components/home/ClientsLight';
import { CaseStudies } from '../components/home/CaseStudies';
import { Testimonials } from '../components/home/Testimonials';
import { Events } from '../components/home/Events';
import { LatestPosts } from '../components/home/LatestPosts';
import { FinalCtaForm } from '../components/home/FinalCtaForm';
import { HomeBackgroundCurve } from '../components/effects/HomeBackgroundCurve';

/**
 * Home — 8 secciones con alternancia dark/light al estilo Stripe/Linear.
 *
 *   1. Hero               (DARK)   — Full viewport, video sutil + partículas
 *   2. ServicesPreview    (LIGHT)  — Grid 3x3, cards minimal
 *   3. StatsHighlight     (DARK)   — Counters + geometría
 *   4. ClientsLight       (LIGHT)  — Marquee, logos grayscale → color
 *   5. CaseStudies        (DARK)   — Cards premium con projects
 *   6. Testimonials       (LIGHT)  — Quote grande + dots (admin CRUD)
 *   7. Events             (LIGHT)  — Tabla de eventos/webinars (admin CRUD)
 *   8. LatestPosts        (DARK)   — Grid 3 últimos artículos
 *   9. FinalCtaForm       (LIGHT)  — Form inline → Netlify
 *
 * Las secciones 5/6/7/8 son condicionales: si no hay data, no renderizan.
 *
 * HomeBackgroundCurve: curva guía decorativa overlay (pointer-events-none)
 * que se dibuja a medida que el usuario scrollea. Honora prefers-reduced-motion.
 */
export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="relative">
      <HomeBackgroundCurve targetRef={pageRef} />
      <Hero />
      <ServicesPreview />
      <StatsHighlight />
      <ClientsLight />
      <CaseStudies />
      <Testimonials />
      <Events />
      <LatestPosts />
      <FinalCtaForm />
    </div>
  );
}
