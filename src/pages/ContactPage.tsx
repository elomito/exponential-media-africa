import React, { useMemo } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { OfficeLocationsMap, type OfficeLocationInput } from '../components/OfficeLocationsMap';
import { OptimizedImage } from '../components/OptimizedImage';
import { ProjectInquiryForm } from '../components/ProjectInquiryForm';
import { Reveal } from '../components/ScrollReveal';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { PAGE_HERO_IMAGES } from '../data/pageHeroes';
import { TERRITORY_MARKETS, VERIFIED_CONTACT } from '../data/seedData';
import { isSafeExternalHttpUrl, sanitizeMailtoHref, sanitizeTelHref } from '../lib/validation';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { settings } = useCms();
  const { t, localizeMarket } = useLanguage();

  const offices = useMemo<OfficeLocationInput[]>(() => {
    return [
      {
        id: 'hq',
        label: 'Exponential Marketing Agency HQ (Kilimani)',
        query: `${settings.headquartersAddress}`,
      },
    ];
  }, [settings.headquartersAddress]);

  const activeSocials = useMemo(
    () =>
      (['instagram', 'linkedin', 'youtube', 'x'] as const)
        .map((net) => ({ net, url: settings.socialLinks[net] }))
        .filter((item) => isSafeExternalHttpUrl(item.url || '')),
    [settings.socialLinks]
  );

  return (
    <div>
      <SeoHead
        title={t.seo.contactTitle}
        description={t.seo.contactDescription}
        path="/contact"
        imageUrl={PAGE_HERO_IMAGES.contact}
        imageAlt="Contact Exponential Marketing Agency in Kilimani, Nairobi"
        schemaType="ContactPage"
        breadcrumbName={t.nav.contact}
      />

      <section className="relative bg-[#EAECEF] text-[#141923] overflow-hidden border-b-4 border-[#B81118] min-h-[380px] sm:min-h-[440px] lg:min-h-[min(600px,calc(100svh-4.5rem))] flex items-center">
        <div className="absolute inset-0 pointer-events-none select-none hero-media-enter">
          <OptimizedImage
            src={PAGE_HERO_IMAGES.contact}
            alt="Exponential Marketing Agency client relations strategist with laptop and communication icons"
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

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-14">
          <div className="max-w-[86%] sm:max-w-[70%] lg:max-w-none lg:w-[53%] xl:w-[51%]">
            {(() => {
              const words = t.contact.heroTitle.trim().split(/\s+/);
              const splitIdx = Math.max(1, words.length - 2);
              const lead = words.slice(0, splitIdx).join(' ');
              const accent = words.slice(splitIdx).join(' ');
              return (
                <h1 className="text-[2.3rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.65rem] font-display font-bold tracking-[-0.04em] leading-[0.98] [text-wrap:balance] mb-4 sm:mb-6">
                  <span className="hero-slide-left block text-[#141923]">{lead}</span>
                  <span className="hero-slide-left-delay-1 block text-[#ED1B24]">{accent}</span>
                </h1>
              );
            })()}
            <p className="hero-slide-left-delay-2 text-sm sm:text-lg text-[#2A1214] leading-relaxed max-w-xl">
              {t.contact.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B81118] text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal variant="slide-left" className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
                {t.contact.verifiedContactHeading}
              </h2>

              <div className="flex items-start gap-3 text-base sm:text-lg leading-relaxed">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">{t.contact.hqLabel}</div>
                  <div className="text-white/90">{settings.headquartersAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-base sm:text-lg leading-relaxed">
                <Mail className="w-5 h-5 text-white shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">{t.contact.emailLabel}</div>
                  <a
                    href={sanitizeMailtoHref(settings.email)}
                    className="text-white/95 hover:text-white/80 transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-base sm:text-lg leading-relaxed">
                <Phone className="w-5 h-5 text-white shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="font-semibold text-white">{t.contact.phoneLabel}</div>
                  <div>
                    <a
                      href={sanitizeTelHref(settings.primaryPhone)}
                      className="text-white/95 hover:text-white/80 transition-colors"
                    >
                      {settings.primaryPhone}
                    </a>
                  </div>
                  {settings.secondaryPhone && (
                    <div>
                      <a
                        href={sanitizeTelHref(settings.secondaryPhone)}
                        className="text-white/90 hover:text-white transition-colors"
                      >
                        {settings.secondaryPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={VERIFIED_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-white hover:bg-white/90 text-[#9E0E15] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>
              </div>
            </div>

            {activeSocials.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  {t.contact.officialChannels}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {activeSocials.map(({ net, url }) => (
                    <a
                      key={net}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between py-2 text-white/90 hover:text-white capitalize transition-colors"
                    >
                      <span>{net === 'x' ? 'X' : net}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal variant="slide-down" delayMs={90} className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white mb-2">
                {t.contact.startBriefHeading}
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                {t.contact.startBriefBody}
              </p>
            </div>
            <ProjectInquiryForm darkSurface={true} onNavigate={onNavigate} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white text-[#2A1214] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal variant="slide-left" className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-[#B81118]">
              {t.contact.regionalCoverageHeading}
            </h2>
            <p className="text-base sm:text-lg text-[#4A2527] leading-relaxed">
              {t.contact.regionalCoverageBody}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {TERRITORY_MARKETS.map((rawMarket, idx) => {
              const market = localizeMarket(rawMarket);
              return (
                <Reveal
                  key={rawMarket.country}
                  variant={idx % 2 === 0 ? 'slide-left' : 'slide-down'}
                  delayMs={idx * 65}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-[#B81118]">{market.country}</h3>
                    <div className="text-sm font-bold text-[#2A1214]">{market.role}</div>
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

      <section className="bg-[#B81118] text-white py-20 md:py-24 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Reveal variant="slide-left" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight leading-[1.08] uppercase text-white">
              {t.contact.visitOfficeHeading}
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              {t.contact.visitOfficeSub}
            </p>
          </Reveal>
          <Reveal variant="slide-down" delayMs={90}>
            <OfficeLocationsMap offices={offices} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
