'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import MidiaHeroSection from '@/components/custom/MidiaHeroSection';
import MidiaContentSection from '@/components/custom/MidiaContentSection';
import MidiaContactSection from '@/components/custom/MidiaContactSection';

const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function MidiaClient() {
  return (
    <main className="relative bg-white scroll-smooth">
      <Header variant="dark" />
      <MidiaHeroSection />
      <MidiaContentSection />
      <MidiaContactSection />
      <Footer />
    </main>
  );
}
