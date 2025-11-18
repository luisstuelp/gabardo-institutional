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

type MidiaRow = Database['public']['Tables']['midia']['Row'];
type MidiaUpdate = Database['public']['Tables']['midia']['Update'];

type RouteContext = {
  params: {
    id: string;
  };
};

function normalizeMidiaPayload(payload: z.infer<typeof midiaApiSchema>, authorId: string | null): MidiaUpdate {
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

function diffFields(previous: MidiaRow, next: MidiaUpdate): string[] {
  const changed: string[] = [];

  for (const key of Object.keys(next) as Array<keyof MidiaUpdate>) {
    const prevValue = previous[key as keyof MidiaRow];
    const nextValue = next[key];

    if (JSON.stringify(prevValue) !== JSON.stringify(nextValue)) {
      changed.push(key);
    }
  }

  return changed;
}

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const { id } = params;

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const { data: existingMidia, error: existingError } = await supabase
    .from('midia')
    .select('*')
    .eq('id', id)
    .single();

  if (existingError || !existingMidia) {
    return NextResponse.json({ error: 'Conteúdo não encontrado.' }, { status: 404 });
  }

  const rawPayload = (await request.json().catch(() => null)) as unknown;
  const parsed = midiaApiSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload inválido.', details: parsed.error.format() }, { status: 400 });
  }

  const normalized = normalizeMidiaPayload(parsed.data, existingMidia.author_id ?? currentAdminId);
  const changedFields = diffFields(existingMidia, normalized);

  const { data: updatedMidia, error: updateError } = await supabase
    .from('midia')
    .update(normalized)
    .eq('id', id)
    .select('*')
    .single();

  if (updateError || !updatedMidia) {
    return NextResponse.json({ error: 'Não foi possível atualizar o conteúdo.', details: updateError?.message }, { status: 500 });
  }

  revalidatePath('/midia');

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.midia.article.update',
    description: 'Atualização de conteúdo de mídia',
    route: `/api/admin/midia/${id}`,
    method: 'PUT',
    entity: { type: 'midia', id },
    metadata: {
      changedFields,
      source: updatedMidia.source,
      published_date: updatedMidia.published_date,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ midia: updatedMidia });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const adminContext = await requireAdminSession();

  if ('error' in adminContext) {
    return NextResponse.json({ error: adminContext.error.message }, { status: adminContext.error.status });
  }

  const { id } = params;

  const {
    supabase,
    session: { userId: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
  } = adminContext;

  const { data: existingMidia, error: existingError } = await supabase
    .from('midia')
    .select('*')
    .eq('id', id)
    .single();

  if (existingError || !existingMidia) {
    return NextResponse.json({ error: 'Conteúdo não encontrado.' }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from('midia')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: 'Não foi possível excluir o conteúdo.', details: deleteError.message }, { status: 500 });
  }

  revalidatePath('/midia');

  await logAdminAction({
    supabase,
    actor: { id: currentAdminId, email: currentAdminEmail, role: currentAdminRole },
    action: 'admin.midia.article.delete',
    description: 'Exclusão de conteúdo de mídia',
    route: `/api/admin/midia/${id}`,
    method: 'DELETE',
    entity: { type: 'midia', id },
    metadata: {
      title: existingMidia.title,
      source: existingMidia.source,
      published_date: existingMidia.published_date,
    },
    ipAddress: extractClientIp(request.headers),
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ success: true });
}
