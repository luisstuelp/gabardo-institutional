export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContent[];
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
  tags: string[];
  seo: {
    description: string;
    keywords: string[];
  };
}

export interface BlogContent {
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list' | 'divider' | 'highlight';
  content: string;
  level?: number; // for headings
  items?: string[]; // for lists
  author?: string; // for quotes
  alt?: string; // for images
}

export const blogPosts: BlogPost[] = [
  {
    id: '10',
    slug: 'futuro-mobilidade-urbana-transporte',
    title: 'O Futuro da Mobilidade Urbana e o Papel do Transporte',
    excerpt: 'Como as mudanças na mobilidade urbana estão impactando o setor de transporte de veículos e criando novas oportunidades.',
    content: [
      {
        type: 'paragraph',
        content: 'As cidades estão se transformando. Novos modelos de mobilidade, veículos elétricos e mudanças nos hábitos de consumo estão redefinindo não apenas como nos movemos, mas como o transporte de veículos se adapta a essa nova realidade.'
      },
      {
        type: 'heading',
        content: 'A Era dos Veículos Elétricos',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'O transporte de veículos elétricos requer cuidados específicos, desde o manuseio das baterias até procedimentos de segurança diferenciados. Estamos nos preparando para essa transição.'
      },
      {
        type: 'list',
        content: 'Adaptações para veículos elétricos:',
        items: [
          'Treinamento específico para manuseio de baterias',
          'Equipamentos de segurança especializados',
          'Protocolos para veículos em diferentes níveis de carga',
          'Infraestrutura de carregamento nos pátios',
          'Parceria com montadoras de EVs'
        ]
      },
      {
        type: 'heading',
        content: 'Novos Modelos de Negócio',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A economia compartilhada e novos modelos de propriedade de veículos estão criando demandas diferentes para o transporte, exigindo mais flexibilidade e rapidez nas operações.'
      },
      {
        type: 'quote',
        content: 'O futuro da mobilidade urbana não é apenas sobre novos veículos, mas sobre repensar completamente como eles se movem pela cadeia logística.',
        author: 'Analista de Mercado Gabardo'
      },
      {
        type: 'highlight',
        content: 'A Gabardo está investindo em tecnologia e treinamento para estar preparada para o futuro da mobilidade, seja ela elétrica, autônoma ou compartilhada.'
      }
    ],
    category: 'Inovação',
    date: '12 Jan 2025',
    readTime: '7 min',
    author: 'Pedro Almeida',
    image: '/images/gabardo-truck-fleet.JPG',
    featured: true,
    tags: ['mobilidade urbana', 'veículos elétricos', 'futuro', 'inovação'],
    seo: {
      description: 'Explore como o futuro da mobilidade urbana está transformando o setor de transporte de veículos.',
      keywords: ['mobilidade urbana', 'veículos elétricos', 'futuro transporte', 'inovação automotiva']
    }
  },
  {
    id: '1',
    slug: 'futuro-trabalho-hibrido-2025',
    title: 'O Futuro do Trabalho Híbrido: Tendências para 2025',
    excerpt: 'Explore como o modelo híbrido está revolucionando o mercado de trabalho e transformando a cultura empresarial moderna.',
    content: [
      {
        type: 'paragraph',
        content: 'O mundo do trabalho passou por uma transformação sem precedentes nos últimos anos. O que começou como uma adaptação emergencial durante a pandemia evoluiu para uma revolução estrutural que está redefinindo como, onde e quando trabalhamos.'
      },
      {
        type: 'heading',
        content: 'A Nova Realidade Híbrida',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'O modelo híbrido não é mais uma tendência - é a nova realidade. Empresas de todos os tamanhos estão descobrindo que a flexibilidade não apenas aumenta a satisfação dos funcionários, mas também impulsiona a produtividade e a inovação.'
      },
      {
        type: 'quote',
        content: 'A flexibilidade tornou-se o novo salário. Os profissionais valorizam mais a autonomia para escolher onde e como trabalhar do que benefícios tradicionais.',
        author: 'Estudo Global de Tendências de Trabalho 2024'
      },
      {
        type: 'heading',
        content: 'Impactos na Cultura Empresarial',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'As organizações estão repensando fundamentalmente seus valores e práticas. A cultura empresarial agora precisa transcender barreiras físicas e criar conexões genuínas em ambientes distribuídos.'
      },
      {
        type: 'list',
        content: 'Principais mudanças observadas:',
        items: [
          'Comunicação mais intencional e estruturada',
          'Foco em resultados ao invés de horas trabalhadas',
          'Investimento em tecnologia colaborativa',
          'Redefinição dos espaços físicos de trabalho',
          'Programas de bem-estar mental e físico'
        ]
      },
      {
        type: 'heading',
        content: 'O Papel dos Espaços de Coworking',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Neste cenário, os espaços de coworking emergem como protagonistas. Eles oferecem a flexibilidade que os profissionais desejam com a infraestrutura e o senso de comunidade que o trabalho remoto não consegue proporcionar.'
      },
      {
        type: 'highlight',
        content: 'O Hub Plural entende essa nova dinâmica e oferece soluções que se adaptam às necessidades específicas de cada profissional e empresa, criando um ecossistema onde a inovação floresce naturalmente.'
      },
      {
        type: 'heading',
        content: 'Tendências para 2025',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Olhando para o futuro próximo, algumas tendências já se desenham no horizonte do trabalho híbrido:'
      },
      {
        type: 'paragraph',
        content: '**Personalização Extrema**: Cada profissional terá seu próprio "blueprint" de trabalho, com horários, locais e ferramentas completamente customizados às suas necessidades e preferências.'
      },
      {
        type: 'paragraph',
        content: '**Tecnologia Imersiva**: Realidade virtual e aumentada começarão a criar experiências de colaboração que simulam a presença física, eliminando as barreiras da distância.'
      },
      {
        type: 'paragraph',
        content: '**Sustentabilidade Integrada**: A redução de deslocamentos e o compartilhamento de espaços contribuirão significativamente para objetivos de sustentabilidade corporativa.'
      }
    ],
    category: 'Futuro do Trabalho',
    date: '15 Jan 2025',
    readTime: '8 min',
    author: 'Dr. Ana Silva',
    image: '/images/Trans Gabardo - Framers produtora -5337.JPG',
    featured: true,
    tags: ['trabalho híbrido', 'futuro', 'cultura empresarial', 'produtividade'],
    seo: {
      description: 'Descubra as principais tendências do trabalho híbrido para 2025 e como elas estão transformando a cultura empresarial moderna.',
      keywords: ['trabalho híbrido', 'futuro do trabalho', 'cultura empresarial', 'coworking', 'produtividade']
    }
  },
  {
    id: '11',
    slug: 'tecnologia-rastreamento-transparencia-total',
    title: 'Rastreamento Avançado: Transparência Total no Transporte',
    excerpt: 'Como nossa tecnologia de rastreamento oferece visibilidade completa do seu veículo durante todo o processo de transporte.',
    content: [
      {
        type: 'paragraph',
        content: 'A ansiedade de não saber onde está seu veículo durante o transporte é coisa do passado. Nossa tecnologia de rastreamento oferece transparência total, permitindo acompanhar cada etapa da jornada em tempo real.'
      },
      {
        type: 'heading',
        content: 'Tecnologia Multi-Modal',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Combinamos GPS, sensores IoT e comunicação 4G/5G para criar um sistema de monitoramento que funciona em qualquer lugar do território nacional, mesmo em áreas de cobertura limitada.'
      },
      {
        type: 'list',
        content: 'Recursos do sistema de rastreamento:',
        items: [
          'Localização GPS em tempo real',
          'Sensores de movimento e impacto',
          'Monitoramento de temperatura e umidade',
          'Câmeras de segurança integradas',
          'Alertas automáticos para eventos críticos'
        ]
      },
      {
        type: 'heading',
        content: 'Portal do Cliente',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Através do nosso portal exclusivo, você acompanha não apenas a localização, mas também recebe atualizações sobre carregamento, descarregamento e estimativas de entrega atualizadas automaticamente.'
      },
      {
        type: 'quote',
        content: 'Transparência gera confiança. Quando o cliente pode acompanhar seu veículo em tempo real, a ansiedade se transforma em satisfação.',
        author: 'Gerente de TI Gabardo'
      },
      {
        type: 'highlight',
        content: 'Mais de 98% dos nossos clientes utilizam ativamente o portal de rastreamento, demonstrando o valor da transparência no transporte.'
      }
    ],
    category: 'Tecnologia',
    date: '10 Jan 2025',
    readTime: '5 min',
    author: 'Lucas Martins',
    image: '/images/Trans Gabardo - Framers produtora -5313.JPG',
    featured: false,
    tags: ['rastreamento', 'tecnologia', 'transparência', 'monitoramento'],
    seo: {
      description: 'Conheça a tecnologia de rastreamento avançado que oferece transparência total no transporte de veículos.',
      keywords: ['rastreamento veículos', 'GPS transporte', 'monitoramento tempo real', 'transparência logística']
    }
  },

  {
    id: '12',
    slug: 'seguros-transporte-protecao-completa',
    title: 'Seguros no Transporte: Proteção Completa para seu Patrimônio',
    excerpt: 'Entenda como funcionam os seguros no transporte de veículos e por que a cobertura adequada é fundamental.',
    content: [
      {
        type: 'paragraph',
        content: 'O seguro no transporte de veículos não é apenas uma exigência legal - é a garantia de que seu patrimônio está protegido contra qualquer eventualidade durante a jornada. Entenda como funciona essa proteção.'
      },
      {
        type: 'heading',
        content: 'Tipos de Cobertura',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Oferecemos diferentes níveis de cobertura, desde a básica exigida por lei até coberturas premium que incluem proteção contra eventos específicos como fenômenos da natureza.'
      },
      {
        type: 'list',
        content: 'Coberturas disponíveis:',
        items: [
          'Cobertura básica contra acidentes de trânsito',
          'Proteção contra roubo e furto',
          'Cobertura para fenômenos da natureza',
          'Proteção contra atos de vandalismo',
          'Seguro premium com valor declarado'
        ]
      },
      {
        type: 'heading',
        content: 'Processo de Sinistro',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Nosso processo de sinistro é transparente e ágil. Temos uma equipe dedicada que acompanha cada caso desde a abertura até a resolução final, garantindo rapidez e justiça no processo.'
      },
      {
        type: 'quote',
        content: 'A tranquilidade do cliente começa na contratação de um seguro adequado e se consolida na eficiência do atendimento em caso de sinistro.',
        author: 'Gerente de Seguros Gabardo'
      },
      {
        type: 'highlight',
        content: 'Em 15 anos de operação, a Gabardo mantém um índice de resolução de sinistros superior a 95% em menos de 30 dias.'
      }
    ],
    category: 'Segurança',
    date: '08 Jan 2025',
    readTime: '6 min',
    author: 'Mariana Lima',
    image: '/images/Trans Gabardo - Framers produtora -5301.JPG',
    featured: false,
    tags: ['seguros', 'proteção', 'segurança', 'cobertura'],
    seo: {
      description: 'Saiba tudo sobre seguros no transporte de veículos e como proteger adequadamente seu patrimônio.',
      keywords: ['seguro transporte veículos', 'cobertura transporte', 'proteção patrimônio', 'sinistro veículos']
    }
  },
  {
    id: '3',
    slug: 'sustentabilidade-espacos-trabalho-conscientes',
    title: 'Sustentabilidade e Espaços de Trabalho Conscientes',
    excerpt: 'Como construir ambientes de trabalho que respeitam o meio ambiente e promovem bem-estar corporativo.',
    content: [
      {
        type: 'paragraph',
        content: 'A sustentabilidade deixou de ser um diferencial para se tornar uma necessidade urgente. No mundo corporativo, isso significa repensar não apenas processos, mas também os espaços onde trabalhamos.'
      },
      {
        type: 'heading',
        content: 'O Impacto dos Espaços Tradicionais',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Escritórios tradicionais consomem recursos de forma ineficiente: energia para espaços subutilizados, materiais para reformas constantes, e combustível para deslocamentos desnecessários.'
      },
      {
        type: 'quote',
        content: 'Cada metro quadrado de escritório tradicional gera uma pegada de carbono 40% maior que espaços compartilhados otimizados.',
        author: 'Relatório de Sustentabilidade Corporativa 2024'
      },
      {
        type: 'heading',
        content: 'A Revolução dos Espaços Conscientes',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Os espaços de coworking representam uma abordagem mais sustentável ao trabalho, otimizando recursos através do compartilhamento inteligente.'
      },
      {
        type: 'list',
        content: 'Benefícios ambientais do coworking:',
        items: [
          'Otimização do uso de energia e recursos',
          'Redução de deslocamentos urbanos',
          'Compartilhamento de equipamentos e infraestrutura',
          'Menor geração de resíduos por profissional',
          'Fomento ao transporte público e mobilidade sustentável'
        ]
      },
      {
        type: 'heading',
        content: 'Bem-estar e Sustentabilidade',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Espaços sustentáveis não beneficiam apenas o meio ambiente - eles criam ambientes mais saudáveis e produtivos para as pessoas que os utilizam.'
      },
      {
        type: 'highlight',
        content: 'No Hub Plural, integramos práticas sustentáveis que resultam em ambientes mais saudáveis: ventilação natural, plantas que purificam o ar, materiais não-tóxicos e sistemas de energia eficiente.'
      }
    ],
    category: 'Inovação',
    date: '10 Jan 2025',
    readTime: '5 min',
    author: 'Maria Costa',
    image: '/images/Trans Gabardo - Framers produtora -5435.JPG',
    featured: false,
    tags: ['sustentabilidade', 'meio ambiente', 'bem-estar', 'eficiência'],
    seo: {
      description: 'Explore como criar espaços de trabalho sustentáveis que beneficiam tanto o meio ambiente quanto o bem-estar dos profissionais.',
      keywords: ['sustentabilidade', 'espaços conscientes', 'bem-estar corporativo', 'meio ambiente']
    }
  },
  {
    id: '4',
    slug: 'tecnologia-produtividade-nova-era',
    title: 'Tecnologia e Produtividade: A Nova Era',
    excerpt: 'Ferramentas e tecnologias que estão transformando a forma como trabalhamos e nos conectamos.',
    content: [
      {
        type: 'paragraph',
        content: 'A tecnologia está redefinindo os limites da produtividade humana. Não se trata mais apenas de automatizar tarefas, mas de amplificar capacidades e criar novas possibilidades de colaboração.'
      },
      {
        type: 'heading',
        content: 'Inteligência Artificial como Parceira',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A IA está se tornando uma extensão natural de nossas capacidades cognitivas, não para nos substituir, mas para nos liberar de tarefas repetitivas e nos permitir focar no que realmente importa: criatividade, estratégia e relacionamentos.'
      },
      {
        type: 'quote',
        content: 'A verdadeira revolução da IA não está em substituir humanos, mas em potencializar o que fazemos de melhor: pensar, criar e conectar.',
        author: 'Especialista em Transformação Digital'
      },
      {
        type: 'heading',
        content: 'Ferramentas de Colaboração Híbrida',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'As ferramentas modernas estão eliminando as barreiras entre trabalho presencial e remoto, criando experiências fluidas que mantêm equipes conectadas independentemente da localização.'
      },
      {
        type: 'list',
        content: 'Tecnologias que estão transformando o trabalho:',
        items: [
          'Plataformas de colaboração em tempo real',
          'Realidade virtual para reuniões imersivas',
          'IA para automação de processos',
          'Analytics preditivos para tomada de decisão',
          'IoT para otimização de espaços físicos'
        ]
      },
      {
        type: 'heading',
        content: 'O Futuro da Produtividade',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Estamos caminhando para uma era onde a tecnologia não apenas nos ajuda a trabalhar melhor, mas a redefinir completamente o que significa ser produtivo.'
      },
      {
        type: 'highlight',
        content: 'No Hub Plural, investimos constantemente em tecnologias que potencializam a produtividade de nossa comunidade, desde sistemas de reserva inteligentes até plataformas de networking digital.'
      }
    ],
    category: 'Inovação',
    date: '08 Jan 2025',
    readTime: '7 min',
    author: 'Carlos Ferreira',
    image: '/images/Trans Gabardo - Framers produtora -5566.JPG',
    featured: false,
    tags: ['tecnologia', 'produtividade', 'inteligência artificial', 'inovação'],
    seo: {
      description: 'Descubra as tecnologias que estão revolucionando a produtividade e transformando a forma como trabalhamos.',
      keywords: ['tecnologia', 'produtividade', 'inteligência artificial', 'transformação digital']
    }
  },
  {
    id: '9',
    slug: 'sustentabilidade-transporte-verde',
    title: 'Transporte Verde: Como Reduzimos Nosso Impacto Ambiental',
    excerpt: 'As práticas sustentáveis que implementamos para tornar o transporte de veículos mais ecológico e responsável.',
    content: [
      {
        type: 'paragraph',
        content: 'A sustentabilidade no transporte de veículos é uma responsabilidade que levamos a sério. Através de tecnologia e processos otimizados, conseguimos reduzir significativamente nosso impacto ambiental.'
      },
      {
        type: 'heading',
        content: 'Otimização da Capacidade de Carga',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Nossos algoritmos maximizam a utilização do espaço em cada carregador, reduzindo o número de viagens necessárias e consequentemente as emissões de CO2.'
      },
      {
        type: 'list',
        content: 'Iniciativas sustentáveis:',
        items: [
          'Otimização de rotas por IA para redução de combustível',
          'Maximização da capacidade de carga dos carregadores',
          'Manutenção preventiva para eficiência dos veículos',
          'Investimento em tecnologias mais limpas',
          'Programas de compensação de carbono'
        ]
      },
      {
        type: 'quote',
        content: 'Cada rota otimizada, cada carregador com capacidade máxima utilizada é um passo em direção a um transporte mais sustentável.',
        author: 'Diretor de Sustentabilidade Gabardo'
      },
      {
        type: 'highlight',
        content: 'Nos últimos dois anos, a Gabardo reduziu em 25% suas emissões de CO2 por veículo transportado através de práticas sustentáveis.'
      }
    ],
    category: 'Sustentabilidade',
    date: '14 Jan 2025',
    readTime: '6 min',
    author: 'Clara Santos',
    image: '/images/Trans Gabardo - Framers produtora -5575.JPG',
    featured: false,
    tags: ['sustentabilidade', 'meio ambiente', 'transporte verde', 'eficiência'],
    seo: {
      description: 'Descubra as práticas sustentáveis da Gabardo para um transporte de veículos mais ecológico.',
      keywords: ['transporte sustentável', 'logística verde', 'redução CO2', 'sustentabilidade automotiva']
    }
  },
  {
    id: '5',
    slug: 'revolucao-transporte-veiculos-2025',
    title: 'A Revolução no Transporte de Veículos: Tendências 2025',
    excerpt: 'Descubra como a tecnologia está transformando o transporte de veículos, tornando-o mais seguro, eficiente e sustentável.',
    content: [
      {
        type: 'paragraph',
        content: 'O setor de transporte de veículos está passando por uma transformação radical. Novas tecnologias, regulamentações mais rigorosas e demandas por sustentabilidade estão redefinindo como transportamos veículos pelo país.'
      },
      {
        type: 'heading',
        content: 'Tecnologia Embarcada: O Novo Padrão',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Sistemas de rastreamento GPS, sensores de impacto e monitoramento em tempo real não são mais diferenciais - são requisitos básicos para operações modernas de transporte de veículos.'
      },
      {
        type: 'quote',
        content: 'A transparência total no transporte de veículos não é apenas uma vantagem competitiva, é uma expectativa do cliente moderno.',
        author: 'Gabardo'
      },
      {
        type: 'list',
        content: 'Principais inovações tecnológicas:',
        items: [
          'Rastreamento GPS com atualização em tempo real',
          'Sensores de impacto e vibração',
          'Câmeras de segurança integradas',
          'Sistemas de alerta automático',
          'Plataformas de comunicação cliente-transportadora'
        ]
      },
      {
        type: 'heading',
        content: 'Sustentabilidade na Logística',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A otimização de rotas usando inteligência artificial não apenas reduz custos operacionais, mas também diminui significativamente a pegada de carbono do transporte de veículos.'
      },
      {
        type: 'highlight',
        content: 'A Gabardo investe continuamente em tecnologias que reduzem o impacto ambiental, como otimização de rotas por IA e veículos mais eficientes em combustível.'
      }
    ],
    category: 'Transporte de Veículos',
    date: '22 Jan 2025',
    readTime: '7 min',
    author: 'Equipe Gabardo',
    image: '/images/Trans Gabardo - Framers produtora -5412.JPG',
    featured: true,
    tags: ['transporte de veículos', 'tecnologia', 'inovação', 'sustentabilidade'],
    seo: {
      description: 'Conheça as principais tendências tecnológicas que estão revolucionando o transporte de veículos em 2025.',
      keywords: ['transporte de veículos', 'tecnologia automotiva', 'logística', 'rastreamento GPS']
    }
  },
  {
    id: '6',
    slug: 'seguranca-transporte-veiculos-protocolos',
    title: 'Segurança no Transporte: Protocolos que Fazem a Diferença',
    excerpt: 'Os protocolos de segurança que garantem a proteção total dos seus veículos durante todo o processo de transporte.',
    content: [
      {
        type: 'paragraph',
        content: 'A segurança no transporte de veículos vai muito além de amarrar bem a carga. É um sistema integrado de protocolos, tecnologia e treinamento que garante que cada veículo chegue ao destino nas mesmas condições em que foi coletado.'
      },
      {
        type: 'heading',
        content: 'Inspeção Pré-Transporte',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Cada veículo passa por uma inspeção detalhada antes do carregamento, documentando qualquer avaria pré-existente e garantindo que esteja em condições adequadas para o transporte.'
      },
      {
        type: 'list',
        content: 'Itens verificados na inspeção:',
        items: [
          'Condições da pintura e carroceria',
          'Funcionamento de luzes e sistemas elétricos',
          'Estado dos pneus e pressão',
          'Nível de combustível e fluidos',
          'Documentação e chaves'
        ]
      },
      {
        type: 'heading',
        content: 'Sistemas de Fixação Avançados',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Utilizamos sistemas de fixação específicos para cada tipo de veículo, desde carros de passeio até veículos comerciais, garantindo estabilidade e proteção durante o transporte.'
      },
      {
        type: 'quote',
        content: 'Não existe transporte 100% seguro sem o protocolo correto. Cada detalhe importa quando se trata da proteção do patrimônio do cliente.',
        author: 'Supervisor de Operações Gabardo'
      },
      {
        type: 'highlight',
        content: 'A Gabardo mantém certificações ISO 9001 e investe constantemente no treinamento de sua equipe para garantir os mais altos padrões de segurança no transporte.'
      }
    ],
    category: 'Segurança',
    date: '20 Jan 2025',
    readTime: '6 min',
    author: 'Roberto Silva',
    image: '/images/Trans Gabardo - Framers produtora -5762.JPG',
    featured: false,
    tags: ['segurança', 'protocolos', 'transporte', 'qualidade'],
    seo: {
      description: 'Conheça os protocolos de segurança que garantem a proteção total dos veículos durante o transporte.',
      keywords: ['segurança transporte', 'protocolos veículos', 'transporte seguro', 'certificação ISO']
    }
  },
  {
    id: '7',
    slug: 'logistica-inteligente-otimizacao-rotas',
    title: 'Logística Inteligente: Como a IA Otimiza Nossas Rotas',
    excerpt: 'Descubra como algoritmos de inteligência artificial revolucionam o planejamento de rotas e reduzem prazos de entrega.',
    content: [
      {
        type: 'paragraph',
        content: 'A logística moderna não é mais sobre seguir o caminho mais curto. É sobre encontrar a rota mais eficiente, considerando tráfego, condições climáticas, restrições de veículos e dezenas de outras variáveis em tempo real.'
      },
      {
        type: 'heading',
        content: 'Algoritmos que Pensam em Tempo Real',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Nossos sistemas de IA analisam milhares de variáveis simultaneamente para determinar a melhor rota para cada transporte, adaptando-se dinamicamente a mudanças nas condições.'
      },
      {
        type: 'list',
        content: 'Fatores considerados pelos algoritmos:',
        items: [
          'Condições de tráfego em tempo real',
          'Previsões meteorológicas',
          'Restrições de altura e peso nas vias',
          'Horários de pico e vale',
          'Disponibilidade de postos de combustível'
        ]
      },
      {
        type: 'heading',
        content: 'Impacto nos Prazos e Custos',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A otimização inteligente de rotas resultou em uma redução média de 15% nos prazos de entrega e 20% no consumo de combustível, benefícios que repassamos aos nossos clientes.'
      },
      {
        type: 'quote',
        content: 'A IA não substitui a experiência humana no transporte, ela a potencializa. Nossos motoristas agora têm informações que tornam cada viagem mais segura e eficiente.',
        author: 'Gerente de Operações Gabardo'
      },
      {
        type: 'highlight',
        content: 'Através da logística inteligente, a Gabardo consegue oferecer prazos mais competitivos sem comprometer a segurança ou qualidade do serviço.'
      }
    ],
    category: 'Logística',
    date: '18 Jan 2025',
    readTime: '5 min',
    author: 'Ana Costa',
    image: '/images/Trans Gabardo - Framers produtora -5686.JPG',
    featured: false,
    tags: ['logística', 'inteligência artificial', 'otimização', 'eficiência'],
    seo: {
      description: 'Saiba como a inteligência artificial está revolucionando a logística de transporte de veículos.',
      keywords: ['logística inteligente', 'otimização rotas', 'IA transporte', 'eficiência logística']
    }
  },
  {
    id: '8',
    slug: 'cuidados-especiais-veiculos-premium',
    title: 'Transporte de Veículos Premium: Cuidados Especiais',
    excerpt: 'Os protocolos diferenciados para transporte de veículos de luxo, clássicos e de alta performance.',
    content: [
      {
        type: 'paragraph',
        content: 'Veículos premium demandam cuidados especiais que vão muito além do transporte convencional. Cada detalhe é planejado para preservar não apenas o valor, mas a história e singularidade de cada veículo.'
      },
      {
        type: 'heading',
        content: 'Protocolo White Glove',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Nosso serviço premium inclui coleta e entrega em ambiente coberto, uso de luvas durante todo o manuseio e transporte em carregadores fechados para proteção total contra intempéries.'
      },
      {
        type: 'list',
        content: 'Serviços premium inclusos:',
        items: [
          'Coleta e entrega em ambiente coberto',
          'Transporte em carregador fechado',
          'Seguro com cobertura ampliada',
          'Relatório fotográfico detalhado',
          'Comunicação exclusiva durante o transporte'
        ]
      },
      {
        type: 'heading',
        content: 'Expertise em Veículos Clássicos',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Carros clássicos exigem conhecimento específico sobre suas particularidades. Nossa equipe é treinada para identificar e respeitar as características únicas de cada modelo histórico.'
      },
      {
        type: 'quote',
        content: 'Cada veículo clássico carrega uma história. Nosso trabalho é garantir que essa história continue sendo contada por muitas gerações.',
        author: 'Especialista Gabardo Premium'
      },
      {
        type: 'highlight',
        content: 'A divisão Premium da Gabardo já transportou mais de 500 veículos de coleção, mantendo um índice zero de avarias em veículos clássicos.'
      }
    ],
    category: 'Transporte de Veículos',
    date: '16 Jan 2025',
    readTime: '8 min',
    author: 'Fernando Oliveira',
    image: '/images/Trans Gabardo - Framers produtora -5623.JPG',
    featured: false,
    tags: ['veículos premium', 'carros clássicos', 'transporte especializado', 'luxo'],
    seo: {
      description: 'Conheça os cuidados especiais no transporte de veículos premium, clássicos e de alta performance.',
      keywords: ['transporte veículos premium', 'carros clássicos', 'veículos luxo', 'transporte especializado']
    }
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export const blogCategories = [
  'Transporte de Veículos',
  'Logística',
  'Segurança',
  'Tecnologia',
  'Sustentabilidade',
  'Inovação'
];

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
} 