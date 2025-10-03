'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield } from 'lucide-react';

const heroImage = '/images/gabardo-hero-01.JPG';

const SobreConformidadeHeroSection = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Equipe de conformidade da Gabardo Transportadora"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-5 flex items-center gap-3 text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-gabardo-light-blue"
        >
          <Shield className="w-5 h-5" />
          Conformidade e LGPD
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
        >
          Protegemos dados, asseguramos confiança
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl"
        >
          A Gabardo mantém estruturas de compliance e privacidade que garantem ética nos negócios, segurança da informação e total aderência à legislação brasileira.
        </motion.p>
      </div>
    </section>
  );
};

export default SobreConformidadeHeroSection;
