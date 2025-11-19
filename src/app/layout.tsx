import type { Metadata } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/custom/CookieConsentBanner";
import StructuredData from "@/components/seo/StructuredData";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import PageMetricsTracker from "@/components/analytics/PageMetricsTracker";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { CookieConsentProvider } from "@/components/providers/CookieConsentProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-48x48.png', sizes: '48x48' },
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2A4D87' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
};

import { Montserrat, Roboto } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  display: 'swap',
  preload: true
});

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'], 
  variable: '--font-roboto',
  display: 'swap',
  preload: true
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${roboto.variable} font-primary`}>
      <head>
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Supermolot+Neue:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-primary">
        <ReactQueryProvider>
          <CookieConsentProvider>
            <PerformanceMonitor />
            <PageMetricsTracker />
            <StructuredData />
            {children}
            {/* WhatsAppFloat temporarily disabled */}
            <CookieConsentBanner />
            <SpeedInsights />
          </CookieConsentProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
