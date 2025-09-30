'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'Aurora Logistics', logo: 'aurora-logistics-logo.svg', url: '#' },
  { name: 'Ford', logo: 'ford-logo.svg', url: '#' },
  { name: 'Islandsbanki', logo: 'islandsbanki-logo.svg', url: '#' },
  { name: 'JSL', logo: 'jsl-logo.svg', url: '#' },
  { name: 'Localiza', logo: 'localiza-logo.svg', url: '#' },
  { name: 'Memento Payments', logo: 'memento-payments-logo.svg', url: '#' },
  { name: 'Mercedes-Benz', logo: 'mercedes-benz-logo.svg', url: '#' },
  { name: 'Scania', logo: 'scania-logo.svg', url: '#' },
  { name: 'Skybridge Cargo', logo: 'skybridge-cargo-logo.svg', url: '#' },
  { name: 'Transglobal Partners', logo: 'transglobal-partners-logo.svg', url: '#' },
  { name: 'UPS', logo: 'ups-logo.svg', url: '#' },
  { name: 'Volkswagen', logo: 'volkswagen-logo.svg', url: '#' },
];

export default function PartnersSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Nossos Parceiros</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
          Temos orgulho de trabalhar com algumas das maiores empresas do mundo.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-8 items-center">
        {partners.map((partner, index) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative h-20 filter grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={`/images/clients/${partner.logo}`}
              alt={partner.name}
              fill
              className="object-contain"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}