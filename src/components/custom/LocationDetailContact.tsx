'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

const LocationDetailContact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
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
        setSubmitted(true);
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
              className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
            >
              Mensagem enviada com sucesso!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="text-xl text-neutral-600 max-w-2xl mx-auto"
            >
              Obrigado pelo seu interesse! Entraremos em contato em breve.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-3 rounded-full bg-neutral-900 px-10 py-4 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_30px_70px_-40px_rgba(19,45,81,0.7)] transition-all duration-300 hover:bg-neutral-800/90"
            >
              Enviar nova mensagem
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            quer saber mais?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-neutral-50 rounded-2xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {error && (
                <div className="md:col-span-2 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
                  <p>{error}</p>
                </div>
              )}
              {submitted && (
                <div className="md:col-span-2 bg-green-50 border-l-4 border-green-400 p-4 text-green-700">
                  <p>Mensagem enviada com sucesso!</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Interesse
                </label>
                <select name="interest" className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent">
                  <option>Coworking</option>
                  <option>Sala Privada</option>
                  <option>Sala de Reunião</option>
                  <option>Outros</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  placeholder="Conte-nos sobre suas necessidades..."
                />
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-900 text-white py-4 px-8 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin mx-auto" /> : 'Enviar Mensagem'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetailContact;