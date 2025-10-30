'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import MediaNewsHeroSection from '@/components/custom/MediaNewsHeroSection';
import MediaArticlesGrid from '@/components/custom/MediaArticlesGrid';
import type { MediaArticle } from '@/data/mediaArticles';

const Footer = dynamic(() => import('@/components/layout/Footer'));

interface MidiaClientProps {
  articles: MediaArticle[];
}

export default function MidiaClient({ articles }: MidiaClientProps) {
  return (
    <main className="relative bg-white scroll-smooth">
      <Header variant="light" />
      <MediaNewsHeroSection />
      <MediaArticlesGrid articles={articles} />
      <Footer />
    </main>
  );
}
