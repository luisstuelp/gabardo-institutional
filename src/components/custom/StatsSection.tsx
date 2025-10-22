'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-white/30"></div>
              <span className="text-sm font-mono text-white/60 tracking-[0.3em] uppercase">
                Números que Falam
              </span>
              <div className="w-12 h-px bg-white/30"></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { number: '35+', label: 'Anos de Experiência', description: 'Mercado consolidado', type: 'text' },
              { number: '500+', label: 'Clientes Atendidos', description: 'Confiança nacional', type: 'text' },
              { number: '24/7', label: 'Suporte Disponível', description: 'Sempre conectados', type: 'text' },
              { number: '98%', label: 'Satisfação', description: 'Excelência comprovada', type: 'star' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 hover-blue-80 transition-colors duration-300 flex items-center justify-center gap-2">
                  {stat.number}
                  {stat.type === 'star' && (
                    <Star className="w-8 h-8 lg:w-10 lg:h-10 stroke-2 text-blue-bright" style={{fill: '#3b82f644'}} />
                  )}
                </div>
                <div className="text-lg font-bold text-white/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/60 font-light">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
