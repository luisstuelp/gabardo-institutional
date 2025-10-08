'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Sérgio Mário Gabardo',
    role: 'Fundador e Diretor',
    image: '/images/team/sergio-mario-gabardo.jpg',
  },
  {
    name: 'Ricardo Gabardo',
    role: 'Diretor de Operações',
    image: '/images/team/ricardo-gabardo.jpg',
  },
  {
    name: 'Fernanda Gabardo',
    role: 'Diretora Financeira',
    image: '/images/team/fernanda-gabardo.jpg',
  },
  {
    name: 'João da Silva',
    role: 'Gerente de Logística',
    image: '/images/team/joao-da-silva.jpg',
  },
  {
    name: 'Maria Oliveira',
    role: 'Gerente de RH',
    image: '/images/team/maria-oliveira.jpg',
  },
  {
    name: 'Carlos Pereira',
    role: 'Gerente de TI',
    image: '/images/team/carlos-pereira.jpg',
  },
];

const TeamMembersSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Nossa Liderança</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Conheça os líderes que guiam a nossa empresa para o futuro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6">{member.name}</h3>
              <p className="text-md text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection;
