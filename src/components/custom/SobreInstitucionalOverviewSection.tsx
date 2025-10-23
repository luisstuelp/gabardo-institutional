'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PartnersSection from '@/components/custom/PartnersSection';

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

const SobreInstitucionalOverviewSection = () => {
  return (
    <section
      id="estrutura-institucional"
      aria-labelledby="estrutura-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <header className="mb-16 sm:mb-20 text-center">
          <motion.h2
            id="estrutura-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 sm:mb-6"
          >
            Pilares da nossa <span className="text-gabardo-blue">organização</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Construímos uma estrutura sólida que integra governança corporativa, infraestrutura tecnológica e desenvolvimento de pessoas. Cada pilar foi desenhado para entregar excelência operacional aos nossos clientes.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-7xl mx-auto">
          {structureHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 px-6 py-6">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-base leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <PartnersSection />
    </section>
  );
};

export default SobreInstitucionalOverviewSection;
