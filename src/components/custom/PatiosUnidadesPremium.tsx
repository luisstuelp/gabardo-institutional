'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Gauge } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';
import InfrastructureSVGBackground from './InfrastructureSVGBackground';

const regioes = [
  {
    regiao: 'Sul',
    destaque: 'Hub Exportador',
    unidades: '4 unidades',
    capacidade: '2.060 veículos',
    imagem: '/images/gabardo-truck-fleet.JPG',
    cidades: ['Porto Alegre', 'Chuí', 'Curitiba', 'Palhoça'],
    recursos: ['Pátios portuários', 'Conexão LATAM', 'Operação 24/7']
  },
  {
    regiao: 'Sudeste',
    destaque: 'Proximidade Montadoras',
    unidades: '7 unidades',
    capacidade: '2.780 veículos',
    imagem: '/images/Oficina.JPG',
    cidades: ['São Paulo', 'Piracicaba', 'São Bernardo', 'Iracemápolis', 'Duque de Caxias', 'Porto Real', 'Cariacica'],
    recursos: ['Alto volume PDI', 'Boxes climatizados', 'Oficinas próprias']
  },
  {
    regiao: 'Centro-Oeste',
    destaque: 'Conexão Nacional',
    unidades: '1 unidade',
    capacidade: '420 veículos',
    imagem: '/images/Box.JPG',
    cidades: ['Anápolis'],
    recursos: ['Hub logístico', 'Distribuição nacional', 'Centro-Oeste']
  },
  {
    regiao: 'Nordeste',
    destaque: 'Expansão Estratégica',
    unidades: '3 unidades',
    capacidade: '580 veículos',
    imagem: '/images/Escritorio.JPG',
    cidades: ['Eusébio', 'Suape', 'Camaçari'],
    recursos: ['Cobertura Nordeste', 'Acesso portuário', 'Polo industrial']
  }
];

export default function PatiosUnidadesPremium() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 sm:py-28">
      {/* Animated Wave Transition from Previous Section */}
      <div className="absolute left-0 top-0 h-32 w-full">
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
            d="M0,50 Q200,80 400,50 T800,50 Q1000,20 1200,50 L1200,0 L0,0 Z"
            fill="url(#gradientWaveTop)"
            opacity="0.12"
            animate={{ 
              d: [
                "M0,50 Q200,80 400,50 T800,50 Q1000,20 1200,50 L1200,0 L0,0 Z",
                "M0,50 Q200,20 400,50 T800,50 Q1000,80 1200,50 L1200,0 L0,0 Z",
                "M0,50 Q200,80 400,50 T800,50 Q1000,20 1200,50 L1200,0 L0,0 Z"
              ]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradientWaveTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38B6FF" />
              <stop offset="50%" stopColor="#132D51" />
              <stop offset="100%" stopColor="#38B6FF" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* SVG Background - Distributed Across Page */}
      <InfrastructureSVGBackground />

      {/* Bottom Wave Transition */}
      <div className="absolute left-0 bottom-0 h-32 w-full">
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
            d="M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z"
            fill="url(#gradientWaveBottom)"
            opacity="0.1"
            animate={{ 
              d: [
                "M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z",
                "M0,70 Q300,100 600,70 T1200,70 L1200,120 L0,120 Z",
                "M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z"
              ]
            }}
            transition={{ 
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="gradientWaveBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="50%" stopColor="#38B6FF" />
              <stop offset="100%" stopColor="#132D51" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden" style={{ display: 'none' }}>
        {/* Top Left - Thin Curved Lines */}
        <motion.svg
          className="absolute left-0 top-10 h-full w-1/2"
          viewBox="0 0 400 800"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M0,100 Q100,150 200,100 T400,100" stroke="currentColor" strokeWidth="1" fill="none" className="text-gabardo-blue/20" />
          <path d="M0,200 Q120,260 240,200 T480,200" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gabardo-blue/15" />
          <path d="M0,300 Q80,340 160,300 T320,300" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-gabardo-blue/25" />
        </motion.svg>

        {/* Top Right - Flowing Thin Lines */}
        <motion.svg
          className="absolute right-0 top-20 h-96 w-96"
          viewBox="0 0 400 400"
          animate={{ 
            rotate: [0, 360],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ 
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-gabardo-light-blue/20" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gabardo-light-blue/25" />
          <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-gabardo-light-blue/15" />
        </motion.svg>

        {/* Middle Left - Vertical Wavy Lines */}
        <motion.svg
          className="absolute left-10 top-1/4 h-3/4 w-32"
          viewBox="0 0 100 600"
          animate={{ 
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M20,0 Q30,150 20,300 T20,600" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-gabardo-blue/20" />
          <path d="M50,0 Q60,180 50,360 T50,600" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-gabardo-blue/15" />
          <path d="M80,0 Q70,120 80,240 T80,600" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-gabardo-blue/25" />
        </motion.svg>

        {/* Middle Center - Thin Organic Lines */}
        <motion.svg
          className="absolute left-1/2 top-1/3 -translate-x-1/2 h-64 w-64"
          viewBox="0 0 200 200"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M100,20 Q150,60 130,100 T100,180" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gabardo-light-blue/20" />
          <path d="M50,50 Q90,80 70,120 T50,170" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-gabardo-light-blue/25" />
          <path d="M130,40 Q170,90 150,130 T130,190" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-gabardo-light-blue/15" />
        </motion.svg>

        {/* Right Side - Horizontal Flowing Lines */}
        <motion.svg
          className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/3"
          viewBox="0 0 300 800"
          animate={{ 
            x: [0, -15, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M300,100 Q200,120 100,100 T-100,100" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gabardo-light-blue/20" />
          <path d="M300,250 Q220,280 140,250 T-80,250" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-gabardo-light-blue/15" />
          <path d="M300,400 Q180,430 60,400 T-140,400" stroke="currentColor" strokeWidth="1" fill="none" className="text-gabardo-light-blue/25" />
          <path d="M300,550 Q210,570 120,550 T-60,550" stroke="currentColor" strokeWidth="0.7" fill="none" className="text-gabardo-light-blue/18" />
        </motion.svg>

        {/* Bottom Left - Diagonal Thin Lines */}
        <motion.svg
          className="absolute left-0 bottom-20 h-96 w-96"
          viewBox="0 0 400 400"
          animate={{ 
            rotate: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="0.5" className="text-gabardo-blue/15" />
          <line x1="50" y1="0" x2="450" y2="400" stroke="currentColor" strokeWidth="0.7" className="text-gabardo-blue/20" />
          <line x1="-50" y1="0" x2="350" y2="400" stroke="currentColor" strokeWidth="0.6" className="text-gabardo-blue/18" />
        </motion.svg>

        {/* Bottom Right - Curved Thin Arcs */}
        <motion.svg
          className="absolute right-10 bottom-10 h-80 w-80"
          viewBox="0 0 300 300"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M0,150 Q75,100 150,150 T300,150" stroke="currentColor" strokeWidth="0.8" fill="none" className="text-gabardo-light-blue/25" />
          <path d="M0,180 Q90,130 180,180 T360,180" stroke="currentColor" strokeWidth="0.6" fill="none" className="text-gabardo-light-blue/18" />
          <path d="M0,210 Q60,170 120,210 T240,210" stroke="currentColor" strokeWidth="0.9" fill="none" className="text-gabardo-light-blue/20" />
        </motion.svg>

        {/* Subtle Gradient Overlays */}
        <motion.div 
          className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-gabardo-blue/3 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute right-0 bottom-0 h-full w-1/4 bg-gradient-to-l from-gabardo-light-blue/3 to-transparent"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div style={{ opacity }} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-gabardo-blue/20 bg-gradient-to-r from-gabardo-blue/10 to-gabardo-light-blue/10 px-6 py-3 shadow-lg"
          >
            <MapPin className="h-5 w-5 text-gabardo-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-gabardo-blue">
              Presença Nacional
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-3xl font-bold leading-tight text-gabardo-blue sm:text-4xl lg:text-5xl"
          >
            <span className="text-gabardo-light-blue">15 Unidades</span> em 4 Regiões
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg"
          >
            Rede estratégica cobrindo Sul, Sudeste, Centro-Oeste e Nordeste com infraestrutura moderna e capacidade otimizada
          </motion.p>
        </motion.div>

        {/* Regiões Grid - Interactive Cards */}
        <div className="mx-auto mb-16 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {regioes.map((regiao, index) => (
              <motion.article
                key={regiao.regiao}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-gabardo-light-blue/30"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={regiao.imagem}
                    alt={`Região ${regiao.regiao}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
                  
                  {/* Region Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white px-5 py-2.5 shadow-lg">
                    <span className="text-sm font-bold uppercase tracking-wider text-gabardo-blue">
                      {regiao.regiao}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Title & Stats Row */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gabardo-blue leading-tight">
                      {regiao.destaque}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{regiao.unidades}</p>
                      <div className="flex items-center gap-1.5 rounded-lg bg-gabardo-blue/10 px-2.5 py-1">
                        <Gauge className="h-3.5 w-3.5 text-gabardo-blue" />
                        <span className="text-xs font-bold text-gabardo-blue">{regiao.capacidade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gabardo-blue/20 to-transparent" />

                  {/* Cidades */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gabardo-blue/60">Cidades</span>
                    <div className="flex flex-wrap gap-1.5">
                      {regiao.cidades.map((cidade) => (
                        <span
                          key={cidade}
                          className="inline-flex items-center rounded-md bg-gradient-to-r from-gabardo-blue/5 to-gabardo-light-blue/5 px-2 py-0.5 text-[10px] font-medium text-gray-600 border border-gabardo-blue/10"
                        >
                          {cidade}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recursos */}
                  <div className="space-y-1.5">
                    {regiao.recursos.map((recurso) => (
                      <div
                        key={recurso}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <div className="h-1 w-1 rounded-full bg-gabardo-light-blue" />
                        <span>{recurso}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Total Capacity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-3xl border-2 border-gabardo-blue/20 bg-gradient-to-r from-gabardo-blue/5 via-white to-gabardo-light-blue/5 px-8 sm:px-12 py-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gabardo-blue">
                <Gauge className="h-7 w-7 text-white" />
              </div>
              <span className="text-sm sm:text-base font-bold text-gray-700 uppercase tracking-wide">
                Capacidade total de veículos
              </span>
            </div>
            <div className="h-12 w-px bg-gabardo-blue/20 hidden sm:block" />
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue bg-clip-text text-transparent">
              6,000+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
