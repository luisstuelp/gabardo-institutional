'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InfiniteScroll from '@/components/InfiniteScroll';
import { Building, Users, Truck, Target } from 'lucide-react';
import Image from 'next/image';

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  type ScrollItem = { content: React.ReactElement };

  const scrollItems: ScrollItem[] = timeline.map((item, index) => ({
    content: (
      <motion.div
        className="relative mx-4 w-[320px] sm:w-[400px] md:w-[480px] lg:w-[560px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[380px] overflow-hidden rounded-2xl shadow-[0_20px_48px_-22px_rgba(19,45,81,0.35)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover ${index === 0 ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gabardo-blue text-xs sm:h-8 sm:w-8">
              {item.icon}
            </div>
            <span className="text-xs font-bold sm:text-sm">{item.year}</span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wide sm:text-sm line-clamp-2">
            {item.title}
          </h3>
        </div>
      </motion.div>
    ),
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

  return (
    <section className="section-shell bg-white relative overflow-hidden">
      <div className="section-container">
        {/* New Introductory Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gabardo-blue">Uma Jornada de Confiança e Inovação</h1>
            <p className="text-lg text-gray-600 leading-relaxed">Desde 1989, a Transportes Gabardo tem sido uma força motriz na logística automotiva brasileira. Nossa história é marcada por um compromisso incansável com a excelência, a inovação e a satisfação de nossos clientes. A cada ano, expandimos nossas fronteiras, aprimoramos nossos processos e fortalecemos nossas parcerias, sempre com o objetivo de entregar mais do que veículos: entregamos confiança.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/historia1.JPG"
              alt="Gestão de Transportes Gabardo"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

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
            36 anos de excelência e confiança Transportes Gabardo
          </motion.h2>
        </motion.div>

        {/* Timeline as Infinite Scroll */}
        <div className="relative mt-16 w-screen max-w-none left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center">
            <InfiniteScroll
              width="100vw"
              maxHeight="420px"
              itemMinHeight={380}
              negativeMargin="-3rem"
              items={scrollItems}
              autoplay
              autoplaySpeed={1.2}
              pauseOnHover={false}
              isTilted
              tiltDirection="left"
              allowManualScroll={false}
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
            &ldquo;Ao longo de seus 36 anos, a Transportes Gabardo procura entender as necessidades dos clientes para
            atendê-los de forma personalizada e eficiente. Nossa missão é transportar mais que veículos.&rdquo;
          </blockquote>
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue/60">
            — Sérgio Mário Gabardo, Fundador
          </div>
        </motion.div>

        {/* New Future Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/GabardoMonit.JPG"
              alt="Monitoramento Gabardo"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gabardo-blue">O Futuro da Logística Automotiva</h2>
            <p className="text-lg text-gray-600 leading-relaxed">Olhamos para o futuro com a mesma paixão e determinação que nos trouxeram até aqui. Estamos comprometidos em liderar a transformação da logística automotiva, investindo em tecnologia, sustentabilidade e em nossa equipe. Acreditamos que o futuro é elétrico, conectado e, acima de tudo, centrado no cliente. Estamos prontos para os próximos 36 anos e além.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutStorySection;
