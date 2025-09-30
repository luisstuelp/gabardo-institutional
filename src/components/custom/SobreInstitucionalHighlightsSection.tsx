'use client';

import { motion } from 'framer-motion';

const institutionalHighlights = [
  {
    title: 'Rede de unidades conectadas',
    description:
      'Estrutura distribuída em hubs logísticos que garante padronização operacional e tempo de resposta ágil.',
    imageAlt: 'Rede de unidades Gabardo conectadas',
    imagePlaceholder: '/images/placeholders/rede-institucional.jpg',
  },
  {
    title: 'Governança que prioriza segurança',
    description:
      'Processos auditados, certificações e cultura de segurança que sustentam decisões transparentes em toda a companhia.',
    imageAlt: 'Equipe analisando indicadores de governança',
    imagePlaceholder: '/images/placeholders/governanca-equipe.jpg',
  },
  {
    title: 'Inovação orientada por dados',
    description:
      'Inteligência analítica, telemetria e projetos de transformação digital aceleram a evolução das operações.',
    imageAlt: 'Dashboard de tecnologia e analytics em operação',
    imagePlaceholder: '/images/placeholders/inovacao-analytics.jpg',
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalHighlightsSection;
