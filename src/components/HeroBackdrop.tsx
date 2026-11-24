import React from 'react';
import { OptimizedImage } from './OptimizedImage';

interface HeroBackdropProps {
  imageUrl: string;
  alt: string;
}

export function HeroBackdrop({ imageUrl, alt }: HeroBackdropProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <OptimizedImage
        src={imageUrl}
        alt={alt}
        priority
        width={1920}
        height={1080}
        containerClassName="w-full h-full"
        className="w-full h-full object-cover object-center opacity-100 blur-[1.5px] scale-[1.02] transition-transform duration-[4000ms] motion-reduce:transform-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#9E0E15]/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-[#7A090F]/80 via-[#9E0E15]/35 to-transparent"
      />
    </div>
  );
}
