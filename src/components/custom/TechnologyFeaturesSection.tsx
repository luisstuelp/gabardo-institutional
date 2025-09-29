
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Warehouse, BarChart, FileText, User, Cpu, ArrowRight } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MapPin,
    title: 'Rastreamento em Tempo Real',
    description: 'Visibilidade total da sua carga com nossa tecnologia de rastreamento GPS, permitindo o acompanhamento de cada veículo 24/7.',
  },
  {
    icon: Warehouse,
    title: 'Sistema de Gestão de Pátio (WMS)',
    description: 'Otimizamos a organização e o fluxo de veículos em nossos pátios com um WMS robusto, garantindo agilidade e segurança.',
  },
  {
    icon: Cpu,
    title: 'Otimização de Rotas',
    description: 'Utilizamos algoritmos avançados para planejar as rotas mais eficientes, reduzindo o tempo de trânsito e o consumo de combustível.',
  },
  {
    icon: FileText,
    title: 'Documentação Digital',
    description: 'Processos 100% digitais para emissão de documentos, vistorias e comprovantes de entrega, eliminando papel e agilizando a comunicação.',
  },
  {
    icon: User,
    title: 'Portal do Cliente',
    description: 'Uma plataforma online exclusiva para você gerenciar suas solicitações, acompanhar entregas e acessar relatórios detalhados.',
  },
  {
    icon: BarChart,
    title: 'Business Intelligence & Analytics',
    description: 'Coletamos e analisamos dados de todas as operações para gerar insights, identificar oportunidades de melhoria e otimizar a tomada de decisão.',
  },
];

const TechnologyFeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Nossa Plataforma</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Ferramentas que Transformam a Logística
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Investimos em um ecossistema tecnológico integrado para oferecer a você mais controle, visibilidade e eficiência em todas as suas operações.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="/contato"
            className="inline-flex items-center px-8 py-4 text-white font-semibold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Solicite uma Demonstração
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyFeaturesSection;
