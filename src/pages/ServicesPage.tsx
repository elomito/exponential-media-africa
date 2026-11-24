import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { DIVISIONS } from '../data/seedData';
import { findServiceRouteBySlug, getServiceSlug } from '../lib/portfolio';
import type { DivisionId } from '../types/cms';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function ServicesPage({ onNavigate, onOpenInquiry }: ServicesPageProps) {
  const { services } = useCms();
  const { t, localizeDivision, localizeService } = useLanguage();
  const [selectedDivision, setSelectedDivision] = useState<'all' | DivisionId>('all');

  const visibleDivisions =
    selectedDivision === 'all'
      ? DIVISIONS
      : DIVISIONS.filter((d) => d.id === selectedDivision);

  return (
    <div>
      <SeoHead
        title={t.seo.servicesTitle}
        description={t.seo.servicesDescription}
        path="/services"
        imageUrl={PAGE_HERO_IMAGES.services}
        imageAlt="Exponential Marketing Agency six core marketing services"
        schemaType="CollectionPage"
        breadcrumbName={t.nav.services}
      />

      <section className="relative min-h-[min(620px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] overflow-hidden border-b border-white/15">
        <HeroBackdrop
          imageUrl={PAGE_HERO_IMAGES.services}
          alt="Exponential Marketing Agency brand activation and creative production work"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
          <h1 className="hero-slide-left text-[2.65rem] sm:text-6xl lg:text-[5.25rem] font-display font-bold tracking-[-0.04em] leading-[0.98] text-white max-w-5xl [text-wrap:balance] mb-6 sm:mb-7">
            {t.servicesPage.heroTitle}
          </h1>
          <p className="hero-slide-left-delay-1 text-base sm:text-lg text-white leading-relaxed max-w-2xl mb-8">
            {t.servicesPage.heroSubtitle}
          </p>

          <div
            role="group"
            aria-label="Filter services by practice area"
            className="hero-slide-down-delay-1 flex flex-wrap gap-5"
          >
            <button
              type="button"
              aria-pressed={selectedDivision === 'all'}
              onClick={() => setSelectedDivision('all')}
              className={`py-1 text-sm sm:text-base transition-colors ${
                selectedDivision === 'all'
                  ? 'text-white font-bold'
                  : 'text-white/75 hover:text-white font-medium'
              }`}
            >
              {t.servicesPage.allServices}
            </button>
            {DIVISIONS.map((rawDiv) => {
              const div = localizeDivision(rawDiv);
              return (
                <button
                  key={div.id}
                  type="button"
                  aria-pressed={selectedDivision === div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={`py-1 text-sm sm:text-base transition-colors ${
                    selectedDivision === div.id
                      ? 'text-white font-bold'
                      : 'text-white/75 hover:text-white font-medium'
                  }`}
                >
                  {div.shortName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div key={selectedDivision} className="route-enter">
      {visibleDivisions.map((rawDivision, idx) => {
        const division = localizeDivision(rawDivision);
        const isRed = idx % 2 === 0;
        const divisionServices = services.filter((s) => s.division === division.id);

        return (
          <section
            key={division.id}
            className={`${
              isRed ? 'bg-[#B81118] text-white' : 'bg-white text-[#2A1214]'
            } py-20 md:py-24`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <Reveal variant="slide-left" className="max-w-3xl">
                  <h2
                    className={`text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase ${
                      isRed ? 'text-white' : 'text-[#B81118]'
                    }`}
                  >
                    {division.name}
                  </h2>
                  <p
                    className={`text-base sm:text-lg mt-2 leading-relaxed ${
                      isRed ? 'text-white/90' : 'text-[#4A2527]'
                    }`}
                  >
                    {division.tagline}
                  </p>
                </Reveal>
                <Reveal variant="slide-down" delayMs={80}>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(rawDivision.services[0])}
                    className={`inline-flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-opacity hover:opacity-80 ${
                      isRed ? 'text-white' : 'text-[#B81118]'
                    }`}
                  >
                    <span>
                      {t.servicesPage.requestProposal} ({division.shortName})
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Reveal>
              </div>

              <div
                className={
                  divisionServices.length === 1
                    ? 'grid grid-cols-1 gap-8'
                    : divisionServices.length === 2
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-x-10'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8'
                }
              >
                {divisionServices.map((rawSrv, sIdx) => {
                  const serviceSlug = getServiceSlug(rawSrv.title);
                  const servicePhoto = findServiceRouteBySlug(serviceSlug)?.photoUrl;
                  const srv = localizeService(rawSrv);
                  return (
                    <Reveal
                      key={srv.id}
                      variant={sIdx % 2 === 0 ? 'slide-left' : 'slide-down'}
                      delayMs={sIdx * 75}
                    >
                      {divisionServices.length === 1 ? (
                        <article className="py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                          {servicePhoto && (
                            <button
                              type="button"
                              onClick={() => onNavigate(`/services/${serviceSlug}`)}
                              className="lg:col-span-5 group relative aspect-[16/10] w-full overflow-hidden rounded-xl text-left"
                            >
                              <OptimizedImage
                                src={servicePhoto}
                                alt={srv.title}
                                width={720}
                                height={450}
                                containerClassName="w-full h-full"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                              />
                            </button>
                          )}
                          <div className={`${servicePhoto ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-between gap-4`}>
                            <div>
                              <h3
                                className={`text-2xl sm:text-3xl font-display font-bold tracking-tight mb-2 ${
                                  isRed ? 'text-white' : 'text-[#B81118]'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => onNavigate(`/services/${serviceSlug}`)}
                                  className="text-left hover:opacity-85 transition-opacity"
                                >
                                  {srv.title}
                                </button>
                              </h3>
                              <p
                                className={`text-base sm:text-lg font-semibold leading-relaxed mb-3 ${
                                  isRed ? 'text-white' : 'text-[#2A1214]'
                                }`}
                              >
                                {srv.problemSolved}
                              </p>
                              <p
                                className={`text-sm sm:text-base leading-relaxed ${
                                  isRed ? 'text-white/90' : 'text-[#4A2527]'
                                }`}
                              >
                                {srv.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 pt-1">
                              <button
                                type="button"
                                onClick={() => onNavigate(`/services/${serviceSlug}`)}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-md transition-colors ${
                                  isRed
                                    ? 'bg-white hover:bg-white/90 text-[#9E0E15]'
                                    : 'bg-[#ED1B24] hover:bg-[#B81118] text-white'
                                }`}
                              >
                                <span>{t.servicesPage.exploreFullPage}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onOpenInquiry(rawSrv.title)}
                                className={`inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity ${
                                  isRed ? 'text-white' : 'text-[#B81118]'
                                }`}
                              >
                                <span>{t.servicesPage.discussService}</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ) : (
                        <article className="group py-4 flex flex-col justify-between gap-4 h-full">
                          <div>
                            {servicePhoto && (
                              <button
                                type="button"
                                onClick={() => onNavigate(`/services/${serviceSlug}`)}
                                className="relative h-44 sm:h-48 w-full overflow-hidden rounded-lg mb-4 block text-left"
                              >
                                <OptimizedImage
                                  src={servicePhoto}
                                  alt={srv.title}
                                  width={640}
                                  height={400}
                                  containerClassName="w-full h-full"
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                                />
                              </button>
                            )}
                            <h3
                              className={`text-xl sm:text-2xl font-display font-bold tracking-tight mb-2 ${
                                isRed ? 'text-white' : 'text-[#B81118]'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => onNavigate(`/services/${serviceSlug}`)}
                                className="text-left hover:opacity-85 transition-opacity"
                              >
                                {srv.title}
                              </button>
                            </h3>
                            <p
                              className={`text-sm sm:text-base font-semibold mb-2 leading-relaxed ${
                                isRed ? 'text-white' : 'text-[#2A1214]'
                              }`}
                            >
                              {srv.problemSolved}
                            </p>
                            <p
                              className={`text-sm sm:text-base leading-relaxed line-clamp-3 ${
                                isRed ? 'text-white/90' : 'text-[#4A2527]'
                              }`}
                            >
                              {srv.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-5 pt-2">
                            <button
                              type="button"
                              onClick={() => onNavigate(`/services/${serviceSlug}`)}
                              className={`inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity ${
                                isRed ? 'text-white' : 'text-[#B81118]'
                              }`}
                            >
                              <span>{t.servicesPage.fullServiceAndWork}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenInquiry(rawSrv.title)}
                              className={`inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity ${
                                isRed ? 'text-white/90' : 'text-[#4A2527]'
                              }`}
                            >
                              <span>{t.servicesPage.discussService}</span>
                            </button>
                          </div>
                        </article>
                      )}
                    </Reveal>
                  );
                })}
              </div>

              <Reveal variant="slide-left" delayMs={100} className="pt-2">
                <div
                  className={`flex flex-wrap gap-x-5 gap-y-2 text-base ${
                    isRed ? 'text-white/90' : 'text-[#4A2527]'
                  }`}
                >
                  {division.services.map((label, lIdx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => onOpenInquiry(rawDivision.services[lIdx] || label)}
                      className={`transition-colors ${
                        isRed ? 'hover:text-white' : 'hover:text-[#B81118]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {visibleDivisions.length % 2 === 1 && (
        <section className="bg-white text-[#2A1214] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] mb-2">
                {t.servicesPage.unifiedHeading}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.servicesPage.unifiedBody}
              </p>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={() => setSelectedDivision('all')}
                className="px-6 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                {t.servicesPage.viewAllServices}
              </button>
            </Reveal>
          </div>
        </section>
      )}
      </div>

      <section className="bg-[#B81118] text-white py-16 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white mb-2">
              {t.servicesPage.readyHeading}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {t.servicesPage.readyBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              {t.servicesPage.startBrief}
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
