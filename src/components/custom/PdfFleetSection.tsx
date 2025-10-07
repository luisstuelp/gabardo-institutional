'use client';

import { motion } from 'framer-motion';

const nossaFrota = {
  title: 'Nossa Frota',
  vehicles: [
    { name: 'Caminhões', quantity: 1311 },
    { name: 'Carretas', quantity: 1061 },
    { name: 'Trucks', quantity: 17 },
    { name: 'Carretas Sider', quantity: 42 },
    { name: 'Plataformas', quantity: 39 },
    { name: 'Plataformas Sider', quantity: 6 },
  ],
  facts: [
    'Idade média dos equipamentos: 2,5 anos.',
    'Frota própria: 79%. Frota terceiros: 21%.',
    'Carretas cegonhas: 100% de propriedade da Transportes Gabardo.',
    '100% padronizada, logotipada e higienizada.',
    'Protocolos de qualidade conforme normas ISO 9001, 14001 e 39001.',
    'Possuímos oficinas dedicadas para manutenção preventiva e corretiva dos equipamentos.',
    'Todos os nossos equipamentos são vistoriados e inspecionados previamente para serem liberados para carregamento.',
  ],
};

const frotaCegonha = {
  title: 'Frota Cegonha',
  dimensions: [
    { name: 'Comprimento', nacional: '23.000mm', mercosul: '22.400mm' },
    { name: 'Altura Total', nacional: '4.950mm', mercosul: '4.380mm' },
    { name: 'Largura Total', nacional: '2.600mm', mercosul: '2.600mm' },
    { name: 'Peso Máximo (carga)', nacional: '33ton', mercosul: '33ton' },
  ],
  capacities: [
    { name: 'Hatch compacto', nacional: 11, mercosul: 10 },
    { name: 'Hatch médio', nacional: 11, mercosul: 10 },
    { name: 'Sedan', nacional: 10, mercosul: 9 },
    { name: 'Pick-up Compacta', nacional: 10, mercosul: 9 },
  ],
};

export default function PdfFleetSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{nossaFrota.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ul className="space-y-4">
              {nossaFrota.vehicles.map((vehicle) => (
                <li key={vehicle.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                  <span className="font-semibold">{vehicle.name}</span>
                  <span className="font-bold text-lg">{vehicle.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-4">
              {nossaFrota.facts.map((fact) => (
                <li key={fact} className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center my-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{frotaCegonha.title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Dimensões</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2"></th>
                  <th className="border-b-2 p-2">Nacional</th>
                  <th className="border-b-2 p-2">Mercosul</th>
                </tr>
              </thead>
              <tbody>
                {frotaCegonha.dimensions.map((dim) => (
                  <tr key={dim.name}>
                    <td className="border-b p-2 font-semibold">{dim.name}</td>
                    <td className="border-b p-2">{dim.nacional}</td>
                    <td className="border-b p-2">{dim.mercosul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Capacidade</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2"></th>
                  <th className="border-b-2 p-2">Nacional</th>
                  <th className="border-b-2 p-2">Mercosul</th>
                </tr>
              </thead>
              <tbody>
                {frotaCegonha.capacities.map((cap) => (
                  <tr key={cap.name}>
                    <td className="border-b p-2 font-semibold">{cap.name}</td>
                    <td className="border-b p-2">{cap.nacional}</td>
                    <td className="border-b p-2">{cap.mercosul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
