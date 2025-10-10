'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Shield, Zap, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface Advantage {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  stats: string;
  color: 'primary' | 'accent' | 'neutral';
}

const advantages: Advantage[] = [
  {
    id: 'Experiencia',
    icon: Award,
    title: 'EXPERIÊNCIA CONSOLIDADA',
    description: 'Mais de 36 anos de mercado com expertise comprovada no transporte de veículos para as principais montadoras do Brasil.',
    stats: '36+ anos',
    color: 'primary',
  },
  {
    id: 'cobertura',
    icon: Target,
    title: 'COBERTURA NACIONAL',
    description: 'Presença estratégica em todo território nacional com unidades nas principais regiões e centros de distribuição.',
    stats: '14 unidades',
    color: 'accent',
  },
  {
    id: 'frota',
    icon: TrendingUp,
    title: 'FROTA ESPECIALIZADA',
    description: 'Frota própria e terceirizada com equipamentos modernos e especializados para diferentes tipos de veículos.',
    stats: '500+ veículos',
    color: 'neutral',
  },
  {
    id: 'certificacoes',
    icon: Shield,
    title: 'CERTIFICAÇÕES ISO',
    description: 'Processos certificados nas normas ISO 9001, ISO 14001 e ISO 39001, garantindo qualidade, meio ambiente e segurança.',
    stats: '3 ISOs',
    color: 'primary',
  },
  {
    id: 'tecnologia',
    icon: Zap,
    title: 'TECNOLOGIA AVANÇADA',
    description: 'Sistemas de gestão modernos com rastreamento GPS, monitoramento em tempo real e relatórios personalizados.',
    stats: '100% rastreado',
    color: 'accent',
  },
  {
    id: 'clientes',
    icon: Users,
    title: 'GRANDES CLIENTES',
    description: 'Parceria consolidada com as principais montadoras como Volkswagen, Mercedes-Benz, Ford, Hyundai e outras.',
    stats: '20+ montadoras',
    color: 'neutral',
  },
];

const ServicesAdvantagesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % advantages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const activeAdvantage = advantages[activeIndex];
  const ActiveIcon = activeAdvantage.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1f3a] via-[#132d51] to-[#0f1f3a] py-20 text-white">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-sky-300/15 blur-[130px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80"
          >
            Por que escolher a Gabardo
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-3xl font-semibold md:text-4xl"
          >
            Vantagens competitivas que sustentam nosso crescimento
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-4 max-w-3xl text-base text-white/70 md:text-lg"
          >
            Nossa operação combina experiência de mercado, tecnologia proprietária e uma cultura que forma líderes internamente. Explore os diferenciais que fazem da Gabardo o lugar certo para acelerar sua carreira.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.25fr_0.95fr]">
          <motion.article
            key={activeAdvantage.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/5 p-10 shadow-[0_28px_45px_-30px_rgba(15,31,58,0.8)] backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-70" />
            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                    <ActiveIcon className="h-9 w-9" strokeWidth={2.4} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.34em] text-white/60">Diferencial #{activeIndex + 1}</span>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {activeAdvantage.title.toUpperCase()}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                  {activeAdvantage.stats}
                </span>
              </div>

              <p className="max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
                {activeAdvantage.description}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm leading-relaxed text-white/75">
                  Programas contínuos de inovação, acompanhamento de KPIs e squads multidisciplinares garantem que cada diferencial se traduza em performance real.
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm leading-relaxed text-white/75">
                  Nossos times contam com rituais de aprendizagem, feedbacks estruturados e roadmaps claros para transformar vantagem competitiva em evolução de carreira.
                </div>
              </div>
            </div>
          </motion.article>

          <div className="space-y-4">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={advantage.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`group relative flex w-full items-center justify-between gap-4 rounded-3xl border px-5 py-4 text-left transition-all duration-400 ${
                    isActive
                      ? 'border-white/40 bg-white/12 shadow-[0_24px_40px_-24px_rgba(56,182,255,0.6)]'
                      : 'border-white/10 bg-white/6 hover:border-white/25 hover:bg-white/12'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-white text-[#132d51]' : 'bg-white/12 text-white'
                      } transition-colors duration-300`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{advantage.stats}</p>
                      <h4 className={`mt-1 text-base font-semibold ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {advantage.title.toUpperCase()}
                      </h4>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${isActive ? 'text-white' : 'text-white/50'}`}>
                    {index + 1}
                  </span>
                  <div className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + advantages.length) % advantages.length)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % advantages.length)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesAdvantagesSection;
