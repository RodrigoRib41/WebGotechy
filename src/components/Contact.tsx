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
import { SectionHeader } from './SectionHeader';
import { OFFICES, SITE } from '../data/site';
import { cn } from '../utils/cn';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface Fields {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const initial: Fields = { name: '', email: '', company: '', phone: '', message: '' };

function validate(fields: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = 'Ingresá tu nombre';
  if (!fields.email.trim()) errors.email = 'Ingresá tu email';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'El email no es válido';
  if (fields.message.trim().length < 10)
    errors.message = 'Contanos un poco más (mínimo 10 caracteres)';
  return errors;
}

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<FormState>('idle');

  const handleChange = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Validación en tiempo real solo para campos ya tocados
    if (errors[key]) {
      const next = validate({ ...fields, [key]: value });
      setErrors(next);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate(fields);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setState('submitting');
    try {
      const formData = new FormData(e.currentTarget);
      const body = encode({
        'form-name': 'contacto',
        ...Object.fromEntries(formData.entries()) as Record<string, string>,
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
          eyebrow="Contacto"
          title={
            <>
              Hablemos de tu próximo <span className="text-gradient">proyecto SAP</span>
            </>
          }
          description="Contanos qué necesitás y te respondemos en menos de 24 horas hábiles. Sin compromiso."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
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
                    ¡Gracias por escribirnos!
                  </h3>
                  <p className="mt-2 max-w-md text-white/70">
                    Recibimos tu mensaje. Un consultor de GoTechy se va a contactar
                    en las próximas horas hábiles.
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="btn-secondary mt-6"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  name="contacto"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="grid gap-5"
                  noValidate
                >
                  {/* Netlify fields */}
                  <input type="hidden" name="form-name" value="contacto" />
                  <p className="hidden">
                    <label>
                      No completar:
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Nombre completo"
                      value={fields.name}
                      onChange={(v) => handleChange('name', v)}
                      error={errors.name}
                      autoComplete="name"
                      required
                    />
                    <Field
                      id="email"
                      type="email"
                      label="Email corporativo"
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
                      label="Empresa"
                      value={fields.company}
                      onChange={(v) => handleChange('company', v)}
                      error={errors.company}
                      autoComplete="organization"
                    />
                    <Field
                      id="phone"
                      type="tel"
                      label="Teléfono"
                      value={fields.phone}
                      onChange={(v) => handleChange('phone', v)}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>
                  <Field
                    id="message"
                    label="¿En qué podemos ayudarte?"
                    value={fields.message}
                    onChange={(v) => handleChange('message', v)}
                    error={errors.message}
                    textarea
                    required
                  />

                  {state === 'error' && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      Hubo un problema al enviar. Probá nuevamente o escribinos por WhatsApp.
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
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar mensaje
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
                      WhatsApp
                    </a>
                  </div>

                  <p className="text-xs text-white/55">
                    Al enviar este formulario aceptás nuestra política de privacidad. No
                    compartimos tu información con terceros.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mapa + oficinas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-card">
              <iframe
                title="Mapa de oficinas GoTechy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-61.2%2C-35.0%2C-58.0%2C-31.2&amp;layer=mapnik&amp;marker=-34.498%2C-58.515"
                loading="lazy"
                className="absolute inset-0 h-full w-full grayscale-[20%] invert-[0.85] hue-rotate-180"
                style={{ border: 0 }}
              />
              {/* Pins decorativos */}
              <div className="pointer-events-none absolute left-[68%] top-[78%]">
                <MapPin className="h-7 w-7 text-secondary drop-shadow-md" fill="#00E5FF" />
              </div>
              <div className="pointer-events-none absolute left-[40%] top-[42%]">
                <MapPin className="h-7 w-7 text-accent drop-shadow-md" fill="#1DE9B6" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {OFFICES.map((office) => (
                <div
                  key={office.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-card backdrop-blur"
                >
                  <div className="flex items-center gap-2 text-secondary-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {office.city}
                    </span>
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
                  <div className="text-xs uppercase tracking-wider text-white/55">Teléfono</div>
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
                  <div className="text-xs uppercase tracking-wider text-white/55">Email</div>
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
