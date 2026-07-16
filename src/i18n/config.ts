import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Inyectado por Vite (vite.config.ts → define). Cambia en cada build.
declare const __BUILD_ID__: string;

export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: SUPPORTED_LANGUAGES as readonly string[] as string[],
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gotechy-lang',
    },
    backend: {
      // El ?v= fuerza a refetchear las traducciones tras cada deploy.
      loadPath: `/locales/{{lng}}/{{ns}}.json?v=${__BUILD_ID__}`,
    },
    react: { useSuspense: false },
  });

export default i18n;
