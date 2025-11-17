export type AdminLogRecord = {
  id: string;
  created_at: string;
  actor_id: string | null;
  actor_email: string | null;
  role: string | null;
  action: string;
  description: string | null;
  route: string | null;
  method: string | null;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
};

export type AdminLogPagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type AdminLogFilters = {
  page?: number;
  perPage?: number;
  action?: string | null;
  actor?: string | null;
  search?: string | null;
  from?: string | null;
  to?: string | null;
};

export type AdminLogResponse = {
  logs: AdminLogRecord[];
  pagination: AdminLogPagination;
};

const DEFAULT_ENDPOINT = '/api/admin/logs';

export async function fetchAdminLogs(filters: AdminLogFilters = {}): Promise<AdminLogResponse> {
  const params = new URLSearchParams();

  if (filters.page) {
    params.set('page', String(filters.page));
  }

  if (filters.perPage) {
    params.set('perPage', String(filters.perPage));
  }

  if (filters.action) {
    params.set('action', filters.action);
  }

  if (filters.actor) {
    params.set('actor', filters.actor);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.from) {
    params.set('from', filters.from);
  }

  if (filters.to) {
    params.set('to', filters.to);
  }

  const endpoint = params.size ? `${DEFAULT_ENDPOINT}?${params.toString()}` : DEFAULT_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error ?? 'Não foi possível carregar os registros de auditoria.');
  }

  const data = (await response.json()) as { logs: AdminLogRecord[]; pagination: AdminLogPagination };
  return {
    logs: data.logs ?? [],
    pagination: data.pagination,
  };
}
