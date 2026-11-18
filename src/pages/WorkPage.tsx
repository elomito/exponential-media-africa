import React, { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { PORTFOLIO_CATEGORIES } from '../data/seedData';
import type { PortfolioCategory } from '../types/cms';

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function WorkPage({ onNavigate, onOpenInquiry }: WorkPageProps) {
  const { projects } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<'All' | PortfolioCategory>('All');

  const filtered = useMemo(() => {
    const visible = projects.filter((p) => !p.isPlaceholder);
    if (selectedCategory === 'All') return visible;
    return visible.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Our Work — Exponential Media Africa"
        description="Explore branding, commercial production, photography, videography, influencer campaigns, events, and brand activation case studies."
        path="/work"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-3">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Our Work &amp; Case Studies</span>
        </p>
        <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight max-w-4xl [text-wrap:balance] mb-6">
          Crafted brand systems, productions, and on-ground activations.
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mb-8 leading-relaxed">
          Documented brand identity suites, influencer marketing campaigns, store launch activations, corporate events, and digital print productions delivered across Kenya and East Africa.
        </p>

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-xl"
        >
          {(['All', ...PORTFOLIO_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#ED2126] text-white font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#141418] border border-white/10 rounded-2xl">
            <p className="text-sm text-neutral-300 mb-4">
              No projects published under {selectedCategory} yet.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 text-xs font-semibold bg-[#ED2126] text-white rounded-lg"
            >
              View All Work
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="group bg-[#141418] border border-white/10 border-t-2 border-t-[#ED2126] rounded-2xl overflow-hidden hover:border-[#ED2126] transition-colors flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`/work/${project.slug}`)}
                  className="text-left flex-1 flex flex-col"
                >
                  <div className="h-64 w-full overflow-hidden">
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={project.title}
                      width={800}
                      height={600}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                        <span className="text-[#FF1A1F] font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.clientName}</span>
                      </div>
                      <h2 className="text-xl font-display font-bold text-white tracking-tight mb-2 group-hover:text-[#FF1A1F] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white">
                      <span>Open Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ED2126]" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-[#141418] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-1">
              Have a project in mind?
            </h3>
            <p className="text-sm text-neutral-400">
              Share your brief and our Nairobi leads will assemble a tailored ecosystem proposal.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors whitespace-nowrap"
          >
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}
