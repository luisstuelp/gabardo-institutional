'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';

const footerSections = [
  {
    title: 'Serviços',
    links: [
      { label: 'Transporte de Veículos', href: '/servicos#transporte-de-veiculos' },
      { label: 'Armazenagem', href: '/servicos#armazenagem' },
      { label: 'Logística Integrada', href: '/servicos#logistica-integrada' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Canal de Denúncias', href: '/contato?setor=Canal+de+Denúncias' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '/sobre/historia' },
      { label: 'Institucional', href: '/sobre/secao-institucional' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contato', href: '/contato' },
      { label: 'Orçamento', href: '/orcamento' },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/transportesgabardo/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/Transgabardo/', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/transportes-gabardo/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@transportesgabardo', label: 'YouTube' },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: 'Av. Fernando Ferrari, 700 - Anchieta, Porto Alegre/RS', 
    href: 'https://maps.app.goo.gl/XUcq2YCMRnNZcwrz5'
  },
  { icon: Phone, text: '+55 (51) 3373-3000', href: 'tel:+555133733000' },
  { icon: Mail, text: 'gabardo@transgabardo.com.br', href: 'mailto:gabardo@transgabardo.com.br' },
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

      <div className="section-container relative z-10 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-5 sm:space-y-6 md:space-y-8 lg:col-span-4"
          >
            <Link href="/">
              <Image
                src="/gabardo-logo.png"
                alt="Gabardo"
                width={160}
                height={48}
                priority
                className="h-auto w-auto drop-shadow-[0_12px_30px_-15px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-[1.03]"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-white/70">
              Distribuindo eficiência logística e conectando marcas líderes às melhores soluções em transporte automotivo há mais de três décadas.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-gabardo-light-blue" />
                  {href ? <a href={href} className="hover:text-gabardo-light-blue transition-colors">{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:col-span-5">
            <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-2 lg:grid-cols-3">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 + 0.2 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <h4 className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.28em] sm:tracking-[0.32em] text-white/70">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-gabardo-light-blue">
                          <span>{link.label}</span>
                        </Link>
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
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:col-span-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
              Siga a Gabardo
            </h4>
            <p className="text-xs sm:text-sm text-white/60">
              Acompanhe novidades, sustentabilidade e bastidores das operações em nossas redes.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-300 hover:border-gabardo-light-blue/60 hover:bg-gabardo-light-blue/20"
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className="border-t border-white/10 bg-white/5"
      >
        <div className="section-container flex flex-col gap-3 sm:gap-4 py-4 sm:py-5 md:py-6 text-xs sm:text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            2025 Transportes Gabardo. Todos os direitos reservados.
            <span className="ml-2 inline-block rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[0.65rem] tracking-[0.08em] text-white/80">
              v2.1
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/politica-de-privacidade" className="transition-colors duration-200 hover:text-gabardo-light-blue">
              Política de Privacidade
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white transition-all duration-200 hover:border-gabardo-light-blue/60 hover:bg-gabardo-light-blue/20 hover:text-white"
            >
              Admin
            </Link>
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
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden lg:flex justify-end pr-4">
    <motion.div
      initial={{ x: '-120%' }}
      animate={isActive ? { x: 0 } : { x: '-120%' }}
      transition={{ duration: 7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-[420px] drop-shadow-[0_40px_60px_rgba(5,12,22,0.45)] xl:w-[520px] 2xl:w-[620px]"
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