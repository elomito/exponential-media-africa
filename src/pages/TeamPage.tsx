import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { CORE_VALUES, DIVISIONS, HERO_POSTER_IMAGE } from '../data/seedData';

interface TeamPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function TeamPage({ onNavigate, onOpenInquiry }: TeamPageProps) {
  const { teamMembers } = useCms();

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Our Team & Culture — Exponential Media Africa"
        description="Explore Exponential Media Africa's collaborative practice structure and I.D.E.A.L. working culture based at Casamia, Ngong Road, Kilimani, Nairobi."
        path="/team"
        noIndex={teamMembers.length === 0}
        breadcrumbName="Our Team"
      />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide text-[#FF1A1F] mb-3">
          <Users className="w-4 h-4 text-[#FF1A1F]" aria-hidden="true" />
          <span>Team &amp; Practice Culture</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight max-w-4xl [text-wrap:balance] mb-6">
          Multidisciplinary specialists under one Nairobi roof.
        </h1>
        <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Visual designers, content creators, social media managers, influencer strategists, paid media buyers, and field activation coordinators collaborating from A3-10 Casamia, Ngong Road, Kilimani.
        </p>
      </section>

      {/* Published Team Profiles (rendered only when staff records exist) */}
      {teamMembers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-b border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col bg-[#141418] border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-colors"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#08080A]">
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
                    <div className="text-xs font-bold text-[#FF1A1F] mb-1">
                      {member.role}
                    </div>
                    <h2 className="text-xl font-display font-bold text-white tracking-tight mb-1">
                      {member.name}
                    </h2>
                    <div className="text-xs text-neutral-400">{member.division}</div>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed pt-3 border-t border-white/10">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Culture & Integrated Delivery */}
      <section className="bg-[#F8F8F7] text-[#111114] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-2">
                <span className="w-5 h-0.5 bg-[#E50000]" aria-hidden="true" />
                <span>Integrated Delivery</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight [text-wrap:balance]">
                Four connected practices working as one team.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/ecosystem')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#ED2126] text-[#E50000] hover:bg-[#ED2126] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore Practice Model</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIVISIONS.map((div, idx) => (
              <div
                key={div.id}
                className="p-6 bg-white border border-neutral-200 border-t-4 border-t-[#ED2126] hover:border-[#ED2126] rounded-2xl flex flex-col justify-between gap-4 transition-colors"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[#E50000] mb-2 tabular-nums">
                    PILLAR 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">
                    {div.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {div.ecosystemRole}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(`/ecosystem#${div.id}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E50000] hover:text-neutral-900 transition-colors"
                >
                  <span>View {div.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E50000]" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-5 bg-white border border-neutral-200 rounded-xl space-y-1.5"
              >
                <div className="font-mono text-xs font-bold text-[#E50000]">
                  {val.letter} · {val.index}
                </div>
                <div className="text-sm font-display font-bold text-neutral-900">{val.title}</div>
                <p className="text-xs text-neutral-600 leading-relaxed">{val.summary}</p>
              </div>
            ))}
          </div>

          <div className="p-8 sm:p-10 bg-[#0B0B0D] text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Work directly with our Nairobi team.
              </h3>
              <p className="text-sm text-neutral-300">
                Share your objectives to connect with our creative, content, digital, or activation leads.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
