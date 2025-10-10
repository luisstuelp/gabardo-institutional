'use client';
import { motion } from 'framer-motion';
import { Dot, Mouse } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Background images for Services section
const backgroundImages = [
  '/images/gabardo-hero-01.JPG', 
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/Trans Gabardo - Framers produtora -5476.JPG'
];

const ScrollDownIcon = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="hidden md:flex flex-col items-center space-y-2"
  >
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Nossos Serviços
    </span>
  </motion.div>
);

export default function ServicesHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, isMobile ? 8000 : 6000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0
            }}
            transition={{ duration: isMobile ? 2.5 : 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={img}
              alt="Transportes Gabardo - Serviços"
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              quality={isMobile ? 85 : 95}
            />
          </motion.div>
        ))}
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75 md:from-black/65 md:via-black/45 md:to-black/65" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen p-4 sm:p-6 md:p-8 lg:p-16">
        {/* Top spacer for header */}
        <div className="h-16 md:h-20"></div>

        {/* Left Scroll Indicator - Hidden on mobile */}
        <div className="absolute top-1/2 left-6 md:left-8 lg:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-end flex-grow pb-8 md:pb-12 lg:pb-16">
          <div className="flex items-end w-full">
            {/* Spacer for scroll indicator */}
            <div className="flex-shrink-0 w-0 md:w-24 lg:w-32"></div>

            {/* Text Content */}
            <div className="flex-grow max-w-full md:max-w-4xl xl:max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[0.65rem] sm:text-xs md:text-sm font-light tracking-[0.18em] sm:tracking-[0.2em] text-gabardo-light-blue mb-3 sm:mb-4 md:mb-6 uppercase font-secondary"
              >
                Serviços Gabardo
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 sm:mb-5 md:mb-6 font-primary"
              >
                Soluções Completas,
                <br />
                <span className="text-gabardo-light-blue">Resultados Garantidos</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-5 sm:mb-6 md:mb-8 font-secondary"
              >
                Operações dedicadas, equipe especializada e preços competitivos. 
                Atendemos montadoras e empresas com a excelência que seu negócio merece.
              </motion.p>

              {/* Services stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              >
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">Operações Exclusivas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">Frotas Especializadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">Preços Competitivos</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Mobile scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ height: [0, 16, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-gabardo-light-blue rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
