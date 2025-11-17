import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { extractClientIp, logAdminAction } from '@/lib/adminAudit';

type RequestResetPayload = {
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as RequestResetPayload | null;

    if (!body || typeof body.email !== 'string' || body.email.trim().length === 0) {
      return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();

    const redirectBase =
      process.env.ADMIN_PASSWORD_RESET_REDIRECT ?? process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

    if (!redirectBase) {
      console.error('Password reset redirect URL is not configured.');
      return NextResponse.json(
        {
          error: 'Configuração de URL de redirecionamento ausente. Defina ADMIN_PASSWORD_RESET_REDIRECT ou NEXT_PUBLIC_SITE_URL.',
        },
        { status: 500 },
      );
    }

    const redirectUrl = new URL('/admin/reset', redirectBase).toString();

    const supabase = createServerSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.error('Erro ao solicitar redefinição de senha para', email, error);
      return NextResponse.json({ error: 'Não foi possível enviar o e-mail de redefinição.' }, { status: error.status || 500 });
    }

    await logAdminAction({
      supabase,
      actor: {
        email: null,
        id: null,
        role: null,
      },
      action: 'admin_password_reset_requested',
      metadata: {
        email,
        redirectUrl,
      },
      ipAddress: extractClientIp(request.headers),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro inesperado ao solicitar redefinição de senha administrativa', error);
    return NextResponse.json({ error: 'Não foi possível processar a solicitação.' }, { status: 500 });
  }
}
