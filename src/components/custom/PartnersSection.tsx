'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

type TeamMember = {
  id: number;
  src: string;
  alt: string;
  role?: string;
  location?: string;
};

const teamMembers: TeamMember[] = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  const filename = encodeURIComponent(`Equipe (${id}).png`);

  return {
    id,
    src: `/images/${filename}`,
    alt: `Equipe Gabardo ${id}`,
  };
});

export default function PartnersSection() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [api]);

  const groupedSlides = useMemo(() => teamMembers, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f3f6fb] to-white py-20">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-3xl sm:text-4xl font-bold text-[#132D51]"
          >
            Nossa Equipe
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-medium text-gabardo-blue/90"
          >
            Pessoas que movem nossos resultados todos os dias
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto max-w-3xl text-sm sm:text-base text-gray-600"
          >
            Conheça algumas das histórias e bastidores das operações da Gabardo. Imagens capturadas em treinamentos, pátios e unidades em todo o Brasil.
          </motion.p>
        </div>

        <div className="relative mt-16">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: true, skipSnaps: false }}
            className="relative"
          >
            <CarouselContent className="-ml-4">
              {groupedSlides.map((member) => (
                <CarouselItem
                  key={member.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="group relative h-full overflow-hidden rounded-[30px] border border-gabardo-blue/12 bg-white/40 shadow-[0_28px_54px_-34px_rgba(19,45,81,0.4)] backdrop-blur"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={member.src}
                        alt={member.alt}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 28vw, (min-width: 768px) 40vw, 88vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        priority={member.id <= 4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85" />
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex border-gabardo-blue/30 bg-white/80 text-gabardo-blue shadow-lg hover:bg-white" />
            <CarouselNext className="hidden md:flex border-gabardo-blue/30 bg-white/80 text-gabardo-blue shadow-lg hover:bg-white" />
          </Carousel>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue/60">
            <span className="rounded-full border border-gabardo-blue/15 bg-white/60 px-4 py-2">Operações reais</span>
            <span className="rounded-full border border-gabardo-blue/15 bg-white/60 px-4 py-2">Cultura & desenvolvimento</span>
            <span className="rounded-full border border-gabardo-blue/15 bg-white/60 px-4 py-2">Brasil & LATAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
