'use client';

import { motion } from 'framer-motion';
import { Newspaper, Download } from 'lucide-react';

const MidiaHeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-gabardo-blue via-gabardo-blue/95 to-gabardo-blue/90 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-gabardo-light-blue/20 blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 mb-6"
          >
            <Newspaper className="w-4 h-4" />
            <span>Imprensa • Assessoria • Materiais</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Central de <span className="text-gabardo-light-blue">Mídia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-8"
          >
            Materiais institucionais, press kit, logos, fotos e vídeos para jornalistas e parceiros da Gabardo Transportes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#materiais"
              className="inline-flex items-center gap-2 bg-white text-gabardo-blue px-8 py-3 rounded-full font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Baixar Materiais
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider border border-white/30 transition-all hover:bg-white/20"
            >
              Contato Imprensa
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MidiaHeroSection;
