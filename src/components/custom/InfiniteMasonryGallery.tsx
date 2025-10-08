'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  actualHeight?: number;
}

const initialImageUrls = [
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465146344424-500778368b57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1499084732479-de2c0add7e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542281286-9e0e16bb7366?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
];

const InfiniteMasonryGallery: React.FC = () => {
  const [images] = useState<GalleryImage[]>(() => {
    return initialImageUrls.map((url, index) => {
      const initialHeight = (index % 3 === 0) ? 600 : (index % 3 === 1) ? 750 : 500;
      return {
        id: `initial-masonry-img-${index}`,
        imageUrl: url.replace(/w=600|w=800/, `w=600&h=${initialHeight}`),
        title: `Gallery Image ${index + 1}`,
        description: 'A beautiful scene from our collection.',
        actualHeight: initialHeight,
      };
    });
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<GalleryImage | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = (image: GalleryImage) => {
    setModalImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-neutral-100 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-neutral-800">
          Explore Our Gallery
        </h2>
        
        {!isClient && (
          <div className="text-center py-10 text-neutral-500">Loading gallery...</div>
        )}

        {isClient && images.length > 0 && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
            <Masonry gutter="1.5rem"> 
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group/item mb-6"
                  onClick={() => openModal(image)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, zIndex: 10, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                >
                  <div style={{ width: '100%', height: image.actualHeight ? `${image.actualHeight}px` : 'auto' }} className="relative">
                      <Image
                      src={image.imageUrl}
                      alt={image.title || 'Gallery image'}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover/item:scale-105"
                      sizes="(max-width: 750px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={index < 4} 
                      />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
                    {image.title && (
                      <motion.h3 
                        className="text-white text-base md:text-lg font-semibold leading-tight"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        {image.title}
                      </motion.h3>
                    )}
                    {image.description && (
                      <motion.p 
                        className="text-neutral-200 text-xs md:text-sm mt-1 leading-snug"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                      >
                        {image.description}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {isClient && images.length === 0 && (
           <div className="text-center py-10 text-neutral-500">
            <p>The gallery is currently empty. Check back soon!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full h-full max-w-3xl max-h-[85vh] bg-neutral-900 rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={modalImage.imageUrl.replace(/&h=\d+/, '').replace(/w=\d+/, 'w=1280')}
                alt={modalImage.title || 'Full screen image'}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {modalImage.title && (
                 <h2 id="modal-title" className="sr-only">{modalImage.title}</h2>
              )}
            </motion.div>
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white/80 bg-black/40 hover:bg-black/60 hover:text-white p-2.5 rounded-full z-[10000] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60"
              aria-label="Close full screen image"
            >
              <XIcon size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InfiniteMasonryGallery; 