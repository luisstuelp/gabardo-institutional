'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import LightRays from './LightRays';

export default function EquipeHeroSection() {
  return (
    <div className="relative w-full h-[60vh] text-white overflow-hidden bg-black">
      <Image
        src="/images/NossaEquipe.JPG"
        alt="Equipe Gabardo"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
      />
      <LightRays />

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
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contato"
              className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-gabardo-blue/90"
            >
              Conectar com o time
              <span className="text-base">→</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#lideres-gabardo"
              className="inline-flex items-center gap-3 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              Conheça a liderança
              <span className="text-base">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
