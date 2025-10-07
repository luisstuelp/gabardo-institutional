'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectImage {
  id: string;
  backgroundUrl: string;
  centerUrl: string;
  title: string;
  subtitle: string;
  categorySlug: string;
}

const projectImages: ProjectImage[] = [
  {
    id: '1',
    backgroundUrl: '/images/co-01.jpg',
    centerUrl: '/images/co-01.jpg',
    title: 'RECIFE',
    subtitle: 'HUB PRA MIM',
    categorySlug: 'hub-pra-mim'
  },
  {
    id: '2',
    backgroundUrl: '/images/co-2.jpg',
    centerUrl: '/images/co-2.jpg',
    title: 'RECIFE',
    subtitle: 'HUB PRA 2 OU 6',
    categorySlug: 'hub-pra-2-ou-6'
  },
  {
    id: '3',
    backgroundUrl: '/images/co-03.jpg',
    centerUrl: '/images/co-03.jpg',
    title: 'RECIFE',
    subtitle: 'HUB PRA GENTE QUE SÓ',
    categorySlug: 'hub-pra-gente-que-so'
  },
  {
    id: '4',
    backgroundUrl: '/images/co-04.jpg',
    centerUrl: '/images/co-04.jpg',
    title: 'CARUARU',
    subtitle: 'HUB PRA MIM',
    categorySlug: 'hub-pra-mim'
  },
  {
    id: '5',
    backgroundUrl: '/images/co-06.png',
    centerUrl: '/images/co-06.png',
    title: 'FORTALEZA',
    subtitle: 'HUB PRA 2 OU 6',
    categorySlug: 'hub-pra-2-ou-6'
  },
  {
    id: '6',
    backgroundUrl: '/images/co-07.png',
    centerUrl: '/images/co-07.png',
    title: 'FORTALEZA',
    subtitle: 'HUB PRA GENTE QUE SÓ',
    categorySlug: 'hub-pra-gente-que-so'
  }
];

const ProjectGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  // Auto-advance images
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextImage, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prevImage();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === ' ') {
        event.preventDefault();
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentImage = projectImages[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentImage.id}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.backgroundUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Grid */}
      <div 
        className="relative h-full grid grid-cols-12 grid-rows-12 gap-4 p-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Featured Image - Large and Centered */}
        <div className="col-span-8 row-span-8 col-start-3 row-start-3 relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${currentImage.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full overflow-hidden"
            >
              <div className="relative h-full w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src={currentImage.centerUrl}
                  alt={currentImage.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Action Button */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Link href={`/categoria/${currentImage.categorySlug}`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      <ArrowUpRight size={20} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Invisible Navigation Areas */}
          <div 
            className="absolute left-0 top-0 h-full w-1/2 cursor-w-resize z-10"
            onClick={prevImage}
            aria-label="Previous image"
          />
          <div 
            className="absolute right-0 top-0 h-full w-1/2 cursor-e-resize z-10"
            onClick={nextImage}
            aria-label="Next image"
          />
        </div>

        {/* Minimal Info - Top Left */}
        <div className="col-span-3 row-span-2 col-start-1 row-start-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentImage.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-1"
            >
              <div className="text-white/60 text-xs font-mono tracking-widest uppercase">
                {currentImage.title}
              </div>
              <div className="text-white text-lg font-light tracking-wide">
                {currentImage.subtitle}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter - Top Right */}
        <div className="col-span-2 row-span-1 col-start-11 row-start-1 flex items-center justify-end">
          <div className="text-white/40 font-mono text-sm tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projectImages.length).padStart(2, '0')}
          </div>
        </div>

        {/* Progress Bar - Bottom */}
        <div className="col-span-8 row-span-1 col-start-3 row-start-12 flex items-center">
          <div className="w-full h-px bg-white/20 relative overflow-hidden">
            <motion.div
              key={`progress-${currentIndex}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / projectImages.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-full bg-white absolute left-0 top-0"
            />
          </div>
        </div>

        {/* Minimal Dots Navigation - Bottom Right */}
        <div className="col-span-3 row-span-1 col-start-10 row-start-12 flex items-center justify-end space-x-3">
          {projectImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group relative"
              aria-label={`Go to image ${index + 1}`}
            >
              <div className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-3 h-3 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/30 rounded-full group-hover:bg-white/60'
              }`} />
              {index === currentIndex && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 border border-white/50 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Subtle Decoration Lines */}
        <div className="col-span-1 row-span-6 col-start-2 row-start-4 flex items-center">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
        <div className="col-span-1 row-span-6 col-start-11 row-start-4 flex items-center justify-end">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono tracking-wider">
        <span className="opacity-50">← → SPACE</span>
      </div>
    </section>
  );
};

export default ProjectGallery; 