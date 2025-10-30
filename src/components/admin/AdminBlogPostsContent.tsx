'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowUpRight, BadgeCheck, CalendarDays, Loader2, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeletePost, usePosts } from '@/hooks/usePosts';
import type { Tables } from '@/integrations/supabase/types';

export default function AdminBlogPostsContent() {
  const { data: posts, isLoading, isError, error } = usePosts();
  const deleteMutation = useDeletePost();

  const sortedPosts = useMemo(() => {
    if (!posts) {
      return [] as Tables<'posts'>[];
    }

    return [...posts].sort((first, second) => {
      const firstDate = first.created_at ? new Date(first.created_at).getTime() : 0;
      const secondDate = second.created_at ? new Date(second.created_at).getTime() : 0;

      return secondDate - firstDate;
    });
  }, [posts]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`post-skeleton-${index}`}
              className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="h-5 w-32 rounded-full bg-white/10" />
              <div className="mt-4 h-7 w-3/4 rounded-full bg-white/10" />
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
          Não foi possível carregar os posts do blog.
          {error instanceof Error && <p className="mt-2 text-sm text-red-100/80">{error.message}</p>}
        </div>
      );
    }

    if (!sortedPosts.length) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">Nenhum post cadastrado ainda</h2>
          <p className="mt-3 text-sm text-white/60">
            Cadastre um novo conteúdo para o blog e ele aparecerá automaticamente aqui.
          </p>
          <Button asChild className="mt-6">
            <Link href="/admin/blog/posts/novo">Cadastrar primeiro post</Link>
          </Button>
        </div>
      );
    }

    return (
      <section className="space-y-4">
        {sortedPosts.map((post) => {
          const createdAtText = post.created_at
            ? new Date(post.created_at).toLocaleString('pt-BR')
            : 'Sem data';
          const updatedAtText = post.updated_at
            ? new Date(post.updated_at).toLocaleString('pt-BR')
            : null;

          return (
            <article
              key={post.id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/10 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
                  <span className="flex items-center gap-2 text-white/60">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {createdAtText}
                  </span>
                  {updatedAtText && (
                    <span className="flex items-center gap-2 text-white/60">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Atualizado {updatedAtText}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-[0.3em] ${
                      post.published ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-200'
                    }`}
                  >
                    {post.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white md:text-2xl">{post.title}</h2>
                {post.excerpt && <p className="max-w-3xl text-sm text-white/60 md:text-base">{post.excerpt}</p>}
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Slug: {post.slug}</p>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="justify-between gap-2 border-white/15 bg-white/5 text-white transition-colors hover:border-gabardo-light-blue/60 hover:bg-gabardo-light-blue/20 hover:text-white"
                >
                  <Link href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                    Ver publicação
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="justify-center gap-2 bg-gabardo-light-blue text-neutral-900 transition-colors hover:bg-gabardo-light-blue/80"
                >
                  <Link href={`/admin/blog/posts/${post.id}`}>Editar</Link>
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="justify-center gap-2 transition-colors hover:bg-red-500/70"
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir o post "${post.title}"? Esta ação não pode ser desfeita.`)) {
                      deleteMutation.mutate(post.id);
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
          <h1 className="text-3xl font-semibold text-white">Posts do Blog</h1>
          <p className="mt-2 max-w-2xl text-white/60">
            Gerencie os artigos publicados no blog institucional. Os conteúdos listados abaixo são carregados diretamente do
            Supabase.
          </p>
        </div>
        <Button asChild className="flex items-center gap-2 bg-gabardo-light-blue px-6 py-3 text-neutral-900 hover:bg-gabardo-light-blue/90">
          <Link href="/admin/blog/posts/novo">
            <Plus className="h-4 w-4" />
            Novo Post
          </Link>
        </Button>
      </header>

      {renderContent()}
    </div>
  );
}
