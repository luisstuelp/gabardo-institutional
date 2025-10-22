'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Zap, Users, Building, Truck, HeartPulse } from 'lucide-react';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';

const facilities = [
  {
    name: 'Oficina',
    description: 'Manutenção completa para nossa frota.',
    icon: <Wrench className="w-6 h-6 text-gabardo-blue" />,
    image: '/images/Oficina.JPG',
  },
  { name: 'TI', description: 'Infraestrutura de tecnologia e sistemas integrados.', icon: <Zap className="w-6 h-6 text-gabardo-blue" />, image: '/images/Eletrica.JPG' },
  { name: 'Refeitório', description: 'Espaço para refeições dos colaboradores.', icon: <Users className="w-6 h-6 text-gabardo-blue" />, image: '/images/Refeitorio.JPG' },
  { name: 'Escritório', description: 'Amplo espaço administrativo.', icon: <Building className="w-6 h-6 text-gabardo-blue" />, image: '/images/Escritorio.JPG' },
  { name: 'Pilates', description: 'Espaço dedicado à saúde e bem-estar dos colaboradores.', icon: <HeartPulse className="w-6 h-6 text-gabardo-blue" />, image: '/images/Escritorio.JPG' },
  { name: 'Box de Manutenção', description: 'Baias dedicadas para a manutenção dos caminhões.', icon: <Truck className="w-6 h-6 text-gabardo-blue" />, image: '/images/Box.JPG' },
];

export default function FacilitiesSection() {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const columnEl = leftColumnRef.current;
    if (!columnEl) return;

    const updateHeight = () => setLeftColumnHeight(columnEl.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(columnEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossas Instalações</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Estrutura completa para dar suporte às nossas operações e aos nossos colaboradores.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6" ref={leftColumnRef}>
            {facilities.map((facility) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setSelectedFacility(facility)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedFacility.name === facility.name ? 'bg-blue-50 shadow-lg' : 'hover:bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500">
                    {facility.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                    <p className="text-base text-gray-600">{facility.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedFacility.name === facility.name && (
                    <motion.div
                      className="mt-4 lg:hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="relative h-64 w-full overflow-hidden rounded-lg">
                        <Image
                          src={selectedFacility.image}
                          alt={selectedFacility.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFacility.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-lg"
                style={{ height: leftColumnHeight > 0 ? leftColumnHeight : 'auto' }}
              >
                <Image
                  src={selectedFacility.image}
                  alt={selectedFacility.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={selectedFacility.name === facilities[0].name}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}