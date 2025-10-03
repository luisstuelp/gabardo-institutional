'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, TrendingUp } from 'lucide-react';

const socialTimeline = [
  {
    year: '2017',
    title: 'Auditoria independente',
    description: 'Programa social passa a ter indicadores auditados anualmente pela SGS, reforçando transparência e governança.'
  },
  {
    year: '2019',
    title: 'Rede de apoio ao motorista',
    description: 'Centros de acolhimento 24/7 entregam assistência jurídica, saúde preventiva e orientação financeira para famílias.'
  },
  {
    year: '2021',
    title: 'Academia Jovem Gabardo',
    description: 'Lançamento de trilhas de capacitação digital para jovens das comunidades vizinhas às operações logísticas.'
  },
  {
    year: '2023',
    title: 'Certificação carbono negativo',
    description: 'Resultados sociais integram o relatório de carbono negativo, evidenciando o impacto além das emissões.'
  }
];

export default function SocialCommitmentSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1f3a] via-[#152746] to-[#0f1f3a] py-24 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5577.JPG"
          alt="Compromisso social"
          fill
          className="object-cover opacity-25"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" aria-hidden />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Compromisso social Gabardo
          </span>
          <h2 className="mt-6 text-3xl font-bold uppercase tracking-tight md:text-5xl">
            100% dos nossos programas sociais são auditados e vinculados a indicadores de impacto.
          </h2>
          <p className="mt-6 text-base text-white/70 md:text-lg">
            Mantemos o enunciado original reforçando a governança social com uma narrativa mais imersiva e dados que evidenciam a evolução contínua.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 grid gap-6 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
        >
          <div className="grid gap-4 text-left sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Users className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Engajamento</p>
                <p className="text-lg font-semibold">74% das lideranças formadas internamente</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <TrendingUp className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Investimento anual</p>
                <p className="text-lg font-semibold">R$ 6,2 mi dedicados a programas comunitários</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Award className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Governança</p>
                <p className="text-lg font-semibold">Certificações ISO renovadas com auditoria independente</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-white">Linha do tempo social</h3>
            <p className="mt-3 text-sm text-white/70">
              Evolução dos programas sociais da Gabardo, mantendo o conteúdo original conectado a uma visualização moderna.
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
                  staggerChildren: 0.15
                }
              }
            }}
            className="space-y-6"
          >
            {socialTimeline.map((item) => (
              <motion.li
                key={item.year}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white/60">{item.year}</span>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                </div>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
