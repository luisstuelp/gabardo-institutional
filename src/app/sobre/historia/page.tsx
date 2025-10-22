import type { Metadata } from 'next';
import HistoriaClient from './historia-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.transgabardo.com.br'),
  title: 'Nossa História | Gabardo Transportes - 36 Anos de Excelência',
  description: 'Desde 1989, a Gabardo construiu a maior frota própria de cegonhas do Brasil. Conheça nossa jornada de expansão, certificações ISO e liderança em sustentabilidade ESG no transporte de veículos.',
  keywords: [
    'história Gabardo transporte',
    'linha do tempo Gabardo',
    '36 anos Gabardo',
    'fundador Sérgio Gabardo',
    'maior frota cegonhas Brasil',
    'ISO 9001 14001 39001',
    'certificação carbono negativo',
    'ESG transporte veículos',
    'expansão nacional logística',
    'Pacto Global ONU Gabardo',
  ],
  authors: [{ name: 'Gabardo' }],
  creator: 'Gabardo',
  publisher: 'Gabardo',
  openGraph: {
    title: 'Nossa História | Gabardo Transportes - 36 Anos de Liderança',
    description: 'De um único caminhão em 1989 à maior frota própria de cegonhas do Brasil. História de expansão, inovação e compromisso com excelência em transporte de veículos.',
    url: 'https://www.transgabardo.com.br/sobre/historia',
    images: [
      {
        url: 'https://www.transgabardo.com.br/og/gabardo-historia.jpg',
        width: 1200,
        height: 630,
        alt: 'História Gabardo - 36 Anos de Excelência em Transporte de Veículos',
      },
    ],
    siteName: 'Gabardo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nossa História | Gabardo Transportes - 36 Anos',
    description: 'De 1989 à liderança nacional: história da maior frota própria de cegonhas do Brasil e pioneira em sustentabilidade.',
    images: ['https://www.transgabardo.com.br/og/gabardo-historia.jpg'],
  },
  alternates: {
    canonical: 'https://www.transgabardo.com.br/sobre/historia',
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