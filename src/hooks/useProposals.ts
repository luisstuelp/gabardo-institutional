import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '@/api';
import { useAuth } from '@/contexts/AuthContext';

export function useProposals() {
    const { user } = useAuth();

    const { data: proposals = [], isLoading } = useQuery({
        queryKey: ['proposals', user?.id],
        queryFn: async () => {
            if (!user) return [];

            const result = await leadsApi.getUserLeads(user.id);
            if (result.error) {
                console.error('Error fetching proposals:', result.error.message);
                return [];
            }

            return result.data ?? [];
        },
        enabled: !!user,
    });

    return {
        proposals,
        isLoading,
        isAuthenticated: !!user,
    };
}
