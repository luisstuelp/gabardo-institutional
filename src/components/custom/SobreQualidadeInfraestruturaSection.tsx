'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const SobreQualidadeInfraestruturaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-24">
      {/* Connecting Wave from Previous Section */}
      <div className="absolute left-0 top-0 h-32 w-full">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,120 C300,20 600,20 900,120 L900,0 L0,0 Z"
            fill="white"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-gabardo-blue/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-gabardo-light-blue/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-5 sm:space-y-6 md:space-y-8"
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
                <p className="text-sm sm:text-base md:text-lg text-neutral-600">
                  Nossas unidades seguem um padrão de infraestrutura que inclui pátios dimensionados para alto giro de veículos, boxes de manutenção, áreas de PDI e inspeção eletrônica. A <span className="font-bold text-gabardo-blue">conectividade</span> é garantida por SD-WAN e links redundantes, com monitoramento de rede e rotinas de backup noturno para os sistemas corporativos.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600">
                  A <span className="font-bold text-gabardo-blue">segurança</span> é um pilar fundamental, com CFTV 24/7, controle de acesso, portaria dedicada e iluminação perimetral em todas as nossas instalações. A <span className="font-bold text-gabardo-blue">operação</span> é otimizada com PDI digital, parqueamento, armazenagem e distribuição. Nossas <span className="font-bold text-gabardo-blue">oficinas próprias</span> com boxes cobertos e checklists eletrônicos garantem a manutenção de nossa frota. Em nosso compromisso com a <span className="font-bold text-gabardo-blue">sustentabilidade</span>, estamos expandindo o uso de energia solar, fazemos a gestão de resíduos e estamos nos preparando para a era dos veículos elétricos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connecting Wave to Next Section */}
      <div className="absolute bottom-0 left-0 h-32 w-full">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,0 C300,100 600,100 900,0 L900,120 L0,120 Z"
            fill="url(#gradient3)"
            opacity="0.08"
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="100%" stopColor="#38B6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SobreQualidadeInfraestruturaSection;
