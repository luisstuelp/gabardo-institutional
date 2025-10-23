'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Client logos with bento grid layout positions
const clientLogosWithLayout = [
  { id: 1, name: 'Cliente 1', span: 'md:col-span-2 md:row-span-2', assetId: 11 }, // Large featured
  { id: 2, name: 'Cliente 2', span: 'md:col-span-1 md:row-span-1', assetId: 1 },
  { id: 7, name: 'Cliente 7', span: 'md:col-span-1 md:row-span-1', assetId: 4 },
  { id: 3, name: 'Cliente 3', span: 'md:col-span-1 md:row-span-1', assetId: 2 },
  { id: 11, name: 'Cliente 11', span: 'md:col-span-1 md:row-span-1', assetId: 7 },
  { id: 14, name: 'Cliente 14', span: 'md:col-span-2 md:row-span-1', assetId: 12 }, // Wide
  { id: 4, name: 'Cliente 4', span: 'md:col-span-2 md:row-span-2', assetId: 9 }, // Large featured - proportionally scaled
  { id: 15, name: 'Cliente 15', span: 'md:col-span-1 md:row-span-1', assetId: 13 },
  { id: 8, name: 'Cliente 8', span: 'md:col-span-1 md:row-span-1', assetId: 5 },
  { id: 18, name: 'Cliente 18', span: 'md:col-span-1 md:row-span-2', assetId: 16 }, // Tall
  { id: 5, name: 'Cliente 5', span: 'md:col-span-1 md:row-span-1', assetId: 3 },
  { id: 17, name: 'Cliente 17', span: 'md:col-span-1 md:row-span-1', assetId: 15 },
  { id: 9, name: 'Cliente 9', span: 'md:col-span-1 md:row-span-1', assetId: 6 },
  { id: 19, name: 'Cliente 19', span: 'md:col-span-1 md:row-span-1', assetId: 18 },
  { id: 12, name: 'Cliente 12', span: 'md:col-span-1 md:row-span-1', assetId: 8 },
  { id: 6, name: 'Cliente 6', span: 'md:col-span-2 md:row-span-2', assetId: 17 }, // Large featured
  { id: 20, name: 'Cliente 20', span: 'md:col-span-1 md:row-span-1', assetId: 19 },
  { id: 13, name: 'Cliente 13', span: 'md:col-span-1 md:row-span-1', assetId: 10 },
  { id: 10, name: 'Cliente 10', span: 'md:col-span-2 md:row-span-2', assetId: 21 }, // Large featured
  { id: 16, name: 'Cliente 16', span: 'md:col-span-1 md:row-span-1', assetId: 14 },
  { id: 21, name: 'Cliente 21', span: 'md:col-span-1 md:row-span-1', assetId: 20 },
];

const clientDetails: Record<number, { name: string; description: string }> = {
  1: {
    name: 'Volkswagen',
    description: 'Montadora alemã reconhecida por engenharia robusta e produção de veículos globais como Gol, Polo e ID.4.'
  },
  2: {
    name: 'CAOA Chery',
    description: 'Joint-venture com foco em SUVs, híbridos e elétricos, aliando design moderno e tecnologia chinesa ao know-how brasileiro.'
  },
  3: {
    name: 'Stellantis',
    description: 'Grupo responsável por marcas como Fiat, Jeep e Peugeot no país, com operações logísticas multi-plataforma.'
  },
  4: {
    name: 'Volvo',
    description: 'Fabricante sueca de caminhões e veículos premium, referência em segurança, produtividade e propulsão sustentável.'
  },
  5: {
    name: 'Toyota',
    description: 'Líder em eletrificação híbrida, com foco em confiabilidade e gestão enxuta de cadeia produtiva.'
  },
  6: {
    name: 'Mercedes-Benz',
    description: 'Marca alemã com portfólio de veículos comerciais e leves premium, priorizando tecnologia embarcada.'
  },
  7: {
    name: 'BMW',
    description: 'Especialista em veículos de performance e mobilidade elétrica, com fábricas e centros de distribuição no Brasil.'
  },
  8: {
    name: 'Hyundai',
    description: 'Empresa sul-coreana que entrega carros com custo-benefício, design moderno e versões ICE e elétricas.'
  },
  9: {
    name: 'Kia',
    description: 'Montadora asiática focada em SUVs e veículos urbanos conectados, com rede nacional de concessionárias.'
  },
  10: {
    name: 'Randon',
    description: 'Conglomerado brasileiro líder em implementos rodoviários e soluções para transporte de carga.'
  },
  11: {
    name: 'Volvo Cars',
    description: 'Divisão de automóveis premium da Volvo, referência em segurança ativa e design escandinavo.'
  },
  12: {
    name: 'Glovis',
    description: 'Operador logístico global do Grupo Hyundai-Kia, especialista em shipping de veículos e CKD.'
  },
  13: {
    name: 'Movida',
    description: 'Locadora brasileira com foco em mobilidade corporativa, venda de seminovos e energia renovável.'
  },
  14: {
    name: 'Renault',
    description: 'Montadora francesa com produção nacional e portfólio que vai de compactos a utilitários elétricos.'
  },
  15: {
    name: 'Nissan',
    description: 'Marca japonesa que combina veículos populares, SUVs e pioneirismo em mobilidade 100% elétrica.'
  },
  16: {
    name: 'Honda',
    description: 'Gigante japonesa de automóveis e motocicletas, reconhecida por eficiência energética e qualidade construtiva.'
  },
  17: {
    name: 'Agrale',
    description: 'Fabricante brasileira de caminhões leves, chassis e tratores, com forte atuação em aplicações severas.'
  },
  18: {
    name: 'Audi',
    description: 'Marca alemã premium focada em tecnologia quattro, infotainment avançado e elétricos e-tron.'
  },
  19: {
    name: 'Scania',
    description: 'Referência em caminhões pesados e soluções modulares de powertrain com foco em sustentabilidade.'
  },
  20: {
    name: 'Peugeot',
    description: 'Marca francesa com linha de SUVs e utilitários, priorizando conectividade e design arrojado.'
  },
  21: {
    name: 'Citroën',
    description: 'Montadora francesa com veículos confortáveis e soluções urbanas como o elétrico ë-C3.'
  }
};

const HomeClientsLogoSection = () => {
  const [flippedLogo, setFlippedLogo] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-shell bg-gradient-to-br from-white via-gabardo-light-blue/5 to-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
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

      <div className="section-container flex flex-col gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-4xl"
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-gabardo-blue shadow-sm ring-1 ring-gabardo-light-blue/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3 w-3 sm:h-4 sm:w-4"
              >
                <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4Z" />
                <path d="M4 20c0-3.314 3.134-6 7-6h2c3.866 0 7 2.686 7 6" strokeLinecap="round" />
              </svg>
              <span>Nossos Clientes</span>
            </motion.div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="section-heading text-center text-gabardo-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
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
                  className="mt-1 block font-extrabold text-gabardo-light-blue text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                >
                  na Gabardo
                </motion.span>
              </motion.h2>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '5.5rem', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                className="mx-auto h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue relative overflow-hidden"
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
                className="section-subheading text-center text-sm sm:text-base md:text-lg"
              >
                Parcerias sólidas com marcas globais, sustentadas por tecnologia, compliance e equipes especializadas para cada operação.
              </motion.p>

            </div>

        </motion.div>

        {/* Logos Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gabardo-blue/30 scrollbar-track-transparent" role="list">
            <div className="min-w-full sm:min-w-[1024px] lg:min-w-[1280px] grid grid-flow-dense grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-[repeat(6,minmax(140px,_1fr))] auto-rows-[90px] sm:auto-rows-[110px] md:auto-rows-[120px] gap-2 sm:gap-2.5 md:gap-3 px-2 sm:px-6 md:px-8">
            {clientLogosWithLayout.map((logo, index) => {
              const detailId = logo.assetId ?? logo.id;
              const detail = clientDetails[detailId];
              const displayName = detail?.name ?? logo.name ?? `Cliente ${detailId}`;
              const displayDescription = detail?.description ?? 'Parceiro estratégico da Gabardo em soluções logísticas personalizadas em todo o Brasil.';

              return (
                <Link
                  key={logo.id}
                  href="/sobre/secao-institucional#nossos-clientes"
                  className={`${logo.span ?? ''} group relative rounded-xl sm:rounded-2xl bg-white border border-gabardo-blue/10 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl [perspective:1200px]`}
                  onMouseEnter={() => !isMobile && setFlippedLogo(logo.id)}
                  onMouseLeave={() => !isMobile && setFlippedLogo(null)}
                  scroll={true}
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
                  className={`absolute inset-0 pointer-events-none ${detailId === 9 ? 'p-8 sm:p-10 md:p-12' : 'p-2 sm:p-3 md:p-4'}`}
                  animate={{ rotateY: flippedLogo === logo.id ? 180 : 0 }}
                >
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white shadow-sm transition-all duration-300 [transform-style:preserve-3d]">
                    <div
                      className="absolute inset-0 flex items-center justify-center p-2 sm:p-3 md:p-4"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <motion.div 
                        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gabardo-light-blue/5 via-transparent to-gabardo-blue/5"
                      />

                      <Image
                        src={`/NewLogos/Nlogo (${detailId}).png`}
                        alt={displayName}
                        width={300}
                        height={300}
                        className={`w-full h-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 ${detailId === 9 ? 'scale-75' : ''} ${detailId === 21 ? 'scale-150' : ''}`}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(96,165,250,0.3), rgba(96,165,250,0.1))',
                          opacity: 0
                        }}
                      />
                    </div>

                    <div
                      className="absolute inset-0 flex h-full w-full flex-col justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#08162a] via-[#0b2242] to-[#0d2b53] p-3 sm:p-4 md:p-6 text-white text-center [transform:rotateY(180deg)]"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <h3 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                        {displayName}
                      </h3>
                      <p className="text-[0.65rem] sm:text-xs text-white/80 leading-relaxed hidden sm:block">
                        {displayDescription}
                      </p>
                      <span className="mt-1 sm:mt-2 inline-flex items-center justify-center rounded-full bg-white/15 px-2 sm:px-3 py-0.5 sm:py-1 text-[0.5rem] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/70 hidden sm:inline-flex">
                        Clique para voltar
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
            })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeClientsLogoSection;
