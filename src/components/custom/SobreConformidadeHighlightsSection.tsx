'use client';

import { motion } from 'framer-motion';

const highlights = [
  {
    value: '100%',
    label: 'dados mapeados',
    description: 'Inventário completo de dados pessoais com revisões periódicas e auditorias independentes.',
  },
  {
    value: '24h/7d',
    label: 'monitoramento de segurança',
    description: 'Equipe dedicada e sistemas automatizados acompanhando incidentes de segurança em tempo real.',
  },
  {
    value: '30 dias',
    label: 'prazo médio de atendimento',
    description: 'Respostas rápidas às solicitações de titulares, sempre alinhadas com a LGPD.',
  },
];

const SobreConformidadeHighlightsSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Indicadores de privacidade e ética
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-4xl font-bold text-gabardo-light-blue mb-4">{highlight.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                {highlight.label}
              </div>
              <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreConformidadeHighlightsSection;
