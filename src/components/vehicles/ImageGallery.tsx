import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { VehicleImage } from '@/types/database';
import { cn } from '@/lib/utils';
import { VehiclePhoto } from '@/components/vehicles/VehiclePhoto';

interface ImageGalleryProps {
  images: VehicleImage[];
  title: string;
  isLoading?: boolean;
}

export function ImageGallery({ images, title, isLoading = false }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayImages = images;
  const activeIndex = displayImages.length > 0 ? Math.min(currentIndex, displayImages.length - 1) : 0;
  const currentImage = displayImages[activeIndex];

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
          <VehiclePhoto
            key={currentImage?.id ?? `empty-${isLoading}`}
            src={currentImage?.url}
            alt={currentImage?.alt || title}
            isLoading={isLoading && !currentImage}
            className="h-full w-full"
          />
          
          {/* Image Counter */}
          {currentImage && (
            <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {activeIndex + 1} / {displayImages.length}
            </div>
          )}

          {/* Zoom Button */}
          {currentImage && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-primary/80 text-primary-foreground hover:bg-primary backdrop-blur-sm"
              onClick={() => setIsLightboxOpen(true)}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          )}

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
                  index === activeIndex 
                    ? 'border-accent ring-2 ring-accent/20' 
                    : 'border-transparent hover:border-muted-foreground/30'
                )}
              >
                <VehiclePhoto
                  key={image.id}
                  src={image.url}
                  alt={image.alt || `${title} - Imagem ${index + 1}`}
                  className="h-full w-full"
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
            {currentImage && (
              <VehiclePhoto
                key={`lightbox-${currentImage.id}`}
                src={currentImage.url}
                alt={currentImage.alt || title}
                className="h-full w-full max-w-full max-h-full bg-transparent"
                imageClassName="max-w-full max-h-full object-contain"
              />
            )}

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={() => setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Counter */}
            {currentImage && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {activeIndex + 1} / {displayImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
