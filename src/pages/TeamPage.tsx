import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { EXECUTIVE_DIRECTOR_PORTRAIT, PAGE_HERO_IMAGES } from '../data/pageHeroes';

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
    bio: 'Leads regional operations, coordinating people, timelines, and resources so client projects move smoothly from brief to delivery.',
  },
  {
    id: 'ann-glory-wambui',
    name: 'Ann Glory Wambui',
    role: 'Account Manager',
    division: 'Client Services',
    bio: 'Manages client communication and account priorities, keeping briefs, approvals, and deliverables aligned with project goals.',
  },
  {
    id: 'sharon-odeko',
    name: 'Sharon Odeko',
    role: 'Business Operations Lead',
    division: 'Operations',
    bio: 'Coordinates business operations and internal processes that keep client projects organized, resourced, and moving on schedule.',
  },
  {
    id: 'chris-ontita',
    name: 'Chris Ontita',
    role: 'Finance Officer',
    division: 'Finance',
    bio: 'Supports project budgeting, financial records, and payment coordination to help teams deliver client work responsibly.',
  },
  {
    id: 'billy-marande',
    name: 'Billy Marande',
    role: 'Digital Marketing Project Manager',
    division: 'Digital Marketing',
    bio: 'Plans and manages digital marketing projects, coordinating campaign schedules and deliverables around client objectives.',
  },
  {
    id: 'aurelia-muhanji',
    name: 'Aurelia Muhanji',
    role: 'Digital Marketing Associate',
    division: 'Digital Marketing',
    bio: 'Supports digital campaign execution through content coordination, platform updates, and day-to-day marketing tasks.',
  },
  {
    id: 'abraham-wanyonyi',
    name: 'Abraham Wanyonyi',
    role: 'Media Buy',
    division: 'Media Buying',
    bio: 'Plans and coordinates media buys to help client campaigns reach target audiences within agreed budgets.',
  },
  {
    id: 'treza-achieng-ouma',
    name: 'Treza Achieng Ouma',
    role: 'Business Development Representative',
    division: 'Business Development',
    bio: 'Builds prospect relationships, understands business needs, and connects potential clients with relevant agency services.',
  },
  {
    id: 'tuiza-amondi-ongodo',
    name: 'Tuiza Amondi Ongodo',
    role: 'Business Development Representative',
    division: 'Business Development',
    bio: 'Develops new business opportunities and helps translate prospective client needs into clear project conversations.',
  },
  {
    id: 'maxwell-simba',
    name: 'Maxwell Simba',
    role: 'Visual Content Creator',
    division: 'Creative',
    bio: 'Creates brand-aligned visual content that supports client storytelling and campaign delivery across digital channels.',
  },
  {
    id: 'irene-odhiambo',
    name: 'Irene Odhiambo',
    role: 'Digital Marketing Associate',
    division: 'Digital Marketing',
    bio: 'Assists with campaign execution, content scheduling, and online audience engagement for client accounts.',
  },
  {
    id: 'timothy-wachira',
    name: 'Timothy Wachira',
    role: 'Digital Marketing Associate',
    division: 'Digital Marketing',
    bio: 'Supports digital marketing activity and campaign coordination to keep work aligned with client goals and calendars.',
  },
  {
    id: 'paul-jakoyo',
    name: 'Paul Jakoyo',
    role: 'On ground Project Manager',
    division: 'Project Operations',
    bio: 'Coordinates on-ground project activity, teams, and logistics to deliver client activations on schedule.',
  },
];

export function TeamPage({ onOpenInquiry }: TeamPageProps) {
  const { teamMembers } = useCms();
  const { t, localizeTeamSlot } = useLanguage();

  const teamSlots: TeamSlot[] = DEFAULT_TEAM_SLOTS.map((slot) => {
    const cmsMember = teamMembers.find(
      (member) =>
        member.id === slot.id ||
        member.name.trim().toLowerCase() === slot.name.toLowerCase()
    );

    return localizeTeamSlot({
      ...slot,
      photoUrl:
        slot.id === 'exec-duncan-aboka'
          ? slot.photoUrl
          : cmsMember?.photoUrl || slot.photoUrl,
    });
  });

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

      <section className="bg-[#B81118] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only text-2xl sm:text-4xl">{t.team.heroTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {teamSlots.map((member, index) => (
              <Reveal
                key={member.id}
                variant={index % 2 === 0 ? 'slide-left' : 'slide-down'}
                delayMs={index * 35}
              >
                <article className="flex min-h-[76px] items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-3 py-3 transition-colors hover:bg-white/10 sm:gap-4 sm:px-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[#B81118] ring-2 ring-white/70">
                    {member.photoUrl ? (
                      <OptimizedImage
                        src={member.photoUrl}
                        alt={`${member.name} — ${member.role}`}
                        width={96}
                        height={96}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <User className="h-5 w-5 stroke-[1.75]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-display font-bold text-white tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/80 leading-snug">{member.role}</p>
                    <p className="mt-1 text-sm text-white/75 leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
