'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, MapPin } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  caseLink: string;
}

const services: Service[] = [
  {
    id: 'transporte-automotivo',
    title: 'Transporte automotivo completo',
    description: 'Veículos novos, seminovos, importados e frotas corporativas.',
    features: ['Frota moderna e rastreada', 'Cobertura nacional e Mercosul', 'Seguro total da carga', 'Equipe especializada'],
    icon: Truck,
    color: 'amber',
    caseLink: '/servicos/transporte-de-veiculos'
  },
  {
    id: 'pdi-digital',
    title: 'PDI digital e rastreamento',
    description: 'Inspeção eletrônica, controle de estoque e parqueamento integrado.',
    features: ['Checklist eletrônico de avarias', 'Rastreamento em tempo real', 'Controle de pátio digital', 'Integração com sistemas'],
    icon: Shield,
    color: 'blue',
    caseLink: '/servicos/pdi-digital'
  },
  {
    id: 'logistica-patio',
    title: 'Logística de pátio e armazenagem',
    description: 'Gestão sistêmica com segurança, eficiência e visibilidade total.',
    features: ['Gestão de pátios e armazéns', 'Controle de inventário', 'Segurança patrimonial 24h', 'Otimização de espaço'],
    icon: MapPin,
    color: 'green',
    caseLink: '/servicos/armazenagem'
  }
];

const JSLInspiredServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.25em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            O que fazemos
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-px"
              style={{ backgroundColor: '#38B6FF' }}
            ></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{ color: '#132D51' }}>Soluções Completas</span>
            <br />
            <span className="text-neutral-600">para a sua operação</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-600 font-light max-w-4xl mx-auto leading-relaxed mt-6"
          >
            A Gabardo oferece um portfólio completo de serviços para a logística automotiva, desde o transporte de veículos até a gestão de pátios e armazéns.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-500 hover:border-[#38B6FF] hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: '#132D51' }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4"
                    style={{ color: '#132D51' }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: '#38B6FF' }}
                        ></div>
                        <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto space-y-6">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                      className="mt-6 h-1"
                      style={{ backgroundColor: '#38B6FF' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default JSLInspiredServicesSection;