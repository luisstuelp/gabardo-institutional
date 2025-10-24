'use client';

import { motion } from 'framer-motion';
import { Mail, Bell, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const MediaNewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gabardo-blue via-gabardo-blue/95 to-gabardo-blue/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Animated Circles */}
      <motion.div
        className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-gabardo-light-blue/20 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gabardo-light-blue/20 blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            >
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Fique por dentro das novidades
            </h2>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Receba insights exclusivos, tendências do setor e as últimas notícias da Gabardo 
              diretamente no seu e-mail.
            </p>

            {/* Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gabardo-light-blue" />
                <span>Atualizações semanais</span>
              </div>
              <span className="hidden sm:inline text-white/40">•</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gabardo-light-blue" />
                <span>Análises exclusivas</span>
              </div>
            </div>

            {/* Newsletter Form */}
            {!isSubmitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    required
                    className="flex-1 px-6 py-4 rounded-full bg-white/95 backdrop-blur-sm text-gabardo-blue placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-gabardo-light-blue transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gabardo-light-blue text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-gabardo-blue transition-all duration-300 shadow-lg"
                  >
                    Inscrever-se
                  </motion.button>
                </div>
                <p className="text-xs sm:text-sm text-white/60 mt-4">
                  Sem spam. Cancele a qualquer momento.
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center gap-3 text-white">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">Inscrição confirmada!</span>
                </div>
                <p className="text-white/80 mt-2">Obrigado por se inscrever. Você receberá nossas atualizações em breve.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MediaNewsletterSection;
