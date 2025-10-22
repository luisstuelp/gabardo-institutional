import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import InfraestruturaHeroSection from '@/components/custom/InfraestruturaHeroSection';
import FacilitiesPremium from '@/components/custom/FacilitiesPremium';
import SobreQualidadeInfraestruturaSection from '@/components/custom/SobreQualidadeInfraestruturaSection';
import PatiosUnidadesPremium from '@/components/custom/PatiosUnidadesPremium';

const MapboxSection = dynamic(() => import('@/components/custom/MapboxSection'), {
  loading: () => <div className="h-96 bg-gray-50" />
});
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function InfraestruturaPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <InfraestruturaHeroSection />
      <FacilitiesPremium />
      <SobreQualidadeInfraestruturaSection />
      <PatiosUnidadesPremium />
      <MapboxSection />
      <Footer />
    </main>
  );
}
