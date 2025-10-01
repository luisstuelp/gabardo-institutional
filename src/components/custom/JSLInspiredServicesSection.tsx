'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, MapPin, Clock, Star, Users } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  metric: string;
  metricLabel: string;
  caseLink: string;
}

const services: Service[] = [
  {
    id: 'transporte-cargas',
    title: 'Transporte de Veículos',
    description: 'Possuímos uma das maiores e mais modernas frotas de cegonheiras. Atendemos de forma personalizada em todas as regiões do Brasil e países do Mercosul.',
    features: ['Frota moderna com tecnologia embarcada', 'Cobertura nacional e Mercosul', 'Rastreamento em tempo real', 'Seguro total incluso'],
    icon: Truck,
    color: 'amber',
    metric: '+18% redução de emissões por km',
    metricLabel: 'Projeto Carbonsafe 2024',
    caseLink: '/servicos/transporte-veiculos'
  },
  {
    id: 'logistica-integrada',
    title: 'Logística Integrada', 
    description: 'Gerenciamos serviços completos de coleta, armazenagem e distribuição de veículos com controle total da operação e máxima eficiência.',
    features: ['Coleta porta a porta', 'Armazenagem segura', 'Controle de estoque digital', 'Distribuição programada'],
    icon: MapPin,
    color: 'blue',
    metric: '99,2% índice de SLA cumprido',
    metricLabel: 'Case OEM Premium',
    caseLink: '/servicos/logistica-integrada'
  },
  {
    id: 'seguranca-total',
    title: 'Segurança & Proteção',
    description: 'Desenvolvemos soluções completas de segurança com profissionais treinados, equipamentos de última geração e cobertura total de seguros.',
    features: ['Seguro total do veículo', 'Profissionais certificados', 'Equipamentos de segurança', 'Monitoramento 24h'],
    icon: Shield,
    color: 'green',
    metric: '0 incidentes críticos nos últimos 36 meses',
    metricLabel: 'Programa Guardião 360º',
    caseLink: '/servicos/seguranca-protecao'
  },
  {
    id: 'atendimento',
    title: 'Atendimento Personalizado',
    description: 'Oferecemos suporte dedicado com equipe especializada para atender suas necessidades específicas de transporte de veículos.',
    features: ['Atendimento 24/7', 'Equipe especializada', 'Soluções customizadas', 'Relatórios detalhados'],
    icon: Users,
    color: 'purple',
    metric: 'NPS médio 93',
    metricLabel: 'Ciclo de avaliações 2023',
    caseLink: '/contato'
  },
  {
    id: 'prazo-qualidade',
    title: 'Prazo & Qualidade',
    description: 'Cumprimos rigorosamente os prazos estabelecidos mantendo os mais altos padrões de qualidade no transporte de veículos.',
    features: ['Pontualidade garantida', 'Qualidade certificada', 'Processos otimizados', 'Excelência reconhecida'],
    icon: Clock,
    color: 'red',
    metric: '98% entregas no prazo',
    metricLabel: 'Dash Operacional Gabardo',
    caseLink: '/servicos/prazo-qualidade'
  },
  {
    id: 'experiencia',
    title: 'Experiência Comprovada',
    description: 'Com mais de 35 anos no mercado, acumulamos vasta experiência e conquistamos a confiança de centenas de clientes em todo o Brasil.',
    features: ['35+ anos de mercado', 'Centenas de clientes', 'Experiência comprovada', 'Reconhecimento nacional'],
    icon: Star,
    color: 'yellow',
    metric: '350 mil veículos entregues por ano',
    metricLabel: 'Relatório ESG 2024',
    caseLink: '/sobre/historia'
  }
];

const JSLInspiredServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.25em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Portfólio de Serviços
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-px"
              style={{ backgroundColor: '#38B6FF' }}
            ></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{ color: '#132D51' }}>Excelência em</span>
            <br />
            <span className="text-neutral-600">Transporte &amp; Logística</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-600 font-light max-w-4xl mx-auto leading-relaxed mt-6"
          >
            A Gabardo é uma empresa 100% brasileira especializada em transporte de veículos.
            Possuímos o portfólio de serviços mais completo do setor, com operações integradas
            e personalizadas para cada cliente.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-neutral-500 font-light max-w-3xl mx-auto leading-relaxed mt-4"
          >
            Há 35 anos, entendemos as necessidades dos nossos clientes para entregar soluções seguras,
            eficientes e com alto padrão de qualidade. Conheça cada serviço e descubra como podemos elevar
            a sua operação.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-500 hover:border-[#38B6FF] hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: '#132D51' }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4"
                    style={{ color: '#132D51' }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: '#38B6FF' }}
                        ></div>
                        <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto space-y-6">
                    <div className="rounded-2xl border border-neutral-200/50 bg-neutral-50/80 px-4 py-3 text-sm text-neutral-600 shadow-inner group-hover:border-gabardo-light-blue/60">
                      <p className="font-semibold uppercase tracking-[0.28em] text-[11px] text-gabardo-blue mb-1">
                        {service.metricLabel}
                      </p>
                      <p className="text-base font-semibold text-neutral-800">
                        {service.metric}
                      </p>
                    </div>

                    <Link
                      href={service.caseLink}
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 transition-all duration-300 hover:text-gabardo-blue"
                    >
                      <span>Ver projeto</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                    </Link>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                      className="mt-6 h-1"
                      style={{ backgroundColor: '#38B6FF' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default JSLInspiredServicesSection;
