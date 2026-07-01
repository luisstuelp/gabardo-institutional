/**
 * Shared Supabase client factory for Edge Functions.
 * Uses dependency injection — the client is created from environment variables,
 * but the caller can override the URL/key for testing.
 *
 * Deno runtime: uses esm.sh imports.
 */
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

/** Configuration for creating a Supabase client */
export interface SupabaseConfig {
    url?: string;
    serviceRoleKey?: string;
    anonKey?: string;
}

/**
 * Create a Supabase admin client (service role — bypasses RLS).
 * Used for server-side operations in edge functions.
 *
 * @param config - Optional overrides for URL and keys (dependency injection for tests)
 */
export function createSupabaseAdmin(config?: SupabaseConfig): SupabaseClient {
    const url = config?.url ?? Deno.env.get('SUPABASE_URL');
    const key = config?.serviceRoleKey ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
        throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

/**
 * Create a Supabase client using the user's JWT (respects RLS).
 * Used when edge functions should operate with the calling user's permissions.
 *
 * @param authHeader - The Authorization header from the incoming request
 * @param config - Optional overrides for URL and keys
 */
export function createSupabaseUser(
    authHeader: string,
    config?: SupabaseConfig
): SupabaseClient {
    const url = config?.url ?? Deno.env.get('SUPABASE_URL');
    const key = config?.anonKey ?? Deno.env.get('SUPABASE_ANON_KEY');

    if (!url || !key) {
        throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
    }

    return createClient(url, key, {
        global: {
            headers: { Authorization: authHeader },
        },
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
