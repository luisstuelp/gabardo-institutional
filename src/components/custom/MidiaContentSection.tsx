'use client';

import { motion } from 'framer-motion';
import { FileText, Image, Video, Download, ExternalLink } from 'lucide-react';

interface MediaItem {
  name: string;
  format: string;
  size?: string;
  external?: string;
}

const mediaCategories = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Press Kit',
    description: 'Kit completo com informações institucionais, releases e dados corporativos',
    items: [
      { name: 'Apresentação Institucional', format: 'PDF', size: '2.4 MB' },
      { name: 'Release Corporativo', format: 'PDF', size: '850 KB' },
      { name: 'Dados e Números 2024', format: 'PDF', size: '1.2 MB' },
    ] as MediaItem[],
  },
  {
    icon: <Image className="w-8 h-8" />,
    title: 'Logos e Identidade Visual',
    description: 'Logotipos em diversos formatos e guia de aplicação da marca',
    items: [
      { name: 'Logo Principal (Cores)', format: 'PNG/SVG', size: '450 KB' },
      { name: 'Logo Monocromático', format: 'PNG/SVG', size: '320 KB' },
      { name: 'Manual da Marca', format: 'PDF', size: '5.8 MB' },
    ] as MediaItem[],
  },
  {
    icon: <Image className="w-8 h-8" />,
    title: 'Fotos Institucionais',
    description: 'Banco de imagens de alta resolução para uso editorial',
    items: [
      { name: 'Frota e Operações', format: 'ZIP', size: '45 MB' },
      { name: 'Infraestrutura', format: 'ZIP', size: '38 MB' },
      { name: 'Equipe e Cultura', format: 'ZIP', size: '28 MB' },
    ] as MediaItem[],
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Vídeos Institucionais',
    description: 'Conteúdo audiovisual sobre operações e valores da empresa',
    items: [
      { name: 'Vídeo Institucional 2024', format: 'Link', external: 'https://youtube.com' },
      { name: 'Tour Virtual Pátios', format: 'Link', external: 'https://youtube.com' },
      { name: 'Sustentabilidade Gabardo', format: 'Link', external: 'https://youtube.com' },
    ] as MediaItem[],
  },
];

const MidiaContentSection = () => {
  return (
    <section id="materiais" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block bg-gabardo-blue/10 text-gabardo-blue px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Materiais Disponíveis
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gabardo-blue mb-4">
            Download de Recursos
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Acesse nosso acervo de materiais institucionais para uso em publicações, reportagens e parcerias
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {mediaCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gabardo-light-blue/10 text-gabardo-blue rounded-xl">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gabardo-blue mb-2">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900 mb-1">{item.name}</p>
                      <p className="text-sm text-neutral-500">
                        {item.format} {item.size && `• ${item.size}`}
                      </p>
                    </div>
                    {item.external ? (
                      <a
                        href={item.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gabardo-blue hover:text-gabardo-light-blue transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-gabardo-blue hover:text-gabardo-light-blue transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 md:p-8 bg-gabardo-blue text-white rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Precisa de material personalizado?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Nossa equipe de comunicação pode preparar conteúdos específicos para sua publicação
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-white text-gabardo-blue px-8 py-3 rounded-full font-semibold uppercase tracking-wider transition-all hover:scale-105"
          >
            Entre em Contato
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MidiaContentSection;
