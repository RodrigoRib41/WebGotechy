import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { OfficesMap } from './OfficesMap';
import { OFFICES, SITE } from '../data/site';
import { cn } from '../utils/cn';
import { supabase } from '../lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface Fields {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const initial: Fields = { name: '', email: '', company: '', phone: '', message: '' };

function validate(
  fields: Fields,
  t: (k: string) => string,
): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = t('contact.form.required');
  if (!fields.email.trim()) errors.email = t('contact.form.required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = t('contact.form.invalidEmail');
  if (fields.message.trim().length < 10)
    errors.message = t('contact.form.required');
  return errors;
}

export function Contact() {
  const { t } = useTranslation();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<FormState>('idle');

  const handleChange = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Validación en tiempo real solo para campos ya tocados
    if (errors[key]) {
      const next = validate({ ...fields, [key]: value }, t);
      setErrors(next);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate(fields, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setState('submitting');
    try {
      // El honeypot vive como input oculto (`bot-field`); lo leemos del form.
      const botField = (new FormData(e.currentTarget).get('bot-field') as string) ?? '';
      const { error } = await supabase.functions.invoke('submit-contact', {
        body: {
          name: fields.name,
          email: fields.email,
          company: fields.company,
          phone: fields.phone,
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

  const whatsappUrl = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
    'Hola GoTechy, me gustaría conversar sobre un proyecto.',
  )}`;

  return (
    <section
      id="contacto"
      className="relative bg-surface-soft py-24 sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow={t('contactSection.eyebrow')}
          title={
            <>
              {t('contactSection.titleStart')}{' '}
              <span className="text-secondary">{t('contactSection.titleHighlight')}</span>
            </>
          }
          description={t('contactSection.description')}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-elevated backdrop-blur sm:p-10"
          >
            <AnimatePresence mode="wait">
              {state === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {t('contactSection.successTitle')}
                  </h3>
                  <p className="mt-2 max-w-md text-white/70">
                    {t('contactSection.successBody')}
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="btn-secondary mt-6"
                  >
                    {t('contactSection.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid gap-5"
                  noValidate
                >
                  {/* Honeypot anti-bot: oculto para humanos, lo valida la Edge Function */}
                  <p className="hidden">
                    <label>
                      {t('contact.form.botField')}:
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label={t('contactSection.fieldName')}
                      value={fields.name}
                      onChange={(v) => handleChange('name', v)}
                      error={errors.name}
                      autoComplete="name"
                      required
                    />
                    <Field
                      id="email"
                      type="email"
                      label={t('contactSection.fieldEmail')}
                      value={fields.email}
                      onChange={(v) => handleChange('email', v)}
                      error={errors.email}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="company"
                      label={t('contactSection.fieldCompany')}
                      value={fields.company}
                      onChange={(v) => handleChange('company', v)}
                      error={errors.company}
                      autoComplete="organization"
                    />
                    <Field
                      id="phone"
                      type="tel"
                      label={t('contactSection.fieldPhone')}
                      value={fields.phone}
                      onChange={(v) => handleChange('phone', v)}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>
                  <Field
                    id="message"
                    label={t('contactSection.fieldMessage')}
                    value={fields.message}
                    onChange={(v) => handleChange('message', v)}
                    error={errors.message}
                    textarea
                    required
                  />

                  {state === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      {t('contactSection.errorBody')}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      className="btn-primary flex-1 disabled:opacity-70"
                    >
                      {state === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t('contactSection.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t('contactSection.sendMessage')}
                        </>
                      )}
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1"
                    >
                      <MessageCircle className="h-4 w-4 text-whatsapp" />
                      {t('contactSection.whatsapp')}
                    </a>
                  </div>

                  <p className="text-xs text-white/55">
                    {t('contactSection.privacyNote')}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mapa + oficinas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Un solo mapa con las dos oficinas marcadas */}
            <OfficesMap />

            {/* Cards con la info de cada oficina */}
            <div className="grid gap-4 sm:grid-cols-2">
              {OFFICES.map((office) => (
                <div
                  key={office.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-2 text-secondary-300">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="h-4 w-4" />
                      {office.city}
                    </span>
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-white/55 underline-offset-2 hover:text-secondary hover:underline"
                    >
                      {t('contactSection.directions')}
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {office.address}
                    <br />
                    {office.postal} — {office.country}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary-300 ring-1 ring-secondary/30">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/55">{t('contactSection.phoneLabel')}</div>
                  <a href={`tel:${SITE.phone}`} className="text-sm font-semibold hover:text-secondary">
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/55">{t('contactSection.emailLabel')}</div>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-semibold hover:text-secondary">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  textarea,
  required,
  autoComplete,
}: FieldProps) {
  const baseClass = cn(
    'peer w-full rounded-xl border bg-white/[0.04] px-4 pb-2.5 pt-5 text-sm text-white shadow-sm transition placeholder:text-transparent focus:outline-none focus:ring-2 focus:ring-secondary/40',
    error ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-secondary',
  );

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={5}
          placeholder={label}
          className={cn(baseClass, 'resize-none')}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          className={baseClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-white/55 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-secondary"
      >
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      {error && (
        <div id={`${id}-error`} className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  );
}
