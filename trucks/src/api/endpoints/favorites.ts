/**
 * Favorites API endpoint module.
 * RESTful interface for user favorites operations.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { FavoriteRecord } from '@/types/vehicles';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('FavoritesAPI');

/** GET /favorites — List the current user's favorites */
export async function getFavorites(userId: string): Promise<ApiResponse<FavoriteRecord[]>> {
    const client = getApiClient();
    logger.info('Fetching favorites', { userId });

    return client.query<FavoriteRecord[]>('getFavorites', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('favorites')
            .select('id, vehicle_id')
            .eq('user_id', userId);

        return { data: data as FavoriteRecord[] | null, error };
    });
}

/** POST /favorites — Add a vehicle to favorites */
export async function addFavorite(
    userId: string,
    vehicleId: string
): Promise<ApiResponse<FavoriteRecord>> {
    const client = getApiClient();
    logger.info('Adding favorite', { userId, vehicleId });

    return client.query<FavoriteRecord>('addFavorite', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('favorites')
            .insert({ user_id: userId, vehicle_id: vehicleId })
            .select('id, vehicle_id')
            .single();

        // Ignore unique constraint violation (duplicate favorite)
        if (error && error.code === '23505') {
            logger.debug('Favorite already exists, ignoring', { userId, vehicleId });
            return { data: { id: '', vehicle_id: vehicleId } as FavoriteRecord, error: null };
        }

        return { data: data as FavoriteRecord | null, error };
    });
}

/** DELETE /favorites/:vehicleId — Remove a vehicle from favorites */
export async function removeFavorite(
    userId: string,
    vehicleId: string
): Promise<ApiResponse<null>> {
    const client = getApiClient();
    logger.info('Removing favorite', { userId, vehicleId });

    return client.query<null>('removeFavorite', async () => {
        const supabase = client.getSupabaseClient();
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('vehicle_id', vehicleId);

        return { data: null, error };
    });
}
