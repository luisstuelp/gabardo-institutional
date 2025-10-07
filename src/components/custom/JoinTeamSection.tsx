'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function JoinTeamSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
        >
          Faça Parte da Nossa Equipe
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600"
        >
          Estamos sempre em busca de novos talentos para se juntar à nossa equipe. Se você é apaixonado por logística e inovação, venha fazer parte da Gabardo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            href="/trabalhe-conosco"
            className="inline-block bg-gabardo-blue text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 hover:bg-gabardo-blue/90"
          >
            Trabalhe Conosco
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
