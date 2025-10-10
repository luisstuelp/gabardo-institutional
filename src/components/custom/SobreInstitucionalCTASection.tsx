'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SobreInstitucionalCTASection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fale com nossa equipe institucional</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Estamos prontos para apresentar nossa estrutura, governança e soluções customizadas para o seu negócio.
          </p>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Entrar em contato
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreInstitucionalCTASection;
