'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import InfiniteScroll from '@/components/InfiniteScroll';
import { Building, Users, Truck, Target } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const timeline: TimelineItem[] = [
  {
    year: '1989',
    title: 'Fundação da Transportes Gabardo',
    description: 'A Transportes Gabardo foi fundada em Porto Alegre, capital do Rio Grande do Sul, por Sérgio Mário Gabardo.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/vintage-truck-1989.JPG'
  },
  {
    year: '1994-1998',
    title: 'Primeiras Expansões',
    description: '1994: Aquisição da unidade Cariacica/ES, próxima ao Porto de Vitória. 1998: Criação das unidades São Bernardo do Campo/SP e São José dos Pinhais/PR.',
    icon: <Truck className="w-6 h-6" />,
    image: '/images/gabardo-truck-fleet.JPG'
  },
  {
    year: '2001-2004',
    title: 'Expansão no Sudeste e Certificação',
    description: '2001: Unidade Duque de Caxias/RJ. 2003: Início das operações em Porto Real/RJ. 2004: Processo de certificação ISO 9001:2000 sob coordenação de Mário Sérgio Gabardo (in memoriam).',
    icon: <Target className="w-6 h-6" />,
    image: '/images/gabardo-certification-docs.JPG'
  },
  {
    year: '2008-2012',
    title: 'Consolidação Nacional',
    description: '2008: Renovação do contrato CAOA Hyundai por 30 anos e inauguração da unidade Anápolis/GO (1.200.000m²). 2009: Aquisição de pátios Jaraguá/SP. 2012: Contrato GLOVIS/Hyundai Piracicaba e operação das unidades Palhoça/SC e Eusébio/CE.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5818.JPG'
  },
  {
    year: '2014-2018',
    title: 'Modernização e Crescimento',
    description: '2014: Reformulação Porto Alegre e inauguração Chuí/RS. 2015: Certificação ISO 9001:2008 Piracicaba. 2016-2017: Expansões Eusébio/CE, Mogi das Cruzes/SP. 2018: ISO 9001:2015, restaurante Porto Alegre, operação Jacareí/SP.',
    icon: <Target className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5388.JPG'
  },
  {
    year: '2019-2021',
    title: '30 Anos e Reconhecimento',
    description: '2019: 30 anos de mercado. 2020: ISO 14001 e ISO 39001, parceria CHILDHOOD, Projeto PESCAR, Prêmio CAOA CHERY. 2021: Segundo Prêmio CAOA CHERY consecutivo, certificação tripla ISO.',
    icon: <Users className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5475.JPG'
  },
  {
    year: '2022-2023',
    title: 'Excelência e Sustentabilidade',
    description: '2022: Vencedores 9º Prêmio Transporte Responsável em Gestão Ambiental e Desenvolvimento Humano. 2023: Certificação ISO completa em todas as unidades, contrato GWM Brasil para veículos híbridos/elétricos.',
    icon: <Target className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5577.JPG'
  },
  {
    year: '2024-2025',
    title: 'Futuro Sustentável',
    description: '2024: Certificação OEA (Operador Econômico Autorizado) e adesão ao Pacto Global da ONU. 2025: Selo Verde e Certificação Carbono Negativo, consolidando nosso compromisso ambiental.',
    icon: <Building className="w-6 h-6" />,
    image: '/images/Trans Gabardo - Framers produtora -5495.JPG'
  }
];

const AboutStorySection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<TimelineItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lineData, setLineData] = useState<{
    start: { x: number; y: number };
    end: { x: number; y: number };
    box: { width: number; height: number };
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateConnector = useCallback(
    (item: TimelineItem | null) => {
      if (!item) {
        setLineData(null);
        return;
      }

      const container = containerRef.current;
      const card = cardRefs.current[item.year];
      const info = infoPanelRef.current;

      if (!container || !card || !info) {
        setLineData(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const infoRect = info.getBoundingClientRect();

      setLineData({
        start: {
          x: cardRect.right - containerRect.left - 16,
          y: cardRect.top - containerRect.top + cardRect.height * 0.45,
        },
        end: {
          x: infoRect.left - containerRect.left + 18,
          y: infoRect.top - containerRect.top + infoRect.height * 0.55,
        },
        box: {
          width: containerRect.width,
          height: containerRect.height,
        },
      });
    },
    []
  );

  useEffect(() => {
    if (!hoveredItem) {
      setLineData(null);
      return;
    }

    const handle = () => updateConnector(hoveredItem);
    handle();

    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);

    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [hoveredItem, updateConnector]);

  type ScrollItem = { content: React.ReactElement };

  const scrollItems: ScrollItem[] = timeline.map((item, index) => ({
    content: (
      <motion.div
        ref={(el) => {
          cardRefs.current[item.year] = el;
        }}
        onMouseEnter={() => setHoveredItem(item)}
        onMouseLeave={() => {
          setHoveredItem(null);
          setLineData(null);
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group relative w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] h-[250px] sm:h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-2xl shadow-[0_15px_40px_-20px_rgba(19,45,81,0.35)] cursor-pointer mx-4"
      >
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            index === 0 ? 'grayscale group-hover:grayscale-0' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gabardo-blue/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Card overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gabardo-blue flex items-center justify-center text-xs">
              {item.icon}
            </div>
            <span className="text-xs sm:text-sm font-bold">{item.year}</span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide line-clamp-2">
            {item.title}
          </h3>
        </div>
      </motion.div>
    )
  }));

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading story...</div>
        </div>
      </section>
    );
  }

  const connectorPath = lineData
    ? `M ${lineData.start.x} ${lineData.start.y} C ${lineData.start.x + 120} ${lineData.start.y - 60}, ${lineData.end.x - 120} ${lineData.end.y + 60}, ${lineData.end.x} ${lineData.end.y}`
    : null;

  return (
    <section ref={containerRef} className="section-shell bg-white relative overflow-hidden">
      {/* Hover Text Display */}
      {hoveredItem && (
        <motion.div
          ref={infoPanelRef}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-12 right-12 z-50 max-w-sm rounded-2xl border border-gabardo-light-blue/40 bg-white/95 p-5 shadow-[0_25px_60px_-30px_rgba(19,45,81,0.55)] backdrop-blur-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              whileHover={{ rotate: 6 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gabardo-blue text-white shadow-lg shadow-gabardo-blue/40"
            >
              {hoveredItem.icon}
            </motion.div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gabardo-light-blue">
                Capítulo
              </span>
              <span className="text-xl font-bold text-gabardo-blue">{hoveredItem.year}</span>
            </div>
          </div>

          <h3 className="text-base font-semibold uppercase tracking-wide text-neutral-900 mb-2">
            {hoveredItem.title}
          </h3>
          <p className="text-neutral-600 leading-relaxed text-xs">
            {hoveredItem.description}
          </p>

          <div className="mt-3 h-px w-10 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue" />
        </motion.div>
      )}

      {connectorPath && lineData && (
        <svg
          className="pointer-events-none absolute inset-0 z-30"
          width={lineData.box.width}
          height={lineData.box.height}
          viewBox={`0 0 ${lineData.box.width} ${lineData.box.height}`}
        >
          <defs>
            <linearGradient id="timeline-connector" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38B6FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#132D51" stopOpacity="0.9" />
            </linearGradient>
            <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={connectorPath}
            stroke="url(#timeline-connector)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            filter="url(#timeline-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <motion.path
            d={connectorPath}
            stroke="url(#timeline-connector)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="14 22"
            initial={{ strokeDashoffset: 140, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 0.9 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          <motion.circle
            r={5}
            fill="#38B6FF"
            filter="url(#timeline-glow)"
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{ offsetDistance: ['0%', '100%'], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            style={{ offsetPath: `path(${connectorPath})` }}
          />
        </svg>
      )}

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-eyebrow text-gabardo-blue/70 relative inline-flex items-center gap-3"
          >
            Nossa Trajetória
            <span className="inline-flex h-px w-8 rounded-full bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-heading mt-6 text-center"
          >
            36 anos de excelência e confiança Gabardo Distribuidora
          </motion.h2>
        </motion.div>

        {/* Timeline as Infinite Scroll */}
        <div className="relative mt-16 w-full">
          <div className="flex justify-center items-center px-6 md:px-12 lg:px-20 xl:px-24">
            <InfiniteScroll
              width="90vw"
              maxHeight="500px"
              itemMinHeight={320}
              negativeMargin="-3rem"
              items={scrollItems as any}
              autoplay
              autoplaySpeed={0.6}
              pauseOnHover
              isTilted
              tiltDirection="left"
            />
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-24"
        >
          <blockquote className="text-2xl md:text-[30px] font-light italic text-gabardo-blue/80 max-w-4xl mx-auto leading-relaxed">
            "Ao longo de seus 36 anos, a Gabardo procura entender as necessidades dos clientes para
            atendê-los de forma personalizada e eficiente. Nossa missão é transportar mais que veículos."
          </blockquote>
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue/60">
            — Sérgio Mário Gabardo, Fundador
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStorySection; 