'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrench, Zap, Users, Building, Truck } from 'lucide-react';

const facilities = [
  { name: 'Oficina', description: 'Manutenção completa para nossa frota.', icon: <Wrench className="w-6 h-6 text-blue-500" /> },
  { name: 'Elétrica', description: 'Serviços elétricos especializados para veículos.', icon: <Zap className="w-6 h-6 text-blue-500" /> },
  { name: 'Refeitório', description: 'Espaço para refeições dos colaboradores.', icon: <Users className="w-6 h-6 text-blue-500" /> },
  { name: 'Escritório', description: 'Amplo espaço administrativo.', icon: <Building className="w-6 h-6 text-blue-500" /> },
  { name: 'Box de Manutenção', description: 'Baias dedicadas para a manutenção dos caminhões.', icon: <Truck className="w-6 h-6 text-blue-500" /> },
];

export default function FacilitiesSection() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Nossas Instalações</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Estrutura completa para dar suporte às nossas operações e aos nossos colaboradores.
            </p>
            <div className="mt-8 space-y-6">
              {facilities.map((facility) => (
                <div key={facility.name} className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 text-blue-500">
                    {facility.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                    <p className="text-base text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 grid-rows-2 gap-4 h-96"
          >
            <div className="col-span-1 row-span-2 relative rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/co-01.jpg" alt="Facility Image 1" fill className="object-cover" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/co-03.jpg" alt="Facility Image 2" fill className="object-cover" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/co-04.jpg" alt="Facility Image 3" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
