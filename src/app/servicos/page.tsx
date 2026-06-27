import type { Metadata } from 'next';
import ServicesClient from './servicos-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabardo.com'),
  title: 'Serviços | Gabardo Transportes - Soluções Logísticas',
  description: 'Serviços completos de transporte automotivo: frota cegonha, truck, plataforma e prancha. Operações dedicadas, tecnologia embarcada e 2.000+ equipamentos próprios.',
  keywords: [
    'serviços logísticos Gabardo',
    'transporte automotivo',
    'frota cegonha',
    'frota truck',
    'frota plataforma',
    'frota prancha',
    'transporte de veículos',
    'operações dedicadas',
    '2000 equipamentos',
    'transporte montadoras',
  ],
  openGraph: {
    title: 'Serviços Gabardo - Soluções Logísticas Completas',
    description: 'Frota própria de 2.000+ equipamentos. Cegonha, Truck, Plataforma e Prancha para transporte automotivo.',
    url: 'https://gabardo.com/servicos',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serviços Gabardo - Transporte Automotivo',
    description: 'Maior frota própria do Brasil com tecnologia embarcada.',
  },
  alternates: {
    canonical: 'https://gabardo.com/servicos',
  },
};

export default function ServicosPage() {
  return <ServicesClient />;
}
