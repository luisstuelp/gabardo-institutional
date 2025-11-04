import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type QuoteRecord = Tables<'quotes'>;
export type QuoteStatus = QuoteRecord['status'];

export async function fetchQuotes(status?: QuoteStatus) {
  let query = supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as QuoteRecord[];
}

export async function fetchQuoteById(id: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as QuoteRecord;
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const { data, error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as QuoteRecord;
}
