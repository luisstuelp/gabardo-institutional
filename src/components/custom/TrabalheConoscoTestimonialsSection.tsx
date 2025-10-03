'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Sparkle } from 'lucide-react';

const testimonials = [
  {
    name: 'Daniele Gomes Gonçalves',
    role: 'Coordenadora Administrativa',
    quote: 'Cresci na Gabardo porque sempre encontrei líderes que apostaram no meu potencial. Hoje, retribuo criando oportunidades para novos talentos todos os dias.',
    tenure: '12 anos de casa',
    focus: 'Liderança Feminina',
    image: '/images/co-01.jpg',
  },
  {
    name: 'Waldir Alves de Souza',
    role: 'Gerente de Filial',
    quote: 'Integro pessoas, tecnologia e clientes há décadas. Ver a operação evoluir enquanto gente da casa assume protagonismo é o que me move.',
    tenure: '40 anos de história',
    focus: 'Operações e relacionamento',
    image: '/images/co-2.jpg',
  },
  {
    name: 'Ercio Gomes da Silva',
    role: 'Coordenador de Treinamento Operacional',
    quote: 'Treinar, apoiar e desenvolver os nossos motoristas é minha missão. Somos um time que aprende junto e entrega excelência de ponta a ponta.',
    tenure: '18 anos dedicados',
    focus: 'Academia Gabardo',
    image: '/images/co-03.jpg',
  },
];

const TrabalheConoscoTestimonialsSection: React.FC = () => {
  const gradientIds = useMemo(
    () => testimonials.map((_, index) => `testimonial-gradient-${index}`),
    []
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1f3a] via-[#132d51] to-[#0f1f3a] py-20 text-white">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-sky-300/10 blur-[110px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/80"
          >
            <Sparkle className="h-4 w-4" />
            Trajetórias reais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-3xl font-semibold md:text-4xl"
          >
            Nossas histórias aceleram carreiras e conexões
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-4 max-w-3xl text-base text-white/70 md:text-lg"
          >
            Conheça quem transforma a logística com a gente, inspira novas jornadas e segue crescendo com a cultura Gabardo.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-white/30"
            >
              <svg className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={gradientIds[index]} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(56,182,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(19,45,81,0.3)" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${gradientIds[index]})`} />
              </svg>

              <div className="relative flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={70}
                  height={70}
                  className="rounded-2xl border border-white/30 object-cover"
                />
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                    {testimonial.focus}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-white/70">{testimonial.role}</p>
                </div>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-white/80 md:text-base">
                <Quote className="absolute -left-4 -top-3 h-6 w-6 text-white/20" />
                {testimonial.quote}
              </p>

              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/60">
                <span>{testimonial.tenure}</span>
                <span>Carreira Gabardo</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoTestimonialsSection;
