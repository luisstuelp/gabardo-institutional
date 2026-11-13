import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { createServerTrucksSupabaseClient, hashTrucksSessionToken } from '@/lib/trucksUserAuth';
import { enforceLocalRateLimit, readJsonBodyWithLimit } from '@/lib/apiRateLimit';

type ResetRequest = { email?: unknown };

export async function POST(request: Request) {
  const rateLimit = await enforceLocalRateLimit(request, 'trucks-password-reset', 5, 15 * 60);
  if (rateLimit) return rateLimit;

  let body: ResetRequest;
  try {
    body = await readJsonBodyWithLimit<ResetRequest>(request, 4 * 1024);
  } catch {
    return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }

  if (typeof body.email !== 'string' || !body.email.trim()) {
    return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }

  try {
    const supabase = createServerTrucksSupabaseClient();
    const email = body.email.trim().toLowerCase();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, is_active, is_admin')
      .eq('email', email)
      .maybeSingle();
    if (error) throw new Error(error.message);

    if (user?.is_active && !user.is_admin) {
        const token = randomBytes(32).toString('base64url');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        await supabase.from('password_reset_tokens').delete().eq('user_id', user.id);
        const { error: insertError } = await supabase.from('password_reset_tokens').insert({
          user_id: user.id,
          token_hash: hashTrucksSessionToken(token),
          expires_at: expiresAt,
        });
        if (insertError) throw new Error(insertError.message);

        const mailUser = process.env.GMAIL_USER;
        const mailPassword = process.env.GMAIL_APP_PASSWORD;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
        if (!mailUser || !mailPassword || !siteUrl) {
          throw new Error('Configuração de e-mail para redefinição não encontrada.');
        }

        const resetUrl = new URL('/reset-password', siteUrl);
        resetUrl.searchParams.set('token', token);
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: mailUser, pass: mailPassword },
        });
        await transporter.sendMail({
          from: `"Gabardo Transportes" <${mailUser}>`,
          to: email,
          subject: 'Redefinição de senha da área de caminhões',
          text: `Use este link para criar uma nova senha: ${resetUrl.toString()}\nO link expira em 1 hora.`,
          html: `<p>Recebemos uma solicitação para redefinir sua senha.</p><p><a href="${resetUrl.toString()}">Criar nova senha</a></p><p>O link expira em 1 hora. Se você não fez essa solicitação, ignore esta mensagem.</p>`,
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha de caminhões', error);
    return NextResponse.json({ error: 'Não foi possível enviar o e-mail de redefinição.' }, { status: 500 });
  }
}
