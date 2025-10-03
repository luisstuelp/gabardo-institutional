'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Patrícia Gomes',
    role: 'Coordenadora de Projetos Sociais',
    story:
      '“Na Gabardo encontrei apoio para construir programas que realmente transformam as comunidades onde atuamos. Cada iniciativa nasce ouvindo quem está na ponta.”',
    impact:
      'Liderou a expansão do programa Vida em Movimento, conectando 1.500 famílias a atividades de saúde preventiva em 2024.',
    image: '/images/Trans Gabardo - Framers produtora -5193.JPG'
  },
  {
    name: 'Rodrigo Salles',
    role: 'Motorista parceiro há 9 anos',
    story:
      '“Os centros de apoio oferecem orientação financeira e cuidados com a saúde. Sinto que sou parte de uma rede que valoriza quem está na estrada.”',
    impact:
      'Participa do Gabardo Conecta, rede de mentoria entre motoristas que reduz 22% dos incidentes operacionais.',
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  },
  {
    name: 'Aline Souza',
    role: 'Mentora voluntária da Academia Jovem',
    story:
      '“Compartilhar conhecimento com jovens talentos das comunidades é inspirador. Crescemos juntos e fortalecemos novas lideranças.”',
    impact:
      'Acompanhou 38 jovens em programas de capacitação digital e empregabilidade desde 2022.',
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
  }
];

const autoplayDelay = 6500;

export default function SocialTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = useMemo(() => testimonials, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1f3a] via-[#12294c] to-[#0f1f3a] py-20 text-white">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
      <div className="absolute right-12 bottom-0 h-72 w-72 rounded-full bg-gabardo-blue/40 blur-3xl" aria-hidden />

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Comunidade Gabardo
          </span>
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">
            Histórias reais de quem constrói impacto social diariamente
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Mantemos os relatos originais e damos voz às pessoas que impulsionam nossas iniciativas. Cada história reforça a rede de confiança que sustenta a certificação carbono negativo.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <button
            type="button"
            onClick={prev}
            aria-label="Depoimento anterior"
            className="absolute -left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            className="absolute -right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_-60px_rgba(11,27,52,0.8)] backdrop-blur">
            <AnimatePresence mode="wait">
              {items.map((item, index) => {
                const isActive = index === currentIndex;
                return (
                  isActive && (
                    <motion.article
                      key={item.name}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center"
                    >
                      <div className="relative h-60 overflow-hidden rounded-3xl">
                        <Image
                          src={item.image}
                          alt={`Retrato de ${item.name}`}
                          fill
                          sizes="(min-width: 1024px) 280px, 100vw"
                          className="object-cover"
                          priority={false}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-gabardo-blue/20 via-transparent to-emerald-300/20" aria-hidden />
                      </div>

                      <div className="flex flex-col gap-6">
                        <Quote className="h-10 w-10 text-emerald-200" aria-hidden />
                        <p className="text-lg leading-relaxed text-white/80">{item.story}</p>
                        <div className="space-y-2 border-t border-white/10 pt-4">
                          <div className="text-lg font-semibold text-white">{item.name}</div>
                          <div className="text-sm uppercase tracking-[0.28em] text-white/50">{item.role}</div>
                          <p className="text-sm text-white/70">{item.impact}</p>
                        </div>
                      </div>
                    </motion.article>
                  )
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-10 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
