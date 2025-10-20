'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Workflow, BarChart3, Users2, Building2, Shield, Scale, FileCheck, Users } from 'lucide-react';

const governanceHighlights = [
  'Comitês multidisciplinares que asseguram compliance e LGPD.',
  'Auditorias independentes e reporting trimestral para clientes estratégicos.',
  'Indicadores ESG em tempo real conectados à torre de controle.',
];

const governancePractices = [
  {
    icon: Shield,
    title: 'Programa de integridade',
    description: 'Políticas anticorrupção, canais de denúncia e auditorias independentes reforçam a ética em nossas operações.',
  },
  {
    icon: Scale,
    title: 'Compliance regulatório',
    description: 'Monitoramento contínuo de legislação, LGPD e normas ANTT com time jurídico dedicado.',
  },
  {
    icon: FileCheck,
    title: 'Gestão de riscos',
    description: 'Mapeamento corporativo de riscos com matrizes de impacto, planos de contingência e indicadores de governança.',
  },
  {
    icon: Users,
    title: 'Conselhos e comitês',
    description: 'Estrutura com comitês ESG, financeiro e de pessoas garantindo decisões colegiadas e transparência.',
  },
  {
    icon: Workflow,
    title: 'Padronização de processos',
    description: 'Metodologias e manuais corporativos asseguram consistência nas operações e prestação de contas.',
  },
];


const governanceThemes = [
  {
    icon: ShieldCheck,
    title: 'Governança e Compliance',
    description:
      'Políticas corporativas rígidas, canal de ética independente e matriz de riscos atualizada para toda a cadeia automotiva.',
    bullets: [
      'Certificações ISO 9001, 14001 e 39001 renovadas com auditoria externa.',
      'LGPD operacionalizada com inventário de dados e treinamentos contínuos.',
    ],
  },
  {
    icon: Workflow,
    title: 'Modelos Operacionais Integrados',
    description:
      'Torre de controle com equipes ágeis, conectando operações, tecnologia e ESG em encontros semanais.',
    bullets: [
      'Indicadores OKR (Objectives and Key Results) de governança compartilhados entre operações e clientes premium.',
      'Planos de continuidade com simulações trimestrais e gestão de crises.',
    ],
  },
  {
    icon: BarChart3,
    title: 'Dados e Performance',
    description:
      'Telemetria embarcada e BI proprietários que ancoram decisões estratégicas e táticas em tempo real.',
    bullets: [
      'Dashboards ESG integrados ao inventário GEE acompanhado pelas equipes Gabardo.',
      'KPIs de SLA, segurança e eficiência monitorados 24h pela equipe Gabardo.',
    ],
  },
  {
    icon: Users2,
    title: 'Cultura e Desenvolvimento',
    description:
      'Programas de liderança e trilhas da Academia Gabardo sustentam sucessão interna e engajamento em larga escala.',
    bullets: [
      'Lideranças desenvolvidas internamente pela Academia Gabardo.',
      'Planos de carreiras estruturados para operação, tecnologia e áreas corporativas.',
    ],
  },
  {
    icon: Building2,
    title: 'Relacionamento com Stakeholders',
    description:
      'Governança compartilhada com clientes, fornecedores e comunidades para garantir transparência e performance contínua.',
    bullets: [
      'Comitês conjuntos com montadoras e parceiros logísticos-chave.',
      'Relatórios trimestrais de performance com indicadores ESG e operacionais.',
    ],
  },
];

const SobreInstitucionalLeadershipSection = () => {
  return (
    <section
      id="lideres-gabardo"
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-16 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-[160px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.36em] text-gabardo-blue">
              Liderança & governança
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Estruturas que preservam o DNA Gabardo em cada decisão
            </h2>
            <p className="mt-4 text-base text-gray-600 md:text-lg">
              Nossa governança combina compliance, inteligência de dados e cultura de alto desempenho para garantir execução consistente da estratégia Gabardo em toda a LATAM.
            </p>
          </motion.div>

          <motion.ul
            className="grid gap-3 text-sm text-gray-500 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {governanceHighlights.map((highlight) => (
              <motion.li
                key={highlight}
                className="rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                {highlight}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {governanceThemes.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <motion.article
                key={theme.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="absolute -right-16 top-6 h-32 w-32 rounded-full bg-gabardo-blue/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{theme.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{theme.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {theme.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gabardo-blue" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">Como garantimos governança sólida</h3>
          <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
            Esses temas se materializam em práticas diárias que protegem o negócio, fortalecem relações e mantêm a Gabardo preparada para evoluir em qualquer cenário.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {governancePractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <motion.article
                  key={practice.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gabardo-blue/10 text-gabardo-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{practice.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{practice.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreInstitucionalLeadershipSection;
