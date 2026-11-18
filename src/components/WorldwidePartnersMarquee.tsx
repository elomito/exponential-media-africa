import React, { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Globe2, Pause, Play } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import type { ClientLogo } from '../types/cms';

interface WorldwidePartnersMarqueeProps {
  logos: ClientLogo[];
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

function PartnerWindowCard({ logo, idx }: { logo: ClientLogo; idx: number }) {
  return (
    <article className="w-[260px] sm:w-[290px] shrink-0 bg-white border border-neutral-200 border-t-4 border-t-[#ED2126] hover:border-[#ED2126] rounded-2xl p-5 flex flex-col justify-between gap-4 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {logo.logoUrl ? (
          <div className="h-14 w-36 flex items-center justify-start bg-white rounded-lg p-1 overflow-hidden">
            <OptimizedImage
              src={logo.logoUrl}
              alt={`${logo.name} logo`}
              width={180}
              height={64}
              containerClassName="h-12 w-full bg-white"
              className="h-12 w-full object-contain object-left"
            />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-xl bg-[#ED2126] text-white font-display font-bold text-sm tracking-tight flex items-center justify-center shrink-0">
            {getInitials(logo.name)}
          </div>
        )}
        <span className="font-mono text-[11px] font-bold text-[#E50000] tabular-nums">
          #{String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="pt-3 border-t border-neutral-100">
        <h3 className="text-sm font-display font-bold text-neutral-900 tracking-tight mb-1 truncate">
          {logo.name}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-600">
          <span>{logo.sector}</span>
          {logo.region && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">{logo.region}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function WorldwidePartnersMarquee({ logos }: WorldwidePartnersMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);

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
    setIsPaused(true);
    const delta = direction === 'next' ? 320 : -320;
    topTrackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
    bottomTrackRef.current?.scrollBy({ left: -delta, behavior: 'smooth' });
  };

  return (
    <div className="pt-12 border-t border-neutral-200">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-2">
            <span className="w-5 h-0.5 bg-[#E50000]" aria-hidden="true" />
            <span>06. Our Clients &amp; Territory</span>
          </p>
          <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight [text-wrap:balance]">
            Trusted by leading consumer, banking, retail, and institutional brands.
          </h2>
          <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
            Organisations featured across our campaign portfolio spanning Kenya, Uganda, Rwanda, DRC, Zambia, and regional initiatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 text-xs text-neutral-700 mr-2">
            <span className="w-6 h-6 rounded-md bg-[#ED2126] text-white inline-flex items-center justify-center">
              <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="font-mono font-semibold tabular-nums">{logos.length} verified clients</span>
          </div>
          <button
            type="button"
            onClick={() => handleShiftWindows('prev')}
            aria-label="Shift client windows backward"
            className="p-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 hover:border-[#ED2126] hover:text-[#E50000] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleShiftWindows('next')}
            aria-label="Shift client windows forward"
            className="p-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-900 hover:border-[#ED2126] hover:text-[#E50000] transition-colors"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-pressed={isPaused}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border border-neutral-300 bg-white text-neutral-900 hover:border-[#ED2126] transition-colors"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#ED2126] fill-[#ED2126]" aria-hidden="true" />
                <span>Resume Sliding</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#ED2126] fill-[#ED2126]" aria-hidden="true" />
                <span>Pause Sliding</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
          {/* Top Sliding Window Track */}
          <div
            ref={topTrackRef}
            className={`marquee-track relative overflow-hidden ${
              isPaused ? 'overflow-x-auto pb-2' : ''
            }`}
          >
            <div
              className={`flex gap-4 w-max ${
                isPaused ? '' : 'animate-marquee-left'
              }`}
            >
              {topRow.map((logo, idx) => (
                <PartnerWindowCard
                  key={`top-a-${logo.id}-${idx}`}
                  logo={logo}
                  idx={idx % logos.length}
                />
              ))}
              {!isPaused &&
                topRow.map((logo, idx) => (
                  <div key={`top-b-${logo.id}-${idx}`} aria-hidden="true">
                    <PartnerWindowCard logo={logo} idx={idx % logos.length} />
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom Counter-Sliding Window Track */}
          <div
            ref={bottomTrackRef}
            className={`marquee-track relative overflow-hidden ${
              isPaused ? 'overflow-x-auto pb-2' : ''
            }`}
          >
            <div
              className={`flex gap-4 w-max ${
                isPaused ? '' : 'animate-marquee-right'
              }`}
            >
              {bottomRow.map((logo, idx) => (
                <PartnerWindowCard
                  key={`bot-a-${logo.id}-${idx}`}
                  logo={logo}
                  idx={idx % logos.length}
                />
              ))}
              {!isPaused &&
                bottomRow.map((logo, idx) => (
                  <div key={`bot-b-${logo.id}-${idx}`} aria-hidden="true">
                    <PartnerWindowCard logo={logo} idx={idx % logos.length} />
                  </div>
                ))}
            </div>
          </div>
        </div>
    </div>
  );
}
