'use client';

import { useMemo, useState } from 'react';
import { Badge, Filter, Mail, MapPin, Phone, RefreshCw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useQuotes, useUpdateQuoteStatus } from '@/hooks/useQuotes';
import type { QuoteRecord, QuoteStatus } from '@/services/quotes';
import { quoteStatusLabels } from '@/utils/quotes';

const FILTER_OPTIONS: Array<{ value: QuoteStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'new', label: 'Novas' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'archived', label: 'Arquivadas' },
];

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString('pt-BR');
};

const statusStyles: Record<QuoteStatus, string> = {
  new: 'bg-gabardo-light-blue/30 text-gabardo-light-blue',
  in_progress: 'bg-amber-400/20 text-amber-200',
  completed: 'bg-emerald-400/20 text-emerald-200',
  archived: 'bg-white/10 text-white/60',
};

function StatusBadge({ status }: { status: QuoteStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${statusStyles[status]}`}
    >
      <Badge className="h-3 w-3" />
      {quoteStatusLabels[status]}
    </span>
  );
}

function QuoteCard({ quote, onChangeStatus }: { quote: QuoteRecord; onChangeStatus: (status: QuoteStatus) => void }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{quote.name}</h2>
          {quote.company && <p className="text-sm text-white/60">{quote.company}</p>}
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/50">Registrado em {formatDateTime(quote.created_at)}</p>
        </div>
        <StatusBadge status={quote.status} />
      </header>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/60">Contato</h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Mail className="h-4 w-4 text-white/40" />
            <a href={`mailto:${quote.email}`} className="hover:underline">
              {quote.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Phone className="h-4 w-4 text-white/40" />
            <a href={`tel:${quote.phone}`} className="hover:underline">
              {quote.phone}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/60">Veículo</h3>
          <p className="text-sm text-white/80">
            {quote.vehicle_brand} {quote.vehicle_model} — {quote.vehicle_year}
          </p>
          <p className="text-sm text-white/60">Categoria: {quote.vehicle_category}</p>
          <p className="text-sm text-white/60">Valor declarado: {quote.vehicle_value}</p>
          {quote.vehicle_observation && <p className="text-sm text-white/60">Observações: {quote.vehicle_observation}</p>}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/60">Origem e destino</h3>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4 text-white/40" />
            {quote.origin_city}/{quote.origin_state}
          </p>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4 rotate-180 text-white/40" />
            {quote.destination_city}/{quote.destination_state}
          </p>
          {quote.route_observation && <p className="text-sm text-white/60">Observações: {quote.route_observation}</p>}
        </div>
      </section>

      {quote.message && (
        <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-xs uppercase tracking-[0.15em] text-white/60">Mensagem adicional</h3>
          <p className="mt-2 text-sm text-white/70">{quote.message}</p>
        </section>
      )}

      <footer className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs uppercase tracking-[0.15em] text-white/50">
          Política de privacidade {quote.privacy_accepted ? 'aceita' : 'não aceita'}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {quote.status !== 'new' && (
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              onClick={() => onChangeStatus('new')}
            >
              Marcar como novo
            </Button>
          )}
          {quote.status !== 'in_progress' && (
            <Button
              type="button"
              variant="outline"
              className="border-gabardo-light-blue/40 text-gabardo-light-blue hover:border-gabardo-light-blue hover:bg-gabardo-light-blue/20"
              onClick={() => onChangeStatus('in_progress')}
            >
              Em andamento
            </Button>
          )}
          {quote.status !== 'completed' && (
            <Button
              type="button"
              className="bg-emerald-500 text-neutral-900 hover:bg-emerald-500/90"
              onClick={() => onChangeStatus('completed')}
            >
              Concluído
            </Button>
          )}
          {quote.status !== 'archived' && (
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              onClick={() => onChangeStatus('archived')}
            >
              Arquivar
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}

export default function AdminQuotesList() {
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: quotes, isLoading, isError, error, refetch, isRefetching } = useQuotes(
    filter === 'all' ? undefined : filter
  );
  const updateStatus = useUpdateQuoteStatus();

  const filteredQuotes = useMemo(() => {
    if (!quotes) {
      return [] as QuoteRecord[];
    }

    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return quotes;
    }

    return quotes.filter((quote) => {
      const valuesToSearch = [
        quote.name,
        quote.email,
        quote.phone,
        quote.company ?? '',
        `${quote.origin_city} ${quote.origin_state}`,
        `${quote.destination_city} ${quote.destination_state}`,
        `${quote.vehicle_brand} ${quote.vehicle_model}`,
      ];

      return valuesToSearch.some((value) => value.toLowerCase().includes(term));
    });
  }, [quotes, searchTerm]);

  const handleStatusChange = (id: string, status: QuoteStatus) => {
    updateStatus.mutate({ id, status });
  };

  const renderEmptyState = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Nenhuma solicitação encontrada</h2>
      <p className="mt-3 text-sm text-white/60">
        Assim que um visitante enviar o formulário de orçamento, ele aparecerá automaticamente aqui.
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

  const renderErrorState = () => (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
      Não foi possível carregar os orçamentos.
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

  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`quote-skeleton-${index}`}
          className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        />
      ))}
    </div>
  );

  const renderList = () => {
    if (isLoading) {
      return renderSkeleton();
    }

    if (isError) {
      return renderErrorState();
    }

    if (!filteredQuotes.length) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-4">
        {filteredQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} onChangeStatus={(status) => handleStatusChange(quote.id, status)} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Orçamentos recebidos</h1>
          <p className="max-w-2xl text-white/70">
            Acompanhe todas as solicitações de transporte enviadas pelo site. A lista é atualizada automaticamente com novas
            submissões e você pode mudar o status conforme o atendimento evolui.
          </p>
          <div className="text-xs uppercase tracking-[0.15em] text-white/50">
            {isRefetching ? 'Atualizando dados…' : `Total listado: ${filteredQuotes.length}`}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Search className="h-4 w-4 text-white/40" />
            <input
              type="search"
              placeholder="Buscar por nome, e-mail ou cidade"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Filter className="h-4 w-4 text-white/40" />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as QuoteStatus | 'all')}
              className="bg-transparent text-sm text-white focus:outline-none"
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-neutral-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="button"
            variant="outline"
            className="gap-2 border-white/20 text-white hover:border-white/40 hover:bg-white/10"
            onClick={() => refetch()}
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin text-gabardo-light-blue' : 'text-white/70'}`} />
            Atualizar dados
          </Button>
        </div>
      </header>

      {renderList()}
    </div>
  );
}
