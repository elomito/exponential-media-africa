import React, { useMemo } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { OfficeLocationsMap, type OfficeLocationInput } from '../components/OfficeLocationsMap';
import { ProjectInquiryForm } from '../components/ProjectInquiryForm';
import { SeoHead } from '../components/SeoHead';
import { useCms } from '../context/CmsContext';
import { VERIFIED_CONTACT } from '../data/seedData';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const { settings } = useCms();

  const offices = useMemo<OfficeLocationInput[]>(() => {
    return [
      {
        id: 'hq',
        label: 'Exponential Media Africa HQ (Kilimani)',
        query: `${settings.headquartersAddress}`,
      },
    ];
  }, [settings.headquartersAddress]);

  const activeSocials = useMemo(
    () =>
      (['instagram', 'linkedin', 'youtube', 'x'] as const)
        .map((net) => ({ net, url: settings.socialLinks[net] }))
        .filter((item) => Boolean(item.url)),
    [settings.socialLinks]
  );

  return (
    <div className="bg-[#0B0B0D] text-white">
      <SeoHead
        title="Contact Us — Exponential Media Africa"
        description="Connect with Exponential Media Africa at A3-10 Casamia, Ngong Road, Kilimani, Nairobi. Submit a project brief or reach us directly by phone, email, or WhatsApp."
        path="/contact"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-white/10">
        <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-3">
          <span className="w-5 h-0.5 bg-[#ED2126]" aria-hidden="true" />
          <span>Contact Us</span>
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.04] max-w-4xl [text-wrap:balance] mb-5 sm:mb-6">
          Start a conversation with our Nairobi team.
        </h1>
        <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Reach our Nairobi team directly by phone, email or WhatsApp. Online project brief submission is temporarily paused while secure server-side recording is completed.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Verified Contact Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl space-y-5">
              <h2 className="text-lg font-display font-bold text-white">
                Verified Nairobi Contact
              </h2>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#ED2126] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <div className="font-medium text-white">Nairobi Headquarters</div>
                  <div className="text-neutral-400">{settings.headquartersAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm pt-4 border-t border-white/10">
                <Mail className="w-4 h-4 text-[#ED2126] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <div className="font-medium text-white">Email</div>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-neutral-300 hover:text-[#FF1A1F] transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#ED2126] shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="font-medium text-white">Telephone</div>
                  <div>
                    <a
                      href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                      className="text-neutral-300 hover:text-[#FF1A1F] transition-colors"
                    >
                      {settings.primaryPhone}
                    </a>
                  </div>
                  {settings.secondaryPhone && (
                    <div>
                      <a
                        href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                        className="text-neutral-400 hover:text-[#FF1A1F] transition-colors"
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
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#ED2126] hover:bg-[#D1191E] text-white rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Message Us on WhatsApp</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-neutral-400">
                <div className="font-medium text-neutral-200 mb-1">Active Regional Territory</div>
                Kenya · Uganda · Rwanda · DRC · Zambia
              </div>
            </div>

            {activeSocials.length > 0 && (
              <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl space-y-3">
                <h3 className="text-sm font-semibold text-white">Official Channels</h3>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {activeSocials.map(({ net, url }) => (
                    <a
                      key={net}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3 py-2 bg-[#0B0B0D] border border-white/10 rounded-lg text-neutral-300 hover:text-white capitalize transition-colors"
                    >
                      <span>{net === 'x' ? 'X' : net}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Embedded Smart Project Inquiry System */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-[#141418] border border-white/10 rounded-2xl">
            <div className="pb-6 mb-6 border-b border-white/10">
              <h2 className="text-2xl font-display font-bold text-white mb-1">
                Smart Project Inquiry Brief
              </h2>
              <p className="text-sm text-neutral-400">
                Use the brief below to organize your project details. Online submission is paused; your information will not be sent or stored when you submit.
              </p>
            </div>
            <ProjectInquiryForm onNavigate={onNavigate} />
          </div>
        </div>

        {/* Interactive Google Maps Office Locator */}
        <div className="mt-12 p-5 sm:p-8 bg-[#141418] border border-white/10 rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#FF1A1F] mb-1">
                <span className="w-4 h-0.5 bg-[#ED2126]" aria-hidden="true" />
                <span>Interactive Office Locator</span>
              </p>
              <h2 className="text-2xl font-display font-bold text-white">
                Visit our Kilimani, Nairobi headquarters
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Inspect location details and get directions to A3-10 Casamia, Ngong Road.
            </p>
          </div>
          <OfficeLocationsMap offices={offices} />
        </div>
      </section>
    </div>
  );
}
