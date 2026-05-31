import { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getServiceBySlug, localizeService, getRelatedServices, localizeServiceDetail } from '../data/services';
import { ServiceHero } from '../components/services/ServiceHero';
import { ServiceOverview } from '../components/services/ServiceOverview';
import { ServiceFeatures } from '../components/services/ServiceFeatures';
import { ServiceStats } from '../components/services/ServiceStats';
import { ServiceBenefits } from '../components/services/ServiceBenefits';
import { ServiceUseCases } from '../components/services/ServiceUseCases';
import { ServiceHorizonte } from '../components/services/ServiceHorizonte';
import { ServiceCTA } from '../components/services/ServiceCTA';
import { AnimatedDivider } from '../components/effects/AnimatedDivider';
import { HomeBackgroundCurve, type CurveVariant } from '../components/effects/HomeBackgroundCurve';
import { SITE } from '../data/site';

/**
 * Picker determinístico de variant — el mismo slug siempre devuelve la misma
 * curva. Hash simple de los char codes para mapear al índice del array.
 */
const VARIANTS: CurveVariant[] = ['serpentine', 'wave', 'spiral', 'zigzag', 'arc'];
function pickCurveVariant(slug: string): CurveVariant {
  const sum = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return VARIANTS[sum % VARIANTS.length];
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const rawService = slug ? getServiceBySlug(slug) : undefined;
  const pageRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

  // Versión localizada para render. Mantiene rawService para la URL canónica.
  const service = rawService ? localizeService(rawService, isEn) : undefined;

  useEffect(() => {
    if (!service?.detail) return;
    const { detail } = service;
    const canonical = `${SITE.url}/servicios/${service.slug}`;

    const prevTitle = document.title;
    document.title = `${detail.metaTitle} | ${SITE.name}`;
    setMeta('description', detail.metaDescription);
    setMeta('og:title', detail.metaTitle, 'property');
    setMeta('og:description', detail.metaDescription, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonical, 'property');
    setCanonical(canonical);

    return () => {
      document.title = prevTitle;
    };
  }, [service]);

  // Slug inexistente → 404 estándar del sitio
  if (!service) {
    return <Navigate to="/404" replace />;
  }

  // Servicio existe pero todavía sin contenido detallado → mandamos al overview
  if (!service.detail) {
    return <Navigate to="/servicios" replace />;
  }

  const { detail } = service;
  // Helper para usos auxiliares (suprime lint warnings, deja la API disponible si se necesita)
  void getRelatedServices;
  void localizeServiceDetail;

  return (
    <div ref={pageRef} className="relative">
      <HomeBackgroundCurve
        targetRef={pageRef}
        variant={pickCurveVariant(service.slug)}
      />
      <ServiceHero
        title={service.title}
        tagline={detail.tagline}
        Icon={service.icon}
        image={detail.heroImage}
        accent={service.accent}
        tags={service.tags}
        breadcrumb={[
          { label: t('services.hero.breadcrumbHome'), to: '/' },
          { label: t('services.hero.breadcrumbServices'), to: '/servicios' },
          { label: service.title, to: `/servicios/${service.slug}` },
        ]}
      />
      {/* Prueba social arriba: métricas del producto (cuando existen). */}
      {detail.stats && detail.stats.items.length > 0 && (
        <ServiceStats
          eyebrow={detail.stats.eyebrow}
          title={detail.stats.title}
          items={detail.stats.items}
        />
      )}
      {/* Problema → La solución */}
      <ServiceOverview
        paragraphs={detail.overviewParagraphs}
        Icon={service.icon}
        featureIcons={detail.features.map((f) => f.icon)}
        accent={service.accent}
        image={detail.overviewImage}
      />
      <AnimatedDivider />
      {/* Resultados (beneficios) antes que capacidades */}
      <ServiceBenefits benefits={detail.benefits} />
      {/* Capacidades clave */}
      <ServiceFeatures features={detail.features} />
      {/* Casos: dónde aplica */}
      <ServiceUseCases useCases={detail.useCases} />
      <AnimatedDivider />
      {/* Diferenciador: Horizonte SAP */}
      {detail.horizonte && <ServiceHorizonte text={detail.horizonte.text} />}
      {/* CTA final */}
      <ServiceCTA serviceName={service.title} />
    </div>
  );
}
