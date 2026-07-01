/**
 * Profiles API endpoint module.
 * RESTful interface for user profile operations.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { UserProfile } from '@/types/database';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('ProfilesAPI');

/** GET /profiles/:userId — Get a user's profile */
export async function getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    const client = getApiClient();
    logger.info('Fetching user profile', { userId });

    return client.query<UserProfile>('getProfile', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        return { data: data as UserProfile | null, error };
    });
}

/** PATCH /profiles/:userId — Update a user's profile (partial update) */
export async function updateProfile(
    userId: string,
    updates: Partial<Pick<UserProfile, 'full_name' | 'phone' | 'email' | 'avatar_url'>>
): Promise<ApiResponse<UserProfile>> {
    const client = getApiClient();
    logger.info('Updating user profile', { userId, fields: Object.keys(updates) });

    return client.query<UserProfile>('updateProfile', async () => {
        const supabase = client.getSupabaseClient();
        const { data, error } = await supabase
            .from('user_profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();

        return { data: data as UserProfile | null, error };
    });
}
