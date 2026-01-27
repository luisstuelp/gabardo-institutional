'use client';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

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

const VALORES = [
  {
    title: 'Integridade e Ética',
    description: 'Administramos recursos com honestidade, integridade e idoneidade, repudiando práticas fraudulentas e atos de corrupção.',
  },
  {
    title: 'Inovação e Inclusão',
    description: 'Valorizamos novas ideias e soluções criativas, privilegiando o trabalho em equipe e a diversidade.',
  },
  {
    title: 'Respeito e Responsabilidade',
    description: 'Respeitamos pessoas e o ambiente em que vivemos, conduzindo todas as ações com sustentabilidade.',
  },
  {
    title: 'Credibilidade e Confiança',
    description: 'Agimos com consciência e coerência entre palavras e ações, essencial para nossa imagem e reputação.',
  },
  {
    title: 'Agilidade e Disciplina',
    description: 'Tomamos decisões ágeis, prestigiando segurança, meio ambiente e qualidade, observando processos e regras.',
  },
  {
    title: 'Superação e Excelência',
    description: 'Buscamos superar desafios e melhorar nosso desempenho diariamente, de forma ética, justa e sustentável.',
  },
  {
    title: 'Desenvolvimento Pessoal',
    description: 'Capacitação, conscientização e reconhecimento de nossa equipe, com foco no crescimento sustentável.',
  },
  {
    title: 'Saúde e Segurança',
    description: 'Garantimos um ambiente de trabalho saudável, valorizando a saúde física, mental e a segurança.',
  },
  {
    title: 'Sustentabilidade',
    description: 'Agimos com responsabilidade socioambiental, respeitando a natureza e incentivando programas ambientais.',
  },
];

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
        <div className="relative block w-full overflow-hidden rounded-3xl shadow-lg">
          <img
            src={section.videoPoster}
            alt={section.heading}
            loading="lazy"
            className="w-full h-[500px] object-cover"
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
  setActiveId 
}: { 
  sections: typeof STORY_SECTIONS; 
  activeId: string; 
  setActiveId: (id: string) => void;
}) {
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for sticky positioning
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tabsContainer = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!tabsContainer || !indicator) return;

    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const tabs = tabsContainer.querySelectorAll<HTMLElement>('[role="tab"]');
    const activeTab = tabs[activeIndex];
    
    if (!activeTab) return;

    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    
    indicator.style.width = `${tabRect.width}px`;
    indicator.style.transform = `translateX(${tabRect.left - containerRect.left}px)`;
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
    <div className={`sticky z-30 -mx-4 sm:-mx-6 lg:-mx-8 bg-white border-b border-gabardo-blue/10 transition-all duration-300 h-[70px] ${
      isScrolled ? 'top-0 shadow-md' : 'top-20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative overflow-x-auto h-full">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Navegação da jornada"
            className="relative flex items-center justify-between w-full h-full"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                role="tab"
                aria-selected={activeId === section.id}
                aria-controls={section.id}
                className={`
                  flex flex-col items-center justify-center px-6 sm:px-8 rounded-lg transition-all outline-none flex-1 max-w-[200px] h-full
                  ${activeId === section.id 
                    ? 'bg-gabardo-blue text-white shadow-lg' 
                    : 'text-slate-500 hover:text-gabardo-blue hover:bg-slate-50'
                  }
                `}
                onClick={() => handleTabClick(section.id)}
              >
                <span className={`text-sm sm:text-base font-medium ${
                  activeId === section.id ? 'text-white' : 'text-slate-600'
                }`}>
                  {section.tabTop}
                </span>
                <span className={`text-base sm:text-lg font-semibold mt-1 ${
                  activeId === section.id ? 'text-white' : 'text-gabardo-light-blue'
                }`}>
                  {section.tabBottom}
                </span>
              </button>
            ))}
            <div
              aria-hidden
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-gabardo-light-blue transition-all duration-500 rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CulturaClient() {
  const [activeId, setActiveId] = useState(STORY_SECTIONS[0].id);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroBackground = HERO_BACKGROUND;

  // Hide header when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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


  return (
    <>
      <div className={`transition-transform duration-300 ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <Header variant="dark" />
      </div>

      <main className="min-h-screen bg-transparent text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div aria-hidden className="absolute inset-0 -z-10">
            <img
              src={heroBackground}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
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

        {/* Values Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Nossos Valores</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Os valores que guiam nossas decisões e definem quem somos. 
              Não são apenas palavras, são compromissos que vivemos diariamente.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl border border-slate-200 bg-white p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-bold text-xl text-slate-900 mb-4 relative z-10">
                  {valor.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed relative z-10">
                  {valor.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-10 lg:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xl">M</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Nossa Missão</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Atender as necessidades de nossos clientes de forma segura, ágil, sustentável, 
                com qualidade e tecnologia, sendo referência em soluções logísticas e no 
                transporte rodoviário de veículos na América Latina.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-10 lg:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-14 w-14 flex items-center justify-center rounded-full bg-sky-600 text-white font-bold text-xl">V</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Nossa Visão</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ser referência no transporte rodoviário de veículos, estando entre as melhores, 
                mais competitivas e sustentáveis operadoras logísticas do segmento, com atitudes 
                proativas frente às necessidades de nossos clientes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-blue-900 text-center"
          >
            <div className="px-8 py-20 sm:px-12 sm:py-24 lg:py-32">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Faça parte da nossa história
              </h2>
              <p className="text-xl sm:text-2xl text-sky-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Junte-se a uma equipe que valoriza pessoas, inovação e excelência. 
                Construa sua carreira em uma das líderes em logística da América Latina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/trabalhe-conosco"
                  className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-semibold text-blue-700 hover:bg-blue-50 transition-colors shadow-xl"
                >
                  Ver vagas abertas
                </a>
                <a
                  href="/nossa-gente/seja-um-agregado"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Seja um agregado
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
