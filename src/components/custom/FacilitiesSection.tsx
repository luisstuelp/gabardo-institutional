'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Wrench, Zap, Users, Building, Truck } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import unitsPageContent from '@/data/unitsPageContent.json';

const facilities = [
  { name: 'Oficina', description: 'Manutenção completa para nossa frota.', icon: <Wrench className="w-6 h-6 text-gabardo-blue" />, image: '/images/Oficina.JPG' },
  { name: 'TI', description: 'Infraestrutura de tecnologia e sistemas integrados.', icon: <Zap className="w-6 h-6 text-gabardo-blue" />, image: '/images/Eletrica.JPG' },
  { name: 'Refeitório', description: 'Espaço para refeições dos colaboradores.', icon: <Users className="w-6 h-6 text-gabardo-blue" />, image: '/images/Refeitorio.JPG' },
  { name: 'Escritório', description: 'Amplo espaço administrativo.', icon: <Building className="w-6 h-6 text-gabardo-blue" />, image: '/images/Escritorio.JPG' },
  { name: 'Box de Manutenção', description: 'Baias dedicadas para a manutenção dos caminhões.', icon: <Truck className="w-6 h-6 text-gabardo-blue" />, image: '/images/Box.JPG' },
];

const textVariants = {
  hidden: { opacity: 0, y: 50, skewY: 5 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function FacilitiesSection() {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const { infrastructure } = unitsPageContent;
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);

  useEffect(() => {
    if (leftColumnRef.current) {
      setLeftColumnHeight(leftColumnRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gabardo-blue tracking-tight">Nossas Instalações</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Estrutura completa para dar suporte às nossas operações e aos nossos colaboradores.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6" ref={leftColumnRef}>
            {facilities.map((facility) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setSelectedFacility(facility)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedFacility.name === facility.name ? 'bg-blue-50 shadow-lg' : 'hover:bg-gray-100'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500">
                    {facility.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                    <p className="text-base text-gray-600">{facility.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFacility.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg overflow-hidden shadow-lg"
              style={{ height: leftColumnHeight > 0 ? leftColumnHeight : 'auto' }}
            >
              <img src={selectedFacility.image} alt={selectedFacility.name} className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative overflow-hidden">
        <div className="moving-lines-background"></div>
        <div className="text-center mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight"
          >
            {infrastructure.title}
          </motion.h2>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed text-center"
            variants={textVariants}
          >
            Nossas unidades seguem um padrão de infraestrutura que inclui pátios dimensionados para alto giro de veículos, boxes de manutenção, áreas de PDI e inspeção eletrônica. A <span className="font-bold text-blue-500">conectividade</span> é garantida por SD-WAN e links redundantes, com monitoramento de rede e rotinas de backup noturno para os sistemas corporativos.
          </motion.p>
          <motion.p 
            className="mt-8 text-xl text-gray-700 leading-relaxed text-center"
            variants={textVariants}
          >
            A <span className="font-bold text-blue-500">segurança</span> é um pilar fundamental, com CFTV 24/7, controle de acesso, portaria dedicada e iluminação perimetral em todas as nossas instalações. A <span className="font-bold text-blue-500">operação</span> é otimizada com PDI digital, parqueamento, armazenagem e distribuição. Nossas <span className="font-bold text-blue-500">oficinas próprias</span> com boxes cobertos e checklists eletrônicos garantem a manutenção de nossa frota. Em nosso compromisso com a <span className="font-bold text-blue-500">sustentabilidade</span>, estamos expandindo o uso de energia solar, fazemos a gestão de resíduos e estamos nos preparando para a era dos veículos elétricos.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}