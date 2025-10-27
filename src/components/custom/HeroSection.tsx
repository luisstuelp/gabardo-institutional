'use client';

import { Mouse, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedWords from './AnimatedWords';
import AnimatedCarbonBadge from './AnimatedCarbonBadge';
import Link from 'next/link';

const ScrollDownIcon = () => (
  <div className="flex flex-col items-center space-y-2">
    <Mouse className="w-8 h-8" />
    <span className="text-xs font-light tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
      Role para baixo
    </span>
  </div>
);

export default function HeroSection({ title, subtitle, imageSrc }: { title?: string, subtitle?: string, imageSrc?: string }) {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateIsDesktop();
    window.addEventListener('resize', updateIsDesktop);

    return () => {
      window.removeEventListener('resize', updateIsDesktop);
    };
  }, []);

  useEffect(() => {
    const video = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true; // Ensure muted for autoplay
        await video.play();
        console.log('Video autoplay successful');
      } catch (error) {
        console.log('Autoplay failed, setting up fallback:', error);
        setupFallbackPlay();
      }
    };

    const setupFallbackPlay = () => {
      // Try to play on any user interaction
      const playOnInteraction = async () => {
        try {
          await video.play();
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('scroll', playOnInteraction);
        } catch (error) {
          console.log('Manual play failed:', error);
        }
      };

      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('scroll', playOnInteraction, { once: true });
    };

    // Use Intersection Observer to play when video is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    // Initial play attempt
    attemptPlay();

    return () => {
      observer.disconnect();
    };
  }, [isDesktop]);

  // Force autoplay on mobile
  useEffect(() => {
    const playVideo = async () => {
      if (mobileVideoRef.current && !isDesktop) {
        try {
          await mobileVideoRef.current.play();
        } catch (err) {
          console.log('Mobile video autoplay blocked:', err);
        }
      }
      if (desktopVideoRef.current && isDesktop) {
        try {
          await desktopVideoRef.current.play();
        } catch (err) {
          console.log('Desktop video autoplay blocked:', err);
        }
      }
    };
    playVideo();
  }, [isDesktop]);

  return (
    <div className="relative w-full h-screen min-h-screen text-white overflow-hidden bg-cover bg-center md:bg-transparent"
         style={{ backgroundImage: `url(${imageSrc || '/images/gabardo-hero-01.jpg'})` }}>
      {/* Hero Video Background - Hidden on mobile */}
      {!isDesktop && (
        <video
          ref={mobileVideoRef}
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          preload="metadata"
          controls={false}
          style={{ backgroundColor: 'transparent' }}
        >
          <source src="/images/truck-cut-hd-2.mp4" type="video/mp4" />
        </video>
      )}
      {isDesktop && (
        <video
          ref={desktopVideoRef}
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          preload="metadata"
          controls={false}
          style={{ backgroundColor: 'transparent' }}
        >
          <source src="https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgd5OVWpnZMciUgloBfthZmDSj3bWQ4yPuzERXM" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for better text contrast */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-center md:gap-12 h-full section-container py-6 sm:py-8 md:pt-12 md:pb-12">
        <div className="hidden md:block"></div>

        {/* Left Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:block absolute top-1/2 left-4 sm:left-6 md:left-10 lg:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>
        <div className="flex flex-col justify-center h-full py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-6 items-start md:items-center w-full">

            <div aria-hidden className="hidden md:block" />
            {/* Text Content Block */}
            <div className="max-w-4xl xl:max-w-5xl flex flex-col gap-3 md:gap-5">
              <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-2 sm:mb-3 md:mb-4">
                {title || 'Movidos por'}
                {!title && (
                  <>
                    <br />
                    <span
                      className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-extrabold leading-none"
                      style={{ color: '#38B6FF' }}
                    >
                      <AnimatedWords />
                    </span>
                  </>
                )}
              </h1>
              {subtitle && (
                <p className="font-secondary text-sm sm:text-base md:text-lg font-light leading-relaxed mb-3 md:mb-4">
                  {subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-white/85 my-2">
                <AnimatedCarbonBadge />
              </div>

              <p className="font-secondary text-sm sm:text-base md:text-lg font-light leading-relaxed mb-3 md:mb-4">
                Há mais de 36 anos, entendemos as necessidades dos nossos clientes para atendê-los de forma personalizada e eficiente no transporte de veículos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 md:mt-3">
                <Link href="/servicos" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto group bg-gabardo-light-blue text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-wide hover:bg-white hover:text-gabardo-light-blue transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 touch-manipulation font-primary rounded-full"
                  >
                    <span>Encontre seu serviço</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
                <Link href="/trabalhe-conosco" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto group bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-wide hover:bg-white hover:text-gabardo-light-blue transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 touch-manipulation font-primary rounded-full"
                  >
                    <span>Fale conosco</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}