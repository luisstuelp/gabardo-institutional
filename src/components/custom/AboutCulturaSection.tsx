'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

const AboutCulturaSection: React.FC = () => {
  const { governanceAndEthics } = aboutContent;

  return (
    <section className="relative -mt-12 bg-gradient-to-b from-white via-[#f6f8fb] to-[#eef2f7] pb-24 pt-16">
      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-10 text-center">
          <div className="max-w-2xl space-y-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/30 bg-gabardo-blue/5 px-5 py-2 text-xs uppercase tracking-[0.32em] text-gabardo-blue"
            >
              <ShieldCheck className="h-4 w-4" />
              {governanceAndEthics.title}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-semibold text-gabardo-blue md:text-4xl lg:text-5xl"
            >
              Compromisso com a Integridade
            </motion.h2>
            {governanceAndEthics.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="text-base text-gray-600"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCulturaSection;