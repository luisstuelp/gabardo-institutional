'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';

// Gabardo Transportadora contact information
const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Telefone',
    primary: '(11) 3456-7890',
    secondary: 'Central de atendimento',
    action: 'tel:+551134567890'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'E-mail',
    primary: 'contato@gabardotransportadora.com.br',
    secondary: 'Resposta em até 24h',
    action: 'mailto:contato@gabardotransportadora.com.br'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Matriz',
    primary: 'São Paulo - SP',
    secondary: 'Múltiplas unidades no Brasil',
    action: 'https://maps.google.com?q=São+Paulo+SP'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Horário',
    primary: 'Seg-Sex: 8h às 18h',
    secondary: 'Sáb: 8h às 12h',
    action: null
  }
];

export default function ContactInfoSection() {
  const handleContactClick = (action: string | null) => {
    if (!action) return;
    
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      window.location.href = action;
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm font-light tracking-[0.3em] text-neutral-500 mb-4 md:mb-6 uppercase"
          >
            Informações de Contato
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight font-primary"
          >
            Fale com a
            <br />
            <span style={{color: '#38B6FF'}}>Gabardo Transportadora</span>
          </motion.h2>
        </motion.div>

        {/* Professional Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-white p-6 md:p-8 shadow-sm hover:shadow-lg active:shadow-md transition-all duration-300 border-l-4 border-neutral-200 hover:border-gabardo-light-blue ${
                info.action ? 'cursor-pointer touch-manipulation' : ''
              }`}
              onClick={() => handleContactClick(info.action)}
              role={info.action ? 'button' : 'div'}
              tabIndex={info.action ? 0 : undefined}
              onKeyDown={(e) => {
                if (info.action && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleContactClick(info.action);
                }
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 md:w-16 md:h-16 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 md:mb-6 text-neutral-700 group-hover:bg-gabardo-light-blue group-hover:text-white transition-all duration-300"
              >
                {info.icon}
              </motion.div>
              
              <h3 className="text-lg md:text-xl font-bold text-black uppercase tracking-wide mb-2 md:mb-3 group-hover:text-gabardo-light-blue transition-colors duration-300 font-primary">
                {info.title}
              </h3>
              
              <p className="text-base md:text-lg text-neutral-700 font-medium mb-2 break-words font-primary">
                {info.primary}
              </p>
              
              <p className="text-sm text-neutral-500 font-light mb-3 md:mb-4 font-secondary">
                {info.secondary}
              </p>

              {info.action && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-neutral-600 text-xs sm:text-sm font-medium uppercase tracking-wide opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                >
                  <span className="mr-2">
                    {info.action.startsWith('http') ? 'Abrir' : 'Contatar'}
                  </span>
                  {info.action.startsWith('http') ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 