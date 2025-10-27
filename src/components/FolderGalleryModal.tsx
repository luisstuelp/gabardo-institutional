'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FolderGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string; title?: string; description?: string }[];
}

const FolderGalleryModal: React.FC<FolderGalleryModalProps> = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Fechar galeria"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Main Content */}
          <div
            className="relative mx-auto flex h-full max-h-[90vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-center"
            >
              <span id="gallery-modal-title" className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                {currentIndex + 1} de {images.length}
              </span>
            </motion.div>

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative flex h-full max-h-[60vh] w-full items-center justify-center"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="(max-width: 1280px) 90vw, 1280px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-8"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-8"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                </button>
              </>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex gap-2 overflow-x-auto px-4 pb-2"
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      idx === currentIndex
                        ? 'ring-2 ring-gabardo-blue opacity-100'
                        : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FolderGalleryModal;
