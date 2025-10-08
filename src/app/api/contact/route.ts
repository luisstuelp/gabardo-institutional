import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
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

  // Length validations
  if (data.name && data.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)');
  }

  if (data.email && data.email.length > 150) {
    errors.push('E-mail muito longo (máximo 150 caracteres)');
  }

  if (data.phone && data.phone.length > 20) {
    errors.push('Telefone muito longo (máximo 20 caracteres)');
  }

  if (data.company && data.company.length > 100) {
    errors.push('Nome da empresa muito longo (máximo 100 caracteres)');
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
      subject: sanitizeInput(body.subject || ''),
      message: sanitizeInput(body.message || ''),
      interest: sanitizeInput(body.interest || ''),
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

    // TODO: Replace with actual email sending logic
    // Example integrations you could add here:
    /*
    
    // Using Nodemailer with Gmail/SMTP
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'contato@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      replyTo: formData.email
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmação de contato - Hub Plural',
      html: generateConfirmationTemplate(formData.name)
    });

    // Using SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: 'contato@hubplural.com',
      from: 'noreply@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      replyTo: formData.email
    });

    // Using Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'contato@hubplural.com',
      to: 'contato@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      reply_to: formData.email
    });

    */

    // Success response
    console.log('✅ Contact form submission successful');
    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso!',
        timestamp: new Date().toISOString(),
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'Contact API is running',
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    },
    { status: 200 }
  );
} 