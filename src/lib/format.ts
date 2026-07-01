// Formatting utilities for Gabardo E-commerce

/**
 * Format price to Brazilian currency
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format mileage with thousand separators
 */
export function formatMileage(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value) + ' km';
}

/**
 * Format year display (manufacture/model)
 */
export function formatYear(yearManufacture: number, yearModel: number): string {
  if (yearManufacture === yearModel) {
    return String(yearManufacture);
  }
  return `${yearManufacture}/${yearModel}`;
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Format WhatsApp link
 */
export function formatWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const baseUrl = `https://wa.me/${cleaned}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

/**
 * Get fuel type label in Portuguese
 */
export function getFuelLabel(fuel: string): string {
  const labels: Record<string, string> = {
    diesel: 'Diesel',
    gas: 'Gás',
    electric: 'Elétrico',
    hybrid: 'Híbrido',
  };
  return labels[fuel] || fuel;
}

/**
 * Get transmission type label in Portuguese
 */
export function getTransmissionLabel(transmission: string): string {
  const labels: Record<string, string> = {
    manual: 'Manual',
    automatic: 'Automático',
    automated: 'Automatizado',
  };
  return labels[transmission] || transmission;
}

/**
 * Calculate financing installment using Price formula
 * @param principal - Loan amount
 * @param monthlyRate - Monthly interest rate (e.g., 0.0199 for 1.99%)
 * @param months - Number of months
 */
export function calculateInstallment(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  if (monthlyRate === 0) {
    return principal / months;
  }
  const installment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(installment * 100) / 100;
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format relative time (e.g., "há 2 dias")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `Há ${diffDays} dias`;
  if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} meses`;
  return `Há ${Math.floor(diffDays / 365)} anos`;
}
