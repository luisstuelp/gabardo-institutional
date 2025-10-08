'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Zap, CheckCircle } from 'lucide-react';

const cultureItems = [
  {
    icon: Shield,
    title: 'Segurança em Primeiro Lugar',
    description: 'A segurança de nossos colaboradores e da carga de nossos clientes é o nosso maior compromisso. Investimos em treinamentos, tecnologia e processos para garantir um ambiente de trabalho seguro e operações livres de acidentes.',
  },
  {
    icon: Users,
    title: 'Foco no Cliente',
    description: 'Nossos clientes estão no centro de tudo o que fazemos. Buscamos entender suas necessidades e superar suas expectativas, construindo relações de confiança e parceria de longo prazo.',
  },
  {
    icon: Zap,
    title: 'Inovação e Melhoria Contínua',
    description: 'Acreditamos no poder da inovação para transformar a logística. Incentivamos a criatividade, a busca por novas tecnologias e a melhoria contínua de nossos processos para entregar resultados cada vez melhores.',
  },
  {
    icon: CheckCircle,
    title: 'Qualidade e Excelência',
    description: 'Buscamos a excelência em tudo o que fazemos. Nossos processos são certificados pelas normas ISO 9001, ISO 14001 e ISO 39001, garantindo os mais altos padrões de qualidade, sustentabilidade e segurança viária.',
  },
];

const TeamCultureSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Nossa Cultura</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Os valores que nos unem e nos impulsionam a ir mais longe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cultureItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <item.icon className="w-10 h-10 text-gabardo-blue" />
                <h3 className="text-2xl font-bold text-gabardo-blue">{item.title}</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamCultureSection;
