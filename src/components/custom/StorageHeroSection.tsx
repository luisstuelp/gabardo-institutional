'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Warehouse, Shield, Clock } from 'lucide-react';

const StorageHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5475.JPG"
          alt="Gabardo Storage Facilities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center space-x-2 mb-8"
            style={{backgroundColor: 'rgba(56, 182, 255, 0.1)', backdropFilter: 'blur(10px)'}}
          >
            <div className="px-6 py-3 rounded-full border border-white/20">
              <span className="text-sm font-medium text-white uppercase tracking-wider">
                Pátios Seguros • Localização Estratégica
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8"
          >
            <span className="block">ARMAZENAGEM</span>
            <span className="block">SEGURA</span>
            <span className="block" style={{color: '#38B6FF'}}>E ESTRATÉGICA</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-4xl"
          >
            Pátios certificados e estrategicamente localizados para armazenamento de veículos 
            com segurança 24h, gestão de estoque e localização otimizada para redução de custos.
          </motion.p>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Warehouse className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-white/80">Veículos Capacidade</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-white/80">Segurança Ativa</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#38B6FF'}}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/80">Controle de Estoque</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              className="px-12 py-5 text-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{backgroundColor: '#38B6FF'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2da5ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38B6FF'}
            >
              Solicitar Espaço
            </button>
            <button 
              className="px-12 py-5 border-3 border-white text-white font-bold text-lg uppercase tracking-wide transition-all duration-300"
              style={{borderWidth: '3px'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#132D51';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Conhecer Pátios
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorageHeroSection;
