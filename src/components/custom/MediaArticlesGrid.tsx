'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
  featured?: boolean;
  author?: string;
}

// Real articles from press coverage
const articles: Article[] = [
  {
    id: '1',
    title: 'Na contramão, Transportes Gabardo investe em 300 caminhões pesados e projeta crescer 30% em 2025',
    excerpt: 'Mesmo em cenário econômico desafiador, a transportadora de veículos do RS reforça frota com caminhões VW 19.380 Constellation.',
    category: 'Expansão',
    date: '2025-09-15',
    readTime: '5 min',
    image: '/images/gabardo-truck-fleet.JPG',
    url: 'https://transportemoderno.com.br/2025/09/15/na-contramao-transportes-gabardo-investe-em-300-caminhoes-pesados-e-projeta-crescer-30-em-2025/',
    featured: true,
    author: 'Transporte Moderno'
  },
  {
    id: '2',
    title: 'Transportes Gabardo recebe reconhecimento do SETCERGS por certificação inédita de Carbono Negativo',
    excerpt: 'Distinção foi entregue durante a 24ª TranspoSul. A Gabardo conquistou a certificação de primeira transportadora do mundo a se tornar Carbono Negativo.',
    category: 'Sustentabilidade',
    date: '2025-09-25',
    readTime: '4 min',
    image: '/images/sustentabilidade-hero.jpg',
    url: 'https://transposul.com/2025/09/25/transportes-gabardo-recebe-reconhecimento-do-setcergs-por-certificacao-inedita-de-carbono-negativo/',
    author: 'TranspoSul'
  },
  {
    id: '3',
    title: 'Transportes Gabardo transporta o Hyundai HB20 para a Argentina',
    excerpt: 'O primeiro lote de HB20 foi transportado pela Transportes Gabardo para a Argentina. Hyundai HB20 brasileiro chega com versão 1.6 hatch; exportação marca novo passo para o modelo líder no Mercosul.',
    category: 'Parceiros',
    date: '2025-01-10',
    readTime: '3 min',
    image: '/images/Trans Gabardo - Framers produtora -5377.JPG',
    url: 'https://frotanews.com.br/transportes-gabardo-transporta-o-hyundai-hb20-para-a-argentina/',
    author: 'Frota News'
  },
  {
    id: '4',
    title: 'Sérgio Mário Gabardo: "Somos uma empresa carbono zero, aumentamos a qualidade das operações em uma gestão voltada para a sustentabilidade"',
    excerpt: 'Em 2023, a empresa comprou 300 caminhões Euro 6 – 150 da Volvo e 150 da Volkswagen – e diversificou os negócios com foco em sustentabilidade.',
    category: 'Sustentabilidade',
    date: '2023-03-30',
    readTime: '6 min',
    image: '/images/iso14001.jpg',
    url: 'https://transportemoderno.com.br/2023/03/30/sergio-mario-gabardo-proprietario-da-gabardo-transportes-de-veiculos-somos-uma-empresa-carbono-zero-aumentamos-a-qualidade-das-operacoes-em-uma-gestao-voltada-para-a-sustentabilidade/',
    author: 'Transporte Moderno'
  },
  {
    id: '5',
    title: 'Transportes Gabardo renova com VWCO',
    excerpt: 'Com frota que soma mais de setecentos caminhões Volkswagen, a Transportes Gabardo renova parte da garagem com 55 Constellation 19.360 para operações de cegonha.',
    category: 'Parceiros',
    date: '2019-02-13',
    readTime: '3 min',
    image: '/images/gabardo-hero-01.JPG',
    url: 'https://www.autoindustria.com.br/2019/02/13/transportes-gabardo-renova-com-vwco/',
    author: 'AutoIndústria'
  },
];

const categories = ['Todos', 'Expansão', 'Sustentabilidade', 'Tecnologia', 'Cultura', 'Parceiros'];

const MediaArticlesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredArticles = selectedCategory === 'Todos' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

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
            {categories.map((category) => (
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
      </div>
    </section>
  );
};

export default MediaArticlesGrid;
