'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useCallback, useState, useMemo } from 'react';

const HomeClientsLogoSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoize random values to prevent hydration mismatch
  const particleData = useMemo(() => 
    Array.from({ length: 8 }, () => ({
      width: Math.random() * 60 + 40,
      height: Math.random() * 60 + 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
      yMovement: Math.random() * 30 - 15,
      xMovement: Math.random() * 25 - 12,
      duration: 4 + Math.random() * 3
    })), 
  []);
  
  // Core 3D transforms
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shadow = useMotionValue(0.45);
  
  // Mouse tracking for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spotlight effect
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  // Spring animations for smooth 3D rotation
  const springRotateX = useSpring(useTransform(rotateX, [-20, 20], [12, -12]), {
    stiffness: 180,
    damping: 25
  });
  const springRotateY = useSpring(useTransform(rotateY, [-20, 20], [-12, 12]), {
    stiffness: 180,
    damping: 25
  });
  
  // Enhanced shadow
  const springShadow = useSpring(useTransform(shadow, [0, 1], [0.35, 0.85]), {
    stiffness: 140,
    damping: 20
  });
  const dynamicShadow = useTransform(
    springShadow, 
    (value) => `0px 35px 90px -35px rgba(19,45,81,${value}), 0px 0px 80px -20px rgba(96,165,250,${value * 0.3})`
  );
  
  // Magnetic cursor attraction
  const magneticX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const magneticY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  
  // Dynamic gradient based on mouse position
  const gradientX = useSpring(spotlightX, { stiffness: 100, damping: 25 });
  const gradientY = useSpring(spotlightY, { stiffness: 100, damping: 25 });
  
  const dynamicGradient = useMotionTemplate`
    radial-gradient(circle at ${gradientX}% ${gradientY}%, 
    rgba(96,165,250,0.25) 0%, 
    rgba(96,165,250,0.12) 25%, 
    rgba(255,255,255,0.05) 50%,
    transparent 100%)
  `;

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const midX = bounds.width / 2;
    const midY = bounds.height / 2;

    // 3D rotation
    const rotateYValue = ((offsetX - midX) / midX) * 22;
    const rotateXValue = ((offsetY - midY) / midY) * 22;
    rotateY.set(rotateYValue);
    rotateX.set(rotateXValue);
    shadow.set(1);
    
    // Magnetic attraction (subtle pull toward cursor)
    const attractX = (offsetX - midX) * 0.08;
    const attractY = (offsetY - midY) * 0.08;
    mouseX.set(attractX);
    mouseY.set(attractY);
    
    // Spotlight position
    const spotX = (offsetX / bounds.width) * 100;
    const spotY = (offsetY / bounds.height) * 100;
    spotlightX.set(spotX);
    spotlightY.set(spotY);
  }, [rotateX, rotateY, shadow, mouseX, mouseY, spotlightX, spotlightY]);

  const resetPointer = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shadow.set(0.45);
    mouseX.set(0);
    mouseY.set(0);
    spotlightX.set(50);
    spotlightY.set(50);
  }, [rotateX, rotateY, shadow, mouseX, mouseY, spotlightX, spotlightY]);

  return (
    <section className="section-shell bg-white overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-gabardo-light-blue/8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      
      {/* Floating Orbs with Entrance */}
      <motion.div
        className="absolute -right-32 top-16 h-64 w-64 rounded-full bg-gabardo-light-blue/20 blur-3xl"
        initial={{ opacity: 0, scale: 0, x: 100 }}
        whileInView={{ opacity: 0.35, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.35, 0.5, 0.35]
        }}
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-3xl"
        initial={{ opacity: 0, scale: 0, x: -100 }}
        whileInView={{ opacity: 0.25, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        animate={{
          y: [0, 12, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
      />
      
      {/* Grid Lines Reveal */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(96,165,250,0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gabardo-blue shadow-sm ring-1 ring-gabardo-light-blue/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4Z" />
                <path d="M4 20c0-3.314 3.134-6 7-6h2c3.866 0 7 2.686 7 6" strokeLinecap="round" />
              </svg>
              <span>Clientes Gabardo</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="section-heading text-left text-gabardo-blue"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  As marcas que confiam
                </motion.span>
                <motion.span 
                  className="mt-1 block font-extrabold text-gabardo-light-blue text-4xl sm:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                >
                  na Transportes Gabardo
                </motion.span>
              </motion.h2>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '5.5rem', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                className="h-1 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 1 }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
                className="section-subheading text-left"
              >
                Parcerias sólidas com marcas globais, sustentadas por tecnologia, compliance e equipes especializadas para cada operação.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 pt-4 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                {['ISO 9001', 'ESG+', 'Cobertura nacional'].map((badge, i) => (
                  <motion.span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full bg-gabardo-light-blue/15 px-5 py-2"
                    initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 1.3 + (i * 0.1),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(96,165,250,0.25)' }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>

          </motion.div>

          <Link href="/sobre#nossos-clientes">
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 45, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5
              }}
              className="group relative cursor-pointer perspective-1000"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                transformStyle: 'preserve-3d',
                x: magneticX,
                y: magneticY
              }}
            >
              {/* Floating Particles - Dynamic Background */}
              {particleData.map((particle, i) => (
                <motion.div
                  key={i}
                  className="pointer-events-none absolute rounded-full bg-gradient-to-br from-gabardo-light-blue/30 to-gabardo-blue/20 blur-xl"
                  style={{
                    width: `${particle.width}px`,
                    height: `${particle.height}px`,
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.15, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, particle.yMovement, 0],
                    x: [0, particle.xMovement, 0],
                    opacity: [0.15, 0.4, 0.15],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.7 + (i * 0.1), ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.8, delay: 0.7 + (i * 0.1), ease: [0.16, 1, 0.3, 1] },
                    y: { duration: particle.duration, repeat: Infinity, ease: 'easeInOut' },
                    x: { duration: particle.duration, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              ))}

              {/* Orbiting Glow Effects */}
              <motion.div
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                animate={{
                  rotate: [0, 360],
                  scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
              />

              <motion.div
                className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-gradient-to-tr from-violet-400/25 to-pink-400/25 blur-3xl"
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                whileInView={{ opacity: 0.25, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                animate={{
                  rotate: [360, 0],
                  scale: isHovered ? [1, 1.25, 1] : [1, 1.05, 1],
                  opacity: [0.25, 0.5, 0.25]
                }}
              />

              {/* Main 3D Card with Advanced Effects */}
              <motion.div
                className="relative rounded-[40px] p-[2px] overflow-hidden"
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  boxShadow: dynamicShadow,
                  transformStyle: 'preserve-3d',
                  background: useMotionTemplate`
                    linear-gradient(135deg,
                    rgba(96,165,250,${isHovered ? 0.4 : 0.25}) 0%,
                    rgba(255,255,255,0.15) 50%,
                    rgba(96,165,250,${isHovered ? 0.35 : 0.2}) 100%)
                  `
                }}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-[40px]"
                  style={{
                    background: dynamicGradient,
                    opacity: isHovered ? 0.8 : 0.4
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Shimmer Sweep Effect */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[40px]"
                  style={{
                    background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.6) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: isHovered ? ['200% 0', '-200% 0'] : ['100% 0', '100% 0']
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: isHovered ? Infinity : 0,
                  }}
                />

                {/* Inner Glass Card */}
                <motion.div
                  className="relative rounded-[38px] bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl p-8"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(30px)',
                  }}
                >
                  {/* Holographic Overlay */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-[38px] opacity-30"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(96,165,250,0.15) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: isHovered ? ['0% 50%', '100% 50%'] : ['50% 50%', '50% 50%']
                    }}
                    transition={{ duration: 2, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
                  />

                  {/* Image Container with Advanced Effects */}
                  <motion.div
                    className="relative overflow-hidden rounded-[24px] ring-1 ring-gabardo-blue/10"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Gradient Light Leak Effect */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        background: dynamicGradient,
                        mixBlendMode: 'soft-light',
                        opacity: isHovered ? 0.4 : 0.15
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <Image
                      src="/Apresentação  Institucional - Transportes Gabardo (2).jpg"
                      alt="Clientes Gabardo"
                      width={900}
                      height={600}
                      className="w-full rounded-[24px] transition-all duration-500"
                      style={{
                        filter: isHovered
                          ? 'brightness(1.15) contrast(1.05) saturate(1.1)'
                          : 'brightness(1.12) contrast(1.02) saturate(1.05)',
                      }}
                      priority
                    />

                    {/* Corner Accents */}
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
                      <motion.div
                        key={corner}
                        className={`absolute w-8 h-8 ${
                          corner.includes('top') ? 'top-2' : 'bottom-2'
                        } ${
                          corner.includes('left') ? 'left-2' : 'right-2'
                        }`}
                        style={{
                          borderTop: corner.includes('top') ? '2px solid rgba(96,165,250,0.4)' : 'none',
                          borderBottom: corner.includes('bottom') ? '2px solid rgba(96,165,250,0.4)' : 'none',
                          borderLeft: corner.includes('left') ? '2px solid rgba(96,165,250,0.4)' : 'none',
                          borderRight: corner.includes('right') ? '2px solid rgba(96,165,250,0.4)' : 'none',
                          borderTopLeftRadius: corner === 'top-left' ? '8px' : 0,
                          borderTopRightRadius: corner === 'top-right' ? '8px' : 0,
                          borderBottomLeftRadius: corner === 'bottom-left' ? '8px' : 0,
                          borderBottomRightRadius: corner === 'bottom-right' ? '8px' : 0,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: isHovered ? [0.4, 1, 0.4] : 0,
                          scale: isHovered ? [0.8, 1.1, 0.8] : 0
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: isHovered ? Infinity : 0,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced Shadow Projection */}
              <motion.div
                className="pointer-events-none absolute -bottom-16 left-1/2 h-24 w-[75%] -translate-x-1/2 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(19,45,81,0.35) 0%, transparent 70%)'
                }}
                animate={{
                  opacity: isHovered ? [0.4, 0.7, 0.4] : [0.3, 0.45, 0.3],
                  scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeClientsLogoSection;
