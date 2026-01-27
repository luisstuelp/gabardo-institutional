'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowUpRight, Minus } from 'lucide-react';
import Image from 'next/image';
import { testimonials as scrapedTestimonials } from '@/data/gabardoContent';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  featured?: boolean;
}

// Avatares genéricos para os depoimentos
const genericAvatars = [
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
];

// Função para extrair empresa/posição do nome do autor
const getPositionAndCompany = (author: string) => {
  if (author.toLowerCase().includes('gf.capital')) {
    return { position: 'Equipe', company: 'GF.Capital' };
  }
  if (author.toLowerCase().includes('gestor')) {
    return { position: 'Gestor', company: 'Transportes Gabardo' };
  }
  if (author.toLowerCase().includes('empreendedor')) {
    return { position: 'Empreendedor', company: 'Parceiro Local' };
  }
  if (author.toLowerCase().includes('ceo')) {
    return { position: 'CEO', company: 'Tech Partner' };
  }
  return { position: 'Cliente', company: 'Transportes Gabardo' };
};

const testimonials: Testimonial[] = scrapedTestimonials.map((testimonial, index) => {
  const { position, company } = getPositionAndCompany(testimonial.author);
  
  return {
    id: `testimonial-${index}`,
    name: testimonial.author,
    position: position,
    company: company,
    content: testimonial.text,
    rating: testimonial.rating,
    avatar: genericAvatars[index % genericAvatars.length],
    featured: index === 0 || index === 2 // Featured testimonials
  };
});

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-neutral-100/80 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative">
        
        {/* Hero Header Section */}
        <div className="px-8 pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <Minus className="w-8 h-px text-neutral-400" />
              <span className="text-sm font-mono text-neutral-500 tracking-[0.3em] uppercase">
                Depoimentos
              </span>
            </motion.div>

            {/* Main Title - Dramatic Scale */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-black text-black leading-[0.85] tracking-tight">
                NOSSOS
                <br />
                <span className="text-neutral-300">CLIENTES</span>
              </h2>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-xl md:text-2xl text-neutral-600 font-light max-w-3xl leading-relaxed"
              >
                Histórias reais de transformação. 
                <br />
                Resultados que falam por si só.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Featured Testimonials Grid */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Featured Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-16"
            >
              <div className="bg-black text-white p-12 lg:p-16 relative overflow-hidden">
                
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white/80" />
                </div>

                {/* Current Testimonial */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    
                    {/* Rating */}
                    <div className="flex items-center mb-8">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-12 max-w-4xl">
                      &ldquo;{testimonials[currentIndex].content}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                          <Image
                            src={testimonials[currentIndex].avatar}
                            alt={testimonials[currentIndex].name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold tracking-wide">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-white/70 font-light">
                            {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={prevTestimonial}
                          className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/5 transition-all duration-300"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/5 transition-all duration-300"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="h-full bg-secondary"
                  />
                </div>
              </div>
            </motion.div>

            {/* Grid of Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onMouseEnter={() => setActiveCard(testimonial.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="group relative"
                >
                  
                  {/* Testimonial Card */}
                  <div className={`
                    relative bg-white/90 backdrop-blur-sm border border-neutral-200/50 p-8
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:border-neutral-800/20 hover:shadow-2xl hover:-translate-y-2
                    ${activeCard === testimonial.id ? 'scale-[1.02] shadow-2xl border-secondary/30' : 'scale-100'}
                    min-h-[320px] flex flex-col justify-between overflow-hidden cursor-pointer
                  `}>
                    
                    {/* Quote & Rating */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          ))}
                        </div>
                        <Quote className={`
                          w-8 h-8 transition-all duration-300
                          ${activeCard === testimonial.id ? 'text-secondary' : 'text-neutral-300'}
                        `} />
                      </div>

                      {/* Content */}
                      <blockquote className="text-base text-gray-200 italic leading-relaxed mb-6 line-clamp-3">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-200">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-black text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-neutral-500 text-xs font-light">
                          {testimonial.position}
                        </p>
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className={`
                        w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center
                        transition-all duration-300 transform
                        ${activeCard === testimonial.id 
                          ? 'opacity-100 scale-100 bg-black' 
                          : 'opacity-0 scale-75'
                        }
                      `}>
                        <ArrowUpRight className={`
                          w-4 h-4 transition-colors duration-300
                          ${activeCard === testimonial.id ? 'text-white' : 'text-neutral-600'}
                        `} />
                      </div>
                    </div>

                    {/* Hover Gradient */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br from-neutral-50/80 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                    `} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            >
              {[
                { number: '500+', label: 'Empresas Transformadas', description: 'Crescimento comprovado', type: 'text' },
                { number: '98%', label: 'Taxa de Satisfação', description: 'Clientes recomendariam', type: 'text' },
                { number: '24/7', label: 'Suporte Disponível', description: 'Sempre aqui para você', type: 'text' },
                { number: '5.0', label: 'Avaliação Média', description: 'Excelência reconhecida', type: 'star' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-4xl lg:text-5xl font-black text-black mb-2 group-hover:text-secondary transition-colors duration-300 flex items-center justify-center gap-2">
                    {stat.number}
                    {stat.type === 'star' && (
                      <Star className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 stroke-2" />
                    )}
                  </div>
                  <div className="text-lg font-bold text-black mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-neutral-500 font-light">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-8 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 text-white p-12 lg:p-16 relative overflow-hidden"
            >
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Pronto para ser nosso próximo
                  <br />
                  <span className="text-secondary">caso de sucesso?</span>
                </h3>
                
                <p className="text-xl text-white/80 font-light mb-8">
                  Junte-se a centenas de empresas que já transformaram seus negócios
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-bold hover:bg-neutral-100 transition-all duration-300"
                >
                  Comece Sua Transformação
                  <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 