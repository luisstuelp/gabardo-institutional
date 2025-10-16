import CrmDashboard from '@/components/custom/CrmDashboard';
import VehicleQuoteForm from '@/components/custom/VehicleQuoteForm';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrcamentoHero from '@/components/custom/OrcamentoHero';

export default function OrcamentoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <OrcamentoHero />
      <VehicleQuoteForm />
      <CrmDashboard />
      <Footer />
    </main>
  );
}
