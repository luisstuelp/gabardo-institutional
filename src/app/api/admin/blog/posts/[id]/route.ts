import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { requireAdminSession } from '@/lib/adminAccess';
import { extractClientIp, logAdminAction } from '@/lib/adminAudit';
import type { Database } from '@/integrations/supabase/type';
import { postSchema, type PostFormData } from '@/schemas/post';

type PostMutableFields = Database['public']['Tables']['posts']['Row'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

function normalizePostPayload(data: PostFormData, authorId: string | null): PostUpdate {
  return {
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt ?? null,
    cover_image: data.cover_image ?? null,
    published: data.published ?? false,
    category: data.category ?? null,
    tags: data.tags && data.tags.length > 0 ? data.tags : null,
    author: data.author ?? null,
    author_id: authorId,
    read_time: data.read_time ?? null,
    featured: data.featured ?? false,
    seo_description: data.seo_description ?? null,
    seo_keywords: data.seo_keywords && data.seo_keywords.length > 0 ? data.seo_keywords : null,
  };
}

function diffFields(previous: PostMutableFields, next: PostUpdate): string[] {
  const changed: string[] = [];

  for (const key of Object.keys(next) as Array<keyof PostUpdate>) {
    const prevValue = previous[key as keyof PostMutableFields];
    const nextValue = next[key];

    if (JSON.stringify(prevValue) !== JSON.stringify(nextValue)) {
      changed.push(key);
    }
  }

  return changed;
}

type RouteContext = { params?: Promise<Record<string, string | string[] | undefined>> };

export async function PUT(request: NextRequest, context: RouteContext) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const params = context.params ? await context.params : undefined;
  const idValue = params?.id;

  if (!idValue || Array.isArray(idValue)) {
    return NextResponse.json({ error: 'Parâmetro "id" inválido.' }, { status: 400 });
  }

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const { data: existingPost, error: existingError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', idValue)
    .single();

  if (existingError || !existingPost) {
    return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 });
  }

  const payload = (await request.json().catch(() => null)) as unknown;
  const parsed = postSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload inválido.', details: parsed.error.format() }, { status: 400 });
  }

  const normalized = normalizePostPayload(parsed.data, existingPost.author_id ?? currentAdminId);
  const changedFields = diffFields(existingPost, normalized);

  const { data: updatedPost, error: updateError } = await supabase
    .from('posts')
    .update(normalized)
    .eq('id', idValue)
    .select('*')
    .single();

  if (updateError || !updatedPost) {
    return NextResponse.json({ error: 'Não foi possível atualizar o post.', details: updateError?.message }, { status: 500 });
  }

  if (existingPost.published || updatedPost.published) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${existingPost.slug}`);
    revalidatePath(`/blog/${updatedPost.slug}`);
  }

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.blog.post.update',
    description: 'Atualização de post do blog',
    route: `/api/admin/blog/posts/${idValue}`,
    method: 'PUT',
    entity: { type: 'post', id: idValue },
    metadata: {
      slugBefore: existingPost.slug,
      slugAfter: updatedPost.slug,
      published: updatedPost.published,
      changedFields,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ post: updatedPost });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const params = context.params ? await context.params : undefined;
  const id = params?.id;

  if (!id || Array.isArray(id)) {
    return NextResponse.json({ error: 'Parâmetro "id" inválido.' }, { status: 400 });
  }

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const { data: existingPost, error: existingError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (existingError || !existingPost) {
    return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: 'Não foi possível excluir o post.', details: deleteError.message }, { status: 500 });
  }

  if (existingPost.published) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${existingPost.slug}`);
  }

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.blog.post.delete',
    description: 'Exclusão de post do blog',
    route: `/api/admin/blog/posts/${id}`,
    method: 'DELETE',
    entity: { type: 'post', id },
    metadata: {
      slug: existingPost.slug,
      title: existingPost.title,
      wasPublished: existingPost.published,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ success: true });
}
