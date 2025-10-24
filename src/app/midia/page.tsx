import type { Metadata } from 'next';
import MidiaClient from './midia-client';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.transgabardo.com.br'),
  title: 'Mídia | Gabardo Transportes - Notícias e Artigos',
  description: 'Acompanhe as últimas notícias, artigos e insights da Gabardo Transportes. Central de conteúdo sobre inovação, sustentabilidade e logística automotiva.',
  keywords: [
    'notícias Gabardo',
    'artigos transporte veículos',
    'blog logística',
    'inovação transportes',
    'sustentabilidade logística',
    'tendências automotivas',
    'imprensa Gabardo',
    'mídia corporativa',
    'insights logística',
    'novidades transporte',
  ],
  openGraph: {
    title: 'Mídia | Gabardo - Notícias e Artigos',
    description: 'Central de notícias, artigos e insights sobre inovação, sustentabilidade e logística automotiva da Gabardo Transportes.',
    url: 'https://www.transgabardo.com.br/midia',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mídia Gabardo - Notícias e Artigos',
    description: 'Acompanhe insights do setor, inovações e conquistas da Gabardo Transportes.',
  },
  alternates: {
    canonical: 'https://www.transgabardo.com.br/midia',
  },
};

export default function MidiaPage() {
  return <MidiaClient />;
}
