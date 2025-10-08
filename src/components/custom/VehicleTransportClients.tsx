'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Mendes',
    position: 'Diretor de Logística',
    company: 'Volkswagen',
    quote: 'A Gabardo transformou nossa logística de distribuição. A pontualidade e segurança são excepcionais, com redução de 30% nos custos operacionais.',
    rating: 5
  },
  {
    name: 'Ana Silva',
    position: 'Gerente de Supply Chain',
    company: 'Mercedes-Benz',
    quote: 'Parceria sólida há mais de 10 anos. O rastreamento em tempo real e a comunicação proativa fazem toda a diferença em nossas operações.',
    rating: 5
  },
  {
    name: 'Roberto Costa',
    position: 'Coordenador de Transportes',
    company: 'Ford',
    quote: 'Profissionalismo incomparável. A Gabardo entende nossas necessidades e sempre supera expectativas com soluções inovadoras.',
    rating: 5
  }
];

const VehicleTransportClients: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-gabardo-light-blue/30 to-gabardo-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-gradient-to-br from-gabardo-blue/30 to-gabardo-light-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Cases de Sucesso
            <div className="absolute -bottom-1 left-0 w-8 h-px" style={{backgroundColor: '#38B6FF'}}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
          >
            <span style={{color: '#132D51'}}>Nossos</span>
            <br />
            <span className="text-neutral-600">Clientes</span>
          </motion.h2>
        </motion.div>

        {/* Client Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-white p-12 rounded-2xl shadow-xl border border-neutral-200">
            <h3 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide" style={{color: '#132D51'}}>
              Confiam na Gabardo
            </h3>
            
            <div className="flex justify-center">
              <Image
                src="/images/gabardo-clients-logos.png"
                alt="Clientes Gabardo - Volkswagen, Mercedes, Ford, Hyundai e outros"
                width={800}
                height={400}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12" style={{color: '#132D51'}} />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{color: '#38B6FF'}} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-700 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t border-neutral-200 pt-6">
                  <div className="font-bold" style={{color: '#132D51'}}>{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.position}</div>
                  <div className="text-sm font-medium" style={{color: '#38B6FF'}}>{testimonial.company}</div>
                </div>

                {/* Bottom Accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  className="absolute bottom-0 left-0 h-1"
                  style={{backgroundColor: '#38B6FF'}}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-gabardo-blue to-gabardo-light-blue p-12 rounded-2xl text-white text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-wide">
            Resultados que Falam por Si
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.5%</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Taxa de Pontualidade</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30%</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Redução de Custos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Acidentes Graves</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm uppercase tracking-wide opacity-90">Monitoramento</div>
            </div>
          </div>

          <p className="text-xl mb-8 max-w-3xl mx-auto font-light">
            Mais de 20 grandes montadoras confiam na Gabardo para suas operações críticas de transporte de veículos
          </p>

          <button 
            className="px-12 py-5 bg-white font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
            style={{color: '#132D51'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Explore Nossos Cases
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default VehicleTransportClients;
