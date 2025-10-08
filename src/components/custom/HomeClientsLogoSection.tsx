'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Client logos with bento grid layout positions
const clientLogosWithLayout = [
  { id: 1, name: 'Cliente 1', span: 'md:col-span-2 md:row-span-2' }, // Large featured
  { id: 2, name: 'Cliente 2', span: 'md:col-span-1 md:row-span-1' },
  { id: 3, name: 'Cliente 3', span: 'md:col-span-1 md:row-span-1' },
  { id: 4, name: 'Cliente 4', span: 'md:col-span-2 md:row-span-1' }, // Wide
  { id: 5, name: 'Cliente 5', span: 'md:col-span-1 md:row-span-1' },
  { id: 6, name: 'Cliente 6', span: 'md:col-span-1 md:row-span-2' }, // Tall
  { id: 7, name: 'Cliente 7', span: 'md:col-span-1 md:row-span-1' },
  { id: 8, name: 'Cliente 8', span: 'md:col-span-1 md:row-span-1' },
  { id: 9, name: 'Cliente 9', span: 'md:col-span-1 md:row-span-1' },
  { id: 10, name: 'Cliente 10', span: 'md:col-span-2 md:row-span-2' }, // Large featured
  { id: 11, name: 'Cliente 11', span: 'md:col-span-1 md:row-span-1' },
  { id: 12, name: 'Cliente 12', span: 'md:col-span-1 md:row-span-1' },
  { id: 13, name: 'Cliente 13', span: 'md:col-span-1 md:row-span-1' },
  { id: 14, name: 'Cliente 14', span: 'md:col-span-2 md:row-span-1' }, // Wide
  { id: 15, name: 'Cliente 15', span: 'md:col-span-1 md:row-span-1' },
  { id: 16, name: 'Cliente 16', span: 'md:col-span-1 md:row-span-1' },
  { id: 17, name: 'Cliente 17', span: 'md:col-span-1 md:row-span-1' },
  { id: 18, name: 'Cliente 18', span: 'md:col-span-1 md:row-span-2' }, // Tall
  { id: 19, name: 'Cliente 19', span: 'md:col-span-1 md:row-span-1' },
  { id: 20, name: 'Cliente 20', span: 'md:col-span-1 md:row-span-1' },
  { id: 21, name: 'Cliente 21', span: 'md:col-span-1 md:row-span-1' },
];

const HomeClientsLogoSection = () => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);

  return (
    <section className="section-shell bg-gradient-to-br from-white via-gabardo-light-blue/5 to-white overflow-hidden">
      {/* Animated Background Effects */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        {/* Dot Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(96,165,250,0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute -right-24 top-20 h-64 w-64 rounded-full bg-gradient-to-br from-gabardo-light-blue/20 to-gabardo-blue/10 blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-20 bottom-16 h-72 w-72 rounded-full bg-gradient-to-tr from-gabardo-blue/15 to-gabardo-light-blue/10 blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
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

          {/* Right Column - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[120px] gap-3">
            {clientLogosWithLayout.map((logo, index) => (
              <Link
                key={logo.id}
                href="/sobre/secao-institucional"
                className={`${logo.span} group relative rounded-2xl bg-white border border-gabardo-blue/10 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + (index * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                  onHoverStart={() => setHoveredLogo(logo.id)}
                  onHoverEnd={() => setHoveredLogo(null)}
                >
                  {/* Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gabardo-light-blue/5 via-transparent to-gabardo-blue/5"
                    animate={{
                      opacity: hoveredLogo === logo.id ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Logo Image */}
                  <Image
                    src={`/NewLogos/Nlogo (${logo.id}).png`}
                    alt={logo.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  
                  {/* Hover Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(96,165,250,0.3), rgba(96,165,250,0.1))',
                      opacity: 0
                    }}
                    animate={{
                      opacity: hoveredLogo === logo.id ? 0.5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeClientsLogoSection;
