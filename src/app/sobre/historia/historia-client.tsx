'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

type StorySection = {
  id: string;
  tab: string;
  tabTop: string;
  tabBottom: string;
  kicker: string;
  heading: string;
  body: string;
  videoPoster: string;
  imagePosition: string;
  videoSrc?: string;
  detalhesImagem: string;
};

// Content model with Gabardo's actual history and values
const STORY_SECTIONS: StorySection[] = [
  {
    id: 'fundacao-1989',
    tab: '1989 - Fundação',
    tabTop: '1982-1989',
    tabBottom: 'Fundação',
    kicker: 'Do sonho de um caminhoneiro',
    heading: 'Nascemos em Porto Alegre com um compromisso',
    body: 'Início das operações com um fundador, Sérgio Mario Gabardo. Natural de Nova Bassano/RS, Sérgio iniciou no transporte de veículos em 1982 e, em 1989, fundou a Transportes Gabardo em Porto Alegre/RS com uma promessa clara: fazer o transporte de forma correta, segura e confiável.',
    videoPoster: '/images/Untitledvideo-MadewithClipchamp2-ezgif.com-video-to-gif-converter.gif',
    imagePosition: 'center 45%',
    detalhesImagem: 'Foto histórica original. Animação feita por inteligência artificial.',
  },
  {
    id: 'expansao-1992-1998',
    tab: '1994-1998 - Expansão',
    tabTop: '1994-1998',
    tabBottom: 'Expansão',
    kicker: 'Crescimento estratégico nacional',
    heading: 'Expandimos para além do Sul',
    body: 'Em 1994, demos nosso primeiro grande salto ao adquirir a unidade de Cariacica/ES, estratégica pela proximidade ao Porto de Vitória. Em 1998, consolidamos nossa presença nacional com aberturas em São Bernardo do Campo/SP e São José dos Pinhais/PR. Nossa frota crescia e a tecnologia começava a fazer parte do DNA operacional.',
    videoPoster: '/images/veo31generatepreview_animate_this_image_the_car_wheels_shouldn_0-ezgif.com-video-to-gif-converter.gif',
    imagePosition: '18% 50%',
    detalhesImagem: '',
  },
  {
    id: 'certificacao-2001-2008',
    tab: '2001-2008 - Qualidade',
    tabTop: '2001-2008',
    tabBottom: 'Qualidade',
    kicker: 'Excelência certificada',
    heading: 'Construímos nossa gestão de qualidade',
    body: 'Continuamos expandindo com Duque de Caxias/RJ (2001) e Porto Real/RJ (2003). Em 2004, alcançamos o cadastro oficial na ANTT (Agência Nacional de Transportes Terrestres), marcando nossa conformidade regulatória, e iniciamos a certificação ISO 9001:2000 em Porto Alegre. Em 2008, renovamos por 30 anos o contrato com CAOA/Hyundai e inauguramos Anápolis/GO com 1.200.000m².',
    videoPoster: '/images/Video_Generation_From_Image-ezgif.com-video-to-gif-converter.gif',
    imagePosition: 'center 38%',
    detalhesImagem: '',
  },
  {
    id: 'modernizacao-2014-2019',
    tab: '2014-2019 - Capilaridade',
    tabTop: '2014-2019',
    tabBottom: 'Capilaridade',
    kicker: 'Consolidação e maturidade',
    heading: 'Chegamos aos 30 anos com 13 pátios',
    body: 'Em 2014, demos grande apoio para Porto Alegre e inauguramos Chuí/RS. Certificamos ISO 9001:2008 em Piracicaba (2015). Em 2017, iniciamos voluntariamente o inventário e neutralização de emissões de carbono, demonstrando nosso compromisso ambiental pioneiro. Expandimos para Eusébio/CE, Mogi das Cruzes/SP e Jacareí/SP.',
    videoPoster: '/images/Image_Animation_And_Video_Generation-ezgif.com-video-to-gif-converter.gif',
    imagePosition: 'center 35%',
    detalhesImagem: '',
  },
  {
    id: 'sustentabilidade-2020-2025',
    tab: '2020-2025 - ESG',
    tabTop: '2020-2025',
    tabBottom: 'ESG',
    kicker: 'Liderança sustentável',
    heading: 'Somos referência em ESG no setor',
    body: 'Em 2020, implantamos ISO 14001 e ISO 39001, firmamos parceria com Childhood e Projeto Pescar. Ganhamos prêmios CAOA Chery e o 9º Prêmio Transporte Responsável. Em 2023, certificamos todas as unidades ISO 9001/14001/39001 e iniciamos contrato GWM para veículos híbridos/elétricos. 2024 trouxe adesão ao Pacto Global da ONU. Em 2025, consolidamos nossa posição como a maior frota própria de cegonhas do Brasil e líder de mercado em transporte de veículos, com Certificação Carbono Negativo.',
    videoPoster: '/images/Car_Wheels_Not_Rotating_In_Video-ezgif.com-video-to-gif-converter.gif',
    imagePosition: 'center 45%',
    detalhesImagem: '',
  },
];

const HERO_BACKGROUND = '/images/05A.jpg';
const HERO_VIDEO = '/images/Make_the_image_202509021134%20(1).mp4';

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
function StoryCard({ section, reverse }: { section: StorySection; reverse?: boolean }) {
  const isGif = section.videoPoster?.toLowerCase().endsWith('.gif');

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
          {section.videoSrc ? (
            <video
              src={section.videoSrc}
              poster={section.videoPoster}
              autoPlay
              muted
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label={section.heading}
            />
          ) : (
            <Image
              src={section.videoPoster}
              alt={section.heading}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: section.imagePosition ?? 'center' }}
              priority={false}
              unoptimized={isGif}
            />
          )}
        </div>
        <p className="text-xs uppercase  text-gabardo-blue opacity-80 pt-4">
          {section.detalhesImagem}
        </p>
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
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const highlightInset = 6;

  useEffect(() => {
    const tabsContainer = tabsRef.current;
    const indicator = indicatorRef.current;
    const highlight = highlightRef.current;
    if (!tabsContainer || !indicator || !highlight) return;

    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const tabs = tabsContainer.querySelectorAll<HTMLElement>('[role="tab"]');
    const activeTab = tabs[activeIndex];

    if (!activeTab) return;

    // Auto-scroll horizontally to keep active tab visible on small screens
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrowLayout = window.matchMedia('(max-width: 1023px)').matches;
    if (isNarrowLayout) {
      const containerScrollLeft = tabsContainer.scrollLeft;
      const containerWidth = tabsContainer.clientWidth;
      const tabStart = activeTab.offsetLeft;
      const tabEnd = tabStart + activeTab.offsetWidth;
      const padding = 16;

      if (tabStart < containerScrollLeft) {
        tabsContainer.scrollTo({
          left: Math.max(tabStart - padding, 0),
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else if (tabEnd > containerScrollLeft + containerWidth) {
        tabsContainer.scrollTo({
          left: tabEnd - containerWidth + padding,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }

    const updateIndicator = () => {
      // Use offsetLeft/offsetWidth for container-relative positioning
      // This works correctly regardless of scroll position
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      const highlightHeight = Math.max(activeTab.offsetHeight - highlightInset * 2, 0);
      highlight.style.width = `${activeTab.offsetWidth}px`;
      highlight.style.height = `${highlightHeight}px`;
      highlight.style.transform = `translate(${activeTab.offsetLeft}px, ${activeTab.offsetTop + highlightInset}px)`;
    };

    updateIndicator();
  }, [activeId, sections, highlightInset]);

  const handleTabClick = (sectionId: string) => {
    setActiveId(sectionId);
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    const headerOffset = 100; // Account for sticky header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior as ScrollBehavior
    });
    history.replaceState(null, '', `#${sectionId}`);
  };

  return (
    <div 
      id="timeline-tabs"
      className="sticky md:top-12 z-50 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gabardo-blue/10 transition-all duration-300 shadow-sm"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-2 sm:py-0">
        <div className="relative h-full overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent md:hidden -z-10"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent md:hidden -z-10"
          />
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Navegação da jornada"
            className="relative flex items-stretch gap-3 sm:gap-0 sm:justify-between min-w-max sm:w-full h-full"
            style={{ paddingBottom: '1px' }}
          >
            <div
              aria-hidden
              ref={highlightRef}
              className="pointer-events-none absolute z-0 border border-gabardo-blue sm:border-0 bg-gabardo-blue transition-all duration-500 shadow-lg shadow-gabardo-blue/25 sm:shadow-none rounded-2xl"
              style={{ transformOrigin: 'left center', width: '0px', height: '0px' }}
            />
            {sections.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeId === section.id}
                aria-controls={section.id}
                className={`
                  relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 transition-all outline-none flex-shrink-0 sm:flex-1 min-w-[118px] max-w-[140px] sm:max-w-[200px] py-4 sm:py-5 rounded-none border border-transparent sm:border-0 snap-center first:ml-3 md:first:ml-0 last:mr-3 md:last:mr-0 will-change-transform
                  ${activeId === section.id 
                    ? 'text-white' 
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
              className="absolute bottom-0 h-1 bg-gabardo-light-blue transition-all duration-500 shadow-md rounded-none will-change-transform z-20"
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HistoriaClientPage() {
  const [activeId, setActiveId] = useState(STORY_SECTIONS[0].id);
  const heroBackground = HERO_BACKGROUND;
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // Force video autoplay on mount
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && !prefersReducedMotion) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log('Video autoplay blocked:', err);
        }
      }
    };
    playVideo();
  }, [prefersReducedMotion]);

  // Scroll to top on mount to fix initial position
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header
        variant="dark"
        isFloating={true}
      />

      <main className="min-h-screen bg-transparent text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div aria-hidden className="absolute inset-0 -z-10">
            {prefersReducedMotion ? (
              <Image
                src={heroBackground}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                priority={true}
                quality={85}
              />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={HERO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                poster={heroBackground}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75 md:from-black/65 md:via-black/45 md:to-black/65" />
          </div>
          <div className="max-w-7xl mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-wider uppercase text-white mb-4 sm:mb-5 md:mb-6"
              >
                Nossa História
              </motion.div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight text-white mb-4 sm:mb-5 md:mb-6">
                Três Décadas de <span className="text-gabardo-light-blue">Excelência</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto font-secondary px-2 sm:px-0">
                Desde 1989, seguimos uma jornada de expansão contínua, combinando tradição com inovação. Hoje, 100% rastreada, com presença em toda a América Latina.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/75 font-medium">
                  Role para baixo
                </span>
                <motion.svg
                  className="w-6 h-6 text-white/70"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <Tabs
          sections={STORY_SECTIONS}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        {/* Story Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
          {STORY_SECTIONS.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-[160px] md:scroll-mt-[180px]"
            >
              <StoryCard 
                section={section}
                reverse={index % 2 === 1}
              />
            </section>
          ))}
        </div>
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
                &ldquo;Quando comecei em 1982, com um único caminhão, eu tinha um compromisso: fazer o transporte de forma correta, segura e confiável. Hoje, 44 anos depois, olho para nossa frota de mais de dois mil caminhões, para nossa equipe e para os grandes parceiros que confiam em nós, e vejo que esse compromisso inicial não apenas se manteve, como se tornou o pilar de tudo o que fazemos.&rdquo;
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-20 h-1 bg-gradient-to-r from-gabardo-light-blue to-gabardo-blue rounded-full mb-4"></div>
                <p className="text-lg font-semibold text-gabardo-blue">Sérgio M. Gabardo</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Fundador</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
