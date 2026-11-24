import React, { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { PORTFOLIO_CATEGORIES } from '../data/seedData';
import { CORE_SIX_SERVICES, filterProjectsByCategory, getServiceSlug } from '../lib/portfolio';
import type { PortfolioCategory } from '../types/cms';

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export function WorkPage({ onNavigate, onOpenInquiry }: WorkPageProps) {
  const { projects } = useCms();
  const { t, localizeCategory, localizeProject, localizeServiceBySlug } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'All' | PortfolioCategory>('All');

  const filtered = useMemo(
    () => filterProjectsByCategory(projects, selectedCategory),
    [projects, selectedCategory]
  );

  const titleWords = t.work.heroTitle.trim().split(/\s+/);
  const splitIdx = Math.max(1, titleWords.length - 2);
  const titleLead = titleWords.slice(0, splitIdx).join(' ');
  const titleAccent = titleWords.slice(splitIdx).join(' ');

  return (
    <div>
      <SeoHead
        title={t.seo.workTitle}
        description={t.seo.workDescription}
        path="/work"
        imageUrl={PAGE_HERO_IMAGES.work}
        imageAlt="Exponential Marketing Agency portfolio of client campaigns"
        schemaType="CollectionPage"
        breadcrumbName={t.nav.work}
      />

      <section className="relative bg-[#EAECEF] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[360px] sm:min-h-[420px] lg:min-h-[min(560px,calc(100svh-4.5rem))] flex items-center">
        <div className="absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.work}
            alt="Business owner reviewing campaign results alongside Exponential Marketing Agency portfolio"
            priority
            width={1376}
            height={768}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-[76%_top] sm:object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/82 via-58% to-[#EAECEF]/30 lg:via-[#EAECEF]/62 lg:via-42% lg:to-transparent lg:to-58%"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-[84%] sm:max-w-[68%] lg:max-w-none lg:w-[46%] xl:w-[44%]">
            <h1 className="text-[2.3rem] sm:text-5xl lg:text-[4rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4">
              <span className="hero-slide-left block text-[#141923]">{titleLead}</span>
              {titleAccent && (
                <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{titleAccent}</span>
              )}
            </h1>

            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] max-w-lg leading-relaxed">
              {t.work.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {selectedCategory === 'All'
                  ? t.work.featuredHeading
                  : `${localizeCategory(selectedCategory)} ${t.work.categoryHeadingSuffix}`}
              </h2>
            </Reveal>

            <Reveal
              variant="slide-down"
              delayMs={75}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                {(['All', ...PORTFOLIO_CATEGORIES] as const).map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-1 text-xs sm:text-sm transition-colors whitespace-nowrap ${
                        active
                          ? 'text-white font-bold'
                          : 'text-white/70 hover:text-white font-medium'
                      }`}
                    >
                      {localizeCategory(cat)}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-base text-white/90 mb-4">{t.work.noProjects}</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 text-sm font-bold bg-white text-[#9E0E15] rounded-md"
              >
                {t.work.viewAllWork}
              </button>
            </div>
          ) : (
            <div
              key={selectedCategory}
              className="route-enter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
            >
              {filtered.map((rawProject, index) => {
                const project = localizeProject(rawProject);
                return (
                  <Reveal
                    key={project.id}
                    variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={(index % 6) * 55}
                  >
                    <article className="group">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/work/${project.slug}`)}
                        className="text-left w-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-lg mb-3 bg-[#9E0E15]">
                          <OptimizedImage
                            src={project.imageUrl}
                            alt={project.title}
                            width={640}
                            height={420}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                          />
                        </div>
                        <div className="text-xs font-medium text-white/80 mb-1 truncate">
                          {project.category}
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug line-clamp-2 group-hover:opacity-85 transition-opacity">
                            {project.title}
                          </h3>
                          <ArrowUpRight
                            className="w-4 h-4 text-white/80 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Reveal variant="slide-left" className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
              {t.work.exploreByCoreHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#4A2527] leading-relaxed">
              {t.work.exploreByCoreBody}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {CORE_SIX_SERVICES.map((service, idx) => {
              const slug = getServiceSlug(service);
              return (
                <Reveal
                  key={service}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 55}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${slug}`)}
                    className="text-left group flex items-center justify-between gap-3 rounded-lg bg-[#FAF5F5] hover:bg-[#F5EBEB] px-4 py-3 text-xs sm:text-sm font-semibold text-[#B81118] transition-colors w-full"
                  >
                    <span>{localizeServiceBySlug(slug, service)}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-14 md:py-18 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white mb-2">
              {t.work.ctaHeading}
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
              {t.work.ctaBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>{t.work.startBrief}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
