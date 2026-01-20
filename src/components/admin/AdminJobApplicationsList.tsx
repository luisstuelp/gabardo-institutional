'use client';

import { useMemo, useState } from 'react';
import { Badge, Filter, Mail, Phone, RefreshCw, Search, FileText, MessageSquare, Trash, Briefcase } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useJobApplications, useDeleteJobApplication, useUpdateJobApplicationStatus } from '@/hooks/useJobApplications';
import type { JobApplicationRecord, JobApplicationStatus } from '@/services/jobApplications';
import { jobApplicationStatusLabels } from '@/utils/jobApplications';

const FILTER_OPTIONS: Array<{ value: JobApplicationStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'new', label: 'Novas' },
  { value: 'in_review', label: 'Em Análise' },
  { value: 'contacted', label: 'Contactados' },
  { value: 'rejected', label: 'Rejeitados' },
  { value: 'hired', label: 'Contratados' },
  { value: 'archived', label: 'Arquivadas' },
];

const statusStyles: Record<JobApplicationStatus, string> = {
  new: 'bg-gabardo-light-blue/30 text-gabardo-light-blue',
  in_review: 'bg-amber-400/20 text-amber-200',
  contacted: 'bg-purple-400/20 text-purple-200',
  rejected: 'bg-red-400/20 text-red-200',
  hired: 'bg-emerald-400/20 text-emerald-200',
  archived: 'bg-white/10 text-white/60',
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('pt-BR');
}

function formatFileSize(bytes: number | null): string {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function StatusBadge({ status }: { status: JobApplicationStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${statusStyles[status]}`}>
      <Badge className="h-3 w-3" />
      {jobApplicationStatusLabels[status]}
    </span>
  );
}

function JobApplicationCard({
  application,
  onChangeStatus,
  onDelete,
}: {
  application: JobApplicationRecord;
  onChangeStatus: (status: JobApplicationStatus) => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{application.name}</h2>
          {application.position_interest && (
            <p className="flex items-center gap-2 text-sm text-white/60">
              <Briefcase className="h-4 w-4" />
              {application.position_interest}
            </p>
          )}
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">
            Recebida em {formatDateTime(application.created_at)}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </header>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Contato</h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Mail className="h-4 w-4 text-white/40" />
            <a href={`mailto:${application.email}`} className="hover:underline">
              {application.email}
            </a>
          </div>
          {application.phone && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone className="h-4 w-4 text-white/40" />
              <a href={`tel:${application.phone}`} className="hover:underline">
                {application.phone}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Currículo</h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <FileText className="h-4 w-4 text-white/40" />
            <span className="truncate max-w-[200px]">{application.resume_filename}</span>
          </div>
          <p className="text-xs text-white/50">
            Tamanho: {formatFileSize(application.resume_size_bytes)}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Privacidade</h3>
          <p className="text-sm text-white/70">
            Consentimento LGPD: {application.privacy_accepted ? 'Aceito' : 'Não informado'}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
          <MessageSquare className="h-4 w-4 text-white/40" />
          Mensagem / Carta de Apresentação
        </h3>
        <p className="mt-2 text-sm text-white/70 whitespace-pre-line">{application.message}</p>
      </section>

      <footer className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40">
          Atualizado em {formatDateTime(application.updated_at)}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {application.status !== 'new' && (
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              onClick={() => onChangeStatus('new')}
            >
              Marcar como nova
            </Button>
          )}
          {application.status !== 'in_review' && (
            <Button
              type="button"
              variant="outline"
              className="border-amber-400/40 text-amber-200 hover:border-amber-400 hover:bg-amber-400/20"
              onClick={() => onChangeStatus('in_review')}
            >
              Em Análise
            </Button>
          )}
          {application.status !== 'contacted' && (
            <Button
              type="button"
              variant="outline"
              className="border-purple-400/40 text-purple-200 hover:border-purple-400 hover:bg-purple-400/20"
              onClick={() => onChangeStatus('contacted')}
            >
              Contactado
            </Button>
          )}
          {application.status !== 'hired' && (
            <Button
              type="button"
              className="bg-emerald-500 text-neutral-900 hover:bg-emerald-500/90"
              onClick={() => onChangeStatus('hired')}
            >
              Contratado
            </Button>
          )}
          {application.status !== 'rejected' && (
            <Button
              type="button"
              variant="outline"
              className="border-red-400/40 text-red-200 hover:border-red-400 hover:bg-red-400/20"
              onClick={() => onChangeStatus('rejected')}
            >
              Rejeitado
            </Button>
          )}
          {application.status !== 'archived' && (
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:!border-white hover:!bg-white hover:!text-neutral-900"
              onClick={() => onChangeStatus('archived')}
            >
              Arquivar
            </Button>
          )}
          <Button
            type="button"
            className="bg-red-500 text-white hover:bg-red-500/90"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
            Excluir
          </Button>
        </div>
      </footer>
    </article>
  );
}

export default function AdminJobApplicationsList() {
  const [filter, setFilter] = useState<JobApplicationStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: applications, isLoading, isError, error, refetch, isRefetching } = useJobApplications(
    filter === 'all' ? undefined : filter,
  );
  const updateStatus = useUpdateJobApplicationStatus();
  const deleteApplicationMutation = useDeleteJobApplication();

  const filteredApplications = useMemo(() => {
    if (!applications) {
      return [] as JobApplicationRecord[];
    }

    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return applications;
    }

    return applications.filter((application) => {
      const valuesToSearch = [
        application.name,
        application.email,
        application.phone ?? '',
        application.position_interest ?? '',
        application.message,
        application.resume_filename,
      ];

      return valuesToSearch.some((value) => value.toLowerCase().includes(term));
    });
  }, [applications, searchTerm]);

  const handleStatusChange = (id: string, status: JobApplicationStatus) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: string) => {
    const shouldDelete =
      typeof window !== 'undefined'
        ? window.confirm('Tem certeza que deseja excluir esta candidatura? Essa ação não pode ser desfeita.')
        : false;

    if (shouldDelete) {
      deleteApplicationMutation.mutate(id);
    }
  };

  const renderEmptyState = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Nenhuma candidatura encontrada</h2>
      <p className="mt-3 text-sm text-white/60">
        Assim que um candidato enviar seu currículo pelo formulário Trabalhe Conosco, a candidatura aparecerá automaticamente aqui.
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
      Não foi possível carregar as candidaturas.
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
          key={`application-skeleton-${index}`}
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

    if (!filteredApplications.length) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <JobApplicationCard
            key={application.id}
            application={application}
            onChangeStatus={(status) => handleStatusChange(application.id, status)}
            onDelete={() => handleDelete(application.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Candidaturas - Trabalhe Conosco</h1>
          <p className="max-w-2xl text-white/60">
            Gerencie todas as candidaturas recebidas pelo formulário Trabalhe Conosco. Atualize os status conforme o processo seletivo evolui.
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">
            {isRefetching ? 'Atualizando dados…' : `Total listado: ${filteredApplications.length}`}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Search className="h-4 w-4 text-white/40" />
            <input
              type="search"
              placeholder="Buscar por nome, e-mail ou área"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Filter className="h-4 w-4 text-white/40" />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as JobApplicationStatus | 'all')}
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
