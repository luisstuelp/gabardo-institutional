'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfraestruturaHeroSection() {
  return (
    <div className="relative w-full h-[60vh] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/gabardo-truck-fleet.JPG"
          alt="Frota de caminhões Gabardo"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 md:from-black/45 md:via-black/25 md:to-black/45" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight tracking-tight mb-4 md:mb-6 text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
        >
          Infraestrutura de Ponta
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
        >
          Instalações modernas e pátios estrategicamente localizados para garantir a eficiência e segurança no transporte de veículos.
        </motion.p>
      </div>
    </div>
  );
}
