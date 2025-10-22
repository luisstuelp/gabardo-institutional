'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ClipboardCheck } from 'lucide-react';

type ReliabilityItem = {
  src: string;
  alt: string;
};

const reliabilityItems: ReliabilityItem[] = [
  {
    src: '/images/certifications/ghg-protocol-2024-prata.png',
    alt: 'Selo GHG Protocol Prata 2024',
  },
  {
    src: '/images/certifications/spco2-zero-ouro.png',
    alt: 'Selo SPCO2 Zero Ouro',
  },
  {
    src: '/images/certifications/carbon-negative-certified.png',
    alt: 'Selo Carbon Negative Certified Worton',
  },
  {
    src: '/images/certifications/gcs-abnt-pr2030-esg.png',
    alt: 'Selo Global Certification System ABNT PR 2030 ESG',
  },
  {
    src: '/images/certifications/Design sem nome (59).png',
    alt: 'Selo Operador Econômico Autorizado (OEA)',
  },
  {
    src: '/images/certifications/ghg-protocol-membro-ciclo-2024.png',
    alt: 'Selo Membro Ciclo 2024 do GHG Protocol',
  },
  {
    src: '/images/certifications/carbono-zero-gabardo.png',
    alt: 'Selo Gabardo Carbono Zero',
  },
  {
    src: '/images/certifications/iso-9001-qualidade.png',
    alt: 'Selo ISO 9001 Qualidade',
  },
  {
    src: '/images/certifications/iso-39001-seguranca-viaria.png',
    alt: 'Selo ISO 39001 Segurança Viária',
  },
  {
    src: '/images/certifications/iso-14001-meio-ambiente.png',
    alt: 'Selo ISO 14001 Meio Ambiente',
  },
  {
    src: '/images/certifications/childhood-na-mao-certa.png',
    alt: 'Selo Childhood Programa Na Mão Certa',
  },
  {
    src: '/images/certifications/despoluir-programa-ambiental.png',
    alt: 'Selo Despoluir Programa Ambiental do Transporte',
  },
];

const highlightPillars = [
  {
    title: 'Proteção ativa 24/7',
    description: 'Centro de controle Gabardo monitora rotas, clima e riscos em tempo real com acionamento imediato de contingência.',
    icon: ShieldCheck,
  },
  {
    title: 'Compliance e documentação',
    description: 'Auditorias frequentes, protocolos padronizados e checklists digitais asseguram rastreabilidade em cada etapa.',
    icon: ClipboardCheck,
  },
  {
    title: 'Segurança da carga e da informação',
    description: 'Tecnologia embarcada, bloqueios remotos e criptografia de dados garantem confidencialidade e integridade.',
    icon: Lock,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const metricsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 } },
};

const metricItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

type VisibleLayer = {
  item: ReliabilityItem;
  index: number;
  depth: number;
  animate: {
    y: number;
    scale: number;
    opacity: number;
    filter: string;
  };
  z: number;
  isActive: boolean;
};

const ProtocolStack: React.FC = () => {
  const total = reliabilityItems.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const cycle = useCallback(
    (direction: number) => {
      setActiveIndex((prev) => {
        const next = (prev + direction + total) % total;
        return next;
      });
    },
    [total]
  );

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => cycle(1), 2000);
  }, [cycle]);

  const stopAutoplay = useCallback(() => {
    if (!autoplayRef.current) return;
    clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    // Wheel navigation disabled per request; keep empty effect to maintain reference availability if needed later.
    return undefined;
  }, [cycle, stopAutoplay]);

  const positions = reliabilityItems.map((_, index) => {
    const diffRaw = (index - activeIndex + total) % total;
    const depth = diffRaw <= total / 2 ? diffRaw : diffRaw - total; // negative for items behind
    return depth;
  });

  const visibleLayers = useMemo<VisibleLayer[]>(
    () =>
      reliabilityItems
        .map((item, index) => {
          const depth = positions[index];
          if (Math.abs(depth) > 2) {
            return null;
          }
          const y = depth * 32;
          const scale = 1 - Math.abs(depth) * 0.08;
          const opacity = 1 - Math.abs(depth) * 0.2;
          const blur = Math.abs(depth) === 0 ? 0 : Math.abs(depth) * 1.2;
          const z = 10 - Math.abs(depth);
          const isActive = depth === 0;
          const layer: VisibleLayer = {
            item,
            index,
            depth,
            animate: { y, scale, opacity, filter: `blur(${blur}px)` },
            z,
            isActive,
          };

          return layer;
        })
        .filter((layer): layer is VisibleLayer => layer !== null),
    [positions]
  );


  return (
    <motion.div
      variants={metricItem}
      className="relative overflow-hidden rounded-[28px] "
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-4 flex items-center gap-3"
      >
        <motion.span
          className="h-0.5 w-10 rounded-full bg-gabardo-blue/40"
          animate={{ width: [40, 56, 40] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.h3
          className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-gabardo-blue/60"
          initial={{ letterSpacing: '0.12em' }}
          animate={{ letterSpacing: ['0.34em', '0.36em', '0.34em'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Qualidade Garantida
        </motion.h3>
      </motion.div>

      <div ref={containerRef} className="relative mt-6 sm:mt-8 flex h-[320px] sm:h-[380px] md:h-[420px] items-center justify-center overflow-hidden">
        {visibleLayers.map(({ item, animate, z, isActive }) => (
          <motion.div
            key={item.src}
            initial={{ y: animate.y + 40, opacity: 0, scale: animate.scale - 0.05  }}
            animate={animate}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ zIndex: z }}
            className="absolute inset-x-0 mx-auto flex w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] items-center justify-center rounded-2xl sm:rounded-3xl bg-white/96 px-4 sm:px-5 md:px-6 py-4 sm:py-5 shadow-[0_26px_48px_-36px_rgba(19,45,81,0.65)"
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              className="h-52 sm:h-60 md:h-72 w-auto object-contain drop-shadow-sm"
              animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.28 : 0.92 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 pb-3 sm:pb-4">
        <div className="flex gap-1.5">
          {reliabilityItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 sm:h-1.5 rounded-full transition-all ${
                activeIndex === index ? 'w-6 sm:w-7 bg-gabardo-blue' : 'w-2 sm:w-3 bg-gabardo-blue/25'
              }`}
              aria-label={`Ir para protocolo ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-gabardo-blue/60">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

const PremiumInfoSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute top-[18%] left-8 h-64 w-64 rounded-full bg-gradient-to-br from-gabardo-light-blue/30 to-gabardo-blue/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: [0, 10, -6, 0], y: [0, -12, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[12%] right-6 h-80 w-80 rounded-full bg-gradient-to-tr from-gabardo-light-blue/25 to-gabardo-blue/15 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, x: [0, -14, 8, 0], y: [0, 16, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-1/3 top-0 h-40 rounded-b-full bg-gradient-to-b from-white/70 via-white/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-gabardo-blue/10 via-gabardo-blue/40 to-gabardo-blue/70"
              animate={{ scaleX: [1, 1.1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-xs sm:text-sm font-mono text-gray-600 tracking-[0.24em] sm:tracking-[0.3em] uppercase">
              Confiabilidade e Segurança
            </span>
            <motion.div
              className="h-px w-12 bg-gradient-to-l from-gabardo-blue/10 via-gabardo-blue/40 to-gabardo-blue/70"
              animate={{ scaleX: [1, 0.9, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gabardo-blue"
          >
            Nossos Compromissos com a sua Carga
          </motion.h2>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-12 md:gap-16">
          <motion.div
            className="grid gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-white/30 bg-white/40 p-4 sm:p-5 md:p-6 shadow-[0_32px_90px_-48px_rgba(19,45,81,0.6)] backdrop-blur-lg md:grid-cols-[1.15fr_0.85fr]"
            variants={metricsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <ProtocolStack />
            <motion.figure
              variants={metricItem}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/40 bg-white/70 shadow-[0_22px_40px_-46px_rgba(19,45,81,0.55)]"
            >
              <img
                src="/images/seguranca-thumbsup.jpg"
                alt="Colaborador Gabardo em ambiente seguro"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6">
                <motion.div
                  className="flex items-center justify-end gap-3"
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <motion.h4
                    className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/85 drop-shadow-md"
                    initial={{ letterSpacing: '0.12em' }}
                    animate={{ letterSpacing: ['0.34em', '0.36em', '0.34em'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Confiança Gabardo
                  </motion.h4>
                  <motion.span
                    className="h-0.5 w-10 rounded-full bg-white/70"
                    animate={{ width: [40, 56, 40] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                </motion.div>
                <motion.p
                  className="mt-3 text-lg font-semibold leading-snug text-white drop-shadow-md text-right"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                >
                  Inspira segurança em cada entrega
                </motion.p>
              </figcaption>
            </motion.figure>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {highlightPillars.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative flex h-full flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-[24px] md:rounded-[28px] border border-white/35 bg-white/70 p-4 sm:p-5 md:p-6 shadow-[0_26px_70px_-48px_rgba(19,45,81,0.55)] backdrop-blur-lg transition-all duration-300 hover:border-gabardo-light-blue/60"
              >
                <motion.span
                  className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gabardo-light-blue/20 text-gabardo-blue shadow-[0_16px_36px_-28px_rgba(56,182,255,0.7)]"
                  animate={{ scale: [1, 1.07, 1], rotate: [0, 4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.span>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gabardo-blue">{title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={false}
                  animate={{ background: ['rgba(56,182,255,0)', 'rgba(56,182,255,0.08)', 'rgba(56,182,255,0)'] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PremiumInfoSection;
