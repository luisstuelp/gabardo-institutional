'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const backgroundImage = '/images/gabardo-hero-04.JPG';

const highlights = [
  { value: 'ISO 9001', label: 'Gestão da Qualidade' },
  { value: 'ISO 14001', label: 'Gestão Ambiental' },
  { value: 'ISO 39001', label: 'Segurança Viária' },
  { value: 'Carbono Neutro', label: 'Neutralização total das emissões' },
];

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
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 sm:px-10 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs sm:text-sm font-medium tracking-[0.35em] uppercase"
        >
          Qualidade & Certificações
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight max-w-4xl"
        >
          <span className="text-gabardo-light-blue">Excelência</span> auditada que garante <span className="text-gabardo-light-blue">confiança</span> em cada operação da <span className="text-gabardo-light-blue">Gabardo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
        >
          Somos pioneiros em gestão integrada com tripla certificação ISO e programas reconhecidos globalmente. Nossa equipe mantém processos auditados, segurança viária exemplar e responsabilidade ambiental constante.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
        >
          {highlights.map((item) => (
            <div
              key={item.value}
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-6 text-left backdrop-blur-sm"
            >
              <div className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gabardo-light-blue">
                {item.value}
              </div>
              <div className="mt-3 text-sm sm:text-base font-medium text-white leading-snug">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SobreQualidadeHeroSection;
