'use client';
import { motion } from 'framer-motion';
import { Zap, BarChart2, Briefcase, GitBranch, Users } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/Scrollstack';

const items = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "TECNOLOGIA E ENERGIA",
    description: "Mantemos esforços voltados para o uso eficiente de energia, ações de ecoeficiência e também através da compra de energia renovável pelo mercado livre. Mantendo nossa frota com baixa idade média, com veículos modernos e eficientes."
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: "CONTABILIZANDO",
    description: "Contabilizando, gerenciando e buscando alternativas para reduzir emissões."
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "OPORTUNIDADES",
    description: "Mapeando e incorporando riscos e oportunidades sobre a mudança do clima à estratégia de negócios da companhia. Analisando cenários e estudando ações que impactem positivamente em nossas emissões."
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: "FONTES DE EMISSÕES",
    description: "Analisamos nossas fontes de emissões que temos responsabilidade direta e indiretamente. Em nossos escopos 1, 2 e também monitorando as emissões de escopo 3. Buscamos entender a peculiaridade de cada uma de nossas operações."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "PÚBLICOS DE RELACIONAMENTO",
    description: "Envolvendo os demais públicos de relacionamento na discussão, engajando ações que visam a compensação de nossas emissões com a cadeia de valor."
  }
];

export default function HowWeActSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-1 text-center"
        >
          Como atuamos em relação à gestão de nossas emissões?
        </motion.h2>
        <div className="relative mt-0">
          <div className="mx-auto h-[75vh] max-w-4xl">
            <ScrollStack
              className="h-full"
              itemDistance={90}
              itemStackDistance={42}
              baseScale={0.9}
              itemScale={0.04}
              stackPosition="22%"
              scaleEndPosition="12%"
            >
              {items.map((item) => (
                <ScrollStackItem
                  key={item.title}
                  itemClassName="bg-white/95 border border-gabardo-blue/10 shadow-[0_28px_80px_-48px_rgba(19,45,81,0.35)] px-8 py-10 rounded-3xl"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gabardo-light-blue text-white">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-gabardo-blue">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  );
}
