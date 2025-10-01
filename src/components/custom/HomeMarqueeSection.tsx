'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollMarquee from '@/components/ui/ScrollMarquee';

const messages = [
  '36 anos de confiança',
  'Operações integradas para a cadeia automotiva',
  'Gestão ESG e certificações ISO',
  'Cobertura nacional com mais de 50 bases',
  'Tecnologia, eficiência e segurança para cada entrega'
];

const highlightMoments = [
  'Pátios homologados para OEMs em RS, SP e PR',
  'Centro de controle 24/7 com telemetria em tempo real',
  'Planos ESG conectando eficiência energética e frota dedicada'
];

const testimonialQuotes = [
  {
    quote: 'Reduzimos 22% de tempo de entrega com a roteirização da Gabardo.',
    author: 'Diretor de Logística, OEM premium'
  },
  {
    quote: 'A transparência dos relatórios ESG fortaleceu nossa cadeia de sustentabilidade.',
    author: 'Gerente de Sustentabilidade, grupo automotivo'
  },
  {
    quote: 'Monitoramento em tempo real garante 100% de visibilidade para nossa rede.',
    author: 'Head de Operações, rede de concessionárias'
  }
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
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <span className="section-eyebrow">Movimento Gabardo</span>
            <h2 className="section-heading mt-5">Fluxo contínuo de inovação e desempenho</h2>
            <p className="section-subheading mt-6 text-gabardo-blue/80">
              Compromisso diário com alta performance logística, sustentabilidade e tecnologia para movimentar cada etapa da cadeia automotiva.
            </p>
            <div className="section-divider mx-auto mt-10 lg:mx-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="group relative overflow-hidden rounded-[32px] border border-white/65 bg-white/50 shadow-[0_45px_90px_-45px_rgba(19,45,81,0.45)] backdrop-blur-2xl"
          >
            <Image
              src="/images/Trans Gabardo - Framers produtora -5475.JPG"
              alt="Equipe Gabardo em operação"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              priority
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-[#0B1B31]/60 to-[#132D51]/85 mix-blend-multiply" />
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:bg-gabardo-light-blue/15 group-hover:opacity-100" />
            <div className="relative space-y-6 p-10 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-gabardo-blue">
                Bastidores Gabardo
              </span>
              <h3 className="text-2xl font-semibold leading-tight">Operações que conectam frota, pessoas e tecnologia</h3>
              <p className="text-sm text-white/80">
                Da roteirização ao monitoramento de pátios, nossos squads operacionais unem experiência em campo e dados em tempo real para entregar cada veículo com excelência.
              </p>
              <ul className="space-y-2 text-sm text-white/82">
                {highlightMoments.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

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

          <ScrollMarquee
            delay={520}
            baseVelocity={1.2}
            className="text-[0.9rem] sm:text-base font-medium text-gabardo-blue/90 before:from-transparent after:from-transparent"
          >
            {testimonialQuotes
              .map(({ quote, author }) => `“${quote}” — ${author}`)
              .join('   •   ')}
          </ScrollMarquee>
        </div>
      </div>
    </section>
  );
};

export default HomeMarqueeSection;
