'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const heroImage = '/images/gabardo-hero-03.JPG';

const TrabalheConoscoHeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
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

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-white mb-4 sm:mb-5 md:mb-6"
        >
          Estamos prontos para atender você
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight tracking-tight mb-5 sm:mb-6"
        >
          Fale Conosco
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-8 sm:mb-10 px-2 sm:px-0"
        >
          Entre em contato com a Gabardo. Seja para dúvidas, parcerias, orçamentos ou sugestões, nossa equipe está pronta para conversar com você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-col gap-3 sm:gap-4 md:gap-5 sm:flex-row w-full sm:w-auto"
        >
          <motion.a
            href="/orcamento"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-gabardo-blue shadow-lg"
          >
            Solicitar orçamento
          </motion.a>
          <motion.a
            href="#contact-form"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white backdrop-blur-md"
          >
            Enviar mensagem
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex flex-col items-center gap-3 mt-12 sm:mt-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">Role para ver formas de contato</span>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrabalheConoscoHeroSection;
