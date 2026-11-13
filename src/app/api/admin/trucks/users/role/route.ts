import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminAccess';
import { createServerTrucksSupabaseClient } from '@/lib/trucksUserAuth';
import type { AppRole } from '@/types/database';
import { readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type UpdateRolePayload = { userId?: unknown; role?: unknown };

export async function POST(request: Request) {
  const admin = await requireAdminSession();
  if ('error' in admin) {
    return NextResponse.json({ error: admin.error.message }, { status: admin.error.status });
  }

  let body: UpdateRolePayload;
  try {
    body = await readJsonBodyWithLimit<UpdateRolePayload>(request, 2 * 1024);
  } catch {
    return NextResponse.json({ error: 'Informe um usuário e um cargo válidos.' }, { status: 400 });
  }

  const allowedRoles: AppRole[] = ['admin', 'moderator', 'user'];
  if (typeof body.userId !== 'string' || typeof body.role !== 'string' || !allowedRoles.includes(body.role as AppRole)) {
    return NextResponse.json({ error: 'Informe um usuário e um cargo válidos.' }, { status: 400 });
  }

  const role = body.role as AppRole;
  const supabase = createServerTrucksSupabaseClient();
  const { error: accountError } = await supabase
    .from('users')
    .update({ is_admin: role === 'admin' })
    .eq('id', body.userId);
  if (accountError) {
    return NextResponse.json({ error: 'Não foi possível atualizar o tipo da conta.' }, { status: 400 });
  }

  const { error: roleError } = await supabase
    .from('user_roles')
    .upsert({ user_id: body.userId, role }, { onConflict: 'user_id,role' });
  if (roleError) {
    return NextResponse.json({ error: 'Não foi possível atualizar o cargo.' }, { status: 400 });
  }

  if (role !== 'admin') {
    await supabase.from('user_roles').delete().eq('user_id', body.userId).eq('role', 'admin');
  }

  return NextResponse.json({ success: true });
}
