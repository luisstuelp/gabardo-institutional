'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GovernanceClimateSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f7ff] via-white to-[#eef3ff] py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-gabardo-blue/12 blur-3xl" />
        <div className="absolute right-10 bottom-8 h-64 w-64 rounded-full bg-emerald-200/35 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/18 bg-gabardo-blue/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
              Integridade e Transparência
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gabardo-blue">
              Governança que conecta estratégia e confiança
            </h2>
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              A governança Gabardo assegura ética, conformidade e tomada de decisão responsável em toda a cadeia logística. Estruturamos conselhos e comitês que monitoram riscos, elaboram políticas e conectam a estratégia à agenda ESG.
            </p>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative isolate flex h-[380px] items-center justify-center overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_40px_90px_-60px_RGBA(15,31,58,0.45)] backdrop-blur"
          >
            <motion.div
              aria-hidden
              initial={{ rotate: -4, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-6 rounded-[26px] border border-gabardo-blue/15 bg-gradient-to-br from-gabardo-blue/8 via-transparent to-emerald-200/25"
            />
            <Image
              src="/images/Trans Gabardo - Framers produtora -5388.JPG"
              alt="Governança Gabardo"
              fill
              className="object-cover"
              priority={false}
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-gabardo-blue">
              Comitê executivo Transportes Gabardo
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
