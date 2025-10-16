'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

// Client logos data with back info - 21 logos
const clientLogos = [
  { id: 1, name: 'Volkswagen', description: 'Uma das maiores montadoras do mundo, conhecida por veículos populares e confiáveis. Atua fortemente na eletrificação e inovação tecnológica.' },
  { id: 2, name: 'CAOA Chery', description: 'Montadora brasileira de automóveis, resultado da parceria entre o grupo automotivo brasileiro CAOA e a chinesa Chery.' },
  { id: 3, name: 'VAMOS', description: ' Líder no setor de locação de caminhões, máquinas e equipamentos do Brasil.' },
  { id: 4, name: 'SCANIA', description: 'Fabricante sueca especializada em caminhões, ônibus e motores industriais, reconhecida pela durabilidade e eficiência.' },
  { id: 5, name: 'AGCO', description: 'Multinacional americana focada em máquinas agrícolas, voltada à produtividade e sustentabilidade no agronegócio.' },
  { id: 6, name: 'Peugeot', description: 'Marca francesa do grupo Stellantis, com foco em design, conforto e tecnologia em automóveis de passeio.' },
  { id: 7, name: 'RANDON', description: 'Grupo brasileiro referência em implementos rodoviários, autopeças e serviços financeiros para o setor de transporte.' },
  { id: 8, name: 'Volvo', description: 'Empresa sueca reconhecida por veículos, caminhões e ônibus com alto padrão de segurança, tecnologia e sustentabilidade.' },
  { id: 9, name: 'Glovis', description: 'Divisão logística do grupo Hyundai, especializada em transporte marítimo, terrestre e gestão da cadeia de suprimentos global.' },
  { id: 10, name: 'Movida', description: 'Locadora brasileira de veículos, conhecida por sua frota moderna, atendimento digital e programas de mobilidade sustentável.' },
  { id: 11, name: 'Hyundai', description: 'Montadora sul-coreana com ampla linha de veículos modernos, conectados e com foco em design e eficiência energética.' },
  { id: 12, name: 'Mercedes-Benz', description: 'Marca alemã de luxo e desempenho, líder em inovação, segurança e engenharia automotiva.' },
  { id: 13, name: 'Unidas', description: 'Empresa brasileira de locação e gestão de frotas corporativas, focada em mobilidade e atendimento personalizado.' },
  { id: 14, name: 'Citroën', description: 'Montadora francesa com design arrojado e foco em conforto e inovação, também parte do grupo Stellantis.' },
  { id: 15, name: 'CEVA Logistics', description: 'Operadora global de logística e transporte, atuando em frete, armazenagem e soluções integradas para cadeias de suprimentos.' },
  { id: 16, name: 'GAC', description: 'Grupo automotivo chinês (Guangzhou Automobile Group) que vem expandindo globalmente com foco em veículos elétricos e inovação.' },
  { id: 17, name: 'GWM', description: 'Uma das maiores montadoras chinesas, especializada em SUVs e picapes, com forte investimento em eletrificação.' },
  { id: 18, name: 'Localiza', description: 'Maior locadora de veículos da América Latina, com forte presença em mobilidade urbana e soluções corporativas.' },
  { id: 19, name: 'JSL', description: 'Grupo brasileiro de logística integrado, atuando em transporte, gestão de frotas, armazenagem e serviços industriais.' },
  { id: 20, name: 'Ford', description: 'Montadora americana tradicional, pioneira na produção em massa e atualmente focada em eletrificação e veículos conectados.' },
  { id: 21, name: 'CAOA', description: 'Grupo brasileiro que atua na importação, montagem e distribuição de marcas como Hyundai, Chery e Subaru, além de ter produção nacional.' },
];

// Duplicate logos for infinite loop - will be dynamically calculated
// This is just the base data
const baseLogos = clientLogos;

interface LogoItemProps {
  logo: typeof clientLogos[0];
  onManualPause: (shouldPause: boolean, element: HTMLDivElement | null) => void;
}

// Mobile logo item - click to open modal (zero overhead)
const MobileLogo = ({ logo, onClick, isDragging }: { logo: typeof clientLogos[0]; onClick: () => void; isDragging: boolean }) => {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-150"
      style={{ width: '200px', height: '120px' }}
      onClick={() => {
        // Only open modal if not dragging
        if (!isDragging) {
          onClick();
        }
      }}
    >
      <div className="bg-white rounded-2xl border border-gabardo-blue/10 p-4 shadow-sm w-full h-full flex items-center justify-center hover:border-gabardo-blue/20 transition-colors">
        <Image
          src={`/NewLogos/Nlogo (${logo.id}).png`}
          alt={logo.name}
          width={160}
          height={80}
          className="w-full h-full object-contain grayscale opacity-60"
          draggable={false}
          loading="lazy"
        />
      </div>
    </div>
  );
};

// Mobile modal for client info
const ClientModal = ({ logo, onClose }: { logo: typeof clientLogos[0] | null; onClose: () => void }) => {
  if (!logo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#132d51] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative blurs */}
        <div className="absolute -top-12 right-8 h-24 w-24 rounded-full bg-gabardo-light-blue/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-16 left-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Fechar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative">
          <div className="space-y-2 mb-6">
            <h3 className="text-2xl font-bold tracking-wide text-white">
              {logo.name}
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-1 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue"
            />
          </div>

          <p className="text-sm leading-relaxed text-white/95">
            {logo.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Full interactive logo item for desktop
const LogoItem = ({ logo, onManualPause }: LogoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => {
      const next = !prev;
      onManualPause(next, itemRef.current);
      return next;
    });
  };

  return (
    <div
      ref={itemRef}
      className="flex-shrink-0 transition-transform duration-300 ease-out [perspective:1000px] hover:scale-105"
      style={{ width: '240px' }}
      onClick={handleToggleFlip}
    >
      <div
        className="relative h-60 w-full cursor-pointer transition-transform duration-500 ease-in-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
        }}
      >
        {/* Front - Logo */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white rounded-3xl border border-gabardo-blue/10 p-8 shadow-sm transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={`/NewLogos/Nlogo (${logo.id}).png`}
            alt={logo.name}
            width={220}
            height={140}
            className="w-full h-full select-none object-contain grayscale opacity-60 transition-all duration-500"
            draggable={false}
          />
        </div>

        {/* Back - Info */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-start rounded-3xl p-6 shadow-lg text-white overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            backgroundColor: '#132d51',
          }}
        >
          <div className="absolute -top-16 right-8 h-28 w-28 rounded-full bg-gabardo-light-blue/15 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 left-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden />

          <div className="relative flex h-full w-full flex-col">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-wide text-white">
                {logo.name}
              </h3>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '4.5rem', opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[3px] rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                />
              </motion.div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/95">
              {logo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutClientsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [seqWidth, setSeqWidth] = useState<number>(0);
  const [copyCount, setCopyCount] = useState<number>(3);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const xTranslation = useRef(0);
  const targetTranslation = useRef(0);
  const velocityRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const LOGO_WIDTH = 240;
  const GAP = 48;
  const SPEED = 120; // Pixels per second (React Bits style)
  const SMOOTH_TAU = 0.25; // Exponential smoothing factor
  const MIN_COPIES = 2;
  const COPY_HEADROOM = 2;
  
  const isDraggingRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const activePointerId = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);
  const DRAG_THRESHOLD = 6;
  const manualPauseRef = useRef(false);
  const lastPointerTypeRef = useRef<string>('');
  const prefersReducedMotion = useReducedMotion();
  const targetVelocity = prefersReducedMotion ? 0 : SPEED;
  const [canHover, setCanHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<typeof clientLogos[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Dynamic copy calculation based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
        setCopyCount(Math.max(MIN_COPIES, copiesNeeded));
      }
    };

    updateDimensions();

    if (!window.ResizeObserver) {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    if (seqRef.current) observer.observe(seqRef.current);

    return () => observer.disconnect();
  }, [imagesLoaded]);

  // Image loading handler
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        setImagesLoaded(true);
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, []);

  // Hover capability detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover)');
    const updateHoverCapability = (event: MediaQueryListEvent | MediaQueryList) => {
      setCanHover(event.matches);
    };

    updateHoverCapability(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateHoverCapability);
      return () => mediaQuery.removeEventListener('change', updateHoverCapability);
    }

    mediaQuery.addListener(updateHoverCapability);
    return () => mediaQuery.removeListener(updateHoverCapability);
  }, []);

  const isHoverPointer = (event: ReactPointerEvent<HTMLElement>) => {
    return event.pointerType === 'mouse' || event.pointerType === 'pen';
  };

  const applyTranslation = (value: number) => {
    if (seqWidth > 0) {
      targetTranslation.current = ((value % seqWidth) + seqWidth) % seqWidth;
    } else {
      targetTranslation.current = 0;
    }
  };

  const commitTranslation = (value: number) => {
    xTranslation.current = value;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-value}px, 0, 0)`;
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    pointerActiveRef.current = true;
    activePointerId.current = event.pointerId;
    dragStartX.current = event.clientX;
    dragStartTranslate.current = xTranslation.current;
    isDraggingRef.current = false;
    lastPointerTypeRef.current = event.pointerType;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerActiveRef.current) {
      return;
    }
    const delta = event.clientX - dragStartX.current;

    if (!isDraggingRef.current && Math.abs(delta) > DRAG_THRESHOLD) {
      isDraggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
      if (!manualPauseRef.current) {
        setIsPaused(true);
      }
    }

    if (isDraggingRef.current) {
      event.preventDefault();
      const newPosition = dragStartTranslate.current - delta;
      commitTranslation(newPosition);
      targetTranslation.current = newPosition;
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerActiveRef.current) {
      return;
    }

    pointerActiveRef.current = false;

    if (isDraggingRef.current) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      isDraggingRef.current = false;
      setIsDragging(false);

      // Normalize position for infinite loop
      if (seqWidth > 0) {
        const normalized = ((xTranslation.current % seqWidth) + seqWidth) % seqWidth;
        targetTranslation.current = normalized;
        commitTranslation(normalized);
      }

      if (!manualPauseRef.current) {
        setTimeout(() => {
          if (!manualPauseRef.current) {
            setIsPaused(false);
          }
        }, 180);
      }
    } else if (!manualPauseRef.current) {
      setIsPaused(false);
    }

    activePointerId.current = null;
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Only pause on hover for desktop with hover capability
    if (isMobile || !canHover) return;
    if (isHoverPointer(event) && !manualPauseRef.current && !isDraggingRef.current) {
      setIsPaused(true);
    }
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canHover) {
      endDrag(event);
      return;
    }
    if (isHoverPointer(event) && !manualPauseRef.current && !pointerActiveRef.current) {
      setIsPaused(false);
    }
    endDrag(event);
  };

  // Main animation loop with exponential easing
  useEffect(() => {
    if (!isInView || !trackRef.current) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      // Target velocity (0 when paused/dragging/modal open)
      const isModalOpen = isMobile && selectedLogo !== null;
      const target = (isPaused || isDraggingRef.current || isModalOpen) ? 0 : targetVelocity;

      // Exponential smoothing for velocity
      const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      // Update position
      if (seqWidth > 0 && !isDraggingRef.current) {
        let nextOffset = xTranslation.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        commitTranslation(nextOffset);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [isInView, isPaused, targetVelocity, seqWidth, isMobile, selectedLogo]);

  const centerElementIfNeeded = (element: HTMLDivElement | null) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;
    const elementCenter = rect.left + rect.width / 2;
    const delta = viewportCenter - elementCenter;
    applyTranslation(targetTranslation.current + delta);
  };

  const handleManualPause = (shouldPause: boolean, element: HTMLDivElement | null) => {
    manualPauseRef.current = shouldPause;

    if (shouldPause) {
      const isTouchInteraction = lastPointerTypeRef.current === 'touch';
      if (isTouchInteraction) {
        centerElementIfNeeded(element);
        commitTranslation(targetTranslation.current);
      }
    }

    setIsPaused(shouldPause);
  };
  return (
    <>
      <section ref={ref} className="py-16 sm:py-20 bg-gradient-to-br from-white via-gabardo-light-blue/5 to-white overflow-hidden" id="nossos-clientes">
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
      >
        {/* Carousel Container */}
        <div
          className={`overflow-hidden py-12 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerEnter={canHover && !isMobile ? handlePointerEnter : undefined}
          onPointerLeave={canHover && !isMobile ? handlePointerLeave : undefined}
          onPointerCancel={endDrag}
          style={{ touchAction: 'none' }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ width: 'fit-content', willChange: 'transform' }}
          >
            {Array.from({ length: copyCount }, (_, copyIndex) => (
              <div 
                key={`copy-${copyIndex}`} 
                className={isMobile ? "flex gap-8" : "flex gap-12"} 
                ref={copyIndex === 0 ? seqRef : undefined}
              >
                {baseLogos.map((logo, index) => (
                  isMobile ? (
                    <MobileLogo
                      key={`${copyIndex}-${logo.id}-${index}`}
                      logo={logo}
                      onClick={() => setSelectedLogo(logo)}
                      isDragging={isDragging}
                    />
                  ) : (
                    <LogoItem
                      key={`${copyIndex}-${logo.id}-${index}`}
                      logo={logo}
                      onManualPause={handleManualPause}
                    />
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>

    {/* Mobile Modal */}
    {isMobile && selectedLogo && (
      <ClientModal 
        logo={selectedLogo} 
        onClose={() => setSelectedLogo(null)} 
      />
    )}
    </>
  );
};

export default AboutClientsCarousel;
