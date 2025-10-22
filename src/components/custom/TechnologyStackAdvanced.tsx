'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  Zap, 
  Lock,
  Radio,
  Activity,
  Server,
  Shield,
  Cpu,
  Network,
  HardDrive,
  GitBranch
} from 'lucide-react';
import { useState, useEffect } from 'react';

const techStack = [
  {
    id: 'connectivity',
    icon: Radio,
    title: 'Conectividade',
    gradient: 'from-blue-500 via-blue-600 to-cyan-600',
    glow: 'shadow-blue-500/50',
    items: [
      { name: 'SD-WAN Enterprise', status: 'online', uptime: '99.98%' },
      { name: 'Links Redundantes', status: 'online', bandwidth: '10Gbps' },
      { name: 'Backup Automático', status: 'syncing', frequency: 'Noturno' }
    ]
  },
  {
    id: 'data',
    icon: Database,
    title: 'Dados',
    gradient: 'from-purple-500 via-purple-600 to-pink-600',
    glow: 'shadow-purple-500/50',
    items: [
      { name: 'PostgreSQL Cluster', status: 'online', nodes: '5 nodes' },
      { name: 'Replicação Multi-Região', status: 'syncing', lag: '<10ms' },
      { name: 'DR Site Ativo', status: 'online', rto: '15min' }
    ]
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    gradient: 'from-orange-500 via-orange-600 to-red-600',
    glow: 'shadow-orange-500/50',
    items: [
      { name: 'AWS Híbrida', status: 'online', regions: '3 zonas' },
      { name: 'Kubernetes', status: 'online', pods: '127 ativos' },
      { name: 'Auto-Scaling', status: 'monitoring', threshold: '70%' }
    ]
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Segurança',
    gradient: 'from-teal-500 via-teal-600 to-emerald-600',
    glow: 'shadow-teal-500/50',
    items: [
      { name: 'Zero Trust Architecture', status: 'online', policies: '234' },
      { name: 'SSL/TLS Certificates', status: 'online', expires: '340d' },
      { name: 'VPN Dedicada', status: 'online', users: '89' }
    ]
  },
  {
    id: 'processing',
    icon: Zap,
    title: 'Processamento',
    gradient: 'from-green-500 via-green-600 to-emerald-600',
    glow: 'shadow-green-500/50',
    items: [
      { name: 'Workflow Engine', status: 'online', tasks: '1.2k/dia' },
      { name: 'API Gateway', status: 'online', requests: '45k/min' },
      { name: 'Message Queue', status: 'online', throughput: '8k/s' }
    ]
  },
  {
    id: 'analytics',
    icon: Activity,
    title: 'Analytics',
    gradient: 'from-gabardo-blue via-blue-600 to-gabardo-light-blue',
    glow: 'shadow-blue-500/50',
    items: [
      { name: 'BI Real-Time', status: 'online', dashboards: '47' },
      { name: 'ML Pipeline', status: 'training', models: '12' },
      { name: 'Alerting System', status: 'monitoring', rules: '156' }
    ]
  }
];

const liveMetrics = [
  { label: 'Uptime', value: '99.8%', trend: 'up', color: 'text-green-400', icon: Activity },
  { label: 'Latência', value: '<42ms', trend: 'down', color: 'text-blue-400', icon: Zap },
  { label: 'Requisições', value: '2.4M', trend: 'up', color: 'text-purple-400', icon: Server },
  { label: 'CPU Load', value: '34%', trend: 'stable', color: 'text-orange-400', icon: Cpu }
];

const statusColors = {
  online: 'bg-green-500',
  syncing: 'bg-yellow-500',
  monitoring: 'bg-blue-500',
  training: 'bg-purple-500'
};

const statusLabels = {
  online: 'Online',
  syncing: 'Sincronizando',
  monitoring: 'Monitorando',
  training: 'Treinando'
};

export default function TechnologyStackAdvanced() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [networkNodes, setNetworkNodes] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Generate random network nodes
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: i
    }));
    setNetworkNodes(nodes);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const selected = techStack.find(s => s.id === selectedStack);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-20">
      {/* Network Visualization Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="h-full w-full">
          {networkNodes.map((node, i) => (
            <motion.g key={node.id}>
              {/* Lines connecting nodes */}
              {networkNodes.slice(i + 1, i + 4).map((target) => (
                <motion.line
                  key={`${node.id}-${target.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(56, 182, 255, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                />
              ))}
              {/* Node circles */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="#38B6FF"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-xl">
            <Network className="h-5 w-5 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
              Arquitetura Digital
            </span>
          </div>
          <h2 className="mb-4 text-5xl font-black text-white md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Stack Tecnológico
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Infraestrutura cloud-native escalável com monitoramento 24/7 e automação inteligente
          </p>
        </motion.div>

        {/* Live Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {liveMetrics.map((metric, index) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-2xl"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative">
                  <div className="mb-3 flex items-center justify-between">
                    <MetricIcon className={`h-8 w-8 ${metric.color}`} />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="h-2 w-2 rounded-full bg-green-400"
                    />
                  </div>
                  <div className={`mb-1 text-3xl font-black ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    {metric.label}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                    <motion.div
                      animate={{ y: metric.trend === 'up' ? [-2, 0] : metric.trend === 'down' ? [0, -2] : [0, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </motion.div>
                    {metric.trend === 'stable' ? 'Estável' : 'Otimizado'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {techStack.map((stack, index) => {
            const StackIcon = stack.icon;
            const isSelected = selectedStack === stack.id;

            return (
              <motion.div
                key={stack.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setSelectedStack(isSelected ? null : stack.id)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                  isSelected
                    ? 'border-white/50 shadow-2xl'
                    : 'border-white/10 shadow-xl hover:border-white/30'
                } bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl`}>
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stack.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stack.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50`} />

                  <div className="relative p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`rounded-2xl bg-gradient-to-br ${stack.gradient} p-4 ${stack.glow} shadow-2xl`}
                      >
                        <StackIcon className="h-8 w-8 text-white" />
                      </motion.div>

                      <motion.div
                        animate={{ rotate: isSelected ? 90 : 0 }}
                        className="text-2xl font-black text-white"
                      >
                        {isSelected ? '×' : '+'}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-black text-white">
                      {stack.title}
                    </h3>

                    {/* Items */}
                    <div className="space-y-3">
                      {stack.items.map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="group/item relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Status indicator */}
                              <div className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusColors[item.status as keyof typeof statusColors]} opacity-75`}></span>
                                <span className={`relative inline-flex h-2 w-2 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}></span>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {statusLabels[item.status as keyof typeof statusLabels]}
                                </div>
                              </div>
                            </div>

                            {/* Metric badge */}
                            <div className={`rounded-lg bg-gradient-to-br ${stack.gradient} px-2 py-1 text-xs font-bold text-white`}>
                              {Object.values(item).find(v => typeof v === 'string' && v !== item.name && v !== item.status)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStack(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-2xl rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-2xl`}
              >
                <button
                  onClick={() => setSelectedStack(null)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <span className="text-2xl text-white">×</span>
                </button>

                <div className="mb-6">
                  <div className={`mb-4 inline-block rounded-2xl bg-gradient-to-br ${selected.gradient} p-4 shadow-2xl`}>
                    <selected.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white">{selected.title}</h3>
                  <p className="mt-2 text-gray-400">Detalhes da infraestrutura e monitoramento em tempo real</p>
                </div>

                <div className="space-y-4">
                  {selected.items.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`} />
                        <span className="text-lg font-bold text-white">{item.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(item).filter(([key]) => key !== 'name' && key !== 'status').map(([key, value]) => (
                          <div key={key} className="rounded-lg bg-white/5 p-2">
                            <div className="text-xs text-gray-400 uppercase">{key}</div>
                            <div className="font-bold text-white">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-6 rounded-full border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-2xl"
        >
          <Shield className="h-5 w-5 text-green-400" />
          <span className="text-sm font-bold text-white">Todos os sistemas operacionais</span>
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="text-sm text-gray-400">Última verificação: agora</span>
        </motion.div>
      </div>
    </section>
  );
}
