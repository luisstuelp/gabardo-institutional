'use client';

import { motion } from 'framer-motion';
import { Newspaper, TrendingUp } from 'lucide-react';

const MediaNewsHeroSection = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-gradient-to-br from-gabardo-light-blue/10 to-gabardo-blue/5 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-gabardo-blue/5 to-gabardo-light-blue/10 blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Animated Line */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-none hidden lg:block"
        viewBox="0 0 1400 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="media-hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#38B6FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 200 Q 350 150, 700 200 T 1400 200"
          fill="none"
          stroke="url(#media-hero-gradient)"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gabardo-blue/10 backdrop-blur-sm text-gabardo-blue px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] border border-gabardo-blue/20 mb-6"
          >
            <Newspaper className="w-4 h-4" />
            <span>Mídia & Imprensa</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gabardo-blue"
          >
            Notícias e <span className="text-gabardo-light-blue">Artigos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            Acompanhe as últimas novidades, insights do setor e conquistas da Gabardo. 
            Somos uma voz ativa na indústria de transporte e logística.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gabardo-light-blue" />
              <span>Atualizações Semanais</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Insights da Indústria</span>
            <span className="hidden sm:inline">•</span>
            <span>Inovação & Tecnologia</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MediaNewsHeroSection;
