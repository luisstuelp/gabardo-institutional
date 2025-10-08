import React from 'react';
import { motion } from 'framer-motion';
import { LocationData } from '@/data/locationsData';

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface LocationDetailAdvantagesProps {
  location: LocationData;
}

const LocationDetailAdvantages: React.FC<LocationDetailAdvantagesProps> = ({ location }) => {
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
            vantagens únicas
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {location.advantages?.map((advantage: Advantage, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">{advantage.title}</h3>
              <p className="text-neutral-600">{advantage.description}</p>
            </motion.div>
          )) || [1,2,3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Vantagem {i}</h3>
              <p className="text-neutral-600">Descrição da vantagem {i}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationDetailAdvantages; 