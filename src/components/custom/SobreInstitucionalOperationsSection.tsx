'use client';

import { motion } from 'framer-motion';

const operations = [
  {
    title: 'Planejamento estratégico',
    description:
      'OKRs conectam diretoria e unidades operacionais, com ritos quinzenais que calibram performance e mitigam riscos.',
    kpi: '98% dos planos táticos concluídos dentro do período',
  },
  {
    title: 'Monitoramento em tempo real',
    description:
      'Torre de controle 24h/7d com telemetria embarcada e alertas preditivos acionados por IA proprietária.',
    kpi: 'Redução de 37% em desvios críticos 2024',
  },
  {
    title: 'Suporte integrado',
    description:
      'Service desk omnichannel conecta manutenção, atendimento e jurídico, garantindo SLA de retorno em até 15 minutos.',
    kpi: '93% de resolução no primeiro contato',
  },
  {
    title: 'Melhoria contínua',
    description:
      'Squads multifuncionais lideram laboratórios de inovação e Kaizens trimestrais com foco em digitalização de processos.',
    kpi: '65 iniciativas evolutivas implantadas em 12 meses',
  },
];

const SobreInstitucionalOperationsSection = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-16 sm:py-20 md:py-24 lg:py-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-24 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-[140px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.38em] text-gabardo-blue">Rotinas institucionais</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Como nossa estrutura ganha vida no dia a dia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A excelência institucional da Gabardo se traduz em ritos de governança, tecnologia aplicada e suporte colaborativo que mantêm operações críticas sob controle.
            </p>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-base font-semibold text-gabardo-blue uppercase tracking-[0.28em]">Governança viva</h3>
              <p className="mt-3 text-sm text-gray-600">
                Comitês executivos semanais, dashboards em tempo real e relatórios ESG sustentam decisões rápidas e baseadas em dados.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-3 bottom-3 hidden w-px bg-gradient-to-b from-gabardo-blue/40 via-gabardo-blue/20 to-transparent sm:block" />
            <div className="space-y-8">
              {operations.map((operation, index) => (
                <motion.div
                  key={operation.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-3 pl-0 sm:pl-12">
                    <motion.span
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 36 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                      className="absolute left-0 top-6 hidden h-3 w-3 rounded-full bg-gabardo-blue sm:block"
                    />
                    <span className="text-xs uppercase tracking-[0.3em] text-gabardo-blue/70">Etapa {String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl font-semibold text-gray-900">{operation.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{operation.description}</p>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gabardo-blue">
                      {operation.kpi}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOperationsSection;
