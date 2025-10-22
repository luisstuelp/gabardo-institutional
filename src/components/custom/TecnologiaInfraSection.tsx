'use client';

import { motion } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  Zap, 
  Lock,
  Radio,
  Activity,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';

const tecnologias = [
  {
    id: 'conectividade',
    icon: Radio,
    titulo: 'Conectividade',
    descricao: 'Rede corporativa com redundância e alta disponibilidade',
    recursos: [
      { nome: 'SD-WAN Enterprise', status: 'online', detalhe: '99.98% uptime' },
      { nome: 'Links Redundantes', status: 'online', detalhe: '10Gbps' },
      { nome: 'Backup Automático', status: 'ativo', detalhe: 'Noturno' }
    ]
  },
  {
    id: 'dados',
    icon: Database,
    titulo: 'Banco de Dados',
    descricao: 'Armazenamento seguro com replicação multi-região',
    recursos: [
      { nome: 'PostgreSQL Cluster', status: 'online', detalhe: '5 nodes' },
      { nome: 'Replicação Multi-Região', status: 'sincronizando', detalhe: '<10ms lag' },
      { nome: 'Disaster Recovery', status: 'ativo', detalhe: 'RTO 15min' }
    ]
  },
  {
    id: 'cloud',
    icon: Cloud,
    titulo: 'Cloud Híbrida',
    descricao: 'Infraestrutura escalável com auto-balanceamento',
    recursos: [
      { nome: 'AWS Multi-Zona', status: 'online', detalhe: '3 regiões' },
      { nome: 'Kubernetes', status: 'online', detalhe: '127 pods ativos' },
      { nome: 'Auto-Scaling', status: 'monitorando', detalhe: 'Threshold 70%' }
    ]
  },
  {
    id: 'seguranca',
    icon: Lock,
    titulo: 'Segurança',
    descricao: 'Proteção em múltiplas camadas com certificações',
    recursos: [
      { nome: 'Zero Trust', status: 'ativo', detalhe: '234 políticas' },
      { nome: 'SSL/TLS', status: 'online', detalhe: 'Expira 340d' },
      { nome: 'VPN Dedicada', status: 'online', detalhe: '89 usuários' }
    ]
  },
  {
    id: 'processamento',
    icon: Zap,
    titulo: 'Processamento',
    descricao: 'Automação de workflows e integração com ERPs',
    recursos: [
      { nome: 'Workflow Engine', status: 'online', detalhe: '1.2k/dia' },
      { nome: 'API Gateway', status: 'online', detalhe: '45k req/min' },
      { nome: 'Message Queue', status: 'online', detalhe: '8k/s' }
    ]
  },
  {
    id: 'analytics',
    icon: Activity,
    titulo: 'Analytics',
    descricao: 'BI em tempo real com dashboards preditivos',
    recursos: [
      { nome: 'BI Real-Time', status: 'online', detalhe: '47 dashboards' },
      { nome: 'Machine Learning', status: 'treinando', detalhe: '12 modelos' },
      { nome: 'Sistema de Alertas', status: 'monitorando', detalhe: '156 regras' }
    ]
  }
];

const metricas = [
  { label: 'Uptime', valor: '99.8%', cor: 'text-green-600' },
  { label: 'Latência Média', valor: '<42ms', cor: 'text-blue-600' },
  { label: 'Requisições/dia', valor: '2.4M', cor: 'text-purple-600' },
  { label: 'Sistemas Ativos', valor: '18', cor: 'text-orange-600' }
];

const statusCores = {
  online: 'bg-green-500',
  ativo: 'bg-blue-500',
  sincronizando: 'bg-yellow-500',
  monitorando: 'bg-purple-500',
  treinando: 'bg-orange-500'
};

export default function TecnologiaInfraSection() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-gray-50 to-gabardo-light-blue/10" />
      <div className="absolute -right-16 top-10 -z-10 h-48 w-48 rounded-full bg-gabardo-blue/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-gabardo-light-blue/20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue"
          >
            <Database className="h-4 w-4" />
            Stack Tecnológico
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight"
          >
            Tecnologia & Infraestrutura
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-lg text-gray-600"
          >
            Infraestrutura digital robusta com monitoramento 24/7, automação inteligente e alta disponibilidade
          </motion.p>
        </div>

        {/* Métricas */}
        <div className="mx-auto mb-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((metrica, index) => (
            <motion.div
              key={metrica.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-gabardo-blue/20 bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <div className={`mb-2 text-3xl font-bold ${metrica.cor}`}>
                {metrica.valor}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                {metrica.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid de Tecnologias */}
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tecnologias.map((tech, index) => {
            const Icone = tech.icon;
            const selecionada = categoriaSelecionada === tech.id;

            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setCategoriaSelecionada(selecionada ? null : tech.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  selecionada
                    ? 'border-gabardo-blue bg-blue-50 shadow-2xl'
                    : 'border-gray-200 bg-white shadow-lg hover:border-gabardo-blue/50 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                        selecionada
                          ? 'bg-gabardo-blue shadow-lg'
                          : 'bg-blue-100 group-hover:bg-gabardo-blue/10'
                      }`}
                    >
                      <Icone className={`h-7 w-7 ${selecionada ? 'text-white' : 'text-gabardo-blue'}`} />
                    </div>
                    <ArrowUpRight
                      className={`h-5 w-5 transition-all ${
                        selecionada ? 'rotate-45 text-gabardo-blue' : 'rotate-0 text-gray-400 group-hover:text-gabardo-blue'
                      }`}
                    />
                  </div>

                  {/* Título */}
                  <h3 className="mb-2 text-xl font-bold text-gabardo-blue">
                    {tech.titulo}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">{tech.descricao}</p>

                  {/* Recursos */}
                  <div className="space-y-2">
                    {tech.recursos.map((recurso) => (
                      <motion.div
                        key={recurso.nome}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white/50 p-3 transition-all hover:border-gabardo-blue/30"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative flex h-2 w-2">
                            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusCores[recurso.status as keyof typeof statusCores]} opacity-75`}></span>
                            <span className={`relative inline-flex h-2 w-2 rounded-full ${statusCores[recurso.status as keyof typeof statusCores]}`}></span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {recurso.nome}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-gabardo-blue">
                          {recurso.detalhe}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gabardo-blue/5 to-gabardo-light-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-4 rounded-full border border-gabardo-blue/20 bg-white px-6 py-4 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-semibold text-gray-700">
              Todos os sistemas operacionais
            </span>
          </div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-sm text-gray-500">Última verificação: agora</span>
        </motion.div>
      </div>
    </section>
  );
}
