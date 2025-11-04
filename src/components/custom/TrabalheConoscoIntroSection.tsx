'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const contactMethods = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: 'Telefone',
    description: '+55 (51) 3373-3000',
    href: 'tel:+555133733000'
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: 'E-mail',
    description: 'gabardo@transgabardo.com.br',
    href: 'mailto:gabardo@transgabardo.com.br'
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Localização',
    description: 'Av. Fernando Ferrari, 700 - Porto Alegre/RS',
    href: 'https://maps.app.goo.gl/XUcq2YCMRnNZcwrz5'
  },
];

const TrabalheConoscoIntroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f5f7fb] to-[#eef3fb] py-16 md:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gabardo-blue/10 to-transparent" />
      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/20 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-gabardo-blue" />
            Entre em contato
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-3xl font-semibold text-gabardo-blue md:text-4xl"
          >
            Estamos aqui para ajudar você
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-5 text-lg leading-relaxed text-gray-600"
          >
            Nossa equipe está disponível para esclarecer dúvidas, fornecer orçamentos, discutir parcerias ou receber sugestões. Escolha o canal mais conveniente e fale com a Gabardo hoje mesmo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center gap-4 text-left sm:flex-row sm:gap-6"
          >
            {contactMethods.map((method) => (
              <a 
                key={method.title} 
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex w-full max-w-sm items-start gap-4 rounded-2xl border border-gabardo-blue/15 bg-white/80 p-5 shadow-sm backdrop-blur hover:border-gabardo-blue/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gabardo-blue/10 text-gabardo-blue">
                  {method.icon}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gabardo-blue">{method.title}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 rounded-full bg-gabardo-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Enviar mensagem
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/orcamento"
              className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue px-8 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-gabardo-blue transition-colors duration-300 hover:bg-gabardo-blue/10"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrabalheConoscoIntroSection;
