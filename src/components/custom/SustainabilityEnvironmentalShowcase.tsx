'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const highlights = [
  {
    id: 'processo-carbono-negativo',
    title: 'O processo para atingir o carbono negativo',
    description:
      'Desde que iniciou seus inventários de emissões, a Transportes Gabardo adotou uma série de práticas sustentáveis para reduzir emissões. Entre as ações mais impactantes, destacam-se:',
    bullets: [
      'Otimização de combustível com tecnologias de monitoramento e rotas inteligentes.',
      'Frota moderna com caminhões e carretas mais eficientes e menores emissões.',
      'Uso de energia limpa com geração fotovoltaica nas unidades e menor dependência de fontes não renováveis.',
      'Gestão de resíduos com coleta seletiva e destinação correta para fortalecer a economia circular.',
    ],
    footer:
      'Compromisso com a sustentabilidade significa neutralizar emissões e liderar projetos de captura de carbono, reflorestamento e bioenergia para toda a operação logística.',
    imageSrc: '/images/sustentabilidade/processo-carbono-negativo.jpg',
    imageAlt: 'Profissional analisando iniciativas de sustentabilidade em operação logística',
  },
  {
    id: 'carbono-negativo-certificacao',
    title: 'Gabardo: pioneirismo e sustentabilidade no setor logístico',
    description:
      'Em 2024 a Transportes Gabardo se tornou a primeira transportadora no mundo a alcançar o status de carbono negativo, resultado de inventários GEE contínuos desde 2017.',
    bullets: [
      'Saldo negativo de emissões em 2024: -23.890,90 tCO2, com 57.884,58 tCO2 inventariados e 81.775,48 tCO2 capturados.',
      'Certificação de carbono negativo emitida em 2025 pela Wtoron ESG, validando monitoramento contínuo e projetos de captura de CO₂.',
      'Estratégia baseada em compensação efetiva, créditos de carbono e soluções circulares para reduzir o efeito estufa.',
    ],
    footer:
      'A liderança em carbono negativo transforma o setor logístico brasileiro, definindo um novo padrão de sustentabilidade e inspirando toda a cadeia.',
    imageSrc: '/images/sustentabilidade/pioneirismo-carbono-negativo.jpg',
    imageAlt: 'Equipe celebrando certificação de carbono negativo da Transportes Gabardo',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * index, ease: 'easeOut' },
  }),
};

const SustainabilityEnvironmentalShowcase: React.FC = () => {
  return (
    <section className="bg-neutral-950 py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="mb-16 max-w-4xl text-white">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-gabardo-light-blue"
          >
            Carbono negativo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white"
          >
            Operação carbono negativa apoiada por tecnologia, energia limpa e projetos regenerativos
          </motion.h2>
        </div>

        <div className="grid gap-10 xl:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.article
              key={item.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 45vw, (min-width: 768px) 90vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">{item.title}</p>
                </div>
              </div>

              <div className="space-y-6 p-6 md:p-8 text-white/80">
                <p className="text-sm md:text-base leading-relaxed text-white/85">{item.description}</p>

                <ul className="space-y-4 text-sm leading-relaxed">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm leading-relaxed text-white/70 border-t border-white/10 pt-4">
                  {item.footer}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilityEnvironmentalShowcase;
