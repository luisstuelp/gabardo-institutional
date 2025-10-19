'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SobreHistoriaCTASection = () => {
  return (
    <section className="section-shell section-shell--contrast text-white">
      <div className="section-container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-4xl"
        >
          <span className="section-eyebrow text-gabardo-light-blue/80">Próximo capítulo</span>
          <h2 className="section-heading mt-5 text-white">
            Vamos construir novas conquistas com a Gabardo
          </h2>
          <p className="section-subheading mt-6 text-white/70">
            Conecte-se com nosso time para destravar oportunidades estratégicas, projetos sob medida e experiências logísticas que impulsionam o futuro automotivo.
          </p>

          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-gabardo-blue transition duration-300"
              >
                <span>Fale com a Gabardo</span>
                <motion.span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gabardo-light-blue/80 to-gabardo-blue/80 text-white shadow-lg"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/solucoes"
                className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/80 transition duration-300 hover:border-white/80 hover:text-white"
              >
                <span>Conhecer soluções</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreHistoriaCTASection;
