'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Camera, Lock, Users } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'CFTV 24/7',
    description: 'Monitoramento por câmeras em tempo real'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Controle de Acesso',
    description: 'Sistema biométrico e cartões de identificação'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Segurança Física',
    description: 'Muros, cercas elétricas e iluminação'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Equipe Treinada',
    description: 'Vigilantes qualificados e certificados'
  }
];

export default function StorageSecuritySection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-light tracking-[0.2em] mb-4 uppercase font-secondary"
              style={{ color: '#132D51' }}
            >
              Segurança Total
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight mb-6 font-primary"
              style={{ color: '#132D51' }}
            >
              Proteção
              <br />
              <span style={{ color: '#38B6FF' }}>Garantida</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-700 font-light leading-relaxed mb-8 font-secondary"
            >
              Seus veículos ficam protegidos com os mais altos padrões de segurança. 
              Utilizamos tecnologia de ponta e equipe especializada para garantir tranquilidade total.
            </motion.p>

            {/* Security Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ color: '#132D51', backgroundColor: 'rgba(19, 45, 81, 0.1)' }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide mb-1 font-primary" style={{ color: '#132D51' }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 font-light text-sm font-secondary">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-8 shadow-lg">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Shield className="w-24 h-24 text-gray-400" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold mb-2 font-primary" style={{ color: '#132D51' }}>
                  SEGURANÇA 24/7
                </h3>
                <p className="text-gray-600 font-secondary">
                  Monitoramento contínuo e proteção total
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
