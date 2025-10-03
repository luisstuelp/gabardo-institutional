'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Sparkles, HeartPulse } from 'lucide-react';

const impactHighlights = [
  {
    icon: Users,
    label: 'Famílias atendidas',
    value: '12.8 mil+',
    description: 'Programas permanentes de saúde, educação e assistência em 9 estados brasileiros.'
  },
  {
    icon: Sparkles,
    label: 'Horas de voluntariado',
    value: '48 mil',
    description: 'Trilhas de mentoria, reforço escolar e iniciativas culturais lideradas por colaboradores.'
  },
  {
    icon: HeartPulse,
    label: 'Investimento social',
    value: 'R$ 6,2 mi',
    description: 'Fundo anual dedicado à inclusão e proteção de comunidades no entorno das operações.'
  }
];

export default function SocialClimateSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f9ff] to-[#eef4ff] py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-3xl" />
        <div className="absolute right-12 bottom-12 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-3xl md:text-4xl font-semibold uppercase tracking-[0.16em] text-gabardo-blue"
            >
              Impacto Social e Comunidades
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl text-lg leading-relaxed text-gray-600"
            >
              Valorizamos as pessoas que constroem a Gabardo e as comunidades onde atuamos. Investimos em programas de educação, saúde e inclusão que ampliam oportunidades e fortalecem nossos laços com colaboradores, motoristas parceiros e famílias.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {impactHighlights.map(({ icon: Icon, label, value, description }) => (
                <motion.li
                  key={label}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  className="group rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_24px_60px_-40px_rgba(15,31,58,0.55)] backdrop-blur"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue/70">{label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gabardo-blue">{value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative isolate flex h-[420px] items-center justify-center overflow-hidden rounded-[36px] border border-white/40 bg-white/70 shadow-[0_40px_90px_-45px_rgba(15,31,58,0.45)] backdrop-blur"
          >
            <motion.div
              aria-hidden
              initial={{ rotate: -6, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-8 rounded-[28px] border border-gabardo-blue/10 bg-gradient-to-br from-gabardo-blue/8 via-transparent to-emerald-200/30"
            />
            <Image
              src="/images/Trans Gabardo - Framers produtora -5193.JPG"
              alt="Programas sociais Gabardo"
              fill
              className="object-cover"
              priority={false}
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-3 text-xs font-medium uppercase tracking-[0.24em] text-gabardo-blue">
              Rede colaborativa de impacto social Gabardo
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
