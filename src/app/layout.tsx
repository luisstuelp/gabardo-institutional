import type { Metadata } from "next";
import "./globals.css";
import WhatsAppFloat from "@/components/custom/WhatsAppFloat";
import CookieConsentBanner from "@/components/custom/CookieConsentBanner";
import { meta } from "@/data/hubPluralContent";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="font-primary">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Supermolot+Neue:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-primary">
        {children}
        <WhatsAppFloat />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
