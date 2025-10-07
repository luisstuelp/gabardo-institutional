'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mouse } from 'lucide-react';

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

interface LocationDetailHeroProps {
  location: {
    name: string;
    fullName?: string;
    tagline?: string;
    subtitle?: string;
    type: string;
    hero?: {
      description?: string;
    };
    contact: {
      phone: string;
      hours: string;
    };
  };
}

const LocationDetailHero: React.FC<LocationDetailHeroProps> = ({ location }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'matriz': return 'bg-red-500';
      case 'sede': return 'bg-yellow-500';
      case 'filial': return 'bg-yellow-600';
      default: return 'bg-neutral-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'matriz': return 'Matriz';
      case 'sede': return 'Sede';
      case 'filial': return 'Filial';
      default: return type;
    }
  };

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Vídeo_Coworking_Moderno_Gerado.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

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
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Link href="/" className="hover:text-white transition-colors">
                    Início
                  </Link>
                  <span>/</span>
                  <Link href="/localizacao" className="hover:text-white transition-colors">
                    Localizações
                  </Link>
                  <span>/</span>
                  <span className="text-white">{location.name}</span>
                </div>
              </motion.nav>

              {/* Type Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <span className={`inline-block px-4 py-2 ${getTypeColor(location.type)} text-white text-sm font-medium rounded-full uppercase tracking-wide`}>
                  {getTypeLabel(location.type)}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-6"
              >
                {location.fullName || location.name}
                <br />
                <span className="text-yellow-400">{location.tagline}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-3xl"
              >
                {location.subtitle || location.hero?.description}
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-yellow-400/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M9 9h6v6H9z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">{location.contact.phone}</span>
                </div>
                
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12h18M12 3v18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M8 8l8 8M8 16l8-8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">{location.contact.hours}</span>
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

export default LocationDetailHero; 