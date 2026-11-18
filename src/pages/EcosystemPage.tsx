import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { DIVISIONS, TERRITORY_MARKETS } from '../data/seedData';

interface EcosystemPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function EcosystemPage({ onNavigate, onOpenInquiry }: EcosystemPageProps) {
  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Integrated Agency Model — Exponential Media Africa"
        description="Discover how Exponential Media Africa connects Visual Design, Content Creation & Production, Digital & Influencer Marketing, and Brand Activations across East, Central, and Southern Africa."
        path="/ecosystem"
        breadcrumbName="Integrated Agency Model"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-3">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Integrated Delivery Model</span>
        </p>
        <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight max-w-4xl [text-wrap:balance] mb-6">
          Four connected practice pillars built to grow brands together.
        </h1>
        <p className="text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Engage a focused service or commission an integrated campaign uniting brand design, commercial content creation, social and creator marketing, paid media buy, and live brand activations.
        </p>
      </section>

      {/* Connected Workflow Strip */}
      <section className="bg-[#141418] border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold text-neutral-400 mb-6">
            Connected Campaign Flow Across Practice Areas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIVISIONS.map((div, idx) => (
              <a
                key={div.id}
                href={`#${div.id}`}
                className="p-5 bg-[#0B0B0D] border border-white/10 rounded-xl hover:border-white/25 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#FF1A1F] font-semibold tabular-nums">
                    STAGE 0{idx + 1}
                  </span>
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: div.accentHex }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-base font-display font-bold text-white mb-1.5">
                  {div.name}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{div.ecosystemRole}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Deep-Dives */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
        {DIVISIONS.map((division, idx) => (
          <section
            key={division.id}
            id={division.id}
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch pb-20 border-b border-white/10 last:border-b-0 last:pb-0"
          >
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/10 relative">
                <OptimizedImage
                  src={division.imageUrl}
                  alt={division.imageAlt}
                  width={1080}
                  height={810}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: division.accentHex }}
                />
              </div>
            </div>

            <div className={`lg:col-span-6 flex flex-col justify-between space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <div className="font-mono text-xs font-semibold text-[#FF1A1F] mb-2 tabular-nums">
                  PRACTICE 0{idx + 1}
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-3">
                  {division.name}
                </h2>
                <p className="text-base font-medium text-neutral-200 mb-4">{division.tagline}</p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {division.description}
                </p>

                <h3 className="text-xs font-semibold tracking-wide text-neutral-300 mb-3">
                  Capabilities &amp; Deliverables
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {division.services.map((srv) => (
                    <li
                      key={srv}
                      className="flex items-start gap-2 text-sm text-neutral-300"
                    >
                      <Check className="w-4 h-4 text-[#ED2126] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenInquiry(division.services[0])}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
                >
                  <span>Start a {division.shortName} Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  Compare all services
                </button>
              </div>
            </div>
          </section>
        ))}

        {/* Regional Territory Overview */}
        <section className="p-8 bg-[#141418] border border-white/10 rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-6 mb-6 border-b border-white/10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-1">
                <span className="w-4 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>Our Territory</span>
              </p>
              <h2 className="text-2xl font-display font-bold text-white">
                Operating across Kenya, Uganda, Rwanda, DRC &amp; Zambia
              </h2>
            </div>
            <span className="text-xs text-neutral-400">
              Multi-country campaign coordination from Nairobi
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TERRITORY_MARKETS.map((market) => (
              <div
                key={market.country}
                className="p-4 bg-[#0B0B0D] border border-white/10 rounded-xl"
              >
                <div className="text-sm font-display font-bold text-white mb-1">
                  {market.country}
                </div>
                <div className="text-xs text-[#FF1A1F] font-semibold mb-1.5">{market.role}</div>
                <p className="text-xs text-neutral-400 leading-relaxed">{market.notes}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
