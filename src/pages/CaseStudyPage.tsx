import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MapPin, Users } from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { getFallbackDetailForProject, PROJECT_DETAILS } from '../data/projectDetails';
import { DIVISIONS, PROJECT_SUPPLEMENTAL_MEDIA } from '../data/seedData';
import { findProjectBySlug, getRelatedProjects } from '../lib/portfolio';

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function CaseStudyPage({ slug, onNavigate, onOpenInquiry }: CaseStudyPageProps) {
  const { projects } = useCms();
  const { t, localizeProject, localizeDivision, localizeServiceTitle } = useLanguage();
  const rawProject = findProjectBySlug(projects, slug);
  const project = rawProject ? localizeProject(rawProject) : undefined;

  if (!project || !rawProject) {
    return (
      <div className="bg-[#B81118] text-white min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 py-28 text-center">
          <SeoHead
            title={`${t.caseStudy.notFoundTitle} — Exponential Marketing Agency`}
            description={t.caseStudy.notFoundBody}
            path={`/work/${slug}`}
            noIndex
          />
          <h1 className="text-3xl font-display font-bold mb-4">{t.caseStudy.notFoundTitle}</h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
            {t.caseStudy.notFoundBody}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="px-5 py-2.5 text-sm font-bold bg-white text-[#9E0E15] hover:bg-white/90 rounded-md"
          >
            {t.caseStudy.backToWork}
          </button>
        </div>
      </div>
    );
  }

  const rawDivision = DIVISIONS.find((d) => d.id === project.division);
  const division = rawDivision ? localizeDivision(rawDivision) : undefined;
  const supplemental = PROJECT_SUPPLEMENTAL_MEDIA[project.slug];
  const detail = PROJECT_DETAILS[project.slug] || getFallbackDetailForProject(rawProject);
  const relatedProjects = getRelatedProjects(projects, project.slug, 3).map(localizeProject);

  return (
    <div>
      <SeoHead
        title={`${project.title} (${project.clientName}) — Exponential`}
        description={project.summary}
        path={`/work/${project.slug}`}
        imageUrl={project.imageUrl}
        imageAlt={`${project.title} campaign visual for ${project.clientName}`}
        parentBreadcrumb={{ name: t.nav.work, path: '/work' }}
        breadcrumbName={project.title}
      />

      <section className="relative min-h-[min(600px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] text-white overflow-hidden border-b border-white/15">
        <HeroBackdrop imageUrl={project.imageUrl} alt={project.title} />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.caseStudy.backToWork}</span>
          </button>

          <div className="hero-pop flex flex-wrap items-center gap-2.5 text-sm tracking-wide text-white/90 mb-5">
            <span className="text-white font-bold uppercase">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{division?.name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-white">{project.clientName}</span>
            {detail.market && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-white">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {detail.market}
                </span>
              </>
            )}
          </div>

          <h1 className="hero-slide-left text-[2.65rem] sm:text-6xl lg:text-[5.25rem] font-display font-bold tracking-[-0.04em] leading-[0.98] text-white [text-wrap:balance] max-w-5xl mb-6">
            {project.title}
          </h1>
          <p className="hero-pop text-base sm:text-lg text-white/95 leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <Reveal variant="slide-down" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
                {t.caseStudy.clientLabel}
              </div>
              <div className="text-base sm:text-lg font-bold text-white">{project.clientName}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
                {t.caseStudy.sectorLabel}
              </div>
              <div className="text-base sm:text-lg font-bold text-white">{detail.sector}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
                {t.caseStudy.timelineLabel}
              </div>
              <div className="text-base sm:text-lg font-bold text-white">{detail.timeline}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-bold mb-1">
                {t.caseStudy.servicesUsedLabel}
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                {detail.servicesUsed.map(localizeServiceTitle).join(' · ')}
              </div>
            </div>
          </Reveal>

          <figure className="relative overflow-hidden rounded-xl border border-white/25 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.22)] aspect-[4/3] sm:aspect-[16/9]">
            <OptimizedImage
              src={project.imageUrl}
              alt={project.title}
              width={1400}
              height={800}
              priority
              containerClassName="w-full h-full bg-white"
              className={
                rawProject.category === 'Branding'
                  ? 'w-full h-full object-contain bg-white'
                  : 'w-full h-full object-cover object-center'
              }
            />
          </figure>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal variant="slide-left" className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.caseStudy.overviewHeading}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-white/95 leading-relaxed">
                {detail.executiveOverview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal variant="slide-down" delayMs={90} className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.caseStudy.objectivesHeading}
              </h2>
              <ul className="space-y-3 pt-1">
                {detail.strategicObjectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-white/95 leading-relaxed">
                    <span className="text-sm font-bold text-white/85 pt-1 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal variant="slide-left" className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.caseStudy.challengeHeading}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {detail.challengeDetailed.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal variant="slide-down" delayMs={90} className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.caseStudy.strategyHeading}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {detail.strategyDetailed.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.caseStudy.phasesHeading}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {detail.executionPhases.map((phase, idx) => (
                <Reveal
                  key={phase.phase}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 65}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-[#B81118]">
                      {phase.phase}: {phase.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                      {phase.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.caseStudy.deliverablesHeading}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {detail.deliverableDetails.map((item, idx) => (
                <Reveal
                  key={item.name}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 65}
                >
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-display font-bold text-[#2A1214] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ED1B24] shrink-0" aria-hidden="true" />
                      <span>{item.name}</span>
                    </h3>
                    <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal variant="slide-left" className="lg:col-span-4 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                {t.caseStudy.specsHeading}
              </h3>
              <dl className="space-y-4">
                {detail.specifications.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs text-white/80 mb-0.5">{spec.label}</dt>
                    <dd className="text-base sm:text-lg font-semibold text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="lg:col-span-4 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                {t.caseStudy.outcomesHeading}
              </h3>
              <ul className="space-y-3">
                {detail.documentedOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-base sm:text-lg text-white/95 leading-relaxed">
                    <Check className="w-4 h-4 text-white shrink-0 mt-1.5" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              {supplemental?.creators && supplemental.creators.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    <span>{t.caseStudy.featuredCreatorsHeading}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {supplemental.creators.map((creator) => (
                      <li key={creator} className="text-base sm:text-lg text-white/90">
                        {creator}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>

            <Reveal variant="slide-down" delayMs={140} className="lg:col-span-4 space-y-4">
              <h3 className="text-xl font-display font-bold uppercase text-white">
                {t.caseStudy.commissionHeading}
              </h3>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {t.caseStudy.commissionBodyPrefix}{' '}
                {localizeServiceTitle(detail.servicesUsed[0] || rawProject.category)}.
              </p>
              <button
                type="button"
                onClick={() => onOpenInquiry(detail.servicesUsed[0] || project.deliverables[0])}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors"
              >
                <span>{t.caseStudy.startSimilarProject}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          {supplemental && supplemental.gallery.length > 0 && (
            <div className="space-y-8">
              <Reveal variant="slide-left">
                <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                  {t.caseStudy.galleryHeading}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {supplemental.gallery.map((photo, idx) => (
                  <Reveal
                    key={photo.imageUrl}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 70}
                  >
                    <figure className="flex flex-col space-y-3">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <OptimizedImage
                          src={photo.imageUrl}
                          alt={photo.caption}
                          width={800}
                          height={500}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="text-sm sm:text-base text-white/90 leading-relaxed">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {relatedProjects.length > 0 && (
            <div className="space-y-8 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <Reveal variant="slide-left">
                  <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                    {t.caseStudy.relatedHeading}
                  </h2>
                </Reveal>
                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  className="inline-flex items-center gap-2 text-base font-bold text-white hover:text-white/80 transition-colors"
                >
                  <span>{t.caseStudy.allPortfolioProjects}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((rel, idx) => (
                  <Reveal
                    key={rel.id}
                    variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                    delayMs={idx * 70}
                  >
                    <article className="group transition-transform duration-300 hover:-translate-y-1">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/work/${rel.slug}`)}
                        className="text-left w-full flex flex-col"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden mb-4">
                          <OptimizedImage
                            src={rel.imageUrl}
                            alt={rel.title}
                            width={720}
                            height={450}
                            containerClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="text-sm font-bold text-white/85 mb-1">
                          {rel.category} · {rel.clientName}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-white/85 transition-colors mb-2">
                          {rel.title}
                        </h3>
                        <p className="text-base sm:text-lg text-white/90 line-clamp-2 mb-3 leading-relaxed">
                          {rel.summary}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-white">
                          <span>{t.caseStudy.readCaseStudy}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </button>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
