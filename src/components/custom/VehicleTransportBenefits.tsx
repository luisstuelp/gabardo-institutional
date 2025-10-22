'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Clock, Award, Truck, Headphones } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Rastreamento em Tempo Real',
    description: 'Monitoramento GPS 24/7 de toda a frota com central própria de rastreamento'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Segurança Garantida',
    description: 'Protocolos rigorosos de segurança e seguros completos para todos os veículos'
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Cobertura Nacional',
    description: '15 unidades estrategicamente localizadas em todo território brasileiro'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Prazo Garantido',
    description: '99.5% de entregas dentro do prazo estabelecido com SLAs monitorados'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Frota Especializada',
    description: 'Veículos próprios e terceirizados especializados em transporte automotivo'
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: 'Atendimento 24/7',
    description: 'Suporte especializado disponível 24 horas para tracking e emergências'
  }
];

const VehicleTransportBenefits: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-gabardo-light-blue/30 to-gabardo-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-br from-gabardo-blue/30 to-gabardo-light-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Diferenciais Competitivos
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Por que escolher</span>
            <br />
            <span className="text-neutral-600">a Gabardo?</span>
          </motion.h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full text-center"
              >
                {/* Icon */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{backgroundColor: '#132D51'}}
                  >
                    {benefit.icon}
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4" style={{color: '#132D51'}}>
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  className="mx-auto mt-6 h-1"
                  style={{backgroundColor: '#38B6FF'}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
              Pronto para Otimizar sua Logística?
            </h3>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto font-light">
              Junte-se às principais montadoras que confiam na Gabardo para o transporte de seus veículos. 
              Nossa experiência e tecnologia garantem entregas seguras e pontuais.
            </p>

            <button 
              className="px-12 py-5 bg-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{color: '#132D51'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Saiba Mais Sobre os Benefícios
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VehicleTransportBenefits;
