import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { WorldwidePartnersMarquee } from '../components/WorldwidePartnersMarquee';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { EXECUTIVE_DIRECTOR_PORTRAIT, PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { CORE_VALUES, TERRITORY_MARKETS } from '../data/seedData';
import { CORE_SIX_SERVICES, getServiceSlug } from '../lib/portfolio';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

interface LeadershipSlot {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string;
  photoUrl?: string;
}

const DEFAULT_LEADERSHIP_SLOTS: LeadershipSlot[] = [
  {
    id: 'exec-duncan-aboka',
    name: 'Duncan Aboka',
    role: 'Managing Director',
    division: 'Executive Leadership',
    bio: 'Leads agency strategy and client partnerships, aligning teams and resources to deliver projects from brief through execution.',
    photoUrl: EXECUTIVE_DIRECTOR_PORTRAIT,
  },
  {
    id: 'sam-osewe',
    name: 'Sam Osewe',
    role: 'Regional Director Operations',
    division: 'Operations',
    bio: 'Oversees regional operations, coordinating people, resources, and timelines to keep client projects moving smoothly.',
    photoUrl: '/assets/profile/team/sam-osewe.jpg',
  },
  {
    id: 'ann-glory-wambui',
    name: 'Ann Glory Wambui',
    role: 'Account Manager',
    division: 'Client Services',
    bio: 'Manages client communication and account priorities, keeping briefs and deliverables aligned with project goals.',
    photoUrl: '/assets/profile/team/ann-glory-wambui.jpg',
  },
  {
    id: 'sharon-odeko',
    name: 'Sharon Odeko',
    role: 'Business Operations Lead',
    division: 'Operations',
    bio: 'Leads business operations and internal coordination, helping teams stay organized and resourced throughout client projects.',
    photoUrl: '/assets/profile/team/sharon-odeko.jpg',
  },
];

export function AboutPage({ onNavigate, onOpenInquiry }: AboutPageProps) {
  const { teamMembers, clientLogos } = useCms();
  const { t, localizeValue, localizeMarket, localizeTeamSlot, localizeServiceBySlug } = useLanguage();
  const [activeValueId, setActiveValueId] = useState(CORE_VALUES[0].id);

  const rawSelectedValue = CORE_VALUES.find((v) => v.id === activeValueId) || CORE_VALUES[0];
  const selectedValue = localizeValue(rawSelectedValue);

  const teamSlots: LeadershipSlot[] = DEFAULT_LEADERSHIP_SLOTS.map((slot) => {
    const cmsMember = teamMembers.find(
      (member) =>
        member.id === slot.id ||
        member.name.trim().toLowerCase() === slot.name.toLowerCase()
    );

    return localizeTeamSlot({
      ...slot,
      photoUrl: slot.photoUrl || cmsMember?.photoUrl,
    });
  });

  const heroWords = t.about.heroTitle.trim().split(/\s+/);
  const splitIdx = Math.max(1, heroWords.length - 2);
  const heroLead = heroWords.slice(0, splitIdx).join(' ');
  const heroAccent = heroWords.slice(splitIdx).join(' ');

  return (
    <div>
      <SeoHead
        title={t.seo.aboutTitle}
        description={t.seo.aboutDescription}
        path="/about"
        imageUrl={PAGE_HERO_IMAGES.about}
        imageAlt="Exponential Marketing Agency Kilimani Nairobi team strategist"
        schemaType="AboutPage"
        breadcrumbName={t.nav.about}
      />

      <section className="relative bg-[#EAECEF] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[380px] sm:min-h-[440px] lg:min-h-[min(560px,calc(100svh-4.5rem))] flex items-center">
        <div className="absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.about}
            alt="Exponential Marketing Agency strategist in red branded polo shirt at desk with laptop"
            priority
            width={1376}
            height={768}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-[74%_top] sm:object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/82 via-58% to-[#EAECEF]/30 lg:via-[#EAECEF]/62 lg:via-45% lg:to-transparent lg:to-60%"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-[86%] sm:max-w-[70%] lg:max-w-none lg:w-[50%] xl:w-[48%]">
            <h1 className="text-[2.3rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.65rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4 sm:mb-6">
              <span className="hero-slide-left block text-[#141923]">{heroLead}</span>
              <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{heroAccent}</span>
            </h1>
            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-lg mb-6 sm:mb-8">
              {t.about.heroSubtitle}
            </p>
            <div className="hero-slide-left-delay-3">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
              >
                <span>{t.about.startProject}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <Reveal variant="slide-left" className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
              {t.about.whoWeAre}
            </h2>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed">
              {t.about.whoWeAreP1}
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.about.whoWeAreP2}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors"
              >
                <span>{t.about.exploreSixServices}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-white/80 transition-colors"
              >
                <span>{t.nav.letsTalk}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <Reveal
            variant="slide-down"
            delayMs={90}
            className="lg:col-span-6 aspect-[3/2] overflow-hidden rounded-xl border border-white/25 bg-[#1A0809] shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
          >
            <OptimizedImage
              src={PAGE_HERO_IMAGES.aboutWhoWeAre}
              alt="Exponential Media Africa executive holding recognition award in front of the Nairobi headquarters reception sign"
              width={526}
              height={351}
              containerClassName="w-full h-full bg-[#1A0809]"
              className="w-full h-full object-cover object-top"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            <Reveal variant="slide-left" className="space-y-3 rounded-2xl bg-[#FAF5F5] p-8 border border-[#B81118]/10">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.about.ourVision}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.about.visionBody}
              </p>
            </Reveal>
            <Reveal variant="slide-down" delayMs={90} className="space-y-3 rounded-2xl bg-[#FAF5F5] p-8 border border-[#B81118]/10">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.about.ourMission}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.about.missionBody}
              </p>
            </Reveal>
          </div>

          <Reveal variant="slide-left" delayMs={120} className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/work')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors"
            >
              <span>{t.about.exploreWorkCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors"
            >
              <span>{t.nav.letsTalk}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal variant="slide-left" className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white [text-wrap:balance]">
                {t.about.coreValues}
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {t.about.coreValuesIntro}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors"
                >
                  <span>{t.about.startProject}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal variant="slide-down" delayMs={90} className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-3" role="tablist" aria-label={t.about.coreValues}>
                {CORE_VALUES.map((rawVal) => {
                  const val = localizeValue(rawVal);
                  const active = val.id === selectedValue.id;
                  return (
                    <button
                      key={val.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveValueId(val.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                        active
                          ? 'bg-white text-[#9E0E15] font-bold'
                          : 'bg-[#9E0E15]/70 text-white/85 hover:text-white hover:bg-[#9E0E15] font-medium'
                      }`}
                    >
                      <span className="font-bold">{rawVal.letter}</span>
                      <span>·</span>
                      <span>{val.title}</span>
                    </button>
                  );
                })}
              </div>

              <div
                key={selectedValue.id}
                className="route-enter rounded-2xl bg-[#9E0E15]/60 border border-white/15 p-6 sm:p-8 space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedValue.title}
                </h3>
                <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                  {selectedValue.summary}
                </p>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {selectedValue.detail}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <Reveal variant="slide-left">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.about.ourMarkets}
              </h2>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.about.discussMarketCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TERRITORY_MARKETS.map((rawMarket, idx) => {
              const market = localizeMarket(rawMarket);
              return (
                <Reveal
                  key={rawMarket.country}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 70}
                >
                  <div className="space-y-1.5 rounded-xl bg-[#FAF5F5] p-5 h-full border border-[#B81118]/10">
                    <h3 className="text-lg font-display font-bold text-[#B81118]">{market.country}</h3>
                    <div className="text-xs font-bold text-[#2A1214]">{market.role}</div>
                    <p className="text-sm text-[#4A2527] leading-relaxed">{market.notes}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="bg-[#B81118] text-white py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.about.ourTeam}
              </h2>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed">
                {t.about.ourTeamIntro}
              </p>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80} className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/team')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.about.meetTeamCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamSlots.map((member, idx) => (
              <Reveal
                key={member.id}
                variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={idx * 75}
              >
                <article className="flex flex-col transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4 bg-[#9E0E15] border border-white/20 flex flex-col items-center justify-center">
                    {member.photoUrl ? (
                      <OptimizedImage
                        src={member.photoUrl}
                        alt={`${member.name} — ${member.role}`}
                        width={600}
                        height={800}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-white/90 px-6 text-center">
                        <User className="w-12 h-12 stroke-[1.25]" aria-hidden="true" />
                        <span className="text-xs font-semibold tracking-wide uppercase">
                          {member.division}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white/85 mb-0.5">{member.role}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed line-clamp-3">{member.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] pt-16 pb-10 md:pt-20 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
                {t.about.whyChooseUs}
              </h2>
              <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                {t.about.whyChooseUsIntro}
              </p>
            </Reveal>

            <Reveal variant="slide-down" delayMs={80} className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-colors whitespace-nowrap"
              >
                <span>{t.about.exploreSixServices}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.whyReasons.map((reason, idx) => (
              <Reveal
                key={reason.title}
                variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={idx * 75}
              >
                <div className="space-y-2 rounded-xl bg-[#FAF5F5] p-6 h-full border border-[#B81118]/10">
                  <h3 className="text-lg font-display font-bold text-[#B81118]">{reason.title}</h3>
                  <p className="text-sm sm:text-base text-[#4A2527] leading-relaxed">
                    {reason.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="slide-left" delayMs={100} className="pt-1 flex flex-wrap gap-x-6 gap-y-2">
            {CORE_SIX_SERVICES.map((srv) => {
              const slug = getServiceSlug(srv);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onNavigate(`/services/${slug}`)}
                  className="text-xs sm:text-sm font-semibold text-[#B81118] hover:text-[#ED1B24] transition-colors"
                >
                  {localizeServiceBySlug(slug, srv)}
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-18 md:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorldwidePartnersMarquee logos={clientLogos} surface="red" />
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] mb-2">
              {t.about.partnerHeading}
            </h2>
            <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
              {t.about.partnerBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>{t.about.startProject}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
