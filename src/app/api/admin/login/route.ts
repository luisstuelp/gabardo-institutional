import { NextResponse } from 'next/server';
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminSession';
import { createServerSupabaseClient } from '@/integrations/supabase/server';

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as LoginPayload | null;

    if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (signInError || !signInData.session || !signInData.user) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
    }

    const { session, user } = signInData;

    const { error: setSessionError } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (setSessionError) {
      return NextResponse.json({ error: 'Falha ao iniciar sessão.' }, { status: 500 });
    }

    const { data: isAdmin, error: adminCheckError } = await supabase.rpc('is_admin');

    if (adminCheckError) {
      return NextResponse.json({ error: 'Falha ao verificar permissões.' }, { status: 500 });
    }

    if (!isAdmin) {
      return NextResponse.json({ error: 'Usuário sem permissão de administrador.' }, { status: 403 });
    }

    const token = createSessionToken(user.email ?? body.email, user.id);
    const response = NextResponse.json({
      success: true,
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro durante login administrativo', error);
    return NextResponse.json(
      { error: 'Não foi possível processar o login. Verifique a configuração do servidor.' },
      { status: 500 },
    );
  }
}
