'use client';

import { motion } from 'framer-motion';
import { FileCheck, Lock, Scale, AlertTriangle, Globe2 } from 'lucide-react';

const principles = [
  {
    icon: FileCheck,
    title: 'Código de ética',
    description:
      'Diretrizes claras para conduta corporativa, relacionamento com clientes, fornecedores e órgãos públicos.',
  },
  {
    icon: Lock,
    title: 'Segurança da informação',
    description:
      'Tecnologias de criptografia, gestão de acessos e monitoramento 24/7 das nossas plataformas.',
  },
  {
    icon: Scale,
    title: 'Compliance regulatório',
    description:
      'Aderência às legislações setoriais, às normas de transporte e às regulamentações fiscais.',
  },
  {
    icon: AlertTriangle,
    title: 'Gestão de incidentes',
    description:
      'Processos preventivos, resposta rápida e comunicação transparente em qualquer ocorrência.',
  },
  {
    icon: Globe2,
    title: 'Treinamento contínuo',
    description:
      'Programas de capacitação para colaboradores e parceiros sobre ética, privacidade e segurança.',
  },
];

const SobreConformidadePrinciplesSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Compliance como parte da nossa cultura
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Estruturamos políticas e processos que orientam todas as áreas da Gabardo para agir com ética, transparência e responsabilidade.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SobreConformidadePrinciplesSection;
