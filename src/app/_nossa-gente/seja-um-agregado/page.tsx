import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SejaAgregadoHeroSection from '@/components/custom/SejaAgregadoHeroSection';
import SejaAgregadoIntroSection from '@/components/custom/SejaAgregadoIntroSection';
import SejaAgregadoRequirementsSection from '@/components/custom/SejaAgregadoRequirementsSection';
import SejaAgregadoBenefitsSection from '@/components/custom/SejaAgregadoBenefitsSection';
import SejaAgregadoTestimonialsSection from '@/components/custom/SejaAgregadoTestimonialsSection';
import SejaAgregadoCTASection from '@/components/custom/SejaAgregadoCTASection';

export default function SejaUmAgregadoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SejaAgregadoHeroSection />
      <SejaAgregadoIntroSection />
      <SejaAgregadoRequirementsSection />
      <SejaAgregadoBenefitsSection />
      <SejaAgregadoTestimonialsSection />
      <SejaAgregadoCTASection />
      <Footer />
    </main>
  );
}
