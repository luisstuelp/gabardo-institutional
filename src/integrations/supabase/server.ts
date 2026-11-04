import { createClient } from '@supabase/supabase-js';
import type { Database } from './type';

function getJwtProjectReference(key: string): string | null {
  const payload = key.split('.')[1];
  if (!payload) return null;

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { ref?: unknown };
    return typeof claims.ref === 'string' ? claims.ref : null;
  } catch {
    return null;
  }
}

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serverKey) {
    throw new Error(
      'Missing Supabase server environment variables. Define NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.'
    );
  }

  const urlProjectReference = new URL(supabaseUrl).hostname.split('.')[0];
  const keyProjectReference = getJwtProjectReference(serverKey);
  if (keyProjectReference && keyProjectReference !== urlProjectReference) {
    throw new Error(
      'The Supabase server key belongs to a different project. Set SUPABASE_SECRET_KEY for the project in NEXT_PUBLIC_SUPABASE_URL.'
    );
  }

  return createClient<Database>(supabaseUrl, serverKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
