'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';

const leadershipTeam = [
  {
    name: 'André Gabardo',
    role: 'CEO & Chairman',
    focus: 'Estratégia corporativa',
    bio: 'Lidera a visão de crescimento da Gabardo Distribuidora, com foco em governança, inovação e parcerias estratégicas para a cadeia automotiva.',
    highlight: '25 anos na indústria automotiva',
    avatar: '/images/leadership/andre-gabardo.jpg',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Marina Souza',
    role: 'Diretora de Operações',
    focus: 'Excelência operacional',
    bio: 'Comanda a torre de controle, squads de melhoria contínua e programas de eficiência que conectam unidades e clientes premium.',
    highlight: 'SLA 98% mantido desde 2022',
    avatar: '/images/leadership/marina-souza.jpg',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Ricardo Azevedo',
    role: 'Diretor de Tecnologia & ESG',
    focus: 'Dados e sustentabilidade',
    bio: 'Responsável por plataformas digitais proprietárias, telemetria embarcada e roadmap de carbono negativo para a frota.',
    highlight: 'Projetos ESG reconhecidos pela SGS',
    avatar: '/images/leadership/ricardo-azevedo.jpg',
    linkedin: 'https://www.linkedin.com/',
  },
];

const leadershipMissions = [
  'Governança ativa com comitês multidisciplinares e auditoria recorrente.',
  'Programas de desenvolvimento que conectam líderes e times operacionais.',
  'Decisões orientadas por dados e indicadores ESG em tempo real.',
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
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
              Pessoas que sustentam nossa operação institucional
            </h2>
            <p className="mt-4 text-base text-gray-600 md:text-lg">
              Uma governança robusta conduz projetos transformacionais, mantendo o DNA Gabardo em cada decisão.
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
            {leadershipMissions.map((mission) => (
              <motion.li
                key={mission}
                className="rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                {mission}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {leadershipTeam.map((leader, index) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 shadow-lg backdrop-blur-sm"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={leader.avatar}
                  alt={`Retrato de ${leader.name}`}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 320px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.28em] text-white/70">{leader.focus}</span>
                  <span className="text-lg font-semibold text-white">{leader.name}</span>
                  <span className="text-sm text-white/80">{leader.role}</span>
                </div>
              </div>

              <div className="space-y-4 px-6 py-8">
                <p className="text-sm leading-relaxed text-gray-600">{leader.bio}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gabardo-blue">
                    {leader.highlight}
                  </span>
                  <motion.a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gabardo-blue/30 text-gabardo-blue transition-colors duration-300 hover:bg-gabardo-blue hover:text-white"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={`LinkedIn de ${leader.name}`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalLeadershipSection;
