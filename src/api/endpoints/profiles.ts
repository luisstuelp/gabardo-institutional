/** Profile operations are scoped to the HTTP-only local trucks-user session. */
import type { UserProfile } from '@/types/database';
import type { ApiResponse } from '@/types/api';

async function request<T>(init?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch('/api/trucks/profile', {
            ...init,
            headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
            cache: 'no-store',
        });
        const result = (await response.json().catch(() => ({}))) as { profile?: T; error?: string };
        if (!response.ok) {
            return { data: null, error: { message: result.error ?? 'Falha ao atualizar perfil.', code: String(response.status) }, status: response.status };
        }
        return { data: result.profile ?? null, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function getProfile(_userId: string): Promise<ApiResponse<UserProfile>> {
    return request<UserProfile>();
}

export async function updateProfile(
    _userId: string,
    updates: Partial<Pick<UserProfile, 'full_name' | 'phone' | 'email' | 'avatar_url'>>,
): Promise<ApiResponse<UserProfile>> {
    return request<UserProfile>({ method: 'PATCH', body: JSON.stringify(updates) });
}
