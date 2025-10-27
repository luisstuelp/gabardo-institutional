'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const heroImage = '/images/gabardo-hero-03.JPG';

const SobreHistoriaHeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Linha do tempo da Gabardo"
          fill
          priority
          className="object-cover object-center brightness-[0.9]"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gabardo-blue/50 to-black/85 mix-blend-multiply" />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-gabardo-light-blue/20 blur-3xl"
              animate={{
                y: [0, -24, 0],
                opacity: [0.3, 0.55, 0.3]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute -right-24 bottom-16 h-[360px] w-[360px] rounded-full bg-gabardo-blue/25 blur-3xl"
              animate={{
                y: [0, 26, 0],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-wider uppercase"
        >
          Nossa História
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight max-w-4xl px-2 sm:px-0"
        >
          <span className="text-gabardo-light-blue">Três Décadas</span> de <span className="text-gabardo-light-blue">Excelência</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 sm:mt-5 md:mt-6 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-2 sm:px-0"
        >
          Referência nacional em transporte de veículos com inovação e confiança.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/75 font-medium">
            Role para baixo
          </span>
          <motion.svg
            className="w-6 h-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}

export default SobreHistoriaHeroSection;
