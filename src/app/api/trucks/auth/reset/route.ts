import { NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, hashTrucksPassword, hashTrucksSessionToken } from '@/lib/trucksUserAuth';
import { readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type ResetPayload = { token?: unknown; newPassword?: unknown };

export async function POST(request: Request) {
  let body: ResetPayload;
  try {
    body = await readJsonBodyWithLimit<ResetPayload>(request, 4 * 1024);
  } catch {
    return NextResponse.json({ error: 'Link de redefinição inválido.' }, { status: 400 });
  }

  if (
    typeof body.token !== 'string' ||
    typeof body.newPassword !== 'string' ||
    body.newPassword.length < 6 ||
    body.newPassword.length > 1024
  ) {
    return NextResponse.json({ error: 'Informe uma senha de pelo menos 6 caracteres.' }, { status: 422 });
  }

  const supabase = createServerTrucksSupabaseClient();
  const { data: resetToken, error } = await supabase
    .from('password_reset_tokens')
    .select('id, user_id')
    .eq('token_hash', hashTrucksSessionToken(body.token))
    .gt('expires_at', new Date().toISOString())
    .is('used_at', null)
    .maybeSingle();

  if (error || !resetToken) return NextResponse.json({ error: 'Link de redefinição inválido ou expirado.' }, { status: 400 });

  const { error: updateError } = await supabase
    .from('users')
    .update({ password_hash: await hashTrucksPassword(body.newPassword) })
    .eq('id', resetToken.user_id)
    .eq('is_active', true);

  if (updateError) return NextResponse.json({ error: 'Não foi possível alterar a senha.' }, { status: 500 });

  await supabase.from('password_reset_tokens').update({ used_at: new Date().toISOString() }).eq('id', resetToken.id);
  await supabase.from('user_sessions').delete().eq('user_id', resetToken.user_id);
  return NextResponse.json({ success: true });
}
