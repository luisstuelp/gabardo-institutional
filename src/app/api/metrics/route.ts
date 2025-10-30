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

    if (!['post', 'midia'].includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid contentType. Must be "post" or "midia"' },
        { status: 400 }
      );
    }

    if (!['view', 'external_click', 'share'].includes(event)) {
      return NextResponse.json(
        { error: 'Invalid event. Must be "view", "external_click", or "share"' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Call the appropriate RPC function based on content type
    const functionName = contentType === 'post' 
      ? 'increment_post_metric' 
      : 'increment_midia_metric';

    const { data, error } = await supabase.rpc(functionName, {
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
