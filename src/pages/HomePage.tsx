import React, { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { SeoHead } from '../components/SeoHead';
import { WorldwidePartnersMarquee } from '../components/WorldwidePartnersMarquee';
import { useCms } from '../context/CmsContext';
import {
  CORE_VALUES,
  DIVISIONS,
  PORTFOLIO_CATEGORIES,
  TERRITORY_MARKETS,
} from '../data/seedData';
import { HERO_POSTER_IMAGE } from '../data/heroImage';
import type { DivisionId, PortfolioCategory } from '../types/cms';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

const ENGAGEMENT_WORKFLOW = [
  {
    step: '01',
    title: 'Brief Discovery & Strategy',
    detail:
      'Aligning brand objectives, target audience segments, and market context across Kenya and regional African territories.',
  },
  {
    step: '02',
    title: 'Visual Identity & Content Creation',
    detail:
      'Developing cohesive brand design, promotional artwork, copywriting, commercial photography, and campaign video.',
  },
  {
    step: '03',
    title: 'Channel Rollout & Creator Partnerships',
    detail:
      'Executing Meta and TikTok management, vetted influencer collaborations, targeted paid media buying, and mall activations.',
  },
  {
    step: '04',
    title: 'Optimization & Performance Reporting',
    detail:
      'Tracking reach, engagement, ad spend efficiency, and on-ground consumer response to refine ongoing growth.',
  },
];

export function HomePage({ onNavigate, onOpenInquiry }: HomePageProps) {
  const { settings, projects, services, articles, testimonials, clientLogos, teamMembers } =
    useCms();
  const [activeCategory, setActiveCategory] = useState<'All' | PortfolioCategory>('All');
  const [activeCapabilityDivision, setActiveCapabilityDivision] = useState<DivisionId>('creative');
  const [activeValueId, setActiveValueId] = useState(CORE_VALUES[0].id);

  const filteredProjects = useMemo(() => {
    const visible = projects.filter((p) => !p.isPlaceholder);
    if (activeCategory === 'All') return visible;
    return visible.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const activeDivisionServices = useMemo(
    () => services.filter((s) => s.division === activeCapabilityDivision),
    [services, activeCapabilityDivision]
  );

  const selectedValue = CORE_VALUES.find((v) => v.id === activeValueId) || CORE_VALUES[0];

  const impactList = [
    settings.impactMetrics.brandsServed,
    settings.impactMetrics.geographicReach,
    settings.impactMetrics.projectsCompleted,
    settings.impactMetrics.campaignsExecuted,
    settings.impactMetrics.yearsExperience,
  ].filter((m) => m && !m.isPlaceholder);

  return (
    <div>
      <SeoHead
        title="Exponential Media Africa — Helping Brands Stand Out in the Digital Age"
        description="Imaginative Solutions for Exponential Growth. Social media management, content creation, influencer marketing, media buy, brand activations, and visual design across East, Central, and Southern Africa."
        path="/"
      />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[min(820px,calc(100svh-4rem))] flex items-end bg-[#0B0B0D] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <OptimizedImage
            src={HERO_POSTER_IMAGE}
            alt="Exponential Media Africa commercial content production setup in Nairobi"
            priority
            width={1920}
            height={1080}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-[58%_center] opacity-65 scale-[1.01] transition-transform duration-[4000ms] motion-reduce:transform-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/65 to-[#0B0B0D]/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/90 via-[#0B0B0D]/40 to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="max-w-4xl lg:col-span-9">
            <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#FF1A1F] mb-5">
              <span className="w-6 h-0.5 bg-[#ED2126]" aria-hidden="true" />
              <span>Imaginative Solutions for Exponential Growth · Nairobi, Kenya</span>
            </p>
            <h1 className="text-[2.65rem] sm:text-6xl lg:text-[5.25rem] font-display font-bold tracking-[-0.045em] leading-[0.98] text-white max-w-5xl [text-wrap:balance] mb-6 sm:mb-7">
              <span className="block">Helping brands</span>
              <span className="block text-[#FF3A3F]">stand out.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mb-8 sm:mb-10">
              Exponential Media Africa brings visual design, content creation, social media, influencer marketing, media buying and brand activation together for brands in the region.
            </p>

            <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-md transition-colors whitespace-nowrap"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold border border-white/35 text-white hover:bg-white/10 rounded-md transition-colors whitespace-nowrap"
              >
                <span>Talk to our team</span>
              </button>
            </div>
          </div>
          <aside className="hidden lg:block lg:col-span-3 border-l border-white/30 pl-5 pb-1 text-sm text-white/85">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#FF3A3F] mb-3">WHAT WE DO</div>
            <ul className="space-y-2.5 text-xs xl:text-sm">
              {['Social Media Management', 'Content Creation & Marketing', 'Influencer Marketing', 'Media Buying', 'Brand Activation', 'Visual Design'].map((service, index) => (
                <li key={service} className="flex gap-3"><span className="font-mono text-[10px] text-white/45">0{index + 1}</span><span>{service}</span></li>
              ))}
            </ul>
          </aside>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION (Light Canvas Contrast Rhythm) */}
      <section className="bg-[#F8F8F7] text-[#111114] py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>01. Integrated Agency Model</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight leading-[1.08] [text-wrap:balance]">
                COHESIVE BRAND GROWTH UNDER ONE COORDINATED TEAM.
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                Brands often lose momentum when design, commercial shoots, influencer partnerships, paid media buying, and field activations sit with disconnected vendors. From our Nairobi headquarters at Casamia, Kilimani, Exponential Media Africa executes them together.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                Visual design defines the standard; photography, video, and copy bring the story to life; social management, creators, and media buy amplify reach; and brand activations convert attention into trial.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-neutral-200">
                {[
                  { step: '01', label: 'Visual Design', sub: 'Identity & Print' },
                  { step: '02', label: 'Content', sub: 'Photo, Video & Copy' },
                  { step: '03', label: 'Digital & Reach', sub: 'Social, Creators & Ads' },
                  { step: '04', label: 'Activations', sub: 'Events & Sampling' },
                ].map((item) => (
                  <div key={item.step} className="space-y-1">
                    <div className="font-mono text-xs font-bold text-[#E50000] tabular-nums">
                      {item.step}
                    </div>
                    <div className="text-sm font-semibold text-neutral-900">{item.label}</div>
                    <div className="text-xs text-neutral-500">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONNECTED PRACTICE PILLARS */}
      <section className="bg-[#0B0B0D] text-white py-20 md:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#FF1A1F] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>02. Practice Architecture</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                Four connected pillars built to work as one.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/ecosystem')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF1A1F] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>How our practice connects</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIVISIONS.map((division, idx) => (
              <article
                key={division.id}
                className="group relative flex flex-col justify-between bg-[#141418] border border-white/10 rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <OptimizedImage
                    src={division.imageUrl}
                    alt={division.imageAlt}
                    width={960}
                    height={720}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/35 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: division.accentHex }}
                  />
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span className="font-mono tabular-nums text-[#FF1A1F] font-semibold">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{division.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-3">
                      {division.name}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {division.description}
                    </p>
                    <div className="pt-4 border-t border-white/10 mb-6">
                      <div className="text-xs font-medium text-neutral-400 mb-2">
                        Core Focus Areas
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {division.services.slice(0, 6).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/ecosystem#${division.id}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#FF1A1F] transition-colors"
                    >
                      <span>Explore {division.shortName}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(division.services[0])}
                      className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                      Request Brief
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED WORK (Asymmetric Grid + Category Filters) */}
      <section className="bg-[#FFFFFF] text-[#111114] py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>03. Featured Work</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                Selected campaigns and brand systems.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#ED2126] text-[#E50000] hover:bg-[#ED2126] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>View full portfolio</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div
            role="group"
            aria-label="Filter portfolio by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 border border-neutral-200 rounded-xl mb-10"
          >
            {(['All', ...PORTFOLIO_CATEGORIES] as const).map((cat) => {
              const selected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selected
                      ? 'bg-[#ED2126] text-white font-semibold'
                      : 'text-neutral-700 hover:text-[#E50000]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center border border-neutral-200 rounded-2xl bg-neutral-50">
              <p className="text-sm text-neutral-600 mb-4">
                No case studies are published under &ldquo;{activeCategory}&rdquo; yet.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="px-4 py-2 text-xs font-semibold bg-[#0B0B0D] text-white rounded-lg"
              >
                Show All Categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {filteredProjects.slice(0, 5).map((project, idx) => {
                const spanClass =
                  idx === 0
                    ? 'md:col-span-7'
                    : idx === 1
                    ? 'md:col-span-5'
                    : 'md:col-span-4';
                return (
                  <article
                    key={project.id}
                    className={`${spanClass} group flex flex-col bg-[#F8F8F7] border border-neutral-200 border-t-4 border-t-[#ED2126] rounded-2xl overflow-hidden hover:border-[#ED2126] transition-colors`}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(`/work/${project.slug}`)}
                      className="text-left flex-1 flex flex-col"
                    >
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <OptimizedImage
                          src={project.imageUrl}
                          alt={project.title}
                          width={960}
                          height={640}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-2">
                            <span className="font-bold text-[#E50000]">{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.clientName}</span>
                          </div>
                          <h3 className="text-xl font-display font-bold text-neutral-900 tracking-tight mb-2 group-hover:text-[#E50000] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2">
                            {project.summary}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-900">
                          <span>Read Case Study</span>
                          <ArrowUpRight className="w-4 h-4 text-[#ED2126] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: OUR CAPABILITIES (6 Documented Services) */}
      <section className="bg-[#0B0B0D] text-white py-20 md:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#FF1A1F] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>04. Our Capabilities</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                Six core services built around commercial growth.
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter capabilities by practice area"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-xl"
            >
              {DIVISIONS.map((div) => {
                const active = activeCapabilityDivision === div.id;
                return (
                  <button
                    key={div.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCapabilityDivision(div.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#ED2126] text-white font-semibold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {div.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${
              activeDivisionServices.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl'
            }`}
          >
            {activeDivisionServices.map((srv, idx) => (
              <div
                key={srv.id}
                className="p-6 sm:p-8 bg-[#141418] border border-white/10 border-t-2 border-t-[#ED2126] rounded-2xl flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="font-mono text-xs text-[#FF1A1F] font-semibold mb-3 tabular-nums">
                    0{idx + 1} · {DIVISIONS.find((d) => d.id === srv.division)?.shortName}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-200 mb-2">
                    Problem solved: {srv.problemSolved}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">{srv.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(srv.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#FF1A1F] transition-colors"
                  >
                    <span>Inquire about this service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ED2126]" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/services')}
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    All 6 services
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR IMPACT, TERRITORY & OUR CLIENTS */}
      <section className="bg-[#F8F8F7] text-[#111114] py-20 md:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="space-y-8">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>05. Our Impact &amp; Territory</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight [text-wrap:balance]">
                Documented reach across Kenya and five regional markets.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {impactList.map((metric) => (
                <div
                  key={metric.id}
                  className="p-6 bg-white border border-neutral-200 border-t-4 border-t-[#ED2126] rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#E50000] mb-2">{metric.label}</div>
                    <div className="text-2xl font-display font-bold tracking-tight text-neutral-900 tabular-nums mb-2">
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 leading-snug">
                    {metric.unitOrContext}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-neutral-200">
                <div>
                  <span className="text-xs font-bold tracking-wide text-[#E50000]">
                    Our Territory · Active Markets
                  </span>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mt-0.5">
                    Kenya, Uganda, Rwanda, DRC &amp; Zambia
                  </h3>
                </div>
                <span className="text-xs text-neutral-500">
                  Regional coordination from Nairobi HQ
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {TERRITORY_MARKETS.map((market) => (
                  <div
                    key={market.country}
                    className="p-4 bg-[#F8F8F7] border border-neutral-200 hover:border-[#ED2126] rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-[#ED2126]"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-display font-bold text-neutral-900">
                        {market.country}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#E50000] mb-1">
                      {market.role}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{market.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <WorldwidePartnersMarquee logos={clientLogos} />
        </div>
      </section>

      {/* SECTION 7: CORE VALUES (I.D.E.A.L.) & VERIFIED TESTIMONIALS */}
      <section className="bg-[#0B0B0D] text-white py-20 md:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-3">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>07. Core Values · I.D.E.A.L.</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4 [text-wrap:balance]">
                Five principles guiding every brief we accept.
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every Exponential engagement is anchored in I.D.E.A.L.—Innovative, Dependable, Ethical, Accountable, and Leadership. Select a pillar to explore how it shapes execution.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2">
                {CORE_VALUES.map((val) => {
                  const active = val.id === selectedValue.id;
                  return (
                    <button
                      key={val.id}
                      type="button"
                      onClick={() => setActiveValueId(val.id)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                        active
                          ? 'bg-[#ED2126] border-[#ED2126] text-white font-semibold'
                          : 'bg-[#141418] border-white/10 text-neutral-300 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {val.letter} · {val.title}
                    </button>
                  );
                })}
              </div>

              <div className="p-8 bg-[#141418] border border-white/10 border-t-2 border-t-[#ED2126] rounded-2xl">
                <div className="font-mono text-xs text-[#FF1A1F] font-semibold mb-2 tabular-nums">
                  {selectedValue.letter} · VALUE {selectedValue.index}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {selectedValue.title}
                </h3>
                <p className="text-base font-medium text-neutral-200 mb-3">
                  {selectedValue.summary}
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {selectedValue.detail}
                </p>
              </div>
            </div>
          </div>

          {testimonials.length > 0 && (
            <div className="pt-16 border-t border-white/10">
              <div className="mb-10">
                <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-2">
                  <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                  <span>08. Client Perspectives</span>
                </p>
                <h2 className="text-3xl font-display font-bold tracking-tight">
                  Client Testimonials
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                  <blockquote
                    key={item.id}
                    className="p-8 bg-[#141418] border border-white/10 rounded-2xl flex flex-col justify-between gap-6"
                  >
                    <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <footer className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.clientName}</div>
                        <div className="text-xs text-neutral-400">
                          {item.clientRole} · {item.companyName}
                        </div>
                      </div>
                      {item.videoUrl && (
                        <a
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 text-[#ED2126]" aria-hidden="true" />
                          <span>Video</span>
                        </a>
                      )}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 8: TEAM (WHEN POPULATED) OR INTEGRATED DELIVERY WORKFLOW */}
      <section id="team" className="bg-[#F8F8F7] text-[#111114] py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-2">
                    <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                    <span>08. Our Team</span>
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                    Leadership and specialists across Nairobi.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/team')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#ED2126] text-[#E50000] hover:bg-[#ED2126] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Our Team</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <article
                    key={member.id}
                    className="group flex flex-col bg-white border border-neutral-200 border-t-4 border-t-[#ED2126] hover:border-[#ED2126] rounded-2xl overflow-hidden transition-colors"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
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
                        <div className="text-xs font-bold text-[#E50000] mb-1">
                          {member.role}
                        </div>
                        <h3 className="text-xl font-display font-bold text-neutral-900 tracking-tight mb-1">
                          {member.name}
                        </h3>
                        <div className="text-xs text-neutral-500">{member.division}</div>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed pt-3 border-t border-neutral-200">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-2">
                    <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                    <span>08. How We Work</span>
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                    From strategy brief to on-ground execution.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#ED2126] text-[#E50000] hover:bg-[#ED2126] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>About Our Agency</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ENGAGEMENT_WORKFLOW.map((stage) => (
                  <div
                    key={stage.step}
                    className="p-6 bg-white border border-neutral-200 border-t-4 border-t-[#ED2126] rounded-2xl flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-[#E50000] mb-2 tabular-nums">
                        STAGE {stage.step}
                      </div>
                      <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 9: INSIGHTS */}
      <section className="bg-[#FFFFFF] text-[#111114] py-20 md:py-28 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wide text-[#E50000] mb-2">
                <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>09. Insights &amp; Editorial</span>
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight [text-wrap:balance]">
                Perspectives from Nairobi&apos;s marketing frontlines.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/insights')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 border-[#ED2126] text-[#E50000] hover:bg-[#ED2126] hover:text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <span>All insights</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="group flex flex-col border border-neutral-200 border-t-4 border-t-[#ED2126] rounded-2xl overflow-hidden bg-[#F8F8F7] hover:border-[#ED2126] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`/insights/${article.slug}`)}
                  className="text-left flex-1 flex flex-col"
                >
                  <div className="h-52 w-full overflow-hidden">
                    <OptimizedImage
                      src={article.imageUrl}
                      alt={article.title}
                      width={720}
                      height={480}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-3">
                        <span className="font-bold text-[#E50000]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={article.publishedDate}>{article.publishedDate}</time>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-display font-bold text-neutral-900 tracking-tight mb-2 group-hover:text-[#E50000] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-900">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="bg-[#0B0B0D] text-white py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-4">
            <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
            <span>Start a Collaboration</span>
          </p>
          <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tight [text-wrap:balance] mb-6">
            READY TO MAKE SOMETHING EXTRAORDINARY?
          </h2>
          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Imaginative Solutions for Exponential Growth. Let&apos;s turn your brief into campaigns and brand experiences that move audiences across Africa.
          </p>
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
