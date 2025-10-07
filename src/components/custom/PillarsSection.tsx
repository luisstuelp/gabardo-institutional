'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, CheckCircle, Users, Shield, Zap } from 'lucide-react';
import aboutContent from '@/data/aboutContent.json';

const tabs = [
  { id: 'mission', label: 'Missão', icon: Target },
  { id: 'vision', label: 'Visão', icon: Eye },
  { id: 'values', label: 'Valores', icon: CheckCircle },
];

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  CheckCircle,
  Users,
  Zap,
};

const PillarsSection: React.FC = () => {
  const { missionVisionValues } = aboutContent;
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="flex justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 text-lg font-semibold transition-colors ${
              activeTab === tab.id ? 'text-gabardo-blue' : 'text-gray-500'
            }`}
          >
            <span className="flex items-center gap-2">
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gabardo-blue"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          {activeTab === 'mission' && (
            <div>
              <h3 className="text-2xl font-bold text-gabardo-blue mb-4">Missão</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{missionVisionValues.mission}</p>
              <p className="text-md text-gray-600 leading-relaxed mt-4">{missionVisionValues.longDescription}</p>
            </div>
          )}
          {activeTab === 'vision' && (
            <div>
              <h3 className="text-2xl font-bold text-gabardo-blue mb-4">Visão</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{missionVisionValues.vision}</p>
              <p className="text-md text-gray-600 leading-relaxed mt-4">{missionVisionValues.longDescriptionVision}</p>
            </div>
          )}
          {activeTab === 'values' && (
            <div>
              <h3 className="text-2xl font-bold text-gabardo-blue mb-4">Valores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missionVisionValues.values.map((value, index) => {
                  const ValueIcon = valueIcons[value.icon] || CheckCircle;
                  return (
                    <div key={index} className="flex flex-col items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <ValueIcon className="w-8 h-8 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-lg text-gray-800 font-semibold">{value.title}</span>
                      </div>
                      <p className="text-md text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PillarsSection;
