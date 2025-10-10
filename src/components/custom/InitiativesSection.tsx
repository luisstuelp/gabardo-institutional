'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Award, Leaf } from 'lucide-react';

const initiatives = [
  {
    icon: Heart,
    name: 'Programa Na Mão Certa',
    description: 'Iniciativa contra a exploração sexual de crianças e adolescentes nas rodovias.',
  },
  {
    icon: Award,
    name: 'Great Place to Work (GPTW)',
    description: 'Certificação que reconhece excelentes ambientes de trabalho.',
  },
  {
    icon: ShieldCheck,
    name: 'ISO 9001: Gestão da Qualidade',
    description: 'Norma internacional para sistemas de gestão da qualidade.',
  },
  {
    icon: Leaf,
    name: 'ISO 14001: Gestão Ambiental',
    description: 'Norma internacional para sistemas de gestão ambiental.',
  },
  {
    icon: ShieldCheck,
    name: 'ISO 39001: Segurança Viária',
    description: 'Norma para sistemas de gestão da segurança no trânsito.',
  },
  {
    icon: Award,
    name: 'Selo Clima Organizacional (FEEx)',
    description: 'Reconhecimento de empresas com bom clima organizacional.',
  },
];

export default function InitiativesSection() {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-8 sm:mb-10 md:mb-12 text-center"
        >
          Iniciativas e Compromissos
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-5 sm:p-6 md:p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-full bg-gabardo-blue/10 text-gabardo-blue mr-3 sm:mr-4">
                  <initiative.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{initiative.name}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600">{initiative.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
