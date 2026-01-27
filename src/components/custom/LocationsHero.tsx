'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';
import Image from 'next/image';

// Background images for Locations section
const backgroundImages = [
  '/images/co-01.jpg',
  '/images/co-03.jpg', 
  '/images/co-5.jpg'
];

const ScrollDownIcon = () => (
  <div className="flex flex-col items-center space-y-2">
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Role para baixo
    </span>
  </div>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" />
  </svg>
);

const LocationsHero: React.FC = () => {
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
    <div className="relative w-full h-screen text-white overflow-hidden">
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
              alt="Transportes Gabardo Localizações"
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              quality={isMobile ? 85 : 95}
            />
          </motion.div>
        ))}
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75 md:from-black/65 md:via-black/45 md:to-black/65" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        <div></div>

        {/* Left Scroll Indicator */}
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Text & Bottom Arrow Container */}
        <div className="flex flex-col justify-end h-full">
          <div className="flex items-end w-full">
            <div className="flex-shrink-0 w-24 md:w-32"></div>

            {/* Text Content Block */}
            <div className="flex-grow max-w-4xl xl:max-w-5xl">

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
              >
                estamos crescendo mais longe,
                <br />
                mas cada vez mais 
                <span className="text-amber-400"> perto de você</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-lg lg:text-xl font-light leading-relaxed mb-8"
              >
                Encontre a unidade mais próxima e descubra nossos espaços de trabalho inspiradores.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-yellow-400/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M9 9h6v6H9z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">8 Cidades</span>
                </div>
                
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12h18M12 3v18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M8 8l8 8M8 16l8-8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Crescimento Contínuo</span>
                </div>
              </motion.div>
            </div>

            {/* Arrow Icon */}
            <div className="hidden md:block md:ml-auto pl-4 md:pl-8">
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsHero; 