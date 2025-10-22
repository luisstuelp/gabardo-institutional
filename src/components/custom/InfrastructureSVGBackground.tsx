'use client';

import { motion } from 'framer-motion';

export default function InfrastructureSVGBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Flowing Spiral - Top Left */}
      <motion.svg
        className="absolute left-10 top-10 h-80 w-80"
        viewBox="0 0 300 300"
        animate={{ 
          rotate: [0, 360],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M150,150 Q180,120 200,150 T220,200 Q210,230 180,240 T130,230 Q100,210 95,180 T105,130 Q125,100 160,105" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-blue/25"
        />
      </motion.svg>

      {/* Wavy S-Curve - Top Center */}
      <motion.svg
        className="absolute left-1/2 -translate-x-1/2 top-20 h-64 w-full max-w-2xl"
        viewBox="0 0 600 250"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.18, 0.32, 0.18]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M0,125 Q80,60 160,125 T320,125 Q400,180 480,125 T600,125" 
          stroke="currentColor" 
          strokeWidth="0.6" 
          fill="none" 
          className="text-gabardo-light-blue/28"
        />
        <path 
          d="M50,100 Q120,50 180,110 T350,100 Q420,160 500,100" 
          stroke="currentColor" 
          strokeWidth="0.4" 
          fill="none" 
          className="text-gabardo-light-blue/20"
        />
      </motion.svg>

      {/* Twisted Ellipses - Top Right */}
      <motion.svg
        className="absolute right-16 top-32 h-64 w-64"
        viewBox="0 0 250 250"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.12, 1]
        }}
        transition={{ 
          rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <ellipse cx="125" cy="125" rx="80" ry="50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-gabardo-blue/22" opacity="0.7" transform="rotate(15 125 125)" />
        <ellipse cx="125" cy="125" rx="60" ry="90" stroke="currentColor" strokeWidth="0.4" fill="none" className="text-gabardo-light-blue/20" opacity="0.6" transform="rotate(-30 125 125)" />
      </motion.svg>

      {/* Organic Blob - Middle Left */}
      <motion.svg
        className="absolute left-20 top-1/2 -translate-y-1/2 h-48 w-48"
        viewBox="0 0 200 200"
        animate={{ 
          rotate: [0, -15, 15, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M100,30 Q140,40 150,80 T130,140 Q100,160 70,140 T50,80 Q60,40 100,30" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-blue/28"
        />
      </motion.svg>

      {/* Flowing Infinity - Center */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-96"
        viewBox="0 0 400 200"
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.24, 0.12]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M50,100 Q100,40 150,100 Q200,160 250,100 Q300,40 350,100" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-light-blue/25"
        />
      </motion.svg>

      {/* Swirling Curves - Middle Right */}
      <motion.svg
        className="absolute right-24 top-1/2 -translate-y-1/2 h-72 w-72"
        viewBox="0 0 300 300"
        animate={{ 
          rotate: [0, -360],
          opacity: [0.18, 0.32, 0.18]
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <path 
          d="M150,50 Q200,80 180,130 T150,200 Q100,220 80,170 T110,100 Q140,70 150,50" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-light-blue/28"
        />
        <path 
          d="M150,80 Q180,100 170,140 T150,180 Q120,195 110,160 T130,110 Q145,90 150,80" 
          stroke="currentColor" 
          strokeWidth="0.4" 
          fill="none" 
          className="text-gabardo-light-blue/22"
        />
      </motion.svg>

      {/* Multi-Wave Flow - Bottom Left */}
      <motion.svg
        className="absolute left-12 bottom-20 h-56 w-96"
        viewBox="0 0 400 220"
        animate={{ 
          x: [0, 15, -5, 0],
          y: [0, -8, 5, 0],
          opacity: [0.2, 0.32, 0.2]
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M0,110 Q60,70 120,110 T240,110 Q300,150 360,110" 
          stroke="currentColor" 
          strokeWidth="0.6" 
          fill="none" 
          className="text-gabardo-blue/26"
        />
        <path 
          d="M30,90 Q80,55 140,95 T270,90 Q320,125 380,90" 
          stroke="currentColor" 
          strokeWidth="0.4" 
          fill="none" 
          className="text-gabardo-blue/18"
        />
      </motion.svg>

      {/* Curved Petal - Bottom Center */}
      <motion.svg
        className="absolute left-1/2 -translate-x-1/2 bottom-32 h-56 w-56"
        viewBox="0 0 200 200"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.16, 0.28, 0.16]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M100,40 Q130,60 120,100 Q100,130 80,100 Q70,60 100,40" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-light-blue/25"
        />
        <path 
          d="M100,60 Q120,75 112,100 Q100,118 88,100 Q80,75 100,60" 
          stroke="currentColor" 
          strokeWidth="0.4" 
          fill="none" 
          className="text-gabardo-light-blue/18"
        />
      </motion.svg>

      {/* Flowing Ribbons - Bottom Right */}
      <motion.svg
        className="absolute right-20 bottom-24 h-64 w-64"
        viewBox="0 0 250 250"
        animate={{ 
          rotate: [0, 20, -20, 0],
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.3, 0.18]
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d="M80,60 Q140,80 160,130 Q150,180 100,190 Q50,170 60,120 Q75,85 80,60" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          fill="none" 
          className="text-gabardo-blue/25"
        />
        <path 
          d="M110,70 Q155,95 165,140 Q152,175 115,182 Q75,165 80,130 Q90,95 110,70" 
          stroke="currentColor" 
          strokeWidth="0.4" 
          fill="none" 
          className="text-gabardo-light-blue/22"
        />
      </motion.svg>

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
