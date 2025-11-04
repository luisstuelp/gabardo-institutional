'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const easgItems = [
  "Mudanças climáticas e gestão de resíduos",
  "Relacionamento com o cliente",
  "Governança corporativa e conformidade",
  "Impactos em comunidades e investimento social",
  "Segurança e integridade das pessoas e dos ativos",
  "Desenvolvimento de gente e respeito à diversidade",
  "Valorização do motorista caminhoneiro",
  "Desempenho econômico/financeiro e expansão dos negócios",
  "Inovação Tecnológica"
];

export default function ESGSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gray-800 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/Imagem1.png"
          alt="ESG"
          fill
          className="object-cover opacity-30"
          priority={false}
        />
      </div>
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-black/50 p-8 rounded-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold uppercase text-white mb-6"
            >
              ESG
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-200 font-light leading-relaxed mb-6"
            >
              Para implementar nossa estratégia de Sustentabilidade, contamos com uma estrutura de governança consolidada e temos atuado em programas e projetos que trazem sinergia com nossa materialidade que elenca temas relevantes considerando as expectativas de nossos stakeholders.
            </motion.p>
            <ul className="space-y-2">
              {easgItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="text-gabardo-light-blue mr-2">&#10003;</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            {/* Empty div for spacing */}
          </div>
        </div>
      </div>
    </section>
  );
}
