
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TechnologyHeroSection from '@/components/custom/TechnologyHeroSection';
import TechnologyFeaturesSection from '@/components/custom/TechnologyFeaturesSection';

export default function TecnologiaPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <TechnologyHeroSection />
      <TechnologyFeaturesSection />
      <Footer />
    </main>
  );
}
