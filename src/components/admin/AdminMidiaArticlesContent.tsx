'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowUpRight, CalendarDays, Loader2, Trash2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeleteMidia, useMidia } from '@/hooks/useMidia';
import type { Tables } from '@/integrations/supabase/types';

export default function AdminMidiaArticlesContent() {
  const { data: articles, isLoading, isError, error } = useMidia();
  const deleteMutation = useDeleteMidia();

  const sortedArticles = useMemo(() => {
    if (!articles) {
      return [] as Tables<'midia'>[];
    }

    return [...articles].sort((first, second) => {
      const firstDate = first.published_date ? new Date(first.published_date).getTime() : 0;
      const secondDate = second.published_date ? new Date(second.published_date).getTime() : 0;

      return secondDate - firstDate;
    });
  }, [articles]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`midia-skeleton-${index}`}
              className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="h-5 w-24 rounded-full bg-white/10" />
              <div className="mt-4 h-7 w-2/3 rounded-full bg-white/10" />
              <div className="mt-3 h-4 w-full rounded-full bg-white/5" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          Não foi possível carregar os artigos de mídia.
          {error instanceof Error && <p className="mt-2 text-sm text-red-100/80">{error.message}</p>}
        </div>
      );
    }

    if (!sortedArticles.length) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Nenhum artigo cadastrado ainda</h2>
          <p className="mt-3 text-sm text-white/60">
            Cadastre um novo destaque de mídia e ele aparecerá automaticamente aqui.
          </p>
          <Button asChild className="mt-6">
            <Link href="/admin/midia/artigos/novo">Cadastrar primeiro artigo</Link>
          </Button>
        </div>
      );
    }

    return (
      <section className="space-y-4">
        {sortedArticles.map((article) => {
          const publishedDateText = article.published_date
            ? new Date(article.published_date).toLocaleDateString('pt-BR')
            : 'Sem data definida';

          return (
            <article
              key={article.id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
                  <span className="flex items-center gap-2 text-white/60">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {publishedDateText}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.3em] text-white/70">
                    {article.source}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white md:text-2xl">{article.title}</h2>
                {article.description && (
                  <p className="max-w-3xl text-sm text-white/60 md:text-base">{article.description}</p>
                )}
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 break-all">URL: {article.url}</p>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="justify-between gap-2 border-white/15 bg-white/5 text-white transition-colors hover:border-gabardo-light-blue/60 hover:bg-gabardo-light-blue/20 hover:text-white"
                >
                  <Link href={article.url} target="_blank" rel="noreferrer">
                    Abrir publicação
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="justify-center gap-2 bg-gabardo-light-blue text-neutral-900 transition-colors hover:bg-gabardo-light-blue/80"
                >
                  <Link href={`/admin/midia/artigos/${article.id}`}>Editar</Link>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="justify-center gap-2 transition-colors hover:bg-red-500/70"
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir o artigo "${article.title}"? Esta ação não pode ser desfeita.`)) {
                      deleteMutation.mutate(article.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Excluir
                </Button>
              </div>
            </article>
          );
        })}
      </section>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-white">Artigos de Mídia</h1>
          <p className="mt-2 max-w-2xl text-white/60">
            Visualize e organize os destaques publicados na página de Mídia. Os dados abaixo são carregados diretamente do
            Supabase.
          </p>
        </div>
        <Link href="/admin/midia/artigos/novo">
          <Button className="flex items-center gap-2 bg-gabardo-light-blue px-6 py-3 text-neutral-900 hover:bg-gabardo-light-blue/90">
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </Link>
      </header>

      {renderContent()}
    </div>
  );
}
