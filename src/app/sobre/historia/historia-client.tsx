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
    kicker: 'Do sonho de um caminhoneiro',
    heading: 'Nascemos em Porto Alegre com um compromisso',
    body: 'Em 1989, Sérgio Mário Gabardo fundou a Transportes Gabardo em Porto Alegre/RS com um único caminhão e uma promessa clara: fazer o transporte de forma correta, segura e confiável. Natural de Nova Bassano/RS, Sérgio iniciou no transporte de veículos em 1982 para a montadora gaúcha Miura. Esse compromisso inicial se tornou o pilar de tudo o que construímos.',
    videoPoster: '/images/vintage-truck-1989.JPG',
  },
  {
    id: 'expansao-1992-1998',
    tab: '1994-1998 - Expansão',
    tabTop: '1994-1998',
    tabBottom: 'Expansão',
    kicker: 'Crescimento estratégico nacional',
    heading: 'Expandimos para além do Sul',
    body: 'Em 1994, demos nosso primeiro grande salto ao adquirir a unidade de Cariacica/ES, estratégica pela proximidade ao Porto de Vitória. Em 1998, consolidamos nossa presença nacional com aberturas em São Bernardo do Campo/SP e São José dos Pinhais/PR. Nossa frota crescia e a tecnologia começava a fazer parte do DNA operacional.',
    videoPoster: '/images/gabardo-truck-fleet.JPG',
  },
  {
    id: 'certificacao-2001-2008',
    tab: '2001-2008 - Qualidade',
    tabTop: '2001-2008',
    tabBottom: 'Qualidade',
    kicker: 'Excelência certificada',
    heading: 'Construímos nossa gestão de qualidade',
    body: 'Continuamos expandindo com Duque de Caxias/RJ (2001) e Porto Real/RJ (2003). Em 2004, iniciamos um marco: a certificação ISO 9001:2000 em Porto Alegre, coordenada por Mário Sérgio Gabardo (in memoriam). Em 2008, renovamos por 30 anos o contrato com CAOA/Hyundai e inauguramos Anápolis/GO com 1.200.000m² — consolidando nossa capacidade de armazenagem e operação em grande escala.',
    videoPoster: '/images/gabardo-certification-docs.JPG',
  },
  {
    id: 'modernizacao-2014-2019',
    tab: '2014-2019 - Capilaridade',
    tabTop: '2014-2019',
    tabBottom: 'Capilaridade',
    kicker: 'Consolidação e maturidade',
    heading: 'Chegamos aos 30 anos com 13 pátios',
    body: 'Reformulamos completamente Porto Alegre (2014) e inauguramos Chuí/RS. Certificamos ISO 9001:2008 em Piracicaba (2015). Expandimos para Eusébio/CE com unidade própria (2016) e segundo pátio (2017), além de Mogi das Cruzes/SP (16.000m²). Em 2018, conquistamos ISO 9001:2015 (SGI) e inauguramos Jacareí/SP. 2019 marcou nossos 30 anos: maior frota própria de cegonhas do Brasil.',
    videoPoster: '/images/Trans Gabardo - Framers produtora -5388.JPG',
  },
  {
    id: 'sustentabilidade-2020-2025',
    tab: '2020-2025 - ESG',
    tabTop: '2020-2025',
    tabBottom: 'ESG',
    kicker: 'Liderança sustentável',
    heading: 'Somos referência em ESG no setor',
    body: 'Em 2020, implantamos ISO 14001 (Meio Ambiente) e ISO 39001 (Segurança Viária), firmamos parceria com Childhood (Programa Na Mão Certa) e Projeto Pescar. Ganhamos prêmios CAOA Chery (2020-2021) e o 9º Prêmio Transporte Responsável (2022). Em 2023, certificamos todas as unidades ISO 9001/14001/39001 e iniciamos contrato GWM para veículos híbridos/elétricos. 2024 trouxe adesão ao Pacto Global da ONU. Em 2025, alcançamos Selo Verde e Certificação Carbono Negativo — pioneiros no setor.',
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
      className="sticky top-0 z-30 left-0 right-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-gabardo-blue/10 transition-all duration-300 min-h-[86px] sm:min-h-[74px]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-2 sm:py-0">
        <div className="relative h-full overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
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
            style={{ paddingBottom: '1px' }}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeId === section.id}
                aria-controls={section.id}
                className={`
                  flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 transition-all outline-none flex-shrink-0 sm:flex-1 min-w-[118px] max-w-[140px] sm:max-w-[200px] py-4 sm:py-5 rounded-none border border-transparent sm:border-0 snap-center first:ml-3 md:first:ml-0 last:mr-3 md:last:mr-0 will-change-transform
                  ${activeId === section.id 
                    ? 'bg-gabardo-blue text-white shadow-lg shadow-gabardo-blue/25 border-gabardo-blue sm:border-0 sm:shadow-none' 
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
              className="absolute bottom-0 h-1 bg-gabardo-light-blue transition-all duration-500 shadow-md rounded-none will-change-transform"
              style={{ transformOrigin: 'left center' }}
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
                Nossa História
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-tight tracking-tight text-white mb-6 sm:mb-7 md:mb-8">
                Do sonho de um caminhoneiro
                <br />
                <span className="text-gabardo-light-blue">à liderança em logística LATAM</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mx-auto font-secondary">
                Desde 1989, seguimos uma jornada de expansão contínua, combinando tradição com inovação. Hoje, operamos a maior frota própria de cegonhas do Brasil, 100% rastreada, com presença em toda a América Latina.
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

        {/* Nosso Legado de Crescimento */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gabardo-blue via-gabardo-blue/95 to-[#0d1f3a] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-gabardo-light-blue mb-4">
                Nosso Legado
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Liderança e Capilaridade
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Maior frota própria de cegonhas do país, com 13 pátios no Brasil e presença operacional em toda a América Latina.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '+350.000', label: 'Veículos transportados/ano', icon: '🚗' },
                { number: '+50.000', label: 'Capacidade de armazenagem', icon: '📦' },
                { number: '+2.000', label: 'Caminhões e carretas', icon: '🚛' },
                { number: '+1.500', label: 'Colaboradores e motoristas', icon: '👥' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Escala e Eficiência</h3>
                <p className="text-white/90 leading-relaxed">
                  Frota com idade média próxima de 2 anos, 100% rastreada com monitoramento 24h/7d e operação com SLAs objetivos.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Pessoas no Centro</h3>
                <p className="text-white/90 leading-relaxed">
                  Escola de Motoristas, programas de desenvolvimento e condutores reserva para sazonalidades.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Os 4 P's do Compromisso Gabardo */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-gabardo-blue mb-4">
                Nossa Cultura
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Os 4 P's do Compromisso Gabardo
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Precisão', desc: 'SGQ e PDI padronizado', color: 'from-blue-500 to-blue-600' },
                { title: 'Previsibilidade', desc: 'Rastreamento e comunicação proativa', color: 'from-cyan-500 to-cyan-600' },
                { title: 'Proteção', desc: 'Gestão de riscos e segurança viária', color: 'from-indigo-500 to-indigo-600' },
                { title: 'Planeta', desc: 'Gestão ambiental e metas anuais de emissões', color: 'from-green-500 to-green-600' },
              ].map((p, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-2xl font-bold mb-6`}>
                    P
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Palavra do Fundador */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-gabardo-blue mb-6">
                Palavra do Fundador
              </span>
              <blockquote className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed mb-8 italic">
                "Quando comecei em 1989, com um único caminhão, eu tinha um compromisso: fazer o transporte de forma correta, segura e confiável. Hoje, 36 anos depois, olho para nossa frota de mais de mil caminhões, para nossa equipe e para os grandes parceiros que confiam em nós, e vejo que esse compromisso inicial não apenas se manteve, como se tornou o pilar de tudo o que fazemos."
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-20 h-1 bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue rounded-full mb-4"></div>
                <p className="text-lg font-semibold text-gabardo-blue">Sérgio M. Gabardo</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Fundador</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Onde Chegamos */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gabardo-blue/20 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Onde Chegamos (e para onde vamos)
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                De um pátio em Porto Alegre para uma malha integrada que conecta fábricas, pátios e concessionárias em todo o Brasil e países do Mercosul. O que nos trouxe até aqui — disciplina operacional, inovação tecnológica e responsabilidade ambiental — é o que segue guiando nossos próximos capítulos.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
