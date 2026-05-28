import { Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { SITE, NAV_LINKS } from '../data/site';
import { ArrowMark, ArrowPattern } from './brand';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Iluminación circular cyan oficial brandbook */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(0,243,255,0.30), transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Trama sutil de flechas (brandbook) */}
      <ArrowPattern
        density={4}
        arrowSize={130}
        opacity={0.025}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]"
      />

      {/* Flecha ornamental decorativa esquina derecha */}
      <div className="pointer-events-none absolute -right-12 -top-12 opacity-[0.08]" aria-hidden="true">
        <ArrowMark size={260} outline color="#00F3FF" strokeWidth={3} />
      </div>

      <div className="container-x relative py-10">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {/* Col 1 - Brand */}
          <div>
            <Logo light />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
              {t('footer.tagline')}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-secondary hover:bg-secondary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/55">
              {t('footer.links')}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/75 transition hover:text-secondary"
                  >
                    {t(`header.${link.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Contacto */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/55">
              {t('footer.contact')}
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${SITE.phone}`} className="hover:text-secondary">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-secondary">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/50">
          <p>
            © {year} {SITE.name}. {t('footer.rights')}
          </p>
          {/* Link discreto al admin */}
          <Link
            to="/admin"
            className="text-white/30 transition hover:text-secondary"
            aria-label="Admin"
          >
            ·
          </Link>
        </div>
      </div>
    </footer>
  );
}
