
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Warehouse, Zap, Building, Wrench, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  bgColor: string;
  iconColor: string;
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Transporte de Veículos',
    description: 'Coleta e entrega de veículos 0km e seminovos em todo o território nacional com frota especializada.',
    href: '/transporte-de-veiculos',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Package,
    title: 'Transporte em Prancha',
    description: 'Movimentação de máquinas, equipamentos agrícolas e industriais com pranchas retas e rebaixadas.',
    href: '/transporte-em-prancha',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Warehouse,
    title: 'Armazenagem',
    description: 'Pátios estrategicamente localizados para gestão de estoque, pré-entrega e preparação de veículos.',
    href: '/armazenagem',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    icon: Zap,
    title: 'Logística Integrada',
    description: 'Soluções end-to-end que cobrem desde a coleta na fábrica até a entrega no concessionário.',
    href: '/servicos/logistica-integrada',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Building,
    title: 'Distribuição Urbana',
    description: 'Entregas fracionadas em centros urbanos com veículos menores, otimizando o last-mile.',
    href: '/servicos/distribuicao-urbana',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    icon: Wrench,
    title: 'Logística Interna',
    description: 'Gestão e operação de movimentação de materiais e veículos dentro das plantas do cliente.',
    href: '/servicos/logistica-interna',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
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
              <Link href={service.href} className="block h-full group">
                  <div className="relative h-full p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden border border-transparent hover:border-blue-500">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-[#132D51] mb-6`}>
                      <service.icon className={`w-8 h-8 text-white`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                      Saber Mais
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
