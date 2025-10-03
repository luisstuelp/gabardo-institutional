'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Shield, MapPin } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 'transporte-veiculos',
    title: 'Transporte de Veículos',
    description: 'Transporte especializado de veículos nacionais e importados com máxima segurança e agilidade.',
    features: [
      'Frota própria e terceirizada',
      'Rastreamento em tempo real',
      'Seguro total dos veículos',
      'Cobertura nacional'
    ],
    icon: <Truck className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5818.JPG'
  },
  {
    id: 'transporte-prancha',
    title: 'Transporte em Prancha',
    description: 'Soluções especializadas para transporte de veículos pesados, máquinas e equipamentos.',
    features: [
      'Pranchas especializadas',
      'Equipe técnica qualificada',
      'Cargas excepcionais',
      'Logística personalizada'
    ],
    icon: <Package className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
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
    icon: <Shield className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5388.JPG'
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
    icon: <MapPin className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  }
];

const excellenceBadge = {
  label: 'Índice de integridade da carga',
  value: '100%'
};

const excellenceColumns = [
  {
    title: 'Operações Especializadas',
    tag: 'Operações dedicadas',
    items: [
      'Operações dedicadas exclusivas para cada cliente',
      'Equipe especializada para minimizar impactos operacionais',
      'Operações com transit-point e cross docking',
      'Milk run e consolidação de cargas otimizada'
    ]
  },
  {
    title: 'Tecnologia e Inovação',
    tag: 'Controle 24/7',
    items: [
      'Central própria de rastreamento de veículos',
      'Suporte em tempo real das operações 24/7',
      'Sistemas de gestão integrada e relatórios personalizados',
      'Parcerias estratégicas com milhares de agregados'
    ]
  }
];

const ServicesOverviewSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading services...</div>
        </div>
      </section>
    );
  }

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
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gabardo-blue shadow-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gabardo-blue text-white">
                      {service.icon}
                    </div>
                    <span>Gabardo</span>
                  </div>
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
                    <span className="text-gabardo-light-blue">Gabardo Express</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Operational Excellence Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 md:mt-24 overflow-hidden hidden rounded-3xl border border-neutral-200 bg-[#F7FAFF]"
        >
          <div className="grid gap-12 px-8 py-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:px-16 md:py-16">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[520px] rounded-[32px] bg-white shadow-[0_30px_60px_-35px_rgba(19,45,81,0.45)]">
                <div className="relative overflow-hidden rounded-[32px]">
                  <img
                    src="/images/Trans Gabardo - Framers produtora -5193.JPG"
                    alt="Frota Gabardo"
                    className="h-[320px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

                  <div className="absolute left-6 top-6 flex items-center justify-between rounded-full bg-white/95 px-5 py-3 shadow-[0_16px_32px_-28px_rgba(19,45,81,0.5)]">
                    <div className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                      {excellenceBadge.label}
                    </div>
                    <div className="ml-4 rounded-full bg-gabardo-light-blue/15 px-4 py-1 text-sm font-semibold text-gabardo-blue">
                      {excellenceBadge.value}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-16 right-0 h-36 w-36 rounded-full bg-gabardo-light-blue/30 blur-3xl" aria-hidden />
            </div>

            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/40 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-blue">
                  Excelência operacional
                </span>
                <h3 className="text-3xl md:text-[2.4rem] font-bold leading-tight text-gabardo-blue">
                  Descubra a tecnologia e os processos que nos diferenciam
                </h3>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  Operações inteligentes, rastreamento em tempo real e equipes multidisciplinares asseguram uma jornada fluida e segura para cada veículo.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {excellenceColumns.map((column) => (
                  <div key={column.title} className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-[0_18px_40px_-32px_rgba(19,45,81,0.45)] transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gabardo-blue">
                        {column.title}
                      </h4>
                      <span className="rounded-full bg-gabardo-light-blue/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gabardo-light-blue">
                        {column.tag}
                      </span>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {column.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed">
                          <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="rounded-xl bg-gabardo-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5">
                  Faça seu orçamento
                </button>
                <button className="rounded-xl border border-gabardo-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-gabardo-blue transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gabardo-blue/5">
                  Conhecer operações
                </button>
              </div>

              <p className="text-sm md:text-base text-neutral-500">
                Entregamos ganhos de escala, rotas otimizadas e indicadores auditáveis que mantêm nossos clientes no controle de cada etapa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
