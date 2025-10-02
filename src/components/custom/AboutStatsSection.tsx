'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Truck, Building2, Percent } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

interface Stat {
  id: string;
  icon: React.ReactNode;
  number: number;
  suffix: string;
  title: string;
  description: string;
  color: string;
  duration?: number;
  formatValue?: (value: number) => string;
}

const stats: Stat[] = aboutContent.numbers.kpis.map((kpi, index) => {
  let icon;
  switch (kpi.label) {
    case 'Anos de atuação':
      icon = <Calendar className="w-8 h-8" />;
      break;
    case 'Veículos transportados (2020–2024)':
      icon = <Truck className="w-8 h-8" />;
      break;
    case 'Idade média da frota':
      icon = <Truck className="w-8 h-8" />;
      break;
    case 'Composição da frota':
      icon = <Percent className="w-8 h-8" />;
      break;
    default:
      icon = <Building2 className="w-8 h-8" />;
  }

  return {
    id: kpi.label.toLowerCase().replace(/\s/g, '-') ,
    icon: icon,
    number: parseFloat(kpi.value.replace('+', '').replace('%', '').replace(',', '.')), 
    suffix: kpi.value.includes('+') ? '+' : kpi.value.includes('%') ? '%' : '',
    title: kpi.label,
    description: `,
    color: 'gabardo',
    duration: 2000 + index * 500,
    formatValue: (value) => {
      if (kpi.label === 'Veículos transportados (2020–2024)') {
        return (value / 1000000).toFixed(3).replace('.', ',') + 'M';
      }
      if (kpi.label === 'Idade média da frota') {
        return value.toFixed(1).replace('.', ',') + ' anos';
      }
      return Math.round(value).toLocaleString('pt-BR');
    }
  };
});

const useCountUpStats = (stats: Stat[], isInView: boolean) => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const animationFrames: number[] = [];
    const startTimes: number[] = [];
    
    const animateAll = () => {
      stats.forEach((stat, index) => {
        const duration = stat.duration || 2000;
        
        const animate = (timestamp: number) => {
          if (!startTimes[index]) startTimes[index] = timestamp;
          const progress = Math.min((timestamp - startTimes[index]) / duration, 1);
          
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const newValue = stat.number * easeOutQuart;
          
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] = newValue;
            return newCounts;
          });
          
          if (progress < 1) {
            animationFrames[index] = requestAnimationFrame(animate);
          }
        };
        
        animationFrames[index] = requestAnimationFrame(animate);
      });
    };
    
    animateAll();
    
    return () => {
      animationFrames.forEach(frame => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
      });
    };
  }, [stats, isInView]);
  
  return counts;
};

const AboutStatsSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const counts = useCountUpStats(stats, isInView);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">Loading stats...</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{ backgroundColor: '#132D51' }}></div>
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
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`
                relative p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl group bg-white border-gray-200 shadow-sm hover:shadow-lg
              `}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
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
                  {stat.formatValue ? stat.formatValue(counts[index]) : (counts[index]?.toLocaleString() || 0)}{stat.suffix}
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