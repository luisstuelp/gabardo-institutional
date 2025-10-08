'use client';
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import EquipeHeroSection from '@/components/custom/EquipeHeroSection';

import MagicBento from '@/components/custom/MagicBento';
import JoinTeamSection from '@/components/custom/JoinTeamSection';


export default function EquipePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <EquipeHeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MagicBento />
      </div>
      <JoinTeamSection />
      <Footer />
    </main>
  );
}