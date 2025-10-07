'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationDetailGalleryProps {
  location: {
    name: string;
    testimonial?: {
      text?: string;
      author?: string;
      role?: string;
    };
    transform?: {
      title?: string;
      description?: string;
      benefits?: string[];
    };
  };
}

const LocationDetailGallery: React.FC<LocationDetailGalleryProps> = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            ambiente inspirador
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Conheça os espaços projetados para impulsionar sua produtividade e criatividade
          </motion.p>
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Main Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div 
              className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(0)}
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop"
                alt="Área principal de trabalho"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-800">
                  Principal
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Images - Right Side Stacked */}
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <div 
                  className="relative h-[135px] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      index === 1 ? '1604328727766-a151d1045ab4' :
                      index === 2 ? '1568992687947-868a62a9f521' :
                      index === 3 ? '1523908511403-7fc7b25592f4' :
                      '1604328703693-18313fe20f3a'
                    }?w=800&h=600&fit=crop`}
                    alt={`Espaço ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors">
            Ver Todas as Fotos
          </button>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img 
                    src={selectedImage === 0 ? 
                      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop' :
                      `https://images.unsplash.com/photo-${
                        selectedImage === 1 ? '1560472354-b33ff0c44a43' :
                        selectedImage === 2 ? '1568992687947-868a62a9f521' :
                        selectedImage === 3 ? '1486406146926-c627a92ad1ab' :
                        '1541746972996-4e0b0f93e586'
                      }?w=1200&h=800&fit=crop`
                    }
                    alt={`Imagem ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-neutral-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LocationDetailGallery; 