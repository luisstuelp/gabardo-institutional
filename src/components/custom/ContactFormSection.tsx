'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

const interestOptions = [
  'Transporte de veículos leves',
  'Transporte em prancha & maquinário',
  'Armazenagem e pátios dedicados',
  'Operações multimodais & cabotagem',
  'Projetos ESG e compliance',
  'Outra necessidade logística'
];



export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      interest: formData.get('interest') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Reset form
        (event.target as HTMLFormElement).reset();
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
      <section id="contact-form" className="section-shell bg-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.08),_transparent_68%)]" />
          <div className="absolute -top-20 -right-28 h-[420px] w-[420px] rounded-full bg-gabardo-light-blue/14 blur-3xl" />
          <div className="absolute -bottom-24 -left-32 h-[480px] w-[480px] rounded-full bg-gabardo-blue/12 blur-[140px]" />
        </motion.div>
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25, type: 'spring', stiffness: 220 }}
              className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100"
            >
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="section-heading mt-6"
            >
              Mensagem enviada com sucesso
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="section-subheading mt-6"
            >
              Obrigado pelo contato! Nosso time retornará em até 24 horas úteis com um plano sob medida para a sua operação.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-3 rounded-full bg-gabardo-blue px-10 py-4 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_30px_70px_-40px_rgba(19,45,81,0.7)] transition-all duration-300 hover:bg-gabardo-blue/90"
            >
              Enviar nova mensagem
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.3em] text-neutral-500 mb-6 uppercase"
          >
            Formulário de Contato
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Como Podemos
            <br />
            <span className="text-gabardo-light-blue">Ajudar?</span>
          </motion.h2>
        </motion.div>

        {/* Refined Form */}
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-neutral-200 bg-white/90 p-6 sm:p-8 md:p-10 shadow-[0_35px_90px_-60px_rgba(19,45,81,0.45)] backdrop-blur"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-l-4 border-red-400 p-6 flex items-center space-x-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            {/* Essential Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3"
              >
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Nome Completo *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={100}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="Seu nome completo"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  E-mail *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="seu@email.com"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Telefone
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={20}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="(00) 0000-0000"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'phone' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              {/* Interest Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-3"
              >
                <label htmlFor="interest" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Interesse
                </label>
                <motion.select
                  id="interest"
                  name="interest"
                  onFocus={() => setFocusedField('interest')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">Selecione seu interesse</option>
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </motion.select>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'interest' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-8">
              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-3"
              >
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Assunto *
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  minLength={5}
                  maxLength={150}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400"
                  placeholder="Qual o assunto da sua mensagem?"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'subject' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-3"
              >
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 uppercase tracking-wider">
                  Mensagem *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={6}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-base sm:text-lg border-0 border-b-2 border-neutral-200 focus:border-gabardo-light-blue focus:outline-none transition-all duration-300 bg-transparent placeholder-neutral-400 resize-none"
                  placeholder="Conte-nos mais sobre o que você precisa..."
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-gabardo-light-blue"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center pt-6 md:pt-8"
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="group bg-gabardo-blue text-white px-10 py-4 text-base sm:text-lg font-bold uppercase tracking-[0.25em] hover:bg-gabardo-blue/90 hover:shadow-lg hover:shadow-gabardo-blue/30 transition-all duration-300 flex items-center space-x-4 touch-manipulation rounded-full disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}