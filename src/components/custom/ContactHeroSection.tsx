'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Dot, Mouse } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Gabardo contact background images
const backgroundImages = [
  '/images/gabardo-hero-01.JPG',
  '/images/gabardo-hero-02.JPG',
  '/images/gabardo-hero-03.JPG',
  '/images/gabardo-hero-04.JPG'
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
      Fale Conosco
    </span>
  </motion.div>
);

export default function ContactHeroSection() {
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

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactAction = (action: string) => {
    if (action.startsWith('http')) {
      window.location.href = action;
    } else {
      window.open(action, '_blank');
    }
  };

  return (
    <div className="relative w-full min-h-[680px] md:min-h-screen text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: isMobile ? 2.5 : 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={img}
              alt="Transportes Gabardo - Contato"
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
      <div className="relative z-10 flex flex-col justify-between min-h-[680px] md:min-h-screen p-6 sm:p-8 md:p-10 lg:p-16">
        {/* Top spacer for header */}
        <div className="h-12 sm:h-16 md:h-20"></div>

        {/* Left Scroll Indicator - Hidden on mobile */}
        <div className="absolute top-1/2 left-6 md:left-8 lg:left-16 -translate-y-1/2">
          <ScrollDownIcon />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-end h-full pb-10 sm:pb-12 md:pb-0">
          <div className="flex flex-col md:flex-row md:items-end w-full gap-6">
            {/* Spacer for scroll indicator */}
            <div className="hidden md:block flex-shrink-0 md:w-24 lg:w-32"></div>

            {/* Text Content */}
            <div className="flex-grow max-w-full md:max-w-4xl xl:max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs sm:text-sm font-light tracking-[0.2em] text-gabardo-light-blue mb-4 md:mb-6 uppercase font-secondary"
              >
                Contato Gabardo
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 md:mb-6 font-primary"
              >
                Conecte-se Conosco,
                <br />
                <span className="text-gabardo-light-blue">Cresça Conosco</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-full md:max-w-3xl mb-6 md:mb-8 font-secondary"
              >
                Sua próxima solução em transporte de veículos está a uma conversa de distância. Fale com nossos especialistas e descubra como podemos potencializar seus resultados.
              </motion.p>

              {/* Contact stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:gap-6"
              >
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">14 Unidades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">Atendimento 24h/7d</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dot className="w-3 h-3 text-gabardo-light-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-light tracking-wide font-secondary">Suporte Nacional</span>
                </div>
              </motion.div>

              {/* CTA Button & Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToForm}
                  className="group bg-gabardo-light-blue text-white px-8 py-4 text-base font-medium uppercase tracking-wide hover:bg-white hover:text-gabardo-light-blue transition-all duration-300 flex items-center space-x-3 touch-manipulation font-primary rounded-full"
                >
                  <span>Fale Conosco</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Social Icons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactAction('tel:+551134567890')}
                    className="bg-white/20 hover:bg-gabardo-light-blue hover:text-white backdrop-blur-sm text-white p-3 transition-all duration-300 touch-manipulation group rounded-full"
                    aria-label="Ligar para Transportes Gabardo"
                  >
                    <Phone className="w-5 h-5 transition-colors duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactAction('mailto:contato@gabardotransportadora.com.br')}
                    className="bg-white/20 hover:bg-gabardo-light-blue hover:text-white backdrop-blur-sm text-white p-3 transition-all duration-300 touch-manipulation group rounded-full"
                    aria-label="Enviar e-mail para Transportes Gabardo"
                  >
                    <Mail className="w-5 h-5 transition-colors duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactAction('https://maps.google.com?q=São+Paulo+SP')}
                    className="bg-white/20 hover:bg-gabardo-light-blue hover:text-white backdrop-blur-sm text-white p-3 transition-all duration-300 touch-manipulation group rounded-full"
                    aria-label="Ver localizações Gabardo no mapa"
                  >
                    <MapPin className="w-5 h-5 transition-colors duration-300" />
                  </motion.button>
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
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ height: [0, 16, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-0.5 bg-gabardo-light-blue rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}