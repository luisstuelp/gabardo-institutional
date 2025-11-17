import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/type';
import type { MetricsEvent } from '@/lib/metrics';
import type { PostgrestError } from '@supabase/supabase-js';

export type PostMetricRecord = Tables<'post_metrics'> & {
  posts?: Pick<Tables<'posts'>, 'title' | 'slug'> | null;
};

export type MidiaMetricRecord = Tables<'midia_metrics'> & {
  midia?: Pick<Tables<'midia'>, 'title' | 'url'> | null;
};

export type MetricsOverviewFilters = {
  startDate: string;
  endDate: string;
  metric: MetricsEvent | 'all';
  contentType: 'post' | 'midia' | 'page' | 'all';
  contentIds?: string[];
};

export type MetricsSummaryFilters = {
  contentType?: 'post' | 'midia' | 'page' | 'all';
  contentIds?: string[];
};

export type MetricsTimeseriesPoint = {
  event_date: string;
  total: number;
};

export type MetricsSummaryRow = {
  metric_type: MetricsEvent;
  content_type: 'post' | 'midia' | 'page' | 'all';
  total: number;
  unique_contents: number;
};

export type PageMetricRecord = {
  id: string;
  page_path: string;
  views: number;
  last_viewed_at: string | null;
  created_at: string;
  updated_at: string;
};

type SupabaseQueryResult<T> = Promise<{ data: T | null; error: PostgrestError | null }>;

interface SupabaseExtendedClient {
  from<T>(table: string): {
    select(columns: string): {
      order(column: string, options?: { ascending?: boolean }): SupabaseQueryResult<T[]>;
    };
  };
  rpc<T>(fn: string, params: Record<string, unknown>): SupabaseQueryResult<T>;
}

const client = supabase;
const extendedClient = supabase as unknown as SupabaseExtendedClient;

export async function fetchPostMetrics() {
  const { data, error } = await client
    .from('post_metrics')
    .select('*, posts (title, slug)')
    .order('views', { ascending: false });

  if (error) {
    throw error;
  }

  return data as PostMetricRecord[];
}

export async function fetchPageMetrics() {
  const { data, error } = await extendedClient
    .from<PageMetricRecord>('page_metrics')
    .select('*')
    .order('views', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as PageMetricRecord[];
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

export async function fetchQuoteMetrics() {
  const { data, error } = await supabase
    .from('quotes')
    .select('status, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function fetchMetricsTimeseries(filters: MetricsOverviewFilters) {
  const { data, error } = await extendedClient.rpc<MetricsTimeseriesPoint[]>('get_metrics_timeseries', {
    start_date: filters.startDate,
    end_date: filters.endDate,
    metric_filter: filters.metric,
    content_filter: filters.contentType,
    content_ids: filters.contentIds ?? null,
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as MetricsTimeseriesPoint[];
}

export async function fetchMetricsSummary(startDate: string, endDate: string, filters: MetricsSummaryFilters = {}) {
  const { data, error } = await extendedClient.rpc<MetricsSummaryRow[]>('get_metrics_summary', {
    start_date: startDate,
    end_date: endDate,
    content_filter: filters.contentType ?? 'all',
    content_ids: filters.contentIds ?? null,
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as MetricsSummaryRow[];
}
