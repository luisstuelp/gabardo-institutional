'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Shield, Zap, Award } from 'lucide-react';

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
    id: 'experiencia',
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

const getColorClasses = (color: string) => {
  const colors = {
    primary: 'from-[#F1F5FF] to-[#DCE6FF]',
    accent: 'from-[#F4F7FD] to-[#E3EBFF]',
    neutral: 'from-[#F7F9FC] to-[#E6ECF5]',
  };
  return colors[color as keyof typeof colors] || colors.primary;
};

const getIconColorClasses = (color: Advantage['color']) => {
  const iconColors: Record<Advantage['color'], string> = {
    primary: 'text-[#0F233F]',
    accent: 'text-[#132D51]',
    neutral: 'text-[#0F233F]',
  };
  return iconColors[color];
};

const ServicesAdvantagesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading advantages...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-gabardo-blue/20 to-gabardo-light-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
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
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Por Que Escolher a Gabardo
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Vantagens</span>
            <br />
            <span className="text-neutral-600">Competitivas</span>
          </motion.h2>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                >
                  {/* Icon & Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses(advantage.color)} flex items-center justify-center shadow-[0_18px_32px_-20px_rgba(19,45,81,0.4)]`}
                    >
                      <Icon className={`w-8 h-8 ${getIconColorClasses(advantage.color)}`} strokeWidth={2.3} />
                    </motion.div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{color: '#132D51'}}>
                        {advantage.stats}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-4" style={{color: '#132D51'}}>
                    {advantage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed">
                    {advantage.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gabardo-blue/5 to-gabardo-light-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                    className="absolute bottom-0 left-0 h-1"
                    style={{backgroundColor: '#38B6FF'}}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesAdvantagesSection;
