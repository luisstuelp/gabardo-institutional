'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const heroImage = '/images/gabardo-hero-02.JPG';

const SobreInstitucionalHeroSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundShift = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const foregroundShift = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      <motion.div className="absolute inset-0" style={{ y: backgroundShift }}>
        <Image
          src={heroImage}
          alt="Centro operacional da Transportes Gabardo"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"
          style={{ y: foregroundShift }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-gabardo-blue/30 blur-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8 lg:px-16 py-20 sm:py-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-[0.28em] sm:tracking-[0.32em] text-gabardo-light-blue uppercase mb-5 sm:mb-6"
        >
          Seção Institucional
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight tracking-tight mb-5 sm:mb-6"
        >
          Estrutura que sustenta a Transportes Gabardo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-8 sm:mb-10 px-2 sm:px-0"
        >
          Somos uma operação integrada com governança sólida, tecnologia aplicada e equipes multidisciplinares que garantem eficiência do planejamento ao pós-entrega.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/70">Role para conhecer nossa cultura</span>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default SobreInstitucionalHeroSection;
