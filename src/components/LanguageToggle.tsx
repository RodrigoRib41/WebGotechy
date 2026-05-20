import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '../utils/cn';

interface LanguageToggleProps {
  className?: string;
  /** Variante visual: pill (default) o icon-only */
  variant?: 'pill' | 'icon';
}

export function LanguageToggle({ className, variant = 'pill' }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'es').slice(0, 2);
  const next = current === 'es' ? 'en' : 'es';

  const toggle = () => {
    void i18n.changeLanguage(next);
    document.documentElement.lang = next;
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={t('header.switchLanguage')}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/75 transition hover:border-secondary hover:text-secondary',
          className,
        )}
      >
        <Globe className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('header.switchLanguage')}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/75 transition hover:border-secondary hover:text-secondary-200',
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{current.toUpperCase()}</span>
      <span className="text-white/30">/</span>
      <span className="text-white/45">{next.toUpperCase()}</span>
    </button>
  );
}
