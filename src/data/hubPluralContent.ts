export interface ScrapedImage {
  src: string;
  alt: string;
}

export interface ScrapedService {
  title: string;
  description: string;
  icon: string | null;
}

export interface ScrapedLocation {
  name: string;
  address: string;
  description: string;
}

export interface ScrapedTestimonial {
  text: string;
  author: string;
  rating: number;
}

export interface ScrapedContent {
  hero: {
    title: string;
    description: string;
    images: ScrapedImage[];
  };
  services: ScrapedService[];
  locations: ScrapedLocation[];
  testimonials: ScrapedTestimonial[];
  about: {
    title: string;
    description: string;
    values: string[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    socialMedia: {
      [key: string]: string;
    };
  };
  meta: {
    title: string;
    description: string;
  };
}

export const hubPluralContent: ScrapedContent = {
  "hero": {
    "title": "Gabardo – Transporte de Veículos",
    "description": "Atendimento em todo território nacional e países do Mercosul. Seguro total do seu veículo, frota com veículos novos e tecnologia embarcada, profissionais treinados e capacitados, serviço de coleta e entrega (pátio a pátio).",
    "images": []
  },
  "services": [
    {
      "title": "Transporte de Veículos",
      "description": "Transporte seguro de carros, motos e caminhões com seguro total e rastreamento via satélite em tempo real.",
      "icon": null
    },
    {
      "title": "Transporte em Prancha",
      "description": "Transporte especializado em prancha para veículos de maior porte com toda segurança e cuidado.",
      "icon": null
    },
    {
      "title": "Armazenagem",
      "description": "Serviços de armazenagem de frotas com segurança e controle total dos veículos.",
      "icon": null
    },
    {
      "title": "Coleta e Entrega",
      "description": "Serviço completo de coleta e entrega porta a porta em todo território nacional.",
      "icon": null
    },
    {
      "title": "Transporte Mercosul",
      "description": "Atendimento especializado para países do Mercosul com toda documentação necessária.",
      "icon": null
    },
    {
      "title": "Rastreamento Satelital",
      "description": "Sistema avançado de rastreamento via satélite para acompanhar sua carga em tempo real.",
      "icon": null
    }
  ],
  "locations": [
    { "name": "Matriz Porto Alegre", "address": "Rua Vitor Valpírio, 715 - Anchieta - Porto Alegre/RS - CEP 90200-230", "description": "Sede da empresa com infraestrutura completa" },
    { "name": "Iracemápolis", "address": "Rodovia Luiz Ometto - SP 306 - KM 44 - Iracemápolis/SP", "description": "Filial estratégica em São Paulo" },
    { "name": "Jacareí", "address": "Rua Haroldo Barnsley Holland, 211 - Rio Abaixo - Jacareí/SP", "description": "Unidade no Vale do Paraíba" },
    { "name": "Palhoça", "address": "Av. Gentil Reinaldo Cordioli, S/N - Jardim Eldorado - Palhoça/SC", "description": "Atendimento em Santa Catarina" },
    { "name": "Cariacica", "address": "ROD GOVERNADOR MARIO COVAS GALPÃO 01 - Cariacica/ES", "description": "Presença no Espírito Santo" },
    { "name": "Anápolis", "address": "Rua Via Primaria, S/N - Quadra 11-E - DAIA - Anápolis/GO", "description": "Centro-Oeste brasileiro" },
    { "name": "Piracicaba", "address": "Via Mario Sergio Gabardo, 555 - Piracicaba/SP", "description": "Interior paulista estratégico" },
    { "name": "Porto Real", "address": "Estrada Renato Monteiro, S/N - Tecnopolo Agroindustrial - Porto Real/RJ", "description": "Região do Vale do Paraíba fluminense" },
    { "name": "Chuí", "address": "Rodovia BR 471, 3400 - Centro - Chuí/RS", "description": "Fronteira com Uruguai" },
    { "name": "São Bernardo do Campo", "address": "Av. Robert Kennedy, 581 - Piraporinha - São Bernardo do Campo/SP", "description": "Grande São Paulo" },
    { "name": "Duque de Caxias", "address": "Rodovia Washington Luiz, 6399 - Jardim Gramacho - Duque de Caxias/RJ", "description": "Grande Rio de Janeiro" },
    { "name": "São José dos Pinhais", "address": "Rua Silvio Pinto Ribeiro, 707 - Jardim Quississana - São José dos Pinhais/PR", "description": "Região metropolitana de Curitiba" },
    { "name": "Eusébio", "address": "Rua Dos Moraes, 1011 - Bairro Jabuti - Eusébio/CE", "description": "Presença no Nordeste" },
    { "name": "Pátio Jaraguá", "address": "Estrada Turística do Jaraguá, 2989 - São Paulo/SP", "description": "Zona norte de São Paulo" }
  ],
  "testimonials": [
    {
      "text": "A Gabardo oferece serviços de transporte de veículos com excelência, segurança total e acompanhamento em tempo real. Profissionais capacitados e frota moderna.",
      "author": "Cliente Montadora",
      "rating": 5
    },
    {
      "text": "Transportamos nossos veículos com total confiança. O rastreamento satelital e o seguro total nos dão a tranquilidade necessária.",
      "author": "Concessionária Parceira", 
      "rating": 5
    },
    {
      "text": "Atendimento em todo território nacional com a qualidade e pontualidade que nossa empresa precisa. Recomendamos os serviços da Gabardo.",
      "author": "Empresa do Setor Automotivo",
      "rating": 5
    }
  ],
  "about": {
    "title": "Sobre a Gabardo",
    "description": "Fundada em 1989 por Sérgio Mário Gabardo em Porto Alegre/RS, a Gabardo é referência no transporte de veículos. Com frota moderna e tecnologia embarcada, oferece serviços seguros e eficientes em todo território nacional e países do Mercosul.",
    "values": [
      "Segurança",
      "Qualidade",
      "Tecnologia",
      "Confiabilidade", 
      "Excelência no Atendimento"
    ]
  },
  "contact": {
    "phone": "+55 (51) 3373.3000",
    "email": "gabardo@transgabardo.com.br",
    "address": "Rua Vitor Valpírio, 715 - Anchieta - CEP 90200-230 - Porto Alegre/RS",
    "socialMedia": {
      "whatsapp": "https://wa.me/5551933733000",
      "website": "https://www.transgabardo.com.br",
      "email": "gabardo@transgabardo.com.br"
    }
  },
  "meta": {
    "title": "Gabardo - Transporte de Veículos em todo Brasil e Mercosul",
    "description": "Transporte seguro de veículos com frota moderna, seguro total e rastreamento satelital. Atendimento nacional e internacional."
  }
};

// Exportações específicas para facilitar o uso
export const { hero, services, locations, testimonials, about, contact, meta } = hubPluralContent;