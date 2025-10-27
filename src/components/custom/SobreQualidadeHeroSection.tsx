'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const backgroundImage = '/images/universal_upscale_0_a1fa18a5-024d-4d77-8268-43c1efc1583e_0.jpg';

const SobreQualidadeHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Gabardo – equipe de qualidade"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={78}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-[0.28em] sm:tracking-[0.35em] uppercase"
        >
          Qualidade & Certificações
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight max-w-4xl px-2 sm:px-0"
        >
          <span className="text-gabardo-light-blue">Excelência</span> auditada que
          <span className="block">garante <span className="text-gabardo-light-blue">confiança</span> em <span style={{ whiteSpace: 'nowrap' }}>cada operação da <span className="text-gabardo-light-blue">Gabardo</span></span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 sm:mt-5 md:mt-6 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-2 sm:px-0"
        >
          Somos pioneiros em gestão integrada com tripla certificação ISO e primeira transportadora no mundo com certificação Carbono Negativo. Nossa equipe mantém processos auditados, segurança viária exemplar e responsabilidade ambiental constante.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 font-medium">Role para baixo</span>
          <motion.svg
            className="w-6 h-6 text-white/70"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </motion.div>

      </div>
    </section>
  );
};

export default SobreQualidadeHeroSection;
