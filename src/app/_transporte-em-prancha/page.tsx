import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import PranchaHeroSection from '@/components/custom/PranchaHeroSection';
import PranchaBenefitsSection from '@/components/custom/PranchaBenefitsSection';
import PranchaProcessSection from '@/components/custom/PranchaProcessSection';
import PranchaCapacitySection from '@/components/custom/PranchaCapacitySection';
import PranchaClientsSection from '@/components/custom/PranchaClientsSection';
import PranchaQuoteSection from '@/components/custom/PranchaQuoteSection';

export default function TransporteEmPranchaPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <PranchaHeroSection />
      <PranchaBenefitsSection />
      <PranchaProcessSection />
      <PranchaCapacitySection />
      <PranchaClientsSection />
      <PranchaQuoteSection />
      <Footer />
    </main>
  );
}
