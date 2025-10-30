import { NextResponse } from 'next/server';

import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/adminSession';
import { createServerSupabaseClient } from '@/integrations/supabase/server';

type RegisterPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as RegisterPayload | null;

    if (!body || typeof body.email !== 'string' || typeof body.password !== 'string') {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 400 });
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'A senha deve possuir pelo menos 8 caracteres.' },
        { status: 422 },
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: createUserData, error: createUserError } = await supabase.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: false,
    });

    if (createUserError) {
      const status = createUserError.status ?? 500;

      // 422: Password requirements, 409: user already exists (code: email_exists)
      return NextResponse.json(
        { error: createUserError.message ?? 'Não foi possível criar o usuário.' },
        { status: status === 0 ? 500 : status },
      );
    }

    const user = createUserData.user;

    if (!user) {
      return NextResponse.json({ error: 'Usuário não retornado pelo Supabase.' }, { status: 500 });
    }

    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({ user_id: user.id, role: 'admin' }, { onConflict: 'user_id' });

    if (roleError) {
      return NextResponse.json({ error: 'Não foi possível atribuir a permissão de administrador.' }, { status: 500 });
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (signInError || !signInData.session || !signInData.user) {
      return NextResponse.json({ error: 'Usuário criado, mas não foi possível iniciar a sessão.' }, { status: 500 });
    }

    const { session, user: signedInUser } = signInData;

    const { error: setSessionError } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (setSessionError) {
      return NextResponse.json({ error: 'Usuário criado, mas falhou ao iniciar sessão.' }, { status: 500 });
    }

    const token = createSessionToken(signedInUser.email ?? body.email, signedInUser.id);
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
    console.error('Erro durante cadastro administrativo', error);
    return NextResponse.json(
      { error: 'Não foi possível processar o cadastro. Verifique a configuração do servidor.' },
      { status: 500 },
    );
  }
}
