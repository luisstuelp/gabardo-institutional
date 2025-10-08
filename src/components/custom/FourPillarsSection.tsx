'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Shield, Leaf, Truck, Earth } from 'lucide-react';

// Custom EcoTruck icon with three separate icons arranged together
const EcoTruck: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className} flex items-center justify-center w-10 h-10`}>
    {/* Central Truck - main focus, larger size */}
    <Truck className="w-12 h-12 text-white/90 z-10" />
    
    {/* Leaf - positioned top-left, spaced away from truck */}
    <Leaf className="absolute -top-2 -left-2 w-5 h-5 text-white/80" />
    
    {/* Planet Earth - positioned bottom-right, spaced away from truck */}
    <Earth className="absolute -bottom-2 -right-2 w-5 h-5 text-white/70" />
  </div>
);

interface Pillar {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    id: 'precisao',
    icon: Target,
    title: 'PRECISÃO',
    description: 'Sistema de Gestão da Qualidade (ISO 9001) com processos documentados, PDI padronizado, manutenção preventiva e KPIs auditáveis'
  },
  {
    id: 'previsibilidade',
    icon: TrendingUp,
    title: 'PREVISIBILIDADE',
    description: 'SLAs objetivos e monitorados, rastreamento em tempo real 100% da frota e comunicação proativa em cada marco de entrega'
  },
  {
    id: 'protecao',
    icon: Shield,
    title: 'PROTEÇÃO',
    description: 'Rastreamento ponta a ponta, gestão integrada de riscos e segurança viária certificada (ISO 39001)'
  },
  {
    id: 'planeta',
    icon: EcoTruck,
    title: 'PLANETA',
    description: 'Gestão ambiental (ISO 14001), eficiência de combustível e metas anuais de emissões com inventário GEE divulgado'
  }
];

const FourPillarsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-neutral-900 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-16 w-64 h-64 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-1/4 left-16 w-80 h-80 bg-gradient-to-br from-white/5 to-white/10 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-white/30"></div>
            <span className="text-sm font-mono text-white/60 tracking-[0.3em] uppercase">
              Compromisso Gabardo
            </span>
            <div className="w-12 h-px bg-white/30"></div>
          </div>
          
          <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-6xl md:text-7xl lg:text-8xl font-black">4P&apos;s</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-widest">
              do <span className="text-gabardo-light-blue">Compromisso</span>
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-widest">
              Gabardo
            </span>
          </h2>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-black/30 p-8 h-full">
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto rounded-sm bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white/80 hover-blue-80 transition-colors duration-300" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gabardo-blue mb-4 uppercase tracking-wider">
                    {pillar.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FourPillarsSection;
