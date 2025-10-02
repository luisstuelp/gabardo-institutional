'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck, Lock, ClipboardCheck } from 'lucide-react';

const reliabilityItems = [
  "Procedimentos padronizados de investigação de avarias com KPIs e treinamentos contínuos.",
  "Gerenciadora de riscos própria, monitoramento 24h e plano de contingência imediato.",
  "Apólices nacionais e internacionais cobrindo todos os tipos de riscos.",
  "Certificações ISO 9001 (Qualidade), ISO 14001 (Meio Ambiente) e ISO 39001 (Segurança Viária).",
  "Operações certificadas em todos os portos do Brasil e habilitação aduaneira (DTA)."
];

const protocolMeta = [
  { label: 'Investigação & KPIs', accent: '#38B6FF' },
  { label: 'Controle Operacional 24h', accent: '#14B8A6' },
  { label: 'Cobertura Total', accent: '#F59E0B' },
  { label: 'Certificações ISO', accent: '#6366F1' },
  { label: 'Portos Homologados', accent: '#EC4899' },
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

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
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
    autoplayRef.current = setInterval(() => cycle(1), 4500);
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
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      cycle(direction);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [cycle]);

  const positions = reliabilityItems.map((_, index) => {
    const diffRaw = (index - activeIndex + total) % total;
    const depth = diffRaw <= total / 2 ? diffRaw : diffRaw - total; // negative for items behind
    return depth;
  });

  const visibleLayers = useMemo(() =>
    reliabilityItems.map((item, index) => {
      const depth = positions[index];
      if (Math.abs(depth) > 2) {
        return null;
      }
      const y = depth * 42;
      const scale = 1 - Math.abs(depth) * 0.08;
      const opacity = 1 - Math.abs(depth) * 0.2;
      const blur = Math.abs(depth) === 0 ? 0 : Math.abs(depth) * 1.2;
      const z = 10 - Math.abs(depth);
      const isActive = depth === 0;
      return {
        item,
        index,
        depth,
        animate: { y, scale, opacity, filter: `blur(${blur}px)` },
        z,
        isActive,
      };
    }).filter(Boolean) as Array<{ item: string; index: number; depth: number; animate: any; z: number; isActive: boolean }>,
  [positions]);


  return (
    <motion.div
      variants={metricItem}
      className="relative overflow-hidden rounded-[28px] border border-white/45 bg-gradient-to-br from-white/92 via-white/80 to-white/60 px-7 py-7 shadow-[0_28px_72px_-44px_rgba(19,45,81,0.6)]"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
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
          Protocolos em Camadas
        </motion.h3>
      </motion.div>
      <p className="text-sm leading-relaxed text-gray-600">
        Interaja para percorrer cada etapa que protege a operação Gabardo, da análise à execução.
      </p>

      <div ref={containerRef} className="relative mt-8 flex h-[330px] items-center justify-center overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-2 rounded-[30px] bg-gradient-to-br from-white/60 via-transparent to-gabardo-blue/5"
          animate={{ opacity: [0.55, 0.7, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -top-20 left-12 h-28 w-28 rounded-full bg-gabardo-blue/10 blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, 18, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-10 right-6 h-24 w-24 rounded-full bg-gabardo-light-blue/20 blur-3xl"
          animate={{ x: [0, -22, 12, 0], y: [0, -12, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
        {visibleLayers.map(({ item, index, depth, animate, z, isActive }) => (
          <motion.div
            key={item}
            initial={{ y: animate.y + 40, opacity: 0, scale: animate.scale - 0.05 }}
            animate={animate}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ zIndex: z }}
            className="absolute inset-x-0 mx-auto flex w/full max-w-[440px] items-start gap-3 rounded-3xl border border-white/70 bg-white/96 p-6 shadow-[0_26px_48px_-36px_rgba(19,45,81,0.65)] backdrop-blur-xl"
          >
            <motion.span
              className="mt-1 flex h-5 w-5 items-center justify-center"
              animate={{ color: isActive ? '#22c55e' : 'rgba(34,197,94,0.35)' }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="h-5 w-5" />
            </motion.span>
            <motion.span
              className="text-[1.02rem] leading-relaxed text-gray-700"
              animate={{ color: isActive ? 'rgba(38,45,55,0.95)' : 'rgba(71,85,105,0.7)' }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {reliabilityItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? 'w-7 bg-gabardo-blue' : 'w-3 bg-gabardo-blue/25'
              }`}
              aria-label={`Ir para protocolo ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue/60">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

const PremiumInfoSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-100 relative overflow-hidden">
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

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
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
            <span className="text-sm font-mono text-gray-600 tracking-[0.3em] uppercase">
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
            className="font-primary text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gabardo-blue"
          >
            Nossos Compromissos com a sua Carga
          </motion.h2>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col gap-16">
          <motion.div
            className="grid gap-6 rounded-[32px] border border-white/30 bg-white/40 p-6 shadow-[0_32px_90px_-48px_rgba(19,45,81,0.6)] backdrop-blur-lg md:grid-cols-[1.15fr_0.85fr]"
            variants={metricsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <ProtocolStack />
            <motion.figure
              variants={metricItem}
              className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-[0_22px_40px_-46px_rgba(19,45,81,0.55)]"
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
            className="grid gap-6 md:grid-cols-3"
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
                className="group relative flex h-full flex-col gap-4 rounded-[28px] border border-white/35 bg-white/70 p-6 shadow-[0_26px_70px_-48px_rgba(19,45,81,0.55)] backdrop-blur-lg transition-all duration-300 hover:border-gabardo-light-blue/60"
              >
                <motion.span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-light-blue/20 text-gabardo-blue shadow-[0_16px_36px_-28px_rgba(56,182,255,0.7)]"
                  animate={{ scale: [1, 1.07, 1], rotate: [0, 4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gabardo-blue">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
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