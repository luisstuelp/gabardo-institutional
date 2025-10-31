import type { Metadata } from 'next';
import { fetchMidiaServer } from '@/services/midia';
import MidiaClient from './midia-client';

export const revalidate = 0;

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

type SupabaseMidia = {
  id: string;
  title: string;
  source: string;
  url: string;
  description: string | null;
  thumbnail: string | null;
  published_date: string | null;
  category: string | null;
  read_time: string | null;
  created_at: string | null;
  updated_at: string | null;
  author_id: string | null;
};

export default async function MidiaPage() {
  const supabaseMidia = await fetchMidiaServer() as SupabaseMidia[];
  
  // Transform Supabase data to match MediaArticle format
  const transformedArticles = supabaseMidia.map((midia) => ({
    id: midia.id,
    title: midia.title,
    excerpt: midia.description || '',
    category: midia.category || 'Geral',
    date: midia.published_date || new Date(midia.created_at || '').toISOString(),
    readTime: midia.read_time || '5 min',
    image: midia.thumbnail || '/images/default-midia.jpg',
    url: midia.url,
    featured: false,
    author: midia.source,
  }));

  return <MidiaClient articles={transformedArticles} />;
}
