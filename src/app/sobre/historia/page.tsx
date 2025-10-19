import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreHistoriaHeroSection from '@/components/custom/SobreHistoriaHeroSection';
import SobreHistoriaTimelineSection from '@/components/custom/SobreHistoriaTimelineSection';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabardo.com.br'),
  title: 'Linha do Tempo | Gabardo',
  description:
    'Conheça a trajetória da Gabardo desde 1989, com marcos de inovação, expansão e excelência logística em todo o Brasil.',
  keywords: [
    'Gabardo',
    'História Gabardo',
    'Linha do tempo logística',
    'Transporte automotivo',
    'ISO 9001 Gabardo',
    'Sustentabilidade logística',
    'Operador logístico Brasil',
    'Histórico empresarial',
    'Transporte multimodal',
    'Distribuição automotiva',
  ],
  authors: [{ name: 'Gabardo' }],
  creator: 'Gabardo',
  publisher: 'Gabardo',
  openGraph: {
    title: 'Linha do Tempo | Gabardo',
    description:
      'Evolução da Gabardo ao longo das décadas, com marcos em certificações, sustentabilidade e expansão nacional.',
    url: 'https://gabardo.com.br/sobre/historia',
    images: [
      {
        url: 'https://gabardo.com.br/og/gabardo-historia.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabardo - Linha do Tempo',
      },
    ],
    siteName: 'Gabardo',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linha do Tempo Gabardo',
    images: ['https://gabardo.com.br/og/gabardo-historia.jpg'],
    description:
      'História da Gabardo com marcos de crescimento, certificações ISO e compromisso ambiental.',
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

export default function SobreHistoriaPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreHistoriaHeroSection />
      <SobreHistoriaTimelineSection />
      <Footer />
    </main>
  );
}