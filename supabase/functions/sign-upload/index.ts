// ============================================================
//  Edge Function: sign-upload
//  Firma uploads de Cloudinary SOLO para administradores logueados.
//
//  Flujo:
//   1. El cliente (admin panel) invoca esta función con su JWT de Supabase.
//   2. Validamos el token y que el usuario esté en `public.admin_users`.
//   3. Firmamos `timestamp` + `upload_preset` con el CLOUDINARY_API_SECRET
//      (que vive solo acá, jamás en el bundle del front).
//   4. Devolvemos la firma; el cliente sube directo a Cloudinary con ella.
//
//  Secrets requeridos (supabase secrets set ...):
//   - CLOUDINARY_CLOUD_NAME
//   - CLOUDINARY_API_KEY
//   - CLOUDINARY_API_SECRET
//   - CLOUDINARY_UPLOAD_PRESET   (opcional, default 'gotechy-blog')
//  (SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY los
//   inyecta la plataforma automáticamente.)
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No autorizado.' }, 401);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // 1. Validar el token y obtener el usuario real.
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: 'Sesión inválida.' }, 401);

    // 2. Verificar que el usuario es administrador (allowlist server-side).
    const adminClient = createClient(supabaseUrl, serviceKey);
    const { data: adminRow } = await adminClient
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();
    if (!adminRow) return json({ error: 'No tenés permisos de administrador.' }, 403);

    // 3. Firmar los params para Cloudinary (algoritmo por defecto: SHA-1).
    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME');
    const apiKey = Deno.env.get('CLOUDINARY_API_KEY');
    const apiSecret = Deno.env.get('CLOUDINARY_API_SECRET');
    const uploadPreset = Deno.env.get('CLOUDINARY_UPLOAD_PRESET') ?? 'gotechy-blog';
    if (!cloudName || !apiKey || !apiSecret) {
      return json({ error: 'Cloudinary no está configurado en el servidor.' }, 500);
    }

    const timestamp = Math.floor(Date.now() / 1000);
    // Solo se firman los params que el cliente envía, en orden alfabético.
    const toSign = `timestamp=${timestamp}&upload_preset=${uploadPreset}`;
    const signature = await sha1Hex(toSign + apiSecret);

    return json({ signature, timestamp, apiKey, cloudName, uploadPreset });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Error interno.' }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sha1Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
