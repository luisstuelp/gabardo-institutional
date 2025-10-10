'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type TeamImage = {
  id: number;
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
};

const baseTeamImages: TeamImage[] = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  const fileName = `Equipe (${id}).png`;
  const encodedFileName = encodeURIComponent(fileName);

  return {
    id,
    src: `/images/${encodedFileName}`,
    alt: `Equipe Gabardo ${id}`,
  };
});

const teamImages: TeamImage[] = baseTeamImages;

const carouselIntervalMs = 5000;

export default function PartnersSection() {
  const totalImages = teamImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    const timer = setInterval(goNext, carouselIntervalMs);
    return () => clearInterval(timer);
  }, [goNext]);

  const featured = teamImages[currentIndex];

  return (
    <section className="py-16 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossa Equipe</h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Pessoas reais movendo a Gabardo diariamente. Momentos capturados nas operações, treinamentos e celebrações.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full"
      >
        <div className="relative w-full aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                priority
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 70vw, 90vw"
                className="h-full w-full object-cover"
                style={featured.objectPosition ? { objectPosition: featured.objectPosition } : undefined}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Imagem anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/70 p-3 text-gabardo-blue shadow-lg backdrop-blur-sm transition hover:bg-white"
        >
          <span className="text-lg font-semibold">&lsaquo;</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próxima imagem"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/70 p-3 text-gabardo-blue shadow-lg backdrop-blur-sm transition hover:bg-white"
        >
          <span className="text-lg font-semibold">&rsaquo;</span>
        </button>
      </motion.div>
    </section>
  );
}