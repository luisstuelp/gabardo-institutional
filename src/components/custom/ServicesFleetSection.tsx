'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Truck, TruckIcon, Layers, PackageOpen, Warehouse } from 'lucide-react';

const fleetHighlights = [
  {
    title: 'Frota integrada',
    value: '2.000+',
    description: 'caminhões, carretas e plataformas dedicados às principais montadoras.'
  },
  {
    title: 'Disponibilidade garantida',
    value: '20%',
    description: 'equipamentos sobressalentes para absorver picos de demanda com agilidade.'
  },
  {
    title: 'Padrão ambiental',
    value: '50%',
    description: 'da frota já opera com tecnologia EURO 6, reduzindo emissões.'
  },
  {
    title: 'Modernidade',
    value: '2,5 anos',
    description: 'idade média da frota, assegurando eficiência e confiabilidade.'
  }
];

const fleetTypes = [
  {
    name: 'Cegonhas Gabardo',
    tag: 'Maior frota própria do Brasil',
    description:
      'Equipamentos padronizados e higienizados, com capacidade para até 11 veículos compactos e operação dedicada por cliente.',
    metrics: [
      'Comprimento até 23.000 mm',
      'Capacidade para 11 veículos compactos',
      '100% das carretas são próprias',
      'Checklist eletrônico e inspeção antes de cada carregamento'
    ],
    specs: {
      payload: 'Até 44.000 kg',
      pallets: 'Até 11 veículos'
    },
    icon: Truck,
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
  },
  {
    name: 'Trucks Porta-Autos',
    tag: 'Flexibilidade urbana',
    description:
      'Veículos ideais para entregas em centros urbanos, com acesso facilitado e agilidade para lançamentos e transferências rápidas.',
    metrics: [
      'Comprimento de 14.000 mm',
      'Capacidade para até 6 veículos',
      'Rastreamento e telemetria em tempo real',
      'Operadores certificados e treinados continuamente'
    ],
    specs: {
      payload: 'Até 26.000 kg',
      pallets: 'Até 6 veículos'
    },
    icon: TruckIcon,
    image: '/images/Trans Gabardo - Framers produtora -5388.JPG'
  },
  {
    name: 'Plataformas Especiais',
    tag: 'Proteção e versatilidade',
    description:
      'Plataformas moduladas que atendem veículos premium, blindados ou cargas especiais com soft straps e mantas protetoras.',
    metrics: [
      'Transporte de 1 a 3 veículos',
      'Fixação especializada para alto padrão',
      'Monitoramento 24/7 pelo CCO',
      'Disponibilidade nacional com cobertura Mercosul'
    ],
    specs: {
      payload: 'Até 18.000 kg',
      pallets: '1 a 3 veículos'
    },
    icon: Layers,
    image: '/images/Trans Gabardo - Framers produtora -5495.JPG'
  },
  {
    name: 'Pranchas Pesadas',
    tag: 'Até 30 toneladas',
    description:
      'Projetadas para máquinas, equipamentos e lotes especiais, com suporte técnico dedicado e planos de contingência.',
    metrics: [
      'Capacidade de carga até 30 toneladas',
      'Protocolos de amarração certificados',
      'Cobertura no Mercosul e América Latina',
      'Equipe técnica para cargas superdimensionadas'
    ],
    specs: {
      payload: '30.000 kg',
      pallets: 'Carga sob medida'
    },
    icon: PackageOpen,
    image: '/images/Trans Gabardo - Framers produtora -5818.JPG'
  },
  {
    name: 'Carretas Sider',
    tag: 'Proteção climática',
    description:
      'Soluções para componentes automotivos, peças e cargas sensíveis, integradas aos hubs e armazéns Gabardo.',
    metrics: [
      '42 carretas sider em operação',
      'Acesso lateral e superior com curtain side',
      'Segurança reforçada com lacres e telemetria',
      'Integração plena com logística inbound e outbound'
    ],
    specs: {
      payload: 'Até 28.000 kg',
      pallets: 'Até 28 pallets'
    },
    icon: Warehouse,
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  }
];

const badgeMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
};

export default function ServicesFleetSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const handleToggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="space-y-10"
          >
            <div className="space-y-5">
              <motion.span
                variants={badgeMotion}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/50 bg-[#F3F8FF] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-gabardo-blue"
              >
                Frota Gabardo
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-tight text-gabardo-blue">
                A maior frota própria de cegonhas do Brasil, preparada para cada desafio logístico
              </h2>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                Frota moderna, padronizada e 100% monitorada para garantir disponibilidade, segurança e otimização de custos em toda a cadeia automotiva.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fleetHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_35px_-28px_rgba(19,45,81,0.35)]"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.25em] text-gabardo-light-blue">
                    {item.title}
                  </div>
                  <div className="mt-4 text-3xl font-bold text-gabardo-blue">
                    {item.value}
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl border border-gabardo-light-blue/30 bg-[#F6FAFF] px-6 py-5 text-sm md:text-base text-neutral-600 leading-relaxed shadow-[0_18px_40px_-32px_rgba(19,45,81,0.35)]">
              Contamos com 20% de equipamentos reserva, manutenção própria e telemetria completa para garantir que cada veículo chegue ao destino com segurança e previsibilidade.
            </div>
          </motion.div>

          <div className="space-y-4">
            {fleetTypes.map((type, index) => {
              const Icon = type.icon;
              const isOpen = openItems.includes(index);

              return (
                <motion.div
                  key={type.name}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={`rounded-xl border transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'border-gabardo-blue bg-[#F8F9FA] shadow-[0_24px_52px_-32px_rgba(19,45,81,0.35)]'
                      : 'border-neutral-200 bg-white shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center gap-4 px-6 py-6 text-left"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 text-lg font-semibold text-neutral-800">
                      {type.name}
                    </div>
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'border-gabardo-blue bg-gabardo-blue text-white'
                          : 'border-neutral-300 bg-white text-neutral-500'
                      }`}
                    >
                      <span className="absolute h-[2px] w-4 bg-current" />
                      <span
                        className={`absolute w-[2px] bg-current transition-transform duration-300 ease-in-out ${
                          isOpen ? 'h-0 rotate-90 opacity-0' : 'h-4 opacity-100'
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        style={{ originY: 0 }}
                      >
                        <div className="px-6 pb-6 pt-1">
                          <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                              <div>
                                <p className="mt-2 text-sm md:text-base text-neutral-600 leading-relaxed">
                                  {type.description}
                                </p>
                              </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl">
                              <Image
                                src={type.image}
                                alt={type.name}
                                width={960}
                                height={540}
                                className="h-[220px] w-full object-cover md:h-[260px]"
                              />
                            </div>

                            <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white/80 p-5 md:grid-cols-2">
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                                  Payload capacity
                                </div>
                                <div className="mt-2 text-lg font-semibold text-neutral-800">
                                  {type.specs.payload}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                                  Pallet capacity
                                </div>
                                <div className="mt-2 text-lg font-semibold text-neutral-800">
                                  {type.specs.pallets}
                                </div>
                              </div>
                            </div>

                            <ul className="space-y-3">
                              {type.metrics.map((metric) => (
                                <li key={metric} className="flex items-start gap-3 text-sm text-neutral-600">
                                  <span className="mt-[6px] inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                                  <span>{metric}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
