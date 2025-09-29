'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Timer, Globe2, Leaf, Users } from 'lucide-react';

const cards = [
  {
    icon: ShieldCheck,
    label: 'Governança e Compliance',
    title: 'Certificações que asseguram confiança',
    description:
      'ISO 9001, 14001 e 39001, além de auditorias recorrentes, sustentam nossa cultura de excelência operacional e segurança viária.',
    accent: '#38B6FF'
  },
  {
    icon: Timer,
    label: 'Lead time otimizado',
    title: 'Resposta rápida para demandas complexas',
    description:
      'Monitoramento 24/7 combinando torre de controle e analytics preditivo reduz ocorrências e garante entregas dentro do SLA.',
    accent: '#00F7FF'
  },
  {
    icon: Globe2,
    label: 'Cobertura estratégica',
    title: 'Integração nacional e operações internacionais',
    description:
      'Bases em regiões-chave conectam montadoras, pátios e portos. Atendimento a operações de importação e exportação com parceiros globais.',
    accent: '#4BFFB4'
  },
  {
    icon: Leaf,
    label: 'Agenda ESG',
    title: 'Sustentabilidade como padrão operacional',
    description:
      'Projetos de energia limpa, gestão de resíduos e renovação de frota reduzem emissões e fortalecem compromissos ESG.',
    accent: '#7DFF4B'
  },
  {
    icon: Sparkles,
    label: 'Inovação contínua',
    title: 'Tecnologia aplicada a cada fase da jornada',
    description:
      'Digital twins, IoT embarcado e integrações com ERPs dos clientes garantem visibilidade ponta a ponta.',
    accent: '#F4A8FF'
  },
  {
    icon: Users,
    label: 'Equipe especializada',
    title: 'Talentos que impulsionam resultados',
    description:
      'Programa de capacitação constante e cultura de colaboração entregam atendimento consultivo e ágil.',
    accent: '#FFB347'
  }
];

const HomeHoverCardsSection = () => {
  return (
    <section className="relative bg-white py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.08),_transparent_65%)]" />
      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] text-gabardo-blue/80"
          >
            Diferenciais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-gabardo-blue"
          >
            Experiências de logística premium para a nova era automotiva
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base text-neutral-600"
          >
            Selecionei pontos-chave das nossas operações para mostrar como alinhamos performance, sustentabilidade e inovação nas
            entregas diárias aos clientes.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                whileHover={{ y: -8, rotate: -0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-[0_25px_55px_-40px_rgba(14,28,51,0.65)] transition-all duration-300"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(140deg, ${card.accent}33, transparent 65%)`
                  }}
                />
                <div className="relative space-y-4">
                  <div
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-neutral-500"
                  >
                    <Icon size={16} className="text-gabardo-blue" />
                    {card.label}
                  </div>
                  <h3 className="text-xl font-semibold text-gabardo-blue">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {card.description}
                  </p>
                  <motion.span
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gabardo-blue"
                    whileHover={{ gap: 8 }}
                  >
                    Saiba mais
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </div>
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(56,182,255,0.22),_transparent_65%)] blur-md" />
                <div className="absolute -left-14 -bottom-14 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(19,45,81,0.18),_transparent_70%)] blur-md" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHoverCardsSection;
