'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Background images for Services section
const backgroundImages = [
  '/images/gabardo-hero-01.JPG', 
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/Trans Gabardo - Framers produtora -5476.JPG'
];

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
              alt="Gabardo - Serviços"
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
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 text-center py-24">
        <div className="w-full max-w-4xl md:max-w-5xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg uppercase tracking-[0.26em] sm:tracking-[0.3em] font-semibold text-gabardo-light-blue"
          >
            Serviços Gabardo
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight font-primary"
          >
            Soluções Completas,
            <br />
            <span className="text-gabardo-light-blue">Resultados Garantidos</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed text-white/85 max-w-3xl mx-auto"
          >
            Operações dedicadas, equipe especializada e custo x benefício. Atendemos montadoras e empresas com a excelência que seu negócio merece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          >
            {[
              'Operações Exclusivas',
              'Frotas Especializadas',
              'Custo x Benefício',
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/35 bg-white/18 backdrop-blur-md text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.32em] font-semibold text-white/95"
              >
                {label}
              </span>
            ))}
          </motion.div>
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
