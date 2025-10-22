'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, MapPin, Gauge, Shield, Zap, Sun } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';

const unidades = [
  {
    regiao: 'Sul',
    destaque: 'Hub Exportador',
    unidades: '4 unidades',
    capacidade: '3.550 veículos',
    imagem: '/images/gabardo-truck-fleet.JPG',
    recursos: ['Pátios portuários', 'Conexão LATAM', 'Logística marítima']
  },
  {
    regiao: 'Sudeste',
    destaque: 'Proximidade Montadoras',
    unidades: '4 unidades',
    capacidade: '13.700 veículos',
    imagem: '/images/Oficina.JPG',
    recursos: ['Alto volume', 'PDI especializado', 'Boxes climatizados']
  },
  {
    regiao: 'Centro-Oeste',
    destaque: 'Conexão Nacional',
    unidades: '1 unidade',
    capacidade: '10.000 veículos',
    imagem: '/images/Box.JPG',
    recursos: ['Hub logístico', 'Distribuição nacional', 'Pátio dimensionado']
  },
  {
    regiao: 'Nordeste',
    destaque: 'Porta de Entrada',
    unidades: '2 unidades',
    capacidade: '200 veículos',
    imagem: '/images/Escritorio.JPG',
    recursos: ['Expansão estratégica', 'Cobertura Norte', 'Acesso LATAM']
  }
];

const diferenciais = [
  {
    icon: Building2,
    titulo: 'Infraestrutura Completa',
    descricao: 'Pátios dimensionados, boxes climatizados e áreas de PDI',
    stat: '60k m²'
  },
  {
    icon: Shield,
    titulo: 'Segurança 24/7',
    descricao: 'CFTV, controle de acesso e monitoramento contínuo',
    stat: 'CFTV HD'
  },
  {
    icon: Zap,
    titulo: 'Conectividade',
    descricao: 'SD-WAN enterprise com links redundantes',
    stat: '10Gbps'
  },
  {
    icon: Sun,
    titulo: 'Sustentabilidade',
    descricao: 'Energia solar e gestão de resíduos',
    stat: '1.470 kWp'
  }
];

export default function PatiosUnidadesPremium() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 sm:py-28">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gabardo-blue/5 to-transparent" />
        <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-gabardo-light-blue/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div style={{ opacity }} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white px-6 py-3 shadow-lg"
          >
            <MapPin className="h-5 w-5 text-gabardo-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-gabardo-blue">
              Presença Nacional
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight text-gabardo-blue sm:text-5xl lg:text-6xl"
          >
            Pátios & Unidades
            <br />
            <span className="text-gabardo-light-blue">Estrategicamente Posicionados</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl"
          >
            11 unidades com infraestrutura de ponta, capacidade para 27 mil veículos e cobertura completa do território nacional
          </motion.p>
        </motion.div>

        {/* Unidades Grid - Premium Bento Layout */}
        <div className="mx-auto mb-20 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {unidades.map((unidade, index) => (
              <motion.div
                key={unidade.regiao}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:shadow-gabardo-blue/20"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={unidade.imagem}
                    alt={unidade.regiao}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Region Badge */}
                  <div className="absolute right-6 top-6 rounded-full border-2 border-white bg-white/90 px-4 py-2 backdrop-blur-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-gabardo-blue">
                      {unidade.regiao}
                    </span>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      {unidade.destaque}
                    </h3>
                    <div className="flex items-center gap-4 text-white/90">
                      <span className="text-sm font-semibold">{unidade.unidades}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-sm font-semibold">{unidade.capacidade}</span>
                    </div>
                  </div>
                </div>

                {/* Recursos */}
                <div className="p-6">
                  <div className="grid gap-2">
                    {unidade.recursos.map((recurso) => (
                      <div
                        key={recurso}
                        className="flex items-center gap-3 rounded-lg border border-gabardo-blue/10 bg-gabardo-blue/5 px-4 py-2 transition-colors group-hover:border-gabardo-blue/30"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gabardo-blue" />
                        <span className="text-sm font-medium text-gray-700">{recurso}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors group-hover:border-gabardo-blue/30" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diferenciais - Premium Cards */}
        <div className="mx-auto max-w-7xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl font-bold text-gabardo-blue"
          >
            Diferenciais de Infraestrutura
          </motion.h3>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-gabardo-blue/20 bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gabardo-blue/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gabardo-blue/10 transition-all group-hover:scale-110 group-hover:bg-gabardo-blue">
                      <Icon className="h-7 w-7 text-gabardo-blue transition-colors group-hover:text-white" />
                    </div>

                    {/* Stat */}
                    <div className="mb-2 text-2xl font-bold text-gabardo-blue">
                      {item.stat}
                    </div>

                    {/* Title */}
                    <h4 className="mb-2 text-lg font-bold text-gray-900">
                      {item.titulo}
                    </h4>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.descricao}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-white px-8 py-4 shadow-lg">
            <Gauge className="h-5 w-5 text-gabardo-blue" />
            <span className="text-sm font-semibold text-gray-700">
              Capacidade Total:
            </span>
            <span className="text-xl font-bold text-gabardo-blue">27.450 veículos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
