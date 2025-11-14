import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/integrations/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, contentId, event } = body;

    // Validate input
    if (!contentType || !contentId || !event) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, contentId, event' },
        { status: 400 }
      );
    }

    if (!['post', 'midia', 'page'].includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid contentType. Must be "post", "midia" ou "page"' },
        { status: 400 }
      );
    }

    const allowedEvents = contentType === 'page' ? ['view'] : ['view', 'external_click', 'share'];

    if (!allowedEvents.includes(event)) {
      return NextResponse.json(
        { error: 'Invalid event for contentType' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Call the appropriate RPC function based on content type
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
      console.error('Supabase RPC error:', error);
      return NextResponse.json(
        { error: 'Failed to update metrics', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Metrics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
