import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import HeroSection from "@/components/custom/HeroSection";
import JSLInspiredServicesSection from "@/components/custom/JSLInspiredServicesSection";
import PremiumInfoSection from '@/components/custom/PremiumInfoSection';

// Lazy load below-the-fold components for better performance
const HomeClientsLogoSection = dynamic(() => import("@/components/custom/HomeClientsLogoSection"), {
  loading: () => <div className="h-48 bg-gray-50" />
});
const MapboxSection = dynamic(() => import("@/components/custom/MapboxSection"), {
  loading: () => <div className="h-96 bg-gray-50" />
});
const StatsGrid = dynamic(() => import('@/components/custom/StatsGrid'));
const BlogSection = dynamic(() => import('@/components/custom/BlogSection'));
const HomeStripeCardSection = dynamic(() => import('@/components/custom/HomeStripeCardSection'));
const HomeMarqueeSection = dynamic(() => import('@/components/custom/HomeMarqueeSection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));
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
