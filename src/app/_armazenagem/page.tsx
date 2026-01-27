import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import StorageHeroSection from '@/components/custom/StorageHeroSection';
import StorageFacilitiesSection from '@/components/custom/StorageFacilitiesSection';
import StorageSecuritySection from '@/components/custom/StorageSecuritySection';
import StorageServicesSection from '@/components/custom/StorageServicesSection';
import StorageLocationsSection from '@/components/custom/StorageLocationsSection';
import StorageQuoteSection from '@/components/custom/StorageQuoteSection';

export default function ArmazenagemPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <StorageHeroSection />
      <StorageFacilitiesSection />
      <StorageSecuritySection />
      <StorageServicesSection />
      <StorageLocationsSection />
      <StorageQuoteSection />
      <Footer />
    </main>
  );
}
