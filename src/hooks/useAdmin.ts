import { useQuery } from '@tanstack/react-query';

export function useAdmin() {
    const { data: isAdmin, isLoading: isAdminLoading, isFetching: isAdminFetching } = useQuery({
        queryKey: ['admin-session-check'],
        queryFn: async () => {
            const response = await fetch('/api/admin/session', { cache: 'no-store' });
            if (!response.ok) return false;
            const result = (await response.json()) as { role?: string };
            return result.role === 'admin';
        },
        staleTime: 0,
        refetchOnMount: 'always',
    });

    return {
        isAdmin: !!isAdmin,
        isLoading: isAdminLoading,
    };
}
