'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import {
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShieldOff,
  Trash2,
  UserCog,
  Users2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAdminUsers, useUpdateAdminRole, useDeleteAdminUser, useCreateAdminUser } from '@/hooks/useAdminUsers';

const ROLE_FILTERS: Array<{ value: 'all' | 'admin' | 'user'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'admin', label: 'Administradores' },
  { value: 'user', label: 'Usuários' },
];

function formatDateTime(value: string | null) {
  if (!value) {
    return 'Nunca';
  }

  return new Date(value).toLocaleString('pt-BR');
}

export default function AdminUsersContent() {
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('admin');

  const deferredSearch = useDeferredValue(searchTerm.trim());

  const filters = useMemo(
    () => ({
      role: roleFilter === 'all' ? undefined : roleFilter,
      search: deferredSearch || undefined,
    }),
    [roleFilter, deferredSearch],
  );

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
  } = useAdminUsers(filters);

  const updateRole = useUpdateAdminRole();
  const deleteUser = useDeleteAdminUser();
  const createUser = useCreateAdminUser();
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const summary = data?.summary;
  const users = data?.users ?? [];

  const handleChangeRole = async (userId: string, role: 'admin' | 'user') => {
    setPendingUserId(userId);
    updateRole.mutate(
      { userId, role },
      {
        onSettled: () => {
          setPendingUserId((current) => (current === userId ? null : current));
        },
      },
    );
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !window.confirm(
        'Tem certeza que deseja excluir este usuário? Essa ação removerá o acesso imediatamente e não poderá ser desfeita.',
      )
    ) {
      return;
    }

    setDeletingUserId(userId);

    deleteUser.mutate(userId, {
      onSettled: () => {
        setDeletingUserId((current) => (current === userId ? null : current));
      },
    });
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newUserEmail.trim() || !newUserPassword) {
      return;
    }

    createUser.mutate(
      {
        email: newUserEmail.trim(),
        password: newUserPassword,
        role: newUserRole,
      },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          setNewUserEmail('');
          setNewUserPassword('');
          setNewUserRole('admin');
        },
      },
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`admin-user-skeleton-${index}`}
              className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            />
          ))}
        </div>
      );
    }

    if (isError) {
      const description = error instanceof Error ? error.message : undefined;
      return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
          <h2 className="text-lg font-semibold">Não foi possível carregar os usuários.</h2>
          {description && <p className="mt-2 text-sm text-red-200/80">{description}</p>}
          <Button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 bg-red-500 text-white hover:bg-red-500/90"
          >
            Tentar novamente
          </Button>
        </div>
      );
    }

    if (!users.length) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Nenhum usuário encontrado</h2>
          <p className="mt-2 text-sm text-white/60">
            Ajuste os filtros ou verifique se novos usuários já realizaram login no painel.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {users.map((user) => {
          const isCurrentAdmin = summary?.currentAdminId === user.id;
          const isPending = pendingUserId === user.id;
          const isDeleting = deletingUserId === user.id;
          const showPromote = user.role !== 'admin';
          const showDemote = user.role === 'admin';

          return (
            <article
              key={user.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
                  <span className="flex items-center gap-2 text-white/60">
                    <Users2 className="h-3.5 w-3.5" />
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                  <span className="flex items-center gap-2 text-white/60">
                    <ShieldCheck className={`h-3.5 w-3.5 ${user.role === 'admin' ? 'text-emerald-300' : 'text-white/40'}`} />
                    ID: {user.id}
                  </span>
                  {isCurrentAdmin && (
                    <span className="rounded-full bg-gabardo-light-blue/20 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.3em] text-gabardo-light-blue">
                      Você
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.email ?? 'Usuário sem e-mail confirmado'}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Criado em {formatDateTime(user.created_at)} • Último acesso {formatDateTime(user.last_sign_in_at)}
                  </p>
                  {user.phone && <p className="text-sm text-white/60">Telefone: {user.phone}</p>}
                  {user.confirmed_at && (
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                      E-mail confirmado em {formatDateTime(user.confirmed_at)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  onClick={() => void refetch()}
                  disabled={isRefetching}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
                {showPromote && (
                  <Button
                    type="button"
                    className="bg-gabardo-light-blue text-neutral-900 transition-colors hover:bg-gabardo-light-blue/80"
                    disabled={isPending || isDeleting}
                    onClick={() => handleChangeRole(user.id, 'admin')}
                  >
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    Conceder admin
                  </Button>
                )}
                {showDemote && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                    disabled={isPending || isDeleting || isCurrentAdmin}
                    onClick={() => {
                      if (
                        window.confirm(
                          'Tem certeza que deseja remover o acesso de administrador deste usuário? Esta ação pode ser revertida depois.',
                        )
                      ) {
                        handleChangeRole(user.id, 'user');
                      }
                    }}
                  >
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldOff className="h-4 w-4" />}
                    Remover admin
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-red-500 text-white hover:bg-red-500/90"
                  disabled={isDeleting || isCurrentAdmin}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Excluir usuário
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-semibold text-white">Gestão de Acessos</h1>
        <p className="mt-2 max-w-2xl text-white/60">
          Controle quais usuários têm permissão de administrador no painel. Você pode buscar por e-mail ou ID do usuário e
          conceder ou revogar acessos a qualquer momento.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Usuários cadastrados</p>
          <p className="mt-2 text-3xl font-semibold text-white">{summary?.total ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Administradores</p>
          <p className="mt-2 text-3xl font-semibold text-white">{summary?.admins ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Última atualização</p>
          <p className="mt-2 text-lg text-white/70">{summary ? formatDateTime(summary.retrievedAt) : 'Não carregado'}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Administrador atual</p>
          <p className="mt-2 text-sm text-white/70">
            {summary?.currentAdminId ? `${summary.currentAdminId.slice(0, 8)}…${summary.currentAdminId.slice(-4)}` : 'Desconhecido'}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-lg">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            placeholder="Buscar por e-mail, telefone ou ID"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-neutral-900/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {ROLE_FILTERS.map((filter) => {
            const isActive = roleFilter === filter.value;
            return (
              <Button
                key={filter.value}
                type="button"
                variant={isActive ? 'default' : 'outline'}
                className={
                  isActive
                    ? 'bg-gabardo-light-blue text-neutral-900 hover:bg-gabardo-light-blue/90'
                    : 'border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
                }
                onClick={() => setRoleFilter(filter.value)}
              >
                <UserCog className="h-4 w-4" />
                {filter.label}
              </Button>
            );
          })}
          <Button
            type="button"
            className="flex items-center gap-2 bg-gabardo-light-blue text-neutral-900 hover:bg-gabardo-light-blue/90"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Novo usuário
          </Button>
        </div>
      </section>

      {renderContent()}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 px-4 py-8">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-neutral-950/95 p-8 text-white shadow-2xl">
            <header className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold">Criar novo usuário</h2>
              <p className="text-sm text-white/60">
                Defina as credenciais iniciais e o nível de acesso. Você poderá alterar o cargo posteriormente.
              </p>
            </header>

            <form className="space-y-6" onSubmit={handleCreateUser}>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  <Mail className="h-4 w-4" />
                  E-mail do usuário
                </label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(event) => setNewUserEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                  placeholder="novo.admin@transgabardo.com.br"
                  required
                  disabled={createUser.isPending}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Senha inicial</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(event) => setNewUserPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                  placeholder="Mínimo de 8 caracteres"
                  minLength={8}
                  required
                  disabled={createUser.isPending}
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Cargo inicial</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-all ${
                      newUserRole === 'admin'
                        ? 'border-gabardo-light-blue bg-gabardo-light-blue/20 text-white'
                        : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => setNewUserRole('admin')}
                    disabled={createUser.isPending}
                  >
                    <ShieldCheck className="mb-2 h-4 w-4" />
                    Administrador
                  </button>
                  <button
                    type="button"
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-all ${
                      newUserRole === 'user'
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                        : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => setNewUserRole('user')}
                    disabled={createUser.isPending}
                  >
                    Usuário padrão
                  </button>
                </div>
              </div>

              {createUser.isError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {createUser.error instanceof Error
                    ? createUser.error.message
                    : 'Não foi possível criar o usuário. Tente novamente.'}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setNewUserEmail('');
                    setNewUserPassword('');
                    setNewUserRole('admin');
                  }}
                  disabled={createUser.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gabardo-light-blue text-neutral-900 hover:bg-gabardo-light-blue/90"
                  disabled={createUser.isPending}
                >
                  {createUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Criar usuário
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
