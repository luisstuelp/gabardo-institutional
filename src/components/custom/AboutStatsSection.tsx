'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Truck, Building2, Percent } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

interface Stat {
  id: string;
  icon: React.ReactNode;
  target: number;
  title: string;
  description: string;
  duration?: number;
  formatValue: (value: number) => string;
}

const descriptions: Record<string, string> = {
  'Anos de atuação': 'Experiência acumulada suportando operações automotivas em todo o país.',
  'Veículos transportados (2020–2024)': 'Volume consolidado sob protocolos de segurança, rastreabilidade e SLA rigoroso.',
  'Idade média da frota': 'Frota jovem com manutenção dedicada, garantindo disponibilidade e confiabilidade.',
  'Composição da frota': 'Equilíbrio entre ativos próprios e parceiros homologados para flexibilidade operacional.',
};

const extractNumber = (raw: string): number => {
  const match = raw.match(/[\d.,]+/);
  if (!match) return 0;
  const sanitized = match[0].replace(/\.(?=\d)/g, '').replace(',', '.');
  const parsed = parseFloat(sanitized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const stats: Stat[] = aboutContent.numbers.kpis.map((kpi, index) => {
  let icon: React.ReactNode = <Building2 className="w-8 h-8" />;
  if (kpi.label === 'Anos de atuação') icon = <Calendar className="w-8 h-8" />;
  if (kpi.label === 'Veículos transportados (2020–2024)') icon = <Truck className="w-8 h-8" />;
  if (kpi.label === 'Idade média da frota') icon = <Truck className="w-8 h-8" />;
  if (kpi.label === 'Composição da frota') icon = <Percent className="w-8 h-8" />;

  const target = extractNumber(kpi.value);
  const hasPlus = kpi.value.includes('+');
  const [ownSegment, partnerSegment] = kpi.value.split('/');
  const ownLabel = ownSegment?.replace(/^[\d\s.,+%]+/, '').trim() ?? '';
  const partnerLabel = partnerSegment?.trim() ?? '';

  const formatters: Record<string, (value: number) => string> = {
    'Anos de atuação': (value) => `${Math.round(value)}${hasPlus ? '+' : ''}`,
    'Veículos transportados (2020–2024)': (value) => `${Math.round(value).toLocaleString('pt-BR')}`,
    'Idade média da frota': (value) => `${value.toFixed(1).replace('.', ',')} anos`,
    'Composição da frota': (value) => `${Math.round(value)}%${ownLabel ? ` ${ownLabel}` : ''}${partnerLabel ? ` / ${partnerLabel}` : ''}`,
  };

  return {
    id: kpi.label.toLowerCase().replace(/\s+/g, '-'),
    icon,
    target,
    title: kpi.label,
    description: descriptions[kpi.label] ?? '',
    duration: 2000 + index * 400,
    formatValue: formatters[kpi.label] ?? ((value) => `${Math.round(value)}${hasPlus ? '+' : ''}`),
  };
});

const useCountUpStats = (entries: Stat[], isInView: boolean) => {
  const [counts, setCounts] = useState<number[]>(entries.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const animationFrames: number[] = [];
    const startTimes: number[] = [];

    entries.forEach((stat, index) => {
      const duration = stat.duration ?? 2000;

      const animate = (timestamp: number) => {
        if (!startTimes[index]) startTimes[index] = timestamp;
        const progress = Math.min((timestamp - startTimes[index]) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = stat.target * eased;

        setCounts((prev) => {
          const next = [...prev];
          next[index] = value;
          return next;
        });

        if (progress < 1) {
          animationFrames[index] = requestAnimationFrame(animate);
        }
      };

      animationFrames[index] = requestAnimationFrame(animate);
    });

    return () => {
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [entries, isInView]);

  return counts;
};

const AboutStatsSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });
  const counts = useCountUpStats(stats, isInView);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">Carregando indicadores...</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block font-secondary"
            style={{ color: '#132D51' }}
          >
            {aboutContent.numbers.title}
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{ backgroundColor: '#132D51' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight font-primary"
            style={{ color: '#132D51' }}
          >
            Excelência que Comprova
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
              className="relative p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl group bg-white border-gray-200 shadow-sm hover:shadow-lg"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
              >
                {stat.icon}
              </motion.div>

              <div className="mb-4">
                <motion.span
                  className="text-4xl md:text-5xl font-bold block leading-none font-primary"
                  style={{ color: '#132D51' }}
                >
                  {stat.formatValue(counts[index])}
                </motion.span>
              </div>

              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide mb-2 leading-tight font-primary" style={{ color: '#132D51' }}>
                {stat.title}
              </h3>

              <p className="text-gray-600 font-light leading-relaxed text-sm font-secondary">
                {stat.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                className="absolute bottom-0 left-0 h-1"
                style={{ backgroundColor: '#132D51' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;