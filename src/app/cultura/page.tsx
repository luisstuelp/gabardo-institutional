import type { Metadata } from 'next';
import CulturaClient from './cultura-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabardo.com.br'),
  title: 'Nossa Cultura | Gabardo',
  description: 'Conheça a cultura Gabardo: valores sólidos, desenvolvimento de pessoas e compromisso com excelência desde 1989. Uma jornada de integridade, inovação e respeito.',
  keywords: [
    'Cultura Gabardo',
    'Valores empresariais',
    'História Gabardo',
    'Missão e Visão',
    'Desenvolvimento profissional',
    'Ambiente de trabalho',
    'Integridade e ética',
    'Inovação logística',
    'Sustentabilidade empresarial',
    'Carreira em logística',
  ],
  authors: [{ name: 'Gabardo' }],
  creator: 'Gabardo',
  publisher: 'Gabardo',
  openGraph: {
    title: 'Nossa Cultura | Gabardo',
    description: 'Descubra como construímos uma empresa onde pessoas transformam desafios em conquistas com integridade, inovação e respeito.',
    url: 'https://gabardo.com.br/cultura',
    images: [
      {
        url: 'https://gabardo.com.br/og/gabardo-cultura.jpg',
        width: 1200,
        height: 630,
        alt: 'Cultura Gabardo - Nossa Jornada',
      },
    ],
    siteName: 'Gabardo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossa Cultura | Gabardo',
    description: 'Uma jornada de 35 anos construindo excelência em logística com valores sólidos e pessoas extraordinárias.',
    images: ['https://gabardo.com.br/og/gabardo-cultura.jpg'],
    creator: '@gabardo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CulturaPage() {
  return <CulturaClient />;
}
