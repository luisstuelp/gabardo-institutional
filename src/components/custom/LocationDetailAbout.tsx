"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LocationData } from '@/data/locationsData';

interface LocationDetailAboutProps {
  location: LocationData;
}

const LocationDetailAbout: React.FC<LocationDetailAboutProps> = ({ location }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 leading-tight"
              >
                {location.about.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl text-neutral-600 mb-8 leading-relaxed"
              >
                {location.about.description}
              </motion.p>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-4 mb-8"
              >
                {location.about.features.map((feature: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-neutral-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <button className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors">
                  Saiba Mais
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Real Image */}
              <div className="aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Ambiente de trabalho moderno"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-800">15+</div>
                  <div className="text-xs text-neutral-600">Anos</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-32 h-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <div className="text-lg font-bold">Porto Digital</div>
                  <div className="text-xs opacity-90">Ecossistema</div>
                </div>
              </motion.div>
            </div>

            {/* Background Pattern */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl opacity-30" />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-neutral-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '320m²', label: 'Área Total' },
              { number: '45', label: 'Capacidade' },
              { number: '24/7', label: 'Acesso' },
              { number: '100%', label: 'Ocupação' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationDetailAbout; 