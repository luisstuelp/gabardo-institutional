
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import CaseStudiesHeroSection from '@/components/custom/CaseStudiesHeroSection';
import CaseStudiesListSection from '@/components/custom/CaseStudiesListSection';

export default function CaseStudiesPage() {
  return (
    <main className="relative bg-white">
      <Header variant="dark" />
      <CaseStudiesHeroSection />
      <CaseStudiesListSection />
      <Footer />
    </main>
  );
}
