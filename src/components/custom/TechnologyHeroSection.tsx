
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const TechnologyHeroSection = () => {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/gabardo-hero-04.JPG" // Using a generic hero image for now
          alt="Tecnologia e Inovação na Gabardo"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6 md:p-8 lg:p-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-semibold tracking-widest text-blue-300 uppercase"
          >
            Inovação que Move
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight tracking-tight mt-4"
          >
            Tecnologia e Inovação
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl font-light leading-relaxed max-w-3xl"
          >
            Na Gabardo, a tecnologia é o motor que impulsiona a eficiência, a transparência e a segurança em cada etapa da jornada logística.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default TechnologyHeroSection;
