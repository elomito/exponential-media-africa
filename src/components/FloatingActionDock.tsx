import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VERIFIED_CONTACT } from '../data/seedData';
import { isSafeExternalHttpUrl } from '../lib/validation';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.81 14.12c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.14-.97-.32-1.67-.62-2.94-1.27-4.86-4.24-5.01-4.43-.14-.2-1.19-1.59-1.19-3.03 0-1.44.75-2.15 1.02-2.44.27-.29.59-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.38 1.47.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.29.39-.24.66-.15.27.1 1.72.81 2.02.96.3.15.49.22.56.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.29-.04-1.31-.14-2.49-.14-2.47 0-4.16 1.51-4.16 4.27V9.6H7.35v3.2h2.79V21h3.36z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
    </svg>
  );
}

export function FloatingActionDock() {
  const { t } = useLanguage();

  const socialItems = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      url: VERIFIED_CONTACT.whatsappUrl,
      icon: <WhatsAppIcon />,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      url: VERIFIED_CONTACT.facebookUrl,
      icon: <FacebookIcon />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: VERIFIED_CONTACT.instagramUrl,
      icon: <InstagramIcon />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: VERIFIED_CONTACT.linkedinUrl,
      icon: <LinkedInIcon />,
    },
  ].filter((item) => isSafeExternalHttpUrl(item.url));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      aria-label="Quick social links and back to top"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-1 rounded-full bg-[#9E0E15]/95 backdrop-blur-md p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.28)] ring-1 ring-white/25"
    >
      {socialItems.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white hover:text-[#9E0E15] transition-colors focus-visible:outline-2 focus-visible:outline-white"
        >
          {item.icon}
        </a>
      ))}

      <span aria-hidden="true" className="h-5 w-px bg-white/25 mx-0.5" />

      <button
        type="button"
        data-testid="back-to-top"
        onClick={scrollToTop}
        aria-label={t.footer.backToTop}
        title={t.footer.backToTop}
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-white/90 text-[#9E0E15] transition-transform duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-2 focus-visible:outline-white"
      >
        <ArrowUp className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
