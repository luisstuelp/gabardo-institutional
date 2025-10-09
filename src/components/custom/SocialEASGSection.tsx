'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const socialFocus = [
  'Programas de educação e capacitação profissional para comunidades parceiras',
  'Assistência a motoristas e familiares com saúde, bem-estar e suporte financeiro',
  'Projetos sociais alinhados aos Objetivos de Desenvolvimento Sustentável (ODS)',
  'Engajamento voluntário do time Gabardo em ações locais',
  'Monitoramento contínuo de indicadores de impacto social'
];

export default function SocialESGSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5475.JPG"
          alt="Compromisso social Gabardo"
          fill
          className="object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-black/50 p-8 rounded-3xl backdrop-blur-sm">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold uppercase text-white mb-6"
            >
              Agenda social ESG estratégica
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-200 font-light leading-relaxed mb-6"
            >
              Conectamos nossa materialidade social a projetos de grande alcance, priorizando vínculos duradouros com colaboradores, agregados e comunidades vizinhas às nossas operações.
            </motion.p>
            <ul className="space-y-2 text-gray-100">
              {socialFocus.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gabardo-light-blue" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
}
