'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OrcamentoHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] text-white overflow-hidden bg-cover bg-center"
             style={{ backgroundImage: 'url(/images/gabardo-hero-04.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4"
        >
          Solicite seu Orçamento
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-secondary text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl"
        >
          Preencha o formulário abaixo e receba uma cotação personalizada para o transporte do seu veículo. É rápido, fácil e seguro.
        </motion.p>
      </div>
    </section>
  );
};

export default OrcamentoHero;
