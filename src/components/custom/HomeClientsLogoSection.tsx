'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useCallback } from 'react';

const HomeClientsLogoSection = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shadow = useMotionValue(0.45);

  const springRotateX = useSpring(useTransform(rotateX, [-20, 20], [10, -10]), {
    stiffness: 150,
    damping: 20
  });
  const springRotateY = useSpring(useTransform(rotateY, [-20, 20], [-10, 10]), {
    stiffness: 150,
    damping: 20
  });
  const springShadow = useSpring(useTransform(shadow, [0, 1], [0.35, 0.65]), {
    stiffness: 120,
    damping: 18
  });
  const dynamicShadow = useTransform(springShadow, (value) => `0px 30px 70px -40px rgba(19,45,81,${value})`);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const midX = bounds.width / 2;
    const midY = bounds.height / 2;

    rotateY.set(((offsetX - midX) / midX) * 20);
    rotateX.set(((offsetY - midY) / midY) * 20);
    shadow.set(0.9);
  }, [rotateX, rotateY, shadow]);

  const resetPointer = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shadow.set(0.45);
  }, [rotateX, rotateY, shadow]);

  return (
    <section className="section-shell bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-gabardo-light-blue/8" />
      <motion.div
        className="absolute -right-32 top-16 h-64 w-64 rounded-full bg-gabardo-light-blue/20 blur-3xl"
        animate={{
          y: [0, -10, 0],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-3xl"
        animate={{
          y: [0, 12, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="section-heading text-left text-gabardo-blue"
              >
                As marcas que confiam <span className="text-gabardo-light-blue">na Gabardo Distribuidora</span>
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '5.5rem' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                className="h-1 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue"
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                className="section-subheading text-left"
              >
                Parcerias sólidas com marcas globais, sustentadas por tecnologia, compliance e equipes especializadas para cada operação.
              </motion.p>

              <div className="flex flex-wrap gap-4 pt-4 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue/60">
                <span className="inline-flex items-center gap-2 rounded-full bg-gabardo-light-blue/15 px-5 py-2">ISO 9001</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gabardo-light-blue/15 px-5 py-2">ESG+</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gabardo-light-blue/15 px-5 py-2">Cobertura nacional</span>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative cursor-pointer"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="absolute -top-8 -right-8 hidden h-24 w-24 rounded-full bg-gabardo-light-blue/25 blur-3xl transition-all duration-300 group-hover:scale-110 lg:block" />
            <motion.div
              className="relative rounded-[36px] bg-gradient-to-br from-white via-white to-gabardo-light-blue/20 p-[2px]"
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                boxShadow: dynamicShadow
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="rounded-[32px] bg-white p-6 transition-all duration-300 group-hover:bg-white">
                <Image
                  src="/images/gabardo-clients-logos.png"
                  alt="Clientes Gabardo"
                  width={900}
                  height={600}
                  className="w-full rounded-[20px] bg-white shadow-inner"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="pointer-events-none absolute -bottom-12 left-1/2 h-20 w-[68%] -translate-x-1/2 rounded-full bg-gabardo-blue/15 blur-3xl"
              animate={{
                opacity: [0.32, 0.5, 0.32],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeClientsLogoSection;
