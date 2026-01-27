import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import VehicleTransportHero from '@/components/custom/VehicleTransportHero';
import VehicleTransportBenefits from '@/components/custom/VehicleTransportBenefits';
import VehicleTransportProcess from '@/components/custom/VehicleTransportProcess';
import VehicleTransportClients from '@/components/custom/VehicleTransportClients';
import VehicleTransportIndustries from '@/components/custom/VehicleTransportIndustries';
import VehicleTransportSustainability from '@/components/custom/VehicleTransportSustainability';
import VehicleTransportQuote from '@/components/custom/VehicleTransportQuote';
import VehicleTransportContact from '@/components/custom/VehicleTransportContact';

export default function TransporteDeVeiculosPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <VehicleTransportHero />
      <VehicleTransportBenefits />
      <VehicleTransportProcess />
      <VehicleTransportClients />
      <VehicleTransportIndustries />
      <VehicleTransportSustainability />
      <VehicleTransportQuote />
      <VehicleTransportContact />
      <Footer />
    </main>
  );
}
