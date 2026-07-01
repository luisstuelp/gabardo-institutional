import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase_trucks/client';
import { AppRole } from '@/types/database';

export function useAdmin() {
    const { user, isLoading: isAuthLoading } = useAuth();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['admin-check', user?.id],
        queryFn: async () => {
            if (!user) return false;

            const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .eq('role', 'admin') // Only check if they have the admin role
                .maybeSingle();

            if (error) {
                console.error('Error checking admin role:', error);
                return false;
            }

            return data?.role === 'admin';
        },
        enabled: !!user && !isAuthLoading,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        isAdmin: !!isAdmin,
        isLoading: isAuthLoading || isAdminLoading,
    };
}
