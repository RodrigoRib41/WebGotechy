# Setup del chatbot IA "Techy" (Google Gemini — gratis)

El bot responde a los visitantes usando la **base de conocimientos** que se
carga en `/admin/chatbot`, a través de la Edge Function `chat-assistant` y la
API de Google Gemini (tier gratuito, sin tarjeta de crédito).

## 1. Crear la API key de Gemini (2 minutos, gratis)

1. Entrá a **https://aistudio.google.com** con la cuenta de Google de GoTechy.
2. Menú **Get API key** (o "Obtener clave de API") → **Create API key**.
3. Copiá la key (empieza con `AIzaSy...`). No hace falta tarjeta ni proyecto
   de Google Cloud pago: el tier gratuito alcanza de sobra para el sitio.

> ⚠️ En el tier gratuito, Google puede usar las conversaciones para mejorar
> sus modelos. El bot solo maneja información pública del sitio, así que no
> es un problema — pero si algún día se pasa a un plan pago, esa cláusula
> desaparece.

## 2. Correr la migración SQL

En el **SQL Editor** de Supabase, ejecutar la sección
**"Chatbot IA Techy"** de `supabase/MIGRATIONS.md`
(crea `chatbot_settings`, `chatbot_articles` y `chatbot_messages` con RLS).

## 3. Configurar secrets + desplegar la función

```bash
npx supabase secrets set GEMINI_API_KEY=AIzaSy...

# Opcional — cambiar el modelo (default: gemini-flash-lite-latest, alias que
# siempre apunta al flash-lite vigente y no se retira). Otro ejemplo:
# gemini-flash-latest (más capaz, menos cuota gratis).
# ⚠️ Evitá nombres con versión fija (gemini-2.5-flash-lite, etc.): Google los
# retira para API keys nuevas y el bot deja de responder (error 404).
npx supabase secrets set GEMINI_MODEL=gemini-flash-lite-latest

npx supabase functions deploy chat-assistant
```

(Si el proyecto no está linkeado todavía: `npx supabase login` y luego
`npx supabase link --project-ref <ref-del-proyecto>`.)

## 4. Cargar la base de conocimientos

> ✅ Ya hay un seed inicial aplicado con el contenido del sitio (6 artículos:
> quiénes somos, servicios, SAP, oficinas, contacto y cómo trabajamos) —
> ver `supabase/seed-chatbot-kb.sql`. Se edita/amplía desde `/admin/chatbot`.

En `/admin/chatbot` → **Base de conocimientos** → "Nuevo artículo".
Sugerencia de artículos iniciales (texto plano, un tema por artículo):

- **Servicios**: qué ofrece GoTechy (SAP S/4HANA, AMS, migraciones, etc.).
- **Oficinas y contacto**: direcciones, países, email, teléfono/WhatsApp.
- **Cómo trabajamos**: metodología, equipo, partner SAP, años de experiencia.
- **FAQ**: las preguntas que más llegan por el formulario.

El bot **solo** responde con lo que esté acá (+ derivar a `/contacto`). Todo
lo que no esté cargado, lo va a reconocer como desconocido y va a sugerir
contactar al equipo.

## 5. Activarlo

En `/admin/chatbot`, prender el switch **"Chatbot Techy en el sitio público"**.
El muñequito aparece arriba del botón de WhatsApp en todas las páginas.
Se puede apagar en cualquier momento desde el mismo lugar (efecto inmediato,
los visitantes con la página abierta dejan de poder consultar).

## Cómo funciona por dentro

- El widget lee el flag `chatbot_settings.enabled` (público, solo lectura)
  para decidir si mostrarse.
- Cada mensaje va a la Edge Function `chat-assistant`, que:
  - valida y recorta el historial (máx. 12 mensajes, 1.500 caracteres),
  - aplica rate-limit por IP (6/min, 60/h) para cuidar la cuota gratuita,
  - arma el prompt con los artículos **activos** y llama a Gemini,
  - loguea la conversación en `chatbot_messages` (visible en el admin).
- La API key vive como secret en Supabase: nunca toca el navegador.
- Las conversaciones registradas se ven en `/admin/chatbot` → sirven para
  detectar preguntas sin respuesta y mejorar la base.
- **Retención: 14 días.** Un job diario en la base (pg_cron,
  `chatbot-messages-retention`, 03:00 UTC) borra los mensajes más viejos.

## Medidor de consumo de Gemini

En `/admin/chatbot/consumo` (menú **Asistente IA → Consumo Gemini**) se ve
cuánto se usó del tier gratuito: consultas del día contra el límite diario,
tokens, rechazos por cuota (429) y el historial de 14 días.

- Requiere la migración **"Medidor de consumo de Gemini"** de
  `supabase/MIGRATIONS.md` (tabla `chatbot_usage` + RPC `chatbot_usage_daily`)
  y re-desplegar la función: `npx supabase functions deploy chat-assistant`.
- Google **no** expone la cuota restante por API: el medidor se alimenta del
  registro propio que hace la función en cada llamada (retención: 90 días).
- El "día de cuota" de Google se reinicia a medianoche hora del Pacífico
  (~4-5 h en Argentina); el panel agrupa con ese huso.
- Los límites del tier gratuito viven como constantes en
  `src/pages/admin/AdminGeminiUsage.tsx` — si Google los cambia
  (https://ai.google.dev/gemini-api/docs/rate-limits), actualizarlas ahí.

## Cambiar de proveedor más adelante

El diseño es agnóstico: para pasar a otro modelo de Gemini alcanza con el
secret `GEMINI_MODEL`. Para pasar a otro proveedor (p. ej. Claude), solo se
reescribe la llamada HTTP dentro de `supabase/functions/chat-assistant/index.ts`
— el widget, el admin y las tablas no cambian.
