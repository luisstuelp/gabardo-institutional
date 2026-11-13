import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerTrucksSupabaseClient, hashTrucksPassword, hashTrucksSessionToken, readTrucksUserFromCookies, TRUCKS_USER_COOKIE_NAME } from '@/lib/trucksUserAuth';
import { readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type PasswordPayload = { newPassword?: unknown };

export async function POST(request: Request) {
  const user = await readTrucksUserFromCookies();
  if (!user) return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });

  let body: PasswordPayload;
  try {
    body = await readJsonBodyWithLimit<PasswordPayload>(request, 4 * 1024);
  } catch {
    return NextResponse.json({ error: 'Senha inválida.' }, { status: 400 });
  }

  if (typeof body.newPassword !== 'string' || body.newPassword.length < 6 || body.newPassword.length > 1024) {
    return NextResponse.json({ error: 'A senha deve ter ao menos 6 caracteres.' }, { status: 422 });
  }

  const supabase = createServerTrucksSupabaseClient();
  const { error } = await supabase
    .from('users')
    .update({ password_hash: await hashTrucksPassword(body.newPassword) })
    .eq('id', user.id);

  if (error) return NextResponse.json({ error: 'Não foi possível alterar a senha.' }, { status: 500 });

  const cookieStore = await cookies();
  const token = cookieStore.get(TRUCKS_USER_COOKIE_NAME)?.value;
  if (token) {
    await supabase
      .from('user_sessions')
      .delete()
      .eq('user_id', user.id)
      .neq('token_hash', hashTrucksSessionToken(token));
  }

  return NextResponse.json({ success: true });
}
