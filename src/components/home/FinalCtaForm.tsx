import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

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

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

/**
 * Sección "CTA Final" — fondo BLANCO. Form inline minimalista que se envía
 * al mismo endpoint de Netlify Forms que usa /contacto (form-name=contacto),
 * así todas las consultas caen en la misma bandeja en el dashboard.
 *
 * Nota: para que Netlify detecte el form también debe existir una declaración
 * estática en index.html (o un mirror del form en el HTML). Ya está
 * declarado para /contacto, así que reusar form-name=contacto basta.
 */
export function FinalCtaForm() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en');

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
      const body = encode({
        'form-name': 'contacto',
        name: fields.name,
        email: fields.email,
        company: fields.company,
        phone: '',
        message: fields.message,
      });
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      setState('success');
      setFields(initial);
    } catch {
      setState('error');
    }
  };

  return (
    <section className="section-light relative overflow-hidden" aria-labelledby="final-cta-title">
      {/* Gradient cyan muy sutil al fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(29,233,182,0.06), transparent 60%)',
        }}
      />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow-light">{isEn ? "Let's talk" : 'Conversemos'}</span>
          <h2 id="final-cta-title" className="h1-display mt-5 text-[#0F1419]">
            {isEn ? (
              <>
                Ready for your next{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  SAP project?
                </span>
              </>
            ) : (
              <>
                ¿Listo para tu próximo{' '}
                <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  proyecto SAP?
                </span>
              </>
            )}
          </h2>
          <p className="body-lg mx-auto mt-5 max-w-xl text-[#0F1419]/65">
            {isEn
              ? 'Tell us what you need. A senior consultant will reply within 24 hours.'
              : 'Contanos qué necesitás. Un consultor senior te responde dentro de 24 horas.'}
          </p>
        </motion.div>

        {state === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-14 max-w-xl rounded-3xl border border-brand-200 bg-white p-10 text-center shadow-lg"
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-brand-500" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-[#0F1419]">
              {isEn ? 'Got it. Talk soon.' : '¡Listo! Hablamos pronto.'}
            </h3>
            <p className="mt-3 text-[#0F1419]/65">
              {isEn
                ? 'We received your message. A consultant will reach out within 24h.'
                : 'Recibimos tu mensaje. Un consultor te contacta dentro de 24h.'}
            </p>
            <button
              type="button"
              onClick={() => setState('idle')}
              className="btn-secondary-light mt-6 !text-sm"
            >
              {isEn ? 'Send another' : 'Enviar otro'}
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            name="contacto"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mx-auto mt-14 max-w-2xl rounded-3xl border border-black/5 bg-white p-7 shadow-[0_10px_40px_-15px_rgba(15,20,25,0.12)] sm:p-10"
            noValidate
          >
            {/* Netlify hidden fields */}
            <input type="hidden" name="form-name" value="contacto" />
            <p className="hidden">
              <label>
                No completar: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <FieldLight
                label={isEn ? 'Name' : 'Nombre'}
                name="name"
                value={fields.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                required
              />
              <FieldLight
                label="Email"
                name="email"
                type="email"
                value={fields.email}
                onChange={(v) => update('email', v)}
                error={errors.email}
                required
              />
            </div>
            <FieldLight
              label={isEn ? 'Company' : 'Empresa'}
              name="company"
              value={fields.company}
              onChange={(v) => update('company', v)}
              className="mt-4"
            />
            <FieldLight
              label={isEn ? 'Message' : 'Mensaje'}
              name="message"
              value={fields.message}
              onChange={(v) => update('message', v)}
              error={errors.message}
              required
              textarea
              className="mt-4"
              placeholder={
                isEn
                  ? 'Tell us about your project, scope, timing...'
                  : 'Contanos sobre tu proyecto, alcance, timing...'
              }
            />

            {state === 'error' && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {isEn
                    ? 'Something went wrong. Try again or write us at contacto@gotechy.com.'
                    : 'Algo falló. Probá de nuevo o escribinos a contacto@gotechy.com.'}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-[#0F1419]/55">
                {isEn
                  ? 'We respond within 24 business hours.'
                  : 'Respondemos en 24h hábiles.'}
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
                    {isEn ? 'Sending…' : 'Enviando…'}
                  </>
                ) : (
                  <>
                    {isEn ? 'Send message' : 'Enviar mensaje'}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
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
