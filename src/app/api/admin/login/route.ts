import { NextResponse } from 'next/server';
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  type AdminRole,
} from '@/lib/adminSession';
import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { createServerTrucksSupabaseClient, markTrucksAccountAsAdmin } from '@/lib/trucksUserAuth';
import { readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    let body: LoginPayload | null;
    try {
      body = await readJsonBodyWithLimit<LoginPayload>(request, 4 * 1024);
    } catch (parseError) {
      const status = parseError instanceof RequestBodyTooLargeError ? 413 : 400;
      return NextResponse.json({ error: 'Credenciais inv\u00e1lidas.' }, { status });
    }

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

    const { data: roleRow, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) {
      return NextResponse.json({ error: 'Falha ao verificar permissões.' }, { status: 500 });
    }

    if (!roleRow) {
      return NextResponse.json({ error: 'Usuário sem permissão de administrador.' }, { status: 403 });
    }

    const accountRoleError = await markTrucksAccountAsAdmin(user.id, user.email ?? body.email);
    if (accountRoleError) {
      return NextResponse.json({ error: 'Falha ao configurar a conta administrativa.' }, { status: 500 });
    }

    const trucksSupabase = createServerTrucksSupabaseClient();
    const { error: trucksRoleError } = await trucksSupabase
      .from('user_roles')
      .upsert({ user_id: user.id, role: 'admin' }, { onConflict: 'user_id,role' });

    if (trucksRoleError) {
      return NextResponse.json({ error: 'Falha ao configurar permissões administrativas.' }, { status: 500 });
    }
    const token = createSessionToken(user.email ?? body.email, user.id, 'admin' satisfies AdminRole);
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
