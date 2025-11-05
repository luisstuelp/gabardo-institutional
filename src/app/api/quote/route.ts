import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

import { createServerSupabaseClient } from '@/integrations/supabase/server';

type QuoteFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  vehicleCategory: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleValue: string;
  vehicleObservation: string;
  originState: string;
  originCity: string;
  destinationState: string;
  destinationCity: string;
  routeObservation: string;
  message: string;
  privacyAccepted: boolean;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

const yearRegex = /^(19|20|21)\d{2}/; // Matches year at start, allows additional text (e.g., "1997 Diesel")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS: Array<keyof QuoteFormData> = [
  'name',
  'email',
  'phone',
  'vehicleCategory',
  'vehicleBrand',
  'vehicleModel',
  'vehicleYear',
  'vehicleValue',
  'originState',
  'originCity',
  'destinationState',
  'destinationCity'
];

function sanitize(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

function parseVehicleValue(value: string): number {
  if (!value) {
    return Number.NaN;
  }

  const digitsOnly = value.replace(/[^0-9]/g, '');
  if (!digitsOnly) {
    return Number.NaN;
  }

  return Number(digitsOnly) / 100;
}

function formatCurrency(value: string): string {
  const parsed = parseVehicleValue(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return value || 'Não informado';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parsed);
}

function formatOptional(value: string): string {
  return value ? value : 'Não informado';
}

function optionalOrNull(value: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

async function persistQuote(data: QuoteFormData) {
  const supabase = createServerSupabaseClient();

  const payload = {
    name: data.name,
    company: optionalOrNull(data.company),
    email: data.email,
    phone: data.phone,
    vehicle_category: data.vehicleCategory,
    vehicle_brand: data.vehicleBrand,
    vehicle_model: data.vehicleModel,
    vehicle_year: data.vehicleYear,
    vehicle_value: data.vehicleValue,
    vehicle_observation: optionalOrNull(data.vehicleObservation),
    origin_state: data.originState,
    origin_city: data.originCity,
    destination_state: data.destinationState,
    destination_city: data.destinationCity,
    route_observation: optionalOrNull(data.routeObservation),
    message: optionalOrNull(data.message),
    privacy_accepted: data.privacyAccepted,
    raw_data: data,
  };

  const { data: inserted, error } = await supabase
    .from('quotes')
    .insert(payload)
    .select('id, status, created_at')
    .single();

  if (error) {
    throw error;
  }

  return inserted;
}

function validate(data: QuoteFormData): ValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    const value = data[field];
    if (typeof value !== 'string' || !value.trim()) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (data.name && data.name.trim().length < 3) {
    errors.push('Informe um nome com pelo menos 3 caracteres.');
  }

  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Informe um e-mail válido.');
  }

  if (data.phone) {
    const parsedNumber = parsePhoneNumberFromString(data.phone);
    if (!parsedNumber?.isValid()) {
      errors.push('Informe um telefone válido com DDI.');
    }
  }

  if (data.vehicleYear && !yearRegex.test(data.vehicleYear)) {
    errors.push('Informe o ano do veículo com 4 dígitos.');
  }

  const vehicleValueNumber = parseVehicleValue(data.vehicleValue);
  if (!Number.isFinite(vehicleValueNumber) || vehicleValueNumber <= 0) {
    errors.push('Informe o valor do veículo corretamente.');
  }

  if (!data.privacyAccepted) {
    errors.push('A política de privacidade deve ser aceita.');
  }

  if (data.message && data.message.length > 2000) {
    errors.push('Mensagem muito longa (máximo 2000 caracteres).');
  }

  if (data.routeObservation && data.routeObservation.length > 2000) {
    errors.push('Observação de trajeto muito longa (máximo 2000 caracteres).');
  }

  if (data.vehicleObservation && data.vehicleObservation.length > 1000) {
    errors.push('Observação do veículo muito longa (máximo 1000 caracteres).');
  }

  return { isValid: errors.length === 0, errors };
}

function renderEmailTemplate(data: QuoteFormData): string {
  return `
    <h1>Pedido de Cotação - Transporte de Veículos</h1>
    <h2>Dados do Veículo</h2>
    <p><strong>Categoria:</strong> ${data.vehicleCategory}</p>
    <p><strong>Marca:</strong> ${data.vehicleBrand}</p>
    <p><strong>Modelo:</strong> ${data.vehicleModel}</p>
    <p><strong>Ano:</strong> ${data.vehicleYear}</p>
    <p><strong>Valor declarado:</strong> ${formatCurrency(data.vehicleValue)}</p>
    <p><strong>Observação:</strong> ${formatOptional(data.vehicleObservation)}</p>

    <h2>Dados do Trajeto</h2>
    <p><strong>Origem:</strong> ${data.originCity} - ${data.originState}</p>
    <p><strong>Destino:</strong> ${data.destinationCity} - ${data.destinationState}</p>
    <p><strong>Observação do trajeto:</strong> ${formatOptional(data.routeObservation)}</p>

    <h2>Contato</h2>
    <p><strong>Nome:</strong> ${data.name}</p>
    <p><strong>Empresa:</strong> ${formatOptional(data.company)}</p>
    <p><strong>E-mail:</strong> ${data.email}</p>
    <p><strong>Telefone:</strong> ${data.phone}</p>

    <h2>Mensagem adicional</h2>
    <p>${formatOptional(data.message)}</p>
  `;
}

async function sendEmail(data: QuoteFormData) {
  // Use env vars with fallback to default config
  const smtpHost = process.env.SMTP_HOST || 'smtp.ls2001.com.br';
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER || 'contato@ls2001.com.br';
  const smtpPass = process.env.SMTP_PASS || 'C99995000c';
  const smtpFrom = process.env.SMTP_FROM || 'contato@ls2001.com.br';

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: 'comercial@transgabardo.com.br',
    cc: 'ls2001@terra.com.br',
    subject: `[Gabardo] Pedido de cotação - ${data.vehicleBrand} ${data.vehicleModel || data.vehicleCategory}`,
    html: renderEmailTemplate(data),
    replyTo: data.email,
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Recebendo pedido de cotação...');
    const rawBody = await request.json();

    const formData: QuoteFormData = {
      name: sanitize(rawBody.name),
      company: sanitize(rawBody.company),
      email: sanitize(rawBody.email),
      phone: sanitize(rawBody.phone),
      vehicleCategory: sanitize(rawBody.vehicleCategory),
      vehicleBrand: sanitize(rawBody.vehicleBrand),
      vehicleModel: sanitize(rawBody.vehicleModel),
      vehicleYear: sanitize(rawBody.vehicleYear),
      vehicleValue: sanitize(rawBody.vehicleValue),
      vehicleObservation: sanitize(rawBody.vehicleObservation),
      originState: sanitize(rawBody.originState),
      originCity: sanitize(rawBody.originCity),
      destinationState: sanitize(rawBody.destinationState),
      destinationCity: sanitize(rawBody.destinationCity),
      routeObservation: sanitize(rawBody.routeObservation),
      message: sanitize(rawBody.message),
      privacyAccepted: Boolean(rawBody.privacyAccepted),
    };

    console.log('✅ Dados sanitizados:', {
      name: formData.name,
      email: formData.email,
      vehicle: `${formData.vehicleBrand} ${formData.vehicleModel}`,
      route: `${formData.originCity}/${formData.originState} → ${formData.destinationCity}/${formData.destinationState}`
    });

    const validation = validate(formData);
    if (!validation.isValid) {
      console.error('❌ Validation failed:', validation.errors);
      console.error('📋 Form data received:', formData);
      return NextResponse.json(
        {
          error: 'Dados inválidos no pedido de cotação.',
          details: validation.errors,
        },
        { status: 422 }
      );
    }

    console.log('✅ Validação passou, registrando solicitação...');

    const quoteRecord = await persistQuote(formData);

    console.log('🗂️ Cotação armazenada com ID:', quoteRecord?.id);

    console.log('✅ Registro salvo, enviando email...');

    let emailSent = false;
    let emailError = null;

    try {
      await sendEmail(formData);
      console.log('✅ Email enviado com sucesso!');
      emailSent = true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('❌ Erro ao enviar email:', errorMessage);
      console.error('📋 Detalhes:', error);
      emailError = errorMessage;
      // Continue anyway - don't fail the request if email fails
      console.warn('⚠️ Continuando apesar do erro no email...');
    }

    return NextResponse.json(
      {
        message: 'Cotação registrada com sucesso!',
        timestamp: new Date().toISOString(),
        emailSent,
        ...(emailError && { emailError }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erro ao processar pedido de cotação:', error);
    console.error('📋 Stack trace:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      {
        error: 'Erro interno ao enviar a cotação. Tente novamente mais tarde.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
