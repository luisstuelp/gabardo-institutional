'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mountain, Leaf, Battery, Zap, ArrowRight, TreePine, Factory, Award, TrendingDown, Recycle } from 'lucide-react';
import { useRef } from 'react';

const sustainabilityPillars = [
  {
    id: 'monitoring',
    title: 'Monitoramento Contínuo',
    subtitle: 'Auditoria Independente',
    description: 'Sistema completo de medição e certificação de emissões com transparência total e auditoria SGS',
    icon: Factory,
    details: [
      'Auditoria SGS em bases operacionais',
      'Análise de rotas ativas completa', 
      'Certificação ISO 14001 implementada'
    ],
    gradient: 'from-white via-gray-50 to-gray-100',
    borderColor: 'border-gabardo-blue/20'
  },
  {
    id: 'technology',
    title: 'Tecnologia Limpa',
    subtitle: 'IA + Eletrificação',
    description: 'Implementação de algoritmos de rota inteligente e transição para frota híbrida/elétrica',
    icon: Battery,
    details: [
      'Sistema de IA recalibra rotas diariamente',
      'Frota híbrida e elétrica implementada',
      'Hubs solares em centros de distribuição'
    ],
    gradient: 'from-gabardo-blue/5 via-gabardo-blue/3 to-white',
    borderColor: 'border-gabardo-blue/25'
  },
  {
    id: 'compensation',
    title: 'Compensação Certificada',
    subtitle: 'Neutralidade Carbônica',
    description: 'Primeira transportadora automotiva certificada carbono neutro pela SGS na América Latina',
    icon: Leaf,
    details: [
      'Certificação SGS Carbon Neutral',
      'Toneladas de CO₂ compensadas certificadas',
      'Programa Raízes com mudas plantadas'
    ],
    gradient: 'from-gray-50 via-white to-gray-50',
    borderColor: 'border-gabardo-blue/30'
  },
  {
    id: 'regeneration',
    title: 'Regeneração Ativa',
    subtitle: 'Carbono Negativo',
    description: 'Excedente de compensação que remove mais CO₂ da atmosfera do que produzimos',
    icon: TreePine,
    details: [
      'Primeira transportadora carbono negativo LatAm',
      'Excedente de CO₂ removido anualmente',
      'Ecossistema regenerativo implementado'
    ],
    gradient: 'from-gabardo-blue/10 via-gabardo-blue/5 to-white',
    borderColor: 'border-gabardo-blue/35'
  }
];


const HomeSustainabilitySpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="section-shell relative overflow-hidden py-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-gabardo-blue/8 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gray-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-20 text-center"
        >
          <span className="section-eyebrow">Jornada Gabardo Carbono Negativo</span>
          <h2 className="section-heading mt-5">
            Da emissão convencional ao cume do carbono negativo
          </h2>
          <p className="section-subheading mt-6">
            Uma ascensão técnica e sustentável através de quatro estações de impacto ambiental,
            culminando na primeira certificação carbono negativo da América Latina para transporte automotivo.
          </p>
          <div className="section-divider mx-auto mt-10" />
        </motion.div>

        {/* Sustainability Pillars */}
        <div className="relative space-y-8">
          {sustainabilityPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const cardProgress = useTransform(
              scrollYProgress,
              [index * 0.2, (index + 1) * 0.2],
              [0, 1]
            );
            const cardY = useTransform(cardProgress, [0, 1], [100, 0]);
            const cardScale = useTransform(cardProgress, [0, 1], [0.9, 1]);
            const cardOpacity = useTransform(cardProgress, [0, 1], [0, 1]);

            return (
              <motion.div
                key={pillar.id}
                style={{
                  y: cardY,
                  scale: cardScale,
                  opacity: cardOpacity,
                }}
                className={`sticky top-24 mx-auto max-w-4xl`}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
                <div 
                  className={`relative overflow-hidden rounded-3xl border-2 ${pillar.borderColor} bg-gradient-to-br ${pillar.gradient} shadow-[0_40px_100px_-40px_rgba(19,45,81,0.2)]`}
                  style={{
                    zIndex: sustainabilityPillars.length - index,
                    transform: `translateY(${index * -8}px)`,
                  }}
                >
                  {/* Card Content */}
                  <div className="relative p-8 lg:p-12">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                      {/* Main Content */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gabardo-blue/10 border border-gabardo-blue/20">
                            <Icon className="h-8 w-8 text-gabardo-blue" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gabardo-blue">{pillar.title}</h3>
                            <div className="text-lg font-medium text-gabardo-blue/70">{pillar.subtitle}</div>
                          </div>
                        </div>

                        <p className="text-lg text-gabardo-blue/80 leading-relaxed">
                          {pillar.description}
                        </p>

                        {/* Details List */}
                        <div className="space-y-3">
                          {pillar.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="h-2 w-2 rounded-full bg-gabardo-blue" />
                              <span className="text-sm text-gabardo-blue/70">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gray-100/50 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-gabardo-blue/5 blur-xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <Link
            href="/sustentabilidade"
            className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/30 bg-gabardo-blue/10 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-gabardo-blue transition-all hover:bg-gabardo-blue/20 hover:shadow-lg"
          >
            <Recycle className="h-4 w-4" />
            Relatório completo de sustentabilidade
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSustainabilitySpotlight;
