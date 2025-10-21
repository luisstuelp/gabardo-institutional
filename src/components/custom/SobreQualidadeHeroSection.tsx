'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const backgroundImage = '/images/gabardo-hero-04.JPG';

const highlights = [
  {
    value: 'ISO 9001',
    label: 'Gestão da Qualidade',
    logo: '/images/certifications/iso-9001-qualidade.png',
  },
  {
    value: 'ISO 14001',
    label: 'Gestão Ambiental',
    logo: '/images/certifications/iso-14001-meio-ambiente.png',
  },
  {
    value: 'ISO 39001',
    label: 'Segurança Viária',
    logo: '/images/certifications/iso-39001-seguranca-viaria.png',
  },
  {
    value: 'OEA',
    label: 'Operador Econômico Autorizado',
    logo: '/images/certifications/Design sem nome (59).png',
  },
  {
    value: 'CO₂ Negativo',
    label: 'Certificação Carbono Negativo',
    logo: '/images/certifications/carbon-negative-certified.png',
  },
];

const SobreQualidadeHeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden py-20 sm:py-24">
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

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 text-center py-24 sm:py-20">
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 sm:mt-10 md:mt-12 grid w-full max-w-[82rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {highlights.map((item, index) => {
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative flex h-[280px] flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white/8 p-6 text-left backdrop-blur-lg shadow-[0_18px_40px_-18px_RGBA(8,22,42,0.55)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gabardo-light-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -top-16 right-0 h-28 w-28 rounded-full bg-gabardo-light-blue/10 blur-3xl" aria-hidden />
                <div className="absolute -bottom-20 left-2 h-24 w-24 rounded-full bg-white/10 blur-2xl" aria-hidden />

                <div className="relative flex flex-col h-full">
                  {/* Header com selo e título */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative flex flex-shrink-0 items-center justify-center h-16 w-16">
                      <Image
                        src={item.logo}
                        alt={`Selo ${item.value}`}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gabardo-light-blue leading-none">
                        {item.value}
                      </div>
                      <p className="text-base font-semibold text-white leading-tight mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  {/* Linha decorativa e descrição */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <div className="relative h-[2.5px] w-16 overflow-hidden rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue">
                      {prefersReducedMotion ? (
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80" />
                      ) : (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/85 to-transparent"
                          initial={{ x: '-160%' }}
                          animate={{ x: '160%' }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                        />
                      )}
                    </div>

                    <p className="text-xs text-white/75 leading-relaxed">
                      Auditorias recorrentes, relatórios de conformidade e cultura ESG ativa consolidam nossa governança.
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SobreQualidadeHeroSection;
