'use client';

import { motion } from 'framer-motion';
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
    value: 'CO₂ Negativo',
    label: 'Certificação Carbono Negativo',
    logo: '/images/certifications/carbon-negative-certified.png',
  },
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
          <span className="text-gabardo-light-blue">Excelência</span> auditada que garante <span className="text-gabardo-light-blue">confiança</span> em <span className="whitespace-nowrap">cada operação da <span className="text-gabardo-light-blue">Gabardo</span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
        >
          Somos pioneiros em gestão integrada com tripla certificação ISO e primeira transportadora no mundo com certificação Carbono Negativo. Nossa equipe mantém processos auditados, segurança viária exemplar e responsabilidade ambiental constante.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item, index) => {
            const isCarbonNegative = item.value === 'CO₂ Negativo';

            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 px-6 py-7 text-left backdrop-blur-lg shadow-[0_18px_40px_-18px_RGBA(8,22,42,0.55)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gabardo-light-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -top-16 right-0 h-28 w-28 rounded-full bg-gabardo-light-blue/10 blur-3xl" aria-hidden />
                <div className="absolute -bottom-20 left-2 h-24 w-24 rounded-full bg-white/10 blur-2xl" aria-hidden />

                <div className={`relative flex flex-col ${isCarbonNegative ? 'gap-3' : 'gap-4'}`}>
                  <div className={`flex items-center ${isCarbonNegative ? 'gap-3' : 'gap-4'}`}>
                    <div
                      className="relative h-20 w-20 flex-shrink-0"
                      style={isCarbonNegative ? { transform: 'translateY(-12px)' } : undefined}
                    >
                      <Image
                        src={item.logo}
                        alt={`Selo ${item.value}`}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-gabardo-light-blue leading-[1.15]">
                        {item.value}
                      </div>
                      <p className={`${isCarbonNegative ? 'mt-0.5' : 'mt-1.5'} text-sm sm:text-base font-medium text-white leading-snug`}>
                        {item.label}
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative mt-1 h-[3px] w-16 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue overflow-hidden"
                    style={isCarbonNegative ? { marginTop: '-10px' } : undefined}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  <p className="relative text-xs text-white/65 leading-relaxed">
                    Auditorias recorrentes, relatórios de conformidade e cultura ESG ativa consolidam nossa governança.
                  </p>
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
