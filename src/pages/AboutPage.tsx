import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { CORE_VALUES, TERRITORY_MARKETS } from '../data/seedData';
import { HERO_POSTER_IMAGE } from '../data/heroImage';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function AboutPage({ onNavigate, onOpenInquiry }: AboutPageProps) {
  const { teamMembers } = useCms();

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="About Us — Exponential Media Africa"
        description="Learn about Exponential Media Africa's background, vision, mission, I.D.E.A.L. core values, and regional footprint from our Nairobi headquarters."
        path="/about"
      />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-16 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#FF1A1F] mb-4">
          <span className="w-5 h-0.5 bg-[#FF1A1F]" aria-hidden="true" />
          <span>About Exponential Media Africa</span>
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.04] max-w-4xl [text-wrap:balance] mb-5 sm:mb-6">
          Imaginative Solutions for Exponential Growth.
        </h1>
        <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Headquartered at A3-10 Casamia along Ngong Road in Kilimani, Nairobi, Exponential Media Africa is a creative and marketing agency serving growth-minded brands across Kenya, Uganda, Rwanda, DRC, and Zambia.
        </p>
      </section>

      {/* Story & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-display font-bold tracking-tight">Who We Are</h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              Exponential Media Africa was built to solve a clear challenge facing ambitious organizations across Africa: strategy, visual branding, content creation, influencer marketing, paid media buying, and live activations too often operate in disconnected silos.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              By bringing all six core services together under one coordinated agency team, we take brands seamlessly from visual identity systems and commercial photography to Meta and TikTok management, creator collaborations, targeted media buy, and memorable store launch activations.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF1A1F] hover:text-white transition-colors"
              >
                <span>Explore all six core services</span>
                <ArrowRight className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 aspect-[4/3] lg:aspect-[5/4]">
            <OptimizedImage
              src={HERO_POSTER_IMAGE}
              alt="Exponential Media Africa commercial content production setup in Nairobi"
              width={1200}
              height={800}
              containerClassName="w-full h-full rounded-2xl border border-white/10"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#F8F8F7] text-[#111114] py-16 md:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="py-6 sm:py-8 pr-4 sm:pr-8 border-t-2 border-[#ED2126]">
            <div className="font-mono text-xs font-bold text-[#E50000] mb-3">01 · OUR VISION</div>
            <h2 className="text-2xl font-display font-bold tracking-tight mb-4">
              Africa&apos;s benchmark creative media agency.
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              To become the leading creative media agency in Africa through knowledge, technology, and exemplary culture.
            </p>
          </div>
          <div className="py-6 sm:py-8 pr-4 sm:pr-8 border-t-2 border-neutral-300">
            <div className="font-mono text-xs font-bold text-[#E50000] mb-3">02 · OUR MISSION</div>
            <h2 className="text-2xl font-display font-bold tracking-tight mb-4">
              Helping brands stand out in the digital age.
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              To Help Brands and Companies stand out in the digital age—uniting visual design, content creation, social media management, influencer partnerships, media buying, and experiential activations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-white/10">
        <div className="mb-12">
          <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#FF1A1F] mb-2">
            <span className="w-5 h-0.5 bg-[#FF1A1F]" aria-hidden="true" />
            <span>I.D.E.A.L. Framework</span>
          </p>
          <h2 className="text-3xl font-display font-bold tracking-tight mb-3">
            Our Five Core Values
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Every client brief and regional campaign is governed by Innovative, Dependable, Ethical, Accountable, and Leadership standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-7">
          {CORE_VALUES.map((val) => (
            <div
              key={val.id}
              className="py-6 border-t border-white/20 space-y-3"
            >
              <div className="font-mono text-xs font-bold text-[#FF1A1F] tabular-nums">
                {val.letter} · {val.index}
              </div>
              <h3 className="text-lg font-display font-bold text-white">{val.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{val.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Regional Footprint & Optional Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
        {teamMembers.length > 0 && (
          <div id="team" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tight mb-2">
                  Our Leadership &amp; Team
                </h2>
                <p className="text-sm text-neutral-400">
                  Multidisciplinary strategists, designers, creators, and activation leads in Nairobi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/ecosystem')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF1A1F] hover:text-white transition-colors"
              >
                <span>Explore integrated practice</span>
                <ArrowRight className="w-4 h-4 text-[#FF1A1F]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="group flex flex-col bg-[#141418] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0B0B0D]">
                    <OptimizedImage
                      src={member.photoUrl || HERO_POSTER_IMAGE}
                      alt={`${member.name} — ${member.role}`}
                      width={600}
                      height={800}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#FF1A1F] mb-1">{member.role}</div>
                      <h3 className="text-xl font-display font-bold text-white mb-1">{member.name}</h3>
                      <div className="text-xs text-neutral-400">{member.division}</div>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed pt-3 border-t border-white/10">
                      {member.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-8">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-2">
              <span className="w-4 h-0.5 bg-[#ED2126]" aria-hidden="true" />
              <span>Geographic Coverage</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Five Active African Markets
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TERRITORY_MARKETS.map((market) => (
              <div
                key={market.country}
                className="p-5 bg-[#141418] border border-white/10 rounded-xl space-y-1.5"
              >
                <div className="text-base font-display font-bold text-white">{market.country}</div>
                <div className="text-xs font-semibold text-[#FF1A1F]">{market.role}</div>
                <p className="text-xs text-neutral-400 leading-relaxed">{market.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10 bg-[#141418] border border-white/15 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Ready to partner with our team?
            </h3>
            <p className="text-sm text-neutral-300">
              Schedule a discovery conversation with our Nairobi strategy and creative leads.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}
