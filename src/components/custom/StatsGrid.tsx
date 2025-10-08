'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  id: string;
  value: number;
  suffix?: string;
  title: string;
  description: string;
  accent: "light" | "dark";
  duration?: number;
  formatValue?: (value: number) => string;
};

const stats: Stat[] = [
  {
    id: "anos",
    value: 36,
    suffix: "+",
    title: "Anos de estrada",
    description: "Desde 1989, mais de 3 décadas de experiência em logística automotiva.",
    accent: "light",
    duration: 2600
  },
  {
    id: "veiculos",
    value: 350000,
    title: "Veículos transportados (ano)",
    description: "Mais de 1.4 milhão de veículos transportados nos últimos 5 anos.",
    accent: "dark",
    duration: 3400,
    formatValue: (value) => `${Math.floor(value / 1000).toLocaleString("pt-BR")}.000+`
  },
  {
    id: "idade-media",
    value: 2,
    suffix: " anos",
    title: "Idade média da frota",
    description: "Frota moderna e eficiente para garantir a segurança e a qualidade do transporte.",
    accent: "dark",
    duration: 3000,
    formatValue: (value) => `${value.toFixed(0)} anos`
  },
  {
    id: "frota-propria",
    value: 13,
    suffix: "+",
    title: "Bases e unidades",
    description: "Cobertura estratégica em todo o território nacional.",
    accent: "dark",
    duration: 2400
  },
  {
    id: "satisfacao-clientes",
    value: 99,
    suffix: "%",
    title: "Satisfação clientes",
    description: "Resultados reconhecidos pelos parceiros Gabardo.",
    accent: "light",
    duration: 2600
  }
];

const useCountUpStats = (items: Stat[], shouldAnimate: boolean) => {
  const [counts, setCounts] = useState<number[]>(items.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;
    setCounts(items.map(() => 0));

    const frames: number[] = [];
    const startTimes: number[] = [];

    const createStep = (index: number, target: number, duration: number) => {
      const step = (timestamp: number) => {
        if (!startTimes[index]) {
          startTimes[index] = timestamp;
        }

        const progress = Math.min((timestamp - startTimes[index]) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const nextValue = target * eased;

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = nextValue;
          return updated;
        });

        if (progress < 1) {
          frames[index] = requestAnimationFrame(step);
        }
      };

      frames[index] = requestAnimationFrame(step);
    };

    items.forEach((item, index) => {
      createStep(index, item.value, item.duration ?? 2000);
    });

    return () => {
      frames.forEach((frame) => cancelAnimationFrame(frame));
      hasAnimated.current = false;
    };
  }, [items, shouldAnimate]);

  return counts;
};

const StatCard: React.FC<{ stat: Stat; value: number; index: number }> = ({ stat, value, index }) => {
  const isDark = stat.accent === "dark";

  const formatDisplayValue = (input: number) => {
    if (stat.formatValue) {
      return stat.formatValue(input);
    }
    const rounded = Math.round(input);
    return `${rounded.toLocaleString("pt-BR")}${stat.suffix ?? ""}`;
  };

  const currentDisplay = formatDisplayValue(value);
  const finalDisplay = formatDisplayValue(stat.value);
  const minWidthCh = Math.max(finalDisplay.length, currentDisplay.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -10, scale: 1.015, rotateX: 2.4, rotateY: -2, transition: { duration: 0.35, ease: "easeOut" } }}
      whileTap={{ scale: 0.985 }}
      className={`group relative w-full max-w-[460px] rounded-[28px] px-12 py-10 shadow-[0_32px_80px_-48px_RGBA(19,45,81,0.55)] transition-transform duration-500 ${
        isDark ? "bg-gabardo-blue text-white" : "bg-neutral-100 text-gabardo-blue"
      }`}
    >
      <div
        className={`pointer-events-none absolute -inset-24 hidden rounded-full blur-3xl transition-transform duration-500 group-hover:scale-105 md:block ${
          isDark ? "bg-gabardo-blue/22" : "bg-gabardo-light-blue/18"
        }`}
      />

      <div className="relative flex flex-col gap-6">
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.24em] leading-tight ${
            isDark ? "text-white/80" : "text-gabardo-blue"
          }`}
        >
          {stat.title}
        </span>
        <span
          className={`text-4xl font-extrabold tracking-tight md:text-[48px] tabular-nums ${isDark ? "text-white" : "text-gabardo-blue"}`}
          style={{ minWidth: `${minWidthCh}ch` }}
        >
          {currentDisplay}
        </span>
        <p
          className={`max-w-[380px] text-sm leading-relaxed ${
            isDark ? "text-white/75" : "text-neutral-600"
          }`}
        >
          {stat.description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-gabardo-light-blue/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className={`pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          isDark ? "bg-gabardo-light-blue/20" : "bg-transparent"
        }`}
      />
    </motion.div>
  );
};

const StatsGrid = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const counts = useCountUpStats(stats, sectionInView);
  const topRow = stats.slice(0, 2);
  const bottomRow = stats.slice(2);

  return (
    <section ref={sectionRef} className="section-shell section-shell--muted relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-24 hidden h-72 w-72 rounded-full bg-gabardo-light-blue/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-16 bottom-0 hidden h-80 w-80 rounded-full bg-gabardo-blue/10 blur-3xl lg:block" />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Nossos indicadores</span>
          <h2 className="section-heading mt-5">Resultados que sustentam a confiança Gabardo</h2>
          <p className="section-subheading mt-6">
            Performance consistente com tecnologia, cobertura nacional e experiência de quem lidera a logística automotiva há décadas.
          </p>
          <div className="section-divider mx-auto mt-10" />
        </div>

        <div className="mt-24 w-full">
          <div className="relative flex flex-col items-center gap-20">
            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-none"
              viewBox="0 0 1500 520"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="stats-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.15" />
                  <stop offset="28%" stopColor="#38B6FF" stopOpacity="0.65" />
                  <stop offset="54%" stopColor="#7FD7FF" stopOpacity="0.85" />
                  <stop offset="82%" stopColor="#38B6FF" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="stats-flow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7FD7FF" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7FD7FF" stopOpacity="0.35" />
                </linearGradient>
                <filter id="stats-flow-filter" x="-20%" y="-30%" width="140%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d="M 1500 120 C 1320 110, 1210 160, 1070 190 S 840 240, 750 205 S 620 140, 520 210 S 410 360, 320 350 S 170 290, 40 360 L -80 420"
                fill="none"
                stroke="url(#stats-flow-gradient)"
                strokeWidth={24}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#stats-flow-filter)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />

              <motion.path
                d="M 1500 120 C 1320 110, 1210 160, 1070 190 S 840 240, 750 205 S 620 140, 520 210 S 410 360, 320 350 S 170 290, 40 360 L -80 420"
                fill="none"
                stroke="url(#stats-flow-glow)"
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
              />
            </svg>

            <div className="relative z-10 flex w-full max-w-[920px] flex-col items-center gap-10 px-4 md:flex-row md:justify-center md:gap-14 lg:px-0">
              {topRow.map((stat, index) => (
                <div key={stat.id} className="relative flex w-full max-w-[400px] justify-center">
                  <StatCard stat={stat} value={counts[index] ?? 0} index={index} />
                </div>
              ))}
            </div>

            <div className="relative z-10 flex w-full max-w-[920px] flex-col items-center gap-10 px-4 md:flex-row md:justify-center md:gap-14 lg:px-0">
              {bottomRow.map((stat, idx) => {
                const index = idx + topRow.length;
                return (
                  <div key={stat.id} className="relative flex w-full max-w-[400px] justify-center">
                    <StatCard stat={stat} value={counts[index] ?? 0} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
