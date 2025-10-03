'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const governancePillars = [
  'Conselho consultivo com representatividade multidisciplinar',
  'Políticas corporativas revisadas anualmente e aprovadas pelo board',
  'Controles internos e auditorias independentes para processos críticos',
  'Compliance e LGPD com treinamentos obrigatórios e certificações',
  'Canal de ética 100% anônimo e monitorado por empresa externa',
  'Relatórios periódicos para stakeholders e transparência de indicadores'
];

export default function GovernanceEASGSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#101d39] via-[#13294c] to-[#0f1f3a] py-24 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5605.JPG"
          alt="Estrutura de governança Gabardo"
          fill
          className="object-cover opacity-25"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" aria-hidden />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Estrutura de governança integrada
            </span>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              Com uma agenda robusta ESG, dedicamos comitês e ferramentas de compliance para garantir transparência, mitigação de riscos e sustentabilidade de longo prazo.
            </p>
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
              className="space-y-3"
            >
              {governancePillars.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/80 backdrop-blur"
                >
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative isolate flex h-[360px] items-center justify-center overflow-hidden rounded-[32px] border border-white/25 bg-white/10 shadow-[0_40px_90px_-60px_rgba(4,12,24,0.65)] backdrop-blur"
          >
            <motion.div
              aria-hidden
              initial={{ rotate: -3, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-6 rounded-[26px] border border-white/20 bg-gradient-to-br from-white/15 via-transparent to-emerald-200/25"
            />
            <Image
              src="/images/Trans Gabardo - Framers produtora -5605.JPG"
              alt="Estrutura de governança Gabardo"
              fill
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white">
              Comitês ESG, financeiro e pessoas
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
