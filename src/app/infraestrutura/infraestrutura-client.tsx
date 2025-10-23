'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import InfraestruturaHeroSection from '@/components/custom/InfraestruturaHeroSection';
import FacilitiesPremium from '@/components/custom/FacilitiesPremium';
import SobreQualidadeInfraestruturaSection from '@/components/custom/SobreQualidadeInfraestruturaSection';
import InfraestruturaVideoSection from '@/components/custom/InfraestruturaVideoSection';
import PatiosUnidadesPremium from '@/components/custom/PatiosUnidadesPremium';

const MapboxSection = dynamic(() => import('@/components/custom/MapboxSection'), {
  loading: () => <div className="h-96 bg-gray-50" />
});
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function InfraestruturaClient() {
  // Scroll to top on mount to fix initial position
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="relative bg-gray-50 scroll-smooth">
      <Header variant="dark" />
      <InfraestruturaHeroSection />
      <FacilitiesPremium />
      <SobreQualidadeInfraestruturaSection />
      <InfraestruturaVideoSection />
      <PatiosUnidadesPremium />
      <MapboxSection />
      <Footer />
    </main>
  );
}
