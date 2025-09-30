'use client';

import { Dot, Mouse } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnimatedDiferente from './AnimatedDiferente';

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
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0V18" /> {/* Adjusted arrow to better match V shape from image corner*/}
  </svg>
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
        {/* Fallback image if video fails to load */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/trucks-hero.jpg)'
          }}
        />
      </video>
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for better text contrast */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-5 pt-6 pb-10 sm:px-7 sm:pt-8 md:p-16">
        <div></div> {/* This div is a placeholder if header spacing is managed here, currently header is absolute so it's fine*/}

        {/* Left Scroll Indicator - positioned absolutely relative to this container */}
        <div className="absolute top-1/2 left-4 sm:left-6 md:left-16 transform -translate-y-1/2">
          <ScrollDownIcon />
        </div>
        {/* Main Text & Bottom Arrow Container */}
        {/* The outer div handles bottom positioning via justify-between on parent and flex-col */}
        <div className="flex flex-col justify-end h-full">
          <div className="flex items-end w-full mb-14 sm:mb-16 md:mb-8">
            {/* Spacer to keep text clear of scroll indicator */}
            <div className="flex-shrink-0 w-14 sm:w-16 md:w-32" />

            {/* Text Content Block */}
            <div className="flex-grow max-w-4xl xl:max-w-5xl">
              <h1 className="font-primary text-[26px] sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5 sm:mb-6">
                Para cada cliente,
                <br />
                <span style={{ color: '#38B6FF' }}>uma Gabardo <AnimatedDiferente /></span>
              </h1>
              <p className="font-secondary mt-3 text-sm sm:text-base md:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-8">
                Há mais de 35 anos, entendemos as necessidades dos nossos clientes para atendê-los de forma personalizada e eficiente no transporte de veículos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  className="font-secondary text-white px-7 py-3.5 sm:px-8 sm:py-4 font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: '#38B6FF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2da5ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#38B6FF';
                  }}
                >
                  Encontre seu serviço
                </button>
                <button
                  className="font-secondary border-2 border-white text-white px-7 py-3.5 sm:px-8 sm:py-4 font-semibold uppercase tracking-wide transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#38B6FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Seja nosso parceiro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}