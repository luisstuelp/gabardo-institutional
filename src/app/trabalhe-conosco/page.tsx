import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TrabalheConoscoHeroSection from '@/components/custom/TrabalheConoscoHeroSection';
import TrabalheConoscoIntroSection from '@/components/custom/TrabalheConoscoIntroSection';
import TrabalheConoscoBenefitsSection from '@/components/custom/TrabalheConoscoBenefitsSection';
import ServicesQuoteSection from '@/components/custom/ServicesQuoteSection';
import ServicesAdvantagesSection from '@/components/custom/ServicesAdvantagesSection';
import PartnersSection from '@/components/custom/PartnersSection';

export default function TrabalheConoscoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <TrabalheConoscoHeroSection />
      <TrabalheConoscoIntroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PartnersSection />
      </div>
      <TrabalheConoscoBenefitsSection />
      <ServicesAdvantagesSection />
      <ServicesQuoteSection />
      <Footer />
    </main>
  );
}
