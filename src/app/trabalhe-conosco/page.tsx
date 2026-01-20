import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CareersHeroSection from '@/components/custom/CareersHeroSection';
import JobApplicationFormSection from '@/components/custom/JobApplicationFormSection';

export const metadata: Metadata = {
  title: 'Trabalhe Conosco | Gabardo Transportes',
  description: 'Faça parte do time Gabardo Transportes. Envie seu currículo e construa sua carreira em uma empresa que valoriza pessoas, inovação e compromisso.',
  openGraph: {
    title: 'Trabalhe Conosco | Gabardo Transportes',
    description: 'Faça parte do time Gabardo Transportes. Envie seu currículo e construa sua carreira em uma empresa que valoriza pessoas, inovação e compromisso.',
    type: 'website',
  },
};

export default function TrabalheConoscoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <CareersHeroSection />
      <Suspense
        fallback={
          <section className="py-20">
            <div className="container mx-auto px-4 text-center text-gray-500">
              Carregando formulário...
            </div>
          </section>
        }
      >
        <JobApplicationFormSection />
      </Suspense>
      <Footer />
    </main>
  );
}
