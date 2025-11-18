import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { requireAdminSession } from '@/lib/adminAccess';
import { extractClientIp, logAdminAction } from '@/lib/adminAudit';
import type { Database } from '@/integrations/supabase/type';
import { postSchema, type PostFormData } from '@/schemas/post';

type PostInsert = Database['public']['Tables']['posts']['Insert'];

function normalizePostPayload(data: PostFormData, authorId: string | null): PostInsert {
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

export async function POST(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const payload = (await request.json().catch(() => null)) as unknown;
  const parsed = postSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload inválido.', details: parsed.error.format() }, { status: 400 });
  }

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const postData = normalizePostPayload(parsed.data, currentAdminId);

  const { data: createdPost, error } = await supabase
    .from('posts')
    .insert(postData)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Não foi possível criar o post.', details: error.message }, { status: 500 });
  }

  if (postData.published) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${createdPost.slug}`);
  }

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.blog.post.create',
    description: 'Criação de post do blog',
    route: '/api/admin/blog/posts',
    method: 'POST',
    entity: { type: 'post', id: createdPost.id },
    metadata: {
      slug: createdPost.slug,
      published: postData.published,
      category: postData.category,
      tags: postData.tags,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ post: createdPost });
}
