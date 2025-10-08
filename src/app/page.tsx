import { Header } from "@/components/layout/Header"; // Assuming @ is configured for src path
import HeroSection from "@/components/custom/HeroSection";

import JSLInspiredServicesSection from "@/components/custom/JSLInspiredServicesSection";
import HomeClientsLogoSection from "@/components/custom/HomeClientsLogoSection";
import MapboxSection from "@/components/custom/MapboxSection"; // Added import
import StatsGrid from '@/components/custom/StatsGrid';
import BlogSection from '@/components/custom/BlogSection';
import HomeStripeCardSection from '@/components/custom/HomeStripeCardSection';
import HomeMarqueeSection from '@/components/custom/HomeMarqueeSection';
import PremiumInfoSection from '@/components/custom/PremiumInfoSection';
import Footer from '@/components/layout/Footer';
export default function HomePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <HeroSection />
      <JSLInspiredServicesSection />
      <PremiumInfoSection />
      <HomeStripeCardSection />
      <StatsGrid />
      <HomeMarqueeSection />
      <HomeClientsLogoSection />
      <BlogSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
