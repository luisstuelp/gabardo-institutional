'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';

const MidiaContactSection = () => {
  return (
    <section id="contato" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block bg-gabardo-blue/10 text-gabardo-blue px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Assessoria de Imprensa
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gabardo-blue mb-4">
            Fale com Nossa Equipe
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Para entrevistas, solicitações especiais ou esclarecimentos, entre em contato com nossa assessoria de comunicação
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-gabardo-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-gabardo-blue" />
            </div>
            <h3 className="text-xl font-bold text-gabardo-blue mb-2">E-mail</h3>
            <p className="text-neutral-600 mb-4 text-sm">Assessoria de Imprensa</p>
            <a
              href="mailto:imprensa@transgabardo.com.br"
              className="text-gabardo-light-blue hover:text-gabardo-blue transition-colors font-medium"
            >
              imprensa@transgabardo.com.br
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-gabardo-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-gabardo-blue" />
            </div>
            <h3 className="text-xl font-bold text-gabardo-blue mb-2">Telefone</h3>
            <p className="text-neutral-600 mb-4 text-sm">Central de Comunicação</p>
            <a
              href="tel:+555133733000"
              className="text-gabardo-light-blue hover:text-gabardo-blue transition-colors font-medium"
            >
              +55 (51) 3373-3000
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 bg-gabardo-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gabardo-blue" />
            </div>
            <h3 className="text-xl font-bold text-gabardo-blue mb-2">Responsável</h3>
            <p className="text-neutral-600 mb-4 text-sm">Gerência de Comunicação</p>
            <p className="text-gabardo-blue font-medium">Gabardo Transportes</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 md:p-8 bg-neutral-50 rounded-2xl text-center max-w-3xl mx-auto border border-neutral-200"
        >
          <h3 className="text-xl font-bold text-gabardo-blue mb-3">Nota aos Jornalistas</h3>
          <p className="text-neutral-600 leading-relaxed">
            Todos os materiais disponibilizados nesta página são de uso livre para fins editoriais e jornalísticos.
            Solicitamos apenas a citação da fonte: <span className="font-semibold text-gabardo-blue">Gabardo Transportes</span>.
            Para uso comercial ou outras finalidades, favor entrar em contato previamente.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MidiaContactSection;
