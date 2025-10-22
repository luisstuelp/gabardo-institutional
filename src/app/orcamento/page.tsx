import VehicleQuoteForm from '@/components/custom/VehicleQuoteForm';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrcamentoHero from '@/components/custom/OrcamentoHero';
import ContactInfoSection from '@/components/custom/ContactInfoSection';
import MapboxSection from '@/components/custom/MapboxSection';

export default function OrcamentoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <OrcamentoHero />
      <VehicleQuoteForm />
      <ContactInfoSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
