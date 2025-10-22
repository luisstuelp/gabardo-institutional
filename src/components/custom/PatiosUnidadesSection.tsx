'use client';

import { motion } from 'framer-motion';
import { 
  Building2,
  Wrench,
  Shield,
  Zap,
  Sun,
  CheckCircle2,
  Gauge,
  Users
} from 'lucide-react';

const infraCards = [
  {
    icon: Building2,
    title: 'Pátios',
    value: '27k+',
    label: 'veículos',
    items: ['Layout otimizado', 'Iluminação LED', 'Docas cobertas']
  },
  {
    icon: Wrench,
    title: 'Boxes',
    value: '77',
    label: 'unidades',
    items: ['Climatizados', 'Equipados', 'Checklists digitais']
  },
  {
    icon: CheckCircle2,
    title: 'PDI',
    value: '127',
    label: 'pontos',
    items: ['Digital', 'OBD-II', 'Certificação']
  },
  {
    icon: Shield,
    title: 'Segurança',
    value: '24/7',
    label: 'CFTV',
    items: ['Monitoramento', 'Acesso biométrico', 'Portaria']
  },
  {
    icon: Zap,
    title: 'Conectividade',
    value: '10Gbps',
    label: 'SD-WAN',
    items: ['Redundante', 'Backup noturno', 'Monitorado']
  },
  {
    icon: Sun,
    title: 'Solar',
    value: '1.470',
    label: 'kWp',
    items: ['Sustentável', 'Próprio', 'Carbono zero']
  }
];

const regionData = [
  { region: 'Sul', units: 4, capacity: '3.5k' },
  { region: 'Sudeste', units: 4, capacity: '13.7k' },
  { region: 'Centro-Oeste', units: 1, capacity: '10k' },
  { region: 'Nordeste', units: 2, capacity: '200' }
];

const highlights = [
  { icon: Building2, label: 'Unidades', value: '11' },
  { icon: Gauge, label: 'Capacidade', value: '27k+' },
  { icon: Users, label: 'Área Coberta', value: '60k m²' },
  { icon: Sun, label: 'Energia Solar', value: '1.470 kWp' }
];

export default function PatiosUnidadesSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-12 sm:py-16">
      <div className="absolute -left-16 top-10 -z-10 h-48 w-48 rounded-full bg-gabardo-blue/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-gabardo-light-blue/20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue"
          >
            <Building2 className="h-4 w-4" />
            Infraestrutura
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight"
          >
            Pátios e Unidades
          </motion.h2>
        </div>

        {/* Regional Stats - Compact Row */}
        <div className="mx-auto mb-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          {regionData.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-gabardo-blue/20 bg-white p-4 text-center shadow-md"
            >
              <div className="mb-1 text-2xl font-bold text-gabardo-blue">{region.units}</div>
              <div className="text-xs font-semibold text-gray-600">{region.region}</div>
              <div className="mt-1 text-xs text-gray-500">{region.capacity}</div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure Grid - 3x2 Compact Cards */}
        <div className="mx-auto mb-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infraCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-gabardo-blue/20 bg-white p-5 shadow-lg transition-all hover:border-gabardo-blue/40 hover:shadow-xl"
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gabardo-blue/10">
                    <Icon className="h-6 w-6 text-gabardo-blue" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gabardo-blue">{card.value}</div>
                    <div className="text-xs text-gray-500">{card.label}</div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-gabardo-blue">{card.title}</h3>
                
                {/* Items */}
                <div className="space-y-1.5">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-gabardo-light-blue" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlights - Single Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 rounded-2xl border border-gabardo-blue/20 bg-white p-6 shadow-lg"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div key={highlight.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gabardo-blue/10">
                  <Icon className="h-5 w-5 text-gabardo-blue" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gabardo-blue">{highlight.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    {highlight.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
