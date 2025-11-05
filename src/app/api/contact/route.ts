import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

import { createServerSupabaseClient } from '@/integrations/supabase/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector?: string;
  subject: string;
  message: string;
  interest: string;
  privacyAccepted: boolean;
}

// Enhanced validation function
function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Assunto deve ter pelo menos 3 caracteres');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  if (!data.privacyAccepted) {
    errors.push('É necessário aceitar a política de privacidade');
  }

  // Length validations
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

  if (data.company && data.company.length > 100) {
    errors.push('Nome da empresa muito longo (máximo 100 caracteres)');
  }

  if (data.sector && data.sector.length > 100) {
    errors.push('Setor muito longo (máximo 100 caracteres)');
  }

  if (data.subject && data.subject.length > 150) {
    errors.push('Assunto muito longo (máximo 150 caracteres)');
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

// Enhanced sanitize function
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

// Enhanced rate limiting with better memory management
const submissionLog = new Map<string, number[]>();
const MAX_SUBMISSIONS_PER_HOUR = 3;
const HOUR_IN_MS = 3600000;

const sectorRouting: Record<string, { to: string[]; cc?: string[] }> = {
  'Operacional': {
    to: ['arlindo@transgabardo.com.br'],
  },
  'Frota': {
    to: ['nevio@transgabardo.com.br'],
  },
  'Trabalhe Conosco': {
    to: ['selecao@transgabardo.com.br'],
  },
  'Comercial': {
    to: ['comercial@transgabardo.com.br'],
  },
  'Qualidade e Meio Ambiente': {
    to: ['qualidade2@transgabardo.com.br'],
    cc: ['adm.pir6@transgabardo.com.br'],
  },
  'Sugestões': {
    to: ['qualidade2@transgabardo.com.br'],
    cc: ['adm.pir6@transgabardo.com.br'],
  },
  'Reclamações': {
    to: ['qualidade2@transgabardo.com.br'],
    cc: ['adm.pir6@transgabardo.com.br'],
  },
  'Canal de Denúncias': {
    to: ['gestorarh@transgabardo.com.br'],
  },
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionLog.get(ip) || [];
  
  // Clean old submissions (older than 1 hour)
  const recentSubmissions = submissions.filter(time => now - time < HOUR_IN_MS);
  
  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return true;
  }
  
  // Update the log
  recentSubmissions.push(now);
  submissionLog.set(ip, recentSubmissions);
  
  // Clean up old entries periodically
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

// Enhanced logging function
function logContactSubmission(data: ContactFormData, ip: string, userAgent?: string) {
  const logData = {
    timestamp: new Date().toISOString(),
    ip: ip,
    userAgent: userAgent || 'Unknown',
    nome: data.name,
    email: data.email,
    empresa: data.company || 'Não informado',
    telefone: data.phone || 'Não informado',
    setor: data.sector || 'Não informado',
    interesse: data.interest || 'Não especificado',
    assunto: data.subject,
    mensagem: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
    messageLength: data.message.length
  };

  console.log('📧 Nova mensagem de contato recebida:', JSON.stringify(logData, null, 2));
  
  // TODO: In production, you might want to:
  // - Send to logging service (Winston, etc.)
  // - Store in database
  // - Send to monitoring service
}



function generateEmailTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nova Mensagem de Contato - Gabardo Transportes</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Nova Mensagem de Contato</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">Gabardo Transportes</p>
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
                ${data.company ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Empresa:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.company}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.sector ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Setor:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.sector}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.interest ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Interesse:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.interest}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px;">Assunto:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px;">${data.subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0;">
                    <strong style="color: #374151; font-size: 14px;">Mensagem:</strong>
                    <div style="margin: 10px 0 0 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: 4px;">
                      <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Este email foi enviado automaticamente pelo formulário de contato do site</p>
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

function generateConfirmationEmailTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação - Mensagem Recebida</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <img src="https://transgabardo.com.br/images/Design%20sem%20nome%20(53).png" alt="Gabardo Transportes" style="height: 40px; margin-bottom: 15px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">✓ Mensagem Recebida</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 14px;">Obrigado por entrar em contato!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">Olá <strong>${data.name}</strong>,</p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">Recebemos sua mensagem e retornaremos em breve. Nossa equipe está analisando sua solicitação.</p>

              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px;"><strong>Resumo da sua mensagem:</strong></p>
                <p style="margin: 5px 0; color: #6b7280; font-size: 13px;"><strong>Assunto:</strong> ${data.subject}</p>
                ${data.sector ? `<p style="margin: 5px 0; color: #6b7280; font-size: 13px;"><strong>Setor:</strong> ${data.sector}</p>` : ''}
              </div>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 5px 0; color: #78350f; font-size: 14px;"><strong>📞 Precisa falar conosco?</strong></p>
                <p style="margin: 5px 0 0 0; color: #92400e; font-size: 15px;">
                  Central de Atendimento: <strong><a href="tel:+555133733000" style="color: #92400e; text-decoration: none;">+55 (51) 3373-3000</a></strong>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 13px; font-weight: bold;">Gabardo Transportes</p>
              <p style="margin: 0 0 5px 0; color: #9ca3af; font-size: 12px;">
                <a href="https://transgabardo.com.br" style="color: #3b82f6; text-decoration: none;">www.transgabardo.com.br</a>
              </p>
              <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 11px;">
                Central: +55 (51) 3373-3000
              </p>
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
    // Get client information
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const userAgent = request.headers.get('user-agent');

    // Check rate limiting
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

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.log('❌ Invalid JSON in request body:', parseError);
      return NextResponse.json(
        { error: 'Dados inválidos no formulário', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }
    
    // Sanitize inputs
    const formData: ContactFormData = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      phone: sanitizeInput(body.phone || ''),
      company: sanitizeInput(body.company || ''),
      sector: sanitizeInput(body.sector || ''),
      subject: sanitizeInput(body.subject || ''),
      message: sanitizeInput(body.message || ''),
      interest: sanitizeInput(body.interest || ''),
      privacyAccepted: Boolean(body.privacyAccepted),
    };

    // Validate data
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

    // Log the submission
    logContactSubmission(formData, ip, userAgent || undefined);

    // Persist to database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerSupabaseClient() as any;

    const { error: insertError } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      sector: formData.sector || null,
      interest: formData.interest || null,
      subject: formData.subject,
      message: formData.message,
      privacy_accepted: formData.privacyAccepted,
      raw_data: {
        ip,
        userAgent,
        source: 'web_form',
      },
    });

    if (insertError) {
      console.error('❌ Erro ao registrar mensagem no banco:', insertError);
    }

    // Configurar transporter do Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const routing = formData.sector ? sectorRouting[formData.sector] : undefined;
    const toRecipients = routing?.to?.length ? routing.to : ['gabardo@transgabardo.com.br'];
    const ccRecipients = routing?.cc;

    console.log('📧 Enviando email para:', { to: toRecipients, cc: ccRecipients, sector: formData.sector });

    let emailSent = false;
    let confirmationSent = false;
    let emailErrorMsg = null;

    try {
      // Enviar email para o setor responsável
      const info = await transporter.sendMail({
        from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
        to: toRecipients,
        cc: ccRecipients,
        subject: `[Gabardo] ${formData.subject}`,
        html: generateEmailTemplate(formData),
        replyTo: formData.email,
      });

      console.log('✅ Email enviado com sucesso!');
      console.log('📧 Message ID:', info.messageId);
      emailSent = true;

      // Enviar email de confirmação para o remetente
      try {
        await transporter.sendMail({
          from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
          to: formData.email,
          subject: '✓ Mensagem Recebida - Gabardo Transportes',
          html: generateConfirmationEmailTemplate(formData),
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

    // Success response
    console.log('✅ Contact form submission successful');
    return NextResponse.json(
      {
        message: 'Mensagem enviada com sucesso!',
        timestamp: new Date().toISOString(),
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        emailSent,
        confirmationSent,
        ...(emailErrorMsg && { emailError: emailErrorMsg }),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erro interno no processamento do formulário:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}