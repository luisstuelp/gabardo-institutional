export interface MediaArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
  featured?: boolean;
  author?: string;
}

export const mediaCategories = ['Todos', 'Expansão', 'Sustentabilidade', 'Tecnologia', 'Cultura', 'Parceiros'] as const;

export const mediaArticles: MediaArticle[] = [
  {
    id: '1',
    title: 'Na contramão, Transportes Gabardo investe em 300 caminhões pesados e projeta crescer 30% em 2025',
    excerpt: 'Mesmo em cenário econômico desafiador, a transportadora de veículos do RS reforça frota com caminhões VW 19.380 Constellation.',
    category: 'Expansão',
    date: '2025-09-15',
    readTime: '5 min',
    image: '/images/Trans Gabardo - Framers produtora -5437.JPG',
    url: 'https://transportemoderno.com.br/2025/09/15/na-contramao-transportes-gabardo-investe-em-300-caminhoes-pesados-e-projeta-crescer-30-em-2025/',
    featured: true,
    author: 'Transporte Moderno'
  },
  {
    id: '2',
    title: 'Transportes Gabardo recebe reconhecimento do SETCERGS por certificação inédita de Carbono Negativo',
    excerpt: 'Distinção foi entregue durante a 24ª TranspoSul. A Gabardo conquistou a certificação de primeira transportadora do mundo a se tornar Carbono Negativo.',
    category: 'Sustentabilidade',
    date: '2025-09-25',
    readTime: '4 min',
    image: '/images/Site-TranspoSul-Noticias-Interna-15-3-1024x452.png.webp',
    url: 'https://transposul.com/2025/09/25/transportes-gabardo-recebe-reconhecimento-do-setcergs-por-certificacao-inedita-de-carbono-negativo/',
    author: 'TranspoSul'
  },
  {
    id: '3',
    title: 'Transportes Gabardo transporta o Hyundai HB20 para a Argentina',
    excerpt: 'O primeiro lote de HB20 foi transportado pela Transportes Gabardo para a Argentina. Hyundai HB20 brasileiro chega com versão 1.6 hatch; exportação marca novo passo para o modelo líder no Mercosul.',
    category: 'Parceiros',
    date: '2025-01-10',
    readTime: '3 min',
    image: '/images/Captura-de-tela-2024-11-23-120740.webp',
    url: 'https://frotanews.com.br/transportes-gabardo-transporta-o-hyundai-hb20-para-a-argentina/',
    author: 'Frota News'
  },
  {
    id: '4',
    title: 'Sérgio Mário Gabardo: "Somos uma empresa carbono zero, aumentamos a qualidade das operações em uma gestão voltada para a sustentabilidade"',
    excerpt: 'Em 2023, a empresa comprou 300 caminhões Euro 6 – 150 da Volvo e 150 da Volkswagen – e diversificou os negócios com foco em sustentabilidade.',
    category: 'Sustentabilidade',
    date: '2023-03-30',
    readTime: '6 min',
    image: '/images/iso14001.jpg',
    url: 'https://transportemoderno.com.br/2023/03/30/sergio-mario-gabardo-proprietario-da-gabardo-transportes-de-veiculos-somos-uma-empresa-carbono-zero-aumentamos-a-qualidade-das-operacoes-em-uma-gestao-voltada-para-a-sustentabilidade/',
    author: 'Transporte Moderno'
  },
  {
    id: '5',
    title: 'Transportes Gabardo renova com VWCO',
    excerpt: 'Com frota que soma mais de setecentos caminhões Volkswagen, a Transportes Gabardo renova parte da garagem com 55 Constellation 19.360 para operações de cegonha.',
    category: 'Parceiros',
    date: '2019-02-13',
    readTime: '3 min',
    image: '/images/VW-Constellation-19.360-4x2.jpg',
    url: 'https://www.autoindustria.com.br/2019/02/13/transportes-gabardo-renova-com-vwco/',
    author: 'AutoIndústria'
  }
];

export function getSortedMediaArticles(): MediaArticle[] {
  return [...mediaArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedMediaArticle(): MediaArticle | undefined {
  return mediaArticles.find(article => article.featured) ?? getSortedMediaArticles()[0];
}

export function getRegularMediaArticles(): MediaArticle[] {
  const featured = getFeaturedMediaArticle();
  return getSortedMediaArticles().filter(article => article.id !== featured?.id);
}

export function getMediaArticlesByCategory(category: string): MediaArticle[] {
  if (category === 'Todos') {
    return getSortedMediaArticles();
  }

  return getSortedMediaArticles().filter(article => article.category === category);
}
