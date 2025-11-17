import { NextResponse } from 'next/server';
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  type AdminRole,
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

    const { data: roleRow, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (roleError) {
      return NextResponse.json({ error: 'Falha ao verificar permissões.' }, { status: 500 });
    }

    const allowedRoles: AdminRole[] = ['admin', 'moderator', 'user'];
    const sessionRole: AdminRole = roleRow?.role && allowedRoles.includes(roleRow.role as AdminRole)
      ? (roleRow.role as AdminRole)
      : 'user';

    if (!allowedRoles.includes(sessionRole)) {
      return NextResponse.json({ error: 'Usuário sem permissão de acesso.' }, { status: 403 });
    }

    const token = createSessionToken(user.email ?? body.email, user.id, sessionRole);
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
