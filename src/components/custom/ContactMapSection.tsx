'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Bus, ExternalLink, Building } from 'lucide-react';

// Professional transport options
const transportOptions = [
  {
    icon: <Car className="w-5 h-5" />,
    type: 'Carro',
    description: 'Estacionamento gratuito',
    time: '15 min do centro'
  },
  {
    icon: <Bus className="w-5 h-5" />,
    type: 'Transporte Público',
    description: 'Linhas disponíveis',
    time: '20 min do centro'
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    type: 'Aplicativo',
    description: 'Uber, 99 disponíveis',
    time: 'R$ 8-15 do centro'
  }
];

// Key landmarks nearby
const landmarks = [
  'Shopping Recife - 500m',
  'Praia de Boa Viagem - 1km',
  'Aeroporto - 15km',
  'Marco Zero - 12km'
];

export default function ContactMapSection() {
  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rua+da+Inovação+123+Boa+Viagem+Recife', '_blank');
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.3em] text-neutral-500 mb-6 uppercase"
          >
            Localização
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Fácil de
            <br />
            <span className="text-gabardo-light-blue">Chegar</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Professional Map Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Sophisticated Map Placeholder */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 border border-neutral-300 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              onClick={handleMapClick}
            >
              
              {/* Map Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 bg-neutral-200 border-2 border-neutral-400 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400 group-hover:border-blue-400 group-hover:text-black transition-all duration-300"
                  >
                    <MapPin className="w-10 h-10 text-neutral-600 group-hover:text-black" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-black uppercase tracking-wide mb-3">
                    Hub Plural
                  </h3>
                  
                  <p className="text-neutral-600 font-medium">
                    Rua da Inovação, 123<br />
                    Boa Viagem, Recife - PE
                  </p>
                </div>
              </div>

              {/* Professional Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-black px-6 py-3 font-semibold uppercase tracking-wide hover:bg-blue-400 transition-all duration-300 flex items-center space-x-2 border border-neutral-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir no Google Maps</span>
                </motion.div>
              </motion.div>

              {/* Minimal Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-neutral-400 rounded-full"></div>
            </motion.div>

            {/* Professional Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-neutral-900 text-white p-6 -mt-12 relative z-10 mx-4 border-l-4 border-blue-400"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-400 flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-black" />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold uppercase tracking-wide mb-1">
                    Endereço Completo
                  </h4>
                  <div className="text-white/80 space-y-1 text-sm">
                    <p className="font-medium">Rua da Inovação, 123</p>
                    <p>Boa Viagem, Recife - PE</p>
                    <p>CEP: 51020-000</p>
                  </div>
                </div>
              </div>

              {/* Professional Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-gabardo-light-blue font-medium text-xs uppercase tracking-wide mb-1">Horário</p>
                  <p className="text-white/80 text-sm">Seg-Sex: 8h às 18h</p>
                </div>
                <div>
                  <p className="text-gabardo-light-blue font-medium text-xs uppercase tracking-wide mb-1">Acesso</p>
                  <p className="text-white/80 text-sm">24h para membros</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Transport and Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            
            {/* Professional How to Get There */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-8"
              >
                Como Chegar
              </motion.h3>
              
              <div className="space-y-4">
                {transportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 p-6 bg-neutral-50 hover:bg-white hover:shadow-sm transition-all duration-300 border-l-4 border-neutral-200 hover:border-blue-400 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-600 group-hover:bg-blue-400 group-hover:border-blue-400 group-hover:text-black transition-all duration-300"
                    >
                      {option.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-black uppercase tracking-wide mb-1">
                        {option.type}
                      </h4>
                      <p className="text-neutral-600 font-medium text-sm mb-1">
                        {option.description}
                      </p>
                      <p className="text-xs text-neutral-500 font-medium">
                        {option.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Professional Nearby Landmarks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-50 p-6 border border-neutral-200"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-black uppercase tracking-tight mb-6"
              >
                Pontos de Referência
              </motion.h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {landmarks.map((landmark, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    className="flex items-center space-x-3 p-3 bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-blue-400 flex-shrink-0"></div>
                    <span className="text-neutral-700 font-medium text-sm">{landmark}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 