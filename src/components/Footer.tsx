import React, { useState } from 'react';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { DIVISIONS, VERIFIED_CONTACT } from '../data/seedData';
import { db } from '../lib/firebase';
import { newsletterSchema, sha256Hex } from '../lib/validation';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { settings } = useCms();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
    unsubscribeToken?: string;
    subscriberHash?: string;
  } | null>(null);

  const [unsubscribeOpen, setUnsubscribeOpen] = useState(false);
  const [unsubEmail, setUnsubEmail] = useState('');
  const [unsubToken, setUnsubToken] = useState('');
  const [unsubFeedback, setUnsubFeedback] = useState<string | null>(null);

  const configuredSocials = (['instagram', 'linkedin', 'youtube', 'x'] as const)
    .map((network) => ({ network, url: settings.socialLinks[network]?.trim() || '' }))
    .filter((entry) => Boolean(entry.url));

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const parsed = newsletterSchema.safeParse({
      email,
      consentAccepted: consent,
      websiteHoneypot: honeypot,
    });

    if (!parsed.success) {
      setFeedback({
        type: 'error',
        message: parsed.error.issues[0]?.message || 'Please check your email and consent.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          consentAccepted: consent,
          websiteHoneypot: honeypot,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.valid) {
        setFeedback({
          type: 'error',
          message: json.error || 'Subscription validation failed.',
        });
        return;
      }

      const subscriberRef = doc(db, 'newsletter_subscribers', json.subscriberHash);
      try {
        await setDoc(subscriberRef, {
          email: json.email,
          consentAccepted: true,
          status: 'active',
          unsubscribeToken: json.unsubscribeToken,
          createdAt: serverTimestamp(),
        });
        setFeedback({
          type: 'success',
          message: 'Subscribed. Thank you for joining Exponential Media Africa updates.',
          unsubscribeToken: json.unsubscribeToken,
          subscriberHash: json.subscriberHash,
        });
        setEmail('');
        setConsent(false);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : '';
        if (msg.includes('permission') || msg.includes('already')) {
          setFeedback({
            type: 'error',
            message: 'This email address is already registered on our mailing list.',
          });
        } else {
          setFeedback({
            type: 'error',
            message: 'Unable to save subscription right now. Please try again later.',
          });
        }
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Network error while verifying subscription. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnsubFeedback(null);
    if (!unsubEmail.trim() || !unsubToken.trim()) {
      setUnsubFeedback('Please provide both your email address and unsubscribe token.');
      return;
    }
    try {
      const hash = await sha256Hex(unsubEmail);
      const ref = doc(db, 'newsletter_subscribers', hash);
      await updateDoc(ref, {
        status: 'unsubscribed',
        unsubscribeToken: unsubToken.trim(),
        unsubscribedAt: serverTimestamp(),
      });
      setUnsubFeedback('Your email has been unsubscribed from future communications.');
      setUnsubEmail('');
      setUnsubToken('');
    } catch {
      setUnsubFeedback(
        'Could not process unsubscribe with that email/token pair. Please verify your token or email info@exponentialmedia.africa.'
      );
    }
  };

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
              Receive agency updates, campaign insights, and African digital marketing briefs.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3" noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.co.ke"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-[#141418] border border-white/15 rounded-lg text-white placeholder:text-neutral-500 focus:border-[#ED2126] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 text-sm font-semibold bg-[#ED2126] hover:bg-[#D1191E] disabled:opacity-60 text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {submitting ? 'Saving...' : 'Subscribe'}
                </button>
              </div>
              <label className="flex items-start gap-2.5 text-xs text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-[#141418] text-[#ED2126] focus:ring-[#ED2126]"
                />
                <span>
                  I consent to receive marketing communications in accordance with the{' '}
                  <a
                    href="/privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/privacy-policy');
                    }}
                    className="text-[#FF1A1F] font-semibold underline hover:text-white"
                  >
                    Privacy Policy
                  </a>{' '}
                  (Kenya Data Protection Act, 2019).
                </span>
              </label>

              {feedback && (
                <div
                  role="status"
                  className={`p-3 rounded-lg text-xs border ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {feedback.type === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p>{feedback.message}</p>
                      {feedback.unsubscribeToken && (
                        <p className="mt-1.5 font-mono text-[11px] text-neutral-300 break-all">
                          Save your unsubscribe token: {feedback.unsubscribeToken}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>

            <button
              type="button"
              onClick={() => setUnsubscribeOpen((prev) => !prev)}
              className="text-xs text-neutral-400 hover:text-neutral-200 underline transition-colors"
            >
              Manage or unsubscribe from communications
            </button>

            {unsubscribeOpen && (
              <form
                onSubmit={handleUnsubscribe}
                className="p-3.5 rounded-lg bg-[#141418] border border-white/10 space-y-2.5"
              >
                <p className="text-xs font-medium text-white">Unsubscribe</p>
                <input
                  type="email"
                  value={unsubEmail}
                  onChange={(e) => setUnsubEmail(e.target.value)}
                  placeholder="Subscribed email"
                  className="w-full px-3 py-2 text-xs bg-[#0B0B0D] border border-white/15 rounded text-white"
                />
                <input
                  type="text"
                  value={unsubToken}
                  onChange={(e) => setUnsubToken(e.target.value)}
                  placeholder="Unsubscribe token"
                  className="w-full px-3 py-2 text-xs bg-[#0B0B0D] border border-white/15 rounded text-white font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                >
                  Confirm Unsubscribe
                </button>
                {unsubFeedback && (
                  <p className="text-xs text-neutral-300">{unsubFeedback}</p>
                )}
              </form>
            )}
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
