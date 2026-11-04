import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    let body: { contentType?: unknown; contentId?: unknown; event?: unknown };
    try {
      body = await readJsonBodyWithLimit(request, 4 * 1024);
    } catch (parseError) {
      const status = parseError instanceof RequestBodyTooLargeError ? 413 : 400;
      return NextResponse.json({ error: 'Dados inv\u00e1lidos.' }, { status });
    }

    const { contentType, contentId, event } = body;
    if (
      (contentType !== 'post' && contentType !== 'midia' && contentType !== 'page') ||
      typeof contentId !== 'string' ||
      contentId.length === 0 ||
      contentId.length > 500 ||
      typeof event !== 'string'
    ) {
      return NextResponse.json({ error: 'Dados inv\u00e1lidos.' }, { status: 400 });
    }

    if (contentType === 'page') {
      if (event !== 'view' || !contentId.startsWith('/') || contentId.startsWith('//')) {
        return NextResponse.json({ error: 'Evento ou p\u00e1gina inv\u00e1lidos.' }, { status: 400 });
      }
    } else {
      if (!UUID_PATTERN.test(contentId) || !['view', 'external_click', 'share'].includes(event)) {
        return NextResponse.json({ error: 'Evento ou conte\u00fado inv\u00e1lidos.' }, { status: 400 });
      }
    }

    const supabase = createServerSupabaseClient();
    const functionName =
      contentType === 'post'
        ? 'increment_post_metric'
        : contentType === 'midia'
          ? 'increment_midia_metric'
          : 'increment_page_metric';

    const { data, error } = await (supabase as unknown as {
      rpc: (fn: string, params: Record<string, unknown>) => ReturnType<typeof supabase.rpc>;
    }).rpc(functionName, {
      content_id: contentId,
      metric_type: event,
    });

    if (error) {
      console.error('Metrics RPC failed:', error);
      return NextResponse.json({ error: 'Falha ao atualizar m\u00e9tricas.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Metrics API error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
