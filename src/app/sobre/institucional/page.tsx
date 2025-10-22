import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import SobreInstitucionalHeroSection from '@/components/custom/SobreInstitucionalHeroSection';

// Lazy load sections for better performance
const SobreInstitucionalOverviewSection = dynamic(() => import('@/components/custom/SobreInstitucionalOverviewSection'));
const SobreInstitucionalOperationsSection = dynamic(() => import('@/components/custom/SobreInstitucionalOperationsSection'));
const SobreInstitucionalCTASection = dynamic(() => import('@/components/custom/SobreInstitucionalCTASection'));
const Footer = dynamic(() => import('@/components/layout/Footer'));

export const metadata: Metadata = {
  title: 'Estrutura Institucional | Gabardo Transportes',
  description: 'Conheça a estrutura institucional Gabardo: governança corporativa consolidada, centro de controle operacional 24/7, infraestrutura tecnológica avançada e cobertura em toda América Latina. Excelência operacional garantida.',
  keywords: [
    'estrutura institucional Gabardo',
    'governança corporativa',
    'centro de controle operacional',
    'infraestrutura logística',
    'tecnologia embarcada',
    'cobertura América Latina',
    'certificações logística',
    'transporte veiculos institucional',
  ],
  openGraph: {
    title: 'Estrutura Institucional | Gabardo Transportes',
    description: 'Governança integrada e infraestrutura tecnológica que sustentam cada operação Gabardo. Cobertura total na América Latina.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estrutura Institucional | Gabardo Transportes',
    description: 'Governança integrada e infraestrutura tecnológica que sustentam cada operação Gabardo.',
  },
  alternates: {
    canonical: 'https://www.transgabardo.com.br/sobre/institucional',
  },
};

export default function SobreInstitucionalPage() {
  return (
    <main className="relative bg-gray-50 scroll-smooth">
      <Header variant="dark" />
      
      {/* Hero Section - Always visible immediately */}
      <SobreInstitucionalHeroSection />
      
      {/* Content sections with smooth scroll behavior */}
      <div className="transition-all duration-300 ease-in-out">
        <SobreInstitucionalOverviewSection />
        <SobreInstitucionalOperationsSection />
        <SobreInstitucionalCTASection />
      </div>
      
      <Footer />
    </main>
  );
}
