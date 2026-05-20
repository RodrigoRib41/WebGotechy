import { useState, type FormEvent } from 'react';
import { Linkedin, Youtube, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { OFFICES, SITE, NAV_LINKS } from '../data/site';
import { SERVICES } from '../data/services';

export function Footer() {
  const { t } = useTranslation();
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (newsletter.trim()) {
      setSubscribed(true);
      setNewsletter('');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(0,229,255,0.35), transparent 40%), radial-gradient(circle at 80% 100%, rgba(29,233,182,0.25), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 - Brand + Newsletter */}
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              {t('footer.tagline')}
            </p>

            <form onSubmit={handleNewsletter} className="mt-6">
              <label
                htmlFor="newsletter"
                className="text-xs font-semibold uppercase tracking-wider text-white/60"
              >
                {t('footer.newsletter')}
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-secondary px-4 text-primary transition hover:shadow-glow-md"
                  aria-label="Suscribirse"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-accent">{t('footer.subscribed')}</p>
              )}
            </form>
          </div>

          {/* Col 2 - Servicios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.services')}
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-2.5">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/servicios"
                    className="text-sm text-white/70 transition hover:text-secondary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.links')}
            </h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition hover:text-secondary"
                  >
                    {t(`header.${link.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {t('footer.contact')}
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${SITE.phone}`} className="hover:text-secondary">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-secondary">
                  {SITE.email}
                </a>
              </li>
              {OFFICES.map((office) => (
                <li key={office.id} className="flex items-start gap-3 text-sm text-white/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span>
                    <strong className="font-semibold text-white">{office.city}</strong>
                    <br />
                    {office.address}
                    <br />
                    {office.postal} — {office.country}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-secondary hover:bg-secondary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <p>{t('footer.madeIn')}</p>
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
      </div>
    </footer>
  );
}
