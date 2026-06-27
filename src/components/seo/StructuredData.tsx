'use client';

import Script from 'next/script';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
name: 'Gabardo',
    alternateName: 'Gabardo',
    url: 'https://gabardo.com',
    logo: 'https://www.gabardo.com/gabardo-logo.png',
    description: 'Transportadora de veículos com mais de 36 anos de experiência. Primeira transportadora do mundo com certificação carbono negativo. Certificações ISO 9001, ISO 14001 e ISO 39001.',
    foundingDate: '1989',
    founder: {
      '@type': 'Person',
      name: 'Sérgio Mário Gabardo'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Fernando Ferrari, 700 - Anchieta',
      addressLocality: 'Porto Alegre',
      addressRegion: 'RS',
      postalCode: '90200-040',
      addressCountry: 'BR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-51-3373-3000',
      contactType: 'customer service',
      areaServed: ['continental', 'AR', 'UY', 'PY'],
      availableLanguage: ['pt', 'es']
    },
    sameAs: [
      'https://www.instagram.com/transportesgabardo',
      'https://www.youtube.com/@transportesgabardo',
      'https://wa.me/5551933733000'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'continental'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Logística Automotiva',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transporte de Veículos',
            description: 'Transporte seguro de veículos com frota especializada e rastreamento em tempo real'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Armazenagem de Veículos',
            description: 'Pátios seguros e estrategicamente localizados para armazenamento de veículos'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Logística Integrada',
            description: 'Soluções completas de logística automotiva com gestão end-to-end'
          }
        }
      ]
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.gabardo.com/#localbusiness',
    name: 'Gabardo',
    image: 'https://www.gabardo.com/gabardo-logo.png',
    telephone: '+55-51-3373-3000',
    email: 'gabardo@transgabardo.com.br',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Fernando Ferrari, 700 - Anchieta',
      addressLocality: 'Porto Alegre',
      addressRegion: 'RS',
      postalCode: '90200-040',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -30.0346,
      longitude: -51.2177
    },
    url: 'https://gabardo.com',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '18:00'
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
