import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import { deleteQuote, fetchQuoteById, fetchQuotes, QuoteRecord, QuoteStatus, updateQuoteStatus } from '@/services/quotes';

export function useQuotes(status?: QuoteStatus) {
  const key = useMemo(() => ['quotes', status ?? 'all'], [status]);

  return useQuery({
    queryKey: key,
    queryFn: () => fetchQuotes(status),
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: ['quotes', id],
    queryFn: () => fetchQuoteById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateQuoteStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: QuoteStatus }) => updateQuoteStatus(id, status),
    onSuccess: (_data: QuoteRecord, variables) => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['quotes', variables.id] });

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

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });

      toast({
        title: 'Orçamento removido com sucesso',
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';

      toast({
        title: 'Não foi possível excluir o orçamento',
        description: message,
        variant: 'destructive',
      });
    },
  });
}
