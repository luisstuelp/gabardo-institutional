'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, X, UploadCloud, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  category: string;
  tags: string;
  author: string;
  readTime: string;
  featured: boolean;
  seoDescription: string;
  seoKeywords: string;
};

const DEFAULT_STATE: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  content: '',
  published: false,
  category: 'Sustentabilidade',
  tags: '',
  author: 'Equipe Gabardo',
  readTime: '5 min',
  featured: false,
  seoDescription: '',
  seoKeywords: '',
};

const CATEGORIES = [
  'Sustentabilidade',
  'Inovação',
  'Logística',
  'Tecnologia',
  'Transporte de Veículos',
  'Segurança',
];

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'content-images';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminPostFormOptimized({ initialData }: AdminPostFormProps) {
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
      category: initialData.category ?? 'Sustentabilidade',
      tags: (initialData.tags || []).join(', '),
      author: initialData.author ?? 'Equipe Gabardo',
      readTime: initialData.read_time ?? '5 min',
      featured: initialData.featured ?? false,
      seoDescription: initialData.seo_description ?? '',
      seoKeywords: (initialData.seo_keywords || []).join(', '),
    };
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [seoExpanded, setSeoExpanded] = useState(false);

  const isSubmitting = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name, value } = target;

    const nextValue = target instanceof HTMLInputElement && target.type === 'checkbox'
      ? target.checked
      : value;

    setFormState((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    if (name === 'slug') {
      setSlugManuallyEdited(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setFormState((previous) => ({
      ...previous,
      title: newTitle,
      slug: slugManuallyEdited ? previous.slug : slugify(newTitle),
    }));
  };

  const handleCoverFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploadingCover(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      setFormState((previous) => ({ ...previous, coverImage: publicUrl }));
    } catch (error) {
      console.error('Failed to upload cover image', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setUploadError(`Não foi possível enviar a imagem. Verifique se o bucket "${STORAGE_BUCKET}" existe no Supabase Storage e é público. Erro: ${errorMessage}`);
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
      category: formState.category || undefined,
      tags: formState.tags.split(',').map(t => t.trim()).filter(Boolean),
      author: formState.author.trim() || undefined,
      read_time: formState.readTime.trim() || undefined,
      featured: formState.featured,
      seo_description: formState.seoDescription.trim() || undefined,
      seo_keywords: formState.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
    };

    try {
      if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, post: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      console.log('Post saved successfully:', { slug: payload.slug, published: payload.published });

      // If published, give option to view
      if (payload.published) {
        const viewPost = confirm(`Post ${initialData ? 'atualizado' : 'criado'} com sucesso! Deseja visualizar o post publicado?`);
        if (viewPost) {
          window.open(`/blog/${payload.slug}`, '_blank');
        }
      }

      router.replace('/admin/blog/posts');
      router.refresh();
    } catch (error) {
      console.error('Failed to save post', error);
      alert('Erro ao salvar post. Verifique o console para mais detalhes.');
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
            Preencha os campos abaixo de forma simples e direta. Os campos com (*) são obrigatórios.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SEÇÃO 1: INFORMAÇÕES PRINCIPAIS */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            📝 Informações Principais
          </h2>

          {/* Título */}
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-white">
              Título do Post *
              <span className="text-xs text-white/40">(será exibido como título principal)</span>
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
              placeholder="Ex: Gabardo: A Primeira Transportadora Carbono Negativo do Mundo"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="flex items-center gap-2 text-sm font-medium text-white">
              URL Amigável (Slug) *
              <span className="text-xs text-white/40">(gerado automaticamente, pode editar)</span>
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formState.slug}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="primeira-transportadora-carbono-negativo"
            />
            <p className="text-xs text-white/40">
              Este é o link do post: /blog/{formState.slug || 'seu-slug-aqui'}
            </p>
          </div>

          {/* Resumo (Excerpt) */}
          <div className="space-y-2">
            <label htmlFor="excerpt" className="flex items-center gap-2 text-sm font-medium text-white">
              Resumo Curto
              <span className="text-xs text-white/40">(aparece nas listas de posts)</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formState.excerpt}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Digite um resumo atrativo de 1-2 frases que convide à leitura..."
            />
          </div>
        </div>

        {/* SEÇÃO 2: CLASSIFICAÇÃO */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            🏷️ Classificação e Metadados
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Categoria */}
            <div className="space-y-2">
              <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-white">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                value={formState.category}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tempo de Leitura */}
            <div className="space-y-2">
              <label htmlFor="readTime" className="flex items-center gap-2 text-sm font-medium text-white">
                Tempo de Leitura
                <span className="text-xs text-white/40">(ex: 5 min, 10 min)</span>
              </label>
              <input
                id="readTime"
                name="readTime"
                type="text"
                value={formState.readTime}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                placeholder="5 min"
              />
            </div>
          </div>

          {/* Autor */}
          <div className="space-y-2">
            <label htmlFor="author" className="flex items-center gap-2 text-sm font-medium text-white">
              Autor
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formState.author}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Equipe Gabardo"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-white">
              Tags
              <span className="text-xs text-white/40">(separar por vírgula)</span>
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formState.tags}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="carbono negativo, sustentabilidade, logística verde, ISO"
            />
          </div>
        </div>

        {/* SEÇÃO 3: IMAGEM DE CAPA */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            🖼️ Imagem de Capa
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-white">
              Upload de Imagem
              <span className="text-xs text-white/40">(formato JPG, PNG ou WebP)</span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-4 text-sm text-white/70 transition-colors hover:border-white/40 hover:bg-white/10">
                <UploadCloud className="h-5 w-5" />
                {isUploadingCover ? 'Enviando...' : 'Selecionar Imagem'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverFileChange}
                  disabled={isUploadingCover || isSubmitting}
                />
              </label>

              {formState.coverImage && (
                <div className="flex items-center gap-2">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={formState.coverImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <a
                    href={formState.coverImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gabardo-light-blue underline"
                  >
                    Ver imagem completa
                  </a>
                </div>
              )}
            </div>

            {uploadError && (
              <p className="text-sm text-red-300 bg-red-900/20 px-3 py-2 rounded-lg">{uploadError}</p>
            )}

            <div className="text-xs text-white/40 bg-white/5 p-3 rounded-lg">
              <strong>Dica:</strong> Use imagens de alta qualidade (mínimo 1200x600 pixels) para melhor visualização.
            </div>
          </div>
        </div>

        {/* SEÇÃO 4: CONTEÚDO */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            ✍️ Conteúdo do Post *
          </h2>

          <div className="space-y-2">
            <textarea
              id="content"
              name="content"
              value={formState.content}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={20}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
              placeholder="Cole aqui o texto completo do post..."
            />
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-sm text-blue-200">
              <p className="font-semibold mb-2">💡 Como formatar o conteúdo:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Cole o texto completo diretamente aqui</li>
                <li>Use parágrafos vazios para separar seções</li>
                <li>Mantenha títulos e subtítulos destacados com maiúsculas</li>
                <li>O sistema vai processar automaticamente a formatação</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEÇÃO 5: SEO (COLAPSÁVEL) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <button
            type="button"
            onClick={() => setSeoExpanded(!seoExpanded)}
            className="w-full p-6 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              🔍 SEO e Otimização (Opcional)
            </h2>
            {seoExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          {seoExpanded && (
            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="seoDescription" className="flex items-center gap-2 text-sm font-medium text-white">
                  Descrição SEO
                  <span className="text-xs text-white/40">(aparece no Google)</span>
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  value={formState.seoDescription}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={2}
                  maxLength={160}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                  placeholder="Descrição otimizada para mecanismos de busca (máx. 160 caracteres)"
                />
                <p className="text-xs text-white/40">{formState.seoDescription.length}/160 caracteres</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="seoKeywords" className="flex items-center gap-2 text-sm font-medium text-white">
                  Palavras-chave SEO
                  <span className="text-xs text-white/40">(separar por vírgula)</span>
                </label>
                <input
                  id="seoKeywords"
                  name="seoKeywords"
                  type="text"
                  value={formState.seoKeywords}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gabardo-light-blue focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue/40"
                  placeholder="carbono negativo, sustentabilidade, Gabardo, transporte verde"
                />
              </div>
            </div>
          )}
        </div>

        {/* SEÇÃO 6: OPÇÕES DE PUBLICAÇÃO */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            🚀 Opções de Publicação
          </h2>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <input
              id="published"
              name="published"
              type="checkbox"
              checked={formState.published}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-5 w-5 rounded border-white/30 bg-neutral-900 text-gabardo-light-blue focus:ring-gabardo-light-blue"
            />
            <label htmlFor="published" className="flex-1">
              <div className="font-semibold text-white">Publicar Imediatamente</div>
              <div className="text-sm text-white/60">
                {formState.published 
                  ? 'O post estará visível no site assim que salvar'
                  : 'O post será salvo como rascunho (não visível publicamente)'}
              </div>
            </label>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formState.featured}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-5 w-5 rounded border-white/30 bg-neutral-900 text-gabardo-light-blue focus:ring-gabardo-light-blue"
            />
            <label htmlFor="featured" className="flex-1">
              <div className="font-semibold text-white">Post em Destaque</div>
              <div className="text-sm text-white/60">
                Este post aparecerá em posição destacada na página do blog
              </div>
            </label>
          </div>
        </div>

        {/* BOTÕES FINAIS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.replace('/admin/blog/posts')}
            disabled={isSubmitting}
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-gabardo-light-blue px-8 py-3 text-sm font-semibold text-neutral-900 transition-colors duration-200 hover:bg-gabardo-light-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {initialData ? 'Salvar Alterações' : 'Publicar Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
