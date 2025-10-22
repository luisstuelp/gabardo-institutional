'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  TruckIcon, 
  ScanLine, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  PackageCheck,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';

const journeyStages = [
  {
    id: 1,
    icon: TruckIcon,
    title: 'Recebimento',
    subtitle: 'Portal de Entrada',
    desc: 'Check-in digital automatizado com leitura VIN por câmeras AI, registro fotográfico 360° e verificação instantânea contra base de dados.',
    time: '15min',
    color: 'from-blue-500 via-blue-600 to-cyan-600',
    bgPattern: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
    features: ['Leitura VIN AI', 'Foto 360°', 'Verificação instantânea', 'QR Code gerado'],
    metrics: { accuracy: '99.9%', speed: '30s' }
  },
  {
    id: 2,
    icon: ScanLine,
    title: 'Diagnóstico',
    subtitle: 'Inspeção Técnica',
    desc: 'Scanner OBD-II conectado à nuvem com diagnóstico preditivo de falhas, análise de ECU e validação de sistemas eletrônicos.',
    time: '30min',
    color: 'from-purple-500 via-purple-600 to-pink-600',
    bgPattern: 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
    features: ['OBD-II Cloud', 'Análise ECU', 'Diagnóstico IA', 'Relatório digital'],
    metrics: { systems: '47', dataPoints: '200+' }
  },
  {
    id: 3,
    icon: Wrench,
    title: 'PDI Premium',
    subtitle: 'Preparação Técnica',
    desc: 'Checklist digital de 127 pontos em boxes climatizados com IoT, rastreamento em tempo real e certificação por etapa.',
    time: '3h',
    color: 'from-orange-500 via-orange-600 to-red-600',
    bgPattern: 'radial-gradient(circle at 50% 20%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)',
    features: ['127 checkpoints', 'IoT tracking', 'Certificação etapa', 'Boxes clima'],
    metrics: { points: '127', automation: '85%' }
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Estética Pro',
    subtitle: 'Acabamento Premium',
    desc: 'Lavagem técnica nano-cerâmica, polimento robótico, proteção UV e preparação visual conforme padrão de marca.',
    time: '90min',
    color: 'from-teal-500 via-teal-600 to-emerald-600',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
    features: ['Nano-cerâmica', 'Polimento robô', 'Proteção UV', 'Padrão marca'],
    metrics: { shine: '95%', protection: '24mo' }
  },
  {
    id: 5,
    icon: CheckCircle2,
    title: 'Auditoria',
    subtitle: 'Controle de Qualidade',
    desc: 'Inspeção tripla com AI visual recognition, aprovação fotográfica multi-ângulo e emissão de certificado blockchain.',
    time: '25min',
    color: 'from-green-500 via-green-600 to-emerald-600',
    bgPattern: 'radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
    features: ['AI Visual', '3 níveis audit', 'Blockchain cert', 'Multi-ângulo'],
    metrics: { accuracy: '99.8%', auditors: '3' }
  },
  {
    id: 6,
    icon: PackageCheck,
    title: 'Expedição',
    subtitle: 'Liberação Smart',
    desc: 'Documentação digital completa, carregamento com telemetria GPS 5G e notificação push em tempo real ao cliente.',
    time: '40min',
    color: 'from-gabardo-blue via-blue-600 to-gabardo-light-blue',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(19, 45, 81, 0.3) 0%, transparent 50%)',
    features: ['Doc digital', 'GPS 5G', 'Push real-time', 'SLA garantido'],
    metrics: { tracking: '100%', sla: '98.5%' }
  }
];

export default function VehicleJourneyInteractive() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextStage = (activeStage + 1) % journeyStages.length;
            if (nextStage === 0) {
              setIsPlaying(false);
              return 0;
            }
            setActiveStage(nextStage);
            return 0;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeStage]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStage(0);
    setProgress(0);
  };

  const current = journeyStages[activeStage];
  const Icon = current.icon;

  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 182, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 182, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-20 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 80, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-tr from-teal-500/20 to-green-500/20 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header with Controls */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Processo Inteligente
              </span>
            </div>
            <h2 className="mb-2 text-5xl font-black text-white md:text-6xl lg:text-7xl">
              Jornada do Veículo
            </h2>
            <p className="text-xl text-gray-400">
              6 etapas com tecnologia de ponta e automação completa
            </p>
          </motion.div>

          {/* Playback Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <button
              onClick={handlePlayPause}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              {isPlaying ? (
                <Pause className="relative h-6 w-6 text-white" />
              ) : (
                <Play className="relative h-6 w-6 text-white" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="group relative overflow-hidden rounded-2xl bg-white/10 p-4 backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/20"
            >
              <RotateCcw className="h-6 w-6 text-white transition-transform group-hover:rotate-180" />
            </button>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Sidebar - Stage Navigation */}
          <div className="space-y-3">
            {journeyStages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isActive = activeStage === index;
              const isPast = activeStage > index;

              return (
                <motion.button
                  key={stage.id}
                  onClick={() => {
                    setActiveStage(index);
                    setProgress(0);
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-white/50 bg-white/10 shadow-2xl backdrop-blur-xl'
                      : isPast
                      ? 'border-green-500/30 bg-green-500/5 backdrop-blur-xl'
                      : 'border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/30'
                  }`}
                >
                  {/* Progress Bar for Active Stage */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${stage.color} shadow-lg`
                          : isPast
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {isPast && !isActive ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <StageIcon className="h-6 w-6 text-white" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {String(stage.id).padStart(2, '0')}
                        </span>
                        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {stage.title}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">{stage.time}</div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className={`h-5 w-5 transition-all ${
                        isActive ? 'translate-x-0 text-white opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Main Display Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 10 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              {/* Main Card */}
              <div 
                className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-2xl md:p-12"
                style={{ background: current.bgPattern }}
              >
                {/* Decorative Elements */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-3">
                        <div className={`rounded-2xl bg-gradient-to-br ${current.color} p-4 shadow-2xl`}>
                          <Icon className="h-10 w-10 text-white md:h-12 md:w-12" />
                        </div>
                        <div>
                          <div className="text-sm font-bold uppercase tracking-wider text-gray-400">
                            {current.subtitle}
                          </div>
                          <h3 className="text-4xl font-black text-white md:text-5xl">
                            {current.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Stage Number */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className={`rounded-2xl bg-gradient-to-br ${current.color} p-4 shadow-xl`}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-black text-white">
                          {String(current.id).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-white/80">ETAPA</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
                    {current.desc}
                  </p>

                  {/* Metrics Row */}
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    {Object.entries(current.metrics).map(([key, value], idx) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                      >
                        <div className="text-3xl font-black text-white">{value}</div>
                        <div className="text-sm uppercase tracking-wider text-gray-400">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Features Grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {current.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10"
                      >
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${current.color} shadow-lg`} />
                        <span className="text-sm font-semibold text-white">{feature}</span>
                        <ArrowRight className="ml-auto h-4 w-4 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Time Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl"
                  >
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                    <span className="text-sm font-bold text-white">
                      Tempo médio: {current.time}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {journeyStages.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeStage
                        ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-600'
                        : idx < activeStage
                        ? 'w-8 bg-green-500'
                        : 'w-2 bg-white/20'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </section>
  );
}
