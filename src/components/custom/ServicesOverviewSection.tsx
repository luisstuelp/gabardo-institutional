'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 'transporte-veiculos',
    title: 'Transporte de Veículos',
    description: 'Transporte de veículos nacionais e importados com máxima segurança e agilidade.',
    features: [
      'Frota própria e terceirizada',
      'Rastreamento em tempo real',
      'Seguro total dos veículos',
      'Cobertura nacional'
    ],
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  },
  {
    id: 'transporte-prancha',
    title: 'Frota Especializada',
    description: 'Frotas especializadas para transporte de veículos pesados, máquinas e equipamentos.',
    features: [
      'Pranchas especializadas',
      'Equipe técnica qualificada',
      'Cargas excepcionais',
      'Logística personalizada'
    ],
    image: '/images/New (7).png'
  },
  {
    id: 'armazenagem',
    title: 'Armazenagem',
    description: 'Pátios seguros e estrategicamente localizados para armazenamento de veículos.',
    features: [
      'Pátios certificados',
      'Segurança 24h',
      'Gestão de estoque',
      'Localização estratégica'
    ],
    image: '/images/Design sem nome (1).png'
  },
  {
    id: 'logistica-integrada',
    title: 'Logística Integrada',
    description: 'Soluções completas de logística automotiva com gestão end-to-end.',
    features: [
      'Gestão de frotas',
      'Otimização de rotas',
      'KPIs auditáveis',
      'Relatórios personalizados'
    ],
    image: '/images/New (5).png'
  }
];


const ServicesOverviewSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 right-16 h-40 w-40 rounded-full bg-gabardo-light-blue/15 blur-3xl" />
        <div className="absolute bottom-12 left-10 h-48 w-48 rounded-full bg-gabardo-blue/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-blue">
                Nossos serviços
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-tight text-gabardo-blue"
              >
                Operações exclusivas conduzidas por uma equipe especialista em logística automotiva
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Da transferência entre plantas à entrega final para o cliente, estruturamos operações tailor-made com tecnologia, previsibilidade e acompanhamento em tempo real.
            </motion.p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              className="group"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                  activeIndex === index
                    ? 'border-gabardo-light-blue/80 shadow-[0_24px_45px_-32px_rgba(19,45,81,0.45)]'
                    : 'border-neutral-200 shadow-[0_20px_40px_-35px_rgba(19,45,81,0.35)]'
                } bg-white`}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center origin-center transition-transform duration-500 scale-[1.48] sm:scale-[1.24] md:scale-100 group-hover:scale-[1.55] sm:group-hover:scale-[1.3] md:group-hover:scale-105 -translate-x-4 sm:-translate-x-1 md:translate-x-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gabardo-blue">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <span className="mt-[6px] inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                        <span className="text-sm text-neutral-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-400">
                    <span>Operação tailor-made</span>
                    <span className="text-gabardo-light-blue">Transportes Gabardo</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesOverviewSection;
