'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SocialCommitmentSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f1f3a] via-[#152746] to-[#0f1f3a] py-12 sm:py-16 md:py-20 lg:py-24 text-white">
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

      <div className="relative container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center px-2 sm:px-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/80">
            Compromisso social Gabardo
          </span>
          <h2 className="mt-4 sm:mt-5 md:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight">
            100% dos nossos programas sociais são auditados e vinculados a indicadores de impacto.
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-white/70">
            Mantemos o enunciado original reforçando a governança social com uma narrativa mais imersiva e dados que evidenciam a evolução contínua.
          </p>
        </motion.div>

        <div className="mt-16" />
      </div>
    </section>
  );
}
