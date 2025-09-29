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
    <section className="relative overflow-hidden bg-white py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.08),_transparent_65%)]" />
      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-gabardo-blue/70">
            Movimento Gabardo
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-gabardo-blue">
            Fluxo contínuo de inovação e desempenho
          </h2>
        </motion.div>

        <div className="mt-14 space-y-8">
          <ScrollMarquee
            delay={300}
            baseVelocity={1.2}
            className="font-semibold uppercase tracking-[0.3em] text-[#102544] before:from-white/96 after:from-white/96"
          >
            {messages.join('   •   ')}
          </ScrollMarquee>

          <ScrollMarquee
            delay={450}
            baseVelocity={1.6}
            className="font-semibold uppercase tracking-[0.3em] text-[#1F4C7A] before:from-white/96 after:from-white/96"
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
