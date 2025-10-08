'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, MapPin } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Carlos Eduardo Silva',
    position: 'CEO & Fundador',
    department: 'Liderança Executiva',
    bio: 'Visionário por trás do Hub Plural, com mais de 15 anos de experiência em negócios e desenvolvimento urbano.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/carlos-silva',
      email: 'carlos@hubplural.com'
    },
    expertise: ['Empresarial', 'Inovação', 'Liderança']
  },
  {
    id: 'coo',
    name: 'Ana Paula Santos',
    position: 'COO',
    department: 'Operações',
    bio: 'Especialista em operações e gestão de múltiplas unidades, garantindo excelência em todos os nossos espaços.',
    image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    social: {
      linkedin: 'https://linkedin.com/in/ana-santos',
      email: 'ana@hubplural.com'
    },
    expertise: ['Gestão Operacional', 'Qualidade', 'Processos']
  },
  {
    id: 'cto',
    name: 'Rafael Lima',
    position: 'CTO',
    department: 'Tecnologia',
    bio: 'Responsável pela infraestrutura tecnológica e inovação digital que mantém nossos espaços na vanguarda.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/rafael-lima',
      email: 'rafael@hubplural.com'
    },
    expertise: ['Tecnologia', 'Inovação', 'Infraestrutura']
  },
  {
    id: 'community',
    name: 'Beatriz Oliveira',
    position: 'Diretora de Comunidade',
    department: 'Relacionamento',
    bio: 'Conecta pessoas e cria experiências únicas que fortalecem nossa comunidade de profissionais.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/beatriz-oliveira',
      email: 'beatriz@hubplural.com'
    },
    expertise: ['Community Building', 'Eventos', 'Networking']
  },
  {
    id: 'growth',
    name: 'Lucas Ferreira',
    position: 'Diretor de Crescimento',
    department: 'Expansão',
    bio: 'Lidera nossa estratégia de expansão e desenvolvimento de novos mercados no Nordeste.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/lucas-ferreira',
      email: 'lucas@hubplural.com'
    },
    expertise: ['Expansão', 'Novos Mercados', 'Estratégia']
  },
  {
    id: 'design',
    name: 'Mariana Costa',
    position: 'Diretora de Design',
    department: 'Criação',
    bio: 'Responsável pelo design e arquitetura dos nossos espaços, criando ambientes inspiradores e funcionais.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/mariana-costa',
      email: 'mariana@hubplural.com'
    },
    expertise: ['Arquitetura', 'UX Espacial']
  }
];

const AboutTeamSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading team...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Nossa Equipe
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Pessoas que fazem
            <br />
            <span className="text-neutral-600">A Diferença</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Conheça os profissionais apaixonados que trabalham todos os dias para criar 
            experiências extraordinárias e construir o futuro do trabalho colaborativo
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Social Links Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 flex space-x-3"
                  >
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 hover:bg-white transition-all duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {member.social.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-amber-500 hover:bg-white transition-all duration-300"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Department */}
                  <div className="text-xs font-medium text-amber-500 uppercase tracking-wide mb-2">
                    {member.department}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-wide mb-2">
                    {member.name}
                  </h3>

                  {/* Position */}
                  <div className="text-neutral-600 font-medium mb-4">
                    {member.position}
                  </div>

                  {/* Bio */}
                  <p className="text-neutral-600 font-light leading-relaxed text-sm mb-6">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium uppercase tracking-wide group-hover:bg-amber-100 group-hover:text-amber-700 transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-amber-400"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="bg-neutral-50 p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <MapPin className="w-12 h-12 text-amber-500 mx-auto" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wide mb-4">
              Faça Parte do Nosso Time
            </h3>
            
            <p className="text-neutral-600 font-light text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Estamos sempre em busca de pessoas talentosas e apaixonadas por inovação. 
              Se você quer fazer parte da revolução do trabalho colaborativo, venha conversar conosco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-400 text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-amber-300 transition-all duration-300"
              >
                Ver Vagas Abertas
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-neutral-300 text-neutral-700 px-8 py-4 font-bold uppercase tracking-wide hover:border-neutral-500 hover:text-neutral-900 transition-all duration-300"
              >
                Enviar Currículo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTeamSection; 