'use client';

import { motion } from 'framer-motion';
import ScrollMarquee from '@/components/ui/ScrollMarquee';

const messages = [
  '36 anos de confiança',
  'Operações integradas para a cadeia automotiva',
  'Gestão ESG e certificações ISO',
  'Cobertura nacional com mais de 50 bases',
  'Tecnologia, eficiência e segurança para cada entrega'
];

const HomeMarqueeSection = () => {
  return (
    <section className="section-shell bg-white">
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.12),_transparent_68%)]" />
        <motion.div
          className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-gabardo-light-blue/15 blur-3xl"
          animate={{
            y: [0, -14, 0],
            opacity: [0.45, 0.6, 0.45]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gabardo-blue/12 blur-3xl"
          animate={{
            y: [0, 18, 0],
            opacity: [0.35, 0.5, 0.35]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </motion.div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="section-eyebrow">Movimento Gabardo</span>
          <h2 className="section-heading mt-5">Fluxo contínuo de inovação e desempenho</h2>
          <p className="section-subheading mt-6 text-gabardo-blue/80">
            Compromisso diário com alta performance logística, sustentabilidade e tecnologia para movimentar cada etapa da cadeia automotiva.
          </p>
          <div className="section-divider mx-auto mt-10" />
        </motion.div>

        <div className="mt-16 space-y-8">
          <ScrollMarquee
            delay={280}
            baseVelocity={1.1}
            className="font-semibold uppercase tracking-[0.28em] text-gabardo-blue/80 before:from-white/96 after:from-white/96"
          >
            {messages.join('   •   ')}
          </ScrollMarquee>

          <ScrollMarquee
            delay={420}
            baseVelocity={1.55}
            className="font-semibold uppercase tracking-[0.28em] text-gabardo-blue before:from-white/96 after:from-white/96"
          >
            {messages
              .map(message => message.replace('Gabardo', 'Gabardo Distribuidora'))
              .join('   •   ')}
          </ScrollMarquee>
        </div>
      </div>
    </section>
  );
};

export default HomeMarqueeSection;
