'use client';

import { motion } from 'framer-motion';

export default function InfrastructureSVGBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Overlays - Very Subtle */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-1/5 bg-gradient-to-r from-gabardo-blue/2 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-0 bottom-0 h-full w-1/5 bg-gradient-to-l from-gabardo-light-blue/2 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
