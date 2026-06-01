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
