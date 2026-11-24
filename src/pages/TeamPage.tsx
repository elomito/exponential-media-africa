import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { EXECUTIVE_DIRECTOR_PORTRAIT, PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { CORE_VALUES, DIVISIONS } from '../data/seedData';
import { getServiceSlug } from '../lib/portfolio';

interface TeamPageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

interface TeamSlot {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string;
  photoUrl?: string;
}

const DEFAULT_TEAM_SLOTS: TeamSlot[] = [
  {
    id: 'exec-duncan-aboka',
    name: 'Duncan Aboka',
    role: 'Executive Director',
    division: 'Executive Leadership',
    bio: 'Provides strategic direction, client partnerships, and regional agency oversight from our Kilimani, Nairobi headquarters.',
    photoUrl: EXECUTIVE_DIRECTOR_PORTRAIT,
  },
  {
    id: 'dept-hr',
    name: 'Human Resources',
    role: 'People & Culture',
    division: 'Human Resources',
    bio: 'Leads talent acquisition, multidisciplinary team development, and agency culture across our six core practices.',
  },
  {
    id: 'dept-finance',
    name: 'Finance',
    role: 'Finance & Administration',
    division: 'Finance Department',
    bio: 'Oversees commercial budgeting, client billing governance, vendor settlements, and regional operational compliance.',
  },
  {
    id: 'dept-creative-delivery',
    name: 'Creative & Campaign Lead',
    role: 'Design, Content & Activations',
    division: 'Campaign Operations',
    bio: 'Coordinates visual design, content creation, social management, creator campaigns, media buying, and brand activations.',
  },
];

export function TeamPage({ onNavigate, onOpenInquiry }: TeamPageProps) {
  const { teamMembers } = useCms();
  const { t, localizeTeamSlot, localizeDivision, localizeValue } = useLanguage();

  const teamSlots: TeamSlot[] = (
    teamMembers.length > 0
      ? [
          ...teamMembers.map((m) => {
            const defaultSlot = DEFAULT_TEAM_SLOTS.find(
              (slot) =>
                slot.id === m.id ||
                slot.name.toLowerCase() === m.name.toLowerCase() ||
                slot.role.toLowerCase() === m.role.toLowerCase()
            );
            return {
              id: m.id,
              name: m.name,
              role: m.role,
              division: m.division,
              bio: m.bio,
              photoUrl: m.photoUrl || defaultSlot?.photoUrl,
            };
          }),
          ...DEFAULT_TEAM_SLOTS.filter(
            (slot) =>
              !teamMembers.some(
                (m) =>
                  m.name.toLowerCase() === slot.name.toLowerCase() ||
                  m.role.toLowerCase() === slot.role.toLowerCase()
              )
          ),
        ].slice(0, 4)
      : DEFAULT_TEAM_SLOTS
  ).map(localizeTeamSlot);

  const heroWords = t.team.heroTitle.trim().split(/\s+/);
  const splitIdx = Math.max(1, heroWords.length - 1);
  const heroLead = heroWords.slice(0, splitIdx).join(' ');
  const heroAccent = heroWords.slice(splitIdx).join(' ');

  return (
    <div>
      <SeoHead
        title={t.seo.teamTitle}
        description={t.seo.teamDescription}
        path="/team"
        imageUrl={PAGE_HERO_IMAGES.team}
        imageAlt="Exponential Marketing Agency professional working in the Nairobi studio"
        schemaType="AboutPage"
        breadcrumbName={t.team.heroTitle}
      />

      <section className="relative bg-[#EFF1F4] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[400px] sm:min-h-[470px] lg:min-h-[min(560px,calc(100svh-4.5rem))] flex items-end lg:items-center">
        <div className="lg:hidden absolute inset-x-0 top-0 pointer-events-none select-none hero-media-enter bg-[#EFF1F4]">
          <div className="relative w-full aspect-[16/9] min-h-[225px] max-h-[340px] overflow-hidden">
            <OptimizedImage
              src={PAGE_HERO_IMAGES.team}
              alt="Exponential Marketing Agency professional working in the Nairobi studio"
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
            src={PAGE_HERO_IMAGES.team}
            alt="Exponential Marketing Agency professional working in the Nairobi studio"
            priority
            width={1672}
            height={941}
            containerClassName="absolute inset-0 w-full h-full"
            className="block w-full h-full object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#EFF1F4]/95 via-[#EAECEF]/82 via-36% to-transparent to-54%"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-44 pb-7 sm:pt-56 sm:pb-10 lg:py-20">
          <div className="max-w-xl lg:max-w-none lg:w-[40%] xl:w-[38%]">
            <h1 className="text-[2.25rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.65rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4 sm:mb-6">
              <span className="hero-slide-left block text-[#141923]">{heroLead}</span>
              {heroAccent && (
                <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{heroAccent}</span>
              )}
            </h1>
            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-md mb-5 sm:mb-7">
              {t.team.heroSubtitle}
            </p>
            <div className="hero-slide-left-delay-3">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-md transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shadow-sm"
              >
                <span>{t.team.startProject}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamSlots.map((member, index) => (
              <Reveal
                key={member.id}
                variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={index * 65}
                className="flex flex-col"
              >
                <article className="flex flex-col h-full">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#9E0E15] border border-white/20 flex flex-col items-center justify-center mb-5">
                    {'photoUrl' in member && member.photoUrl ? (
                      <OptimizedImage
                        src={member.photoUrl}
                        alt={`${member.name} — ${member.role}`}
                        width={600}
                        height={800}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-white px-6 text-center">
                        <User className="w-14 h-14 stroke-[1.25]" aria-hidden="true" />
                        <span className="text-sm font-semibold tracking-wide uppercase">
                          {member.division}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-white/90 mb-1">
                        {member.role}
                      </div>
                      <h2 className="text-2xl font-display font-bold text-white tracking-tight mb-1">
                        {member.name}
                      </h2>
                      <div className="text-sm text-white/80">{member.division}</div>
                    </div>
                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal variant="slide-left" className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118] [text-wrap:balance]">
                {t.team.fourPillarsHeading}
              </h2>
            </Reveal>
            <Reveal variant="slide-down" delayMs={80}>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#ED1B24] hover:bg-[#B81118] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.team.exploreServices}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {DIVISIONS.map((rawDiv, index) => {
              const div = localizeDivision(rawDiv);
              return (
                <Reveal
                  key={div.id}
                  variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={index * 65}
                  className="flex flex-col justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-display font-bold text-[#B81118] mb-2">
                      {div.name}
                    </h3>
                    <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
                      {div.ecosystemRole}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${getServiceSlug(rawDiv.services[0])}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B81118] hover:text-[#ED1B24] transition-colors"
                  >
                    <span>
                      {t.team.viewPrefix} {div.shortName}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
            {CORE_VALUES.map((rawVal, index) => {
              const val = localizeValue(rawVal);
              return (
                <Reveal
                  key={val.id}
                  variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={index * 55}
                  className="space-y-1.5"
                >
                  <div className="text-base font-display font-bold text-[#B81118]">{val.title}</div>
                  <p className="text-base text-[#4A2527] leading-relaxed">{val.summary}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal variant="slide-left">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white mb-2">
              {t.team.workWithUsHeading}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.team.workWithUsBody}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={80}>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {t.team.startProject}
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
