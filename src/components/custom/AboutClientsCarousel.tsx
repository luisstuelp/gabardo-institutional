'use client';

import Image from 'next/image';
import { motion, useAnimationFrame } from 'framer-motion';
import { useState, useRef } from 'react';

// Client logos data with back info - 21 logos
const clientLogos = [
  { id: 1, name: 'Volkswagen', since: 'Desde 1998', description: 'Parceria estratégica em logística automotiva' },
  { id: 2, name: 'Mercedes-Benz', since: 'Desde 2006', description: 'Transporte premium e logística especializada' },
  { id: 3, name: 'Ford', since: 'Desde 2011', description: 'Distribuição nacional de veículos' },
  { id: 4, name: 'Scania', since: 'Desde 2015', description: 'Logística de veículos pesados' },
  { id: 5, name: 'Localiza', since: 'Desde 2017', description: 'Gestão de frotas corporativas' },
  { id: 6, name: 'JSL', since: 'Desde 2019', description: 'Operações integradas de transporte' },
  { id: 7, name: 'Cliente 7', since: 'Parceiro Confiável', description: 'Soluções logísticas personalizadas' },
  { id: 8, name: 'Cliente 8', since: 'Parceiro Confiável', description: 'Excelência em transporte automotivo' },
  { id: 9, name: 'Cliente 9', since: 'Parceiro Confiável', description: 'Logística inteligente e eficiente' },
  { id: 10, name: 'Cliente 10', since: 'Parceiro Confiável', description: 'Transporte seguro e rastreado' },
  { id: 11, name: 'Cliente 11', since: 'Parceiro Confiável', description: 'Distribuição em todo Brasil' },
  { id: 12, name: 'Cliente 12', since: 'Parceiro Confiável', description: 'Parceria de longo prazo' },
  { id: 13, name: 'Cliente 13', since: 'Parceiro Confiável', description: 'Compromisso com qualidade' },
  { id: 14, name: 'Cliente 14', since: 'Parceiro Confiável', description: 'Soluções sob medida' },
  { id: 15, name: 'Cliente 15', since: 'Parceiro Confiável', description: 'Tecnologia e inovação' },
  { id: 16, name: 'Cliente 16', since: 'Parceiro Confiável', description: 'Operação nacional integrada' },
  { id: 17, name: 'Cliente 17', since: 'Parceiro Confiável', description: 'Frota moderna e rastreada' },
  { id: 18, name: 'Cliente 18', since: 'Parceiro Confiável', description: 'Logística sustentável' },
  { id: 19, name: 'Cliente 19', since: 'Parceiro Confiável', description: 'Entrega pontual garantida' },
  { id: 20, name: 'Cliente 20', since: 'Parceiro Confiável', description: 'Cobertura LATAM completa' },
  { id: 21, name: 'Cliente 21', since: 'Parceiro Confiável', description: 'Certificações ISO garantidas' },
];

// Duplicate logos for infinite loop
const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos];

interface LogoItemProps {
  logo: typeof clientLogos[0];
}

const LogoItem = ({ logo }: LogoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  const [isFlipped, setIsFlipped] = useState(false);

  useAnimationFrame(() => {
    if (!itemRef.current) return;

    const itemRect = itemRef.current.getBoundingClientRect();
    
    // Use viewport center as reference for full-width carousel
    const viewportCenterX = window.innerWidth / 2;
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const distanceFromCenter = Math.abs(viewportCenterX - itemCenterX);
    const maxDistance = window.innerWidth / 2;
    
    // Calculate scale: closer to center = LARGER (1.15x), farther = SMALLER (0.85x)
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    const newScale = 1.15 - (normalizedDistance * 0.3); // Range: 1.15 (center) -> 0.85 (edges)
    
    setScale(newScale);
  });

  return (
    <div
      ref={itemRef}
      className="flex-shrink-0 transition-all duration-200 ease-out [perspective:1000px]"
      style={{
        width: '240px',
        transform: `scale(${scale})`,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-40 w-full cursor-pointer"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Logo */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white rounded-3xl border border-gabardo-blue/10 p-8 shadow-sm hover:shadow-lg hover:border-gabardo-light-blue/30 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={`/NewLogos/Nlogo (${logo.id}).png`}
            alt={logo.name}
            width={220}
            height={140}
            className="w-full h-full object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
          />
        </div>

        {/* Back - Info */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-6 shadow-lg text-white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            backgroundColor: '#132d51',
          }}
        >
          <h3 className="text-lg font-bold text-center mb-2">{logo.name}</h3>
          <p className="text-xs text-center text-white/80 mb-3">{logo.since}</p>
          <p className="text-sm text-center leading-snug">{logo.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const AboutClientsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const xTranslation = useRef(0);
  const LOGO_WIDTH = 240; // Width of each logo item
  const GAP = 48; // Gap between logos (gap-12 = 3rem = 48px)
  const ITEM_SIZE = LOGO_WIDTH + GAP;
  const SPEED = 1.5; // Pixels per frame (increased speed)

  useAnimationFrame(() => {
    if (!isPaused) {
      xTranslation.current -= SPEED;
      
      // Reset position for infinite loop
      if (Math.abs(xTranslation.current) >= ITEM_SIZE * clientLogos.length) {
        xTranslation.current = 0;
      }
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${xTranslation.current}px)`;
      }
    }
  });

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gabardo-light-blue/5 to-white overflow-hidden" id="nossos-clientes">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 uppercase tracking-tight" id="nossos-clientes">
            Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Confiança e parceria que nos movem.
          </p>
          <p className="text-sm uppercase tracking-[0.35em] text-gabardo-blue mt-6">Trusted by</p>
        </motion.div>
      </div>

      {/* Infinite Logo Carousel - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Container */}
        <div className="overflow-hidden py-12">
          <div
            ref={containerRef}
            className="flex gap-12"
            style={{ width: 'fit-content' }}
          >
            {infiniteLogos.map((logo, index) => (
              <LogoItem
                key={`${logo.id}-${index}`}
                logo={logo}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutClientsCarousel;
