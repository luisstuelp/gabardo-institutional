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
    image: '/images/Escritorio.JPG',
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
  const selected = facilities[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Connecting Wave Transition from Previous Section */}
      <div className="absolute left-0 top-0 h-32 w-full">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,0 C300,100 600,100 900,0 L900,120 L0,120 Z"
            fill="url(#gradient1)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="100%" stopColor="#38B6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
                
                return (
                  <motion.button
                    key={facility.name}
                    onClick={() => setSelectedIndex(index)}
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

                    {/* Mobile: Show image inline */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="mt-4 lg:hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative h-48 w-full overflow-hidden rounded-xl">
                            <Image
                              src={selected.image}
                              alt={selected.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            {selected.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-white/90">
                                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
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

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gabardo-blue/20 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    {/* Icon Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg"
                    >
                      <SelectedIcon className="h-8 w-8 text-gabardo-blue" />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-3 text-4xl font-bold text-white"
                    >
                      {selected.name}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6 max-w-xl text-lg text-white/90"
                    >
                      {selected.description}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      {selected.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
                        >
                          <div className="h-2 w-2 rounded-full bg-gabardo-light-blue" />
                          <span className="text-sm font-medium text-white">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/10" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Connecting Wave Transition to Next Section */}
      <div className="absolute bottom-0 left-0 h-32 w-full">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,120 C300,20 600,20 900,120 L900,0 L0,0 Z"
            fill="url(#gradient2)"
            opacity="0.05"
          />
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#132D51" />
              <stop offset="100%" stopColor="#38B6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
