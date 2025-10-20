'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GraduationCap, HeartHandshake, Users2, Trophy } from 'lucide-react';

const developmentTracks = [
  {
    icon: GraduationCap,
    title: 'Academia Gabardo',
    description:
      'Programa contínuo com trilhas de liderança, segurança viária, ESG e atendimento ao cliente, somando mais de 32 mil horas treinadas em 2024.'
  },
  {
    icon: HeartHandshake,
    title: 'Cuidado com as Pessoas',
    description:
      'Clínicas de saúde ocupacional, apoio psicossocial, programa Família na Estrada e ações de diversidade que acolhem colaboradores e agregados.'
  },
  {
    icon: Users2,
    title: 'Equipes Multidisciplinares',
    description:
      'Times dedicados por cliente conectam operações, TI, compliance e ESG para decisões rápidas e padronizadas em todo o Brasil.'
  },
  {
    icon: Trophy,
    title: 'Reconhecimento Contínuo',
    description:
      'Campanhas de performance, ranking de indicadores e celebrações trimestrais valorizam os resultados conquistados em equipe.'
  }
];

const testimonies = [
  {
    quote:
      '"A cultura da Gabardo nos incentiva a inovar e compartilhar conhecimento. Ver um indicador melhorar porque colaboramos em conjunto é a nossa maior motivação."',
    name: 'Fernanda Lopes',
    role: 'Gerente de Operações Integradas'
  },
  {
    quote:
      '"Nosso compromisso com segurança e ESG transforma a rotina. A gente se sente parte de algo maior, cuidando dos veículos, das pessoas e do planeta."',
    name: 'João Gil',
    role: 'Coordenador de Frota Carbono Negativo'
  }
];

const SobreQualidadePeopleSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-10 h-56 w-56 rounded-full bg-gabardo-light-blue/15 blur-3xl" />
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-gabardo-blue/15 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gabardo-blue">
              Pessoas que sustentam a qualidade
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gabardo-blue">
              Equipes especializadas e engajadas garantem resultados consistentes
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              Nossos colaboradores são protagonistas na entrega de qualidade. Com formação contínua, ferramentas de colaboração e uma cultura de reconhecimento, conectamos conhecimento técnico, experiência em logística automotiva e valores ESG para superar metas.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {developmentTracks.map((track) => {
                const Icon = track.icon;
                return (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex items-start gap-3 rounded-2xl border border-gabardo-blue/10 bg-white/90 p-5 shadow-sm"
                  >
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gabardo-light-blue/20 text-gabardo-blue">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gabardo-blue">{track.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{track.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[34px] border border-gabardo-blue/15 bg-gabardo-blue/5 p-6 shadow-[0_30px_80px_-40px_rgba(19,45,81,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gabardo-light-blue/20" />
            <div className="relative space-y-6">
              {testimonies.map((item) => (
                <motion.blockquote
                  key={item.name}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-2xl bg-white/70 p-6 text-sm italic text-gabardo-blue shadow-sm"
                >
                  {item.quote}
                  <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gabardo-blue/70">
                    {item.name} · {item.role}
                  </footer>
                </motion.blockquote>
              ))}
            </div>

            <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/40">
              <Image
                src="/images/Trans Gabardo - Framers produtora -5684.JPG"
                alt="Equipe Gabardo"
                width={720}
                height={420}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreQualidadePeopleSection;
