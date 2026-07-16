# Setup — Agenda de reuniones con Google Meet

Guía para conectar el agendador de `/contacto` con Google Calendar, de modo
que cada reserva cree automáticamente el evento con su **link de Google Meet**
e invite al cliente por email.

> **Sin este setup el sistema igual funciona**: la reserva se guarda, el
> horario se bloquea y salen los emails de confirmación vía Resend — solo
> falta el link de Meet automático (el aviso interno te lo recuerda).

## Requisitos

- Una cuenta de Google cuya agenda va a recibir las reuniones
  (recomendado: `contacto@gotechy.com` o la casilla del equipo comercial).
- Acceso al proyecto de Supabase (CLI logueada) para setear secrets.

## Paso 1 — Proyecto en Google Cloud (5 min)

1. Entrá a https://console.cloud.google.com con la cuenta elegida.
2. Creá un proyecto (ej: `gotechy-web`).
3. **APIs y servicios → Biblioteca** → buscá **Google Calendar API** → *Habilitar*.

## Paso 2 — Pantalla de consentimiento OAuth (3 min)

1. **APIs y servicios → Pantalla de consentimiento de OAuth**.
2. Tipo de usuario: **Interno** si usan Google Workspace (gotechy.com).
   Si es una cuenta @gmail.com: **Externo** y agregá esa misma cuenta como
   *test user* (no hace falta publicar la app).
3. Nombre de la app: `GoTechy Web`. Completá los emails requeridos. Guardar.

## Paso 3 — Credenciales OAuth (2 min)

1. **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth**.
2. Tipo: **Aplicación web**.
3. En *URIs de redireccionamiento autorizados* agregá exactamente:
   `https://developers.google.com/oauthplayground`
4. Guardá el **Client ID** y el **Client Secret**.

## Paso 4 — Refresh token (5 min, una sola vez)

1. Entrá a https://developers.google.com/oauthplayground
2. Engranaje (arriba a la derecha) → tildá **Use your own OAuth credentials**
   → pegá tu Client ID y Client Secret.
3. En el panel izquierdo (Step 1), pegá este scope y dale **Authorize APIs**:
   ```
   https://www.googleapis.com/auth/calendar
   ```
4. Logueate con la cuenta del calendario y aceptá los permisos.
5. En Step 2, botón **Exchange authorization code for tokens**.
6. Copiá el **Refresh token** (empieza con `1//`).

## Paso 5 — Secrets en Supabase (1 min)

```bash
supabase secrets set GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
supabase secrets set GOOGLE_CLIENT_SECRET=GOCSPX-xxxx
supabase secrets set GOOGLE_REFRESH_TOKEN=1//xxxx
# Opcional: calendario específico (default: el principal de la cuenta)
supabase secrets set GOOGLE_CALENDAR_ID=primary
```

## Paso 6 — Deploy de las funciones

```bash
supabase functions deploy meeting-availability
supabase functions deploy book-meeting
```

## Verificación

1. Corré la migración SQL de `MIGRATIONS.md` (sección "Agenda de reuniones")
   en el SQL Editor de Supabase, si aún no lo hiciste.
2. Entrá a `/admin/meetings` → revisá la franja horaria y guardá.
3. Abrí `/contacto` → debería aparecer la sección "Reservá una reunión".
4. Agendá una prueba con tu email personal: te tiene que llegar la invitación
   de Google Calendar con el link de Meet + el email de confirmación.
5. El evento aparece en el calendario de la cuenta configurada, y ese horario
   deja de ofrecerse en la web.

## Cosas que conviene saber

- **Reuniones manuales**: si el equipo agenda algo directamente en ese Google
  Calendar, esos horarios también se bloquean en la web (freeBusy).
- **Cancelaciones**: desde `/admin/meetings` se cancela la reserva (libera el
  slot en la web). El evento de Google Calendar se borra a mano — al cancelar,
  el panel te lo recuerda.
- **El refresh token no expira** mientras la app esté en uso. Si Google lo
  revoca (cambio de contraseña, 6 meses sin uso en apps "Externas" de prueba),
  repetí el Paso 4 y actualizá el secret.
- **Margen de 24 h**: es el campo "Antelación mínima" en `/admin/meetings`.
