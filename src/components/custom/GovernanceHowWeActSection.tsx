'use client';

import { motion } from 'framer-motion';
import { Shield, Scale, FileCheck, Users, Workflow } from 'lucide-react';

const governanceActions = [
  {
    icon: Shield,
    title: 'Programa de integridade',
    description: 'Políticas anticorrupção, canais de denúncia e auditorias independentes reforçam a ética em nossas operações.'
  },
  {
    icon: Scale,
    title: 'Compliance regulatório',
    description: 'Monitoramento contínuo de legislação, LGPD e normas ANTT com time jurídico dedicado.'
  },
  {
    icon: FileCheck,
    title: 'Gestão de riscos',
    description: 'Mapeamento corporativo de riscos com planos de contingência, matrizes de impacto e indicadores de governança.'
  },
  {
    icon: Users,
    title: 'Conselhos e comitês',
    description: 'Estrutura de governança com comitês ESG, financeiro e de pessoas, garantindo decisões colegiadas.'
  },
  {
    icon: Workflow,
    title: 'Padronização de processos',
    description: 'Metodologias e manuais corporativos asseguram consistência nas operações e na prestação de contas.'
  }
];

export default function GovernanceHowWeActSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eff3ff] via-white to-[#e8f1ff] py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-20 top-12 h-72 w-72 rounded-full bg-gabardo-blue/12 blur-3xl" />
        <div className="absolute left-14 bottom-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/18 bg-gabardo-blue/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
            Como garantimos governança sólida
          </span>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Ferramentas e rituais de governança asseguram transparência, compliance e decisões ágeis para sustentar a certificação carbono negativo.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {governanceActions.map(({ icon: Icon, title, description }) => (
            <motion.li
              key={title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              className="group h-full overflow-hidden rounded-3xl border border-gabardo-blue/12 bg-white/90 p-8 shadow-[0_28px_90px_-60px_rgba(19,45,81,0.45)] backdrop-blur transition-transform duration-300 hover:-translate-y-2"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-gabardo-blue">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
