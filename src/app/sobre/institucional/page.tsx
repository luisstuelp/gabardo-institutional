import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';
import SobreInstitucionalOverviewSection from '@/components/custom/SobreInstitucionalOverviewSection';
import SobreInstitucionalOperationsSection from '@/components/custom/SobreInstitucionalOperationsSection';
import SobreInstitucionalCTASection from '@/components/custom/SobreInstitucionalCTASection';

export default function SobreInstitucionalPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreInstitucionalHeroSection />
      <SobreInstitucionalOverviewSection />
      <SobreInstitucionalOperationsSection />
      <SobreInstitucionalCTASection />
      <Footer />
    </main>
  );
}
