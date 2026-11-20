import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { DIVISIONS } from '../data/seedData';
import type { DivisionId } from '../types/cms';

interface ServicesPageProps {
  onOpenInquiry: (preselectedService?: string) => void;
}

export function ServicesPage({ onOpenInquiry }: ServicesPageProps) {
  const { services } = useCms();
  const [selectedDivision, setSelectedDivision] = useState<'all' | DivisionId>('all');

  const visibleDivisions =
    selectedDivision === 'all'
      ? DIVISIONS
      : DIVISIONS.filter((d) => d.id === selectedDivision);

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Services — Exponential Media Africa"
        description="Explore our six core marketing services: Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buy, Brand Activation & Events, and Visual Design."
        path="/services"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#FF1A1F] mb-4">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Core Agency Services</span>
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-4xl leading-[1.04] [text-wrap:balance] mb-5 sm:mb-6">
          One connected team. Six ways to build your brand.
        </h1>

        <div
          role="group"
          aria-label="Filter services by practice area"
          className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-xl mt-4"
        >
          <button
            type="button"
            aria-pressed={selectedDivision === 'all'}
            onClick={() => setSelectedDivision('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              selectedDivision === 'all'
                ? 'bg-[#ED2126] text-white font-semibold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            All Services
          </button>
          {DIVISIONS.map((div) => (
            <button
              key={div.id}
              type="button"
              aria-pressed={selectedDivision === div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                selectedDivision === div.id
                  ? 'bg-[#ED2126] text-white font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {div.shortName}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
        {visibleDivisions.map((division) => {
          const divisionServices = services.filter((s) => s.division === division.id);
          return (
            <div key={division.id} className="space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div
                    className="w-8 h-1 mb-3 rounded-full"
                    style={{ backgroundColor: division.accentHex }}
                    aria-hidden="true"
                  />
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {division.name}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">{division.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenInquiry(division.services[0])}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF1A1F] hover:text-white whitespace-nowrap transition-colors"
                >
                  <span>Request {division.shortName} Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[#ED2126]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                {divisionServices.map((srv, serviceIndex) => (
                  <article
                    key={srv.id}
                    className="py-6 sm:py-7 border-t border-white/15 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.18em] text-[#FF3A3F] mb-4">{String(serviceIndex + 1).padStart(2, '0')} / {division.shortName.toUpperCase()}</div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white mb-3">
                        {srv.title}
                      </h3>
                      <p className="text-sm font-medium text-neutral-100 mb-3">
                        {srv.problemSolved}
                      </p>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => onOpenInquiry(srv.title)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-white transition-colors focus-visible:text-white"
                      >
                        <span>Discuss this service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="p-5 bg-[#141418]/50 border border-white/5 rounded-xl">
                <div className="text-xs font-medium text-neutral-400 mb-2">
                  Deliverables Under {division.shortName}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-300">
                  {division.services.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => onOpenInquiry(label)}
                      className="hover:text-[#FF1A1F] underline decoration-white/20 underline-offset-4 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
