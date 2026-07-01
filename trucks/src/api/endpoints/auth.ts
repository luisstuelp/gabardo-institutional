/**
 * Auth API endpoint module.
 * RESTful interface for all authentication operations.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { AuthResult } from '@/types/auth';
import type { ApiResponse } from '@/types/api';
import type { User, Session } from '@supabase/supabase-js';

const logger = createLogger('AuthAPI');

/** Session data returned from auth operations */
export interface SessionData {
    user: User | null;
    session: Session | null;
}

/** POST /auth/signin — Sign in with email and password */
export async function signIn(
    email: string,
    password: string
): Promise<ApiResponse<SessionData>> {
    const client = getApiClient();
    logger.info('Signing in user', { email });

    return client.query<SessionData>('signIn', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        return {
            data: data ? { user: data.user, session: data.session } : null,
            error: error ? { message: error.message, code: error.status?.toString() ?? 'AUTH_ERROR' } : null,
        };
    });
}

/** POST /auth/signup — Sign up with email, password, and full name */
export async function signUp(
    email: string,
    password: string,
    fullName: string
): Promise<ApiResponse<SessionData>> {
    const client = getApiClient();
    logger.info('Signing up user', { email, fullName });

    const redirectUrl = `${window.location.origin}/`;

    return client.query<SessionData>('signUp', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectUrl,
                data: { full_name: fullName },
            },
        });

        return {
            data: data ? { user: data.user, session: data.session } : null,
            error: error ? { message: error.message, code: error.status?.toString() ?? 'AUTH_ERROR' } : null,
        };
    });
}

/** POST /auth/signout — Sign out the current user */
export async function signOut(): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Signing out user');

    return client.query<null>('signOut', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase.auth.signOut();
        return {
            data: null,
            error: error ? { message: error.message, code: 'SIGN_OUT_ERROR' } : null,
        };
    });
}

/** POST /auth/change-password — Change the current user's password */
export async function changePassword(newPassword: string): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Changing password');

    return client.query<null>('changePassword', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        return {
            data: null,
            error: error ? { message: error.message, code: 'PASSWORD_CHANGE_ERROR' } : null,
        };
    });
}

/** POST /auth/reset-password — Send a password reset email */
export async function resetPasswordForEmail(email: string): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Requesting password reset', { email });

    const redirectUrl = `${window.location.origin}/auth?mode=reset`;

    return client.query<null>('resetPasswordForEmail', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectUrl,
        });
        return {
            data: null,
            error: error ? { message: error.message, code: 'RESET_PASSWORD_ERROR' } : null,
        };
    });
}

/** GET /auth/session — Get the current session */
export async function getSession(): Promise<ApiResponse<SessionData>> {
    const client = getApiClient();
    logger.debug('Getting current session');

    return client.query<SessionData>('getSession', async () => {
        const supabase = client.getSupabaseClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        return {
            data: { user: session?.user ?? null, session },
            error: error ? { message: error.message, code: 'SESSION_ERROR' } : null,
        };
    });
}
