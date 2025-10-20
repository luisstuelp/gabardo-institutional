import type { Metadata } from 'next';
import HistoriaClient from './historia-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabardo.com.br'),
  title: 'Nossa História | Gabardo',
  description: 'Conheça a história da Gabardo desde 1989: valores sólidos, desenvolvimento e compromisso com excelência. Uma jornada de integridade, inovação e respeito.',
  keywords: [
    'História Gabardo',
    'Linha do tempo Gabardo',
    'Valores empresariais',
    'Missão e Visão',
    'Desenvolvimento profissional',
    'ISO 9001 Gabardo',
    'Sustentabilidade logística',
    'Integridade e ética',
    'Inovação logística',
    'Carreira em logística',
  ],
  authors: [{ name: 'Gabardo' }],
  creator: 'Gabardo',
  publisher: 'Gabardo',
  openGraph: {
    title: 'Nossa História | Gabardo',
    description: 'Descubra como construímos uma empresa onde pessoas transformam desafios em conquistas com integridade, inovação e respeito desde 1989.',
    url: 'https://gabardo.com.br/sobre/historia',
    images: [
      {
        url: 'https://gabardo.com.br/og/gabardo-historia.jpg',
        width: 1200,
        height: 630,
        alt: 'História Gabardo - Nossa Jornada',
      },
    ],
    siteName: 'Gabardo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossa História | Gabardo',
    description: 'Uma jornada de 36 anos construindo excelência em logística com valores sólidos e pessoas extraordinárias.',
    images: ['https://gabardo.com.br/og/gabardo-historia.jpg'],
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

export default function HistoriaPage() {
  return <HistoriaClient />;
}