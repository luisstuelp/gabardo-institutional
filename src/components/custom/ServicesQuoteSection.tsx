'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, UserPlus, ClipboardCheck, MessageCircle, CheckCircle, AlertCircle, Loader, Truck, Package, Shield, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import InternationalPhoneInput from '@/components/custom/InternationalPhoneInput';

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

const ServicesQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setError('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section id="talent-form" className="relative overflow-hidden bg-gradient-to-b from-[#f5f9ff] via-white to-[#eef2f9] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gabardo-blue md:text-4xl">Proposta enviada com sucesso!</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 md:text-lg">
              Agradecemos seu interesse. Nossa equipe comercial analisará sua solicitação e entrará em contato em breve com uma proposta detalhada.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full bg-gabardo-blue px-8 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Enviar Nova Proposta
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

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
            className="lg:col-span-10 lg:col-start-2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gabardo-blue/15 bg-white/90 p-8 shadow-[0_22px_40px_-22px_rgba(19,45,81,0.45)] md:p-12">
              <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-gabardo-blue/10 blur-[90px]" />
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                  </div>
                )}
                {submitted && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                    <p>Proposta enviada com sucesso!</p>
                  </div>
                )}
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
                    <InternationalPhoneInput
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      name="phone"
                      required
                      className="px-4 py-3 border border-neutral-300 rounded focus-within:border-gabardo-blue transition-colors"
                      inputClassName="!px-0"
                      placeholder="Seu telefone com código internacional"
                      autoComplete="tel"
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
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gabardo-blue px-10 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0f1f3a] md:w-auto disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'Enviando...' : 'Enviar proposta'}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesQuoteSection;
