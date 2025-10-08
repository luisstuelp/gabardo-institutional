import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';
import SobreInstitucionalOverviewSection from '@/components/custom/SobreInstitucionalOverviewSection';
import SobreInstitucionalOperationsSection from '@/components/custom/SobreInstitucionalOperationsSection';
import PillarsSection from '@/components/custom/PillarsSection';
import HomeHoverCardsSection from '@/components/custom/HomeHoverCardsSection';
import AboutClientsCarousel from '@/components/custom/AboutClientsCarousel';

export default function SobreSecaoInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreInstitucionalHeroSection />
      <SobreInstitucionalOverviewSection />
      <SobreInstitucionalOperationsSection />
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gabardo-blue">Nossos Pilares</h2>
            <p className="text-lg text-gray-600 mt-4">Os fundamentos que guiam nossas ações e decisões.</p>
          </div>
          <PillarsSection />
        </div>
      </section>
      <HomeHoverCardsSection />
      <AboutClientsCarousel />
      <Footer />
    </main>
  );
}
