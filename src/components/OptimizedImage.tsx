import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackLabel?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  width = 1200,
  height = 800,
  priority = false,
  fallbackLabel,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#18181D] border border-white/10 text-neutral-400 p-6 text-center ${containerClassName}`}
      >
        <ImageOff className="w-6 h-6 mb-2 text-[#ED2126]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-neutral-300">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#141418] ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
