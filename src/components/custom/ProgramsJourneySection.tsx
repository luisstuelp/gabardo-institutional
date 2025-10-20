'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, Rocket } from 'lucide-react';

const journeySteps = [
  {
    icon: <Compass className="w-8 h-8" />,
    title: 'Identificamos Potenciais',
    description:
      'Seleção estratégica de talentos internos e externos, com avaliações técnicas e comportamentais alinhadas aos valores da Gabardo.',
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Desenvolvemos Competências',
    description:
      'Planos individuais de desenvolvimento com mentorias, imersões em operação e módulos digitais que conectam teoria e prática.',
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Aceleramos Resultados',
    description:
      'Projetos pilotos, equipes multidisciplinares e desafios reais que geram inovação, eficiência e impacto social para nossos clientes.',
  },
];

const ProgramsJourneySection = () => {
  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#1d4ed8_0%,_transparent_50%)]" />
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-center"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-light tracking-[0.25em] mb-4 uppercase inline-block text-gabardo-light-blue"
            >
              Jornada Integrada
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-6"
            >
              Cada programa nasce para evoluir com as pessoas
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg md:text-xl font-light leading-relaxed text-gray-200 max-w-2xl"
            >
              Estruturamos jornadas personalizadas que combinam experiência prática, metodologias ágeis e visão de futuro. Assim, garantimos times preparados para liderar a transformação logística do país.
            </motion.p>
          </div>

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex items-start gap-6 p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-gabardo-light-blue/50 transition-all duration-300">
                  <div className="flex-shrink-0 text-gabardo-light-blue">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold uppercase tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg font-light text-gray-200 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight className="hidden md:block w-5 h-5 text-gabardo-light-blue mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsJourneySection;
