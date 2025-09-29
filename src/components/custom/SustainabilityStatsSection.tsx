
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Leaf, Recycle, Users } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: ArrowDownToLine,
    value: '12%',
    label: 'Redução de Emissões CO2',
    description: 'Desde 2022, alcançamos uma redução de 12% nas emissões de CO2 por km rodado, graças à renovação da frota e otimização de rotas. (Placeholder)',
  },
  {
    icon: Leaf,
    value: '45%',
    label: 'Energia Renovável',
    description: '45% da energia consumida em nossas sedes e pátios é proveniente de fontes renováveis certificadas. (Placeholder)',
  },
  {
    icon: Recycle,
    value: '300t',
    label: 'Resíduos Reciclados',
    description: 'Em 2023, encaminhamos mais de 300 toneladas de resíduos (pneus, óleos, etc.) para reciclagem e descarte correto. (Placeholder)',
  },
  {
    icon: Users,
    value: '1.200+',
    label: 'Pessoas Impactadas',
    description: 'Nossos programas sociais de educação e segurança no trânsito já impactaram mais de 1.200 pessoas nas comunidades onde atuamos. (Placeholder)',
  },
];

const SustainabilityStatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Nossos Resultados</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Impacto em Números
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Acreditamos que a transparência é fundamental. Aqui estão alguns dos nossos principais indicadores de sustentabilidade. (Valores são placeholders)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6 mx-auto">
                <stat.icon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">{stat.label}</h4>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityStatsSection;
