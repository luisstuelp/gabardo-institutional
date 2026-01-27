import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "hubplural.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.osul.com.br",
      },
      {
        protocol: "https",
        hostname: "**.com.br",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Redirects
  async redirects() {
    return [
      // Localizacao routes (removed)
      {
        source: '/localizacao/:path*',
        destination: '/',
        permanent: true,
      },
      // Private/underscore routes (removed) - redirect to appropriate pages
      {
        source: '/_armazenagem',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/_cases-de-sucesso',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_cultura',
        destination: '/sobre',
        permanent: true,
      },
      {
        source: '/_frota-e-unidades',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/_nossa-gente/:path*',
        destination: '/trabalhe-conosco',
        permanent: true,
      },
      {
        source: '/_programas',
        destination: '/sobre',
        permanent: true,
      },
      {
        source: '/_sustentabilidade',
        destination: '/sobre',
        permanent: true,
      },
      {
        source: '/_tecnologia-e-inovacao',
        destination: '/infraestrutura',
        permanent: true,
      },
      {
        source: '/_transporte-de-veiculos',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/_transporte-em-prancha',
        destination: '/servicos',
        permanent: true,
      },
      // Empty/experimental routes (removed)
      {
        source: '/ecommerce/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/landing-jornada/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/landing-jornada-3d/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/saldao-gabardo/:path*',
        destination: '/',
        permanent: true,
      },
      // Other removed routes
      {
        source: '/noticias/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/sobre/_conformidade-e-lgpd',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      // Old sitemap routes that don't exist
      {
        source: '/transporte-de-veiculos',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/armazenagem',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/frota-e-unidades',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/tecnologia-e-inovacao',
        destination: '/infraestrutura',
        permanent: true,
      },
      {
        source: '/sobre',
        destination: '/sobre/secao-institucional',
        permanent: true,
      },
      {
        source: '/sobre/institucional',
        destination: '/sobre/secao-institucional',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
