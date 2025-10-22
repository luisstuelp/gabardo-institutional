'use client';

import { motion } from 'framer-motion';
import { DottedMap } from '@/components/ui/dotted-map';

const operations = [
  {
    title: 'Cobertura nacional',
    kpi: 'Coordenação centralizada com parceiros homologados',
  },
  {
    title: 'Expertise em comércio intra-continental',
    kpi: 'Compliance aduaneiro 100% rastreado',
  },
  {
    title: 'Suporte multinacional 24/7',
    kpi: 'Atendimento regionalizado com gestão integrada',
  },
];

const latamMarkers = [
  { lat: -23.5505, lng: -46.6333, size: 1.0 }, // São Paulo
  { lat: -25.4284, lng: -49.2733, size: 0.9 }, // Curitiba
  { lat: -34.6037, lng: -58.3816, size: 0.95 }, // Buenos Aires
  { lat: -33.4489, lng: -70.6693, size: 0.9 }, // Santiago
  { lat: -34.9011, lng: -56.1645, size: 0.9 }, // Montevidéu
  { lat: -12.0464, lng: -77.0428, size: 0.85 }, // Lima
  { lat: -25.2637, lng: -57.5759, size: 0.85 }, // Assunção
];

const SobreInstitucionalOperationsSection = () => {
  return (
    <section aria-labelledby="cobertura-heading" className="relative overflow-hidden bg-neutral-50 py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-15%] top-24 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-[140px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-gabardo-blue">
              Cobertura regional
            </div>
            <h2 id="cobertura-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Atuamos em toda <span className="text-gabardo-blue">América Latina</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Expandimos nossa presença para os principais mercados latino-americanos. Mantemos governança unificada, parcerias estratégicas e equipes multiculturais preparadas para atender montadoras e grandes frotistas.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative h-[550px] w-full"
              role="img"
              aria-label="Mapa interativo mostrando cobertura Gabardo na América Latina"
            >
              <DottedMap
                className="h-full w-full text-gabardo-blue/60"
                markerColor="#38B6FF"
                markers={latamMarkers}
                mapSamples={6000}
                dotRadius={0.28}
                focusOnMarkers
                focusPadding={18}
                animateZoom
                zoomDuration={2.5}
                hideMarkers
              />
            </motion.div>
          </motion.div>

          <div className="relative mt-16 lg:mt-28">
            <div className="space-y-6 sm:space-y-8">
              {operations.map((operation, index) => (
                <motion.article
                  key={operation.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  className="group relative rounded-3xl border border-neutral-200 bg-white/90 p-6 sm:p-7 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-3 sm:gap-4 pl-0 sm:pl-12">
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.12, ease: 'easeOut' }}
                      className="absolute left-6 top-7 hidden h-3 w-3 rounded-full bg-gabardo-blue group-hover:scale-125 transition-transform duration-300 sm:block"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{operation.title}</h3>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gabardo-blue">
                      {operation.kpi}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOperationsSection;
