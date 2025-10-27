'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const SustainabilityReportSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative bg-gray-800 text-white p-12 rounded-lg shadow-xl text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('/images/photo-1661435036699-8686dbfc5304.jpg')" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Relatório de Sustentabilidade 2024
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
              Acesse nosso relatório completo para um mergulho profundo em nossas iniciativas, dados de performance e compromissos para o futuro.
            </p>
            <button
              disabled
              className="inline-flex items-center px-8 py-4 font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <Download className="mr-3 w-5 h-5" />
              Download do Relatório (Em Breve)
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityReportSection;