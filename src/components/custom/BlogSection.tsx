'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, User, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/data/blogData';

const allBlogPosts = getAllBlogPosts();
const featuredBlogPosts = getFeaturedBlogPosts();

const BlogSection: React.FC = () => {

  const featuredPost = featuredBlogPosts[0]; // Get first featured post
  const regularPosts = allBlogPosts.filter(post => !post.featured).slice(0, 3); // Get first 3 non-featured posts

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-gray-50 text-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gabardo-light-blue/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-gabardo-blue/3 to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-gabardo-light-blue/5 to-transparent rounded-full" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 relative z-10"
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gabardo-light-blue/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-gabardo-blue mb-4 sm:mb-5 md:mb-6 border border-gabardo-light-blue/30"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="uppercase tracking-wider">Blog Gabardo</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0"
          >
            <p><span className="text-gabardo-blue">INOVAÇÃO EM</span> <span className="text-gabardo-light-blue">TRANSPORTE</span> <span className="text-gabardo-blue">DE VEÍCULOS</span></p>



          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0"
          >
            Descubra as últimas tendências, tecnologias e inovações que estão transformando o transporte de veículos no Brasil
          </motion.p>
        </motion.div>

        {/* Blog Content */}
        <div className="relative z-10">

          {/* Featured Post + Regular Posts Layout */}
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 lg:items-stretch">

            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 flex"
              >
                <div
                  className="group relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 transition-all duration-500 hover:border-gabardo-light-blue/50 hover:shadow-lg cursor-pointer w-full flex flex-col"

                >

                  {/* Image */}
                  <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden flex-shrink-0">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gabardo-blue text-white px-2 sm:px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wide">
                      Destaque
                    </div>

                    {/* Category */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm text-gabardo-blue px-2 sm:px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-medium border border-gabardo-light-blue/30">
                      {featuredPost.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex-grow flex flex-col justify-between">

                    {/* Main Content */}
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center space-x-3 sm:space-x-4 text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight group-hover:text-gabardo-blue transition-colors duration-300">
                        {featuredPost.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center space-x-2 text-gabardo-blue group-hover:text-gabardo-blue/80 transition-colors duration-300 mt-4 sm:mt-5 md:mt-6">
                      <span className="font-medium text-sm sm:text-base">Ler artigo completo</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Regular Posts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col"
            >
              {/* Posts Container */}
              <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-14 flex-grow">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    className="group relative bg-white backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gabardo-light-blue/50 hover:shadow-md cursor-pointer"

                  >
                    <div className="flex">

                      {/* Image */}
                      <div className="relative w-24 sm:w-32 md:w-40 flex-shrink-0 overflow-hidden rounded-l-lg sm:rounded-l-xl min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          sizes="160px"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-3 sm:p-4 md:p-5">

                        {/* Category */}
                        <div className="text-gabardo-light-blue text-[0.65rem] sm:text-xs font-medium uppercase tracking-wide mb-1.5 sm:mb-2">
                          {post.category}
                        </div>

                        {/* Title */}
                        <h4 className="text-gray-900 font-bold text-xs sm:text-sm md:text-base leading-tight mb-1.5 sm:mb-2 group-hover:text-gabardo-blue transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h4>

                        {/* Meta */}
                        <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400 text-[0.65rem] sm:text-xs">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="p-2 sm:p-3 md:p-4 flex items-center">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gabardo-blue transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4 sm:pt-5 md:pt-6"
              >
                <button className="w-full bg-gabardo-light-blue/10 backdrop-blur-sm border border-gabardo-light-blue/30 text-gabardo-blue py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-gabardo-light-blue/20 hover:border-gabardo-light-blue/50 flex items-center justify-center space-x-2 group">
                  <span>Ver todos os artigos</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gabardo-light-blue/30 to-transparent transform origin-center"
        />
      </div>
    </section>
  );
};

export default BlogSection; 