import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import InfraestruturaHeroSection from '@/components/custom/InfraestruturaHeroSection';
import FacilitiesSection from '@/components/custom/FacilitiesSection';


import LocationsListSection from '@/components/custom/LocationsListSection';

export default function InfraestruturaPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <InfraestruturaHeroSection />
      <FacilitiesSection />
      <LocationsListSection />
      <Footer />
    </main>
  );
}
