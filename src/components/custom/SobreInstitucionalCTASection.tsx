'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SobreInstitucionalCTASection = () => {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-br from-gabardo-blue via-gabardo-blue-900 to-gabardo-blue text-white overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gabardo-light-blue/20 blur-[150px]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.32em] backdrop-blur-sm"
          >
            Fale Conosco
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Conheça mais sobre nossa <span className="text-gabardo-light-blue">instituição</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
            Queremos compartilhar mais detalhes sobre nossa estrutura, governança e capacidade operacional. Entre em contato conosco.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="pt-2"
          >
            <Link
              href="/contato"
              className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-white/95 text-gabardo-blue font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              <span>Entrar em contato</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreInstitucionalCTASection;
