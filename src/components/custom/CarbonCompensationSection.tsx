'use client';

import { motion } from 'framer-motion';
import { Award, Leaf, Recycle, Trees, ArrowDownToLine, Users } from 'lucide-react';

const actionCards = [
  {
    title: 'Mais Árvores',
    description: '26,54 hectares de eucalipto com 27.706 mudas plantadas e preservação permanente.',
    icon: Trees,
    accent: 'from-gabardo-light-blue/40 via-gabardo-light-blue/20 to-transparent',
  },
  {
    title: 'Menos CO₂',
    description: 'Neutralização de 100% das emissões certificadas em toda a cadeia logística.',
    icon: Recycle,
    accent: 'from-gabardo-blue/35 via-gabardo-light-blue/25 to-transparent',
  },
  {
    title: 'Menos Impacto Negativo',
    description: 'Mitigamos impactos ambientais com gestão circular de resíduos e monitoramento contínuo.',
    icon: Leaf,
    accent: 'from-gabardo-blue/30 via-gabardo-light-blue/20 to-transparent',
  },
];


const metrics = [
  {
    icon: ArrowDownToLine,
    value: '12%',
    label: 'Redução de Emissões CO₂',
    description:
      'Desde 2022 reduzimos 12% das emissões por km rodado com renovação de frota e rotas eficientes.',
  },
  {
    icon: Leaf,
    value: '45%',
    label: 'Energia Renovável',
    description:
      '45% da energia consumida em sedes e pátios já é proveniente de fontes renováveis certificadas.',
  },
  {
    icon: Recycle,
    value: '300t',
    label: 'Resíduos Reciclados',
    description:
      'Mais de 300 toneladas de pneus, óleos e resíduos técnicos receberam destinação correta em 2023.',
  },
  {
    icon: Users,
    value: '1.200+',
    label: 'Pessoas Impactadas',
    description:
      'Programas socioambientais e de segurança no trânsito alcançaram mais de 1.200 pessoas.',
  },
];

const CarbonCompensationSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-gabardo-blue">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,182,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(19,45,81,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(19,45,81,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center space-y-6"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/15 bg-gabardo-light-blue/10 px-4 py-2 text-[11px] font-semibold tracking-[0.35em] uppercase text-gabardo-blue">
            Ambiental • GEE
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-gabardo-blue md:text-4xl lg:text-[2.9rem]">
            Compensação de Emissões de Gases de Efeito Estufa (GEE)
          </h2>
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            Expandimos nossos projetos de reflorestamento e créditos verdes para compensar cada tonelada de CO₂ emitida. Os indicadores a seguir fazem parte da estratégia carbono negativo Gabardo.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-16 lg:gap-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rounded-3xl border border-gabardo-blue/15 bg-white/95 p-6 shadow-lg lg:row-start-1 lg:col-start-1"
          >
            <div className="flex flex-col gap-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue/70">
                Nossos Resultados
              </span>
              <h3 className="text-2xl font-semibold text-gabardo-blue">
                Impacto em Números
              </h3>
              <p className="text-sm text-slate-600">
                Transparência e dados confiáveis guiando nossas metas ambientais e sociais.
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const isGreenMetricIcon = metric.icon === Trees || metric.icon === Leaf;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-gabardo-blue/15 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gabardo-light-blue/15 ${isGreenMetricIcon ? 'text-emerald-500' : 'text-gabardo-blue'}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-semibold text-gabardo-blue">
                        {metric.value}
                      </span>
                      <h4 className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                        {metric.label}
                      </h4>
                      <p className="mt-2 text-xs text-slate-500">
                        {metric.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-6 lg:row-start-1 lg:col-start-2"
          >
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              const isGreenIcon = card.icon === Trees || card.icon === Leaf;
              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="group relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-gradient-to-br from-white via-white to-gabardo-light-blue/10 p-6 shadow-lg"
                  style={{
                    boxShadow: '0 25px 60px -30px rgba(19, 45, 81, 0.2)',
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-gabardo-blue/15 bg-white ${isGreenIcon ? 'text-emerald-500' : 'text-gabardo-blue'}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold uppercase tracking-[0.18em] text-gabardo-blue">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-gabardo-light-blue via-gabardo-blue/40 to-gabardo-light-blue"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid gap-6 rounded-3xl border border-gabardo-blue/20 bg-white p-6 shadow-lg lg:row-start-2 lg:col-start-2 lg:-mt-20 xl:-mt-24"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gabardo-blue/15 bg-white text-gabardo-blue">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold uppercase tracking-[0.22em] text-gabardo-blue">
                  Programa Carbono Negativo Gabardo
                </h3>
                <p className="text-sm text-slate-600">
                  Inventário GEE auditado, selo GHG Protocol Prata 2025 e compromissos net zero 2030 guiando nossas operações.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gabardo-blue/15 bg-gradient-to-br from-gabardo-light-blue/15 via-white to-white p-4 text-sm text-slate-600">
                Capturamos carbono via projetos proprietários, restauração de matas ciliares e parcerias locais de preservação.
              </div>
              <div className="rounded-2xl border border-gabardo-blue/15 bg-gradient-to-br from-gabardo-light-blue/15 via-white to-white p-4 text-sm text-slate-600">
                Monitoramento digital assegura rastreabilidade do crédito, com dashboards conectados a indicadores ESG.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarbonCompensationSection;
