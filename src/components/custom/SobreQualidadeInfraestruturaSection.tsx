'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const SobreQualidadeInfraestruturaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-24">
      {/* Animated Flow Line Behind Content - Left to Right */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-none hidden md:block"
        viewBox="0 0 1500 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="quality-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.15" />
            <stop offset="28%" stopColor="#38B6FF" stopOpacity="0.65" />
            <stop offset="54%" stopColor="#7FD7FF" stopOpacity="0.85" />
            <stop offset="82%" stopColor="#38B6FF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="quality-flow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7FD7FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7FD7FF" stopOpacity="0.35" />
          </linearGradient>
          <filter id="quality-flow-filter" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M -80 120 C 100 110, 210 160, 350 190 S 580 240, 670 205 S 800 140, 900 210 S 1010 360, 1100 350 S 1250 290, 1380 360 L 1500 420"
          fill="none"
          stroke="url(#quality-flow-gradient)"
          strokeWidth={24}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#quality-flow-filter)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        <motion.path
          d="M -80 120 C 100 110, 210 160, 350 190 S 580 240, 670 205 S 800 140, 900 210 S 1010 360, 1100 350 S 1250 290, 1380 360 L 1500 420"
          fill="none"
          stroke="url(#quality-flow-glow)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-5 sm:space-y-6 md:space-y-8 text-center"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gabardo-blue/10 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-gabardo-blue">
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Infraestrutura</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-tight text-gabardo-blue">
                Estrutura que garante qualidade em cada etapa
              </h2>
              <div className="space-y-4 sm:space-y-5">
                <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-neutral-600">
                  Nossas unidades seguem um padrão de infraestrutura que inclui pátios dimensionados para alto giro de veículos, boxes de manutenção, áreas de PDI e inspeção eletrônica. A <span className="font-bold text-gabardo-blue">conectividade</span> é garantida por SD-WAN e links redundantes, com monitoramento de rede e rotinas de backup noturno para os sistemas corporativos.
                </p>
                <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-neutral-600">
                  A <span className="font-bold text-gabardo-blue">segurança</span> é um pilar fundamental, com CFTV 24/7, controle de acesso, portaria dedicada e iluminação perimetral em todas as nossas instalações. A <span className="font-bold text-gabardo-blue">operação</span> é otimizada com PDI digital, parqueamento, armazenagem e distribuição. Nossas <span className="font-bold text-gabardo-blue">oficinas próprias</span> com boxes cobertos e checklists eletrônicos garantem a manutenção de nossa frota. Em nosso compromisso com a <span className="font-bold text-gabardo-blue">sustentabilidade</span>, estamos expandindo o uso de energia solar, fazemos a gestão de resíduos e estamos nos preparando para a era dos veículos elétricos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreQualidadeInfraestruturaSection;
