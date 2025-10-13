
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X as XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  type CarouselApi 
} from '@/components/ui/carousel';

interface CarouselItemData {
  id: string;
  title: string;
  projectCategory: ProjectCategoryType; // Nova categoria de projeto (MIM, 2 OU 6, etc.)
  location: string;
  imageSrc: string;
}

const CITIES = ["PORTO ALEGRE", "SÃO PAULO", "RIO DE JANEIRO", "GOIÁS"] as const;
type City = typeof CITIES[number];

const PROJECT_CATEGORIES = ["TRANSPORTE", "LOGÍSTICA", "SEGURANÇA"] as const;
type ProjectCategoryType = typeof PROJECT_CATEGORIES[number];

// Definição dos gradientes para cada cidade
const cityGradients: Record<City, { from: string; to: string }> = {
  "PORTO ALEGRE": { from: '#0c2a4d', to: '#1c4a82' }, // Tons de azul escuro e profundo
  "SÃO PAULO": { from: '#78350f', to: '#a15c27' }, // Tons terrosos, laranja queimado
  "RIO DE JANEIRO": { from: '#047857', to: '#059669' }, // Tons de verde mar profundo
  "GOIÁS": { from: '#785549', to: '#a17463' }, // Tons de marrom e bege
};

// Mock data - Certifique-se de que há itens para todas as combinações de cidade/categoria de projeto ou a lógica de fallback será mais crítica.
const generateMockItemsForCity = (city: City): CarouselItemData[] => {
  const items: CarouselItemData[] = [];
  PROJECT_CATEGORIES.forEach(projCat => {
    // Adiciona 2 itens por categoria de projeto para cada cidade como exemplo
    for (let i = 1; i <= 2; i++) {
      items.push({
        id: `${city}-${projCat.replace(/ /g, '')}-item-${i}`,
        title: `${projCat} Exemplo ${i} em ${city}`,
        projectCategory: projCat,
        location: `[${city}]`,
        imageSrc: `https://source.unsplash.com/random/1200x800?city,${city.toLowerCase()},${projCat.toLowerCase()},architecture&sig=${Math.random()}`,
      });
    }
  });
  // Exemplo específico para garantir que "TRANSPORTE" em "PORTO ALEGRE" tenha os itens conhecidos
  if (city === 'PORTO ALEGRE') {
    items.unshift({
        id: `PORTO_ALEGRE-transporte-1`,
        title: 'MOVIDOS POR INOVAÇÃO & SUSTENTABILIDADE',
        projectCategory: 'TRANSPORTE',
        location: `[PORTO ALEGRE]`,
        imageSrc: '/gabardo-slide-1.jpg',
      },
      {
        id: `PORTO_ALEGRE-transporte-2`,
        title: 'TRANSPORTE SEGURO E EFICIENTE',
        projectCategory: 'TRANSPORTE', 
        location: `[PORTO ALEGRE]`,
        imageSrc: '/gabardo-slide-2.jpg',
      }
    )
  }
  return items;
};

const allCityItems: Record<City, CarouselItemData[]> = CITIES.reduce((acc, city) => {
  acc[city] = generateMockItemsForCity(city);
  return acc;
}, {} as Record<City, CarouselItemData[]>);

const ImageCarouselSection: React.FC = () => {
  const selectedCity: City = "PORTO ALEGRE"; // Fixed to Porto Alegre
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<ProjectCategoryType>(PROJECT_CATEGORIES[0]);
  const [currentItems, setCurrentItems] = useState<CarouselItemData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [bgGradient, setBgGradient] = useState(cityGradients[selectedCity]);
  
  const carouselSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setBgGradient(cityGradients[selectedCity]);
  }, []);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    const cityItems = allCityItems[selectedCity] || [];
    let filteredByProjectCategory = cityItems.filter(item => item.projectCategory === selectedProjectCategory);

    if (filteredByProjectCategory.length === 0 && cityItems.length > 0) {
      // Fallback: se a categoria atual não tem itens na cidade selecionada, 
      // tente encontrar a primeira categoria da lista PROJECT_CATEGORIES que tenha itens.
      for (const category of PROJECT_CATEGORIES) {
        const fallbackItems = cityItems.filter(item => item.projectCategory === category);
        if (fallbackItems.length > 0) {
          setSelectedProjectCategory(category); // Muda para a categoria de fallback
          filteredByProjectCategory = fallbackItems;
          break;
        }
      }
      // Se nenhuma categoria tiver itens, filteredByProjectCategory continuará vazio.
    }

    setCurrentItems(filteredByProjectCategory);
    setSelectedIndex(0);
    if (api) {
      api.scrollTo(0, false); 
    }
  }, [selectedProjectCategory, api]); // Removido selectedCity pois é constante e allCityItems daqui pois é constante após a inicialização

  useEffect(() => {
    if (!api) return;
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      e.preventDefault();
      e.stopPropagation();
      if (Math.abs(e.deltaY) > 15) {
        isScrolling = true;
        if (e.deltaY > 0) api.scrollNext();
        else api.scrollPrev();
        setTimeout(() => { isScrolling = false; }, 600);
      }
    };
    const section = carouselSectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
      return () => section.removeEventListener('wheel', handleWheel);
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;
    let startY = 0;
    let isDragging = false;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) > 60) {
        if (deltaY > 0) api.scrollNext();
        else api.scrollPrev();
      }
      isDragging = false;
    };
    const section = carouselSectionRef.current;
    if (section) {
      section.addEventListener('touchstart', handleTouchStart, { passive: true });
      section.addEventListener('touchend', handleTouchEnd, { passive: true });
      return () => {
        section.removeEventListener('touchstart', handleTouchStart);
        section.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [api]);

  const openModal = useCallback((imageSrc: string) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalImageSrc('');
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape': closeModal(); break;
        case 'ArrowUp': event.preventDefault(); api?.scrollPrev(); break;
        case 'ArrowDown': event.preventDefault(); api?.scrollNext(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [api, closeModal]);
  
  const activeItem = currentItems[selectedIndex] || 
                     (currentItems.length > 0 ? currentItems[0] : null) || 
                     allCityItems[selectedCity]?.find(item => item.projectCategory === selectedProjectCategory) || 
                     allCityItems[selectedCity]?.[0];

  // Se activeItem ainda for undefined (nenhum item em currentItems, nem fallback encontrado), mostrar loading ou mensagem
  if (!activeItem) {
    return (
      <motion.section 
        className="carousel-section min-h-screen text-white relative overflow-hidden flex justify-center items-center"
        style={{ '--bg-from-color': cityGradients[selectedCity].from, '--bg-to-color': cityGradients[selectedCity].to } as React.CSSProperties}
        animate={{ '--bg-from-color': cityGradients[selectedCity].from, '--bg-to-color': cityGradients[selectedCity].to }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom_right,var(--bg-from-color),var(--bg-to-color))]" />
        <p>Carregando projetos ou nenhum encontrado para esta cidade/categoria...</p>
      </motion.section>
    );
  }

  return (
    <motion.section 
      ref={carouselSectionRef} 
      className="carousel-section min-h-screen text-white relative overflow-hidden"
      role="region"
      aria-label="Image carousel"
      style={{ '--bg-from-color': bgGradient.from, '--bg-to-color': bgGradient.to } as React.CSSProperties}
      animate={{ '--bg-from-color': cityGradients[selectedCity].from, '--bg-to-color': cityGradients[selectedCity].to }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom_right,var(--bg-from-color),var(--bg-to-color))]" />

      <div className="absolute inset-0 flex z-0">
        <div className="w-1/3 relative">
          {currentItems.length > 0 ? (
            <Carousel
              orientation="vertical"
              opts={{ align: "start", containScroll: "trimSnaps", dragFree: false, loop: false }}
              setApi={setApi}
              className="h-full"
            >
              <CarouselContent className="h-full -mt-0">
                {currentItems.map((item, index) => (
                  <CarouselItem key={item.id} className="pt-0 basis-1/3 ml-10">
                    <motion.button
                      className="h-full w-full cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      style={{ opacity: index === selectedIndex ? 1 : 0.6, scale: index === selectedIndex ? 1 : 0.95 }}
                      animate={{ opacity: index === selectedIndex ? 1 : 0.6, scale: index === selectedIndex ? 1 : 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onClick={() => api?.scrollTo(index)}
                      aria-label={`View ${item.title}`}
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 25vw"
                        priority={index <= 2}
                      />
                      {index === selectedIndex && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 bg-accent flex flex-col justify-center items-center overflow-hidden w-12"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: '3rem' }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          aria-hidden="true"
                        />
                      )}
                      {index !== selectedIndex && (
                        <div className="absolute inset-0 bg-black/50" />
                      )}
                    </motion.button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="h-full flex justify-center items-center text-neutral-500">
              <p>Nenhum projeto para esta categoria.</p>
            </div>
          )}
        </div>

        <div className="w-2/3 relative flex flex-col">
          <div className="absolute top-8 left-8 right-8 z-10">
            <div className="flex justify-between items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem.id}-meta`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono uppercase tracking-wider"
                >
                  
                </motion.div>
              </AnimatePresence>
              
              <div className="flex flex-col items-end gap-3">
                <nav className="flex gap-2" role="tablist" aria-label="Project Category selection">
                  {PROJECT_CATEGORIES.map((projCategory) => (
                    <button
                      key={projCategory}
                      onClick={() => setSelectedProjectCategory(projCategory)} // Apenas atualiza, não alterna
                      role="tab"
                      aria-selected={selectedProjectCategory === projCategory}
                      className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-sm ${selectedProjectCategory === projCategory ? 'bg-white text-black shadow-lg' : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'}`}
                    >
                      {projCategory}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 -ml-[27rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeItem.id}-title-${activeItem.projectCategory}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-none mb-4">
                  {activeItem.title}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                    {activeItem.projectCategory}
                  </h2>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                    {activeItem.location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 -z-10">
            <AnimatePresence mode="wait">
              <motion.button
                key={`${activeItem.id}-image`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
                onClick={(e) => { e.stopPropagation(); openModal(activeItem.imageSrc); }}
                aria-label={`View full screen image of ${activeItem.title}`}
              >
                {activeItem.imageSrc ? (
                    <Image
                        src={activeItem.imageSrc}
                        alt={activeItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 67vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <p>Imagem não disponível</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen image view"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-screen-xl max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={modalImageSrc} 
                alt="Full screen view" 
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full z-[10000] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Close full screen image"
            >
              <XIcon size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ImageCarouselSection;
