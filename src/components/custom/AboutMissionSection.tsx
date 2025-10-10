'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

const AboutMissionSection: React.FC = () => {
  const { missionVisionValues } = aboutContent;

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
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
            className="text-sm font-light tracking-[0.2em] mb-4 uppercase relative inline-block text-gabardo-blue"
          >
            {missionVisionValues.title}
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-gabardo-light-blue"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue"
          >
            Nossos Pilares
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <Target className="w-10 h-10 text-gabardo-blue" />
              <h3 className="text-2xl font-bold uppercase text-gabardo-blue">Missão</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {missionVisionValues.mission}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <Eye className="w-10 h-10 text-gabardo-blue" />
              <h3 className="text-2xl font-bold uppercase text-gabardo-blue">Visão</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {missionVisionValues.vision}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold uppercase text-gabardo-blue mb-4">Valores</h3>
          <ul className="space-y-4">
            {missionVisionValues.values.map((value, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gabardo-blue mb-1">{value.title}</h4>
                  <p className="text-base text-gray-600">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMissionSection;