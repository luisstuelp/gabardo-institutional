import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, type = 'page' } = body;

    if (!path) {
      return NextResponse.json(
        { error: 'Missing path parameter' },
        { status: 400 }
      );
    }

    // Revalidate the specified path
    revalidatePath(path, type);

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now()
    });
  } catch (error) {
    console.error('Revalidate API error:', error);
    return NextResponse.json(
      { error: 'Error revalidating', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
