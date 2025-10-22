'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

const stages = [
  { id: 1, label: 'Recebimento', time: '15min', desc: 'Check-in digital + VIN' },
  { id: 2, label: 'Inspeção', time: '30min', desc: 'Diagnóstico OBD-II' },
  { id: 3, label: 'PDI', time: '3h', desc: 'Checklist 127 pontos' },
  { id: 4, label: 'Estética', time: '90min', desc: 'Lavagem premium' },
  { id: 5, label: 'Aprovação', time: '25min', desc: 'Auditoria final' },
  { id: 6, label: 'Expedição', time: '40min', desc: 'GPS + Notificação' }
];

export default function VehicleJourneyFlow() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveStage(0);
    
    stages.forEach((_, index) => {
      setTimeout(() => {
        setActiveStage(index);
        if (index === stages.length - 1) {
          setTimeout(() => setIsPlaying(false), 1500);
        }
      }, index * 1500);
    });
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gabardo-blue md:text-5xl">
            Jornada do Veículo
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            6 etapas otimizadas com tecnologia e rastreabilidade total
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Timeline Bar */}
          <div className="relative mb-12">
            <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${((activeStage + 1) / stages.length) * 100}%` 
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Stage Dots */}
            <div className="relative flex justify-between">
              {stages.map((stage, index) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className="group relative flex flex-col items-center"
                >
                  <motion.div
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 ${
                      index <= activeStage
                        ? 'border-white bg-gabardo-blue text-white shadow-lg'
                        : 'border-white bg-gray-300 text-gray-600'
                    } transition-all duration-300 group-hover:scale-110`}
                    animate={index === activeStage ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-sm font-bold">{stage.id}</span>
                  </motion.div>
                  <div className="mt-4 text-center">
                    <div className={`text-sm font-semibold ${
                      index <= activeStage ? 'text-gabardo-blue' : 'text-gray-500'
                    }`}>
                      {stage.label}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{stage.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Card */}
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border-2 border-gabardo-blue/20 bg-gradient-to-br from-gabardo-blue/5 to-gabardo-light-blue/5 p-8 text-center shadow-xl"
          >
            <div className="mb-4 text-6xl font-bold text-gabardo-blue">
              {stages[activeStage].id}
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gabardo-blue">
              {stages[activeStage].label}
            </h3>
            <p className="mb-4 text-xl text-gray-600">
              {stages[activeStage].desc}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-sm font-semibold text-gabardo-blue">
              Duração média: {stages[activeStage].time}
            </div>
          </motion.div>

          {/* Play Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-gabardo-light-blue hover:shadow-xl disabled:opacity-50"
            >
              <Play className="h-5 w-5" />
              {isPlaying ? 'Reproduzindo...' : 'Ver Processo Completo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
