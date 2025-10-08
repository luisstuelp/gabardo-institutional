'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Tag, Search } from 'lucide-react';
import { blogCategories } from '@/data/blogData';

interface BlogHeroProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const BlogHeroSection: React.FC<BlogHeroProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-sm font-medium border border-white/20 mb-6"
          >
            Conteúdo • Insights • Novidades
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            <span className="text-white/60">BLOG DO</span> TRANSPORTE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Explore artigos, tendências e análises do setor de logística e transporte de veículos.
          </motion.p>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl shadow-black/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar por título, tag ou conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-white/40 border-none focus:ring-0 pl-12 pr-4 py-3 rounded-lg"
                />
              </div>
              <div className="relative flex-shrink-0 w-full md:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-auto appearance-none bg-white/10 text-white/80 px-6 py-3 pr-10 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 cursor-pointer"
                >
                  <option value="all">Todas as Categorias</option>
                  {blogCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;