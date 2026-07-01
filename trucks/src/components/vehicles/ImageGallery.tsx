import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { VehicleImage } from '@/types/database';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: VehicleImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback image if no images
  const displayImages = images.length > 0 
    ? images 
    : [{ id: 'fallback', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200', alt: title, is_primary: true, display_order: 0, vehicle_id: '', created_at: '' }];

  const currentImage = displayImages[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted group">
          <img
            src={currentImage.url}
            alt={currentImage.alt || title}
            className="w-full h-full object-cover"
          />
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {displayImages.length}
          </div>

          {/* Zoom Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-primary/80 text-primary-foreground hover:bg-primary backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(true)}
          >
            <ZoomIn className="h-5 w-5" />
          </Button>

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 text-primary-foreground hover:bg-primary backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 text-primary-foreground hover:bg-primary backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
            {displayImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all',
                  index === currentIndex 
                    ? 'border-accent ring-2 ring-accent/20' 
                    : 'border-transparent hover:border-muted-foreground/30'
                )}
              >
                <img
                  src={image.url}
                  alt={image.alt || `${title} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image */}
            <img
              src={currentImage.url}
              alt={currentImage.alt || title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
