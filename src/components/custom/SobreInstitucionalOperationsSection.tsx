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
    <section className="relative overflow-hidden bg-neutral-50 py-16 sm:py-20 md:py-24 lg:py-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-24 h-72 w-72 rounded-full bg-gabardo-blue/10 blur-[140px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.38em] text-gabardo-blue">Cobertura regional</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Atuamos em toda América Latina
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Expandimos nossa presença para os principais mercados latino-americanos. Mantemos governança unificada, parcerias estratégicas e equipes multiculturais preparadas para atender montadoras e grandes frotistas.
            </p>
            <div className="relative h-[550px] w-full overflow-hidden rounded-3xl">
              <DottedMap
                className="h-full w-full text-gabardo-blue/60"
                markerColor="#4BABFF"
                markers={latamMarkers}
                mapSamples={6000}
                dotRadius={0.28}
                focusOnMarkers
                focusPadding={18}
                animateZoom
                zoomDuration={2.5}
                hideMarkers
              />
            </div>
          </motion.div>

          <div className="relative mt-16 lg:mt-28">
            <div className="space-y-8">
              {operations.map((operation, index) => (
                <motion.div
                  key={operation.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-3 pl-0 sm:pl-12">
                    <motion.span
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 36 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                      className="absolute left-0 top-6 hidden h-3 w-3 rounded-full bg-gabardo-blue sm:block"
                    />
                    <h3 className="text-xl font-semibold text-gray-900">{operation.title}</h3>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gabardo-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gabardo-blue">
                      {operation.kpi}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreInstitucionalOperationsSection;
