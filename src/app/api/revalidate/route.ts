import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminAccess';
import { readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

const ALLOWED_PATHS = new Set(['/blog', '/midia']);

export async function POST(request: NextRequest) {
  const adminResult = await requireAdminSession();
  if ('error' in adminResult) {
    return NextResponse.json(
      { error: adminResult.error.message },
      { status: adminResult.error.status },
    );
  }

  let body: { path?: unknown };
  try {
    body = await readJsonBodyWithLimit(request, 2 * 1024);
  } catch (parseError) {
    const status = parseError instanceof RequestBodyTooLargeError ? 413 : 400;
    return NextResponse.json({ error: 'Corpo da solicita\u00e7\u00e3o inv\u00e1lido.' }, { status });
  }

  if (typeof body.path !== 'string' || !ALLOWED_PATHS.has(body.path)) {
    return NextResponse.json({ error: 'Caminho inv\u00e1lido.' }, { status: 400 });
  }

  try {
    revalidatePath(body.path);
    return NextResponse.json({ revalidated: true, path: body.path, now: Date.now() });
  } catch (error) {
    console.error('Revalidate API error:', error);
    return NextResponse.json({ error: 'Falha ao atualizar a p\u00e1gina.' }, { status: 500 });
  }
}
