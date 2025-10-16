'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OrcamentoHero: React.FC = () => {
  return (
    <section
      className="relative flex w-full items-center justify-center text-white overflow-hidden bg-cover bg-center min-h-[520px] md:min-h-[640px]"
      style={{ backgroundImage: 'url(/images/Design%20sem%20nome.png)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center md:px-10 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 uppercase"
        >
          <span className="block text-white">Solicite seu orçamento</span>
          <span className="block text-gabardo-light-blue">com a Transportes Gabardo</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl text-white/85"
        >
          Preencha o formulário abaixo e receba uma cotação personalizada para o transporte do seu veículo. É rápido, fácil e seguro.
        </motion.p>
      </div>
    </section>
  );
};

export default OrcamentoHero;
