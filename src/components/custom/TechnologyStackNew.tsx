'use client';

import { motion } from 'framer-motion';
import { Database, Cloud, Zap, Lock, Radio, Activity } from 'lucide-react';
import { useState } from 'react';

const techCategories = [
  {
    id: 1,
    icon: Radio,
    title: 'Conectividade',
    items: ['SD-WAN', 'Links redundantes', 'Backup noturno']
  },
  {
    id: 2,
    icon: Database,
    title: 'Dados',
    items: ['PostgreSQL replicado', 'Alta disponibilidade', 'DR completo']
  },
  {
    id: 3,
    icon: Cloud,
    title: 'Cloud',
    items: ['AWS Híbrida', 'Kubernetes', 'Auto-scaling']
  },
  {
    id: 4,
    icon: Lock,
    title: 'Segurança',
    items: ['Zero Trust', 'SSL/TLS', 'VPN dedicada']
  },
  {
    id: 5,
    icon: Zap,
    title: 'Processamento',
    items: ['Automação', 'Workflows', 'APIs REST']
  },
  {
    id: 6,
    icon: Activity,
    title: 'Analytics',
    items: ['BI em tempo real', 'Dashboards', 'Alertas']
  }
];

const stats = [
  { value: '99.8%', label: 'Uptime' },
  { value: '<50ms', label: 'Latência' },
  { value: '24/7', label: 'Monitoramento' },
  { value: '100%', label: 'Criptografia' }
];

export default function TechnologyStack() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gabardo-blue md:text-5xl">
            Tecnologia & Infraestrutura
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Stack robusto que sustenta operações 24/7 com alta disponibilidade
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mb-2 text-3xl font-bold text-gabardo-blue">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`group cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 ${
                  isActive ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gabardo-blue text-white'
                      : 'bg-gabardo-blue/10 text-gabardo-blue'
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gabardo-blue">
                  {category.title}
                </h3>

                {/* Items */}
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isActive
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.7, x: 0 }
                      }
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          isActive ? 'bg-gabardo-light-blue' : 'bg-gray-400'
                        }`}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-lg">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-semibold text-gray-700">
              Todos os sistemas operacionais e monitorados
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
