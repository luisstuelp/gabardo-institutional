import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import SobreQualidadeHeroSection from '@/components/custom/SobreQualidadeHeroSection';
import SobreQualidadeCertificationsSection from '@/components/custom/SobreQualidadeCertificationsSection';

// Lazy load sections for better performance
const ClimateChangeSection = dynamic(() => import('@/components/custom/ClimateChangeSection'));
const HowWeActSection = dynamic(() => import('@/components/custom/HowWeActSection'));
const CarbonCompensationSection = dynamic(() => import('@/components/custom/CarbonCompensationSection'));
const SustainabilityReportSection = dynamic(() => import('@/components/custom/SustainabilityReportSection'));
const ESGSection = dynamic(() => import('@/components/custom/EASGSection'));
const HomeSustainabilitySpotlight = dynamic(() => import('@/components/custom/HomeSustainabilitySpotlight'));
const MaxAgeSection = dynamic(() => import('@/components/custom/MaxAgeSection'));
const InnovativeSolutionsSection = dynamic(() => import('@/components/custom/InnovativeSolutionsSection'));
const InitiativesSection = dynamic(() => import('@/components/custom/InitiativesSection'));
const SocialClimateSection = dynamic(() => import('@/components/custom/SocialClimateSection'));
const SocialCommitmentSection = dynamic(() => import('@/components/custom/SocialCommitmentSection'));
const SocialInnovationSection = dynamic(() => import('@/components/custom/SocialInnovationSection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function SobreQualidadePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreQualidadeHeroSection />
      <SobreQualidadeCertificationsSection />
      <section className="scroll-mt-32" id="qualidade-ambiental">
        <ClimateChangeSection />
        <HowWeActSection />
        <CarbonCompensationSection />
        <SustainabilityReportSection />
        <ESGSection />
        <HomeSustainabilitySpotlight />
        <MaxAgeSection />
        <InnovativeSolutionsSection />
        <InitiativesSection />
      </section>

      <section className="scroll-mt-32" id="qualidade-impacto-social">
        <SocialClimateSection />
        <SocialCommitmentSection />
        <SocialInnovationSection />
      </section>
      <Footer />
    </main>
  );
}
