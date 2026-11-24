import React, { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

const preloadedImageCache = new Map<string, HTMLImageElement>();

export function preloadAssetImages(urls: readonly string[]): void {
  if (typeof window === 'undefined' || typeof Image === 'undefined') return;
  for (const rawUrl of urls) {
    const url = rawUrl?.trim();
    if (!url || preloadedImageCache.has(url)) continue;
    const img = new Image();
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.src = url;
    if (typeof img.decode === 'function') {
      img.decode().catch(() => {});
    }
    preloadedImageCache.set(url, img);
  }
}

interface OptimizedImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
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
  loading,
  decoding,
  fetchPriority,
  fallbackLabel,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#9E0E15] border border-white/20 text-white/80 p-6 text-center ${containerClassName}`}
      >
        <ImageOff className="w-6 h-6 mb-2 text-white" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-white/90">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        decoding={decoding ?? (priority ? 'sync' : 'async')}
        fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
