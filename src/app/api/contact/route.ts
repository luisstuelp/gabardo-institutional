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
    <h1>Nova mensagem de contato</h1>
    <p><strong>Nome:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Telefone:</strong> ${data.phone}</p>
    <p><strong>Setor:</strong> ${data.sector || 'Não informado'}</p>
    <p><strong>Empresa:</strong> ${data.company}</p>
    <p><strong>Interesse:</strong> ${data.interest}</p>
    <p><strong>Assunto:</strong> ${data.subject}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${data.message}</p>
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

    const transporter = nodemailer.createTransport({
      host: 'smtp.ls2001.com.br',
      port: 587,
      secure: false,
      auth: {
        user: 'contato@ls2001.com.br',
        pass: 'C99995000c',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const routing = formData.sector ? sectorRouting[formData.sector] : undefined;
    const toRecipients = routing?.to?.length ? routing.to : ['gabardo@transgabardo.com.br'];
    const ccRecipients = routing?.cc;

    console.log('📧 Enviando email para:', { to: toRecipients, cc: ccRecipients, sector: formData.sector });

    let emailSent = false;
    let emailErrorMsg = null;

    try {
      const info = await transporter.sendMail({
        from: 'contato@ls2001.com.br',
        to: toRecipients,
        cc: ccRecipients,
        subject: `[Gabardo] ${formData.subject}`,
        html: generateEmailTemplate(formData),
        replyTo: formData.email
      });
      console.log('✅ Email enviado com sucesso!');
      console.log('📧 Message ID:', info.messageId);
      console.log('📧 Response:', info.response);
      emailSent = true;
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