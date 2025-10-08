'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const backgroundImages = [
  '/images/gabardo-hero-01.JPG',
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/gabardo-hero-04.JPG'
];

export default function SustainabilityHeroSection() {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImages[0]} // Using the first image for a static background
          alt="Sustentabilidade na Gabardo"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center p-4 sm:p-6 md:p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs sm:text-sm font-light tracking-[0.2em] text-gabardo-light-blue mb-4 md:mb-6 uppercase"
        >
          Nosso Compromisso com o Futuro
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 md:mb-6"
        >
          Sustentabilidade em Ação
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-6 md:mb-8"
        >
          Na Gabardo, a sustentabilidade é um pilar estratégico, integrando crescimento econômico com responsabilidade ambiental e social.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
