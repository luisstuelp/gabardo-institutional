'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VehiclePhotoProps {
  src?: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  isLoading?: boolean;
  showLoader?: boolean;
}

export function VehiclePhoto({
  src,
  alt,
  className,
  imageClassName,
  isLoading = false,
  showLoader = true,
}: VehiclePhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const isWaitingForImage = showLoader && (isLoading || (!!src && !loaded && !failed));

  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden bg-slate-100', className)}>
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover',
            showLoader && !loaded ? 'opacity-0' : 'opacity-100',
            imageClassName,
          )}
        />
      )}
      {isWaitingForImage && (
        <Loader2
          aria-label="Carregando imagem"
          className="absolute h-8 w-8 animate-spin text-slate-500"
        />
      )}
    </div>
  );
}
