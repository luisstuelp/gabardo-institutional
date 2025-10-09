'use client';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Zap, Cpu, Satellite, LineChart, Layers, Lock } from 'lucide-react';

const inovacoesItems = [
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: "Soluções Personalizadas",
    description: "Desenvolvemos soluções de transporte e logística personalizadas para atender às necessidades específicas de cada cliente."
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Foco no Cliente",
    description: "Ouvimos nossos clientes para entender seus desafios e oferecer as melhores soluções, com agilidade e eficiência."
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Tecnologia de Ponta",
    description: "Investimos em tecnologia de ponta para otimizar nossos processos, aumentar a segurança e a eficiência de nossas operações."
  }
];

const logisticInnovationItems = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Telemetria avançada',
    description: 'Integração de sensores, IoT e analytics para rastrear veículos, emissões e eficiência em tempo real.',
  },
  {
    icon: <Satellite className="w-8 h-8" />,
    title: 'Operações conectadas',
    description: 'Centros de controle com dados satelitais e computação em nuvem para decisões ágeis nas rotas.',
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: 'Modelagem preditiva',
    description: 'Algoritmos que antecipam demanda, evitam ociosidade e otimizam a ocupação da frota.',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Digital twins',
    description: 'Simulações virtuais de corredores logísticos para testar cenários e reduzir emissões.',
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Cibersegurança aplicada',
    description: 'Governança de dados, criptografia e protocolos de proteção para sistemas críticos e telemetria.',
  },
];

export default function InovacoesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-12 text-center"
        >
          Inovações
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inovacoesItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-gabardo-blue/15 bg-gradient-to-br from-white via-white to-gabardo-light-blue/10 shadow-[0_20px_60px_-30px_rgba(19,45,81,0.35)] transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-2xl bg-gabardo-blue text-white mr-4 shadow-[0_10px_25px_-15px_rgba(19,45,81,0.8)]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gabardo-blue">{item.title}</h3>
              </div>
              <p className="text-gray-600 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-gabardo-blue">Como inovamos na logística</h3>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologias proprietárias, conectividade em tempo real e segurança de dados sustentam nossa operação carbono negativa e a experiência dos clientes em toda a cadeia logística.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logisticInnovationItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-8 rounded-3xl border border-gabardo-blue/15 bg-gradient-to-br from-white via-white to-gabardo-light-blue/10 shadow-[0_20px_60px_-30px_rgba(19,45,81,0.35)] transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-2xl bg-gabardo-blue text-white mr-4 shadow-[0_10px_25px_-15px_rgba(19,45,81,0.8)]">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-gabardo-blue">{item.title}</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
