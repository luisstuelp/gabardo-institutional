'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stripeFeatures = [
  {
    label: 'Cobertura Nacional',
    value: '13+ bases operacionais',
    description:
      'Pontos estratégicos conectando montadoras, concessionárias e hubs logísticos em todo o país.',
    imageSrc: '/images/Design sem nome (3).png'
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
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-tight md:leading-[1.05]">
              Logística inteligente com o DNA da <span className="font-bold">Gabardo</span>
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-8 shadow-[0_35px_90px_-40px_RGBA(12,27,51,0.85)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.22),transparent_65%)]" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
                  },
                }}
                className="relative flex flex-col gap-4"
              >
                {stripeFeatures.map((feature, index) => {
                  const isActive = activeIndex === index;
                  
                  return (
                    <motion.div
                      key={feature.label}
                      layout
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        flexGrow: isActive ? 1.35 : 1,
                        minHeight: isActive ? 360 : 180,
                        borderColor: isActive ? 'rgba(56,182,255,0.58)' : 'rgba(255,255,255,0.16)',
                        boxShadow: isActive
                          ? '0 48px 120px -40px rgba(8,19,33,0.9)'
                          : '0 18px 54px -50px rgba(9,18,35,0.46)',
                        borderRadius: isActive ? 28 : 20,
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
                      style={{ flexBasis: 'auto', minHeight: 0, padding: 0 }}
                      className="relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white/10 text-white backdrop-blur-xl"
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveIndex(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isActive}
                    >
                      <Image
                        src={feature.imageSrc}
                        alt={`Gabardo ${feature.label}`}
                        fill
                        sizes="(min-width: 1024px) 32vw, 80vw"
                        priority={index === 0}
                        className="absolute inset-0 h-full w-full object-cover opacity-55"
                      />

                      <motion.div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#050d1c]/96 via-[#07152b]/88 to-[#0b1b31]/78"
                        initial={false}
                        animate={{ opacity: isActive ? 0.95 : 0.82 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      />

                      <motion.div
                        className="relative flex flex-1 flex-col justify-between space-y-4"
                        initial={false}
                        animate={{
                          paddingTop: isActive ? 36 : 24,
                          paddingBottom: isActive ? 36 : 24,
                          paddingLeft: isActive ? 32 : 24,
                          paddingRight: isActive ? 32 : 24,
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
                      >
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.42em] text-white/90">
                            {feature.label}
                          </span>
                          <motion.h3
                            className="text-lg font-semibold text-white"
                            initial={false}
                            animate={{ fontSize: isActive ? '1.46rem' : '1.18rem', lineHeight: isActive ? '1.35' : '1.25' }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                          >
                            {feature.value}
                          </motion.h3>
                          <motion.p
                            className="text-sm text-white/90"
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0.8 }}
                            transition={{ duration: 0.26, ease: 'easeOut' }}
                          >
                            {feature.description}
                          </motion.p>
                        </div>

                        <motion.div
                          className="pointer-events-none h-px rounded-full bg-gabardo-light-blue/90"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0.35, scaleX: isActive ? 1 : 0.5 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      </motion.div>

                      <motion.span
                        className="pointer-events-none absolute inset-x-6 bottom-4 h-px rounded-full bg-gabardo-light-blue/80"
                        initial={false}
                        animate={{ opacity: isActive ? 0 : 0.88, scaleX: isActive ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeStripeCardSection;
