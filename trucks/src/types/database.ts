// Database types for Gabardo E-commerce

export type VehicleStatus = 'available' | 'reserved' | 'sold';
export type FuelType = 'diesel' | 'gas' | 'electric' | 'hybrid';
export type TransmissionType = 'manual' | 'automatic' | 'automated';
export type AppRole = 'admin' | 'moderator' | 'user';

export interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  is_headquarters: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year_manufacture: number;
  year_model: number;
  price: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  axle_config: string | null;
  power: string | null;
  color: string | null;
  description: string | null;
  specs: Record<string, unknown> | null;
  fipe_code: string | null;
  fipe_value: number | null;
  is_featured: boolean;
  is_special_offer: boolean;
  is_semi_new: boolean;
  is_single_owner: boolean;
  status: VehicleStatus;
  branch_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  url: string;
  alt: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface VehicleWithImages extends Vehicle {
  images: VehicleImage[];
  branch?: Branch;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  vehicle_id: string;
  created_at: string;
}

export interface Lead {
  id: string;
  vehicle_id: string | null;
  branch_id: string | null;
  user_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  user_id: string | null;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

// Filter types
export interface VehicleFilters {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
  axleConfig?: string;
  search?: string;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  isSemiNew?: boolean;
}

// Price ranges for filter
export const PRICE_RANGES = [
  { label: 'Até R$ 300.000', min: 0, max: 300000 },
  { label: 'R$ 300.000 - R$ 500.000', min: 300000, max: 500000 },
  { label: 'R$ 500.000 - R$ 700.000', min: 500000, max: 700000 },
  { label: 'R$ 700.000 - R$ 900.000', min: 700000, max: 900000 },
  { label: 'Acima de R$ 900.000', min: 900000, max: null },
];

// Year ranges
export const YEAR_RANGES = [
  { label: '2024', value: 2024 },
  { label: '2023', value: 2023 },
  { label: '2022', value: 2022 },
  { label: '2021', value: 2021 },
  { label: '2020', value: 2020 },
  { label: '2019 ou anterior', value: 2019 },
];

// Brands
export const BRANDS = [
  { name: 'Volvo', logo: '/brands/volvo.svg' },
  { name: 'Scania', logo: '/brands/scania.svg' },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes.svg' },
  { name: 'DAF', logo: '/brands/daf.svg' },
  { name: 'MAN', logo: '/brands/man.svg' },
  { name: 'Iveco', logo: '/brands/iveco.svg' },
  { name: 'Volkswagen', logo: '/brands/vw.svg' },
  { name: 'Ford', logo: '/brands/ford.svg' },
];

// Company info
export const COMPANY_INFO = {
  name: 'Gabardo – Transporte de Veículos',
  legalName: 'Transportes Gabardo Ltda',
  cnpj: '92.644.483/0001-85',
  headquarters: {
    address: 'Av. Fernando Ferrari, 700 - Anchieta',
    city: 'Porto Alegre',
    state: 'RS',
    cep: '90200-230',
    mapsUrl: 'https://maps.app.goo.gl/XUcq2YCMRnNZcwrz5',
  },
  phone: '+55 (51) 3373-3000',
  phoneLink: 'tel:+555133733000',
  whatsapp: '5551933733000',
  email: 'gabardo@transgabardo.com.br',
  lgpdEmail: 'lgpd@transgabardo.com.br',
  website: 'https://www.transgabardo.com.br/',
  mission: 'Atender com segurança, agilidade, sustentabilidade e tecnologia. Referência em logística na América Latina.',
  social: {
    instagram: 'https://www.instagram.com/transportesgabardo/',
    facebook: 'https://www.facebook.com/Transgabardo/',
    linkedin: 'https://www.linkedin.com/company/transportes-gabardo/',
    youtube: 'https://www.youtube.com/@transportesgabardo',
  },
};

// Statistics for homepage
export const STATS = [
  { label: 'Anos no mercado', value: '50+' },
  { label: 'Veículos vendidos', value: '5.000+' },
  { label: 'Clientes satisfeitos', value: '3.000+' },
  { label: 'Estados atendidos', value: '27' },
];
