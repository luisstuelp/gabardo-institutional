'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  Heart,
  Shield,
  Award,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Share2,
  MessageCircle,
  Mail,
  Copy,
  Sparkles
} from 'lucide-react';

const socialItems = [
  {
    icon: <Users className="w-10 h-10" />,
    title: "Desenvolvimento de Gente e Respeito à Diversidade",
    description: "Investimos no desenvolvimento de nossos colaboradores e promovemos um ambiente de trabalho inclusivo e diverso."
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Valorização do Motorista Caminhoneiro",
    description: "Reconhecemos a importância dos motoristas de caminhão e oferecemos programas de valorização e bem-estar."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Impactos em Comunidades e Investimento Social",
    description: "Contribuímos para o desenvolvimento das comunidades onde atuamos, através de projetos e investimentos sociais."
  },
  {
    icon: <Award className="w-10 h-10" />,
    title: "Segurança e Integridade das Pessoas e dos Ativos",
    description: "A segurança é um valor inegociável para nós. Garantimos a integridade de nossos colaboradores e dos ativos da empresa."
  }
];

const shareLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://www.gabardo.com.br'
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/sharer/sharer.php?u=https://www.gabardo.com.br'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?text=Conheça%20as%20iniciativas%20da%20Gabardo:%20https://www.gabardo.com.br'
  },
  {
    icon: Mail,
    label: 'E-mail',
    href: 'mailto:?subject=Conheça%20a%20Gabardo&body=Veja%20como%20a%20Gabardo%20atua:%20https://www.gabardo.com.br'
  }
];

export default function SocialSection() {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard
      .writeText('https://www.gabardo.com.br')
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 3200);
      })
      .catch(() => {
        /* noop */
      });
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-gabardo-blue/8 blur-3xl" />
        <div className="absolute right-8 bottom-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-gabardo-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gabardo-blue">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Rede social Gabardo
          </span>
          <h2 className="mt-6 text-3xl font-bold uppercase tracking-tight text-gabardo-blue md:text-4xl">Social</h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Mantemos o mesmo conteúdo institucional ampliando a experiência com recursos de colaboração, compartilhamento e acompanhamento contínuo das iniciativas sociais da Gabardo.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {socialItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full rounded-3xl border border-gabardo-blue/12 bg-white/90 p-8 shadow-[0_24px_70px_-50px_rgba(19,45,81,0.5)] transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gabardo-blue/10 text-gabardo-blue">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gabardo-blue">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-28 h-fit rounded-3xl border border-gabardo-blue/12 bg-white/95 p-6 shadow-[0_30px_80px_-60px_rgba(19,45,81,0.35)] backdrop-blur"
          >
            <div className="flex items-center gap-3 text-gabardo-blue">
              <Share2 className="h-5 w-5" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">Compartilhe impacto</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Amplifique as iniciativas sociais da Gabardo nas suas redes mantendo o conteúdo original com novas experiências digitais.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {shareLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gabardo-blue/20 bg-gabardo-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gabardo-blue transition hover:bg-gabardo-blue/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gabardo-blue"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={copyLink}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gabardo-blue/25 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gabardo-blue transition hover:bg-gabardo-blue/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gabardo-blue"
              aria-live="polite"
            >
              <Copy className="h-4 w-4" aria-hidden />
              {copied ? 'Link copiado!' : 'Copiar link'}
            </button>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="https://www.instagram.com/transgabardo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3 text-sm font-medium text-gabardo-blue transition hover:bg-gabardo-blue/12"
              >
                <span>Instagram</span>
                <Instagram className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="https://www.linkedin.com/company/transgabardo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3 text-sm font-medium text-gabardo-blue transition hover:bg-gabardo-blue/12"
              >
                <span>LinkedIn</span>
                <Linkedin className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="https://www.facebook.com/TransGabardo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3 text-sm font-medium text-gabardo-blue transition hover:bg-gabardo-blue/12"
              >
                <span>Facebook</span>
                <Facebook className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCnXuktXVMS8qachucTy8bKg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-gabardo-blue/15 bg-gabardo-blue/5 px-4 py-3 text-sm font-medium text-gabardo-blue transition hover:bg-gabardo-blue/12"
              >
                <span>YouTube</span>
                <Youtube className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
