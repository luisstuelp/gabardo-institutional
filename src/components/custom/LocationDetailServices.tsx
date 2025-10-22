'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LocationDetailServicesProps {
  location: {
    services?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const LocationDetailServices: React.FC<LocationDetailServicesProps> = ({ location }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            serviços inclusos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600"
          >
            Tudo que você precisa para trabalhar com eficiência e conforto
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {location.services?.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg text-white">{service.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-neutral-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          )) || []}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-neutral-200"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-800 mb-4">
              Recursos Adicionais
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Benefícios exclusivos que fazem a diferença no seu dia a dia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🌐', title: 'WiFi Premium', subtitle: '1GB Fibra' },
              { icon: '🔒', title: 'Acesso 24/7', subtitle: 'Segurança Total' },
              { icon: '🍕', title: 'Área Gourmet', subtitle: 'Coffee & Food' },
              { icon: '🚗', title: 'Estacionamento', subtitle: 'Vagas Disponíveis' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg text-white">{feature.icon}</span>
                </div>
                <h4 className="font-bold text-neutral-800 mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-neutral-600">
                  {feature.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Agende uma visita e conheça de perto todos os serviços e facilidades que temos para oferecer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-neutral-900 px-8 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors">
                Agendar Visita
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-neutral-900 transition-colors">
                Ver Planos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationDetailServices; 