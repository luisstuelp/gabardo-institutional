import { NextResponse } from 'next/server';
import {
  createServerTrucksSupabaseClient,
  createTrucksSession,
  hashTrucksPassword,
  TRUCKS_USER_COOKIE_NAME,
  TRUCKS_USER_SESSION_MAX_AGE_SECONDS,
} from '@/lib/trucksUserAuth';
import { enforceLocalRateLimit, readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

type RegisterPayload = { fullName?: unknown; email?: unknown; password?: unknown };

export async function POST(request: Request) {
  const rateLimitResponse = await enforceLocalRateLimit(request, 'trucks-user-register', 5, 60 * 60);
  if (rateLimitResponse) return rateLimitResponse;

  let body: RegisterPayload;
  try {
    body = await readJsonBodyWithLimit<RegisterPayload>(request, 8 * 1024);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof RequestBodyTooLargeError ? 'Dados muito grandes.' : 'Dados de cadastro inválidos.' },
      { status: error instanceof RequestBodyTooLargeError ? 413 : 400 },
    );
  }

  if (
    typeof body.fullName !== 'string' || body.fullName.trim().length < 2 || body.fullName.trim().length > 120 ||
    typeof body.email !== 'string' || typeof body.password !== 'string' || body.password.length < 8 || body.password.length > 1024
  ) {
    return NextResponse.json({ error: 'Informe nome, e-mail válido e senha com pelo menos 8 caracteres.' }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }

  try {
    const supabase = createServerTrucksSupabaseClient();
    const passwordHash = await hashTrucksPassword(body.password);
    const { data: user, error } = await supabase
      .from('users')
      .insert({ email, full_name: body.fullName.trim(), password_hash: passwordHash, is_active: true })
      .select('id, email, full_name')
      .single();

    if (error?.code === '23505') {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 });
    }
    if (error || !user) throw new Error(error?.message ?? 'Não foi possível criar a conta.');

    const token = await createTrucksSession(user.id, request);
    const response = NextResponse.json({ user });
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
    console.error('Erro durante cadastro de usuário de caminhões', error);
    return NextResponse.json({ error: 'Não foi possível concluir o cadastro.' }, { status: 500 });
  }
}
