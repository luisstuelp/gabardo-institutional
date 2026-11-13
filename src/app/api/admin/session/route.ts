import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminAccess';

export async function GET() {
  const result = await requireAdminSession();
  if ('error' in result) {
    return NextResponse.json({ error: result.error.message }, {
      status: result.error.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  return NextResponse.json({ email: result.session.email, role: result.session.role }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
