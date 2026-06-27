import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

import { createServerSupabaseClient } from '@/integrations/supabase/server';

const GABARDO_LOGO_WHITE_CID = 'gabardo-logo-white';
const GABARDO_LOGO_WHITE_PATH = path.resolve(process.cwd(), 'public', 'images', 'Design sem nome (53).png');

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['application/pdf'];

interface JobApplicationFormData {
  name: string;
  email: string;
  phone: string;
  positionInterest: string;
  message: string;
  privacyAccepted: boolean;
}

function validateFormData(data: JobApplicationFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.phone) {
    errors.push('Telefone é obrigatório');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  if (!data.privacyAccepted) {
    errors.push('É necessário aceitar a política de privacidade');
  }

  if (data.name && data.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)');
  }

  if (data.email && data.email.length > 150) {
    errors.push('E-mail muito longo (máximo 150 caracteres)');
  }

  if (data.phone && data.phone.length > 25) {
    errors.push('Telefone muito longo (máximo 25 caracteres)');
  }

  if (data.phone) {
    const parsedNumber = parsePhoneNumberFromString(data.phone);
    if (!parsedNumber?.isValid()) {
      errors.push('Informe um telefone válido com DDI.');
    }
  }

  if (data.positionInterest && data.positionInterest.length > 100) {
    errors.push('Área de interesse muito longa (máximo 100 caracteres)');
  }

  if (data.message && data.message.length > 2000) {
    errors.push('Mensagem muito longa (máximo 2000 caracteres)');
  }

  return { isValid: errors.length === 0, errors };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

const submissionLog = new Map<string, number[]>();
const MAX_SUBMISSIONS_PER_HOUR = 2;
const HOUR_IN_MS = 3600000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionLog.get(ip) || [];

  const recentSubmissions = submissions.filter(time => now - time < HOUR_IN_MS);

  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return true;
  }

  recentSubmissions.push(now);
  submissionLog.set(ip, recentSubmissions);

  if (submissionLog.size > 1000) {
    const cutoff = now - HOUR_IN_MS;
    for (const [key, times] of submissionLog.entries()) {
      const recent = times.filter(time => time > cutoff);
      if (recent.length === 0) {
        submissionLog.delete(key);
      } else {
        submissionLog.set(key, recent);
      }
    }
  }

  return false;
}

function logJobApplication(data: JobApplicationFormData, ip: string, userAgent?: string, filename?: string) {
  const logData = {
    timestamp: new Date().toISOString(),
    ip: ip,
    userAgent: userAgent || 'Unknown',
    nome: data.name,
    email: data.email,
    telefone: data.phone,
    areaInteresse: data.positionInterest || 'Não especificada',
    mensagem: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
    messageLength: data.message.length,
    arquivoCurriculo: filename || 'Não enviado',
  };

  console.log('📄 Nova candidatura recebida:', JSON.stringify(logData, null, 2));
}

function generateEmailTemplate(data: JobApplicationFormData, filename: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Candidatura - Trabalhe Conosco</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #132D51 0%, #1b4c7f 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Nova Candidatura</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">Trabalhe Conosco - Gabardo Transportes</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Nome:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Email:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Telefone:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></p>
                  </td>
                </tr>
                ${data.positionInterest ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Área de Interesse:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.positionInterest}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Mensagem / Carta de Apresentação:</strong>
                    <div style="margin: 10px 0 0 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #132D51; border-radius: 4px;">
                      <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0;">
                    <strong style="color: #374151; font-size: 14px;">Currículo:</strong>
                    <div style="margin: 10px 0 0 0; padding: 15px; background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px;">
                      <p style="margin: 0; color: #065f46; font-size: 15px;">
                        📎 <strong>${filename}</strong> anexado a este e-mail
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Este email foi enviado automaticamente pelo formulário Trabalhe Conosco</p>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Gabardo Transportes © ${new Date().getFullYear()}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateConfirmationEmailTemplate(data: JobApplicationFormData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação - Candidatura Recebida</title>
</head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background-color:#edf1f8; color:#132D51;">
  <table role="presentation" style="width:100%; border-collapse:collapse; background-color:#edf1f8;">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" style="width:100%; max-width:640px; border-collapse:collapse; background-color:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 18px 40px rgba(19,45,81,0.12);">
          <tr>
            <td style="background: linear-gradient(135deg, #071322 0%, #0f223a 28%, #132D51 68%, #1b4c7f 100%); padding:48px 40px; text-align:left;">
              <img src="cid:${GABARDO_LOGO_WHITE_CID}" alt="Gabardo Transportes" style="height:92px; max-width:280px; margin-bottom:32px; display:block; filter: brightness(0) invert(1) drop-shadow(0 10px 22px rgba(6,16,31,0.48));" />
              <p style="margin:0 0 12px 0; font-size:13px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.78);">Confirmação de candidatura</p>
              <h1 style="margin:0; font-size:28px; line-height:1.25; font-weight:700; color:#ffffff;">Candidatura recebida com sucesso</h1>
              <p style="margin:16px 0 0 0; font-size:16px; line-height:1.6; color:rgba(255,255,255,0.78);">Obrigado pelo seu interesse em fazer parte do time Gabardo!</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 12px 36px;">
              <p style="margin:0 0 18px 0; font-size:16px; line-height:1.65; color:#1f2937;">Olá <strong>${data.name}</strong>,</p>
              <p style="margin:0 0 28px 0; font-size:16px; line-height:1.65; color:#1f2937;">Recebemos sua candidatura e seu currículo foi encaminhado para nossa equipe de Recursos Humanos. Abaixo, você encontra um resumo do que foi enviado.</p>
              <table role="presentation" style="width:100%; border-collapse:collapse; margin:0 0 20px 0;">
                <tr>
                  <td style="background-color:#f4f8fd; border:1px solid rgba(19,45,81,0.08); border-radius:12px; padding:22px 24px;">
                    <table role="presentation" style="width:100%; border-collapse:collapse;">
                      <tr>
                        <td style="width:48px; vertical-align:top;">
                          <span style="display:inline-block; width:44px; height:44px; border-radius:14px; background-color:#132D51; color:#38B6FF; font-size:22px; line-height:44px; text-align:center;">📄</span>
                        </td>
                        <td style="padding-left:16px;">
                          <p style="margin:0 0 14px 0; font-size:15px; font-weight:600; letter-spacing:0.01em; color:#132D51;">Resumo da sua candidatura</p>
                          ${data.positionInterest ? `<p style="margin:0 0 10px 0; font-size:14px; color:#2f3a4d;"><strong style="color:#132D51;">Área de interesse:</strong> ${data.positionInterest}</p>` : ''}
                          <p style="margin:0; font-size:14px; color:#2f3a4d;"><strong style="color:#132D51;">E-mail:</strong> ${data.email}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" style="width:100%; border-collapse:collapse; margin:0 0 32px 0;">
                <tr>
                  <td style="background-color:#e8f2ff; border:1px solid rgba(56,182,255,0.35); border-radius:12px; padding:22px 24px;">
                    <table role="presentation" style="width:100%; border-collapse:collapse;">
                      <tr>
                        <td style="width:48px; vertical-align:top;">
                          <span style="display:inline-block; width:44px; height:44px; border-radius:14px; background-color:#38B6FF; color:#132D51; font-size:22px; line-height:44px; text-align:center;">⏳</span>
                        </td>
                        <td style="padding-left:16px;">
                          <p style="margin:0 0 8px 0; font-size:15px; font-weight:600; letter-spacing:0.01em; color:#132D51;">Próximos passos</p>
                          <p style="margin:0 0 8px 0; font-size:14px; color:#2f3a4d;">Nossa equipe de RH analisará seu perfil e entrará em contato caso haja oportunidades alinhadas com suas qualificações.</p>
                          <p style="margin:0; font-size:14px; color:#2f3a4d;">Dúvidas? <a href="mailto:selecao@transgabardo.com.br" style="color:#132D51; font-weight:600; text-decoration:none;">selecao@transgabardo.com.br</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 40px 36px;">
              <p style="margin:0; font-size:13px; line-height:1.7; color:#4b5563;">Este e-mail confirma o recebimento da sua candidatura. Caso você não tenha realizado esse cadastro, desconsidere a mensagem ou escreva para <a href="mailto:selecao@transgabardo.com.br" style="color:#132D51; text-decoration:none; font-weight:600;">selecao@transgabardo.com.br</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0f1f36; padding:28px 20px; text-align:center;">
              <p style="margin:0 0 6px 0; font-size:14px; font-weight:600; color:#f5f7fb;">Gabardo Transportes</p>
              <p style="margin:0 0 4px 0; font-size:12px; color:#d1d6e0;">Av. Fernando Ferrari, 700 - Anchieta - Porto Alegre/RS - CEP 90200-040</p>
              <p style="margin:0 0 4px 0; font-size:12px; color:#d1d6e0;">Central: <a href="tel:+555133733000" style="color:#38B6FF; text-decoration:none; font-weight:600;">+55 (51) 3373-3000</a></p>
              <p style="margin:0 0 6px 0; font-size:12px; color:#d1d6e0;"><a href="mailto:gabardo@transgabardo.com.br" style="color:#38B6FF; text-decoration:none; font-weight:600;">gabardo@transgabardo.com.br</a></p>
              <p style="margin:0; font-size:12px;"><a href="https://gabardo.com" style="color:#7fd7ff; text-decoration:none;">www.gabardo.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               '127.0.0.1';
    const userAgent = request.headers.get('user-agent');

    if (isRateLimited(ip)) {
      console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          error: 'Muitas tentativas. Tente novamente em 1 hora.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    let formDataRequest;
    try {
      formDataRequest = await request.formData();
    } catch (parseError) {
      console.log('❌ Invalid form data:', parseError);
      return NextResponse.json(
        { error: 'Dados inválidos no formulário', code: 'INVALID_FORM_DATA' },
        { status: 400 }
      );
    }

    const resumeFile = formDataRequest.get('resume') as File | null;

    if (!resumeFile) {
      return NextResponse.json(
        { error: 'Currículo é obrigatório', code: 'MISSING_RESUME' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Apenas arquivos PDF são aceitos', code: 'INVALID_FILE_TYPE' },
        { status: 400 }
      );
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Arquivo muito grande (máximo 10MB)', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    const formData: JobApplicationFormData = {
      name: sanitizeInput(formDataRequest.get('name') as string || ''),
      email: sanitizeInput(formDataRequest.get('email') as string || ''),
      phone: sanitizeInput(formDataRequest.get('phone') as string || ''),
      positionInterest: sanitizeInput(formDataRequest.get('positionInterest') as string || ''),
      message: sanitizeInput(formDataRequest.get('message') as string || ''),
      privacyAccepted: formDataRequest.get('privacyAccepted') === 'true',
    };

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validation.errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    logJobApplication(formData, ip, userAgent || undefined, resumeFile.name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerSupabaseClient() as any;

    const { error: insertError } = await supabase.from('job_applications').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      position_interest: formData.positionInterest || null,
      message: formData.message,
      resume_filename: resumeFile.name,
      resume_size_bytes: resumeFile.size,
      privacy_accepted: formData.privacyAccepted,
      raw_data: {
        ip,
        userAgent,
        source: 'web_form',
      },
    });

    if (insertError) {
      console.error('❌ Erro ao registrar candidatura no banco:', insertError);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

    let emailSent = false;
    let confirmationSent = false;
    let emailErrorMsg = null;

    try {
      const info = await transporter.sendMail({
        from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
        to: ['selecao@transgabardo.com.br'],
        subject: `[Trabalhe Conosco] Nova candidatura - ${formData.name}`,
        html: generateEmailTemplate(formData, resumeFile.name),
        replyTo: formData.email,
        attachments: [
          {
            filename: resumeFile.name,
            content: resumeBuffer,
            contentType: 'application/pdf',
          },
        ],
      });

      console.log('✅ Email enviado com sucesso para RH!');
      console.log('📧 Message ID:', info.messageId);
      emailSent = true;

      try {
        await transporter.sendMail({
          from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
          to: formData.email,
          subject: '✓ Candidatura Recebida - Gabardo Transportes',
          html: generateConfirmationEmailTemplate(formData),
          attachments: [
            {
              filename: 'logo-gabardo-branca.png',
              path: GABARDO_LOGO_WHITE_PATH,
              cid: GABARDO_LOGO_WHITE_CID,
            },
          ],
        });

        console.log('✅ Email de confirmação enviado para:', formData.email);
        confirmationSent = true;
      } catch (confirmError) {
        console.warn('⚠️ Não foi possível enviar email de confirmação:', confirmError);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('❌ Erro ao enviar email:', errorMessage);
      console.error('📋 Detalhes:', error);
      emailErrorMsg = errorMessage;
      console.warn('⚠️ Continuando apesar do erro no email...');
    }

    console.log('✅ Job application submission successful');
    return NextResponse.json(
      {
        message: 'Candidatura enviada com sucesso!',
        timestamp: new Date().toISOString(),
        id: `career_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        emailSent,
        confirmationSent,
        ...(emailErrorMsg && { emailError: emailErrorMsg }),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erro interno no processamento da candidatura:', error);

    return NextResponse.json(
      {
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}
