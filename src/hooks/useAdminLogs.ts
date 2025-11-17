import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchAdminLogs, type AdminLogFilters, type AdminLogResponse } from '@/services/adminLogs';

function serializeFilters(filters: AdminLogFilters): string {
  return JSON.stringify({
    page: filters.page ?? 1,
    perPage: filters.perPage ?? null,
    action: filters.action ?? null,
    actor: filters.actor ?? null,
    search: filters.search ?? null,
    from: filters.from ?? null,
    to: filters.to ?? null,
  });
}

export function useAdminLogs(filters: AdminLogFilters = {}) {
  const serialized = useMemo(() => serializeFilters(filters), [filters]);

  return useQuery<AdminLogResponse, Error>({
    queryKey: ['admin-logs', serialized],
    queryFn: () => fetchAdminLogs(filters),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
}
