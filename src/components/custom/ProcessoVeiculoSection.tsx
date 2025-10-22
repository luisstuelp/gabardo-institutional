'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  TruckIcon, 
  ScanLine, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  PackageCheck,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import { useState, useEffect } from 'react';

const processoEtapas = [
  {
    id: 1,
    icon: TruckIcon,
    titulo: 'Recebimento',
    descricao: 'Check-in digital com leitura automatizada de VIN, inspeção visual e registro fotográfico 360°.',
    tempo: '15 min',
    itens: ['Leitura VIN automatizada', 'Registro fotográfico 360°', 'Check-in em tempo real', 'QR Code gerado']
  },
  {
    id: 2,
    icon: ScanLine,
    titulo: 'Inspeção Eletrônica',
    descricao: 'Diagnóstico completo com scanner OBD-II, verificação de sistemas eletrônicos e análise preditiva.',
    tempo: '30 min',
    itens: ['Scanner OBD-II', 'Diagnóstico de falhas', 'Análise de ECU', 'Relatório digital']
  },
  {
    id: 3,
    icon: Wrench,
    titulo: 'PDI & Manutenção',
    descricao: 'PDI digital com checklist de 127 pontos em boxes climatizados, manutenção preventiva e certificação.',
    tempo: '3 horas',
    itens: ['Checklist 127 pontos', 'Boxes climatizados', 'Rastreabilidade total', 'Certificação digital']
  },
  {
    id: 4,
    icon: Sparkles,
    titulo: 'Estética Premium',
    descricao: 'Lavagem técnica, polimento profissional e aplicação de proteções conforme padrão de marca.',
    tempo: '90 min',
    itens: ['Lavagem técnica', 'Polimento profissional', 'Proteção de pintura', 'Padrão de marca']
  },
  {
    id: 5,
    icon: CheckCircle2,
    titulo: 'Inspeção Final',
    descricao: 'Auditoria tripla com checklist de qualidade, aprovação fotográfica e certificação digital.',
    tempo: '25 min',
    itens: ['Auditoria 3 níveis', 'Aprovação fotográfica', 'Certificado digital', 'Liberação sistema']
  },
  {
    id: 6,
    icon: PackageCheck,
    titulo: 'Expedição',
    descricao: 'Documentação completa, carregamento monitorado e rastreamento GPS com notificação ao cliente.',
    tempo: '40 min',
    itens: ['Rastreamento GPS', 'Notificação cliente', 'SLA garantido', 'Doc digital']
  }
];

export default function ProcessoVeiculoSection() {
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [reproduzindo, setReproduzindo] = useState(false);

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (reproduzindo) {
      intervalo = setInterval(() => {
        setEtapaAtiva((prev) => {
          const proxima = (prev + 1) % processoEtapas.length;
          if (proxima === 0) {
            setReproduzindo(false);
          }
          return proxima;
        });
      }, 3000);
    }
    return () => clearInterval(intervalo);
  }, [reproduzindo]);

  const etapaCorrente = processoEtapas[etapaAtiva];
  const IconeAtual = etapaCorrente.icon;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      {/* Subtle background orbs */}
      <div className="absolute -left-16 top-20 -z-10 h-64 w-64 rounded-full bg-gabardo-blue/10 blur-3xl" />
      <div className="absolute -right-24 bottom-20 -z-10 h-64 w-64 rounded-full bg-gabardo-light-blue/20 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue"
          >
            <TruckIcon className="h-4 w-4" />
            Processo Completo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight"
          >
            Jornada do Veículo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-lg text-gray-600"
          >
            Do recebimento à expedição: 6 etapas otimizadas com tecnologia, controle de qualidade e rastreabilidade total
          </motion.p>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Main Grid */}
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Sidebar - Etapas */}
            <div className="space-y-3">
              {processoEtapas.map((etapa, index) => {
                const Icone = etapa.icon;
                const ativa = etapaAtiva === index;
                const concluida = etapaAtiva > index;

                return (
                  <motion.button
                    key={etapa.id}
                    onClick={() => {
                      setEtapaAtiva(index);
                      setReproduzindo(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`group relative flex w-full items-center gap-4 rounded-lg p-4 text-left transition-all duration-300 ${
                      ativa
                        ? 'bg-blue-50 shadow-lg'
                        : concluida
                        ? 'bg-green-50 hover:bg-green-100'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {/* Icone */}
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                        ativa
                          ? 'bg-gabardo-blue text-white shadow-md'
                          : concluida
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-100 text-gabardo-blue'
                      }`}
                    >
                      {concluida && !ativa ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Icone className="h-6 w-6" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">
                          {String(etapa.id).padStart(2, '0')}
                        </span>
                        <span className={`text-sm font-semibold ${ativa ? 'text-gabardo-blue' : 'text-gray-700'}`}>
                          {etapa.titulo}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">{etapa.tempo}</div>
                    </div>

                    {/* Arrow */}
                    {ativa && (
                      <ArrowRight className="h-5 w-5 text-gabardo-blue" />
                    )}
                  </motion.button>
                );
              })}

              {/* Play/Pause Button */}
              <button
                onClick={() => setReproduzindo(!reproduzindo)}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gabardo-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gabardo-light-blue hover:shadow-xl"
              >
                {reproduzindo ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Reproduzir Processo
                  </>
                )}
              </button>
            </div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={etapaAtiva}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-gabardo-blue/20 bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-xl"
              >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gabardo-blue shadow-lg">
                      <IconeAtual className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Etapa {etapaCorrente.id}
                      </div>
                      <h3 className="text-3xl font-bold text-gabardo-blue">
                        {etapaCorrente.titulo}
                      </h3>
                    </div>
                  </div>

                  {/* Tempo Badge */}
                  <div className="rounded-full bg-gabardo-blue/10 px-4 py-2 text-sm font-semibold text-gabardo-blue">
                    {etapaCorrente.tempo}
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  {etapaCorrente.descricao}
                </p>

                {/* Items Grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {etapaCorrente.itens.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 rounded-lg border border-gabardo-blue/10 bg-white p-3 shadow-sm transition-all hover:border-gabardo-blue/30 hover:shadow-md"
                    >
                      <div className="h-2 w-2 rounded-full bg-gabardo-light-blue" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="mt-8 flex items-center gap-2">
                  {processoEtapas.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        idx === etapaAtiva
                          ? 'bg-gabardo-blue'
                          : idx < etapaAtiva
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
