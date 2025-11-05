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
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pedido de Cotação - Gabardo Transportes</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">🚛 Novo Pedido de Cotação</h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">Transporte de Veículos</p>
            </td>
          </tr>

          <!-- Vehicle Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">🚗 Dados do Veículo</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; width: 50%;">
                    <strong style="color: #6b7280; font-size: 13px;">Categoria:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.vehicleCategory}</p>
                  </td>
                  <td style="padding: 8px 0; width: 50%;">
                    <strong style="color: #6b7280; font-size: 13px;">Ano:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.vehicleYear}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; width: 50%;">
                    <strong style="color: #6b7280; font-size: 13px;">Marca:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.vehicleBrand}</p>
                  </td>
                  <td style="padding: 8px 0; width: 50%;">
                    <strong style="color: #6b7280; font-size: 13px;">Modelo:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.vehicleModel}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <strong style="color: #6b7280; font-size: 13px;">Valor Declarado:</strong>
                    <p style="margin: 3px 0; color: #059669; font-size: 18px; font-weight: bold;">${formatCurrency(data.vehicleValue)}</p>
                  </td>
                </tr>
                ${data.vehicleObservation ? `
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <strong style="color: #6b7280; font-size: 13px;">Observações:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 14px;">${data.vehicleObservation}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Route Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">📍 Trajeto</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #f0f9ff; border-radius: 8px; width: 48%;">
                    <strong style="color: #059669; font-size: 13px; text-transform: uppercase;">🟢 Origem</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: bold;">${data.originCity}, ${data.originState}</p>
                  </td>
                  <td style="width: 4%; text-align: center; color: #9ca3af; font-size: 20px;">→</td>
                  <td style="padding: 15px; background-color: #fef3c7; border-radius: 8px; width: 48%;">
                    <strong style="color: #dc2626; font-size: 13px; text-transform: uppercase;">🔴 Destino</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: bold;">${data.destinationCity}, ${data.destinationState}</p>
                  </td>
                </tr>
                ${data.routeObservation ? `
                <tr>
                  <td colspan="3" style="padding: 15px 0 0 0;">
                    <strong style="color: #6b7280; font-size: 13px;">Observações do Trajeto:</strong>
                    <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 14px;">${data.routeObservation}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">👤 Dados de Contato</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px; padding: 15px;">
                <tr>
                  <td style="padding: 8px;">
                    <strong style="color: #6b7280; font-size: 13px;">Nome:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.name}</p>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 8px;">
                    <strong style="color: #6b7280; font-size: 13px;">Empresa:</strong>
                    <p style="margin: 3px 0; color: #1f2937; font-size: 15px;">${data.company}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px;">
                    <strong style="color: #6b7280; font-size: 13px;">Email:</strong>
                    <p style="margin: 3px 0;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none; font-size: 15px;">${data.email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px;">
                    <strong style="color: #6b7280; font-size: 13px;">Telefone:</strong>
                    <p style="margin: 3px 0;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none; font-size: 15px;">${data.phone}</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${data.message ? `
          <!-- Additional Message -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">💬 Mensagem Adicional</h2>
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Este email foi enviado automaticamente pelo formulário de orçamento</p>
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

function renderConfirmationEmailTemplate(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação - Pedido de Cotação Recebido</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">✓ Pedido de Cotação Recebido!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 14px;">Obrigado por confiar na Gabardo</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">Olá <strong>${data.name}</strong>,</p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">Recebemos seu pedido de cotação para transporte de veículo. Nossa equipe comercial irá analisar e retornar com a melhor proposta em breve.</p>

              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 15px 0; color: #374151; font-size: 14px;"><strong>Resumo do seu pedido:</strong></p>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0;">
                      <span style="color: #6b7280; font-size: 13px;">Veículo:</span>
                      <strong style="color: #1f2937; font-size: 14px; display: block;">${data.vehicleBrand} ${data.vehicleModel} (${data.vehicleYear})</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">
                      <span style="color: #6b7280; font-size: 13px;">Trajeto:</span>
                      <strong style="color: #1f2937; font-size: 14px; display: block;">${data.originCity}/${data.originState} → ${data.destinationCity}/${data.destinationState}</strong>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                <strong>Prazo de resposta:</strong> Geralmente respondemos em até 24 horas úteis.<br>
                <strong>Dúvidas urgentes:</strong> Entre em contato pelo telefone comercial ou responda este email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px;">Gabardo Transportes</p>
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 11px;">www.transgabardo.com.br</p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">comercial@transgabardo.com.br</p>
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

async function sendEmail(data: QuoteFormData) {
  // Configurar transporter do Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Enviar email para equipe comercial
  const info = await transporter.sendMail({
    from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
    to: 'comercial@transgabardo.com.br',
    cc: 'ls2001@terra.com.br',
    subject: `[Gabardo] Pedido de cotação - ${data.vehicleBrand} ${data.vehicleModel || data.vehicleCategory}`,
    html: renderEmailTemplate(data),
    replyTo: data.email,
  });

  console.log('✅ Email enviado com sucesso! Message ID:', info.messageId);

  // Enviar email de confirmação para o cliente
  try {
    await transporter.sendMail({
      from: `"Gabardo Transportes" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: '✓ Pedido de Cotação Recebido - Gabardo Transportes',
      html: renderConfirmationEmailTemplate(data),
    });

    console.log('✅ Email de confirmação enviado para:', data.email);
  } catch (confirmError) {
    console.warn('⚠️ Não foi possível enviar email de confirmação:', confirmError);
  }
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
