'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LocationDetailTransformProps {
  location: {
    transform?: {
      title?: string;
      description?: string;
      benefits?: string[];
    };
  };
}

const LocationDetailTransform: React.FC<LocationDetailTransformProps> = ({ location }) => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-neutral-300 to-neutral-500 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white/30">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <p className="text-lg">Transformação</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              {location.transform?.title || 'Transforme sua experiência de trabalho'}
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              {location.transform?.description || 'Descubra um novo jeito de trabalhar com toda a infraestrutura e flexibilidade que você precisa.'}
            </p>
            <div className="space-y-4">
              {(location.transform?.benefits || ['Ambiente inspirador', 'Infraestrutura completa', 'Flexibilidade total']).map((benefit: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <span className="text-neutral-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetailTransform; 