import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMidia } from '@/services/midia';
import { useToast } from '@/hooks/use-toast';
import { MidiaFormData } from '@/schemas/midia';

export function useMidia() {
  return useQuery({
    queryKey: ['midia'],
    queryFn: fetchMidia,
  });
}

export function useCreateMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (midia: MidiaFormData) => {
      const response = await fetch('/api/admin/midia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(midia),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível criar o conteúdo de mídia.' }));
        throw new Error(error.error ?? 'Não foi possível criar o conteúdo de mídia.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media created successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to create media",
        description: message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, midia }: { id: string; midia: MidiaFormData }) => {
      const response = await fetch(`/api/admin/midia/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(midia),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível atualizar o conteúdo de mídia.' }));
        throw new Error(error.error ?? 'Não foi possível atualizar o conteúdo de mídia.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media updated successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to update media",
        description: message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteMidia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/midia/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Não foi possível excluir o conteúdo de mídia.' }));
        throw new Error(error.error ?? 'Não foi possível excluir o conteúdo de mídia.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['midia'] });
      toast({
        title: "Media deleted successfully",
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Failed to delete media",
        description: message,
        variant: "destructive",
      });
    },
  });
}