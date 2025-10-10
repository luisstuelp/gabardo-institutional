
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type CardFront =
  | {
      type: 'blank';
    }
  | {
      type: 'logo';
      src: string;
      alt: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
    };

type Card = {
  id: string;
  front: CardFront;
  back: {
    title: string;
    since: string;
    impact: string[];
    quote: string;
    quoteAuthor: string;
  };
  gradient: string;
};

const cards: Card[] = [
  {
    id: 'volkswagen',
    front: {
      type: 'logo',
      src: '/images/Wolks.png',
      alt: 'Logotipo Volkswagen'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'Volkswagen',
      since: 'Desde 1998',
      impact: [
        'Planejamento conjunto das janelas de lançamento',
        'Rede dedicada que mantém o ritmo das linhas de montagem'
      ],
      quote:
        'Quando a produção precisa acelerar, a Gabardo já está com a solução no pátio.',
      quoteAuthor: 'Equipe de Suprimentos Volkswagen'
    }
  },
  {
    id: 'mercedes-benz',
    front: {
      type: 'logo',
      src: '/images/Mercedes.png',
      alt: 'Logotipo Mercedes-Benz'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'Mercedes-Benz',
      since: 'Desde 2006',
      impact: [
        'Equipe dedicada para rotas VIP e eventos itinerantes',
        'Monitoramento cada hora para veículos comerciais e de luxo'
      ],
      quote:
        'Eles entendem o que significa entregar com padrão Mercedes.',
      quoteAuthor: 'Gerente de Operações Mercedes-Benz'
    }
  },
  {
    id: 'ford',
    front: {
      type: 'logo',
      src: '/images/Ford.png',
      alt: 'Logotipo Ford'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'Ford',
      since: 'Desde 2011',
      impact: [
        'Integração de sistemas para visibilidade em tempo real',
        'Modelagem de rotas de transferência estadual com equipes locais'
      ],
      quote:
        'Transformaram informações dispersas em uma operação coordenada.',
      quoteAuthor: 'Diretoria de Logística Ford Brasil'
    }
  },
  {
    id: 'scania',
    front: {
      type: 'logo',
      src: '/images/Scania.png',
      alt: 'Logotipo Scania'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'Scania',
      since: 'Desde 2015',
      impact: [
        'Base técnica móvel com mecânicos e peças estratégicas',
        'Roteiros LatAm alinhados a compliance e segurança'
      ],
      quote:
        'A Gabardo cuida de cada entrega como se fosse o nosso próprio caminhão.',
      quoteAuthor: 'Coordenador de Distribuição Scania'
    }
  },
  {
    id: 'localiza',
    front: {
      type: 'logo',
      src: '/images/Localiza.png',
      alt: 'Logotipo Localiza'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'Localiza',
      since: 'Desde 2017',
      impact: [
        'Equipes mistas Gabardo + Localiza em operações de pico',
        'Processo de inspeção compartilhado que reduz devoluções'
      ],
      quote:
        'Encontramos um parceiro que decide com a gente, não por nós.',
      quoteAuthor: 'Head de Frota Localiza'
    }
  },
  {
    id: 'jsl',
    front: {
      type: 'logo',
      src: '/images/JSL.png',
      alt: 'Logotipo JSL'
    },
    gradient: 'from-[#132D51] to-[#132D51]',
    back: {
      title: 'JSL',
      since: 'Desde 2019',
      impact: [
        'Coordenação multimodal com parceiros homologados',
        'Quadros diários de alinhamento com time executivo'
      ],
      quote:
        'A Gabardo chega junto e permanece até a última entrega.',
      quoteAuthor: 'Diretoria de Projetos JSL'
    }
  }
];

const AboutClientsSection: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleCardFlip = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <section className="py-20 bg-white" id="nossos-clientes">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 uppercase tracking-tight">
            Nossos Clientes
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Confiança e parceria que nos movem.
          </p>
          <p className="text-sm uppercase tracking-[0.35em] text-gabardo-blue mt-6">Trusted by</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:grid-cols-6 lg:gap-4"
        >
          {cards.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                className="group [perspective:1400px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                onClick={() => handleCardFlip(card.id)}
              >
                <div className={`relative w-full aspect-[6/5] rounded-3xl shadow-xl transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${flippedCard === card.id ? '[transform:rotateX(180deg)]' : ''}`}>
                  <div
                    className={`absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-gray-100 p-6 [backface-visibility:hidden]`}
                  >
                    {card.front.type === 'blank' ? (
                      <div className="h-full w-full rounded-2xl border-2 border-dashed border-gabardo-blue/20 bg-white/40" />
                    ) : card.front.type === 'image' ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={card.front.src}
                          alt={card.front.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative h-full w-full">
                        <Image
                          src={card.front.src}
                          alt={card.front.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} px-6 py-6 text-left text-white [backface-visibility:hidden] [transform:rotateX(180deg)]`}
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/24 via-transparent to-black/34" />
                      <motion.span
                        className="absolute -top-6 right-[-4px] text-[4rem] font-black uppercase tracking-[-0.12em] text-white/6 md:text-[5.2rem]"
                        initial={{ rotate: -8, opacity: 0.05 }}
                        animate={{ rotate: [-8, -6, -8], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 9 + index, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {card.back.title.slice(0, 5)}
                      </motion.span>
                    </div>

                    <div className="relative z-10 space-y-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/85">
                          {card.back.since}
                        </span>
                        <span className="h-px w-5 rounded-full bg-white/25" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                          Como atuamos juntos
                        </p>
                        <h3 className="text-[1.64rem] font-semibold leading-tight md:text-[1.82rem]">
                          {card.back.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};


export default AboutClientsSection;
