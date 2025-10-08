'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Linkedin, Facebook, Check, Copy, MessageCircle } from 'lucide-react';
import { BlogPost } from '@/data/blogData';

interface SocialShareProps {
  post: BlogPost;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ post, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title} - ${post.excerpt}`;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      label: 'Compartilhar no Twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      label: 'Compartilhar no LinkedIn'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      label: 'Compartilhar no Facebook'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`,
      label: 'Compartilhar no WhatsApp'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5" />
        <span>Compartilhar</span>
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Share Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-3xl p-6 z-50 min-w-80"
            >
              
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Compartilhar artigo
                </h3>
                <p className="text-white/60 text-sm line-clamp-2">
                  {post.title}
                </p>
              </div>

              {/* Social Platforms */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {socialPlatforms.map((platform, index) => (
                  <motion.button
                    key={platform.name}
                    onClick={() => openShareWindow(platform.url)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center space-x-3 ${platform.color} hover:opacity-90 text-white px-4 py-3 rounded-xl transition-all duration-300 group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={platform.label}
                  >
                    <platform.icon className="w-5 h-5" />
                    <span className="font-medium">{platform.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Copy URL */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="border-t border-white/10 pt-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                    <p className="text-white/70 text-sm truncate">
                      {currentUrl}
                    </p>
                  </div>
                  <motion.button
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Copiar link"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-sm mt-2 text-center"
                  >
                    Link copiado com sucesso!
                  </motion.p>
                )}
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fechar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare; 