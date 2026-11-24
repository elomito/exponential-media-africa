import React, { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OptimizedImage } from './OptimizedImage';
import { Reveal } from './ScrollReveal';
import type { ClientLogo } from '../types/cms';

interface WorldwidePartnersMarqueeProps {
  logos: ClientLogo[];
  surface?: 'red' | 'light';
}

function getInitials(name: string): string {
  const words = name
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'EM';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function PartnerStreamItem({
  logo,
  idx,
  isRedSurface,
}: {
  logo: ClientLogo;
  idx: number;
  isRedSurface: boolean;
}) {
  return (
    <article className="w-[240px] sm:w-[270px] shrink-0 py-3 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        {logo.logoUrl ? (
          <div
            className={`h-14 w-36 flex items-center overflow-hidden ${
              isRedSurface
                ? 'bg-white rounded-md px-3 py-1.5 justify-center shadow-sm'
                : 'justify-start'
            }`}
          >
            <OptimizedImage
              src={logo.logoUrl}
              alt={`${logo.name} logo`}
              width={180}
              height={64}
              loading="eager"
              decoding="async"
              fetchPriority="low"
              containerClassName="h-11 w-full bg-transparent"
              className={`h-11 w-full object-contain mix-blend-multiply ${
                isRedSurface ? 'object-center' : 'object-left'
              }`}
            />
          </div>
        ) : (
          <div
            className={`w-11 h-11 font-display font-bold text-sm tracking-tight flex items-center justify-center shrink-0 ${
              isRedSurface
                ? 'bg-white text-[#B81118] rounded-md shadow-sm'
                : 'text-[#ED1B24] justify-start'
            }`}
          >
            {getInitials(logo.name)}
          </div>
        )}
        <span
          className={`font-display text-[11px] font-bold tabular-nums ${
            isRedSurface ? 'text-white/85' : 'text-[#B81118]'
          }`}
        >
          #{String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="pt-1">
        <h3
          className={`text-sm font-display font-bold tracking-tight mb-0.5 truncate ${
            isRedSurface ? 'text-white' : 'text-[#B81118]'
          }`}
        >
          {logo.name}
        </h3>
        <div
          className={`flex flex-wrap items-center gap-1.5 text-xs ${
            isRedSurface ? 'text-white/85' : 'text-[#4A2527]'
          }`}
        >
          <span>{logo.sector}</span>
          {logo.region && (
            <>
              <span aria-hidden="true">·</span>
              <span>{logo.region}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function WorldwidePartnersMarquee({
  logos,
  surface = 'red',
}: WorldwidePartnersMarqueeProps) {
  const { t } = useLanguage();
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);
  const isRedSurface = surface === 'red';

  const { topRow, bottomRow } = useMemo(() => {
    if (logos.length === 0) {
      return { topRow: [] as ClientLogo[], bottomRow: [] as ClientLogo[] };
    }
    const ensureMin = (items: ClientLogo[], minCount = 6): ClientLogo[] => {
      if (items.length === 0) return [];
      const out: ClientLogo[] = [];
      while (out.length < minCount) {
        out.push(...items);
      }
      return out;
    };

    const midpoint = Math.ceil(logos.length / 2);
    const secondSlice =
      logos.length > 1 ? [...logos.slice(midpoint), ...logos.slice(0, midpoint)] : logos;

    return {
      topRow: ensureMin(logos, 6),
      bottomRow: ensureMin(secondSlice, 6),
    };
  }, [logos]);

  if (logos.length === 0) {
    return null;
  }

  const handleShiftWindows = (direction: 'prev' | 'next') => {
    const delta = direction === 'next' ? 320 : -320;
    topTrackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
    bottomTrackRef.current?.scrollBy({ left: -delta, behavior: 'smooth' });
  };

  return (
    <div className="pt-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <Reveal variant="slide-left" className="max-w-2xl">
          <h2
            className={`text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase [text-wrap:balance] ${
              isRedSurface ? 'text-white' : 'text-[#B81118]'
            }`}
          >
            {t.partners.heading}
          </h2>
          <p
            className={`text-base sm:text-lg mt-3 leading-relaxed ${
              isRedSurface ? 'text-white/90' : 'text-[#4A2527]'
            }`}
          >
            {t.partners.subtitle}
          </p>
        </Reveal>

        <Reveal variant="slide-down" delayMs={80} className="flex flex-wrap items-center gap-2 shrink-0">
          <div
            className={`inline-flex items-center gap-2 text-xs mr-2 ${
              isRedSurface ? 'text-white' : 'text-[#2A1214]'
            }`}
          >
            <Globe2
              className={`w-4 h-4 ${isRedSurface ? 'text-white' : 'text-[#ED1B24]'}`}
              aria-hidden="true"
            />
            <span className="font-display font-semibold tabular-nums">
              {logos.length} {t.partners.verifiedClientsLabel}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleShiftWindows('prev')}
            aria-label={t.partners.prevAria}
            className={`p-2.5 transition-colors ${
              isRedSurface
                ? 'text-white hover:text-white/80'
                : 'text-[#B81118] hover:text-[#ED1B24]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleShiftWindows('next')}
            aria-label={t.partners.nextAria}
            className={`p-2.5 transition-colors ${
              isRedSurface
                ? 'text-white hover:text-white/80'
                : 'text-[#B81118] hover:text-[#ED1B24]'
            }`}
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </Reveal>
      </div>

      <Reveal variant="slide-left" delayMs={100}>
        <div
          className={
            isRedSurface
              ? 'space-y-5 rounded-2xl bg-white text-[#2A1214] px-4 sm:px-6 py-5 sm:py-6 shadow-sm'
              : 'space-y-6'
          }
        >
        <div
          ref={topTrackRef}
          className="marquee-track relative overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-10 w-max animate-marquee-left">
            {topRow.map((logo, idx) => (
              <PartnerStreamItem
                key={`top-a-${logo.id}-${idx}`}
                logo={logo}
                idx={idx % logos.length}
                isRedSurface={false}
              />
            ))}
            {topRow.map((logo, idx) => (
              <div key={`top-b-${logo.id}-${idx}`} aria-hidden="true">
                <PartnerStreamItem
                  logo={logo}
                  idx={idx % logos.length}
                  isRedSurface={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={bottomTrackRef}
          className="marquee-track relative overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-10 w-max animate-marquee-right">
            {bottomRow.map((logo, idx) => (
              <PartnerStreamItem
                key={`bot-a-${logo.id}-${idx}`}
                logo={logo}
                idx={idx % logos.length}
                isRedSurface={false}
              />
            ))}
            {bottomRow.map((logo, idx) => (
              <div key={`bot-b-${logo.id}-${idx}`} aria-hidden="true">
                <PartnerStreamItem
                  logo={logo}
                  idx={idx % logos.length}
                  isRedSurface={false}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </Reveal>
    </div>
  );
}
