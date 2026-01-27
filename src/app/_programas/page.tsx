import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import ProgramsHeroSection from '@/components/custom/ProgramsHeroSection';
import ProgramsOverviewSection from '@/components/custom/ProgramsOverviewSection';
import ProgramsJourneySection from '@/components/custom/ProgramsJourneySection';
import ProgramsImpactSection from '@/components/custom/ProgramsImpactSection';
import ProgramsCTASection from '@/components/custom/ProgramsCTASection';

export default function ProgramasPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <ProgramsHeroSection />
      <ProgramsOverviewSection />
      <ProgramsJourneySection />
      <ProgramsImpactSection />
      <ProgramsCTASection />
      <Footer />
    </main>
  );
}
