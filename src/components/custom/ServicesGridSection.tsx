
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Warehouse, Zap, Building, Wrench, Car } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const services: Service[] = [
  {
    icon: <Truck className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Frotas Especializadas',
    description: 'Movimentação de máquinas, equipamentos agrícolas e industriais com pranchas retas e rebaixadas.',
    bgColor: 'bg-green-50',
  },
  {
    icon: <Car className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Transporte de Veículos',
    description: 'Coleta e entrega de veículos 0km e seminovos em todo o território nacional.',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <Warehouse className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Armazenagem',
    description: 'Pátios estrategicamente localizados para gestão de estoque, pré-entrega e preparação de veículos.',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: <Zap className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Logística Integrada',
    description: 'Soluções end-to-end que cobrem desde a coleta na fábrica até a entrega no concessionário.',
    bgColor: 'bg-purple-50',
  },
  {
    icon: <Building className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Distribuição Urbana',
    description: 'Entregas fracionadas em centros urbanos com veículos menores, otimizando o last-mile.',
    bgColor: 'bg-red-50',
  },
  {
    icon: <Wrench className="h-8 w-8" strokeWidth={1.6} />,
    title: 'Logística Interna',
    description: 'Gestão e operação de movimentação de materiais e veículos dentro das plantas do cliente.',
    bgColor: 'bg-indigo-50',
  },
];

const ServicesGridSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Nossas Soluções</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Um Portfólio Completo de Serviços
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Oferecemos uma gama completa de soluções logísticas para atender às necessidades específicas do seu negócio, com a garantia de qualidade e segurança da Gabardo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="block h-full group cursor-default">
                <div className="relative h-full p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden border border-transparent hover:border-blue-500">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#132D51] mb-6 text-white">
                    <div className="flex items-center justify-center gap-1">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
