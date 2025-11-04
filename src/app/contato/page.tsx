import { Suspense } from 'react';
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TrabalheConoscoHeroSection from '@/components/custom/TrabalheConoscoHeroSection';
import ContactInfoSection from '@/components/custom/ContactInfoSection';
import ContactFormSection from '@/components/custom/ContactFormSection';

export default function ContatoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <TrabalheConoscoHeroSection />
      <ContactInfoSection />
      <Suspense
        fallback={
          <section className="py-20">
            <div className="container mx-auto px-4 text-center text-gray-500">
              Carregando formulário...
            </div>
          </section>
        }
      >
        <ContactFormSection />
      </Suspense>
      <Footer />
    </main>
  );
}