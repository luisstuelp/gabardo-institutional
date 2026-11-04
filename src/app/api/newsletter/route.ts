import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    let body: { email?: unknown };
    try {
      body = await readJsonBodyWithLimit<{ email?: unknown }>(request, 2 * 1024);
    } catch (parseError) {
      const status = parseError instanceof RequestBodyTooLargeError ? 413 : 400;
      return NextResponse.json({ error: 'Dados inv\u00e1lidos.' }, { status });
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Informe um e-mail v\u00e1lido.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'gabardo@transgabardo.com.br',
      subject: '[Gabardo] Nova inscri\u00e7\u00e3o na newsletter',
      text: `Email: ${email}`,
      html: `<p>Email: ${escapeHtml(email)}</p>`,
    });

    return NextResponse.json({ message: 'Inscri\u00e7\u00e3o realizada com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return NextResponse.json({ error: 'N\u00e3o foi poss\u00edvel processar sua inscri\u00e7\u00e3o.' }, { status: 500 });
  }
}
