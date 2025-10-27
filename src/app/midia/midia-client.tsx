'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import MediaNewsHeroSection from '@/components/custom/MediaNewsHeroSection';
import MediaArticlesGrid from '@/components/custom/MediaArticlesGrid';

const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function MidiaClient() {
  return (
    <main className="relative bg-white scroll-smooth">
      <Header variant="light" />
      <MediaNewsHeroSection />
      <MediaArticlesGrid />
      <Footer />
    </main>
  );
}
