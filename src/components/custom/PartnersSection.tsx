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

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((index + totalImages) % totalImages);
    },
    [totalImages]
  );

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
    <section className="py-16 flex flex-col gap-10">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossa Equipe</h2>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Pessoas reais movendo a Gabardo diariamente. Momentos capturados nas operações, treinamentos e celebrações.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full max-w-5xl"
        >
          <div className="relative w-full overflow-hidden rounded-[32px] bg-[#0b172b] shadow-[0_32px_90px_-40px_rgba(19,45,81,0.55)] aspect-[16/9]">
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
                  className={`h-full w-full ${featured.fit === 'contain' ? 'object-contain p-6' : 'object-cover'}`}
                  style={featured.objectPosition ? { objectPosition: featured.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1629]/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-2 text-white">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gabardo-light-blue">
                        Equipe Gabardo
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold">Momentos que contam a nossa história</h3>
                      <p className="text-sm sm:text-base text-white/80">{featured.alt}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-end text-white/70 text-sm font-medium">
                      <span className="text-2xl font-bold text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
                      <span className="text-xs uppercase tracking-[0.35em]">/{String(totalImages).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/80 p-3 text-gabardo-blue shadow-lg backdrop-blur-sm transition hover:bg-white"
          >
            <span className="text-lg font-semibold">&lsaquo;</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/80 p-3 text-gabardo-blue shadow-lg backdrop-blur-sm transition hover:bg-white"
          >
            <span className="text-lg font-semibold">&rsaquo;</span>
          </button>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 px-4 max-w-5xl">
          {teamImages.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => goTo(index)}
                className={`group relative h-16 w-24 overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'border-gabardo-blue shadow-[0_18px_45px_-25px_rgba(19,45,81,0.55)]'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="96px"
                  className={`h-full w-full ${image.fit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
                <div
                  className={`absolute inset-0 bg-gabardo-blue/20 transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2">
          {teamImages.map((_, index) => (
            <span
              key={`indicator-${index}`}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gabardo-blue w-10' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}