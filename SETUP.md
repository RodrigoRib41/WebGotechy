# SETUP — Panel de administración del blog GoTechy

Esta guía cubre todo lo necesario para que el panel `/admin` funcione end-to-end con Supabase + Cloudinary.

---

## 1. Variables de entorno

Copiá `.env.example` a `.env` en la raíz del proyecto y completá los valores.

```bash
cp .env.example .env
```

| Variable | Dónde obtenerla |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → Project API keys → `anon` `public` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary console → esquina superior derecha |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary → Settings → Upload → Upload presets |

> **Nota de seguridad:** la `anon key` de Supabase es pública y segura para el cliente — la base se protege con Row Level Security (RLS), configurada abajo. **Nunca subas tu `service_role` key.**

---

## 2. Supabase — crear proyecto y schema

### 2.1 Crear el proyecto

1. Andá a https://supabase.com y creá una cuenta.
2. **New project** → elegí nombre, región (Sao Paulo para mejor latencia desde AR) y password de DB.
3. Esperá ~2 minutos a que termine de aprovisionar.

### 2.2 Ejecutar el SQL inicial

Abrí **SQL Editor** y pegá esto en una nueva query. Hacé clic en **Run**.

```sql
-- 1) Tabla principal
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT NOT NULL,
  author_email TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 2) Índices
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- 3) Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- 4) Función para incrementar vistas atómicamente
CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5) Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer posts publicados
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Usuarios autenticados pueden leer TODO (incluidos borradores propios)
CREATE POLICY "Authenticated can read all"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Solo usuarios autenticados pueden insertar / actualizar / eliminar
CREATE POLICY "Authenticated can insert"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- 6) Permitir que el rol anon ejecute increment_views para contar vistas públicas
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO anon, authenticated;

-- ============================================================
-- 7) Tabla logos (clientes + partners en una sola tabla)
-- ============================================================
CREATE TABLE logos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('client', 'partner')),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_logos_kind_sort ON logos(kind, sort_order);

CREATE TRIGGER update_logos_updated_at
  BEFORE UPDATE ON logos
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read logos"
  ON logos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can manage logos"
  ON logos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 8) Tabla projects (casos de éxito)
-- ============================================================
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  title TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  image_alt TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_sort ON projects(sort_order);

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

> Si ya corriste el SQL anterior (solo blog_posts), podés ejecutar **solo los bloques 7) y 8)** — son independientes.

### 2.3 Crear el usuario admin

1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Email + Password.
3. ✅ **Auto Confirm User** (importante: sin esto el login no funciona porque pide verificar email).

Listo: ese usuario puede entrar a `/admin`.

> **Tip:** podés crear más usuarios para tu equipo desde acá. Todos tendrán permisos completos sobre el blog (en MVP no hay roles).

### 2.4 Configurar Auth

**Authentication → Providers → Email**: dejá habilitado **Email + Password**. Podés desactivar "Confirm email" si querés saltearte el flujo de verificación (solo recomendado en dev).

---

## 3. Cloudinary — setup de uploads

### 3.1 Crear cuenta

1. https://cloudinary.com/users/register/free.
2. Después del signup, anotá tu **Cloud Name** (lo ves en https://console.cloudinary.com/console arriba a la derecha).

### 3.2 Crear el Upload Preset

Esto permite subir imágenes **desde el navegador** sin exponer tu API secret.

1. **Settings (⚙) → Upload → Upload presets → Add upload preset**.
2. Configurá:
   - **Preset name:** `gotechy-blog` (o el que prefieras, debe coincidir con `VITE_CLOUDINARY_UPLOAD_PRESET`)
   - **Signing Mode:** **Unsigned** ← crítico
   - **Folder:** `blog-posts`
   - **Allowed formats:** `jpg, png, webp, gif`
   - **Max file size:** `5000000` (5MB)
3. (Recomendado) En **Upload Manipulations** habilitá:
   - **Quality analysis** → On
   - **Format:** `Auto`
   - **Quality:** `Auto`
4. **Save**.

---

## 4. Correr el proyecto

```bash
npm install         # ya hecho si seguiste FASE 1
npm run dev         # http://localhost:5173
```

Andá a http://localhost:5173/admin, ingresá con el usuario creado en 2.3 y deberías ver el dashboard.

---

## 5. Deploy en Vercel

En **Project Settings → Environment Variables**, agregá las variables `VITE_*`
del `.env` (son las únicas que llegan al cliente):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CONTACT_PHONE`, `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_EMAIL`, `VITE_SITE_URL` (opcionales)

Vercel detecta Vite y usa `npm run build` → `dist`. El `vercel.json` ya define el
rewrite SPA y las cabeceras de seguridad. Cualquier push a `main` dispara un build.

> **Subidas y contacto (server-side):** los secrets de las Edge Functions
> (`CLOUDINARY_*`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)
> **NO** son variables de Vercel: viven en Supabase (`supabase secrets set ...`).
> Ver `supabase/MIGRATIONS.md` para desplegar `sign-upload` y `submit-contact`.

> **CORS:** Supabase permite tu dominio por defecto. Si lo bloquea, andá a
> **Project Settings → API → CORS** y agregá la URL de producción de Vercel.

---

## 6. Troubleshooting

| Síntoma | Causa probable / Solución |
|---|---|
| `Supabase no está configurado` en login | Faltan `VITE_SUPABASE_*` en `.env`. Reiniciá el dev server después de tocarlo. |
| "Invalid login credentials" | El usuario no existe, o no marcaste **Auto Confirm User** al crearlo. |
| Imágenes no suben | La Edge Function `sign-upload` no está desplegada o le faltan secrets. El preset debe estar en **Signed** en Cloudinary. Ver `supabase/MIGRATIONS.md`. |
| El formulario de contacto da error al enviar | Falta desplegar la Edge Function `submit-contact` o cargar `RESEND_API_KEY`/`CONTACT_TO_EMAIL`. Ver `supabase/MIGRATIONS.md`. |
| `permission denied for table blog_posts` | Las policies de RLS no se aplicaron. Re-ejecutá el bloque SQL completo. |
| Vistas no incrementan | La función `increment_views` no existe — el fallback en `supabase.ts` igual hace el update. |
| Blog público vacío después de publicar | Verificá que el post tenga `status = 'published'` Y `published_at` no nulo. |

---

## 7. Estructura de archivos relevante

```
src/
├── lib/
│   ├── supabase.ts          # Cliente + CRUD
│   └── cloudinary.ts        # Upload helper
├── hooks/
│   ├── useAuth.ts           # Sesión Supabase
│   └── usePosts.ts          # Hooks para posts
├── types/
│   └── blog.ts              # Tipos
├── utils/
│   ├── slugify.ts
│   └── validation.ts
├── components/admin/
│   ├── ProtectedRoute.tsx   # Guard de rutas
│   ├── AdminLayout.tsx      # Shell con sidebar
│   ├── LoginForm.tsx
│   ├── TipTapEditor.tsx     # Editor WYSIWYG + toolbar
│   ├── CloudinaryUpload.tsx # Upload de imagen destacada
│   ├── TagInput.tsx
│   └── DeleteConfirmation.tsx
└── pages/admin/
    ├── AdminLogin.tsx
    ├── AdminDashboard.tsx
    └── AdminEditor.tsx      # Maneja "new" y "edit"
```

Ver [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) para el flujo de uso.
