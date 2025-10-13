'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, BookOpen, Ticket, Truck, Shield, GraduationCap } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Apoio 24h',
    description: 'Atendimento especializado para colaboradores e familiares, com apoio psicológico, social e jurídico.',
    badge: 'Cuidado integral'
  },
  {
    icon: Gift,
    title: 'Kit Nascimento',
    description: 'Licenças estendidas, kit especial e rede de acolhimento para famílias.',
    badge: 'Famílias presentes'
  },
  {
    icon: BookOpen,
    title: 'Auxílio Escolar',
    description: 'Apoio financeiro na compra de material escolar para filhos de colaboradores.',
    badge: 'Educação em foco'
  },
  {
    icon: Ticket,
    title: 'Clube de Descontos',
    description: 'Marketplace com vantagens em viagens, cultura, gastronomia e bem-estar.',
    badge: 'Vantagens exclusivas'
  },
  {
    icon: Truck,
    title: 'Plano de Carreira Motorista',
    description: 'Programa para mudança de categoria da CNH com investimento facilitado.',
    badge: 'Evolução contínua'
  },
  {
    icon: Shield,
    title: 'Segurança & saúde',
    description: 'Protocolos rígidos, campanhas periódicas e suporte médico dedicado.',
    badge: 'Ambiente seguro'
  },
];

const extras = [
  {
    icon: GraduationCap,
    title: 'Academia Gabardo',
    description: 'Workshops, mentorias e certificações sustentando trilhas de liderança e operação.'
  },
  {
    icon: Heart,
    title: 'Programa Bem-Estar',
    description: 'Gympass corporativo, campanhas de saúde mental e incentivo ao esporte.'
  }
];

const TrabalheConoscoBenefitsSection: React.FC = () => {
  return (
    <section id="beneficios-gabardo" className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-gabardo-blue/5 via-transparent to-gabardo-blue/5" />
      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue shadow-sm"
          >
            Nossos benefícios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-3xl font-semibold text-gabardo-blue md:text-4xl"
          >
            Cuidamos da sua jornada dentro e fora da Gabardo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-3xl text-base text-gray-600 md:text-lg"
          >
            Os benefícios combinam cuidado, reconhecimento e oportunidades para você e sua família evoluírem junto com a nossa operação.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-gabardo-blue/10 bg-white/90 p-7 shadow-[0_18px_32px_-20px_rgba(19,45,81,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-gabardo-blue/30 hover:shadow-[0_24px_40px_-18px_rgba(19,45,81,0.45)]"
              >
                <div className="absolute inset-x-4 top-0 h-24 -translate-y-1/2 rounded-full bg-gradient-to-br from-gabardo-light-blue/25 to-gabardo-blue/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-gabardo-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gabardo-blue">
                      {benefit.badge}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-gabardo-blue">{benefit.title}</h3>
                  </div>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid gap-6 rounded-3xl border border-gabardo-blue/10 bg-gradient-to-br from-white via-white to-gabardo-blue/5 p-8 md:grid-cols-2"
        >
          {extras.map((extra) => {
            const Icon = extra.icon;
            return (
              <div key={extra.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gabardo-blue">{extra.title}</h4>
                  <p className="text-sm text-gray-600">{extra.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#talent-form"
            className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Quero fazer parte
          </a>
          <span className="text-sm text-gray-500">Benefícios para unidades no Brasil e LATAM.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default TrabalheConoscoBenefitsSection;
