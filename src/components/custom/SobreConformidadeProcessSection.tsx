'use client';

import { motion } from 'framer-motion';

const processes = [
  {
    title: 'Mapeamento de dados',
    description:
      'Identificamos todos os dados pessoais tratados, suas finalidades e ciclos de vida para garantir uso adequado.',
  },
  {
    title: 'Bases legais claras',
    description:
      'Cada tratamento possui respaldo legal documentado e revisado periodicamente pelas áreas responsáveis.',
  },
  {
    title: 'Gestão de consentimento',
    description:
      'Controles permitem registrar, atualizar ou revogar consentimentos conforme a escolha de titulares.',
  },
  {
    title: 'Resposta a titulares',
    description:
      'Estrutura dedicada para atender solicitações de acesso, correção e eliminação de dados dentro dos prazos legais.',
  },
];

const SobreConformidadeProcessSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            LGPD na prática
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Nossos processos garantem o tratamento responsável das informações e a proteção dos titulares em toda a jornada.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white shadow-sm border border-gray-100"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-gabardo-light-blue mb-3">
                Etapa {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{process.title}</h3>
              <p className="text-gray-600 leading-relaxed">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreConformidadeProcessSection;
