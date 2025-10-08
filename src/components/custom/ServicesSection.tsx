'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Calendar, Headphones, Shield, Truck, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { services as scrapedServices } from '@/data/hubPluralContent';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

// Mapeamento de ícones para os serviços
const getServiceIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('coworking')) return <Users className="w-6 h-6" />;
  if (titleLower.includes('escritório') || titleLower.includes('flexível')) return <Building className="w-6 h-6" />;
  if (titleLower.includes('reunião') || titleLower.includes('salas')) return <Calendar className="w-6 h-6" />;
  if (titleLower.includes('membership')) return <UserCheck className="w-6 h-6" />;
  if (titleLower.includes('estação') || titleLower.includes('fixa')) return <MapPin className="w-6 h-6" />;
  if (titleLower.includes('caixa') || titleLower.includes('postal')) return <Package className="w-6 h-6" />;
  if (titleLower.includes('evento')) return <Coffee className="w-6 h-6" />;
  return <Wifi className="w-6 h-6" />;
};

// Características para cada tipo de serviço
const getServiceFeatures = (title: string): string[] => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('coworking')) return ['Espaços compartilhados', 'Networking ativo', 'Ambiente inspirador'];
  if (titleLower.includes('escritório') || titleLower.includes('flexível')) return ['100% privativo', 'Sem manutenção', 'Contratos flexíveis'];
  if (titleLower.includes('reunião') || titleLower.includes('salas')) return ['Tecnologia moderna', 'Capacidades variadas', 'Reserva fácil'];
  if (titleLower.includes('membership')) return ['Acesso total', 'Benefícios exclusivos', 'Networking qualificado'];
  if (titleLower.includes('estação') || titleLower.includes('fixa')) return ['Espaço garantido', 'Ambiente colaborativo', 'Sempre disponível'];
  if (titleLower.includes('caixa') || titleLower.includes('postal')) return ['Endereço comercial', 'Presença profissional', 'Recepção de correspondência'];
  if (titleLower.includes('evento')) return ['Espaços modernos', 'Equipamentos inclusos', 'Networking'];
  return ['Serviço completo', 'Atendimento premium', 'Flexibilidade'];
};

const services: Service[] = scrapedServices.map((service, index) => ({
  id: `service-${index}`,
  icon: getServiceIcon(service.title),
  title: service.title,
  description: service.description,
  features: getServiceFeatures(service.title),
}));

// ServiceCard com memo para evitar re-renders desnecessários
const ServiceCard = memo(({ service, isLarge = false, index }: { service: Service; isLarge?: boolean; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white border border-neutral-200 overflow-hidden group cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-black/20 hover:shadow-2xl hover:-translate-y-1
        ${isHovered ? 'scale-[1.02] shadow-2xl border-black/20' : 'scale-100'}
        ${isLarge ? 'h-full min-h-[500px]' : 'h-full min-h-[240px]'}
      `}
    >
      {/* Card Content */}
      <div className={`
        relative h-full flex flex-col
        ${isLarge ? 'p-10 lg:p-12' : 'p-6 lg:p-8'}
      `}>
        
        {/* Icon */}
        <div
          className={`
            inline-flex items-center justify-center rounded-full mb-4
            transition-all duration-500
            ${isHovered 
              ? 'w-12 h-12 bg-black text-white transform rotate-[5deg] scale-110' 
              : 'w-10 h-10 bg-neutral-100 text-neutral-700'
            }
          `}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3 className={`
          font-bold text-black mb-3 leading-tight tracking-tight
          ${isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'}
        `}>
          {service.title.toUpperCase()}
        </h3>

        {/* Description - Only for large cards */}
        {isLarge && (
          <p className="text-neutral-600 font-light leading-relaxed mb-6 text-base lg:text-lg">
            {service.description}
          </p>
        )}

        {/* Features */}
        <div className={`flex-1 ${!isLarge ? 'hidden' : ''}`}>
          <div className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: (index * 0.05) + (featureIndex * 0.05) + 0.4 
                }}
                className="flex items-center group/feature"
              >
                <div className={`
                  w-1 h-1 rounded-full mr-3 transition-all duration-300
                  ${isHovered ? 'bg-secondary w-2 h-2' : 'bg-neutral-300'}
                `} />
                <span className={`text-neutral-600 transition-colors duration-300 text-sm ${isHovered ? 'text-black' : ''}`}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Small card features - simplified */}
        {!isLarge && (
          <div className="flex-1 space-y-2 mt-2">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-secondary w-1.5 h-1.5' : 'bg-neutral-300'}`} />
                <span className="text-xs text-neutral-600 truncate">{feature}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Action Arrow */}
        <div
          className={`
            mt-6 flex items-center justify-end transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-black' : 'bg-black/10'}`}>
            <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`} />
          </div>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent pointer-events-none
        transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />

      {/* Active Border */}
      {isHovered && (
        <div className="absolute inset-0 border-2 border-secondary pointer-events-none" />
      )}
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const ServicesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading services...</div>
        </div>
      </section>
    );
  }

  // Organizar serviços em dois grupos para as duas linhas
  const firstRowServices = services.slice(0, 3);
  const secondRowServices = services.slice(3, 6);

  return (
    <section className="min-h-screen bg-neutral-50 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-neutral-200/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative">
        
        {/* Hero Header Section */}
        <div className="px-6 lg:px-12 2xl:px-20 pt-24 pb-16">
          <div className="w-full max-w-[1600px] mx-auto">
            
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <Minus className="w-8 h-px text-neutral-400" />
              <span className="text-sm font-mono text-neutral-500 tracking-[0.3em] uppercase">
                Nossos Serviços
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-black leading-[0.9] tracking-tight">
                SOLUÇÕES
                <br />
                <span className="text-neutral-300">COMPLETAS</span>
              </h2>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-lg md:text-xl text-neutral-600 font-light max-w-2xl leading-relaxed"
              >
                Transformamos espaços em oportunidades. 
                Conectamos pessoas. Impulsionamos negócios.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid - Two Rows Layout */}
        <div className="px-6 lg:px-12 2xl:px-20 pb-24">
          <div className="w-full max-w-[1600px] mx-auto space-y-8">
            
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Large Card Left */}
              <div className="lg:col-span-1">
                {firstRowServices[0] && <ServiceCard service={firstRowServices[0]} isLarge={true} index={0} />}
              </div>
              
              {/* Two Small Cards Right */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {firstRowServices[1] && <ServiceCard service={firstRowServices[1]} isLarge={false} index={1} />}
                {firstRowServices[2] && <ServiceCard service={firstRowServices[2]} isLarge={false} index={2} />}
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Large Card Left */}
              <div className="lg:col-span-1">
                {secondRowServices[0] && <ServiceCard service={secondRowServices[0]} isLarge={true} index={3} />}
              </div>
              
              {/* Two Small Cards Right */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {secondRowServices[1] && <ServiceCard service={secondRowServices[1]} isLarge={false} index={4} />}
                {secondRowServices[2] && <ServiceCard service={secondRowServices[2]} isLarge={false} index={5} />}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="px-6 lg:px-12 2xl:px-20 pb-24">
          <div className="w-full max-w-[1600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Pronto para transformar seu negócio?
              </h3>
              <p className="text-lg text-neutral-600 font-light">
                Descubra como nossos espaços podem acelerar seu crescimento
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-lg font-medium hover:bg-neutral-800 transition-all duration-300"
              >
                Fale Conosco
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 