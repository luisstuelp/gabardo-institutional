import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { isIP } from 'net';
import { promisify } from 'util';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase_trucks/types';

const scrypt = promisify(scryptCallback);

export const TRUCKS_USER_COOKIE_NAME = 'gabardo_trucks_user_session';
export const TRUCKS_USER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const SCRYPT_COST = 16_384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const SCRYPT_KEY_LENGTH = 64;

export type TrucksUser = {
  id: string;
  email: string;
  full_name: string | null;
  user_metadata: { full_name: string | null };
};

export function createServerTrucksSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serverKey) {
    throw new Error('Missing Supabase server environment variables for trucks authentication.');
  }

  return createClient<Database>(supabaseUrl, serverKey, {
    db: { schema: 'trucks' },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function markTrucksAccountAsAdmin(userId: string, email: string): Promise<string | null> {
  const supabase = createServerTrucksSupabaseClient();
  const { data: account, error: readError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  if (readError) return readError.message;

  if (account) {
    const { error } = await supabase.from('users').update({ is_admin: true }).eq('id', userId);
    return error?.message ?? null;
  }

  const { error } = await supabase.from('users').insert({
    id: userId,
    email: email.toLowerCase(),
    password_hash: 'disabled$admin-auth-only',
    is_admin: true,
  });
  return error?.message ?? null;
}

export async function hashTrucksPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELIZATION,
  }) as Buffer;

  return [
    'scrypt',
    SCRYPT_COST,
    SCRYPT_BLOCK_SIZE,
    SCRYPT_PARALLELIZATION,
    salt.toString('hex'),
    derivedKey.toString('hex'),
  ].join('$');
}

export async function verifyTrucksPassword(
  email: string,
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const parts = passwordHash.split('$');

  if (parts[0] === 'scrypt' && parts.length === 6) {
    const [, cost, blockSize, parallelization, saltHex, expectedHex] = parts;
    if (
      Number(cost) !== SCRYPT_COST ||
      Number(blockSize) !== SCRYPT_BLOCK_SIZE ||
      Number(parallelization) !== SCRYPT_PARALLELIZATION ||
      !/^[a-f0-9]{32}$/i.test(saltHex) ||
      !/^[a-f0-9]{128}$/i.test(expectedHex)
    ) {
      return false;
    }

    const actual = await scrypt(password, Buffer.from(saltHex, 'hex'), SCRYPT_KEY_LENGTH, {
      N: SCRYPT_COST,
      r: SCRYPT_BLOCK_SIZE,
      p: SCRYPT_PARALLELIZATION,
    }) as Buffer;
    const expected = Buffer.from(expectedHex, 'hex');
    return timingSafeEqual(actual, expected);
  }

  // Existing Supabase accounts are migrated with their bcrypt hash copied into
  // trucks.users. Verification still reads only that table, through this RPC.
  if (/^\$2[aby]\$/.test(passwordHash)) {
    const supabase = createServerTrucksSupabaseClient();
    const { data, error } = await supabase.rpc('verify_local_user_bcrypt', {
      p_email: email,
      p_password: password,
    });
    return !error && data === true;
  }

  return false;
}

export function hashTrucksSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createTrucksSession(userId: string, request: Request): Promise<string> {
  const token = randomBytes(32).toString('base64url');
  const supabase = createServerTrucksSupabaseClient();
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const rawIpAddress = forwardedFor || request.headers.get('x-real-ip') || null;
  const ipAddress = rawIpAddress && isIP(rawIpAddress) ? rawIpAddress : null;
  const userAgent = request.headers.get('user-agent');

  const { error } = await supabase.from('user_sessions').insert({
    user_id: userId,
    token_hash: hashTrucksSessionToken(token),
    expires_at: new Date(Date.now() + TRUCKS_USER_SESSION_MAX_AGE_SECONDS * 1000).toISOString(),
    ip_address: ipAddress,
    user_agent: userAgent,
  });

  if (error) throw new Error(error.message);
  return token;
}

export async function readTrucksUserFromCookies(): Promise<TrucksUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TRUCKS_USER_COOKIE_NAME)?.value;
  if (!token) return null;

  const supabase = createServerTrucksSupabaseClient();
  const { data: session, error: sessionError } = await supabase
    .from('user_sessions')
    .select('user_id')
    .eq('token_hash', hashTrucksSessionToken(token))
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();

  if (sessionError || !session) return null;

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, email, full_name, is_active, is_admin')
    .eq('id', session.user_id)
    .maybeSingle();

  if (userError || !user || !user.is_active) return null;

  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    user_metadata: { full_name: user.full_name },
  };
}
