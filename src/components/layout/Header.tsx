'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

import FullScreenNav from '@/components/custom/FullScreenNav';

type HeaderProps = {
  variant?: 'light' | 'dark';
  isHidden?: boolean;
  isFloating?: boolean;
};

const HeaderRevised = ({ variant = 'light', isHidden = false, isFloating = true }: HeaderProps) => {
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
    if (!isFloating) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFloating]);

  const isDarkSurface = variant === 'dark' && (!isFloating || !isScrolled);

  const ctaClasses = isDarkSurface
    ? 'bg-white text-gabardo-blue hover:bg-white/90'
    : 'bg-gabardo-blue text-white hover:bg-gabardo-blue/90';
  const menuButtonClasses = isDarkSurface
    ? 'border-white/25 text-white hover:border-white/60 hover:bg-white/10'
    : 'border-gabardo-blue/20 text-gabardo-blue hover:border-gabardo-blue hover:bg-gabardo-blue/10';

  const quickLinkBaseClasses =
    'group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

  const quickLinkPrimaryClasses = isDarkSurface
    ? 'border-white/30 bg-transparent text-white/90 hover:bg-white/12 hover:text-white focus-visible:ring-white/50'
    : 'border-gabardo-blue/25 bg-transparent text-gabardo-blue/90 hover:bg-gabardo-light-blue/12 focus-visible:ring-gabardo-blue/40';

  const quickLinkSecondaryClasses = isDarkSurface
    ? 'border-white/30 bg-transparent text-white/90 hover:bg-white/10 hover:text-white focus-visible:ring-white/40'
    : 'border-gabardo-blue/25 bg-transparent text-gabardo-blue/90 hover:bg-gabardo-light-blue/12 focus-visible:ring-gabardo-light-blue/30';

  const logoFilter = isDarkSurface
    ? 'brightness(0) saturate(100%) invert(95%) sepia(7%) saturate(138%) hue-rotate(183deg) brightness(112%) contrast(100%)'
    : 'brightness(0) saturate(100%) invert(17%) sepia(27%) saturate(2060%) hue-rotate(185deg) brightness(90%) contrast(88%)';

  const floatingVisibility = isHidden
    ? '-translate-y-full pointer-events-none'
    : 'translate-y-0 pointer-events-auto';

  const staticVisibility = !isFloating && isHidden
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100 pointer-events-auto';

  const positionClasses = isFloating
    ? 'fixed inset-x-0 top-0 z-40'
    : 'absolute inset-x-0 top-0 z-40';

  const headerClasses = `${positionClasses} transition-transform transition-all duration-500 ${
    isDarkSurface
      ? 'bg-transparent'
      : isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_12px_35px_-20px_RGBA(19,45,81,0.45)]'
        : 'bg-white/70 backdrop-blur-xl'
  } ${isFloating ? floatingVisibility : staticVisibility}`;

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
        { id: 'infraestrutura', label: 'INFRAESTRUTURA', href: '/infraestrutura' },
      ],
    },
    { id: 'servicos', label: 'SERVIÇOS', href: '/servicos', imageSrc: '/images/hero-services.jpg' },
    { id: 'qualidade', label: 'QUALIDADE', href: '/sobre/qualidade', imageSrc: '/images/Certificados.JPG' },
    // Removed NOSSA GENTE and SUSTENTABILIDADE entries

    { id: 'orcamento', label: 'ORÇAMENTO', href: '/orcamento', imageSrc: '/images/gabardo-hero-03.JPG' },
    { id: 'contato', label: 'CONTATO', href: '/contato', imageSrc: '/images/gabardo-hero-03.JPG' },
    { id: 'midia', label: 'MÍDIA', href: '/midia', imageSrc: '/images/gabardo-hero-03.JPG' },
    { id: 'blog', label: 'BLOG', href: '/blog', imageSrc: '/images/hero-blog.jpg' },
  ];

  const quickPortalLinks: Array<{ id: string; label: string; href: string; variant: 'primary' | 'secondary' }> = [
    {
      id: 'montadoras',
      label: 'Montadoras/Concessionárias',
      href: 'http://siga.transgabardo.com.br:991/wgab001c.php',
      variant: 'primary',
    },
    {
      id: 'transportes-diversos',
      label: 'Transportes diversos',
      href: 'https://transgabardo.com.br/sistemas/siga.php',
      variant: 'secondary',
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={headerClasses}
      >
        <div className="section-container flex items-center justify-between h-[70px]">
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              href="/"
              className="group inline-flex items-center"
              aria-label="Gabardo - Página inicial"
            >
              <div className="lg:transform lg:scale-[1.12]">
                <Image
                  src="/images/Design sem nome (53).png"
                  alt="Gabardo"
                  width={isMobile ? 72 : 123}
                  height={isMobile ? 22 : 28}
                  priority
                  className="h-auto w-auto transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: logoFilter, WebkitFilter: logoFilter }}
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden xl:flex items-center gap-2.5">
              {quickPortalLinks.map(({ id, label, href, variant }) => (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${quickLinkBaseClasses} ${variant === 'primary' ? quickLinkPrimaryClasses : quickLinkSecondaryClasses}`}
                >
                  <span className="leading-tight">{label}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/orcamento"
              className={`hidden lg:inline-flex items-center gap-2 rounded-full px-[1.1rem] py-[0.45rem] text-[0.64rem] font-semibold uppercase tracking-[0.26em] transition-all duration-300 shadow-[0_18px_35px_-28px_RGBA(19,45,81,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-light-blue/60 ${ctaClasses}`}
            >
              Faça seu orçamento
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className={`group relative inline-flex h-8 w-8 lg:h-[2rem] lg:w-[2rem] items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-light-blue/60 ${menuButtonClasses}`}
              aria-label="Abrir menu"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gabardo-light-blue/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <Menu size={isMobile ? 20 : 18} />
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        quickPortalLinks={quickPortalLinks}
      />
    </>
  );
};

export { HeaderRevised as Header };
