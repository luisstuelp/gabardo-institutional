'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Loader2, Save, UploadCloud, X } from 'lucide-react';
import { motion } from 'framer-motion';

import { useCreateMidia, useUpdateMidia } from '@/hooks/useMidia';
import type { Tables } from '@/integrations/supabase/types';
import type { MidiaFormData } from '@/schemas/midia';
import { supabase } from '@/integrations/supabase/client';

interface AdminMidiaFormProps {
  initialData?: Tables<'midia'>;
}

type FormState = {
  title: string;
  source: string;
  url: string;
  description: string;
  thumbnail: string;
  publishedDate: string;
};

const DEFAULT_STATE: FormState = {
  title: '',
  source: '',
  url: '',
  description: '',
  thumbnail: '',
  publishedDate: '',
};

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'content-images';

function normalizeDate(value: string): string {
  if (!value) {
    return '';
  }

  const parsed = value.includes('T') ? new Date(value) : new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  const year = parsed.getUTCFullYear();
  const month = String(parsed.getUTCMonth() + 1).padStart(2, '0');
  const day = String(parsed.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function AdminMidiaForm({ initialData }: AdminMidiaFormProps) {
  const router = useRouter();
  const createMutation = useCreateMidia();
  const updateMutation = useUpdateMidia();

  const [formState, setFormState] = useState<FormState>(() => {
    if (!initialData) {
      return DEFAULT_STATE;
    }

    return {
      title: initialData.title ?? '',
      source: initialData.source ?? '',
      url: initialData.url ?? '',
      description: initialData.description ?? '',
      thumbnail: initialData.thumbnail ?? '',
      publishedDate: normalizeDate(initialData.published_date ?? ''),
    };
  });
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setFormState({
      title: initialData.title ?? '',
      source: initialData.source ?? '',
      url: initialData.url ?? '',
      description: initialData.description ?? '',
      thumbnail: initialData.thumbnail ?? '',
      publishedDate: normalizeDate(initialData.published_date ?? ''),
    });
  }, [initialData]);

  const isSubmitting = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadError(null);
    setIsUploadingThumb(true);

    try {
      const fileExt = file.name.split('.').pop() ?? 'jpg';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `midia/${fileName}`;

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
        thumbnail: publicUrlData.publicUrl,
      }));
    } catch (error) {
      console.error('Failed to upload media thumbnail', error);
      setUploadError('Não foi possível enviar a imagem. Verifique o bucket de Storage e tente novamente.');
    } finally {
      setIsUploadingThumb(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: MidiaFormData = {
      title: formState.title.trim(),
      source: formState.source.trim(),
      url: formState.url.trim(),
      description: formState.description.trim() || undefined,
      thumbnail: formState.thumbnail.trim() || undefined,
      published_date: formState.publishedDate ? new Date(formState.publishedDate) : undefined,
    };

    try {
      if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, midia: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      router.replace('/admin/midia/artigos');
      router.refresh();
    } catch (error) {
      console.error('Failed to save media article', error);
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
            onClick={() => router.replace('/admin/midia/artigos')}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Fechar <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">
            {initialData ? 'Editar artigo de mídia' : 'Novo artigo de mídia'}
          </h1>
          <p className="text-white/60">
            Informe os detalhes do destaque que será exibido na página de mídia da Gabardo.
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
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Digite o título do artigo"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="source" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Fonte / Veículo
            </label>
            <input
              id="source"
              name="source"
              type="text"
              value={formState.source}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Ex.: Revista Logística"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              URL do artigo
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={formState.url}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnail" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              URL da imagem (opcional)
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              value={formState.thumbnail}
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
                  {isUploadingThumb ? 'Enviando...' : 'Selecionar arquivo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                    disabled={isUploadingThumb || isSubmitting}
                  />
                </label>
                {formState.thumbnail && (
                  <a
                    href={formState.thumbnail}
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
          <label htmlFor="description" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            rows={4}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            placeholder="Resumo do artigo que aparece no site"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="publishedDate" className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            Data de publicação
          </label>
          <div className="relative">
            <input
              id="publishedDate"
              name="publishedDate"
              type="date"
              value={formState.publishedDate}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
            />
            <CalendarIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          </div>
          <p className="text-xs text-white/40">
            Caso deixado em branco, a data será definida automaticamente quando o artigo for criado.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-gabardo-light-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition-colors duration-200 hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {initialData ? 'Salvar alterações' : 'Publicar artigo'}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
