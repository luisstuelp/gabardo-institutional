import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InfraestruturaHeroSection from '@/components/custom/InfraestruturaHeroSection';
import FacilitiesSection from '@/components/custom/FacilitiesSection';
import LocationsMapInteractive from '@/components/custom/LocationsMapInteractive';
import SobreQualidadeInfraestruturaSection from '@/components/custom/SobreQualidadeInfraestruturaSection';

export default function InfraestruturaPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <InfraestruturaHeroSection />
      <SobreQualidadeInfraestruturaSection />
      <FacilitiesSection />
      <LocationsMapInteractive />
      <Footer />
    </main>
  );
}
