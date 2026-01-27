import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import LocationsHero from '@/components/custom/LocationsHero';
import LocationsMap from '@/components/custom/LocationsMap';
import LocationsGrid from '@/components/custom/LocationsGrid';
import LocationsStats from '@/components/custom/LocationsStats';

export const metadata: Metadata = {
  title: 'Nossas Localizações | Transportes Gabardo',
  description: 'Encontre a unidade Transportes Gabardo mais próxima de você. Estamos presentes em diversas cidades para melhor atendê-lo.',
  keywords: 'gabardo, transportes, localizações, endereços, unidades, atendimento, contato',
  openGraph: {
    title: 'Nossas Localizações | Transportes Gabardo',
    description: 'Encontre a unidade Transportes Gabardo mais próxima de você. Estamos presentes em diversas cidades para melhor atendê-lo.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <LocationsHero />
      
      {/* Interactive Map */}
      <LocationsMap />
      
      {/* Statistics Section */}
      <LocationsStats />
      
      {/* Locations Grid */}
      <LocationsGrid />
    </main>
  );
} 