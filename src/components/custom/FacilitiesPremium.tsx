'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Zap, Users, Building, Truck, HeartPulse, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const facilities = [
  {
    name: 'Oficina',
    description: 'Manutenção completa para nossa frota com equipamentos de ponta.',
    icon: Wrench,
    image: '/images/Oficina.JPG',
    features: ['Boxes climatizados', 'Ferramentas especializadas', 'Equipe técnica certificada']
  },
  { 
    name: 'TI', 
    description: 'Infraestrutura de tecnologia e sistemas integrados.',
    icon: Zap,
    image: '/images/Eletrica.JPG',
    features: ['Servidores dedicados', 'Rede SD-WAN', 'Backup em nuvem']
  },
  { 
    name: 'Refeitório', 
    description: 'Espaço moderno para refeições dos colaboradores.',
    icon: Users,
    image: '/images/Refeitorio.JPG',
    features: ['Cozinha industrial', 'Ambiente climatizado', 'Cardápio balanceado']
  },
  { 
    name: 'Escritório', 
    description: 'Amplo espaço administrativo e operacional.',
    icon: Building,
    image: '/images/Escritorio.JPG',
    features: ['Salas de reunião', 'Workstations', 'Áreas colaborativas']
  },
  { 
    name: 'Pilates', 
    description: 'Espaço dedicado à saúde e bem-estar dos colaboradores.',
    icon: HeartPulse,
    image: '/images/Trans Gabardo - Framers produtora -5724.JPG',
    features: ['Instrutor profissional', 'Equipamentos modernos', 'Aulas regulares']
  },
  { 
    name: 'Box de Manutenção', 
    description: 'Baias dedicadas para a manutenção dos caminhões.',
    icon: Truck,
    image: '/images/Box.JPG',
    features: ['77 boxes', 'Elevadores automotivos', 'Sistema de drenagem']
  },
];

export default function FacilitiesPremium() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const selected = facilities[selectedIndex];

  const handleMobileToggle = (index: number) => {
    setMobileOpenIndex(mobileOpenIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Floating Decorative SVG Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top Left Blob */}
        <motion.svg
          className="absolute -left-20 top-10 h-64 w-64 text-gabardo-blue/5"
          viewBox="0 0 200 200"
          animate={{ 
            y: [0, 30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path fill="currentColor" d="M43.3,-76.3C56.4,-69.7,67.6,-58.1,75.7,-44.3C83.8,-30.5,88.8,-14.5,89.2,1.8C89.6,18.1,85.4,34.7,76.9,48.1C68.4,61.5,55.6,71.7,41.3,78.3C27,84.9,11.2,87.9,-4.8,85.8C-20.8,83.7,-37,76.5,-50.9,66.9C-64.8,57.3,-76.4,45.3,-82.7,30.8C-89,16.3,-90,-0.7,-85.7,-16.3C-81.4,-31.9,-71.8,-46.1,-59.1,-53.3C-46.4,-60.5,-30.6,-60.7,-15.7,-64C-0.8,-67.3,13.2,-73.7,27.1,-76.3C41,-78.9,54.8,-77.7,43.3,-76.3Z" transform="translate(100 100)" />
        </motion.svg>

        {/* Top Right Circle */}
        <motion.svg
          className="absolute -right-32 top-40 h-96 w-96 text-gabardo-light-blue/5"
          viewBox="0 0 200 200"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </motion.svg>

        {/* Middle Left Wave */}
        <motion.svg
          className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1/3 text-gabardo-blue/3"
          preserveAspectRatio="none"
          viewBox="0 0 100 800"
          animate={{ 
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M0,0 Q25,200 0,400 T0,800 L0,800 L0,0 Z" fill="currentColor" />
        </motion.svg>

        {/* Bottom Right Organic Shape */}
        <motion.svg
          className="absolute -bottom-20 -right-20 h-80 w-80 text-gabardo-light-blue/5"
          viewBox="0 0 200 200"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path fill="currentColor" d="M47.1,-78.6C61.4,-71.2,73.3,-58.4,80.9,-43.2C88.5,-28,91.8,-10.4,89.7,6.4C87.6,23.2,80.1,39.2,69.8,52.5C59.5,65.8,46.4,76.4,31.5,81.7C16.6,87,-0.1,86.9,-16.5,82.4C-32.9,77.9,-49,68.9,-61.7,56.2C-74.4,43.5,-83.7,27.1,-86.8,9.5C-89.9,-8.1,-86.8,-26.9,-78.2,-42.5C-69.6,-58.1,-55.5,-70.5,-40,-77.5C-24.5,-84.5,-7.7,-86.1,7.5,-85.2C22.7,-84.3,32.8,-86,47.1,-78.6Z" transform="translate(100 100)" />
        </motion.svg>
      </div>

      {/* Animated Flow Line Behind Content */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-none hidden md:block"
        viewBox="0 0 1500 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="facilities-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.15" />
            <stop offset="28%" stopColor="#38B6FF" stopOpacity="0.65" />
            <stop offset="54%" stopColor="#7FD7FF" stopOpacity="0.85" />
            <stop offset="82%" stopColor="#38B6FF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="facilities-flow-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7FD7FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7FD7FF" stopOpacity="0.35" />
          </linearGradient>
          <filter id="facilities-flow-filter" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 1500 120 C 1320 110, 1210 160, 1070 190 S 840 240, 750 205 S 620 140, 520 210 S 410 360, 320 350 S 170 290, 40 360 L -80 420"
          fill="none"
          stroke="url(#facilities-flow-gradient)"
          strokeWidth={24}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#facilities-flow-filter)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        <motion.path
          d="M 1500 120 C 1320 110, 1210 160, 1070 190 S 840 240, 750 205 S 620 140, 520 210 S 410 360, 320 350 S 170 290, 40 360 L -80 420"
          fill="none"
          stroke="url(#facilities-flow-glow)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
        />
      </svg>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue"
          >
            <Building className="h-4 w-4" />
            Nossas Instalações
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-gabardo-blue sm:text-5xl"
          >
            Estrutura Completa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-gray-600"
          >
            Infraestrutura moderna para dar suporte às nossas operações e ao bem-estar dos colaboradores
          </motion.p>
        </div>

        {/* Dynamic Photo Layout */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-8">
            {/* Left: Facility Selector */}
            <div className="space-y-3">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;
                const isSelected = selectedIndex === index;
                
                const isMobileOpen = mobileOpenIndex === index;
                
                return (
                  <motion.button
                    key={facility.name}
                    onClick={() => {
                      setSelectedIndex(index);
                      handleMobileToggle(index);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 6 }}
                    className={`group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue shadow-2xl'
                        : 'bg-white border-2 border-gray-200 hover:border-gabardo-blue/50 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            isSelected
                              ? 'bg-white/20'
                              : 'bg-gabardo-blue/10 group-hover:bg-gabardo-blue/20'
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gabardo-blue'}`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {facility.name}
                          </h3>
                          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                            {facility.description.split('.')[0]}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 transition-all ${
                          isSelected
                            ? 'translate-x-0 text-white opacity-100'
                            : 'translate-x-2 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>

                    {/* Mobile: Show image and features inline */}
                    <AnimatePresence>
                      {isMobileOpen && (
                        <motion.div
                          className="mt-4 lg:hidden space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative h-48 w-full overflow-hidden rounded-xl">
                            <Image
                              src={facility.image}
                              alt={facility.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm text-white/90">{facility.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {facility.features.map((feature) => (
                                <span
                                  key={feature}
                                  className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: Dynamic Photo Display (Desktop Only) */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                  transition={{ duration: 0.5 }}
                  className="group relative h-full min-h-[600px] overflow-hidden rounded-3xl shadow-2xl"
                >
                  {/* Main Image */}
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={selectedIndex === 0}
                  />

                  <div className="absolute inset-0 rounded-3xl border border-white/10" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
