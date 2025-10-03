'use client';

import { motion } from 'framer-motion';

const institutionalHighlights = [
  {
    title: 'Confiança certificada',
    description:
      'Tripla certificação ISO 9001, 14001 e 39001, auditorias periódicas e Canal de Ética garantem decisões responsáveis alinhadas à LGPD.',
    imageAlt: 'Equipe avaliando indicadores de governança e compliance',
    imagePlaceholder: '/images/Certificados.JPG',
    actionLabel: 'Qualidade certificada',
    actionHref: '/sobre/qualidade',
  },
  {
    title: 'Operação inteligente e tecnologia',
    description:
      'Frota 79% própria com idade média de 2,5 anos, rede SD-WAN e telemetria integrada sustentam SLAs rigorosos em toda a LATAM.',
    imageAlt: 'Profissionais monitorando operações logísticas de alta tecnologia',
    imagePlaceholder: '/images/GabardoMonit.JPG',
    actionLabel: 'Ver infraestrutura',
    actionHref: '/sobre/infraestrutura',
  },
  {
    title: 'Impacto socioambiental e ESG',
    description:
      'Operação carbono negativa, inventários GEE desde 2017 e metas net zero 2030 sustentam programas de compensação e frota Euro 6.',
    imageAlt: 'Colaboradores em iniciativa de sustentabilidade e reflorestamento',
    imagePlaceholder: '/images/gabardo-hero-03.jpg',
    actionLabel: 'Agenda ESG',
    actionHref: '/sobre/esg',
  },
];

const SobreInstitucionalHighlightsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Nossa evolução institucional em três frentes
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {institutionalHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gabardo-blue/85 via-gabardo-blue/60 to-gabardo-light-blue/65"
                  initial={{ opacity: 0.75 }}
                  whileHover={{ opacity: 0.55 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundImage: `url(${highlight.imagePlaceholder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <motion.span
                    className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {highlight.title}
                  </motion.span>
                </div>
              </div>

              <div className="space-y-4 p-8">
                <motion.h3
                  className="text-xl font-semibold text-gray-900"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
                >
                  {highlight.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                >
                  {highlight.description}
                </motion.p>
                <motion.a
                  href={highlight.actionHref}
                  className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-gabardo-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue transition-all hover:border-gabardo-blue/40 hover:bg-gabardo-blue/15"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {highlight.actionLabel}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalHighlightsSection;
