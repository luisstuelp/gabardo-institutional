'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const SobreQualidadeInfraestruturaSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-24">
      {/* Animated Decorative SVG Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Circle Top Left */}
        <motion.svg
          className="absolute left-10 top-20 h-72 w-72 text-gabardo-blue/5"
          viewBox="0 0 200 200"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="100" cy="100" r="90" fill="currentColor" />
        </motion.svg>

        {/* Organic Shape Bottom Right */}
        <motion.svg
          className="absolute right-10 bottom-20 h-96 w-96 text-gabardo-light-blue/8"
          viewBox="0 0 200 200"
          animate={{ 
            rotate: [0, 180, 360],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path fill="currentColor" d="M41.5,-72.3C54.4,-65.7,65.8,-56.2,73.4,-44.2C81,-32.2,84.8,-17.7,85.3,-3C85.8,11.7,83,26.6,75.9,39.2C68.8,51.8,57.4,62.1,44.3,68.7C31.2,75.3,16.6,78.2,1.8,75.2C-13,72.2,-28.1,63.3,-41.5,53.1C-54.9,42.9,-66.6,31.4,-73.8,17.3C-81,-3.2,-83.7,-26.3,-77.4,-45.8C-71.1,-65.3,-55.8,-81.2,-38.6,-85.8C-21.4,-90.4,-2.3,-83.7,13.8,-78.9C29.9,-74.1,28.6,-78.9,41.5,-72.3Z" transform="translate(100 100)" />
        </motion.svg>

        {/* Wave on Right */}
        <motion.svg
          className="absolute right-0 top-1/3 h-full w-1/4 text-gabardo-light-blue/4"
          preserveAspectRatio="none"
          viewBox="0 0 100 800"
          animate={{ 
            x: [0, -15, 0]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M100,0 Q75,200 100,400 T100,800 L100,0 Z" fill="currentColor" />
        </motion.svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
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

      {/* Smooth Animated Bottom Wave */}
      <div className="absolute bottom-0 left-0 h-40 w-full">
        <motion.svg 
          className="h-full w-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.path
            d="M0,40 Q200,80 400,40 T800,40 Q1000,10 1200,40 L1200,120 L0,120 Z"
            fill="url(#gradient3)"
            opacity="0.1"
            animate={{ 
              d: [
                "M0,40 Q200,80 400,40 T800,40 Q1000,10 1200,40 L1200,120 L0,120 Z",
                "M0,40 Q200,10 400,40 T800,40 Q1000,80 1200,40 L1200,120 L0,120 Z",
                "M0,40 Q200,80 400,40 T800,40 Q1000,10 1200,40 L1200,120 L0,120 Z"
              ]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="50%" stopColor="#38B6FF" />
              <stop offset="100%" stopColor="#132D51" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
};

export default SobreQualidadeInfraestruturaSection;
