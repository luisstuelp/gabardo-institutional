'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const heroImage = '/images/gabardo-hero-03.JPG';

const TrabalheConoscoHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Colaboradores da Gabardo em operação"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/85" />
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-gabardo-blue/30 blur-[110px]" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-gabardo-light-blue/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs sm:text-sm font-light tracking-[0.3em] text-gabardo-light-blue uppercase mb-5"
        >
          Nosso time move a logística do Brasil
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
        >
          Construa sua carreira com a Gabardo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-10"
        >
          Somos apaixonados por desenvolver pessoas, acelerar talentos e criar oportunidades em um ambiente que valoriza diversidade, inovação e resultados.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <motion.a
            href="#talent-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-gabardo-blue shadow-lg"
          >
            Cadastrar currículo
          </motion.a>
          <motion.a
            href="#beneficios-gabardo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
          >
            Conhecer jornada
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex flex-col items-center gap-3 mt-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">Role para conhecer nossas iniciativas</span>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrabalheConoscoHeroSection;
