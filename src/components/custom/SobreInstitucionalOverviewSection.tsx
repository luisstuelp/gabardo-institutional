'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Network, ShieldCheck, Cpu, Users } from 'lucide-react';

const pillars = [
  {
    icon: Building2,
    title: 'Governança corporativa',
    description:
      'Comitês executivos e diretoria atuam com processos claros, indicadores estratégicos e compliance rigoroso.',
    image: {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      position: 'center',
    },
    highlights: [
      'Comitês de risco e ESG ativos',
      'Relatórios trimestrais auditados',
    ],
  },
  {
    icon: Network,
    title: 'Operações integradas',
    description:
      'Centros de controle monitoram operações em tempo real, conectando unidades em todo o Brasil.',
    image: {
      src: 'https://images.unsplash.com/photo-1521120413309-42c41756ad40?auto=format&fit=crop&w=1200&q=80',
      position: 'center',
    },
    highlights: [
      'Torre de controle 24/7',
      'Integração com hubs nacionais',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Gestão de riscos',
    description:
      'Programas contínuos de avaliação de riscos, auditorias internas e planos de contingência.',
    image: {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      position: 'center',
    },
    highlights: [
      'Cobertura nacional de seguros',
      'Protocolos certificados ISO',
    ],
  },
  {
    icon: Cpu,
    title: 'Tecnologia aplicada',
    description:
      'Sistemas próprios de gestão, telemetria embarcada e analytics para decisões orientadas por dados.',
    image: {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      position: 'center',
    },
    highlights: [
      'IA proprietária para rotas',
      'Telemetria embarcada em tempo real',
    ],
  },
  {
    icon: Users,
    title: 'Equipe multidisciplinar',
    description:
      'Profissionais em logística, TI, jurídico e atendimento trabalhando juntos para a melhor experiência.',
    image: {
      src: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f77b?auto=format&fit=crop&w=1200&q=80',
      position: 'center',
    },
    highlights: [
      'Academia corporativa contínua',
      'Cultura centrada no cliente',
    ],
  },
];

const SobreInstitucionalOverviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePillar = pillars[activeIndex];

  return (
    <section
      id="estrutura-institucional"
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-gabardo-blue/10 blur-[120px]"
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Uma empresa preparada para entregar resultados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-4xl mx-auto"
          >
            A Gabardo une governança, infraestrutura e tecnologia para garantir que cada etapa da jornada de transporte seja executada com excelência.
            Conheça os pilares que sustentam nossa operação premium e acompanhe os indicadores que monitoramos diariamente.
          </motion.p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-4xl relative overflow-hidden rounded-[28px] border border-gabardo-blue/10 bg-white/70 p-6 shadow-lg backdrop-blur-sm">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-sm uppercase tracking-[0.32em] text-gabardo-blue"
              >
                Pilares institucionais
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-3 text-base text-gray-600"
              >
                Explore cada pilar passando o cursor ou tocando nas cartas abaixo. A imagem interativa reflete como o time coloca cada frente em prática.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                const isActive = activeIndex === index;

                return (
                  <motion.button
                    type="button"
                    key={pillar.title}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`group relative overflow-hidden rounded-3xl border px-6 py-7 text-left shadow-sm transition-all duration-400 backdrop-blur-sm ${
                      isActive
                        ? 'border-gabardo-blue/50 bg-white'
                        : 'border-gray-200 bg-white/70 hover:border-gabardo-blue/30 hover:bg-white'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="inline-flex items-center gap-3">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-gabardo-blue transition-all ${
                          isActive ? 'border-gabardo-blue bg-gabardo-blue/10' : 'border-gabardo-blue/20 bg-gabardo-blue/5'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Pilar</span>
                          <h3 className="text-lg font-semibold text-gray-900">{pillar.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{pillar.description}</p>
                      <motion.div
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em]"
                        animate={{ color: isActive ? '#133551' : '#6b7280' }}
                        transition={{ duration: 0.3 }}
                      >
                        {isActive ? 'Explorando' : 'Ver detalhes'}
                        <motion.span
                          animate={{ x: isActive ? 6 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                    <motion.div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        isActive ? 'opacity-100' : ''
                      }`}
                      style={{
                        background: 'radial-gradient(circle at top right, rgba(56,182,255,0.14), transparent 70%)',
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative flex flex-col gap-6">
            <motion.div
              layout
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-white/40 bg-gray-900 shadow-[0_35px_85px_-45px_rgba(18,45,81,0.55)]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.title}
                  initial={{ opacity: 0.4, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(160deg, rgba(14,29,53,0.65), rgba(14,29,53,0.2)), url(${activePillar.image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: activePillar.image.position,
                  }}
                />
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80">
                    Pilar em foco
                  </span>
                  <h3 className="text-3xl font-semibold text-white">
                    {activePillar.title}
                  </h3>
                  <p className="text-sm text-white/80 md:text-base">
                    {activePillar.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {activePillar.highlights.map((highlight) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 text-sm text-white/85 backdrop-blur-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-gabardo-blue" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {pillars.map((pillar, index) => (
                <button
                  key={`${pillar.title}-thumb`}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden rounded-2xl border transition-all ${
                    activeIndex === index
                      ? 'border-gabardo-blue/60 ring-2 ring-gabardo-blue/40'
                      : 'border-white/20 hover:border-gabardo-blue/40'
                  }`}
                >
                  <div
                    className="h-24 w-full"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(19,45,81,0.45), rgba(19,45,81,0.2)), url(${pillar.image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: pillar.image.position,
                    }}
                  />
                  <span className="absolute inset-x-2 bottom-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOverviewSection;
