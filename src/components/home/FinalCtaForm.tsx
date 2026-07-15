import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { supabase } from '../../lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface Fields {
  name: string;
  email: string;
  company: string;
  message: string;
}

const initial: Fields = { name: '', email: '', company: '', message: '' };

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = 'Requerido';
  if (!f.email.trim()) e.email = 'Requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email inválido';
  if (f.message.trim().length < 10) e.message = 'Mínimo 10 caracteres';
  return e;
}

/**
 * Sección "CTA Final" — banner fotográfico + form superpuesto.
 *
 * Composición (espejo de ServicesPreview, para dar ritmo al Home):
 *  1. Banner full-bleed con Hero5 (persona trabajando, centro-derecha).
 *     El copy va a la IZQUIERDA sobre scrim blanco degradado. Línea de
 *     marca cyan→mint como remate inferior.
 *  2. El form card se superpone al borde inferior del banner (-mt).
 *
 * El form envía la consulta a la Edge Function `submit-contact` (misma
 * bandeja que /contacto), que valida, frena bots y manda el email vía Resend.
 */
export function FinalCtaForm() {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<FormState>('idle');

  const update = (k: keyof Fields, v: string) => {
    setFields((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(validate({ ...fields, [k]: v }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setState('submitting');
    try {
      // El honeypot vive como input oculto (`bot-field`); lo leemos del form.
      const botField = (new FormData(e.currentTarget).get('bot-field') as string) ?? '';
      const { error } = await supabase.functions.invoke('submit-contact', {
        body: {
          name: fields.name,
          email: fields.email,
          company: fields.company,
          phone: '',
          message: fields.message,
          botField,
        },
      });
      if (error) throw error;
      setState('success');
      setFields(initial);
    } catch {
      setState('error');
    }
  };

  return (
    <section className="relative bg-white text-[#0F1419]" aria-labelledby="final-cta-title">
      {/* ---- Banner fotográfico ---- */}
      <div className="relative overflow-hidden">
        <img
          src="/images/Hero5.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_30%]"
        />
        {/* Scrims: velo base + degradado hacia el lado del texto (izquierda) */}
        <div className="absolute inset-0 bg-white/30" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/25 sm:via-white/75 sm:to-transparent"
          aria-hidden="true"
        />
        {/* Línea de marca en el borde inferior del banner */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary to-accent"
          aria-hidden="true"
        />

        <div className="container-x relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mr-auto flex max-w-xl flex-col items-start pb-40 pt-16 sm:pb-48 sm:pt-24"
          >
            <span className="eyebrow-light">{t('home.finalCta.eyebrow')}</span>
            <h2 id="final-cta-title" className="h2-display mt-5 text-[#0F1419]">
              {t('home.finalCta.titleStart')}{' '}
              <span className="text-brand-600">{t('home.finalCta.titleHighlight')}</span>
            </h2>
            <p className="body-lg mt-5 max-w-lg text-[#0F1419]/70">
              {t('home.finalCta.subtitleAlt')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ---- Form superpuesto al banner ---- */}
      <div className="relative bg-gradient-to-b from-transparent via-[#F7FAFC] to-white pb-20 sm:pb-28">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,255,146,0.06), transparent 60%)',
          }}
        />

        <div className="container-x relative -mt-28 sm:-mt-32">
          {state === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-xl rounded-3xl border border-brand-200 bg-white p-10 text-center shadow-lg"
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-brand-500" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-[#0F1419]">
              {t('home.finalCta.successTitle')}
            </h3>
            <p className="mt-3 text-[#0F1419]/65">
              {t('home.finalCta.successBody')}
            </p>
            <button
              type="button"
              onClick={() => setState('idle')}
              className="btn-secondary-light mt-6 !text-sm"
            >
              {t('home.finalCta.sendAnother')}
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            className="mx-auto max-w-2xl rounded-3xl border border-black/5 bg-white p-7 shadow-[0_10px_40px_-15px_rgba(15,20,25,0.12)] sm:p-10"
            noValidate
          >
            {/* Honeypot anti-bot: oculto para humanos, lo valida la Edge Function */}
            <p className="hidden">
              <label>
                No completar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <FieldLight
                label={t('home.finalCta.fieldName')}
                name="name"
                value={fields.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                required
              />
              <FieldLight
                label={t('home.finalCta.fieldEmail')}
                name="email"
                type="email"
                value={fields.email}
                onChange={(v) => update('email', v)}
                error={errors.email}
                required
              />
            </div>
            <FieldLight
              label={t('home.finalCta.fieldCompany')}
              name="company"
              value={fields.company}
              onChange={(v) => update('company', v)}
              className="mt-4"
            />
            <FieldLight
              label={t('home.finalCta.fieldMessage')}
              name="message"
              value={fields.message}
              onChange={(v) => update('message', v)}
              error={errors.message}
              required
              textarea
              className="mt-4"
              placeholder={t('home.finalCta.messagePlaceholder')}
            />

            {state === 'error' && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{t('home.finalCta.errorBody')}</span>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-[#0F1419]/55">
                {t('home.finalCta.respondInHours')}
              </p>
              <button
                type="submit"
                disabled={state === 'submitting'}
                className={cn(
                  'btn-primary-light w-full sm:w-auto',
                  state === 'submitting' && 'opacity-70',
                )}
              >
                {state === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('home.finalCta.sending')}
                  </>
                ) : (
                  <>
                    {t('home.finalCta.sendMessage')}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  Field light — input/textarea con estilo claro
// ============================================================
interface FieldLightProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  className?: string;
}

function FieldLight({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  textarea,
  error,
  className,
}: FieldLightProps) {
  const id = `field-${name}`;
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0F1419]/65"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cn(
            'input-light resize-y',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'input-light',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
          )}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
