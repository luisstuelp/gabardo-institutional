import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { requireAdminSession } from '@/lib/adminAccess';
import { extractClientIp, logAdminAction } from '@/lib/adminAudit';
import type { Database } from '@/integrations/supabase/type';

const midiaApiSchema = z.object({
  title: z.string().min(1).max(200),
  source: z.string().min(1).max(200),
  url: z.string().url(),
  description: z.string().max(500).optional().nullable(),
  thumbnail: z.string().url().optional().nullable(),
  published_date: z.coerce.date().optional().nullable(),
});

type MidiaInsert = Database['public']['Tables']['midia']['Insert'];

function normalizeMidiaPayload(payload: z.infer<typeof midiaApiSchema>, authorId: string | null): MidiaInsert {
  const publishedDate = payload.published_date ? formatDate(payload.published_date) : null;

  return {
    title: payload.title,
    source: payload.source,
    url: payload.url,
    description: payload.description ?? null,
    thumbnail: payload.thumbnail ?? null,
    published_date: publishedDate,
    author_id: authorId,
  };
}

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function POST(request: NextRequest) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const rawPayload = (await request.json().catch(() => null)) as unknown;
  const parsed = midiaApiSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload inválido.', details: parsed.error.format() }, { status: 400 });
  }

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const normalized = normalizeMidiaPayload(parsed.data, currentAdminId);

  const { data: createdMidia, error } = await supabase
    .from('midia')
    .insert(normalized)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Não foi possível criar o conteúdo de mídia.', details: error.message }, { status: 500 });
  }

  revalidatePath('/midia');

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.midia.article.create',
    description: 'Criação de conteúdo de mídia',
    route: '/api/admin/midia',
    method: 'POST',
    entity: { type: 'midia', id: createdMidia.id },
    metadata: {
      title: createdMidia.title,
      source: createdMidia.source,
      published_date: createdMidia.published_date,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ midia: createdMidia });
}
