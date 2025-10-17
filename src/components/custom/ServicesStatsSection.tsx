'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MapPin, Award, Shield, Clock } from 'lucide-react';

interface StatItem {
  id: string;
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
  color: string;
}

const stats: StatItem[] = [
  {
    id: 'experiencia',
    icon: <Award className="w-8 h-8" />,
    number: '35+',
    label: 'Anos de Mercado',
    description: 'Experiência consolidada no transporte de veículos',
    color: 'blue'
  },
  {
    id: 'unidades',
    icon: <MapPin className="w-8 h-8" />,
    number: '15',
    label: 'Unidades Operacionais',
    description: 'Cobertura estratégica em todo território nacional',
    color: 'emerald'
  },
  {
    id: 'veiculos',
    icon: <TrendingUp className="w-8 h-8" />,
    number: '500K+',
    label: 'Veículos/Ano',
    description: 'Volume anual de veículos transportados',
    color: 'amber'
  },
  {
    id: 'clientes',
    icon: <Users className="w-8 h-8" />,
    number: '20+',
    label: 'Grandes Clientes',
    description: 'Montadoras e empresas de renome internacional',
    color: 'purple'
  },
  {
    id: 'certificacoes',
    icon: <Shield className="w-8 h-8" />,
    number: '3',
    label: 'Certificações ISO',
    description: 'ISO 9001, ISO 14001 e ISO 39001',
    color: 'indigo'
  },
  {
    id: 'uptime',
    icon: <Clock className="w-8 h-8" />,
    number: '99.5%',
    label: 'Taxa de Sucesso',
    description: 'Entregas realizadas dentro do prazo',
    color: 'red'
  }
];

const ServicesStatsSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [visibleStats, setVisibleStats] = useState<boolean[]>([]);

  useEffect(() => {
    setIsClient(true);
    setVisibleStats(new Array(stats.length).fill(false));
  }, []);

  const handleStatVisibility = (index: number) => {
    setVisibleStats(prev => {
      const newVisible = [...prev];
      newVisible[index] = true;
      return newVisible;
    });
  };

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading stats...</div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      emerald: 'from-emerald-500 to-emerald-600',
      amber: 'from-amber-500 to-amber-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600',
      red: 'from-red-500 to-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-16 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-1/4 left-16 w-80 h-80 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-30 blur-3xl" />
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
            className="text-sm font-light tracking-[0.2em] text-white/60 mb-4 uppercase relative inline-block"
          >
            Números da Excelência
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight"
          >
            Resultados que
            <br />
            <span style={{color: '#38B6FF'}}>Falam por Si</span>
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onViewportEnter={() => handleStatVisibility(index)}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-black/30 p-8 h-full text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center text-white shadow-lg`}
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={visibleStats[index] ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-4"
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed text-sm">
                  {stat.description}
                </p>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                  className="mt-6 mx-auto h-1"
                  style={{backgroundColor: '#38B6FF'}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
              Pronto para Ser Nosso Próximo Cliente de Sucesso?
            </h3>
            
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Junte-se às principais montadoras que confiam na Gabardo para suas operações logísticas. 
              Solicite uma proposta personalizada e descubra como podemos otimizar seu transporte de veículos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-10 py-4 bg-white font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{color: '#132D51'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Solicitar Proposta
              </button>
              <button 
                className="px-10 py-4 border-2 border-white text-white font-semibold uppercase tracking-wide transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#132D51';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Falar com Especialista
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesStatsSection;
