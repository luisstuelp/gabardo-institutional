import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  type AdminUsersFilters,
  type CreateAdminUserPayload,
  updateAdminUserRole,
} from '@/services/adminUsers';
import { useToast } from '@/hooks/use-toast';

export function useAdminUsers(filters: AdminUsersFilters = {}) {
  const key = useMemo(() => ['admin-users', filters.role ?? 'all', filters.search ?? ''], [filters.role, filters.search]);

  return useQuery({
    queryKey: key,
    queryFn: () => fetchAdminUsers(filters),
    staleTime: 1000 * 30,
  });
}

export function useUpdateAdminRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: 'admin' | 'user' }) => updateAdminUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Permissão atualizada com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o cargo.';
      toast({
        title: 'Não foi possível atualizar o cargo',
        description: message,
        variant: 'destructive',
      });
    },
  });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: CreateAdminUserPayload) => createAdminUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Usuário criado com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido ao criar usuário.';
      toast({
        title: 'Não foi possível criar o usuário',
        description: message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (userId: string) => deleteAdminUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Usuário excluído com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido ao excluir o usuário.';
      toast({
        title: 'Não foi possível excluir o usuário',
        description: message,
        variant: 'destructive',
      });
    },
  });
}
