'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const fleetHighlights = [
  {
    title: 'Frota integrada',
    value: '2.000+',
    icon: CheckCircle,
    description: 'caminhões, carretas e plataformas dedicados às principais montadoras.'
  },
  {
    title: 'Disponibilidade garantida',
    value: '120%',
    description: 'equipamentos sobressalentes para absorver picos de demanda com agilidade.'
  },
  {
    title: 'Carbono Negativo',
    value: '1º Transportadora no mundo',
    description: 'Primeira transportadora com certificação Carbono Negativo em toda a frota operacional.'
  },
  {
    title: 'Modernidade',
    value: '2 anos',
    description: 'idade média da frota, assegurando eficiência e confiabilidade.'
  }
];

const fleetTypes = [
  {
    name: 'Frota Cegonha',
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
      payload: 'Até 33.000 kg',
      pallets: 'Até 11 veículos'
    },
    images: [
      'https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgd1njU0I1pLrmFsdPHE9JOfiSqog0puWCXIUQj',
      '/images/gabardo-truck-fleet.JPG',
      '/images/gabardo-hero-01.JPG'
    ]
  },
  {
    name: 'Frota Truck',
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
    images: [
      'https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgd4IQi2bknI6fVUiN4gAm5SK8M9Ltw7jpxPBy3',
      '/images/gabardo-hero-02.JPG'
    ]
  },
  {
    name: 'Frota Plataforma',
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
    images: [
      'https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgd9cM9R6jH3PTfNeJvuGs1x5ObW7katmg28XS9',
      '/images/Oficina.JPG'
    ]
  },
  {
    name: 'Frota Prancha',
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
    images: [
      'https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgdNO8UgYRq6mid9MhAEW7F1UvCcbQK4luYro8Z',
      '/images/Box.JPG'
    ]
  }
];

function FleetCarousel({ images, name }: { images: string[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  emblaApi?.on('select', () => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  });

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={images[0]}
          alt={name}
          width={960}
          height={540}
          className="h-[220px] w-full object-cover md:h-[280px]"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <Image
                src={image}
                alt={`${name} - ${index + 1}`}
                width={960}
                height={540}
                className="h-[220px] w-full object-cover md:h-[280px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gabardo-blue shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gabardo-blue shadow-lg transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'w-6 bg-gabardo-light-blue'
                    : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ServicesFleetSectionNew() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const handleToggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? []
        : [index]
    );
  };

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Top Wave Transition */}
      <div className="absolute left-0 top-0 h-24 w-full">
        <motion.svg 
          className="h-full w-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,0 L0,0 Z"
            fill="url(#gradientWaveFleetTop)"
            opacity="0.08"
            animate={{ 
              d: [
                "M0,60 Q300,20 600,60 T1200,60 L1200,0 L0,0 Z",
                "M0,60 Q300,100 600,60 T1200,60 L1200,0 L0,0 Z",
                "M0,60 Q300,20 600,60 T1200,60 L1200,0 L0,0 Z"
              ]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradientWaveFleetTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38B6FF" />
              <stop offset="50%" stopColor="#132D51" />
              <stop offset="100%" stopColor="#38B6FF" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gabardo-blue"
              >
                Nossa Frota
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gabardo-blue">
                A maior frota própria do Brasil, preparada para cada desafio logístico
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Frota moderna, padronizada e 100% monitorada para garantir disponibilidade, segurança e otimização de custos em toda a cadeia automotiva.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="/orcamento"
                  className="inline-flex items-center justify-center rounded-xl border border-gabardo-blue px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gabardo-blue transition-transform duration-200 hover:-translate-y-0.5 hover:bg-gabardo-blue/5"
                >
                  Solicitar proposta
                </a>
              </motion.div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fleetHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border border-gabardo-blue/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm font-semibold uppercase tracking-wider text-gabardo-light-blue">
                    {item.title}
                  </div>
                  <div className="mt-4 text-3xl font-bold text-gabardo-blue">
                    {item.value}
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

          <div className="space-y-4">
            {fleetTypes.map((type, index) => {
              const isOpen = openItems.includes(index);

              return (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'border-gabardo-blue bg-white shadow-xl'
                      : 'border-gray-200 bg-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                  >
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gabardo-blue">
                        {type.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {type.tag}
                      </div>
                    </div>
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isOpen
                          ? 'border-gabardo-blue bg-gabardo-blue text-white rotate-45'
                          : 'border-gray-300 bg-white text-gray-500'
                      }`}
                    >
                      <span className="absolute h-0.5 w-5 bg-current" />
                      <span className="absolute w-0.5 h-5 bg-current" />
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
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="flex flex-col gap-6">
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                              {type.description}
                            </p>

                            {/* Carousel de Imagens */}
                            <FleetCarousel images={type.images} name={type.name} />

                            <div className="grid gap-4 rounded-2xl border border-gabardo-blue/20 bg-gradient-to-br from-gabardo-blue/5 to-transparent p-5 md:grid-cols-2">
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-gabardo-blue/60">
                                  Payload capacity
                                </div>
                                <div className="mt-2 text-lg font-bold text-gabardo-blue">
                                  {type.specs.payload}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-gabardo-blue/60">
                                  Pallet capacity
                                </div>
                                <div className="mt-2 text-lg font-bold text-gabardo-blue">
                                  {type.specs.pallets}
                                </div>
                              </div>
                            </div>

                            <ul className="space-y-3">
                              {type.metrics.map((metric) => (
                                <li key={metric} className="flex items-start gap-3 text-sm text-gray-600">
                                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
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

      {/* Bottom Wave Transition */}
      <div className="absolute left-0 bottom-0 h-24 w-full">
        <motion.svg 
          className="h-full w-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.path
            d="M0,60 Q400,100 800,60 T1600,60 L1600,120 L0,120 Z"
            fill="url(#gradientWaveFleetBottom)"
            opacity="0.1"
            animate={{ 
              d: [
                "M0,60 Q400,100 800,60 T1600,60 L1600,120 L0,120 Z",
                "M0,60 Q400,20 800,60 T1600,60 L1600,120 L0,120 Z",
                "M0,60 Q400,100 800,60 T1600,60 L1600,120 L0,120 Z"
              ]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradientWaveFleetBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="50%" stopColor="#38B6FF" />
              <stop offset="100%" stopColor="#132D51" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
}
