'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import {
  getFeaturedMediaArticle,
  getMediaArticlesByCategory,
  getRegularMediaArticles,
  mediaCategories,
} from '@/data/mediaArticles';

const MediaArticlesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredArticles = getMediaArticlesByCategory(selectedCategory);
  const showLoadMore = false;

  const featuredArticle = selectedCategory === 'Todos'
    ? getFeaturedMediaArticle()
    : undefined;
  const regularArticles = selectedCategory === 'Todos'
    ? getRegularMediaArticles()
    : filteredArticles;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {mediaCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gabardo-blue text-white shadow-lg shadow-gabardo-blue/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {selectedCategory === 'Todos' && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div 
              className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={() => window.open(featuredArticle.url, '_blank', 'noopener,noreferrer')}
            >
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gabardo-light-blue text-white text-xs font-semibold uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {featuredArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      <Calendar className="w-3 h-3" />
                      {new Date(featuredArticle.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed max-w-3xl">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(featuredArticle.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="inline-flex items-center gap-2 text-white font-semibold group/btn"
                  >
                    <span>Ler artigo completo</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </div>

              {/* Featured Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white text-gabardo-blue text-xs font-bold uppercase tracking-wider shadow-lg">
                Destaque
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(article.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100">
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-gabardo-blue text-xs font-semibold uppercase tracking-wider shadow-md">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gabardo-blue mb-3 leading-tight group-hover:text-gabardo-light-blue transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Read More */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(article.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-2 text-gabardo-blue font-semibold text-sm"
                    animate={{ x: hoveredCard === article.id ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {showLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gabardo-blue text-white font-semibold uppercase tracking-wider shadow-lg hover:bg-gabardo-light-blue transition-all duration-300"
            >
              <span>Carregar mais artigos</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MediaArticlesGrid;
