'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, X, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

import { useCreatePost, useUpdatePost } from '@/hooks/usePosts';
import type { Tables } from '@/integrations/supabase/types';
import type { PostFormData } from '@/schemas/post';
import { supabase } from '@/integrations/supabase/client';

interface AdminPostFormProps {
  initialData?: Tables<'posts'>;
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  published: boolean;
};

const DEFAULT_STATE: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  content: '',
  published: false,
};

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'content-assets';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export default function AdminPostForm({ initialData }: AdminPostFormProps) {
  const router = useRouter();
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  const [formState, setFormState] = useState<FormState>(() => {
    if (!initialData) {
      return DEFAULT_STATE;
    }

    return {
      title: initialData.title ?? '',
      slug: initialData.slug ?? '',
      excerpt: initialData.excerpt ?? '',
      coverImage: initialData.cover_image ?? '',
      content: initialData.content ?? '',
      published: Boolean(initialData.published),
    };
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setFormState({
      title: initialData.title ?? '',
      slug: initialData.slug ?? '',
      excerpt: initialData.excerpt ?? '',
      coverImage: initialData.cover_image ?? '',
      content: initialData.content ?? '',
      published: Boolean(initialData.published),
    });
    setSlugManuallyEdited(true);
  }, [initialData]);

  const isSubmitting = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const { name, value } = target;

    const nextValue = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : value;

    setFormState((previous) => ({
      ...previous,
      [name]: nextValue,
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormState((previous) => ({
      ...previous,
      title: value,
      slug: slugManuallyEdited ? previous.slug : slugify(value),
    }));
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    setFormState((previous) => ({
      ...previous,
      slug: slugify(event.target.value),
    }));
  };

  const handleCoverFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadError(null);
    setIsUploadingCover(true);

    try {
      const fileExt = file.name.split('.').pop() ?? 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadErrorResponse } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadErrorResponse) {
        throw uploadErrorResponse;
      }

      const { data: publicUrlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      setFormState((previous) => ({
        ...previous,
        coverImage: publicUrlData.publicUrl,
      }));
    } catch (error) {
      console.error('Failed to upload cover image', error);
      setUploadError('Não foi possível enviar a imagem. Verifique o bucket de Storage e tente novamente.');
    } finally {
      setIsUploadingCover(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: PostFormData = {
      title: formState.title.trim(),
      slug: formState.slug.trim(),
      content: formState.content.trim(),
      excerpt: formState.excerpt.trim() || undefined,
      cover_image: formState.coverImage.trim() || undefined,
      published: formState.published,
    };

    try {
      if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, post: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      router.replace('/admin/blog/posts');
      router.refresh();
    } catch (error) {
      console.error('Failed to save post', error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <header className="space-y-2">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.replace('/admin/blog/posts')}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Fechar <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">
            {initialData ? 'Editar post do blog' : 'Novo post do blog'}
          </h1>
          <p className="text-white/60">
            Preencha os campos abaixo para {initialData ? 'atualizar' : 'publicar'} conteúdos que serão exibidos na página do blog.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formState.title}
              onChange={handleTitleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Digite o título do post"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formState.slug}
              onChange={handleSlugChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="exemplo-de-slug"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Excerpt (opcional)
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formState.excerpt}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Resumo curto exibido nas listagens"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="coverImage" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              URL da imagem de capa (opcional)
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="url"
              value={formState.coverImage}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="https://..."
            />
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                Enviar imagem (opcional)
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 transition-colors hover:border-white/40">
                  <UploadCloud className="h-4 w-4" />
                  {isUploadingCover ? 'Enviando...' : 'Selecionar arquivo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverFileChange}
                    disabled={isUploadingCover || isSubmitting}
                  />
                </label>
                {formState.coverImage && (
                  <a
                    href={formState.coverImage}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-xs text-gabardo-light-blue underline"
                  >
                    Ver imagem atual
                  </a>
                )}
              </div>
              {uploadError && <p className="text-xs text-red-300">{uploadError}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            Conteúdo (JSON ou Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            value={formState.content}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            rows={18}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            placeholder="Insira o conteúdo estruturado"
          />
          <p className="text-xs text-white/40">
            Este campo aceita texto simples, Markdown ou JSON conforme a estrutura utilizada na renderização do blog.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <label htmlFor="published" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            <input
              id="published"
              name="published"
              type="checkbox"
              checked={formState.published}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-white/30 bg-neutral-900 text-gabardo-light-blue focus:ring-gabardo-light-blue"
            />
            Publicar imediatamente
          </label>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            {formState.published ? 'Visível no blog' : 'Salvo como rascunho'}
          </span>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-gabardo-light-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition-colors duration-200 hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {initialData ? 'Salvar alterações' : 'Publicar post'}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
