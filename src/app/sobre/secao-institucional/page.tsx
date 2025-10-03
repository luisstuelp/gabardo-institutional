import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';
import SobreInstitucionalOverviewSection from '@/components/custom/SobreInstitucionalOverviewSection';
import SobreInstitucionalOperationsSection from '@/components/custom/SobreInstitucionalOperationsSection';
import SobreInstitucionalHighlightsSection from '@/components/custom/SobreInstitucionalHighlightsSection';
import HomeHoverCardsSection from '@/components/custom/HomeHoverCardsSection';
import AboutCulturaSection from '@/components/custom/AboutCulturaSection';
import AboutClientsSection from '@/components/custom/AboutClientsSection';

export default function SobreSecaoInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreInstitucionalHeroSection />
      <SobreInstitucionalOverviewSection />
      <SobreInstitucionalOperationsSection />
      <SobreInstitucionalHighlightsSection />
      <HomeHoverCardsSection />
      <AboutCulturaSection />
      <AboutClientsSection />
      <Footer />
    </main>
  );
}
