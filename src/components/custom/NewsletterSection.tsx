'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedCounter from '@/components/ui/animated-counter';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        setError('Erro ao se inscrever. Tente novamente.');
      }
    } catch (error) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/3" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-xl"
                  />
                  <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="uppercase tracking-wider">Newsletter Exclusiva</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                <span className="block">MANTENHA-SE</span>
                <span className="block text-white/70">SEMPRE</span>
                <span className="block">ATUALIZADO</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Receba insights exclusivos sobre o futuro do trabalho, tendências de coworking e inovações que estão transformando o mundo corporativo.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-8 mb-12"
              >
                <div className="text-center">
                  <AnimatedCounter
                    value={2840}
                    suffix="+"
                    className="text-2xl md:text-3xl font-bold text-white block"
                  />
                  <span className="text-white/60 text-sm">Assinantes</span>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    value={95}
                    suffix="%"
                    className="text-2xl md:text-3xl font-bold text-white block"
                  />
                  <span className="text-white/60 text-sm">Satisfação</span>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    value={48}
                    className="text-2xl md:text-3xl font-bold text-white block"
                  />
                  <span className="text-white/60 text-sm">Artigos/mês</span>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="max-w-lg mx-auto"
              >
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor email..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4 pr-16 text-white placeholder-white/50 focus:border-white/40 focus:outline-none transition-all duration-300 group-hover:border-white/30"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !email}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, rotate: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full"
                        />
                      ) : (
                        <motion.div
                          key="arrow"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.form>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-wrap justify-center gap-4 mt-8 text-white/60 text-sm"
              >
                <span>✨ Conteúdo exclusivo</span>
                <span>📊 Insights semanais</span>
                <span>🔒 Sem spam</span>
                <span>📱 Cancele quando quiser</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="flex justify-center mb-8"
              >
                <div className="bg-green-500/20 p-8 rounded-full border border-green-500/40">
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                🎉 Bem-vindo à comunidade!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-white/70 mb-8"
              >
                Você receberá nossos melhores insights sobre o futuro do trabalho diretamente na sua caixa de entrada.
              </motion.p>

              {/* Reset Button */}
              <motion.button
                onClick={resetForm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Adicionar outro email</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NewsletterSection; 