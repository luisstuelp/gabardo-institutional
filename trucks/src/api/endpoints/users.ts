/**
 * Users API endpoint module.
 * Manage user profiles and roles.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { UserProfile, UserRole, AppRole } from '@/types/database';
import type { ApiResponse } from '@/types/api';

const logger = createLogger('UsersAPI');

export interface AdminUser extends UserProfile {
    role: AppRole;
}

/** GET /users — Get all users with their roles */
export async function getUsers(): Promise<ApiResponse<AdminUser[]>> {
    const client = getApiClient();
    logger.info('Fetching users');

    return client.query<AdminUser[]>('getUsers', async () => {
        const supabase = client.getSupabaseClient();

        // Fetch profiles and roles
        // We assume 1:1 or 1:Many interaction. For simplicity, we take the first role or default to 'user'.
        const { data, error } = await supabase
            .from('user_profiles')
            .select(`
                *,
                user_roles (
                    role
                )
            `)
            .order('created_at', { ascending: false });

        if (error) return { data: null, error };

        // Flatten data
        const adminUsers: AdminUser[] = data.map((profile: any) => ({
            ...profile,
            role: profile.user_roles?.[0]?.role || 'user', // Default to 'user' if no role found
        }));

        return { data: adminUsers, error: null };
    });
}

/** PATCH /users/:id/role — Update user role */
export async function updateUserRole(userId: string, role: AppRole): Promise<ApiResponse<void>> {
    const client = getApiClient();
    logger.info('Updating user role', { userId, role });

    return client.query<void>('updateUserRole', async () => {
        const supabase = client.getSupabaseClient();

        // Check if role entry exists
        const { data: existingRole } = await supabase
            .from('user_roles')
            .select('id')
            .eq('user_id', userId)
            .single();

        let error;

        if (existingRole) {
            // Update
            const result = await supabase
                .from('user_roles')
                .update({ role })
                .eq('user_id', userId);
            error = result.error;
        } else {
            // Insert
            const result = await supabase
                .from('user_roles')
                .insert({ user_id: userId, role });
            error = result.error;
        }

        return { data: null, error };
    });
}
