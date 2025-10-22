'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
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
// Componente de transição fade-in reutilizável
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <HeroSection />
      
      <FadeInSection>
        <JSLInspiredServicesSection />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <PremiumInfoSection />
      </FadeInSection>
      
      <FadeInSection>
        <HomeStripeCardSection />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <StatsGrid />
      </FadeInSection>
      
      <FadeInSection>
        <HomeMarqueeSection />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <HomeClientsLogoSection />
      </FadeInSection>
      
      <FadeInSection>
        <BlogSection />
      </FadeInSection>
      
      <FadeInSection>
        <MapboxSection />
      </FadeInSection>
      
      <Footer />
    </main>
  );
}
