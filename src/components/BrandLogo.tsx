import React from 'react';
import { OFFICIAL_BRAND_ASSETS } from '../data/seedData';

interface BrandLogoProps {
  variant?: 'navbar' | 'footer';
  className?: string;
}

export function BrandLogo({ variant = 'navbar', className = '' }: BrandLogoProps) {
  const isFooter = variant === 'footer';
  const logoUrl = isFooter
    ? OFFICIAL_BRAND_ASSETS.footerLogoUrl
    : OFFICIAL_BRAND_ASSETS.headerLogoUrl;

  return (
    <span className={`inline-flex items-center select-none shrink-0 ${className}`.trim()}>
      <img
        src={logoUrl}
        alt="Exponential Marketing Agency"
        width={990}
        height={252}
        loading="eager"
        decoding="async"
        className="h-9 sm:h-10 w-auto object-contain"
      />
    </span>
  );
}
