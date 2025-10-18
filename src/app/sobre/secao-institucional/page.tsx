import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';
import SobreInstitucionalOverviewSection from '@/components/custom/SobreInstitucionalOverviewSection';
import SobreInstitucionalOperationsSection from '@/components/custom/SobreInstitucionalOperationsSection';
import HomeHoverCardsSection from '@/components/custom/HomeHoverCardsSection';
import AboutClientsCarousel from '@/components/custom/AboutClientsCarousel';

export default function SobreSecaoInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreInstitucionalHeroSection />
      <SobreInstitucionalOverviewSection />
      <SobreInstitucionalOperationsSection />
      <HomeHoverCardsSection />
      <AboutClientsCarousel />
      <Footer />
    </main>
  );
}
