'use client';

import { useMemo, useState } from 'react';
import { Badge, Filter, Mail, Phone, RefreshCw, Search, Briefcase, MessageSquare, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useContacts, useDeleteContact, useUpdateContactStatus } from '@/hooks/useContacts';
import type { ContactMessageRecord, ContactStatus } from '@/services/contacts';
import { contactStatusLabels } from '@/utils/contacts';

const FILTER_OPTIONS: Array<{ value: ContactStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'new', label: 'Novas' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluídas' },
  { value: 'archived', label: 'Arquivadas' },
];

const statusStyles: Record<ContactStatus, string> = {
  new: 'bg-gabardo-light-blue/30 text-gabardo-light-blue',
  in_progress: 'bg-amber-400/20 text-amber-200',
  completed: 'bg-emerald-400/20 text-emerald-200',
  archived: 'bg-white/10 text-white/60',
};

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('pt-BR');
}

function StatusBadge({ status }: { status: ContactStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${statusStyles[status]}`}>
      <Badge className="h-3 w-3" />
      {contactStatusLabels[status]}
    </span>
  );
}

function ContactCard({
  contact,
  onChangeStatus,
  onDelete,
}: {
  contact: ContactMessageRecord;
  onChangeStatus: (status: ContactStatus) => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{contact.name}</h2>
          {contact.company && <p className="text-sm text-white/60">{contact.company}</p>}
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">
            Recebida em {formatDateTime(contact.created_at)}
          </p>
        </div>
        <StatusBadge status={contact.status} />
      </header>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Contato</h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Mail className="h-4 w-4 text-white/40" />
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone className="h-4 w-4 text-white/40" />
              <a href={`tel:${contact.phone}`} className="hover:underline">
                {contact.phone}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Contexto</h3>
          {contact.sector && (
            <p className="text-sm text-white/70">Setor: {contact.sector}</p>
          )}
          {contact.interest && (
            <p className="text-sm text-white/70">Interesse: {contact.interest}</p>
          )}
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Briefcase className="h-4 w-4 text-white/40" />
            Assunto: {contact.subject}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.3em] text-white/50">Privacidade</h3>
          <p className="text-sm text-white/70">
            Consentimento LGPD: {contact.privacy_accepted ? 'Aceito' : 'Não informado'}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
          <MessageSquare className="h-4 w-4 text-white/40" />
          Mensagem
        </h3>
        <p className="mt-2 text-sm text-white/70 whitespace-pre-line">{contact.message}</p>
      </section>

      <footer className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40">
          Atualizado em {formatDateTime(contact.updated_at)}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {contact.status !== 'new' && (
            <Button
              type="button"
              variant="ghost"
              className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
              onClick={() => onChangeStatus('new')}
            >
              Marcar como novo
            </Button>
          )}
          {contact.status !== 'in_progress' && (
            <Button
              type="button"
              variant="outline"
              className="border-gabardo-light-blue/40 text-gabardo-light-blue hover:border-gabardo-light-blue hover:bg-gabardo-light-blue/20"
              onClick={() => onChangeStatus('in_progress')}
            >
              Em andamento
            </Button>
          )}
          {contact.status !== 'completed' && (
            <Button
              type="button"
              className="bg-emerald-500 text-neutral-900 hover:bg-emerald-500/90"
              onClick={() => onChangeStatus('completed')}
            >
              Concluído
            </Button>
          )}
          {contact.status !== 'archived' && (
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

export default function AdminContactsList() {
  const [filter, setFilter] = useState<ContactStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: contacts, isLoading, isError, error, refetch, isRefetching } = useContacts(
    filter === 'all' ? undefined : filter,
  );
  const updateStatus = useUpdateContactStatus();
  const deleteContactMutation = useDeleteContact();

  const filteredContacts = useMemo(() => {
    if (!contacts) {
      return [] as ContactMessageRecord[];
    }

    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return contacts;
    }

    return contacts.filter((contact) => {
      const valuesToSearch = [
        contact.name,
        contact.email,
        contact.phone ?? '',
        contact.company ?? '',
        contact.sector ?? '',
        contact.interest ?? '',
        contact.subject,
        contact.message,
      ];

      return valuesToSearch.some((value) => value.toLowerCase().includes(term));
    });
  }, [contacts, searchTerm]);

  const handleStatusChange = (id: string, status: ContactStatus) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: string) => {
    const shouldDelete =
      typeof window !== 'undefined'
        ? window.confirm('Tem certeza que deseja excluir esta mensagem? Essa ação não pode ser desfeita.')
        : false;

    if (shouldDelete) {
      deleteContactMutation.mutate(id);
    }
  };

  const renderEmptyState = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Nenhuma mensagem encontrada</h2>
      <p className="mt-3 text-sm text-white/60">
        Assim que um visitante enviar o formulário de contato, a mensagem aparecerá automaticamente aqui.
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
      Não foi possível carregar as mensagens de contato.
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
          key={`contact-skeleton-${index}`}
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

    if (!filteredContacts.length) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onChangeStatus={(status) => handleStatusChange(contact.id, status)}
            onDelete={() => handleDelete(contact.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Mensagens de Contato</h1>
          <p className="max-w-2xl text-white/60">
            Acompanhe todas as mensagens enviadas pelo formulário de contato. Ajuste os status conforme o atendimento evolui.
          </p>
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">
            {isRefetching ? 'Atualizando dados…' : `Total listado: ${filteredContacts.length}`}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Search className="h-4 w-4 text-white/40" />
            <input
              type="search"
              placeholder="Buscar por nome, e-mail ou assunto"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Filter className="h-4 w-4 text-white/40" />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as ContactStatus | 'all')}
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
