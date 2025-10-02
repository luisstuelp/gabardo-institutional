'use client';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sérgio Mário Gabardo',
    role: 'Fundador e CEO',
    bio: 'Com mais de 36 anos de experiência no setor de transportes, Sérgio lidera a Gabardo com paixão e visão de futuro.',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Ricardo Gabardo',
    role: 'Diretor de Operações',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Fernanda Gabardo',
    role: 'Diretora de RH',
    bio: 'Focada em atrair e reter os melhores talentos, Fernanda cuida do maior ativo da empresa: nossa gente.',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Carlos Alberto',
    role: 'Gerente de Logística',
    bio: 'Com um olhar estratégico, Carlos otimiza rotas e processos para garantir entregas rápidas e seguras.',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Ana Paula',
    role: 'Gerente Financeira',
    bio: 'Ana Paula gerencia as finanças da empresa com precisão e transparência, garantindo a saúde financeira da Gabardo.',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Roberto Silva',
    role: 'Gerente de TI',
    bio: 'Líder da inovação tecnológica, Roberto implementa as soluções que mantêm a Gabardo na vanguarda do setor.',
    social: { linkedin: '#', twitter: '#' },
  },
];

export default function TeamSection() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Nossa Equipe</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Conheça as pessoas que fazem a Gabardo acontecer.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group perspective-1000"
            >
              <div className="relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front of the card */}
                <div className="absolute w-full h-full bg-gray-50 rounded-xl shadow-lg overflow-hidden text-center p-8 backface-hidden">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-700">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-base text-gray-600">{member.role}</p>
                </div>
                {/* Back of the card */}
                <div className="absolute w-full h-full bg-blue-600 text-white rounded-xl shadow-lg overflow-hidden text-center p-8 rotate-y-180 backface-hidden">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-2 text-sm text-blue-100">{member.bio}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}