'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, UserPlus, ClipboardCheck, MessageCircle } from 'lucide-react';

const journeyHighlights = [
  {
    icon: UserPlus,
    title: '1. Cadastro rápido',
    description: 'Conte quem é você, quais experiências e onde quer chegar.'
  },
  {
    icon: ClipboardCheck,
    title: '2. Match com vagas',
    description: 'Times de Talent Acquisition conectam seu perfil às oportunidades abertas.'
  },
  {
    icon: MessageCircle,
    title: '3. Conversa com liderança',
    description: 'Processo transparente, com feedbacks e próxima etapa definidas.'
  }
];

const contactIconClass = 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-md';
const contactIconProps = { className: 'h-5 w-5', strokeWidth: 1.8 } as const;

const ServicesQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="talent-form" className="relative overflow-hidden bg-gradient-to-b from-[#f5f9ff] via-white to-[#eef2f9] py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-32 top-16 h-64 w-64 rounded-full bg-gabardo-blue/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-gabardo-light-blue/15 blur-[110px]" />

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue"
          >
            Solicite sua proposta
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-4xl font-bold uppercase tracking-tight text-gabardo-blue md:text-5xl"
          >
            Vamos trabalhar juntos?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-5 max-w-3xl text-base text-gray-600 md:text-lg"
          >
            Conte as necessidades do seu projeto e receba uma proposta personalizada. Nosso time responde rapidamente e acompanha cada etapa até a sua operação estar ativa.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {journeyHighlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="group relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/80 p-6 shadow-[0_18px_28px_-18px_rgba(19,45,81,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-gabardo-blue/30"
              >
                <div className="absolute -right-10 top-[-20%] h-24 w-24 rounded-full bg-gabardo-light-blue/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gabardo-blue/10 text-gabardo-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">{highlight.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{highlight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/90 p-8 shadow-[0_22px_40px_-22px_rgba(19,45,81,0.45)] md:p-12">
              <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-gabardo-blue/10 blur-[90px]" />
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Empresa *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                    Tipo de Serviço *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors"
                  >
                    <option value="">Selecione o serviço</option>
                    <option value="transporte-veiculos">Transporte de Veículos</option>
                    <option value="transporte-prancha">Transporte em Prancha</option>
                    <option value="armazenagem">Armazenagem</option>
                    <option value="logistica-integrada">Logística Integrada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#132D51'}}>
                    Detalhes do Projeto
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-gabardo-blue transition-colors resize-none"
                    placeholder="Descreva suas necessidades, volume esperado, rotas, prazos e outras informações relevantes..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gabardo-blue px-10 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0f1f3a] md:w-auto"
                >
                  <Send className="w-5 h-5" />
                  Enviar proposta
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8 space-y-8">
              <div className="space-y-6 overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/90 p-8 shadow-[0_18px_32px_-18px_rgba(19,45,81,0.4)]">
                <h3 className="text-xl font-semibold text-gabardo-blue">Atendimento Comercial</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Nossa equipe conecta soluções logísticas no Brasil e LATAM com SLA ágil e acompanhamento consultivo.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={contactIconClass}>
                      <Mail {...contactIconProps} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">E-mail</h4>
                      <p className="text-gray-600">comercial@transgabardo.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={contactIconClass}>
                      <Phone {...contactIconProps} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">Central</h4>
                      <p className="text-gray-600">(51) 2108-2400</p>
                      <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Atendimento em horário comercial</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={contactIconClass}>
                      <MapPin {...contactIconProps} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-gabardo-blue">Matriz</h4>
                      <p className="text-gray-600">Porto Alegre - RS</p>
                      <p className="text-gray-600">14 unidades no Brasil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesQuoteSection;
