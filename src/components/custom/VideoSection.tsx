'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  vimeoId?: string;
  title?: string;
  description?: string;
  showMaximize?: boolean;
}

// Componente para skeleton de carregamento
const VideoSkeleton: React.FC = () => (
  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-neutral-200 animate-pulse rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center">
        <Play className="w-6 h-6 text-neutral-400 ml-1" />
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="h-4 bg-neutral-300 rounded mb-2"></div>
      <div className="h-3 bg-neutral-300 rounded w-3/4"></div>
    </div>
  </div>
);

// Componente do player de vídeo
const VimeoPlayer: React.FC<{ vimeoId: string }> = ({ vimeoId }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Configurações do Vimeo para melhor experiência
  const vimeoParams = new URLSearchParams({
    autoplay: '0',
    loop: '0',
    muted: '0',
    gesture: 'media',
    playsinline: '1',
    byline: '0',
    portrait: '0',
    title: '0',
    speed: '1',
    transparent: '0',
    responsive: '1',
    dnt: '1', // Do not track
    quality: 'auto',
    pip: '1', // Picture in picture
    keyboard: '1',
    fullscreen: '1'
  });

  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoId}?${vimeoParams.toString()}`;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
      {!isLoaded && <VideoSkeleton />}
      <iframe
        src={vimeoEmbedUrl}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        title="Transportes Gabardo - Vídeo Institucional"
        loading="lazy"
      />
    </div>
  );
};

const VideoSection: React.FC<VideoSectionProps> = ({
  vimeoId = "123456789", // ID padrão - substituir pelo ID real do vídeo
  title = "Conheça a Transportes Gabardo",
  description = "Descubra como transformamos o transporte de veículos em soluções logísticas de excelência"
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <VideoSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Vídeo Institucional
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-secondary"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            {title.split(' ').slice(0, 2).join(' ')}
            <br />
            <span className="text-neutral-600">{title.split(' ').slice(2).join(' ')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-30"></div>
            
            {/* Video Player */}
            <div className="relative z-10">
              <React.Suspense fallback={<VideoSkeleton />}>
                <VimeoPlayer vimeoId={vimeoId} />
              </React.Suspense>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-secondary"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-secondary"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-secondary"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-secondary"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection; 