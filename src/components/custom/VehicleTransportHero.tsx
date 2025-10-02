'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VehicleTransportHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5818.JPG"
          alt="Gabardo Vehicle Transport"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          
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
                Especialistas em Transporte de Veículos
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
            <span className="block">TRANSPORTE</span>
            <span className="block">DE VEÍCULOS</span>
            <span className="block" style={{color: '#38B6FF'}}>COM EXCELÊNCIA</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10 max-w-3xl"
          >
            Com frota própria especializada e soluções personalizadas para grandes montadoras. 
            Mais de 36 anos garantindo segurança, eficiência e sustentabilidade no transporte automotivo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              className="px-12 py-5 text-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{backgroundColor: '#38B6FF'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2da5ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38B6FF'}
            >
              Solicitar Cotação
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
              Falar com Comercial
            </button>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">35+</div>
              <div className="text-sm text-white/80 uppercase tracking-wide">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500K+</div>
              <div className="text-sm text-white/80 uppercase tracking-wide">Veículos/Ano</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
              <div className="text-sm text-white/80 uppercase tracking-wide">Grandes Clientes</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-wider mb-2">Role para baixo</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VehicleTransportHero;
