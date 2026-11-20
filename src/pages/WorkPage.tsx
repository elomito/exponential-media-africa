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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#FF1A1F] mb-4">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Our Work &amp; Case Studies</span>
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-[-0.04em] max-w-5xl leading-[1.02] [text-wrap:balance] mb-5 sm:mb-6">
          Work made to move people.
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mb-8 leading-relaxed">
          Selected identity, content, creator and activation work from the Exponential Media Africa portfolio.
        </p>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-xl"
        >
          {(['All', ...PORTFOLIO_CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-y-14">
            {filtered.map((project, index) => (
              <article
                key={project.id}
                className={`group flex flex-col ${index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : 'md:col-span-1 lg:col-span-2'}`}
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`/work/${project.slug}`)}
                  className="text-left flex-1 flex flex-col"
                >
                  <div className={`w-full overflow-hidden bg-[#141418] ${index === 0 ? 'aspect-[4/3] lg:aspect-[1/0.82]' : 'aspect-[16/10]'}`}>
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={project.title}
                      width={800}
                      height={600}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
                    />
                  </div>
                  <div className={`${index === 0 ? 'pt-5 sm:pt-7' : 'pt-4'} flex-1 flex flex-col justify-between`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                        <span className="text-[#FF1A1F] font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.clientName}</span>
                      </div>
                      <h2 className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-display font-bold text-white tracking-tight mb-2 group-hover:text-[#FF1A1F] transition-colors`}>
                        {project.title}
                      </h2>
                      <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                    <div className="pt-3 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white">
                      <span>View project</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ED2126] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              Online brief submission is paused. Contact our Nairobi team by email, phone or WhatsApp to discuss your project.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors whitespace-nowrap"
          >
            Contact the Team
          </button>
        </div>
      </section>
    </div>
  );
}
