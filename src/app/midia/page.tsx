import type { Metadata } from 'next';
import MidiaClient from './midia-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.transgabardo.com.br'),
  title: 'Mídia | Gabardo Transportes - Imprensa e Assessoria',
  description: 'Central de mídia da Gabardo Transportes. Materiais para imprensa, logos, fotos, vídeos institucionais e contato com assessoria de comunicação.',
  keywords: [
    'mídia Gabardo',
    'imprensa transportes',
    'assessoria comunicação',
    'press kit Gabardo',
    'logos institucionais',
    'fotos corporativas',
    'vídeos institucionais',
    'contato imprensa',
    'kit mídia logística',
    'materiais divulgação',
  ],
  openGraph: {
    title: 'Mídia | Gabardo - Central de Imprensa',
    description: 'Acesse materiais institucionais, logos, fotos e vídeos da Gabardo Transportes. Central completa para jornalistas e parceiros.',
    url: 'https://www.transgabardo.com.br/midia',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mídia Gabardo - Central de Imprensa',
    description: 'Materiais institucionais, press kit e contato com assessoria de comunicação.',
  },
  alternates: {
    canonical: 'https://www.transgabardo.com.br/midia',
  },
};

export default function MidiaPage() {
  return <MidiaClient />;
}
