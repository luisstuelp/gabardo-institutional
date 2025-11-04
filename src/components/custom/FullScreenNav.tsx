
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  imageSrc?: string;
  subMenu?: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

interface QuickPortalLink {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface FullScreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<MenuItem>;
  quickPortalLinks?: QuickPortalLink[];
}

const ANIMATION_DURATION = 800;

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z/C/HwAFgwJ/mi3c9wAAAABJRU5ErkJggg==';

const SLIDES = [
  { id: 'slide-1', src: '/images/gabardo-hero-01.JPG', alt: 'Frota Gabardo em operação' },
  { id: 'slide-2', src: '/images/gabardo-hero-02.JPG', alt: 'Infraestrutura Gabardo' },
  { id: 'slide-3', src: '/images/gabardo-hero-03.JPG', alt: 'Equipe Gabardo certificada' },
  { id: 'slide-4', src: '/images/gabardo-hero-04.JPG', alt: 'Unidade São José dos Pinhais' },
];

const FullScreenNav: React.FC<FullScreenNavProps> = ({
  isOpen,
  onClose,
  menuItems,
  quickPortalLinks = [],
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => {
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setActiveSubMenu(null);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);

    return () => clearInterval(slideInterval);
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  const getQuickLinkClasses = (variant: QuickPortalLink['variant']) => {
    const base = 'group relative flex items-center justify-between rounded-full border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
    if (variant === 'primary') {
      return `${base} border-white/20 bg-white text-[#0c1f3d] hover:bg-white/90 focus-visible:ring-gabardo-light-blue/60`;
    }
    return `${base} border-white/15 bg-white/5 text-white/80 hover:bg-white/12 focus-visible:ring-white/60`;
  };

  const renderMainMenu = () => (
    <motion.div
      key="main-menu"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex min-h-full flex-col gap-6 md:gap-6 mb-6 md:mb-0 pl-2 md:pl-6 lg:pl-10">
        <nav className="space-y-1 md:space-y-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              {item.subMenu ? (
                <button
                  onClick={() => setActiveSubMenu(item.id)}
                  className="flex items-center justify-between w-full py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
                >
                  <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={isMobile ? 16 : 20}
                    className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 text-blue-bright"
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
                >
                  <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={isMobile ? 16 : 20}
                    className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 text-blue-bright"
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {!isMobile && (
          <div className="space-y-4 text-white/80">
            <p className="max-w-xl text-base font-light leading-relaxed text-white/85">
              Há mais de 36 anos transportando veículos com segurança, tecnologia e excelência em todo o Brasil.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-gabardo-light-blue/85">
              <Clock size={16} className="text-gabardo-light-blue" />
              <span className="text-sm font-medium uppercase tracking-[0.24em]">Seg-Sex: 8h às 18h</span>
              <span className="text-white/40">•</span>
              <span className="text-sm font-medium uppercase tracking-[0.24em]">Sábado: 8h às 12h</span>
            </div>
          </div>
        )}

        {isMobile && quickPortalLinks.length > 0 && (
          <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-white/55">
              Portais de Acesso
            </p>
            <div className="space-y-2">
              {quickPortalLinks.map(link => (
                <Link
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className={getQuickLinkClasses(link.variant)}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={12} className="text-white/60 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderSubMenu = () => {
    const activeItem = menuItems.find(item => item.id === activeSubMenu);
    if (!activeItem || !activeItem.subMenu) return null;

    return (
      <motion.div
        key="sub-menu"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
      >
        <button onClick={() => setActiveSubMenu(null)} className="flex items-center text-white/70 hover:text-white mb-4">
          <ChevronLeft size={16} className="mr-2" />
          Voltar
        </button>
        <nav className="space-y-1 md:space-y-1 pl-2 md:pl-6 lg:pl-10">
          {activeItem.subMenu.map((subItem, index) => (
            <motion.div
              key={subItem.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
              className="group"
            >
              <Link 
                href={subItem.href}
                onClick={onClose}
                className="flex items-center justify-between py-2 md:py-3 text-white hover-blue-80 transition-all duration-500 touch-manipulation"
              >
                <span className="text-lg md:text-xl lg:text-2xl font-light tracking-tight">
                  {subItem.label}
                </span>
                <ChevronRight 
                  size={isMobile ? 16 : 20} 
                  className="opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 text-blue-bright" 
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 font-['Inter',_sans-serif]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1627]/85 via-[#0c1f3d]/80 to-[#06101f]/85" />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="fixed inset-x-0 top-0 z-[60] pointer-events-none"
          >
            <div className="section-container flex justify-end py-3 sm:py-3.5">
              <button
                onClick={onClose}
                className="pointer-events-auto group relative inline-flex h-10 w-10 lg:h-[2.2rem] lg:w-[2.2rem] items-center justify-center rounded-full border border-white/30 bg-black/25 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-light-blue/60"
                aria-label="Close menu"
              >
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </motion.div>

          <div className="relative z-10 h-full flex flex-col md:flex-row">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full md:w-3/5 lg:w-1/2 h-full flex flex-col justify-start pt-6 md:pt-8 p-4 md:p-8 lg:p-10 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 md:mb-8 mt-2 md:mt-0 px-3 md:px-2"
              >
                <Link href="/" onClick={onClose} className="inline-block w-full">
                  <div className="flex items-center justify-start overflow-hidden">
                    <Image
                      src="/images/Design sem nome (53).png"
                      alt="Gabardo"
                      width={isMobile ? 120 : 160}
                      height={isMobile ? 32 : 43}
                      priority
                      className="h-auto w-auto max-w-[90%] object-contain"
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(95%) sepia(7%) saturate(138%) hue-rotate(183deg) brightness(112%) contrast(100%)',
                        WebkitFilter:
                          'brightness(0) saturate(100%) invert(95%) sepia(7%) saturate(138%) hue-rotate(183deg) brightness(112%) contrast(100%)'
                      }}
                    />
                  </div>
                </Link>
              </motion.div>

              <AnimatePresence mode="wait">
                {activeSubMenu ? renderSubMenu() : renderMainMenu()}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="hidden md:flex relative w-2/5 lg:w-1/2 h-full overflow-hidden bg-gabardo-blue"
            >
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-[1200ms] ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={index !== currentSlide}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === currentSlide ? 'high' : 'low'}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    quality={48}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-br from-[#040b15]/80 via-[#081427]/65 to-[#0c1f3d]/80" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenNav;
