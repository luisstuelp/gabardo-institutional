import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type PostMetricRecord = Tables<'post_metrics'> & {
  posts?: Pick<Tables<'posts'>, 'title' | 'slug'> | null;
};

export type MidiaMetricRecord = Tables<'midia_metrics'> & {
  midia?: Pick<Tables<'midia'>, 'title' | 'url'> | null;
};

export async function fetchPostMetrics() {
  const { data, error } = await supabase
    .from('post_metrics')
    .select('*, posts (title, slug)')
    .order('views', { ascending: false });

  if (error) {
    throw error;
  }

  return data as PostMetricRecord[];
}

export async function fetchMidiaMetrics() {
  const { data, error } = await supabase
    .from('midia_metrics')
    .select('*, midia (title, url)')
    .order('views', { ascending: false });

  if (error) {
    throw error;
  }

  return data as MidiaMetricRecord[];
}
