'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const backgroundImage = '/images/gabardo-hero-01.JPG';

export default function OrcamentoHero() {

  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Gabardo - Orçamento"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-white mb-4 sm:mb-5 md:mb-6"
        >
          Orçamento Gabardo
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight max-w-5xl px-2 sm:px-0"
        >
          Solicite seu <span className="text-gabardo-light-blue">orçamento</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-5 md:mt-6 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-white/85 leading-relaxed px-2 sm:px-0"
        >
          Preencha o formulário e receba uma cotação personalizada. Transporte seguro com a excelência Gabardo.
        </motion.p>


        {/* Contact Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex items-center justify-center gap-3"
        >
          <motion.a
            href="tel:+555133733000"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-gabardo-light-blue backdrop-blur-sm text-white p-4 transition-all duration-300 rounded-full"
            aria-label="Ligar para Gabardo"
          >
            <Phone className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="mailto:comercial@transgabardo.com.br"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-gabardo-light-blue backdrop-blur-sm text-white p-4 transition-all duration-300 rounded-full"
            aria-label="Enviar e-mail para Gabardo"
          >
            <Mail className="w-6 h-6" />
          </motion.a>

          <motion.a
            href="https://maps.app.goo.gl/XUcq2YCMRnNZcwrz5"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-gabardo-light-blue backdrop-blur-sm text-white p-4 transition-all duration-300 rounded-full"
            aria-label="Ver localização Gabardo no mapa"
          >
            <MapPin className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-3"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 font-medium">Preencha o formulário</span>
          <motion.svg
            className="w-6 h-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
