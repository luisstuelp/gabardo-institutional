'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

const TABS = ["AMBIENTAL", "SOCIAL", "GOVERNANÇA", "INOVAÇÕES"];

interface NewSustainabilityHeroSectionProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

export default function NewSustainabilityHeroSection({ selectedTab, setSelectedTab }: NewSustainabilityHeroSectionProps) {
  return (
    <div className="relative w-full pt-48 pb-24 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/gabardo-hero-01.JPG"
          alt="Sustentabilidade"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight tracking-tight mb-6"
        >
          Sustentabilidade
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-full md:max-w-4xl mb-12"
        >
          A Gabardo tem como valor crescer com sustentabilidade, zelando pelos recursos próprios e de seus públicos de relacionamento, incluindo credores, investidores e a sociedade em geral. As dimensões Econômica, Ambiental, Social e de Governança (ESG) estão enraizadas na cultura da companhia.
        </motion.p>

        <div className="flex border-b border-gray-500">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 relative 
                ${selectedTab === tab ? 'text-white' : 'text-gray-300 hover:text-white'}`
              }
            >
              {tab}
              {selectedTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
