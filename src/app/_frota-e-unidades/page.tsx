import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import FleetHeroSection from '@/components/custom/FleetHeroSection';
import FleetShowcaseSection from '@/components/custom/FleetShowcaseSection';
import FleetCapabilitiesSection from '@/components/custom/FleetCapabilitiesSection';
import UnitsLocationSection from '@/components/custom/UnitsLocationSection';
import FleetStatsSection from '@/components/custom/FleetStatsSection';
import FleetQuoteSection from '@/components/custom/FleetQuoteSection';

export default function FrotaEUnidadesPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <FleetHeroSection />
      <FleetShowcaseSection />
      <FleetCapabilitiesSection />
      <UnitsLocationSection />
      <FleetStatsSection />
      <FleetQuoteSection />
      <Footer />
    </main>
  );
}
