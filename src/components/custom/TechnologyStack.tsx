'use client';

import { motion } from 'framer-motion';
import { Database, Cloud, Zap, Lock, Radio, Activity } from 'lucide-react';
import { useState } from 'react';

const techFeatures = [
  {
    id: 'client',
    title: 'Camada Cliente',
    subtitle: 'Interfaces & Experiência',
    color: 'from-blue-500 to-cyan-500',
    systems: [
      { 
        icon: Smartphone, 
        name: 'Apps Mobile', 
        description: 'iOS & Android para operação em campo',
        tech: 'React Native'
      },
      { 
        icon: Eye, 
        name: 'Dashboards', 
        description: 'Painéis em tempo real para gestão',
        tech: 'Next.js + D3.js'
      }
    ]
  },
  {
    id: 'integration',
    title: 'Camada Integração',
    subtitle: 'APIs & Conectividade',
    color: 'from-purple-500 to-pink-500',
    systems: [
      { 
        icon: GitBranch, 
        name: 'API Gateway', 
        description: 'Integração com ERPs e TMS clientes',
        tech: 'REST + GraphQL'
      },
      { 
        icon: Radio, 
        name: 'SD-WAN', 
        description: 'Rede corporativa com redundância',
        tech: 'Links múltiplos'
      }
    ]
  },
  {
    id: 'processing',
    title: 'Camada Processamento',
    subtitle: 'Lógica & Inteligência',
    color: 'from-orange-500 to-red-500',
    systems: [
      { 
        icon: Zap, 
        name: 'Motor de Regras', 
        description: 'Automação de processos e workflows',
        tech: 'Node.js + Python'
      },
      { 
        icon: Activity, 
        name: 'Analytics', 
        description: 'BI e dashboards preditivos',
        tech: 'Machine Learning'
      }
    ]
  },
  {
    id: 'data',
    title: 'Camada Dados',
    subtitle: 'Armazenamento & Backup',
    color: 'from-green-500 to-emerald-500',
    systems: [
      { 
        icon: Database, 
        name: 'Bancos de Dados', 
        description: 'PostgreSQL replicado multi-região',
        tech: 'Alta disponibilidade'
      },
      { 
        icon: HardDrive, 
        name: 'Storage', 
        description: 'Backup noturno automático + DR',
        tech: 'S3 + Backup local'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Camada Infraestrutura',
    subtitle: 'Cloud & Segurança',
    color: 'from-gabardo-blue to-gabardo-light-blue',
    systems: [
      { 
        icon: Cloud, 
        name: 'Cloud Híbrida', 
        description: 'AWS + On-premise para compliance',
        tech: 'Kubernetes'
      },
      { 
        icon: Lock, 
        name: 'Segurança', 
        description: 'Firewall, VPN, certificados SSL/TLS',
        tech: 'Zero Trust'
      }
    ]
  }
];

const metrics = [
  { label: '99.8%', sublabel: 'Uptime anual', color: 'text-green-400' },
  { label: '<50ms', sublabel: 'Latência média', color: 'text-blue-400' },
  { label: '24/7', sublabel: 'Monitoramento', color: 'text-purple-400' },
  { label: '100%', sublabel: 'Dados criptografados', color: 'text-orange-400' }
];

export default function TechnologyStack() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(19, 45, 81, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 45, 81, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gabardo-blue/10 px-6 py-3">
            <Server className="h-5 w-5 text-gabardo-blue" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gabardo-blue">Arquitetura Digital</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gabardo-blue sm:text-4xl md:text-5xl lg:text-6xl">
            Stack tecnológico
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
            Infraestrutura digital robusta, escalável e segura que sustenta 
            nossas operações 24/7 com alta disponibilidade
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm"
            >
              <div className={`mb-2 text-3xl font-bold ${metric.color}`}>
                {metric.label}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500">
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Layers Stack */}
        <div className="relative space-y-6">
          {techLayers.map((layer, layerIndex) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: layerIndex * 0.15 }}
              className="group relative"
            >
              {/* Layer Container */}
              <div className="overflow-hidden rounded-3xl border-2 border-gray-200 bg-white shadow-xl transition-all duration-500 hover:border-gabardo-light-blue/50 hover:shadow-2xl">
                {/* Layer Header with Gradient */}
                <div className={`bg-gradient-to-r ${layer.color} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold sm:text-3xl">{layer.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{layer.subtitle}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg font-bold backdrop-blur-sm">
                      {layerIndex + 1}
                    </div>
                  </div>
                </div>

                {/* Systems Grid */}
                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  {layer.systems.map((system, systemIndex) => {
                    const Icon = system.icon;
                    return (
                      <motion.div
                        key={system.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (layerIndex * 0.15) + (systemIndex * 0.1) }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="group/card relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 transition-all duration-300 hover:border-gabardo-light-blue/50 hover:shadow-lg"
                      >
                        {/* Hover Effect Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-gabardo-light-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
                        />

                        <div className="relative z-10 flex items-start gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${layer.color} shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1 text-base font-bold text-gabardo-blue sm:text-lg">
                              {system.name}
                            </h4>
                            <p className="mb-2 text-xs text-gray-600 sm:text-sm">
                              {system.description}
                            </p>
                            <div className="inline-flex items-center gap-2 rounded-full bg-gabardo-blue/5 px-3 py-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-gabardo-light-blue" />
                              <span className="text-xs font-medium text-gabardo-blue">
                                {system.tech}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Connector Line (except for last item) */}
              {layerIndex < techLayers.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (layerIndex * 0.15) + 0.3 }}
                  className="absolute left-1/2 -bottom-3 z-20 h-6 w-1 origin-top -translate-x-1/2 bg-gradient-to-b from-gabardo-blue to-gabardo-light-blue"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-gabardo-blue/20 bg-gabardo-blue/5 px-6 py-4">
            <Wifi className="h-5 w-5 text-gabardo-blue" />
            <span className="text-sm font-semibold text-gabardo-blue">
              Arquitetura escalável com foco em segurança, compliance e alta disponibilidade
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
