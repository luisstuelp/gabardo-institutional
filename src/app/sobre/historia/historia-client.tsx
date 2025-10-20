'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Content model with Gabardo's actual history and values
const STORY_SECTIONS = [
  {
    id: 'fundacao-1989',
    tab: '1989 - Fundação',
    tabTop: '1989',
    tabBottom: 'Fundação',
    kicker: 'O início de uma jornada',
    heading: 'A Gabardo nasce em Porto Alegre',
    body: 'Fundada em 1989 por Sérgio Mário Gabardo, natural de Nova Bassano/RS. Agricultor e motorista de caminhão, Sérgio iniciou no transporte de veículos em 1982 para a montadora gaúcha Miura. Com visão empreendedora, estabeleceu as bases de uma empresa que se tornaria referência na logística automotiva.',
    videoPoster: '/images/vintage-truck-1989.JPG',
  },
  {
    id: 'expansao-1992-1998',
    tab: '1992-1998 - Expansão',
    tabTop: '1992-1998',
    tabBottom: 'Expansão',
    kicker: 'Crescimento e tecnologia',
    heading: 'Primeira grande expansão',
    body: '1992 marcou a grande expansão com a abertura econômica do Governo Collor. Em 1993, Sérgio comprou o primeiro caminhão trator. Até 1998, viajou diretamente na estrada, conciliando depois as viagens com a administração. Neste período, a empresa percebeu a necessidade crucial de investir em tecnologia e inovação.',
    videoPoster: '/images/gabardo-truck-fleet.JPG',
  },
  {
    id: 'certificacao-2001-2008',
    tab: '2001-2008 - Certificação',
    tabTop: '2001-2008',
    tabBottom: 'Certificação',
    kicker: 'Excelência reconhecida',
    heading: 'ISO 9001 e expansão nacional',
    body: 'Expansão no Sudeste com unidades em Duque de Caxias/RJ (2001) e Porto Real/RJ (2003). Em 2004, sob coordenação de Mário Sérgio Gabardo (in memoriam), conquistamos a certificação ISO 9001:2000. Em 2008, renovamos contrato CAOA Hyundai por 30 anos e inauguramos a unidade de Anápolis/GO com 1.200.000m².',
    videoPoster: '/images/gabardo-certification-docs.JPG',
  },
  {
    id: 'modernizacao-2014-2019',
    tab: '2014-2019 - Modernização',
    tabTop: '2014-2019',
    tabBottom: 'Modernização',
    kicker: 'Inovação e crescimento',
    heading: '30 anos de excelência',
    body: 'Reformulação completa da sede em Porto Alegre (2014) e inauguração em Chuí/RS. Certificação ISO 9001:2008 em Piracicaba (2015). Expansões em Eusébio/CE e Mogi das Cruzes/SP (2016-2017). Em 2018, conquistamos ISO 9001:2015 e inauguramos novo restaurante em Porto Alegre. 2019 celebrou nossos 30 anos de mercado.',
    videoPoster: '/images/Trans Gabardo - Framers produtora -5388.JPG',
  },
  {
    id: 'sustentabilidade-2020-2025',
    tab: '2020-2025 - Sustentabilidade',
    tabTop: '2020-2025',
    tabBottom: 'Sustentabilidade',
    kicker: 'Compromisso com o futuro',
    heading: 'Liderança em sustentabilidade',
    body: 'Em 2020, conquistamos ISO 14001 e ISO 39001, firmamos parceria CHILDHOOD e lançamos Projeto PESCAR. Prêmios CAOA CHERY consecutivos (2020-2021). Em 2022, vencemos o 9º Prêmio Transporte Responsável. 2024 trouxe certificação OEA e adesão ao Pacto Global da ONU. Em 2025, alcançamos o Selo Verde e Certificação Carbono Negativo.',
    videoPoster: '/images/Trans Gabardo - Framers produtora -5495.JPG',
  },
];

const HERO_BACKGROUND = STORY_SECTIONS[0].videoPoster;

// Custom hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mediaQuery.matches);
    handler();
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);
  return reduced;
};

// Story Card Component - Redesigned for Clearcover-style layout
function StoryCard({ section, reverse }: { section: typeof STORY_SECTIONS[number]; reverse?: boolean }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className={reverse ? 'lg:col-start-2' : ''}
      >
        <div className="relative block w-full overflow-hidden rounded-3xl shadow-lg h-[500px]">
          <Image
            src={section.videoPoster}
            alt={section.heading}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="inline-block text-xs font-bold tracking-widest text-gabardo-light-blue uppercase mb-4">
          {section.kicker}
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-gabardo-blue mb-6 leading-tight">
          {section.heading}
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          {section.body}
        </p>
      </motion.div>
    </div>
  );
}

// Tabs Component with scrollspy
function Tabs({
  sections,
  activeId,
  setActiveId,
}: {
  sections: typeof STORY_SECTIONS;
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const tabsContainer = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!tabsContainer || !indicator) return;

    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const tabs = tabsContainer.querySelectorAll<HTMLElement>('[role="tab"]');
    const activeTab = tabs[activeIndex];
    
    // Auto-scroll active tab into view on mobile
    if (activeTab) {
      activeTab.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest',
        inline: 'center'
      });
    }
    
    if (!activeTab) return;

    const updateIndicator = () => {
      // Use offsetLeft/offsetWidth for container-relative positioning
      // This works correctly regardless of scroll position
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    };

    updateIndicator();
  }, [activeId, sections]);

  const handleTabClick = (sectionId: string) => {
    setActiveId(sectionId);
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    element.scrollIntoView({ behavior, block: 'start' });
    history.replaceState(null, '', `#${sectionId}`);
  };

  return (
    <div 
      className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-gabardo-blue/10 transition-all duration-300 h-[86px] sm:h-[74px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent md:hidden"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent md:hidden"
          />
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Navegação da jornada"
            className="relative flex items-stretch gap-3 sm:gap-0 sm:justify-between min-w-max sm:w-full h-full"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeId === section.id}
                aria-controls={section.id}
                className={`
                  flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 transition-all outline-none flex-shrink-0 sm:flex-1 min-w-[118px] max-w-[140px] sm:max-w-[200px] h-full rounded-none border border-transparent sm:border-0 snap-center first:ml-3 md:first:ml-0 last:mr-3 md:last:mr-0
                  ${activeId === section.id 
                    ? 'bg-gabardo-blue text-white shadow-lg shadow-gabardo-blue/25 border-gabardo-blue sm:border-0' 
                    : 'text-slate-500 hover:text-gabardo-blue hover:bg-slate-50/90 border-slate-200 sm:border-0'
                  }
                `}
                onClick={() => handleTabClick(section.id)}
              >
                <span className={`text-[0.65rem] sm:text-sm md:text-base font-medium tracking-wide ${
                  activeId === section.id ? 'text-white' : 'text-slate-600'
                }`}>
                  {section.tabTop}
                </span>
                <span className={`text-sm sm:text-base md:text-lg font-semibold mt-0.5 sm:mt-1 ${
                  activeId === section.id ? 'text-white' : 'text-gabardo-light-blue'
                }`}>
                  {section.tabBottom}
                </span>
              </button>
            ))}
            <div
              aria-hidden
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-gabardo-light-blue transition-all duration-500 shadow-md rounded-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CulturaClient() {
  const [activeId, setActiveId] = useState(STORY_SECTIONS[0].id);
  const heroBackground = HERO_BACKGROUND;

  // Scrollspy implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveId(mostVisible.target.id);
        }
      },
      { 
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1] 
      }
    );

    STORY_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <>
      <Header variant="dark" isFloating={false} />

      <main className="min-h-screen bg-transparent text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div aria-hidden className="absolute inset-0 -z-10">
            <Image
              src={heroBackground}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={true}
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75 md:from-black/65 md:via-black/45 md:to-black/65" />
          </div>
          <div className="max-w-7xl mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <span className="inline-block text-[0.65rem] sm:text-xs md:text-sm font-light tracking-[0.18em] sm:tracking-[0.2em] text-gabardo-light-blue uppercase mb-4 sm:mb-5 md:mb-6 font-secondary">
                Nossa Cultura Gabardo
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-tight tracking-tight text-white mb-6 sm:mb-7 md:mb-8">
                Aqui é a História da
                <br />
                <span className="text-gabardo-light-blue">Gabardo</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mx-auto font-secondary">
                Desde 1989, construímos mais que uma empresa de logística. Criamos um lugar onde pessoas transformam desafios em conquistas, com integridade, inovação e respeito por cada jornada.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <Tabs sections={STORY_SECTIONS} activeId={activeId} setActiveId={setActiveId} />

        {/* Story Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
          {STORY_SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28"
            >
              <StoryCard 
                section={section}
                reverse={index % 2 === 1}
              />
            </section>
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}
