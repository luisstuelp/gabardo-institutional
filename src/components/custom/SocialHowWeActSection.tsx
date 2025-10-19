'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, HeartHandshake, Headset, ShieldCheck } from 'lucide-react';

const items = [
  {
    icon: Users,
    title: 'Cultura centrada em pessoas',
    description:
      'Programas contínuos de clima, escuta ativa e reconhecimento que fortalecem o engajamento e a permanência do nosso time em todo o Brasil.'
  },
  {
    icon: GraduationCap,
    title: 'Academia Gabardo',
    description:
      'Capacitação técnica e comportamental para colaboradores e motoristas, com trilhas de aprendizagem, simuladores e acompanhamento de performance.'
  },
  {
    icon: HeartHandshake,
    title: 'Parcerias comunitárias',
    description:
      'Projetos sociais em municípios estratégicos apoiando educação, saúde e geração de renda nas comunidades onde operamos.'
  },
  {
    icon: Headset,
    title: 'Suporte ao motorista agregado',
    description:
      'Centros de atendimento 24h/7d, assistência jurídica e programas de orientação financeira para nossos parceiros de estrada.'
  },
  {
    icon: ShieldCheck,
    title: 'Saúde e segurança ocupacional',
    description:
      'Protocolos atualizados de segurança, exames periódicos e campanhas de bem-estar físico e mental para colaboradores e famílias.'
  }
];

export default function SocialHowWeActSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7faff] via-white to-[#eef4ff] py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-3xl" />
        <div className="absolute left-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-gabardo-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
            Como cuidamos das pessoas e comunidades
          </span>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Valorizamos cultura, desenvolvimento e suporte integral às pessoas que fazem a Gabardo acontecer todos os dias.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, description }) => (
            <motion.li
              key={title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              className="group h-full overflow-hidden rounded-3xl border border-gabardo-blue/10 bg-white/90 p-8 shadow-[0_28px_90px_-60px_rgba(19,45,81,0.5)] backdrop-blur transition-transform duration-300 hover:-translate-y-2"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-gabardo-blue">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
