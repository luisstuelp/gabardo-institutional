'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  SatelliteDish,
  ShieldCheck,
  Warehouse
} from 'lucide-react';

const infraHighlights = [
  {
    icon: MapPin,
    title: 'Logística Otimizada',
    description:
      'Pátios próprios com layout inteligente, docas cobertas e sistemas de movimentação que agilizam cada etapa da jornada do veículo.'
  },
  {
    icon: SatelliteDish,
    title: 'Controle em Tempo Real',
    description:
      'Sala de comando 24/7 com telemetria, monitoramento por câmeras IP e dashboards preditivos para tomada de decisão rápida.'
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e Conformidade',
    description:
      'Procedimentos certificados, gestão de acesso biométrico e protocolos de auditoria constantes para proteger ativos e informações.'
  }
];

const capabilityPillars = [
  'Manutenção preventiva em oficinas próprias',
  'Cadeia fria e sistemas de climatização dedicados',
  'Planos de contingência e redundância energética',
  'Integração com ERPs e TMS dos clientes'
];

const metrics = [
  { label: '60k m²', text: 'de estrutura coberta dedicada ao preparo de veículos' },
  { label: '99,2% SLA', text: 'de disponibilidade monitorada em nossos centros de controle' },
  { label: '24/7', text: 'monitoramento ativo com equipes especializadas' }
];

const MotionIconWrapper = ({ icon: Icon }: { icon: typeof Warehouse }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-light-blue/15 text-gabardo-blue">
    <Icon className="h-6 w-6" />
  </div>
);

const SobreQualidadeInfraestruturaSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-gabardo-light-blue/10" />
      <div className="absolute -left-16 top-10 -z-10 h-48 w-48 rounded-full bg-gabardo-blue/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-gabardo-light-blue/20 blur-3xl" />
      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
              <Building2 className="h-4 w-4" />
              <span>Infraestrutura</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight text-gabardo-blue">
                Estrutura que garante qualidade em cada etapa
              </h2>
              <p className="max-w-3xl text-base sm:text-lg text-neutral-600">
                Investimos continuamente em tecnologia, instalações e processos para entregar uma operação robusta, resiliente e alinhada aos padrões mais exigentes do setor automotivo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilityPillars.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex items-start gap-3 rounded-2xl border border-gabardo-light-blue/30 bg-white/80 p-5 shadow-sm"
                >
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                  <span className="text-sm text-neutral-600">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid gap-4">
              {infraHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * index }}
                  className="group flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_15px_40px_-25px_rgba(19,45,81,0.35)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_-25px_rgba(19,45,81,0.45)]"
                >
                  <MotionIconWrapper icon={item.icon} />
                  <div>
                    <h3 className="text-lg font-semibold text-gabardo-blue">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-2xl border border-gabardo-blue/15 bg-white/90 p-5 text-center shadow-sm"
                >
                  <span className="block text-2xl font-bold text-gabardo-blue">{metric.label}</span>
                  <span className="mt-2 block text-xs text-neutral-500">{metric.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreQualidadeInfraestruturaSection;
