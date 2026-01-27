import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreConformidadeHeroSection from '@/components/custom/SobreConformidadeHeroSection';
import SobreConformidadePrinciplesSection from '@/components/custom/SobreConformidadePrinciplesSection';
import SobreConformidadeProcessSection from '@/components/custom/SobreConformidadeProcessSection';
import SobreConformidadeHighlightsSection from '@/components/custom/SobreConformidadeHighlightsSection';
import SobreConformidadeCTASection from '@/components/custom/SobreConformidadeCTASection';

export default function SobreConformidadeELGPDPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreConformidadeHeroSection />
      <SobreConformidadePrinciplesSection />
      <SobreConformidadeProcessSection />
      <SobreConformidadeHighlightsSection />
      <SobreConformidadeCTASection />
      <Footer />
    </main>
  );
}
