import { useQuery } from '@tanstack/react-query';
import { fetchFipeInfo, FipeData } from '@/services/fipe';

export function useFipe(fipeCode: string | undefined | null) {
    return useQuery({
        queryKey: ['fipe', fipeCode],
        queryFn: () => fetchFipeInfo(fipeCode!),
        enabled: !!fipeCode,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
