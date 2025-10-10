'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

const AboutValuesSection: React.FC = () => {
  const { differentiators } = aboutContent;

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white relative overflow-hidden">
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
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            {differentiators.title}
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-gabardo-light-blue"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gabardo-blue uppercase tracking-tight leading-tight"
          >
            Por que a Gabardo se destaca
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {differentiators.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-lg text-gray-700 leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutValuesSection;