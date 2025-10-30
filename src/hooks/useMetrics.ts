import { useQuery } from '@tanstack/react-query';

import { fetchMidiaMetrics, fetchPostMetrics } from '@/services/metrics';

export function usePostMetrics() {
  return useQuery({
    queryKey: ['metrics', 'posts'],
    queryFn: fetchPostMetrics,
  });
}

export function useMidiaMetrics() {
  return useQuery({
    queryKey: ['metrics', 'midia'],
    queryFn: fetchMidiaMetrics,
  });
}
