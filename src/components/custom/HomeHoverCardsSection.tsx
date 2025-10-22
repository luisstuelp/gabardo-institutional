'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Users, ShieldCheck } from 'lucide-react';

const cultureFocus = [
  {
    id: 'parcerias',
    icon: HeartHandshake,
    title: 'Parcerias que crescem com transparência',
    hook: 'Co-criamos planos com clientes, compartilhando indicadores e próximos passos em ciclos curtos.',
    description:
      'Times dedicados trabalham lado a lado com embarcadores para revisar rotas, capacidade e experiência do cliente. As entregas são acompanhadas com cadência e materializadas em planos de evolução conjuntos.',
    practices: [
      'Workshops trimestrais com clientes para ajustar objetivos e iniciativas',
      'Relatórios executivos colaborativos com insights de desempenho e próximos ajustes',
    ],
    quote: {
      text: '“Entendemos a operação com a mesma profundidade do cliente e reagimos antes dos eventos críticos.”',
      author: 'Equipe de Contas Estratégicas',
    },
    chips: ['Transparência total', 'Células dedicadas'],
    image: '/images/GabardoEquipe2.JPG',
  },
  {
    id: 'talentos',
    icon: Users,
    title: 'Gente preparada para liderar o futuro',
    hook: 'Academia Gabardo, mentorias e trilhas técnicas fortalecem protagonismo em toda a rede.',
    description:
      'Programas internos desenvolvem competências em logística, tecnologia e liderança. Cada unidade possui multiplicadores responsáveis por disseminar práticas e garantir que novos talentos tenham referências claras de carreira.',
    practices: [
      'Mentorias cruzadas entre matriz e unidades regionais',
      'Trilhas de capacitação com módulos presenciais e digitais certificados',
    ],
    quote: {
      text: '“Compartilhamos conhecimento com quem chega e aprendemos continuamente com o campo.”',
      author: 'Coordenação de Desenvolvimento Humano',
    },
    chips: ['Academia Gabardo', 'Mentorias'],
    image: '/images/GabardoEquipe.JPG',
  },
  {
    id: 'seguranca',
    icon: ShieldCheck,
    title: 'Segurança que sustenta continuidade',
    hook: 'Governança e tecnologia combinadas protegem pessoas, dados e ativos em cada etapa.',
    description:
      'Protocolos certificados, telemetria e redundância tecnológica mantêm as operações disponíveis mesmo em cenários de alta demanda. Toda ocorrência gera planos de prevenção compartilhados com clientes e equipes internas.',
    practices: [
      'Centros de monitoramento com SD-WAN e telemetria integrada 24/7',
      'Planos de contingência documentados e testados com times multidisciplinares',
    ],
    quote: {
      text: '“Segurança não é um projeto; é uma postura diária que guia decisões técnicas e humanas.”',
      author: 'Time de Continuidade Operacional',
    },
    chips: ['Protocolos certificados', 'Telemetria 24/7'],
    image: '/images/GabardoMonit.JPG',
  },
];

const HomeHoverCardsSection = () => {
  const [activeId, setActiveId] = useState<string | null>(cultureFocus[0].id);
  const activeItem = useMemo(
    () => cultureFocus.find((item) => item.id === activeId) ?? cultureFocus[0],
    [activeId]
  );

  const handleCardClick = (itemId: string) => {
    // Toggle: if clicking the same card, close it. Otherwise, open the new one
    setActiveId(prev => prev === itemId ? null : itemId);
  };

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 22%, rgba(56,182,255,0.12), transparent 55%), radial-gradient(circle at 82% 30%, rgba(19,45,81,0.12), transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="container relative mx-auto px-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-wider text-gabardo-blue/80"
          >
            Cultura em movimento
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mt-4 text-3xl font-semibold text-gray-900 md:text-4xl"
          >
            Nossos valores em prática constante
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-base text-neutral-600 md:max-w-3xl"
          >
            Escolha um valor para ver como nossas equipes vivem essa cultura em rituais, práticas e iniciativas com clientes e parceiros.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 lg:gap-10 lg:grid-cols-[340px_1fr] xl:grid-cols-[360px_1fr]">
          {/* Mobile: Accordion Style Cards */}
          <div className="space-y-4 lg:hidden">
            {cultureFocus.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-3xl border border-gabardo-blue/10 bg-white shadow-sm"
                >
                  {/* Card Header - Always Visible */}
                  <button
                    type="button"
                    onClick={() => handleCardClick(item.id)}
                    className="flex w-full items-start gap-4 p-5 text-left transition-colors duration-200 hover:bg-gray-50/50"
                    aria-expanded={isActive}
                    aria-controls={`card-content-${item.id}`}
                  >
                    <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border text-gabardo-blue transition-all duration-300 ${isActive ? 'border-gabardo-blue bg-gabardo-blue/10' : 'border-gabardo-blue/25 bg-white'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className={`text-base font-semibold transition-colors duration-300 ${isActive ? 'text-gabardo-blue' : 'text-gray-900'}`}>{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{item.hook}</p>
                      <span className={`text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-gabardo-blue' : 'text-gabardo-blue/50'}`}>
                        {isActive ? '▼ Ver detalhes' : '▶ Expandir'}
                      </span>
                    </div>
                  </button>

                  {/* Expanded Content - Shows when active */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`card-content-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.25, delay: 0.1 }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.15 }
                          }
                        }}
                        className="overflow-hidden origin-top"
                      >
                        <motion.div 
                          className="border-t border-gabardo-blue/10"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          {/* Image */}
                          <div className="relative h-56 w-full overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1421]/70 via-[#0a1421]/35 to-transparent" />
                          </div>

                          {/* Detailed Content */}
                          <div className="flex flex-col gap-5 p-5">
                            <div className="space-y-3">
                              <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">Valor em foco</span>
                              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">Práticas em destaque</span>
                                <ul className="space-y-2 text-sm text-gray-700">
                                  {item.practices && item.practices.map((practice) => (
                                    <li key={practice} className="flex items-start gap-2">
                                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gabardo-blue" />
                                      <span>{practice}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {item.quote && (
                                <div className="space-y-2">
                                  <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">O que escutamos do time</span>
                                  <blockquote className="rounded-2xl bg-gabardo-blue/5 p-4 text-sm leading-relaxed text-gabardo-blue">
                                    <p className="italic">{item.quote.text}</p>
                                    <span className="mt-2 block text-[11px] uppercase tracking-wide text-gabardo-blue/55">
                                      {item.quote.author}
                                    </span>
                                  </blockquote>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {item.chips.map((chip) => (
                                  <span
                                    key={chip}
                                    className="rounded-full border border-gabardo-blue/20 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gabardo-blue"
                                  >
                                    {chip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: Sidebar Cards */}
          <div className="hidden space-y-6 lg:block">
            {cultureFocus.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => handleCardClick(item.id)}
                  className={`group flex w-full gap-4 rounded-3xl border px-5 py-6 text-left shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gabardo-blue ${
                    isActive
                      ? 'border-gabardo-blue/50 bg-white'
                      : 'border-white/40 bg-white/70 hover:border-gabardo-blue/30'
                  }`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-gabardo-blue transition ${isActive ? 'border-gabardo-blue bg-gabardo-blue/10' : 'border-gabardo-blue/25 bg-white'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className={`text-base font-semibold ${isActive ? 'text-gabardo-blue' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{item.hook}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${isActive ? 'text-gabardo-blue' : 'text-gabardo-blue/50'}`}>
                      {isActive ? 'Explorando' : 'Selecionar'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Desktop: Full Content Panel */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[34px] border border-gabardo-blue/10 bg-white/90 shadow-[0_45px_120px_-55px_rgba(19,45,81,0.35)] backdrop-blur"
              >
                <div className="relative h-60 w-full overflow-hidden md:h-72">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a1421]/70 via-[#0a1421]/35 to-transparent" />
                </div>

                <div className="flex flex-col gap-6 p-8 md:p-10">
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">Valor em foco</span>
                    <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">{activeItem.title}</h3>
                    <p className="text-base leading-relaxed text-gray-600">{activeItem.description}</p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">Práticas em destaque</span>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {activeItem.practices && activeItem.practices.map((practice) => (
                          <li key={practice} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gabardo-blue" />
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activeItem.quote && (
                      <div className="space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gabardo-blue/70">O que escutamos do time</span>
                        <blockquote className="rounded-3xl bg-white/70 p-5 text-sm leading-relaxed text-gabardo-blue">
                          <p className="italic">{activeItem.quote.text}</p>
                          <span className="mt-3 block text-xs uppercase tracking-wide text-gabardo-blue/55">
                            {activeItem.quote.author}
                          </span>
                        </blockquote>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {activeItem.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-gabardo-blue/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gabardo-blue"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHoverCardsSection;
