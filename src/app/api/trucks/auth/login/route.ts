import { NextResponse } from 'next/server';
import { createTrucksSession, createServerTrucksSupabaseClient, hashTrucksSessionToken, TRUCKS_USER_COOKIE_NAME, TRUCKS_USER_SESSION_MAX_AGE_SECONDS, verifyTrucksPassword } from '@/lib/trucksUserAuth';
import { enforceLocalRateLimit, readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

type LoginPayload = { email?: unknown; password?: unknown };

export async function POST(request: Request) {
  const rateLimitResponse = await enforceLocalRateLimit(request, 'trucks-user-login', 10, 15 * 60);
  if (rateLimitResponse) return rateLimitResponse;

  let body: LoginPayload;
  try {
    body = await readJsonBodyWithLimit<LoginPayload>(request, 4 * 1024);
  } catch (error) {
    const status = error instanceof RequestBodyTooLargeError ? 413 : 400;
    return NextResponse.json({ error: 'Informe um e-mail e uma senha válidos.' }, { status });
  }

  if (typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'Informe um e-mail e uma senha válidos.' }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;
  if (!email || password.length < 6 || password.length > 1024) {
    return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
  }

  try {
    const supabase = createServerTrucksSupabaseClient();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, password_hash, is_active')
      .eq('email', email)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!user || !user.is_active || !(await verifyTrucksPassword(email, password, user.password_hash))) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
    }

    const token = await createTrucksSession(user.id, request);
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, full_name: user.full_name },
    });
    response.cookies.set({
      name: TRUCKS_USER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TRUCKS_USER_SESSION_MAX_AGE_SECONDS,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Erro durante login de usuário de caminhões', error);
    return NextResponse.json({ error: 'Não foi possível processar o login.' }, { status: 500 });
  }
}
