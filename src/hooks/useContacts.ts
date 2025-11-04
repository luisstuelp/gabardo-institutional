import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import { fetchContactById, fetchContacts, updateContactStatus, type ContactMessageRecord, type ContactStatus } from '@/services/contacts';

export function useContacts(status?: ContactStatus) {
  const key = useMemo(() => ['contacts', status ?? 'all'], [status]);

  return useQuery({
    queryKey: key,
    queryFn: () => fetchContacts(status),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contacts', id],
    queryFn: () => fetchContactById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateContactStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) => updateContactStatus(id, status),
    onSuccess: (_data: ContactMessageRecord, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contacts', variables.id] });

      toast({
        title: 'Status atualizado com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';

      toast({
        title: 'Não foi possível atualizar o status',
        description: message,
        variant: 'destructive',
      });
    },
  });
}
