# Migraciones SQL

Las tablas que necesita la app (`blog_posts`, `logos`, `projects`) ya están
creadas en Supabase. Cuando se agrega una nueva, dejamos acá el SQL para correr.

Cómo aplicar:
1. Abrir el dashboard de Supabase del proyecto
2. SQL Editor → New query
3. Pegar el bloque correspondiente, Run

---

## 2026-05-26 — Tabla `testimonials`

Soporta la sección "Testimonios" del Home. Gestionado desde `/admin/testimonials`.

```sql
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text,
  company text,
  avatar_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger para mantener updated_at fresco
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- Índice para listado ordenado
create index if not exists testimonials_sort_idx
  on public.testimonials (sort_order, created_at desc);

-- RLS: lectura pública solo de publicados; escritura solo authenticated
alter table public.testimonials enable row level security;

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
  on public.testimonials for select
  using (published = true);

drop policy if exists "Authenticated can manage testimonials" on public.testimonials;
create policy "Authenticated can manage testimonials"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);
```

Listo. Si todavía no hay testimonios, la sección del Home no renderiza nada
y el admin muestra el empty state con un CTA "Cargar el primero".

---

## 2026-05-26 — Tabla `events`

Soporta la sección "Eventos y Webinars" del Home. Gestionada desde
`/admin/events`. Por default el sitio público muestra solo eventos
publicados y futuros (start_date >= hoy).

```sql
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'event' check (kind in ('event', 'webinar')),
  title text not null,
  description text,
  start_date date not null,
  end_date date,
  location text,
  languages text[] not null default '{}',
  cta_label text not null default 'Regístrate',
  cta_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reusa el trigger set_updated_at creado en la migración de testimonials
drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- Índice por fecha + publicación (el listado público filtra por estos)
create index if not exists events_start_date_idx
  on public.events (published, start_date);

-- RLS: público lee solo publicados; authenticated gestiona todo
alter table public.events enable row level security;

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
  on public.events for select
  using (published = true);

drop policy if exists "Authenticated can manage events" on public.events;
create policy "Authenticated can manage events"
  on public.events for all
  to authenticated
  using (true)
  with check (true);
```

Sin data, la sección "Eventos y Webinars" no se renderiza en el Home
(graceful fallback). El admin muestra empty state con CTA para crear el primero.

---

## 2026-05-27 — Columnas EN en `projects` y `blog_posts`

Soporta el toggle ES/EN en el sitio público para casos de éxito y artículos
del blog. El admin (`/admin/projects` y `/admin/posts`) ya muestra los nuevos
campos en una sección colapsable "EN — Traducción al inglés (opcional)". Si
los campos EN quedan vacíos, el sitio público hace fallback al español de
forma transparente — no se rompe nada al correr sin haber traducido todavía.

```sql
-- Casos de éxito (Proyectos)
alter table public.projects
  add column if not exists title_en text,
  add column if not exists industry_en text,
  add column if not exists challenge_en text,
  add column if not exists solution_en text;

-- Blog
alter table public.blog_posts
  add column if not exists title_en text,
  add column if not exists excerpt_en text,
  add column if not exists content_en text;
```

Después de correr esto, podés entrar al admin y empezar a llenar los campos
EN proyecto por proyecto y post por post. El sitio público los va a usar
automáticamente cuando el usuario selecciona EN en el header.

---

## 2026-06-01 — Tabla `service_horizonte`

Hace editable el bloque **"Horizonte SAP"** de cada página de servicio desde
`/admin/horizonte`. El texto por defecto sigue viviendo en
`src/data/services.ts` (estático): esta tabla sólo guarda los servicios cuyo
Horizonte fue **editado** u **ocultado** desde el panel.

- Sin fila para un `service_id` → el sitio usa el texto estático original.
- Fila con `text` → reemplaza al texto estático.
- Fila con `hidden = true` → el bloque NO aparece en la página del servicio.

El `service_id` coincide con `Service.id` del catálogo estático (ej: `ia`,
`btp`, `desarrollo`). Es la PK, así que el upsert resuelve por `service_id`.

```sql
create table if not exists public.service_horizonte (
  service_id text primary key,
  text text,
  text_en text,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reusa el trigger set_updated_at creado en la migración de testimonials
drop trigger if exists service_horizonte_set_updated_at on public.service_horizonte;
create trigger service_horizonte_set_updated_at
  before update on public.service_horizonte
  for each row execute function public.set_updated_at();

-- RLS: lectura pública (el flag `hidden` decide la visibilidad en el cliente);
-- escritura sólo authenticated.
alter table public.service_horizonte enable row level security;

drop policy if exists "Public can read service horizonte" on public.service_horizonte;
create policy "Public can read service horizonte"
  on public.service_horizonte for select
  using (true);

drop policy if exists "Authenticated can manage service horizonte" on public.service_horizonte;
create policy "Authenticated can manage service horizonte"
  on public.service_horizonte for all
  to authenticated
  using (true)
  with check (true);
```

Sin correr esta migración, el admin muestra el error "relation does not exist"
y el sitio público sigue mostrando los textos estáticos sin romperse (el fetch
del override falla en silencio y cae al default).

---

## 2026-06-03 — Hardening de seguridad: allowlist de admins + RPC de vistas

Cierra dos hallazgos de la auditoría OWASP:

1. **Autorización admin (A01/A07):** las policies originales daban CRUD a
   cualquier rol `authenticated` (`using (true)`). Es decir, **cualquier usuario
   registrado** podía gestionar TODO el contenido. Ahora la escritura se
   restringe a una allowlist explícita (`admin_users`) vía `is_admin()`.
2. **Conteo de vistas (A03):** se elimina el fallback de UPDATE directo desde el
   cliente y se centraliza en un RPC `SECURITY DEFINER`.

> ⚠️ Recomendado además: Authentication → Providers → Email → desactivar
> "Allow new users to sign up" (defensa en profundidad).

```sql
-- 1) Allowlist de administradores (sin policies = nadie la lee/escribe desde el cliente)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- 2) Helper que usan todas las policies de escritura
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3) Cargar el/los admin(s) por email
insert into public.admin_users (user_id)
select id from auth.users where email = 'rodrigo.riboldi@gotechy.com'
on conflict do nothing;

-- 4) blog_posts: reemplazar las 4 policies de authenticated por admin-only
drop policy if exists "Authenticated can delete"   on public.blog_posts;
drop policy if exists "Authenticated can update"   on public.blog_posts;
drop policy if exists "Authenticated can insert"   on public.blog_posts;
drop policy if exists "Authenticated can read all" on public.blog_posts;
create policy "Admins manage blog_posts" on public.blog_posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
-- ("Public can read published posts" se mantiene)

-- 5) Resto de tablas: misma sustitución
drop policy if exists "Authenticated can manage logos" on public.logos;
create policy "Admins manage logos" on public.logos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated can manage projects" on public.projects;
create policy "Admins manage projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated can manage testimonials" on public.testimonials;
create policy "Admins manage testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated can manage events" on public.events;
create policy "Admins manage events" on public.events
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated can manage service horizonte" on public.service_horizonte;
create policy "Admins manage service_horizonte" on public.service_horizonte
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- 6) RPC de vistas (reemplaza el UPDATE directo del cliente, que ya no tiene permiso)
create or replace function public.increment_views(post_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.blog_posts set views = views + 1 where id = post_id;
$$;
revoke all on function public.increment_views(uuid) from public;
grant execute on function public.increment_views(uuid) to anon, authenticated;
```

---

## 2026-06-03 — Edge Function `sign-upload` (subidas firmadas a Cloudinary)

Cierra el hallazgo A04/A05: el preset *unsigned* viajaba en el bundle, así que
cualquiera podía subir a la cuenta Cloudinary. Ahora las subidas se **firman
server-side** y solo para admins logueados. Ver `supabase/functions/sign-upload/`.

Pasos de despliegue:

```bash
# Secrets (el API SECRET nunca toca el front)
supabase secrets set CLOUDINARY_CLOUD_NAME=...
supabase secrets set CLOUDINARY_API_KEY=...
supabase secrets set CLOUDINARY_API_SECRET=...
supabase secrets set CLOUDINARY_UPLOAD_PRESET=gotechy-blog

supabase functions deploy sign-upload
```

Además: en Cloudinary, poner el preset `gotechy-blog` en **Signing Mode: Signed**
(si queda Unsigned, el vector sigue abierto) + restringir formatos/tamaño/folder.

---

## 2026-06-19 — Edge Function `submit-contact` (formularios de contacto por email)

El sitio se despliega en **Vercel** (no Netlify), así que los formularios ya no
pueden usar Netlify Forms. Ahora la página de Contacto y el CTA final del Home
envían a la Edge Function `submit-contact`, que valida server-side, frena bots
(honeypot + rate-limit por IP), escapa el HTML del input y manda el lead por
email vía **Resend**. Ver `supabase/functions/submit-contact/`.

**Hasta no desplegar esto + cargar los secrets, los formularios fallan** (el
visitante ve el estado de error; ninguna consulta se pierde en silencio).

Pasos de despliegue:

```bash
# 1. Crear cuenta en https://resend.com y una API key.
#    Para producción, verificar el dominio gotechy.com en Resend y usar un
#    remitente de ese dominio (ej. "GoTechy Web <web@gotechy.com>").
#    Para probar rápido: dejá el default (onboarding@resend.dev), que solo
#    entrega al email dueño de la cuenta Resend.

# 2. Secrets (el API key nunca toca el bundle del front)
supabase secrets set RESEND_API_KEY=re_xxx
supabase secrets set CONTACT_TO_EMAIL=contacto@gotechy.com
supabase secrets set CONTACT_FROM_EMAIL="GoTechy Web <web@gotechy.com>"

# 3. Deploy (la función es pública: la anon key que manda supabase-js alcanza
#    para pasar la verificación JWT por defecto, no hace falta --no-verify-jwt)
supabase functions deploy submit-contact
```

Notas:
- El rate-limit es best-effort (memoria por isolate en Deno Deploy): frena floods
  comunes, no es un límite distribuido. Para anti-spam fuerte, sumar a futuro un
  challenge tipo Cloudflare Turnstile.
- El `connect-src` de la CSP ya permite `https://*.supabase.co`, así que la
  llamada `functions.invoke('submit-contact')` no requiere tocar `vercel.json`.

---

## 2026-07-15 — Agenda de reuniones con Google Meet (`meeting_settings` + `meeting_bookings`)

Sistema de agendado en /contacto: el visitante elige día y horario libre y se
crea una reunión de Google Meet automáticamente. La franja horaria, los días
permitidos, la duración del slot y el margen mínimo se configuran desde
`/admin/meetings`.

```sql
-- Configuración de la agenda (una sola fila, id=1).
-- allowed_weekdays usa la convención JS: 0=domingo … 6=sábado.
create table if not exists public.meeting_settings (
  id int primary key default 1 check (id = 1),
  enabled boolean not null default true,
  timezone text not null default 'America/Argentina/Buenos_Aires',
  start_time time not null default '09:00',
  end_time time not null default '18:00',
  slot_minutes int not null default 30 check (slot_minutes between 15 and 240),
  allowed_weekdays int[] not null default '{1,2,3,4,5}',
  min_notice_hours int not null default 24 check (min_notice_hours >= 0),
  max_days_ahead int not null default 30 check (max_days_ahead between 1 and 90),
  updated_at timestamptz not null default now()
);

insert into public.meeting_settings (id) values (1) on conflict do nothing;

alter table public.meeting_settings enable row level security;

drop policy if exists "Admins manage meeting_settings" on public.meeting_settings;
create policy "Admins manage meeting_settings" on public.meeting_settings
  for all using (public.is_admin()) with check (public.is_admin());

-- Reservas. SIN acceso público: el sitio anónimo nunca lee ni escribe esta
-- tabla. Las reservas entran solo por la Edge Function `book-meeting`
-- (service role) y la disponibilidad sale por `meeting-availability`, que
-- expone únicamente horarios ocupados agregados (sin datos personales).
create table if not exists public.meeting_bookings (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  name text not null,
  email text not null,
  company text,
  notes text,
  meet_link text,
  gcal_event_id text,
  status text not null default 'confirmed' check (status in ('confirmed','cancelled')),
  created_at timestamptz not null default now()
);

-- Anti doble-reserva: dos clientes no pueden confirmar el mismo horario.
create unique index if not exists meeting_bookings_slot_unique
  on public.meeting_bookings (starts_at) where (status = 'confirmed');

create index if not exists meeting_bookings_starts_at
  on public.meeting_bookings (starts_at);

alter table public.meeting_bookings enable row level security;

drop policy if exists "Admins manage meeting_bookings" on public.meeting_bookings;
create policy "Admins manage meeting_bookings" on public.meeting_bookings
  for all using (public.is_admin()) with check (public.is_admin());
```

Despliegue de las Edge Functions:

```bash
supabase functions deploy meeting-availability
supabase functions deploy book-meeting
```

Secrets de Google (opcionales — sin ellos el sistema reserva y avisa por
email, pero no crea el link de Meet). Guía completa paso a paso en
`supabase/SETUP-GOOGLE-MEET.md`:

```bash
supabase secrets set GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
supabase secrets set GOOGLE_CLIENT_SECRET=GOCSPX-xxx
supabase secrets set GOOGLE_REFRESH_TOKEN=1//xxx
supabase secrets set GOOGLE_CALENDAR_ID=primary   # o la casilla del calendario
```

Notas:
- El margen mínimo de 24 h es `min_notice_hours` (configurable).
- Con Google configurado, el freeBusy del calendario también bloquea slots →
  las reuniones agendadas a mano por el equipo no se pisan con las de la web.
- Cancelar desde /admin/meetings libera el slot en la web; el evento de
  Google Calendar hay que borrarlo a mano (el panel lo recuerda con un toast).

---

## 2026-07-15 — Chatbot IA "Techy" (`chatbot_settings` + `chatbot_articles` + `chatbot_messages`)

Asistente de IA (Google Gemini) que responde a los visitantes en base a la
base de conocimientos cargada desde `/admin/chatbot`. Se activa/desactiva
site-wide desde el mismo panel. El widget aparece como un muñequito arriba
del botón de WhatsApp.

```sql
-- Configuración del bot (una sola fila, id=1).
-- El flag `enabled` es público (el widget lo lee con la anon key para saber
-- si mostrarse); solo admins lo modifican.
create table if not exists public.chatbot_settings (
  id int primary key default 1 check (id = 1),
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.chatbot_settings (id) values (1) on conflict do nothing;

alter table public.chatbot_settings enable row level security;

drop policy if exists "Anyone reads chatbot_settings" on public.chatbot_settings;
create policy "Anyone reads chatbot_settings" on public.chatbot_settings
  for select using (true);

drop policy if exists "Admins manage chatbot_settings" on public.chatbot_settings;
create policy "Admins manage chatbot_settings" on public.chatbot_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Base de conocimientos. SIN lectura pública: el contenido solo viaja al
-- modelo vía la Edge Function `chat-assistant` (service role).
create table if not exists public.chatbot_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.chatbot_articles enable row level security;

drop policy if exists "Admins manage chatbot_articles" on public.chatbot_articles;
create policy "Admins manage chatbot_articles" on public.chatbot_articles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Log de conversaciones (para revisar en /admin/chatbot y mejorar la base).
-- Los INSERT entran solo por la Edge Function (service role, bypassa RLS);
-- los admins pueden leer y borrar.
create table if not exists public.chatbot_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  lang text,
  created_at timestamptz not null default now()
);

create index if not exists chatbot_messages_session
  on public.chatbot_messages (session_id, created_at);
create index if not exists chatbot_messages_created
  on public.chatbot_messages (created_at desc);

alter table public.chatbot_messages enable row level security;

drop policy if exists "Admins read chatbot_messages" on public.chatbot_messages;
create policy "Admins read chatbot_messages" on public.chatbot_messages
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins delete chatbot_messages" on public.chatbot_messages;
create policy "Admins delete chatbot_messages" on public.chatbot_messages
  for delete to authenticated using (public.is_admin());
```

Despliegue de la Edge Function + secrets (guía completa en
`supabase/SETUP-CHATBOT.md` — la API key de Gemini se crea gratis en
https://aistudio.google.com):

```bash
supabase secrets set GEMINI_API_KEY=AIzaSy...
# Opcional: cambiar el modelo (default: gemini-flash-lite-latest — usar los
# alias *-latest; los nombres con versión fija se retiran para keys nuevas).
supabase secrets set GEMINI_MODEL=gemini-flash-lite-latest

supabase functions deploy chat-assistant
```

Notas:
- El bot arranca **deshabilitado** (`enabled=false`): se prende desde
  `/admin/chatbot` cuando la base de conocimientos esté cargada.
- Rate-limit por IP en la función (best-effort, memoria por isolate) +
  límites de longitud, para proteger la cuota gratuita de Gemini.
- En el tier gratuito de Gemini, Google puede usar las conversaciones para
  mejorar sus modelos. El bot solo maneja info pública del sitio.
- Seed inicial de la base de conocimientos: `supabase/seed-chatbot-kb.sql`
  (aplicado el 2026-07-16; se mantiene desde `/admin/chatbot`).

Retención de conversaciones — **14 días** (aplicado el 2026-07-16 vía
pg_cron; job `chatbot-messages-retention`, corre a diario a las 03:00 UTC):

```sql
create extension if not exists pg_cron;

select cron.schedule(
  'chatbot-messages-retention',
  '0 3 * * *',
  $$delete from public.chatbot_messages where created_at < now() - interval '14 days'$$
);

-- Para cambiar la ventana: re-correr cron.schedule con otro interval
-- (mismo nombre = reemplaza el job). Para eliminarla:
--   select cron.unschedule('chatbot-messages-retention');
```

---

## 2026-07-16 — Medidor de consumo de Gemini (`chatbot_usage` + RPC `chatbot_usage_daily`)

La Edge Function `chat-assistant` registra cada llamada a Gemini (tokens y
resultado) para poder ver en `/admin/chatbot/consumo` cuánto se consumió del
tier gratuito. Los INSERT entran solo por la función (service role, bypassa
RLS); los admins solo leen.

```sql
-- Una fila por llamada a la API de Gemini (ok, rechazada por cuota o error).
create table if not exists public.chatbot_usage (
  id uuid primary key default gen_random_uuid(),
  model text not null,
  status text not null check (status in ('ok','rate_limited','error')),
  prompt_tokens int not null default 0,
  output_tokens int not null default 0,
  total_tokens int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists chatbot_usage_created
  on public.chatbot_usage (created_at desc);

alter table public.chatbot_usage enable row level security;

drop policy if exists "Admins read chatbot_usage" on public.chatbot_usage;
create policy "Admins read chatbot_usage" on public.chatbot_usage
  for select to authenticated using (public.is_admin());

-- Agregado diario para el panel (evita traer miles de filas al navegador).
-- El "día de cuota" de Google se reinicia a medianoche hora del Pacífico,
-- por eso se agrupa en ese huso y no en UTC.
-- SECURITY INVOKER (default): la RLS aplica → solo admins ven datos.
create or replace function public.chatbot_usage_daily(days int default 14)
returns table (
  day date,
  total bigint,
  ok_count bigint,
  rate_limited_count bigint,
  error_count bigint,
  prompt_tokens bigint,
  output_tokens bigint
)
language sql
stable
as $$
  select
    (created_at at time zone 'America/Los_Angeles')::date as day,
    count(*) as total,
    count(*) filter (where status = 'ok') as ok_count,
    count(*) filter (where status = 'rate_limited') as rate_limited_count,
    count(*) filter (where status = 'error') as error_count,
    coalesce(sum(prompt_tokens), 0) as prompt_tokens,
    coalesce(sum(output_tokens), 0) as output_tokens
  from public.chatbot_usage
  where (created_at at time zone 'America/Los_Angeles')::date
        >= (now() at time zone 'America/Los_Angeles')::date - (days - 1)
  group by 1
  order by 1;
$$;

-- Retención: 90 días alcanza para mirar tendencia sin acumular basura.
select cron.schedule(
  'chatbot-usage-retention',
  '30 3 * * *',
  $$delete from public.chatbot_usage where created_at < now() - interval '90 days'$$
);
```

Notas:
- Requiere **re-desplegar** la Edge Function: `npx supabase functions deploy chat-assistant`
  (la versión nueva es la que escribe en `chatbot_usage`).
- Los límites del tier gratuito (requests/día, etc.) viven como constantes en
  `src/pages/admin/AdminGeminiUsage.tsx` — si Google los cambia
  (https://ai.google.dev/gemini-api/docs/rate-limits), se actualizan ahí.

---

## 2026-07-16 — Agenda: segunda franja horaria opcional (`meeting_settings.start_time2/end_time2`)

Permite partir el día en dos franjas de atención (p. ej. 10:00-12:00 y
14:00-18:00) desde `/admin/meetings`. Con `NULL` (default) todo sigue como
antes, con una sola franja. Cada franja genera su propia grilla de slots de
`slot_minutes` desde su hora de inicio; reservar un slot no corre a los
demás (con slots de 60, una reserva a las 10:00 deja libre la de 11:00).

```sql
alter table public.meeting_settings
  add column if not exists start_time2 time,
  add column if not exists end_time2 time;
```

Requiere **re-desplegar** las Edge Functions de la agenda (comparten el
motor de slots en `_shared/meetings.ts`):

```bash
npx supabase functions deploy meeting-availability
npx supabase functions deploy book-meeting
```

---

## 2026-07-18 — Google OAuth para el admin (`admin_allowed_emails` + triggers)

Segunda opción de acceso al panel: "Continuar con Google" en `/admin`, junto
al login con email/contraseña. Solo pueden entrar los emails cargados en la
allowlist `admin_allowed_emails`:

- **Gate (before insert):** si alguien intenta crear cuenta (Google o lo que
  sea) con un email que NO está en la lista, la base rechaza el alta. El
  login le muestra "Esa cuenta de Google no está autorizada para el panel."
- **Auto-promote (after insert):** si el email SÍ está en la lista, en su
  primer login se agrega solo a `admin_users` → `is_admin()` pasa y todas
  las policies existentes siguen funcionando sin cambios.
- Los usuarios que ya existían (ej. el owner con email/contraseña) no pasan
  por el gate: al entrar con Google con el mismo email, Supabase **linkea**
  la identidad a la cuenta existente (requiere email confirmado).

El front además chequea `is_admin()` en `ProtectedRoute`: una sesión sin
permisos ve un aviso "Cuenta sin acceso" en lugar de un panel roto. La
autorización real sigue viviendo en RLS.

```sql
-- 1) Allowlist de emails autorizados (en minúsculas).
--    Sin policies = solo se gestiona desde el SQL editor / service role.
create table if not exists public.admin_allowed_emails (
  email text primary key check (email = lower(email)),
  note text,
  created_at timestamptz not null default now()
);
alter table public.admin_allowed_emails enable row level security;

-- 2) Gate: bloquea el alta de usuarios cuyo email no esté autorizado.
create or replace function public.auth_user_gate()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email is null
     or not exists (
       select 1 from public.admin_allowed_emails where email = lower(new.email)
     ) then
    raise exception 'signup_not_allowed: %', new.email;
  end if;
  return new;
end $$;

drop trigger if exists auth_user_gate on auth.users;
create trigger auth_user_gate before insert on auth.users
  for each row execute function public.auth_user_gate();

-- 3) Auto-promote: el usuario autorizado entra a admin_users en su 1er login.
create or replace function public.auth_user_autopromote()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (
    select 1 from public.admin_allowed_emails where email = lower(new.email)
  ) then
    insert into public.admin_users (user_id) values (new.id)
    on conflict do nothing;
  end if;
  return new;
end $$;

drop trigger if exists auth_user_autopromote on auth.users;
create trigger auth_user_autopromote after insert on auth.users
  for each row execute function public.auth_user_autopromote();

-- 4) Cargar los emails autorizados (agregar los que hagan falta)
insert into public.admin_allowed_emails (email, note) values
  ('rodrigo.riboldi@gotechy.com', 'Owner')
on conflict do nothing;
```

Para **autorizar** a alguien más (antes de que intente entrar):

```sql
insert into public.admin_allowed_emails (email, note)
values ('persona@gotechy.com', 'Marketing') on conflict do nothing;
```

Para **revocar** el acceso:

```sql
delete from public.admin_users
  where user_id = (select id from auth.users where email = 'persona@gotechy.com');
delete from public.admin_allowed_emails where email = 'persona@gotechy.com';
-- Opcional: borrar el usuario desde Authentication → Users en el dashboard.
```

Configuración manual (una sola vez):

1. **Google Cloud Console** (https://console.cloud.google.com → APIs &
   Services → Credentials): crear **OAuth client ID** tipo *Web application*.
   - Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
     (el project-ref está en `supabase/.temp/project-ref` o en el dashboard).
   - En la pantalla de consentimiento (OAuth consent screen): si todos los
     admins van a ser cuentas `@gotechy.com` (Google Workspace), elegir User
     Type **Internal** — capa extra gratis: Google ni siquiera deja loguear a
     cuentas de fuera de la organización.
2. **Supabase Dashboard** → Authentication → Sign In / Providers → **Google**:
   habilitar y pegar Client ID + Client Secret.
3. **Authentication → URL Configuration**:
   - Site URL: `https://gotechy.com`
   - Redirect URLs: agregar `http://localhost:5173/**`, `https://gotechy.com/**`
     y **`https://administracion.gotechy.com/**`** (el panel vive en ese
     subdominio y el `redirectTo` del front usa el origin del host — sin esta
     entrada el login con Google desde el subdominio vuelve al Site URL).
4. **Authentication → Sign In / Providers → "Allow new users to sign up"**:
   dejarlo **habilitado** — el gate del punto 2 ya rechaza en la base a
   cualquier email fuera de la allowlist, y con signups deshabilitados los
   emails autorizados nuevos no podrían crear su cuenta al entrar con Google.

Notas:
- ⚠️ El gate aplica a TODA alta de usuario, incluso "Add user" desde el
  dashboard: primero agregar el email a `admin_allowed_emails`, después crear.
- No requiere cambios en `vercel.json` (la CSP no bloquea redirects de página
  completa) ni en las Edge Functions.
- El botón vive en `src/components/admin/LoginForm.tsx`; el flujo OAuth vuelve
  a `/admin` y el login redirige solo al dashboard si la sesión quedó creada.
