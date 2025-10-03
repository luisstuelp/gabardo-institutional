import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';
import SobreInstitucionalOverviewSection from '@/components/custom/SobreInstitucionalOverviewSection';
import SobreInstitucionalOperationsSection from '@/components/custom/SobreInstitucionalOperationsSection';
import SobreInstitucionalHighlightsSection from '@/components/custom/SobreInstitucionalHighlightsSection';
import AboutCulturaSection from '@/components/custom/AboutCulturaSection';
import SobreInstitucionalCTASection from '@/components/custom/SobreInstitucionalCTASection';

export default function SobreInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreInstitucionalHeroSection />
      <SobreInstitucionalOverviewSection />
      <SobreInstitucionalOperationsSection />
      <SobreInstitucionalHighlightsSection />
      <AboutCulturaSection />
      <SobreInstitucionalCTASection />
      <Footer />
    </main>
  );
}
