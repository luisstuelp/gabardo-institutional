'use client';

import { motion } from 'framer-motion';
import { Calendar, Truck, Building2, Star } from 'lucide-react';
import AnimatedCounter from '@/components/ui/animated-counter';

const stats = [
  {
    id: 'years',
    icon: Calendar,
    value: 36,
    suffix: '+',
    label: ['Anos no', 'mercado'],
    accent: 'left'
  },
  {
    id: 'vehicles',
    icon: Truck,
    value: 1400000,
    suffix: '+',
    label: ['Veículos', 'transportados'],
    accent: 'right'
  },
  {
    id: 'bases',
    icon: Building2,
    value: 50,
    suffix: '+',
    label: ['Bases e', 'unidades'],
    accent: 'left'
  },
  {
    id: 'satisfaction',
    icon: Star,
    value: 99,
    suffix: '%',
    label: ['Satisfação', 'dos clientes'],
    accent: 'right'
  }
];

const StatsGrid = () => {
  return (
    <section className="section-shell section-shell--muted">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-24 hidden h-72 w-72 rounded-full bg-gabardo-light-blue/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-16 bottom-0 hidden h-80 w-80 rounded-full bg-gabardo-blue/10 blur-3xl lg:block" />

      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Nossos indicadores</span>
          <h2 className="section-heading mt-5">Resultados que sustentam a confiança Gabardo</h2>
          <p className="section-subheading mt-6">
            Performance consistente com tecnologia, cobertura nacional e experiência de quem lidera a logística automotiva há décadas.
          </p>
          <div className="section-divider mx-auto mt-10" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-[1.25rem] backdrop-blur-xl shadow-[0_35px_75px_-35px_RGBA(19,45,81,0.35)]"
              >
                <div
                  className={`pointer-events-none absolute -inset-24 hidden rounded-full blur-3xl transition-transform duration-500 group-hover:scale-105 ${
                    stat.accent === 'left' ? 'bg-gabardo-light-blue/20 md:block' : 'bg-gabardo-blue/15 md:block'
                  }`}
                  aria-hidden
                />
                <div className="relative flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gabardo-blue/70 shadow-sm">
                      <Icon className="h-5 w-5 text-gabardo-blue" strokeWidth={2.5} />
                      <span>Gabardo</span>
                    </div>
                    <motion.span
                      className="h-12 w-12 rounded-2xl bg-gradient-to-br from-gabardo-light-blue/90 to-gabardo-blue/90 opacity-80 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>

                  <div className="space-y-3">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-5xl font-extrabold uppercase tracking-tight text-gabardo-blue"
                    />
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-gabardo-blue/70">
                      {stat.label[0]}<br />{stat.label[1]}
                    </p>
                  </div>

                  <motion.div
                    className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-gabardo-blue/60"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <span>Desde 1989</span>
                    <span>Movimento Gabardo</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;