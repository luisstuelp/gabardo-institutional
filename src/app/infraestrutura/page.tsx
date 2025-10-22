import type { Metadata } from 'next';
import InfraestruturaClient from './infraestrutura-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.transgabardo.com.br'),
  title: 'Infraestrutura | Gabardo Transportes - Pátios e Unidades',
  description: '11 unidades estratégicas, capacidade para 27 mil veículos, instalações modernas com boxes climatizados, CFTV 24/7, energia solar e conectividade SD-WAN. Infraestrutura de ponta para transporte de veículos.',
  keywords: [
    'infraestrutura Gabardo',
    'pátios estratégicos',
    '11 unidades Brasil',
    'capacidade 27 mil veículos',
    'boxes climatizados',
    'CFTV 24/7 logística',
    'energia solar transporte',
    'SD-WAN conectividade',
    'oficinas próprias cegonha',
    'infraestrutura logística',
  ],
  openGraph: {
    title: 'Infraestrutura | Gabardo - 11 Unidades em 4 Regiões',
    description: 'Instalações modernas, pátios estrategicamente localizados e tecnologia de ponta. 27.450 veículos de capacidade total distribuída nacionalmente.',
    url: 'https://www.transgabardo.com.br/infraestrutura',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infraestrutura Gabardo - 11 Unidades Estratégicas',
    description: 'Pátios modernos, boxes climatizados, segurança 24/7 e sustentabilidade em toda nossa rede.',
  },
  alternates: {
    canonical: 'https://www.transgabardo.com.br/infraestrutura',
  },
};

export default function InfraestruturaPage() {
  return <InfraestruturaClient />;
}
