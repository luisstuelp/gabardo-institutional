import { useQuery } from '@tanstack/react-query';

import {
  fetchMidiaMetrics,
  fetchPostMetrics,
  fetchPageMetrics,
  fetchMetricsSummary,
  fetchMetricsTimeseries,
  type MetricsOverviewFilters,
  type MetricsSummaryFilters,
  type MetricsSummaryRow,
  type MetricsTimeseriesPoint,
  type PageMetricRecord,
} from '@/services/metrics';

export function usePostMetrics() {
  return useQuery({
    queryKey: ['metrics', 'posts'],
    queryFn: fetchPostMetrics,
  });
}

export function useMidiaMetrics() {
  return useQuery({
    queryKey: ['metrics', 'midia'],
    queryFn: fetchMidiaMetrics,
  });
}

export function usePageMetrics() {
  return useQuery<PageMetricRecord[]>({
    queryKey: ['metrics', 'pages'],
    queryFn: fetchPageMetrics,
  });
}

export function useMetricsTimeseries(filters: MetricsOverviewFilters) {
  return useQuery<MetricsTimeseriesPoint[]>({
    queryKey: [
      'metrics',
      'timeseries',
      filters.startDate,
      filters.endDate,
      filters.metric,
      filters.contentType,
      (filters.contentIds ?? []).join('|'),
    ],
    queryFn: () => fetchMetricsTimeseries(filters),
    enabled: Boolean(filters.startDate && filters.endDate),
  });
}

export function useMetricsSummary(startDate: string, endDate: string, filters: MetricsSummaryFilters = {}) {
  const contentIdsKey = filters.contentIds?.join('|') ?? '';

  return useQuery<MetricsSummaryRow[]>({
    queryKey: ['metrics', 'summary', startDate, endDate, filters.contentType ?? 'all', contentIdsKey],
    queryFn: () => fetchMetricsSummary(startDate, endDate, filters),
    enabled: Boolean(startDate && endDate),
  });
}
