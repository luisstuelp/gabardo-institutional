'use client';

import { useMemo } from 'react';
import { BarChart3, MousePointerClick, RefreshCw, Share2, TrendingUp, Eye } from 'lucide-react';

import { useMidiaMetrics, usePostMetrics } from '@/hooks/useMetrics';

const numberFormatter = new Intl.NumberFormat('pt-BR');

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

export default function AdminMetricsContent() {
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

  const aggregatedPosts = useMemo(() => sumMetric(postMetrics ?? []), [postMetrics]);
  const aggregatedMidia = useMemo(() => sumMetric(midiaMetrics ?? []), [midiaMetrics]);

  const isLoading = isLoadingPosts || isLoadingMidia;
  const isRefetching = isRefetchingPosts || isRefetchingMidia;

  const handleRefresh = () => {
    refetchPosts();
    refetchMidia();
  };

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
      {(isErrorPosts || isErrorMidia) && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
          <p className="text-sm font-medium">
            Não foi possível carregar todos os dados de métricas.
          </p>
          <ul className="mt-2 text-xs text-red-100/80">
            {isErrorPosts && postMetricsError instanceof Error && <li>Blog: {postMetricsError.message}</li>}
            {isErrorMidia && midiaMetricsError instanceof Error && <li>Mídia: {midiaMetricsError.message}</li>}
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
    <div className="grid gap-8 lg:grid-cols-2">
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
            <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.3em] text-white/40">
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
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{metric.posts?.title ?? 'Sem título'}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-white/40">/{metric.posts?.slug ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.views ?? 0)}</td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.external_clicks ?? 0)}</td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.shares ?? 0)}</td>
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
            <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.3em] text-white/40">
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
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{metric.midia?.title ?? 'Sem título'}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-white/40 break-all">{metric.midia?.url ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.views ?? 0)}</td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.external_clicks ?? 0)}</td>
                  <td className="px-4 py-3">{numberFormatter.format(metric.shares ?? 0)}</td>
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
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white">Métricas & Interações</h1>
          <p className="mt-2 max-w-2xl text-white/60">
            Acompanhe as visualizações, cliques externos e compartilhamentos registrados para os conteúdos do Blog e da página de
            Mídia.
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
      {!isLoading && (isErrorPosts || isErrorMidia) && renderError()}
      {!isLoading && !isErrorPosts && !isErrorMidia && (
        <>
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
