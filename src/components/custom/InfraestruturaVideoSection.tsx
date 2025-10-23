'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const InfraestruturaVideoSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Conheça nossa <span className="text-gabardo-light-blue">infraestrutura</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Veja como nossa estrutura de pátios, unidades e tecnologia embarcada garante segurança e eficiência em cada operação de transporte de veículos.
            </p>
            <div className="flex items-center gap-3 text-gabardo-light-blue">
              <Play className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Assista ao vídeo completo</span>
            </div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
              <iframe
                src="https://www.youtube.com/embed/H4mNe46HQpc"
                title="Gabardo Transportes - Infraestrutura"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            
            {/* Decorative gradient */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gabardo-blue/20 to-gabardo-light-blue/20 blur-3xl -z-10 opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfraestruturaVideoSection;
