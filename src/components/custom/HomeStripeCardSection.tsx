'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stripeFeatures = [
  {
    label: 'Cobertura Nacional',
    value: '+50 bases operacionais',
    description:
      'Pontos estratégicos conectando montadoras, concessionárias e hubs logísticos em todo o país.',
    imageSrc: '/images/frotas.JPG'
  },
  {
    label: 'Soluções Integradas',
    value: 'Transporte | Pátios | PDI',
    description:
      'Gestão ponta a ponta com tecnologia, rastreabilidade total e equipe especializada.',
    imageSrc: '/images/TransGabardoGestao.JPG'
  },
  {
    label: 'Compromisso ESG',
    value: 'Processos certificados',
    description:
      'ISO 9001, 14001 e 39001 garantindo eficiência operacional e responsabilidade ambiental.',
    imageSrc: '/images/gabardo-certification-docs.JPG'
  }
];

const HomeStripeCardSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#0B1B31] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.12),_transparent_55%)]" />
      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Logística inteligente com o DNA da <span className="font-bold">gabardo</span>
            </h2>
            <p className="max-w-xl text-base text-white/70">
              Com mais de três décadas de atuação, entregamos operações que combinam planejamento estratégico,
              tecnologia e experiência humana para acelerar a cadeia automotiva brasileira.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Operações On-demand', 'Controle 24/7', 'Integração com OEMs'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-widest backdrop-blur"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-8 shadow-[0_35px_90px_-40px_rgba(12,27,51,0.85)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.22),transparent_65%)]" />
              <div className="relative space-y-6">
                {stripeFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    layout
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    animate={
                      hoveredIndex === index
                        ? {
                            scale: 1.03,
                            y: -6,
                            padding: '32px',
                            borderColor: 'rgba(56,182,255,0.45)',
                            boxShadow: '0 42px 120px -46px rgba(8,19,33,0.85)',
                          }
                        : {
                            scale: 1,
                            y: 0,
                            padding: '24px',
                            borderColor: 'rgba(255,255,255,0.15)',
                            boxShadow: '0 22px 65px -40px rgba(9,18,35,0.75)',
                          }
                    }
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="relative overflow-hidden rounded-2xl border bg-white/10 text-white backdrop-blur-xl"
                  >
                    <Image
                      src={feature.imageSrc}
                      alt={`Gabardo ${feature.label}`}
                      fill
                      sizes="(min-width: 1024px) 32vw, 80vw"
                      priority={false}
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0B1B31]/85 via-[#0B1B31]/65 to-gabardo-blue/45"
                      animate={{ opacity: hoveredIndex === index ? 0.85 : 0.7 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                    <div className="relative space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.42em] text-gabardo-light-blue/90">
                        {feature.label}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{feature.value}</h3>
                      <p className="text-sm text-white/75">{feature.description}</p>
                    </div>
                    <motion.span
                      className="pointer-events-none absolute inset-x-6 bottom-4 h-px rounded-full bg-gabardo-light-blue/80"
                      initial={false}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, scaleX: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStripeCardSection;
