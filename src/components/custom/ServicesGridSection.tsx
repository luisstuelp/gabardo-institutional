
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Warehouse, Zap, Building, Wrench, Car } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const services: Service[] = [
  {
    icon: <Truck className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Frotas Especializadas',
    description: 'Movimentação de máquinas, equipamentos agrícolas e industriais com pranchas retas e rebaixadas.',
    bgColor: 'bg-green-50',
  },
  {
    icon: <Car className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Transporte de Veículos',
    description: 'Coleta e entrega de veículos 0km e seminovos em todo o território nacional.',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <Warehouse className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Armazenagem',
    description: 'Pátios estrategicamente localizados para gestão de estoque, pré-entrega e preparação de veículos.',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: <Zap className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Logística Integrada',
    description: 'Soluções end-to-end que cobrem desde a coleta na fábrica até a entrega no concessionário.',
    bgColor: 'bg-purple-50',
  },
  {
    icon: <Building className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Distribuição Urbana',
    description: 'Entregas fracionadas em centros urbanos com veículos menores, otimizando o last-mile.',
    bgColor: 'bg-red-50',
  },
  {
    icon: <Wrench className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Logística Interna',
    description: 'Gestão e operação de movimentação de materiais e veículos dentro das plantas do cliente.',
    bgColor: 'bg-indigo-50',
  },
];

const ServicesGridSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('');

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F7FAFF] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-14 left-10 h-44 w-44 rounded-full bg-gabardo-light-blue/20 blur-3xl" />
        <div className="absolute bottom-12 right-16 h-40 w-40 rounded-full bg-gabardo-blue/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-14 md:mb-18"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-blue">
                Nossas Soluções
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-tight text-gabardo-blue"
              >
                Um portfólio completo de serviços
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Oferecemos soluções dedicadas para cada etapa da cadeia automotiva, com equipes especializadas, tecnologia embarcada e capacidade para operações personalizadas.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              onMouseEnter={() => setActiveItem(service.title)}
              onMouseLeave={() => setActiveItem('')}
              className={`group w-full cursor-default rounded-3xl border px-8 py-9 text-left transition-all duration-300 ease-in-out ${
                activeItem === service.title
                  ? 'border-gabardo-blue bg-white shadow-[0_25px_60px_-32px_rgba(19,45,81,0.38)]'
                  : 'border-white bg-white/70 shadow-[0_20px_45px_-35px_rgba(19,45,81,0.3)] hover:border-gabardo-light-blue/60'
              }`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
                    activeItem === service.title ? 'bg-gabardo-blue text-white' : 'bg-gabardo-light-blue/15 text-gabardo-blue'
                  }`}
                >
                  {service.icon}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-400">
                    Solução dedicada
                  </div>
                  <h3 className="text-xl font-semibold text-gabardo-blue">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
