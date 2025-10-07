'use client';

import { Dot, Mouse, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
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
  }, []);

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Hero Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
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
        <source src="https://v8awusfkdo.ufs.sh/f/d0JPjEbGaqgd40MOZFknI6fVUiN4gAm5SK8M9Ltw7jpxPBy3" type="video/mp4" />
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/trucks-hero.jpg')" }}
        />
      </video>
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for better text contrast */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full section-container pt-6 pb-10 sm:pt-8 md:pt-16 md:pb-16">
        <div></div>

        {/* Left Scroll Indicator */}
        <div className="absolute top-1/2 left-4 sm:left-6 md:left-10 lg:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>
        <div className="flex flex-col justify-end h-full">
          <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[4rem_1fr] md:grid-cols-[7rem_1fr] gap-6 items-end w-full mb-12 sm:mb-14 md:mb-10">
            <div aria-hidden />
            {/* Text Content Block */}
            <div className="max-w-4xl xl:max-w-5xl">
              <h1 className="font-primary text-[34px] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-5 sm:mb-6">
                Movidos por
                <br />
                <span
                  className="block text-[44px] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold"
                  style={{ color: '#38B6FF' }}
                >
                  <AnimatedWords />
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-white/85 mb-5">
                <AnimatedCarbonBadge />
              </div>

              <p className="font-secondary mt-3 text-sm sm:text-base md:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-8">
                Há mais de 36 anos, entendemos as necessidades dos nossos clientes para atendê-los de forma personalizada e eficiente no transporte de veículos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/servicos">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gabardo-light-blue text-white px-8 py-4 text-base font-medium uppercase tracking-wide hover:bg-white hover:text-gabardo-light-blue transition-all duration-300 flex items-center space-x-3 touch-manipulation font-primary rounded-full"
                  >
                    <span>Encontre seu serviço</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
                <Link href="/trabalhe-conosco">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-transparent border-2 border-white text-white px-8 py-4 text-base font-medium uppercase tracking-wide hover:bg-white hover:text-gabardo-light-blue transition-all duration-300 flex items-center space-x-3 touch-manipulation font-primary rounded-full"
                  >
                    <span>Seja nosso parceiro</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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