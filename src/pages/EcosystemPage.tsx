import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { DIVISIONS, TERRITORY_MARKETS } from '../data/seedData';
import { getServiceSlug } from '../lib/portfolio';

interface EcosystemPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: (preselectedService?: string) => void;
}

export function EcosystemPage({ onNavigate, onOpenInquiry }: EcosystemPageProps) {
  const { t, localizeDivision, localizeMarket } = useLanguage();

  return (
    <div>
      <SeoHead
        title={t.seo.ecosystemTitle}
        description={t.seo.ecosystemDescription}
        path="/ecosystem"
        imageUrl={PAGE_HERO_IMAGES.services}
        imageAlt="Exponential Marketing Agency four integrated practice pillars"
        schemaType="CollectionPage"
        breadcrumbName={t.home.pillarsHeading}
      />

      <section className="relative min-h-[min(620px,calc(100svh-4.5rem))] flex items-end bg-[#9E0E15] text-white overflow-hidden border-b border-white/15">
        <HeroBackdrop
          imageUrl={PAGE_HERO_IMAGES.services}
          alt="Exponential Marketing Agency multidisciplinary collaboration in Nairobi"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
          <h1 className="hero-slide-left text-[2.65rem] sm:text-6xl lg:text-[5.25rem] font-display font-bold tracking-[-0.04em] leading-[0.98] text-white max-w-5xl [text-wrap:balance] mb-6 sm:mb-7">
            {t.ecosystem.heroTitle}
          </h1>
          <p className="hero-slide-down-delay-1 text-base sm:text-lg text-white leading-relaxed max-w-3xl">
            {t.ecosystem.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {DIVISIONS.map((rawDiv, idx) => {
              const div = localizeDivision(rawDiv);
              return (
                <Reveal
                  key={div.id}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 65}
                >
                  <a
                    href={`#${div.id}`}
                    className="group transition-transform duration-300 hover:-translate-y-1 block"
                  >
                    <div className="text-xl font-display font-bold text-white mb-2">
                      {div.name}
                    </div>
                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                      {div.ecosystemRole}
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {DIVISIONS.map((rawDivision, idx) => {
        const division = localizeDivision(rawDivision);
        const isRed = idx % 2 === 1;
        return (
          <section
            key={division.id}
            id={division.id}
            className={`scroll-mt-24 py-20 md:py-24 ${
              isRed ? 'bg-[#B81118] text-white' : 'bg-white text-[#2A1214]'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <Reveal
                variant={idx % 2 === 1 ? 'slide-right' : 'slide-left'}
                className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="h-full min-h-[280px] sm:min-h-[360px] overflow-hidden relative">
                  <OptimizedImage
                    src={division.imageUrl}
                    alt={division.imageAlt}
                    width={1080}
                    height={810}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal
                variant="slide-down"
                delayMs={80}
                className={`lg:col-span-6 flex flex-col justify-between space-y-6 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div>
                  <h2
                    className={`text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase mb-4 ${
                      isRed ? 'text-white' : 'text-[#B81118]'
                    }`}
                  >
                    {division.name}
                  </h2>
                  <p
                    className={`text-base sm:text-lg font-medium mb-4 leading-relaxed ${
                      isRed ? 'text-white' : 'text-[#2A1214]'
                    }`}
                  >
                    {division.tagline}
                  </p>
                  <p
                    className={`text-base sm:text-lg leading-relaxed mb-6 ${
                      isRed ? 'text-white/95' : 'text-[#4A2527]'
                    }`}
                  >
                    {division.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {division.services.map((srv) => (
                      <li
                        key={srv}
                        className={`flex items-start gap-2.5 text-base sm:text-lg leading-relaxed ${
                          isRed ? 'text-white/95' : 'text-[#2A1214]'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-1.5 ${
                            isRed ? 'text-white' : 'text-[#ED1B24]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${getServiceSlug(rawDivision.services[0])}`)}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-md transition-colors ${
                      isRed
                        ? 'bg-white hover:bg-white/90 text-[#9E0E15]'
                        : 'bg-[#ED1B24] hover:bg-[#B81118] text-white'
                    }`}
                  >
                    <span>
                      {t.ecosystem.viewPagePrefix} {division.shortName}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry(rawDivision.services[0])}
                    className={`text-sm font-semibold transition-colors ${
                      isRed
                        ? 'text-white/90 hover:text-white'
                        : 'text-[#B81118] hover:text-[#ED1B24]'
                    }`}
                  >
                    {t.ecosystem.startBrief}
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-white text-[#2A1214] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="slide-left" className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
              {t.ecosystem.fiveMarketsHeading}
            </h2>
            <span className="text-sm sm:text-base text-[#4A2527] whitespace-nowrap">
              {t.ecosystem.multiCountryNote}
            </span>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TERRITORY_MARKETS.map((rawMarket, idx) => {
              const market = localizeMarket(rawMarket);
              return (
                <Reveal
                  key={rawMarket.country}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 65}
                >
                  <div className="space-y-1.5">
                    <div className="text-lg font-display font-bold text-[#B81118] mb-1">
                      {market.country}
                    </div>
                    <div className="text-sm text-[#2A1214] font-semibold mb-1">{market.role}</div>
                    <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                      {market.notes}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-16 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white mb-2">
              {t.ecosystem.buildHeading}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {t.ecosystem.buildBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              {t.ecosystem.startProject}
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
