'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const JoinTeamSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Faça Parte da Nossa Equipe</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos sempre em busca de novos talentos para se juntar à nossa equipe. Se você é apaixonado por logística e quer fazer parte de uma empresa que não para de crescer, confira nossas vagas em aberto.
          </p>
          <div className="mt-8">
            <Link href="/trabalhe-conosco" className="inline-block bg-gabardo-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-gabardo-light-blue transition-colors">
              Ver Vagas
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinTeamSection;