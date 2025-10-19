import type { Metadata } from "next";
import "./globals.css";
import WhatsAppFloat from "@/components/custom/WhatsAppFloat";
import CookieConsentBanner from "@/components/custom/CookieConsentBanner";
import StructuredData from "@/components/seo/StructuredData";
import { meta } from "@/data/hubPluralContent";

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | Gabardo'
  },
  description: meta.description,
  keywords: [
    'transporte de veículos',
    'transportadora de carros',
    'cegonha',
    'logística automotiva',
    'transporte LATAM',
    'ISO 9001',
    'ISO 14001',
    'ISO 39001',
    'carbono negativo',
    'rastreamento veículos',
    'armazenagem veículos',
    'Porto Alegre',
    'Brasil'
  ],
  authors: [{ name: 'Gabardo' }],
  creator: 'Gabardo',
  publisher: 'Gabardo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.transgabardo.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://www.transgabardo.com.br',
    siteName: 'Gabardo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabardo - Logística Automotiva',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
};

import { Montserrat, Roboto } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-roboto' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${roboto.variable} font-primary`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Supermolot+Neue:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-primary">
        <StructuredData />
        {children}
        <WhatsAppFloat />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
