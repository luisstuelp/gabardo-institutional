'use client';
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import EquipeHeroSection from '@/components/custom/EquipeHeroSection';
import TeamSection from '@/components/custom/TeamSection';
import PartnersSection from '@/components/custom/PartnersSection';
import JoinTeamSection from '@/components/custom/JoinTeamSection';
import MagicBento from '@/components/custom/MagicBento';

export default function EquipePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <EquipeHeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MagicBento />
          </div>
          <div>
            <PartnersSection />
          </div>
        </div>
      </div>
      <JoinTeamSection />
      <Footer />
    </main>
  );
}