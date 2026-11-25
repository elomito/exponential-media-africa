import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Megaphone,
  Palette,
  Play,
  PlugZap,
  Zap,
} from 'lucide-react';
import { LiveCounter } from '../components/LiveCounter';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { WorldwidePartnersMarquee } from '../components/WorldwidePartnersMarquee';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { PORTFOLIO_CATEGORIES } from '../data/seedData';
import { getArticleCardImageUrl, getProjectCardImageUrl } from '../data/cardImages';
import {
  CORE_SERVICE_ROUTES,
  filterProjectsByCategory,
  getServiceSlug,
} from '../lib/portfolio';
import { isSafeExternalHttpUrl } from '../lib/validation';
import type { PortfolioCategory } from '../types/cms';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

const DELIVERY_STEP_ICONS = [Lightbulb, Palette, Megaphone, PlugZap] as const;

export function HomePage({ onNavigate, onOpenInquiry }: HomePageProps) {
  const { settings, projects, services, articles, testimonials, clientLogos } =
    useCms();
  const {
    t,
    localizeService,
    localizeProject,
    localizeArticle,
    localizeCategory,
    localizeImpactMetric,
  } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<'All' | PortfolioCategory>('All');
  const [counterReplayKeys, setCounterReplayKeys] = useState<Record<string, number>>({});
  const workTrackRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const insightsTrackRef = useRef<HTMLDivElement>(null);

  const replayMetricCounter = (metricId: string) => {
    setCounterReplayKeys((prev) => ({
      ...prev,
      [metricId]: (prev[metricId] || 0) + 1,
    }));
  };

  const filteredProjects = useMemo(
    () => filterProjectsByCategory(projects, activeCategory),
    [projects, activeCategory]
  );

  const orderedSixServices = useMemo(() => {
    const bySlug = new Map(
      services.map((srv) => [getServiceSlug(srv.title), srv])
    );
    return CORE_SERVICE_ROUTES.map((route) => {
      const matched = bySlug.get(route.slug);
      return {
        slug: route.slug,
        photoUrl: route.photoUrl,
        service: matched || {
          id: `core-${route.slug}`,
          division: 'marketing' as const,
          title: route.title,
          problemSolved: '',
          description: '',
          order: 0,
          status: 'published' as const,
          isDeleted: false,
        },
      };
    });
  }, [services]);

  const handleCategorySelect = (cat: 'All' | PortfolioCategory) => {
    setActiveCategory(cat);
    if (workTrackRef.current) {
      workTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollLinearTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'prev' | 'next'
  ) => {
    const el = ref.current;
    if (!el) return;
    const step = Math.max(280, Math.round(el.clientWidth * 0.65));
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

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
        title={t.seo.homeTitle}
        description={t.seo.homeDescription}
        keywords={t.seo.homeKeywords}
        path="/"
        imageUrl={PAGE_HERO_IMAGES.home}
        imageAlt="Exponential Marketing Agency strategist in Nairobi"
      />

      <section className="relative bg-[#EAECEF] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[380px] sm:min-h-[440px] lg:min-h-[min(560px,calc(100svh-4.5rem))] flex items-center">
        <div className="absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.home}
            alt="Exponential Marketing Agency strategist in red blazer holding a laptop"
            priority
            width={1376}
            height={768}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-[76%_top] sm:object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/82 via-58% to-[#EAECEF]/30 lg:via-[#EAECEF]/62 lg:via-45% lg:to-transparent lg:to-60%"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-[86%] sm:max-w-[70%] lg:max-w-none lg:w-[50%] xl:w-[48%]">
            <h1 className="text-[2.35rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4 sm:mb-6">
              <span className="hero-slide-left block text-[#141923]">{t.home.heroLine1}</span>
              <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{t.home.heroLine2}</span>
            </h1>

            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-lg mb-6 sm:mb-8">
              {t.home.heroSubtitle}
            </p>

            <div className="hero-slide-left-delay-3">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
              >
                <span>{t.home.grabCoffeeCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="recent-work" className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.home.recentWorkHeading}
              </h2>
            </Reveal>

            <Reveal variant="slide-down" delayMs={70} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div
                role="group"
                aria-label="Filter recent work by category"
                className="flex flex-wrap items-center gap-x-4 gap-y-1"
              >
                {(['All', ...PORTFOLIO_CATEGORIES] as const).map((cat) => {
                  const selected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => handleCategorySelect(cat)}
                      className={`py-1 text-xs sm:text-sm transition-colors whitespace-nowrap ${
                        selected
                          ? 'text-white font-bold underline underline-offset-4'
                          : 'text-white/75 hover:text-white font-medium'
                      }`}
                    >
                      {localizeCategory(cat)}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 ml-auto lg:ml-2">
                <button
                  type="button"
                  onClick={() => scrollLinearTrack(workTrackRef, 'prev')}
                  aria-label={t.home.prevWorkAria}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollLinearTrack(workTrackRef, 'next')}
                  aria-label={t.home.nextWorkAria}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm sm:text-base text-white/90 mb-3">
                {t.home.noProjectsUnder}
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect('All')}
                className="px-4 py-2 text-xs font-bold bg-white text-[#9E0E15] rounded-md"
              >
                {t.home.showAllCategories}
              </button>
            </div>
          ) : (
            <Reveal variant="slide-left" delayMs={90}>
              <div
                key={activeCategory}
                ref={workTrackRef}
                className="route-enter flex flex-nowrap gap-5 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
              >
                {filteredProjects.map((rawProject) => {
                  const project = localizeProject(rawProject);
                  return (
                    <article
                      key={project.id}
                      className="w-[245px] sm:w-[275px] lg:w-[295px] shrink-0 snap-start group"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate(`/work/${project.slug}`)}
                        className="text-left w-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-lg mb-3 bg-[#9E0E15]">
                          <OptimizedImage
                            src={getProjectCardImageUrl(project)}
                            alt={project.title}
                            width={640}
                            height={420}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                          />
                        </div>
                        <div className="text-xs font-medium text-white/80 mb-0.5 truncate">
                          {project.category}
                        </div>
                        <h3 className="text-base font-display font-bold text-white leading-snug line-clamp-2 group-hover:opacity-85 transition-opacity">
                          {project.title}
                        </h3>
                      </button>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          )}

          <Reveal variant="slide-down" delayMs={120} className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/90 hover:text-white transition-colors"
            >
              <span>{t.home.viewFullPortfolio}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-16 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <Reveal variant="slide-left" className="lg:col-span-5">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] [text-wrap:balance]">
                {t.home.introHeading}
              </h2>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="lg:col-span-7 space-y-4">
              <p className="text-base sm:text-lg text-[#2A1214] leading-relaxed">
                {t.home.introP1}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors"
              >
                <span>{t.home.learnMoreCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          {impactList.length > 0 && (
            <div
              id="markets-impact"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-[#B81118]/12"
            >
              {impactList.map((rawMetric, idx) => {
                const metric = localizeImpactMetric(rawMetric);
                const replayCount = counterReplayKeys[metric.id] || 0;
                return (
                  <Reveal
                    key={metric.id}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 75}
                  >
                    <button
                      type="button"
                      onClick={() => replayMetricCounter(metric.id)}
                      aria-label={`${metric.label}: ${metric.value}`}
                      className="group w-full text-left flex flex-col justify-start rounded-xl p-3 -m-3 transition-all duration-200 hover:bg-[#FAF5F5] cursor-pointer"
                    >
                      <div className="text-xs font-bold text-[#4A2527] mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#B81118] group-hover:text-[#ED1B24] transition-colors tabular-nums">
                        <LiveCounter value={metric.value} durationMs={1600} replayTrigger={replayCount} />
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <Reveal variant="slide-left" className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance]">
                {t.home.sixPillarsHeading}
              </h2>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/90 hover:text-white transition-colors whitespace-nowrap mr-1"
              >
                <span>{t.home.howPracticeConnects}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollLinearTrack(servicesTrackRef, 'prev')}
                aria-label={t.home.prevPillarsAria}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollLinearTrack(servicesTrackRef, 'next')}
                aria-label={t.home.nextPillarsAria}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <Reveal variant="slide-left" delayMs={100}>
            <div
              ref={servicesTrackRef}
              className="flex flex-nowrap gap-5 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
            >
              {orderedSixServices.map(({ slug, photoUrl, service }) => {
                const srv = localizeService(service);
                return (
                  <article
                    key={slug}
                    className="w-[235px] sm:w-[260px] lg:w-[275px] shrink-0 snap-start group"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(`/services/${slug}`)}
                      className="text-left w-full flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div>
                        <div className="relative h-32 sm:h-36 w-full overflow-hidden rounded-lg mb-3 bg-[#9E0E15]">
                          <OptimizedImage
                            src={photoUrl}
                            alt={srv.title}
                            width={520}
                            height={340}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                          />
                        </div>

                        <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight mb-1 leading-snug">
                          {srv.title}
                        </h3>
                        {srv.problemSolved && (
                          <p className="text-xs text-white/85 leading-snug line-clamp-2 mb-2.5">
                            {srv.problemSolved}
                          </p>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:opacity-85 transition-opacity">
                        <span>{t.home.readMoreCta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-we-deliver" className="bg-white text-[#2A1214] py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] [text-wrap:balance]">
                {t.home.howWeDeliverHeading}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.home.howWeDeliverSubtitle}
              </p>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.nav.letsTalk}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors whitespace-nowrap"
              >
                <span>{t.home.aboutAgencyCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#B81118]/30"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {t.home.workflowStages.map((stage, idx) => {
                const Icon = DELIVERY_STEP_ICONS[idx % DELIVERY_STEP_ICONS.length];
                const isLast = idx === t.home.workflowStages.length - 1;
                return (
                  <Reveal
                    key={stage.step}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 85}
                  >
                    <div className="relative flex flex-col h-full rounded-2xl bg-[#FAF5F5] p-6 border border-[#B81118]/12 transition-all duration-300 hover:-translate-y-1 hover:border-[#B81118]/35">
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B81118] text-white shadow-sm ring-4 ring-white">
                          <Icon className="w-6 h-6" aria-hidden="true" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold tracking-wider text-[#B81118] tabular-nums">
                            {stage.step}
                          </span>
                          {!isLast ? (
                            <ArrowRight
                              className="w-4 h-4 text-[#B81118]/60 hidden lg:block"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#ED1B24]">
                              <Zap className="w-3.5 h-3.5 fill-[#ED1B24]" aria-hidden="true" />
                              <span>{t.home.plugInLabel}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-bold text-[#141923] tracking-tight mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#4A2527] leading-relaxed">
                        {stage.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {testimonials.length > 0 && (
            <div className="pt-8 border-t border-[#B81118]/12">
              <Reveal variant="slide-left" className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight uppercase text-[#B81118]">
                  {t.home.clientPerspectivesHeading}
                </h3>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((item, idx) => (
                  <Reveal
                    key={item.id}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 85}
                  >
                    <blockquote className="flex flex-col justify-between gap-4 rounded-xl bg-[#FAF5F5] p-6">
                      <p className="text-base text-[#2A1214] leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <footer className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-bold text-[#B81118]">{item.clientName}</div>
                          <div className="text-xs text-[#4A2527]">
                            {item.clientRole} · {item.companyName}
                          </div>
                        </div>
                        {item.videoUrl && isSafeExternalHttpUrl(item.videoUrl) && (
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#B81118] text-white hover:bg-[#9E0E15] rounded-md transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Video</span>
                          </a>
                        )}
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="latest-insights" className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.home.latestInsightsHeading}
              </h2>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/90 hover:text-white transition-colors whitespace-nowrap mr-1"
              >
                <span>{t.home.allInsightsCta}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollLinearTrack(insightsTrackRef, 'prev')}
                aria-label={t.home.prevInsightsAria}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollLinearTrack(insightsTrackRef, 'next')}
                aria-label={t.home.nextInsightsAria}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <Reveal variant="slide-left" delayMs={100}>
            <div
              ref={insightsTrackRef}
              className="flex flex-nowrap gap-5 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
            >
              {articles.map((rawArticle) => {
                const article = localizeArticle(rawArticle);
                return (
                  <article
                    key={article.id}
                    className="w-[245px] sm:w-[275px] lg:w-[295px] shrink-0 snap-start group"
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(`/insights/${article.slug}`)}
                      className="text-left w-full flex flex-col transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-lg mb-3 bg-[#9E0E15]">
                        <OptimizedImage
                          src={getArticleCardImageUrl(article)}
                          alt={article.title}
                          width={640}
                          height={420}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </div>
                      <div className="text-xs font-medium text-white/80 mb-0.5 truncate">
                        {article.category} · {article.readTime}
                      </div>
                      <h3 className="text-base font-display font-bold text-white leading-snug line-clamp-2 group-hover:opacity-85 transition-opacity">
                        {article.title}
                      </h3>
                    </button>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorldwidePartnersMarquee logos={clientLogos} surface="light" />
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24 border-b border-white/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal variant="slide-down">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance] mb-5">
              {t.home.finalCtaHeading}
            </h2>
          </Reveal>
          <Reveal variant="slide-left" delayMs={80}>
            <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto leading-relaxed mb-8">
              {t.home.finalCtaBody}
            </p>
          </Reveal>
          <Reveal variant="pop" delayMs={150}>
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              <span>{t.home.startProjectCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
