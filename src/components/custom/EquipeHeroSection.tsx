'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EquipeHeroSection() {
  return (
    <div className="relative w-full h-[60vh] text-white overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 md:mb-6"
        >
          Nossa Equipe
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl"
        >
          O sucesso da Gabardo é construído por pessoas talentosas e parceiros de confiança.
        </motion.p>
      </div>
    </div>
  );
}
