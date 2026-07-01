import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import { Branch } from '@/types/database';

async function fetchBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('is_headquarters', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }

  return (data || []) as Branch[];
}

async function fetchBranch(id: string): Promise<Branch | null> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching branch:', error);
    return null;
  }

  return data as Branch | null;
}

export function useBranches() {
  return useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });
}

export function useBranch(id: string) {
  return useQuery({
    queryKey: ['branch', id],
    queryFn: () => fetchBranch(id),
    enabled: !!id,
  });
}
