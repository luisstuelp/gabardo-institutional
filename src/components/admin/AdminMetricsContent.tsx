'use client';

import { useMemo, useState, useCallback } from 'react';
import { BarChart3, MousePointerClick, RefreshCw, Share2, TrendingUp, Eye, Filter, Calendar, Sparkles, MapPinned } from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import {
  useMidiaMetrics,
  usePostMetrics,
  usePageMetrics,
  useMetricsSummary,
  useMetricsTimeseries,
} from '@/hooks/useMetrics';
import { getTrackedPageLabel, normalizeTrackedPath, trackedSitePages } from '@/data/trackedSitePages';

const numberFormatter = new Intl.NumberFormat('pt-BR');

const RANGE_OPTIONS = [
  { label: '7 dias', value: 7 },
  { label: '14 dias', value: 14 },
  { label: '30 dias', value: 30 },
];

const METRIC_OPTIONS: Array<{ label: string; value: 'all' | 'view' | 'external_click' | 'share' }> = [
  { label: 'Todos os eventos', value: 'all' },
  { label: 'Visualizações', value: 'view' },
  { label: 'Cliques externos', value: 'external_click' },
  { label: 'Compartilhamentos', value: 'share' },
];

const PAGE_FILTER_OPTIONS = trackedSitePages.map((page) => ({
  label: page.label,
  value: normalizeTrackedPath(page.path),
}));

const CONTENT_OPTIONS: Array<{
  label: string;
  value: string;
  contentType: 'all' | 'post' | 'midia' | 'page';
  contentId?: string;
}> = [
  { label: 'Todos os conteúdos', value: 'all', contentType: 'all' },
  { label: 'Blog (posts)', value: 'post', contentType: 'post' },
  { label: 'Mídia (artigos)', value: 'midia', contentType: 'midia' },
  { label: 'Páginas · Todas', value: 'page:all', contentType: 'page' },
  ...PAGE_FILTER_OPTIONS.map((page) => ({
    label: page.label,
    value: `page:${page.value}`,
    contentType: 'page' as const,
    contentId: page.value,
  })),
];

function sumMetric<T extends { views: number; external_clicks: number; shares: number }>(items: T[] = []) {
  return items.reduce(
    (accumulator, item) => {
      accumulator.views += item.views ?? 0;
      accumulator.clicks += item.external_clicks ?? 0;
      accumulator.shares += item.shares ?? 0;
      return accumulator;
    },
    { views: 0, clicks: 0, shares: 0 },
  );
}

function sumPageMetric(items: { views: number }[] = []) {
  return items.reduce((total, item) => total + (item.views ?? 0), 0);
}

export default function AdminMetricsContent() {
  const [rangeInDays, setRangeInDays] = useState<number>(7);
  const [metricFilter, setMetricFilter] = useState<'all' | 'view' | 'external_click' | 'share'>('all');
  const [contentFilter, setContentFilter] = useState(CONTENT_OPTIONS[0]);

  const endDate = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().slice(0, 10);
  }, []);

  const startDate = useMemo(() => {
    const start = new Date(endDate);
    start.setDate(start.getDate() - (rangeInDays - 1));
    return start.toISOString().slice(0, 10);
  }, [endDate, rangeInDays]);

  const {
    data: postMetrics,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: postMetricsError,
    refetch: refetchPosts,
    isRefetching: isRefetchingPosts,
  } = usePostMetrics();

  const {
    data: midiaMetrics,
    isLoading: isLoadingMidia,
    isError: isErrorMidia,
    error: midiaMetricsError,
    refetch: refetchMidia,
    isRefetching: isRefetchingMidia,
  } = useMidiaMetrics();

  const {
    data: pageMetrics,
    isLoading: isLoadingPages,
    isError: isErrorPages,
    error: pageMetricsError,
    refetch: refetchPages,
    isRefetching: isRefetchingPages,
  } = usePageMetrics();

  const {
    data: timeseries,
    isLoading: isLoadingTimeseries,
    isFetching: isFetchingTimeseries,
    refetch: refetchTimeseries,
  } = useMetricsTimeseries({
    startDate,
    endDate,
    metric: metricFilter,
    contentType: contentFilter.contentType,
    contentIds: contentFilter.contentId ? [contentFilter.contentId] : undefined,
  });

  const {
    data: summary,
    isLoading: isLoadingSummary,
    isFetching: isFetchingSummary,
    refetch: refetchSummary,
  } = useMetricsSummary(startDate, endDate, {
    contentType: contentFilter.contentType,
    contentIds: contentFilter.contentId ? [contentFilter.contentId] : undefined,
  });

  const aggregatedPosts = useMemo(() => sumMetric(postMetrics ?? []), [postMetrics]);
  const aggregatedMidia = useMemo(() => sumMetric(midiaMetrics ?? []), [midiaMetrics]);
  const aggregatedPageViews = useMemo(() => sumPageMetric(pageMetrics ?? []), [pageMetrics]);

  const timeseriesData = useMemo(() => {
    return (timeseries ?? []).map((point) => {
      const date = new Date(point.event_date);
      const formatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' });
      return {
        dateLabel: formatter.format(date),
        total: point.total,
      };
    });
  }, [timeseries]);

  const summaryByMetric = useMemo(() => {
    const base = { view: 0, external_click: 0, share: 0 } as Record<'view' | 'external_click' | 'share', number>;
    (summary ?? []).forEach((row) => {
      if (row.content_type === 'all') {
        base[row.metric_type] = row.total;
      }
    });
    return base;
  }, [summary]);

  const isLoading =
    isLoadingPosts ||
    isLoadingMidia ||
    isLoadingPages ||
    isLoadingTimeseries ||
    isLoadingSummary;

  const isRefetching =
    isRefetchingPosts ||
    isRefetchingMidia ||
    isRefetchingPages ||
    isFetchingTimeseries ||
    isFetchingSummary;

  const handleRefresh = useCallback(() => {
    refetchPosts();
    refetchMidia();
    refetchPages();
    refetchTimeseries();
    refetchSummary();
  }, [refetchMidia, refetchPages, refetchPosts, refetchSummary, refetchTimeseries]);

  const renderLoading = () => (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`metrics-skeleton-${index}`}
          className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        />
      ))}
    </div>
  );

  const renderError = () => (
    <div className="space-y-4">
      {(isErrorPosts || isErrorMidia || isErrorPages) && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
          <p className="text-sm font-medium">
            Não foi possível carregar todos os dados de métricas.
          </p>
          <ul className="mt-2 text-xs text-red-100/80">
            {isErrorPosts && postMetricsError instanceof Error && <li>Blog: {postMetricsError.message}</li>}
            {isErrorMidia && midiaMetricsError instanceof Error && <li>Mídia: {midiaMetricsError.message}</li>}
            {isErrorPages && pageMetricsError instanceof Error && <li>Páginas: {pageMetricsError.message}</li>}
          </ul>
          <button
            type="button"
            onClick={handleRefresh}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/40 hover:bg-white/10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );

  const renderTable = () => (
    <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Blog</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Top conteúdos por visualizações</p>
          </div>
          <Eye className="h-5 w-5 text-gabardo-light-blue" />
        </header>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 text-left text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-4 py-3">Post</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Cliques externos</th>
                <th className="px-4 py-3">Shares</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(postMetrics ?? []).slice(0, 8).map((metric) => (
                <tr key={metric.id} className="bg-transparent text-sm text-white/80">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-white leading-tight">
                        {metric.posts?.title ?? 'Sem título'}
                      </span>
                      <span className="text-xs font-medium text-white/45">/{metric.posts?.slug ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.views ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.external_clicks ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.shares ?? 0)}
                  </td>
                </tr>
              ))}
              {!postMetrics?.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-white/50">
                    Nenhuma interação registrada até o momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Mídia</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Top artigos por visualizações</p>
          </div>
          <TrendingUp className="h-5 w-5 text-gabardo-light-blue" />
        </header>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 text-left text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-4 py-3">Artigo</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Cliques externos</th>
                <th className="px-4 py-3">Shares</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(midiaMetrics ?? []).slice(0, 8).map((metric) => (
                <tr key={metric.id} className="bg-transparent text-sm text-white/80">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-white leading-tight">
                        {metric.midia?.title ?? 'Sem título'}
                      </span>
                      <span className="text-xs font-medium text-white/45 break-all">{metric.midia?.url ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.views ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.external_clicks ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.shares ?? 0)}
                  </td>
                </tr>
              ))}
              {!midiaMetrics?.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-sm text-white/50">
                    Nenhuma interação registrada até o momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Páginas</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Top páginas por visualizações</p>
          </div>
          <MapPinned className="h-5 w-5 text-gabardo-light-blue" />
        </header>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 text-left text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
              <tr>
                <th className="px-4 py-3">Página</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Última visualização</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(pageMetrics ?? []).slice(0, 8).map((metric) => (
                <tr key={metric.id} className="bg-transparent text-sm text-white/80">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-white leading-tight">
                        {getTrackedPageLabel(metric.page_path)}
                      </span>
                      <span className="text-xs font-medium text-white/45">{metric.page_path}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-white tabular-nums">
                    {numberFormatter.format(metric.views ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-medium text-white/60">
                    {metric.last_viewed_at
                      ? new Intl.DateTimeFormat('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(metric.last_viewed_at))
                      : '—'}
                  </td>
                </tr>
              ))}
              {!pageMetrics?.length && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-white/50">
                    Nenhuma visualização registrada para as páginas monitoradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const cards = [
    {
      label: 'Views Blog',
      value: aggregatedPosts.views,
      icon: Eye,
    },
    {
      label: 'Cliques externos Blog',
      value: aggregatedPosts.clicks,
      icon: MousePointerClick,
    },
    {
      label: 'Shares Blog',
      value: aggregatedPosts.shares,
      icon: Share2,
    },
    {
      label: 'Views Mídia',
      value: aggregatedMidia.views,
      icon: BarChart3,
    },
    {
      label: 'Cliques externos Mídia',
      value: aggregatedMidia.clicks,
      icon: MousePointerClick,
    },
    {
      label: 'Shares Mídia',
      value: aggregatedMidia.shares,
      icon: Share2,
    },
    {
      label: 'Views Páginas',
      value: aggregatedPageViews,
      icon: MapPinned,
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white">Métricas & Interações</h1>
          <p className="mt-2 max-w-2xl text-white/60">
            Acompanhe as visualizações, cliques externos e compartilhamentos registrados para o Blog, a Mídia e as principais
            páginas do site.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 transition-colors hover:border-white/30 hover:bg-white/10"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin text-gabardo-light-blue' : 'text-white/70'}`} />
          Atualizar dados
        </button>
      </header>

      {isLoading && renderLoading()}
      {!isLoading && (isErrorPosts || isErrorMidia || isErrorPages) && renderError()}
      {!isLoading && !isErrorPosts && !isErrorMidia && !isErrorPages && (
        <>
          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/40">
                  <Sparkles className="h-3.5 w-3.5 text-gabardo-light-blue" />
                  Overview Analytics
                </span>
                <h2 className="mt-2 text-lg font-semibold text-white">Visão geral por período</h2>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-white/80">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <Calendar className="h-4 w-4 text-white/40" />
                  <select
                    value={rangeInDays}
                    onChange={(event) => setRangeInDays(Number(event.target.value))}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    {RANGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <Filter className="h-4 w-4 text-white/40" />
                  <select
                    value={metricFilter}
                    onChange={(event) => setMetricFilter(event.target.value as typeof metricFilter)}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    {METRIC_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <Filter className="h-4 w-4 text-white/40" />
                  <select
                    value={contentFilter.value}
                    onChange={(event) => {
                      const next = CONTENT_OPTIONS.find((option) => option.value === event.target.value);
                      if (next) {
                        setContentFilter(next);
                      }
                    }}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    {CONTENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Visualizações</p>
                <p className="mt-2 text-2xl font-semibold text-white">{numberFormatter.format(summaryByMetric.view)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Cliques externos</p>
                <p className="mt-2 text-2xl font-semibold text-white">{numberFormatter.format(summaryByMetric.external_click)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Compartilhamentos</p>
                <p className="mt-2 text-2xl font-semibold text-white">{numberFormatter.format(summaryByMetric.share)}</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeseriesData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38B6FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#38B6FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="dateLabel" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tickFormatter={(value) => numberFormatter.format(value)} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(19,45,81,0.9)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#7FD7FF', fontWeight: 600 }}
                    formatter={(value) => numberFormatter.format(Number(value))}
                  />
                  <Area type="monotone" dataKey="total" stroke="#38B6FF" strokeWidth={3} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {!timeseriesData.length && (
              <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/50">
                Ainda não há dados registrados para o período selecionado.
              </p>
            )}
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">{label}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {numberFormatter.format(value)}
                  </p>
                </div>
                <Icon className="h-6 w-6 text-gabardo-light-blue" />
              </div>
            ))}
          </section>

          {renderTable()}
        </>
      )}
    </div>
  );
}
