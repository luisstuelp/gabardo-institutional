'use client';

import { useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import ServicesHeroSection from '@/components/custom/ServicesHeroSection';
import ServicesOverviewSection from '@/components/custom/ServicesOverviewSection';
import ServicesFleetSectionNew from '@/components/custom/ServicesFleetSectionNew';
import ServicesGridSection from '@/components/custom/ServicesGridSection';

export default function ServicesClient() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="relative bg-gray-50 scroll-smooth">
      <Header variant="dark" />
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <ServicesGridSection />
      <ServicesFleetSectionNew />
      <Footer />
    </main>
  );
}
