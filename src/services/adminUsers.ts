export type AdminUsersSummary = {
  total: number;
  admins: number;
  currentAdminId: string;
  retrievedAt: string;
};

export type AdminUserRecord = {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string | null;
  last_sign_in_at: string | null;
  confirmed_at: string | null;
  role: 'admin' | 'user';
};

export type FetchAdminUsersResponse = {
  users: AdminUserRecord[];
  summary: AdminUsersSummary;
};

export type AdminUsersFilters = {
  role?: 'admin' | 'user';
  search?: string;
};

export type CreateAdminUserPayload = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export async function fetchAdminUsers(filters: AdminUsersFilters = {}): Promise<FetchAdminUsersResponse> {
  const params = new URLSearchParams();

  if (filters.role) {
    params.set('role', filters.role);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }

  const response = await fetch(`/api/admin/users${params.size ? `?${params.toString()}` : ''}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error ?? 'Não foi possível carregar os usuários.');
  }

  return (await response.json()) as FetchAdminUsersResponse;
}

export async function updateAdminUserRole(userId: string, role: 'admin' | 'user'): Promise<void> {
  const response = await fetch('/api/admin/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'update-role', userId, role }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error ?? 'Não foi possível atualizar o cargo do usuário.');
  }
}

export async function createAdminUser(payload: CreateAdminUserPayload) {
  const response = await fetch('/api/admin/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'create-user', ...payload }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error ?? 'Não foi possível criar o novo usuário.');
  }

  return (await response.json()) as { success: true; user: { id: string; email: string | null; role: 'admin' | 'user' } };
}

export async function deleteAdminUser(userId: string): Promise<void> {
  const response = await fetch('/api/admin/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(error.error ?? 'Não foi possível excluir o usuário.');
  }
}
