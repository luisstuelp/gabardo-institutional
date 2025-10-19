'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const innovationLevers = [
  'Laboratório de inovação logística com squads multidisciplinares',
  'Parcerias com startups e universidades para novos modais',
  'Investimentos em energia limpa e biocombustíveis para a frota',
  'Projetos piloto de veículos autônomos e elétricos',
  'Plataformas digitais que conectam colaboradores, clientes e motoristas',
  'KPIs de inovação alinhados à agenda ESG e ao planejamento estratégico'
];

export default function InnovationESGSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#101d39] via-[#14294a] to-[#0f1f3a] py-24 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Trans Gabardo - Framers produtora -5193.JPG"
          alt="Hub de inovação Gabardo"
          fill
          className="object-cover opacity-20"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/55 to-black/75" aria-hidden />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Agenda de inovação integrada
            </span>
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              Estruturamos um portfólio contínuo de inovação com governança dedicada, mapeamento de tendências e priorização de projetos de alto impacto operacional e ambiental.
            </p>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              className="space-y-3"
            >
              {innovationLevers.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/80 backdrop-blur"
                >
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative isolate flex h-[360px] items-center justify-center overflow-hidden rounded-[32px] border border-white/25 bg-white/10 shadow-[0_40px_90px_-60px_RGBA(4,12,24,0.55)] backdrop-blur"
          >
            <motion.div
              aria-hidden
              initial={{ rotate: -3, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-6 rounded-[26px] border border-white/18 bg-gradient-to-br from-white/15 via-transparent to-emerald-200/25"
            />
            <Image
              src="/images/Trans Gabardo - Framers produtora -5193.JPG"
              alt="Hub de inovação Gabardo"
              fill
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white">
              Labs de inovação Gabardo
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
