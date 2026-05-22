import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { ServiceDropdown } from './header/ServiceDropdown';
import { NAV_LINKS } from '../data/site';
import { SERVICES } from '../data/services';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { cn } from '../utils/cn';

export function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Cerrar mobile menu en cada cambio de ruta
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth',
        scrolled
          ? 'border-b border-white/10 bg-primary/80 backdrop-blur-xl shadow-elevated'
          : 'bg-transparent',
      )}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-secondary to-accent"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link
          to="/"
          aria-label={t('header.home')}
          className="rounded-md focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            link.id === 'services' ? (
              <ServiceDropdown key={link.id} label={t(`header.${link.id}`)} />
            ) : (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-white' : 'text-white/65 hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`header.${link.id}`)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary/20 ring-1 ring-secondary/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />

          <Link
            to="/contacto"
            className="hidden lg:inline-flex btn-primary !px-5 !py-2.5 !text-sm"
          >
            {t('header.cta')}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <div className="container-x pb-6">
              <nav
                className="rounded-2xl border border-white/10 bg-primary/95 p-4 shadow-elevated backdrop-blur"
                aria-label="Mobile menu"
              >
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    if (link.id === 'services') {
                      const servicesActive =
                        pathname === '/servicios' || pathname.startsWith('/servicios/');
                      return (
                        <li key={link.id}>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((s) => !s)}
                            aria-expanded={mobileServicesOpen}
                            className={cn(
                              'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition',
                              servicesActive
                                ? 'bg-secondary/15 text-secondary-200'
                                : 'text-white/80 hover:bg-white/5 hover:text-white',
                            )}
                          >
                            {t(`header.${link.id}`)}
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                mobileServicesOpen && 'rotate-180',
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <motion.div
                                key="mobile-services"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <ul className="ml-3 mt-1 space-y-1 border-l border-white/10 pl-3">
                                  <li>
                                    <NavLink
                                      to="/servicios"
                                      end
                                      className={({ isActive }) =>
                                        cn(
                                          'block rounded-lg px-3 py-2 text-sm font-medium transition',
                                          isActive
                                            ? 'text-secondary-200'
                                            : 'text-white/65 hover:bg-white/5 hover:text-white',
                                        )
                                      }
                                    >
                                      Ver todos
                                    </NavLink>
                                  </li>
                                  {SERVICES.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                      <li key={service.id}>
                                        <NavLink
                                          to={`/servicios/${service.slug}`}
                                          className={({ isActive }) =>
                                            cn(
                                              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
                                              isActive
                                                ? 'bg-secondary/10 text-secondary-200'
                                                : 'text-white/70 hover:bg-white/5 hover:text-white',
                                            )
                                          }
                                        >
                                          <Icon className="h-4 w-4 shrink-0 text-secondary" />
                                          <span className="truncate">{service.title}</span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={link.id}>
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            cn(
                              'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition',
                              isActive
                                ? 'bg-secondary/15 text-secondary-200'
                                : 'text-white/80 hover:bg-white/5 hover:text-white',
                            )
                          }
                        >
                          {t(`header.${link.id}`)}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <LanguageToggle className="flex-1 justify-center !text-sm" />
                  <Link
                    to="/contacto"
                    className="btn-primary flex-1 justify-center !text-sm"
                  >
                    {t('header.cta')}
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
