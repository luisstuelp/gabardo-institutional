import type { TrucksUser } from '@/lib/trucksUserAuth';
import type { ApiResponse } from '@/types/api';

export interface SessionData {
    user: TrucksUser | null;
    session: { user: TrucksUser } | null;
}

async function request<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            ...init,
            headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
            cache: 'no-store',
        });
        const result = (await response.json().catch(() => ({}))) as { user?: TrucksUser | null; error?: string };
        if (!response.ok) {
            return { data: null, error: { message: result.error ?? 'Falha na autenticação.', code: String(response.status) }, status: response.status };
        }
        return { data: { user: result.user ?? null, session: result.user ? { user: result.user } : null } as T, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function signIn(email: string, password: string): Promise<ApiResponse<SessionData>> {
    return request<SessionData>('/api/trucks/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function signOut(): Promise<ApiResponse<null>> {
    try {
        const response = await fetch('/api/trucks/auth/logout', { method: 'POST', cache: 'no-store' });
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        return response.ok
            ? { data: null, error: null, status: response.status }
            : { data: null, error: { message: result.error ?? 'Falha ao encerrar sessão.', code: String(response.status) }, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function changePassword(newPassword: string): Promise<ApiResponse<null>> {
    try {
        const response = await fetch('/api/trucks/auth/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        return response.ok
            ? { data: null, error: null, status: response.status }
            : { data: null, error: { message: result.error ?? 'Falha ao alterar senha.', code: String(response.status) }, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function resetPasswordForEmail(email: string): Promise<ApiResponse<null>> {
    try {
        const response = await fetch('/api/trucks/auth/reset-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        return response.ok
            ? { data: null, error: null, status: response.status }
            : { data: null, error: { message: result.error ?? 'Falha ao solicitar redefinição.', code: String(response.status) }, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ApiResponse<null>> {
    try {
        const response = await fetch('/api/trucks/auth/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword }),
        });
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        return response.ok
            ? { data: null, error: null, status: response.status }
            : { data: null, error: { message: result.error ?? 'Falha ao alterar senha.', code: String(response.status) }, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function getSession(): Promise<ApiResponse<SessionData>> {
    return request<SessionData>('/api/trucks/auth/session');
}

