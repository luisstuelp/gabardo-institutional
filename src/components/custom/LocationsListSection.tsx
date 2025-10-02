'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Check } from 'lucide-react';
import units from '@/data/units.json';
import Image from 'next/image';

const cardVariants = {
  hidden: (direction: number) => ({
    x: direction * -120,
    opacity: 0,
    rotate: direction * 2,
  }),
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: (direction: number) => ({
    x: direction * -48,
    opacity: 0,
    scale: 0.94,
  }),
  visible: (direction: number) => ({
    x: direction * 160,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.45,
    },
  }),
};

export default function LocationsListSection() {
  return (
    <div className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Encontre a unidade mais próxima de você.
          </p>
        </div>
        <div className="space-y-24">
          {units.map((unit, index) => {
            const isReversed = index % 2 === 1;
            const travelDirection = isReversed ? -1 : 1;

            return (
              <div key={index} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  className={`relative z-10 bg-white p-6 rounded-lg shadow-lg ${isReversed ? 'lg:col-start-2' : ''}`}
                  variants={cardVariants}
                  custom={travelDirection}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.45 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{unit.nome}</h3>
                  <div className="flex items-start mt-4">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="ml-3 text-base text-gray-700">{unit.endereco}</p>
                  </div>
                  <div className="flex items-start mt-2">
                    <Phone className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="ml-3 text-base text-gray-700">{unit.telefone}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Serviços</h4>
                    <ul className="space-y-2">
                      {unit.servicos.map((servico, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="ml-3 text-base text-gray-700">{servico}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                <motion.div
                  className={`relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg ${isReversed ? 'lg:col-start-1' : ''}`}
                  variants={imageVariants}
                  custom={travelDirection}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ delay: 0.45 }}
                >
                  <Image src={unit.fotos[0]} alt={unit.nome} fill className="object-cover" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}