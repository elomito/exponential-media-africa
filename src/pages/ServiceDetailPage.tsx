import React, { useMemo, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Lightbulb,
  Palette,
  PlugZap,
  Rocket,
  Zap,
} from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { ORDERED_SERVICE_DETAILS, SERVICE_DETAILS } from '../data/serviceDetails';
import { findServiceRouteBySlug, getProjectsForService } from '../lib/portfolio';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

const STAGE_FLOW_ICONS = [Lightbulb, ClipboardList, Palette, Rocket, PlugZap] as const;

export function ServiceDetailPage({
  slug,
  onNavigate,
  onOpenInquiry,
}: ServiceDetailPageProps) {
  const { projects } = useCms();
  const { t, localizeServiceDetail, localizeProject } = useLanguage();
  const normalizedSlug = slug.trim().replace(/\/+$/, '').toLowerCase();
  const rawService = SERVICE_DETAILS[normalizedSlug];
  const service = rawService ? localizeServiceDetail(rawService) : undefined;

  const workTrackRef = useRef<HTMLDivElement>(null);
  const otherServicesTrackRef = useRef<HTMLDivElement>(null);

  const previousWorks = useMemo(
    () => (rawService ? getProjectsForService(projects, rawService.slug, 6) : []),
    [projects, rawService]
  );

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

  if (!service || !rawService) {
    return (
      <div className="bg-[#B81118] text-white min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 py-28 text-center space-y-6">
          <SeoHead
            title={`${t.serviceDetail.notFoundTitle} — Exponential Marketing Agency`}
            description={t.serviceDetail.notFoundBody}
            path={`/services/${slug}`}
            noIndex
          />
          <h1 className="text-3xl font-display font-bold">{t.serviceDetail.notFoundTitle}</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-md mx-auto leading-relaxed">
            {t.serviceDetail.notFoundBody}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/services')}
            className="px-6 py-3 text-sm font-bold bg-white text-[#9E0E15] hover:bg-white/90 rounded-md transition-colors"
          >
            {t.serviceDetail.viewServices}
          </button>
        </div>
      </div>
    );
  }

  const otherServices = ORDERED_SERVICE_DETAILS.filter((s) => s.slug !== service.slug).map(
    localizeServiceDetail
  );

  return (
    <div>
      <SeoHead
        title={`${service.title} — Exponential Marketing Agency`}
        description={`${service.tagline} ${service.heroSummary}`}
        path={`/services/${service.slug}`}
        imageUrl={service.heroImageUrl}
        imageAlt={`${service.title} showcase by Exponential Marketing Agency`}
        schemaType="Service"
        parentBreadcrumb={{ name: t.nav.services, path: '/services' }}
        breadcrumbName={service.title}
      />

      {service.heroImageUrl.startsWith('/assets/') ? (
        <section className="relative bg-[#EFF1F4] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[420px] sm:min-h-[490px] lg:min-h-[min(560px,calc(100svh-4.5rem))] flex items-end lg:items-center">
          <div className="lg:hidden absolute inset-x-0 top-0 pointer-events-none select-none hero-media-enter bg-[#EFF1F4]">
            <div className="relative w-full aspect-[16/9] min-h-[225px] max-h-[340px] overflow-hidden">
              <OptimizedImage
                src={service.heroImageUrl}
                alt={`${service.title} — Exponential Marketing Agency`}
                priority
                width={1672}
                height={941}
                containerClassName="absolute inset-0 w-full h-full"
                className="block w-full h-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#EFF1F4] via-[#EFF1F4]/88 via-36% to-transparent to-72%"
              />
            </div>
          </div>

          <div className="hidden lg:block absolute inset-0 pointer-events-none select-none hero-media-enter">
            <OptimizedImage
              src={service.heroImageUrl}
              alt={`${service.title} — Exponential Marketing Agency`}
              priority
              width={1672}
              height={941}
              containerClassName="absolute inset-0 w-full h-full"
              className="block w-full h-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/82 via-44% to-transparent to-62%"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-44 pb-7 sm:pt-56 sm:pb-10 lg:py-20">
            <div className="max-w-xl lg:max-w-none lg:w-[48%] xl:w-[46%]">
              {(() => {
                const words = service.title.trim().split(/\s+/);
                const splitIdx = Math.max(1, words.length - 1);
                const lead = words.slice(0, splitIdx).join(' ');
                const accent = words.slice(splitIdx).join(' ');
                return (
                  <h1 className="text-[2.1rem] sm:text-5xl lg:text-[4rem] xl:text-[4.35rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-3.5 sm:mb-5">
                    <span className="hero-slide-left block text-[#141923]">{lead}</span>
                    {accent && (
                      <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{accent}</span>
                    )}
                  </h1>
                );
              })()}
              <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-lg mb-5 sm:mb-7">
                {service.heroSummary}
              </p>

              <div className="hero-slide-left-delay-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenInquiry(rawService.title)}
                  className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
                >
                  <span>{t.serviceDetail.requestProposal}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href="#service-previous-work"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-sm font-bold border border-[#B81118]/35 text-[#B81118] bg-white/80 hover:bg-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>{t.serviceDetail.explorePreviousWork}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[min(560px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] text-white overflow-hidden border-b border-white/15">
          <HeroBackdrop
            imageUrl={service.heroImageUrl}
            alt={`${service.title} — Exponential Marketing Agency`}
          />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
            <h1 className="hero-slide-left text-[2.5rem] sm:text-5xl lg:text-[4.5rem] font-display font-bold tracking-[-0.04em] leading-[0.98] text-white max-w-4xl [text-wrap:balance] mb-5">
              {service.title}
            </h1>
            <p className="hero-slide-left-delay-1 text-base sm:text-lg text-white/95 max-w-2xl leading-relaxed mb-7">
              {service.heroSummary}
            </p>

            <div className="hero-slide-down-delay-1 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry(rawService.title)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>{t.serviceDetail.requestProposal}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href="#service-previous-work"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold border border-white/75 text-white hover:bg-white/15 rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>{t.serviceDetail.explorePreviousWork}</span>
              </a>
            </div>
          </div>
        </section>
      )}

      <section id="service-previous-work" className="bg-[#B81118] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <Reveal variant="slide-left" className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance]">
                {t.serviceDetail.selectedWorkPrefix} {service.title}.
              </h2>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/work')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/90 hover:text-white transition-colors whitespace-nowrap mr-1"
              >
                <span>{t.serviceDetail.viewFullPortfolio}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
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
            </Reveal>
          </div>

          <Reveal variant="slide-left" delayMs={100}>
            <div
              ref={workTrackRef}
              className="flex flex-nowrap gap-5 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
            >
              {previousWorks.map((rawProject) => {
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
                          src={project.imageUrl}
                          alt={project.title}
                          width={640}
                          height={420}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </div>
                      <div className="text-xs font-medium text-white/80 mb-0.5 truncate">
                        {project.category} · {project.clientName}
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
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-16 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <Reveal variant="slide-left" className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] [text-wrap:balance]">
                {t.serviceDetail.strategicImpact}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#4A2527]">
                {service.tagline}
              </p>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="lg:col-span-7 space-y-4">
              {service.extendedOverview.slice(0, 2).map((paragraph, idx) => (
                <p key={idx} className="text-base sm:text-lg text-[#2A1214] leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <button
                type="button"
                onClick={() => onOpenInquiry(rawService.title)}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors"
              >
                <span>{t.serviceDetail.requestProposal}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#B81118]/12">
            {service.strategicValue.map((item, idx) => (
              <Reveal
                key={item.title}
                variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={idx * 70}
              >
                <div className="rounded-xl bg-[#FAF5F5] p-5 h-full border border-[#B81118]/10 space-y-2">
                  <div className="text-xs font-bold tracking-wider text-[#ED1B24] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#B81118] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4A2527] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <Reveal variant="slide-left" className="max-w-3xl">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance]">
                {service.title} {t.serviceDetail.deliverablesSuffix}
              </h2>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={() => onOpenInquiry(rawService.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.serviceDetail.kickOffBrief}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.deliverablesScope.map((item, idx) => (
              <Reveal
                key={item}
                variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={idx * 45}
              >
                <li className="flex items-start gap-2.5 rounded-xl bg-[#9E0E15]/60 border border-white/15 px-4 py-3.5 h-full text-sm sm:text-base font-semibold text-white leading-snug">
                  <Check className="w-4 h-4 text-white shrink-0 mt-1" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/15">
            <Reveal variant="slide-left" className="lg:col-span-6 space-y-3">
              <h3 className="text-lg font-display font-bold uppercase tracking-tight text-white">
                {t.serviceDetail.bestSuitedFor}
              </h3>
              <ul className="space-y-2.5">
                {service.idealFor.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2.5 text-sm sm:text-base text-white/95 leading-relaxed">
                    <Check className="w-4 h-4 text-white shrink-0 mt-1" aria-hidden="true" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="lg:col-span-6 space-y-3">
              <h3 className="text-lg font-display font-bold uppercase tracking-tight text-white">
                {t.serviceDetail.metricsTracked}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.metricsTracked.map((metric) => (
                  <li
                    key={metric}
                    className="flex items-start gap-2 rounded-lg bg-[#9E0E15]/55 border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-white leading-snug"
                  >
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] [text-wrap:balance]">
                {t.serviceDetail.processHeading}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.home.howWeDeliverSubtitle}
              </p>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry(rawService.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.serviceDetail.kickOffBrief}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors whitespace-nowrap"
              >
                <span>{t.nav.letsTalk}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 border-t-2 border-dashed border-[#B81118]/30"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {service.processStages.map((step, idx) => {
                const Icon = STAGE_FLOW_ICONS[idx % STAGE_FLOW_ICONS.length];
                const isLast = idx === service.processStages.length - 1;
                const stepNum = String(idx + 1).padStart(2, '0');
                return (
                  <Reveal
                    key={step.stage}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 70}
                  >
                    <article className="relative flex flex-col justify-between h-full rounded-2xl bg-[#FAF5F5] p-5 border border-[#B81118]/12 transition-all duration-300 hover:-translate-y-1 hover:border-[#B81118]/35">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B81118] text-white shadow-sm ring-4 ring-white">
                            <Icon className="w-6 h-6" aria-hidden="true" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold tracking-wider text-[#B81118] tabular-nums">
                              {stepNum}
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

                        <h3 className="text-lg font-display font-bold text-[#141923] tracking-tight mb-2 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#4A2527] leading-relaxed mb-4">
                          {step.summary}
                        </p>
                      </div>

                      <ul className="space-y-1.5 pt-3 border-t border-[#B81118]/10">
                        {step.outputs.map((output) => (
                          <li
                            key={output}
                            className="flex items-start gap-2 text-xs font-semibold text-[#B81118]"
                          >
                            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{output}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-14 md:py-20 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <Reveal variant="slide-left" className="max-w-2xl">
                <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance]">
                  {t.serviceDetail.otherServicesHeading}
                </h2>
              </Reveal>

              <Reveal variant="slide-down" delayMs={80} className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollLinearTrack(otherServicesTrackRef, 'prev')}
                  aria-label={t.home.prevPillarsAria}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollLinearTrack(otherServicesTrackRef, 'next')}
                  aria-label={t.home.nextPillarsAria}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#9E0E15] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </Reveal>
            </div>

            <Reveal variant="slide-left" delayMs={100}>
              <div
                ref={otherServicesTrackRef}
                className="flex flex-nowrap gap-5 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch] scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1"
              >
                {otherServices.map((other) => {
                  const thumbUrl = findServiceRouteBySlug(other.slug)?.photoUrl || other.heroImageUrl;
                  return (
                    <article
                      key={other.slug}
                      className="w-[235px] sm:w-[260px] lg:w-[275px] shrink-0 snap-start group"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate(`/services/${other.slug}`)}
                        className="text-left w-full flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1"
                      >
                        <div>
                          <div className="relative h-32 sm:h-36 w-full overflow-hidden rounded-lg mb-3 bg-[#9E0E15]">
                            <OptimizedImage
                              src={thumbUrl}
                              alt={other.title}
                              width={520}
                              height={340}
                              containerClassName="w-full h-full"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight mb-1 leading-snug">
                            {other.title}
                          </h3>
                          <p className="text-xs text-white/85 leading-snug line-clamp-2 mb-2.5">
                            {other.tagline}
                          </p>
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-white/15">
            <Reveal variant="slide-left" className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                {t.serviceDetail.readyPrefix} {service.title}{t.serviceDetail.readySuffix}
              </h3>
              <p className="text-base text-white/90 max-w-xl leading-relaxed">
                {t.serviceDetail.readyBody}
              </p>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={() => onOpenInquiry(rawService.title)}
                className="px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                {t.serviceDetail.startBriefPrefix}
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
