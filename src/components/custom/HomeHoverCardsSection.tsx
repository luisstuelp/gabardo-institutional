'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe2, Leaf, Users, Truck, Server, TrendingUp } from 'lucide-react';

const cards = [
  {
    icon: Globe2,
    label: 'Cobertura LATAM',
    title: 'Cobertura LATAM que antecipa demandas',
    description:
      'Bases no Sul, Sudeste, Centro-Oeste e Nordeste conectam importações, exportações e distribuição LATAM com habilitação aduaneira (DTA).',
    accent: '#4BFFB4',
    image: '/images/gabardo-hero-01.jpg',
    highlights: ['BASES EM 4 REGIÕES', 'COBERTURA 100% LATAM', 'HABILITAÇÃO DTA'],
  },
  {
    icon: Truck,
    label: 'Frota moderna',
    title: 'Frota jovem e padronizada',
    description:
      '1.311 caminhões, 1.061 cegonheiras e renovação contínua garantem disponibilidade com 79% de frota própria e idade média de 2 anos.',
    accent: '#38B6FF',
    image: '/images/gabardo-truck-fleet.JPG',
    highlights: ['79% FROTA PRÓPRIA', 'IDADE MÉDIA 2 ANOS', '1.311 CAMINHÕES'],
  },
  {
    icon: Server,
    label: 'Infraestrutura digital',
    title: 'Continuidade operacional garantida',
    description:
      'Rede SD-WAN, links redundantes e backups Oracle asseguram disponibilidade 24/7 para faturamento, CT-e, proxy/firewall e e-mail corporativo.',
    accent: '#00F7FF',
    image: '/images/GabardoBastidores.JPG',
    highlights: ['SD-WAN NACIONAL', 'BACKUPS ORACLE DIÁRIOS', 'PLANO DE CONTINGÊNCIA'],
  },
  {
    icon: Users,
    label: 'Experiência OEM',
    title: 'Integração OEM e visibilidade total',
    description:
      'PDI digital, telemetria embarcada e squads dedicados integram OEMs, pátios e concessionárias com rastreabilidade ponta a ponta.',
    accent: '#F4A8FF',
    image: '/images/GabardoEquipe2.JPG',
    highlights: ['PDI DIGITAL', 'TELEMETRIA 24/7', 'SQUADS DEDICADOS'],
  },
  {
    icon: TrendingUp,
    label: 'Resultados',
    title: 'Resultados operacionais comprovados',
    description:
      'Processos padronizados de investigação de avarias sustentam a entrega de 1.455.360 veículos transportados entre 2020 e 2024.',
    accent: '#FFB347',
    image: '/images/GabardoRef.JPG',
    highlights: ['1.455.360 VEÍCULOS', 'INVESTIGAÇÃO PADRONIZADA', 'MONITORAMENTO 24H'],
  },
  {
    icon: Leaf,
    label: 'ESG',
    title: 'Impacto ESG carbono negativo',
    description:
      'Inventários GEE anuais, programas de compensação e frota Euro 6 consolidam a primeira transportadora com produção de carbono negativa.',
    accent: '#7DFF4B',
    image: '/images/gabardo-hero-04.jpg',
    highlights: ['CARBONO NEGATIVO', 'GHG PROTOCOL 2017', 'META NET ZERO 2030'],
  },
];

const HomeHoverCardsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCard = useMemo(() => cards[activeIndex], [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(56,182,255,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(19,45,81,0.12), transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] text-gabardo-blue/80"
          >
            Diferenciais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mt-4 text-3xl font-semibold text-gabardo-blue md:text-4xl lg:text-5xl"
          >
            Experiências de logística premium para a nova era automotiva
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base text-neutral-600 md:max-w-3xl"
          >
            Navegue pelos pilares que moldam a jornada Gabardo. Cada foco revela como conectamos governança, inovação e pessoas para criar experiências ímpares em logística automotiva.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[0.95fr_1.05fr]">
          <div className="relative flex flex-col gap-8">
            <div className="absolute inset-0 -z-10 rounded-[38px] border border-gabardo-blue/10 bg-white/70 blur-3xl" />
            <div className="grid gap-5">
              {cards.map((card, index) => {
                const Icon = card.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={`${card.title}-flow`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className={`relative flex gap-4 rounded-3xl border px-5 py-4 backdrop-blur-md transition-all duration-500 ${
                      isActive
                        ? 'border-gabardo-blue/50 bg-gabardo-blue/8'
                        : 'border-white/40 bg-white/60 hover:border-gabardo-blue/30'
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-gabardo-blue shadow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-1">
                      <p className="text-sm font-semibold text-gabardo-blue">{card.title}</p>
                      <span className="text-xs uppercase tracking-[0.32em] text-gabardo-blue/60">{card.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gabardo-blue/30 text-gabardo-blue transition hover:bg-gabardo-blue hover:text-white"
                    >
                      •
                    </button>
                  </motion.div>
                );
              })}
            </div>

          </div>

          <div className="flex flex-col gap-8">
            <motion.div
              key={activeCard.title}
              layout
              className="relative overflow-hidden rounded-[34px] border border-white/40 bg-white/80 p-8 shadow-[0_45px_120px_-45px_rgba(19,45,81,0.35)] backdrop-blur"
            >
              <motion.div
                className="absolute inset-0 opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${activeCard.accent}33, transparent 60%)`,
                }}
              />
              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end">
                <div className="flex-1 space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/30 bg-gabardo-blue/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-gabardo-blue">
                    Ponto-chave
                  </span>
                  <h3 className="text-3xl font-semibold text-gabardo-blue md:text-4xl">
                    {activeCard.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {activeCard.description}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeCard.highlights.map((highlight) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue shadow-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-gabardo-blue" />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative h-60 w-full overflow-hidden rounded-3xl border border-gabardo-blue/20 bg-black/70 shadow-inner md:h-72 lg:w-64">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCard.title}-image`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(165deg, rgba(10,20,33,0.6), rgba(10,20,33,0.2)), url(${activeCard.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/80">
                    {activeCard.label}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[34px] border border-gabardo-blue/15 bg-gradient-to-br from-white via-gabardo-blue/5 to-white p-8 shadow-[0_35px_90px_-55px_rgba(13,28,55,0.4)]"
            >
              <div className="flex flex-col gap-5 text-gabardo-blue">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  <span className="text-xs uppercase tracking-[0.36em] text-gabardo-blue/70">Fluxo integrado</span>
                </div>
                <h3 className="text-2xl font-semibold">
                  Cada entrega combina governança, tecnologia e pessoas para criar uma jornada memorável aos clientes.
                </h3>
                <p className="text-sm text-gabardo-blue/70">
                  Nosso modelo conecta comitês, squads e hubs físicos em tempo real, garantindo previsibilidade e impacto socioambiental positivo.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Compliance', 'ESG', 'Tecnologia', 'Experiência do cliente'].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-gabardo-blue/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHoverCardsSection;
