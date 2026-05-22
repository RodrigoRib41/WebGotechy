import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getServiceBySlug, getRelatedServices } from '../data/services';
import { ServiceHero } from '../components/services/ServiceHero';
import { ServiceOverview } from '../components/services/ServiceOverview';
import { ServiceStats } from '../components/services/ServiceStats';
import { ServiceApproach } from '../components/services/ServiceApproach';
import { ServiceBenefits } from '../components/services/ServiceBenefits';
import { ServiceUseCases } from '../components/services/ServiceUseCases';
import { ServiceTechStack } from '../components/services/ServiceTechStack';
import { ServiceRelatedTech } from '../components/services/ServiceRelatedTech';
import { ServiceFAQ } from '../components/services/ServiceFAQ';
import { ServiceCTA } from '../components/services/ServiceCTA';
import { SITE } from '../data/site';

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
  const service = slug ? getServiceBySlug(slug) : undefined;

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
  const related = getRelatedServices(detail.relatedTechIds);

  return (
    <>
      <ServiceHero
        title={service.title}
        tagline={detail.tagline}
        Icon={service.icon}
        image={detail.heroImage}
        accent={service.accent}
        tags={service.tags}
        breadcrumb={[
          { label: 'Inicio', to: '/' },
          { label: 'Servicios', to: '/servicios' },
          { label: service.title, to: `/servicios/${service.slug}` },
        ]}
      />
      <ServiceOverview
        paragraphs={detail.overviewParagraphs}
        Icon={service.icon}
        featureIcons={detail.features.map((f) => f.icon)}
        accent={service.accent}
        image={detail.overviewImage}
      />
      {detail.stats && detail.stats.items.length > 0 && (
        <ServiceStats
          eyebrow={detail.stats.eyebrow}
          title={detail.stats.title}
          items={detail.stats.items}
        />
      )}
      {detail.approach && (
        <ServiceApproach
          eyebrow={detail.approach.eyebrow}
          title={detail.approach.title}
          subtitle={detail.approach.subtitle}
          items={detail.approach.items}
          image={detail.approach.image}
        />
      )}
      <ServiceBenefits benefits={detail.benefits} />
      <ServiceUseCases useCases={detail.useCases} />
      {detail.techStack && detail.techStack.length > 0 && (
        <ServiceTechStack items={detail.techStack} />
      )}
      {related.length > 0 && <ServiceRelatedTech services={related} />}
      <ServiceFAQ faq={detail.faq} />
      <ServiceCTA serviceName={service.title} />
    </>
  );
}
