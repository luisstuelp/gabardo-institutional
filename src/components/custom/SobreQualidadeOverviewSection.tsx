'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe2, Factory } from 'lucide-react';

const pillars = [
  {
    title: 'Melhoria Contínua',
    description:
      'Auditorias internas frequentes, indicadores atualizados e planos de ação integrados ao nosso Sistema de Gestão da Qualidade.',
    stats: '7,04h',
    statsLabel: 'Média anual de treinamento por colaborador em 2024',
  },
  {
    title: 'Gestão Sustentável',
    description:
      'Uso de matriz energética limpa, inventário de emissões desde 2017 e neutralização total de CO₂ no programa Carbono Neutro.',
    stats: '100%',
    statsLabel: 'Emissões neutralizadas no inventário GHG Protocol',
  },
  {
    title: 'Segurança em Primeiro Lugar',
    description:
      'Processos certificados para segurança viária, checklist eletrônico e central de controle operacional 24/7.',
    stats: '0,30%',
    statsLabel: 'Índice anual de avarias gerais — muito abaixo da meta setorial',
  },
];

const SobreQualidadeOverviewSection: React.FC = () => {
  const qualityBadges = [
    {
      icon: ShieldCheck,
      title: 'OEA - Receita Federal',
      description: 'Operador Econômico Autorizado com processos aduaneiros auditados e rastreados.',
    },
    {
      icon: Award,
      title: 'Selo Verde 2024',
      description: 'Reconhecimento por práticas ambientais e gestão de resíduos certificadas.',
    },
    {
      icon: Globe2,
      title: 'Pacto Global ONU',
      description: 'Compromisso público com os 10 princípios de sustentabilidade e direitos humanos.',
    },
    {
      icon: Factory,
      title: 'ISO 45001 em implantação',
      description: 'Programa estruturado de saúde e segurança ocupacional em fase final de certificação.',
    },
  ];
  return (
    <section className="relative bg-white py-24 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <span className="text-xs font-semibold tracking-[0.4em] uppercase text-gabardo-blue/80">Qualidade integral</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gabardo-blue">
            Sistemas certificados, pessoas preparadas e resultados comprovados
          </h2>
          <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
            Na Gabardo, qualidade é cultura. Integrando ISO 9001, ISO 14001 e ISO 39001, colocamos gestão, sustentabilidade
            e segurança em um mesmo ecossistema. Nossos times são capacitados continuamente, apoiados por tecnologia em
            tempo real e por indicadores auditáveis, garantindo excelência em cada operação logística.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {qualityBadges.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45 }}
                  className="group relative overflow-hidden rounded-2xl border border-gabardo-blue/10 bg-gradient-to-br from-white via-white to-gabardo-light-blue/10 p-5 shadow-[0_18px_40px_-28px_rgba(19,45,81,0.22)]"
                >
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gabardo-blue/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  <div className="relative flex flex-col gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gabardo-blue/10 text-gabardo-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gabardo-blue">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(19,45,81,0.2)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-30px_rgba(19,45,81,0.32)]"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-gabardo-light-blue">
                {pillar.title}
              </div>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gabardo-blue">{pillar.stats}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">KPI</span>
              </div>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{pillar.statsLabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreQualidadeOverviewSection;
