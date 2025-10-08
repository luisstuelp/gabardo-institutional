'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const TeamHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/GabardoEquipe.JPG"
          alt="Equipe Gabardo"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 sm:px-10 md:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight max-w-4xl"
        >
          Nossa Gente, Nossa Força
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
        >
          Conheça as pessoas que movem a Transportes Gabardo. Uma equipe de especialistas apaixonados por logística e comprometidos com a excelência.
        </motion.p>
      </div>
    </section>
  );
};

export default TeamHeroSection;
