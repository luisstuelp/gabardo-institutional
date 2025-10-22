import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TrabalheConoscoHeroSection from '@/components/custom/TrabalheConoscoHeroSection';
import ContactInfoSection from '@/components/custom/ContactInfoSection';
import ContactFormSection from '@/components/custom/ContactFormSection';

export default function FaleConoscoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <TrabalheConoscoHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
