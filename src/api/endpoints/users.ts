/**
 * Users API endpoint module.
 * Manage user profiles and roles.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { UserProfile, AppRole } from '@/types/database';
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

        // These tables both reference auth.users, but there is no direct
        // foreign key between user_profiles and user_roles for PostgREST to embed.
        const [profilesResult, rolesResult] = await Promise.all([
            supabase
                .from('user_profiles')
                .select('*')
                .order('created_at', { ascending: false }),
            supabase
                .from('user_roles')
                .select('user_id, role'),
        ]);

        if (profilesResult.error) return { data: null, error: profilesResult.error };
        if (rolesResult.error) return { data: null, error: rolesResult.error };

        const rolesByUserId = new Map<string, AppRole>();
        for (const roleRow of rolesResult.data ?? []) {
            const currentRole = rolesByUserId.get(roleRow.user_id);
            if (!currentRole || roleRow.role === 'admin') {
                rolesByUserId.set(roleRow.user_id, roleRow.role as AppRole);
            }
        }

        const adminUsers: AdminUser[] = (profilesResult.data ?? []).map((profile) => ({
            ...profile,
            role: rolesByUserId.get(profile.user_id) ?? 'user',
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
