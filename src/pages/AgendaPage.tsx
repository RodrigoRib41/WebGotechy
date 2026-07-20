import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarX2, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageToggle } from '../components/LanguageToggle';
import { WhatsAppIcon, WHATSAPP_HREF } from '../components/WhatsAppIcon';
import { MeetingScheduler } from '../components/contact/MeetingScheduler';
import { SITE } from '../data/site';

/**
 * Página standalone de agendado — agenda.gotechy.com en producción, /agenda
 * en local/staging. Sin el chrome del sitio (nav, footer grande, WhatsApp,
 * chatbot): un header mínimo con logo + idioma, el MeetingScheduler completo
 * y un footer de una línea. La disponibilidad se configura igual que siempre
 * desde /admin/meetings (ambas superficies pegan a las mismas Edge Functions).
 *
 * El MeetingScheduler corre en modo `standalone`: banner OSCURO, sin
 * subtítulo y con la etiqueta de zona horaria abreviada. El card del
 * agendador (claro) se superpone sobre el banner.
 */
export function AgendaPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t('agendaPage.docTitle');
    return () => {
      document.title = prevTitle;
    };
  }, [t]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-primary">
        <div className="container-x flex h-16 items-center justify-between sm:h-20">
          <a
            href="https://gotechy.com"
            aria-label={t('agendaPage.backToSite')}
            className="rounded-md focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Logo />
          </a>
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1">
        <MeetingScheduler standalone fallback={<AgendaUnavailable />} />
      </main>

      <footer className="bg-primary">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {t('agendaPage.footerNote')}
          </p>
          <a
            href="https://gotechy.com"
            className="font-semibold text-white/75 transition hover:text-secondary"
          >
            gotechy.com
          </a>
        </div>
      </footer>
    </div>
  );
}

/**
 * Fallback cuando el agendado está deshabilitado desde /admin o falla la
 * carga. En /contacto la sección simplemente no aparece, pero acá sería TODA
 * la página en blanco — en su lugar invitamos a coordinar por email/WhatsApp.
 */
function AgendaUnavailable() {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-lg rounded-3xl border border-black/5 bg-white p-10 text-center shadow-[0_10px_40px_-15px_rgba(15,20,25,0.12)]">
        <CalendarX2 className="mx-auto h-14 w-14 text-brand-500" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-[#0F1419]">
          {t('agendaPage.unavailableTitle')}
        </h1>
        <p className="mt-3 text-[#0F1419]/65">{t('agendaPage.unavailableBody')}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`mailto:${SITE.email}`} className="btn-primary-light w-full sm:w-auto">
            <Mail className="h-4 w-4" />
            {t('agendaPage.unavailableCtaEmail', { email: SITE.email })}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-light w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t('agendaPage.unavailableCtaWhatsApp')}
          </a>
        </div>
      </div>
    </section>
  );
}
