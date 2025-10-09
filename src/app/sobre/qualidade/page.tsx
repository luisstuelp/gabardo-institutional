import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreQualidadeHeroSection from '@/components/custom/SobreQualidadeHeroSection';
import SobreQualidadeCertificationsSection from '@/components/custom/SobreQualidadeCertificationsSection';

export default function SobreQualidadePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreQualidadeHeroSection />
      <SobreQualidadeCertificationsSection />
      <Footer />
    </main>
  );
}
