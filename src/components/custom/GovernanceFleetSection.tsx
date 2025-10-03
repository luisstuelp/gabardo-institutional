'use client';

import { motion } from 'framer-motion';

const governanceHighlights = [
  {
    value: '100%',
    label: 'processos críticos auditados anualmente'
  },
  {
    value: '12',
    label: 'políticas corporativas monitoradas em tempo real'
  },
  {
    value: '4',
    label: 'comitês de governança e compliance ativos'
  },
  {
    value: '72h',
    label: 'tempo máximo de resposta a ocorrências registradas'
  }
];

export default function GovernanceFleetSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-white to-[#f6f9ff] py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-gabardo-blue/12 blur-3xl" />
        <div className="absolute left-12 bottom-0 h-64 w-64 rounded-full bg-emerald-200/35 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-gabardo-blue/18 bg-gabardo-blue/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
            Governança orientada por indicadores
          </span>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Nossos frameworks de compliance asseguram rastreabilidade, controle de riscos e tomada de decisão ágil para toda a operação logística.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {governanceHighlights.map((item) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="group rounded-3xl border border-gabardo-blue/12 bg-white/90 p-6 shadow-[0_24px_80px_-60px_rgba(19,45,81,0.45)] backdrop-blur transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="text-2xl md:text-3xl font-semibold text-gabardo-blue">{item.value}</div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
