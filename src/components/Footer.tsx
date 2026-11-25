import { Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Reveal } from './ScrollReveal';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { CORE_SERVICE_ROUTES } from '../lib/portfolio';
import { sanitizeMailtoHref, sanitizeTelHref } from '../lib/validation';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { settings } = useCms();
  const { language, t, localizeServiceBySlug } = useLanguage();
  const localizedTagline =
    language === 'sw' ? 'Suluhu Bunifu kwa Ukuaji Mkubwa.' : settings.tagline;

  return (
    <footer className="bg-[#9E0E15] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14">
          <Reveal variant="slide-left" className="lg:col-span-4 space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              aria-label="Exponential Marketing Agency"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-white"
            >
              <BrandLogo variant="footer" />
            </a>
            <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-sm">
              {localizedTagline} {t.footer.bioSuffix}
            </p>
          </Reveal>

          <Reveal variant="slide-down" delayMs={70} className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold uppercase text-white tracking-tight">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-base">
              {CORE_SERVICE_ROUTES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/services/${service.slug}`);
                    }}
                    className="text-white/85 hover:text-white transition-colors"
                  >
                    {localizeServiceBySlug(service.slug, service.title)}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="slide-down" delayMs={120} className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold uppercase text-white tracking-tight">
              {t.footer.exploreTitle}
            </h3>
            <ul className="space-y-2.5 text-base">
              {[
                { label: t.footer.exploreLinks.about, path: '/about' },
                { label: t.footer.exploreLinks.services, path: '/services' },
                { label: t.footer.exploreLinks.work, path: '/work' },
                { label: t.footer.exploreLinks.insights, path: '/insights' },
                { label: t.footer.exploreLinks.faq, path: '/faq' },
                { label: t.footer.exploreLinks.contact, path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.path);
                    }}
                    className="text-white/85 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="slide-left" delayMs={150} className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold uppercase text-white tracking-tight">
              {t.footer.contactTitle}
            </h3>
            <div className="space-y-3 text-base text-white/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-1" aria-hidden="true" />
                <span>{settings.headquartersAddress}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={sanitizeMailtoHref(settings.email)}
                  className="hover:opacity-80 transition-opacity"
                >
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0 mt-1" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <a
                    href={sanitizeTelHref(settings.primaryPhone)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {settings.primaryPhone}
                  </a>
                  {settings.secondaryPhone && (
                    <a
                      href={sanitizeTelHref(settings.secondaryPhone)}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {settings.secondaryPhone}
                    </a>
                  )}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/85">
          <span>
            © {new Date().getFullYear()} {settings.companyName}. {t.footer.rightsReserved}
          </span>
          <a
            href="/privacy-policy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/privacy-policy');
            }}
            className="hover:text-white transition-colors"
          >
            {t.footer.privacy}
          </a>
          <a
            href="/terms"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/terms');
            }}
            className="hover:text-white transition-colors"
          >
            {t.footer.terms}
          </a>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/admin');
            }}
            className="hover:text-white transition-colors"
          >
            {t.footer.staffLogin}
          </a>
        </div>
      </div>
    </footer>
  );
}
