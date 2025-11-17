'use client';

import { useMemo, useState } from 'react';
import { BarChart3, CalendarDays, Filter, Mail, RefreshCw, Search, Shield, User, Workflow } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAdminLogs } from '@/hooks/useAdminLogs';

function formatDateTime(value: string | null) {
  if (!value) {
    return 'Desconhecido';
  }

  return new Date(value).toLocaleString('pt-BR');
}

type FilterState = {
  action: string;
  actor: string;
  search: string;
  from: string;
  to: string;
};

const INITIAL_FILTERS: FilterState = {
  action: '',
  actor: '',
  search: '',
  from: '',
  to: '',
};

const PER_PAGE_OPTIONS = [20, 50, 100];

export default function AdminLogsContent() {
  const [formFilters, setFormFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const queryFilters = useMemo(
    () => ({
      page,
      perPage,
      action: appliedFilters.action || undefined,
      actor: appliedFilters.actor || undefined,
      search: appliedFilters.search || undefined,
      from: appliedFilters.from || undefined,
      to: appliedFilters.to || undefined,
    }),
    [page, perPage, appliedFilters],
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useAdminLogs(queryFilters);

  const logs = useMemo(() => data?.logs ?? [], [data?.logs]);
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const availableActions = useMemo(() => {
    const unique = new Set<string>();
    for (const log of logs) {
      if (log.action) {
        unique.add(log.action);
      }
    }
    return Array.from(unique).sort();
  }, [logs]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters(formFilters);
  };

  const handleReset = () => {
    setFormFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setPage(1);
  };

  const handleToggleDetails = (logId: string) => {
    setExpandedLogId((current) => (current === logId ? null : logId));
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`log-skeleton-${index}`} className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
      ))}
    </div>
  );

  const renderErrorState = () => (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
      <h2 className="text-lg font-semibold">Não foi possível carregar os registros.</h2>
      {error instanceof Error && <p className="mt-2 text-sm text-red-100/80">{error.message}</p>}
      <Button
        type="button"
        variant="ghost"
        className="mt-4 border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
        onClick={() => refetch()}
      >
        Tentar novamente
      </Button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Nenhum evento registrado</h2>
      <p className="mt-3 text-sm text-white/60">
        Assim que ações administrativas forem executadas (criação, alteração ou exclusão), elas aparecerão automaticamente aqui.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-6 border-white/20 text-white hover:border-white/40 hover:bg-white/10"
        onClick={() => refetch()}
      >
        Atualizar agora
      </Button>
    </div>
  );

  const renderLogs = () => {
    if (isLoading) {
      return renderSkeleton();
    }

    if (isError) {
      return renderErrorState();
    }

    if (!logs.length) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-4">
        {logs.map((log) => {
          const isExpanded = expandedLogId === log.id;

          return (
            <article
              key={log.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/80">
                      <Workflow className="h-3 w-3" />
                      {log.action}
                    </span>
                    {log.method && log.route && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-white/60">
                        <BarChart3 className="h-3 w-3" />
                        {log.method} · {log.route}
                      </span>
                    )}
                  </div>
                  {log.description && <p className="text-sm text-white/70">{log.description}</p>}
                </div>

                <div className="flex items-center gap-3 text-sm text-white/60">
                  <CalendarDays className="h-4 w-4 text-white/40" />
                  {formatDateTime(log.created_at)}
                </div>
              </header>

              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Ator</p>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Shield className="h-4 w-4 text-white/40" />
                    {log.role ?? 'Desconhecido'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Mail className="h-4 w-4 text-white/40" />
                    {log.actor_email ?? 'E-mail não informado'}
                  </div>
                  {log.actor_id && (
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <User className="h-3.5 w-3.5 text-white/30" />
                      {log.actor_id}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Entidade</p>
                  <p className="text-sm text-white/70">
                    {log.entity_type ?? 'Não classificada'}
                    {log.entity_id ? (
                      <span className="ml-2 text-xs text-white/50">#{log.entity_id}</span>
                    ) : null}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Origem</p>
                  <p className="text-sm text-white/70">IP: {log.ip_address ?? 'Não informado'}</p>
                  <p className="text-xs text-white/50">
                    {log.user_agent ? log.user_agent.slice(0, 120) : 'User agent não informado'}
                  </p>
                </div>
              </div>

              <footer className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                  onClick={() => handleToggleDetails(log.id)}
                >
                  {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes' }
                </Button>
              </footer>

              {isExpanded && (
                <div className="mt-4 rounded-xl border border-white/10 bg-neutral-950/80 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Metadata</h3>
                  <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs text-white/70">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-white/10 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white">Registro de atividades</h1>
            <p className="max-w-2xl text-sm text-white/70">
              Acompanhe todas as ações administrativas executadas no painel. Utilize filtros para localizar eventos específicos
              e mantenha rastreabilidade completa das alterações realizadas por cada usuário.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2 border-white/20 text-white hover:border-white/40 hover:bg-white/10"
            onClick={() => refetch()}
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin text-gabardo-light-blue' : 'text-white/70'}`} />
            Atualizar
          </Button>
        </div>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              <Workflow className="h-4 w-4" />
              Ação
            </span>
            <div className="relative">
              <input
                type="text"
                list="admin-log-actions"
                value={formFilters.action}
                onChange={(event) => setFormFilters((current) => ({ ...current, action: event.target.value }))}
                placeholder="Ex: admin.users.create"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              />
              <datalist id="admin-log-actions">
                {availableActions.map((action) => (
                  <option key={action} value={action} />
                ))}
              </datalist>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              <Mail className="h-4 w-4" />
              E-mail do usuário
            </span>
            <input
              type="email"
              value={formFilters.actor}
              onChange={(event) => setFormFilters((current) => ({ ...current, actor: event.target.value }))}
              placeholder="admin@empresa.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              <Search className="h-4 w-4" />
              Busca geral
            </span>
            <input
              type="search"
              value={formFilters.search}
              onChange={(event) => setFormFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Rota, entidade, IP, descrição..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              <CalendarDays className="h-4 w-4" />
              Data inicial
            </span>
            <input
              type="date"
              value={formFilters.from}
              onChange={(event) => setFormFilters((current) => ({ ...current, from: event.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              <CalendarDays className="h-4 w-4" />
              Data final
            </span>
            <input
              type="date"
              value={formFilters.to}
              onChange={(event) => setFormFilters((current) => ({ ...current, to: event.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            />
          </label>

          <div className="flex items-end gap-3">
            <Button
              type="submit"
              className="flex-1 gap-2 bg-gabardo-light-blue text-neutral-900 hover:bg-gabardo-light-blue/90"
            >
              <Filter className="h-4 w-4" />
              Aplicar filtros
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              onClick={handleReset}
            >
              Limpar
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <span>Total de registros: {pagination?.total ?? 0}</span>
            <span>
              Página {pagination?.page ?? page} / {totalPages}
            </span>
            <span>{isFetching ? 'Atualizando…' : 'Atualizado'}</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/70">
              Registros por página
              <select
                value={perPage}
                onChange={(event) => {
                  setPerPage(Number(event.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gabardo-light-blue focus:outline-none"
              >
                {PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-neutral-900 text-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
              >
                Anterior
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page >= totalPages}
              >
                Próxima
              </Button>
            </div>
          </div>
        </div>

        {renderLogs()}
      </section>
    </div>
  );
}
