'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Building2, Package, Wrench, Zap, Shield, Truck, ChevronRight, X, Sparkles } from 'lucide-react';
import units from '@/data/units.json';

type Region = 'Sul' | 'Sudeste' | 'Centro-Oeste' | 'Nordeste' | 'all';

const regionColors: Record<Region, string> = {
  'Sul': '#38B6FF',
  'Sudeste': '#4BFFB4',
  'Centro-Oeste': '#FFB347',
  'Nordeste': '#F4A8FF',
  'all': '#132D51'
};

const regionMeta: Record<Exclude<Region, 'all'>, { tagline: string; summary: string; funFact: string }> = {
  'Sul': {
    tagline: 'Hub exportador e base de inovação',
    summary: 'Integramos manufatura, pátios portuários e a matriz SJP com operações 24/7 e frota dedicada.',
    funFact: 'Mais de 50% da energia consumida na região vem de geração solar própria.'
  },
  'Sudeste': {
    tagline: 'Coração da cadeia automotiva',
    summary: 'Proximidade com montadoras, polos industriais e portos garante lead times agressivos e SLAs rigorosos.',
    funFact: 'Equipe OEM dedicada com squads para OEMs de SP, RJ e ES.'
  },
  'Centro-Oeste': {
    tagline: 'Conexão logística para o interior do país',
    summary: 'Base estratégica em Anápolis sustentando rotas multimodais e abastecimento nacional.',
    funFact: 'Capacidade de parqueamento para 420 veículos com operação redundante de TI.'
  },
  'Nordeste': {
    tagline: 'Porta de entrada para o Norte e LATAM',
    summary: 'Eusébio e operações no Ceará conectam importações, exportações e distribuição regional com preparo EV.',
    funFact: 'Hub com telemetria 24/7 e plano de contingência completo.'
  }
};

const computeMetrics = (selectedUnits: typeof units) => {
  return selectedUnits.reduce(
    (acc, unit) => {
      acc.capacity += unit.infraestrutura.capacidade_veiculos;
      acc.solar += unit.infraestrutura.energia_solar_kwp;
      acc.boxes += unit.infraestrutura.boxes_manutencao;
      acc.servicesCount += unit.servicos.length;
      unit.servicos.forEach((service) => {
        acc.servicesFrequency[service] = (acc.servicesFrequency[service] || 0) + 1;
      });
      return acc;
    },
    {
      capacity: 0,
      solar: 0,
      boxes: 0,
      servicesCount: 0,
      servicesFrequency: {} as Record<string, number>
    }
  );
};

const getTopServices = (frequency: Record<string, number>) =>
  Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([service]) => service);

export default function LocationsMapInteractive() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to summary when region changes
  useEffect(() => {
    if (selectedRegion !== 'all' && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedRegion]);

  const filteredUnits = selectedRegion === 'all' 
    ? units 
    : units.filter(unit => unit.regiao === selectedRegion);

  // Use selectedRegion as the primary driver, only fall back to hoveredRegion when 'all' is selected
  const activeRegion: Region = selectedRegion !== 'all'
    ? selectedRegion
    : (hoveredRegion && hoveredRegion !== 'all' ? hoveredRegion : 'all');

  const focusUnits = activeRegion === 'all' ? units : units.filter((unit) => unit.regiao === activeRegion);
  const metrics = computeMetrics(focusUnits);
  const topServices = getTopServices(metrics.servicesFrequency);
  const totalUnits = focusUnits.length;
  const summaryText = activeRegion === 'all'
    ? 'Cobertura nacional conectando hubs estratégicos no Sul, Sudeste, Centro-Oeste e Nordeste com SLAs sincronizados.'
    : regionMeta[activeRegion].summary;
  const tagline = activeRegion === 'all'
    ? 'Cobertura nacional em movimento'
    : regionMeta[activeRegion].tagline;
  const funFact = activeRegion === 'all'
    ? 'Todas as unidades operam com SD-WAN e backups noturnos, garantindo continuidade total.'
    : regionMeta[activeRegion].funFact;

  const getIconForService = (service: string) => {
    if (service.includes('PDI')) return Package;
    if (service.includes('Manutenção')) return Wrench;
    if (service.includes('Distribuição')) return Truck;
    return Building2;
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-gabardo-light-blue/40 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-gabardo-blue/30 to-transparent blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 rounded-full border border-gabardo-blue/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm"
          >
            <MapPin className="h-5 w-5 text-gabardo-blue" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue">Presença Nacional</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-4xl font-bold text-gabardo-blue md:text-5xl lg:text-6xl"
          >
            Encontre a unidade mais próxima
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            {filteredUnits.length} {filteredUnits.length === 1 ? 'unidade estrategicamente posicionada' : 'unidades estrategicamente posicionadas'} para atender toda a LATAM
          </motion.p>
        </div>

        {/* Region Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {(['all', 'Sul', 'Sudeste', 'Centro-Oeste', 'Nordeste'] as Region[]).map((region) => (
            <motion.button
              key={region}
              onClick={() => setSelectedRegion(region)}
              onMouseEnter={() => setHoveredRegion(region)}
              onMouseLeave={() => setHoveredRegion(null)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative overflow-hidden rounded-full px-6 py-3 font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedRegion === region
                  ? 'text-white shadow-xl'
                  : 'border-2 bg-white/70 text-gray-700 shadow-md backdrop-blur-sm hover:bg-white'
              }`}
              style={{
                borderColor: selectedRegion === region ? regionColors['all'] : 'transparent',
                backgroundColor: selectedRegion === region ? regionColors['all'] : undefined
              }}
            >
              <span className="relative z-10 text-xs md:text-sm">
                {region === 'all' ? 'LATAM' : `${region}`}
              </span>
              {selectedRegion !== region && (
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10"
                  style={{ backgroundColor: regionColors['all'] }}
                  initial={false}
                  animate={{ opacity: hoveredRegion === region ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Interactive Summary + List */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: Dynamic Region Summary */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              ref={summaryRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border-2 border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-lg"
            >
              <motion.div
                className="absolute inset-0 opacity-80"
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${regionColors['all']}22, transparent 55%), radial-gradient(circle at 80% 80%, ${regionColors['all']}18, transparent 60%)`
                }}
              />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
                  <Sparkles className="h-4 w-4" />
                  {activeRegion === 'all' ? 'Cobertura nacional' : `Região ${activeRegion}`}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gabardo-blue/70">
                    {tagline}
                  </p>
                  <h3 className="text-3xl font-bold text-gabardo-blue md:text-4xl">
                    {activeRegion === 'all' ? 'Rede sincronizada em toda a LATAM' : summaryText.split('.')[0] + '.'}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {summaryText}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gabardo-blue/15 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Unidades</p>
                  <p className="mt-2 text-3xl font-bold text-gabardo-blue">{totalUnits}</p>
                  <p className="text-xs text-gray-500">Com operação ativa e conectada</p>
                </div>
                <div className="rounded-2xl border border-gabardo-blue/15 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Capacidade</p>
                  <p className="mt-2 text-3xl font-bold text-gabardo-blue">{metrics.capacity.toLocaleString()} veículos</p>
                  <p className="text-xs text-gray-500">Parqueamento simultâneo</p>
                </div>
                <div className="rounded-2xl border border-gabardo-blue/15 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Energia Solar</p>
                  <p className="mt-2 text-3xl font-bold text-gabardo-blue">{metrics.solar.toLocaleString()} kWp</p>
                  <p className="text-xs text-gray-500">Matriz energética renovável</p>
                </div>
                <div className="rounded-2xl border border-gabardo-blue/15 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Boxes</p>
                  <p className="mt-2 text-3xl font-bold text-gabardo-blue">{metrics.boxes}</p>
                  <p className="text-xs text-gray-500">Manutenção dedicada</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gabardo-blue/60">Destaques</p>
                <div className="flex flex-wrap gap-2">
                  {topServices.length > 0 ? (
                    topServices.map((service) => {
                      const Icon = getIconForService(service);
                      return (
                        <span
                          key={service}
                          className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gabardo-blue shadow-sm"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {service}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-gray-500">Selecione uma região para ver os serviços estratégicos.</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{funFact}</p>
              </div>
            </div>
          </motion.div>
          </AnimatePresence>

          {/* Right: Units List */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 overflow-auto pr-2"
                style={{ maxHeight: '700px' }}
              >
                {filteredUnits.map((unit, idx) => (
                  <motion.div
                    key={unit.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => {
                      const query = encodeURIComponent(unit.endereco);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent bg-white p-6 shadow-lg transition-all duration-300 hover:border-gabardo-light-blue hover:shadow-2xl"
                  >
                    {/* Color Accent Bar */}
                    <div
                      className="absolute left-0 top-0 h-full w-1.5 transition-all duration-300 group-hover:w-2"
                      style={{ backgroundColor: regionColors['all'] }}
                    />

                    <div className="ml-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gabardo-blue group-hover:text-gabardo-light-blue">
                            {unit.nome}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {unit.cidade} • {unit.estado}
                          </p>
                        </div>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                          className="text-gabardo-light-blue opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </motion.div>
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gabardo-blue/5 px-3 py-1 text-xs font-medium text-gabardo-blue">
                          <Building2 className="h-3 w-3" />
                          {unit.infraestrutura.capacidade_veiculos} veículos
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gabardo-blue/10 px-3 py-1 text-xs font-medium text-gabardo-blue">
                          <Zap className="h-3 w-3 text-gabardo-blue" />
                          {unit.infraestrutura.area_total_m2.toLocaleString()} m²
                        </span>
                      </div>

                      {/* Services Preview */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {unit.servicos.slice(0, 3).map((service, i) => {
                          const Icon = getIconForService(service);
                          return (
                            <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-600">
                              <Icon className="h-3 w-3" />
                              {service}
                            </span>
                          );
                        })}
                        {unit.servicos.length > 3 && (
                          <span className="text-xs font-medium text-gabardo-blue">
                            +{unit.servicos.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Unit Detail Modal */}
        <AnimatePresence>
          {selectedUnit && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedUnit(null)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-4 z-50 m-auto flex max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-3xl border-2 border-gabardo-blue/20 bg-white shadow-2xl md:inset-8"
              >
                {/* Header */}
                <div
                  className="relative p-8 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${regionColors[selectedUnit.regiao as Region]} 0%, ${regionColors[selectedUnit.regiao as Region]}dd 100%)`
                  }}
                >
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  <h2 className="text-3xl font-bold">{selectedUnit.nome}</h2>
                  <p className="mt-2 flex items-center gap-2 text-white/90">
                    <MapPin className="h-4 w-4" />
                    {selectedUnit.endereco}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  {/* Contact Info */}
                  <div className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <Phone className="h-5 w-5 text-gabardo-blue" />
                      <div>
                        <div className="text-xs text-gray-500">Telefone</div>
                        <div className="font-semibold text-gray-900">{selectedUnit.telefone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <Mail className="h-5 w-5 text-gabardo-blue" />
                      <div>
                        <div className="text-xs text-gray-500">E-mail</div>
                        <div className="font-semibold text-gray-900">{selectedUnit.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <Clock className="h-5 w-5 text-gabardo-blue" />
                      <div>
                        <div className="text-xs text-gray-500">Horário</div>
                        <div className="font-semibold text-gray-900">{selectedUnit.horario.split(' ')[0]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-8">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gabardo-blue">
                      <Package className="h-5 w-5" />
                      Serviços Disponíveis
                    </h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selectedUnit.servicos.map((service, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 rounded-xl border border-gabardo-blue/20 bg-gabardo-blue/5 p-3"
                        >
                          <div className="rounded-lg bg-white p-2 shadow-sm">
                            {getIconForService(service)({ className: 'h-4 w-4 text-gabardo-blue' })}
                          </div>
                          <span className="font-medium text-gray-900">{service}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Infrastructure Highlights */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gabardo-blue">
                      <Building2 className="h-5 w-5" />
                      Infraestrutura
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4">
                        <div className="text-3xl font-bold text-gabardo-blue">
                          {selectedUnit.infraestrutura.area_total_m2.toLocaleString()}m²
                        </div>
                        <div className="text-sm text-gray-600">Área Total</div>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-white p-4">
                        <div className="text-3xl font-bold text-green-600">
                          {selectedUnit.infraestrutura.capacidade_veiculos}
                        </div>
                        <div className="text-sm text-gray-600">Capacidade de Veículos</div>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-orange-50 to-white p-4">
                        <div className="text-3xl font-bold text-orange-600">
                          {selectedUnit.infraestrutura.boxes_manutencao}
                        </div>
                        <div className="text-sm text-gray-600">Boxes de Manutenção</div>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-yellow-50 to-white p-4">
                        <div className="text-3xl font-bold text-yellow-600">
                          {selectedUnit.infraestrutura.energia_solar_kwp} kWp
                        </div>
                        <div className="text-sm text-gray-600">Energia Solar</div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                      {selectedUnit.infraestrutura.oficina_propria && (
                        <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2 text-xs font-medium text-blue-700">
                          <Wrench className="h-4 w-4" />
                          Oficina Própria
                        </div>
                      )}
                      {selectedUnit.infraestrutura.lavacao && (
                        <div className="flex items-center gap-2 rounded-lg bg-cyan-50 p-2 text-xs font-medium text-cyan-700">
                          <Shield className="h-4 w-4" />
                          Lavação
                        </div>
                      )}
                      {selectedUnit.infraestrutura.posto_combustivel && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2 text-xs font-medium text-red-700">
                          <Zap className="h-4 w-4" />
                          Posto
                        </div>
                      )}
                      {selectedUnit.infraestrutura.preparacao_ev && (
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-2 text-xs font-medium text-green-700">
                          <Zap className="h-4 w-4" />
                          EV Ready
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
