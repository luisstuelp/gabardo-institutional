
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyCard, { CaseStudy } from './CaseStudyCard';

const caseStudies: CaseStudy[] = [
  {
    client: 'Volkswagen',
    title: 'Otimização da Logística de Distribuição Nacional',
    summary: 'Implementamos uma solução de logística integrada que reduziu o tempo de entrega em 15% e melhorou a visibilidade da cadeia de suprimentos para a Volkswagen.',
    imageUrl: '/images/gabardo-hero-01.JPG',
    logoUrl: '/images/clients/volkswagen-logo.svg',
    slug: 'volkswagen-otimizacao-logistica',
  },
  {
    client: 'Mercedes-Benz',
    title: 'Gestão de Pátio e Preparação para Lançamentos',
    summary: 'Assumimos a gestão do pátio de veículos para a Mercedes-Benz, resultando em uma melhoria de 25% na eficiência do processo de pré-entrega.',
    imageUrl: '/images/gabardo-hero-03.JPG',
    logoUrl: '/images/clients/mercedes-benz-logo.svg',
    slug: 'mercedes-benz-gestao-patio',
  },
  {
    client: 'Ford',
    title: 'Transporte Especializado de Veículos Elétricos',
    summary: 'Desenvolvemos um processo de transporte customizado para a nova linha de veículos elétricos da Ford, garantindo a segurança e a integridade das baterias.',
    imageUrl: '/images/gabardo-truck-fleet.JPG',
    logoUrl: '/images/clients/ford-logo.svg',
    slug: 'ford-transporte-eletricos',
  },
    {
    client: 'Scania',
    title: 'Logística Reversa de Peças e Componentes',
    summary: 'Estruturamos uma operação de logística reversa para a Scania, otimizando o retorno de peças e componentes e gerando uma economia de 10% nos custos.',
    imageUrl: '/images/Trans Gabardo - Framers produtora -5475.JPG',
    logoUrl: '/images/clients/scania-logo.svg',
    slug: 'scania-logistica-reversa',
  },
  {
    client: 'JSL',
    title: 'Parceria Estratégica para Expansão no Sul',
    summary: 'Em parceria com a JSL, expandimos nossa capacidade de atendimento na região Sul, aumentando a frota dedicada em 30% e melhorando o nível de serviço.',
    imageUrl: '/images/Trans Gabardo - Framers produtora -5818.JPG',
    logoUrl: '/images/clients/jsl-logo.svg',
    slug: 'jsl-parceria-expansao',
  },
  {
    client: 'Aurora Logistics',
    title: 'Solução Multimodal para o Mercosul',
    summary: 'Criamos uma solução de transporte multimodal para a Aurora Logistics, integrando rodoviário e ferroviário para otimizar o fluxo de cargas no Mercosul.',
    imageUrl: '/images/Trans Gabardo - Framers produtora -5577.JPG',
    logoUrl: '/images/clients/aurora-logistics-logo.svg',
    slug: 'aurora-logistics-multimodal',
  },
];

const CaseStudiesListSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesListSection;
