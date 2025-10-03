'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';

const footerSections = [
  {
    title: 'Serviços',
    links: [
      { label: 'Transporte de Veículos', href: '/servicos/transporte-veiculos' },
      { label: 'Transporte em Prancha', href: '/servicos/transporte-prancha' },
      { label: 'Armazenagem', href: '/servicos/armazenagem' },
      { label: 'Logística Integrada', href: '/servicos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/sobre' },
      { label: 'Blog', href: '/blog' },
      { label: 'Carreiras', href: '/trabalhe-conosco' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Privacidade', href: '/legal/politica-de-privacidade' },
      { label: 'Termos', href: '/legal/termos-de-uso' },
      { label: 'Canal de Ética', href: '/conformidade/canal-de-etica' },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const contactInfo = [
  { icon: MapPin, text: 'Matriz — Porto Alegre, RS' },
  { icon: Phone, text: '+55 (51) 3373-3000' },
  { icon: Mail, text: 'gabardo@transgabardo.com.br' },
];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef, { amount: 0.25, once: true });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-gabardo-blue text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.16),_transparent_65%)]" />

        <motion.div
          className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, -18, 0], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-gabardo-light-blue/20 blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>

      <TruckAnimation isActive={isFooterInView} />

      <div className="section-container relative z-10 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8 lg:col-span-4"
          >
            <Image
              src="/gabardo-logo.png"
              alt="Gabardo Transportadora"
              width={160}
              height={48}
              priority
              className="h-auto w-auto drop-shadow-[0_12px_30px_-15px_rgba(0,0,0,0.7)]"
            />
            <p className="text-sm leading-relaxed text-white/70">
              Distribuindo eficiência logística e conectando marcas líderes às melhores soluções em transporte automotivo há mais de três décadas.
            </p>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/70">
                  <Icon className="h-4 w-4 text-gabardo-light-blue" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-10 lg:col-span-5">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 + 0.2 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                    {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm text-white/70">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-2 transition-colors duração-200 hover:text-gabardo-light-blue"
                        >
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="space-y-6 lg:col-span-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
              Siga a Gabardo
            </h4>
            <p className="text-sm text-white/60">
              Acompanhe novidades, sustentabilidade e bastidores das operações em nossas redes.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duração-300 hover:border-gabardo-light-blue/60 hover:bg-gabardo-light-blue/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className="border-t border-white/10 bg-white/5"
      >
        <div className="section-container flex flex-col gap-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>2025 Gabardo Transportadora. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-6">
            <a href="/legal/politica-de-privacidade" className="transition-colors duração-200 hover:text-gabardo-light-blue">
              Política de Privacidade
            </a>
            <a href="/legal/termos-de-uso" className="transition-colors duração-200 hover:text-gabardo-light-blue">
              Termos de Uso
            </a>
            <a href="/conformidade/canal-de-etica" className="transition-colors duração-200 hover:text-gabardo-light-blue">
              Canal de Ética
            </a>
            <a href="/downloads/relatorio-esg.pdf" className="transition-colors duração-200 hover:text-gabardo-light-blue">
              Relatório ESG
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

type TruckAnimationProps = {
  isActive: boolean;
};

const TruckAnimation: React.FC<TruckAnimationProps> = ({ isActive }) => (
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden md:flex justify-end pr-4">
    <motion.div
      initial={{ x: '-120%' }}
      animate={isActive ? { x: 0 } : { x: '-120%' }}
      transition={{ duration: 7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-[520px] drop-shadow-[0_40px_60px_rgba(5,12,22,0.45)] lg:w-[620px]"
    >
      <Image
        src="/3dtruck.png"
        alt="Caminhão Gabardo"
        width={560}
        height={240}
        priority
        className="relative z-10 h-auto w-full"
      />
    </motion.div>
  </div>
);


export default Footer;