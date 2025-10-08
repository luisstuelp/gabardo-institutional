'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '@/components/custom/NewsletterSection';
import MagneticCard from '@/components/ui/magnetic-card';
import BlogHeroSection from '@/components/custom/BlogHeroSection';
import { getAllBlogPosts, getFeaturedBlogPosts, blogCategories, type BlogPost } from '@/data/blogData';

const BlogIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, searchTerm, filterPosts]);

  const filterPosts = () => {
    let filtered = allPosts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header variant="dark" />
      
      {/* Hero Section with Dynamic Background */}
      <BlogHeroSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="relative z-10 bg-black">{/* Ensure background continues */}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'all' && !searchTerm && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-4 md:px-8 lg:px-16 mb-20 mt-10"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              <span className="text-white/40">POSTS EM</span>
              <br />
              <span>DESTAQUE</span>
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group relative"
                  
                >
                  <MagneticCard strength={0.2} scale={1.03}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/30 hover:bg-white/10">
                      
                      {/* Image */}
                      <div className="relative h-80 md:h-96 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Featured Badge */}
                        <div className="absolute top-6 left-6 bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                          Destaque
                        </div>
                        
                        {/* Category */}
                        <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                          {post.category}
                        </div>

                        {/* Read indicator */}
                        <div className="absolute bottom-6 right-6 flex items-center space-x-2 text-white/80">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{post.readTime}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-white/60 text-sm mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors duration-300">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-white/70 text-lg leading-relaxed mb-6">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More */}
                        <div className="flex items-center text-white group-hover:text-white/80 transition-colors duration-300">
                          <span className="font-medium">Ler artigo completo</span>
                          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </MagneticCard>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Main Content with Sidebar */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 md:px-8 lg:px-16 pb-20"
        >
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-12"
              >
                {selectedCategory === 'all' ? (
                  <>
                    <span className="text-white/40">BLOG DO</span>
                    <br />
                    <span>TRANSPORTE</span>
                  </>
                ) : (
                  <>
                    <span className="text-white/40">CATEGORIA:</span>
                    <br />
                    <span>{selectedCategory.toUpperCase()}</span>
                  </>
                )}
              </motion.h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${searchTerm}`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {filteredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      variants={itemVariants}
                      className="group relative"
                      
                    >
                      <MagneticCard strength={0.15} scale={1.02}>
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/30 hover:bg-white/10">
                          
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Category */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                              {post.category}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            
                            {/* Meta Info */}
                            <div className="flex items-center space-x-3 text-white/60 text-sm mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{post.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-white/70 leading-relaxed mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="bg-white/10 text-white/80 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1 text-white/60 text-sm">
                                <User className="w-3 h-3" />
                                <span>{post.author}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-white/60 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </MagneticCard>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-white/40 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white/80 mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-white/60">
                    Tente ajustar os filtros ou termo de busca
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.aside
              variants={itemVariants}
              className="lg:col-span-4 space-y-8"
            >
              
              {/* Latest Posts */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                  ÚLTIMOS POSTS
                </h3>
                <div className="space-y-4">
                  {allPosts.slice(0, 4).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                      <div className="flex items-start space-x-3 hover:bg-white/5 p-2 rounded-lg transition-colors duration-300">
                        <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium group-hover:text-white/80 transition-colors duration-300 line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <p className="text-white/60 text-xs">
                            {post.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">
                  CATEGORIAS
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                      selectedCategory === 'all'
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    Todos os Artigos
                    <span className="float-right text-xs text-white/50">
                      {allPosts.length}
                    </span>
                  </button>
                  {blogCategories.map((category) => {
                    const count = allPosts.filter(post => post.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                          selectedCategory === category
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {category}
                        <span className="float-right text-xs text-white/50">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.section>
      </main>

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
    </div>
  );
};

export default BlogIndex; 