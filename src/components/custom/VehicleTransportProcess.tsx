'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Truck, MapPin, CheckCircle, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: <FileText className="w-8 h-8" />,
    title: 'Cotação e Planejamento',
    description: 'Análise detalhada das necessidades logísticas do cliente',
    details: [
      'Levantamento de rotas e destinos',
      'Definição de prazos e frequência',
      'Análise de volume e tipos de veículos',
      'Elaboração de proposta personalizada'
    ]
  },
  {
    number: '02',
    icon: <Calendar className="w-8 h-8" />,
    title: 'Agendamento e Preparação',
    description: 'Organização da operação e preparação da frota especializada',
    details: [
      'Agendamento de coleta e entrega',
      'Designação de frota especializada',
      'Preparação de documentação',
      'Briefing da equipe operacional'
    ]
  },
  {
    number: '03',
    icon: <Truck className="w-8 h-8" />,
    title: 'Coleta e Carregamento',
    description: 'Retirada segura dos veículos com inspeção técnica completa',
    details: [
      'Inspeção técnica PDI padronizada',
      'Documentação fotográfica',
      'Carregamento seguro especializado',
      'Ativação do sistema de rastreamento'
    ]
  },
  {
    number: '04',
    icon: <MapPin className="w-8 h-8" />,
    title: 'Transporte Monitorado',
    description: 'Acompanhamento em tempo real durante todo o trajeto',
    details: [
      'Rastreamento GPS 24/7',
      'Comunicação proativa de marcos',
      'Monitoramento de rota otimizada',
      'Suporte técnico especializado'
    ]
  },
  {
    number: '05',
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Entrega e Conferência',
    description: 'Descarga cuidadosa e conferência técnica no destino',
    details: [
      'Descarregamento especializado',
      'Inspeção técnica de entrega',
      'Documentação de conformidade',
      'Assinatura eletrônica de recebimento'
    ]
  },
  {
    number: '06',
    icon: <Phone className="w-8 h-8" />,
    title: 'Pós-Entrega e Relatórios',
    description: 'Acompanhamento pós-entrega e relatórios de performance',
    details: [
      'Confirmação de entrega',
      'Relatórios de performance',
      'Análise de KPIs operacionais',
      'Feedback e melhorias contínuas'
    ]
  }
];

const VehicleTransportProcess: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
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
            Processo Gabardo
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-6"
          >
            <span style={{color: '#132D51'}}>Como Funciona</span>
            <br />
            <span className="text-neutral-600">Nosso Transporte</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-neutral-600 max-w-3xl mx-auto"
          >
            Nossa metodologia comprovada garante máxima segurança, eficiência e transparência 
            em cada etapa do processo de transporte de veículos.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-50 p-8 border border-neutral-200 hover:border-gabardo-light-blue transition-all duration-500 h-full relative"
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div className="text-6xl font-black opacity-10" style={{color: '#132D51'}}>
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{backgroundColor: '#38B6FF'}}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4" style={{color: '#132D51'}}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#38B6FF'}}></div>
                      <span className="text-neutral-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Visual Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl text-white"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
                Tecnologia de Ponta
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg">Sistema de gestão integrada com tracking em tempo real</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg">Aplicativo móvel para acompanhamento de entregas</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg">Relatórios automatizados e dashboards personalizados</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg">Integração com sistemas ERP dos clientes</span>
                </div>
              </div>

              <button 
                className="px-10 py-4 bg-white font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
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
                Conheça Nossa Tecnologia
              </button>
            </div>

            <div className="relative">
              <Image
                src="/images/Trans Gabardo - Framers produtora -5475.JPG"
                alt="Gabardo Technology"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VehicleTransportProcess;
