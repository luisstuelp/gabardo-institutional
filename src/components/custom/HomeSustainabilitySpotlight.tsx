'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Battery, Cloud, ArrowRight } from 'lucide-react';

const impactMetrics = [
  {
    id: 'co2-offset',
    label: 'Toneladas de CO₂ compensadas',
    value: '32.500 t',
    change: '+18% vs. 2023',
    icon: Cloud,
    progress: 0.78,
    description: 'Programa Gabardo CarbonSafe com auditoria SGS.'
  },
  {
    id: 'electric-fleet',
    label: 'Frota eletrificada',
    value: '18%',
    change: '+6 pts. YoY',
    icon: Battery,
    progress: 0.18,
    description: 'Implementação de veículos elétricos e híbridos em rotas urbanas.'
  },
  {
    id: 'route-optimisation',
    label: 'Rotas otimizadas com IA',
    value: '62%',
    change: '+24% eficiência logística',
    icon: Recycle,
    progress: 0.62,
    description: 'Menos quilometragem vazia, redução direta em emissões.'
  }
];

const commitmentPillars = [
  {
    title: 'Certificação Carbono Negativo',
    copy: 'Primeira transportadora da América Latina com certificação de emissões negativas em 2021.'
  },
  {
    title: 'Energia Renovável',
    copy: '100% dos pátios abastecidos por energia limpa, com usinas solares próprias.'
  },
  {
    title: 'Economia Circular',
    copy: 'Reaproveitamento de 92% de resíduos operacionais e embalagens retornáveis.'
  }
];

const HomeSustainabilitySpotlight = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0C1F3D] via-[#0C1F3D] to-[#071426] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.18),_transparent_55%)]" />
      <div className="absolute -left-32 top-16 h-64 w-64 rounded-full bg-gabardo-light-blue/10 blur-3xl" />
      <div className="absolute -right-24 -bottom-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-gabardo-light-blue/90 backdrop-blur">
              <Leaf className="h-4 w-4" />
              <span>Gabardo Impacto Ambiental</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Logística carbono negativo com tecnologia e compromisso
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-white/75">
              Lideramos a transição sustentável do transporte automotivo com soluções que reduzem emissões,
              digitalizam operações e criam impacto positivo comprovado. Cada cliente participa de um ecossistema
              medido, auditado e continuamente aprimorado.
            </p>

            <div className="space-y-6">
              {commitmentPillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-lg"
                >
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{pillar.copy}</p>
                </motion.div>
              ))}
            </div>

            <Link
              href="/sustentabilidade"
              className="inline-flex items-center gap-2 rounded-full border border-gabardo-light-blue/60 bg-gabardo-light-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-gabardo-light-blue hover:bg-gabardo-light-blue/20 transition-colors"
            >
              Ver plano ESG completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative grid gap-6"
          >
            {impactMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_35px_90px_-45px_rgba(8,18,34,0.9)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gabardo-light-blue/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-white/80">
                        <Icon className="h-4 w-4 text-gabardo-light-blue" />
                        <span>{metric.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/40">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-3xl font-semibold text-white">{metric.value}</p>
                      <p className="text-sm text-gabardo-light-blue/80">{metric.change}</p>
                    </div>
                    <p className="text-sm text-white/70">{metric.description}</p>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gabardo-light-blue"
                        style={{ width: `${Math.min(metric.progress, 1) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSustainabilitySpotlight;
