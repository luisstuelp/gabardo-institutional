'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const heroImage = '/images/gabardo-hero-02.JPG';

const SobreInstitucionalHeroSection = () => {

  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Centro operacional Gabardo – estrutura institucional integrada"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 text-center py-24 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-[0.28em] sm:tracking-[0.35em] uppercase backdrop-blur-sm"
        >
          Seção Institucional
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight max-w-5xl px-2 sm:px-0"
        >
          Estrutura <span className="text-gabardo-light-blue">institucional</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 sm:mt-5 md:mt-6 max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-white/85 leading-relaxed px-2 sm:px-0"
        >
          Contamos com operações integradas, governança sólida, tecnologia aplicada e equipes multidisciplinares. Nossa estrutura garante eficiência em cada etapa da jornada logística.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-3"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white/70 font-medium">Role para conhecer nossa instituição</span>
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
};

export default SobreInstitucionalHeroSection;
