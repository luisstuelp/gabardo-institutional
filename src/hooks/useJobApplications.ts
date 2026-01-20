import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import {
  deleteJobApplication,
  fetchJobApplicationById,
  fetchJobApplications,
  updateJobApplicationStatus,
  type JobApplicationRecord,
  type JobApplicationStatus
} from '@/services/jobApplications';

export function useJobApplications(status?: JobApplicationStatus) {
  const key = useMemo(() => ['jobApplications', status ?? 'all'], [status]);

  return useQuery({
    queryKey: key,
    queryFn: () => fetchJobApplications(status),
  });
}

export function useJobApplication(id: string) {
  return useQuery({
    queryKey: ['jobApplications', id],
    queryFn: () => fetchJobApplicationById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateJobApplicationStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobApplicationStatus }) => updateJobApplicationStatus(id, status),
    onSuccess: (_data: JobApplicationRecord, variables) => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      queryClient.invalidateQueries({ queryKey: ['jobApplications', variables.id] });

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

export function useDeleteJobApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteJobApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });

      toast({
        title: 'Candidatura removida com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';

      toast({
        title: 'Não foi possível excluir a candidatura',
        description: message,
        variant: 'destructive',
      });
    },
  });
}
