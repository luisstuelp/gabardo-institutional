'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LocationData } from '@/data/locationsData';

interface LocationDetailFloorplanProps {
  location: LocationData;
}

const LocationDetailFloorplan: React.FC<LocationDetailFloorplanProps> = ({ location }) => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            planta da unidade
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="aspect-square rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop"
                alt="Planta baixa da unidade"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">
              {location.floorplan?.title || 'Detalhes da Unidade'}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                <span className="font-medium text-neutral-700">Área Total</span>
                <span className="font-bold text-neutral-800">{location.floorplan?.totalArea || '320m²'}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                <span className="font-medium text-neutral-700">Capacidade</span>
                <span className="font-bold text-neutral-800">{location.floorplan?.capacity || '45 pessoas'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetailFloorplan; 