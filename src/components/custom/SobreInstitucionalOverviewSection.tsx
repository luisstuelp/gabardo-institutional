'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Folder from '@/components/Folder';

const structureHighlights = [
  {
    title: 'Controle integrado',
    description:
      'Nosso centro operacional conecta bases, clientes e motoristas em uma rotina contínua de planejamento, acompanhamento e pós-entrega.',
    image: '/images/GabardoMonit.JPG',
    imageAlt: 'Equipe da Gabardo monitorando operações em tempo real',
  },
  {
    title: 'Gestão de riscos contínua',
    description:
      'Protocolos certificados, auditorias internas e seguros corporativos mantêm a cadeia automotiva protegida em cada etapa.',
    image: '/images/Trans Gabardo - Framers produtora -5726.JPG',
    imageAlt: 'Time de gestão de riscos realizando checklist de segurança',
  },
  {
    title: 'Tecnologia aplicada ao transporte',
    description:
      'Telemetria, IoT (Internet das Coisas) embarcada — com sensores conectados nos veículos — e analytics proprietários garantem visibilidade 24h/7d e decisões baseadas em dados.',
    image: '/images/GabardoBastidores.JPG',
    imageAlt: 'Profissionais acompanhando dados em painéis digitais',
  },
  {
    title: 'Pessoas especializadas',
    description:
      'Equipes multidisciplinares em logística, TI, jurídico e atendimento sustentam operações estratégicas no Brasil e na LATAM.',
    image: '/images/GabardoEquipe.JPG',
    imageAlt: 'Equipe corporativa da Gabardo reunida em escritório',
  },
];

const SobreInstitucionalOverviewSection = () => {
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
            Estrutura institucional que entrega confiança
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg text-gray-600 max-w-4xl mx-auto"
          >
            Da sala de controle aos times de campo, reunimos governança, tecnologia e pessoas preparadas para atender montadoras, frotistas e concessionárias com padrão Gabardo.
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
                Como nos organizamos
              </h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Cada área corporativa contribui para uma jornada simples para o cliente: planejamento e engenharia definem a rota ideal, a torre de controle acompanha indicadores em tempo real e as equipes de suporte garantem respostas rápidas aos eventos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="rounded-[28px] border border-gabardo-blue/10 bg-white/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-sm uppercase tracking-[0.32em] text-gabardo-blue">Acervo institucional</h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                Explore a pasta interativa para visualizar materiais internos e entender como consolidamos nossas rotinas corporativas.
              </p>
              <div className="relative mt-6 h-64 w-full">
                <Folder
                  size={2}
                  color="#17315C"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
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
                DTA habilitado e operações aduaneiras
              </h3>
              <p className="mt-3 text-base text-gray-600 leading-relaxed">
                A Gabardo possui Declaração de Trânsito Aduaneiro (DTA) habilitada, documento que autoriza o transporte sob regime aduaneiro com controles fiscais reforçados. Isso viabiliza transferências entre portos, pátios e montadoras com segurança jurídica.
              </p>
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
    </section>
  );
};

export default SobreInstitucionalOverviewSection;
