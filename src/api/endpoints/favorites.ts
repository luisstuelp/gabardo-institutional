/** Favorites use the HTTP-only local trucks-user session, never Supabase Auth. */
import type { FavoriteRecord } from '@/types/vehicles';
import type { ApiResponse } from '@/types/api';

async function request<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            ...init,
            headers: { ...(init?.body ? { 'Content-Type': 'application/json' } : {}), ...init?.headers },
            cache: 'no-store',
        });
        const result = (await response.json().catch(() => ({}))) as { error?: string; favorite?: T; favorites?: T };
        if (!response.ok) {
            return { data: null, error: { message: result.error ?? 'Falha ao atualizar favoritos.', code: String(response.status) }, status: response.status };
        }
        return { data: (result.favorite ?? result.favorites ?? null) as T | null, error: null, status: response.status };
    } catch (error) {
        return { data: null, error: { message: error instanceof Error ? error.message : 'Falha ao conectar.', code: 'FETCH_ERROR' }, status: 0 };
    }
}

export async function getFavorites(_userId: string): Promise<ApiResponse<FavoriteRecord[]>> {
    return request<FavoriteRecord[]>('/api/trucks/favorites');
}

export async function addFavorite(_userId: string, vehicleId: string): Promise<ApiResponse<FavoriteRecord>> {
    return request<FavoriteRecord>('/api/trucks/favorites', {
        method: 'POST',
        body: JSON.stringify({ vehicleId }),
    });
}

export async function removeFavorite(_userId: string, vehicleId: string): Promise<ApiResponse<null>> {
    return request<null>(`/api/trucks/favorites?vehicleId=${encodeURIComponent(vehicleId)}`, { method: 'DELETE' });
}
