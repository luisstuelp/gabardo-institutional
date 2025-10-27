'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const backgroundImage = '/images/Trans Gabardo - Framers produtora -5452 (1).JPG';

export default function InfraestruturaHeroSection() {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Gabardo – Infraestrutura"
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
          Infraestrutura & Operações
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight max-w-4xl px-2 sm:px-0"
        >
          <span className="text-gabardo-light-blue">Estrutura de Ponta</span> para
          <span className="block">garantir <span className="text-gabardo-light-blue">eficiência</span> e <span className="text-gabardo-light-blue">segurança</span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 sm:mt-5 md:mt-6 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-2 sm:px-0"
        >
          Instalações modernas, pátios estrategicamente localizados e tecnologia de ponta para garantir a excelência operacional no transporte de veículos por todo o Brasil.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-3"
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 font-medium">Conheça nossa estrutura</span>
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
