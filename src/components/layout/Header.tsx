'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

import FullScreenNav from '@/components/custom/FullScreenNav';

const HeaderRevised = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkSurface = variant === 'dark' && !isScrolled;

  const ctaClasses = isDarkSurface
    ? 'bg-white text-gabardo-blue hover:bg-white/90'
    : 'bg-gabardo-blue text-white hover:bg-gabardo-blue/90';
  const menuButtonClasses = isDarkSurface
    ? 'border-white/25 text-white hover:border-white/60 hover:bg-white/10'
    : 'border-gabardo-blue/20 text-gabardo-blue hover:border-gabardo-blue hover:bg-gabardo-blue/10';

  const logoFilter = isDarkSurface
    ? 'brightness(0) saturate(100%) invert(95%) sepia(7%) saturate(138%) hue-rotate(183deg) brightness(112%) contrast(100%)'
    : 'brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2060%) hue-rotate(185deg) brightness(90%) contrast(88%)';

  const headerClasses = `fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
    isDarkSurface
      ? 'bg-transparent'
      : isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_12px_35px_-20px_RGBA(19,45,81,0.45)]'
        : 'bg-white/70 backdrop-blur-xl'
  }`;

  const menuItems = [
    { id: 'home', label: 'HOME', href: '/', imageSrc: '/images/hero-home.jpg' },
    {
      id: 'sobre',
      label: 'SOBRE',
      href: '#',
      imageSrc: '/images/hero-about.jpg',
      subMenu: [
        { id: 'secao-institucional', label: 'INSTITUCIONAL', href: '/sobre/secao-institucional' },
        { id: 'historia', label: 'HISTÓRIA', href: '/sobre/historia' },
        { id: 'qualidade', label: 'QUALIDADE', href: '/sobre/qualidade' },
      ],
    },
    { id: 'servicos', label: 'SERVIÇOS', href: '/servicos', imageSrc: '/images/hero-services.jpg' },
    {
      id: 'nossa-gente',
      label: 'NOSSA GENTE',
      href: '#',
      imageSrc: '/images/hero-people.jpg',
      subMenu: [
        { id: 'trabalhe-conosco', label: 'TRABALHE CONOSCO', href: '/trabalhe-conosco' },
        { id: 'programas', label: 'PROGRAMAS', href: '/programas' },
        { id: 'seja-um-agregado', label: 'SEJA UM AGREGADO', href: '/nossa-gente/seja-um-agregado' },
      ],
    },
    {
      id: 'sustentabilidade',
      label: 'SUSTENTABILIDADE',
      href: '/sustentabilidade',
      imageSrc: '/images/gabardo-hero-01.JPG',
    },
    { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/images/hero-blog.jpg' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={headerClasses}
      >
        <div className="section-container flex items-center justify-between py-3.5 sm:py-3 md:py-[0.5rem] lg:py-[0.18rem]">
          <Link
            href="/"
            className="group inline-flex items-center"
            aria-label="Gabardo Distribuidora - Página inicial"
          >
            <Image
              src="/gabardo-logo.png"
              alt="Gabardo Distribuidora"
              width={isMobile ? 110 : 116}
              height={isMobile ? 32 : 30}
              priority
              className="h-auto w-auto transition-transform duration-300 group-hover:scale-105"
              style={{ filter: logoFilter, WebkitFilter: logoFilter }}
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-3">
            <Link
              href="/contato"
              className={`hidden lg:inline-flex items-center gap-2 rounded-full px-4 py-[0.4rem] text-[0.65rem] font-semibold uppercase tracking-[0.32em] transition-all duration-300 shadow-[0_18px_35px_-28px_RGBA(19,45,81,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-light-blue/60 ${ctaClasses}`}
            >
              Fale conosco
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className={`group relative inline-flex h-9 w-9 lg:h-[1.8rem] lg:w-[1.8rem] items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-light-blue/60 ${menuButtonClasses}`}
              aria-label="Abrir menu"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gabardo-light-blue/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <Menu size={isMobile ? 22 : 18} />
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
};

export { HeaderRevised as Header };