'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const stripeFeatures = [
  {
    label: 'Cobertura Nacional',
    value: '15 bases operacionais',
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
      'Protocolos nacionais e internacionais padronizados garantindo eficiência operacional e responsabilidade ambiental.',
    imageSrc: '/images/gabardo-certification-docs.JPG'
  }
];

const HomeStripeCardSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="relative overflow-hidden bg-[#0B1B31] py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.12),_transparent_55%)]" />
      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-5 md:space-y-6 text-white"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-semibold leading-tight md:leading-[1.05]">
              Logística inteligente com o DNA <span className="font-bold">Gabardo</span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-white/70">
              Com mais de três décadas de atuação, entregamos operações que combinam planejamento estratégico,
              tecnologia e experiência humana para acelerar a cadeia automotiva brasileira.
            </p>
            <div className="flex flex-col gap-2 sm:gap-3 w-fit items-start">
              {['Excelência operacional sustentável', 'Integração com montadoras', 'Padrões internacionais'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1 text-[0.65rem] sm:text-xs uppercase tracking-wider sm:tracking-widest backdrop-blur whitespace-nowrap"
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
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white/8 p-5 sm:p-6 md:p-8 shadow-[0_35px_90px_-40px_RGBA(12,27,51,0.85)] backdrop-blur-2xl">
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
                className="relative flex flex-col gap-3 sm:gap-4"
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
                        minHeight: isActive ? 280 : 140,
                        borderColor: isActive ? 'rgba(56,182,255,0.58)' : 'rgba(255,255,255,0.16)',
                        boxShadow: isActive
                          ? '0 48px 120px -40px rgba(8,19,33,0.9)'
                          : '0 18px 54px -50px rgba(9,18,35,0.46)',
                        borderRadius: isActive ? 28 : 20,
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
                      style={{ flexBasis: 'auto', minHeight: 0, padding: 0 }}
                      className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl sm:rounded-2xl border bg-white/10 text-white backdrop-blur-xl"
                      onClick={() => setActiveIndex(index)}
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
                        <div className="space-y-2 sm:space-y-3">
                          <span
                            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1 text-[0.6rem] sm:text-[11px] font-semibold uppercase tracking-[0.36em] sm:tracking-[0.42em] text-white/90"
                            style={{ backgroundColor: 'rgba(7, 21, 43, 0.55)' }}
                          >
                            {feature.label}
                          </span>
                          <motion.h3
                            className="text-base sm:text-lg font-semibold text-white"
                            initial={false}
                            animate={{ fontSize: isActive ? '1.25rem' : '1rem', lineHeight: isActive ? '1.35' : '1.25' }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                          >
                            {feature.value}
                          </motion.h3>
                          <motion.p
                            className="text-xs sm:text-sm text-white/90"
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0 }}
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
