'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedCarbonBadge() {
  const coinControls = useAnimation();
  const [showText, setShowText] = useState(false);
  
  const text1 = "#1 TRANSPORTADORA NO MUNDO";
  const text2 = "CARBONO NEGATIVO";

  useEffect(() => {
    const runAnimation = async () => {
      // Wait a bit before starting
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Phase 1: Pop out with elastic bounce
      await coinControls.start({
        scale: [1, 1.35, 1.25],
        rotate: [0, -15, -12],
        filter: [
          'drop-shadow(0 0 0px rgba(56, 182, 255, 0))',
          'drop-shadow(0 0 25px rgba(56, 182, 255, 0.8))',
          'drop-shadow(0 0 20px rgba(56, 182, 255, 0.6))'
        ],
        transition: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1], // Elastic easing
        }
      });

      // Phase 2: Start sliding right
      const slidePromise = coinControls.start({
        x: [0, 460],
        rotate: [-12, 360 - 12],
        scale: 1.25,
        transition: {
          duration: 1.5,
          ease: [0.45, 0, 0.55, 1],
        }
      });
      
      // Reveal text after coin starts moving (300ms delay)
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowText(true);
      
      // Wait for slide to complete
      await slidePromise;

      // Phase 3: Brief pause at the end
      await new Promise(resolve => setTimeout(resolve, 500));

      // Phase 4: Jump back with single smooth arc motion
      await coinControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(56, 182, 255, 0))',
        transition: {
          duration: 0.85,
          x: { ease: [0.6, 0.04, 0.4, 0.9] },
          y: { ease: [0.22, 1, 0.36, 1] }, // Different easing for parabolic Y motion
          rotate: { ease: [0.6, 0.04, 0.4, 0.9] },
          scale: { ease: [0.6, 0.04, 0.4, 0.9] },
        }
      });

      // Phase 5: Settle with gentle bounce
      await coinControls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 0.4,
          ease: 'easeOut'
        }
      });

      // Wait before looping
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Reset text visibility for next loop
      setShowText(false);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Loop the animation
      runAnimation();
    };

    runAnimation();
  }, [coinControls]);

  return (
    <div className="relative inline-flex items-center gap-1 py-4">
      {/* Animated Coin */}
      <motion.div
        animate={coinControls}
        initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
        className="relative z-20 flex-shrink-0"
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <img 
          src="/images/certifications/carbon-negative-certified.png" 
          alt="Carbono Negativo" 
          className="w-20 h-20 sm:w-24 sm:h-24"
        />
      </motion.div>

      {/* Text Content with Reveal Animation */}
      <div className="flex flex-col relative overflow-hidden min-w-0">
        {/* Line 1: #1 NO MUNDO */}
        <div className="text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-white">
          {text1.split('').map((char, index) => (
            <motion.span
              key={`line1-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={showText ? {
                opacity: 1,
                x: 0,
                transition: {
                  delay: index * 0.04,
                  duration: 0.25,
                  ease: 'easeOut'
                }
              } : {
                opacity: 0,
                x: -20
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Line 2: CARBONO NEGATIVO */}
        <div className="text-sm sm:text-base font-semibold tracking-[0.18em] uppercase text-white/90">
          {text2.split('').map((char, index) => (
            <motion.span
              key={`line2-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={showText ? {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.06 + index * 0.03,
                  duration: 0.25,
                  ease: 'easeOut'
                }
              } : {
                opacity: 0,
                x: -20
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Animated Trail Effect */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={showText ? {
          opacity: [0, 0.3, 0],
          scaleX: [0, 1, 1],
          transition: {
            duration: 1.2,
            ease: 'easeOut'
          }
        } : {
          opacity: 0,
          scaleX: 0
        }}
        className="absolute left-[6rem] sm:left-[7.5rem] top-1/2 -translate-y-1/2 h-px w-40 bg-gradient-to-r from-gabardo-light-blue/60 to-transparent"
        style={{ originX: 0 }}
      />
    </div>
  );
}
