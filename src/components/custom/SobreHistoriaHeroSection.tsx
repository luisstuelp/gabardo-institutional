'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

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
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="section-eyebrow text-gabardo-light-blue uppercase"
        >
          Nossa História
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="section-heading mt-5 text-center text-white md:text-5xl lg:text-[56px]"
        >
          36 anos movendo o Brasil
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="section-subheading mt-6 max-w-3xl text-center text-white/75"
        >
          De um sonho familiar à referência nacional em transporte de veículos, nossa trajetória é guiada por inovação, confiança e parcerias duradouras.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden flex-col items-center gap-3 md:flex"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Role para percorrer a linha do tempo
          </span>
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default SobreHistoriaHeroSection;
