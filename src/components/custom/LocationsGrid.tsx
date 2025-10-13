'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticCard from '@/components/ui/magnetic-card';
import Link from 'next/link';
import Image from 'next/image';

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  description: string;
  type: 'matriz' | 'sede' | 'filial';
  image: string;
  services: string[];
  phone: string;
  email: string;
  hours: string;
  coordinates: [number, number];
}

const locations: Location[] = [
  {
    id: 'aflitos',
    name: 'Aflitos',
    city: 'Recife',
    state: 'PE',
    address: 'Rua dos Aflitos, 123 - Aflitos, Recife - PE',
    description: 'Nossa unidade sede com estrutura completa e equipe especializada para atender todas as suas necessidades.',
    type: 'sede',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    services: ['Consultoria', 'Desenvolvimento', 'Suporte'],
    phone: '(81) 3333-1111',
    email: 'aflitos@plural.com',
    hours: 'Seg - Sex: 8h às 18h',
    coordinates: [-34.8825, -8.0476]
  },
  {
    id: 'boa-viagem',
    name: 'Boa Viagem',
    city: 'Recife',
    state: 'PE',
    address: 'Av. Boa Viagem, 456 - Boa Viagem, Recife - PE',
    description: 'Localizada na principal avenida da cidade, oferecendo fácil acesso e atendimento premium.',
    type: 'filial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    services: ['Consultoria', 'Atendimento', 'Vendas'],
    phone: '(81) 3333-2222',
    email: 'boaviagem@plural.com',
    hours: 'Seg - Sex: 8h às 18h, Sáb: 8h às 12h',
    coordinates: [-34.8942, -8.1194]
  },
  {
    id: 'caruaru',
    name: 'Caruaru',
    city: 'Caruaru',
    state: 'PE',
    address: 'Rua Central, 789 - Centro, Caruaru - PE',
    description: 'Expandindo nossa presença no interior de Pernambuco com serviços de qualidade.',
    type: 'filial',
    image: 'https://plus.unsplash.com/premium_photo-1661962361446-f450f3f21495?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    services: ['Consultoria', 'Suporte Local'],
    phone: '(87) 3333-3333',
    email: 'caruaru@plural.com',
    hours: 'Seg - Sex: 8h às 17h',
    coordinates: [-35.9762, -8.2837]
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza',
    city: 'Fortaleza',
    state: 'CE',
    address: 'Av. Beira Mar, 321 - Meireles, Fortaleza - CE',
    description: 'Nossa primeira expansão para fora de Pernambuco, consolidando nossa presença no Nordeste.',
    type: 'filial',
    image: 'https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    services: ['Consultoria', 'Desenvolvimento', 'Treinamento'],
    phone: '(85) 3333-4444',
    email: 'fortaleza@plural.com',
    hours: 'Seg - Sex: 8h às 18h',
    coordinates: [-38.5267, -3.7319]
  },
  {
    id: 'ilha-do-leite',
    name: 'Ilha do Leite',
    city: 'Recife',
    state: 'PE',
    address: 'Rua da Ilha, 654 - Ilha do Leite, Recife - PE',
    description: 'Unidade boutique focada em atendimento personalizado e soluções customizadas.',
    type: 'filial',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop',
    services: ['Consultoria Premium', 'Projetos Especiais'],
    phone: '(81) 3333-5555',
    email: 'ilhadoleite@plural.com',
    hours: 'Seg - Sex: 9h às 17h',
    coordinates: [-34.8731, -8.0389]
  },
  {
    id: 'petrolina',
    name: 'Petrolina',
    city: 'Petrolina',
    state: 'PE',
    address: 'Av. São Francisco, 987 - Centro, Petrolina - PE',
    description: 'Atendendo a região do vale do São Francisco com excelência e dedicação.',
    type: 'filial',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    services: ['Consultoria', 'Agronegócio'],
    phone: '(87) 3333-6666',
    email: 'petrolina@plural.com',
    hours: 'Seg - Sex: 8h às 17h',
    coordinates: [-40.5019, -9.3891]
  },
  {
    id: 'recife-antigo',
    name: 'Recife Antigo',
    city: 'Recife',
    state: 'PE',
    address: 'Rua do Bom Jesus, 159 - Recife Antigo, Recife - PE',
    description: 'Nossa matriz histórica, onde tudo começou. Patrimônio e tradição em cada atendimento.',
    type: 'matriz',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&h=600&fit=crop',
    services: ['Direção Geral', 'Consultoria', 'Desenvolvimento', 'Suporte'],
    phone: '(81) 3333-7777',
    email: 'matriz@plural.com',
    hours: 'Seg - Sex: 8h às 18h',
    coordinates: [-34.8711, -8.0631]
  },
  {
    id: 'varzea',
    name: 'Várzea',
    city: 'Recife',
    state: 'PE',
    address: 'Av. Caxangá, 753 - Várzea, Recife - PE',
    description: 'Unidade moderna com foco em inovação e tecnologia de ponta.',
    type: 'filial',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    services: ['Inovação', 'P&D', 'Tecnologia'],
    phone: '(81) 3333-8888',
    email: 'varzea@plural.com',
    hours: 'Seg - Sex: 8h às 18h',
    coordinates: [-34.9511, -8.0389]
  }
];

const LocationsGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'matriz' | 'sede' | 'filial'>('todos');
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const filteredLocations = locations.filter(location => 
    selectedFilter === 'todos' || location.type === selectedFilter
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'matriz': return 'bg-red-500';
      case 'sede': return 'bg-yellow-500';
      case 'filial': return 'bg-yellow-600';
      default: return 'bg-neutral-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'matriz': return 'Matriz';
      case 'sede': return 'Sede';
      case 'filial': return 'Filial';
      default: return type;
    }
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            nossas unidades
          </motion.h2>
          
          {/* Flag Icons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-0 right-0 md:right-8 flex items-center space-x-1"
          >
            {/* Brazil */}
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md bg-green-500 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500"></div>
              <div className="w-4 h-3 bg-yellow-400 rounded-full flex items-center justify-center relative z-10">
                <div className="w-3 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Argentina */}
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md bg-sky-400 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-white to-sky-400"></div>
              <div className="text-yellow-500 text-xs relative z-10">☀</div>
            </div>
            
            {/* Uruguay */}
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md bg-white flex flex-col relative">
              <div className="flex-1 bg-white"></div>
              <div className="h-0.5 bg-blue-500"></div>
              <div className="flex-1 bg-white"></div>
              <div className="h-0.5 bg-blue-500"></div>
              <div className="flex-1 bg-white"></div>
              <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white flex items-center justify-center">
                <div className="text-yellow-500 text-xs">☀</div>
              </div>
            </div>
            
            {/* Chile */}
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md bg-white flex flex-col relative">
              <div className="h-1/2 flex">
                <div className="w-1/2 bg-blue-600 flex items-center justify-center">
                  <div className="text-white text-xs">★</div>
                </div>
                <div className="w-1/2 bg-white"></div>
              </div>
              <div className="h-1/2 bg-red-600"></div>
            </div>
            
            {/* Bolivia */}
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md bg-red-600 flex flex-col">
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-yellow-400"></div>
              <div className="flex-1 bg-green-600"></div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8"
          >
            Encontre a unidade mais próxima e descubra como podemos ajudar você
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {['todos', 'matriz', 'sede', 'filial'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter as 'todos' | 'matriz' | 'sede' | 'filial')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-neutral-900 text-white shadow-lg'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {filter === 'todos' ? 'Todas' : getTypeLabel(filter)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Locations Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <MagneticCard className="h-full" strength={0.2} scale={1.05}>
                  <div
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group"
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={location.image} 
                        alt={`${location.name} - ${location.city}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(location.type)}`}>
                          {getTypeLabel(location.type)}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors">
                              {location.name}
                            </h3>
                            <p className="text-sm text-neutral-500">
                              {location.city}, {location.state}
                            </p>
                          </div>
                          <motion.div
                            animate={{
                              rotate: hoveredLocation === location.id ? 45 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-neutral-400 group-hover:text-yellow-500"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.div>
                        </div>

                        <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                          {location.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs text-neutral-500">
                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                              <path d="M9 9h6v6H9z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                            </svg>
                            <span className="line-clamp-1">{location.address}</span>
                          </div>
                          <div className="flex items-center text-xs text-neutral-500">
                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="4" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                              <path d="M3 12h18M3 17h18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                            </svg>
                            <span>{location.phone}</span>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {location.services.slice(0, 2).map((service) => (
                            <span
                              key={service}
                              className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                          {location.services.length > 2 && (
                            <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                              +{location.services.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/localizacao/${location.id}`}
                        className="w-full bg-neutral-900 text-white py-3 px-4 rounded-xl font-medium text-center hover:bg-neutral-800 transition-colors group-hover:bg-neutral-800"
                      >
                        Conhecer
                      </Link>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-neutral-500 text-lg">
              Nenhuma localização encontrada para o filtro selecionado.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Não encontrou sua cidade?
            </h3>
            <p className="text-neutral-600 mb-6">
              Estamos sempre expandindo. Entre em contato conosco e descubra quando chegaremos na sua região.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
            >
              <span>Entrar em Contato</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 12h18M12 3l9 9-9 9" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationsGrid;