'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Zap, Globe } from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const serviceFeatures: FeatureItem[] = [
  {
    id: 'seguranca',
    icon: <Shield className="w-10 h-10" />,
    title: 'SEGURANÇA',
    subtitle: 'Proteção Total',
    description: 'Rastreamento GPS em tempo real, seguros completos e protocolos rigorosos de segurança para garantir a integridade dos veículos transportados.',
    color: 'gabardo'
  },
  {
    id: 'agilidade',
    icon: <Clock className="w-10 h-10" />,
    title: 'AGILIDADE',
    subtitle: 'Prazos Cumpridos',
    description: 'Otimização de rotas, frota dedicada e processos eficientes que garantem entregas dentro dos prazos estabelecidos.',
    color: 'gabardo'
  },
  {
    id: 'qualidade',
    icon: <Award className="w-10 h-10" />,
    title: 'QUALIDADE',
    subtitle: 'Certificação ISO',
    description: 'Processos certificados ISO 9001, ISO 14001 e ISO 39001, garantindo os mais altos padrões de qualidade e sustentabilidade.',
    color: 'gabardo'
  },
  {
    id: 'atendimento',
    icon: <Users className="w-10 h-10" />,
    title: 'ATENDIMENTO',
    subtitle: 'Suporte 24/7',
    description: 'Equipe especializada disponível 24 horas para acompanhamento, suporte e comunicação proativa sobre o status das entregas.',
    color: 'gabardo'
  },
  {
    id: 'tecnologia',
    icon: <Zap className="w-10 h-10" />,
    title: 'TECNOLOGIA',
    subtitle: 'Inovação Constante',
    description: 'Sistemas de gestão avançados, rastreamento em tempo real e plataformas digitais para total transparência e controle.',
    color: 'gabardo'
  },
  {
    id: 'cobertura',
    icon: <Globe className="w-10 h-10" />,
    title: 'COBERTURA',
    subtitle: 'Nacional Completa',
    description: 'Presença em todas as regiões do Brasil com unidades estrategicamente localizadas para otimizar prazos e custos.',
    color: 'gabardo'
  }
];

const ServicesFeaturesSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('seguranca');

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#F7FAFF] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-12 h-48 w-48 rounded-full bg-gabardo-light-blue/20 blur-3xl" />
        <div className="absolute bottom-10 right-16 h-40 w-40 rounded-full bg-gabardo-blue/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-14 md:mb-18"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-blue">
                Diferenciais Gabardo
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-tight text-gabardo-blue"
              >
                6 pilares que ancoram nossa excelência operacional
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-neutral-600 leading-relaxed"
            >
              Cada operação combina segurança, tecnologia, pessoas e processos auditáveis para entregar experiências consistentes às maiores montadoras do país.
            </motion.p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {serviceFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              onMouseEnter={() => setActiveItem(feature.id)}
              className={`group w-full cursor-default rounded-3xl border px-8 py-9 text-left transition-all duration-300 ease-in-out ${
                activeItem === feature.id
                  ? 'border-gabardo-blue bg-white shadow-[0_25px_60px_-32px_rgba(19,45,81,0.38)]'
                  : 'border-white bg-white/70 shadow-[0_20px_45px_-35px_rgba(19,45,81,0.3)] hover:border-gabardo-light-blue/60'
              }`}}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
                    activeItem === feature.id ? 'bg-gabardo-blue text-white' : 'bg-gabardo-light-blue/15 text-gabardo-blue'
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
                    {feature.subtitle}
                  </div>
                  <h3 className="text-xl font-semibold text-gabardo-blue">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid gap-6 rounded-3xl border border-gabardo-light-blue/30 bg-white/80 px-8 py-10 shadow-[0_24px_52px_-35px_rgba(19,45,81,0.32)] md:grid-cols-[1.2fr_auto] md:items-center"
        >
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Estes pilares sustentam programas personalizados, dashboards em tempo real e indicadores auditáveis que mantêm o cliente no controle da operação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contato"
              className="inline-flex items-center justify-center rounded-xl bg-gabardo-blue px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              Solicitar proposta
            </a>
            <a
              href="/cases-de-sucesso"
              className="inline-flex items-center justify-center rounded-xl border border-gabardo-blue px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-gabardo-blue transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gabardo-blue/5"
            >
              Ver cases de sucesso
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesFeaturesSection;
