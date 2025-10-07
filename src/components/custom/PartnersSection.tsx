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

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + teamImages.length) % teamImages.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(currentIndex + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, goTo]);

  const featured = teamImages[currentIndex];
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossa Equipe</h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Pessoas reais movendo a Gabardo diariamente. Momentos capturados nas operações, treinamentos e celebrações.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-white shadow-[0_28px_80px_-40px_rgba(19,45,81,0.45)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gabardo-blue/6 via-white to-gabardo-light-blue/10" />
        <div className="relative">
          <div className="relative h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 80vw"
                  className={`${featured.fit === 'contain' ? 'object-contain' : 'object-cover'} bg-black/40`}
                  style={featured.objectPosition ? { objectPosition: featured.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1629]/55 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Imagem anterior"
            className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-base font-semibold text-gabardo-blue shadow-md transition hover:bg-white"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima imagem"
            className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-base font-semibold text-gabardo-blue shadow-md transition hover:bg-white"
          >
            &gt;
          </button>
        </div>
      </motion.div>
    </div>
  );
}