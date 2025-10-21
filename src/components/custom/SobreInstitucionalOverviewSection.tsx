'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Folder from '@/components/Folder';
import FolderGalleryModal from '@/components/FolderGalleryModal';

const structureHighlights = [
  {
    title: 'Centro de controle operacional',
    description:
      'Nosso centro de comando conecta bases, clientes e motoristas em tempo real. Acompanhamos cada entrega com visibilidade total da operação.',
    image: '/images/GabardoMonit.JPG',
    imageAlt: 'Equipe da Gabardo monitorando operações em tempo real',
  },
  {
    title: 'Políticas de segurança e compliance',
    description:
      'Mantemos auditorias internas regulares, seguros corporativos abrangentes e protocolos certificados que protegem toda a cadeia automotiva.',
    image: '/images/Trans Gabardo - Framers produtora -5726.JPG',
    imageAlt: 'Time de gestão de riscos realizando checklist de segurança',
  },
  {
    title: 'Infraestrutura tecnológica avançada',
    description:
      'Investimos em telemetria, IoT embarcada e analytics proprietários. Nossos sistemas fornecem dados em tempo real para decisões estratégicas.',
    image: '/images/GabardoBastidores.JPG',
    imageAlt: 'Profissionais acompanhando dados em painéis digitais',
  },
  {
    title: 'Capital humano qualificado',
    description:
      'Desenvolvemos nossos talentos internos em logística, TI, jurídico e atendimento. Nossas equipes multidisciplinares são a base de nossas operações no Brasil e LATAM.',
    image: '/images/GabardoEquipe.JPG',
    imageAlt: 'Equipe corporativa da Gabardo reunida em escritório',
  },
];

const galleryImages = [
  {
    src: '/images/GabardoMonit.JPG',
    alt: 'Centro de controle operacional Gabardo',
    title: 'Centro de Controle',
    description: 'Nossa torre de controle monitora todas as operações em tempo real 24h/7d.',
  },
  {
    src: '/images/GabardoEquipe.JPG',
    alt: 'Equipe corporativa Gabardo',
    title: 'Nosso Time',
    description: 'Profissionais especializados em logística, TI, jurídico e atendimento.',
  },
  {
    src: '/images/GabardoBastidores.JPG',
    alt: 'Infraestrutura tecnológica',
    title: 'Tecnologia Aplicada',
    description: 'Sistemas avançados de telemetria e analytics proprietários.',
  },
  {
    src: '/images/Trans Gabardo - Framers produtora -5726.JPG',
    alt: 'Gestão de segurança e compliance',
    title: 'Segurança e Compliance',
    description: 'Protocolos certificados e auditorias contínuas em toda operação.',
  },
];

const SobreInstitucionalOverviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="estrutura-institucional"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Pilares da nossa organização
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-4xl mx-auto"
          >
            Construimos uma estrutura sólida que integra governança corporativa, infraestrutura tecnológica e desenvolvimento de pessoas. Cada pilar foi desenhado para entregar excelência operacional aos nossos clientes.
          </motion.p>
        </div>

        <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="rounded-[28px] border border-gabardo-blue/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-sm uppercase tracking-[0.32em] text-gabardo-blue">
                Governança corporativa
              </h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Organizamos nossa estrutura em áreas especializadas que colaboram de forma integrada. Planejamento estratégico, engenharia de rotas, torre de controle e equipes de suporte trabalham em sinergia para entregar resultados consistentes.
              </p>
              <div className="mt-4 h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-sm text-gray-500 font-medium">Espaço reservado para imagem institucional</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="rounded-[28px] border border-gabardo-blue/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-sm uppercase tracking-[0.32em] text-gabardo-blue">Documentação e processos</h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Mantemos todos os nossos processos documentados e acessíveis. Clique na pasta abaixo para explorar materiais que demonstram como operamos no dia a dia.
              </p>
              <div className="relative mt-6 h-64 w-full">
                <Folder
                  size={2}
                  color="#17315C"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  onOpen={() => setIsModalOpen(true)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="rounded-[28px] border border-gabardo-blue/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-sm uppercase tracking-[0.32em] text-gabardo-blue">
                Habilitações e certificações
              </h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Possuimos Declaração de Trânsito Aduaneiro (DTA) e demais certificações necessárias para operações internacionais. Nossos processos aduaneiros seguem rigorosos controles fiscais, permitindo transferências seguras entre portos, pátios e montadoras.
              </p>
              <div className="mt-4 h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-sm text-gray-500 font-medium">Espaço reservado para certificações</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {structureHighlights.map((item) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <FolderGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={galleryImages}
      />
    </section>
  );
};

export default SobreInstitucionalOverviewSection;
