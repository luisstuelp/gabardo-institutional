'use client';

import { motion } from 'framer-motion';
import { Award, Leaf, Recycle, ArrowDownToLine } from 'lucide-react';

const actionCards = [
  {
    title: 'Gestão de Resíduos 2024',
    description: '97,927 t de recicláveis tratados e 59,855 t destinados a coprocessamento controlado.',
    icon: Recycle,
    accent: 'from-gabardo-light-blue/40 via-gabardo-light-blue/20 to-transparent',
  },
  {
    title: 'Energia Fotovoltaica',
    description: '949,76 MWh gerados nas unidades, ampliando a participação de fontes renováveis na matriz.',
    icon: Leaf,
    accent: 'from-gabardo-blue/35 via-gabardo-light-blue/25 to-transparent',
  },
  {
    title: 'Inventário GEE 2024',
    description: 'Escopo 1: 57.664,58 tCO₂e • Escopo 2: 46,399 tCO₂e • Escopo 3: 173,594 tCO₂e.',
    icon: ArrowDownToLine,
    accent: 'from-gabardo-blue/30 via-gabardo-light-blue/20 to-transparent',
  },
];

const programHighlights = [
  'Capturamos carbono via projetos proprietários, restauração de matas ciliares e parcerias locais de preservação.',
  'Monitoramento digital assegura rastreabilidade do crédito, com dashboards conectados a indicadores ESG.'
];

const metrics = [
  {
    icon: Recycle,
    value: '97,927 t',
    label: 'Recicláveis encaminhados',
    description:
      'Volume de papel, plástico, vidro e metal destinados à reciclagem em 2024.',
  },
  {
    icon: Recycle,
    value: '59,855 t',
    label: 'Coprocessamento de resíduos',
    description:
      'Resíduos não recicláveis conduzidos para coprocessamento com controle ambiental.',
  },
  {
    icon: Leaf,
    value: '949,76 MWh',
    label: 'Energia fotovoltaica',
    description:
      'Geração solar total do ano, reduzindo o consumo de fontes fósseis.',
  },
  {
    icon: ArrowDownToLine,
    value: '55.868 tCO₂e',
    label: 'Emissões totais 2024',
    description:
      'Inventário consolidado dos escopos 1, 2 e 3 reportado no GHG Protocol.',
  },
];

const CarbonCompensationSection = () => {
  return (
    <section className="relative overflow-visible bg-white py-20 text-gabardo-blue">
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

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-x-16">
          {/* Left Column - Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rounded-3xl border border-gabardo-blue/15 bg-white/95 p-6 shadow-lg lg:sticky lg:top-24"
          >
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-2xl font-semibold text-gabardo-blue">
                Impacto em Números
              </h3>
              <p className="text-sm text-slate-600">
                Transparência e dados confiáveis guiando nossas metas ambientais e sociais.
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const isGreenMetricIcon = metric.icon === Leaf;
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

          {/* Right Column - Redesigned Cards */}
          <div className="space-y-8">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              const isGreenIcon = card.icon === Leaf;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/95 p-6 md:p-8 shadow-xl"
                  style={{ boxShadow: '0 25px 60px -30px rgba(19, 45, 81, 0.28)' }}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-90`} />
                  <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex items-start gap-4 md:gap-5">
                      <div
                        className={`flex h-14 w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-gabardo-blue/15 bg-white shadow-md ${isGreenIcon ? 'text-emerald-500' : 'text-gabardo-blue'}`}
                      >
                        <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.12em] text-gabardo-blue leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gabardo-light-blue via-gabardo-blue to-gabardo-light-blue" />
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: actionCards.length * 0.08 }}
              className="relative overflow-hidden rounded-3xl border-2 border-gabardo-blue/20 bg-white p-6 md:p-8 shadow-xl"
              style={{ boxShadow: '0 25px 60px -30px rgba(19, 45, 81, 0.28)' }}
            >
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="flex h-14 w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-gabardo-blue/15 bg-gradient-to-br from-gabardo-light-blue/20 to-gabardo-blue/20 text-gabardo-blue shadow-md">
                    <Award className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-[0.15em] text-gabardo-blue leading-tight">
                      Programa Carbono Negativo Gabardo
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      O inventário GEE 2024, auditado pela Worton ESG, confirmou saldo negativo de -23.890,90 tCO₂e e um estoque de 81.775,48 tCO₂e capturados em reflorestamento, regeneração de matas e bioengenharia. Esse excedente assegura compensação integral das emissões logísticas, amplia o impacto climático equivalente a mais de 1,1 milhão de árvores.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {programHighlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-gabardo-blue/15 bg-gradient-to-br from-gabardo-light-blue/10 via-white to-white p-5 text-sm text-slate-600 leading-relaxed"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gabardo-blue via-gabardo-light-blue to-gabardo-blue" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarbonCompensationSection;
