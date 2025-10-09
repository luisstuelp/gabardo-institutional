'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ClimateChangeSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight text-gabardo-blue mb-6"
            >
              Carbono Negativo na prática
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 font-light leading-relaxed"
            >
              A Transportes Gabardo alcançou, em 2024, um feito histórico no setor logístico: se tornou a primeira transportadora no mundo a atingir o status de carbono negativo. Este marco é resultado de um esforço contínuo desde 2017, quando a empresa começou a realizar seus inventários de emissões de gases de efeito estufa (GEE), com o objetivo de medir e reduzir seu impacto ambiental.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 text-lg text-gray-600 font-light leading-relaxed"
            >
              Em 2024, a Gabardo obteve um saldo negativo de -23.890,90 tCO₂e, removendo mais carbono da atmosfera do que emitiu. Com um inventário de 57.884,58 tCO₂e e um total de carbono equivalente disponível de 81.775,48 tCO₂e, a empresa lidera a transição do setor logístico para um modelo mais sustentável e responsável. Este marco foi oficialmente reconhecido em 2025, com a certificação de carbono negativo emitida pela Worton ESG, consolidando o monitoramento contínuo das emissões, a compensação efetiva e a implementação de projetos de captura de CO₂ que vão além da neutralização.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <Image
              src="/images/Design sem nome (51).png"
              alt="Certificação de carbono negativo da Transportes Gabardo"
              width={720}
              height={480}
              className="w-full max-w-xl h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
