import { Header } from "@/components/layout/Header"; // Assuming @ is configured for src path
import HeroSection from "@/components/custom/HeroSection";
import { cityData, City } from "@/data/cityData"; // CategoryImage type might not be needed here anymore
import CategoryImageViewer from "@/components/custom/CategoryImageViewer"; // Import the new component
import PremiumInfoSection from "@/components/custom/PremiumInfoSection";
// import InfiniteHorizontalGallery from "@/components/custom/InfiniteHorizontalGallery"; // Old import
import InfiniteMasonryGallery from "@/components/custom/InfiniteMasonryGallery"; // New import
import JSLInspiredServicesSection from "@/components/custom/JSLInspiredServicesSection";
import HomeClientsLogoSection from "@/components/custom/HomeClientsLogoSection";
import MapboxSection from "@/components/custom/MapboxSection"; // Added import
import StatsGrid from '@/components/custom/StatsGrid';
import BlogSection from '@/components/custom/BlogSection';
import HomeStripeCardSection from '@/components/custom/HomeStripeCardSection';
import HomeHoverCardsSection from '@/components/custom/HomeHoverCardsSection';
import HomeMarqueeSection from '@/components/custom/HomeMarqueeSection';
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
      <HomeHoverCardsSection />
      <HomeMarqueeSection />
      <HomeClientsLogoSection />
      <BlogSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
