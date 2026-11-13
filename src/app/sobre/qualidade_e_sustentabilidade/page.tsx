import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import SobreQualidadeHeroSection from '@/components/custom/SobreQualidadeHeroSection';
import SobreQualidadeCertificationsSection from '@/components/custom/SobreQualidadeCertificationsSection';

// Lazy load sections for better performance
const ClimateChangeSection = dynamic(() => import('@/components/custom/ClimateChangeSection'));
const CarbonCompensationSection = dynamic(() => import('@/components/custom/CarbonCompensationSection'));
const SustainabilityReportSection = dynamic(() => import('@/components/custom/SustainabilityReportSection'));
const ESGSection = dynamic(() => import('@/components/custom/EASGSection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function SobreQualidadePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreQualidadeHeroSection />
      <SobreQualidadeCertificationsSection />
      <section className="scroll-mt-32" id="qualidade-ambiental">
        <ClimateChangeSection />
        <CarbonCompensationSection />
        <SustainabilityReportSection />
        <ESGSection />
      </section>

      <Footer />
    </main>
  );
}
