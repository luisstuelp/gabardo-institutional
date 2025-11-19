'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Award, Shield, Download } from 'lucide-react';
import Folder from '@/components/Folder';
import FolderGalleryModal from '@/components/FolderGalleryModal';

const certifications = [
  {
    icon: Award,
    title: 'GHG Protocol - Selo Prata',
    subtitle: 'Inventário de Emissões',
    description:
      'Transparência na gestão de gases de efeito estufa, com 100% de neutralização das emissões diretas e indiretas.',
    highlight: 'Compromisso ESG reconhecido',
  },
  {
    icon: Shield,
    title: 'OEA - Receita Federal',
    subtitle: 'Operador Econômico Autorizado',
    description:
      'Processos aduaneiros rastreados, compliance robusto e integração com portos e alfândegas brasileiras.',
    highlight: 'Status aduaneiro confiável',
  },
];

const qualityBadges = [
  {
    icon: ShieldCheck,
    title: 'ISO 9001',
    description:
      'Processos padronizados, auditorias recorrentes e KPIs que asseguram excelência em cada etapa da logística de veículos.',
    downloadUrl: 'https://www.transgabardo.com.br/wp-content/uploads/2024/10/certificado-iso-9001.pdf',
    ctaLabel: 'Baixar certificado',
  },
  {
    icon: Leaf,
    title: 'ISO 14001',
    description:
      'Inventário de emissões desde 2017, matriz energética renovável e infraestrutura pensada para reduzir impactos ambientais.',
    downloadUrl: 'https://www.transgabardo.com.br/wp-content/uploads/2024/10/certificado-iso-14001.pdf',
    ctaLabel: 'Baixar certificado',
  },
  {
    icon: Shield,
    title: 'ISO 39001',
    description:
      'Protocolos rigorosos de segurança, central de controle 24/7 e treinamentos que garantem operações com zero avarias críticas.',
    downloadUrl: 'https://www.transgabardo.com.br/wp-content/uploads/2024/10/certificado-iso-39001.pdf',
    ctaLabel: 'Baixar certificado',
  },
  {
    icon: Award,
    title: 'OEA - Receita Federal',
    description:
      'Conformidade aduaneira validada pela Receita Federal como Operador Econômico Autorizado.',
    downloadUrl: '/certifications/certificado-oea-transportes-gabardo.pdf',
    ctaLabel: 'Baixar certificado',
  },
];

const pillars = [
  {
    title: 'Melhoria Contínua',
    description:
      'Auditorias internas frequentes, indicadores atualizados e planos de ação integrados ao Sistema de Gestão da Qualidade.',
    stats: '7,3h',
    statsLabel: 'Com nossa média anual de treinamento sendo 87,5h por colaborador',
    statsUnit: 'horas/mês',
  },
  {
    title: 'Gestão Sustentável',
    description:
      'Matriz energética com geração fotovoltaica, inventário de emissões desde 2017 e compensação de CO₂ no programa Carbono Negativo Gabardo.',
    stats: '100%',
    statsLabel: 'Emissões reportadas no inventário GHG Protocol',
    statsUnit: 'Indicador',
  },
  {
    title: 'Segurança em Primeiro Lugar',
    description:
      'Checklists eletrônicos, telemetria 24/7 e protocolos certificados reduzem ocorrências viárias abaixo da média setorial.',
    stats: '0,30%',
    statsLabel: 'Índice anual de avarias gerais',
    statsUnit: 'Indicador',
  },
];

const galleryCards = [
  {
    src: '/images/certifications/iso-9001-qualidade.png',
    alt: 'Certificado ISO 9001',
    label: 'ISO 9001:2015',
    description: 'Recertificação com escopo completo de logística automotiva e preparação de veículos.',
  },
  {
    src: '/images/certifications/iso-14001-meio-ambiente.png',
    alt: 'Certificado ISO 14001',
    label: 'ISO 14001:2015',
    description: 'Gestão ambiental integrada aos pátios, oficinas e operações de transporte.',
  },
  {
    src: '/images/certifications/iso-39001-seguranca-viaria.png',
    alt: 'Certificado ISO 39001',
    label: 'ISO 39001',
    description: 'Segurança viária com telemetria embarcada e protocolos de investigação de ocorrências.',
  },
  {
    src: '/images/certifications/Design sem nome (59).png',
    alt: 'Certificado Operador Econômico Autorizado (OEA)',
    label: 'OEA - Receita Federal',
    description: 'Compliance aduaneiro reconhecido com selo Operador Econômico Autorizado.',
  },
  {
    src: '/images/certifications/gcs-abnt-pr2030-esg.png',
    alt: 'Certificado GCS ABNT PR2030 ESG',
    label: 'ABNT PR 2030:2022 - ESG',
    description: 'Agenda ESG monitorada por indicadores e comitês dedicados.',
  },
];

const galleryHighlights = [
  'Coleção digitalizada disponível para clientes e parceiros em data room dedicado.',
  'Atualização anual de selos com acompanhamento das matrizes internacionais.',
  'Uso do acervo visual em onboarding de fornecedores e apresentações comerciais.',
];

const galleryImages = [
  {
    src: '/images/GaleriaDeCert/Trans Gabardo - Framers produtora -5810.JPG',
    alt: 'Galeria de Conquistas Gabardo',
    title: 'Certificados e Conquistas',
    description: 'Acervo de certificações e reconhecimentos institucionais.',
  },
  {
    src: '/images/GaleriaDeCert/Trans Gabardo - Framers produtora -5811.JPG',
    alt: 'Certificações Gabardo',
    title: 'Certificações',
    description: 'Documentação completa de certificações internacionais.',
  },
  {
    src: '/images/GaleriaDeCert/Trans Gabardo - Framers produtora -5812-2.JPG',
    alt: 'Selos e Reconhecimentos',
    title: 'Selos e Reconhecimentos',
    description: 'Selos de qualidade e reconhecimentos do setor.',
  },
  {
    src: '/images/GaleriaDeCert/Trans Gabardo - Framers produtora -5813.JPG',
    alt: 'Painel de Certificados',
    title: 'Painel Institucional',
    description: 'Painel completo de certificações da Gabardo.',
  },
  {
    src: '/images/GaleriaDeCert/Trans Gabardo - Framers produtora -5821-2.JPG',
    alt: 'Acervo de Conquistas',
    title: 'Acervo de Conquistas',
    description: 'Galeria completa de conquistas e certificações.',
  },
];

const SobreQualidadeCertificationsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderHovered, setIsFolderHovered] = useState(false);

  return (
    <section className="relative bg-neutral-950 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gabardo-light-blue/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-gabardo-blue/40 blur-[220px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="text-[0.65rem] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gabardo-light-blue/80">Certificações e governança</span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Padrões globais que elevam a confiança dos nossos parceiros
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
            Integramos ISO 9001, ISO 14001 e ISO 39001 a uma agenda ESG reconhecida, ampliando governança com OEA e Pacto Global ONU.
            Conheça como estruturamos essa rede de confiança.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid gap-8 sm:gap-10 md:gap-12 xl:grid-cols-12 xl:items-start">
          <div className="space-y-6 sm:space-y-8 md:space-y-10 xl:col-span-8">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gabardo-light-blue/10 opacity-60" aria-hidden />
                  <div className="relative space-y-3 sm:space-y-4">
                    <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-gabardo-light-blue/80">{pillar.title}</span>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{pillar.description}</p>
                    <div className="flex items-baseline gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl font-semibold text-white">{pillar.stats}</span>
                      <span className="text-[0.6rem] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white/50">{pillar.statsUnit ?? 'Indicador'}</span>
                    </div>
                    <p className="text-[0.7rem] sm:text-xs text-white/60 leading-relaxed">{pillar.statsLabel}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-5 pt-5 pb-2 sm:px-6 sm:pt-6 sm:pb-2 md:px-6 md:pt-6 md:pb-3 backdrop-blur-sm transition-transform duration-300"
                >
                  <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gabardo-light-blue/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-start gap-3 sm:gap-4 md:gap-5">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-gabardo-light-blue">
                      <cert.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={2.2} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 sm:gap-1.5">
                      <div className="text-xs sm:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-white/60">{cert.subtitle}</div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">{cert.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                  <div className="relative mt-auto pt-1.5 sm:pt-2">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.26em] sm:tracking-[0.3em] text-gabardo-light-blue">
                      {cert.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4">
              {qualityBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-sm"
                  >
                    <div className="absolute -right-12 -top-10 h-20 w-20 rounded-full bg-gabardo-light-blue/15 blur-3xl" aria-hidden />
                    <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-gabardo-light-blue">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-white/85">{badge.title}</h3>
                          <p className="mt-1.5 sm:mt-2 text-[0.7rem] sm:text-xs text-white/65 leading-relaxed">{badge.description}</p>
                        </div>
                      </div>
                      {badge.downloadUrl && (
                        <a
                          href={badge.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-gabardo-light-blue/30 bg-gabardo-light-blue/15 p-2 text-gabardo-light-blue transition-colors hover:bg-gabardo-light-blue/25 sm:p-2.5"
                          aria-label={`Download ${badge.title}`}
                        >
                          <Download className="h-4 w-4" strokeWidth={2.2} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="xl:col-span-4 flex flex-col gap-8"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_28px_80px_-38px_rgba(10,20,36,0.6)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gabardo-light-blue/20" aria-hidden />
              <div className="relative">
                <div className="relative h-60 w-full flex items-end justify-center px-10 pb-8 pt-4">
                  {/* Left Arrow - Points right towards folder */}
                  <motion.div
                    animate={{ x: [-4, 0, -4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gabardo-light-blue z-10"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                  
                  <div 
                    className={`flex items-center justify-center rounded-3xl border border-white/15 bg-white/10 px-8 py-8 backdrop-blur-sm shadow-[0_18px_50px_-25px_rgba(19,45,81,0.65)] cursor-pointer group transition-all ${
                      isFolderHovered ? 'border-gabardo-light-blue/40' : ''
                    }`}
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={() => setIsFolderHovered(true)}
                    onMouseLeave={() => setIsFolderHovered(false)}
                  >
                    <div className={`transition-transform ${
                      isFolderHovered ? 'scale-105' : ''
                    }`}>
                      <Folder
                        size={1.9}
                        color="#38B6FF"
                        className="cursor-pointer"
                        onOpen={() => setIsModalOpen(true)}
                      />
                    </div>
                  </div>
                  
                  {/* Right Arrow - Points left towards folder */}
                  <motion.div
                    animate={{ x: [4, 0, 4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gabardo-light-blue z-10"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-6 p-6 pt-7">
                  <div>
                    <h3 
                      className="text-lg font-semibold uppercase tracking-[0.32em] text-white/80 hover:text-gabardo-light-blue transition-colors cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                      onMouseEnter={() => setIsFolderHovered(true)}
                      onMouseLeave={() => setIsFolderHovered(false)}
                    >
                      Galeria de Conquistas
                    </h3>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                      Certificados físicos e digitais exibidos nas auditorias externas, apresentações comerciais e data rooms.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {galleryCards.map((item) => (
                      <div
                        key={item.label}
                        className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/8 p-4"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gabardo-light-blue/15 opacity-60" aria-hidden />
                        <div className="relative flex items-center gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-visible">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              sizes="80px"
                              className={`object-contain ${
                                item.label === 'OEA - Receita Federal' ? 'scale-125' : ''
                              }`}
                            />
                          </div>
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-white/80">{item.label}</span>
                            <p className="mt-1 text-xs text-white/65 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="grid gap-2 text-xs text-white/65 leading-relaxed">
                    {galleryHighlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gabardo-light-blue" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
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

export default SobreQualidadeCertificationsSection;
