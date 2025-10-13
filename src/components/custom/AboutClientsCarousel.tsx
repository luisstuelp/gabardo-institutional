'use client';

import Image from 'next/image';
import { motion, useAnimationFrame } from 'framer-motion';
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

// Duplicate logos for infinite loop
const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos];

interface LogoItemProps {
  logo: typeof clientLogos[0];
  onManualPause: (shouldPause: boolean, element: HTMLDivElement | null) => void;
}

const LogoItem = ({ logo, onManualPause }: LogoItemProps) => {
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
      onClick={() => {
        setIsFlipped((prev) => {
          const next = !prev;
          onManualPause(next, itemRef.current);
          return next;
        });
      }}
    >
      <motion.div
        className="relative h-60 w-full cursor-pointer"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
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
      </motion.div>
    </div>
  );
};

const AboutClientsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const xTranslation = useRef(0);
  const targetTranslation = useRef(0);
  const LOGO_WIDTH = 240; // Width of each logo item
  const GAP = 48; // Gap between logos (gap-12 = 3rem = 48px)
  const ITEM_SIZE = LOGO_WIDTH + GAP;
  const SPEED = 1.5; // Pixels per frame (increased speed)
  const isDraggingRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const activePointerId = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);
  const DRAG_THRESHOLD = 6;
  const manualPauseRef = useRef(false);
  const lastPointerTypeRef = useRef<string>('');
  const [canHover, setCanHover] = useState(false);

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
    const totalWidth = ITEM_SIZE * clientLogos.length;
    let adjusted = value;

    if (totalWidth > 0) {
      while (adjusted <= -totalWidth) {
        adjusted += totalWidth;
      }
      while (adjusted >= totalWidth) {
        adjusted -= totalWidth;
      }
    } else {
      adjusted = 0;
    }

    targetTranslation.current = adjusted;
  };

  const commitTranslation = (value: number) => {
    xTranslation.current = value;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${value}px)`;
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
      applyTranslation(dragStartTranslate.current + delta);
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
    if (!canHover) return;
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

  useAnimationFrame(() => {
    if (!isPaused && !isDraggingRef.current) {
      applyTranslation(targetTranslation.current - SPEED);
    }

    const current = xTranslation.current;
    const target = targetTranslation.current;
    const delta = target - current;

    if (Math.abs(delta) < 0.3) {
      commitTranslation(target);
    } else {
      commitTranslation(current + delta * 0.15);
    }
  });

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
      const isTouchInteraction = lastPointerTypeRef.current === 'touch' || window.innerWidth < 768;
      if (isTouchInteraction) {
        centerElementIfNeeded(element);
        commitTranslation(targetTranslation.current);
      }
    }

    setIsPaused(shouldPause);
  };
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-gabardo-light-blue/5 to-white overflow-hidden" id="nossos-clientes">
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
          onPointerEnter={canHover ? handlePointerEnter : undefined}
          onPointerLeave={canHover ? handlePointerLeave : undefined}
          onPointerCancel={endDrag}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            ref={containerRef}
            className="flex gap-12"
            style={{ width: 'fit-content' }}
          >
            {infiniteLogos.map((logo, index) => (
              <LogoItem
                key={`${logo.id}-${index}`}
                logo={logo}
                onManualPause={handleManualPause}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutClientsCarousel;
