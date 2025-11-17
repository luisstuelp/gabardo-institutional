import type { Database } from '@/integrations/supabase/type';

export type QuoteStatus = Database['public']['Enums']['quote_status'];

export const quoteStatusLabels: Record<QuoteStatus, string> = {
  new: 'Nova',
  in_progress: 'Em andamento',
  completed: 'Concluída',
  archived: 'Arquivada',
};

export const quoteStatusOrder: QuoteStatus[] = ['new', 'in_progress', 'completed', 'archived'];
