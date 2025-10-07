'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Agregado parceiro há 5 anos',
    quote:
      'Na Gabardo encontrei previsibilidade de cargas e uma equipe que me apoia em cada parada. Hoje administro minha frota com mais segurança e foco no crescimento.',
    image: '/images/co-04.jpg',
  },
  {
    name: 'Paula Campos',
    role: 'Motorista agregada',
    quote:
      'A estrutura que a Gabardo oferece me dá tranquilidade para cumprir as rotas e manter meu caminhão sempre em dia. A parceria é de verdade.',
    image: '/images/co-05.jpg',
  },
  {
    name: 'Rodrigo Lima',
    role: 'Empresário do transporte',
    quote:
      'A empresa traz profissionalismo e respeito à rotina dos agregados. Tenho acompanhamento próximo e oportunidades constantes para minha equipe.',
    image: '/images/co-06.png',
  },
];

const SejaAgregadoTestimonialsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Histórias de quem já está com a gente</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SejaAgregadoTestimonialsSection;
