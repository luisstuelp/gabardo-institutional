import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreQualidadeHeroSection from '@/components/custom/SobreQualidadeHeroSection';
import SobreQualidadeCertificationsSection from '@/components/custom/SobreQualidadeCertificationsSection';

import ClimateChangeSection from '@/components/custom/ClimateChangeSection';
import HowWeActSection from '@/components/custom/HowWeActSection';
import CarbonCompensationSection from '@/components/custom/CarbonCompensationSection';
import SustainabilityReportSection from '@/components/custom/SustainabilityReportSection';
import ESGSection from '@/components/custom/EASGSection';
import HomeSustainabilitySpotlight from '@/components/custom/HomeSustainabilitySpotlight';
import MaxAgeSection from '@/components/custom/MaxAgeSection';
import InnovativeSolutionsSection from '@/components/custom/InnovativeSolutionsSection';
import InitiativesSection from '@/components/custom/InitiativesSection';

import SocialClimateSection from '@/components/custom/SocialClimateSection';
import SocialCommitmentSection from '@/components/custom/SocialCommitmentSection';
import SocialInnovationSection from '@/components/custom/SocialInnovationSection';

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
