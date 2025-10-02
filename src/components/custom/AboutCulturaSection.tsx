'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Leaf, GaugeCircle, Handshake } from 'lucide-react';

const commitments = [
  {
    id: 'pessoas',
    label: "Pessoas",
    title: 'Pessoas que evoluem juntas',
    description:
      'Programas de desenvolvimento, segurança integral e cultura colaborativa garantem equipes preparadas para liderar a transformação logística.',
    highlights: [
      'Universidade Gabardo com 40+ trilhas',
      'Planos de carreira transparentes',
      'Cuidado 360 para colaboradores',
    ],
    metric: {
      value: '89%',
      caption: 'Engajamento médio dos times',
    },
    accent: '#38B6FF',
    icon: Users,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'planeta',
    label: "Planeta",
    title: 'Planeta em equilíbrio',
    description:
      'A agenda Gabardo Carbono Negativo guia projetos de energia limpa, gestão circular e compensações certificadas em cada rota.',
    highlights: [
      'Carbono negativo certificado SGS',
      'Frota híbrida & elétrica em expansão',
      'Energia solar em hubs estratégicos',
    ],
    metric: {
      value: '-42%',
      caption: 'Redução de emissões por entrega',
    },
    accent: '#7DFF4B',
    icon: Leaf,
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'performance',
    label: "Performance",
    title: 'Performance com visão de futuro',
    description:
      'Analytics em tempo real, digital twins e ritos de governança garantem previsibilidade e decisões ágeis.',
    highlights: [
      'Torre de controle 24/7 integrada',
      'OKRs conectando diretoria e operações',
      'SLAs acima de 97% em contratos-chave',
    ],
    metric: {
      value: '97%',
      caption: 'SLA mantido em 2024',
    },
    accent: '#C5A8FF',
    icon: GaugeCircle,
    image:
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'parcerias',
    label: "Parcerias",
    title: 'Parcerias que ampliam impacto',
    description:
      'Conexões estratégicas com clientes, startups, comunidades e universidades criam soluções completas para a cadeia automotiva.',
    highlights: [
      'Co-inovação com montadoras líderes',
      'Programas sociais em comunidades locais',
      'Ecossistema de startups logísticas',
    ],
    metric: {
      value: '+120',
      caption: 'Parceiros ativos no ecossistema',
    },
    accent: '#FFB347',
    icon: Handshake,
    image:
      'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=1600&q=80',
  },
];

const AboutCulturaSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCommitment = useMemo(() => commitments[activeIndex], [activeIndex]);

  return (
    <section className="relative -mt-12 bg-gradient-to-b from-white via-[#f6f8fb] to-[#eef2f7] pb-24 pt-16">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          background:
            'radial-gradient(circle at 12% 20%, rgba(56,182,255,0.18), transparent 65%), radial-gradient(circle at 80% 25%, rgba(19,45,81,0.18), transparent 70%)',
        }}
      />
      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl space-y-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/30 bg-gabardo-blue/5 px-5 py-2 text-xs uppercase tracking-[0.32em] text-gabardo-blue"
            >
              4 P’s do compromisso Gabardo
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-semibold text-gabardo-blue md:text-4xl lg:text-5xl"
            >
              Nossa cultura orquestra pessoas, planeta, performance e parcerias
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-gray-600"
            >
              Ao lado dos nossos diferenciais operacionais, a cultura Gabardo cria continuidade: cada entrega nasce de compromissos claros com pessoas, meio ambiente, performance e relações duradouras.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[32px] border border-white/60 bg-white/80 px-6 py-5 text-sm text-gabardo-blue shadow-[0_25px_80px_-50px_rgba(14,28,51,0.45)] backdrop-blur"
          >
            Compromissos vivos que conectam talentos, inovação e responsabilidade em todas as frentes do negócio.
          </motion.div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            key={activeCommitment.id}
            layout
            className="relative overflow-hidden rounded-[36px] border border-white/50 bg-white/90 p-8 shadow-[0_40px_110px_-55px_rgba(13,28,55,0.45)] backdrop-blur"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCommitment.id}-bg`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(160deg, rgba(19,45,81,0.75), rgba(19,45,81,0.3)), url(${activeCommitment.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </AnimatePresence>
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{ opacity: 0.4 }}
              style={{
                background: `radial-gradient(circle at 20% 20%, ${activeCommitment.accent}33, transparent 70%)`,
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-6 text-white">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.32em]">
                  <activeCommitment.icon className="h-4 w-4" />
                  {activeCommitment.label}
                </div>
                <h3 className="text-3xl font-semibold md:text-4xl">{activeCommitment.title}</h3>
                <p className="text-sm text-white/80 md:text-base">{activeCommitment.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {activeCommitment.highlights.map((highlight) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 rounded-2xl bg-white/18 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur"
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                    {highlight}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white"
              >
                {activeCommitment.metric.value}
                <span className="text-white/70">{activeCommitment.metric.caption}</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={commitment.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`group relative flex items-center gap-5 rounded-3xl border px-6 py-5 text-left transition-all duration-500 ${
                    isActive
                      ? 'border-gabardo-blue/60 bg-white shadow-[0_24px_60px_-50px_rgba(15,32,58,0.55)]'
                      : 'border-white/40 bg-white/70 hover:border-gabardo-blue/40 hover:bg-white'
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    animate={{ opacity: isActive ? 0.2 : undefined }}
                    style={{
                      background: `linear-gradient(140deg, ${commitment.accent}26, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-gabardo-blue/20 bg-white text-gabardo-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs uppercase tracking-[0.32em] text-gabardo-blue/60">{commitment.label}</span>
                      <motion.span
                        className="text-xs uppercase tracking-[0.3em] text-gabardo-blue"
                        animate={{ opacity: isActive ? 1 : 0.5 }}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </motion.span>
                    </div>
                    <h4 className="text-lg font-semibold text-gabardo-blue">{commitment.title}</h4>
                    <p className="text-sm text-gray-600">{commitment.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCulturaSection;
