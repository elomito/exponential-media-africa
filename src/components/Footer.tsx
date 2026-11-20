import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { DIVISIONS, VERIFIED_CONTACT } from '../data/seedData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { settings } = useCms();

  const configuredSocials = (['instagram', 'linkedin', 'youtube', 'x'] as const)
    .map((network) => ({ network, url: settings.socialLinks[network]?.trim() || '' }))
    .filter((entry) => Boolean(entry.url));

  return (
    <footer className="bg-[#08080A] text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Verified Contact */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-2.5 text-white font-display font-bold text-xl tracking-tight"
            >
              <img
                src="/assets/profile/brand/exp-mark.png"
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded object-contain shrink-0 bg-white p-0.5"
              />
              <span>EXPONENTIAL MEDIA AFRICA</span>
            </a>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              {settings.tagline} Helping brands stand out in the digital age across Kenya, Uganda, Rwanda, Democratic Republic of Congo, and Zambia.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#ED2126] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{settings.headquartersAddress}</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-[#ED2126] shrink-0" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-[#ED2126] shrink-0" aria-hidden="true" />
                <span className="flex flex-wrap gap-x-2">
                  <a
                    href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.primaryPhone}
                  </a>
                  {settings.secondaryPhone && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                        className="hover:text-white transition-colors"
                      >
                        {settings.secondaryPhone}
                      </a>
                    </>
                  )}
                </span>
              </div>
              <div className="pt-1">
                <a
                  href={VERIFIED_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141418] border border-white/15 hover:border-[#ED2126] text-xs font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#ED2126]" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF1A1F]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">Capabilities</h3>
            <ul className="space-y-2.5 text-sm">
              {DIVISIONS.map((div) => (
                <li key={div.id}>
                  <a
                    href={`/ecosystem#${div.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/ecosystem#${div.id}`);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {div.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Integrated Model', path: '/ecosystem' },
                { label: 'Services', path: '/services' },
                { label: 'Our Work', path: '/work' },
                { label: 'Insights', path: '/insights' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.path);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription (Kenya DPA 2019 Consent-Gated) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Industry Dispatches
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Mailing list sign-up is temporarily paused while secure confirmation and unsubscribe handling are completed.
            </p>
            <p className="text-xs text-neutral-400">
              Need to update a mailing-list preference? Email{' '}
              <a href={`mailto:${VERIFIED_CONTACT.email}`} className="underline underline-offset-4">{VERIFIED_CONTACT.email}</a>.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Verified Social Row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</span>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/privacy-policy');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/admin');
              }}
              className="hover:text-white transition-colors"
            >
              Staff Login
            </a>
          </div>

          {configuredSocials.length > 0 && (
            <div className="flex items-center gap-5">
              {configuredSocials.map(({ network, url }) => (
                <a
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 capitalize text-neutral-300 hover:text-white transition-colors"
                >
                  <span>{network === 'x' ? 'X' : network}</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
